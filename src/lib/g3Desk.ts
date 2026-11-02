/**
 * The G3 sign-off desk (ADR-0032): joins `static/g3-desk.json` (what Git says)
 * with `g3_signoffs` ledger rows (what the owner has decided) into one state
 * per unit, and builds the items `record_g3_signoff` takes.
 *
 * Pure and free of `@site/...` value imports, like `reviewQueue.ts`, so vitest
 * can import it directly. Git outranks the ledger everywhere: a unit the
 * content status calls certified is certified whatever the ledger holds.
 */

export type CriterionStatus = 'pass' | 'fail' | 'unverified';
export type FindingSeverity = 'blocking' | 'uncertain' | 'advisory';
export type Decision = 'certify' | 'revise' | 'escalate';

export type DeskCriterion = { id: string; status: CriterionStatus; evidence: string };
export type DeskFinding = { severity: FindingSeverity; resolved: boolean; message: string };

export type DeskUnit = {
  course_code: string;
  unit_no: number;
  title: string | null;
  permalink: string | null;
  publication: string | null;
  state: 'certified' | 'awaiting' | 'in_review';
  repaired: boolean;
  agent: null | {
    path: string;
    disposition: 'pass' | 'revise' | 'escalate';
    reviewer_id: string | null;
    completed_at: string | null;
    criteria: DeskCriterion[];
    findings: DeskFinding[];
    commands: { name: string; exit_code: number | null }[];
  };
  tracker: { status: string; reviewer: string; suggestion: string }[];
  inputs_digest: string | null;
  inputs_dirty: boolean;
};

export type DeskFile = { generated_at: string; commit: string | null; units: DeskUnit[] };

export type SignoffRow = {
  id: string;
  course_code: string;
  unit_no: number;
  decision: Decision;
  criteria: Record<string, { status: CriterionStatus; evidence?: string }>;
  findings: { severity: FindingSeverity; message: string; resolved: boolean }[];
  note: string | null;
  reviewer_initials: string;
  inputs_digest: string;
  desk_commit: string;
  agent_report: string | null;
  decided_by: string | null;
  decided_at: string;
  sync_status: 'queued' | 'synced' | 'stale' | 'failed' | 'withdrawn';
  sync_note: string | null;
  pr_url: string | null;
  synced_at: string | null;
};

/**
 * What the owner sees for a unit:
 *  - certified   Git has the ✅ row (content status says G3 done)
 *  - queued      a decision waits for the next crew tick
 *  - pr_open     the crew opened the sign-off PR; merge it to certify
 *  - changed     a queued decision was made on inputs that have since changed
 *  - stale       the crew refused it because the inputs changed
 *  - failed      the crew's gate run failed; see the note
 *  - awaiting    agent review finished, nothing decided yet
 *  - in_review   still with the agents (no report, or an unrepaired revise)
 */
export type DeskState = 'certified' | 'queued' | 'pr_open' | 'changed' | 'stale' | 'failed' | 'awaiting' | 'in_review';

export const STATE_LABEL: Record<DeskState, string> = {
  certified: 'Certified',
  queued: 'Queued for crew',
  pr_open: 'PR open',
  changed: 'Inputs changed',
  stale: 'Stale, decide again',
  failed: 'Sync failed',
  awaiting: 'Awaiting you',
  in_review: 'In agent review',
};

export const unitKey = (course: string, unit: number): string => `${course}#${unit}`;

/** The latest live ledger row per unit (withdrawn rows never count). */
export function latestByUnit(rows: SignoffRow[]): Map<string, SignoffRow> {
  const out = new Map<string, SignoffRow>();
  for (const r of rows) {
    if (r.sync_status === 'withdrawn') continue;
    const key = unitKey(r.course_code, r.unit_no);
    const prev = out.get(key);
    if (!prev || prev.decided_at < r.decided_at) out.set(key, r);
  }
  return out;
}

export function deskState(unit: DeskUnit, latest: SignoffRow | undefined): DeskState {
  if (unit.state === 'certified') return 'certified';
  if (latest) {
    if (latest.sync_status === 'queued') return latest.inputs_digest === unit.inputs_digest ? 'queued' : 'changed';
    if (latest.sync_status === 'stale') return 'stale';
    if (latest.sync_status === 'failed') return 'failed';
    // A synced certify waits for its PR to merge. A synced revise/escalate went back
    // to the pipeline, so the unit shows whatever Git now says about it.
    if (latest.sync_status === 'synced' && latest.decision === 'certify' && latest.inputs_digest === unit.inputs_digest) return 'pr_open';
  }
  return unit.state;
}

