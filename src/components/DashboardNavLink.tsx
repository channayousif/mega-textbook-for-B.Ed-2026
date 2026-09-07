import React from 'react';
import { useAuth } from '@site/src/contexts/AuthContext';

/**
 * Navbar entry point to the student dashboard (Spec 004, T007/T046).
 * Registered as the `custom-dashboardLink` navbar item type via the swizzled
 * src/theme/NavbarItem/ComponentTypes.tsx, mirroring the existing
 * `custom-authWidget` (NavbarAuthWidget) precedent from Spec 002.
 *
 * Visible only when signed in as a student - a teacher/admin never sees this
 * link in the first place (StudentDashboardGuard, T006, still handles the
 * case of a teacher/admin reaching a dashboard URL directly, e.g. a stale
 * bookmark or shared link).
 *
 * `mobile`/`onClick`: see NavbarAuthWidget.tsx's docblock - Infima hides any
 * `navbar__item`-classed element at <=996px, so this needs the same
 * `<li class="menu__list-item"><a class="menu__link">` swap Docusaurus's own
 * items use for their second, `mobile: true` render inside the hamburger
 * drawer, or it disappears there too (Spec 010 follow-up, 2026-09-07).
 */
export default function DashboardNavLink({
  mobile = false,
  onClick,
}: {
  mobile?: boolean;
  onClick?: () => void;
}): React.ReactElement | null {
  const { loading, session, role } = useAuth();

  if (loading || !session || role !== 'student') return null;

  const linkClassName = mobile ? 'menu__link' : 'navbar__item navbar__link';
  const dashboardLink = (
    <a className={linkClassName} href="/app/dashboard/" onClick={onClick}>
      Dashboard
    </a>
  );
  const guideLink = (
    <a className={linkClassName} href="/guides/student-guide/" onClick={onClick}>
      Guide
    </a>
  );

  if (!mobile) {
    return (
      <>
        {dashboardLink}
        {guideLink}
      </>
    );
  }

  return (
    <>
      <li className="menu__list-item">{dashboardLink}</li>
      <li className="menu__list-item">{guideLink}</li>
    </>
  );
}
