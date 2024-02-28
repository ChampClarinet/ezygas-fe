import axios from "./axios";
import { ApiResponse } from "@/types/general";
import { Stock } from "./stock";
import { Customer } from "./customer";

const rootPath = "/personal-prices/";

const PersonalPriceAPI = {
  fetchPersonalPricesList: async () => {
    return await axios.get<ApiResponse<PersonalPrice[]>>(rootPath);
  },

  addNewPersonalPrice: async (name: string) => {
    const path = rootPath;
    return await axios.post<ApiResponse<PersonalPrice>>(path, { name });
  },

  addOrRemoveCustomerInPersonalPrice: async (
    personalPriceId: number,
    customerId: number
  ) => {
    const path = `${rootPath}add-customer/`;
    const payload = {
      customer: customerId,
      personal_price: personalPriceId,
    };
    return await axios.post(path, payload);
  },

  fetchCustomersListFromPersonalPrice: async (personalPriceId: number) => {
    const path = `${rootPath}${personalPriceId}/customers/`;
    const response = await axios.get<ApiResponse<Customer[]>>(path);
    return response.data;
  },

  updatePersonalPrices: async (
    personalPriceId: number,
    payload: UpdatePersonalPricesRequestBody
  ) => {
    const path = `${rootPath}${personalPriceId}/`;
    const response = await axios.post<ApiResponse<UpdatePersonalPriceResponse>>(
      path,
      payload
    );
    return response.data.data;
  },

  fetchPersonalPricesByCustomer: async (customerId: number) => {
    const path = `/customers/${customerId}/personal-prices/`;
    const response = await axios.get<ApiResponse<PersonalPrice[]>>(path);
    return response.data.data;
  },
  
  deletePersonalPrice: async (id: number) => {
    const path = `${rootPath}${id}/delete/`;
    const response = await axios.post(path);
    return response.data;
  },
};

export default PersonalPriceAPI;

export interface UpdatePersonalPricesRequestBody {
  name?: string;
  stocks?: {
    stock_id: number;
    diff: number;
  }[];
}
export interface UpdatePersonalPriceResponse {
  personal_price_id: number;
  stocks: {
    stock_id: number;
    diff: number;
  }[];
}

export interface PersonalPriceDetail {
  stock: Stock;
  diff: number;
}
export interface PersonalPrice {
  id: number;
  name: string;
  prices: PersonalPriceDetail[];
}
