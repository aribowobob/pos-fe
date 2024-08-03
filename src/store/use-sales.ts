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
  items: SalesTransactionItemType[];
  subTotal: number;
  loading: boolean;
};

const DEFAULT_DATA: SalesTransactionType = {
  items: [],
  subTotal: 0,
  loading: false,
};

interface SalesTransactionState extends SalesTransactionType {
  setItems: (value: SalesTransactionItemType[]) => void;
  setLoading: (value: boolean) => void;
}

const useUser = create<SalesTransactionState>(set => ({
  ...DEFAULT_DATA,
  setItems: value =>
    set(state => {
      const subTotal = value.reduce((acc, item) => {
        return acc + item.totalPrice;
      }, 0);

      return {
        ...state,
        items: value,
        subTotal,
      };
    }),
  setLoading: value => set({ loading: value }),
}));

export default useUser;
