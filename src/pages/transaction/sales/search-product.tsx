import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';

const TransactionSalesSearchPage = dynamic(async () => {
  const Page = await import('@/modules/search/sales-search-product');
  return Page;
});

export default function Sales() {
  return <TransactionSalesSearchPage />;
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
