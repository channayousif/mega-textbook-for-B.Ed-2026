/**
 * Generic MDX/Markdown section- and table-parsing helpers, shared by
 * `check-unit-depth.mjs`, `scripts/lib/unit-depth.mjs`, `build-content-index.mjs`
 * (self_assessment_count, research.md R5), and `report-content-status.mjs`
 * (Spec 010).
 *
 * Extracted verbatim (behavior-preserving) from `check-unit-depth.mjs`, which
 * previously kept these private. No consumer may re-implement any of these —
 * that is exactly the drift Spec 010's research.md R9/FR-033 forbids.
 */
import { readFileSync, existsSync } from 'node:fs';

/** Parses a GFM pipe table's data rows (drops the header row and the separator row). */
export function parsePipeTable(lines) {
  const rows = [];
  for (const line of lines) {
    if (!line.trim().startsWith('|')) continue;
    const cells = line.split('|').slice(1, -1).map((c) => c.trim());
    if (cells.length < 2) continue;
    if (cells.every((c) => /^:?-{2,}:?$/.test(c) || c === '')) continue; // separator row
    rows.push(cells);
  }
  return rows;
}

/** The block of `|`-lines immediately following a heading line matching `headingRe` within `lines`. */
export function tableAfterHeading(lines, headingRe) {
  const start = lines.findIndex((l) => headingRe.test(l));
  if (start === -1) return null;
  const block = [];
  for (let i = start + 1; i < lines.length; i++) {
    const t = lines[i].trim();
    if (t === '') {
      if (block.length) continue; // allow a blank line between heading and table
      else continue;
    }
    if (t.startsWith('|')) block.push(lines[i]);
    else if (block.length) break; // table ended
    else if (/^#{1,6}\s/.test(t)) break; // next heading before any table
  }
  return block.length ? block : null;
}

/** Reads and parses a pipe-table file, or `null` if it doesn't exist. */
export function readTable(file) {
  if (!existsSync(file)) return null;
  return parsePipeTable(readFileSync(file, 'utf8').split(/\r?\n/));
}

/** Numbered top-level items (`1.`, `2.`, …) between `headingRe` and the next `##`/`###`. */
export function countNumberedInSection(lines, headingRe) {
  const start = lines.findIndex((l) => headingRe.test(l.trimEnd()));
  if (start === -1) return null;
  let n = 0;
  for (let i = start + 1; i < lines.length; i++) {
    if (/^#{2,3}\s/.test(lines[i])) break;
    if (/^\s*\d+\.\s+\S/.test(lines[i])) n++;
  }
  return n;
}

/** `- [ ]` task-list items between `headingRe` and the next `##`/`###`. */
export function countChecklistInSection(lines, headingRe) {
  const start = lines.findIndex((l) => headingRe.test(l.trimEnd()));
  if (start === -1) return null;
  let n = 0;
  for (let i = start + 1; i < lines.length; i++) {
    if (/^#{2,3}\s/.test(lines[i])) break;
    if (/^\s*-\s+\[ \]\s+\S/.test(lines[i])) n++;
  }
  return n;
}

/** Non-blank content lines between `headingRe` and the next `##`/`###`. */
export function countContentLinesInSection(lines, headingRe) {
  const start = lines.findIndex((l) => headingRe.test(l.trimEnd()));
  if (start === -1) return null;
  let n = 0;
  for (let i = start + 1; i < lines.length; i++) {
    if (/^#{2,3}\s/.test(lines[i])) break;
    if (lines[i].trim() !== '') n++;
  }
  return n;
}
