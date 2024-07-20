import { create } from 'zustand';

export type DiscountType = 'PERCENTAGE' | 'FIXED';
export type SalesTransactionItemType = {
  productId: number;
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
};

interface SalesTransactionState extends SalesTransactionType {
  setDate: (date: string) => void;
  setItems: (items: SalesTransactionItemType[]) => void;
}

const DEFAULT_DATA: SalesTransactionType = {
  date: '',
  items: [],
};

const useUser = create<SalesTransactionState>(set => ({
  ...DEFAULT_DATA,
  setDate: date => set({ date }),
  setItems: items => set({ items }),
}));

export default useUser;