/** Units the owner may decide now: not certified, not waiting on the crew or a PR. */
export function decidable(unit: DeskUnit, state: DeskState): boolean {
  return Boolean(unit.inputs_digest) && !unit.inputs_dirty
    && ['awaiting', 'in_review', 'changed', 'stale', 'failed'].includes(state);
}

/**
 * Batch "Certify selected" takes only the cleanest case: the agent passed it,
 * every criterion and command passed, nothing blocking is open, and the inputs
 * are the committed ones. Anything else needs the unit drawer.
 */
export function batchEligible(unit: DeskUnit, state: DeskState): boolean {
  const a = unit.agent;
  if (!a || !decidable(unit, state) || unit.state !== 'awaiting') return false;
  return a.disposition === 'pass'
    && a.criteria.every((c) => c.status === 'pass')
    && a.findings.every((f) => f.severity === 'advisory' || f.resolved)
    && a.commands.every((c) => c.name === RENDER_REVIEW || c.exit_code === 0);
}

/**
 * `render-review` is the one command an agent cannot really run: it records that a
 * person looked at the rendered pages. `certificationInput` (scripts/lib/g3-desk.mjs)
 * replaces the agent's exit code with the owner's own `rendered_inspected`
 * attestation, so an agent's missing or failed render-review is not a defect in the
 * unit. It is the part of the check the owner does.
 */
export const RENDER_REVIEW = 'render-review';

/**
 * Where a unit sits on the desk's to-do view, or null when it is not the owner's to
 * decide right now (certified, waiting on the crew or a PR, or still in agent review).
 *
 *  - ready      the agent passed it cleanly; certify after reading it
 *  - send_back  something failed or a blocking finding is open; it needs repair, not judgement
 *  - ruling     nothing failed, but open questions need the owner's judgement
 */
export type Lane = 'ready' | 'send_back' | 'ruling';

const openFindings = (unit: DeskUnit): { finding: DeskFinding; index: number }[] =>
  (unit.agent?.findings ?? []).map((finding, index) => ({ finding, index }))
    .filter(({ finding }) => finding.severity !== 'advisory' && !finding.resolved);

const failedGates = (unit: DeskUnit): string[] =>
  (unit.agent?.commands ?? []).filter((c) => c.name !== RENDER_REVIEW && c.exit_code !== 0).map((c) => c.name);

export function laneOf(unit: DeskUnit, state: DeskState): Lane | null {
  const a = unit.agent;
  if (!a || !decidable(unit, state) || state === 'in_review') return null;
  if (batchEligible(unit, state)) return 'ready';
  if (a.disposition === 'revise' || a.criteria.some((c) => c.status === 'fail')
    || openFindings(unit).some(({ finding }) => finding.severity === 'blocking')
    || failedGates(unit).length > 0) return 'send_back';
  return 'ruling';
}

const NOTE_CAP = 1000;
const ITEM_CAP = 160;
const oneLine = (text: string, cap = ITEM_CAP): string => {
  const flat = text.replace(/\s+/g, ' ').trim();
  return flat.length > cap ? `${flat.slice(0, cap - 1)}…` : flat;
};

/**
 * The revise note the desk writes for the owner: what failed and every open blocking or
 * uncertain finding, one line each. The crew's repair job reads the full findings from
 * the agent report; this note is the owner's instruction and the tracker's summary.
 */
export function revisionNote(unit: DeskUnit, onlyFindings?: number[]): string {
  const a = unit.agent;
  const parts: string[] = [];
  const failed = (a?.criteria ?? []).filter((c) => c.status === 'fail').map((c) => c.id);
  if (failed.length) parts.push(`Failed criteria: ${failed.join(', ')}.`);
  const gates = failedGates(unit);
  if (gates.length) parts.push(`Failing gates: ${gates.join(', ')}.`);
  const open = openFindings(unit).filter(({ index }) => !onlyFindings || onlyFindings.includes(index));
  open.forEach(({ finding }, i) => parts.push(`${i + 1}) [${finding.severity}] ${oneLine(finding.message)}`));
  const body = parts.join(' ') || 'Repair the open findings in the latest agent G3 report.';
  const note = `Sent back from the G3 desk for repair. ${body}`;
  return note.length > NOTE_CAP ? `${note.slice(0, NOTE_CAP - 1)}…` : note;
}

