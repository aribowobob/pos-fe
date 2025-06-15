import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
        try {
          // Fetch user data directly
          const userData = await getData<{
            data: GetCurrentUserRes;
            status: string;
            message: string;
          }>('/users/get-user');

          if (userData && userData.data) {
            // Set user in store
            setUser(userData.data);
          }

          // Invalidate query to ensure fresh data
          queryClient.invalidateQueries({ queryKey: ['currentUser'] });

          // Navigate to dashboard
          router.replace('/dashboard');
        } catch {
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
  const { resetUser } = useUserStore();
  const queryClient = useQueryClient();

  const logout = async () => {
    try {
      // Call logout API endpoint to clear server-side cookie
      await postData('/auth/logout', {});

      // Clear user data from store
      resetUser();

      // Invalidate any existing queries
      queryClient.clear();

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
  // We can't check for HTTP-only cookies directly from JS
  // We'll use lazy query to fetch user data only when needed

  const queryClient = useQueryClient();

  const fetchUserFn = async () => {
    try {
      // Fetch user data from the API
      const response = await getData<{
        data: GetCurrentUserRes;
        status: string;
        message: string;
      }>('/users/get-user');
      // User data fetched successfully
      return response.data;
    } catch (error) {
      // Error fetching current user
      throw error;
    }
  };

  const queryResult = useQuery({
    queryKey: ['currentUser'],
    queryFn: fetchUserFn,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 1,
    enabled: false, // Start with disabled (lazy)
  });

  // Return query result with added fetch method
  return {
    ...queryResult,
    fetch: () =>
      queryClient.fetchQuery({
        queryKey: ['currentUser'],
        queryFn: fetchUserFn,
      }),
  };
};
