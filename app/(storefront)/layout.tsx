import { ReactNode } from 'react';
import SiteHeader from '@/components/layout/site-header';

export default function StorefrontLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <SiteHeader />
      <main>{children}</main>
    </div>
  );
}