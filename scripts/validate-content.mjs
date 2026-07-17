#!/usr/bin/env node
/**
 * Content validation gate for the Bilingual Content Platform.
 *
 * Implements (tasks.md): T009 base gate, T016 EN<->UR structural parity,
 * T018 glossary-reference check, plus the FR-010 assessment_weighting sum check.
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

// ---- helpers ---------------------------------------------------------------
const dirs = (p) =>
  existsSync(p) ? readdirSync(p).filter((n) => statSync(join(p, n)).isDirectory()) : [];

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

function checkUnit(unitDir, semester, courseFolder, courseCode, unitNo) {
  // Five-file structural rule
  for (const f of UNIT_FILES) {
    if (!existsSync(join(unitDir, f))) err(join(unitDir, f), `missing required unit file '${f}'`);
  }

  let comingSoon = false;
  let translationStatus = null;

  for (const f of UNIT_FILES) {
    const file = join(unitDir, f);
    if (!existsSync(file)) continue;
    const parsed = matter(readFileSync(file, 'utf8'));
    const fm = parsed.data;

    if (!validateUnit(fm)) {
      err(file, `invalid front-matter: ${ajvErrors(validateUnit)}`);
    }
    if (fm.coming_soon === true) comingSoon = true;
    if (f === 'index.mdx') translationStatus = fm.translation_status;

    // path <-> front-matter agreement
    if (fm.course_code && fm.course_code !== courseCode) {
      err(file, `course_code '${fm.course_code}' != folder '${courseCode}'`);
    }
    if (fm.unit_no != null && Number(fm.unit_no) !== unitNo) {
      err(file, `unit_no ${fm.unit_no} != folder unit-${String(unitNo).padStart(2, '0')}`);
    }

    // FR-010: assessment_weighting must sum to 100 when present
    if (fm.assessment_weighting) {
      const { summative, formative } = fm.assessment_weighting;
      if (Number(summative) + Number(formative) !== 100) {
        err(file, `assessment_weighting must sum to 100 (got ${summative}+${formative})`);
      }
    }

    // T018: glossary references resolve
    for (const term of glossaryRefs(parsed.content)) {
      if (!glossaryTerms.has(term)) {
        err(file, `<Glossary term="${term}"> has no matching entry in glossary.json`);
      }
    }
  }

  // T016: EN<->UR structural parity for reviewed units (skip coming_soon)
  const urUnitDir = join(UR_BASE, `semester-${semester}`, courseFolder, `unit-${String(unitNo).padStart(2, '0')}`);
  if (!comingSoon && translationStatus === 'reviewed') {
    if (!existsSync(urUnitDir)) {
      err(urUnitDir, `reviewed unit requires an Urdu mirror (parity gate, FR-001)`);
    } else {
      for (const f of UNIT_FILES) {
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
  }
}

// ---- walk docs/ ------------------------------------------------------------
function walk() {
  if (!existsSync(DOCS_DIR)) {
    console.error('validate-content: docs/ not found — nothing to validate.');
    return;
  }
  for (const sem of dirs(DOCS_DIR)) {
    const semMatch = /^semester-(\d+)$/.exec(sem);
    if (!semMatch) continue;
    const semester = Number(semMatch[1]);
    const semDir = join(DOCS_DIR, sem);
    checkCategory(semDir);

    for (const course of dirs(semDir)) {
      const courseDir = join(semDir, course);
      const courseCode = course.toUpperCase();
      checkCategory(courseDir);
      checkOverview(courseDir, courseCode);

      for (const unit of dirs(courseDir)) {
        const unitMatch = /^unit-(\d+)$/.exec(unit);
        if (!unitMatch) continue;
        checkCategory(join(courseDir, unit));
        checkUnit(join(courseDir, unit), semester, course, courseCode, Number(unitMatch[1]));
      }
    }
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
