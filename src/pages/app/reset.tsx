import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useAuth } from '@site/src/contexts/AuthContext';
import { getSupabase } from '@site/src/lib/supabase';
import { authErrorMessage } from '@site/src/lib/authErrors';

/**
 * Password recovery (Spec 002, T034). Two modes on one page:
 *
 * - Request mode (default): email -> resetPasswordForEmail. ALWAYS reports the
 *   same success message regardless of whether the account exists — this is
 *   deliberate (contracts/auth-operations.md §A: "always reports success — no
 *   account enumeration"). The one exception is a rate-limit error, which is
 *   safe to surface distinctly because it reveals nothing about the account.
 * - Recovery mode: entered when supabase-js fires the `PASSWORD_RECOVERY` auth
 *   event (the user arrived via the emailed link, GoTrue's /verify already
 *   exchanged the token for a session). Shows a new-password form and calls
 *   updateUser({ password }).
 */
export default function ResetPage(): React.ReactElement {
  const { i18n } = useDocusaurusContext();
  const { isConfigured } = useAuth();
  const [recoveryMode, setRecoveryMode] = useState(false);

  const [email, setEmail] = useState('');
  const [requestSubmitting, setRequestSubmitting] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [requestSent, setRequestSent] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordSubmitting, setPasswordSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  useEffect(() => {
    // Async setup / sync cleanup — see AuthContext.tsx's equivalent comment
    // (T060: getSupabase() is async since it dynamic-imports supabase-js).
    let cancelled = false;
    let unsubscribe = (): void => {};
    (async () => {
      const supabase = await getSupabase();
      if (!supabase || cancelled) return;
      const { data: sub } = supabase.auth.onAuthStateChange((event) => {
        if (event === 'PASSWORD_RECOVERY') setRecoveryMode(true);
      });
      unsubscribe = () => sub.subscription.unsubscribe();
      if (cancelled) unsubscribe();
    })();
    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  async function handleRequest(evt: React.FormEvent): Promise<void> {
    evt.preventDefault();
    const supabase = await getSupabase();
    if (!supabase) return;
    setRequestError(null);
    setRequestSubmitting(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/app/reset`,
    });
    setRequestSubmitting(false);

    // Only a rate-limit error is shown distinctly — it reveals nothing about
    // whether the account exists. Every other outcome, including a genuine
    // failure for a non-existent account, reports the same uniform success.
    if (error && (error.status === 429 || (error as { code?: string }).code === 'over_request_rate_limit')) {
      setRequestError(authErrorMessage(error, i18n.currentLocale));
      return;
    }
    setRequestSent(true);
  }

  async function handleSetPassword(evt: React.FormEvent): Promise<void> {
    evt.preventDefault();
    const supabase = await getSupabase();
    if (!supabase) return;
    setPasswordError(null);
    setPasswordSubmitting(true);
    const { error } = await supabase.auth.updateUser({ password });
    setPasswordSubmitting(false);
    if (error) {
      setPasswordError(authErrorMessage(error, i18n.currentLocale));
      return;
    }
    setPasswordUpdated(true);
  }

  if (recoveryMode) {
    return (
      <Layout title="Set a new password">
        <main className="container auth-page margin-vert--lg" style={{ maxWidth: 420 }}>
          <h1>Set a new password</h1>

          {passwordUpdated ? (
            <div className="alert alert--success" role="status">
              Your password has been changed. <a href="/">Continue to the site</a>.
            </div>
          ) : (
            <form onSubmit={handleSetPassword}>
              {passwordError && (
                <div className="alert alert--danger" role="alert" aria-live="assertive">
                  {passwordError}
                </div>
              )}
              <div className="margin-bottom--md">
                <label htmlFor="new-password">New password</label>
                <input
                  id="new-password"
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="button button--primary button--block"
                disabled={!isConfigured || passwordSubmitting}
              >
                {passwordSubmitting ? 'Saving…' : 'Set password'}
              </button>
            </form>
          )}
        </main>
      </Layout>
    );
  }

  return (
    <Layout title="Reset your password">
      <main className="container auth-page margin-vert--lg" style={{ maxWidth: 420 }}>
        <h1>Reset your password</h1>

        {requestSent ? (
          <div className="alert alert--success" role="status">
            If an account exists for that email, we&apos;ve sent a link to reset the password.
          </div>
        ) : (
          <form onSubmit={handleRequest}>
            {requestError && (
              <div className="alert alert--danger" role="alert" aria-live="assertive">
                {requestError}
              </div>
            )}
            <div className="margin-bottom--md">
              <label htmlFor="reset-email">Email</label>
              <input
                id="reset-email"
                type="email"
                required
                autoComplete="email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="button button--primary button--block"
              disabled={!isConfigured || requestSubmitting}
            >
              {requestSubmitting ? 'Sending…' : 'Send reset link'}
            </button>
          </form>
        )}

        <p className="margin-top--md">
          <a href="/app/login">Back to sign in</a>
        </p>
      </main>
    </Layout>
  );
}
