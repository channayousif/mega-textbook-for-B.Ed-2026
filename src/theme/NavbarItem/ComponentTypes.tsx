import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';
import NavbarAuthWidget from '@site/src/components/NavbarAuthWidget';

/**
 * Registers `custom-authWidget` as a navbar item type (Spec 002, T030).
 * Docusaurus requires the `custom-` prefix on the type so it passes navbar
 * item schema validation. See docusaurus.config.ts navbar.items.
 */
export default {
  ...ComponentTypes,
  'custom-authWidget': NavbarAuthWidget,
};
