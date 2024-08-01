import Head from 'next/head';
import { useRouter } from 'next/router';

import { Button } from '@components';
import { StoreType, useUser } from '@store';
import { useEffect } from 'react';

const Branches = () => {
  const { replace } = useRouter();
  const { setStore, id, userStores } = useUser();
  const storesLength = (userStores || []).length;

  const handleClick = (store: StoreType) => {
    setStore(store);
    replace('/dashboard');
  };

  useEffect(() => {
    if (!!id && storesLength < 2) {
      replace('/dashboard');
    }
  }, [id, replace, storesLength]);

  if (!id) return null;
  if (storesLength < 2) return null;

  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>POS - Pilih Cabang atau Gudang</title>
      </Head>
      <div className="h-screen flex justify-center items-center">
        <div className="p-4 flex gap-4 rounded bg-white flex-col w-full">
          <h1 className="text-2xl">Pilih Cabang/Gudang</h1>
          {(userStores || []).map(data => (
            <Button
              block
              ghost
              key={data.initial}
              onClick={() => {
                handleClick(data);
              }}
            >
              {`${data.initial} (${data.name})`}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Branches;
