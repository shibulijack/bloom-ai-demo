import '../styles/globals.css';

import { ReactNode } from 'react';
// If you need client-side session context (e.g., useSession in many client components),
// wrap children with <ClientSessionProvider>. Keeping it off by default keeps layout a pure
// Server Component and avoids unnecessary client bundle.
// import { ClientSessionProvider } from '@/components/providers/session-provider';

// Client wrapper for NextAuth SessionProvider
// (Server Components cannot directly use React context providers that depend on client APIs)
// If session data is primarily accessed via getServerSession in server components, you can
// remove the client provider completely unless you need client-side session state.

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
  <body>{children}</body>
    </html>
  );
}