import React, { useCallback, useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import OwnerConsoleGuard from '@site/src/components/OwnerConsoleGuard';
import AppDashboardShell from '@site/src/components/AppDashboardShell';
import { PageHeader } from '@site/src/components/ui';
import { getSupabase } from '@site/src/lib/supabase';
import {
  ACTION_LABEL, STALE_MINUTES, STATUS_TEXT, actionReady, commandPreview, groupCards, minutesSince, payloadFor,
  type Action, type Card, type DecisionRow, type QueueItem,
} from '@site/src/lib/ownerDecisions';

type Form = { note: string; except: string[]; remakeKey: string; answer: string };
const emptyForm = (): Form => ({ note: '', except: [], remakeKey: '', answer: '' });

function ExtLink({ href, children }: { href: string; children: React.ReactNode }): React.ReactElement {
  return <a href={href} target="_blank" rel="noreferrer">{children}</a>;
}

/** What the owner needs to see to decide, per kind. */
function Details({ item, form, setForm }: { item: QueueItem; form: Form; setForm: (f: Form) => void }): React.ReactElement | null {
  const d = item.details;
  if (item.kind === 'teaser_script') return <>
    <p className="margin-bottom--sm">Recipe {d.recipe ?? 'unknown'}; QG0 {d.qg0 ?? 'not run'}.</p>
    <div className="table-scroll" tabIndex={0} role="region" aria-label="Details table"><table>
      <thead><tr><th>Shot</th><th>What we see</th><th>Spoken line ({d.locale})</th></tr></thead>
      <tbody>{(d.shots ?? []).map((s: any) => <tr key={s.n}>
        <td>{s.n} {s.beat}</td><td>{s.visual}</td><td dir={d.locale === 'ur' ? 'rtl' : 'ltr'} lang={d.locale}>{s.line}</td>
      </tr>)}</tbody>
    </table></div>
    {d.sources?.length > 0 && <p>Sources: {d.sources.map((s: string) => <code key={s}>{s}</code>).reduce((a: React.ReactNode[], c: React.ReactNode, i: number) => (i ? [...a, ', ', c] : [c]), [])}</p>}
  </>;
  if (item.kind === 'short') return <>
    {d.notes?.length > 0 ? <><p><strong>Review notes</strong></p><ul>{d.notes.map((n: string, i: number) => <li key={i}>{n}</li>)}</ul></> : <p>No review notes.</p>}
    {d.qa1 && <p>QG1: {d.qa1}</p>}
  </>;
  if (item.kind === 'studio_unit' || item.kind === 'studio_progress') {
    const decide = item.kind === 'studio_unit';
    return <>
      <div className="table-scroll" tabIndex={0} role="region" aria-label="Details table"><table>
        <thead><tr><th>Item</th><th>Watch</th><th>Check notes</th>{decide && <th>Keep private</th>}{decide && <th>Remake</th>}</tr></thead>
        <tbody>{(d.items ?? []).map((it: any) => <tr key={it.key}>
          <td><strong>{it.title}</strong><br /><code>{it.key}</code> {it.kind} {it.locale}</td>
          <td>{it.url ? <ExtLink href={it.url}>Open on YouTube</ExtLink> : 'no link'}</td>
          <td>{it.qa2 ?? ''}{it.urdu_flag ? ` (${it.urdu_flag})` : ''}</td>
          {decide && <td><input type="checkbox" id={`except-${item.item_key}-${it.key}`} aria-label={`Keep ${it.key} private`} checked={form.except.includes(it.key)}
            onChange={(e) => setForm({ ...form, except: e.target.checked ? [...form.except, it.key] : form.except.filter((k) => k !== it.key) })} /></td>}
          {decide && <td><input type="radio" name={`remake-${item.item_key}`} id={`remake-${item.item_key}-${it.key}`} aria-label={`Remake ${it.key}`} checked={form.remakeKey === it.key}
            onChange={() => setForm({ ...form, remakeKey: it.key })} /></td>}
        </tr>)}</tbody>
      </table></div>
      {item.kind === 'studio_progress' && d.making?.length > 0 && <p>Still being made: {d.making.map((m: any) => `${m.key} (${m.state})`).join(', ')}.</p>}
    </>;
  }
  if (item.kind === 'social_post') return <>
    {d.headline && <p><strong>{d.headline}</strong></p>}
    <ul>{(d.highlights ?? []).map((h: any, i: number) => <li key={i}>{h.en}{h.link && <> (<ExtLink href={h.link}>page</ExtLink>)</>}<br /><span dir="rtl" lang="ur">{h.ur}</span></li>)}</ul>
  </>;
  if (item.kind === 'crew_question') return <>
    {d.files?.length > 0 && <p>Protected files: {d.files.map((f: string) => <code key={f}>{f} </code>)}</p>}
    <fieldset><legend>Your answer</legend>
      {(d.options ?? []).map((o: string) => <label key={o} className="margin-right--md">
        <input type="radio" name={`answer-${item.item_key}`} id={`answer-${item.item_key}-${o}`} checked={form.answer === o} onChange={() => setForm({ ...form, answer: o })} /> {o}
      </label>)}
    </fieldset>
  </>;
  if (item.kind === 'g3') return <p>{d.count} unit(s), for example {(d.units ?? []).slice(0, 6).map((u: any) => `${u.course} U${u.unit}`).join(', ')}.</p>;
  return null;
}

function DecisionCard({ card, busy, onDecide, onWithdraw }: {
  card: Card; busy: boolean;
  onDecide: (item: QueueItem, action: Action, form: Form) => Promise<boolean>;
  onWithdraw: (id: string) => Promise<void>;
}): React.ReactElement {
  const { item, decision, canDecide } = card;
  const [form, setForm] = useState<Form>(emptyForm);
  const [copied, setCopied] = useState('');
  const needsNote = item.actions.some((a) => a === 'reject' || a === 'remake');
  const previewAction = item.actions.find((a) => actionReady(a, form, item)) ?? item.actions[0];
  async function copy(): Promise<void> {
    const text = previewAction ? commandPreview(previewAction, form, item) : '';
    try { await navigator.clipboard.writeText(text); setCopied('Copied'); } catch { setCopied(text); }
  }
  return <article className="work-panel" id={item.item_key.replace(/[^a-z0-9-]/gi, '-')}>
    <h3>{item.title}</h3>
    {item.summary && <p>{item.summary}</p>}
    {item.links.length > 0 && <p>{item.links.map((l) => <span key={l.url} className="margin-right--md"><ExtLink href={l.url}>{l.label}</ExtLink></span>)}</p>}
    <Details item={item} form={form} setForm={setForm} />
    {decision && <div className={`alert alert--${decision.status === 'refused' ? 'danger' : decision.status === 'applied' ? 'success' : 'info'}`} role="status">
      <strong>{ACTION_LABEL[decision.action]}</strong>{decision.note ? `: ${decision.note}` : ''}. {STATUS_TEXT[decision.status]}
      {decision.result && <><br /><span>Crew: {decision.result}</span></>}
      {decision.status === 'queued' && <><br /><button className="button button--sm button--secondary margin-top--sm" disabled={busy} onClick={() => void onWithdraw(decision.id)}>Withdraw</button></>}
    </div>}
    {canDecide && <div className="work-form">
      {needsNote && <label htmlFor={`note-${item.item_key}`}>Note (needed to reject or remake: what must change)
        <textarea className="input" id={`note-${item.item_key}`} rows={2} maxLength={1000} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} /></label>}
      {item.kind === 'crew_question' && <label htmlFor={`note-${item.item_key}`}>Note (optional)
        <input className="input" id={`note-${item.item_key}`} maxLength={1000} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} /></label>}
      <div>
        {item.actions.map((a) => <button key={a} className={`button button--sm margin-right--sm ${a === 'reject' || a === 'remake' ? 'button--secondary' : 'button--primary'}`}
          disabled={busy || !actionReady(a, form, item)}
          onClick={async () => { if (await onDecide(item, a, form)) setForm(emptyForm()); }}>
          {a === 'approve' && item.kind === 'studio_unit' && form.except.length ? `Approve, keep ${form.except.length} private` : ACTION_LABEL[a]}
        </button>)}
        <button className="button button--sm button--link" onClick={() => void copy()}>Copy crew command</button>
        {copied && <span className="margin-left--sm"><code>{copied}</code></span>}
      </div>
    </div>}
  </article>;
}

