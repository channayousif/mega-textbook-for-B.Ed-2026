import React from 'react';
import { useLocation } from '@docusaurus/router';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useAuth } from '@site/src/contexts/AuthContext';
import { loginUrlWithReturnTo } from '@site/src/lib/authRedirect';

/**
 * Client-side gate for `/app/dashboard/*` pages (Spec 004, T006, FR-012).
 *
 * ⚠️ COSMETIC ONLY (Constitution Art. IX.2) — same disclaimer as
 * `src/components/AuthGuard.tsx`. Every dashboard query is still RLS-scoped
 * to the caller's own rows regardless of what this component renders.
 *
 * Differs from AuthGuard in one deliberate way: FR-012 requires a signed-in
 * teacher/admin who reaches the student dashboard to see a *specific* notice
 * pointing them to their own tools, not AuthGuard's generic "you don't have
 * access" text — this is a distinct, spec-mandated message, not a bug in the
 * generic gate.
 */

function useLocale(): 'en' | 'ur' {
  const { i18n } = useDocusaurusContext();
  return i18n.currentLocale === 'ur' ? 'ur' : 'en';
}

const MESSAGES = {
  loading: { en: 'Loading…', ur: 'لوڈ ہو رہا ہے…' },
  redirecting: { en: 'Redirecting to sign in…', ur: 'سائن ان کی طرف بھیجا جا رہا ہے…' },
  studentOnlyTitle: {
    en: 'This view is for students',
    ur: 'یہ صفحہ طلبہ کے لیے ہے',
  },
  studentOnlyBody: {
    en: 'The dashboard shows a student’s own classes, grades, and progress. Your own tools are available from the classes area.',
    ur: 'یہ ڈیش بورڈ ایک طالب علم کی اپنی کلاسز، گریڈز اور پیش رفت دکھاتا ہے۔ آپ کے اپنے ٹولز کلاسز کے صفحے پر دستیاب ہیں۔',
  },
  goToYourTools: { en: 'Go to your classes', ur: 'اپنی کلاسز پر جائیں' },
} as const;

export default function StudentDashboardGuard({
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

  if (role !== 'student') {
    return (
      <div className="alert alert--info" role="alert">
        <p><strong>{MESSAGES.studentOnlyTitle[locale]}</strong></p>
        <p>{MESSAGES.studentOnlyBody[locale]}</p>
        <p>
          <Link to="/app/classes" className="button button--primary button--sm">
            {MESSAGES.goToYourTools[locale]}
          </Link>
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
