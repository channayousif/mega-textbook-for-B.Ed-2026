import React, { useState } from 'react';
import Layout from '@theme/Layout';
import { useAuth } from '@site/src/contexts/AuthContext';
import { getSupabase } from '@site/src/lib/supabase';

type RoleChoice = 'student' | 'teacher';

/**
 * Account page (Spec 002).
 *
 * T031 — one-time role prompt for OAuth users: Google sign-up has no
 * pre-consent metadata hook (research.md R3), so those accounts land with
 * `role='student'`, `role_chosen_at=null`. This page prompts once; the
 * `role`+`role_chosen_at` update is permitted by exactly one carve-out in
 * `guard_privileged_columns()` (0008) — see data-model.md's 2026-07-18
 * correction. Email/password sign-ups already recorded a choice at sign-up
 * (T026), so `role_chosen_at` is non-null for them and this prompt is skipped.
 *
 * T031a — a user may set or change their own `full_name` at any time (FR-010).
 */
export default function ProfilePage(): React.ReactElement {
  const { loading, session, profile, refreshProfile } = useAuth();

  const [role, setRole] = useState<RoleChoice>('student');
  const [roleSubmitting, setRoleSubmitting] = useState(false);
  const [roleError, setRoleError] = useState<string | null>(null);

  const [fullName, setFullName] = useState(profile?.full_name ?? '');
  const [nameSubmitting, setNameSubmitting] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);
  const [nameSaved, setNameSaved] = useState(false);

  const [deleteAcknowledged, setDeleteAcknowledged] = useState(false);
  const [deleteSubmitting, setDeleteSubmitting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // Keep the name field in step if the profile loads/changes after mount.
  React.useEffect(() => {
    setFullName(profile?.full_name ?? '');
  }, [profile?.full_name]);

  if (loading) {
    return <Layout title="Your account"><p>Loading…</p></Layout>;
  }

  if (!session || !profile) {
    if (typeof window !== 'undefined') window.location.assign('/app/login?next=%2Fapp%2Fprofile');
    return <Layout title="Your account"><p>Redirecting to sign in…</p></Layout>;
  }

  async function chooseRoleOnce(evt: React.FormEvent): Promise<void> {
    evt.preventDefault();
    const supabase = await getSupabase();
    if (!supabase) return;
    setRoleError(null);
    setRoleSubmitting(true);
    const { error } = await supabase
      .from('profiles')
      .update({ role, role_chosen_at: new Date().toISOString() })
      .eq('id', profile!.id);
    setRoleSubmitting(false);
    if (error) {
      setRoleError('Could not save your choice. Please try again.');
      return;
    }
    await refreshProfile();
  }

  async function saveName(evt: React.FormEvent): Promise<void> {
    evt.preventDefault();
    const supabase = await getSupabase();
    if (!supabase) return;
    setNameError(null);
    setNameSaved(false);
    setNameSubmitting(true);
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: fullName.trim() || null })
      .eq('id', profile!.id);
    setNameSubmitting(false);
    if (error) {
      setNameError('Could not save your name. Please try again.');
      return;
    }
    setNameSaved(true);
    await refreshProfile();
  }

  async function deleteAccount(): Promise<void> {
    const supabase = await getSupabase();
    if (!supabase || !deleteAcknowledged) return;
    if (!window.confirm('This cannot be undone. Delete your account now?')) return;

    setDeleteError(null);
    setDeleteSubmitting(true);
    // delete-account (T055) needs the service-role key to strip identity and
    // remove the auth user server-side — never a direct client call.
    const { error } = await supabase.functions.invoke('delete-account', { body: {} });
    if (error) {
      setDeleteSubmitting(false);
      setDeleteError('Could not delete your account. Please try again.');
      return;
    }
    // The account is already gone server-side, so the local session is
    // orphaned regardless. Navigate immediately rather than awaiting
    // signOut() first — awaiting it triggers a SIGNED_OUT re-render of this
    // very page, whose own "not authenticated" guard (above) races this
    // navigation to `/` and can win, landing on /app/login instead. Clearing
    // storage is still worth doing; just don't block navigation on it.
    void supabase.auth.signOut();
    window.location.assign('/');
  }

  return (
    <Layout title="Your account">
      <main className="container auth-page margin-vert--lg" style={{ maxWidth: 480 }}>
        <h1>Your account</h1>

        {!profile.role_chosen_at && (
          <section className="alert alert--info margin-bottom--lg">
            <form onSubmit={chooseRoleOnce}>
              <p><strong>Are you a student or a teacher?</strong> You can only set this once — an administrator changes it after that.</p>
              {roleError && <p role="alert" aria-live="assertive" className="alert alert--danger">{roleError}</p>}
              <label className="auth-tap-target margin-right--md">
                <input
                  type="radio"
                  name="profile-role"
                  value="student"
                  checked={role === 'student'}
                  onChange={() => setRole('student')}
                />
                Student
              </label>
              <label className="auth-tap-target">
                <input
                  type="radio"
                  name="profile-role"
                  value="teacher"
                  checked={role === 'teacher'}
                  onChange={() => setRole('teacher')}
                />
                Teacher
              </label>
              <div className="margin-top--sm">
                <button type="submit" className="button button--primary" disabled={roleSubmitting}>
                  {roleSubmitting ? 'Saving…' : 'Confirm'}
                </button>
              </div>
            </form>
          </section>
        )}

        <form onSubmit={saveName}>
          <div className="margin-bottom--sm">
            <label htmlFor="profile-name">Display name</label>
            <input
              id="profile-name"
              type="text"
              className="input"
              value={fullName}
              onChange={(e) => { setFullName(e.target.value); setNameSaved(false); }}
              placeholder={session.user.email ?? ''}
            />
          </div>
          {nameError && <p role="alert" aria-live="assertive" className="alert alert--danger">{nameError}</p>}
          {nameSaved && <p role="status">Saved.</p>}
          <button type="submit" className="button button--secondary" disabled={nameSubmitting}>
            {nameSubmitting ? 'Saving…' : 'Save name'}
          </button>
        </form>

        {/* T045 — read-only once role_chosen_at is set (FR-010a): role and
            verified-teacher status are server-authoritative; only an admin
            changes them (0008_guard_privileged_columns.sql). */}
        {profile.role_chosen_at && (
          <dl className="margin-top--lg">
            <dt>Role</dt>
            <dd>{profile.role}</dd>
            <dt>Verified teacher (answer-key access)</dt>
            <dd>{profile.verified_teacher ? 'Yes' : 'No'}</dd>
          </dl>
        )}
        {profile.role_chosen_at && (
          <p>
            Role and verified-teacher status are set by an administrator — contact one if this
            needs to change.
          </p>
        )}

        {/* T057 — FR-021/FR-022: identity removed, submitted work retained
            anonymously. Requires an explicit acknowledgement before the
            (irreversible) delete button is even clickable. */}
        <section className="margin-top--lg">
          <h2>Delete account</h2>
          <p>
            Deleting your account removes your sign-in and personal details permanently. Any work
            you have submitted is <strong>retained, but anonymised</strong> — it stays linked to
            your coursework record without your name attached. This cannot be undone.
          </p>
          {deleteError && <p role="alert" aria-live="assertive" className="alert alert--danger">{deleteError}</p>}
          <label className="auth-tap-target margin-bottom--sm" style={{ display: 'flex' }}>
            <input
              type="checkbox"
              checked={deleteAcknowledged}
              onChange={(e) => setDeleteAcknowledged(e.target.checked)}
            />
            I understand this is permanent and my submitted work will be kept anonymously.
          </label>
          <button
            type="button"
            className="button button--danger"
            disabled={!deleteAcknowledged || deleteSubmitting}
            onClick={deleteAccount}
          >
            {deleteSubmitting ? 'Deleting…' : 'Delete my account'}
          </button>
        </section>
      </main>
    </Layout>
  );
}
