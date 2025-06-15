'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/lib/store/user-store';
import { Loader } from '@/components/ui/loader';

interface LoginGuardProps {
  children: React.ReactNode;
}

export function LoginGuard({ children }: LoginGuardProps) {
  const router = useRouter();
  const { user, isLoading } = useUserStore();

  useEffect(() => {
    if (user && !isLoading) {
      // If user is already logged in, redirect to dashboard

      // Use timeout to prevent potential issues during rendering
      setTimeout(() => {
        router.replace('/dashboard');
      }, 0);
    }
  }, [user, isLoading, router]);

  // If checking auth status, show loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader size="lg" />
      </div>
    );
  } else if (user) {
    // If user is logged in, do not render children
    // Redirect to dashboard has been handled on useEffect
    return null;
  } else {
    // Allow rendering login page
    return children;
  }
}
