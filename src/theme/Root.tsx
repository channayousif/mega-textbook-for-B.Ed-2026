import React from 'react';
import { AuthProvider } from '@site/src/contexts/AuthContext';

/**
 * Docusaurus `Root` swizzle (Spec 002, FR-011).
 *
 * Root is the ONLY component that wraps every page — docs, blog, and custom
 * /app pages alike — and it survives client-side navigation without remounting.
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
export default function Root({ children }: { children: React.ReactNode }): React.ReactElement {
  return <AuthProvider>{children}</AuthProvider>;
}
