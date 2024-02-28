import axios from "./axios";
import { Stock } from "./stock";
import { ApiResponse } from "@/types/general";

const rootPath = "/orders";

export interface GetOrdersListParams {
  from: string;
  to: string;
  status: string;
  orderBy: string;
  withCreditPayment: boolean;
}

const OrderAPI = {
  fetchOrdersList: async (params?: Partial<GetOrdersListParams>) => {
    const response = await axios.get<ApiResponse<Order[]>>(rootPath + "/", {
      params,
    });
    return response.data.data;
  },
  fetchOrder: async (doc_no: string) => {
    const path = `${rootPath}/maintain/${doc_no}/`;
    const response = await axios.get<ApiResponse<DetailedOrder>>(path);
    return response.data.data;
  },
  fetchMultipleOrders: async (docNoList: string[]) => {
    const path = `${rootPath}/get-multi/`;
    const response = await axios.post<ApiResponse<DetailedOrder[]>>(path, {
      list: docNoList,
    });
    return response.data.data;
  },
  deleteOrder: async (doc_no: string) => {
    const path = `${rootPath}/maintain/${doc_no}/delete/`;
    const response = await axios.post<ApiResponse<{ target: string }>>(
      path,
      null
    );
    return response.data.data;
  },
  sendMultipleOrderToTransit: async (
    doc_list: string[],
    deliver: number | null
  ) => {
    let payload: object = {};
    if (deliver) payload = { ...payload, deliver };
    const path = `${rootPath}/send-multiple-to-transit/`;
    payload = {
      ...payload,
      multiple_order: doc_list,
    };
    const response = await axios.post<ApiResponse>(path, payload);
    return response.data.data;
  },
  sendOrderToTransit: async (doc_no: string, deliver: number | null) => {
    const path = `${rootPath}/maintain/${doc_no}/to-transit/`;
    const response = await axios.post<ApiResponse<SendToTransitResponse>>(
      path,
      deliver ? { deliver } : null
    );
    return response.data.data;
  },
  completeOrder: async (doc_no: string, payload: CompleteOrderPayload) => {
    const path = `${rootPath}/maintain/${doc_no}/complete/`;
    const response = await axios.post<ApiResponse<{ order: string }>>(
      path,
      payload
    );
    return response.data.data;
  },
  reorder: async (doc_no: string) => {
    const path = `${rootPath}/maintain/${doc_no}/reorder/`;
    const response = await axios.post<
      ApiResponse<{ from: string; new_order: string; receipt: string }>
    >(path, null);
    return response.data.data;
  },
  updateRemarks: async (doc_no: string, remarks: string | null) => {
    const path = `${rootPath}/maintain/${doc_no}/`;
    const response = await axios.post<ApiResponse<{ target: string }>>(path, {
      remarks,
    });
    return response.data.data;
  },
  draftPrice: async (payload: CreateOrderPayload) => {
    const path = `${rootPath}/`;
    let data: DraftPriceResponse = {
      subtotal: 0,
      discount: 0,
      grandtotal: 0,
      service_charge: 0,
    };
    if (payload.lines.length) {
      const response = await axios.post<DraftPriceResponse>(path, {
        ...payload,
        is_draft: true,
      });
      data = response.data;
    }
    return data;
  },
  createOrder: async (payload: CreateOrderPayload) => {
    const response = await axios.post(`${rootPath}/`, payload);
    return response.data;
  },
};

export default OrderAPI;

export interface DraftPriceResponse {
  subtotal: number;
  discount: number;
  grandtotal: number;
  service_charge: number;
}

export interface SendToTransitResponse {
  deliver_order: string;
  order: string;
}

export interface Order {
  doc_no: string;
  order_group: string | null;
  order_type: string;
  order_type_text: string;
  customer_code: string;
  customer_name: string;
  customer_address: string;
  customer_tax_no: string | null;
  deliver_code: string | null;
  deliver_name: string | null;
  deliver_time: string;
  sent_at: string | null;
  completed_or_voided_at: string | null;
  remarks: string | null;
  status: string;
  status_seq: number;
  status_text: string;
  payment_type: string;
  payment_type_text: string;
  is_on_site: boolean;
  reorder_from: string | null;
  doc_date: string;
  lines: OrderLine[];
}

export interface DetailedOrder extends Order {
  service_charge: number;
  discounts: DiscountLine[];
  cndn: CreditDebitNote[];
  subtotal: number;
  discount_price: number;
  no_vat_amount: number;
  vat_amount: number;
  grandtotal: number;
  paid_amount: number;
  is_pending: boolean;
}

export interface OrderLine {
  line_no: number;
  sku: number;
  sku_name: string;
  sku_brand_code: string;
  sku_type_code: string;
  qty: number;
  ppu: number;
  personal_price_discount: number;
  on_site_discount: number;
  total: number;
}

export interface CreditDebitNote {
  doc_no: string;
  doc_date: string;
  doc_type: "DEBIT" | "CREDIT";
  amount: number;
  payment_type: string;
  payment_type_text: string;
}

export interface DiscountLine {
  line_no: number;
  discount_name: string;
  discount_price: string;
}

export interface SendToTransitPayload {
  customer: number;
  deliver_time: string;
  /**
   * Employee's id that send this
   */
  deliver?: number;
}

export interface SendMultipleOrdersToTransitPayload {
  /**
   * Employee's id that send this
   */
  deliver?: number;
  /**
   * order ids
   */
  multiple_order: number[];
}

export interface UpdateOrderStatusPayload extends SendToTransitPayload {
  status: OrderStatus;
}

export enum OrderType {
  NORMAL = "NM",
  WITH_TANK = "WT",
  DEPOSIT = "DP",
}

export enum OrderStatus {
  PENDING = "PD",
  WAIT_FOR_TRANSIT = "WT",
  IN_TRANSIT = "IT",
  COMPLETED = "CP",
  CANCELLED = "CN",
  REJECTTED_ON_DELIVER = "RD",
}

export enum PaymentType {
  CASH = "CASH",
  TRANSFER = "TRANSFER",
  CREDIT = "CREDIT",
}

export interface UpdateRemarksPayload {
  status: string;
  remarks: string;
}

export interface CompleteOrderPayload extends SendToTransitPayload {
  return_tank?: ReturnTankWithOrderPayload[];
  remarks?: string;
  payment_type?: PaymentType;
  is_pending?: boolean;
}

export interface CreateOrderPayload {
  customer_code: string;
  deliver_time: string;
  is_on_site: boolean;
  order_type: OrderType;
  lines: CreateOrderDetailPayload[];
  service_charge: number;
  status: OrderStatus;
  address?: string;
  discount?: number;
  return_tank?: ReturnTankWithOrderPayload[];
  paid_amount: number;
  remarks?: string;
  fast_discount: number;
  payment_type: PaymentType;
  is_pending: boolean;
  reorder_from?: number;
  tax_rate?: number;
}

export interface ReturnTankWithOrderPayload {
  stock_id: number;
  quantity: number;
}

export interface CreateOrderDetailPayload {
  stock: Stock;
  quantity: number | string;
}
