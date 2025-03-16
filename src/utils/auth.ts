import { UserType } from '@store';
import { getRuntimeEnv } from '@utils';

export const getUserByToken = async (): Promise<UserType | null> => {
  const API_URL = getRuntimeEnv('API_URL');
  const getUserUrl = `${API_URL}/api/users/get-user`;
  const getUser = await fetch(getUserUrl, {
    method: 'GET',
    credentials: 'include',
  });
  const getUserResponse = await getUser.json();
  const { status, data } = getUserResponse || {};

  if (status === 'success' && !!data) {
    return data;
  }

  return null;
};
