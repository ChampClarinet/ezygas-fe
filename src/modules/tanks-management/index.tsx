"use client";
import { FC } from "react";

import Content from "./content";
import { TanksManagementProvider } from "./provider";

const TanksManagementModule: FC = () => {
  return (
    <TanksManagementProvider>
      <Content />
    </TanksManagementProvider>
  );
};

export default TanksManagementModule;
