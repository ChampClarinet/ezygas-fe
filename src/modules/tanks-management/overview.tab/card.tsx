import { FC, useCallback, useContext } from "react";
import clsx from "clsx";
import { Divider } from "primereact/divider";
import StocksAPI, { Stock } from "@/api/stock";
import Checkbox from "@/components/common/checkbox";
import SweetAlert from "@/utils/sweetalert";
import TanksManagementContext, { FormStockItem } from "../provider";
import { Image } from "primereact/image";
import NumericInput from "@/components/common/numericinput";
import { Controller } from "react-hook-form";

export interface CardProps {
  data: FormStockItem;
  checked: boolean;
  stock: Stock;
  index: number;
}
const Card: FC<CardProps> = ({ data, checked, stock, index }) => {
  const { stocksQuery, formProps } = useContext(TanksManagementContext);
  const { refetch } = stocksQuery!;

  const { control, setValue, reset, watch } = formProps!;

  const onDelete = useCallback(async () => {
    const { isConfirmed } = await SweetAlert.showConfirm({
      titleText: "ยืนยันการลบสินค้า",
      text: "ยืนยันที่จะลบสินค้าชนิดนี้หรือไม่",
    });
    if (!isConfirmed || !stock) return;
    SweetAlert.showLoading();
    await StocksAPI.updateStock({
      ...stock,
      is_active: false,
    });
    SweetAlert.close();
    refetch();
  }, [refetch, stock]);

  const onTickStock = useCallback(
    (checked: boolean) => {
      const { id } = data;
      const old = watch("toFill");
      if (checked) setValue("toFill", [...old, { id, quantity: 0 }]);
      else setValue("toFill", [...old.filter((s) => s.id != id)]);
    },
    [data, setValue, watch]
  );
  return (
    <div
      className={clsx(
        "stock-card",
        "flex",
        "flex-col",
        "justify-evenly",
        "py-4",
        "px-[1.75rem]",
        "bg-white",
        "flex-grow-0",
        "flex-shrink",
        "shadow-md",
        "rounded-2xl",
        "border",
        "border-solid",
        "border-gray-100",
        "max-w-[600px]"
      )}
    >
      <div className={clsx("flex", "justify-between", "items-center")}>
        <Checkbox
          checked={checked}
          onChange={(e) => onTickStock(e.checked || false)}
        />
        <div
          className={clsx(
            "header",
            "flex",
            "justify-between",
            "px-1",
            "gap-1",
            "items-center"
          )}
        >
          <span
            className={clsx("text-black", "text-[1.2em]", "font-bold", "pt-1")}
          >
            {`${stock.brand_text} ${stock.type_text}`}
          </span>
          <span
            className={clsx(
              "clickable",
              "text-red-700",
              "font-bold",
              "text-[1.5em]",
              "flex",
              "items-center"
            )}
            onClick={onDelete}
          >
            x
          </span>
        </div>
      </div>

      <Divider className="my-1" />

      <div className={clsx("body", "flex", "gap-2", "w-full")}>
        <Image
          src={`/assets/img/tanks/${stock.brand_code}-${stock.type_code}.png`}
          alt={`${stock.brand_text} ${stock.type_text}`}
          className={clsx(
            "max-w-[315px]",
            "object-contain",
            "my-auto",
            "flex-grow",
            "hidden",
            "sm:block"
          )}
        />

        <table className="border-collapse w-full sm:w-auto sm:ml-auto">
          <tbody>
            <tr>
              <td className={clsx(cellClasses)}>
                <span className={clsx(labelClasses)}>เต็ม:</span>
              </td>
              <td className={clsx(cellClasses)}>
                <Controller
                  control={control}
                  name={`items.${index}.full`}
                  render={({ field: { name }, fieldState: { isDirty } }) => (
                    <NumericInput
                      name={name}
                      value={watch(name)}
                      onValueChange={(e) => setValue(name, e.value || 0)}
                      pt={inputPT(isDirty)}
                      min={0}
                    />
                  )}
                />
              </td>
            </tr>
            <tr>
              <td className={clsx(cellClasses)}>
                <span className={clsx(labelClasses)}>เปล่า:</span>
              </td>
              <td className={clsx(cellClasses)}>
                <Controller
                  control={control}
                  name={`items.${index}.empty`}
                  render={({ field: { name }, fieldState: { isDirty } }) => (
                    <NumericInput
                      name={name}
                      value={watch(name)}
                      onValueChange={(e) => setValue(name, e.value || 0)}
                      pt={inputPT(isDirty)}
                      min={0}
                    />
                  )}
                />
              </td>
            </tr>
            <tr>
              <td className={clsx(cellClasses)}>
                <span className={clsx(labelClasses)}>ราคา:</span>
              </td>
              <td className={clsx(cellClasses)}>
                <Controller
                  control={control}
                  name={`items.${index}.price`}
                  render={({ field: { name }, fieldState: { isDirty } }) => (
                    <NumericInput
                      name={name}
                      value={watch(name)}
                      onValueChange={(e) => setValue(name, e.value || 0)}
                      pt={inputPT(isDirty)}
                      min={0}
                      mode="currency"
                      currency="THB"
                      locale="th-TH"
                    />
                  )}
                />
              </td>
            </tr>
            <tr>
              <td className={clsx(cellClasses)}>
                <span className={clsx(labelClasses)}>ราคา:</span>
              </td>
              <td className={clsx(cellClasses)}>
                <Controller
                  control={control}
                  name={`items.${index}.price`}
                  render={({ field: { name }, fieldState: { isDirty } }) => (
                    <NumericInput
                      name={name}
                      value={watch(name)}
                      onValueChange={(e) => setValue(name, e.value || 0)}
                      pt={inputPT(isDirty)}
                      min={0}
                      mode="currency"
                      currency="THB"
                      locale="th-TH"
                    />
                  )}
                />
              </td>
            </tr>
            <tr>
              <td className={clsx(cellClasses)}>
                <span className={clsx(labelClasses)}>ซื้อขาด:</span>
              </td>
              <td className={clsx(cellClasses)}>
                <Controller
                  control={control}
                  name={`items.${index}.pwt`}
                  render={({ field: { name }, fieldState: { isDirty } }) => (
                    <NumericInput
                      name={name}
                      value={watch(name)}
                      onValueChange={(e) => setValue(name, e.value || 0)}
                      pt={inputPT(isDirty)}
                      min={0}
                      mode="currency"
                      currency="THB"
                      locale="th-TH"
                    />
                  )}
                />
              </td>
            </tr>
            <tr>
              <td className={clsx(cellClasses)}>
                <span className={clsx(labelClasses)}>มัดจำ:</span>
              </td>
              <td className={clsx(cellClasses)}>
                <Controller
                  control={control}
                  name={`items.${index}.pwd`}
                  render={({ field: { name }, fieldState: { isDirty } }) => (
                    <NumericInput
                      name={name}
                      value={watch(name)}
                      onValueChange={(e) => setValue(name, e.value || 0)}
                      pt={inputPT(isDirty)}
                      min={0}
                      mode="currency"
                      currency="THB"
                      locale="th-TH"
                    />
                  )}
                />
              </td>
            </tr>
            <tr>
              <td className={clsx(cellClasses)}>
                <span className={clsx(labelClasses)}>ลดหน้าร้าน:</span>
              </td>
              <td className={clsx(cellClasses)}>
                <Controller
                  control={control}
                  name={`items.${index}.discount`}
                  render={({ field: { name }, fieldState: { isDirty } }) => (
                    <NumericInput
                      name={name}
                      value={watch(name)}
                      onValueChange={(e) => setValue(name, e.value || 0)}
                      pt={inputPT(isDirty)}
                      min={0}
                    />
                  )}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Card;

const labelClasses = [
  "flex",
  "items-center",
  "font-bold",
  "text-[1em]",
  "text-current",
  "mr-2",
];

const cellClasses = ["px-0", "py-2"];

const inputPT = (isDirty: boolean) => ({
  root: {
    className: clsx(isDirty && "border-red-700"),
  },
  input: {
    root: {
      className: ["!py-1", "!px-3", "max-w-[100px]"],
    },
  },
});
