import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { CircleButton, TextInput, TopNav } from '@components';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Head from 'next/head';
import { EmptyProductSearchResult, FormProduct } from '@modules';
import { IProductProps, IProductProps2 } from '@types';

import { money } from '@utils';
import { useProducts } from '@hooks';

const ProductPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [searchResult, setSearchResult] = useState<IProductProps[]>([]);

  const [typingTimeout, setTypingTimeout] = useState<number | undefined>(
    undefined
  );

  const [isFormDisplayed, setIsFormDisplayed] = useState(false);
  const [paramId, setParamId] = useState(0);
  const { data: products, loading, fetchData } = useProducts();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setSearchResult(products);
  }, [products]);

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
    if (value === 'dion' || value === 'bob') {
      setSearchResult([]);
    } else {
      setSearchResult([]);
    }
  };

  const selectProductToEdit = (param: number) => {
    setIsFormDisplayed(true);
    setParamId(param);
  };

  const showAddProduct = () => {
    setIsFormDisplayed(true);
    setParamId(0);
  };

  const submitForm = (formData: IProductProps2) => {
    console.log(`Input : ` + formData);
  };

  const { back } = useRouter();

  if (loading) return <p>Loading...</p>;
  /* if (error) return <p>Error: {error}</p>; */

  return (
    <div className="container mx-auto sm:px-4 relative">
      <Head>
        <title>POS - Sistem</title>
      </Head>
      <TopNav title="Produk" onBack={back} />
      <div className="sticky top-0 flex flex-col p-4 border-t-2 border-slate-500 bg-white">
        <TextInput
          prefixElement={<MagnifyingGlassIcon className="w-6 h-6" />}
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
        {searchResult.length === 0 ? (
          <EmptyProductSearchResult message="Produk masih kosong. Silakan tambah produk menggunakan tombol “+” dibawah" />
        ) : inputValue !== '' && searchResult.length === 0 ? (
          <EmptyProductSearchResult
            message={`Produk dengan kata kunci ${inputValue} tidak ditemukan`}
          />
        ) : null}
        {searchResult?.map(dataPrd => {
          const {
            id,
            kode_sku,
            nama_produk,
            harga_beli,
            harga_jual,
            nama_satuan,
          } = dataPrd;

          return (
            <div
              key={id}
              className="w-full flex flex-col bg-white mb-4 p-4 rounded-lg cursor-pointer"
              onClick={() => selectProductToEdit(id)}
            >
              <div className="p-1">
                <span className="font-semibold">SKU</span> {kode_sku}
              </div>
              <div className="p-1">{nama_produk}</div>
              <div className="flex gap-2 justify-between">
                <div className="p-1 flex gap-2">
                  <span className="bg-red-600 rounded-md p-1 min-w-20 text-center bg-opacity-30">
                    {money(parseInt(harga_beli))}
                  </span>
                  <span className="bg-teal-600 rounded-md p-1 min-w-20 text-center bg-opacity-30">
                    {money(parseInt(harga_jual))}
                  </span>
                </div>
                <div className="p-1">Satuan: {nama_satuan}</div>
              </div>
            </div>
          );
        })}
      </div>
      <CircleButton
        className="fixed bottom-5 right-5"
        onClick={() => showAddProduct()}
      />

      <FormProduct
        open={isFormDisplayed}
        onSubmit={submitForm}
        onCancel={() => setIsFormDisplayed(false)}
        id={paramId}
      />
    </div>
  );
};

export default ProductPage;
