#!/usr/bin/env node
/**
 * Owner Decisions sync (Feature 035): the crew side of /app/admin/decisions.
 *
 * Each run (tick.sh, after the tick, in the same key-only subshell as signoff-sync):
 *  1. builds what waits on the owner from the crew board and the ledgers (owner-queue.mjs);
 *  2. applies every queued `owner_decisions` row: refused when the item is gone or changed since
 *     the owner decided (digest), otherwise run through the owner's own command path,
 *     `crew.mjs cmd "<command>" --via web --json`, and marked applied or refused with its reply;
 *  3. pushes the fresh list to `owner_queue` (replace_owner_queue).
 *
 * Needs SUPABASE_SERVICE_ROLE_KEY and SUPABASE_URL (or DOCUSAURUS_SUPABASE_URL); without them it
 * does nothing. Never import this file from a content gate (FR-018).
 *
 * Usage: node scripts/crew/decisions-sync.mjs [--in-tick] [--dry-run]
 *   --in-tick  tick.sh already holds tick.lock, so commands run with --locked. Without it each
 *              command waits for the lock like an openclaw command does.
 *   --dry-run  prints the queue and the command each queued decision would run; writes nothing.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { buildOwnerQueue, commandFor } from './owner-queue.mjs';

const ROOT = resolve(fileURLToPath(new URL('../..', import.meta.url)));
const STATE_DIR = process.env.CREW_STATE_DIR || join(homedir(), '.crew', 'mega-book');
const SOCIAL_LEDGER = process.env.SOCIAL_LEDGER ?? join(homedir(), 'studio-media', 'social', 'updates.json');

const readJson = (f, fallback) => { try { return JSON.parse(readFileSync(f, 'utf8')); } catch { return fallback; } };

/** Readers over this checkout and the crew state, for buildOwnerQueue. */
export function repoReaders(root = ROOT, stateDir = STATE_DIR) {
  const teasers = readJson(join(root, 'specs/studio/teasers/media-teasers.json'), { items: [] }).items ?? [];
  const scriptFile = (id) => join(root, 'specs/studio/teasers', `${id}.json`);
  const studioDir = join(root, 'specs/studio');
  const studioLedgers = [];
  for (const c of existsSync(studioDir) ? readdirSync(studioDir, { withFileTypes: true }) : []) {
    if (!c.isDirectory() || c.name === 'teasers') continue;
    for (const f of readdirSync(join(studioDir, c.name))) {
      const m = f.match(/^media-unit-(\d+)\.json$/);
      if (!m) continue;
      const L = readJson(join(studioDir, c.name, f), null);
      if (L) studioLedgers.push({ course: (L.course ?? c.name).toUpperCase(), unit: Number(L.unit ?? m[1]), items: L.items ?? [] });
    }
  }
  const posts = readJson(SOCIAL_LEDGER, { posts: [] }).posts ?? [];
  return {
    board: readJson(join(stateDir, 'board.json'), {}),
    decisions: readJson(join(stateDir, 'decisions.json'), { items: [] }),
    teaserItem: (key) => teasers.find((i) => i.key === key),
    script: (id) => readJson(scriptFile(id), undefined),
    shaOf: (id) => (existsSync(scriptFile(id)) ? createHash('sha256').update(readFileSync(scriptFile(id))).digest('hex') : undefined),
    studioLedger: (course, unit) => studioLedgers.find((L) => L.course === course.toUpperCase() && L.unit === Number(unit)),
    studioLedgers,
    socialPost: (id) => posts.find((p) => p.id === id),
  };
}

/**
 * What to do with one queued decision against the current queue: refuse it, or run a command.
 * @returns {{ refuse: string } | { command: string }}
 */
export function planDecision(decision, queue) {
  const item = queue.find((i) => i.item_key === decision.item_key);
  if (!item) return { refuse: 'no longer waiting on you: it was decided elsewhere or has moved on' };
  if (item.digest !== decision.digest) return { refuse: 'it changed after you decided; look at it again and decide on the current version' };
  try { return { command: commandFor(decision, item) }; } catch (e) { return { refuse: e.message }; }
}

