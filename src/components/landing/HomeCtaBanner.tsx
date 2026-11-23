/**
 * Homepage sign-up invitation (owner, 2026-11-23). A slim fixed bottom banner that asks a
 * signed-out visitor to create a free account or sign in. It is not a dialog: no backdrop,
 * no focus trap, and it never blocks the reading. The close button remembers the choice in
 * localStorage on this device; the banner reappears for the next visitor, and for this one
 * after the versioned key is bumped.
 *
 * Rendered client-side only. `show` starts false so the server and the first client render
 * agree, and localStorage is read in an effect. Signed-in visitors (a Supabase session)
 * never see it; they get the returning-visitor strip instead.
 */
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from '@docusaurus/router';
import clsx from 'clsx';
import { useAuth } from '@site/src/contexts/AuthContext';
import { trackEvent } from '@site/src/lib/analytics';
import { loginUrlWithReturnTo } from '@site/src/lib/authRedirect';
import { readHomeCtaDismissed, saveHomeCtaDismissed } from '@site/src/lib/homeCta';
import Icon from '@site/src/components/icons/Icon';
import { COPY } from './copy';
import styles from './HomeCtaBanner.module.css';

/** How long the hero gets before the invitation rises. */
const DELAY_MS = 1500;

type Props = {
  c: (typeof COPY)['en'] | (typeof COPY)['ur'];
  locale: 'en' | 'ur';
};

export default function HomeCtaBanner({ c, locale }: Props): React.ReactElement | null {
  const { session, loading } = useAuth();
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);

  const visible = show && !loading && !session;

  useEffect(() => {
    if (loading || session) return undefined;
    if (readHomeCtaDismissed()) return undefined;
    const id = window.setTimeout(() => {
      setShow(true);
      trackEvent('home_cta_show', { locale });
    }, DELAY_MS);
    return () => window.clearTimeout(id);
  }, [loading, session, locale]);

  // Reserve the strip the fixed banner covers so the footer is not left under it.
  useEffect(() => {
    if (!visible) return undefined;
    document.documentElement.setAttribute('data-cta', '1');
    return () => document.documentElement.removeAttribute('data-cta');
  }, [visible]);

  const dismiss = useCallback((source: 'close' | 'escape') => {
    saveHomeCtaDismissed();
    setShow(false);
    trackEvent('home_cta_dismiss', { source, locale });
    // Keep a keyboard user from landing on <body> once the banner is gone.
    const main = document.querySelector('main');
    if (main) {
      main.setAttribute('tabindex', '-1');
      main.focus({ preventScroll: true });
    }
  }, [locale]);

  useEffect(() => {
    if (!visible) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !e.defaultPrevented) dismiss('escape');
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [visible, dismiss]);

  if (!visible) return null;

  return (
    <div
      className={styles.banner}
      role="region"
      aria-label={c.cta_banner_label}
      dir={locale === 'ur' ? 'rtl' : 'ltr'}
    >
      <p className={styles.text}>
        <strong className={styles.lead}>{c.cta_banner_lead}</strong>
        {c.cta_banner_text}
      </p>
      <div className={styles.actions}>
        {/* Plain anchors, like the navbar auth widget: Docusaurus <Link> would prefix
            the locale baseUrl and add a trailing slash to these auth URLs. */}
        <a
          className={clsx('button', styles.signup)}
          href={loginUrlWithReturnTo(pathname, 'signup')}
          onClick={() => trackEvent('home_cta_click', { cta: 'signup', locale })}
        >
          {c.cta_banner_signup}
        </a>
        <a
          className={clsx('button', styles.signin)}
          href={loginUrlWithReturnTo(pathname, 'login')}
          onClick={() => trackEvent('home_cta_click', { cta: 'signin', locale })}
        >
          {c.cta_banner_signin}
        </a>
      </div>
      <button
        type="button"
        className={styles.close}
        aria-label={c.cta_banner_close}
        onClick={() => dismiss('close')}
      >
        <Icon name="close" size={18} accent={false} />
      </button>
    </div>
  );
}
