import React from 'react';
import { useLocation } from '@docusaurus/router';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useAuth } from '@site/src/contexts/AuthContext';
import { loginUrlWithReturnTo } from '@site/src/lib/authRedirect';

/**
 * Client-side gate for `/app/teacher/*` pages (Spec 005, T002, FR-013).
 *
 * ⚠️ COSMETIC ONLY (Constitution Art. IX.2) - same disclaimer as
 * `src/components/AuthGuard.tsx`/`StudentDashboardGuard.tsx`. Every teacher
 * dashboard query is still RLS-scoped to the caller's own classes regardless
 * of what this component renders.
 *
 * Mirrors StudentDashboardGuard's pattern in the opposite direction: a
 * signed-in student reaching the teacher dashboard sees a pointer back to
 * their own dashboard; any other non-teacher (admin, or no role) sees the
 * same teacher-only notice without a specific "your tools" link, since no
 * generic admin dashboard exists in this codebase.
 */

function useLocale(): 'en' | 'ur' {
  const { i18n } = useDocusaurusContext();
  return i18n.currentLocale === 'ur' ? 'ur' : 'en';
}

const MESSAGES = {
  loading: { en: 'Loading…', ur: 'لوڈ ہو رہا ہے…' },
  redirecting: { en: 'Redirecting to sign in…', ur: 'سائن ان کی طرف بھیجا جا رہا ہے…' },
  teacherOnlyTitle: {
    en: 'This view is for teachers',
    ur: 'یہ صفحہ اساتذہ کے لیے ہے',
  },
  teacherOnlyBody: {
    en: 'The teacher dashboard shows a teacher’s own classes, grading queue, and analytics.',
    ur: 'یہ ٹیچر ڈیش بورڈ ایک استاد کی اپنی کلاسز، گریڈنگ قطار، اور تجزیات دکھاتا ہے۔',
  },
  goToYourDashboard: { en: 'Go to your dashboard', ur: 'اپنے ڈیش بورڈ پر جائیں' },
} as const;

export default function TeacherDashboardGuard({
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

  if (role !== 'teacher') {
    return (
      <div className="alert alert--info" role="alert">
        <p><strong>{MESSAGES.teacherOnlyTitle[locale]}</strong></p>
        <p>{MESSAGES.teacherOnlyBody[locale]}</p>
        {role === 'student' && (
          <p>
            <Link to="/app/dashboard" className="button button--primary button--sm">
              {MESSAGES.goToYourDashboard[locale]}
            </Link>
          </p>
        )}
      </div>
    );
  }

  return <>{children}</>;
}
