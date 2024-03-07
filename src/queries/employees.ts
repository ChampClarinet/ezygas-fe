import { useCallback, useEffect, useMemo, useState } from "react";
import EmployeeAPI, { Employee } from "@/api/employee";
import { useQuery } from ".";

export interface UseEmployeesList {
  workToday?: boolean;
}
export const useEmployeesList = ({ workToday }: UseEmployeesList = {}) => {
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState<string>("");

  const { data, error, isLoading, isValidating, refetch } = useQuery<
    Employee[]
  >({
    fetcher: async () => await EmployeeAPI.fetchEmployeesList({ workToday }),
  });

  const filterFn = useCallback((data: Employee, keyword: string) => {
    const { address, name, tel, wages } = data;
    return (
      name.includes(keyword) ||
      address.includes(keyword) ||
      tel.includes(keyword) ||
      wages.toString().includes(keyword)
    );
  }, []);

  useEffect(() => {
    const filtered = data?.filter((emp) => filterFn(emp, search)) || [];
    setFilteredEmployees(filtered);
  }, [data, filterFn, search]);

  const isNoData = useMemo(() => !data?.length, [data?.length]);

  const isResultEmpty = useMemo(
    () => !isNoData && !filteredEmployees.length,
    [filteredEmployees.length, isNoData]
  );

  return {
    employeesList: data || [],
    filteredEmployees,
    isNoData,
    isResultEmpty,
    refetch,
    search,
    setSearch,
    error,
    isValidating,
    isLoading,
  };
};

export const useEmployee = (id?: number) => {
  const fetchFn = useCallback(async () => {
    if (!id || id === -1) return null;
    return await EmployeeAPI.fetchEmployeeById(id);
  }, [id]);

  const { data, error, isLoading, isValidating, refetch } = useQuery<Employee>({
    fetcher: fetchFn,
  });

  return {
    employee: data,
    error,
    isLoading,
    isValidating,
    refetch,
  };
};
