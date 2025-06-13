import { BaseResponseType } from './common.types';

export type DiscountType = 'PERCENTAGE' | 'FIXED' | null;
export type SalesCartItemType = {
  id: number;
  user_id: number;
  store_id: number;
  product_id: number;
  qty: number;
  base_price: number;
  discount_type: DiscountType;
  discount_value: number;
  discount_amount: number;
  sale_price: number;
};
export interface ModifiedSalesCartItemType extends SalesCartItemType {
  name: string;
  stock: number;
}
export interface SalesCartResponseType
  extends BaseResponseType<ModifiedSalesCartItemType[]> {}
export type SalesCartData = {
  items: ModifiedSalesCartItemType[];
  subTotal: number;
  loading: boolean;
  editId: number;
};
export interface SalesCartState extends SalesCartData {
  setItems: (value: ModifiedSalesCartItemType[]) => void;
  setLoading: (value: boolean) => void;
  setEditId: (value: number) => void;
}
export type CreateSalesOrderPayload = {
  date: string;
  payment_cash: number;
  payment_non_cash: number;
};
export interface CreateSalesOrderRequestBody extends CreateSalesOrderPayload {
  store_id: number;
}
export interface CreateSalesOrderResponse
  extends BaseResponseType<{ order_id: number }> {}
export interface UpdateCartItemResponse extends BaseResponseType<boolean> {}
export type FetchSalesCartArgs = {
  fetchLoading: boolean;
};
export type SalesCartItemProps = {
  data: ModifiedSalesCartItemType;
  onRemove: (id: number) => void;
  onEdit: (id: number) => void;
};
export type DeleteConfirmationProps = {
  open: boolean;
  name: string;
  onCancel: () => void;
  onDelete: () => void;
};
