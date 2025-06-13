import { create } from 'zustand';
import { CartItem, SalesCart } from '../types/sales';

interface SalesCartStore {
  cart: SalesCart;
  addItem: (item: CartItem) => void;
  updateItemQuantity: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
  setCustomer: (customerId?: number, customerName?: string) => void;
  setNotes: (notes: string) => void;
}

export const useSalesCartStore = create<SalesCartStore>((set) => ({
  cart: {
    items: [],
  },
  
  addItem: (item) => set((state) => {
    const existingItemIndex = state.cart.items.findIndex(i => i.productId === item.productId);
    
    if (existingItemIndex !== -1) {
      const updatedItems = [...state.cart.items];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + item.quantity
      };
      
      return { cart: { ...state.cart, items: updatedItems } };
    } else {
      return { cart: { ...state.cart, items: [...state.cart.items, item] } };
    }
  }),
  
  updateItemQuantity: (productId, quantity) => set((state) => {
    const updatedItems = state.cart.items.map(item => 
      item.productId === productId ? { ...item, quantity } : item
    );
    
    return { cart: { ...state.cart, items: updatedItems } };
  }),
  
  removeItem: (productId) => set((state) => {
    const updatedItems = state.cart.items.filter(item => item.productId !== productId);
    return { cart: { ...state.cart, items: updatedItems } };
  }),
  
  clearCart: () => set({
    cart: { items: [] }
  }),
  
  setCustomer: (customerId, customerName) => set((state) => ({
    cart: { ...state.cart, customerId, customerName }
  })),
  
  setNotes: (notes) => set((state) => ({
    cart: { ...state.cart, notes }
  })),
}));
