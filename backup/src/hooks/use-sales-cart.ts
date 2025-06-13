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
  FetchSalesCartArgs,
  SalesCartItemType,
  SalesCartResponseType,
  UpdateCartItemResponse,
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
  const updateCartItemUrl = `${API_URL}/update-sales-cart-item`;

  const fetchSalesCart = useCallback(
    async (args: FetchSalesCartArgs) => {
      const { fetchLoading } = args || {};

      setLoading(fetchLoading);
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
    },
    [getSalesCartUrl, setItems, setLoading, storeId]
  );

  const removeItem = (id: number) => {
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

        fetchSalesCart({ fetchLoading: false });
      })
      .catch(() => {
        toast.error('Error menghapus item dari keranjang');
      });
  };

  const createSalesOrder = (payload: CreateSalesOrderPayload) => {
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
          fetchSalesCart({ fetchLoading: true });
          replace('/transaction/sales/confirmation');
        } else {
          toast.error('Transaksi penjualan gagal disimpan.');
        }
      })
      .catch(() => {
        toast.error(
          'Transaksi penjualan gagal disimpan. Silakan login ulang dan coba kembali.'
        );
      });
  };

  const updateSalesCartItem = (item: SalesCartItemType) => {
    Axios.put<UpdateCartItemResponse>(updateCartItemUrl, item, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie('token')}`,
      },
    })
      .then(response => {
        const { code, data } = response?.data || {};

        if (!(code === 200 && !!data)) {
          toast.error('Gagal mengupdate keranjang');
        }

        fetchSalesCart({ fetchLoading: false });
      })
      .catch(() => {
        toast.error('Error mengupdate keranjang');
      });
  };

  return {
    createSalesOrder,
    fetchSalesCart,
    removeItem,
    updateSalesCartItem,
  };
};

export default useSalesCart;
