import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import AuthGuard from '@site/src/components/AuthGuard';
import { getSupabase } from '@site/src/lib/supabase';

type AuditRow = {
  id: number;
  subject_id: string;
  actor_id: string;
  change_type: 'role' | 'verified_teacher' | 'reviewer' | 'status';
  old_value: string | null;
  new_value: string;
  created_at: string;
};

type ProfileLabel = { full_name: string | null; role: string };
type ActionRow = { id: number; actor_id: string | null; action: string; target_type: string; target_id: string | null; detail: Record<string, unknown>; occurred_at: string };

/**
 * Admin audit history (Spec 002, T044) - SC-008: "who granted answer-key
 * access to this account, and when". `privilege_audit` is append-only and
 * admin-readable-only (0006_audit_policies.sql); this page is a read-only
 * view over it, wrapped in AuthGuard requiring admin.
 */
function AuditHistoryContent(): React.ReactElement {
  const [rows, setRows] = useState<AuditRow[] | null>(null);
  const [actions, setActions] = useState<ActionRow[]>([]);
  const [labels, setLabels] = useState<Record<string, ProfileLabel>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const supabase = await getSupabase();
      if (!supabase) return;

      const { data, error: fetchError } = await supabase
        .from('privilege_audit')
        .select('*')
        .order('created_at', { ascending: false });
      if (fetchError) {
        setError('Could not load the audit history.');
        return;
      }
      const auditRows = (data ?? []) as AuditRow[];
      setRows(auditRows);

      const { data: actionData, error: actionError } = await supabase
        .from('admin_action_history').select('*').order('occurred_at', { ascending: false });
      if (actionError) setError('Could not load admin action history.');
      else setActions((actionData ?? []) as ActionRow[]);

      const ids = Array.from(new Set([...auditRows.flatMap((r) => [r.subject_id, r.actor_id]), ...((actionData ?? []) as ActionRow[]).map(r => r.actor_id).filter((id): id is string => Boolean(id))]));
      if (ids.length === 0) return;
      const { data: profileRows } = await supabase
        .from('profiles')
        .select('id, full_name, role')
        .in('id', ids);
      const map: Record<string, ProfileLabel> = {};
      for (const p of profileRows ?? []) {
        map[p.id as string] = { full_name: p.full_name as string | null, role: p.role as string };
      }
      setLabels(map);
    })();
  }, []);

  function label(id: string): string {
    const entry = labels[id];
    if (!entry) return id;
    return `${entry.full_name?.trim() || '(no name)'} (${entry.role})`;
  }

  return (
    <main className="container auth-page margin-vert--lg">
      <h1>Privilege audit history</h1>

      <h2>Admin workflow actions</h2>
      {actions.length === 0 ? <p>No workflow actions recorded yet.</p> : <div className="table-scroll"><table><thead><tr><th>When</th><th>Actor</th><th>Action</th><th>Target</th><th>Detail</th></tr></thead><tbody>{actions.map(a => <tr key={a.id}><td>{new Date(a.occurred_at).toLocaleString()}</td><td>{a.actor_id ? label(a.actor_id) : 'Service'}</td><td>{a.action}</td><td>{a.target_type} {a.target_id}</td><td><code>{JSON.stringify(a.detail)}</code></td></tr>)}</tbody></table></div>}

      {error && <div className="alert alert--danger" role="alert" aria-live="assertive">{error}</div>}

      {!rows ? (
        <p>Loading…</p>
      ) : rows.length === 0 ? (
        <p>No privilege changes recorded yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>When</th>
              <th>Subject</th>
              <th>Changed by</th>
              <th>Field</th>
              <th>Before</th>
              <th>After</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>{new Date(row.created_at).toLocaleString()}</td>
                <td>{label(row.subject_id)}</td>
                <td>{label(row.actor_id)}</td>
                <td>{row.change_type}</td>
                <td>{row.old_value ?? '-'}</td>
                <td>{row.new_value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}

export default function AdminAuditPage(): React.ReactElement {
  return (
    <Layout title="Admin: audit history">
      <AuthGuard requireRole="admin">
        <AuditHistoryContent />
      </AuthGuard>
    </Layout>
  );
}
