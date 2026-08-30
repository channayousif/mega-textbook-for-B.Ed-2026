#!/usr/bin/env node
/**
 * Content depth gate for the authoring pipeline (Spec 007 T028; Spec 008 T020).
 *
 * In scope for every non-`coming_soon` EN unit under docs/ **whose course content-spec
 * `## Unit N` subsection carries a `### Sub-topic checklist` table** — a unit without that
 * table is out of scope and skipped (grandfathers EFMP-301 and any not-yet-migrated unit).
 *
 * For an in-scope unit the gate picks a layout:
 *
 *   LEGACY (Spec 007) — no `topic-*.mdx` files AND no `### Topic list` table. The five checks
 *   below run **byte-for-byte** as in Spec 007:
 *     (a) coverage/unit-NN.md exists; every checklist ID has a row with non-blank
 *         File (one of the five folding-rule files) / Section / Source;
 *     (b) index.mdx has BOTH `## Common misconceptions` AND `## Further reading`;
 *     (c) formative.mdx has >= 5 top-level numbered list items;
 *     (d) sum of the five EN files' `est_reading_minutes` is within the `**Depth budget**` band;
 *     (e) coverage matrix and sources/unit-NN.md are mutually consistent.
 *
 *   TOPIC / new-shape (Spec 008) — `topic-*.mdx` files AND a `### Topic list` table (exactly
 *   one signal present, or a row-count mismatch, is a LOUD failure, never a silent fallback).
 *   The ten checks of FR-020 run (see checkTopic()).
 *
 * Every failure pushes a per-unit message naming the unmet condition and the file (SC-004).
 * Pure Node + gray-matter, no new dependency. CONTENT_ROOT lets fixture tests point it at a
 * temp dir (same convention as check-pipeline-gate.mjs).
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

// ---- Spec 008 new-shape helpers -------------------------------------------------

const topicFilesIn = (dir) =>
  existsSync(dir)
    ? readdirSync(dir).filter((n) => /^topic-\d{2}\.mdx$/.test(n)).sort()
    : [];

/** Rows of the `### Topic list` table → [{topic, title, subIds:[...]}]. */
function parseTopicList(block) {
  if (!block) return null;
  const rows = parsePipeTable(block).filter((r) => !/^topic$/i.test(r[0]));
  return rows.map((cells) => {
    const [topic, title, subCell] = cells;
    const subIds = (subCell || '')
      .split(',')
      .map((s) => s.trim())
      .filter((s) => /^U\d+-\d+$/.test(s));
    return { topic: (topic || '').trim(), title: (title || '').trim(), subIds };
  });
}

function detectLayout(topicFilesOnDisk, topicListRows) {
  const hasFiles = topicFilesOnDisk.length > 0;
  const hasList = Array.isArray(topicListRows) && topicListRows.length > 0;
  if (!hasFiles && !hasList) return { layout: 'legacy', signal: null };
  if (hasFiles && !hasList) {
    return { layout: 'topic', signal: 'has `topic-*.mdx` files but its content-spec `## Unit N` subsection has no `### Topic list` table (both signals are required for the per-topic layout)' };
  }
  if (!hasFiles && hasList) {
    return { layout: 'topic', signal: 'its content-spec `## Unit N` subsection has a `### Topic list` table but no `topic-*.mdx` files are on disk (both signals are required for the per-topic layout)' };
  }
  return { layout: 'topic', signal: null };
}

