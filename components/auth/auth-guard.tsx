'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

import { Loader } from '@/components/ui/loader';
import { useCurrentUser } from '@/lib/api/auth-api';
import { useUserStore } from '@/lib/store/user-store';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();

  // Use lazy query pattern
  const currentUserQuery = useCurrentUser();
  const {
    data: userData,
    isLoading,
    isError,
    isSuccess,
    error,
    fetch: fetchUser,
  } = currentUserQuery;

  const { setUser } = useUserStore();
  const [shouldRedirect, setShouldRedirect] = useState<string | null>(null);
  const [initialAuthCheckDone, setInitialAuthCheckDone] = useState(false);
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

  // Handle redirect in a separate effect to avoid state updates during render
  useEffect(() => {
    if (shouldRedirect) {
      router.push(shouldRedirect);
    }
  }, [shouldRedirect, router]);

  useEffect(() => {
    // Only run this effect on client-side
    if (typeof window === 'undefined') return;

    // Skip on initial loading
    if (isInitialLoading) return;

    // Since we can't check HTTP-only cookies directly,
    // we'll attempt to fetch user data and see if the request succeeds

    // Set timer to show loading indicator for at least 500ms to avoid flickering
    const loadingTimer = setTimeout(() => {
      if (!isLoading) {
        setInitialAuthCheckDone(true);
      }
    }, 500);

    // Handle authentication based on query state
    if (!isLoading) {
      if (isError) {
        // If there's an error fetching user data, likely unauthorized
        setShouldRedirect('/login');
      } else if (isSuccess && userData) {
        // User data loaded successfully
        // Use timeout to prevent state updates during render
        setTimeout(() => {
          setUser(userData);
          setInitialAuthCheckDone(true);
        }, 0);
        // Don't redirect from root page - only check authentication
        // Let other components handle the redirect to dashboard
      } else if (isSuccess && !userData) {
        // If request was successful but no user data returned
        setShouldRedirect('/login');
      }
    }

    return () => clearTimeout(loadingTimer);
  }, [
    isLoading,
    isError,
    isSuccess,
    userData,
    setUser,
    error,
    isInitialLoading,
  ]);

  // Safeguard to avoid state updates during render
  const updateUserState = () => {
    if (!isLoading && isSuccess && userData) {
      setTimeout(() => {
        setUser(userData);
        setInitialAuthCheckDone(true);
      }, 0);
    }
  };

  // Show loading state during initial authentication check
  const showLoader = isInitialLoading || isLoading || !initialAuthCheckDone;
  if (showLoader) {
    // If we have userData but not initialized yet, update state on next tick
    if (!isLoading && isSuccess && userData && !initialAuthCheckDone) {
      updateUserState();
    }

    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader size="lg" />
      </div>
    );
  }

  // This will render after authentication is complete
  return children;
}
