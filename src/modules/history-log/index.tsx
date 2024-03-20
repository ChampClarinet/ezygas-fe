"use client";
import { FC } from "react";
import { HistoryLogProvider } from "./provider";
import HistoryLog from "./history-log";

const HistoryLogModule: FC = () => {
  return (
    <HistoryLogProvider>
      <HistoryLog />
    </HistoryLogProvider>
  );
};

export default HistoryLogModule;
