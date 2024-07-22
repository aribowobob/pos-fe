import { create } from 'zustand';

export type DiscountType = 'PERCENTAGE' | 'FIXED' | null;
export type SalesTransactionItemType = {
  productId: number;
  productName: string;
  stock: number;
  quantity: number;
  baseSalesPrice: number;
  discountType: DiscountType;
  discountValue: number;
  discountAmount: number;
  salesPrice: number;
  totalPrice: number;
};
export type SalesTransactionType = {
  date: string;
  items: SalesTransactionItemType[];
  subTotal: number;
};

const DEFAULT_DATA: SalesTransactionType = {
  date: '',
  items: [],
  subTotal: 0,
};

interface SalesTransactionState extends SalesTransactionType {
  setData: (data: SalesTransactionType) => void;
}

const useUser = create<SalesTransactionState>(set => ({
  ...DEFAULT_DATA,
  setData: data => set({ ...data }),
}));

export default useUser;
