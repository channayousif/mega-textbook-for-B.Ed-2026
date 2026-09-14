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
 * The cache survives a suspension; the function does not, because the status
 * test lives inside it (0044, mirroring 0004_is_admin.sql). That is the whole
 * of success criterion 2 - a suspended reviewer is refused by the database's
 * answer rather than by the browser's memory of a column.
 *
 * An admin is admitted without the capability, because an admin may already
 * grant it to themselves in one click; making them do so would be ceremony,
 * not security.
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
    en: 'Certifying a unit review is an admin-granted capability, recorded in specs/reviewers/human-reviewers.md. Your own tools are available from your dashboard.',
    ur: 'کسی یونٹ کے جائزے کی تصدیق ایک ایسی اہلیت ہے جو منتظم عطا کرتا ہے اور جس کا اندراج specs/reviewers/human-reviewers.md میں ہوتا ہے۔ آپ کے اپنے ٹولز آپ کے ڈیش بورڈ پر دستیاب ہیں۔',
  },
  goToYourTools: { en: 'Go to your dashboard', ur: 'اپنے ڈیش بورڈ پر جائیں' },
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
