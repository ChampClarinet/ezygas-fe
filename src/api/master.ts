import { ApiResponse } from "@/types/general";
import axios from "./axios";
import { Menu, SubMenu, WeekdayDTO, Misc } from "@/types/misc";
import { UnauthorizedError } from "@/errors";

const BASE_URL_API = (process.env.NEXT_PUBLIC_URL_API || "") + "/api";

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

  fetchMenu: async () => {
    const path = "/master/menu/";
    return await axios.get<ApiResponse<MenuResponse>>(path);
  },

  fetchMenuServerside: async (token: string) => {
    const response = await fetch(BASE_URL_API + "/master/menu/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
    if (response.status >= 400) {
      throw new UnauthorizedError({
        message: "error fetching menu",
        status: response.status,
      });
    }
    const responseData: ApiResponse<MenuResponse> = await response.json();
    return responseData.data;
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
