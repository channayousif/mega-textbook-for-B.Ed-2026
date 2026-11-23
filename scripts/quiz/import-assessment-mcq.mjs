#!/usr/bin/env node
// Feature 032 phase C: import each unit assessment's multiple-choice bank (questions, options and
// the answer key from the bounded "Answers and marking guidance" section) into self_check_items
// (migration 0055), English and Urdu. The key goes only to that RLS-locked table; the site reads
// questions through self_check_questions() and marks through check_self_quiz().
//
//   node scripts/quiz/import-assessment-mcq.mjs                 # dry run: parse and validate every unit
//   node scripts/quiz/import-assessment-mcq.mjs --apply [--course EFMP-301] [--unit 4]
//
// --apply needs DOCUSAURUS_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (from .env.local); owner-run.
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const UR_DOCS = 'i18n/ur/docusaurus-plugin-content-docs/current';

// Urdu pages may letter options الف، ب، ج، د (then ہ، و); they map to a-f.
const UR_LETTERS = { 'الف': 'a', 'ب': 'b', 'ج': 'c', 'د': 'd', 'ہ': 'e', 'ھ': 'e', 'و': 'f' };
const LETTER = '[a-fA-F]|الف|ب|ج|د|ہ|ھ|و';
const letter = (x) => UR_LETTERS[x] ?? x.toLowerCase();

