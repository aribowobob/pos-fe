import Axios from 'axios';
import { getCookie } from 'cookies-next';
import {
  ProductType,
  SearchProductResponseByIdType,
  SearchProductResponseType,
} from '@types';
import { getRuntimeEnv } from '@utils';

import { useConfigProducts } from '@store';
import { toast } from 'react-toastify';

const API_URL = getRuntimeEnv('API_URL');

const useProducts = () => {
  const {
    selectedById,
    keywords,
    setDataProducts,
    setDataProduct,
    setInitFetch,
    setErrorFetching,
    product,
    products,
  } = useConfigProducts();

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getCookie('token')}`,
  };

  const urlSearchProduct = `${API_URL}/get-products`;
  const urlGetProductById = `${API_URL}/get-product`;
  const urlAddProduct = `${API_URL}/create-product`;

  // Fetch data function

  const fetchDataProducts = async () => {
    setInitFetch();
    try {
      // Build query string from params
      const response = await Axios.get<SearchProductResponseType>(
        urlSearchProduct,
        {
          params: {
            keyword: keywords,
          },
          headers,
        }
      );
      const { code, message, data } = response.data;

      if (code === 200 && Array.isArray(data)) {
        setDataProducts(data);
      } else {
        setErrorFetching(message);
      }
    } catch (err) {
      setErrorFetching('Err..');
    } finally {
      console.log('Final Execution complete');
    }
  };

  const fetchDataProductById = async () => {
    setInitFetch();
    try {
      // Build query string from params
      const response = await Axios.get<SearchProductResponseByIdType>(
        urlGetProductById,
        {
          params: {
            id: selectedById,
          },
          headers,
        }
      );
      const { code, message, data } = response.data;

      if (code === 200 && data !== null) {
        setDataProduct(data);
      } else {
        setErrorFetching(message);
      }
    } catch (err) {
      setErrorFetching('Err..');
    } finally {
      console.log('Get Product By Id Execution complete');
    }
  };

  const addProduct = async (product: ProductType) => {
    setInitFetch();
    try {
      const response = await Axios.post(urlAddProduct, product, {
        headers,
      });
      const { code, message, data } = response.data;
      if (code === 200 && data > 0) {
        toast.success('Produk Baru berhasil ditambahkan');
      } else {
        setErrorFetching(message);
        toast.error('Produk Baru gagal ditambahkan');
      }
    } catch (err) {
      setErrorFetching('Err..');
    }
  };

  return {
    product,
    products,
    fetchDataProducts,
    fetchDataProductById,
    addProduct,
    //updateProduct,
    //deleteProduct,
  };
};

export default useProducts;
