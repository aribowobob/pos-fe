import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';

const TransactionSalesCartPage = dynamic(async () => {
  const Page = await import('@/modules/transaction/sales');
  return Page.TransactionSalesCart;
});

export default function SalesCart() {
  return <TransactionSalesCartPage />;
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
