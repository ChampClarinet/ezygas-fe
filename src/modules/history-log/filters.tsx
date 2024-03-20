import { FC, useCallback, useContext, useMemo } from "react";
import clsx from "clsx";
import { ToggleButton } from "primereact/togglebutton";
import DateHelper from "@cantabile/date-helper";
import BalanceAPI, { BalanceType } from "@/api/balance";
import Button from "@/components/common/button";
import Calendar from "@/components/common/calendar";
import { resolveErrorResponse } from "@/utils/error";
import { parseToCSV } from "@/utils/parser";
import SweetAlert from "@/utils/sweetalert";

import HistoryLogContext from "./provider";

const Filters: FC = () => {
  const context = useContext(HistoryLogContext);
  const {
    refetch,
    setFrom,
    setTo,
    setType,
    setCompleteOnly,
    from,
    to,
    type,
    completeOnly,
    isLoading,
    isValidating,
  } = context;

  const loading = useMemo(
    () => isLoading || isValidating,
    [isLoading, isValidating]
  );

  const onIncomeClick = useCallback(() => {
    let newType: BalanceType;
    switch (type) {
      case "income":
        newType = "null";
        break;
      case "expenses":
        newType = undefined;
        break;
      case "null":
        newType = "income";
        break;
      case undefined:
        newType = "expenses";
        break;
      default:
        newType = undefined;
        break;
    }
    setType(newType);
  }, [setType, type]);

  const onExpensesClick = useCallback(() => {
    let newType: BalanceType;
    switch (type) {
      case "income":
        newType = undefined;
        break;
      case "expenses":
        newType = "null";
        break;
      case "null":
        newType = "expenses";
        break;
      case undefined:
        newType = "income";
        break;
      default:
        newType = undefined;
        break;
    }
    setType(newType);
  }, [setType, type]);

  const handleDownloadCSV = useCallback(async () => {
    if (loading) return;
    let csvData: string[][] = [];
    //? Fetch
    SweetAlert.showLoading();
    try {
      const response = await BalanceAPI.fetchCSV({
        from: from.joinDateTuple(),
        to: to.joinDateTuple(),
        type,
        completed_only: completeOnly,
      });
      if (response === null) {
        await SweetAlert.showError({
          titleText: undefined,
          icon: "warning",
          text: "ไม่มีข้อมูลในช่วงเวลาที่เลือก",
        });
        return null;
      }
      csvData = response.data;
    } catch (error) {
      resolveErrorResponse(error);
    }
    SweetAlert.close();

    //? Download
    const filename = `balance-log (${from} to ${to}).csv`;
    return parseToCSV(csvData, filename);
  }, [completeOnly, from, loading, to, type]);

  return (
    <div
      className={clsx(
        "filters-group",
        "flex",
        "select-none",
        "py-4",
        "items-center",
        "gap-x-1",
        "gap-y-2",
        "max-w-full",
        "flex-wrap"
      )}
    >
      <Calendar
        value={from.getDate()}
        onChange={(e) => e.value != null && setFrom(new DateHelper(+e.value))}
        placeholder="เลือกวัน"
        pt={calendarPT}
      />
      <span
        className={clsx("text-[1em]", "text-center", "font-bold", "text-black")}
      >
        ถึง
      </span>
      <Calendar
        value={to.getDate()}
        onChange={(e) => e.value != null && setTo(new DateHelper(+e.value))}
        placeholder="เลือกวัน"
      />
      <ToggleButton
        checked={completeOnly}
        onChange={(e) => setCompleteOnly(e.value)}
        onLabel="รวมรายการไม่สำเร็จ"
        offLabel="ซ่อนรายการไม่สำเร็จ"
        pt={{
          root: {
            className: clsx(
              "mt-1",
              "rounded-full",
              "border-2",
              "border-solid",
              "border-current",
              "font-bold",
              completeOnly
                ? [
                    "bg-current",
                    "text-white",
                    "hover:bg-blue-800",
                    "hover:border-blue-800",
                  ]
                : ["bg-transparent", "text-current", "hover:bg-blue-700/20"]
            ),
          },
        }}
      />
      <ToggleButton
        checked={type === "income" || type === undefined}
        onChange={onIncomeClick}
        onLabel="แสดงรายรับ"
        offLabel="ซ่อนรายรับ"
        pt={{
          root: {
            className: clsx(
              "mt-1",
              "rounded-full",
              "border-2",
              "border-solid",
              "border-green-600",
              "font-bold",
              type === "income" || type === undefined
                ? [
                    "bg-green-600",
                    "text-white",
                    "hover:bg-green-700",
                    "hover:border-green-700",
                  ]
                : ["bg-transparent", "text-green-600", "hover:bg-green-400/20"]
            ),
          },
        }}
      />
      <ToggleButton
        checked={type === "expenses" || type === undefined}
        onChange={onExpensesClick}
        onLabel="แสดงรายจ่าย"
        offLabel="ซ่อนรายจ่าย"
        pt={{
          root: {
            className: clsx(
              "mt-1",
              "rounded-full",
              "border-2",
              "border-solid",
              "border-red-700",
              "font-bold",
              type === "expenses" || type === undefined
                ? [
                    "bg-red-700",
                    "text-white",
                    "hover:bg-red-600",
                    "hover:border-red-600",
                  ]
                : ["bg-transparent", "text-red-700", "hover:bg-red-500/20"]
            ),
          },
        }}
      />
      <Button baseProps={{ className: "btn-csv" }} onClick={handleDownloadCSV}>
        พิมพ์รายงาน
      </Button>
    </div>
  );
};

export default Filters;

const calendarPT = {
  input: {
    root: {
      className: "rounded-xl font-bold",
    },
  },
};
