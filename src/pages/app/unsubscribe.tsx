import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

/**
 * Feature 028: confirm-to-unsubscribe page for the weekly email's link. The email
 * links here rather than straight to the function so that link scanners, which
 * open every URL in a message, cannot unsubscribe anyone: only the button POSTs.
 * No sign-in is needed; the token in the link is signed for one account.
 */
const COPY = {
  en: {
    title: 'Unsubscribe from the weekly email',
    lead: 'Stop the weekly email of new units, Urdu translations and announcements from textbook.com.pk.',
    button: 'Unsubscribe',
    working: 'Unsubscribing...',
    done: 'Done. You will not get the weekly email any more. You can turn it back on from your account page.',
    bad: 'This link is not valid. Open the latest email and try again, or change the setting on your account page.',
    error: 'Something went wrong. Please try again in a moment.',
    account: 'Your account page',
  },
  ur: {
    title: 'ہفتہ وار ای میل بند کریں',
    lead: 'textbook.com.pk کی نئے یونٹوں، اردو ترجموں اور اعلانات والی ہفتہ وار ای میل بند کریں۔',
    button: 'ای میل بند کریں',
    working: 'بند کی جا رہی ہے...',
    done: 'ہو گیا۔ اب آپ کو ہفتہ وار ای میل نہیں ملے گی۔ آپ اپنے اکاؤنٹ کے صفحے سے اسے دوبارہ شروع کر سکتے ہیں۔',
    bad: 'یہ لنک درست نہیں۔ تازہ ترین ای میل کھول کر دوبارہ کوشش کریں، یا اکاؤنٹ کے صفحے پر ترتیب بدلیں۔',
    error: 'کچھ غلط ہو گیا۔ تھوڑی دیر بعد دوبارہ کوشش کریں۔',
    account: 'آپ کا اکاؤنٹ',
  },
} as const;

type State = 'idle' | 'working' | 'done' | 'bad' | 'error';

export default function UnsubscribePage(): React.ReactElement {
  const { siteConfig, i18n } = useDocusaurusContext();
  const ur = i18n.currentLocale === 'ur';
  const c = COPY[ur ? 'ur' : 'en'];
  const { supabaseUrl, supabaseAnonKey } = siteConfig.customFields as { supabaseUrl?: string; supabaseAnonKey?: string };
  const [token, setToken] = useState<string | null>(null);
  const [state, setState] = useState<State>('idle');

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get('token');
    setToken(t);
    if (!t) setState('bad');
  }, []);

  async function unsubscribe() {
    if (!token || !supabaseUrl) { setState('bad'); return; }
    setState('working');
    try {
      const res = await fetch(`${supabaseUrl.replace(/\/$/, '')}/functions/v1/digest-unsubscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(supabaseAnonKey ? { apikey: supabaseAnonKey } : {}) },
        body: JSON.stringify({ token }),
      });
      setState(res.ok ? 'done' : res.status === 400 ? 'bad' : 'error');
    } catch {
      setState('error');
    }
  }

  return (
    <Layout title={c.title}>
      <main className="container margin-vert--xl" dir={ur ? 'rtl' : 'ltr'} style={{ maxWidth: 640 }}>
        <h1>{c.title}</h1>
        {state === 'done' && <p className="alert alert--success" role="status">{c.done}</p>}
        {state === 'bad' && <p className="alert alert--warning" role="alert">{c.bad}</p>}
        {state === 'error' && <p className="alert alert--danger" role="alert">{c.error}</p>}
        {(state === 'idle' || state === 'working' || state === 'error') && token && (
          <>
            <p>{c.lead}</p>
            <button type="button" className="button button--primary button--lg" disabled={state === 'working'} onClick={() => void unsubscribe()}>
              {state === 'working' ? c.working : c.button}
            </button>
          </>
        )}
        <p className="margin-top--lg"><Link to="/app/profile">{c.account}</Link></p>
      </main>
    </Layout>
  );
}