/** One thing the owner must judge before a `ruling` unit can be decided. */
export type RulingQuestion =
  | { kind: 'finding'; index: number; severity: FindingSeverity; text: string }
  | { kind: 'criterion'; id: string; text: string };

/**
 * The questions a unit puts to the owner: each open uncertain finding, and each criterion
 * the agent left `unverified`. (A unit with a failed criterion or blocking finding is in
 * `send_back`, so it never reaches here.)
 */
export function rulingQuestions(unit: DeskUnit): RulingQuestion[] {
  const a = unit.agent;
  if (!a) return [];
  const qs: RulingQuestion[] = openFindings(unit).map(({ finding, index }) => ({
    kind: 'finding', index, severity: finding.severity, text: finding.message,
  }));
  for (const c of a.criteria) {
    if (c.status === 'unverified') qs.push({ kind: 'criterion', id: c.id, text: c.evidence || `The agent could not verify ${c.id}.` });
  }
  return qs;
}

export const questionKey = (q: RulingQuestion): string => (q.kind === 'finding' ? `f${q.index}` : `c:${q.id}`);
export type RulingAnswer = 'accept' | 'fix';

export const OWNER_CHECKED = 'Owner checked this on the G3 desk and accepts it.';

/**
 * Turn the owner's answers into a decision. Any `fix` makes it a revise whose note lists
 * only what the owner wants fixed; all `accept` makes it a certify with the accepted
 * findings resolved and the unverified criteria passed on the owner's evidence. Null
 * while a question is unanswered.
 */
export function applyRulings(unit: DeskUnit, answers: Record<string, RulingAnswer>):
  Pick<SignoffInput, 'decision' | 'criteria' | 'findings' | 'note'> | null {
  const qs = rulingQuestions(unit);
  if (qs.some((q) => !answers[questionKey(q)])) return null;
  const fix = qs.filter((q) => answers[questionKey(q)] === 'fix');
  const criteria = prefillCriteria(unit, (unit.agent?.criteria ?? []).map((c) => c.id));
  const findings = (unit.agent?.findings ?? []).map((f) => ({ ...f }));
  if (fix.length === 0) {
    for (const q of qs) {
      if (q.kind === 'finding') findings[q.index].resolved = true;
      else criteria[q.id] = { status: 'pass', evidence: OWNER_CHECKED };
    }
    return { decision: 'certify', criteria, findings, note: '' };
  }
  const fixFindings = fix.flatMap((q) => (q.kind === 'finding' ? [q.index] : []));
  const fixCriteria = fix.flatMap((q) => (q.kind === 'criterion' ? [q.id] : []));
  let note = revisionNote(unit, fixFindings);
  if (fixCriteria.length) note = `${note} Check and evidence: ${fixCriteria.join(', ')}.`.slice(0, NOTE_CAP);
  return { decision: 'revise', criteria, findings, note };
}

/** What the desk suggests for a unit, in plain words. */
export type Suggestion = { lane: Lane; decision: Decision | null; reason: string; note: string };

export function suggestion(unit: DeskUnit, state: DeskState): Suggestion | null {
  const lane = laneOf(unit, state);
  if (!lane) return null;
  const a = unit.agent!;
  if (lane === 'ready') {
    return { lane, decision: 'certify', note: '', reason: `The agent passed all ${a.criteria.length} criteria and every gate, with no open findings. Read the unit, then certify.` };
  }
  if (lane === 'send_back') {
    const failed = a.criteria.filter((c) => c.status === 'fail').length;
    const blocking = openFindings(unit).filter(({ finding }) => finding.severity === 'blocking').length;
    const gates = failedGates(unit).length;
    const bits = [
      failed && `${failed} criteri${failed === 1 ? 'on' : 'a'} failed`,
      blocking && `${blocking} blocking finding${blocking === 1 ? '' : 's'} open`,
      gates && `${gates} gate${gates === 1 ? '' : 's'} failing`,
      a.disposition === 'revise' && !failed && !blocking && !gates && 'the agent asked for a revision',
    ].filter(Boolean);
    return { lane, decision: 'revise', note: revisionNote(unit), reason: `${bits.join(', ')}. This needs repair, not a judgement call: send it back to the crew.` };
  }
  const n = rulingQuestions(unit).length;
  return { lane, decision: null, note: '', reason: `Nothing failed, but ${n} question${n === 1 ? '' : 's'} need${n === 1 ? 's' : ''} your judgement. Answer each one; the desk then suggests certify or revise.` };
}

