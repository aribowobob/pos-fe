import type { FC } from 'react';

import { useGoogleLogin } from '@react-oauth/google';
import Axios from 'axios';
import { setCookie } from 'cookies-next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Button } from '@components';
import { useUser } from '@store';
import { getRuntimeEnv } from '@utils';

const LoginPage: FC = () => {
  const API_URL = getRuntimeEnv('API_URL');
  const getTokenUrl = `${API_URL}/get-token`;
  const { replace } = useRouter();
  const { setUser } = useUser();
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async codeResponse => {
      const getToken = Axios.get(getTokenUrl, {
        headers: { Token: codeResponse.access_token },
      }).catch(() => {
        alert('Error get token.');
      });
      const dataToken = await getToken;
      const { code: codeGetToken, data: accessToken } = dataToken?.data || {};

      if (codeGetToken === 200 && !!accessToken) {
        const getUser = await Axios.get(`${API_URL}/get-user`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        }).catch(() => {
          alert('Error get data user.');
        });
        const { code, data } = getUser?.data || {};

        if (code === 200 && !!data) {
          setUser(data);
          setCookie('token', accessToken);
          replace('/branches');
        }
      }
    },
    onError: () => {
      alert('Error login with google.');
    },
    onNonOAuthError: () => {
      alert('Unknown error. Non oauth error.');
    },
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
