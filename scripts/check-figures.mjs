#!/usr/bin/env node
/**
 * Figure marker ↔ manifest consistency gate (Spec 008, FR-012–FR-014).
 *
 * Runs for **new-shape units only** — a unit folder under docs/ that contains one or more
 * `topic-NN.mdx` files. Legacy five-file units (no `topic-*.mdx`) are skipped, exit 0.
 *
 * For an in-scope unit the gate fails unless (contract: specs/008-rich-unit-pedagogy/contracts/
 * figures-manifest.md):
 *   - every `topic-*.mdx` carries ≥ 1 FIGURE marker;
 *   - every marker id matches `^fig-U<folderUnitNo>-\d+$` and is unique within the unit;
 *   - every marker's prompt has ≥ 10 non-space chars and its alt text is non-empty;
 *   - `specs/content/<course>/figures/unit-NN.md` exists;
 *   - the marker-id set equals the manifest-id set, both directions;
 *   - each manifest row's `Topic` cell equals the `topic_label` of the topic file its marker
 *     sits in;
 *   - no manifest cell is blank and `Status` is one of {prompt-only, generated, placed};
 *   - for a bilingual `translation_status: reviewed` unit, the UR `topic-*.mdx` files carry the
 *     same marker ids as the EN side.
 *
 * Every failure pushes a per-unit message naming the unmet condition and the file (SC-004,
 * SC-008). Pure Node + gray-matter, no new dependency. CONTENT_ROOT points fixture tests at a
 * temp dir (same convention as check-unit-depth.mjs / check-pipeline-gate.mjs).
 */
