import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';

const TransactionSalesPage = dynamic(async () => {
  const Page = await import('@/modules');
  return Page.TransactionSalesPage;
});

export default function Sales() {
  return <TransactionSalesPage />;
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { req } = context;
  const { cookies } = req;

  if (!cookies.token) {
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
