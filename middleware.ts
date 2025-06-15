import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;
  console.log(`[Middleware] Processing request to: ${path}`);

  // Get access_token from cookies
  const token = request.cookies.get('access_token')?.value;
  const isAuthenticated = !!token;

  console.log(`[Middleware] User is authenticated: ${isAuthenticated}`);

  // Define auth routes that should redirect to dashboard when authenticated
  const isAuthRoute = path === '/login';

  // Define protected routes that require authentication
  const isProtectedRoute =
    path === '/dashboard' ||
    path.startsWith('/products') ||
    path.startsWith('/reports') ||
    path.startsWith('/sales') ||
    path.startsWith('/settings');

  // If user is on auth route and is authenticated, redirect to dashboard
  if (isAuthRoute && isAuthenticated) {
    console.log(
      '[Middleware] Authenticated user accessing auth route, redirecting to dashboard'
    );
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If user is on protected route and is not authenticated, redirect to login
  if (isProtectedRoute && !isAuthenticated) {
    console.log(
      '[Middleware] Unauthenticated user accessing protected route, redirecting to login'
    );
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // For root path, redirect to appropriate page based on auth status
  if (path === '/') {
    if (isAuthenticated) {
      console.log(
        '[Middleware] Authenticated user accessing root, redirecting to dashboard'
      );
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } else {
      console.log(
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
    '/products/:path*',
    '/reports/:path*',
    '/sales/:path*',
    '/settings/:path*',
  ],
};
