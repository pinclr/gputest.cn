import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import { EnvBanner } from './EnvBanner';
import { FloatingContact } from '@/components/FloatingContact';

export function RootLayout() {
  const location = useLocation();
  return (
    <div className="flex min-h-screen flex-col">
      <EnvBanner />
      <SiteHeader />
      <main key={location.pathname} className="flex-1 animate-fade-in">
        <Outlet />
      </main>
      <SiteFooter />
      <FloatingContact />
      <ScrollRestoration />
    </div>
  );
}
