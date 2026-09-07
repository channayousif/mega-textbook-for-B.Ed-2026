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
 *
 * `mobile`/`onClick`: see NavbarAuthWidget.tsx's docblock - Infima hides any
 * `navbar__item`-classed element at <=996px, so this needs the same
 * `<li class="menu__list-item"><a class="menu__link">` swap Docusaurus's own
 * items use for their second, `mobile: true` render inside the hamburger
 * drawer, or it disappears there too (Spec 010 follow-up, 2026-09-07).
 */
export default function TeacherDashboardNavLink({
  mobile = false,
  onClick,
}: {
  mobile?: boolean;
  onClick?: () => void;
}): React.ReactElement | null {
  const { loading, session, role } = useAuth();

  if (loading || !session || role !== 'teacher') return null;

  const linkClassName = mobile ? 'menu__link' : 'navbar__item navbar__link';
  const dashboardLink = (
    <a className={linkClassName} href="/app/teacher/" onClick={onClick}>
      Teacher Dashboard
    </a>
  );
  const guideLink = (
    <a className={linkClassName} href="/guides/teacher-guide/" onClick={onClick}>
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
