import axios from "./axios";
import { ApiResponse } from "@/types/general";
import { UnauthorizedError } from "@/errors";
import { Time } from "@cantabile/date-helper";

const BASE_URL_API = (process.env.NEXT_PUBLIC_URL_API || "") + "/api";
const PATH = "/vendors/";

const VendorsAPI = {
  fetchVendors: async () => {
    const response = await axios.get<ApiResponse<Vendor[]>>(PATH);
    return response.data;
  },

  fetchMyVendorServerside: async (token: string) => {
    const response = await fetch(BASE_URL_API + PATH, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
    if (response.status >= 400)
      throw new UnauthorizedError({
        message: "error fetching vendor",
        status: response.status,
      });
    const responseData: ApiResponse<Vendor[]> = await response.json();
    return responseData.data[0];
  },

  fetchWorkTimeAPI: async () => {
    const data = await axios.get<WorkTimeResponse>(`/vendors/work_time/`);
    if (data == null) throw new Error("can't refresh");
    return data;
  },

  fetchDayClosesAPI: async () => {
    return await axios.get<ApiResponse<string[]>>(`/vendors/day_closes/`);
  },

  updateWorkTimeAPI: async (time: UpdateWorkTimeRequest) => {
    return await axios.post(`/vendors/work_time/`, time);
  },

  updateDayClosesAPI: async (days: string[]) => {
    return await axios.post(`/vendors/day_closes/`, { data: days });
  },

  updateVendorAPI: async (payload: UpdateVendorDTO) => {
    return await axios.post(`/vendors/`, payload);
  },
};

export default VendorsAPI;

export interface Vendor {
  id: number;
  name_en: string;
  name_th: string;
  tel: string;
  province: string;
  district: string;
  subdistrict: string;
  zipcode: string;
  is_active: boolean;
  service_charge: number;
  lat: string;
  long: string;
  premium_date_left: string | null;
  supporter: number;
  status: VendorStatus;
  status_text?: string;
  vendor_code: string;
  is_juristic: boolean;
  receipt_footer_message: string;
  tax_id: string | null;
  branch: number | null;
  last_login: string;
}

export type VendorStatus = "NM" | "PN" | "SP";

export interface WorkTime {
  openOn: Time;
  closeOn: Time;
}

export interface Address {
  subdistrict: string;
  district: string;
  province: string;
  zipcode: string;
  isInBangkok: boolean;
}

export interface UpdateVendorDTO {
  id: number;
  name_th: string;
  tel: string;
  service_charge: number;
  is_juristic: boolean;
  receipt_footer_message?: string;
  tax_id?: string;
  branch?: number;
}

export interface UpdateWorkTimeRequest {
  open_on: string;
  close_on: string;
}

export interface WorkTimeResponse {
  data: WorkTimeDTO;
}

export interface WorkTimeDTO {
  open_on: string;
  close_on: string;
}
