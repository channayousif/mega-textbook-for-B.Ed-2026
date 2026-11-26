#!/usr/bin/env node
/**
 * Feature 034 (quota efficiency): read-only Claude token report from local transcripts, so model
 * routing changes are measured, not assumed. Reads ~/.claude/projects/<project>/*.jsonl (the Max
 * account used by interactive sessions and the crew's `claude` worker) and totals tokens per model,
 * per day, per kind (interactive, crew worktree, subagent) and per project.
 *
 *   node scripts/ops/claude-usage.mjs                 last 7 days
 *   node scripts/ops/claude-usage.mjs --days 28 --json
 *   node scripts/ops/claude-usage.mjs --root /path/to/projects
 *
 * "weight" is a rough relative cost, not a quota figure: output counts 5x input, cache writes
 * 1.25x and cache reads 0.1x, scaled per model family (opus 5, sonnet 3, haiku 1). Use it to
 * compare weeks; /usage remains the authority for the plan limit.
 */
import { createReadStream, existsSync, readdirSync, statSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { createInterface } from 'node:readline';
import { fileURLToPath } from 'node:url';

const FAMILY_SCALE = { opus: 5, sonnet: 3, haiku: 1, fable: 5 };
export const familyOf = (model = '') => (Object.keys(FAMILY_SCALE).find((f) => model.includes(f)) ?? 'other');
export function weight(u, model) {
  const s = FAMILY_SCALE[familyOf(model)] ?? 3;
  return s * ((u.input ?? 0) + 5 * (u.output ?? 0) + 1.25 * (u.cacheWrite ?? 0) + 0.1 * (u.cacheRead ?? 0));
}
export function kindOf(project, isSidechain) {
  if (isSidechain) return 'subagent';
  return /crew-wt|crew-system/.test(project) ? 'crew' : 'interactive';
}

/** One usage record per assistant message (deduped later by message id). */
export function toRecord(line, project) {
  if (line?.type !== 'assistant' || !line.message?.usage || !line.message?.model) return null;
  const u = line.message.usage;
  return {
    id: line.message.id ?? `${line.sessionId}:${line.timestamp}`,
    day: String(line.timestamp ?? '').slice(0, 10),
    model: line.message.model,
    kind: kindOf(project, Boolean(line.isSidechain)),
    project,
    input: u.input_tokens ?? 0,
    output: u.output_tokens ?? 0,
    cacheWrite: u.cache_creation_input_tokens ?? 0,
    cacheRead: u.cache_read_input_tokens ?? 0,
  };
}

export function summarize(records) {
  const seen = new Set();
  const add = (map, key, r) => {
    const t = map[key] ?? (map[key] = { messages: 0, input: 0, output: 0, cacheWrite: 0, cacheRead: 0, weight: 0 });
    t.messages += 1; t.input += r.input; t.output += r.output; t.cacheWrite += r.cacheWrite; t.cacheRead += r.cacheRead;
    t.weight += weight(r, r.model);
  };
  const out = { byModel: {}, byKind: {}, byDay: {}, byProject: {}, total: {} };
  for (const r of records) {
    if (!r || seen.has(r.id)) continue;
    seen.add(r.id);
    add(out.byModel, r.model, r); add(out.byKind, r.kind, r); add(out.byDay, r.day, r); add(out.byProject, r.project, r); add(out.total, 'all', r);
  }
  return out;
}

async function* lines(file) {
  const rl = createInterface({ input: createReadStream(file), crlfDelay: Infinity });
  for await (const l of rl) { if (l.includes('"usage"')) { try { yield JSON.parse(l); } catch { /* partial line */ } } }
}

async function collect(root, sinceMs) {
  const records = [];
  for (const project of readdirSync(root)) {
    const dir = join(root, project);
    if (!statSync(dir).isDirectory()) continue;
    const files = [];
    const walk = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); const st = statSync(p); if (st.isDirectory()) walk(p); else if (f.endsWith('.jsonl') && st.mtimeMs >= sinceMs) files.push(p); } };
    walk(dir);
    for (const f of files) for await (const line of lines(f)) {
      const r = toRecord(line, project.replace(/^-home-[^-]+-?/, '') || '~');
      if (r && Date.parse(line.timestamp) >= sinceMs) records.push(r);
    }
  }
  return records;
}

const fmt = (n) => (n >= 1e6 ? `${(n / 1e6).toFixed(1)}M` : n >= 1e3 ? `${(n / 1e3).toFixed(0)}k` : String(Math.round(n)));
function table(title, map, limit = 20) {
  const rows = Object.entries(map).sort((a, b) => b[1].weight - a[1].weight).slice(0, limit);
  const total = Object.values(map).reduce((s, t) => s + t.weight, 0) || 1;
  console.log(`\n${title}`);
  console.log('  key'.padEnd(46), 'msgs'.padStart(6), 'in'.padStart(7), 'out'.padStart(7), 'cache-w'.padStart(8), 'cache-r'.padStart(8), 'weight%'.padStart(8));
  for (const [k, t] of rows) console.log(`  ${k.slice(0, 43)}`.padEnd(46), String(t.messages).padStart(6), fmt(t.input).padStart(7), fmt(t.output).padStart(7), fmt(t.cacheWrite).padStart(8), fmt(t.cacheRead).padStart(8), `${((100 * t.weight) / total).toFixed(1)}`.padStart(8));
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const args = process.argv.slice(2);
  const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
  const days = Number(opt('--days', 7));
  const root = opt('--root', join(homedir(), '.claude', 'projects'));
  if (!existsSync(root)) { console.error(`no transcripts at ${root}`); process.exit(1); }
  const s = summarize(await collect(root, Date.now() - days * 864e5));
  if (args.includes('--json')) { console.log(JSON.stringify(s, null, 1)); process.exit(0); }
  console.log(`Claude usage, last ${days} day(s), from ${root}`);
  table('By model', s.byModel); table('By kind', s.byKind); table('By day', s.byDay, 31); table('Top projects', s.byProject, 12);
}