import { readdirSync, statSync, readFileSync, existsSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const REPO = resolve(fileURLToPath(new URL('..', import.meta.url)));
const ROOT = process.env.CONTENT_ROOT ? resolve(process.env.CONTENT_ROOT) : REPO;
const DOCS_DIR = join(ROOT, 'docs');
const UR_BASE = join(ROOT, 'i18n', 'ur', 'docusaurus-plugin-content-docs', 'current');
const CONTENT_SPEC_DIR = join(ROOT, 'specs', 'content');

const STATUS_ENUM = new Set(['prompt-only', 'generated', 'placed']);
// contract: figures-manifest.md — global, non-greedy prompt/alt capture.
const MARKER_RE = /\{\/\*\s*FIGURE\[(fig-U\d+-\d+)\]:\s*([\s\S]+?);\s*alt:\s*([\s\S]+?)\s*\*\/\}/g;

const errors = [];
const err = (label, msg) => errors.push(`${label}: ${msg}`);

const dirs = (p) =>
  existsSync(p) ? readdirSync(p).filter((n) => statSync(join(p, n)).isDirectory()) : [];

const topicFilesIn = (dir) =>
  existsSync(dir)
    ? readdirSync(dir).filter((n) => /^topic-\d{2}\.mdx$/.test(n)).sort()
    : [];

const norm = (s) => s.replace(/\s+/g, ' ').trim();

/** All FIGURE markers in an MDX body → [{id, prompt, alt}]. */
function markersIn(text) {
  const out = [];
  MARKER_RE.lastIndex = 0;
  let m;
  while ((m = MARKER_RE.exec(text)) !== null) {
    out.push({ id: m[1], prompt: norm(m[2]), alt: norm(m[3]) });
  }
  return out;
}

// ---- pipe-table parser (same shape as check-unit-depth.mjs's parsePipeTable) ----
function parsePipeTable(lines) {
  const rows = [];
  for (const line of lines) {
    if (!line.trim().startsWith('|')) continue;
    const cells = line.split('|').slice(1, -1).map((c) => c.trim());
    if (cells.length < 5) continue; // manifest rows have 5 columns
    if (cells.every((c) => /^:?-{2,}:?$/.test(c) || c === '')) continue; // separator row
    if (/^figure id$/i.test(cells[0])) continue; // header row
    rows.push(cells);
  }
  return rows;
}

function isBilingualCourse(courseDir) {
  const ov = join(courseDir, 'course-overview.mdx');
  if (!existsSync(ov)) return true;
  return matter(readFileSync(ov, 'utf8')).data.bilingual !== false;
}

// ---- per-unit check ----------------------------------------------------------
function checkUnit({ unitDir, courseFolder, courseCode, semester, unitNo }) {
  const enTopics = topicFilesIn(unitDir);
  if (enTopics.length === 0) return; // legacy unit → skip

  const label = `${courseCode} Unit ${unitNo} (${relative(ROOT, unitDir)})`;
  const pad = String(unitNo).padStart(2, '0');

  // topic_label per topic file + marker collection
  const labelByFile = new Map(); // 'topic-01.mdx' -> '1.1'
  const markerFileById = new Map(); // 'fig-U1-1' -> 'topic-01.mdx'
  const markerById = new Map(); // 'fig-U1-1' -> {id, prompt, alt}
  const duplicates = new Set();

  for (const tf of enTopics) {
    const raw = readFileSync(join(unitDir, tf), 'utf8');
    const parsed = matter(raw);
    labelByFile.set(tf, parsed.data.topic_label ?? null);
    const found = markersIn(parsed.content);
    if (found.length === 0) {
      err(label, `topic file ${tf} has no FIGURE marker (at least one required — FR-014)`);
    }
    for (const mk of found) {
      const mUnit = /^fig-U(\d+)-\d+$/.exec(mk.id);
      if (!mUnit || Number(mUnit[1]) !== unitNo) {
        err(label, `figure id "${mk.id}" in ${tf} does not match ^fig-U${unitNo}-<seq>$ (folder unit number)`);
      }
      if (mk.prompt.replace(/\s/g, '').length < 10) {
        err(label, `figure "${mk.id}" in ${tf} has a prompt shorter than 10 non-space characters`);
      }
      if (!mk.alt) {
        err(label, `figure "${mk.id}" in ${tf} has empty alt text (Constitution Art. III.8)`);
      }
      if (markerById.has(mk.id)) {
        duplicates.add(mk.id);
        err(label, `figure id "${mk.id}" is used in both ${markerFileById.get(mk.id)} and ${tf} — ids must be unique within the unit`);
      } else {
        markerById.set(mk.id, mk);
        markerFileById.set(mk.id, tf);
      }
    }
  }

  // manifest
  const manifestFile = join(
    CONTENT_SPEC_DIR, courseCode.toLowerCase(), 'figures', `unit-${pad}.md`,
  );
  if (!existsSync(manifestFile)) {
    err(label, `no figure manifest at specs/content/${courseCode.toLowerCase()}/figures/unit-${pad}.md`);
    return;
  }
  const manifestRows = parsePipeTable(readFileSync(manifestFile, 'utf8').split(/\r?\n/));
  const manifestById = new Map();
  for (const cells of manifestRows) {
    const [id, topic, prompt, alt, status] = cells;
    if (!id || !topic || !prompt || !alt || !status) {
      err(label, `figure manifest row "${(cells.join(' | ') || '').slice(0, 60)}" has a blank cell`);
      continue;
    }
    if (!/^fig-U\d+-\d+$/.test(id)) {
      err(label, `figure manifest row id "${id}" is malformed (want ^fig-U<n>-<seq>$)`);
      continue;
    }
    if (!STATUS_ENUM.has(status)) {
      err(label, `figure "${id}" manifest Status "${status}" not in {prompt-only, generated, placed}`);
    }
    manifestById.set(id, { topic, prompt: norm(prompt), alt: norm(alt) });
  }

  // marker set == manifest set (both ways)
  for (const id of markerById.keys()) {
    if (!manifestById.has(id)) {
      err(label, `figure "${id}" appears as a marker but has no row in the manifest`);
    }
  }
  for (const id of manifestById.keys()) {
    if (!markerById.has(id)) {
      err(label, `figure "${id}" is in the manifest but no topic file carries that marker`);
    }
  }

  // each manifest row's Topic == the topic_label of the file its marker sits in
  for (const [id, row] of manifestById) {
    const file = markerFileById.get(id);
    if (!file) continue; // already flagged above
    const expected = labelByFile.get(file);
    if (expected == null) {
      err(label, `topic file ${file} has no topic_label front matter — cannot verify manifest Topic for "${id}"`);
    } else if (String(row.topic) !== String(expected)) {
      err(label, `figure "${id}" manifest Topic "${row.topic}" != topic_label "${expected}" of ${file}`);
    }
  }

  // bilingual reviewed → UR topic files carry the same marker ids
  const courseDir = join(DOCS_DIR, `semester-${semester}`, courseFolder);
  const enIndex = join(unitDir, 'index.mdx');
  const translationStatus = existsSync(enIndex)
    ? matter(readFileSync(enIndex, 'utf8')).data.translation_status
    : null;
  if (isBilingualCourse(courseDir) && translationStatus === 'reviewed') {
    const urDir = join(UR_BASE, `semester-${semester}`, courseFolder, `unit-${pad}`);
    const urIds = new Set();
    for (const tf of topicFilesIn(urDir)) {
      for (const mk of markersIn(matter(readFileSync(join(urDir, tf), 'utf8')).content)) {
        urIds.add(mk.id);
      }
    }
    for (const id of markerById.keys()) {
      if (duplicates.has(id)) continue;
      if (!urIds.has(id)) {
        err(label, `reviewed bilingual unit: figure "${id}" is missing from the Urdu topic files`);
      }
    }
  }
}

// ---- walk docs/ ------------------------------------------------------------
function walk() {
  if (!existsSync(DOCS_DIR)) {
    console.error('check-figures: docs/ not found — nothing to check.');
    return;
  }
  for (const sem of dirs(DOCS_DIR)) {
    const semMatch = /^semester-(\d+)$/.exec(sem);
    if (!semMatch) continue;
    const semester = Number(semMatch[1]);
    const semDir = join(DOCS_DIR, sem);
    for (const course of dirs(semDir)) {
      const courseDir = join(semDir, course);
      const courseCode = course.toUpperCase();
      for (const unit of dirs(courseDir)) {
        const m = /^unit-(\d+)$/.exec(unit);
        if (!m) continue;
        checkUnit({
          unitDir: join(courseDir, unit),
          courseFolder: course,
          courseCode,
          semester,
          unitNo: Number(m[1]),
        });
      }
    }
  }
}

walk();

if (errors.length) {
  console.error(`\n✗ Figure gate failed with ${errors.length} finding(s):\n`);
  for (const e of errors) console.error(`  - ${e}`);
  console.error('');
  process.exit(1);
} else {
  console.log('✓ Figure gate passed (markers present, well-formed, unique; manifest consistent).');
}
