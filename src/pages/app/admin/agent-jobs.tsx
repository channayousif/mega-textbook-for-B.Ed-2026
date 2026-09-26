import React, { useCallback, useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import OwnerConsoleGuard from '@site/src/components/OwnerConsoleGuard';
import { getSupabase } from '@site/src/lib/supabase';

type Job = { id: string; suggestion_id: string | null; review_id: string | null; instructions: string; status: string; provider: string; host_config_name: string; branch_name: string; attempt: number; diff_summary: string | null; checks: unknown; error_text: string | null; pr_url: string | null; created_at: string };
type Source = { id: string; body?: string; comments?: string; course_code?: string; unit_no?: number };
type Config = { provider: string; host_config_name: string };

function Jobs(): React.ReactElement {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [suggestions, setSuggestions] = useState<Source[]>([]);
  const [reviews, setReviews] = useState<Source[]>([]);
  const [config, setConfig] = useState<Config>({ provider: 'codex', host_config_name: 'default' });
  const [installed, setInstalled] = useState<Config[]>([]);
  const [kind, setKind] = useState<'suggestion' | 'review'>('suggestion');
  const [source, setSource] = useState('');
  const [instructions, setInstructions] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);
  const load = useCallback(async () => {
    const db = await getSupabase(); if (!db) return;
    const [j,s,r,c,h] = await Promise.all([
      db.from('agent_jobs').select('*').order('created_at', { ascending: false }),
      db.from('improvement_suggestions').select('id,body,course_code,unit_no').eq('status','accepted'),
      db.from('review_submissions').select('id,comments,course_code,unit_no').eq('decision','improve'),
      db.from('agent_configuration').select('provider,host_config_name').eq('singleton',true).single(),
      db.from('agent_host_configurations').select('provider,host_config_name').order('provider'),
    ]);
    const failure = j.error || s.error || r.error || c.error || h.error;
    if (failure) { setError(failure.message); return; }
    setJobs((j.data ?? []) as Job[]); setSuggestions((s.data ?? []) as Source[]); setReviews((r.data ?? []) as Source[]);
    setConfig(c.data as Config);
    setInstalled((h.data ?? []) as Config[]);
  }, []);
  useEffect(() => {
    void load();
    const params = new URLSearchParams(window.location.search);
    if (params.get('review')) { setKind('review'); setSource(params.get('review')!); }
    else if (params.get('suggestion')) setSource(params.get('suggestion')!);
  }, [load]);

  async function saveConfig(): Promise<void> {
    const db = await getSupabase(); if (!db) return;
    setBusy(true); setError('');
    const { error: e } = await db.rpc('set_agent_configuration', { p_provider: config.provider, p_host_config_name: config.host_config_name });
    setBusy(false); if (e) setError(e.message); else { setNotice('Host configuration choice saved.'); await load(); }
  }
  async function enqueue(): Promise<void> {
    const db = await getSupabase(); if (!db) return;
    setBusy(true); setError('');
    const { error: e } = await db.rpc('enqueue_agent_job', { p_suggestion: kind === 'suggestion' ? source : null, p_review: kind === 'review' ? source : null, p_instructions: instructions });
    setBusy(false); if (e) setError(e.message); else { setNotice('Approved job queued for the heartbeat.'); setInstructions(''); setSource(''); await load(); }
  }
  async function retry(id: string): Promise<void> {
    const db = await getSupabase(); if (!db) return;
    setBusy(true); setError('');
    const { error: e } = await db.rpc('retry_agent_job', { p_id: id });
    setBusy(false); if (e) setError(e.message); else { setNotice('Job returned to the approved queue.'); await load(); }
  }
  function exportJob(job: Job): void {
    const body = JSON.stringify({ id: job.id, source: { suggestion_id: job.suggestion_id, review_id: job.review_id }, instructions: job.instructions, provider: job.provider, host_config_name: job.host_config_name, branch_name: job.branch_name }, null, 2);
    const url = URL.createObjectURL(new Blob([body], { type: 'application/json' }));
    const a = document.createElement('a'); a.href = url; a.download = `${job.id}.json`; a.click(); URL.revokeObjectURL(url);
  }
  const sources = kind === 'suggestion' ? suggestions : reviews;
  return <main className="container auth-page margin-vert--lg"><p><Link to="/app/admin/">Admin dashboard</Link></p>
    <h1>Agent jobs and settings</h1>
    <p>Approved jobs propose changes through draft pull requests. Host credentials and named CLI configurations stay on the heartbeat host.</p>
    {error && <div className="alert alert--danger" role="alert">{error}</div>}{notice && <div className="alert alert--success" role="status">{notice}</div>}
    <section className="work-panel"><h2>Host agent choice</h2><div className="work-form">
      <label>Installed configuration <select className="input" value={`${config.provider}/${config.host_config_name}`} disabled={installed.length === 0} onChange={e => { const choice = installed.find(x => `${x.provider}/${x.host_config_name}` === e.target.value); if (choice) setConfig(choice); }}>
        {!installed.some(x => x.provider === config.provider && x.host_config_name === config.host_config_name) && <option value={`${config.provider}/${config.host_config_name}`}>{config.provider}/{config.host_config_name} (not reported)</option>}
        {installed.map(x => <option key={`${x.provider}/${x.host_config_name}`} value={`${x.provider}/${x.host_config_name}`}>{x.provider}/{x.host_config_name}</option>)}
      </select></label>
      {installed.length === 0 && <p>No host configurations have been reported. Existing jobs can still be exported manually.</p>}
      <button className="button button--primary" disabled={busy || !installed.some(x => x.provider === config.provider && x.host_config_name === config.host_config_name)} onClick={() => void saveConfig()}>Save choice</button>
    </div></section>
    <section className="work-panel"><h2>Queue an approved improvement</h2><div className="work-form">
      <label>Source <select className="input" value={kind} onChange={e => { setKind(e.target.value as 'suggestion' | 'review'); setSource(''); }}><option value="suggestion">Accepted suggestion</option><option value="review">Review improvement decision</option></select></label>
      <label>Selected record <select className="input" value={source} onChange={e => setSource(e.target.value)}><option value="">Select a record</option>{sources.map(s => <option key={s.id} value={s.id}>{s.course_code} Unit {s.unit_no}: {(s.body || s.comments || '').slice(0,70)}</option>)}</select></label>
      <label>Instructions for the draft PR <textarea className="input" rows={4} value={instructions} onChange={e => setInstructions(e.target.value)} /></label>
      <button className="button button--primary" disabled={busy || !source || instructions.trim().length < 10} onClick={() => void enqueue()}>Approve and queue</button>
    </div></section>
    <h2>Job history</h2>
    {jobs.length === 0 ? <p>No jobs queued yet.</p> : jobs.map(j => <article className="work-panel" key={j.id}>
      <h3>{j.id}</h3><p>{j.status} | {j.provider}/{j.host_config_name} | attempt {j.attempt}</p>
      <p>{j.instructions}</p><p>Branch: <code>{j.branch_name}</code></p>
      {j.diff_summary && <pre className="work-pre">{j.diff_summary}</pre>}
      {j.checks && <pre className="work-pre">{JSON.stringify(j.checks, null, 2)}</pre>}
      {j.error_text && <p role="alert">{j.error_text}</p>}
      {j.pr_url && <p><a href={j.pr_url} target="_blank" rel="noreferrer">Open draft pull request</a></p>}
      <button className="button button--sm button--secondary" onClick={() => exportJob(j)}>Manual export</button>
      {j.status === 'failed' && <button className="button button--sm button--primary margin-left--sm" disabled={busy} onClick={() => void retry(j.id)}>Retry job</button>}
    </article>)}
  </main>;
}
export default function AdminAgentJobsPage(): React.ReactElement { return <Layout title="Agent jobs"><OwnerConsoleGuard><Jobs /></OwnerConsoleGuard></Layout>; }
