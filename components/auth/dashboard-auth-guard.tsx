'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

import { Loader } from '@/components/ui/loader';
import { useCurrentUser } from '@/lib/api/auth-api';
import { useUserStore } from '@/lib/store/user-store';

interface DashboardAuthGuardProps {
  children: React.ReactNode;
}

export function DashboardAuthGuard({ children }: DashboardAuthGuardProps) {
  const router = useRouter();

  // Use lazy query pattern with enabled: false
  const currentUserQuery = useCurrentUser();
  const {
    data: userData,
    isLoading,
    isError,
    isSuccess,
    fetch: fetchUser,
  } = currentUserQuery;

  const { setUser, user } = useUserStore();
  const [shouldRedirect, setShouldRedirect] = useState<string | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Prevent state updates during render
  const hasMounted = useRef(false);

  // Trigger fetch on mount
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      fetchUser()
        .then(() => setIsInitialLoading(false))
        .catch(() => setIsInitialLoading(false));
    }
  }, [fetchUser]);

  // Effect for handling redirections
  useEffect(() => {
    let redirectTimeoutId: NodeJS.Timeout | null = null;

    if (shouldRedirect) {
      // Add small delay to ensure we don't have competing redirects
      redirectTimeoutId = setTimeout(() => {
        router.push(shouldRedirect);
      }, 100);
    }

    return () => {
      if (redirectTimeoutId) {
        clearTimeout(redirectTimeoutId);
      }
    };
  }, [shouldRedirect, router]);

  // Effect for authentication logic - separate from render cycle
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Skip on initial loading
    if (isInitialLoading) return;

    // When data fetching is complete
    if (!isLoading) {
      if (isError) {
        setShouldRedirect('/login');
        return;
      }

      if (isSuccess && userData) {
        // Use timeout to prevent updates during render cycle
        setTimeout(() => {
          setUser(userData);
        }, 0);
      } else if (isSuccess && !userData) {
        setShouldRedirect('/login');
      }
    }
  }, [isLoading, isError, isSuccess, userData, setUser, isInitialLoading]);

  // Safeguard to avoid state updates during render
  const updateUserState = () => {
    if (!isLoading && isSuccess && userData && !user) {
      setTimeout(() => {
        setUser(userData);
      }, 0);
    }
  };

  // Show loading state while checking authentication status
  const showLoader = isInitialLoading || isLoading || (!isError && !user);

  if (showLoader) {
    // If we have userData but user in store is null, update store on next tick
    if (!isLoading && isSuccess && userData && !user) {
      updateUserState();
    }

    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader size="lg" />
      </div>
    );
  }

  // Once authenticated and user data is loaded, render the dashboard content
  return children;
}
