import Head from 'next/head';

import { BottomNav, TopNav } from '@components';
import Info from './info';
import { useRouter } from 'next/router';

export const Dashboard = () => {
  const { push } = useRouter();

  return (
    <div className="container mx-auto sm:px-4">
      <Head>
        <title>POS</title>
      </Head>
      <div className="min-h-screen">
        <TopNav
          title="Primadona Store"
          onCartClick={() => {
            push('/cart');
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
