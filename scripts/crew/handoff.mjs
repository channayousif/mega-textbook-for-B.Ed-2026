/**
 * What one crew job passes to the next one on the same unit (ops/crew/README.md, "The loop").
 * Workers never talk to each other; the dispatcher carries two things in the brief:
 *   - the open findings of the latest G3 report, for a repair_en job;
 *   - CREW-HANDOFF notes that earlier jobs on the unit left, for every non-review job.
 * Review jobs never get handoff notes: a G3/G5 reviewer must not be primed by the producer
 * (ADR-0019; the same reason workers.mjs excludes the producer's family).
 * Pure functions only, so tests/crew/ can exercise them without running the dispatcher.
 */
import { relative } from 'node:path';

const MAX_FINDINGS = 15;
const MAX_FINDING_CHARS = 600;
const MAX_NOTES_PER_JOB = 3;
const MAX_NOTE_CHARS = 500;
const MAX_NOTES = 5;
const SEVERITY = ['blocking', 'major', 'minor', 'advisory'];

const clip = (s, n) => (s.length > n ? `${s.slice(0, n - 3)}...` : s);
const noEmDash = (s) => s.replace(/\u2014/g, ' - ');
const rank = (sev) => { const i = SEVERITY.indexOf(String(sev || '').toLowerCase()); return i < 0 ? SEVERITY.length : i; };

/** Markdown list of a review report's unresolved findings, most severe first; '' when none. */
export function reviewFindingsSection(report, { root = process.cwd(), max = MAX_FINDINGS } = {}) {
  const open = (report?.findings || []).filter((f) => f && f.resolved !== true && String(f.message || '').trim());
  if (!open.length) return '';
  const sorted = open.map((f, i) => ({ f, i })).sort((a, b) => rank(a.f.severity) - rank(b.f.severity) || a.i - b.i).map((x) => x.f);
  const shown = sorted.slice(0, max);
  const where = report.file ? `\`${relative(root, report.file)}\`` : 'the latest report';
  const lines = shown.map((f) => `- [${f.severity || 'unrated'}] ${noEmDash(clip(String(f.message).replace(/\s+/g, ' ').trim(), MAX_FINDING_CHARS))}`);
  if (sorted.length > shown.length) lines.push(`- ...and ${sorted.length - shown.length} more in the report.`);
  return `From ${where} (disposition: ${report.disposition || 'unknown'}). Resolve each one:\n${lines.join('\n')}`;
}

/** The CREW-HANDOFF lines a worker printed, capped; [] when it printed none. */
export function parseHandoff(logText) {
  return [...String(logText || '').matchAll(/CREW-HANDOFF:[ \t]*(.*)/g)]
    .map((m) => noEmDash(m[1].trim()))
    .filter((s) => s && !s.startsWith('<'))
    .slice(-MAX_NOTES_PER_JOB)
    .map((s) => clip(s, MAX_NOTE_CHARS));
}

/** Notes earlier jobs left on j's unit, newest first; '' for review stages or when there are none. */
export function priorHandoffsSection(jobs, j, { max = MAX_NOTES } = {}) {
  if (String(j.stage).startsWith('review_')) return '';
  const sameUnit = (x) => x.course === j.course && x.unit === j.unit;
  const notes = jobs
    .filter((x) => x.id !== j.id && x.handoff?.length && (x.id === j.parent || (sameUnit(x) && ['merged', 'pr_open'].includes(x.status))))
    .sort((a, b) => String(b.handoffAt || b.createdAt || '').localeCompare(String(a.handoffAt || a.createdAt || '')))
    .flatMap((x) => x.handoff.map((note) => `- (${x.id}, ${x.stage}, ${x.worker || 'unknown'}) ${note}`))
    .slice(0, max);
  return notes.join('\n');
}
