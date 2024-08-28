import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';

const TransactionSalesConfirmPage = dynamic(async () => {
  const Page = await import('@/modules/transaction/sales/confirmation');
  return Page;
});

export default function SalesConfirmation() {
  return <TransactionSalesConfirmPage />;
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
