import { useState } from 'react';

import Axios from 'axios';
import { getCookie } from 'cookies-next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { TopNav } from '@components';
import { useUser } from '@store';
import { ProductList, ProductSearchbar } from '@modules';
import type { ProductItemType } from '@modules';
import { getRuntimeEnv } from '@utils';

const TransactionSalesSearchProductPage = () => {
  const API_URL = getRuntimeEnv('API_URL');
  const addCartItemUrl = `${API_URL}/sales-transaction/create`;
  const getProductsUrl = `${API_URL}/get-products`;
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const { store } = useUser();
  const { back } = useRouter();
  const handleSubmitSearch = async (keyword: string) => {
    setLoading(true);

    const getProducts = await Axios.get(getProductsUrl, {
      params: {
        keyword,
      },
      headers: {
        Authorization: `Bearer ${getCookie('token')}`,
      },
    })
      .catch(() => {
        setProducts(null);
        alert('Error get products');
      })
      .finally(() => {
        setLoading(false);
      });

    const { data: responseData } = getProducts || {};
    const { data } = responseData || {};

    setProducts(data || []);
  };
  const handleSelectProduct = async (product: ProductItemType) => {
    setLoading(true);

    const insertItem = await Axios.post(
      addCartItemUrl,
      {
        productId: product.id,
        quantity: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${getCookie('token')}`,
        },
      }
    )
      .catch(() => {
        alert('Error insert item');
      })
      .finally(() => {
        setLoading(false);
      });

    const { data: responseData } = insertItem || {};
    const { code, data } = responseData || {};

    if (code === 200 && !!data) {
      back();
    }
  };

  return (
    <div className="container mx-auto sm:px-4">
      <Head>
        <title>POS - Pencarian Produk</title>
      </Head>
      <TopNav title="Pencarian Produk" onBack={back} />
      <ProductSearchbar onSubmit={handleSubmitSearch} />
      <ProductList
        data={products || []}
        storeInitial={store?.initial || ''}
        onProductSelect={handleSelectProduct}
      />

      {loading && <div className="fixed inset-0 pointer-events-none" />}
    </div>
  );
};

export default TransactionSalesSearchProductPage;