/** The queue without items whose current version (same digest) already has an applied decision. */
export function dropDecided(queue, applied) {
  const seen = new Set(applied.map((d) => `${d.item_key}\n${d.digest}`));
  return queue.filter((i) => !seen.has(`${i.item_key}\n${i.digest}`));
}

/** Run one owner command through crew.mjs and read its { ok, reply } line. */
function runCommand(command, inTick) {
  const args = [join(ROOT, 'scripts/crew/crew.mjs'), 'cmd', command, '--via', 'web', '--json'];
  if (inTick) args.push('--locked');
  // The crew command never needs the service key: keep it out of the child's environment.
  const { SUPABASE_SERVICE_ROLE_KEY: _k, ...env } = process.env;
  const r = spawnSync(process.execPath, args, { cwd: ROOT, encoding: 'utf8', timeout: 180_000, env });
  const line = (r.stdout || '').trim().split('\n').reverse().find((l) => l.startsWith('{'));
  try { return JSON.parse(line); } catch { return { ok: false, reply: (r.stdout || r.stderr || 'the crew did not answer').trim().slice(-600) }; }
}

async function main() {
  const DRY = process.argv.includes('--dry-run');
  const IN_TICK = process.argv.includes('--in-tick');
  const url = process.env.SUPABASE_URL || process.env.DOCUSAURUS_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!DRY && (!url || !key)) { process.stdout.write('decisions-sync: no service key on this host, skipped\n'); return; }

  let queue = buildOwnerQueue(repoReaders());
  let db = null;
  let queued = [];
  if (url && key) {
    const { createClient } = await import('@supabase/supabase-js');
    db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data, error } = await db.from('owner_decisions').select('*').eq('status', 'queued').order('decided_at');
    if (error) throw new Error(error.message);
    queued = data;
  }

  let changed = false;
  for (const d of queued) {
    const plan = planDecision(d, queue);
    let status = 'refused';
    let result = plan.refuse;
    if (plan.command) {
      if (DRY) { process.stdout.write(`[dry-run] ${d.item_key} ${d.action}: would run "${plan.command}"\n`); continue; }
      const r = runCommand(plan.command, IN_TICK);
      status = r.ok ? 'applied' : 'refused';
      result = r.reply;
      changed ||= r.ok;
    } else if (DRY) { process.stdout.write(`[dry-run] ${d.item_key} ${d.action}: would refuse: ${plan.refuse}\n`); continue; }
    const { error } = await db.rpc('mark_owner_decision', { p_id: d.id, p_status: status, p_result: result, p_command: plan.command ?? null });
    if (error) process.stderr.write(`decisions-sync: could not mark ${d.id}: ${error.message}\n`);
    else process.stdout.write(`decisions-sync: ${d.item_key} ${d.action} ${status}: ${result}\n`);
  }

  // An applied decision changes the crew state (media.json, decisions.json), but the board-derived
  // lists (scripts, spot-check, watch) only refresh at the next plan. Until then, leave out an item
  // whose current version was decided on the page in the last two hours.
  if (changed) queue = buildOwnerQueue(repoReaders());
  if (db) {
    const since = new Date(Date.now() - 2 * 36e5).toISOString();
    const { data: done } = await db.from('owner_decisions').select('item_key,digest').eq('status', 'applied').gte('synced_at', since);
    queue = dropDecided(queue, done ?? []);
  }
  if (DRY) {
    for (const i of queue) process.stdout.write(`- ${i.item_key} [${i.actions.join('/') || 'info'}] ${i.title}\n`);
    process.stdout.write(`[dry-run] ${queue.length} item(s); nothing written\n`);
    return;
  }
  const { error } = await db.rpc('replace_owner_queue', { p_items: queue, p_snapshot_at: new Date().toISOString() });
  if (error) throw new Error(`replace_owner_queue: ${error.message}`);
  process.stdout.write(`decisions-sync: ${queue.length} item(s) waiting on the owner\n`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((e) => { process.stderr.write(`decisions-sync: ${e.message}\n`); process.exit(1); });
}
