import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
} from "react";
import EmployeeAPI, { Employee } from "@/api/employee";
import { useEmployeesList } from "@/queries/employees";
import SweetAlert from "@/utils/sweetalert";
import { Nullable } from "@/types/general";

export interface EmployeesListPageContextType {
  employeesQuery: Nullable<ReturnType<typeof useEmployeesList>>;
  onDeleteEmployee: (employee: Employee) => unknown;
}

const EmployeesListPageContext = createContext<EmployeesListPageContextType>({
  employeesQuery: null,
  onDeleteEmployee: () => {},
});

export const EmployeesListPageContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const employeesQuery = useEmployeesList();
  const { refetch } = employeesQuery;

  const onDeleteEmployee = useCallback(async (emp: Employee) => {
    const { isConfirmed } = await SweetAlert.showConfirm({
      text: `ยืนยันที่จะลบคนส่ง' ${emp.name}`,
      showCancelButton: true,
      confirmButtonText: "ลบ",
    });
    if (isConfirmed) {
      SweetAlert.showLoading();
      await EmployeeAPI.deleteEmployee(emp.id);
      SweetAlert.close();
    }
  }, []);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <EmployeesListPageContext.Provider
      value={{ employeesQuery, onDeleteEmployee }}
    >
      {children}
    </EmployeesListPageContext.Provider>
  );
};

export default EmployeesListPageContext;
