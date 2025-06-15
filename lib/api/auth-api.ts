import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { postData, getData } from './api-client';
import type {
  AuthResponse,
  GetCurrentUserRes,
  GoogleLoginPayload,
} from '../types/auth';
import { toast } from 'sonner';
import { useUserStore } from '../store/user-store';

export const useGoogleLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setUser } = useUserStore();

  return useMutation({
    mutationFn: (payload: GoogleLoginPayload) =>
      postData<AuthResponse>('/auth/google', payload),
    onSuccess: async data => {
      if (data.status === 'success' && data.data.token) {
        console.log('[useGoogleLogin] Login successful');

        try {
          // Cookie is set by the server in HTTP response
          // We just need to fetch user data and update UI state

          // Fetch user data directly
          try {
            const userData = await getData<{
              data: GetCurrentUserRes;
              status: string;
              message: string;
            }>('/users/get-user');

            if (userData && userData.data) {
              // Set user in store
              setUser(userData.data);
              console.log('[useGoogleLogin] User data fetched and stored');
            }
          } catch (error) {
            console.error('[useGoogleLogin] Error fetching user data:', error);
          }

          // Invalidate query to ensure fresh data
          queryClient.invalidateQueries({ queryKey: ['currentUser'] });

          // Navigate directly without setTimeout
          console.log('[useGoogleLogin] Redirecting to dashboard');
          router.replace('/dashboard');
        } catch (error) {
          console.error(
            '[useGoogleLogin] Error during post-login process:',
            error
          );
          toast.error('Terjadi kesalahan saat masuk. Silakan coba lagi.');
        }
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
  const { setUser } = useUserStore();
  const queryClient = useQueryClient();

  const logout = async () => {
    try {
      console.log('[useLogout] Calling logout API endpoint');

      // Call logout API endpoint to clear server-side cookie
      await postData('/auth/logout', {});

      // Clear user data from store
      setUser({} as GetCurrentUserRes);

      // Invalidate any existing queries
      queryClient.clear();

      console.log('[useLogout] Successfully logged out, redirecting to login');

      // Navigate to login page
      router.push('/login');
    } catch (error) {
      console.error('[useLogout] Error during logout:', error);
      // Still try to redirect even if there was an error
      router.push('/login');
    }
  };

  return { logout };
};

export const useCurrentUser = () => {
  const token = getCookie('access_token');
  const tokenExists = !!token;

  console.log('[useCurrentUser] Token exists:', tokenExists);

  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      try {
        console.log('[useCurrentUser] Fetching user data');
        const response = await getData<{
          data: GetCurrentUserRes;
          status: string;
          message: string;
        }>('/users/get-user');
        console.log('[useCurrentUser] User data fetched successfully');
        return response.data;
      } catch (error) {
        console.error('[useCurrentUser] Error fetching current user:', error);
        throw error;
      }
    },
    enabled: tokenExists,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

export const useCheckAuth = () => {
  const token = getCookie('access_token');
  const isAuthenticated = !!token;
  console.log('[useCheckAuth] Is user authenticated:', isAuthenticated);
  return isAuthenticated;
};
