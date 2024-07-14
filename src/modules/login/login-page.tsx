import type { FC } from 'react';

import { useGoogleLogin } from '@react-oauth/google';
import { setCookie } from 'cookies-next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Button } from '@components';

const LoginPage: FC = () => {
  const { replace } = useRouter();
  const loginWithGoogle = useGoogleLogin({
    onSuccess: codeResponse => {
      // TODO: cek dulu ke server
      setCookie('token', codeResponse.access_token);
      replace('/branches');
    },
    // onError: e => {
    //   toast(<Message text={e.message} type="error" />);
    // },
    // onNonOAuthError: e => {
    //   if (e?.type !== "popup_closed") {
    //     toast(<Message text={e.message} type="error" />);
    //   }
    // },
  });

  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>POS - Login</title>
      </Head>
      <div className="h-screen flex justify-center items-center">
        <div className="p-4 flex gap-4 rounded bg-white flex-col w-full">
          <h1 className="text-2xl">Login</h1>
          <Button block ghost onClick={loginWithGoogle}>
            Login dengan Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
