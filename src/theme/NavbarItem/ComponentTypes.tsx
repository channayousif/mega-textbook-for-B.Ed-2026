import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';
import NavbarAuthWidget from '@site/src/components/NavbarAuthWidget';
import DashboardNavLink from '@site/src/components/DashboardNavLink';
import TeacherDashboardNavLink from '@site/src/components/TeacherDashboardNavLink';
import MobileTopBarWidgets from '@site/src/components/MobileTopBarWidgets';

/**
 * Registers `custom-authWidget` (Spec 002, T030), `custom-dashboardLink`
 * (Spec 004, T007), `custom-teacherDashboardLink` (Spec 005, T003), and
 * `custom-mobileTopBar` (Spec 010 follow-up, 2026-09-07) as navbar item
 * types. Docusaurus requires the `custom-` prefix on the type so it passes
 * navbar item schema validation. See docusaurus.config.ts navbar.items.
 */
export default {
  ...ComponentTypes,
  'custom-authWidget': NavbarAuthWidget,
  'custom-dashboardLink': DashboardNavLink,
  'custom-teacherDashboardLink': TeacherDashboardNavLink,
  'custom-mobileTopBar': MobileTopBarWidgets,
};
