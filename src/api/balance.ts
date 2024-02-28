import { ApiResponse } from "@/types/general";
import axios from "./axios";

const rootPath = "/balance";
const BalanceAPI = {
  fetchBalance: async (params?: GetBalanceParams) => {
    const response = await axios.get<ApiResponse<BalanceResponse>>(
      `${rootPath}/`,
      {
        params,
      }
    );
    return response.data;
  },

  fetchCSV: async (params?: GetBalanceParams) => {
    const response = await axios.get<BalanceCSVResponse>(`${rootPath}/csv/`, {
      params,
    });

    if (response.status == 204) return null;

    return response.data;
  },
};

export default BalanceAPI;

export type BalanceType =
  /**
   * Get only income
   */
  | "income"
  /**
   * Get only expenese
   */
  | "expenses"
  /**
   * Not get nor expense or income (nothing)
   */
  | "null"
  /**
   * No filter, get all
   */
  | undefined;
export interface GetBalanceParams {
  type: BalanceType;
  completed_only?: boolean;
  /**
   * YYYY-MM-DD
   */
  from: string;
  /**
   * YYYY-MM-DD
   */
  to: string;
}

export interface Balance {
  id: number;
  type: "ORDER" | "FIXCOST" | "FILL";
  description: string | null;
  details: string[][];
  /**
   * Name of associate employee
   */
  employee: string | null;
  balance: number;
  date: string;
  timestamp: string;
  /**
   * Exist only ORDER type
   */
  doc_no?: string | null;
  status?: string | null;
  payment_type?: string;
  remarks: string | null;
}

export interface BalanceGroupedByDate {
  date: string;
  list: Balance[];
}

export interface BalanceResponse {
  data: BalanceGroupedByDate[];
  type_codes: (string | number)[];
}

export interface BalanceCSVResponse {
  data: string[][];
  from: string;
  to: string;
  count: number;
}
