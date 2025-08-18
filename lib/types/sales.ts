import { DiscountType } from './common';

export type SalesCartItem = {
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

export type AddToCartRequest = {
  base_price: string;
  discount_amount: string;
  discount_type: DiscountType;
  discount_value: number;
  product_id: number;
  qty: number;
  sale_price: string;
  store_id: number;
};

export type UpdateCartItemRequest = {
  base_price?: string;
  discount_type?: DiscountType;
  discount_value?: number;
  qty?: number;
};

export type CreateOrderRequest = {
  customer_id?: number;
  date: string;
  order_number: string;
  payment_cash: string;
  payment_non_cash: string;
  store_id: number;
};

export type SalesOrder = {
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
  customer_id?: number | null;
};

export type SalesOrderDetail = {
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

export type OrderDetailResponse = {
  order: SalesOrder;
  details: SalesOrderDetail[];
};

export type SalesCartSummaryType = {
  totalItems: number;
  totalAmount: number;
  totalDiscount: number;
  itemCount: number;
};

export type SalesReportRequest = {
  startDate?: string;
  endDate?: string;
  branchId: string;
};

export interface SalesReportOrder extends SalesOrder {
  items: SalesOrderDetail[];
}

export interface SkuSummaryItem {
  product_id: number;
  product_name: string;
  sku: string;
  total_qty: number;
  total_price: string;
}

export interface SalesReportSummary {
  total_payment_cash: string;
  total_payment_non_cash: string;
  total_receivable: string;
  total_orders: number;
}

export type SalesReportResponse = {
  orders: SalesReportOrder[];
  sku_summary: SkuSummaryItem[];
  summary: SalesReportSummary;
};

export type ItemSubTotalCalculationParam = {
  base_price: string;
  discount_type: DiscountType;
  discount_value: number;
  qty: number;
  sale_price: string;
};
