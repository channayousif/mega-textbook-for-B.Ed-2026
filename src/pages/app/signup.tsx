import React, { useState } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';
import { useAuth } from '@site/src/contexts/AuthContext';
import { getSupabase } from '@site/src/lib/supabase';
import { authErrorMessage } from '@site/src/lib/authErrors';
import { getReturnTo, oauthRedirectTo, loginUrlWithReturnTo } from '@site/src/lib/authRedirect';

type RoleChoice = 'student' | 'teacher';

/**
 * Sign-up page (Spec 002, T026). Google + email/password, optional role choice
 * defaulting to student (FR-001, FR-003). `role` here is a REQUEST — the
 * handle_new_user trigger is the actual control (FR-009, research.md R3).
 */
export default function SignupPage(): React.ReactElement {
  const { i18n } = useDocusaurusContext();
  const location = useLocation();
  const { session, isConfigured } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<RoleChoice>('student');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);

  const returnTo = getReturnTo(location.search);

  if (session) {
    if (typeof window !== 'undefined') window.location.assign(returnTo);
    return <Layout title="Create an account"><p>Signed in — redirecting…</p></Layout>;
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
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { role } },
    });
    setSubmitting(false);
    if (signUpError) {
      setError(authErrorMessage(signUpError, i18n.currentLocale));
      return;
    }
    setAwaitingConfirmation(true);
  }

  if (awaitingConfirmation) {
    return (
      <Layout title="Check your email">
        <main className="container auth-page margin-vert--lg" style={{ maxWidth: 420 }}>
          <h1>Check your email</h1>
          <p>
            We sent a confirmation link to <strong>{email}</strong>. Open it, then{' '}
            <a href={loginUrlWithReturnTo(returnTo, 'login')}>sign in</a>.
          </p>
        </main>
      </Layout>
    );
  }

  return (
    <Layout title="Create an account" description="Create an account">
      <main className="container auth-page margin-vert--lg" style={{ maxWidth: 420 }}>
        <h1>Create an account</h1>

        {!isConfigured && (
          <div className="alert alert--warning" role="status">
            Sign-up is not available in this environment yet.
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
            <label htmlFor="signup-email">Email</label>
            <input
              id="signup-email"
              type="email"
              required
              autoComplete="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="margin-bottom--sm">
            <label htmlFor="signup-password">Password</label>
            <input
              id="signup-password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <fieldset className="margin-bottom--md">
            <legend>I am a…</legend>
            <label className="auth-tap-target margin-right--md">
              <input
                type="radio"
                name="role"
                value="student"
                checked={role === 'student'}
                onChange={() => setRole('student')}
              />
              Student
            </label>
            <label className="auth-tap-target">
              <input
                type="radio"
                name="role"
                value="teacher"
                checked={role === 'teacher'}
                onChange={() => setRole('teacher')}
              />
              Teacher
            </label>
          </fieldset>

          <button
            type="submit"
            className="button button--primary button--block"
            disabled={!isConfigured || submitting}
          >
            {submitting ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className="margin-top--md">
          <a href={loginUrlWithReturnTo(returnTo, 'login')}>Already have an account? Sign in</a>
        </p>
      </main>
    </Layout>
  );
}
