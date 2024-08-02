import React, { Fragment, useState } from 'react';
import Head from 'next/head';
import { Button, TopNav } from '@components';
import { useRouter } from 'next/router';
import { useUser } from '@store';
import {
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import FormAddCabang from './form-add-cabang';

const listCabang = [
  {
    id: 1,
    name: 'GUD (Gudang Utama)',
    url: '',
  },
  {
    id: 2,
    name: 'TAB (Cab. Tabanan)',
    url: '',
  },
  {
    id: 3,
    name: 'DPS (Cab Tabanan)',
    url: '',
  },
];

const StorePage: React.FC = () => {
  const [isAddBranchFormDisplayed, setIsAddBranchFormDisplayed] =
    useState(false);
  /* const [isEditBranchFormDisplayed, setIsEditBranchFormDisplayed] =
    useState(false); */

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
            <Button
              type="button"
              color="primary"
              onClick={() => setIsAddBranchFormDisplayed(true)}
            >
              <PlusIcon className="w-3 h-3 mr-1 text-white" />
              Tambah
            </Button>
          </div>
          <div className="ml-4 mr-4 bg-gray-500">
            <hr />
          </div>

          {listCabang?.map((data, index) => {
            const { id, name } = data;
            return (
              <Fragment key={index}>
                <div className="p-4 flex items-center">
                  <div className="w-1/6">{id}</div>
                  <div className="w-4/6">{name}</div>
                  <div className="w-1/6 flex justify-end gap-4">
                    <PencilSquareIcon className="w-5 h-5 cursor-pointer" />
                    <TrashIcon className="w-5 h-5 cursor-pointer" />
                  </div>
                </div>
                <div className="ml-4 mr-4 bg-gray-500">
                  <hr className="border-dashed" />
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>

      <FormAddCabang
        title="Tambah Cabang/Gudang"
        isBranchFormDisplayed={isAddBranchFormDisplayed}
        setIsBranchFormDisplayed={setIsAddBranchFormDisplayed}
      />
    </div>
  );
};
export default StorePage;
