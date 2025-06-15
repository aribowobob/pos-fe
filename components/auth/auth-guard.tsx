'use client';

import { useCurrentUser, useCheckAuth } from '@/lib/api/auth-api';
import { useUserStore } from '@/lib/store/user-store';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader } from '@/components/ui/loader';
import { getCookie } from 'cookies-next';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const isAuthenticated = useCheckAuth();
  const { data: userData, isLoading, isError, isSuccess } = useCurrentUser();
  const { setUser } = useUserStore();
  const [shouldRedirect, setShouldRedirect] = useState<string | null>(null);
  const [initialAuthCheckDone, setInitialAuthCheckDone] = useState(false);

  // Handle redirect in a separate effect to avoid state updates during render
  useEffect(() => {
    if (shouldRedirect) {
      console.log(`[AuthGuard] Redirecting to: ${shouldRedirect}`);
      router.push(shouldRedirect);
    }
  }, [shouldRedirect, router]);

  useEffect(() => {
    // Only run this effect on client-side
    if (typeof window === 'undefined') return;

    // Check token first
    const token = getCookie('access_token');
    console.log('[AuthGuard] Token exists:', !!token);

    if (!token) {
      console.log('[AuthGuard] No token found, redirecting to login');
      setShouldRedirect('/login');
      return;
    }

    // Only handle redirection after data loading is complete
    if (!isLoading) {
      setInitialAuthCheckDone(true);

      if (isError || !isAuthenticated) {
        setShouldRedirect('/login');
        return;
      }

      if (isSuccess && userData) {
        console.log('[AuthGuard] User data loaded successfully');
        setUser(userData);
        // Don't redirect from root page - only check authentication
        // Let other components handle the redirect to dashboard
      }
    }
  }, [isLoading, isError, isSuccess, isAuthenticated, userData, setUser]);

  // Show loading state during initial authentication check
  if (isLoading || !initialAuthCheckDone) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader size="lg" />
      </div>
    );
  }

  // This will rarely render as the useEffect will redirect
  return children;
}
