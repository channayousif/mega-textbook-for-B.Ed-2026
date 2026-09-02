#!/usr/bin/env node
/**
 * Figure gate (Spec 008 markers + Spec 009 rendering).
 *
 * Runs for **new-shape units only** — a unit folder under docs/ with ≥ 1 `topic-NN.mdx`.
 * Legacy five-file units are skipped, exit 0.
 *
 * A figure's **carrier** in a topic file is either:
 *   - a Spec 008 comment marker  (an MDX comment holding FIGURE[id], a prompt and alt), or
 *   - a Spec 009 rendered element `<Figure id="fig-U<n>-<seq>" src="/img/…" alt="<alt>" />`.
 *
 * Manifest: `specs/content/<course>/figures/unit-NN.md`. Spec 008 v1 columns
 *   `| Figure ID | Topic | Prompt | Alt text | Status |`
 * or Spec 009 v2 columns
 *   `| Figure ID | Topic | Kind | Prompt | Alt text | Src | Status |`.
 * The parse is column-aware (reads the header row).
 *
 * Always checked (both specs):
 *   - every `topic-*.mdx` carries ≥ 1 figure (marker or <Figure>);
 *   - every carrier id matches `^fig-U<folderUnitNo>-\d+$` and is unique within the unit;
 *   - a comment marker's prompt ≥ 10 non-space chars; every carrier's alt is non-empty;
 *   - the manifest exists;
 *   - carrier-id set == manifest-id set, both directions;
 *   - each manifest row's `Topic` == the `topic_label` of the file its carrier sits in;
 *   - `Status ∈ {prompt-only, generated, placed}`;
 *   - for a `translation_status: reviewed` bilingual unit, every EN carrier id also has an
 *     Urdu carrier.
 *
 * Additionally, per manifest row (Spec 009):
 *   - `prompt-only` — `Src` cell blank; `Kind` cell blank; exactly the Spec 008 behaviour.
 *   - `generated` / `placed` — `Kind ∈ {diagram, illustration}`; `Src` non-blank.
 *   - `placed` — the `Src` file exists under `static/`; the EN carrier is a `<Figure>` (not a
 *     bare comment); for a `reviewed` bilingual unit the UR topic file has a `<Figure>` for the
 *     id and, when `Kind: diagram`, `<figId>.ur.svg` exists under `static/`.
 *
 * Pure Node + gray-matter, no new dependency. CONTENT_ROOT points fixture tests at a temp dir.
 */
