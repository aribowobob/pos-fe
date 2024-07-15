import { GoogleOAuthProvider } from '@react-oauth/google';
import { GetServerSideProps } from 'next';

import { LoginPage } from '@modules';

export default function Login() {
  return (
    <GoogleOAuthProvider clientId="1072376775658-iramhlg6m2ajepo2udu1dvormujli05u.apps.googleusercontent.com">
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
