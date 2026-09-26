import React, { useCallback, useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import OwnerConsoleGuard from '@site/src/components/OwnerConsoleGuard';
import { getSupabase } from '@site/src/lib/supabase';
import { fetchCatalog, type Catalog } from '@site/src/lib/catalog';

type Profile = { id: string; full_name: string | null; email: string | null; role: string; status: string; deleted_at: string | null };
type Application = { id: string; applicant_id: string; track: string; course_code: string | null; qualification_evidence: string; status: string; created_at: string };
type Grant = { id: string; subject_id: string; track: string; course_code: string | null; qualification_evidence: string; revoked_at: string | null };

function ReviewersContent(): React.ReactElement {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [grants, setGrants] = useState<Grant[]>([]);
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [subject, setSubject] = useState('');
  const [track, setTrack] = useState<'bed' | 'licence'>('bed');
  const [course, setCourse] = useState('');
  const [evidence, setEvidence] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const db = await getSupabase();
    if (!db) return;
    const [p, a, g, u] = await Promise.all([
      db.from('profiles').select('id,full_name,role,status,deleted_at').is('deleted_at', null).order('full_name'),
      db.from('reviewer_applications').select('*').order('created_at', { ascending: false }),
      db.from('reviewer_grants').select('*').order('granted_at', { ascending: false }),
      db.functions.invoke('admin-list-users', { method: 'GET' }),
    ]);
    const failure = p.error || a.error || g.error;
    if (failure) { setError(failure.message); return; }
    const emails = new Map(((u.data as { users?: Profile[] })?.users ?? []).map(x => [x.id, x.email]));
    setProfiles(((p.data ?? []) as Profile[]).map(x => ({ ...x, email: emails.get(x.id) ?? null })));
    setApplications((a.data ?? []) as Application[]);
    setGrants((g.data ?? []) as Grant[]);
  }, []);

  useEffect(() => { void load(); void fetchCatalog().then(setCatalog).catch(() => setError('Could not load course catalog.')); }, [load]);
  useEffect(() => {
    const selected = new URLSearchParams(window.location.search).get('user');
    if (selected) setSubject(selected);
  }, []);

  const courses = track === 'bed' ? catalog?.semesters.flatMap(s => s.courses) ?? [] : catalog?.tracks?.find(t => t.id === 'licence')?.courses ?? [];
  const label = (id: string) => { const p = profiles.find(x => x.id === id); return p?.full_name || p?.email || id; };

  async function decide(id: string, approve: boolean): Promise<void> {
    const db = await getSupabase(); if (!db) return;
    setBusy(true); setError('');
    const { error: e } = await db.rpc('decide_reviewer_application', { p_id: id, p_approve: approve, p_note: note || null });
    setBusy(false); if (e) setError(e.message); else { setNote(''); await load(); }
  }
  async function directGrant(): Promise<void> {
    const db = await getSupabase(); if (!db) return;
    setBusy(true); setError('');
    const { error: e } = await db.rpc('grant_reviewer_scope', { p_subject: subject, p_track: track, p_course: course || null, p_evidence: evidence });
    setBusy(false); if (e) setError(e.message); else { setEvidence(''); await load(); }
  }
  async function revoke(id: string): Promise<void> {
    const db = await getSupabase(); if (!db) return;
    setBusy(true); setError('');
    const { error: e } = await db.rpc('revoke_reviewer_scope', { p_id: id });
    setBusy(false); if (e) setError(e.message); else await load();
  }

  return <main className="container auth-page margin-vert--lg">
    <p><Link to="/app/admin/">Admin dashboard</Link></p>
    <h1>Reviewer applications and scopes</h1>
    {error && <div className="alert alert--danger" role="alert">{error}</div>}
    <section><h2>Applications</h2>
      <label>Decision note <input className="input" value={note} onChange={e => setNote(e.target.value)} /></label>
      {applications.filter(a => a.status === 'pending').length === 0 ? <p>No applications are pending.</p> :
        <div className="table-scroll"><table><thead><tr><th>Applicant</th><th>Scope</th><th>Qualification evidence</th><th>Action</th></tr></thead><tbody>
          {applications.filter(a => a.status === 'pending').map(a => <tr key={a.id}>
            <td>{label(a.applicant_id)}</td><td>{a.track} {a.course_code ?? 'all courses'}</td><td>{a.qualification_evidence}</td>
            <td><button className="button button--sm button--primary" disabled={busy} onClick={() => void decide(a.id, true)}>Approve</button>{' '}
              <button className="button button--sm button--secondary" disabled={busy} onClick={() => void decide(a.id, false)}>Reject</button></td>
          </tr>)}</tbody></table></div>}
    </section>
    <section><h2>Direct assignment</h2>
      <p>Record the candidate&apos;s qualification evidence before granting review access.</p>
      <div className="work-form">
        <label>Account <select className="input" value={subject} onChange={e => setSubject(e.target.value)}><option value="">Select an account</option>{profiles.filter(p => p.status === 'active').map(p => <option key={p.id} value={p.id}>{p.full_name || p.email || p.id} ({p.role})</option>)}</select></label>
        <label>Track <select className="input" value={track} onChange={e => { setTrack(e.target.value as 'bed' | 'licence'); setCourse(''); }}><option value="bed">B.Ed</option><option value="licence">Teaching licence</option></select></label>
        {track === 'bed' && <label>Course <select className="input" value={course} onChange={e => setCourse(e.target.value)}><option value="">All B.Ed courses</option>{courses.map(c => <option key={c.code} value={c.code}>{c.code} - {c.title_en}</option>)}</select></label>}
        {track === 'licence' && <p>The teaching licence is a topic list with no course codes; this grant covers the track.</p>}
        <label>Qualification evidence <textarea className="input" rows={3} value={evidence} onChange={e => setEvidence(e.target.value)} /></label>
        <button className="button button--primary" disabled={busy || !subject || evidence.trim().length < 20} onClick={() => void directGrant()}>Grant access</button>
      </div>
    </section>
    <section><h2>Active grants</h2>
      {grants.filter(g => !g.revoked_at).length === 0 ? <p>No active grants.</p> : <div className="table-scroll"><table><thead><tr><th>Reviewer</th><th>Scope</th><th>Evidence</th><th>Action</th></tr></thead><tbody>{grants.filter(g => !g.revoked_at).map(g => <tr key={g.id}><td>{label(g.subject_id)}</td><td>{g.track} {g.course_code ?? 'all courses'}</td><td>{g.qualification_evidence}</td><td><button className="button button--sm button--secondary" disabled={busy} onClick={() => void revoke(g.id)}>Revoke</button></td></tr>)}</tbody></table></div>}
    </section>
  </main>;
}

export default function AdminReviewersPage(): React.ReactElement {
  return <Layout title="Reviewer applications"><OwnerConsoleGuard><ReviewersContent /></OwnerConsoleGuard></Layout>;
}
