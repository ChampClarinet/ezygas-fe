import axios from "./axios";
import { ApiResponse } from "@/types/general";

export interface FetchCustomerParams {
  with_personal_price?: boolean;
  no_tagged?: boolean;
  with_pending_tank?: boolean;
  active?: boolean;
  tel?: string;
}

const rootPath = "/customers/";
const CustomerAPI = {
  fetchCustomer: async (customerId: number, params?: FetchCustomerParams) => {
    const response = await axios.get<ApiResponse<Customer>>(
      `${rootPath}${customerId}/`,
      { params }
    );
    return response.data.data;
  },

  fetchCustomersList: async (params?: FetchCustomerParams) => {
    const response = await axios.get<ApiResponse<Customer[]>>(rootPath, {
      params,
    });
    return response.data.data;
  },

  updateCustomer: async (id: number, payload: UpdateCustomerPayload) => {
    await axios.post(rootPath + id + "/", payload);
    return true;
  },

  createCustomer: async (payload: CreateCustomerPayload) => {
    await axios.post(rootPath, payload);
    return true;
  },

  deleteCustomer: async (customer_code: string) => {
    await axios.post(rootPath + "delete/", { customer_code });
    return true;
  },
};

export default CustomerAPI;

export interface Customer {
  id: number;
  name: string;
  tel: string;
  address: string;
  landmark: string;
  is_active: boolean;
  customer_code: string;
  pending_tank: PendingTank[];
  personal_price: {
    id: number;
    name: string;
  }[];
  is_juristic?: boolean;
  tax_id?: string;
  branch?: string;
  banned_reason?: string;
}

export interface PendingTank {
  id: number;
  stock_id: number | string;
  cylinder_brand: string;
  cylinder_type: string;
  quantity: number;
}

export interface PendingTankApiPayload {
  stock_id: number;
  quantity: number;
}

export interface UpdatePendingTankPayload {
  returns: PendingTankApiPayload[];
  update_to_stock: boolean;
}

export interface CreateCustomerPayload {
  name: string;
  tel: string;
  is_active: boolean;
  address: string;
  landmark: string;
  is_juristic: boolean;
  tax_id?: string;
  branch?: string;
  personal_price_id?: number;
}

export interface UpdateCustomerPayload extends CreateCustomerPayload {
  customer_code: string;
  banned_reason?: string;
}

export interface POSPayload {
  isAnonymous: boolean;
  customer: Customer;
}
