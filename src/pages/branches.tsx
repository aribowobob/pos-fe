import { GetServerSideProps } from 'next';

import { BranchesPage } from '@modules';

export default function Branches() {
  return <BranchesPage />;
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { req } = context;
  const { cookies } = req;

  // if (!cookies.access_token) {
  //   return {
  //     redirect: {
  //       destination: '/login',
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: {},
  };
};
