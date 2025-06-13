import { useMutation, useQuery } from '@tanstack/react-query';
import { setCookie, deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { postData } from './api-client';
import type { AuthResponse, LoginCredentials, GoogleLoginPayload } from '../types/auth';

export const useLogin = () => {
  const router = useRouter();
  
  return useMutation({
    mutationFn: (credentials: LoginCredentials) => 
      postData<AuthResponse>('/auth/login', credentials),
    onSuccess: (data) => {
      setCookie('auth-token', data.token);
      router.push('/dashboard');
    },
  });
};

export const useGoogleLogin = () => {
  const router = useRouter();
  
  return useMutation({
    mutationFn: (payload: GoogleLoginPayload) => 
      postData<AuthResponse>('/auth/google', payload),
    onSuccess: (data) => {
      setCookie('auth-token', data.token);
      router.push('/dashboard');
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  
  const logout = () => {
    deleteCookie('auth-token');
    router.push('/login');
  };
  
  return { logout };
};
