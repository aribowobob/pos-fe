import { SalesCartData, SalesCartState } from '@types';
import { create } from 'zustand';

const DEFAULT_DATA: SalesCartData = {
  items: [],
  subTotal: 0,
  loading: true,
};

const useSales = create<SalesCartState>(set => ({
  ...DEFAULT_DATA,
  setItems: value =>
    set(state => {
      const subTotal = value.reduce((acc, item) => {
        const { sale_price = 0, qty = 1 } = item || {};
        const total = sale_price * qty;

        return acc + total;
      }, 0);

      return {
        ...state,
        items: value,
        subTotal,
      };
    }),
  setLoading: value => set({ loading: value }),
}));

export default useSales;
