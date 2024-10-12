import { authConfig } from './auth.config';
import NextAuth from 'next-auth';
//import { NextRequest, NextResponse } from 'next/server';
//import { getToken } from 'next-auth/jwt';

export default NextAuth(authConfig).auth;

// Secret for JWT
//const secret = process.env.AUTH_SECRET;

/*export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret });

  // If token is not available, redirect to sign-in
  if (!token) {
    // Make sure not to redirect if already on the sign-in or OAuth routes
    if (!req.url.includes('/signin') && !req.url.includes('/api/auth')) {
      const signInUrl = new URL('/signin', req.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}
*/
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

