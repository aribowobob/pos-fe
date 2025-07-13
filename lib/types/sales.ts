export type SalesCartItem = {
  id: number;
  user_id: number;
  store_id: number;
  product_id: number;
  base_price: string;
  qty: number;
  discount_type: 'fixed' | 'percentage';
  discount_value: number;
  discount_amount: string;
  sale_price: string;
  created_at: string;
  updated_at: string;
  // Extended properties that might come from product join
  sku?: string;
  product_name?: string;
  unit_name?: string;
};

export type AddToCartRequest = {
  base_price: string;
  discount_amount: string;
  discount_type: 'fixed' | 'percentage';
  discount_value: number;
  product_id: number;
  qty: number;
  sale_price: string;
  store_id: number;
};

export type UpdateCartItemRequest = {
  base_price: string;
  discount_type: 'fixed' | 'percentage';
  discount_value: number;
  qty: number;
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
  store_id: number;
  date: string;
  grand_total: string;
  payment_cash: string;
  payment_non_cash: string;
  receivable: string;
  created_at: string;
  customer_id?: number;
};

export type SalesOrderDetail = {
  id: number;
  order_id: number;
  product_id: number;
  qty: number;
  base_price: string;
  discount_type: 'fixed' | 'percentage';
  discount_value: string;
  discount_amount: string;
  sale_price: string;
  total_price: string;
};

export type CreateOrderResponse = {
  order: SalesOrder;
  details: SalesOrderDetail[];
};
