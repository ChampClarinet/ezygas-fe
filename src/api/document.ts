import axios from "./axios";
import {
  DeliverNoteTemplateData,
  ReceiptTemplateData,
  TaxInvoiceTemplateData,
} from "@/types/template";
import { ApiResponse } from "@/types/general";

const rootPath = "/documents/";

const DocumentAPI = {
  fetchDeliverNote: async (docNoList: string[]) => {
    const response = await axios.post<ApiResponse<DeliverNoteTemplateData[]>>(
      `${rootPath}deliver-order/`,
      { orders: docNoList }
    );
    if (response.status === 204 || response.data == null) return [];
    return response.data.data;
  },
  fetchTaxInvoice: async (docNoList: string[]) => {
    const response = await axios.post<ApiResponse<TaxInvoiceTemplateData[]>>(
      `${rootPath}tax-invoice/`,
      { orders: docNoList }
    );
    if (response.status === 204 || response.data == null) return [];
    return response.data.data;
  },
  fetchReceipt: async (docNoList: string[]) => {
    const response = await axios.post<ApiResponse<ReceiptTemplateData[]>>(
      `${rootPath}receipt/`,
      { orders: docNoList }
    );
    if (response.status === 204 || response.data == null) return [];
    return response.data.data;
  },
};

export default DocumentAPI;
