import { create } from 'zustand';

export type DiscountType = 'PERCENTAGE' | 'FIXED' | null;
export type SalesTransactionItemType = {
  productId: number;
  productName: string;
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
  addItem: (item: SalesTransactionItemType) => void;
}

const DEFAULT_DATA: SalesTransactionType = {
  date: '',
  items: [],
};

const useUser = create<SalesTransactionState>(set => ({
  ...DEFAULT_DATA,
  setDate: date => set({ date }),
  addItem: item => set(state => ({ items: [...state.items, item] })),
}));

export default useUser;
