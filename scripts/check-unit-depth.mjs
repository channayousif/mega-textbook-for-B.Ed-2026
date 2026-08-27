#!/usr/bin/env node
/**
 * Content depth gate for the authoring pipeline (Spec 007, tasks.md T028).
 *
 * Runs for every non-`coming_soon` EN unit under docs/ **whose course content-spec `## Unit N`
 * subsection carries a `### Sub-topic checklist` table** — a unit without that table is out of
 * scope and skipped (this grandfathers EFMP-301 and any not-yet-migrated unit; Spec 007
 * research.md R4). For an in-scope unit the gate fails unless (FR-012):
 *   (a) specs/content/<course>/coverage/unit-NN.md exists and every checklist ID has a row with
 *       a non-blank File (one of the five folding-rule files) / Section / Source;
 *   (b) the EN index.mdx has BOTH `## Common misconceptions` AND `## Further reading` headings;
 *   (c) formative.mdx has >= 5 top-level numbered list items;
 *   (d) the sum of the five EN files' `est_reading_minutes` is within the `**Depth budget**`
 *       `A–B reading-min` band recorded in the content-spec subsection;
 *   (e) the coverage matrix and specs/content/<course>/sources/unit-NN.md are mutually
 *       consistent — every cited Source is a Key in the sources list, and every non
 *       `no-external-source` Key is used by the coverage matrix.
 * Every failure pushes a per-unit message naming the unmet condition (SC-004).
 *
 * Additive to Spec 001's validate-content.mjs and Spec 006's check-pipeline-gate.mjs — this
 * script modifies neither. Pure Node + gray-matter, no new dependency. CONTENT_ROOT lets
 * fixture tests point it at a temp dir (same convention as check-pipeline-gate.mjs).
 */
