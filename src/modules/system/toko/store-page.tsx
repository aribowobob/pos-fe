import React from 'react';
import Head from 'next/head';
import { Button, TopNav } from '@components';
import { useRouter } from 'next/router';
import { useUser } from '@store';
import {
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

const StorePage: React.FC = () => {
  const { back } = useRouter();
  const { companyName } = useUser();
  return (
    <div className="container mx-auto sm:px-4 relative">
      <Head>
        <title>POS - Sistem</title>
      </Head>
      <TopNav title="Toko" onBack={back} />
      <div className="p-4">
        <div className="mt-4 block gap-4 rounded-md bg-white">
          <div className="p-4 text-lg">Nama Toko</div>
          <div className="ml-4 mr-4 bg-gray-500">
            <hr />
          </div>
          <div className="p-4 flex items-center justify-between">
            <p className="text-lg">{companyName}</p>
            <span>
              <PencilSquareIcon className="w-5 h-5 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="mt-4 block gap-4 rounded-md bg-white">
          <div className="p-4 text-lg flex justify-between items-center">
            <p>Daftar Cabang / Gudang</p>
            <Button type="button" color="primary">
              <PlusIcon className="w-3 h-3 mr-1 text-white" />
              Tambah
            </Button>
          </div>
          <div className="ml-4 mr-4 bg-gray-500">
            <hr />
          </div>
          <div className="p-4 flex items-center">
            <div className="w-1/6">1</div>
            <div className="w-4/6">GUD (Gudang Utama)</div>
            <div className="w-1/6 flex justify-end gap-4">
              <PencilSquareIcon className="w-5 h-5 cursor-pointer" />
              <TrashIcon className="w-5 h-5 cursor-pointer" />
            </div>
          </div>
          <div className="p-4 flex items-center">
            <div className="w-1/6">2</div>
            <div className="w-4/6">GUD (Gudang 2)</div>
            <div className="w-1/6 flex justify-end gap-4">
              <PencilSquareIcon className="w-5 h-5 cursor-pointer" />
              <TrashIcon className="w-5 h-5 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StorePage;
