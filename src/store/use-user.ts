import { create } from 'zustand';

export type StoreType = {
  id: number;
  name: string;
  initial: string;
};

export type UserType = {
  id: number;
  fullName: string;
  initial: string;
  email: string;
  companyId: number;
  companyName: string;
  userStores?: StoreType[]; // All assigned stores
  store?: StoreType; // Selected store
};

interface UserState extends UserType {
  setUser: (user: UserType) => void;
  setStore: (store: StoreType) => void;
}

const DEFAULT_USER: UserType = {
  id: 0,
  fullName: '',
  initial: '',
  email: '',
  companyId: 0,
  companyName: '',
  userStores: undefined,
  store: undefined,
};

const useUser = create<UserState>(set => ({
  ...DEFAULT_USER,
  setUser: user =>
    set({
      ...user,
    }),
  setStore: store => set({ store }),
}));

export default useUser;
