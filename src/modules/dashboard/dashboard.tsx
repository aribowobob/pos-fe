import Head from 'next/head';
import { useRouter } from 'next/router';

import { BottomNav, TopNav } from '@components';
import { useUser } from '@store';

import Info from './info';

export const Dashboard = () => {
  const { push } = useRouter();
  const { companyName } = useUser();

  return (
    <div className="container mx-auto sm:px-4">
      <Head>
        <title>POS</title>
      </Head>
      <div className="min-h-screen">
        <TopNav
          title={companyName}
          onCartClick={() => {
            push('/transaction/sales');
          }}
          isCartActive
        />
        <Info />
        <BottomNav />
      </div>
    </div>
  );
};

export default Dashboard;
