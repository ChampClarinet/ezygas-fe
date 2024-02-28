import axios from "./axios";
import { ApiResponse } from "@/types/general";

const baseURL = "/location";

const LocationAPI = {
  fetchProvinces: async () => {
    const data = (
      await axios.get<ApiResponse<Location[]>>(`${baseURL}/provinces/`)
    ).data;
    return data.data;
  },

  fetchDistricts: async (provinceId?: number) => {
    let path = baseURL;
    if (provinceId) path += `/districts/${provinceId}/`;
    return (await axios.get<ApiResponse<Location[]>>(path)).data.data;
  },

  fetchSubdistricts: async (districtId?: number) => {
    let path = baseURL;
    if (districtId) path += `/subdistricts/${districtId}/`;
    return (await axios.get<ApiResponse<Subdistrict[]>>(path)).data.data;
  },
};

export default LocationAPI;

export interface Location {
  id: number;
  name_th: string;
}

export interface Subdistrict extends Location {
  zipcode: string;
}
