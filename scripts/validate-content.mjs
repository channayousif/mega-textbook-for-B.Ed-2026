#!/usr/bin/env node
/**
 * Content validation gate for the Bilingual Content Platform.
 *
 * Implements (tasks.md): T009 base gate, T016 EN<->UR structural parity,
 * T018 glossary-reference check, plus the FR-010 assessment_weighting sum check.
 * Spec 008 (T021): legacy vs per-topic layout branch, checkCourseReview(), and a
 * dynamic EN<->UR parity file set.
 *
 * Blocks publish (non-zero exit) when any rule fails, printing a per-file message
 * naming the file and the offending field/rule (FR-009, SC-007).
 *
 * Pure Node + gray-matter + ajv — runnable standalone in CI before `docusaurus build`.
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { walkCourses, walkUnits } from './lib/content-roots.mjs';
import Ajv from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

// Contracts always resolve from the repo (next to this script); content can be
// pointed elsewhere via CONTENT_ROOT so tests can validate temp fixture trees.
const REPO = resolve(fileURLToPath(new URL('..', import.meta.url)));
const ROOT = process.env.CONTENT_ROOT ? resolve(process.env.CONTENT_ROOT) : REPO;
const DOCS_DIR = join(ROOT, 'docs');
const UR_BASE = join(ROOT, 'i18n', 'ur', 'docusaurus-plugin-content-docs', 'current');
const CONTRACTS = join(REPO, 'contracts');
const GLOSSARY_FILE = join(ROOT, 'glossary.json');

const UNIT_FILES = ['index.mdx', 'activities.mdx', 'formative.mdx', 'summative.mdx', 'teacher-notes.mdx'];
// Spec 008: pooled legacy files may NOT coexist with topic-*.mdx in one folder.
const FORBIDDEN_IN_TOPIC_LAYOUT = ['activities.mdx', 'formative.mdx', 'summative.mdx', 'teacher-notes.mdx'];

const errors = [];
const err = (file, msg) => errors.push(`${relative(ROOT, file)}: ${msg}`);

// ---- schema setup ----------------------------------------------------------
const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);
const loadSchema = (name) => JSON.parse(readFileSync(join(CONTRACTS, name), 'utf8'));
const validateUnit = ajv.compile(loadSchema('unit-frontmatter.schema.json'));
const validateOverview = ajv.compile(loadSchema('course-overview.schema.json'));
const validateCategory = ajv.compile(loadSchema('category.schema.json'));
const validateGlossary = ajv.compile(loadSchema('glossary.schema.json'));
const validateCourseReview = ajv.compile(loadSchema('course-review.schema.json'));

// ---- helpers ---------------------------------------------------------------
const dirs = (p) =>
  existsSync(p) ? readdirSync(p).filter((n) => statSync(join(p, n)).isDirectory()) : [];

const mdxFilesIn = (p) =>
  existsSync(p) ? readdirSync(p).filter((n) => n.endsWith('.mdx')) : [];

const topicFilesIn = (p) =>
  mdxFilesIn(p).filter((n) => /^topic-\d{2}\.mdx$/.test(n)).sort();

const ajvErrors = (v) => (v.errors || []).map((e) => `${e.instancePath || '/'} ${e.message}`).join('; ');

/** Ordered heading-level vector of an MDX body (front-matter and fenced code removed). */
function headingVector(body) {
  const noFences = body.replace(/```[\s\S]*?```/g, '').replace(/~~~[\s\S]*?~~~/g, '');
  const vec = [];
  for (const line of noFences.split('\n')) {
    const m = /^(#{1,6})\s+\S/.exec(line);
    if (m) vec.push(m[1].length);
  }
  return vec;
}

/** All <Glossary term="..."> references used in an MDX body. */
function glossaryRefs(body) {
  const refs = [];
  const re = /<Glossary\s+[^>]*term=["']([^"']+)["']/g;
  let m;
  while ((m = re.exec(body)) !== null) refs.push(m[1]);
  return refs;
}

// ---- glossary (T018) -------------------------------------------------------
let glossaryTerms = new Set();
if (existsSync(GLOSSARY_FILE)) {
  let data;
  try {
    data = JSON.parse(readFileSync(GLOSSARY_FILE, 'utf8'));
  } catch (e) {
    err(GLOSSARY_FILE, `invalid JSON: ${e.message}`);
  }
  if (data !== undefined) {
    if (!validateGlossary(data)) {
      err(GLOSSARY_FILE, `does not match glossary schema: ${ajvErrors(validateGlossary)}`);
    } else {
      glossaryTerms = new Set(data.map((e) => e.term));
    }
  }
}

// ---- per-unit validation ---------------------------------------------------
function checkCategory(dir) {
  const catFile = join(dir, '_category_.json');
  if (!existsSync(catFile)) return;
  try {
    const cat = JSON.parse(readFileSync(catFile, 'utf8'));
    if (!validateCategory(cat)) err(catFile, `invalid _category_.json: ${ajvErrors(validateCategory)}`);
  } catch (e) {
    err(catFile, `invalid JSON: ${e.message}`);
  }
}

function checkOverview(courseDir, courseCode) {
  const ovFile = join(courseDir, 'course-overview.mdx');
  if (!existsSync(ovFile)) return;
  const { data } = matter(readFileSync(ovFile, 'utf8'));
  if (!validateOverview(data)) {
    err(ovFile, `invalid course-overview front-matter: ${ajvErrors(validateOverview)}`);
  } else if (data.course_code && data.course_code !== courseCode) {
    err(ovFile, `course_code '${data.course_code}' does not match folder '${courseCode}'`);
  }
}

/**
 * Spec 008 FR-006: an optional course-level `course-review.mdx` — front matter only
 * (body headings are the human Content gate's concern). Mirrors checkOverview().
 */
function checkCourseReview(courseDir, courseCode) {
  const crFile = join(courseDir, 'course-review.mdx');
  if (!existsSync(crFile)) return;
  const { data } = matter(readFileSync(crFile, 'utf8'));
  if (!validateCourseReview(data)) {
    err(crFile, `invalid course-review front-matter: ${ajvErrors(validateCourseReview)}`);
  } else if (data.course_code && data.course_code !== courseCode) {
    err(crFile, `course_code '${data.course_code}' does not match folder '${courseCode}'`);
  }
}

/**
 * A course is bilingual by default; `bilingual: false` in course-overview.mdx
 * marks an English-only course (e.g. GENG-300 Functional English) exempt from
 * the EN<->UR parity gate (Constitution III.2 carve-out).
 */
function isBilingualCourse(courseDir) {
  const ovFile = join(courseDir, 'course-overview.mdx');
  if (!existsSync(ovFile)) return true;
  const { data } = matter(readFileSync(ovFile, 'utf8'));
  return data.bilingual !== false;
}

/** Per-file front-matter checks shared by both layouts. */
function checkUnitFileFm(file, courseCode, unitNo) {
  const parsed = matter(readFileSync(file, 'utf8'));
  const fm = parsed.data;

  if (!validateUnit(fm)) {
    err(file, `invalid front-matter: ${ajvErrors(validateUnit)}`);
  }
  if (fm.course_code && fm.course_code !== courseCode) {
    err(file, `course_code '${fm.course_code}' != folder '${courseCode}'`);
  }
  if (fm.unit_no != null && Number(fm.unit_no) !== unitNo) {
    err(file, `unit_no ${fm.unit_no} != folder unit-${String(unitNo).padStart(2, '0')}`);
  }
  // Spec 013 FR-014. Without an explicit description Docusaurus falls back to
  // the page's first text node, and every Spec 008 topic file opens with the
  // same "A real classroom situation" heading - so the whole book shipped one
  // identical meta description, in both locales. A `coming_soon` page is
  // noindex and exempt.
  if (!fm.coming_soon) {
    const d = typeof fm.description === 'string' ? fm.description.trim() : '';
    if (!d) {
      err(file, 'missing `description` front matter (Spec 013 FR-014) - one sentence, ~120-160 characters, distinct from every other page');
    } else if (d.length < 60 || d.length > 200) {
      err(file, `description is ${d.length} characters; aim for ~120-160 so search engines show it whole`);
    }
  }

  if (fm.assessment_weighting) {
    const { summative, formative } = fm.assessment_weighting;
    if (Number(summative) + Number(formative) !== 100) {
      err(file, `assessment_weighting must sum to 100 (got ${summative}+${formative})`);
    }
  }
  for (const term of glossaryRefs(parsed.content)) {
    if (!glossaryTerms.has(term)) {
      err(file, `<Glossary term="${term}"> has no matching entry in glossary.json`);
    }
  }
  return fm;
}

/** EN<->UR structural parity for a reviewed unit, over an explicit file list. */
function checkParity(unitDir, urUnitDir, fileList) {
  if (!existsSync(urUnitDir)) {
    err(urUnitDir, `reviewed unit requires an Urdu mirror (parity gate, FR-001)`);
    return;
  }
  for (const f of fileList) {
    const enFile = join(unitDir, f);
    const urFile = join(urUnitDir, f);
    if (!existsSync(enFile)) continue;
    if (!existsSync(urFile)) {
      err(urFile, `reviewed unit missing UR file '${f}' (section-file parity)`);
      continue;
    }
    const enVec = headingVector(matter(readFileSync(enFile, 'utf8')).content);
    const urVec = headingVector(matter(readFileSync(urFile, 'utf8')).content);
    const n = Math.max(enVec.length, urVec.length);
    for (let i = 0; i < n; i++) {
      if (enVec[i] !== urVec[i]) {
        err(urFile, `heading structure diverges from EN at heading #${i + 1} (EN=${enVec[i] ?? '∅'} UR=${urVec[i] ?? '∅'})`);
        break;
      }
    }
  }
}

// ---- LEGACY five-file layout (unchanged) ----------------------------------
function checkUnitLegacy(unitDir, urUnitDir, courseCode, unitNo, bilingual) {
  for (const f of UNIT_FILES) {
    if (!existsSync(join(unitDir, f))) err(join(unitDir, f), `missing required unit file '${f}'`);
  }

  let comingSoon = false;
  let translationStatus = null;

  for (const f of UNIT_FILES) {
    const file = join(unitDir, f);
    if (!existsSync(file)) continue;
    const fm = checkUnitFileFm(file, courseCode, unitNo);
    if (fm.coming_soon === true) comingSoon = true;
    if (f === 'index.mdx') translationStatus = fm.translation_status;
  }

  if (bilingual && !comingSoon && translationStatus === 'reviewed') {
    checkParity(unitDir, urUnitDir, UNIT_FILES);
  }
}

// ---- Spec 008 per-topic layout ------------------------------------------------
function checkUnitTopic(unitDir, urUnitDir, courseCode, unitNo, bilingual, topicFiles) {
  // required files
  for (const f of ['index.mdx', 'unit-assessment.mdx']) {
    if (!existsSync(join(unitDir, f))) err(join(unitDir, f), `per-topic unit missing required file '${f}'`);
  }
  // forbidden pooled legacy files
  for (const f of FORBIDDEN_IN_TOPIC_LAYOUT) {
    if (existsSync(join(unitDir, f))) {
      const hint = f === 'teacher-notes.mdx' ? " — rename to 'unit-teacher-notes.mdx'" : ' — fold it into the topic cycles';
      err(join(unitDir, f), `legacy file '${f}' cannot coexist with topic-*.mdx${hint}`);
    }
  }
  // topic files contiguous from 01
  const ordinals = topicFiles.map((f) => Number(/^topic-(\d{2})\.mdx$/.exec(f)[1]));
  for (let i = 0; i < ordinals.length; i++) {
    if (ordinals[i] !== i + 1) {
      err(join(unitDir, topicFiles[i]), `topic files are not contiguous from 01 — expected topic-${String(i + 1).padStart(2, '0')}.mdx`);
      break;
    }
  }

  // the full new-shape file set that exists
  const fileSet = ['index.mdx', ...topicFiles, 'unit-assessment.mdx'];
  if (existsSync(join(unitDir, 'unit-teacher-notes.mdx'))) fileSet.push('unit-teacher-notes.mdx');

  let comingSoon = false;
  let translationStatus = null;

  for (const f of fileSet) {
    const file = join(unitDir, f);
    if (!existsSync(file)) continue;
    const fm = checkUnitFileFm(file, courseCode, unitNo);
    if (fm.coming_soon === true) comingSoon = true;
    if (f === 'index.mdx') translationStatus = fm.translation_status;

    // topic files: topic_no must equal the filename ordinal; topic_label required
    const tm = /^topic-(\d{2})\.mdx$/.exec(f);
    if (tm) {
      const ord = Number(tm[1]);
      if (fm.topic_no == null || Number(fm.topic_no) !== ord) {
        err(file, `topic_no ${fm.topic_no ?? '(missing)'} != filename ordinal ${ord}`);
      }
      if (!fm.topic_label || String(fm.topic_label).trim() === '') {
        err(file, `topic file is missing a non-empty 'topic_label' front-matter field`);
      }
    }
  }

  // EN<->UR parity over the dynamic union of EN + UR unit-folder .mdx names
  if (bilingual && !comingSoon && translationStatus === 'reviewed') {
    const union = [...new Set([...mdxFilesIn(unitDir), ...mdxFilesIn(urUnitDir)])].sort();
    checkParity(unitDir, urUnitDir, union);
  }
}

function checkUnit(unitDir, urUnitDir, courseCode, unitNo, bilingual) {
  const topicFiles = topicFilesIn(unitDir);
  if (topicFiles.length === 0) {
    checkUnitLegacy(unitDir, urUnitDir, courseCode, unitNo, bilingual);
  } else {
    checkUnitTopic(unitDir, urUnitDir, courseCode, unitNo, bilingual, topicFiles);
  }
}

// ---- walk docs/ ------------------------------------------------------------
function walk() {
  if (!existsSync(DOCS_DIR)) {
    console.error('validate-content: docs/ not found — nothing to validate.');
    return;
  }
  // Feature 015 FR-002: content-roots.mjs is the single definition of where
  // content lives, and urUnitDir comes from the record's track rather than a
  // rebuilt `semester-N` join (FR-006).
  const seenGroups = new Set();
  for (const course of walkCourses(ROOT)) {
    if (!seenGroups.has(course.groupDir)) {
      seenGroups.add(course.groupDir);
      if (course.trackDir) checkCategory(course.groupDir);
    }
    checkCategory(course.courseDir);
    checkOverview(course.courseDir, course.courseCode);
    checkCourseReview(course.courseDir, course.courseCode);
  }

  for (const record of walkUnits(ROOT)) {
    const bilingual = isBilingualCourse(join(record.unitDir, '..'));
    checkCategory(record.unitDir);
    checkUnit(record.unitDir, record.urUnitDir, record.courseCode, record.unitNo, bilingual);
  }
}

walk();

if (errors.length) {
  console.error(`\n✗ Content validation failed with ${errors.length} error(s):\n`);
  for (const e of errors) console.error(`  - ${e}`);
  console.error('');
  process.exit(1);
} else {
  console.log('✓ Content validation passed.');
}
