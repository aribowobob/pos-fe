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
  fetched: boolean;
  loading: boolean;
  setFetched: (value: boolean) => void;
  setLoading: (value: boolean) => void;
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
  fetched: false,
  loading: false,
  setFetched: value => set({ fetched: value }),
  setLoading: value => set({ loading: value }),
  setUser: user =>
    set({
      ...user,
      loading: false,
    }),
  setStore: store => set({ store }),
}));

export default useUser;
