import { useEffect, useState } from 'react';

import axios from 'axios';
import { useRouter } from 'next/router';
import { deleteCookie } from 'cookies-next';

import { useUser } from '@store';
import { getRuntimeEnv } from '@utils';

const UserProvider = () => {
  const API_URL = getRuntimeEnv('API_URL');
  const getUserUrl = `${API_URL}/api/user/get-user`;
  const { id, setUser, setLoading } = useUser();
  const [fetched, setFetched] = useState(false);
  const { replace } = useRouter();

  useEffect(() => {
    if (!id && !fetched) {
      setFetched(true);
      setLoading(true);
      
      axios
        .get(getUserUrl, { withCredentials: true })
        .then(({ data: dataResponse }) => {
          const { message, data } = dataResponse || {};

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
