import React, { useEffect, useState } from 'react';
import { getSupabase } from '@site/src/lib/supabase';
import { setDigestOptOut } from '@site/src/lib/news';

/**
 * Feature 028: the account holder's weekly-email switch. It reads its own column
 * instead of joining AuthContext's profile select, so a site deployed before
 * migration 0053 reaches the database simply hides the switch rather than
 * breaking every sign-in.
 */
export default function DigestPreference({ profileId }: { profileId: string }): React.ReactElement | null {
  const [optOut, setOptOut] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    let live = true;
    void (async () => {
      const db = await getSupabase();
      if (!db) return;
      const { data, error } = await db.from('profiles').select('digest_opt_out').eq('id', profileId).maybeSingle();
      if (live && !error && data) setOptOut(Boolean((data as { digest_opt_out: boolean }).digest_opt_out));
    })();
    return () => { live = false; };
  }, [profileId]);

  if (optOut === null) return null;

  async function toggle(next: boolean) {
    setBusy(true); setMessage(null);
    const { error } = await setDigestOptOut(!next);
    setBusy(false);
    if (error) { setMessage({ ok: false, text: 'Could not save your choice. Please try again.' }); return; }
    setOptOut(!next);
    setMessage({ ok: true, text: next ? 'You will get the weekly email.' : 'You will no longer get the weekly email.' });
  }

  return (
    <section className="work-panel">
      <h2>Email updates</h2>
      <label>
        <input type="checkbox" checked={!optOut} disabled={busy} onChange={(e) => void toggle(e.target.checked)} />{' '}
        Send me a weekly email of new units, Urdu translations and announcements
      </label>
      <p className="margin-top--sm margin-bottom--none"><small>One email on Sundays, only in weeks with something new. Every email has an unsubscribe link.</small></p>
      {message && <p role={message.ok ? 'status' : 'alert'} className="margin-top--sm margin-bottom--none">{message.text}</p>}
    </section>
  );
}