/** Numbered top-level items (`1.`, `2.`, …) between `headingRe` and the next `##`/`###`. */
function countNumberedInSection(lines, headingRe) {
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
function countChecklistInSection(lines, headingRe) {
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
function countContentLinesInSection(lines, headingRe) {
  const start = lines.findIndex((l) => headingRe.test(l.trimEnd()));
  if (start === -1) return null;
  let n = 0;
  for (let i = start + 1; i < lines.length; i++) {
    if (/^#{2,3}\s/.test(lines[i])) break;
    if (lines[i].trim() !== '') n++;
  }
  return n;
}

// The nine canonical cycle headings (contract: topic-cycle.md), checked for presence AND order.
const CYCLE = [
  { name: '## A real classroom situation', re: /^##\s+A real classroom situation\s*$/ },
  { name: '## Explanation', re: /^##\s+Explanation\s*$/ },
  { name: '## Activity: <name>', re: /^##\s+Activity[:\s]/ },
  { name: '## Check your understanding', re: /^##\s+Check your understanding\s*$/ },
  { name: '## Summary', re: /^##\s+Summary\s*$/ },
  { name: '## Self-assessment checklist', re: /^##\s+Self-assessment checklist\s*$/ },
  { name: '## Try this at your practicum school', re: /^##\s+Try this at your practicum school\s*$/ },
  { name: '## Summative task', re: /^##\s+Summative task\s*$/ },
  { name: '## Further reading', re: /^##\s+Further reading\s*$/ },
];

// ---- LEGACY path (Spec 007 — byte-for-byte) -----------------------------------
function checkLegacy({ label, unitDir, courseDir, unitNo, enIndexRaw, checklistIds, sectionLines }) {
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
  const coverageFile = join(courseDir, "coverage", `unit-${String(unitNo).padStart(2, "0")}.md`);
  const coverageRows = readTable(coverageFile);
  const coveredIds = new Set();
  const citedSources = new Set();
  if (!coverageRows) {
    err(label, `no coverage matrix at ${relative(ROOT, coverageFile)}`);
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
  const sourcesFile = join(courseDir, "sources", `unit-${String(unitNo).padStart(2, "0")}.md`);
  const sourcesRows = readTable(sourcesFile);
  if (!sourcesRows) {
    err(label, `no sources-consulted list at ${relative(ROOT, sourcesFile)}`);
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

// ---- TOPIC / new-shape path (Spec 008 FR-020) --------------------------------
function checkTopic({ label, unitDir, courseDir, unitNo, checklistIds, sectionLines, topicFilesOnDisk, topicListRows }) {
  const pad = (n) => String(n).padStart(2, '0');

  // (1) topic-file set contiguous from 01 + matches `### Topic list` row count
  const ordinals = topicFilesOnDisk.map((f) => Number(/^topic-(\d{2})\.mdx$/.exec(f)[1]));
  for (let i = 0; i < ordinals.length; i++) {
    if (ordinals[i] !== i + 1) {
      err(label, `topic files are not contiguous from 01 — expected topic-${pad(i + 1)}.mdx, found topic-${pad(ordinals[i])}.mdx`);
      break;
    }
  }
  if (topicListRows.length !== topicFilesOnDisk.length) {
    err(label, `\`### Topic list\` has ${topicListRows.length} row(s) but ${topicFilesOnDisk.length} topic-*.mdx file(s) are on disk`);
  }

  // (2) checklist ↔ topic partition: total + disjoint
  const assignmentCount = new Map(); // id -> [rowIndex,...]
  for (let ri = 0; ri < topicListRows.length; ri++) {
    for (const id of topicListRows[ri].subIds) {
      if (!assignmentCount.has(id)) assignmentCount.set(id, []);
      assignmentCount.get(id).push(ri);
    }
  }
  for (const id of checklistIds) {
    const rows = assignmentCount.get(id) || [];
    if (rows.length === 0) err(label, `checklist sub-topic ${id} is not assigned to any \`### Topic list\` row (partition must be total)`);
    else if (rows.length > 1) err(label, `checklist sub-topic ${id} is assigned to ${rows.length} \`### Topic list\` rows (partition must be disjoint)`);
  }
  for (const id of assignmentCount.keys()) {
    if (!checklistIds.includes(id)) err(label, `\`### Topic list\` assigns ${id}, which is not an ID in the \`### Sub-topic checklist\``);
  }

  // id -> the topic-NN.mdx its `### Topic list` row assigns it to (row order == file order)
  const assignedFileById = new Map();
  for (const [id, rows] of assignmentCount) {
    if (rows.length === 1) assignedFileById.set(id, `topic-${pad(rows[0] + 1)}.mdx`);
  }

  // (3) nine cycle headings in order + (4) per-topic formative/checklist counts + (5) further reading
  for (const tf of topicFilesOnDisk) {
    const body = matter(readFileSync(join(unitDir, tf), 'utf8')).content;
    const lines = body.split(/\r?\n/);
    let cursor = -1;
    let orderBroken = false;
    for (const step of CYCLE) {
      let found = -1;
      for (let i = cursor + 1; i < lines.length; i++) {
        if (step.re.test(lines[i].trimEnd())) { found = i; break; }
      }
      if (found === -1) {
        err(label, `${tf}: missing or out-of-order cycle heading \`${step.name}\` (contract: topic-cycle.md)`);
        orderBroken = true;
        break;
      }
      cursor = found;
    }
    if (orderBroken) continue;

    const cyu = countNumberedInSection(lines, /^##\s+Check your understanding\s*$/);
    if (cyu != null && cyu < 3) err(label, `${tf}: \`## Check your understanding\` has ${cyu} numbered item(s); at least 3 required`);
    const sac = countChecklistInSection(lines, /^##\s+Self-assessment checklist\s*$/);
    if (sac != null && sac < 3) err(label, `${tf}: \`## Self-assessment checklist\` has ${sac} \`- [ ]\` item(s); at least 3 required`);
    const fr = countContentLinesInSection(lines, /^##\s+Further reading\s*$/);
    if (fr != null && fr < 1) err(label, `${tf}: \`## Further reading\` has no citation/link line (at least 1 required)`);
  }

  // (6) index.mdx `## In this unit` count == topic count
  const indexFile = join(unitDir, 'index.mdx');
  const indexLines = matter(readFileSync(indexFile, 'utf8')).content.split(/\r?\n/);
  const inThisUnit = countNumberedInSection(indexLines, /^##\s+In this unit\s*$/);
  if (inThisUnit == null) {
    err(label, 'index.mdx is missing the `## In this unit` section');
  } else if (inThisUnit !== topicFilesOnDisk.length) {
    err(label, `index.mdx \`## In this unit\` lists ${inThisUnit} item(s) but the unit has ${topicFilesOnDisk.length} topic file(s)`);
  }

  // (7) unit-assessment.mdx
  const uaFile = join(unitDir, 'unit-assessment.mdx');
  if (!existsSync(uaFile)) {
    err(label, 'unit-assessment.mdx not found (required for a per-topic unit)');
  } else {
    const uaLines = matter(readFileSync(uaFile, 'utf8')).content.split(/\r?\n/);
    if (!uaLines.some((l) => /^##\s+Unit summary\s*$/.test(l.trimEnd()))) {
      err(label, 'unit-assessment.mdx is missing the `## Unit summary` section');
    }
    const bands = [
      { name: 'Multiple-choice questions (MCQs)', want: 10, re: /^###\s+Multiple-choice questions \(MCQs\)\s*$/ },
      { name: 'Restricted-response questions (RRQs)', want: 10, re: /^###\s+Restricted-response questions \(RRQs\)\s*$/ },
      { name: 'Extended-response questions (ERQs)', want: 5, re: /^###\s+Extended-response questions \(ERQs\)\s*$/ },
    ];
    for (const b of bands) {
      const n = countNumberedInSection(uaLines, b.re);
      if (n == null) err(label, `unit-assessment.mdx is missing the \`### ${b.name}\` section`);
      else if (n !== b.want) err(label, `unit-assessment.mdx \`### ${b.name}\` has ${n} numbered item(s); exactly ${b.want} required`);
    }
    const answersIdx = uaLines
      .map((l, i) => (/^##\s+Answers and marking guidance\s*$/.test(l.trimEnd()) ? i : -1))
      .filter((i) => i !== -1);
    if (answersIdx.length === 0) {
      err(label, 'unit-assessment.mdx is missing the final `## Answers and marking guidance` section');
    } else if (answersIdx.length > 1) {
      err(label, `unit-assessment.mdx has ${answersIdx.length} \`## Answers and marking guidance\` headings; exactly 1 required`);
    } else {
      const k = answersIdx[0];
      for (let i = k + 1; i < uaLines.length; i++) {
        if (/^##\s/.test(uaLines[i])) {
          err(label, `unit-assessment.mdx has a \`##\` heading after \`## Answers and marking guidance\` — it must be the final section`);
          break;
        }
      }
    }
  }

  // (8) coverage matrix v2
  const coverageFile = join(courseDir, 'coverage', `unit-${pad(unitNo)}.md`);
  const coverageRows = readTable(coverageFile);
  const newShapeSet = new Set([
    'index.mdx', 'unit-assessment.mdx', 'unit-teacher-notes.mdx',
    ...topicFilesOnDisk,
  ]);
  const citedSources = new Set();
  const filesReferenced = new Set();
  const topicFilesForId = new Map(); // id -> Set(files)
  if (!coverageRows) {
    err(label, `no coverage matrix at ${relative(ROOT, coverageFile)}`);
  } else {
    for (const cells of coverageRows) {
      if (/^sub-topic id$/i.test(cells[0]) || /^id$/i.test(cells[0])) continue;
      const [id, file, section, source] = cells;
      if (!/^U\d+-\d+$/.test(id || '')) continue;
      if (!file || !section || !source) {
        err(label, `coverage row for ${id} has a blank File/Section/Source cell`);
        continue;
      }
      if (!newShapeSet.has(file)) {
        err(label, `coverage row for ${id} names File "${file}" — must be one of ${[...newShapeSet].join(', ')}`);
      } else {
        filesReferenced.add(file);
      }
      if (!topicFilesForId.has(id)) topicFilesForId.set(id, new Set());
      topicFilesForId.get(id).add(file);
      citedSources.add(source);
    }
    for (const id of checklistIds) {
      if (!topicFilesForId.has(id)) err(label, `checklist sub-topic ${id} has no row in the coverage matrix`);
    }
    for (const tf of topicFilesOnDisk) {
      if (!filesReferenced.has(tf)) err(label, `${tf} is not referenced as the File of any coverage row (every topic file must teach ≥1 checklist sub-topic)`);
    }
    // coverage ↔ `### Topic list` cross-check (hard failure)
    for (const [id, assignedFile] of assignedFileById) {
      const rowFiles = topicFilesForId.get(id);
      if (rowFiles && !rowFiles.has(assignedFile)) {
        err(label, `checklist sub-topic ${id} is assigned to ${assignedFile} in the \`### Topic list\` but its coverage row(s) name ${[...rowFiles].join(', ')} instead`);
      }
    }
  }

  // (e) coverage ↔ sources mutual consistency
  const sourcesFile = join(courseDir, 'sources', `unit-${pad(unitNo)}.md`);
  const sourcesRows = readTable(sourcesFile);
  if (!sourcesRows) {
    err(label, `no sources-consulted list at ${relative(ROOT, sourcesFile)}`);
  } else {
    const keyKind = new Map();
    for (const cells of sourcesRows) {
      if (/^key$/i.test(cells[0])) continue;
      if (cells[0]) keyKind.set(cells[0], (cells[4] || '').toLowerCase());
    }
    for (const s of citedSources) {
      if (!keyKind.has(s)) err(label, `coverage cites source "${s}" but it is not a Key in the sources-consulted list`);
    }
    for (const [key, kind] of keyKind) {
      if (kind === 'no-external-source') continue;
      if (!citedSources.has(key)) err(label, `sources-consulted Key "${key}" is not referenced by any coverage row`);
    }
  }

  // (9) reading-minutes band across the new-shape file set
  const budgetMatch = sectionLines.join('\n').match(/\*\*Depth budget\*\*:[^\n]*?(\d+)\s*[–-]\s*(\d+)\s*reading-min/i);
  if (!budgetMatch) {
    err(label, 'its content-spec subsection has no `**Depth budget**: … A–B reading-min` line');
  } else {
    const band = [Number(budgetMatch[1]), Number(budgetMatch[2])];
    const files = ['index.mdx', ...topicFilesOnDisk, 'unit-assessment.mdx'];
    if (existsSync(join(unitDir, 'unit-teacher-notes.mdx'))) files.push('unit-teacher-notes.mdx');
    let total = 0;
    let missing = false;
    for (const f of files) {
      const p = join(unitDir, f);
      if (!existsSync(p)) { missing = true; continue; }
      const m = matter(readFileSync(p, 'utf8')).data.est_reading_minutes;
      if (typeof m === 'number') total += m;
      else missing = true;
    }
    if (missing) {
      err(label, 'cannot check the reading-minutes band — a new-shape file is missing or has no numeric `est_reading_minutes`');
    } else if (total < band[0] || total > band[1]) {
      err(label, `unit-total est_reading_minutes is ${total}, outside the depth-budget band ${band[0]}–${band[1]} reading-min (FR-016)`);
    }
  }
}

// ---- per-unit dispatch ------------------------------------------------------
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

  const topicFilesOnDisk = topicFilesIn(unitDir);
  const topicListRows = parseTopicList(tableAfterHeading(sectionLines, /^###\s+Topic list\b/i));
  const { layout, signal } = detectLayout(topicFilesOnDisk, topicListRows);

  if (layout === 'legacy') {
    checkLegacy({ label, unitDir, courseDir, unitNo, enIndexRaw, checklistIds, sectionLines });
    return;
  }

  if (signal) {
    err(label, signal);
    return;
  }
  checkTopic({
    label, unitDir, courseDir, unitNo, checklistIds, sectionLines,
    topicFilesOnDisk, topicListRows,
  });
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
