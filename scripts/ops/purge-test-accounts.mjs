#!/usr/bin/env node
/**
 * purge-test-accounts.mjs - remove leaked test fixtures from the live project.
 *
 * The e2e and RLS suites run against the production Supabase and create a
 * fresh `@example.test` user per test. Each spec deletes its own users, but a
 * test that times out or crashes never reaches its cleanup, and by 2026-11-08
 * that had left 1,309 test logins (68 of them active admins with the password
 * committed to a public repo), 288 stranded profiles shown as "-" on
 * /app/admin/users, and about 2,400 test tombstones.
 *
 * This sweep is the backstop. It runs before and after every e2e and RLS suite
 * (global setup/teardown) and nightly from cron, and removes three things that
 * are older than the cutoff:
 *
 *   1. auth users whose email ends in @example.test, with their profile and
 *      every row that blocks deleting it (tests/profile-dependents.mjs);
 *   2. stranded profiles: auth_user_id null and deleted_at null, which only a
 *      test fixture deleting its auth row directly can produce (see
 *      scripts/ops/purge-orphan-profiles.sql for why no real account matches);
 *   3. tombstones (deleted_at set) that nothing references any more. FR-021
 *      keeps a tombstone so gradebooks and audit rows that point at it stay
 *      valid; one that no column points at protects nothing.
 *
 * The cutoff (default 60 min) keeps a concurrent run's live fixtures safe.
 *
 *   node scripts/ops/purge-test-accounts.mjs                 dry run, counts only
 *   node scripts/ops/purge-test-accounts.mjs --apply         delete
 *   node scripts/ops/purge-test-accounts.mjs --apply --older-than 0
 *   ... --no-tombstones                                      skip step 3
 *
 * Needs DOCUSAURUS_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (env or .env.local).
 */
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createClient } from '@supabase/supabase-js';
import { PROFILE_DEPENDENTS, PROFILE_REFERENCES } from '../../tests/profile-dependents.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
export const TEST_EMAIL_DOMAIN = '@example.test';
// 100 uuids in an `in.(...)` filter overflows the gateway URL limit (502); 50 fits.
const BATCH = 50;

/** True only for a fixture address. Everything else is a real person. */
export function isTestEmail(email) {
  return typeof email === 'string' && email.toLowerCase().endsWith(TEST_EMAIL_DOMAIN);
}

export function isOlderThan(timestamp, cutoffMs) {
  const t = Date.parse(timestamp ?? '');
  return Number.isFinite(t) && t <= cutoffMs;
}

/** Auth users the sweep may delete: test address AND older than the cutoff. */
export function selectTestAuthUsers(users, cutoffMs) {
  return users.filter((u) => isTestEmail(u.email) && isOlderThan(u.created_at, cutoffMs));
}

/** Profiles left behind by a fixture that deleted its auth row directly. */
export function selectStrandedProfiles(profiles, cutoffMs) {
  return profiles.filter((p) => p.auth_user_id === null && p.deleted_at === null && isOlderThan(p.created_at, cutoffMs));
}

/** Tombstones no column references, so deleting them loses nothing. */
export function selectUnreferencedTombstones(profiles, referencedIds, cutoffMs) {
  return profiles.filter((p) => p.deleted_at !== null && p.auth_user_id === null
    && isOlderThan(p.deleted_at, cutoffMs) && !referencedIds.has(p.id));
}

export function parseArgs(argv) {
  const args = { apply: false, olderThanMin: 60, tombstones: true };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === '--apply') args.apply = true;
    else if (a === '--no-tombstones') args.tombstones = false;
    else if (a === '--older-than') args.olderThanMin = Number(argv[(i += 1)]);
    else if (a.startsWith('--older-than=')) args.olderThanMin = Number(a.split('=')[1]);
    else throw new Error(`unknown argument ${a}`);
  }
  if (!Number.isFinite(args.olderThanMin) || args.olderThanMin < 0) throw new Error('--older-than needs minutes >= 0');
  return args;
}

function chunks(list, size = BATCH) {
  const out = [];
  for (let i = 0; i < list.length; i += size) out.push(list.slice(i, i + size));
  return out;
}

function loadEnv() {
  const out = { ...process.env };
  const file = join(ROOT, '.env.local');
  if (existsSync(file)) {
    for (const line of readFileSync(file, 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !out[m[1]]) out[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
    }
  }
  return out;
}

async function listAllAuthUsers(svc) {
  const all = [];
  for (let page = 1; ; page += 1) {
    const { data, error } = await svc.auth.admin.listUsers({ page, perPage: 1000 });
    if (error) throw new Error(`listUsers: ${error.message}`);
    all.push(...data.users);
    if (data.users.length < 1000) return all;
  }
}

async function selectAll(svc, table, columns, build = (q) => q) {
  const rows = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await build(svc.from(table).select(columns)).range(from, from + 999);
    if (error) throw new Error(`${table}: ${error.message}`);
    rows.push(...data);
    if (data.length < 1000) return rows;
  }
}

