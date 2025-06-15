'use client';

import { LoginGuard } from '@/components/auth/login-guard';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LoginGuard>{children}</LoginGuard>;
}
