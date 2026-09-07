import React from 'react';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useAlternatePageUtils } from '@docusaurus/theme-common/internal';
import { useAuth } from '@site/src/contexts/AuthContext';
import { loginUrlWithReturnTo } from '@site/src/lib/authRedirect';
import styles from './MobileTopBarWidgets.module.css';

/**
 * Compact locale switch + sign-in status, visible ONLY in the collapsed
 * mobile top bar (Spec 010 follow-up, 2026-09-07 - a curriculum owner report
 * that neither was "displayed on a prominent place" on mobile).
 *
 * The existing `localeDropdown`/`custom-authWidget` items already cover this
 * at desktop widths, and (after NavbarAuthWidget.tsx's mobile fix) inside the
 * hamburger drawer's primary menu - but reaching either on a phone still
 * takes opening the hamburger and, on a doc page, also tapping "Back to main
 * menu" first. That is standard Docusaurus mobile navigation, not a bug, but
 * it buries a bilingual site's language switch and a reader's sign-in state
 * behind two taps with no visible hint either exists. This widget puts both
 * directly in the always-visible bar instead, with NO tap required to see
 * them.
 *
 * Deliberately its own class (`styles.widgetGroup`), never `navbar__item`:
 * Infima hides every element carrying that class at <=996px
 * (`.navbar__item { display: none }`) - exactly why the plain
 * localeDropdown/authWidget items vanish from the *collapsed* bar (they
 * still work once the drawer is open, where Docusaurus swaps their markup).
 * CSS-hidden at >996px in the sibling stylesheet so desktop never shows a
 * duplicate control.
 *
 * Registered as `custom-mobileTopBar` (docusaurus.config.ts), positioned
 * first among the right-side items so its content sits left of the
 * absolutely-positioned mobile search icon rather than underneath it (see
 * custom.css's `.navbar__items--right` padding-right reservation).
 */
function useOtherLocale(): { code: string; label: string; url: string } | null {
  const { i18n } = useDocusaurusContext();
  const alternatePageUtils = useAlternatePageUtils();
  const otherCode = i18n.locales.find((locale) => locale !== i18n.currentLocale);
  if (!otherCode) return null;
  const config = i18n.localeConfigs[otherCode];
  return {
    code: otherCode,
    label: config.label,
    url: alternatePageUtils.createUrl({ locale: otherCode, fullyQualified: false }),
  };
}

export default function MobileTopBarWidgets({
  mobile = false,
}: {
  mobile?: boolean;
}): React.ReactElement | null {
  const location = useLocation();
  const other = useOtherLocale();
  const { loading, session, displayName, isConfigured } = useAuth();

  // Docusaurus renders every navbar item a second time, with `mobile: true`,
  // inside the hamburger drawer's own primary menu - where the (now-fixed)
  // localeDropdown/authWidget items already cover this job with proper
  // `menu__link` list items. Render nothing there; this component exists
  // only to fill the gap in the *collapsed* bar.
  if (mobile) return null;

  return (
    <div className={styles.widgetGroup}>
      {other && (
        <a
          className={styles.pill}
          href={other.url}
          lang={other.code}
          aria-label={`Switch to ${other.label}`}
        >
          {other.label}
        </a>
      )}
      {isConfigured && !loading && (
        session ? (
          <a className={styles.pill} href="/app/profile" title={displayName ?? undefined}>
            {displayName}
          </a>
        ) : (
          <a className={styles.pill} href={loginUrlWithReturnTo(location.pathname, 'login')}>
            Sign in
          </a>
        )
      )}
    </div>
  );
}
