import { create } from 'zustand';
import { BranchStore, GetCurrentUserRes, UserState } from '../types/auth';

interface UserStoreState {
  user: UserState | null;
  isLoading: boolean;
  setUser: (data: GetCurrentUserRes) => void;
  setStore: (store: BranchStore) => void;
  setLoading: (loading: boolean) => void;
}

export const useUserStore = create<UserStoreState>(set => ({
  user: null,
  isLoading: false,
  setUser: userData =>
    set(state => {
      // If there's only one store, automatically set it as the active store
      const userStores = userData?.stores || [];
      const currentStore =
        state.user?.store ||
        (userStores.length === 1 ? userStores[0] : undefined);

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
}));