/** Ids among `ids` that any PROFILE_REFERENCES column points at. */
async function referencedAmong(svc, ids) {
  const hit = new Set();
  for (const [table, column] of PROFILE_REFERENCES) {
    for (const batch of chunks(ids)) {
      const { data, error } = await svc.from(table).select(column).in(column, batch);
      if (error) throw new Error(`${table}.${column}: ${error.message}`);
      for (const row of data) hit.add(row[column]);
    }
  }
  return hit;
}

/** Delete the rows that block a profile delete, then the profiles. Returns survivors. */
async function deleteProfiles(svc, profileIds) {
  let survived = 0;
  for (const batch of chunks(profileIds)) {
    for (const [table, column] of PROFILE_DEPENDENTS) {
      const { error } = await svc.from(table).delete().in(column, batch);
      if (error) console.warn(`  ${table}.${column}: ${error.message}`);
    }
    const { error } = await svc.from('profiles').delete().in('id', batch);
    if (error) {
      survived += batch.length;
      console.warn(`  profiles: ${batch.length} survived - ${error.message}`);
    }
  }
  return survived;
}

export async function purgeTestAccounts({ apply = false, olderThanMin = 60, tombstones = true, log = console.log } = {}) {
  const env = loadEnv();
  if (!env.DOCUSAURUS_SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    log('purge-test-accounts: no service-role credentials, skipped');
    return null;
  }
  const svc = createClient(env.DOCUSAURUS_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
  const cutoffMs = Date.now() - olderThanMin * 60_000;

  const authUsers = await listAllAuthUsers(svc);
  const testUsers = selectTestAuthUsers(authUsers, cutoffMs);

  const profiles = await selectAll(svc, 'profiles', 'id, auth_user_id, deleted_at, created_at');
  const testAuthIds = new Set(testUsers.map((u) => u.id));
  const testProfiles = profiles.filter((p) => p.auth_user_id && testAuthIds.has(p.auth_user_id));
  const stranded = selectStrandedProfiles(profiles, cutoffMs);

  let unreferenced = [];
  if (tombstones) {
    const candidates = profiles.filter((p) => p.deleted_at !== null && p.auth_user_id === null && isOlderThan(p.deleted_at, cutoffMs));
    const referenced = await referencedAmong(svc, candidates.map((p) => p.id));
    unreferenced = selectUnreferencedTombstones(candidates, referenced, cutoffMs);
  }

  const summary = {
    mode: apply ? 'apply' : 'dry-run',
    olderThanMin,
    authUsersTotal: authUsers.length,
    testAuthUsers: testUsers.length,
    testProfiles: testProfiles.length,
    strandedProfiles: stranded.length,
    unreferencedTombstones: unreferenced.length,
    profilesSurvived: 0,
    authDeleteFailures: 0,
  };
  log(`purge-test-accounts ${summary.mode} (older than ${olderThanMin} min): `
    + `${summary.testAuthUsers} test logins, ${summary.strandedProfiles} stranded profiles, `
    + `${summary.unreferencedTombstones} unreferenced tombstones`);
  if (!apply) return summary;

  // Same order as tests/e2e/_cleanup.ts: profile ids were resolved above,
  // before the auth delete nulls auth_user_id.
  for (const batch of chunks(testUsers, 20)) {
    const results = await Promise.allSettled(batch.map((u) => svc.auth.admin.deleteUser(u.id)));
    summary.authDeleteFailures += results.filter((r) => r.status === 'rejected' || r.value?.error).length;
  }
  const profileIds = [...testProfiles, ...stranded, ...unreferenced].map((p) => p.id);
  summary.profilesSurvived = await deleteProfiles(svc, profileIds);
  log(`purge-test-accounts done: ${testUsers.length - summary.authDeleteFailures} logins and `
    + `${profileIds.length - summary.profilesSurvived} profiles removed`
    + (summary.authDeleteFailures || summary.profilesSurvived
      ? ` (${summary.authDeleteFailures} login and ${summary.profilesSurvived} profile deletes failed)` : ''));
  return summary;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  purgeTestAccounts(parseArgs(process.argv.slice(2)))
    .then((s) => process.exit(s && (s.authDeleteFailures || s.profilesSurvived) ? 1 : 0))
    .catch((err) => { console.error(err.message); process.exit(1); });
}