function Decisions(): React.ReactElement {
  const [items, setItems] = useState<QueueItem[]>([]);
  const [rows, setRows] = useState<DecisionRow[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);
  const load = useCallback(async () => {
    const db = await getSupabase(); if (!db) return;
    const since = new Date(Date.now() - 14 * 864e5).toISOString();
    const [q, d] = await Promise.all([
      db.from('owner_queue').select('*'),
      db.from('owner_decisions').select('*').gte('decided_at', since).order('decided_at', { ascending: false }).limit(300),
    ]);
    const failure = q.error || d.error;
    if (failure) { setError(failure.message); return; }
    setItems((q.data ?? []) as QueueItem[]); setRows((d.data ?? []) as DecisionRow[]); setLoaded(true);
  }, []);
  useEffect(() => { void load(); const t = window.setInterval(() => void load(), 60_000); return () => window.clearInterval(t); }, [load]);

  async function decide(item: QueueItem, action: Action, form: Form): Promise<boolean> {
    const db = await getSupabase(); if (!db) return false;
    setBusy(true); setError(''); setNotice('');
    const { error: e } = await db.rpc('record_owner_decision', {
      p_item_key: item.item_key, p_action: action, p_note: form.note.trim() || null, p_payload: payloadFor(action, form, item),
    });
    setBusy(false);
    if (e) { setError(e.message); return false; }
    setNotice(`${ACTION_LABEL[action]}: ${item.title}. The crew applies it at its next tick.`);
    await load();
    return true;
  }
  async function withdraw(id: string): Promise<void> {
    const db = await getSupabase(); if (!db) return;
    setBusy(true); setError('');
    const { error: e } = await db.rpc('withdraw_owner_decision', { p_id: id });
    setBusy(false); if (e) setError(e.message); else { setNotice('Decision withdrawn.'); await load(); }
  }

  const groups = groupCards(items, rows);
  const snapshot = items.reduce<string | null>((m, i) => (!m || i.snapshot_at > m ? i.snapshot_at : m), null);
  const age = minutesSince(snapshot);
  const waiting = groups.reduce((n, g) => n + g.cards.filter((c) => c.canDecide).length, 0);
  const recent = rows.filter((r) => r.status !== 'queued').slice(0, 15);
  return <div className="app-page-body"><p><Link to="/app/admin/">Admin dashboard</Link></p>
    <PageHeader title="Decisions" icon="queue" lead="Everything the crew is waiting on you for, with what you need to decide. A decision is applied by the crew at its next tick, with the same checks as a WhatsApp command." />
    {error && <div className="alert alert--danger" role="alert">{error}</div>}
    {notice && <div className="alert alert--success" role="status">{notice}</div>}
    {loaded && <p>
      <strong>{waiting}</strong> item(s) wait for a decision.{' '}
      {age === null ? 'The crew has not sent a list yet.' : `List updated ${age} min ago.`}
    </p>}
    {loaded && age !== null && age > STALE_MINUTES && <div className="alert alert--warning" role="alert">
      The list is {age} minutes old. The crew tick may not be running, so a decision may wait longer than usual.
    </div>}
    {loaded && groups.length === 0 && <div className="work-panel"><p>Nothing waits on you. New items appear here within one crew tick.</p></div>}
    {groups.map((g) => <section key={g.kind} aria-labelledby={`group-${g.kind}`}>
      <h2 id={`group-${g.kind}`}>{g.title} ({g.cards.length})</h2>
      <p>{g.lead}</p>
      {g.cards.map((c) => <DecisionCard key={c.item.item_key} card={c} busy={busy} onDecide={decide} onWithdraw={withdraw} />)}
    </section>)}
    {recent.length > 0 && <section aria-labelledby="recent-decisions"><h2 id="recent-decisions">Recent decisions</h2>
      <div className="table-scroll" tabIndex={0} role="region" aria-label="Details table"><table>
        <thead><tr><th>When</th><th>Item</th><th>Decision</th><th>Result</th></tr></thead>
        <tbody>{recent.map((r) => <tr key={r.id}>
          <td>{new Date(r.decided_at).toLocaleString()}</td><td>{r.title ?? r.item_key}</td>
          <td>{ACTION_LABEL[r.action]}{r.note ? `: ${r.note}` : ''}</td><td>{r.status}{r.result ? `: ${r.result}` : ''}</td>
        </tr>)}</tbody>
      </table></div>
    </section>}
  </div>;
}

export default function AdminDecisionsPage(): React.ReactElement {
  return <Layout title="Decisions">
    <AppDashboardShell><OwnerConsoleGuard><Decisions /></OwnerConsoleGuard></AppDashboardShell>
  </Layout>;
}
