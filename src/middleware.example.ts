import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';
import { verify } from '@/libs/jwtSignVerify';

const secret = process.env.JWT_SECRET_KEY;

export default withAuth(async function middleware(req) {
  const accessToken = req.nextauth.token.accessToken;

  if (accessToken === undefined) {
    req.nextUrl.pathname = '/login';
    return NextResponse.redirect(req.nextUrl);
  }

  try {
    await verify(accessToken as string, secret);
    return NextResponse.next();
  } catch (error) {
    req.nextUrl.pathname = '/login';
    return NextResponse.redirect(req.nextUrl);
  }
});

export const config = {
  matcher: ['/a/:path*', '/((?!_next/static|favicon.ico|login|).*)'],
};
