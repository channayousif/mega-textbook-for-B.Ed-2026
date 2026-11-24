#!/usr/bin/env node
/**
 * Import Study Studio quiz items into quiz_items as teacher-review DRAFTS (Spec 029, 0056).
 *
 * Owner-run, local, never in CI or the crew: it uses the service-role key, which bypasses
 * RLS. Drafts are invisible to students, the quiz picker and the scorer until a verified
 * teacher publishes each one on /app/teacher/quiz-authoring.
 *
 *   node scripts/studio/import-quiz-drafts.mjs <file.json> [more.json...]          # dry run
 *   node scripts/studio/import-quiz-drafts.mjs <file.json> [more.json...] --apply  # write
 *
 * File shape: see scripts/studio/quiz-drafts-lib.mjs. Every file is validated before
 * anything is written; one bad file aborts the whole run. An item whose question already
 * exists for that course and unit (draft or published) is skipped, so re-running is safe.
 * Answers never go anywhere but quiz_items.correct_option (RLS: verified teachers only).
 */
import { readFileSync } from 'node:fs';
import { createClient } from '@supabase/supabase-js';
import { config as loadEnv } from 'dotenv';
import { parseDraftFile, toDraftRow } from './quiz-drafts-lib.mjs';

loadEnv({ path: '.env.local', quiet: true });

const args = process.argv.slice(2);
const apply = args.includes('--apply');
const files = args.filter((a) => !a.startsWith('--'));
if (files.length === 0) {
  console.error('usage: node scripts/studio/import-quiz-drafts.mjs <file.json>... [--apply]');
  process.exit(2);
}

// Validate everything first.
const parsed = files.map((f) => {
  try {
    return { file: f, ...parseDraftFile(JSON.parse(readFileSync(f, 'utf8'))) };
  } catch (e) {
    console.error(`✗ ${f}: ${e.message}`);
    process.exit(1);
  }
});

const url = process.env.DOCUSAURUS_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('DOCUSAURUS_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required (.env.local)');
  process.exit(2);
}
const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });

let added = 0;
let skipped = 0;
for (const { file, courseCode, unitNo, items } of parsed) {
  const { data: existing, error } = await db.from('quiz_items').select('question_text')
    .eq('course_code', courseCode).eq('unit_no', unitNo);
  if (error) {
    console.error(`✗ ${file}: reading existing items failed: ${error.message}`);
    process.exit(1);
  }
  const seen = new Set((existing ?? []).map((r) => r.question_text.trim().toLowerCase()));
  const rows = items.filter((it) => !seen.has(it.question.toLowerCase())).map((it) => toDraftRow(it, courseCode, unitNo));
  const dup = items.length - rows.length;
  skipped += dup;
  console.log(`${apply ? '→' : '·'} ${file}: ${courseCode} Unit ${unitNo}: ${rows.length} new draft(s)${dup ? `, ${dup} already present` : ''}`);
  if (!apply || rows.length === 0) continue;
  const { error: insErr } = await db.from('quiz_items').insert(rows);
  if (insErr) {
    console.error(`✗ ${file}: insert failed: ${insErr.message}`);
    process.exit(1);
  }
  added += rows.length;
}

console.log(apply
  ? `Done: ${added} draft(s) written, ${skipped} skipped. Review and publish on /app/teacher/quiz-authoring.`
  : `Dry run: nothing written (${skipped} would be skipped). Re-run with --apply to write.`);
