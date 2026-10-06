import React, { useEffect } from 'react';
import { AuthProvider } from '@site/src/contexts/AuthContext';

/**
 * Docusaurus `Root` swizzle (Spec 002, FR-011).
 *
 * Root is the ONLY component that wraps every page - docs, blog, and custom
 * /app pages alike - and it survives client-side navigation without remounting.
 * That is exactly what FR-011 needs: one continuous session across the textbook
 * and the personal pages, with no re-prompt when crossing between them.
 *
 * Swizzling Layout or Navbar instead would either miss routes or remount the
 * provider on every navigation, dropping session state.
 *
 * Root also renders during SSG, so everything below it must be prerender-safe;
 * AuthProvider handles that by refusing to construct a client outside the
 * browser (see src/lib/supabase.ts).
 */
import { useLocation } from '@docusaurus/router';
import { trackEvent } from '@site/src/lib/analytics';
import { useAuth } from '@site/src/contexts/AuthContext';

function RouteAnalytics() {
  const location = useLocation();
  const { session } = useAuth();

  React.useEffect(() => {
    // app_platform_view
    if (location.pathname.startsWith('/app') || location.pathname.startsWith('/ur/app')) {
      trackEvent('app_platform_view', { user_status: session ? 'signed_in' : 'anonymous' });
    }
  }, [location.pathname, !!session]);

  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.href && anchor.href.endsWith('.pdf')) {
        const url = new URL(anchor.href);
        const fileName = url.pathname.split('/').pop() || anchor.href;
        trackEvent('resource_download', { file_name: fileName, resource_type: 'pdf' });
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}

export default function Root({ children }: { children: React.ReactNode }): React.ReactElement {
  useEffect(() => {
    // Fix: images with loading="lazy" may not have been fetched yet when the user
    // triggers window.print() (e.g. via the PrintHandout button). The browser fires
    // "beforeprint" just before the print dialog opens; switching lazy → eager here
    // and resetting src forces a fetch so images appear in the printed PDF.
    const handler = () => {
      document.querySelectorAll<HTMLImageElement>('img[loading="lazy"]').forEach((img) => {
        img.loading = 'eager';
        if (!img.complete || img.naturalHeight === 0) {
          const src = img.getAttribute('src') ?? '';
          if (src) {
            img.src = ''; // eslint-disable-line no-param-reassign
            img.src = src;
          }
        }
      });
    };
    window.addEventListener('beforeprint', handler);
    return () => window.removeEventListener('beforeprint', handler);
  }, []);

  return (
    <AuthProvider>
      <RouteAnalytics />
      {children}
    </AuthProvider>
  );
}
