import { useMemo, useState } from 'react';

import clsx from 'clsx';
import { toast } from 'react-toastify';
import Head from 'next/head';
import { useRouter } from 'next/router';

import {
  Breadcrumb,
  Button,
  CurrencyInput,
  TextInput,
  TopNav,
} from '@components';
import { useSalesCart } from '@hooks';
import { useSales, useUser } from '@store';
import { money, parseNumber } from '@utils';

import { STEPS } from '../constants';
import { SummaryItems } from './components';

const TransactionSalesPayment = () => {
  const { back } = useRouter();
  const { store } = useUser();
  const { createSalesOrder } = useSalesCart();
  const { initial = '' } = store || {};
  const breadcrumbItems = STEPS.map(step => ({
    label: step,
  }));
  const [orderDate, setOrderDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [cashPayment, setCashPayment] = useState('');
  const [nonCashPayment, setNonCashPayment] = useState('');
  const intCashPayment = parseNumber(cashPayment);
  const intNonCashPayment = parseNumber(nonCashPayment);
  const totalPayment = intCashPayment + intNonCashPayment;
  const { subTotal, loading } = useSales();
  const textTransaction = useMemo(() => {
    if (!orderDate) {
      return <span className="text-red-500">Pilih tangal transaksi</span>;
    }

    if (totalPayment > subTotal) {
      return (
        <span className="text-teal-500">{`Lunas - Kembalian = ${money(
          totalPayment - subTotal
        )}`}</span>
      );
    } else if (totalPayment < subTotal) {
      return (
        <span className="text-amber-600">{`Kurang Bayar ${money(
          subTotal - totalPayment
        )}`}</span>
      );
    } else {
      return <span className="text-teal-500">LUNAS</span>;
    }
  }, [totalPayment, orderDate, subTotal]);

  const handleSubmit = () => {
    // Data validation here
    if (!orderDate) {
      toast.error('Tanggal transaksi tidak boleh kosong.');
      return;
    } else {
      createSalesOrder({
        date: orderDate,
        payment_cash: intCashPayment,
        payment_non_cash: intNonCashPayment,
      });
    }
  };

  return (
    <div className="container mx-auto sm:px-4 min-h-screen">
      <Head>
        <title>POS - Transaksi Penjualan</title>
      </Head>
      <TopNav title="Transaksi Penjualan" onBack={back} branchName={initial} />

      {subTotal > 0 && (
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
              {textTransaction}
            </p>
            <Button
              type="button"
              color="primary"
              block
              disabled={loading}
              onClick={handleSubmit}
            >
              Bayar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionSalesPayment;
