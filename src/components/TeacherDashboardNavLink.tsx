import React from 'react';
import { useAuth } from '@site/src/contexts/AuthContext';

/**
 * Navbar entry point to the teacher dashboard (Spec 005, T003).
 * Registered as the `custom-teacherDashboardLink` navbar item type via the
 * swizzled src/theme/NavbarItem/ComponentTypes.tsx, mirroring the existing
 * `custom-dashboardLink` (DashboardNavLink) precedent from Spec 004.
 *
 * Visible only when signed in as a teacher - a student/admin never sees this
 * link in the first place (TeacherDashboardGuard still handles the case of a
 * non-teacher reaching a teacher dashboard URL directly).
 */
export default function TeacherDashboardNavLink(): React.ReactElement | null {
  const { loading, session, role } = useAuth();

  if (loading || !session || role !== 'teacher') return null;

  return (
    <>
      <a className="navbar__item navbar__link" href="/app/teacher/">
        Teacher Dashboard
      </a>
      <a className="navbar__item navbar__link" href="/guides/teacher-guide/">
        Guide
      </a>
    </>
  );
}
