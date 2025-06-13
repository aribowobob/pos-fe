import { UserType } from '@store';
import { getRuntimeEnv } from '@utils';

export const getUserByToken = async (
  token?: string
): Promise<UserType | null> => {
  const API_URL = getRuntimeEnv('API_URL');
  const getUserUrl = `${API_URL}/get-user`;
  const getUser = await fetch(getUserUrl, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const getUserResponse = await getUser.json();
  const { code, data } = getUserResponse || {};

  if (code === 200 && !!data) {
    return data;
  }

  return null;
};
