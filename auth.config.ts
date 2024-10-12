import Resend from "next-auth/providers/resend"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import type { NextAuthConfig } from "next-auth"

 
export const authConfig = {
    pages: {
        signIn: '/signin',
        error: '/error',
    }, 
    providers: [
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: "no-reply@updates.8thwanda.xyz",
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      session.user.id = user?.id ?? token?.sub;
      return session;
    },
  },
  debug: process.env.NODE_ENV !== "development",
} satisfies NextAuthConfig