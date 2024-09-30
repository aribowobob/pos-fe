import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { CircleButton, TopNav } from '@components';
import Head from 'next/head';
import {
  EmptyProductSearchResult,
  FormProduct,
  ProductSearchbar,
} from '@modules';

import { money } from '@utils';
import { useConfigProducts } from '@store';
import { useProducts } from '@hooks';

const ProductPage: React.FC = () => {
  const {
    itemSearchResult: products,
    keywords,
    selectedById,
    setSelectedById,
    setKeywords,
  } = useConfigProducts();
  const finalProducts = products || [];

  const { fetchDataProducts } = useProducts();

  const handleSubmitSearch = (value: string) => {
    setKeywords(value);
  };

  useEffect(() => {
    if (keywords !== '' && keywords !== undefined) {
      fetchDataProducts();
    }
  }, [keywords]);

  const handleFormSubmit = () => {};

  const { back } = useRouter();

  return (
    <div className="container mx-auto sm:px-4 relative">
      <Head>
        <title>POS - Sistem</title>
      </Head>
      <TopNav title="Produk" onBack={back} />

      <ProductSearchbar onSubmit={handleSubmitSearch} />
      <div className="p-4">
        {keywords !== '' && finalProducts === null ? (
          <EmptyProductSearchResult
            message={`Produk dengan kata kunci ${keywords} tidak ditemukan`}
          />
        ) : null}
        {finalProducts?.map(dataPrd => {
          const { id, sku, name, purchase_price, sale_price, unit_name } =
            dataPrd;

          return (
            <div
              key={id}
              className="w-full flex flex-col bg-white mb-4 p-4 rounded-lg cursor-pointer"
              onClick={() => setSelectedById(id)}
            >
              <div className="p-1">
                <span className="font-semibold">SKU</span> {sku}
              </div>
              <div className="p-1">{name}</div>
              <div className="flex gap-2 justify-between">
                <div className="p-1 flex gap-2">
                  <span className="bg-red-600 rounded-md p-1 min-w-20 text-center bg-opacity-30">
                    {money(purchase_price || 0)}
                  </span>
                  <span className="bg-teal-600 rounded-md p-1 min-w-20 text-center bg-opacity-30">
                    {money(sale_price)}
                  </span>
                </div>
                <div className="p-1">Satuan: {unit_name}</div>
              </div>
            </div>
          );
        })}
      </div>
      <CircleButton
        className="fixed bottom-5 right-5"
        onClick={() => setSelectedById(0)}
      />

      <FormProduct
        open={selectedById !== null}
        onSubmit={handleFormSubmit}
        onCancel={() => setSelectedById(null)}
      />
    </div>
  );
};

export default ProductPage;
