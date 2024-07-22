import Head from 'next/head';
import { useRouter } from 'next/router';

import { TopNav } from '@components';
import { useSales, useUser } from '@store';
import { ProductList, ProductSearchbar } from '@modules';
import type { ProductItemType } from '@modules';
import { useState } from 'react';

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
  const [keyword, setKeyword] = useState('');
  const { store } = useUser();
  const { addItem } = useSales();
  const { back } = useRouter();
  const handleSubmitSearch = (value: string) => {
    setKeyword(value);
  };
  const handleSelectProduct = (product: ProductItemType) => {
    const { id: productId, name: productName, price: baseSalesPrice } = product;

    addItem({
      productId,
      productName,
      quantity: 1,
      baseSalesPrice,
      discountType: 'FIXED',
      discountValue: 1000,
      discountAmount: 1000,
      salesPrice: baseSalesPrice - 1000,
      totalPrice: baseSalesPrice,
    });
    back();
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
    </div>
  );
};

export default TransactionSalesSearchProductPage;