/** Split the section that starts at a `### ...MCQ...` heading, up to the next heading of level 2 or 3. */
function sections(text) {
  const lines = text.split('\n');
  // "### Multiple-choice questions (MCQs)", "### MCQ answer key", "### کثیر الاختیاری سوالات", ...
  const heads = lines.map((l, i) => (/^###\s.*(MCQ|multiple[- ]choice|کثیر\s*(ال)?(اختیاری|انتخابی))/i.test(l) ? i : -1)).filter((i) => i >= 0);
  const body = (start) => {
    const out = [];
    for (let i = start + 1; i < lines.length && !/^#{2,3}\s/.test(lines[i]); i++) out.push(lines[i]);
    return out;
  };
  return { questions: heads[0] != null ? body(heads[0]) : [], key: heads[1] != null ? body(heads[1]) : [] };
}

/** Parse the questions and the key of one assessment page. Pure. */
export function parseAssessment(text) {
  const { questions, key } = sections(text);
  const items = [];
  let cur = null, opt = null;
  for (const raw of questions) {
    const q = raw.match(/^(\d+)\.\s+(.*)$/);
    // "   a) text", "   - A) text", "   - (b) text", "   * c. text"
    const o = raw.match(new RegExp(`^\\s+(?:[-*]\\s+)?\\(?(${LETTER})[).]\\s+(.*)$`));
    if (q) {
      cur = { item_no: Number(q[1]), question: q[2], options: {}, bloom: null };
      items.push(cur); opt = null;
    } else if (o && cur) {
      opt = letter(o[1]); cur.options[opt] = o[2].trim();
    } else if (cur && raw.trim()) {
      if (opt) cur.options[opt] += ` ${raw.trim()}`; else cur.question += ` ${raw.trim()}`;
    }
  }
  for (const it of items) {
    // The Bloom tag sits at the end or at the start: "*(Remember)*".
    const b = it.question.match(/\*\(([^)]+)\)\*/);
    if (b) { it.bloom = b[1].trim(); it.question = it.question.replace(b[0], '').replace(/\s+/g, ' ').trim(); }
  }
  const answers = {};
  const keyText = key.join('\n');
  // A key table: "| 1 | C | why |"
  for (const m of keyText.matchAll(new RegExp(`^\\|\\s*(\\d+)\\s*\\|\\s*\\**\\(?(${LETTER})\\)?\\**\\s*\\|`, 'gm'))) answers[Number(m[1])] ??= letter(m[2]);
  // An inline key line: "1. B  2. C  3. A"
  for (const raw of key) {
    const pairs = [...raw.matchAll(new RegExp(`(\\d+)\\.\\s*(${LETTER})(?=\\s|$)`, 'g'))];
    if (pairs.length >= 2) for (const m of pairs) answers[Number(m[1])] ??= letter(m[2]);
  }
  for (const raw of key) {
    // "1. **a** - ...", "1. B - ...", "1. (c) ...", "1. **(D)**"
    const m = raw.match(new RegExp(`^(\\d+)\\.\\s+(?:\\*\\*)?\\(?(${LETTER})\\)?(?:\\*\\*)?(?=[\\s.:،,)-]|$)`));
    if (m) answers[Number(m[1])] = letter(m[2]);
  }
  return { items, answers };
}

/** Problems that would make a self-check wrong. Pure. */
export function validate({ items, answers }) {
  const errs = [];
  if (!items.length) errs.push('no multiple-choice questions found');
  items.forEach((it, i) => {
    if (it.item_no !== i + 1) errs.push(`question numbers out of order at ${it.item_no}`);
    if (Object.keys(it.options).length < 2) errs.push(`question ${it.item_no}: fewer than two options`);
    const k = answers[it.item_no];
    if (!k) errs.push(`question ${it.item_no}: no answer in the key`);
    else if (!it.options[k]) errs.push(`question ${it.item_no}: key "${k}" is not one of its options`);
  });
  for (const n of Object.keys(answers)) if (!items.some((it) => it.item_no === Number(n))) errs.push(`key ${n} has no question`);
  return errs;
}

function* assessmentFiles() {
  for (const sem of readdirSync(join(ROOT, 'docs')).filter((d) => d.startsWith('semester-'))) {
    for (const course of readdirSync(join(ROOT, 'docs', sem))) {
      const cdir = join(ROOT, 'docs', sem, course);
      if (!statSync(cdir).isDirectory()) continue;
      for (const unit of readdirSync(cdir).filter((u) => /^unit-\d+$/.test(u))) {
        const rel = join(sem, course, unit, 'unit-assessment.mdx');
        const en = join(ROOT, 'docs', rel), ur = join(ROOT, UR_DOCS, rel);
        const meta = { course_code: course.toUpperCase(), unit_no: Number(unit.slice(5)) };
        if (existsSync(en)) yield { ...meta, locale: 'en', file: en };
        if (existsSync(ur)) yield { ...meta, locale: 'ur', file: ur };
      }
    }
  }
}

async function upsert(rows) {
  const url = process.env.DOCUSAURUS_SUPABASE_URL, key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('set DOCUSAURUS_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (source .env.local)');
  const r = await fetch(`${url}/rest/v1/self_check_items?on_conflict=course_code,unit_no,locale,item_no`, {
    method: 'POST',
    headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', Prefer: 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify(rows),
  });
  if (!r.ok) throw new Error(`upsert failed: ${r.status} ${(await r.text()).slice(0, 300)}`);
}

async function main() {
  const argv = process.argv.slice(2);
  const opt = (n) => { const i = argv.indexOf(`--${n}`); return i >= 0 ? argv[i + 1] : null; };
  const apply = argv.includes('--apply');
  const course = opt('course')?.toUpperCase(), unit = opt('unit') ? Number(opt('unit')) : null;
  let ok = 0, bad = 0, rows = 0;
  for (const f of assessmentFiles()) {
    if ((course && f.course_code !== course) || (unit && f.unit_no !== unit)) continue;
    const text = readFileSync(f.file, 'utf8');
    const parsed = parseAssessment(text);
    const errs = validate(parsed);
    const where = relative(ROOT, f.file);
    if (errs.length) { bad++; console.log(`✗ ${where}: ${errs.slice(0, 3).join('; ')}`); continue; }
    ok++;
    if (!apply) continue;
    const sha = createHash('sha256').update(text).digest('hex').slice(0, 16);
    const batch = parsed.items.map((it) => ({ course_code: f.course_code, unit_no: f.unit_no, locale: f.locale, item_no: it.item_no,
      question_text: it.question, options: it.options, correct_option: parsed.answers[it.item_no], bloom: it.bloom, source_sha: sha }));
    await upsert(batch);
    rows += batch.length;
  }
  console.log(`${ok} assessment page(s) valid, ${bad} skipped${apply ? `; ${rows} item(s) upserted` : ' (dry run)'}`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main().catch((e) => { console.error(`✗ ${e.message}`); process.exit(1); });
