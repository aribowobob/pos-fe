import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';

const TransactionSalesPaymentPage = dynamic(async () => {
  const Page = await import('@/modules/transaction/sales');
  return Page.TransactionSalesPayment;
});

export default function SalesPayment() {
  return <TransactionSalesPaymentPage />;
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
