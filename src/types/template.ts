export interface DocumentTemplateData {
  order_doc_no: string;
  doc_no: string;
  doc_date: string;
  lines: DocumentLine[];
}

export interface DocumentLine {
  line_no: number;
  sku: number;
  sku_name: string;
  qty: number;
  ppu: number;
  total: number;
}

export interface DeliverNoteTemplateData extends DocumentTemplateData {
  customer_code: string;
  customer_name: string;
  deliver_code: string;
  deliver_name: string;
  customer_tel: string;
  customer_addr: string;
  customer_landmark: string;
  is_pending: boolean;
  payment_text: string;
  payment_type: string;
  subtotal: number;
  service_charge: number;
  discount_price: number;
  grandtotal: number;
}

export interface TaxInvoiceTemplateData extends DocumentTemplateData {
  customer_code: string;
  customer_name: string;
  customer_tel: string;
  customer_addr: string;
  customer_tax_no: string | null;
  openclosetime_text: string;
  close_days: string;
  receipt_footer_note: string;
  vendor_addr: string;
  vendor_name: string;
  vendor_tel: string;
  vendor_tax_no: string | null;
  subtotal: number;
  service_charge: number;
  discount_price: number;
  tax_rate: number;
  no_vat_amount: number;
  vat_amount: number;
  grandtotal: number;
}

export interface ReceiptTemplateData extends DocumentTemplateData {
  customer_code: string;
  customer_name: string;
  customer_tel: string;
  customer_addr: string;
  openclosetime_text: string;
  close_days: string;
  receipt_footer_note: string;
  vendor_name: string;
  vendor_tel: string;
  vendor_addr: string;
  subtotal: number;
  service_charge: number;
  discount_price: number;
  no_vat_amount: number;
  vat_amount: number;
  grandtotal: number;
}
