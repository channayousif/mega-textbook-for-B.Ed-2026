import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';
import NavbarAuthWidget from '@site/src/components/NavbarAuthWidget';
import DashboardNavLink from '@site/src/components/DashboardNavLink';

/**
 * Registers `custom-authWidget` (Spec 002, T030) and `custom-dashboardLink`
 * (Spec 004, T007) as navbar item types. Docusaurus requires the `custom-`
 * prefix on the type so it passes navbar item schema validation. See
 * docusaurus.config.ts navbar.items.
 */
export default {
  ...ComponentTypes,
  'custom-authWidget': NavbarAuthWidget,
  'custom-dashboardLink': DashboardNavLink,
};
