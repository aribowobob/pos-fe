import Head from 'next/head';
import { useRouter } from 'next/router';

import { TopNav } from '@components';
import { ContinuePayment } from './components';

const TransactionSalesPage = () => {
  const { back } = useRouter();

  return (
    <div className="container mx-auto sm:px-4 min-h-screen">
      <Head>
        <title>POS - Transaksi Penjualan</title>
      </Head>
      <TopNav title="Transaksi Penjualan" onBack={back} branchName="GUD" />

      <ContinuePayment />
    </div>
  );
};

export default TransactionSalesPage;
