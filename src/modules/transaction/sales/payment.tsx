import { useState } from 'react';

import clsx from 'clsx';
import Head from 'next/head';
import { useRouter } from 'next/router';

import {
  Breadcrumb,
  Button,
  CurrencyInput,
  TextInput,
  TopNav,
} from '@components';
import { useUser } from '@store';

import { STEPS } from '../constants';
import { SummaryItems } from './components';

const TransactionSalesPayment = () => {
  const { back, replace } = useRouter();
  const { store } = useUser();
  const { initial = '' } = store || {};
  const breadcrumbItems = STEPS.map(step => ({
    label: step,
  }));
  const [cashPayment, setCashPayment] = useState('');
  const [nonCashPayment, setNonCashPayment] = useState('');
  const [orderDate, setOrderDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  const handleSubmit = () => {
    replace('/transaction/sales/confirmation');
  };

  return (
    <div className="container mx-auto sm:px-4 min-h-screen">
      <Head>
        <title>POS - Transaksi Penjualan</title>
      </Head>
      <TopNav title="Transaksi Penjualan" onBack={back} branchName={initial} />

      <div className="px-4 pt-4 pb-6">
        <Breadcrumb items={breadcrumbItems} currentStep={1} />
        <div className="bg-white p-4 flex flex-col gap-6 w-full rounded mt-4">
          <SummaryItems />
          <TextInput
            type="date"
            label="Tanggal Transaksi"
            name="order_date"
            value={orderDate}
            onChange={e => setOrderDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
          />
          <CurrencyInput
            label="Pembayaran Tunai"
            name="cash_payment"
            prefixElement="Rp"
            value={cashPayment}
            onChange={e => setCashPayment(e.target.value)}
          />
          <CurrencyInput
            label="Pembayaran Non-Tunai"
            name="non_cash_payment"
            prefixElement="Rp"
            value={nonCashPayment}
            onChange={e => setNonCashPayment(e.target.value)}
          />
          <p
            className={clsx('text-base font-medium text-center', {
              'text-red-600': true,
            })}
          >
            SILAKAN INPUT PEMBAYARAN
          </p>
          <Button type="button" color="primary" block onClick={handleSubmit}>
            Bayar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransactionSalesPayment;
