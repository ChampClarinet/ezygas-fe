import { FC, useCallback, useEffect, useMemo } from "react";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Divider } from "primereact/divider";
import DateHelper from "@cantabile/date-helper";
import { useBreakpoint } from "@cantabile/hooks";
import FillAPI, { Fill, FinishFillDTO } from "@/api/fill";
import NumericInput from "@/components/common/numericinput";
import { useToastContext } from "@/hooks/toast";
import SweetAlert from "@/utils/sweetalert";

export interface CostBrand {
  brandCode: string;
  brandText: string;
  price: number;
  costsType: CostType[];
}
export interface CostType {
  typeCode: string;
  typeText: string;
  quantity: number;
}
export interface CostForm {
  costsBrand: CostBrand[];
  transport_price: number;
}
export interface SummaryTable {
  label: string;
  brandCode: null | string;
}

export interface FinishFillProps {
  item: Fill | null;
}
const FinishFill: FC<FinishFillProps> = ({ item }) => {
  const toast = useToastContext();
  const { watch, setValue } = useForm<CostForm>({
    defaultValues: {
      costsBrand: [],
      transport_price: 0,
    },
    mode: "onChange",
  });
  const costs = watch("costsBrand");
  const transportPrice = watch("transport_price");

  const onFinishFill = useCallback(async () => {
    if (!item) return;
    const { isConfirmed } = await SweetAlert.showConfirm({
      titleText: "ยืนยันการสำเร็จการส่งเติม",
    });
    if (!isConfirmed) return;
    const { id } = item;
    const currentTime = new DateHelper();
    const payload = costs.reduce(
      (obj: FinishFillDTO, { brandCode: label, price }): FinishFillDTO => {
        return { ...obj, [label]: price };
      },
      {
        transport_price: transportPrice,
        time_stamp: currentTime.toISO8601String(),
      }
    );

    SweetAlert.showLoading();
    await FillAPI.finishFill(id, payload);
    SweetAlert.close();
    toast.showToast({
      severity: "success",
      content: "ดำเนินการสำเร็จ",
    });
  }, [costs, item, toast, transportPrice]);

  const initForm = useCallback(() => {
    if (item) {
      const costs = item.filling.reduce(
        (brands: CostBrand[], f): CostBrand[] => {
          const costType = {
            quantity: f.quantity,
            typeCode: f.stock.type_code.toString(),
            typeText: f.stock.type_text,
          };
          const oldIndex = brands.findIndex(
            (b) => b.brandCode == f.stock.brand_code
          );
          if (oldIndex !== -1) {
            brands[oldIndex].costsType.push(costType);
          } else {
            brands.push({
              brandCode: f.stock.brand_code,
              brandText: f.stock.brand_text,
              price: 0,
              costsType: [costType],
            });
          }
          return brands;
        },
        []
      );
      setValue("costsBrand", [...costs]);
    }
  }, [item, setValue]);

  const handleCostsChange = useCallback(
    (brandCode: string, price: number) => {
      const brandIndex = costs.findIndex((c) => c.brandCode === brandCode);
      if (brandIndex !== -1) {
        costs[brandIndex].price = price;
      }
      setValue("costsBrand", [...costs]);
    },
    [costs, setValue]
  );

  const handleTransportPriceChange = useCallback(
    (price: number) => setValue("transport_price", price),
    [setValue]
  );

  const isSmall = useBreakpoint(700);

  const summaryCostLabels = useMemo(
    (): SummaryTable[] => [
      ...costs.map((c) => ({
        label: c.brandText,
        brandCode: c.brandCode,
      })),
      { label: "ค่าขนส่ง", brandCode: null },
    ],
    [costs]
  );

  useEffect(() => {
    initForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);
  return item ? (
    <div className="finish-fill-section flex-grow flex flex-col">
      <div className="body flex flex-col">
        {!isSmall && (
          <>
            <h5 className="flex font-bold items-center text-start text-current">
              จบการเติมแก๊ส
            </h5>
            <Divider className="!mx-0 !my-2" />
          </>
        )}
        {costs.map((brandCosts) => {
          const brand = brandCosts.brandText;
          return (
            <DataTable
              key={brand}
              className={clsx("mb-2", "w-full")}
              value={brandCosts.costsType}
            >
              <Column
                field="typeText"
                header={brand}
                pt={thPT}
                style={{ width: "50%" }}
              />
              <Column
                body={(data: CostType) => `${data.quantity} ถัง`}
                header="จำนวน"
                pt={thPT}
                style={{ width: "50%" }}
              />
            </DataTable>
          );
        })}
        <DataTable value={summaryCostLabels}>
          <Column
            header="ค่าแก๊ส/ขนส่ง"
            field="label"
            style={{ width: "50%" }}
            pt={thPT}
          />
          <Column
            header="จำนวนเงิน"
            style={{ width: "50%" }}
            pt={thPT}
            body={({ brandCode }) => {
              let value = 0;
              if (brandCode) {
                const c = costs.find((c) => c.brandCode === brandCode);
                value = c?.price || 0;
              }
              const onChange = (changeTo: number) => {
                if (brandCode) {
                  handleCostsChange(brandCode, changeTo);
                } else {
                  handleTransportPriceChange(changeTo);
                }
              };
              return (
                <NumericInput
                  mode="currency"
                  locale="th-TH"
                  currency="THB"
                  value={value}
                  onChange={(e) => onChange(e.value || 0)}
                  min={0}
                  pt={{
                    input: {
                      root: {
                        className: "w-[100px]",
                      },
                    },
                  }}
                />
              );
            }}
          />
        </DataTable>
        <div
          className={clsx(
            "footer-button",
            "rounded-md",
            "bg-current",
            "font-bold",
            "text-white",
            "text-center",
            "p-2",
            "clickable"
          )}
          onClick={onFinishFill}
        >
          เติมสำเร็จ
        </div>
      </div>
    </div>
  ) : (
    <h1>เลือกรายการส่งเติมเพื่อดูรายละเอียด</h1>
  );
};

export default FinishFill;

const thPT = {
  headerCell: {
    className: "bg-transparent w-[50%] whitespace-nowrap",
  },
};
