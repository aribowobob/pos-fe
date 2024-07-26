import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { CircleButton, TextInput, TopNav } from '@components';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Head from 'next/head';
import { AddProduct } from '@modules';

const ProductPage = () => {
  const [inputValue, setInputValue] = useState<string>('');
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
    alert(`You type ${value}`);
    // Call your function here
  };

  const { back } = useRouter();

  return (
    <div className="container mx-auto sm:px-4 relative">
      <Head>
        <title>POS - Sistem</title>
      </Head>
      <TopNav title="Produk" onBack={back} />

      <div className="w-full flex flex-col p-4">
        <TextInput
          prefix={<MagnifyingGlassIcon className="w-6 h-6" />}
          onChange={handleChange}
          value={inputValue}
          name="search"
        />
      </div>

      <CircleButton
        className="fixed bottom-5 right-5"
        onClick={() => setIsProductFormDisplayed(!isProductFormDisplayed)}
      />

      <AddProduct
        isProductFormDisplayed={isProductFormDisplayed}
        setIsProductFormDisplayed={setIsProductFormDisplayed}
      />
    </div>
  );
};

export default ProductPage;
