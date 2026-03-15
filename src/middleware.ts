import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken } from '@/src/lib/session';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('session')?.value;

  const isLoginPage = pathname === '/login';
  const isDestinationsPage = pathname.startsWith('/destinations');

  let isAuthenticated = false;

  if (sessionCookie) {
    try {
      await verifySessionToken(sessionCookie);
      isAuthenticated = true;
    } catch {
      isAuthenticated = false;
    }
  }

  if (isDestinationsPage && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isLoginPage && isAuthenticated) {
    return NextResponse.redirect(new URL('/destinations', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/destinations/:path*'],
};
