"use client";
import { FC } from "react";

import { EmployeesListPageContextProvider } from "./provider";
import EmployeesListContent from "./content";

const EmployeesListModule: FC = () => {
  return (
    <EmployeesListPageContextProvider>
      <EmployeesListContent />
    </EmployeesListPageContextProvider>
  );
};

export default EmployeesListModule;
