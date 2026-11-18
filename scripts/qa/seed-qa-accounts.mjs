#!/usr/bin/env node
/**
 * QA accounts for looking at the signed-in screens by eye (owner approval,
 * 2026-11-08). Local only: never run in CI. Uses the service-role key from
 * .env.local, the same way the e2e specs seed their users.
 *
 *   node scripts/qa/seed-qa-accounts.mjs            create or refresh
 *   node scripts/qa/seed-qa-accounts.mjs --delete   remove everything it made
 *
 * Creates qa-student@, qa-teacher@ (verified teacher) and qa-admin@textbook.com.pk,
 * one class taught by the teacher with the student enrolled, three assignments
 * (one graded submission). Running it again changes nothing. Passwords are written
 * to ~/.config/textbook-qa/accounts.json (chmod 600) and never printed or committed.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, chmodSync, rmSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, dirname } from 'node:path';
import { randomBytes } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const STORE_DIR = join(homedir(), '.config', 'textbook-qa');
const STORE = join(STORE_DIR, 'accounts.json');
const CLASS_NAME = 'QA sample class';
const JOIN_CODE = 'QASMPL';

function env() {
  const out = { ...process.env };
  const file = [join(ROOT, '.env.local'), '/home/a2ahs/mega_book_for_B.Ed/.env.local'].find(existsSync);
  if (file) {
    for (const line of readFileSync(file, 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !out[m[1]]) out[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
    }
  }
  if (!out.DOCUSAURUS_SUPABASE_URL || !out.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Needs DOCUSAURUS_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local');
  }
  return out;
}

const ACCOUNTS = [
  { key: 'student', email: 'qa-student@textbook.com.pk', role: 'student', name: 'QA Student' },
  { key: 'teacher', email: 'qa-teacher@textbook.com.pk', role: 'teacher', name: 'QA Teacher', verified: true },
  { key: 'admin', email: 'qa-admin@textbook.com.pk', role: 'admin', name: 'QA Admin' },
];

async function findUser(svc, email) {
  for (let page = 1; page < 50; page += 1) {
    const { data, error } = await svc.auth.admin.listUsers({ page, perPage: 200 });
    if (error) throw error;
    const hit = data.users.find((u) => u.email === email);
    if (hit) return hit;
    if (data.users.length < 200) return null;
  }
  return null;
}

async function profileId(svc, authId) {
  for (let i = 0; i < 10; i += 1) {
    const { data } = await svc.from('profiles').select('id').eq('auth_user_id', authId).maybeSingle();
    if (data) return data.id;
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error(`No profile row for ${authId}`);
}

async function seed(svc) {
  const store = existsSync(STORE) ? JSON.parse(readFileSync(STORE, 'utf8')) : {};
  const ids = {};
  for (const a of ACCOUNTS) {
    const password = store[a.key]?.password ?? randomBytes(15).toString('base64url');
    let user = await findUser(svc, a.email);
    if (!user) {
      const { data, error } = await svc.auth.admin.createUser({
        email: a.email, password, email_confirm: true,
        user_metadata: { role: a.role === 'admin' ? 'teacher' : a.role, full_name: a.name },
      });
      if (error) throw error;
      user = data.user;
    } else {
      await svc.auth.admin.updateUserById(user.id, { password });
    }
    const pid = await profileId(svc, user.id);
    const patch = { full_name: a.name, role: a.role, verified_teacher: Boolean(a.verified) };
    const { error } = await svc.from('profiles').update(patch).eq('id', pid);
    if (error) throw error;
    ids[a.key] = { auth: user.id, profile: pid };
    store[a.key] = { email: a.email, password };
  }

  let { data: klass } = await svc.from('classes').select('id').eq('join_code', JOIN_CODE).maybeSingle();
  if (!klass) {
    const res = await svc.from('classes').insert({
      teacher_id: ids.teacher.profile, course_code: 'EFMP-302', name: CLASS_NAME, term_label: 'QA term', join_code: JOIN_CODE,
    }).select('id').single();
    if (res.error) throw res.error;
    klass = res.data;
  }
  await svc.from('enrollments').upsert({ class_id: klass.id, student_id: ids.student.profile }, { onConflict: 'class_id,student_id', ignoreDuplicates: true });

  const { data: existing } = await svc.from('assignments').select('id,title').eq('class_id', klass.id);
  if (!existing?.length) {
    const day = 24 * 60 * 60 * 1000;
    const rows = [
      { title: 'Reflection: why teaching is a profession', due: Date.now() - 3 * day, late: false },
      { title: 'Lesson plan draft', due: Date.now() + 1 * day, late: true },
      { title: 'Peer observation notes', due: Date.now() + 6 * day, late: false },
    ].map((r) => ({ class_id: klass.id, source_kind: 'custom', title: r.title, due_at: new Date(r.due).toISOString(), max_mark: 100, published: true, allow_late: r.late }));
    const res = await svc.from('assignments').insert(rows).select('id,title');
    if (res.error) throw res.error;
    const first = res.data.find((r) => r.title.startsWith('Reflection'));
    const sub = await svc.from('submissions').insert({ assignment_id: first.id, student_id: ids.student.profile, text_content: 'QA sample answer', late: false }).select('id').single();
    if (sub.error) throw sub.error;
    const grade = await svc.from('grades').insert({ submission_id: sub.data.id, mark: 82, graded_by: ids.teacher.profile });
    if (grade.error) throw grade.error;
  }

  mkdirSync(STORE_DIR, { recursive: true, mode: 0o700 });
  writeFileSync(STORE, JSON.stringify(store, null, 2));
  chmodSync(STORE, 0o600);
  console.log(`QA accounts ready: ${ACCOUNTS.map((a) => a.email).join(', ')}; class "${CLASS_NAME}". Passwords in ${STORE}.`);
}

async function remove(svc) {
  const { data: klass } = await svc.from('classes').select('id').eq('join_code', JOIN_CODE).maybeSingle();
  if (klass) await svc.from('classes').delete().eq('id', klass.id);
  for (const a of ACCOUNTS) {
    const user = await findUser(svc, a.email);
    if (user) await svc.auth.admin.deleteUser(user.id);
  }
  if (existsSync(STORE)) rmSync(STORE);
  console.log('QA accounts and their class removed.');
}

const e = env();
const svc = createClient(e.DOCUSAURUS_SUPABASE_URL, e.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
await (process.argv.includes('--delete') ? remove(svc) : seed(svc));
