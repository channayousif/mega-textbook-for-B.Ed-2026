import React from 'react';
import { useLocation } from '@docusaurus/router';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useAuth } from '@site/src/contexts/AuthContext';
import { loginUrlWithReturnTo } from '@site/src/lib/authRedirect';

/**
 * Client-side gate for `/app/admin/overview` and `/app/admin/feedback-queue`
 * (Spec 010, T024, US3 AS4).
 *
 * ⚠️ COSMETIC ONLY (Constitution Art. IX.2) - same disclaimer as
 * `src/components/AuthGuard.tsx`. Every console/queue query is still
 * RLS-scoped to `is_admin()` regardless of what this component renders.
 *
 * Mirrors StudentDashboardGuard.tsx's dedicated-message pattern - a signed-in
 * non-admin reaching the console sees a specific "this is for the curriculum
 * owner" notice, not AuthGuard's generic text.
 */

function useLocale(): 'en' | 'ur' {
  const { i18n } = useDocusaurusContext();
  return i18n.currentLocale === 'ur' ? 'ur' : 'en';
}

const MESSAGES = {
  loading: { en: 'Loading…', ur: 'لوڈ ہو رہا ہے…' },
  redirecting: { en: 'Redirecting to sign in…', ur: 'سائن ان کی طرف بھیجا جا رہا ہے…' },
  ownerOnlyTitle: {
    en: 'This view is for the curriculum owner',
    ur: 'یہ صفحہ نصاب کے ذمہ دار کے لیے ہے',
  },
  ownerOnlyBody: {
    en: 'The console shows content status, reader feedback, and student progress across the whole book. Your own tools are available from your dashboard.',
    ur: 'یہ کنسول پوری کتاب میں مواد کی صورتحال، قارئین کی رائے اور طلبہ کی پیش رفت دکھاتا ہے۔ آپ کے اپنے ٹولز آپ کے ڈیش بورڈ پر دستیاب ہیں۔',
  },
  goToYourTools: { en: 'Go to your dashboard', ur: 'اپنے ڈیش بورڈ پر جائیں' },
} as const;

export default function OwnerConsoleGuard({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const location = useLocation();
  const locale = useLocale();
  const { loading, session, role } = useAuth();

  if (loading) return <p>{MESSAGES.loading[locale]}</p>;

  if (!session) {
    if (typeof window !== 'undefined') {
      window.location.assign(loginUrlWithReturnTo(location.pathname, 'login'));
    }
    return <p>{MESSAGES.redirecting[locale]}</p>;
  }

  if (role !== 'admin') {
    return (
      <div className="alert alert--info" role="alert" data-testid="owner-console-denied">
        <p><strong>{MESSAGES.ownerOnlyTitle[locale]}</strong></p>
        <p>{MESSAGES.ownerOnlyBody[locale]}</p>
        <p>
          <Link to="/app/dashboard" className="button button--primary button--sm">
            {MESSAGES.goToYourTools[locale]}
          </Link>
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
