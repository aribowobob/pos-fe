import { create } from 'zustand';
import { BranchStore, GetCurrentUserRes, UserState } from '../types/auth';

interface UserStoreState {
  user: UserState | null;
  isLoading: boolean;
  setUser: (data: GetCurrentUserRes) => void;
  setStore: (store: BranchStore) => void;
  setLoading: (loading: boolean) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserStoreState>(set => ({
  user: null,
  isLoading: false,
  setUser: userData =>
    set(state => {
      const userStores = userData?.stores || [];
      let currentStore = state.user?.store;

      // If current store is not set, use the first store from user data
      if (!currentStore && userStores.length > 0) {
        currentStore = userStores[0];
      }

      return {
        user: {
          ...userData,
          store: currentStore,
        },
      };
    }),
  setStore: store =>
    set(state => ({
      user: state.user
        ? {
            ...state.user,
            store,
          }
        : null,
    })),
  setLoading: loading => set({ isLoading: loading }),
  resetUser: () =>
    set(() => ({
      user: null,
      isLoading: false,
    })),
}));
