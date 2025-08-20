import { DiscountType } from './common';

export type PurchasesCartItem = {
  id: number;
  user_id: number;
  store_id: number;
  product_id: number;
  base_price: string;
  qty: number;
  discount_type: DiscountType;
  discount_value: number;
  discount_amount: string;
  sale_price: string;
  created_at: string;
  updated_at: string;
  // Extended properties that might come from product join
  sku?: string;
  product_name?: string;
  unit_name?: string;
  stock: number | null;
};

export type AddToPurchasesCartRequest = {
  base_price: string;
  discount_amount: string;
  discount_type: DiscountType;
  discount_value: number;
  product_id: number;
  qty: number;
  sale_price: string;
  store_id: number;
};

export type UpdatePurchasesCartItemRequest = {
  base_price?: string;
  discount_type?: DiscountType;
  discount_value?: number;
  qty?: number;
};

export type CreatePurchasesOrderRequest = {
  supplier_id?: number;
  date: string;
  order_number: string;
  payment_cash: string;
  payment_non_cash: string;
  store_id: number;
};

export type PurchasesOrder = {
  id: number;
  order_number: string;
  user_id: number;
  user_initial: string;
  store_id: number;
  store_initial: string;
  date: string;
  grand_total: string;
  payment_cash: string;
  payment_non_cash: string;
  receivable: string;
  created_at: string;
  supplier_id?: number | null;
};

export type PurchasesOrderDetail = {
  id: number;
  order_id: number;
  product_id: number;
  product_name: string;
  sku: string;
  qty: number;
  base_price: string;
  discount_type: DiscountType;
  discount_value: string;
  discount_amount: string;
  sale_price: string;
  total_price: string;
};

export type PurchasesOrderDetailResponse = {
  order: PurchasesOrder;
  order_details: PurchasesOrderDetail[];
};

export type CreatePurchasesOrderResponse = PurchasesOrder;

export type PurchasesCartSummaryType = {
  totalItems: number;
  totalQty: number;
  totalPurchaseAmount: number;
  totalDiscountAmount: number;
  grandTotal: number;
};

export type PurchasesReportRequest = {
  startDate?: string;
  endDate?: string;
  branchId?: number;
};

export type PurchasesReportSummary = {
  total_payment_cash: string;
  total_payment_non_cash: string;
  total_receivable: string;
  total_orders: number;
};

export interface PurchasesReportOrder extends PurchasesOrder {
  items: PurchasesOrderDetail[];
}

export interface PurchasesSkuSummaryItem {
  product_id: number;
  product_name: string;
  sku: string;
  total_qty: number;
  total_price: string;
}

export type PurchasesReportResponse = {
  summary: PurchasesReportSummary;
  orders: PurchasesReportOrder[];
  skus: PurchasesSkuSummaryItem[];
};
