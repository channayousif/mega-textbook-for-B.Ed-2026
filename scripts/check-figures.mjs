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
 *   - every `topic-*.mdx` carries ≥ 2 figures (marker or <Figure>) — Constitution III.10
 *     (Spec 012); was ≥ 1 under Specs 008/009;
 *   - every carrier id matches `^fig-U<folderUnitNo>-\d+$` and is unique within the unit;
 *   - a comment marker's prompt ≥ 10 non-space chars; every carrier's alt is non-empty;
 *   - the manifest exists;
 *   - carrier-id set == manifest-id set, both directions;
 *   - each manifest row's `Topic` == the `topic_label` of the file its carrier sits in;
 *   - `Status ∈ {prompt-only, generated, placed}`;
 *   - for a `translation_status: reviewed` bilingual unit, every EN carrier id also has an
 *     Urdu carrier.
 *
 * Spec 012 (visual density, Constitution III.10) — once any manifest row in the unit carries a
 * `Kind` (i.e. archetypes have been assigned; a fully unplanned all-`prompt-only` manifest keeps
 * the Spec 008/009 behaviour byte-for-byte):
 *   - every manifest row has a `Kind` in the six-value archetype set;
 *   - at least one row's `Kind` is a schematic — `concept-map`, `flowchart`, or `timeline`.
 *
 * Additionally, per manifest row (Spec 009, Kind vocabulary widened by Spec 012):
 *   - `prompt-only` — `Src` cell blank; `Kind` cell blank OR a valid planned archetype.
 *   - `generated` / `placed` — `Kind ∈ {table, concept-map, flowchart, timeline, diagram, illustration}`; `Src` non-blank.
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
import { parseManifest, STATUS_ENUM, KIND_ENUM, SCHEMATIC_ARCHETYPES } from './lib/figure-manifest.mjs';
import {
  LIGHT_TOKENS, DARK_TOKENS, rootBlock, WORDMARK_TEXT, SVG_BUDGET, PALETTE_EXEMPT,
} from './lib/figure-palette.mjs';

const KIND_LIST = [...KIND_ENUM].join(', ');

