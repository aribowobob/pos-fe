import { useCallback, useEffect } from 'react';

import Axios from 'axios';
import { getCookie } from 'cookies-next';

import { useSales, useUser } from '@store';
import { getRuntimeEnv } from '@utils';

const useSalesCart = () => {
  const { store } = useUser();
  const { id: storeId } = store || {};
  const { setItems, setLoading } = useSales();
  const API_URL = getRuntimeEnv('API_URL');
  const getSalesCartUrl = `${API_URL}/get-sales-cart`;

  const fetchSalesCart = useCallback(async () => {
    setLoading(true);
    Axios.get(getSalesCartUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie('token')}`,
      },
      params: {
        store: storeId || 0,
      },
    })
      .then(response => {
        const { data, code } = response?.data || {};

        if (code === 200 && Array.isArray(data)) {
          setItems(data);
        } else {
          setItems([]);
        }
      })
      .catch(() => {
        setItems([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [getSalesCartUrl, setItems, setLoading, storeId]);

  useEffect(() => {
    if (!!storeId && fetchSalesCart) {
      fetchSalesCart();
    }
  }, [fetchSalesCart, storeId]);

  return {
    fetchSalesCart,
  };
};

export default useSalesCart;
