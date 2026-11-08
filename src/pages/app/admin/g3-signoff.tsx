import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import OwnerConsoleGuard from '@site/src/components/OwnerConsoleGuard';
import { getSupabase } from '@site/src/lib/supabase';
import { CERTIFICATION_CRITERIA } from '@site/src/lib/reviewQueue';
import {
  STATE_LABEL, latestByUnit, deskState, decidable, batchEligible, prefillCriteria,
  signoffProblem, signoffItem, summarize, unitKey,
  laneOf, suggestion, revisionNote, rulingQuestions, questionKey, applyRulings, laneInput,
  type DeskFile, type DeskUnit, type DeskState, type SignoffRow, type Decision,
  type DraftCriteria, type DeskFinding, type CriterionStatus, type Lane, type RulingQuestion, type RulingAnswer,
} from '@site/src/lib/g3Desk';
import styles from '@site/src/components/G3Desk.module.css';
import AppDashboardShell from '@site/src/components/AppDashboardShell';

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

const DECISION_LABEL: Record<Decision, string> = { certify: 'Certify', revise: 'Send back for repair', escalate: 'Escalate' };

function UnitDrawer({ unit, state, latest, initials, deskCommit, onClose, onRecorded }: DrawerProps): React.ReactElement {
  const suggested = useMemo(() => suggestion(unit, state), [unit, state]);
  const questions = useMemo(() => (suggested?.lane === 'ruling' ? rulingQuestions(unit) : []), [unit, suggested]);
  const [answers, setAnswers] = useState<Record<string, RulingAnswer>>({});
  const [decision, setDecision] = useState<Decision | ''>(suggested?.decision ?? '');
  const [criteria, setCriteria] = useState<DraftCriteria>(() => prefillCriteria(unit, G3));
  const [findings, setFindings] = useState<DeskFinding[]>(() => (unit.agent?.findings ?? []).map((f) => ({ ...f })));
  const [note, setNote] = useState(suggested?.note ?? '');
  const [attested, setAttested] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const canDecide = decidable(unit, state);
  const input = decision ? { decision, criteria, findings, note, initials, attested, renderedInspected: rendered } : null;
  const unanswered = questions.filter((q) => !answers[questionKey(q)]).length;
  const problem = !input ? (unanswered ? `Answer the ${unanswered} remaining question${unanswered === 1 ? '' : 's'} above.` : 'Choose a decision.') : signoffProblem(input);

  function answer(q: RulingQuestion, value: RulingAnswer): void {
    const next = { ...answers, [questionKey(q)]: value };
    setAnswers(next);
    const r = applyRulings(unit, next);
    if (!r) return;
    setDecision(r.decision); setNote(r.note);
    setCriteria(Object.fromEntries(G3.map((id) => [id, r.criteria[id] ?? { status: 'unverified', evidence: '' }])));
    setFindings(r.findings);
  }

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
  const advisory = findings.filter((f) => f.severity === 'advisory').length;
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

    {suggested && <div className={`${styles.suggest} ${styles[`lane-${suggested.lane}`]}`}>
      <strong>{suggested.decision ? `Suggested: ${DECISION_LABEL[suggested.decision]}` : 'Your ruling is needed'}</strong>
      <p>{suggested.reason}</p>
    </div>}

    {questions.length > 0 && canDecide && <div className={styles.questions}>
      <h3>Questions for you ({questions.length - unanswered} of {questions.length} answered)</h3>
      {questions.map((q) => {
        const key = questionKey(q);
        return <div key={key} className={`${styles.finding} ${q.kind === 'finding' ? styles[q.severity] ?? '' : ''}`}>
          <p><strong>{q.kind === 'finding' ? 'Open question from the agent' : `The agent could not verify "${q.id}"`}</strong></p>
          <div className={styles.pre}>{q.text}</div>
          <div className="work-actions" role="radiogroup" aria-label={`Answer for ${key}`}>
            <button className={`button button--sm ${answers[key] === 'accept' ? 'button--success' : 'button--secondary'}`} aria-pressed={answers[key] === 'accept'}
              onClick={() => answer(q, 'accept')}>{q.kind === 'finding' ? 'Accept as is' : 'I checked: it passes'}</button>
            <button className={`button button--sm ${answers[key] === 'fix' ? 'button--danger' : 'button--secondary'}`} aria-pressed={answers[key] === 'fix'}
              onClick={() => answer(q, 'fix')}>Needs a fix</button>
          </div>
        </div>;
      })}
    </div>}

    {canDecide && <div className="work-form">
      <h3>Your decision{decision ? `: ${DECISION_LABEL[decision]}` : ''}</h3>
      <label>Note {decision && decision !== 'certify' ? '(required; prefilled from the findings, edit freely)' : '(optional)'}
        <textarea className="input" rows={decision === 'revise' ? 5 : 2} value={note} onChange={(e) => setNote(e.target.value)} /></label>
      <label className="auth-tap-target"><input type="checkbox" checked={attested} onChange={(e) => setAttested(e.target.checked)} />{' '}
        {decision === 'certify' ? 'I reviewed this unit myself.' : 'I read the agent\'s findings for this unit and agree with this decision.'}</label>
      {decision === 'certify' && <label className="auth-tap-target"><input type="checkbox" checked={rendered} onChange={(e) => setRendered(e.target.checked)} /> I inspected the rendered pages (desktop, narrow and print).</label>}
      {error && <div className="alert alert--danger" role="alert">{error}</div>}
      {problem && <p role="status">{problem}</p>}
      <button className="button button--primary" disabled={busy || Boolean(problem)} onClick={() => void record()}>
        {decision ? `Record: ${DECISION_LABEL[decision]}` : 'Record decision'}</button>
    </div>}

    <details className={styles.details}>
      <summary>Details: change the decision, criteria or findings ({findings.length - advisory} open-severity, {advisory} advisory findings)</summary>
      {canDecide && <div className="work-actions" role="radiogroup" aria-label="Decision">
        {(['certify', 'revise', 'escalate'] as Decision[]).map((d) => <label key={d} className="auth-tap-target">
          <input type="radio" name="g3-decision" checked={decision === d} onChange={() => { setDecision(d); if (d === 'revise' && !note.trim()) setNote(revisionNote(unit)); }} /> {DECISION_LABEL[d]}
        </label>)}
      </div>}
      <h3>Agent review</h3>
      {a ? <p>Verdict <strong>{a.disposition}</strong>{a.reviewer_id ? ` by ${a.reviewer_id}` : ''}{a.completed_at ? `, ${a.completed_at.slice(0, 10)}` : ''}{unit.repaired ? '; repairs applied since' : ''}. Commands: {a.commands.map((c) => `${c.name} ${c.exit_code ?? '?'}`).join(', ')}.</p>
        : <p>No agent G3 report yet.</p>}
      <h3>Criteria</h3>
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
    </details>
  </section>;
}

