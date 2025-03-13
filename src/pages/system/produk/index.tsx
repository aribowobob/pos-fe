import { GetServerSideProps } from 'next';

import { ProductPage } from '@modules';

export default function System() {
  return <ProductPage />;
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
