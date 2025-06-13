import { ReactNode, useEffect } from 'react';

import axios from 'axios';
import { useRouter } from 'next/router';
import { deleteCookie } from 'cookies-next';

import { useUser } from '@store';
import { getRuntimeEnv } from '@utils';

type UserProviderProps = {
  children: ReactNode;
};

const UserProvider = ({ children }: UserProviderProps) => {
  const { fetched, id, loading, setFetched, setLoading, setUser } = useUser();
  const { replace } = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const API_URL = getRuntimeEnv('API_URL');
      const getUserUrl = `${API_URL}/api/users/get-user`;

      setLoading(true);
      try {
        const { data: dataResponse } = await axios.get(getUserUrl, {
          withCredentials: true,
        });
        const { status, data } = dataResponse || {};

        if (status === 'success' && !!data) {
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
      } catch (error) {
        deleteCookie('access_token');
        replace('/login');
      } finally {
        setLoading(false);
        setFetched(true);
      }
    };

    if (!id && !fetched && !loading) {
      fetchUser();
    }
  }, [fetched, id, loading, replace, setFetched, setLoading, setUser]);

  if (!id && !fetched && !loading) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500" />
      </div>
    );
  }

  return children;
};

export default UserProvider;
