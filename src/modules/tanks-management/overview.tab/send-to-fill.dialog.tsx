import { FC, useCallback, useContext } from "react";
import clsx from "clsx";
import { Sidebar } from "primereact/sidebar";
import FillAPI, { CreateFillItemDTO } from "@/api/fill";
import Button from "@/components/common/button";
import NumericInput from "@/components/common/numericinput";
import { useToastContext } from "@/hooks/toast";
import SweetAlert from "@/utils/sweetalert";

import TanksManagementContext from "../provider";
import { sumField } from "@/utils/numbers";

export interface SendToFillDialogProps {
  isOpen: boolean;
  close: () => unknown;
}
const SendToFillDialog: FC<SendToFillDialogProps> = ({ close, isOpen }) => {
  const { formProps, stocks, stocksQuery } = useContext(TanksManagementContext);
  const { watch, setValue } = formProps!;

  const stf = watch("toFill");
  const count = sumField(stf, "quantity");

  const toast = useToastContext();

  const onSetStockToFill = useCallback(
    (id: number, newQuantity: number) => {
      const stf = watch("toFill");
      const target = stocks.find((s) => s.id == id);

      const index = stf.findIndex((s) => s.id == id);
      const isNotFound = index < 0;
      const quantity =
        (target?.emp_qty || 0) < +newQuantity
          ? target?.emp_qty || 0
          : newQuantity;
      if (isNotFound) stf.push({ id, quantity });
      else stf[index] = { ...stf[index], quantity };

      setValue("toFill", stf);
    },
    [setValue, stocks, watch]
  );

  const handleCreateFill = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (count <= 0) {
        return toast.showToast({
          severity: "warn",
          content: "ยังไม่มีถังเปล่าที่เลือกไปส่งเติม",
        });
      }

      const { isConfirmed } = await SweetAlert.showConfirm({
        text: `ยืนยันการส่งเติม ${count} ถัง`,
      });
      if (!isConfirmed) return;

      const payload: CreateFillItemDTO = stf.reduce(
        (pl: CreateFillItemDTO, { id, quantity }) => {
          if (quantity > 0) pl[id] = quantity;
          return pl;
        },
        {}
      );

      if (Object.keys(payload).length) {
        SweetAlert.showLoading();
        await FillAPI.createFill(payload);
        SweetAlert.close();
        toast.showToast({
          severity: "success",
          content: "ส่งเติมสำเร็จ",
        });
        stocksQuery?.refetch();
        close();
      }
    },
    [count, stf, toast, stocksQuery, close]
  );

  return (
    <Sidebar
      visible={isOpen}
      position="right"
      onHide={close}
      header={<h2>รายการส่งเติม</h2>}
    >
      <div className={clsx("flex", "flex-col", "gap-4", "items-center")}>
        {stf.map(({ id, quantity }) => {
          const { brand_text, type_text, emp_qty } = stocks.find(
            (s) => s.id == id
          )!;
          return (
            <div key={id} className="item-row grid grid-cols-3 relative">
              <span className="text-[1em] flex items-center">{`${brand_text} ${type_text}`}</span>
              <NumericInput
                value={quantity}
                onChange={(e) => onSetStockToFill(id, e.value || 0)}
                inputMode="text"
                min={0}
                max={emp_qty}
              />
              <span className="text-[1em] flex items-center justify-end">
                ถัง
              </span>
            </div>
          );
        })}

        <div className="flex justify-center w-full">
          <Button onClick={handleCreateFill} disabled={count <= 0}>
            ส่งเติม
          </Button>
        </div>
      </div>
    </Sidebar>
  );
};

export default SendToFillDialog;