/** One confirmation for a lane's bulk action: certify ready units, or send units back for repair. */
function BatchConfirm({ units, decision, initials, deskCommit, onCancel, onRecorded }: {
  units: DeskUnit[]; decision: 'certify' | 'revise'; initials: string; deskCommit: string; onCancel: () => void; onRecorded: () => Promise<void>;
}): React.ReactElement {
  const [attested, setAttested] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const certify = decision === 'certify';
  const initialsOk = /^[A-Z]{1,5}$/.test(initials);
  async function recordAll(): Promise<void> {
    const db = await getSupabase(); if (!db) return;
    setBusy(true); setError('');
    try {
      const items = units.map((u) => signoffItem(u, laneInput(u, decision, initials, attested, certify && rendered), deskCommit));
      const { error: e } = await db.rpc('record_g3_signoff', { p_items: items });
      if (e) throw new Error(e.message);
      await onRecorded();
      onCancel();
    } catch (e) { setError((e as Error).message); } finally { setBusy(false); }
  }
  const n = `${units.length} unit${units.length === 1 ? '' : 's'}`;
  return <section className="work-panel work-panel--accent" aria-labelledby="g3-batch-title">
    <h2 id="g3-batch-title">{certify ? `Certify ${n}` : `Send ${n} back for repair`}</h2>
    <p>{certify
      ? 'Each keeps the agent\'s passing criteria. Open each unit, read it and check its pages; then confirm below. The crew writes all of them into one PR, and merging that PR is your sign-off.'
      : 'Each goes back to the crew with a note listing its failed criteria and open findings. The crew repairs it and returns it to this desk.'}</p>
    <ul>{units.map((u) => <li key={unitKey(u.course_code, u.unit_no)}>
      {u.course_code} Unit {u.unit_no}{u.title ? `: ${u.title}` : ''}
      {certify && u.permalink && <> (<Link to={u.permalink} target="_blank">read</Link>)</>}
      {!certify && <div className={styles.pre}>{revisionNote(u)}</div>}
    </li>)}</ul>
    <label className="auth-tap-target"><input type="checkbox" checked={attested} onChange={(e) => setAttested(e.target.checked)} />{' '}
      {certify ? 'I reviewed each of these units myself.' : 'I read the agent\'s findings for each of these units and agree they need repair.'}</label>
    {certify && <label className="auth-tap-target"><input type="checkbox" checked={rendered} onChange={(e) => setRendered(e.target.checked)} /> I inspected each unit's rendered pages.</label>}
    {!initialsOk && <p role="status">Enter your reviewer initials above first.</p>}
    {error && <div className="alert alert--danger" role="alert">{error}</div>}
    <div className="work-actions">
      <button className="button button--primary" disabled={busy || !attested || (certify && !rendered) || !initialsOk} onClick={() => void recordAll()}>
        {certify ? `Certify ${n}` : `Send ${n} back`}</button>
      <button className="button button--secondary" onClick={onCancel}>Cancel</button>
    </div>
  </section>;
}

const LANES: { lane: Lane; title: string; advice: string }[] = [
  { lane: 'ready', title: 'Ready to certify', advice: 'The agent passed these cleanly. Read each one and check its pages, then certify a course at a time.' },
  { lane: 'ruling', title: 'Your ruling needed', advice: 'Nothing failed, but the agent left questions it could not settle. Open each unit and answer them; the desk then suggests the decision.' },
  { lane: 'send_back', title: 'Send back to the crew', advice: 'These have failed criteria or open blocking findings. They need repair, not judgement: send them back and they return here once fixed.' },
];

/** The default view: the owner's to-do list, one lane per kind of decision, each with its suggested action. */
function Lanes({ units, states, onOpen, onBatch }: {
  units: DeskUnit[]; states: Map<string, DeskState>;
  onOpen: (key: string) => void; onBatch: (units: DeskUnit[], decision: 'certify' | 'revise') => void;
}): React.ReactElement {
  const byLane = useMemo(() => {
    const m = new Map<Lane, DeskUnit[]>(LANES.map((l) => [l.lane, []]));
    for (const u of units) {
      const lane = laneOf(u, states.get(unitKey(u.course_code, u.unit_no))!);
      if (lane) m.get(lane)!.push(u);
    }
    return m;
  }, [units, states]);
  const total = [...byLane.values()].reduce((n, l) => n + l.length, 0);
  if (total === 0) return <p>Nothing is waiting for you. Units appear here when the agents finish reviewing them.</p>;
  return <>{LANES.map(({ lane, title, advice }) => {
    const list = byLane.get(lane)!;
    if (list.length === 0) return null;
    const courses = [...new Set(list.map((u) => u.course_code))].sort();
    const bulk: 'certify' | 'revise' | null = lane === 'ready' ? 'certify' : lane === 'send_back' ? 'revise' : null;
    return <section key={lane} className={`${styles.lane} ${styles[`lane-${lane}`]}`} aria-labelledby={`lane-${lane}`}>
      <div className={styles.laneHead}>
        <h2 id={`lane-${lane}`}>{title} <span className={styles.count}>{list.length}</span></h2>
        {bulk && <button className="button button--primary button--sm" onClick={() => onBatch(list, bulk)}>
          {bulk === 'certify' ? `Certify all ${list.length}` : `Send all ${list.length} back`}</button>}
      </div>
      <p>{advice}</p>
      {bulk && courses.length > 1 && <div className="work-actions">
        {courses.map((c) => {
          const of = list.filter((u) => u.course_code === c);
          return <button key={c} className="button button--sm button--secondary" onClick={() => onBatch(of, bulk)}>{bulk === 'certify' ? 'Certify' : 'Send back'} {c} ({of.length})</button>;
        })}
      </div>}
      <ul className={styles.laneList}>{list.map((u) => {
        const key = unitKey(u.course_code, u.unit_no);
        const s = states.get(key)!;
        const sug = suggestion(u, s)!;
        return <li key={key} className={styles.laneRow}>
          <div>
            <strong>{u.course_code} Unit {u.unit_no}</strong>{u.title && <> : {u.title}</>}{' '}
            {s !== 'awaiting' && <Chip state={s} />}
            <div className={styles.reason}>{sug.reason}</div>
          </div>
          <div className="work-actions">
            {u.permalink && <Link className="button button--sm button--link" to={u.permalink} target="_blank">Read</Link>}
            {bulk && <button className="button button--sm button--secondary" onClick={() => onBatch([u], bulk)}>{bulk === 'certify' ? 'Certify' : 'Send back'}</button>}
            <button className={`button button--sm ${bulk ? 'button--link' : 'button--primary'}`} onClick={() => onOpen(key)}>{bulk ? 'Details' : 'Answer'}</button>
          </div>
        </li>;
      })}</ul>
    </section>;
  })}</>;
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
  const [tab, setTab] = useState<'todo' | 'units' | 'records'>('todo');
  const [course, setCourse] = useState('');
  const [stateFilter, setStateFilter] = useState<DeskState | ''>('awaiting');
  const [verdict, setVerdict] = useState('');
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [batch, setBatch] = useState<{ units: DeskUnit[]; decision: 'certify' | 'revise' } | null>(null);
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

  return <div className="app-page-body">
    <p><Link to="/app/admin/">Admin dashboard</Link></p>
    <h1>G3 sign-off desk</h1>
    <p>
      Your English (G3) review decisions, sorted into what to do: certify the clean passes, answer the open
      questions, and send the rest back for repair. A decision you record here is an instruction: the crew writes
      it into one pull request at its next run, and a unit is certified only when you merge that PR.
    </p>
    {desk && <p style={{ fontSize: '0.85rem' }}>Desk data from commit <code>{desk.commit?.slice(0, 8) ?? 'unknown'}</code>, built {desk.generated_at.replace('T', ' ').slice(0, 16)} UTC.</p>}
    {error && <div className="alert alert--danger" role="alert">{error}</div>}
    <label>Your reviewer initials{' '}
      <input className="input" style={{ width: '6rem' }} value={initials} maxLength={5}
        onChange={(e) => { const v = e.target.value.toUpperCase(); setInitials(v); saveInitials(v); }} />
    </label>
    {desk && <Overview units={units} states={states} />}

    <div className="work-actions" role="tablist" aria-label="View">
      <button role="tab" aria-selected={tab === 'todo'} className={`button button--sm ${tab === 'todo' ? 'button--primary' : 'button--secondary'}`} onClick={() => setTab('todo')}>To do</button>
      <button role="tab" aria-selected={tab === 'units'} className={`button button--sm ${tab === 'units' ? 'button--primary' : 'button--secondary'}`} onClick={() => setTab('units')}>All units (advanced)</button>
      <button role="tab" aria-selected={tab === 'records'} className={`button button--sm ${tab === 'records' ? 'button--primary' : 'button--secondary'}`} onClick={() => setTab('records')}>Records ({ledger.length})</button>
    </div>

    {tab !== 'records' && openUnit && desk?.commit && <UnitDrawer key={open!} unit={openUnit} state={states.get(open!)!} latest={latest.get(open!)}
      initials={initials} deskCommit={desk.commit} onClose={() => setOpen(null)} onRecorded={refresh} />}
    {tab !== 'records' && batch && desk?.commit && <BatchConfirm key={batch.units.map((u) => unitKey(u.course_code, u.unit_no)).join(',')}
      units={batch.units} decision={batch.decision} initials={initials} deskCommit={desk.commit}
      onCancel={() => setBatch(null)} onRecorded={refresh} />}
    {tab === 'records' ? <Records rows={ledger} onWithdraw={withdraw} /> : tab === 'todo' ? (desk && <Lanes units={units} states={states}
      onOpen={(key) => { setBatch(null); setOpen(key); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
      onBatch={(list, decision) => { setOpen(null); setBatch({ units: list, decision }); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />) : <>

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

      {selectedUnits.length > 0 && !batch && <div className={styles.sticky}>
        <div className="work-actions">
          <button className="button button--primary" onClick={() => { setBatch({ units: selectedUnits, decision: 'certify' }); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Certify selected ({selectedUnits.length})</button>
          <button className="button button--secondary" onClick={() => setSelected(new Set())}>Clear</button>
        </div>
      </div>}
    </>}
  </div>;
}

export default function AdminG3SignoffPage(): React.ReactElement {
  return <Layout title="G3 sign-off desk">
      <AppDashboardShell><OwnerConsoleGuard><Desk /></OwnerConsoleGuard></AppDashboardShell>
    </Layout>;
}