import { readdirSync, statSync, readFileSync, existsSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const REPO = resolve(fileURLToPath(new URL('..', import.meta.url)));
const ROOT = process.env.CONTENT_ROOT ? resolve(process.env.CONTENT_ROOT) : REPO;
const DOCS_DIR = join(ROOT, 'docs');
const CONTENT_SPEC_DIR = join(ROOT, 'specs', 'content');

const UNIT_FILES = ['index.mdx', 'activities.mdx', 'formative.mdx', 'summative.mdx', 'teacher-notes.mdx'];
const FOLDING_FILES = new Set(UNIT_FILES);

const errors = [];
const err = (label, msg) => errors.push(`${label}: ${msg}`);

const dirs = (p) =>
  existsSync(p) ? readdirSync(p).filter((n) => statSync(join(p, n)).isDirectory()) : [];

// ---- pipe-table parser (same shape as check-pipeline-gate.mjs's parseTasksTable) ----
function parsePipeTable(lines) {
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
function tableAfterHeading(lines, headingRe) {
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

/** Lines of the `## Unit <n>` section (until the next `## ` heading, `###` kept). */
function unitSectionLines(specText, unitNo) {
  const lines = specText.split(/\r?\n/);
  const start = lines.findIndex((l) => new RegExp(`^##\\s+Unit\\s+${unitNo}\\b`).test(l));
  if (start === -1) return null;
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    if (/^##\s+/.test(lines[i]) && !/^###/.test(lines[i])) { end = i; break; }
  }
  return lines.slice(start, end);
}

function loadContentSpec(courseCode) {
  const file = join(CONTENT_SPEC_DIR, courseCode.toLowerCase(), 'content-spec.md');
  if (!existsSync(file)) return null;
  return readFileSync(file, 'utf8');
}

function readTable(file) {
  if (!existsSync(file)) return null;
  return parsePipeTable(readFileSync(file, 'utf8').split(/\r?\n/));
}

// ---- per-unit check ----------------------------------------------------------
function checkUnit({ unitDir, courseCode, unitNo }) {
  const enIndex = join(unitDir, 'index.mdx');
  if (!existsSync(enIndex)) return;
  const enIndexRaw = readFileSync(enIndex, 'utf8');
  const enFm = matter(enIndexRaw).data;
  if (enFm.coming_soon === true) return;

  const specText = loadContentSpec(courseCode);
  if (!specText) return; // no content-spec → not migrated → out of scope

  const sectionLines = unitSectionLines(specText, unitNo);
  if (!sectionLines) return; // no `## Unit N` subsection → out of scope

  const checklistBlock = tableAfterHeading(sectionLines, /^###\s+Sub-topic checklist\b/i);
  if (!checklistBlock) return; // no checklist table → out of scope (grandfathered, R4)

  const label = `${courseCode} Unit ${unitNo} (${relative(ROOT, unitDir)})`;
  const courseDir = join(CONTENT_SPEC_DIR, courseCode.toLowerCase());

  // --- parse the checklist -> set of IDs ---
  const checklistRows = parsePipeTable(checklistBlock).filter(
    (r) => !/^id$/i.test(r[0]) && !/^sub-topic id$/i.test(r[0]),
  );
  const checklistIds = checklistRows.map((r) => r[0]).filter((id) => /^U\d+-\d+$/.test(id));
  if (checklistIds.length === 0) {
    err(label, 'has a `### Sub-topic checklist` heading but no parseable `U<n>-<seq>` rows');
    return;
  }

  // --- depth budget band (d) ---
  const budgetMatch = sectionLines
    .join('\n')
    .match(/\*\*Depth budget\*\*:\s*\d+\s*sub-topics?;\s*(\d+)\s*[–-]\s*(\d+)\s*reading-min/i);
  let band = null;
  if (!budgetMatch) {
    err(label, 'in scope (has a Sub-topic checklist) but its content-spec subsection has no `**Depth budget**: N sub-topics; A–B reading-min` line');
  } else {
    band = [Number(budgetMatch[1]), Number(budgetMatch[2])];
  }

  // --- coverage matrix (a) ---
  const coverageFile = join(courseDir, 'coverage', `unit-${String(unitNo).padStart(2, '0')}.md`);
  const coverageRows = readTable(coverageFile);
  const coveredIds = new Set();
  const citedSources = new Set();
  if (!coverageRows) {
    err(label, `no coverage matrix at specs/content/${courseCode.toLowerCase()}/coverage/unit-${String(unitNo).padStart(2, '0')}.md`);
  } else {
    for (const cells of coverageRows) {
      if (/^sub-topic id$/i.test(cells[0]) || /^id$/i.test(cells[0])) continue; // header
      const [id, file, section, source] = cells;
      if (!/^U\d+-\d+$/.test(id || '')) continue;
      coveredIds.add(id);
      if (!file || !section || !source) {
        err(label, `coverage row for ${id} has a blank File/Section/Source cell`);
        continue;
      }
      if (!FOLDING_FILES.has(file)) {
        err(label, `coverage row for ${id} names File "${file}" — must be one of ${UNIT_FILES.join(', ')}`);
      }
      citedSources.add(source);
    }
    for (const id of checklistIds) {
      if (!coveredIds.has(id)) err(label, `checklist sub-topic ${id} has no row in the coverage matrix`);
    }
  }

  // --- sources list (e) ---
  const sourcesFile = join(courseDir, 'sources', `unit-${String(unitNo).padStart(2, '0')}.md`);
  const sourcesRows = readTable(sourcesFile);
  if (!sourcesRows) {
    err(label, `no sources-consulted list at specs/content/${courseCode.toLowerCase()}/sources/unit-${String(unitNo).padStart(2, '0')}.md`);
  } else {
    const keyKind = new Map();
    for (const cells of sourcesRows) {
      if (/^key$/i.test(cells[0])) continue; // header
      const key = cells[0];
      const kind = (cells[4] || '').toLowerCase();
      if (key) keyKind.set(key, kind);
    }
    for (const s of citedSources) {
      if (!keyKind.has(s)) err(label, `coverage cites source "${s}" but it is not a Key in the sources-consulted list`);
    }
    for (const [key, kind] of keyKind) {
      if (kind === 'no-external-source') continue;
      if (!citedSources.has(key)) err(label, `sources-consulted Key "${key}" is not referenced by any coverage row`);
    }
  }

  // --- required blocks in index.mdx (b) ---
  const indexBody = matter(enIndexRaw).content;
  if (!/^#{2,6}\s+Common misconceptions\b/im.test(indexBody)) {
    err(label, 'index.mdx is missing the required `## Common misconceptions` block (FR-005)');
  }
  if (!/^#{2,6}\s+Further reading\b/im.test(indexBody)) {
    err(label, 'index.mdx is missing the required `## Further reading` block (FR-005)');
  }

  // --- formative floor (c) ---
  const formativeFile = join(unitDir, 'formative.mdx');
  if (existsSync(formativeFile)) {
    const fBody = matter(readFileSync(formativeFile, 'utf8')).content;
    const items = (fBody.match(/^\s*\d+\.\s+\S/gm) || []).length;
    if (items < 5) err(label, `formative.mdx has ${items} numbered item(s); the depth standard requires at least 5 (FR-006)`);
  } else {
    err(label, 'formative.mdx not found');
  }

  // --- reading-minutes band (d) ---
  if (band) {
    let total = 0;
    let missing = false;
    for (const f of UNIT_FILES) {
      const p = join(unitDir, f);
      if (!existsSync(p)) { missing = true; continue; }
      const m = matter(readFileSync(p, 'utf8')).data.est_reading_minutes;
      if (typeof m === 'number') total += m;
      else missing = true;
    }
    if (missing) {
      err(label, 'cannot check the reading-minutes band — a unit file is missing or has no numeric `est_reading_minutes`');
    } else if (total < band[0] || total > band[1]) {
      err(label, `unit-total est_reading_minutes is ${total}, outside the depth-budget band ${band[0]}–${band[1]} reading-min (FR-012d)`);
    }
  }
}

// ---- walk docs/ (mirrors check-pipeline-gate.mjs) ---------------------------
function walk() {
  if (!existsSync(DOCS_DIR)) {
    console.error('check-unit-depth: docs/ not found — nothing to check.');
    return;
  }
  for (const sem of dirs(DOCS_DIR)) {
    if (!/^semester-\d+$/.test(sem)) continue;
    const semDir = join(DOCS_DIR, sem);
    for (const course of dirs(semDir)) {
      const courseDir = join(semDir, course);
      const courseCode = course.toUpperCase();
      for (const unit of dirs(courseDir)) {
        const m = /^unit-(\d+)$/.exec(unit);
        if (!m) continue;
        checkUnit({ unitDir: join(courseDir, unit), courseCode, unitNo: Number(m[1]) });
      }
    }
  }
}

walk();

if (errors.length) {
  console.error(`\n✗ Depth gate failed with ${errors.length} finding(s):\n`);
  for (const e of errors) console.error(`  - ${e}`);
  console.error('');
  process.exit(1);
} else {
  console.log('✓ Depth gate passed (concept coverage, required blocks, formative floor, reading-minutes band, coverage↔sources consistency).');
}
