import Head from 'next/head';

import { TopNav } from '@components';

export const Dashboard = () => {
  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>POS</title>
      </Head>
      <div className="min-h-screen">
        <TopNav />
      </div>
    </div>
  );
};

export default Dashboard;
