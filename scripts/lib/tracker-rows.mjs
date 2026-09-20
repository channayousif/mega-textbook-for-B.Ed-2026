/**
 * The per-course tracker table, parsed once.
 *
 * `specs/content/<course>/tasks.md` carries the pipeline's governance rows in
 * data-model.md's shape: `| Unit | Stage | Status | Reviewer | Suggestion |`.
 * `check-pipeline-gate.mjs` has always read it; Spec 017 T018 gave
 * `report-content-status.mjs` the same need, and a second parser would be a
 * second definition of what a "done" row looks like.
 *
 * A Revision Task (Spec 006 FR-011) appends a NEW row for the same unit and
 * stage rather than editing the original, so the LAST matching row is the
 * authoritative one. `latestRow` is where that rule lives, and every caller
 * must go through it rather than reaching for `.find()`.
 */
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * The tracker status meaning "agent-reviewed, published, final review pending"
 * (Constitution Art. VII.7). Held here beside the parser so the gate, the
 * status report and the tests all read one definition rather than three copies
 * of an emoji literal.
 */
export const PROVISIONAL = '🟡';

export function parseTasksTable(text) {
  const rows = [];
  for (const line of text.split(/\r?\n/)) {
    if (!line.trim().startsWith('|')) continue;
    const cells = line.split('|').slice(1, -1).map((c) => c.trim());
    if (cells.length < 4) continue;
    const [unit, stage, status, reviewer, suggestion] = cells;
    if (unit === 'Unit' || /^-+$/.test(unit)) continue; // header/separator rows
    rows.push({ unit, stage, status, reviewer: reviewer || '', suggestion: suggestion || '' });
  }
  return rows;
}

export function loadTracker(root, courseCode) {
  const file = join(root, 'specs', 'content', courseCode.toLowerCase(), 'tasks.md');
  if (!existsSync(file)) return null;
  return parseTasksTable(readFileSync(file, 'utf8'));
}

/**
 * The authoritative row for a unit and stage prefix: the last one, not the
 * first. An in-progress revision row must re-open a stage even though an
 * earlier done row for it still sits above.
 */
export function latestRow(rows, unitLabel, stagePrefix) {
  const matches = rows.filter((r) => r.unit === unitLabel && r.stage.startsWith(stagePrefix));
  return matches[matches.length - 1] ?? null;
}

/**
 * `'done'` only when the authoritative row is ticked AND carries reviewer
 * initials. Anything else - no row, an unticked row, a ticked row with an
 * empty Reviewer cell - is `'open'`, because an unattributed tick is not
 * evidence that anyone reviewed anything.
 *
 * `'provisional'` is the middle state: an agent review passed and the unit is
 * published under a "Final Review Pending" notice, but nothing is certified.
 * It is NOT done - Constitution Art. VII.6 forbids an agent review marking
 * G3/G5 done before qualification, and Art. VII.7 permits exactly this
 * published-but-uncertified state instead.
 *
 * Callers asking "is this finished" must test `=== 'done'`, never `!== 'open'`.
 * Callers asking "does this still need a human" must test `!== 'done'`, never
 * `=== 'open'` - a provisional unit is precisely the one most needing final
 * review, so reading it as anything but outstanding work drops it out of the
 * queue that exists to clear it.
 *
 * Deliberately coarser than `check-pipeline-gate.mjs`'s `stageDone`, which
 * additionally validates agent evidence. This answers "should this unit appear
 * in a reviewer's queue", which is a question about work remaining, not a gate.
 */
export function stageState(rows, unitLabel, stagePrefix) {
  const row = latestRow(rows, unitLabel, stagePrefix);
  if (!row) return 'open';
  if (row.status === PROVISIONAL && row.reviewer) return 'provisional';
  return row.status === '✅' && row.reviewer ? 'done' : 'open';
}

/**
 * The unit's PUBLICATION tier, derived from its stage states (Art. VII.7 as
 * amended by ADR-0026).
 *
 * Deliberately a separate function rather than a fourth `stageState` value.
 * `stageState`'s three values are load-bearing - `reviewQueue.ts` reads
 * `!== 'done'` and `check-pipeline-gate.mjs` reads `=== 'done'` - and adding a
 * value to its domain would silently reclassify every one of those callers.
 * Publication is a question about the unit, not about a stage, so it gets its
 * own function and leaves `stageState` alone.
 *
 *   'certified'   G3 passed a qualified review. Nothing to disclose.
 *   'provisional' an agent review passed, unsigned. "Final Review Pending".
 *   'gated'       the deterministic gates passed; NO reviewer has read it.
 *                 "Draft - expert review pending".
 *   'unpublished' not even that.
 *
 * The ordering matters: a unit that is both gate-checked and agent-reviewed
 * reports the stronger tier, because the banner should name the best claim
 * that is actually true.
 */
export function publicationState(rows, unitLabel) {
  const g3 = stageState(rows, unitLabel, 'G3');
  if (g3 === 'done') return 'certified';
  if (g3 === 'provisional') return 'provisional';
  return stageState(rows, unitLabel, 'G2') === 'done' ? 'gated' : 'unpublished';
}
