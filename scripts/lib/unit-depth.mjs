/**
 * Per-unit depth-check verdict computation, extracted (behavior-preserving) out of
 * `check-unit-depth.mjs`'s `checkLegacy()`/`checkTopic()` (Spec 010 T002, research.md R9).
 *
 * Contract change from the original private functions: instead of pushing directly to a
 * shared `errors` array via `err(label, msg)`, each function returns `{ errors: string[] }`
 * (message text only, no `label:` prefix — the caller re-applies that exactly as before).
 * This lets `report-content-status.mjs` (Story 4, FR-033) call the same verdict logic the
 * gate itself calls, without re-deriving it and without inheriting the gate's own
 * process-exit/console side effects.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import matter from 'gray-matter';
import {
  readTable,
  parsePipeTable,
  tableAfterHeading,
  countNumberedInSection,
  countContentLinesInSection,
  countChecklistInSection,
} from './mdx-sections.mjs';

const UNIT_FILES = ['index.mdx', 'activities.mdx', 'formative.mdx', 'summative.mdx', 'teacher-notes.mdx'];
const FOLDING_FILES = new Set(UNIT_FILES);

// The nine canonical cycle headings (contract: topic-cycle.md), checked for presence AND order.
export const CYCLE = [
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

/** LEGACY path (Spec 007 — byte-for-byte). Returns `{ errors: string[] }`. */
/**
 * (e2) Every external source key is either VERIFIABLE or DECLARED UNVERIFIABLE.
 *
 * A G3 reviewer can confirm from a registry that a citation EXISTS, but cannot
 * confirm the source SUPPORTS the claim without its text. The review bundle
 * already binds `specs/content/<course>/sources/`, so a committed excerpt at
 * `sources/texts/<key>.md` travels with the unit and makes support checkable
 * offline and reproducibly.
 *
 * All four EFMP-302 Unit 3-6 G3 reviews (2026-09-18) returned `sources` as fail
 * or unverified for exactly this reason. Where a source WAS independently
 * retrievable they found real defects - Isore (2009) inverted, `goe2008` not
 * containing the sequence it was cited for - so an unverified source is not safe
 * by default.
 *
 * Declaring a key unverifiable is a legitimate outcome. Silence is not, and that
 * is what this catches. The declaration is machine-readable on purpose: a first
 * attempt matched any key MENTIONED under a limitation heading and swept in
 * `isore2009`, which had been verified against ERIC and was named there only in
 * passing. Prose cannot distinguish "we could not read this" from "we read this".
 *
 *   ## Unverifiable sources
 *   - some-key: what was attempted, and what it leaves unchecked
 */
/**
 * (e3) The sub-topic IDs a source file CLAIMS must match the ones the coverage
 * matrix actually grounds in that key.
 *
 * `sources/unit-NN.md` states each key's scope twice: in the table's `Supports`
 * cell, and again in any `## Unverifiable sources` bullet. `coverage/unit-NN.md`
 * is the authority. Nothing checked that the three agreed, and they drifted
 * every time a mapping was repaired in one file and not the others.
 *
 * The EFMP-302 Unit 3 G3 run-004 review found all three disagreeing at once:
 * a Supports cell still claiming a sub-topic its own bound excerpt refuted, a
 * declaration omitting a sub-topic it did ground, and a declaration claiming one
 * it did not. The net effect was that U3-11 rested on an unread print source
 * that no declaration disclosed, which is the rubric's named failure - a
 * declaration understating what it leaves unchecked. Three prior review cycles
 * missed it, and the reviewer's own advisory was that a mechanical cross-check
 * would have caught every instance.
 *
 * Claiming FEWER IDs than coverage grounds is the dangerous direction, because
 * it hides an unverified dependency from the reader. Claiming MORE is also an
 * error, but a visible one.
 */
