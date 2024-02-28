import { ApiResponse } from "@/types/general";
import axios from "./axios";

const rootPath = "/stocks/";

const StocksAPI = {
  isStockExists: async (brand_code: string, type_code: string) => {
    const response = await axios.post<{ data: Stock }>(
      `${rootPath}past_stock/`,
      { brand_code, type_code }
    );
    if (response.status === 200) return response.data.data;
    else return null;
  },

  fetchExistsStock: async () => {
    const response = await axios.get<ApiResponse<ExistsStock[]>>(
      `${rootPath}exists_stock/`
    );
    return response.data.data;
  },

  fetchStocksList: async () => {
    const response = await axios.get<ApiResponse<Stock[]>>(rootPath);
    return response.data.data;
  },

  deleteStock: async (stock_id: number) => {
    await axios.post(`${rootPath}${stock_id}/delete/`, null);
    return true;
  },

  createStock: async (payload: CreateStockDTO) => {
    const response = await axios.post(rootPath, payload);
    return response.data ? true : false;
  },

  updateStock: async (payload: Stock) => {
    await axios.post(`${rootPath}${payload.id}/`, payload);
  },
};

export default StocksAPI;

export interface Stock {
  id: number;
  cylinder_brand: string;
  brand_code: string;
  brand_text: string;
  cylinder_type: string;
  type_code: string | number;
  type_text: string;
  quantity: number;
  price: number;
  price_with_tank: number;
  price_with_deposit: number;
  on_site_discount: number;
  emp_qty: number;
  filling_qty: number;
  is_active: boolean;
}

export interface ExistsStock {
  id: number;
  cylinder_brand: string;
  cylinder_type: string;
}

export interface CreateStockDTO {
  cylinder_brand: string;
  cylinder_type: string;
  quantity: number;
  emp_qty: number;
  price: number;
  price_with_tank?: number;
  price_with_deposit?: number;
  on_site_discount?: number;
}
