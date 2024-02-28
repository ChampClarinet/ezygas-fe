import { ApiResponse } from "@/types/general";
import axios from "./axios";
import { Stock } from "./stock";

const rootPath = "/fill/";

const FillAPI = {
  fetchFillsList: async (query?: FetchFillsListParams) => {
    const response = await axios.get<ApiResponse<Fill[]>>(rootPath, {
      params: query,
    });

    return response.data.data;
  },

  /**
   * payload
   * [stockId]: quantity --> Stock id to send. Can be multiple stocks, just separate in payload
   */
  createFill: async (payload: CreateFillItemDTO) => {
    const response = await axios.post(rootPath, payload);
    return response.data;
  },

  /**
   * payload
   * [brand_name]: number --> Price on filling each brand. Can be multiple brand, just separate in payload
   * time_stamp: string --> Timestamp on this finish occur.
   * transport_price: number --> Cost on transport to fill and come back.
   */
  finishFill: async (fillId: number, payload: FinishFillDTO) => {
    const response = await axios.post(`${rootPath}${fillId}/done/`, payload);
    return response.data;
  },
};
export default FillAPI;

export interface Fill {
  id: number;
  status: number;
  filling: FillingDetail[];
  cost: string; //? ex. pattern --> PTT:200,transport_price:0,
  time_stamp: string | null; //? if not completed time_stamp must be null
  createdAt: string;
  updatedAt: string;
}

export interface FillingDetail {
  id: number;
  stock: Stock;
  quantity: number;
}

export interface FetchFillsListParams {
  status?: FillStatusCode;
}

export interface CreateFillItemDTO {
  [stockId: number]: number;
}

export interface FinishFillDTO {
  time_stamp: string;
  transport_price: number;
  [brand: string]: number | string; //? Gas fill Price on each brand.
}

export enum FillStatus {
  WAIT_FOR_FILLING = 1,
  FINISHED = 2,
}

export enum FillStatusCode {
  WAIT_FOR_FILLING = "WF",
  FINISHED = "CP",
}
