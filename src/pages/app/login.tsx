import React, { useState } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';
import { useAuth } from '@site/src/contexts/AuthContext';
import { getSupabase } from '@site/src/lib/supabase';
import { authErrorMessage, AUTH_MESSAGES } from '@site/src/lib/authErrors';
import { getReturnTo, oauthRedirectTo, loginUrlWithReturnTo } from '@site/src/lib/authRedirect';

/**
 * Sign-in page (Spec 002, T027). Google + email/password, FR-013 return-to-origin,
 * FR-014 bilingual errors.
 */
export default function LoginPage(): React.ReactElement {
  const { i18n } = useDocusaurusContext();
  const location = useLocation();
  const { session, isConfigured } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const returnTo = getReturnTo(location.search);

  // Already signed in — no reason to show the form again.
  if (session) {
    if (typeof window !== 'undefined') window.location.assign(returnTo);
    return <Layout title="Sign in"><p>Signed in — redirecting…</p></Layout>;
  }

  async function handleGoogle(): Promise<void> {
    const supabase = await getSupabase();
    if (!supabase) return;
    setError(null);
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: oauthRedirectTo(location.search) },
    });
    if (oauthError) setError(authErrorMessage(oauthError, i18n.currentLocale));
  }

  async function handleSubmit(evt: React.FormEvent): Promise<void> {
    evt.preventDefault();
    const supabase = await getSupabase();
    if (!supabase) return;
    setError(null);
    setSubmitting(true);
    const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      setSubmitting(false);
      setError(authErrorMessage(signInError, i18n.currentLocale));
      return;
    }

    // FR-020 — GoTrue itself has no concept of `profiles.status` (research.md
    // R5 deliberately doesn't set a GoTrue ban; suspension is enforced purely
    // via RLS + refresh-token revocation). So credentials for a suspended
    // account validate fine here, but the profile fetch RLS filters to zero
    // rows (profiles_select_own requires status='active'). That's the only
    // signal available — treat it as suspended, not a generic sign-out.
    const { data: profileRow } = await supabase
      .from('profiles')
      .select('id')
      .eq('auth_user_id', data.user!.id)
      .maybeSingle();
    setSubmitting(false);
    if (!profileRow) {
      await supabase.auth.signOut();
      setError(i18n.currentLocale === 'ur' ? AUTH_MESSAGES.account_suspended.ur : AUTH_MESSAGES.account_suspended.en);
      return;
    }

    window.location.assign(returnTo);
  }

  return (
    <Layout title="Sign in" description="Sign in to your account">
      <main className="container auth-page margin-vert--lg" style={{ maxWidth: 420 }}>
        <h1>Sign in</h1>

        {!isConfigured && (
          <div className="alert alert--warning" role="status">
            Sign-in is not available in this environment yet.
          </div>
        )}

        {error && (
          <div className="alert alert--danger" role="alert" aria-live="assertive">
            {error}
          </div>
        )}

        <button
          type="button"
          className="button button--secondary button--block margin-bottom--md"
          onClick={handleGoogle}
          disabled={!isConfigured}
        >
          Continue with Google
        </button>

        <form onSubmit={handleSubmit}>
          <div className="margin-bottom--sm">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              required
              autoComplete="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="margin-bottom--md">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              required
              autoComplete="current-password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="button button--primary button--block"
            disabled={!isConfigured || submitting}
          >
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="margin-top--md">
          <a href={`/app/reset${location.search}`}>Forgot your password?</a>
        </p>
        <p>
          <a href={loginUrlWithReturnTo(returnTo, 'signup')}>Create an account</a>
        </p>
      </main>
    </Layout>
  );
}
