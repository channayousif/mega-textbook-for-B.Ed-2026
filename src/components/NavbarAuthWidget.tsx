import React from 'react';
import { useLocation } from '@docusaurus/router';
import { useAuth } from '@site/src/contexts/AuthContext';
import { loginUrlWithReturnTo } from '@site/src/lib/authRedirect';

/**
 * Navbar identity widget (Spec 002, T029/T049). "Sign in" when signed out,
 * else the account's display name plus Sign out — falling back to the email
 * when `full_name` is null (FR-010b). Rendered on every route via
 * docusaurus.config.ts (T030), because Root (src/theme/Root.tsx) mounts
 * <AuthProvider> around the whole site — the same session spans docs and app
 * pages, so signing out here ends it everywhere (FR-012).
 */
export default function NavbarAuthWidget(): React.ReactElement | null {
  const location = useLocation();
  const { loading, session, displayName, isConfigured, signOut } = useAuth();

  if (!isConfigured) return null;
  // Resolving the session — render neither state to avoid a signed-out flash.
  if (loading) return <span className="navbar__item" aria-hidden="true" />;

  if (!session) {
    return (
      <a className="navbar__item navbar__link" href={loginUrlWithReturnTo(location.pathname, 'login')}>
        Sign in
      </a>
    );
  }

  async function handleSignOut(): Promise<void> {
    await signOut();
    // Reload rather than client-side nav: every mounted page (docs or app)
    // must immediately re-render as signed out, not just the navbar widget.
    window.location.reload();
  }

  return (
    <>
      <a className="navbar__item navbar__link" href="/app/profile">
        {displayName}
      </a>
      <button type="button" className="navbar__item navbar__link" onClick={handleSignOut}>
        Sign out
      </button>
    </>
  );
}
