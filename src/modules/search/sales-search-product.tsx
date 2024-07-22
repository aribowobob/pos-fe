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

const DUMMY_DATA = [
  {
    id: 1,
    name: 'Lorem pulpy orange a 300ml x 12 botol @25000',
    price: 25000,
    stock: 25,
  },
  {
    id: 2,
    name: 'Ipsum pulpy orange a 300ml x 12 botol lorem ipsum dolor sit amet @25500',
    price: 25500,
    stock: 5,
  },
  {
    id: 3,
    name: 'Dolorsit pulpy orange a 300ml x 12 botol @15000',
    price: 15000,
    stock: 0,
  },
  {
    id: 4,
    name: 'Amet pulpy orange a 300ml x 12 botol @5000',
    price: 5000,
    stock: 1982,
  },
  {
    id: 5,
    name: 'Notorieq pulpy orange a 300ml x 12 botol @75000',
    price: 75000,
    stock: 0,
  },
];

const TransactionSalesSearchProductPage = () => {
  const API_URL = getRuntimeEnv('API_URL');
  const addCartItemUrl = `${API_URL}/sales-transaction/create`;
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const { store } = useUser();
  const { back } = useRouter();
  const handleSubmitSearch = (value: string) => {
    setKeyword(value);
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
        data={keyword.length ? DUMMY_DATA : []}
        storeInitial={store?.initial || ''}
        onProductSelect={handleSelectProduct}
      />

      {loading && <div className="fixed inset-0 pointer-events-none" />}
    </div>
  );
};

export default TransactionSalesSearchProductPage;
