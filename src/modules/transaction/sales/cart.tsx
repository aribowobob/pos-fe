import Head from 'next/head';
import { useRouter } from 'next/router';

import { Breadcrumb, TopNav } from '@components';
import { useUser } from '@store';

import { ContinuePayment, SalesCart } from './components';
import { STEPS } from '../constants';

const TransactionSalesCart = () => {
  const { back, push } = useRouter();
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

      <div className="px-4 pt-4 pb-48">
        <Breadcrumb items={breadcrumbItems} currentStep={0} />
        <SalesCart />
      </div>

      <ContinuePayment
        onNext={() => {
          push('/transaction/sales/payment');
        }}
      />
    </div>
  );
};

export default TransactionSalesCart;
