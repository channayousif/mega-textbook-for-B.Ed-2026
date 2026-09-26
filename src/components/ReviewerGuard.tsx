import React, { useEffect, useState } from 'react';
import { useLocation } from '@docusaurus/router';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useAuth } from '@site/src/contexts/AuthContext';
import { loginUrlWithReturnTo } from '@site/src/lib/authRedirect';
import { getSupabase } from '@site/src/lib/supabase';

/**
 * Client-side gate for `/app/admin/review-queue` (Spec 017 FR-002, T021).
 *
 * ⚠️ COSMETIC ONLY (Constitution Art. IX.2) - same disclaimer as
 * `src/components/OwnerConsoleGuard.tsx`. Nothing here decides whether a
 * certification is valid; that is settled when the artefact is committed and
 * reviewed. See spec.md's "Enforcement posture".
 *
 * One thing it does NOT do cosmetically: the capability check is
 * `is_reviewer()` over RPC, not `profile.reviewer` from the cached session.
 * Feature 025 makes that function derive access from active scoped grants, so
 * suspension and revocation take effect without trusting a cached column.
 *
 * An admin can inspect the formal queue for oversight. The workbench itself
 * still filters to active grants before a review can be submitted.
 */

function useLocale(): 'en' | 'ur' {
  const { i18n } = useDocusaurusContext();
  return i18n.currentLocale === 'ur' ? 'ur' : 'en';
}

const MESSAGES = {
  loading: { en: 'Loading…', ur: 'لوڈ ہو رہا ہے…' },
  redirecting: { en: 'Redirecting to sign in…', ur: 'سائن ان کی طرف بھیجا جا رہا ہے…' },
  deniedTitle: {
    en: 'This view is for qualified reviewers',
    ur: 'یہ صفحہ تصدیق شدہ جائزہ کاروں کے لیے ہے',
  },
  deniedBody: {
    en: 'Review access requires an active grant for a track or course. You can apply with qualification evidence.',
    ur: 'جائزے کے لیے ٹریک یا کورس کی فعال اجازت درکار ہے۔ آپ اپنی اہلیت کے ثبوت کے ساتھ درخواست دے سکتے ہیں۔',
  },
  goToYourTools: { en: 'Go to your dashboard', ur: 'اپنے ڈیش بورڈ پر جائیں' },
  apply: { en: 'Apply to review', ur: 'جائزے کے لیے درخواست دیں' },
} as const;

export default function ReviewerGuard({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const location = useLocation();
  const locale = useLocale();
  const { loading, session, role } = useAuth();
  const [capability, setCapability] = useState<'checking' | 'yes' | 'no'>('checking');

  useEffect(() => {
    let cancelled = false;
    if (loading || !session) return undefined;
    if (role === 'admin') {
      setCapability('yes');
      return undefined;
    }
    (async () => {
      const supabase = await getSupabase();
      if (!supabase) {
        // Fail closed: no client means no answer, and no answer is not a yes.
        if (!cancelled) setCapability('no');
        return;
      }
      const { data, error } = await supabase.rpc('is_reviewer');
      if (!cancelled) setCapability(!error && data === true ? 'yes' : 'no');
    })();
    return () => {
      cancelled = true;
    };
  }, [loading, session, role]);

  if (loading) return <p>{MESSAGES.loading[locale]}</p>;

  if (!session) {
    if (typeof window !== 'undefined') {
      window.location.assign(loginUrlWithReturnTo(location.pathname, 'login'));
    }
    return <p>{MESSAGES.redirecting[locale]}</p>;
  }

  if (capability === 'checking') return <p>{MESSAGES.loading[locale]}</p>;

  if (capability === 'no') {
    return (
      <div className="alert alert--info" role="alert" data-testid="reviewer-guard-denied">
        <p><strong>{MESSAGES.deniedTitle[locale]}</strong></p>
        <p>{MESSAGES.deniedBody[locale]}</p>
        <p><Link to="/app/reviewer/apply" className="button button--primary button--sm">{MESSAGES.apply[locale]}</Link></p>
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
