import { useCallback } from 'react';

import Axios from 'axios';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { useSales, useUser } from '@store';
import { getRuntimeEnv } from '@utils';
import {
  CreateSalesOrderPayload,
  CreateSalesOrderRequestBody,
  CreateSalesOrderResponse,
  SalesCartResponseType,
} from '@types';

const useSalesCart = () => {
  const { store } = useUser();
  const { id: storeId } = store || {};
  const { setItems, setLoading } = useSales();
  const { replace } = useRouter();
  const API_URL = getRuntimeEnv('API_URL');
  const getSalesCartUrl = `${API_URL}/get-sales-cart`;
  const deleteCartItemUrl = `${API_URL}/delete-sales-cart-item`;
  const postCreateSalesOrder = `${API_URL}/create-sales-order`;

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

  const createSalesOrder = (payload: CreateSalesOrderPayload) => {
    setLoading(true);

    const requestBodyPayload: CreateSalesOrderRequestBody = {
      ...payload,
      store_id: storeId || 0,
    };
    Axios.post<CreateSalesOrderResponse>(
      postCreateSalesOrder,
      requestBodyPayload,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('token')}`,
        },
      }
    )
      .then(response => {
        const { code, data } = response?.data || {};

        if (code === 200 && !!data) {
          fetchSalesCart();
          replace('/transaction/sales/confirmation');
        } else {
          toast.error('Transaksi penjualan gagal disimpan.');
        }
      })
      .catch(() => {
        toast.error(
          'Transaksi penjualan gagal disimpan. Silakan login ulang dan coba kembali.'
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    createSalesOrder,
    fetchSalesCart,
    removeItem,
  };
};

export default useSalesCart;
