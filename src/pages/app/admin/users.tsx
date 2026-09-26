import React, { useCallback, useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import AuthGuard from '@site/src/components/AuthGuard';
import Link from '@docusaurus/Link';
import { getSupabase } from '@site/src/lib/supabase';
import type { UserRole, AccountStatus } from '@site/src/contexts/AuthContext';

type AdminUserRow = {
  id: string;
  auth_user_id: string | null;
  full_name: string | null;
  role: UserRole;
  verified_teacher: boolean;
  reviewer: boolean;
  status: AccountStatus;
  role_chosen_at: string | null;
  created_at: string;
  deleted_at: string | null;
  email: string | null;
};

/**
 * Admin user list (Spec 002, T043) - role editing and verified_teacher toggle.
 * Feature 025 moves review access to qualification-backed scoped grants.
 *
 * The verified-teacher toggle writes a privileged column and relies on the
 * database to refuse an unauthorised write. Reviewer scopes are managed on
 * the dedicated page through admin-only RPCs with their own action audit.
 * Neither is checked here, deliberately (Art. IX.2).
 * Wrapped in AuthGuard requiring admin (FR-007, FR-015); the actual writes are
 * enforced by RLS + the 0008 guard trigger regardless of this page's UI, and
 * the row list (including email - see supabase/functions/admin-list-users)
 * comes from an admin-verified Edge Function since profiles has no email
 * column by design.
 */
function AdminUsersContent(): React.ReactElement {
  const [rows, setRows] = useState<AdminUserRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    const supabase = await getSupabase();
    if (!supabase) return;
    setError(null);
    const { data, error: fnError } = await supabase.functions.invoke('admin-list-users', {
      method: 'GET',
    });
    if (fnError) {
      setError('Could not load the user list.');
      return;
    }
    setRows((data as { users: AdminUserRow[] }).users);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function changeRole(row: AdminUserRow, role: UserRole): Promise<void> {
    const supabase = await getSupabase();
    if (!supabase) return;
    setPendingId(row.id);
    const { error: updateError } = await supabase.from('profiles').update({ role }).eq('id', row.id);
    setPendingId(null);
    if (updateError) {
      setError(`Could not change role for ${row.email ?? row.id}.`);
      return;
    }
    await load();
  }

  async function toggleVerifiedTeacher(row: AdminUserRow): Promise<void> {
    const supabase = await getSupabase();
    if (!supabase) return;
    setPendingId(row.id);
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ verified_teacher: !row.verified_teacher })
      .eq('id', row.id);
    setPendingId(null);
    if (updateError) {
      setError(`Could not change verified-teacher status for ${row.email ?? row.id}.`);
      return;
    }
    await load();
  }

  async function toggleSuspend(row: AdminUserRow): Promise<void> {
    const supabase = await getSupabase();
    if (!supabase) return;
    const suspend = row.status === 'active';
    const label = row.email ?? row.id;
    const confirmed = window.confirm(
      suspend
        ? `Suspend ${label}? Their session ends immediately and they cannot sign in until reinstated.`
        : `Reinstate ${label}? They will be able to sign in again.`,
    );
    if (!confirmed) return;

    setPendingId(row.id);
    // admin-suspend (T054) - needs the service-role key to ban at the GoTrue
    // level (RLS alone can't stop a fresh sign-in), so this goes through the
    // Edge Function rather than a direct table update.
    const { error: fnError } = await supabase.functions.invoke('admin-suspend', {
      body: { user_id: row.id, suspend },
    });
    setPendingId(null);
    if (fnError) {
      setError(`Could not ${suspend ? 'suspend' : 'reinstate'} ${label}.`);
      return;
    }
    await load();
  }

  return (
    <main className="container auth-page margin-vert--lg">
      <h1>Users</h1>

      {error && <div className="alert alert--danger" role="alert" aria-live="assertive">{error}</div>}

      {!rows ? (
        <p>Loading…</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>Role</th>
              <th>Verified teacher</th>
              <th>Reviewer access</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>{row.deleted_at ? '(deleted account)' : row.email ?? '-'}</td>
                <td>{row.full_name ?? '-'}</td>
                <td>
                  <select
                    className="input"
                    aria-label={`Role for ${row.email ?? row.id}`}
                    value={row.role}
                    disabled={pendingId === row.id || Boolean(row.deleted_at)}
                    onChange={(e) => changeRole(row, e.target.value as UserRole)}
                  >
                    <option value="student">student</option>
                    <option value="teacher">teacher</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
                <td>
                  <label className="auth-tap-target">
                    <input
                      type="checkbox"
                      aria-label={`Verified teacher for ${row.email ?? row.id}`}
                      checked={row.verified_teacher}
                      disabled={pendingId === row.id || Boolean(row.deleted_at)}
                      onChange={() => toggleVerifiedTeacher(row)}
                    />
                  </label>
                </td>
                <td><Link to={`/app/admin/reviewers?user=${row.id}`}>Manage scopes</Link></td>
                <td>{row.status}</td>
                <td>
                  {!row.deleted_at && (
                    <button
                      type="button"
                      className="button button--sm button--secondary"
                      disabled={pendingId === row.id}
                      onClick={() => toggleSuspend(row)}
                    >
                      {row.status === 'active' ? 'Suspend' : 'Reinstate'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <p className="margin-top--md">
        <a href="/app/admin/audit">View the privilege-change audit history</a>
      </p>
    </main>
  );
}

export default function AdminUsersPage(): React.ReactElement {
  return (
    <Layout title="Admin: users">
      <AuthGuard requireRole="admin">
        <AdminUsersContent />
      </AuthGuard>
    </Layout>
  );
}
