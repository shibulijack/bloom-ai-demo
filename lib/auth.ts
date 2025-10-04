import Google from 'next-auth/providers/google';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './prisma';

function requireEnv(name: string) {
  const v = process.env[name];
  if (!v) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return v;
}

export const { auth, handlers: { GET, POST }, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: requireEnv('GOOGLE_CLIENT_ID'),
      clientSecret: requireEnv('GOOGLE_CLIENT_SECRET'),
    })
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user, account }) {
      // On initial sign in, propagate the user id
      if (user) {
        (token as any).id = (user as any).id || (token.sub as string | undefined);
      }
      // v5 sometimes sets token.sub only; ensure id mirrors it
      if (!(token as any).id && token.sub) (token as any).id = token.sub;
      return token;
    },
    async session({ session, token }) {
      if (!session.user) session.user = {} as any;
      const id = (token as any).id || token.sub;
      if (id) (session.user as any).id = id;
      return session;
    }
  }
});
