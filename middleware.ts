import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

// Secret for JWT
const secret = process.env.AUTH_SECRET;

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret });

  // If token is not available, redirect to sign-in
  if (!token) {
    const signInUrl = new URL('/signin', req.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

// Define the paths that will be protected by this middleware
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)",'/dashboard', ]
};
