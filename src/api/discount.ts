import axios from "./axios";
import { ApiResponse } from "@/types/general";

const rootPath = "/discounts";

export const DiscountAPI = {
  fetchDiscountsList: async () => {
    const response = await axios.get<ApiResponse<Discount[]>>(`${rootPath}/`);
    return response.data.data;
  },

  createDiscount: async (payload: CreateDiscountDTO) => {
    await axios.post(`${rootPath}/`, payload);
    return true;
  },

  updateDiscount: async (payload: Discount) => {
    await axios.post(`${rootPath}/${payload.id}/`, payload);
    return true;
  },
};

export interface CreateDiscountDTO {
  /**
   * Discount value from actual price.
   */
  discount_price: number;
  /**
   * Minimum base price to allow to use this discount.
   */
  maximum_price: number;
  /**
   * Discount label
   */
  name_th: string;
}

export interface Discount extends CreateDiscountDTO {
  id: number;
  is_active: boolean;
}
