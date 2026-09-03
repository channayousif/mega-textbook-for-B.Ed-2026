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
 */
export default function DashboardNavLink(): React.ReactElement | null {
  const { loading, session, role } = useAuth();

  if (loading || !session || role !== 'student') return null;

  return (
    <>
      <a className="navbar__item navbar__link" href="/app/dashboard/">
        Dashboard
      </a>
      <a className="navbar__item navbar__link" href="/guides/student-guide/">
        Guide
      </a>
    </>
  );
}
