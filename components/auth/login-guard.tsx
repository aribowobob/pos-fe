'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';
import { useCurrentUser } from '@/lib/api/auth-api';
import { useUserStore } from '@/lib/store/user-store';
import { Loader } from '@/components/ui/loader';

interface LoginGuardProps {
  children: React.ReactNode;
}

export function LoginGuard({ children }: LoginGuardProps) {
  const router = useRouter();
  const token = getCookie('access_token');
  const { isLoading, isSuccess } = useCurrentUser();
  const { user } = useUserStore();
  const [shouldRedirect, setShouldRedirect] = useState<boolean>(false); // Handle redirect in a separate effect
  useEffect(() => {
    if (shouldRedirect) {
      console.log('[LoginGuard] Redirecting to dashboard...');
      router.replace('/dashboard');
    }
  }, [shouldRedirect, router]);

  // This is now simplified since middleware handles most redirects
  // We'll just keep a minimal check in case middleware doesn't catch it
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    console.log('[LoginGuard] Auth check - Token exists:', !!token);

    // Only check for authenticated users who got to the login page somehow
    if (token) {
      // Add a small delay to let middleware work first
      const timer = setTimeout(() => {
        if (!isLoading && (isSuccess || user)) {
          console.log(
            '[LoginGuard] User authenticated, will redirect to dashboard'
          );
          setShouldRedirect(true);
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isLoading, isSuccess, token, user]);

  // If checking auth status, show loading
  if (token && isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader size="lg" />
      </div>
    );
  }

  // Allow rendering login page
  return children;
}