function checkSourceScopeAgreement({ sourcesFile, sourcesRows, coverageByKey, errors }) {
  const text = readFileSync(sourcesFile, 'utf8');
  // Authors write runs as `U6-04/05/06` as well as `U6-04, U6-05, U6-06`.
  // Only `/` joins a run. A dash is NOT treated as a range separator on purpose: reading
  // `U3-03-05` as {03, 05} would silently drop U3-04, whereas reading it as {03} makes the
  // check complain that 04 and 05 are omitted, which is the safe direction to fail in.
  // A regex that only caught the long form would report the rest as omitted, which
  // is a false positive on a perfectly clear declaration.
  const idsIn = (text) => {
    const out = new Set();
    // `U1-01..U1-04` and `U1-01..04` are inclusive ranges.
    for (const m of text.matchAll(/\bU(\d+)-(\d+)\.\.(?:U\1-)?(\d+)\b/g)) {
      const [, unit, from, to] = m;
      const width = m[2].length;
      for (let i = Number(from); i <= Number(to); i += 1) {
        out.add(`U${unit}-${String(i).padStart(width, '0')}`);
      }
    }
    for (const m of text.matchAll(/\bU(\d+)-(\d+)((?:\/\d+)*)\b/g)) {
      const [, unit, first, rest] = m;
      out.add(`U${unit}-${first}`);
      for (const part of rest.matchAll(/\/(\d+)/g)) out.add(`U${unit}-${part[1]}`);
    }
    return out;
  };
  const report = (key, claimed, grounded, where) => {
    const missing = [...grounded].filter((id) => !claimed.has(id)).sort();
    const extra = [...claimed].filter((id) => !grounded.has(id)).sort();
    if (missing.length) {
      errors.push(`source "${key}" ${where} omits ${missing.join(', ')}, which the coverage matrix grounds in it `
        + '- a scope that understates what the source carries hides an unverified dependency');
    }
    if (extra.length) {
      errors.push(`source "${key}" ${where} claims ${extra.join(', ')}, which the coverage matrix does not ground in it`);
    }
  };

  for (const cells of sourcesRows) {
    const key = cells[0];
    if (!key || /^key$/i.test(key) || (cells[4] || '').toLowerCase() === 'no-external-source') continue;
    const grounded = coverageByKey.get(key);
    if (!grounded || grounded.size === 0) continue; // the unreferenced-key check already covers this
    const claimed = idsIn(cells[3] || '');
    if (claimed.size === 0) continue; // a prose Supports cell naming no ID is not a scope claim
    report(key, claimed, grounded, 'Supports cell');
  }

  const seen = new Set();
  for (const section of text.split(/^##\s+/m).slice(1)) {
    if (!/^unverifiable sources\s*$/i.test(section.split('\n', 1)[0].trim())) continue;
    // Stop at the first table row. A `## Unverifiable sources` section runs to the
    // next `##`, and the sources table usually follows it with no heading between,
    // so reading to the section end scoops every ID in the table into the bullet.
    const body = section.split(/^\|/m)[0];
    for (const bullet of body.split(/\n(?=-\s)/)) {
      const m = /^-\s+`?([a-z0-9][a-z0-9-]*)`?\s*:/i.exec(bullet.trim());
      if (!m || seen.has(m[1])) continue;
      seen.add(m[1]);
      const grounded = coverageByKey.get(m[1]);
      if (!grounded || grounded.size === 0) continue;
      const claimed = idsIn(bullet);
      if (claimed.size === 0) continue;
      report(m[1], claimed, grounded, 'unverifiable-sources declaration');
    }
  }
}

function checkSourceVerifiability({ root, courseDir, sourcesFile, keyKind, errors }) {
  const sourcesText = readFileSync(sourcesFile, 'utf8');
  const declared = new Set();
  for (const section of sourcesText.split(/^##\s+/m).slice(1)) {
    if (!/^unverifiable sources\s*$/i.test(section.split('\n', 1)[0].trim())) continue;
    for (const line of section.split('\n')) {
      const m = /^-\s+`?([a-z0-9][a-z0-9-]*)`?\s*:/i.exec(line.trim());
      if (m) declared.add(m[1]);
    }
  }
  const courseRel = relative(join(root, 'specs', 'content'), courseDir);
  for (const [key, kind] of keyKind) {
    if (kind === 'no-external-source' || declared.has(key)) continue;
    if (!existsSync(join(courseDir, 'sources', 'texts', `${key}.md`))) {
      errors.push(`source "${key}" has no bound excerpt at specs/content/${courseRel}/sources/texts/${key}.md `
        + 'and is not listed under an `## Unverifiable sources` heading - a reviewer cannot check that it supports the claims citing it');
    }
  }
}

export function checkLegacy({ root, unitDir, courseDir, unitNo, enIndexRaw, checklistIds, sectionLines }) {
  const errors = [];

  // --- depth budget band (d) ---
  const budgetMatch = sectionLines
    .join('\n')
    .match(/\*\*Depth budget\*\*:\s*\d+\s*sub-topics?;\s*(\d+)\s*[–-]\s*(\d+)\s*reading-min/i);
  let band = null;
  if (!budgetMatch) {
    errors.push('in scope (has a Sub-topic checklist) but its content-spec subsection has no `**Depth budget**: N sub-topics; A–B reading-min` line');
  } else {
    band = [Number(budgetMatch[1]), Number(budgetMatch[2])];
  }

  // --- coverage matrix (a) ---
  const coverageFile = join(courseDir, 'coverage', `unit-${String(unitNo).padStart(2, '0')}.md`);
  const coverageRows = readTable(coverageFile);
  const coveredIds = new Set();
  const citedSources = new Set();
  const coverageByKey = new Map();
  if (!coverageRows) {
    errors.push(`no coverage matrix at ${relative(root, coverageFile)}`);
  } else {
    for (const cells of coverageRows) {
      if (/^sub-topic id$/i.test(cells[0]) || /^id$/i.test(cells[0])) continue; // header
      const [id, file, section, source] = cells;
      if (!/^U\d+-\d+$/.test(id || '')) continue;
      coveredIds.add(id);
      if (!file || !section || !source) {
        errors.push(`coverage row for ${id} has a blank File/Section/Source cell`);
        continue;
      }
      if (!FOLDING_FILES.has(file)) {
        errors.push(`coverage row for ${id} names File "${file}" — must be one of ${UNIT_FILES.join(', ')}`);
      }
      citedSources.add(source);
      if (!coverageByKey.has(source)) coverageByKey.set(source, new Set());
      if (id) coverageByKey.get(source).add(id);
    }
    for (const id of checklistIds) {
      if (!coveredIds.has(id)) errors.push(`checklist sub-topic ${id} has no row in the coverage matrix`);
    }
  }

  // --- sources list (e) ---
  const sourcesFile = join(courseDir, 'sources', `unit-${String(unitNo).padStart(2, '0')}.md`);
  const sourcesRows = readTable(sourcesFile);
  if (!sourcesRows) {
    errors.push(`no sources-consulted list at ${relative(root, sourcesFile)}`);
  } else {
    const keyKind = new Map();
    for (const cells of sourcesRows) {
      if (/^key$/i.test(cells[0])) continue; // header
      const key = cells[0];
      const kind = (cells[4] || '').toLowerCase();
      if (key) keyKind.set(key, kind);
    }
    for (const s of citedSources) {
      if (!keyKind.has(s)) errors.push(`coverage cites source "${s}" but it is not a Key in the sources-consulted list`);
    }
    for (const [key, kind] of keyKind) {
      if (kind === 'no-external-source') continue;
      if (!citedSources.has(key)) errors.push(`sources-consulted Key "${key}" is not referenced by any coverage row`);
    }
    checkSourceVerifiability({ root, courseDir, sourcesFile, keyKind, errors });
    checkSourceScopeAgreement({ sourcesFile, sourcesRows, coverageByKey, errors });
  }

  // --- required blocks in index.mdx (b) ---
  const indexBody = matter(enIndexRaw).content;
  if (!/^#{2,6}\s+Common misconceptions\b/im.test(indexBody)) {
    errors.push('index.mdx is missing the required `## Common misconceptions` block (FR-005)');
  }
  if (!/^#{2,6}\s+Further reading\b/im.test(indexBody)) {
    errors.push('index.mdx is missing the required `## Further reading` block (FR-005)');
  }

  // --- formative floor (c) ---
  const formativeFile = join(unitDir, 'formative.mdx');
  if (existsSync(formativeFile)) {
    const fBody = matter(readFileSync(formativeFile, 'utf8')).content;
    const items = (fBody.match(/^\s*\d+\.\s+\S/gm) || []).length;
    if (items < 5) errors.push(`formative.mdx has ${items} numbered item(s); the depth standard requires at least 5 (FR-006)`);
  } else {
    errors.push('formative.mdx not found');
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
      errors.push('cannot check the reading-minutes band — a unit file is missing or has no numeric `est_reading_minutes`');
    } else if (total < band[0] || total > band[1]) {
      errors.push(`unit-total est_reading_minutes is ${total}, outside the depth-budget band ${band[0]}–${band[1]} reading-min (FR-012d)`);
    }
  }

  return { errors };
}

/** TOPIC / new-shape path (Spec 008 FR-020). Returns `{ errors: string[] }`. */
export function checkTopic({ root, unitDir, courseDir, unitNo, checklistIds, sectionLines, topicFilesOnDisk, topicListRows }) {
  const errors = [];
  const pad = (n) => String(n).padStart(2, '0');

  // (1) topic-file set contiguous from 01 + matches `### Topic list` row count
  const ordinals = topicFilesOnDisk.map((f) => Number(/^topic-(\d{2})\.mdx$/.exec(f)[1]));
  for (let i = 0; i < ordinals.length; i++) {
    if (ordinals[i] !== i + 1) {
      errors.push(`topic files are not contiguous from 01 — expected topic-${pad(i + 1)}.mdx, found topic-${pad(ordinals[i])}.mdx`);
      break;
    }
  }
  if (topicListRows.length !== topicFilesOnDisk.length) {
    errors.push(`\`### Topic list\` has ${topicListRows.length} row(s) but ${topicFilesOnDisk.length} topic-*.mdx file(s) are on disk`);
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
    if (rows.length === 0) errors.push(`checklist sub-topic ${id} is not assigned to any \`### Topic list\` row (partition must be total)`);
    else if (rows.length > 1) errors.push(`checklist sub-topic ${id} is assigned to ${rows.length} \`### Topic list\` rows (partition must be disjoint)`);
  }
  for (const id of assignmentCount.keys()) {
    if (!checklistIds.includes(id)) errors.push(`\`### Topic list\` assigns ${id}, which is not an ID in the \`### Sub-topic checklist\``);
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
        errors.push(`${tf}: missing or out-of-order cycle heading \`${step.name}\` (contract: topic-cycle.md)`);
        orderBroken = true;
        break;
      }
      cursor = found;
    }
    if (orderBroken) continue;

    const cyu = countNumberedInSection(lines, /^##\s+Check your understanding\s*$/);
    if (cyu != null && cyu < 3) errors.push(`${tf}: \`## Check your understanding\` has ${cyu} numbered item(s); at least 3 required`);
    const sac = countChecklistInSection(lines, /^##\s+Self-assessment checklist\s*$/);
    if (sac != null && sac < 3) errors.push(`${tf}: \`## Self-assessment checklist\` has ${sac} \`- [ ]\` item(s); at least 3 required`);
    const fr = countContentLinesInSection(lines, /^##\s+Further reading\s*$/);
    if (fr != null && fr < 1) errors.push(`${tf}: \`## Further reading\` has no citation/link line (at least 1 required)`);
  }

  // (6) index.mdx `## In this unit` count == topic count
  const indexFile = join(unitDir, 'index.mdx');
  const indexLines = matter(readFileSync(indexFile, 'utf8')).content.split(/\r?\n/);
  const inThisUnit = countNumberedInSection(indexLines, /^##\s+In this unit\s*$/);
  if (inThisUnit == null) {
    errors.push('index.mdx is missing the `## In this unit` section');
  } else if (inThisUnit !== topicFilesOnDisk.length) {
    errors.push(`index.mdx \`## In this unit\` lists ${inThisUnit} item(s) but the unit has ${topicFilesOnDisk.length} topic file(s)`);
  }

  // (7) unit-assessment.mdx
  const uaFile = join(unitDir, 'unit-assessment.mdx');
  if (!existsSync(uaFile)) {
    errors.push('unit-assessment.mdx not found (required for a per-topic unit)');
  } else {
    const uaLines = matter(readFileSync(uaFile, 'utf8')).content.split(/\r?\n/);
    if (!uaLines.some((l) => /^##\s+Unit summary\s*$/.test(l.trimEnd()))) {
      errors.push('unit-assessment.mdx is missing the `## Unit summary` section');
    }
    const bands = [
      { name: 'Multiple-choice questions (MCQs)', want: 10, re: /^###\s+Multiple-choice questions \(MCQs\)\s*$/ },
      { name: 'Restricted-response questions (RRQs)', want: 10, re: /^###\s+Restricted-response questions \(RRQs\)\s*$/ },
      { name: 'Extended-response questions (ERQs)', want: 5, re: /^###\s+Extended-response questions \(ERQs\)\s*$/ },
    ];
    for (const b of bands) {
      const n = countNumberedInSection(uaLines, b.re);
      if (n == null) errors.push(`unit-assessment.mdx is missing the \`### ${b.name}\` section`);
      else if (n !== b.want) errors.push(`unit-assessment.mdx \`### ${b.name}\` has ${n} numbered item(s); exactly ${b.want} required`);
    }
    const answersIdx = uaLines
      .map((l, i) => (/^##\s+Answers and marking guidance\s*$/.test(l.trimEnd()) ? i : -1))
      .filter((i) => i !== -1);
    if (answersIdx.length === 0) {
      errors.push('unit-assessment.mdx is missing the final `## Answers and marking guidance` section');
    } else if (answersIdx.length > 1) {
      errors.push(`unit-assessment.mdx has ${answersIdx.length} \`## Answers and marking guidance\` headings; exactly 1 required`);
    } else {
      const k = answersIdx[0];
      for (let i = k + 1; i < uaLines.length; i++) {
        if (/^##\s/.test(uaLines[i])) {
          errors.push('unit-assessment.mdx has a `##` heading after `## Answers and marking guidance` — it must be the final section');
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
  const coverageByKey = new Map();
  const filesReferenced = new Set();
  const topicFilesForId = new Map(); // id -> Set(files)
  if (!coverageRows) {
    errors.push(`no coverage matrix at ${relative(root, coverageFile)}`);
  } else {
    for (const cells of coverageRows) {
      if (/^sub-topic id$/i.test(cells[0]) || /^id$/i.test(cells[0])) continue;
      const [id, file, section, source] = cells;
      if (!/^U\d+-\d+$/.test(id || '')) continue;
      if (!file || !section || !source) {
        errors.push(`coverage row for ${id} has a blank File/Section/Source cell`);
        continue;
      }
      if (!newShapeSet.has(file)) {
        errors.push(`coverage row for ${id} names File "${file}" — must be one of ${[...newShapeSet].join(', ')}`);
      } else {
        filesReferenced.add(file);
      }
      if (!topicFilesForId.has(id)) topicFilesForId.set(id, new Set());
      topicFilesForId.get(id).add(file);
      citedSources.add(source);
      if (!coverageByKey.has(source)) coverageByKey.set(source, new Set());
      if (id) coverageByKey.get(source).add(id);
    }
    for (const id of checklistIds) {
      if (!topicFilesForId.has(id)) errors.push(`checklist sub-topic ${id} has no row in the coverage matrix`);
    }
    for (const tf of topicFilesOnDisk) {
      if (!filesReferenced.has(tf)) errors.push(`${tf} is not referenced as the File of any coverage row (every topic file must teach ≥1 checklist sub-topic)`);
    }
    // coverage ↔ `### Topic list` cross-check (hard failure)
    for (const [id, assignedFile] of assignedFileById) {
      const rowFiles = topicFilesForId.get(id);
      if (rowFiles && !rowFiles.has(assignedFile)) {
        errors.push(`checklist sub-topic ${id} is assigned to ${assignedFile} in the \`### Topic list\` but its coverage row(s) name ${[...rowFiles].join(', ')} instead`);
      }
    }
  }

  // (e) coverage ↔ sources mutual consistency
  const sourcesFile = join(courseDir, 'sources', `unit-${pad(unitNo)}.md`);
  const sourcesRows = readTable(sourcesFile);
  if (!sourcesRows) {
    errors.push(`no sources-consulted list at ${relative(root, sourcesFile)}`);
  } else {
    const keyKind = new Map();
    for (const cells of sourcesRows) {
      if (/^key$/i.test(cells[0])) continue;
      if (cells[0]) keyKind.set(cells[0], (cells[4] || '').toLowerCase());
    }
    for (const s of citedSources) {
      if (!keyKind.has(s)) errors.push(`coverage cites source "${s}" but it is not a Key in the sources-consulted list`);
    }
    for (const [key, kind] of keyKind) {
      if (kind === 'no-external-source') continue;
      if (!citedSources.has(key)) errors.push(`sources-consulted Key "${key}" is not referenced by any coverage row`);
    }
    checkSourceVerifiability({ root, courseDir, sourcesFile, keyKind, errors });
    checkSourceScopeAgreement({ sourcesFile, sourcesRows, coverageByKey, errors });
  }

  // (9) reading-minutes band across the new-shape file set
  const budgetMatch = sectionLines.join('\n').match(/\*\*Depth budget\*\*:[^\n]*?(\d+)\s*[–-]\s*(\d+)\s*reading-min/i);
  if (!budgetMatch) {
    errors.push('its content-spec subsection has no `**Depth budget**: … A–B reading-min` line');
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
      errors.push('cannot check the reading-minutes band — a new-shape file is missing or has no numeric `est_reading_minutes`');
    } else if (total < band[0] || total > band[1]) {
      errors.push(`unit-total est_reading_minutes is ${total}, outside the depth-budget band ${band[0]}–${band[1]} reading-min (FR-016)`);
    }
  }

  return { errors };
}

// ---- orchestration helpers, shared by check-unit-depth.mjs's dispatch and
// report-content-status.mjs (Spec 010 T027, FR-033) — extracted here so
// neither script re-derives "which layout, which files, is this unit even
// in scope" a second time. ------------------------------------------------

/** Lines of the `## Unit <n>` section (until the next `## ` heading, `###` kept). */
export function unitSectionLines(specText, unitNo) {
  const lines = specText.split(/\r?\n/);
  const start = lines.findIndex((l) => new RegExp(`^##\\s+Unit\\s+${unitNo}\\b`).test(l));
  if (start === -1) return null;
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    if (/^##\s+/.test(lines[i]) && !/^###/.test(lines[i])) { end = i; break; }
  }
  return lines.slice(start, end);
}

export function loadContentSpec(contentSpecDir, courseCode) {
  const file = join(contentSpecDir, courseCode.toLowerCase(), 'content-spec.md');
  if (!existsSync(file)) return null;
  return readFileSync(file, 'utf8');
}

export const topicFilesIn = (dir) =>
  existsSync(dir)
    ? readdirSync(dir).filter((n) => /^topic-\d{2}\.mdx$/.test(n)).sort()
    : [];

/** Rows of the `### Topic list` table → [{topic, title, subIds:[...]}]. */
export function parseTopicList(block) {
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

export function detectLayout(topicFilesOnDisk, topicListRows) {
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

/**
 * The full per-unit dispatch (Spec 007/008's out-of-scope rules, layout detection, and
 * the checkLegacy()/checkTopic() verdict above), as ONE reusable function. Returns
 * `{ authored, translationStatus, depthCheck, errors }` — `depthCheck` is
 * `'not_applicable'` for a unit that doesn't exist yet, is `coming_soon`, or doesn't
 * (yet) carry a `### Sub-topic checklist` table (out of scope for the depth standard,
 * same grandfathering `check-unit-depth.mjs` has always applied) - never an error.
 * `check-unit-depth.mjs` converts a non-empty `errors` into `err()` calls exactly as
 * before; `report-content-status.mjs` (FR-033) reads the same fields directly.
 */
export function checkUnitVerdict({ root, contentSpecDir, unitDir, courseCode, unitNo }) {
  const enIndex = join(unitDir, 'index.mdx');
  if (!existsSync(enIndex)) {
    return { authored: false, translationStatus: null, depthCheck: 'not_applicable', errors: [] };
  }
  const enIndexRaw = readFileSync(enIndex, 'utf8');
  const enFm = matter(enIndexRaw).data;
  const translationStatus = enFm.translation_status ?? null;
  if (enFm.coming_soon === true) {
    return { authored: false, translationStatus, depthCheck: 'not_applicable', errors: [] };
  }

  const specText = loadContentSpec(contentSpecDir, courseCode);
  if (!specText) return { authored: true, translationStatus, depthCheck: 'not_applicable', errors: [] };

  const sectionLines = unitSectionLines(specText, unitNo);
  if (!sectionLines) return { authored: true, translationStatus, depthCheck: 'not_applicable', errors: [] };

  const checklistBlock = tableAfterHeading(sectionLines, /^###\s+Sub-topic checklist\b/i);
  if (!checklistBlock) return { authored: true, translationStatus, depthCheck: 'not_applicable', errors: [] };

  const courseDir = join(contentSpecDir, courseCode.toLowerCase());
  const checklistRows = parsePipeTable(checklistBlock).filter(
    (r) => !/^id$/i.test(r[0]) && !/^sub-topic id$/i.test(r[0]),
  );
  const checklistIds = checklistRows.map((r) => r[0]).filter((id) => /^U\d+-\d+$/.test(id));
  if (checklistIds.length === 0) {
    return {
      authored: true,
      translationStatus,
      depthCheck: 'fail',
      errors: ['has a `### Sub-topic checklist` heading but no parseable `U<n>-<seq>` rows'],
    };
  }

  const topicFilesOnDisk = topicFilesIn(unitDir);
  const topicListRows = parseTopicList(tableAfterHeading(sectionLines, /^###\s+Topic list\b/i));
  const { layout, signal } = detectLayout(topicFilesOnDisk, topicListRows);

  let result;
  if (layout === 'legacy') {
    result = checkLegacy({ root, unitDir, courseDir, unitNo, enIndexRaw, checklistIds, sectionLines });
  } else if (signal) {
    result = { errors: [signal] };
  } else {
    result = checkTopic({
      root, unitDir, courseDir, unitNo, checklistIds, sectionLines, topicFilesOnDisk, topicListRows,
    });
  }

  return {
    authored: true,
    translationStatus,
    depthCheck: result.errors.length === 0 ? 'pass' : 'fail',
    errors: result.errors,
  };
}
