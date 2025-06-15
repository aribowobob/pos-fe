'use client';

import { AuthGuard } from '@/components/auth/auth-guard';
import { Loader } from '@/components/ui/loader';

export default function Home() {
  return (
    <AuthGuard>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader size="lg" />
        <p className="mt-4 text-gray-500">Redirecting to dashboard...</p>
      </div>
    </AuthGuard>
  );
}
