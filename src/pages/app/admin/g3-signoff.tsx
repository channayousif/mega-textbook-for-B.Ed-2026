import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import OwnerConsoleGuard from '@site/src/components/OwnerConsoleGuard';
import { getSupabase } from '@site/src/lib/supabase';
import { CERTIFICATION_CRITERIA } from '@site/src/lib/reviewQueue';
import {
  STATE_LABEL, latestByUnit, deskState, decidable, batchEligible, prefillCriteria,
  signoffProblem, signoffItem, summarize, unitKey,
  type DeskFile, type DeskUnit, type DeskState, type SignoffRow, type Decision,
  type DraftCriteria, type DeskFinding, type CriterionStatus,
} from '@site/src/lib/g3Desk';
import styles from '@site/src/components/G3Desk.module.css';

/**
 * The G3 sign-off desk (ADR-0032). Shows every authored unit's G3 position in
 * one place and records the owner's decisions in the `g3_signoffs` ledger.
 *
 * A decision here is an instruction, not a sign-off: the crew's next tick
 * writes the certification and tracker row into one PR, and the unit is
 * certified only when that PR merges. Nothing on this page changes a gate.
 */

const REPO_BLOB = 'https://github.com/channayousif/mega-textbook-for-B.Ed-2026/blob/main/';
const G3 = CERTIFICATION_CRITERIA.G3;
const STATES = Object.keys(STATE_LABEL) as DeskState[];
const BAR_ORDER: DeskState[] = ['certified', 'pr_open', 'queued', 'awaiting', 'changed', 'stale', 'failed', 'in_review'];
const INITIALS_KEY = 'g3-desk-initials';

function readInitials(): string {
  try { return window.localStorage.getItem(INITIALS_KEY) ?? ''; } catch { return ''; }
}
function saveInitials(value: string): void {
  try { window.localStorage.setItem(INITIALS_KEY, value); } catch { /* private window: not remembered */ }
}

function Chip({ state }: { state: DeskState }): React.ReactElement {
  return <span className={`${styles.chip} ${styles[`s-${state}`]}`}>{STATE_LABEL[state]}</span>;
}

function Dots({ unit }: { unit: DeskUnit }): React.ReactElement {
  if (!unit.agent) return <span>-</span>;
  return <span className={styles.dots} aria-label={unit.agent.criteria.map((c) => `${c.id} ${c.status}`).join(', ')}>
    {unit.agent.criteria.map((c) => <span key={c.id} title={`${c.id}: ${c.status}`} className={`${styles.dot} ${styles[`d-${c.status}`]}`} />)}
  </span>;
}

const openFindings = (u: DeskUnit): number => (u.agent?.findings ?? []).filter((f) => f.severity !== 'advisory' && !f.resolved).length;

function Overview({ units, states }: { units: DeskUnit[]; states: Map<string, DeskState> }): React.ReactElement {
  const s = useMemo(() => summarize(units, states), [units, states]);
  const attention = s.byState.changed + s.byState.stale + s.byState.failed;
  const tiles: [string, number][] = [
    ['Awaiting your decision', s.byState.awaiting],
    ['Queued for crew', s.byState.queued],
    ['PR open, merge to certify', s.byState.pr_open],
    ['Certified', s.byState.certified],
    ['Need attention', attention],
    ['Still in agent review', s.byState.in_review],
  ];
  return <section aria-label="Overview">
    <div className={styles.tiles}>{tiles.map(([label, n]) => <div className={styles.tile} key={label}><strong>{n}</strong><span>{label}</span></div>)}</div>
    <div className={styles.bar} role="img" aria-label={BAR_ORDER.map((k) => `${STATE_LABEL[k]} ${s.byState[k]}`).join(', ')}>
      {BAR_ORDER.map((k) => s.byState[k] > 0 && <span key={k} className={styles[`s-${k}`]} style={{ width: `${(100 * s.byState[k]) / s.total}%` }} />)}
    </div>
    <div className={styles.legend}>{BAR_ORDER.map((k) => <span key={k}><i className={styles[`s-${k}`]} />{STATE_LABEL[k]} {s.byState[k]}</span>)}</div>
    <p>
      Agent verdicts on the {s.byState.awaiting + s.byState.queued + attention} units awaiting sign-off:{' '}
      {Object.entries(s.byDisposition).map(([d, n]) => `${n} ${d}`).join(', ') || 'none'}.
    </p>
    <details>
      <summary>By course</summary>
      <table className={styles.table}>
        <thead><tr><th>Course</th><th>Units</th><th>Certified</th><th>Awaiting you</th></tr></thead>
        <tbody>{s.byCourse.map((c) => <tr key={c.course}><td>{c.course}</td><td>{c.total}</td><td>{c.certified}</td><td>{c.awaiting}</td></tr>)}</tbody>
      </table>
    </details>
  </section>;
}

