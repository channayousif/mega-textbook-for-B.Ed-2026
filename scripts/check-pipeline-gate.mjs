#!/usr/bin/env node
/**
 * Pipeline governance gate for the content authoring pipeline (Spec 006, tasks.md T009/T012/
 * T016/T021/T022).
 *
 * For every non-`coming_soon` unit under docs/, checks:
 *   (a) tracker check — the unit's course `tasks.md` has done rows (with reviewer initials)
 *       for `G2 en-draft`/`G3 en-review`, and for `G4 ur-translation`/`G5 ur-review` when the
 *       unit's UR mirror is `translation_status: reviewed` (FR-016a, research.md R6).
 *   (b) approval check — the unit's course `content-spec.md` has `status: approved` (FR-016b).
 *   (c) terminology check — the unit's UR `index.mdx` `key_terms` conform to `terminology.csv`
 *       (FR-016c, research.md R4).
 *
 * `G1`/`G6`/`G7` are intentionally not re-checked here (research.md R6 scope note). Answer-key
 * leak scanning (FR-016d) stays in check-no-answer-keys.mjs (research.md R5).
 *
 * Pure Node + gray-matter, no new dependency (research.md R7). CONTENT_ROOT lets fixture tests
 * point this at a temp dir, matching validate-content.mjs's convention.
 */
