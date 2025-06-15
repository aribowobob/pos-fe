import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { devLog } from '@/lib/utils/common';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;
  devLog(`[Middleware] Processing request to: ${path}`);

  // Since middleware runs on the server, we can access cookies directly
  // Get access_token from cookies
  const token = request.cookies.get('access_token')?.value;
  const isAuthenticated = !!token;

  devLog(`[Middleware] User is authenticated: ${isAuthenticated}`);

  // Define auth routes that should redirect to dashboard when authenticated
  const isAuthRoute = path === '/login';

  // Define protected routes that require authentication
  const isProtectedRoute =
    path === '/dashboard' ||
    path.startsWith('/reports') ||
    path.startsWith('/transactions') ||
    path.startsWith('/settings');

  // If user is on auth route and is authenticated, redirect to dashboard
  if (isAuthRoute && isAuthenticated) {
    devLog(
      '[Middleware] Authenticated user accessing auth route, redirecting to dashboard'
    );
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If user is on protected route and is not authenticated, redirect to login
  if (isProtectedRoute && !isAuthenticated) {
    devLog(
      '[Middleware] Unauthenticated user accessing protected route, redirecting to login'
    );
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // For root path, redirect to appropriate page based on auth status
  if (path === '/') {
    if (isAuthenticated) {
      devLog(
        '[Middleware] Authenticated user accessing root, redirecting to dashboard'
      );
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } else {
      devLog(
        '[Middleware] Unauthenticated user accessing root, redirecting to login'
      );
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

// Configure matcher to specify which routes middleware should run on
export const config = {
  matcher: [
    '/',
    '/login',
    '/dashboard',
    '/reports/:path*',
    '/transactions/:path*',
    '/settings/:path*',
  ],
};
