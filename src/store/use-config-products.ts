import { ProductType } from '@types';
import { create } from 'zustand';

type ConfigProductsState = {
  loading: boolean;
  error: boolean;
  errorMessage: string | null;
  data: ProductType[] | ProductType | null;
  keywords: string;
  itemSearchResult: ProductType[] | [];
  selectedById: number | null;
  deletedById: number | null;
  setInitFetch: () => void;
  setSuccessFetching: (data: ProductType[] | ProductType) => void;
  setErrorFetching: (errorMessage: string) => void;
  setKeywords: (keywords: string) => void;
  setSelectedById: (value: number | null) => void;
  setDeletedById: (value: number | null) => void;
  setItemSearchResult: (data: ProductType[] | []) => void;
};

// Inisialisasi state fetch dengan tipe generik T
const INITIAL_CONFIG_PRODUCTS_STATE = {
  loading: false,
  error: false,
  errorMessage: null,
  data: null,
  keywords: '',
  itemSearchResult: [],
  selectedById: null, //0=for insert, 1 for update
  deletedById: null,
};

// Buat useFetch store dengan Zustand, gunakan generik T untuk fleksibilitas data
const useConfigProducts = create<ConfigProductsState>(set => ({
  ...INITIAL_CONFIG_PRODUCTS_STATE,

  // Set loading menjadi true saat inisialisasi fetch
  setInitFetch: () => {
    set(() => ({ loading: true, error: false, errorMessage: null }));
  },

  // Set data dan ubah loading menjadi false saat fetch berhasil
  setSuccessFetching: (data: ProductType[] | ProductType) => {
    set(() => ({ data, loading: false, error: false }));
  },

  // Set error dan ubah loading menjadi false saat fetch gagal
  setErrorFetching: (errorMessage: string) => {
    set(() => ({ error: true, loading: false, errorMessage }));
  },

  setKeywords: (keywords: string) => {
    set(() => ({ keywords: keywords.trim() }));
  },

  setSelectedById: (value: number | null) => {
    set(() => ({ selectedById: value }));
  },

  setDeletedById: (value: number | null) => {
    set(() => ({ deletedById: value }));
  },

  setItemSearchResult: (value: ProductType[] | []) => {
    set(() => ({
      data: value,
      loading: false,
      error: false,
      itemSearchResult: value,
    }));
  },
}));

export default useConfigProducts;
