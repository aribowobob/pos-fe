'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';
import { useCurrentUser } from '@/lib/api/auth-api';
import { useUserStore } from '@/lib/store/user-store';
import { Loader } from '@/components/ui/loader';

interface DashboardAuthGuardProps {
  children: React.ReactNode;
}

export function DashboardAuthGuard({ children }: DashboardAuthGuardProps) {
  const router = useRouter();
  const token = getCookie('access_token');
  const { data: userData, isLoading, isError, isSuccess } = useCurrentUser();
  const { setUser, user } = useUserStore();
  const [shouldRedirect, setShouldRedirect] = useState<string | null>(null); // Handle redirect in a separate effect
  useEffect(() => {
    let redirectTimeoutId: NodeJS.Timeout | null = null;

    if (shouldRedirect) {
      console.log(
        `[DashboardAuthGuard] Will redirect to: ${shouldRedirect} in 100ms`
      );

      // Add small delay to ensure we don't have competing redirects
      redirectTimeoutId = setTimeout(() => {
        console.log(
          `[DashboardAuthGuard] Now redirecting to: ${shouldRedirect}`
        );
        router.push(shouldRedirect);
      }, 100);
    }

    return () => {
      if (redirectTimeoutId) {
        clearTimeout(redirectTimeoutId);
      }
    };
  }, [shouldRedirect, router]);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    console.log('[DashboardAuthGuard] Auth check - Token exists:', !!token);

    // If no token, redirect to login immediately
    if (!token) {
      console.log('[DashboardAuthGuard] No token found, redirecting to login');
      setShouldRedirect('/login');
      return;
    }

    // When data fetching is complete
    if (!isLoading) {
      console.log(
        '[DashboardAuthGuard] Data loading complete - Error:',
        isError,
        'Success:',
        isSuccess
      );

      if (isError) {
        console.log(
          '[DashboardAuthGuard] Error fetching user data, redirecting to login'
        );
        setShouldRedirect('/login');
        return;
      }

      if (isSuccess && userData) {
        console.log(
          '[DashboardAuthGuard] User data loaded successfully:',
          userData
        );
        // Update user data in store
        setUser(userData);
      }
    }
  }, [isLoading, isError, isSuccess, userData, setUser, token]);

  // Show loading state while fetching user data
  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader size="lg" />
      </div>
    );
  }

  // Once authenticated and user data is loaded, render the dashboard content
  return children;
}
