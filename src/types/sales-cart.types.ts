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
  items: SalesCartItemType[];
  subTotal: number;
  loading: boolean;
};
export interface SalesCartState extends SalesCartData {
  setItems: (value: SalesCartItemType[]) => void;
  setLoading: (value: boolean) => void;
}