import { readdirSync, statSync, readFileSync, existsSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { validateAgentTrackerRow } from './lib/review-evidence.mjs';
import { loadTracker as loadTrackerRows } from './lib/tracker-rows.mjs';
import { walkUnits, findDuplicateCourseCodes } from './lib/content-roots.mjs';

const REPO = resolve(fileURLToPath(new URL('..', import.meta.url)));
const ROOT = process.env.CONTENT_ROOT ? resolve(process.env.CONTENT_ROOT) : REPO;
const DOCS_DIR = join(ROOT, 'docs');
const UR_BASE = join(ROOT, 'i18n', 'ur', 'docusaurus-plugin-content-docs', 'current');
const CONTENT_SPEC_DIR = join(ROOT, 'specs', 'content');

const errors = [];
const err = (unitLabel, msg) => errors.push(`${unitLabel}: ${msg}`);

const dirs = (p) =>
  existsSync(p) ? readdirSync(p).filter((n) => statSync(join(p, n)).isDirectory()) : [];

// ---- terminology.csv parser (research.md R7 — ~15-line hand-rolled parser) ----
function parseCsv(text) {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
  const [header, ...rows] = lines;
  if (!header) return [];
  const cols = header.split(',').map((c) => c.trim());
  return rows.map((line) => {
    const cells = [];
    let cur = '';
    let inQuotes = false;
    for (const c of line) {
      if (c === '"') {
        inQuotes = !inQuotes;
      } else if (c === ',' && !inQuotes) {
        cells.push(cur);
        cur = '';
      } else {
        cur += c;
      }
    }
    cells.push(cur);
    const obj = {};
    cols.forEach((col, i) => {
      obj[col] = (cells[i] ?? '').trim();
    });
    return obj;
  });
}

/**
 * The bank is data, not standard (ADR-0021): it versions by its own Git history rather than
 * under the style guide's freeze marker, so the shape checks that used to ride along with a
 * version bump have to live here instead.
 *
 * `term_ur` may hold a PAIR - two accepted Urdu terms separated by ` / ` - when both readings
 * are already live in reviewed content and picking one would make signed content
 * non-conformant. Style guide v4.2 banked four such pairs. Every accepted term is returned, so
 * a key term matching either side conforms.
 */
function acceptedTerms(termUr) {
  return String(termUr ?? '')
    .split('/')
    .map((t) => t.trim())
    .filter(Boolean);
}

function loadTerminology() {
  const file = join(CONTENT_SPEC_DIR, 'terminology.csv');
  const map = new Map();
  if (!existsSync(file)) return map;
  for (const r of parseCsv(readFileSync(file, 'utf8'))) {
    if (!r.term_en) continue;
    // A duplicate used to be silently shadowed by `map.set`, which is exactly the rot the
    // freeze was incidentally preventing. Name it instead.
    if (map.has(r.term_en)) {
      err('terminology.csv', `duplicate term_en '${r.term_en}' - the bank must have one row per English term`);
      continue;
    }
    const accepted = acceptedTerms(r.term_ur);
    if (!accepted.length) {
      err('terminology.csv', `term_en '${r.term_en}' has an empty term_ur`);
      continue;
    }
    map.set(r.term_en, accepted);
  }
  return map;
}

// ---- tasks.md tracker parser ----
// Moved to scripts/lib/tracker-rows.mjs (Spec 017 T018) so report-content-status.mjs
// reads the tracker through the same definition of a row that this gate does.
function loadTracker(courseCode) {
  return loadTrackerRows(ROOT, courseCode);
}

function loadContentSpecStatus(courseCode) {
  const file = join(CONTENT_SPEC_DIR, courseCode.toLowerCase(), 'content-spec.md');
  if (!existsSync(file)) return { exists: false, status: null };
  const { data } = matter(readFileSync(file, 'utf8'));
  return { exists: true, status: data.status ?? null };
}

/**
 * True when `rows` has a row for `unitLabel`/a stage starting with `stagePrefix`, done, with
 * reviewer initials. A Revision Task (FR-011) appends a *new* row for the same unit/stage rather
 * than editing the original — so the *last* matching row (most recently added) is authoritative,
 * not the first: an in-progress revision row must re-block the gate even though an earlier,
 * already-done row for that same stage still exists above it.
 */
function stageDone(rows, unitLabel, stagePrefix, courseCode, unitNo) {
  const matches = rows.filter((r) => r.unit === unitLabel && r.stage.startsWith(stagePrefix));
  const row = matches[matches.length - 1];
  if (!row) return { ok: false, reason: `no '${stagePrefix}' row found for ${unitLabel}` };
  if (row.status !== '✅') {
    return { ok: false, reason: `'${stagePrefix}' row for ${unitLabel} is not done (status: '${row.status}')` };
  }
  if (!row.reviewer) {
    return { ok: false, reason: `'${stagePrefix}' row for ${unitLabel} is done but has no reviewer initials` };
  }
  try {
    validateAgentTrackerRow(ROOT, row, courseCode, unitNo, stagePrefix.slice(0, 2));
  } catch (error) {
    return { ok: false, reason: `${stagePrefix}: ${error.message}` };
  }
  return { ok: true };
}

// ---- per-unit checks -----------------------------------------------------------
function checkUnit({ unitDir, urUnitDir, courseCode, unitNo }) {
  const enIndex = join(unitDir, 'index.mdx');
  if (!existsSync(enIndex)) return; // structural issues are validate-content.mjs's concern
  const enFm = matter(readFileSync(enIndex, 'utf8')).data;
  if (enFm.coming_soon === true) return; // scaffolded, not yet authored — skip (research.md R6)

  const unitLabel = `Unit ${unitNo}`;
  const label = `${courseCode} ${unitLabel} (${relative(ROOT, unitDir)})`;

  // (b) Approval check (FR-016b)
  const spec = loadContentSpecStatus(courseCode);
  if (!spec.exists) {
    err(label, `no content-spec.md found at specs/content/${courseCode.toLowerCase()}/content-spec.md`);
  } else if (spec.status !== 'approved') {
    err(label, `course content-spec.md is not approved (status: '${spec.status ?? 'missing'}')`);
  }

  // (a) Tracker check (FR-016a) — EN stages always required for a drafted, non-coming_soon unit
  const tracker = loadTracker(courseCode);
  if (!tracker) {
    err(label, `no tasks.md found at specs/content/${courseCode.toLowerCase()}/tasks.md`);
    return;
  }
  for (const stagePrefix of ['G2 en-draft', 'G3 en-review']) {
    const r = stageDone(tracker, unitLabel, stagePrefix, courseCode, unitNo);
    if (!r.ok) err(label, r.reason);
  }

  // UR stages + terminology check only apply when the UR mirror exists and is reviewed
  const urIndex = join(urUnitDir, 'index.mdx');
  const urFm = existsSync(urIndex) ? matter(readFileSync(urIndex, 'utf8')).data : null;

  if (urFm && urFm.translation_status === 'reviewed') {
    for (const stagePrefix of ['G4 ur-translation', 'G5 ur-review']) {
      const r = stageDone(tracker, unitLabel, stagePrefix, courseCode, unitNo);
      if (!r.ok) err(label, r.reason);
    }

    // (c) Terminology conformance check (FR-016c, research.md R4)
    const bank = loadTerminology();
    const keyTerms = Array.isArray(urFm.key_terms) ? urFm.key_terms : [];
    for (const { en, ur } of keyTerms) {
      if (!bank.has(en)) {
        err(label, `key term '${en}' is not in terminology.csv - add it to the bank`);
      } else if (!bank.get(en).includes(ur)) {
        const accepted = bank.get(en);
        err(
          label,
          `key term '${en}' declares ur:'${ur}' but terminology.csv accepts ` +
            `${accepted.map((t) => `'${t}'`).join(' or ')}`,
        );
      }
    }
  }
}

// ---- walk docs/ (mirrors validate-content.mjs's walk) --------------------------
function walk() {
  if (!existsSync(DOCS_DIR)) {
    console.error('check-pipeline-gate: docs/ not found — nothing to check.');
    return;
  }
  // Feature 015 FR-011: a course code identifies exactly one course across every
  // track. Checked here rather than only in resolveUnit, which trips over a
  // duplicate only when something happens to ask for that course.
  for (const { courseCode, tracks } of findDuplicateCourseCodes(ROOT)) {
    err(courseCode, `course code appears in more than one track (${tracks.join(', ')}) - codes must be globally unique`);
  }

  // Feature 015 FR-002: one definition of where content lives. urUnitDir comes
  // from the record's track, never a rebuilt `semester-N` join.
  for (const record of walkUnits(ROOT)) {
    checkUnit(record);
  }
}

walk();

if (errors.length) {
  console.error(`\n✗ Pipeline gate failed with ${errors.length} finding(s):\n`);
  for (const e of errors) console.error(`  - ${e}`);
  console.error('');
  process.exit(1);
} else {
  console.log('✓ Pipeline gate passed (content-spec approval, tracker completeness, terminology conformance).');
}
