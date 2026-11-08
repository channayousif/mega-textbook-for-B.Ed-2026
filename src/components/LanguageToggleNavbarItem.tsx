/**
 * Navbar item for the language toggle. On wide screens it renders the segmented
 * toggle in the bar (Infima hides `.navbar__item` at 996px and below, where
 * MobileTopBarWidgets shows the compact toggle instead). Inside the phone drawer it
 * renders a plain menu link to the other language, as the old dropdown did.
 */
import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useAlternatePageUtils } from '@docusaurus/theme-common/internal';
import LanguageToggle from './LanguageToggle';

export default function LanguageToggleNavbarItem({ mobile = false }: { mobile?: boolean }): React.ReactElement | null {
  const { i18n } = useDocusaurusContext();
  const alternate = useAlternatePageUtils();
  if (mobile) {
    const other = i18n.locales.find((l) => l !== i18n.currentLocale);
    if (!other) return null;
    return (
      <li className="menu__list-item">
        <a className="menu__link" href={alternate.createUrl({ locale: other, fullyQualified: false })} lang={other} hrefLang={other}>
          {i18n.localeConfigs[other].label}
        </a>
      </li>
    );
  }
  return (
    <div className="navbar__item">
      <LanguageToggle />
    </div>
  );
}