type DrawerProps = {
  unit: DeskUnit; state: DeskState; latest: SignoffRow | undefined; initials: string; deskCommit: string;
  onClose: () => void; onRecorded: () => Promise<void>;
};

function UnitDrawer({ unit, state, latest, initials, deskCommit, onClose, onRecorded }: DrawerProps): React.ReactElement {
  const [decision, setDecision] = useState<Decision | ''>(unit.agent?.disposition === 'pass' ? 'certify' : '');
  const [criteria, setCriteria] = useState<DraftCriteria>(() => prefillCriteria(unit, G3));
  const [findings, setFindings] = useState<DeskFinding[]>(() => (unit.agent?.findings ?? []).map((f) => ({ ...f })));
  const [note, setNote] = useState('');
  const [attested, setAttested] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const canDecide = decidable(unit, state);
  const input = decision ? { decision, criteria, findings, note, initials, attested, renderedInspected: rendered } : null;
  const problem = input ? signoffProblem(input) : 'Choose a decision.';

  async function record(): Promise<void> {
    if (!input) return;
    const db = await getSupabase(); if (!db) return;
    setBusy(true); setError('');
    try {
      const { error: e } = await db.rpc('record_g3_signoff', { p_items: [signoffItem(unit, input, deskCommit)] });
      if (e) throw new Error(e.message);
      await onRecorded();
      onClose();
    } catch (e) {
      setError((e as Error).message);
    } finally { setBusy(false); }
  }

  const a = unit.agent;
  return <section className="work-panel work-panel--accent" aria-labelledby="g3-drawer-title">
    <div className="work-actions" style={{ justifyContent: 'space-between' }}>
      <h2 id="g3-drawer-title">{unit.course_code} Unit {unit.unit_no}{unit.title ? `: ${unit.title}` : ''}</h2>
      <button className="button button--sm button--secondary" onClick={onClose}>Close</button>
    </div>
    <p><Chip state={state} />{' '}
      {unit.permalink && <Link to={unit.permalink}>Read the unit</Link>}
      {a && <>{' | '}<a href={`${REPO_BLOB}${a.path}`} target="_blank" rel="noreferrer">Agent report</a></>}
    </p>
    {latest && <p>Last decision: <strong>{latest.decision}</strong> by {latest.reviewer_initials} on {latest.decided_at.slice(0, 10)}, {latest.sync_status}
      {latest.pr_url && <> (<a href={latest.pr_url} target="_blank" rel="noreferrer">PR</a>)</>}
      {latest.sync_note && <> : {latest.sync_note}</>}</p>}
    {unit.inputs_dirty && <div className="alert alert--warning" role="alert">This unit's review inputs could not be bound to a committed state, so it cannot be decided from this build.</div>}

    <h3>Agent review</h3>
    {a ? <p>Verdict <strong>{a.disposition}</strong>{a.reviewer_id ? ` by ${a.reviewer_id}` : ''}{a.completed_at ? `, ${a.completed_at.slice(0, 10)}` : ''}{unit.repaired ? '; repairs applied since' : ''}. Commands: {a.commands.map((c) => `${c.name} ${c.exit_code ?? '?'}`).join(', ')}.</p>
      : <p>No agent G3 report yet.</p>}

    <h3>Criteria</h3>
    <p>Prefilled from the agent's verdict. Change any you judge differently.</p>
    <div className={styles.criteria}>
      {G3.map((id) => {
        const agentC = a?.criteria.find((c) => c.id === id);
        return <div className={styles.criterion} key={id}>
          <strong>{id}</strong>
          <select className="input" aria-label={`${id} status`} disabled={!canDecide} value={criteria[id].status}
            onChange={(e) => setCriteria((v) => ({ ...v, [id]: { ...v[id], status: e.target.value as CriterionStatus } }))}>
            <option value="pass">pass</option><option value="fail">fail</option><option value="unverified">unverified</option>
          </select>
          <div>
            {agentC?.evidence && <details><summary>Agent: {agentC.status}</summary><div className={styles.pre}>{agentC.evidence}</div></details>}
            <input className="input" aria-label={`${id} note`} placeholder="Your evidence note (optional)" disabled={!canDecide} value={criteria[id].evidence}
              onChange={(e) => setCriteria((v) => ({ ...v, [id]: { ...v[id], evidence: e.target.value } }))} />
          </div>
        </div>;
      })}
    </div>

    <h3>Findings ({findings.length})</h3>
    {findings.length === 0 ? <p>None.</p> : findings.map((f, i) => <div key={i} className={`${styles.finding} ${styles[f.severity] ?? ''}`}>
      <label className="auth-tap-target"><input type="checkbox" disabled={!canDecide} checked={f.resolved}
        onChange={(e) => setFindings((v) => v.map((x, j) => (j === i ? { ...x, resolved: e.target.checked } : x)))} /> {f.severity}, resolved</label>
      <div className={styles.pre}>{f.message}</div>
    </div>)}

    <h3>G3 tracker history</h3>
    {unit.tracker.length === 0 ? <p>No G3 rows.</p> : <ol>{unit.tracker.map((r, i) => <li key={i}><code>{r.status} {r.reviewer || '-'}</code> {r.suggestion}</li>)}</ol>}

    {canDecide && <div className="work-form">
      <h3>Your decision</h3>
      <div className="work-actions" role="radiogroup" aria-label="Decision">
        {(['certify', 'revise', 'escalate'] as Decision[]).map((d) => <label key={d} className="auth-tap-target">
          <input type="radio" name="g3-decision" checked={decision === d} onChange={() => setDecision(d)} /> {d === 'certify' ? 'Certify' : d === 'revise' ? 'Request revision' : 'Escalate'}
        </label>)}
      </div>
      <label>Note {decision !== 'certify' && '(required)'}<textarea className="input" rows={3} value={note} onChange={(e) => setNote(e.target.value)} /></label>
      <label className="auth-tap-target"><input type="checkbox" checked={attested} onChange={(e) => setAttested(e.target.checked)} /> I reviewed this unit myself.</label>
      <label className="auth-tap-target"><input type="checkbox" checked={rendered} onChange={(e) => setRendered(e.target.checked)} /> I inspected the rendered pages (desktop, narrow and print).</label>
      {error && <div className="alert alert--danger" role="alert">{error}</div>}
      {problem && <p role="status">{problem}</p>}
      <button className="button button--primary" disabled={busy || Boolean(problem)} onClick={() => void record()}>Record decision</button>
    </div>}
  </section>;
}

function BatchConfirm({ units, initials, deskCommit, onCancel, onRecorded }: {
  units: DeskUnit[]; initials: string; deskCommit: string; onCancel: () => void; onRecorded: () => Promise<void>;
}): React.ReactElement {
  const [attested, setAttested] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function certifyAll(): Promise<void> {
    const db = await getSupabase(); if (!db) return;
    setBusy(true); setError('');
    try {
      const items = units.map((u) => signoffItem(u, {
        decision: 'certify', criteria: prefillCriteria(u, G3), findings: u.agent?.findings ?? [],
        note: '', initials, attested, renderedInspected: rendered,
      }, deskCommit));
      const { error: e } = await db.rpc('record_g3_signoff', { p_items: items });
      if (e) throw new Error(e.message);
      await onRecorded();
      onCancel();
    } catch (e) { setError((e as Error).message); } finally { setBusy(false); }
  }
  return <section className="work-panel work-panel--accent" aria-labelledby="g3-batch-title">
    <h2 id="g3-batch-title">Certify {units.length} unit{units.length === 1 ? '' : 's'}</h2>
    <p>Each one keeps the agent's passing criteria. The crew writes all of them into one PR, which you merge.</p>
    <ul>{units.map((u) => <li key={unitKey(u.course_code, u.unit_no)}>{u.course_code} Unit {u.unit_no}{u.title ? `: ${u.title}` : ''}</li>)}</ul>
    <label className="auth-tap-target"><input type="checkbox" checked={attested} onChange={(e) => setAttested(e.target.checked)} /> I reviewed each of these units myself.</label>
    <label className="auth-tap-target"><input type="checkbox" checked={rendered} onChange={(e) => setRendered(e.target.checked)} /> I inspected each unit's rendered pages.</label>
    {!/^[A-Z]{1,5}$/.test(initials) && <p role="status">Enter your reviewer initials above first.</p>}
    {error && <div className="alert alert--danger" role="alert">{error}</div>}
    <div className="work-actions">
      <button className="button button--primary" disabled={busy || !attested || !rendered || !/^[A-Z]{1,5}$/.test(initials)} onClick={() => void certifyAll()}>Certify all</button>
      <button className="button button--secondary" onClick={onCancel}>Cancel</button>
    </div>
  </section>;
}

function Records({ rows, onWithdraw }: { rows: SignoffRow[]; onWithdraw: (id: string) => Promise<void> }): React.ReactElement {
  if (rows.length === 0) return <p>No decisions recorded yet.</p>;
  return <div className={styles.tableWrap}><table className={styles.table}>
    <thead><tr><th>When</th><th>Unit</th><th>Decision</th><th>By</th><th>Status</th><th>PR / note</th><th /></tr></thead>
    <tbody>{rows.map((r) => <tr key={r.id}>
      <td>{r.decided_at.replace('T', ' ').slice(0, 16)}</td>
      <td>{r.course_code} Unit {r.unit_no}</td>
      <td>{r.decision}</td>
      <td>{r.reviewer_initials}</td>
      <td>{r.sync_status}</td>
      <td>{r.pr_url && <a href={r.pr_url} target="_blank" rel="noreferrer">PR</a>} {r.sync_note || r.note}</td>
      <td>{r.sync_status === 'queued' && <button className="button button--sm button--secondary" onClick={() => void onWithdraw(r.id)}>Withdraw</button>}</td>
    </tr>)}</tbody>
  </table></div>;
}

function Desk(): React.ReactElement {
  const [desk, setDesk] = useState<DeskFile | null>(null);
  const [ledger, setLedger] = useState<SignoffRow[]>([]);
  const [error, setError] = useState('');
  const [tab, setTab] = useState<'units' | 'records'>('units');
  const [course, setCourse] = useState('');
  const [stateFilter, setStateFilter] = useState<DeskState | ''>('awaiting');
  const [verdict, setVerdict] = useState('');
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [confirming, setConfirming] = useState(false);
  const [initials, setInitials] = useState('');
  useEffect(() => { setInitials(readInitials()); }, []);

  const loadLedger = useCallback(async () => {
    const db = await getSupabase(); if (!db) { setError('Supabase is not configured.'); return; }
    const { data, error: e } = await db.from('g3_signoffs').select('*').order('decided_at', { ascending: false });
    if (e) setError(e.message); else setLedger((data ?? []) as SignoffRow[]);
  }, []);
  useEffect(() => {
    fetch('/g3-desk.json').then((r) => (r.ok ? r.json() : null)).then((d: DeskFile | null) => {
      if (!d) setError('Could not read g3-desk.json. Is the site built?'); else setDesk(d);
    }).catch(() => setError('Could not read g3-desk.json.'));
    void loadLedger();
  }, [loadLedger]);

  const latest = useMemo(() => latestByUnit(ledger), [ledger]);
  const units = desk?.units ?? [];
  const states = useMemo(() => new Map(units.map((u) => [unitKey(u.course_code, u.unit_no), deskState(u, latest.get(unitKey(u.course_code, u.unit_no)))])), [units, latest]);
  const courses = useMemo(() => [...new Set(units.map((u) => u.course_code))].sort(), [units]);
  const shown = units.filter((u) => {
    const s = states.get(unitKey(u.course_code, u.unit_no))!;
    if (course && u.course_code !== course) return false;
    if (stateFilter && s !== stateFilter) return false;
    if (verdict && u.agent?.disposition !== verdict) return false;
    if (query && !`${u.course_code} unit ${u.unit_no} ${u.title ?? ''}`.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });
  const eligible = (u: DeskUnit): boolean => batchEligible(u, states.get(unitKey(u.course_code, u.unit_no))!);
  const selectedUnits = units.filter((u) => selected.has(unitKey(u.course_code, u.unit_no)) && eligible(u));
  const openUnit = units.find((u) => unitKey(u.course_code, u.unit_no) === open);

  async function refresh(): Promise<void> { setSelected(new Set()); await loadLedger(); }
  async function withdraw(id: string): Promise<void> {
    const db = await getSupabase(); if (!db) return;
    const { error: e } = await db.rpc('withdraw_g3_signoff', { p_id: id });
    if (e) setError(e.message); else await loadLedger();
  }
  function toggle(key: string): void {
    setSelected((v) => { const n = new Set(v); if (n.has(key)) n.delete(key); else n.add(key); return n; });
  }

  return <main className="container margin-vert--lg">
    <p><Link to="/app/admin/">Admin dashboard</Link></p>
    <h1>G3 sign-off desk</h1>
    <p>
      Every authored unit's English review position in one place. A decision you record here is an instruction:
      the crew writes the certification and tracker row into one pull request at its next run, and a unit is
      certified only when you merge that PR.
    </p>
    {desk && <p style={{ fontSize: '0.85rem' }}>Desk data from commit <code>{desk.commit?.slice(0, 8) ?? 'unknown'}</code>, built {desk.generated_at.replace('T', ' ').slice(0, 16)} UTC.</p>}
    {error && <div className="alert alert--danger" role="alert">{error}</div>}
    <label>Your reviewer initials{' '}
      <input className="input" style={{ width: '6rem' }} value={initials} maxLength={5}
        onChange={(e) => { const v = e.target.value.toUpperCase(); setInitials(v); saveInitials(v); }} />
    </label>
    {desk && <Overview units={units} states={states} />}

    <div className="work-actions" role="tablist" aria-label="View">
      <button role="tab" aria-selected={tab === 'units'} className={`button button--sm ${tab === 'units' ? 'button--primary' : 'button--secondary'}`} onClick={() => setTab('units')}>Units</button>
      <button role="tab" aria-selected={tab === 'records'} className={`button button--sm ${tab === 'records' ? 'button--primary' : 'button--secondary'}`} onClick={() => setTab('records')}>Records ({ledger.length})</button>
    </div>

    {tab === 'records' ? <Records rows={ledger} onWithdraw={withdraw} /> : <>
      {openUnit && desk?.commit && <UnitDrawer key={open!} unit={openUnit} state={states.get(open!)!} latest={latest.get(open!)}
        initials={initials} deskCommit={desk.commit} onClose={() => setOpen(null)} onRecorded={refresh} />}
      {confirming && desk?.commit && <BatchConfirm units={selectedUnits} initials={initials} deskCommit={desk.commit}
        onCancel={() => setConfirming(false)} onRecorded={refresh} />}

      <div className={styles.filters}>
        <label>Course<select className="input" value={course} onChange={(e) => setCourse(e.target.value)}>
          <option value="">All</option>{courses.map((c) => <option key={c}>{c}</option>)}</select></label>
        <label>State<select className="input" value={stateFilter} onChange={(e) => setStateFilter(e.target.value as DeskState | '')}>
          <option value="">All</option>{STATES.map((s) => <option key={s} value={s}>{STATE_LABEL[s]}</option>)}</select></label>
        <label>Agent verdict<select className="input" value={verdict} onChange={(e) => setVerdict(e.target.value)}>
          <option value="">All</option><option value="pass">pass</option><option value="revise">revise</option><option value="escalate">escalate</option></select></label>
        <label>Search<input className="input" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="course, unit or title" /></label>
        <button className="button button--sm button--secondary" onClick={() => setSelected(new Set(shown.filter(eligible).map((u) => unitKey(u.course_code, u.unit_no))))}>
          Select clean passes ({shown.filter(eligible).length})
        </button>
      </div>

      <p>{shown.length} of {units.length} units shown.</p>
      <div className={styles.tableWrap}><table className={styles.table} aria-label="Units">
        <thead><tr><th><span className="sr-only">Select</span></th><th>Unit</th><th>Agent</th><th>Criteria</th><th>Open findings</th><th>State</th><th /></tr></thead>
        <tbody>{shown.map((u) => {
          const key = unitKey(u.course_code, u.unit_no);
          const s = states.get(key)!;
          return <tr key={key}>
            <td>{eligible(u) && <input type="checkbox" aria-label={`Select ${u.course_code} Unit ${u.unit_no}`} checked={selected.has(key)} onChange={() => toggle(key)} />}</td>
            <td><strong>{u.course_code} Unit {u.unit_no}</strong>{u.title && <><br />{u.title}</>}</td>
            <td>{u.agent ? `${u.agent.disposition}${u.repaired ? ' (repaired)' : ''}` : '-'}</td>
            <td><Dots unit={u} /></td>
            <td>{openFindings(u)}</td>
            <td><Chip state={s} /></td>
            <td><button className="button button--sm button--secondary" onClick={() => { setOpen(key); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Open</button></td>
          </tr>;
        })}</tbody>
      </table></div>

      {selectedUnits.length > 0 && !confirming && <div className={styles.sticky}>
        <div className="work-actions">
          <button className="button button--primary" onClick={() => { setConfirming(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Certify selected ({selectedUnits.length})</button>
          <button className="button button--secondary" onClick={() => setSelected(new Set())}>Clear</button>
        </div>
      </div>}
    </>}
  </main>;
}

export default function AdminG3SignoffPage(): React.ReactElement {
  return <Layout title="G3 sign-off desk"><OwnerConsoleGuard><Desk /></OwnerConsoleGuard></Layout>;
}
