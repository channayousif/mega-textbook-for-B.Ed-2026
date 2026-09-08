import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import { useLocation } from '@docusaurus/router';
import { confirmGuestFeedback } from '@site/src/lib/contentFeedback';

/**
 * Guest feedback confirmation landing page (Spec 010 follow-up, 2026-09-07).
 * Reached only via the link in guest-feedback-submit's confirmation email
 * (supabase/functions/guest-feedback-submit/index.ts) - deliberately outside
 * every auth guard, since the whole point is that the visitor has no account.
 *
 * `locale` travels as a query param (set by the emailed link, from the
 * submission's own `locale` field) rather than this page living under
 * `/ur/...` - the confirmation email itself is English-only (documented
 * limitation, contracts/console-operations.md), but the LANDING PAGE the
 * link opens can still greet a Faisalabad… reader in the language they were
 * reading in, which is the part actually worth localizing.
 */

const MESSAGES = {
  confirming: { en: 'Confirming your feedback…', ur: 'آپ کی رائے کی تصدیق کی جا رہی ہے…' },
  missingToken: {
    en: 'This confirmation link is missing its token.',
    ur: 'اس تصدیقی لنک میں ٹوکن موجود نہیں ہے۔',
  },
  success: {
    en: 'Thanks — your feedback is confirmed and now in the curriculum owner’s queue.',
    ur: 'شکریہ - آپ کی رائے کی تصدیق ہو گئی ہے اور اب یہ نصاب کے ذمہ دار کی فہرست میں ہے۔',
  },
  invalidOrUsed: {
    en: 'This confirmation link is invalid or has already been used.',
    ur: 'یہ تصدیقی لنک غلط ہے یا پہلے ہی استعمال ہو چکا ہے۔',
  },
  error: {
    en: 'Something went wrong confirming your feedback. Please try the link again.',
    ur: 'آپ کی رائے کی تصدیق کرتے ہوئے کچھ غلط ہو گیا۔ براہ کرم لنک دوبارہ آزمائیں۔',
  },
  backToSite: { en: 'Continue to the site', ur: 'سائٹ پر جاری رکھیں' },
} as const;

function useLocaleFromQuery(): 'en' | 'ur' {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  return params.get('locale') === 'ur' ? 'ur' : 'en';
}

type ConfirmState = 'pending' | 'success' | 'invalid' | 'error' | 'missing_token';

export default function ConfirmFeedbackPage(): React.ReactElement {
  const location = useLocation();
  const locale = useLocaleFromQuery();
  const [state, setState] = useState<ConfirmState>('pending');

  useEffect(() => {
    let cancelled = false;
    const token = new URLSearchParams(location.search).get('token');
    if (!token) {
      setState('missing_token');
      return undefined;
    }
    (async () => {
      const { data: confirmed, error } = await confirmGuestFeedback(token);
      if (cancelled) return;
      if (error) {
        setState('error');
        return;
      }
      setState(confirmed ? 'success' : 'invalid');
    })();
    return () => { cancelled = true; };
  }, [location.search]);

  const body = {
    pending: MESSAGES.confirming[locale],
    missing_token: MESSAGES.missingToken[locale],
    success: MESSAGES.success[locale],
    invalid: MESSAGES.invalidOrUsed[locale],
    error: MESSAGES.error[locale],
  }[state];

  return (
    <Layout title="Confirm feedback">
      <main
        className="container auth-page margin-vert--lg"
        style={{ maxWidth: 480 }}
        dir={locale === 'ur' ? 'rtl' : 'ltr'}
      >
        <div
          className={`alert ${state === 'success' ? 'alert--success' : state === 'pending' ? 'alert--info' : 'alert--danger'}`}
          role={state === 'pending' ? 'status' : 'alert'}
          data-testid="confirm-feedback-message"
        >
          {body}
        </div>
        {state !== 'pending' && (
          <p className="margin-top--md">
            <a href="/">{MESSAGES.backToSite[locale]}</a>
          </p>
        )}
      </main>
    </Layout>
  );
}
