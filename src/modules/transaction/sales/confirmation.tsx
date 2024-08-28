import Head from 'next/head';
import { useRouter } from 'next/router';

import { Breadcrumb, Button, TopNav } from '@components';
import { useUser } from '@store';

import { STEPS } from '../constants';
import { HandThumbUpIcon } from '@heroicons/react/24/outline';

const TransactionSalesConfirmation = () => {
  const { back, replace } = useRouter();
  const { store } = useUser();
  const { initial = '' } = store || {};
  const breadcrumbItems = STEPS.map(step => ({
    label: step,
  }));

  return (
    <div className="container mx-auto sm:px-4 min-h-screen">
      <Head>
        <title>POS - Transaksi Penjualan</title>
      </Head>
      <TopNav title="Transaksi Penjualan" onBack={back} branchName={initial} />

      <div className="px-4 pt-4 pb-6">
        <Breadcrumb items={breadcrumbItems} currentStep={3} />
        <div className="bg-white p-4 flex flex-col gap-6 w-full rounded mt-4 items-center">
          <HandThumbUpIcon className="w-32 h-32" />
          <p className="text-center font-medium">
            Transaksi Penjualan Berhasil Disimpan
          </p>
          <div className="flex flex-col gap-2 w-full">
            <Button
              color="primary"
              onClick={() => replace('/transaction/sales')}
            >
              Buat Transaksi Penjualan Lagi
            </Button>
            <Button
              color="primary"
              ghost
              onClick={() => replace('/report/sales')}
            >
              Lihat Transaksi Penjualan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionSalesConfirmation;
