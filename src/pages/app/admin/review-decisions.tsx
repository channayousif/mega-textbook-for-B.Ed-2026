import React, { useCallback, useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import OwnerConsoleGuard from '@site/src/components/OwnerConsoleGuard';
import { getSupabase } from '@site/src/lib/supabase';

type Review = {
  id: string; reviewer_id: string; track: string; course_code: string | null; unit_no: number | null;
  topic_no: number | null; page_slug: string | null; stage: string; criteria: Record<string, string>; comments: string;
  recommendation: string; evidence_path: string | null; decision: string; decision_note: string | null;
  created_at: string;
};

function Decisions(): React.ReactElement {
  const [rows, setRows] = useState<Review[]>([]);
  const [note, setNote] = useState<Record<string, string>>({});
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const load = useCallback(async () => {
    const db = await getSupabase(); if (!db) return;
    const { data, error: e } = await db.from('review_submissions').select('*').order('created_at', { ascending: false });
    if (e) setError(e.message); else setRows((data ?? []) as Review[]);
  }, []);
  useEffect(() => { void load(); }, [load]);
  async function decide(id: string, decision: 'approved' | 'improve' | 'rejected'): Promise<void> {
    const db = await getSupabase(); if (!db) return;
    setBusy(true); setError('');
    const { error: e } = await db.rpc('decide_review', { p_id: id, p_decision: decision, p_note: note[id] || '' });
    setBusy(false); if (e) setError(e.message); else await load();
  }
  return <main className="container auth-page margin-vert--lg"><p><Link to="/app/admin/">Admin dashboard</Link></p>
    <h1>Review decisions</h1>
    <p>These are reviewer recommendations. A formal G3/G5 unit becomes reviewed only when its evidence is committed and passes the Git gates.</p>
    {error && <div className="alert alert--danger" role="alert">{error}</div>}
    {rows.length === 0 ? <p>No review submissions yet.</p> : rows.map(r => <article className="work-panel" key={r.id}>
      <h2>{r.page_slug || `${r.course_code} Unit ${r.unit_no}${r.topic_no ? ` Topic ${r.topic_no}` : ''}`} | {r.stage}</h2>
      <p>Reviewer: {r.reviewer_id} | Recommendation: {r.recommendation} | Decision: {r.decision}</p>
      <ul>{Object.entries(r.criteria).map(([criterion, result]) => <li key={criterion}><strong>{criterion}:</strong> {result}</li>)}</ul>
      <p><strong>Comments:</strong> {r.comments}</p>
      {r.evidence_path && <p>Evidence: <code>{r.evidence_path}</code></p>}
      {r.decision === 'pending' ? <div className="work-form">
        <label>Decision note <textarea className="input" rows={2} value={note[r.id] || ''} onChange={e => setNote(v => ({ ...v, [r.id]: e.target.value }))} /></label>
        <div className="work-actions"><button className="button button--sm button--primary" disabled={busy || (note[r.id] || '').trim().length < 5} onClick={() => void decide(r.id, 'approved')}>Approve recommendation</button>
          <button className="button button--sm button--secondary" disabled={busy || (note[r.id] || '').trim().length < 5} onClick={() => void decide(r.id, 'improve')}>Request improvement</button>
          <button className="button button--sm button--secondary" disabled={busy || (note[r.id] || '').trim().length < 5} onClick={() => void decide(r.id, 'rejected')}>Reject</button></div>
      </div> : <p>Admin note: {r.decision_note}</p>}
      {r.decision === 'improve' && <p><Link to={`/app/admin/agent-jobs?review=${r.id}`}>Queue an agent improvement</Link></p>}
    </article>)}
  </main>;
}
export default function AdminReviewDecisionsPage(): React.ReactElement { return <Layout title="Review decisions"><OwnerConsoleGuard><Decisions /></OwnerConsoleGuard></Layout>; }
