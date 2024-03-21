import { FC, useContext, useEffect, useMemo } from "react";
import clsx from "clsx";
import { Divider } from "primereact/divider";
import { Balance } from "@/api/balance";
import PageHeader from "@/components/common/pageheader";

import Filters from "./filters";
import HistoryLogContext from "./provider";

const HistoryLog: FC = () => {
  const { initialize, balancesList, typeCodes } = useContext(HistoryLogContext);

  const balanceMap = useMemo(() => {
    const map = new Map<string, Balance[]>();
    balancesList.forEach((balance) => {
      map.set(balance.date, balance.list);
    });
    return map;
  }, [balancesList]);

  useEffect(() => {
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      className={clsx(
        "balance-log",
        "flex",
        "flex-col",
        "flex-grow",
        "relative"
      )}
    >
      <PageHeader name="ประวัติรายรับรายจ่าย" />
      <Filters />
      <Divider />
    </div>
  );
};

export default HistoryLog;
