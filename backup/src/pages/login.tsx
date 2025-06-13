import { GoogleOAuthProvider } from '@react-oauth/google';
import { GetServerSideProps } from 'next';

import { LoginPage } from '@modules';
import { getRuntimeEnv } from '@utils';

export default function Login() {
  const clientId = getRuntimeEnv('GOOGLE_CLIENT_ID');

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <LoginPage />
    </GoogleOAuthProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { req } = context;
  const { cookies } = req;

  if (cookies.token) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
