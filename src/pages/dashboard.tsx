import { GetServerSideProps } from 'next';

import { DashboardPage } from '@modules';

export default function Dashboard() {
  return <DashboardPage />;
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { req } = context;
  const { cookies } = req;

  if (!cookies.access_token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
