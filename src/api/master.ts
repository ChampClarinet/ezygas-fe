import { ApiResponse } from "@/types/general";
import axios from "./axios";
import { Menu, SubMenu, WeekdayDTO, Misc } from "@/types/misc";

const MasterAPI = {
  fetchBrandsList: async () => {
    const data = (
      await axios.get<ApiResponse<BrandOrTypeMasterData[]>>(
        "/stocks/exists_brands/"
      )
    ).data.data;
    return data;
  },

  fetchTypesByBrand: async (brand_code: string) => {
    const data = (
      await axios.get<ApiResponse<BrandOrTypeMasterData[]>>(
        "/stocks/exists_types/" + brand_code
      )
    ).data.data;
    return data;
  },

  fetchMisc: async (
    misc_name_code: string,
    order_by?: "text" | "value" | "seq_no"
  ) => {
    let params: object = {};
    if (order_by != null) params = { ...params, order_by };
    const data = (
      await axios.get<ApiResponse<Misc[]>>(`/master/misc/${misc_name_code}/`, {
        params,
      })
    ).data;
    return data.data;
  },

  fetchDaysListAPI: async (params?: MasterParams) => {
    const path = "/master/weekdays/";
    return await axios.get<ApiResponse<WeekdayDTO[]>>(path, { params });
  },

  fetchMenu: async (overrideToken?: string) => {
    const path = "/master/menu/";
    return await axios.get<ApiResponse<MenuResponse>>(path, {
      data: overrideToken || undefined,
    });
  },
};

export default MasterAPI;

export interface MasterParams {
  language_code?: string;
  order_by?: string;
}
export interface MenuResponse {
  main_menu: Menu[];
  sub_menu: SubMenu[];
  count?: number;
  status?: string;
}
export interface BrandOrTypeMasterData {
  code: string;
  text: string;
}
