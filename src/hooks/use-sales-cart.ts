import { useCallback } from 'react';

import Axios from 'axios';
import { getCookie } from 'cookies-next';
import { toast } from 'react-toastify';

import { useSales, useUser } from '@store';
import { getRuntimeEnv } from '@utils';
import { SalesCartResponseType } from '@types';

const useSalesCart = () => {
  const { store } = useUser();
  const { id: storeId } = store || {};
  const { setItems, setLoading } = useSales();
  const API_URL = getRuntimeEnv('API_URL');
  const getSalesCartUrl = `${API_URL}/get-sales-cart`;
  const deleteCartItemUrl = `${API_URL}/delete-sales-cart-item`;

  const fetchSalesCart = useCallback(async () => {
    setLoading(true);
    Axios.get<SalesCartResponseType>(getSalesCartUrl, {
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

  const removeItem = (id: number) => {
    setLoading(true);
    Axios.delete(deleteCartItemUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie('token')}`,
      },
      data: {
        id,
      },
    })
      .then(response => {
        const { code, data } = response?.data || {};

        if (code === 200 && !!data) {
          toast.success('Berhasil dihapus dari keranjang');
        } else {
          toast.error('Gagal menghapus item dari keranjang');
        }
        fetchSalesCart();
      })
      .catch(() => {
        toast.error('Error menghapus item dari keranjang');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    fetchSalesCart,
    removeItem,
  };
};

export default useSalesCart;
