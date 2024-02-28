import { ApiResponse, CreatedUpdatedAt, TimeString } from "@/types/general";
import axios from "./axios";

export interface FixCost extends CreatedUpdatedAt {
  id: number;
  name: string;
  amount: number;
  date_time: TimeString;
}

export interface CreateFixCostDTO {
  name: string;
  amount: number;
  date_time: TimeString;
}

const rootPath = "/fixcost/";

const FixCostAPI = {
  fetchFixCostsList: async () => {
    const response = await axios.get<ApiResponse<FixCost[]>>(rootPath);
    return response.data.data;
  },

  createNewFixCost: async (payload: CreateFixCostDTO) => {
    await axios.post(rootPath, payload);
  },
};

export default FixCostAPI;