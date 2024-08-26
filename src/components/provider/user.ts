import { useEffect, useState } from 'react';

import { getCookie } from 'cookies-next';

import axios from 'axios';
import { useRouter } from 'next/router';
import { deleteCookie } from 'cookies-next';

import { useUser } from '@store';
import { getRuntimeEnv } from '@utils';

const UserProvider = () => {
  const API_URL = getRuntimeEnv('API_URL');
  const getUserUrl = `${API_URL}/get-user`;
  const { id, setUser, setLoading } = useUser();
  const token = getCookie('token');
  const [fetched, setFetched] = useState(false);
  const { replace } = useRouter();

  useEffect(() => {
    if (!id && token && !fetched) {
      setFetched(true);
      setLoading(true);
      axios
        .get(getUserUrl, { headers: { Authorization: `Bearer ${token}` } })
        .then(({ data: dataResponse }) => {
          const { code, data } = dataResponse || {};

          if (code === 200 && !!data) {
            setUser(data);
          }
        })
        .catch(() => {
          deleteCookie('token');
          replace('/login');
        })
        .finally(() => {
          setLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default UserProvider;
