import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { postData, getData } from './api-client';
import type {
  AuthResponse,
  GetCurrentUserRes,
  GoogleLoginPayload,
} from '../types/auth';
import { toast } from 'sonner';

export const useGoogleLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: GoogleLoginPayload) =>
      postData<AuthResponse>('/auth/google', payload),
    onSuccess: data => {
      if (data.status === 'success' && data.data.token) {
        router.push('/dashboard');
      } else {
        toast.error(data.message || 'Login gagal. Silakan coba lagi.');
      }
    },
    onError: () => {
      toast.error('Login Google gagal. Silakan coba lagi.');
    },
  });
};

export const useLogout = () => {
  const router = useRouter();

  const logout = () => {
    deleteCookie('access_token');
    router.push('/login');
  };

  return { logout };
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: () => getData<GetCurrentUserRes>('/users/get-user'),
    enabled: !!getCookie('access_token'),
  });
};

export const useCheckAuth = () => {
  const router = useRouter();
  const token = getCookie('access_token');

  if (!token && typeof window !== 'undefined') {
    router.push('/login');
    return false;
  }

  return true;
};
