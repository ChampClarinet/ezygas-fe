import { FC, useContext, useEffect } from "react";
import clsx from "clsx";
import { Divider } from "primereact/divider";
import PageHeader from "@/components/common/pageheader";

import Filters from "./filters";
import HistoryLogContext from "./provider";

const HistoryLog: FC = () => {
  const { initialize } = useContext(HistoryLogContext);
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
