import { useState } from 'react';
import type { FC } from 'react';

import { useGoogleLogin } from '@react-oauth/google';
import Axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Button } from '@components';
import { useUser } from '@store';
import { getRuntimeEnv } from '@utils';
import { toast } from 'react-toastify';

const LoginPage: FC = () => {
  const API_URL = getRuntimeEnv('API_URL');
  const getTokenUrl = `${API_URL}/auth/google`;
  const { replace } = useRouter();
  const { setUser } = useUser();
  const [loading, setLoading] = useState(false);
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async codeResponse => {
      const getToken = Axios.post(getTokenUrl, {
        token: codeResponse.access_token
      }, {
        withCredentials: true,
      }).catch(() => {
        toast.error('Error get token.');
        setLoading(false);
      });
      const dataToken = await getToken;
      const { message } = dataToken?.data || {};

      if (message === 'success') {
        const getUser = await Axios.get(`${API_URL}/api/user/get-user`, {
          withCredentials: true,
        }).catch(() => {
          toast.error('Error get data user.');
          setLoading(false);
        });

        const { data, message } = getUser?.data || {};

        if (message === 'success' && !!data) {
          setUser({
            id: data.id,
            fullName: data.full_name,
            initial: data.initial,
            email: data.email,
            companyId: data.company_id,
            companyName: data.company_name,
            userStores: data.stores,
          });

          replace('/branches');
        } else {
          toast.error('Error get data user.');
          setLoading(false);
        }
      }
    },
    onError: () => {
      toast.error('Error login with google.');
      setLoading(false);
    },
    onNonOAuthError: () => {
      toast.error('Unknown error. Non oauth error.');
      setLoading(false);
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
          <Button
            block
            ghost
            disabled={loading}
            onClick={() => {
              setLoading(true);
              loginWithGoogle();
            }}
          >
            Login dengan Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
