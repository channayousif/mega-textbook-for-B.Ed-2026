#!/usr/bin/env node
/**
 * Feature 024: the licence-track gate.
 *
 * The licence track is a code-free list of STEDA Part II topics and subtopics
 * under `licence/pedagogy/<heading>/` (specs/024-licence-topic-design). The
 * unit-shaped gates no longer see it (content-roots `shape: 'topic-list'`), so
 * this gate is the whole of its structural contract:
 *
 *  1. Registry closure: every objective in `catalog/licence-objectives.json` has
 *     exactly one page at `<heading dir>/<slug>.mdx`, and every subtopic page is
 *     a registry row. The syllabus is a table of contents; a missing page is a
 *     missing syllabus line.
 *  2. Front matter validates against `contracts/licence-page.schema.json` and
 *     agrees with the registry (heading, objective_id, verbatim objective).
 *  3. Every `degree_links[].path` resolves to an existing file under `docs/`,
 *     and the page body links to it. `onBrokenLinks` is only `warn`, so without
 *     this a renamed degree topic would break the cross-link silently.
 *  4. Depth by coverage: a `covered` page is a summary, capped so it cannot
 *     quietly re-teach the degree unit; `partial` and `authored` pages meet a
 *     floor. Counted on the teaching body only (before `## Practice questions`).
 *  5. Practice: each subtopic has 1-2 `### CRQ` items and a final
 *     `## Answers and marking guidance` with a rubric heading per item. Each
 *     heading's `practice.mdx` has >= 5 CRQs and exactly 1 ERQ, same answers rule.
 *  6. Urdu mirror: when present it must match the English page's kind,
 *     objective, coverage, links and question counts. A missing mirror is a
 *     warning (the site falls back to English with an "untranslated" banner),
 *     unless LICENCE_REQUIRE_UR=1.
 *
 * Status: pages are expected to be missing while the heading agents run.
 * `--allow-missing` downgrades rule 1's "no page" to a warning so the scaffold
 * can merge; CI runs without it once every heading has landed.
 */
import { readFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import Ajv from 'ajv/dist/2020.js';

import { walkLicenceSubtopics, LICENCE_SECTION, TRACKS } from './lib/content-roots.mjs';
import { LIMITS, ANSWERS, PRACTICE, countWords, questionShape } from './lib/licence.mjs';

const REPO = resolve(fileURLToPath(new URL('..', import.meta.url)));
const ROOT = process.env.CONTENT_ROOT ? resolve(process.env.CONTENT_ROOT) : REPO;
const ALLOW_MISSING = process.argv.includes('--allow-missing');
const REQUIRE_UR = process.env.LICENCE_REQUIRE_UR === '1';

const errors = [];
const warnings = [];
const rel = (p) => p.replace(ROOT + '/', '');

const registry = JSON.parse(readFileSync(join(ROOT, 'catalog', 'licence-objectives.json'), 'utf8'));
const schema = JSON.parse(readFileSync(join(REPO, 'contracts', 'licence-page.schema.json'), 'utf8'));
const ajv = new Ajv({ allErrors: true, strict: false });
const validate = ajv.compile(schema);

const headingById = new Map(registry.headings.map((h) => [h.id, h]));
const objectiveByKey = new Map(registry.objectives.map((o) => [`${headingById.get(o.heading).dir}/${o.slug}`, o]));

function resolveDocPath(p) {
  const clean = p.split('#')[0].replace(/\/$/, '');
  const base = join(ROOT, 'docs', clean);
  return [`${base}.mdx`, `${base}.md`, join(base, 'index.mdx'), join(base, 'index.md')].find(existsSync);
}

function checkQuestions(file, shape, kind) {
  const p = rel(file);
  if (!shape.hasAnswers) { errors.push(`${p}: missing "${ANSWERS}" section`); return; }
  if (!shape.answersLast) errors.push(`${p}: "${ANSWERS}" must be the final ## section`);
  if (kind === 'subtopic') {
    if (shape.crq < LIMITS.subtopicMinCrq || shape.crq > LIMITS.subtopicMaxCrq) {
      errors.push(`${p}: has ${shape.crq} "### CRQ" items; a subtopic needs ${LIMITS.subtopicMinCrq}-${LIMITS.subtopicMaxCrq}`);
    }
  } else {
    if (shape.crq < LIMITS.practiceMinCrq) errors.push(`${p}: has ${shape.crq} "### CRQ" items; practice needs >= ${LIMITS.practiceMinCrq}`);
    if (shape.erq !== LIMITS.practiceErq) errors.push(`${p}: has ${shape.erq} "### ERQ" items; practice needs exactly ${LIMITS.practiceErq}`);
  }
  if (shape.crqAnswers < shape.crq) errors.push(`${p}: ${shape.crq} CRQs but ${shape.crqAnswers} "### CRQ" rubric entries under "${ANSWERS}"`);
  if (shape.erqAnswers < shape.erq) errors.push(`${p}: ${shape.erq} ERQs but ${shape.erqAnswers} "### ERQ" rubric entries under "${ANSWERS}"`);
}

function checkPage(page) {
  const p = rel(page.file);
  const { data, content } = matter(readFileSync(page.file, 'utf8'));

  if (!validate(data)) {
    errors.push(`${p}: front matter - ${validate.errors.map((e) => `${e.instancePath || '/'} ${e.message}`).join('; ')}`);
    return null;
  }
  if (data.page_kind !== page.kind) errors.push(`${p}: page_kind "${data.page_kind}" but file name implies "${page.kind}"`);
  if (data.heading !== page.heading) errors.push(`${p}: heading "${data.heading}" but lives under ${page.headingDir}/`);

  const shape = page.kind === 'heading-index' ? null : questionShape(content);

  if (page.kind === 'subtopic') {
    const reg = objectiveByKey.get(`${page.headingDir}/${page.slug}`);
    if (!reg) {
      errors.push(`${p}: no registry row in catalog/licence-objectives.json for ${page.headingDir}/${page.slug}`);
    } else {
      if (data.objective_id !== reg.id) errors.push(`${p}: objective_id ${data.objective_id} but registry says ${reg.id}`);
      if (data.steda_objective !== reg.steda_objective) errors.push(`${p}: steda_objective must be the registry text verbatim: "${reg.steda_objective}"`);
    }
    for (const link of data.degree_links) {
      if (!resolveDocPath(link.path)) errors.push(`${p}: degree_links path ${link.path} does not resolve to a file under docs/`);
      if (!content.includes(`](${link.path}`)) errors.push(`${p}: degree_links path ${link.path} is not linked from the page body`);
    }
    const words = countWords(shape.teachingBody);
    if (data.coverage === 'covered' && words > LIMITS.coveredMaxWords) {
      errors.push(`${p}: coverage "covered" but ${words} teaching words (cap ${LIMITS.coveredMaxWords}); summarise and link, or mark it "partial"`);
    }
    if (data.coverage === 'partial' && words < LIMITS.partialMinWords) {
      errors.push(`${p}: coverage "partial" but ${words} teaching words (floor ${LIMITS.partialMinWords})`);
    }
    if (data.coverage === 'authored' && words < LIMITS.authoredMinWords) {
      errors.push(`${p}: coverage "authored" but ${words} teaching words (floor ${LIMITS.authoredMinWords})`);
    }
    if (!/^## What the test asks/m.test(content)) errors.push(`${p}: missing "## What the test asks" section`);
    if (!content.includes(PRACTICE)) errors.push(`${p}: missing "${PRACTICE}" section`);
    checkQuestions(page.file, shape, 'subtopic');
  }
  if (page.kind === 'practice') checkQuestions(page.file, shape, 'practice');

  return { data, shape };
}

function checkMirror(page, en) {
  const p = rel(page.urFile);
  if (!existsSync(page.urFile)) {
    (REQUIRE_UR ? errors : warnings).push(`${rel(page.file)}: no Urdu mirror at ${p}`);
    return;
  }
  const { data, content } = matter(readFileSync(page.urFile, 'utf8'));
  if (!validate(data)) {
    errors.push(`${p}: front matter - ${validate.errors.map((e) => `${e.instancePath || '/'} ${e.message}`).join('; ')}`);
    return;
  }
  for (const k of ['page_kind', 'heading', 'objective_id', 'coverage']) {
    if (data[k] !== en.data[k]) errors.push(`${p}: ${k} "${data[k]}" differs from English "${en.data[k]}"`);
  }
  const enPaths = (en.data.degree_links || []).map((l) => l.path).join('|');
  const urPaths = (data.degree_links || []).map((l) => l.path).join('|');
  if (enPaths !== urPaths) errors.push(`${p}: degree_links paths differ from the English page`);
  if (en.shape) {
    const ur = questionShape(content);
    if (ur.crq !== en.shape.crq || ur.erq !== en.shape.erq) {
      errors.push(`${p}: ${ur.crq} CRQ / ${ur.erq} ERQ but English has ${en.shape.crq} / ${en.shape.erq}`);
    }
    if (!ur.hasAnswers || !ur.answersLast) errors.push(`${p}: "${ANSWERS}" must be present and final`);
  }
}

// ---- run ---------------------------------------------------------------------
const pages = walkLicenceSubtopics(ROOT);
const seen = new Set();
for (const page of pages) {
  seen.add(`${page.headingDir}/${page.slug}`);
  if (!headingById.has(page.heading) || headingById.get(page.heading).dir !== page.headingDir) {
    errors.push(`${rel(page.file)}: ${page.headingDir}/ is not a heading directory in the registry`);
    continue;
  }
  const en = checkPage(page);
  if (en) checkMirror(page, en);
}

for (const h of registry.headings) {
  if (!seen.has(`${h.dir}/index`)) errors.push(`licence/${LICENCE_SECTION}/${h.dir}/index.mdx: heading index missing`);
  if (!seen.has(`${h.dir}/practice`)) (ALLOW_MISSING ? warnings : errors).push(`licence/${LICENCE_SECTION}/${h.dir}/practice.mdx: practice page missing`);
}
const missing = [...objectiveByKey.entries()].filter(([k]) => !seen.has(k));
for (const [k, o] of missing) {
  (ALLOW_MISSING ? warnings : errors).push(`licence/${LICENCE_SECTION}/${k}.mdx: no page for ${o.id} "${o.steda_objective}"`);
}

// Legacy course-shaped directories left from before Feature 024 (EED-313 until
// its migration lands). Anything else at the licence root is a stray.
const licenceRoot = join(ROOT, TRACKS.find((t) => t.id === 'licence').contentRoot);
const LEGACY = new Set(['eed-313']);
if (existsSync(licenceRoot)) {
  const { readdirSync, statSync } = await import('node:fs');
  for (const n of readdirSync(licenceRoot)) {
    if (!statSync(join(licenceRoot, n)).isDirectory() || n === LICENCE_SECTION) continue;
    if (LEGACY.has(n)) warnings.push(`licence/${n}/: legacy course-shaped directory, pending migration into ${LICENCE_SECTION}/`);
    else errors.push(`licence/${n}/: the licence track holds only ${LICENCE_SECTION}/ (Feature 024); course folders are not allowed`);
  }
}

for (const w of warnings) console.warn(`  ! ${w}`);
if (errors.length) {
  console.error(`\n✗ Licence track: ${errors.length} error(s)\n`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
const subtopics = pages.filter((p) => p.kind === 'subtopic').length;
console.log(`✓ Licence track: ${subtopics}/${registry.objectives.length} objective pages, ${pages.length} pages checked${warnings.length ? `, ${warnings.length} warning(s)` : ''}.`);
