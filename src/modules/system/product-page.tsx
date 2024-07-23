import React from 'react';
import { useRouter } from 'next/router';

import { BottomNav, TextInput, TopNav } from '@components';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Head from 'next/head';
const ProductPage = () => {
  const { back } = useRouter();

  return (
    <div className="container mx-auto sm:px-4">
      <Head>
        <title>POS - Sistem</title>
      </Head>
      <TopNav title="Produk" onBack={back} />

      <div className="w-full flex flex-col p-4">
        <TextInput
          prefix={<MagnifyingGlassIcon className="w-6 h-6" />}
          name="search"
        />
      </div>

      <BottomNav />
    </div>
  );
};

export default ProductPage;
