/**
 * The G3 sign-off desk's data rules (ADR-0032), pure so tests and both
 * consumers share them: `build-g3-desk.mjs` (what the admin page shows) and
 * `crew/signoff-sync.mjs` (what a ledger row becomes in Git).
 *
 * The "awaiting" rule is the crew planner's `awaitingG3`, imported rather than
 * restated, so the page's count is the board's count by construction.
 */
import { createHash } from 'node:crypto';
import { awaitingG3, pickLatestReport } from '../crew/planner.mjs';
import { CRITERIA, COMMANDS } from './review-criteria.mjs';

export { awaitingG3, pickLatestReport };

const EVIDENCE_CAP = 1500;
const clip = (text, cap = EVIDENCE_CAP) => (text.length > cap ? `${text.slice(0, cap - 1)}…` : text);

/**
 * One digest for a whole input manifest. Key order is fixed so the digest the
 * desk publishes and the one the sync recomputes on main agree byte for byte.
 */
export function manifestDigest(manifest) {
  const sorted = Object.keys(manifest).sort().map((k) => [k, manifest[k]]);
  return createHash('sha256').update(JSON.stringify(sorted)).digest('hex');
}

/** True when the tracker's latest G3 row says a `revise` was repaired (the planner's rule). */
export function g3Repaired(row) {
  return Boolean(row) && /repairs applied/i.test(`${row.status} ${row.reviewer} ${row.suggestion}`);
}

/** The parts of an agent G3 report the owner reads before deciding. */
export function summarizeReport(report, path) {
  if (!report) return null;
  const byId = new Map((report.criteria || []).map((c) => [c.id, c]));
  return {
    path,
    disposition: report.disposition,
    reviewer_id: report.reviewer_id ?? null,
    completed_at: report.completed_at ?? report.started_at ?? null,
    criteria: CRITERIA.G3.map((id) => {
      const c = byId.get(id);
      const evidence = Array.isArray(c?.evidence) ? c.evidence.join('\n') : String(c?.evidence ?? '');
      return { id, status: c?.status ?? 'unverified', evidence: clip(evidence) };
    }),
    findings: (report.findings || []).map((f) => ({
      severity: f.severity,
      resolved: Boolean(f.resolved),
      message: clip(String(f.message ?? '')),
    })),
    commands: COMMANDS.map((name) => {
      const c = (report.commands || []).find((x) => x.name === name);
      return { name, exit_code: c ? c.exit_code : null };
    }),
  };
}

/**
 * One desk row. `u` is the content-status unit; `rows` the unit's G3 tracker
 * rows in file order; `report` the latest parsed G3 report or null.
 */
export function deskUnit({ course, u, report, reportPath, rows, digest, dirty, index }) {
  const repaired = g3Repaired(rows.at(-1));
  const certified = u.gates?.G3 === 'done';
  // Same facts crew.mjs unitFacts passes, so a repaired revise with a cycle left stays in agent review.
  const awaiting = awaitingG3(u, { g3Report: report, g3Repaired: repaired, g3Cycles: report?.cycles ?? 0 });
  return {
    course_code: course,
    unit_no: u.unit_no,
    title: index?.title ?? null,
    permalink: index?.permalink ?? null,
    publication: u.publication ?? null,
    state: certified ? 'certified' : awaiting ? 'awaiting' : 'in_review',
    repaired,
    agent: summarizeReport(report, reportPath),
    tracker: rows.map((r) => ({ status: r.status, reviewer: r.reviewer, suggestion: clip(r.suggestion, 400) })),
    inputs_digest: digest,
    inputs_dirty: dirty,
  };
}

const DISPOSITION = { certify: 'pass', revise: 'revise', escalate: 'escalate' };

/**
 * The `buildCertification` input (src/lib/reviewQueue.ts) for a ledger row.
 * `manifest` is recomputed on main by the caller and must already match the
 * row's `inputs_digest`; `gateExit` maps each gate command to its exit code
 * from the sync's own run. `render-review` is the owner's attestation that
 * they inspected the rendered pages, which is what that command records for a
 * human reviewer.
 */
export function certificationInput(row, { manifest, gateExit, completedAt }) {
  const commands = COMMANDS.map((name) => ({
    name,
    exit_code: name === 'render-review' ? (row.rendered_inspected ? 0 : 1) : gateExit[name],
  }));
  const ledgerRef = `G3 sign-off desk, ledger row ${row.id}`;
  return {
    course_code: row.course_code,
    unit_no: row.unit_no,
    stage: 'G3',
    reviewer_id: row.reviewer_initials,
    input_manifest: manifest,
    commands,
    criteria: CRITERIA.G3.map((id) => {
      const c = row.criteria[id] || { status: 'unverified' };
      const evidence = [String(c.evidence || '').trim(), ledgerRef].filter(Boolean);
      return { id, status: c.status, evidence };
    }),
    findings: (row.findings || []).map((f) => ({ severity: f.severity, message: f.message, resolved: Boolean(f.resolved) })),
    disposition: DISPOSITION[row.decision],
    started_at: row.decided_at,
    completed_at: completedAt,
  };
}

/** A run id unique per ledger row: `<decided-at compact>-g3-desk-<id prefix>`. */
export function runIdFor(row) {
  const stamp = new Date(row.decided_at).toISOString().replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z');
  return `${stamp}-g3-desk-${String(row.id).slice(0, 8)}`;
}
