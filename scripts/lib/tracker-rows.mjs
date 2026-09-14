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
 * Deliberately coarser than `check-pipeline-gate.mjs`'s `stageDone`, which
 * additionally validates agent evidence. This answers "should this unit appear
 * in a reviewer's queue", which is a question about work remaining, not a gate.
 */
export function stageState(rows, unitLabel, stagePrefix) {
  const row = latestRow(rows, unitLabel, stagePrefix);
  if (!row) return 'open';
  return row.status === '✅' && row.reviewer ? 'done' : 'open';
}
