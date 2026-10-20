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
import {
  addLinkQrCodesNow,
  loadImagesForPrint,
  prepareLinkQrCodes,
  printHandout,
  removeLinkQrCodes,
  restorePageTitle,
  setPrintTitle,
} from '@site/src/lib/printPage';

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

/**
 * Draws the link QR codes once each page has settled, on first load and after every
 * client-side navigation, so a print can serve them at once (src/lib/printPage.ts).
 */
function PrintQrPreparer() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    const prepare = () => void prepareLinkQrCodes();
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(prepare, { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(prepare, 1000);
    return () => clearTimeout(id);
  }, [pathname]);

  return null;
}

export default function Root({ children }: { children: React.ReactNode }): React.ReactElement {
  useEffect(() => {
    // Print preparation (src/lib/printPage.ts). Lazy images are not fetched yet when a
    // print starts, and link QR codes need their encoder, so Ctrl/Cmd+P is taken over
    // to do both first, then open the same native dialog. The browser's own menu
    // cannot be delayed: beforeprint serves the codes PrintQrPreparer stored and starts
    // the image loads. In every case the printed title reads "subject | unit | topic",
    // and afterprint puts things back.
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        void printHandout();
      }
    };
    const onBeforePrint = () => {
      setPrintTitle();
      addLinkQrCodesNow();
      void loadImagesForPrint();
    };
    const onAfterPrint = () => {
      restorePageTitle();
      removeLinkQrCodes();
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('beforeprint', onBeforePrint);
    window.addEventListener('afterprint', onAfterPrint);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('beforeprint', onBeforePrint);
      window.removeEventListener('afterprint', onAfterPrint);
    };
  }, []);

  return (
    <AuthProvider>
      <RouteAnalytics />
      <PrintQrPreparer />
      {children}
    </AuthProvider>
  );
}
