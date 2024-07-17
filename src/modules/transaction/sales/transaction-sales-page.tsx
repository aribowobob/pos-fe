import { useState } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { Breadcrumb, TopNav } from '@components';
import { ContinuePayment, SalesCart } from './components';

import { STEPS } from '../constants';

const TransactionSalesPage = () => {
  const { back } = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const breadcrumbItems = STEPS.map(step => ({
    label: step,
  }));

  return (
    <div className="container mx-auto sm:px-4 min-h-screen">
      <Head>
        <title>POS - Transaksi Penjualan</title>
      </Head>
      <TopNav title="Transaksi Penjualan" onBack={back} branchName="GUD" />

      <div className="px-4 pt-4 pb-28">
        <Breadcrumb items={breadcrumbItems} currentStep={currentStep} />
        <SalesCart />
      </div>

      <ContinuePayment onNext={() => setCurrentStep(currentStep + 1)} />
    </div>
  );
};

export default TransactionSalesPage;