const REPO = resolve(fileURLToPath(new URL('..', import.meta.url)));
const ROOT = process.env.CONTENT_ROOT ? resolve(process.env.CONTENT_ROOT) : REPO;
const DOCS_DIR = join(ROOT, 'docs');
const STATIC_DIR = join(ROOT, 'static');
const UR_BASE = join(ROOT, 'i18n', 'ur', 'docusaurus-plugin-content-docs', 'current');
const CONTENT_SPEC_DIR = join(ROOT, 'specs', 'content');

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
    if (found.length < 2) {
      err(label, `topic file ${tf} carries ${found.length} figure(s) — Constitution III.10 requires at least 2 (a FIGURE marker or a <Figure>)`);
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

    // --- Spec 009 per-Status cells (Kind vocabulary widened by Spec 012) ---
    if (r.status === 'prompt-only') {
      if (r.hasSrcCol && r.src) err(label, `figure "${r.id}" is prompt-only but its Src cell is not blank ("${r.src}")`);
      // Spec 012: a prompt-only row MAY carry its planned archetype; if present it must be valid.
      if (r.hasKindCol && r.kind && !KIND_ENUM.has(r.kind)) {
        err(label, `figure "${r.id}" Kind "${r.kind}" not in {${KIND_LIST}}`);
      }
    } else if (r.status === 'generated' || r.status === 'placed') {
      if (!r.hasKindCol) {
        err(label, `figure "${r.id}" is ${r.status} but the manifest has no Kind column (needs the v2 header)`);
      } else if (!KIND_ENUM.has(r.kind)) {
        err(label, `figure "${r.id}" Kind "${r.kind || '(blank)'}" not in {${KIND_LIST}}`);
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

  // --- Spec 012 (Constitution III.10): archetype completeness + a schematic per unit ---
  // Applies once archetypes have been assigned (any row carries a Kind). A fully unplanned
  // all-prompt-only manifest with no Kind cells keeps the Spec 008/009 behaviour unchanged.
  const kindedRows = [...manifestById.values()].filter((r) => r.kind);
  if (kindedRows.length > 0) {
    // Once any figure is classified, every rendered figure (generated/placed) needs an
    // archetype too; a row still at prompt-only MAY leave Kind blank (it is still just a plan).
    for (const [id, r] of manifestById) {
      if (!r.kind && r.status !== 'prompt-only') {
        err(label, `figure "${id}" is ${r.status} but has no Kind/archetype — one of {${KIND_LIST}}`);
      }
    }
    const kinds = kindedRows.map((r) => r.kind);
    if (!kinds.some((k) => SCHEMATIC_ARCHETYPES.has(k))) {
      err(label, `unit has no concept-map / flowchart / timeline figure — Constitution III.10 requires at least one schematic per unit (archetypes found: ${[...new Set(kinds)].join(', ')})`);
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
      const rel = r.src.replace(/^\/+/, '');
      const assetPath = join(STATIC_DIR, rel);
      if (!existsSync(assetPath)) {
        err(label, `figure "${id}" is placed but its Src file does not exist: static${r.src}`);
      } else if (rel.endsWith('.svg')) {
        lintSvg(label, id, assetPath, `static/${rel}`, { dark: false });
        // Spec 013 D3: the dark variant is derived, so a stale one is a real
        // defect - it would render yesterday's figure to every dark-mode reader.
        const darkRel = rel.replace(/\.svg$/, '.dark.svg');
        const darkPath = join(STATIC_DIR, darkRel);
        if (!existsSync(darkPath)) {
          err(label, `figure "${id}" has no dark variant static/${darkRel} - run: npm run figures:variants`);
        } else {
          lintSvg(label, id, darkPath, `static/${darkRel}`, { dark: true });
          const light = readFileSync(assetPath, 'utf8');
          const expectedDark = light.split(rootBlock(LIGHT_TOKENS)).join(rootBlock(DARK_TOKENS));
          if (readFileSync(darkPath, 'utf8') !== expectedDark) {
            err(label, `figure "${id}": static/${darkRel} is stale - run: npm run figures:variants`);
          }
        }
      }
    }
    if (reviewedBilingual && enFile) {
      const urFile = join(urDir, enFile);
      if (!figureIdsInFile(urFile).has(id)) {
        err(label, `figure "${id}" is placed but the Urdu topic file ${relative(ROOT, urFile)} has no <Figure id="${id}">`);
      }
      // Spec 013 D5. This used to read `r.kind === 'diagram'`, so the check
      // fired for only 2 of the 8 placed figures - a table, concept map,
      // flowchart or timeline could lose its Urdu variant and CI stayed green
      // (Art. III.2 parity hole). The real invariant is the asset: an SVG
      // carries text labels and must be localised; a raster is reused with a
      // translated alt.
      if (r.hasSrcCol && r.src && r.src.endsWith('.svg')) {
        const urSvg = join(STATIC_DIR, r.src.replace(/^\/+/, '').replace(/\.svg$/, '.ur.svg'));
        if (!existsSync(urSvg)) {
          err(label, `figure "${id}" is a placed SVG in a reviewed unit but the translated static/${relative(STATIC_DIR, urSvg)} does not exist`);
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


// ---- Spec 013: read the committed SVG bytes --------------------------------
/**
 * Until Spec 013 this gate never opened a figure - its only contact with the
 * asset was existsSync(), so it could not tell a real diagram from a zero-byte
 * file with the right name. Every rule below is therefore a rule that was
 * previously "documented" and unenforced.
 */
const EM_DASHES = /[—―⸺⸻]/;
const COLOUR_LITERAL = /#[0-9a-fA-F]{3,8}\b|\brgba?\(|\bhsla?\(/g;

function lintSvg(label, id, absPath, relPath, { dark }) {
  const svg = readFileSync(absPath, 'utf8');
  const bytes = Buffer.byteLength(svg);

  if (bytes > SVG_BUDGET) {
    err(label, `figure "${id}": ${relPath} is ${(bytes / 1024).toFixed(1)} KB, over the ${SVG_BUDGET / 1024} KB budget`);
  }

  const root = /<svg\b[^>]*>/.exec(svg);
  if (!root) { err(label, `figure "${id}": ${relPath} has no <svg> root`); return; }
  if (!/viewBox="0 0 \d+(?:\.\d+)? \d+(?:\.\d+)?"/.test(root[0])) {
    err(label, `figure "${id}": ${relPath} needs viewBox="0 0 W H"`);
  }
  if (/\swidth="/.test(root[0]) || /\sheight="/.test(root[0])) {
    err(label, `figure "${id}": ${relPath} must not set width/height on <svg> (the page scales it)`);
  }
  if (!/role="img"/.test(root[0])) err(label, `figure "${id}": ${relPath} is missing role="img"`);

  const title = /<title\b[^>]*>([\s\S]*?)<\/title>/.exec(svg);
  const desc = /<desc\b[^>]*>([\s\S]*?)<\/desc>/.exec(svg);
  if (!title || !title[1].trim()) err(label, `figure "${id}": ${relPath} needs a non-empty <title>`);
  if (!desc || !desc[1].trim()) err(label, `figure "${id}": ${relPath} needs a non-empty <desc>`);

  // Art. III.9 - check-no-em-dash.mjs scans docs/guides/i18n/specs, never
  // static/, so figure labels were the one authored surface with no em-dash
  // gate. Scoped to text nodes so a path `d` attribute can never trip it.
  for (const m of svg.matchAll(/<(?:text|tspan|title|desc)\b[^>]*>([\s\S]*?)<\/(?:text|tspan|title|desc)>/g)) {
    if (EM_DASHES.test(m[1])) {
      err(label, `figure "${id}": ${relPath} has an em dash in a text node (Art. III.9) - use " - "`);
      break;
    }
  }

  if (/<script\b/i.test(svg) || /<foreignObject\b/i.test(svg)) {
    err(label, `figure "${id}": ${relPath} must not contain <script> or <foreignObject>`);
  }
  if (/(?:href|src)\s*=\s*["']https?:/i.test(svg) || /url\(\s*['"]?https?:/i.test(svg) || /@import/.test(svg)) {
    err(label, `figure "${id}": ${relPath} must not reference anything external (figures are self-contained)`);
  }

  // Branding (FR-007). The wordmark is decoration: aria-hidden, and never in
  // <desc>, which must describe the teaching content alone.
  const marks = [...svg.matchAll(new RegExp(`<text\\b[^>]*>\\s*${WORDMARK_TEXT.replace(/\./g, '\\.')}\\s*</text>`, 'g'))];
  if (marks.length !== 1) {
    err(label, `figure "${id}": ${relPath} must carry exactly one "${WORDMARK_TEXT}" wordmark (found ${marks.length})`);
  } else if (!/aria-hidden="true"/.test(marks[0][0])) {
    err(label, `figure "${id}": ${relPath} wordmark must be aria-hidden="true"`);
  }
  if (desc && desc[1].includes(WORDMARK_TEXT)) {
    err(label, `figure "${id}": ${relPath} must not name the wordmark in <desc>`);
  }

  // Palette (FR-004). Colour lives in ONE :root{} block that must match the
  // published tokens byte for byte; everywhere else uses var(). That makes this
  // an exact compare rather than a colour-distance guess, so it cannot
  // false-positive on a legitimate shade.
  if (PALETTE_EXEMPT.has(id)) return;
  const expected = rootBlock(dark ? DARK_TOKENS : LIGHT_TOKENS);
  if (!svg.includes(expected)) {
    err(label, `figure "${id}": ${relPath} does not carry the published ${dark ? 'dark' : 'light'} :root token block (regenerate or re-author against scripts/lib/figure-palette.mjs)`);
    return;
  }
  const outside = svg.split(expected).join('');
  const stray = [...outside.matchAll(COLOUR_LITERAL)].map((m) => m[0]);
  if (stray.length) {
    err(label, `figure "${id}": ${relPath} has colour literal(s) outside the :root block: ${[...new Set(stray)].slice(0, 4).join(', ')} - use var(--token)`);
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
  console.log('✓ Figure gate passed (≥ 2 carriers per topic, schematic per unit, well-formed, unique; manifest consistent; placed assets exist).');
}
