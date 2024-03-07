import { FC, useContext } from "react";
import clsx from "clsx";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Employee } from "@/api/employee";
import { nullifyEmptyStrings } from "@/utils/object";

import EmployeesListPageContext from "./provider";

export interface ListProps {
  onOpenInfo: (id?: number) => unknown;
}
const List: FC<ListProps> = ({ onOpenInfo }) => {
  const context = useContext(EmployeesListPageContext);
  const { onDeleteEmployee, employeesQuery } = context;
  const list = employeesQuery!.filteredEmployees;

  return (
    <DataTable
      value={nullifyEmptyStrings(list)}
      resizableColumns
      size="large"
      stripedRows
      dataKey="id"
      scrollable
      scrollHeight="flex"
      frozenWidth="100px"
      rowClassName={(emp: Employee) => {
        const index = list.findIndex((e) => e.id == emp.id);
        if (index % 2 === 0) return "!bg-gray-100 text-gray-700";
      }}
    >
      {[
        {
          field: "name",
          header: "ชื่อ",
        },
        {
          field: "tel",
          header: "โทร",
        },
        {
          field: "address",
          header: "ที่อยู่",
        },
        {
          body: (emp: Employee) => (
            <div className="flex gap-4 justify-evenly items-center">
              <i
                className={clsx(buttonClasses, "pi", "pi-pencil")}
                onClick={() => onOpenInfo(emp.id)}
              />
              <i
                className={clsx(buttonClasses, "text-red", "pi pi-trash")}
                onClick={() => onDeleteEmployee(emp)}
              />
            </div>
          ),
        },
      ].map((props, i) => (
        <Column {...props} key={i} />
      ))}
    </DataTable>
  );
};

export default List;

const buttonClasses = clsx(
  "cursor-pointer",
  "hover:scale-90",
  "transition-transform",
  "duration-300",
  "text-xl"
);
