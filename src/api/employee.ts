import axios from "./axios";
import { ApiResponse } from "@/types/general";

const rootPath = "/employees/";

export interface FetchEmployeesListParams {
  workToday?: boolean;
}
const EmployeeAPI = {
  fetchEmployeesList: async (params?: FetchEmployeesListParams) => {
    const response = await axios.get<ApiResponse<Employee[]>>(rootPath, {
      params,
    });
    return response.data.data.filter((e) => !e.deletedAt);
  },

  fetchEmployeeById: async (employeeId: number) => {
    const response = await axios.get<ApiResponse<Employee>>(
      `${rootPath}${employeeId}/`
    );
    return response.data.data;
  },

  updateTodayEmployeesAPI: async (employeeIds: number[]) => {
    const payload = {
      employees: employeeIds,
    };
    await axios.post(`${rootPath}today/`, payload);
  },

  createEmployee: async (payload: CreateEmployeeDTO) => {
    await axios.post(rootPath, payload);
  },

  updateEmployee: async (payload: UpdateEmployeeDTO) => {
    const { id } = payload;
    await axios.post(`${rootPath}${id}/`, payload);
  },

  deleteEmployee: async (id: number) => {
    await axios.post(`${rootPath}${id}/delete/`);
  },
};

export default EmployeeAPI;

export interface Employee {
  createdAt: string;
  updatedAt: string;
  id: number;
  name: string;
  tel: string;
  address: string;
  wages: number;
  deletedAt?: string;
  history: EmployeeWorkHistory[];
}

export interface EmployeeWorkHistory {
  id: number;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEmployeeDTO {
  name: string;
  tel: string;
  address: string;
  wages: number;
}

export interface UpdateEmployeeDTO extends CreateEmployeeDTO {
  id: number;
}
