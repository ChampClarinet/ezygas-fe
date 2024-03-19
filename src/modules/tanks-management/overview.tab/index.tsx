import { FC, useContext, useMemo } from "react";
import clsx from "clsx";
import { DataView } from "primereact/dataview";
import { Image } from "primereact/image";
import { useModalState } from "@cantabile/hooks";
import Loading from "@/components/common/loading";

import TanksManagementContext, { FormStockItem } from "../provider";
import Card from "./card";
import SendToFillDialog from "./send-to-fill.dialog";

const OverviewTab: FC = () => {
  const context = useContext(TanksManagementContext);
  const { formProps, stocks, stocksQuery } = context;
  const { isValidating } = stocksQuery!;

  const { state: fillOverlayOpen, close, open } = useModalState();

  const {
    watch,
    formState: {},
  } = formProps!;

  const stf = watch("toFill");

  const shouldShowSideButton = useMemo(() => stf.length > 0, [stf]);

  return (
    <div className={clsx("tab-overview", "flex", "items-start")}>
      <Loading isLoading={isValidating}>
        <DataView
          emptyMessage={
            stocks.length > 0 && watch("items").length <= 0
              ? "ไม่มีรายการ"
              : "ยังไม่มีข้อมูล"
          }
          pt={{
            root: {
              className: "w-full max-w-full",
            },
            grid: {
              className: "gap-4 !flex flex-wrap justify-evenly",
            },
          }}
          layout="grid"
          value={watch("items")}
          itemTemplate={(stock: FormStockItem) => {
            const isTicked = watch("toFill").some(({ id }) => id == stock.id);
            const index = watch("items").findIndex((s) => s.id == stock.id);
            const st = stocks.find((s) => s.id == stock.id);
            if (!st) return <></>;
            return (
              <Card
                data={stock}
                checked={isTicked}
                key={stock.id}
                stock={st}
                index={index}
              />
            );
          }}
        />
        <SendToFillDialog close={close} isOpen={fillOverlayOpen} />
        <div
          className={clsx(
            "bg-current",
            "p-2",
            "rounded-xl",
            "flex",
            "justify-center",
            "items-center",
            "fixed",
            "bottom-[40%]",
            shouldShowSideButton ? "left-[calc(100%_-_60px)]" : "left-[100%]",
            "w-[60px]",
            "h-[70px]",
            "z-[1000]",
            "clickable",
            "transition-all",
            "duration-300"
          )}
          onClick={open}
        >
          <Image
            className="sidebar-icon"
            src="/assets/img/white_cylinder.svg"
            alt="fill"
          />
        </div>
      </Loading>
    </div>
  );
};

export default OverviewTab;
