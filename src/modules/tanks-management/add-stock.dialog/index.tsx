import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import clsx from "clsx";
import { Dialog } from "primereact/dialog";
import { Image } from "primereact/image";
import { Controller, useForm } from "react-hook-form";
import { useBreakpoint } from "@cantabile/hooks";
import StocksAPI, { CreateStockDTO, Stock } from "@/api/stock";
import MasterAPI, { BrandOrTypeMasterData } from "@/api/master";
import Autocomplete from "@/components/common/autocomplete";
import Button from "@/components/common/button";
import Loading from "@/components/common/loading";
import NumericInput from "@/components/common/numericinput";
import { useToastContext } from "@/hooks/toast";
import { useBrandsList } from "@/queries/stocks";
import { resolveErrorResponse } from "@/utils/error";
import SweetAlert from "@/utils/sweetalert";
import { InputGroup } from "./css";

import TanksManagementContext from "../provider";

export interface AddStockDialogProps {
  isOpen: boolean;
  close: () => unknown;
}
const AddStockDialog: FC<AddStockDialogProps> = ({ isOpen, close }) => {
  const isSmallThan400 = useBreakpoint(400);
  const {
    refetch: refetchBrands,
    brandsList,
    isLoading,
    isValidating,
  } = useBrandsList();
  const toast = useToastContext();
  const context = useContext(TanksManagementContext);
  const { stocks, stocksQuery } = context;
  const { refetch: refetchStocks } = stocksQuery!;

  const [typesList, setTypesList] = useState<BrandOrTypeMasterData[]>([]);
  const [oldStock, setOldStock] = useState<Stock | null>(null);

  const { reset, watch, handleSubmit, setValue, control } = useForm<Form>({
    defaultValues: emptyForm,
  });

  const { brand, type } = watch();

  const isFormCompleted = useMemo(() => !!type && !!brand, [brand, type]);

  const checkIfOldDeletedStockExist = useCallback(
    async (brandCode: string, typeCode: string) => {
      SweetAlert.showLoading();
      let response: Stock | null = null;
      try {
        response = await StocksAPI.isStockExists(brandCode, typeCode);
      } catch (error) {
        await resolveErrorResponse(error);
      }
      SweetAlert.close();

      return response;
    },
    []
  );

  const resetBrandAndType = useCallback(() => {
    reset({ brand: null, type: null });
  }, [reset]);

  const onTypeChange = useCallback(
    (type: string | BrandOrTypeMasterData) => {
      if (typeof type === "string") return;
      setValue("type", type);
    },
    [setValue]
  );

  const handleBrandOrTypeChange = useCallback(async () => {
    if (!brand || !type || !stocks.length) return;
    const thisStockInOldList = await checkIfOldDeletedStockExist(
      brand.code,
      type.code
    );
    if (thisStockInOldList) {
      const isAlreadyCreated = thisStockInOldList.is_active;
      if (isAlreadyCreated) {
        toast.showToast({
          severity: "warn",
          content: "สินค้านี้ได้ถูกเพิ่มไว้ในการจัดการสินค้าแล้ว",
        });
        resetBrandAndType();
      } else {
        //? This is old stock before deleted, re-fill it in form as default.
        setOldStock(thisStockInOldList);
        const { quantity, emp_qty, price } = thisStockInOldList;
        reset({
          full: quantity,
          empty: emp_qty,
          price,
        });
      }
    }
  }, [
    brand,
    checkIfOldDeletedStockExist,
    reset,
    resetBrandAndType,
    stocks.length,
    toast,
    type,
  ]);

  const clearAllStates = useCallback(() => {
    resetBrandAndType();
    reset({ full: 0, empty: 0, price: 0 });
    setOldStock(null);
  }, [reset, resetBrandAndType]);

  const onSubmit = useCallback(
    async (data: Form) => {
      if (!isFormCompleted)
        return toast.showToast({
          severity: "error",
          content: "กรุณาเลือกยี่ห้อและขนาดถัง",
        });
      if (!brand) return console.error("currBrand is unexpectedly null");
      let payload: CreateStockDTO = {
        cylinder_brand: brand.code,
        cylinder_type: type?.code || "",
        quantity: data.full,
        emp_qty: data.empty,
        price: data.price,
      };
      if (oldStock) {
        const { price_with_deposit, price_with_tank, on_site_discount } =
          oldStock;
        payload = {
          ...payload,
          price_with_deposit,
          price_with_tank,
          on_site_discount,
        };
      }
      await StocksAPI.createStock(payload);
      refetchStocks();
      close();
    },
    [brand, close, isFormCompleted, oldStock, refetchStocks, toast, type?.code]
  );

  useEffect(() => {
    handleBrandOrTypeChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brand, type]);

  useEffect(() => {
    if (brand) {
      SweetAlert.showLoading();
      MasterAPI.fetchTypesByBrand(brand.code)
        .then((types) => {
          setTypesList(types);
          SweetAlert.close();
        })
        .catch(resolveErrorResponse);
    }
  }, [brand]);

  useEffect(() => {
    clearAllStates();
    if (isOpen) refetchBrands();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);
  return (
    <Dialog
      visible={isOpen}
      onHide={close}
      header="เพิ่มสินค้า"
      dismissableMask
      pt={{
        headerTitle: {
          className: "text-current",
        },
      }}
    >
      <Loading isLoading={isLoading || isValidating}>
        <div className="flex flex-col gap-4 max-w-[80vw]">
          <div className="flex items-center gap-6 p-6 sm:p-8 lg:p-12">
            {!isSmallThan400 &&
              (brand && type ? (
                <Image
                  src={`/assets/img/tanks/${brand.code}-${type.code}.png`}
                  alt={`${brand.code}-${type.code}`}
                  className="bg-white rounded-2xl object-contain"
                  height="140"
                  width="140"
                />
              ) : (
                <Image
                  className="bg-white rounded-2xl object-contain"
                  src={"/assets/img/placeholder.png"}
                  alt="placeholder"
                  height="140"
                  width="140"
                />
              ))}
            <InputGroup
              className={clsx(
                "input-group",
                "flex",
                "flex-grow",
                "flex-wrap",
                "gap-2"
              )}
            >
              <Controller
                control={control}
                name="brand"
                render={({ field: { name, onBlur } }) => (
                  <div>
                    <label htmlFor={name}>ยี่ห้อ:</label>
                    <Autocomplete<BrandOrTypeMasterData>
                      listOfHint={brandsList}
                      fieldToPick={["text", "code"]}
                      value={brand}
                      onChange={(e) => setValue("brand", e.value)}
                      field="text"
                      forceSelection
                      onBlur={onBlur}
                      name={name}
                      placeholder="ยี่ห้อ"
                      disabled={brandsList.length === 0}
                    />
                  </div>
                )}
              />
              <Controller
                control={control}
                name="type"
                render={({ field: { name, onBlur } }) => (
                  <div>
                    <label htmlFor={name}>ขนาดสินค้า:</label>
                    <Autocomplete<BrandOrTypeMasterData>
                      listOfHint={typesList}
                      fieldToPick={["text", "code"]}
                      value={type}
                      onChange={(e) => e.value && onTypeChange(e.value)}
                      field="text"
                      forceSelection
                      onBlur={onBlur}
                      name={name}
                      placeholder="ขนาด"
                      disabled={typesList.length === 0 || brand == null}
                    />
                  </div>
                )}
              />
              <Controller
                control={control}
                name="price"
                render={({ field: { onBlur, onChange, name } }) => (
                  <div>
                    <label htmlFor={name}>ราคา:</label>
                    <NumericInput
                      name={name}
                      onBlur={onBlur}
                      mode="currency"
                      currency="THB"
                      locale="th-TH"
                      min={0}
                      onChange={onChange}
                      placeholder="ราคา"
                      pt={inputPT}
                    />
                  </div>
                )}
              />
              <Controller
                control={control}
                name="full"
                render={({ field: { onBlur, onChange, name } }) => (
                  <div>
                    <label htmlFor={name}>ถังเต็ม:</label>
                    <NumericInput
                      name={name}
                      onBlur={onBlur}
                      min={0}
                      onChange={onChange}
                      placeholder="จำนวน"
                      pt={inputPT}
                    />
                  </div>
                )}
              />
              <Controller
                control={control}
                name="empty"
                render={({ field: { onBlur, onChange, name } }) => (
                  <div>
                    <label htmlFor={name}>ถังเปล่า:</label>
                    <NumericInput
                      name={name}
                      onBlur={onBlur}
                      min={0}
                      onChange={onChange}
                      placeholder="จำนวน"
                      pt={inputPT}
                    />
                  </div>
                )}
              />
            </InputGroup>
          </div>
          <div className="footer flex justify-around gap-2">
            <Button
              color="red"
              baseProps={{ className: "px-10" }}
              onClick={close}
            >
              ยกเลิก
            </Button>
            <Button
              baseProps={{ className: "px-10" }}
              onClick={handleSubmit(onSubmit)}
              disabled={!isFormCompleted}
            >
              ยกเลิก
            </Button>
          </div>
        </div>
      </Loading>
    </Dialog>
  );
};

export default AddStockDialog;

export interface Form {
  brand: BrandOrTypeMasterData | null;
  type: BrandOrTypeMasterData | null;
  full: number;
  empty: number;
  price: number;
}
const emptyForm: Form = {
  brand: null,
  type: null,
  full: 0,
  empty: 0,
  price: 0,
};

const inputPT = {
  root: {
    className: "!w-[120px]",
  },
  input: {
    root: {
      className: "w-[120px]",
    },
  },
};
