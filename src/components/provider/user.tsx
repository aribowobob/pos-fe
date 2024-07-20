import { useEffect, useState } from 'react';

import { getCookie } from 'cookies-next';

import { useUser } from '@store';
import axios from 'axios';
import { getRuntimeEnv } from '@utils';

const UserProvider = () => {
  const API_URL = getRuntimeEnv('API_URL');
  const getUserUrl = `${API_URL}/get-user`;
  const { id, setUser } = useUser();
  const token = getCookie('token');
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (!id && token && !fetched) {
      setFetched(true);

      axios
        .get(getUserUrl, { headers: { Authorization: `Bearer ${token}` } })
        .then(({ data: dataResponse }) => {
          const { code, data } = dataResponse || {};

          if (code === 200 && !!data) {
            setUser(data);
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default UserProvider;
