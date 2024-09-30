import Axios from 'axios';
import { getCookie } from 'cookies-next';
import {
  ProductType,
  SearchProductResponseByIdType,
  SearchProductResponseType,
} from '@types';
import { getRuntimeEnv } from '@utils';

import { useConfigProducts } from '@store';

const API_URL = getRuntimeEnv('API_URL');

const useProducts = () => {
  const {
    selectedById,
    keywords,
    setInitFetch,
    setSuccessFetching,
    setErrorFetching,
    setItemSearchResult,
    data,
  } = useConfigProducts();

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getCookie('token')}`,
  };

  const urlSearchProduct = `${API_URL}/get-products`;
  const urlGetProductById = `${API_URL}/get-product`;

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
        setSuccessFetching(data);
        setItemSearchResult(data);
        return data;
      } else {
        setErrorFetching(message);
        return [];
      }
    } catch (err) {
      setErrorFetching('Err..');
      return [];
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

      if (code === 200) {
        console.log(`data products by id fetched...`, data);
        setSuccessFetching(data);
        return data;
      } else {
        setErrorFetching(message);
        return [];
      }
    } catch (err) {
      setErrorFetching('Err..');
      return [];
    } finally {
      console.log('Get Product By Id Execution complete');
    }
  };

  const finalProducts = (data as ProductType[] | ProductType) || [];

  return {
    data: finalProducts,
    fetchDataProducts,
    fetchDataProductById,
    //addProduct,
    //updateProduct,
    //deleteProduct,
  };
};

export default useProducts;