import { readdirSync, statSync, readFileSync, existsSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const REPO = resolve(fileURLToPath(new URL('..', import.meta.url)));
const ROOT = process.env.CONTENT_ROOT ? resolve(process.env.CONTENT_ROOT) : REPO;
const DOCS_DIR = join(ROOT, 'docs');
const STATIC_DIR = join(ROOT, 'static');
const UR_BASE = join(ROOT, 'i18n', 'ur', 'docusaurus-plugin-content-docs', 'current');
const CONTENT_SPEC_DIR = join(ROOT, 'specs', 'content');

const STATUS_ENUM = new Set(['prompt-only', 'generated', 'placed']);
const KIND_ENUM = new Set(['diagram', 'illustration']);
// contract: figures-manifest.md — global, non-greedy prompt/alt capture.
const MARKER_RE = /\{\/\*\s*FIGURE\[(fig-U\d+-\d+)\]:\s*([\s\S]+?);\s*alt:\s*([\s\S]+?)\s*\*\/\}/g;
// Spec 009 — a rendered <Figure ... /> (self-closing or not). Capture the whole open tag.
const FIGURE_TAG_RE = /<Figure\b([^>]*?)\/?>/g;

const errors = [];
const err = (label, msg) => errors.push(`${label}: ${msg}`);

const dirs = (p) =>
  existsSync(p) ? readdirSync(p).filter((n) => statSync(join(p, n)).isDirectory()) : [];

const topicFilesIn = (dir) =>
  existsSync(dir)
    ? readdirSync(dir).filter((n) => /^topic-\d{2}\.mdx$/.test(n)).sort()
    : [];

const norm = (s) => s.replace(/\s+/g, ' ').trim();
const attr = (tagInner, name) => {
  const m = new RegExp(`\\b${name}=(?:"([^"]*)"|'([^']*)')`).exec(tagInner);
  return m ? (m[1] ?? m[2]) : null;
};

/**
 * All figure carriers in an MDX body → [{id, alt, prompt|null, form: 'comment'|'figure'}].
 */
function carriersIn(text) {
  const out = [];
  MARKER_RE.lastIndex = 0;
  let m;
  while ((m = MARKER_RE.exec(text)) !== null) {
    out.push({ id: m[1], prompt: norm(m[2]), alt: norm(m[3]), form: 'comment' });
  }
  FIGURE_TAG_RE.lastIndex = 0;
  while ((m = FIGURE_TAG_RE.exec(text)) !== null) {
    const id = attr(m[1], 'id');
    if (!id) continue;
    out.push({ id, prompt: null, alt: norm(attr(m[1], 'alt') || ''), form: 'figure' });
  }
  return out;
}

/** ids of every <Figure>/marker carrier across a directory's topic-*.mdx. */
function carrierIdsIn(dir) {
  const ids = new Set();
  for (const tf of topicFilesIn(dir)) {
    for (const c of carriersIn(matter(readFileSync(join(dir, tf), 'utf8')).content)) ids.add(c.id);
  }
  return ids;
}

/** ids of <Figure> elements (only) in one file. */
function figureIdsInFile(file) {
  if (!existsSync(file)) return new Set();
  const ids = new Set();
  for (const c of carriersIn(matter(readFileSync(file, 'utf8')).content)) {
    if (c.form === 'figure') ids.add(c.id);
  }
  return ids;
}

// ---- column-aware manifest table parse -------------------------------------
function parseManifest(text) {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().startsWith('|'));
  let header = null;
  const rows = [];
  for (const line of lines) {
    const cells = line.split('|').slice(1, -1).map((c) => c.trim());
    if (cells.every((c) => /^:?-{2,}:?$/.test(c) || c === '')) continue; // separator
    if (!header) {
      if (/^figure id$/i.test(cells[0])) { header = cells.map((c) => c.toLowerCase()); }
      continue;
    }
    rows.push(cells);
  }
  if (!header) return null;
  const ix = (name) => header.indexOf(name);
  const iId = ix('figure id');
  const iTopic = ix('topic');
  const iKind = ix('kind'); // -1 for v1
  const iPrompt = ix('prompt');
  const iAlt = ix('alt text');
  const iSrc = ix('src'); // -1 for v1
  const iStatus = ix('status');
  const out = [];
  for (const cells of rows) {
    if (cells.length < header.length - 1) continue; // malformed short row
    out.push({
      id: cells[iId] ?? '',
      topic: cells[iTopic] ?? '',
      kind: iKind >= 0 ? (cells[iKind] ?? '') : '',
      prompt: cells[iPrompt] ?? '',
      alt: cells[iAlt] ?? '',
      src: iSrc >= 0 ? (cells[iSrc] ?? '') : '',
      status: cells[iStatus] ?? '',
      hasKindCol: iKind >= 0,
      hasSrcCol: iSrc >= 0,
    });
  }
  return out;
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

  const labelByFile = new Map(); // 'topic-01.mdx' -> '1.1'
  const carrierFileById = new Map(); // 'fig-U1-1' -> 'topic-01.mdx'
  const carrierById = new Map(); // 'fig-U1-1' -> {id, alt, prompt, form}
  const duplicates = new Set();

  for (const tf of enTopics) {
    const parsed = matter(readFileSync(join(unitDir, tf), 'utf8'));
    labelByFile.set(tf, parsed.data.topic_label ?? null);
    const found = carriersIn(parsed.content);
    if (found.length === 0) {
      err(label, `topic file ${tf} carries no figure — a FIGURE marker or a <Figure> is required`);
    }
    for (const c of found) {
      const mUnit = /^fig-U(\d+)-\d+$/.exec(c.id);
      if (!mUnit || Number(mUnit[1]) !== unitNo) {
        err(label, `figure id "${c.id}" in ${tf} does not match ^fig-U${unitNo}-<seq>$ (folder unit number)`);
      }
      if (c.form === 'comment' && c.prompt.replace(/\s/g, '').length < 10) {
        err(label, `figure "${c.id}" in ${tf} has a marker prompt shorter than 10 non-space characters`);
      }
      if (!c.alt) {
        err(label, `figure "${c.id}" in ${tf} has empty alt text (Constitution Art. III.8)`);
      }
      if (carrierById.has(c.id)) {
        duplicates.add(c.id);
        err(label, `figure id "${c.id}" is carried by both ${carrierFileById.get(c.id)} and ${tf} — ids must be unique within the unit`);
      } else {
        carrierById.set(c.id, c);
        carrierFileById.set(c.id, tf);
      }
    }
  }

  // manifest
  const manifestFile = join(CONTENT_SPEC_DIR, courseCode.toLowerCase(), 'figures', `unit-${pad}.md`);
  if (!existsSync(manifestFile)) {
    err(label, `no figure manifest at specs/content/${courseCode.toLowerCase()}/figures/unit-${pad}.md`);
    return;
  }
  const rows = parseManifest(readFileSync(manifestFile, 'utf8'));
  if (!rows) {
    err(label, `figure manifest has no parseable table header (want "| Figure ID | Topic | … | Status |")`);
    return;
  }

  const manifestById = new Map();
  for (const r of rows) {
    if (!r.id || !r.topic || !r.prompt || !r.alt || !r.status) {
      err(label, `figure manifest row "${r.id || '(no id)'}" has a blank Figure ID / Topic / Prompt / Alt text / Status cell`);
      continue;
    }
    if (!/^fig-U\d+-\d+$/.test(r.id)) {
      err(label, `figure manifest row id "${r.id}" is malformed (want ^fig-U<n>-<seq>$)`);
      continue;
    }
    if (!STATUS_ENUM.has(r.status)) {
      err(label, `figure "${r.id}" manifest Status "${r.status}" not in {prompt-only, generated, placed}`);
    }
    manifestById.set(r.id, r);

    // --- Spec 009 per-Status cells ---
    if (r.status === 'prompt-only') {
      if (r.hasSrcCol && r.src) err(label, `figure "${r.id}" is prompt-only but its Src cell is not blank ("${r.src}")`);
      if (r.hasKindCol && r.kind) err(label, `figure "${r.id}" is prompt-only but its Kind cell is not blank ("${r.kind}")`);
    } else if (r.status === 'generated' || r.status === 'placed') {
      if (!r.hasKindCol) {
        err(label, `figure "${r.id}" is ${r.status} but the manifest has no Kind column (needs the v2 header)`);
      } else if (!KIND_ENUM.has(r.kind)) {
        err(label, `figure "${r.id}" Kind "${r.kind || '(blank)'}" not in {diagram, illustration}`);
      }
      if (!r.hasSrcCol || !r.src) {
        err(label, `figure "${r.id}" is ${r.status} but its Src cell is blank`);
      }
    }
  }

  // carrier set == manifest set (both ways)
  for (const id of carrierById.keys()) {
    if (!manifestById.has(id)) err(label, `figure "${id}" is carried in a topic file but has no row in the manifest`);
  }
  for (const id of manifestById.keys()) {
    if (!carrierById.has(id)) err(label, `figure "${id}" is in the manifest but no topic file carries it`);
  }

  // manifest Topic == the topic_label of the carrier file
  for (const [id, r] of manifestById) {
    const file = carrierFileById.get(id);
    if (!file) continue;
    const expected = labelByFile.get(file);
    if (expected == null) {
      err(label, `topic file ${file} has no topic_label front matter — cannot verify manifest Topic for "${id}"`);
    } else if (String(r.topic) !== String(expected)) {
      err(label, `figure "${id}" manifest Topic "${r.topic}" != topic_label "${expected}" of ${file}`);
    }
  }

  // --- Spec 009: placed-row asset + carrier-form + bilingual checks ---
  const courseDir = join(DOCS_DIR, `semester-${semester}`, courseFolder);
  const enIndex = join(unitDir, 'index.mdx');
  const translationStatus = existsSync(enIndex)
    ? matter(readFileSync(enIndex, 'utf8')).data.translation_status
    : null;
  const reviewedBilingual = isBilingualCourse(courseDir) && translationStatus === 'reviewed';
  const urDir = join(UR_BASE, `semester-${semester}`, courseFolder, `unit-${pad}`);

  for (const [id, r] of manifestById) {
    if (r.status !== 'placed') continue;
    const enFile = carrierFileById.get(id);
    const enCarrier = carrierById.get(id);

    if (enCarrier && enCarrier.form !== 'figure') {
      err(label, `figure "${id}" is placed but ${enFile} still carries the comment marker, not a rendered <Figure>`);
    }
    if (r.hasSrcCol && r.src) {
      const assetPath = join(STATIC_DIR, r.src.replace(/^\/+/, ''));
      if (!existsSync(assetPath)) {
        err(label, `figure "${id}" is placed but its Src file does not exist: static${r.src}`);
      }
    }
    if (reviewedBilingual && enFile) {
      const urFile = join(urDir, enFile);
      if (!figureIdsInFile(urFile).has(id)) {
        err(label, `figure "${id}" is placed but the Urdu topic file ${relative(ROOT, urFile)} has no <Figure id="${id}">`);
      }
      if (r.kind === 'diagram' && r.hasSrcCol && r.src) {
        const urSvg = join(STATIC_DIR, r.src.replace(/^\/+/, '').replace(/\.svg$/, '.ur.svg'));
        if (!existsSync(urSvg)) {
          err(label, `figure "${id}" is a placed diagram in a reviewed unit but the translated static/${relative(STATIC_DIR, urSvg)} does not exist`);
        }
      }
    }
  }

  // bilingual reviewed → every EN carrier id also has a UR carrier (Spec 008, generalised)
  if (reviewedBilingual) {
    const urIds = carrierIdsIn(urDir);
    for (const id of carrierById.keys()) {
      if (duplicates.has(id)) continue;
      if (!urIds.has(id)) err(label, `reviewed bilingual unit: figure "${id}" is missing from the Urdu topic files`);
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
  console.log('✓ Figure gate passed (carriers present, well-formed, unique; manifest consistent; placed assets exist).');
}
