import React from 'react';
import { useLocation } from '@docusaurus/router';
import { useAuth } from '@site/src/contexts/AuthContext';
import { loginUrlWithReturnTo } from '@site/src/lib/authRedirect';

/**
 * Navbar identity widget (Spec 002, T029/T049). "Sign in" when signed out,
 * else the account's display name plus Sign out - falling back to the email
 * when `full_name` is null (FR-010b). Rendered on every route via
 * docusaurus.config.ts (T030), because Root (src/theme/Root.tsx) mounts
 * <AuthProvider> around the whole site - the same session spans docs and app
 * pages, so signing out here ends it everywhere (FR-012).
 *
 * `mobile`/`onClick` (Spec 010 follow-up, 2026-09-07): Docusaurus renders
 * every navbar item a second time, with `mobile: true`, inside the hamburger
 * drawer's primary menu (`NavbarMobilePrimaryMenu`). Infima hides *any*
 * element carrying the `navbar__item` class at <=996px
 * (`.navbar__item { display: none }` - it expects every item to swap to
 * `<li class="menu__list-item"><a class="menu__link">` markup for that
 * render, the way Docusaurus's own `DefaultNavbarItemMobile` does. This
 * component didn't, so "Sign in" (and, signed in, the account link/Sign out)
 * was invisible on any viewport <=996px, in the closed bar *and* inside the
 * opened drawer - found via a live mobile-viewport check, not merely
 * squeezed off-screen. `onClick` is `mobileSidebar.toggle()`, passed down by
 * that same drawer so tapping a link also closes it, like every other item.
 */
export default function NavbarAuthWidget({
  mobile = false,
  onClick,
}: {
  mobile?: boolean;
  onClick?: () => void;
}): React.ReactElement | null {
  const location = useLocation();
  const { loading, session, displayName, isConfigured, signOut } = useAuth();

  if (!isConfigured) return null;
  // Resolving the session - render neither state to avoid a signed-out flash.
  if (loading) {
    return mobile ? null : <span className="navbar__item" aria-hidden="true" />;
  }

  const linkClassName = mobile ? 'menu__link' : 'navbar__item navbar__link';

  if (!session) {
    const link = (
      <a
        className={linkClassName}
        href={loginUrlWithReturnTo(location.pathname, 'login')}
        onClick={onClick}
      >
        Sign in
      </a>
    );
    return mobile ? <li className="menu__list-item">{link}</li> : link;
  }

  async function handleSignOut(): Promise<void> {
    await signOut();
    // Reload rather than client-side nav: every mounted page (docs or app)
    // must immediately re-render as signed out, not just the navbar widget.
    window.location.reload();
  }

  const profileLink = (
    <a className={linkClassName} href="/app/profile" onClick={onClick}>
      {displayName}
    </a>
  );
  const signOutButton = (
    <button type="button" className={linkClassName} onClick={handleSignOut}>
      Sign out
    </button>
  );

  if (!mobile) {
    return (
      <>
        {profileLink}
        {signOutButton}
      </>
    );
  }

  return (
    <>
      <li className="menu__list-item">{profileLink}</li>
      <li className="menu__list-item">{signOutButton}</li>
    </>
  );
}