/** A complete `SignoffInput` for a one-click lane action (certify a ready unit, send one back). */
export function laneInput(unit: DeskUnit, decision: 'certify' | 'revise', initials: string,
  attested: boolean, renderedInspected: boolean): SignoffInput {
  return {
    decision,
    criteria: prefillCriteria(unit, (unit.agent?.criteria ?? []).map((c) => c.id)),
    findings: unit.agent?.findings ?? [],
    note: decision === 'revise' ? revisionNote(unit) : '',
    initials, attested, renderedInspected,
  };
}

export type DraftCriteria = Record<string, { status: CriterionStatus; evidence: string }>;

/** The drawer starts from the agent's verdicts, which the owner then confirms or changes. */
export function prefillCriteria(unit: DeskUnit, ids: readonly string[]): DraftCriteria {
  const byId = new Map((unit.agent?.criteria ?? []).map((c) => [c.id, c]));
  return Object.fromEntries(ids.map((id) => [id, { status: byId.get(id)?.status ?? 'unverified', evidence: '' }]));
}

export type SignoffInput = {
  decision: Decision;
  criteria: DraftCriteria;
  findings: DeskFinding[];
  note: string;
  initials: string;
  attested: boolean;
  renderedInspected: boolean;
};

/** Why a decision cannot be recorded, or null. Mirrors the 0050 trigger so errors show before the round trip. */
export function signoffProblem(input: SignoffInput): string | null {
  if (!/^[A-Z]{1,5}$/.test(input.initials)) return 'Reviewer initials must be 1 to 5 capital letters.';
  if (!input.attested) return 'Confirm that you reviewed the unit yourself.';
  if (input.decision === 'certify') {
    const failed = Object.entries(input.criteria).find(([, c]) => c.status !== 'pass');
    if (failed) return `Certify needs every criterion to pass; ${failed[0]} is ${failed[1].status}.`;
    if (input.findings.some((f) => f.severity !== 'advisory' && !f.resolved)) {
      return 'Certify needs every blocking or uncertain finding resolved.';
    }
    if (!input.renderedInspected) return 'Certify needs you to have inspected the rendered pages.';
  } else if (input.note.trim().length < 5) {
    return 'Revise and escalate need a note of at least 5 characters.';
  }
  return null;
}

/** One `record_g3_signoff` item. Throws on a problem `signoffProblem` would report. */
export function signoffItem(unit: DeskUnit, input: SignoffInput, deskCommit: string): Record<string, unknown> {
  const problem = signoffProblem(input);
  if (problem) throw new Error(`${unit.course_code} Unit ${unit.unit_no}: ${problem}`);
  if (!unit.inputs_digest) throw new Error(`${unit.course_code} Unit ${unit.unit_no}: its review inputs could not be bound`);
  return {
    course_code: unit.course_code,
    unit_no: unit.unit_no,
    decision: input.decision,
    criteria: input.criteria,
    findings: input.findings,
    note: input.note.trim(),
    reviewer_initials: input.initials,
    attested: input.attested,
    rendered_inspected: input.renderedInspected,
    inputs_digest: unit.inputs_digest,
    desk_commit: deskCommit,
    agent_report: unit.agent?.path ?? null,
  };
}

export type DeskSummary = {
  total: number;
  byState: Record<DeskState, number>;
  byCourse: { course: string; total: number; certified: number; awaiting: number }[];
  byDisposition: Record<string, number>;
};

export function summarize(units: DeskUnit[], states: Map<string, DeskState>): DeskSummary {
  const byState = Object.fromEntries(Object.keys(STATE_LABEL).map((s) => [s, 0])) as Record<DeskState, number>;
  const courses = new Map<string, { course: string; total: number; certified: number; awaiting: number }>();
  const byDisposition: Record<string, number> = {};
  for (const u of units) {
    const s = states.get(unitKey(u.course_code, u.unit_no)) ?? u.state;
    byState[s] += 1;
    const c = courses.get(u.course_code) ?? { course: u.course_code, total: 0, certified: 0, awaiting: 0 };
    c.total += 1;
    if (s === 'certified') c.certified += 1;
    if (s === 'awaiting') c.awaiting += 1;
    courses.set(u.course_code, c);
    if (u.state === 'awaiting' && u.agent) byDisposition[u.agent.disposition] = (byDisposition[u.agent.disposition] ?? 0) + 1;
  }
  return { total: units.length, byState, byCourse: [...courses.values()].sort((a, b) => a.course.localeCompare(b.course)), byDisposition };
}
