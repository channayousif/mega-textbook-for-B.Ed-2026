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
    && a.commands.every((c) => c.exit_code === 0);
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
