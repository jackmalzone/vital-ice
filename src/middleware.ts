import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as Sentry from '@sentry/nextjs';

export function middleware(request: NextRequest) {
  // Check for potential reload indicators
  const referer = request.headers.get('referer');
  if (referer) {
    // Detect if this might be a reload (same page)
    if (referer.includes(request.nextUrl.pathname)) {
      Sentry.captureMessage('Potential page reload detected', {
        level: 'warning',
        tags: {
          pathname: request.nextUrl.pathname,
          referer: referer,
          component: 'middleware',
        },
      });
    }
  }

  // Check for browser-specific headers
  const userAgent = request.headers.get('user-agent') || '';
  if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    // Safari-specific tracking
    Sentry.addBreadcrumb({
      category: 'navigation',
      message: 'Safari browser detected',
      level: 'info',
      data: {
        userAgent,
        pathname: request.nextUrl.pathname,
      },
    });
  } else if (userAgent.includes('Chrome')) {
    // Chrome-specific tracking
    Sentry.addBreadcrumb({
      category: 'navigation',
      message: 'Chrome browser detected',
      level: 'info',
      data: {
        userAgent,
        pathname: request.nextUrl.pathname,
      },
    });
  }

  // Continue with the request
  const response = NextResponse.next();

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
