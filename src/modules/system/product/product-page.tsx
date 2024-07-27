import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { CircleButton, TextInput, TopNav } from '@components';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Head from 'next/head';
import {
  EmptyProductSearchResult,
  FormAddProduct,
  ProductCard,
} from '@modules';
import { IProductProps } from './type';

const produkArray: IProductProps[] = [
  {
    kode_sku: 'SKU001',
    nama_produk: 'Produk A',
    harga_beli: '10000',
    harga_jual: '15000',
    nama_satuan: 'pcs',
  },
  {
    kode_sku: 'SKU002',
    nama_produk: 'Produk B',
    harga_beli: '20000',
    harga_jual: '25000',
    nama_satuan: 'pcs',
  },
  {
    kode_sku: 'SKU003',
    nama_produk: 'Produk C',
    harga_beli: '30000',
    harga_jual: '35000',
    nama_satuan: 'pcs',
  },
];

const ProductPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [searchResult, setSearchResult] = useState<IProductProps[]>([]);
  const [typingTimeout, setTypingTimeout] = useState<number | undefined>(
    undefined
  );
  const [isProductFormDisplayed, setIsProductFormDisplayed] = useState(false);

  useEffect(() => {
    return () => {
      // Cleanup timeout on component unmount
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [typingTimeout]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    // Clear the timeout if it's already set
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set a new timeout
    setTypingTimeout(
      window.setTimeout(() => {
        handleTypingStop(value);
      }, 600)
    ); // 1 second delay
  };

  const handleTypingStop = (value: string) => {
    //alert(`You type ${value}`);
    // Call your function here
    if (value === 'dion') {
      setSearchResult([]);
    } else {
      setSearchResult(produkArray);
    }
  };

  const { back } = useRouter();

  return (
    <div className="container mx-auto sm:px-4 relative">
      <Head>
        <title>POS - Sistem</title>
      </Head>
      <TopNav title="Produk" onBack={back} />
      <div className="w-full flex flex-col p-4 border-t-2 border-slate-500 bg-white">
        <TextInput
          prefix={<MagnifyingGlassIcon className="w-6 h-6" />}
          onChange={handleChange}
          value={inputValue}
          name="search"
        />
        {searchResult === null || searchResult.length === 0 ? (
          <div className="p-1 text-sm text-slate-400">Produk kosong</div>
        ) : (
          <div className="p-1 text-sm text-slate-400">
            {searchResult.length} Produk ditemukan
          </div>
        )}
      </div>

      <div className="p-4">
        {inputValue === '' ? (
          <EmptyProductSearchResult message="Produk masih kosong. Silakan tambah produk menggunakan tombol “+” dibawah" />
        ) : inputValue !== '' && searchResult.length === 0 ? (
          <EmptyProductSearchResult
            message={`Produk dengan kata kunci ${inputValue} tidak ditemukan`}
          />
        ) : null}
        {inputValue !== '' &&
          searchResult?.map(
            (
              { kode_sku, nama_produk, harga_beli, harga_jual, nama_satuan },
              index
            ) => (
              <div key={index}>
                <ProductCard
                  kode_sku={kode_sku}
                  nama_produk={nama_produk}
                  harga_beli={harga_beli}
                  harga_jual={harga_jual}
                  nama_satuan={nama_satuan}
                />
              </div>
            )
          )}
      </div>
      <CircleButton
        className="fixed bottom-5 right-5"
        onClick={() => setIsProductFormDisplayed(!isProductFormDisplayed)}
      />
      <FormAddProduct
        title="Tambah Produk Baru"
        isProductFormDisplayed={isProductFormDisplayed}
        setIsProductFormDisplayed={setIsProductFormDisplayed}
      />
    </div>
  );
};

export default ProductPage;
