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

import { FormEditCabang, FormAddCabang } from '@modules';
import { cabangDataEdit, ICabangEditProps } from '@types';

const listCabang = [
  {
    id: 1,
    namaCabang: 'Gudang Utama',
    alias: 'GUD',
  },
  {
    id: 2,
    namaCabang: 'Cab. Tabanan',
    alias: 'TAB',
  },
  {
    id: 3,
    namaCabang: 'Cab Denpasar',
    alias: 'DPS',
  },
];

const StorePage: React.FC = () => {
  const [isAddBranchFormDisplayed, setIsAddBranchFormDisplayed] =
    useState(false);
  const [isEditBranchFormDisplayed, setIsEditBranchFormDisplayed] =
    useState(false);
  const [selectedDataToEdit, setSelectedDataToEdit] = useState(cabangDataEdit);

  const { back } = useRouter();
  const { companyName } = useUser();

  const selectBranchToEdit = (param: ICabangEditProps) => {
    console.log({ param });
    setIsEditBranchFormDisplayed(true);
    setSelectedDataToEdit(param);
  };

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
            const { id, namaCabang, alias } = data;
            return (
              <Fragment key={index}>
                <div className="p-4 flex items-center">
                  <div className="w-1/6">{id}</div>
                  <div className="w-4/6">
                    {alias} ({namaCabang})
                  </div>
                  <div className="w-1/6 flex justify-end gap-4">
                    <PencilSquareIcon
                      className="w-5 h-5 cursor-pointer"
                      onClick={() => selectBranchToEdit(data)}
                    />
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

      <FormEditCabang
        title="Ubah Cabang/Gudang"
        isBranchFormDisplayed={isEditBranchFormDisplayed}
        setIsBranchFormDisplayed={setIsEditBranchFormDisplayed}
        dataCabang={selectedDataToEdit}
      />
    </div>
  );
};
export default StorePage;
