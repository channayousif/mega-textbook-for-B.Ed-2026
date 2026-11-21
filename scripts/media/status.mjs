#!/usr/bin/env node
// One view of every media job and every pending owner action (Feature 030 US3, T035).
//
//   node scripts/media/status.mjs [--all] [--json] [--probe]
//
// Reads the teaser ledger, Notebook Studio ledgers and manifests, and figure manifests through
// legacy.mjs (read-only), maps them to the shared states, and lists what waits on the owner and
// which producers can take work. Default output: counts per kind and state, owner actions, open
// jobs (not yet public or placed), producers. `--all` lists every job; `--probe` also checks the
// gflow tunnel. Do not import this file from any content gate (FR-018).
import { existsSync, readFileSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { allJobs } from './legacy.mjs';
import { REGISTRY, activeQuota, MEDIA_QUOTA_FILE } from './producers/index.mjs';
import { PRODUCERS as IMAGE_PRODUCERS, activeImageQuota, IMAGE_QUOTA_FILE, gflowReachable } from './producers/quota.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const DONE = new Set(['public', 'placed']);

/** The producer chain a kind uses (scripts/media/producers/index.mjs REGISTRY). */
export function producersFor(kind) {
  if (kind === 'video.teaser') return REGISTRY.clip;
  if (kind === 'image.schematic') return REGISTRY.schematic;
  if (kind === 'image.illustration') return REGISTRY.image;
  return REGISTRY.overview; // NotebookLM audio, video overviews and Study Studio documents
}

/** Teaser review notes the owner should see when spot-checking: clip QA notes and QG2 misses. */
export function teaserNotes(item) {
  const notes = [];
  if (item.gates?.clips?.verdict === 'pass-with-notes' && item.gates.clips.notes) notes.push(item.gates.clips.notes);
  for (const c of item.clips ?? []) {
    if (c.qa?.verdict === 'pass-with-notes' && c.qa.notes) notes.push(`shot ${c.shot}: ${c.qa.notes}`);
    if (c.qa?.verdict !== 'fail' && c.precheck?.missing?.length && c.precheck.qg2_score < 0.85) notes.push(`shot ${c.shot}: QG2 ${c.precheck.qg2_score}, missing ${c.precheck.missing.join(' ')}`);
  }
  return notes;
}

/**
 * The owner's next action for one job, or null. Owner gates (D-2026-0094): approve a teaser script
 * before credits, watch a private upload, publish.
 */
export function ownerAction(job, item) {
  if (job.blocked) return { what: 'unblock', detail: job.blocked };
  if (job.kind === 'video.teaser') {
    if (job.legacy_state === 'scripted') return { what: 'approve script', command: `crew approve-script ${job.key}` };
    if (job.legacy_state === 'uploaded-private') return null; // the crew still runs QG3
    if (job.legacy_state === 'qa3-pass') {
      return { what: 'watch the private Short, then publish or reject', command: `crew publish ${job.key}`, url: `https://youtube.com/shorts/${job.youtube_id}`, notes: item ? teaserNotes(item) : [] };
    }
    return null;
  }
  if (/^(audio|video)\./.test(job.kind) && job.legacy_state === 'qa3-pass') {
    return { what: 'watch the private upload and approve it (studio-media)', url: `https://youtu.be/${job.youtube_id}` };
  }
  return null;
}

/** Producer availability: quota records (image and media files) and, with `probe`, the gflow tunnel. */
export function producerStatus({ imageQuotaFile = IMAGE_QUOTA_FILE, mediaQuotaFile = MEDIA_QUOTA_FILE(), probe = false, reachable = gflowReachable, nowMs = Date.now() } = {}) {
  const out = [];
  for (const p of IMAGE_PRODUCERS) {
    const q = activeImageQuota(p, imageQuotaFile, nowMs);
    out.push({ medium: 'image', producer: p, state: q ? 'quota' : 'ok', resetAt: q?.resetAt ?? null });
  }
  for (const [medium, chain] of Object.entries(REGISTRY).filter(([m]) => m !== 'image')) {
    for (const p of chain) {
      const q = activeQuota(p, mediaQuotaFile, nowMs);
      out.push({ medium, producer: p, state: q ? 'quota' : 'ok', resetAt: q?.resetAt ?? null });
    }
  }
  if (probe) {
    const up = reachable();
    for (const r of out) if (r.state === 'ok' && /^gflow/.test(r.producer) && !up) r.state = 'offline';
  }
  return out;
}

export function mediaStatus({ root = ROOT, ...opts } = {}) {
  const ledger = join(root, 'specs/studio/teasers/media-teasers.json');
  const items = existsSync(ledger) ? Object.fromEntries(JSON.parse(readFileSync(ledger, 'utf8')).items.map((i) => [i.key, i])) : {};
  const jobs = allJobs(root).map((j) => ({ ...j, producers: producersFor(j.kind), owner: ownerAction(j, items[j.key]) }));
  const counts = {};
  for (const j of jobs) (counts[j.kind] ??= {})[j.state] = (counts[j.kind][j.state] ?? 0) + 1;
  const owner = {
    scripts: jobs.filter((j) => j.owner?.what === 'approve script'),
    spotCheck: jobs.filter((j) => j.owner?.what?.startsWith('watch')),
    publish: jobs.filter((j) => j.kind === 'video.teaser' && j.legacy_state === 'qa3-pass'),
    blocked: jobs.filter((j) => j.owner?.what === 'unblock'),
  };
  return { at: new Date().toISOString(), counts, owner, jobs, producers: producerStatus(opts) };
}

const scope = (s) => [s.course, s.unit ? `U${s.unit}` : null, s.topic ? `T${s.topic}` : null, s.locale].filter(Boolean).join(' ');

/** Markdown lines for the owner (also used by the crew BOARD.md). */
export function ownerSection(st) {
  const L = [];
  L.push(`Scripts to approve: ${st.owner.scripts.map((j) => `\`${j.key}\``).join(', ') || 'none'}${st.owner.scripts.length ? ' (`crew approve-script <key>` or `crew reject <key> <note>`)' : ''}`);
  if (st.owner.spotCheck.length) {
    L.push('To watch:');
    for (const j of st.owner.spotCheck) L.push(`- ${j.key} ${j.owner.url}${j.owner.notes?.length ? `; notes: ${j.owner.notes.join('; ')}` : ''}${j.kind === 'video.teaser' ? ' (`crew publish <key>` or `crew reject <key> <note>`)' : ''}`);
  } else L.push('To watch: none');
  if (st.owner.blocked.length) L.push(`Blocked: ${st.owner.blocked.map((j) => `${j.key} (${j.owner.detail})`).join(', ')}`);
  const out = st.producers.filter((p) => p.state !== 'ok').map((p) => `${p.producer} ${p.state}${p.resetAt ? ` until ${p.resetAt}` : ''}`);
  L.push(`Producers: ${out.join(', ') || 'all available'}`);
  return L;
}

export function formatStatus(st, { all = false } = {}) {
  const L = [`# Media status ${st.at.slice(0, 16).replace('T', ' ')} UTC`, '', '## Waiting on the owner', ...ownerSection(st), '', '## Jobs by kind and state'];
  for (const [kind, by] of Object.entries(st.counts).sort()) L.push(`- ${kind}: ${Object.entries(by).map(([s, n]) => `${s} ${n}`).join(', ')}`);
  const shown = st.jobs.filter((j) => all || !DONE.has(j.state));
  L.push('', `## ${all ? 'All jobs' : 'Open jobs (not yet public or placed)'} (${shown.length})`, '| Job | Kind | Scope | State | Producers | Owner action |', '|---|---|---|---|---|---|');
  for (const j of shown) L.push(`| ${j.key} | ${j.kind} | ${scope(j.scope)} | ${j.state}${j.legacy_state !== j.state ? ` (${j.legacy_state})` : ''} | ${j.producers.join(' > ')} | ${j.owner ? j.owner.what : ''} |`);
  L.push('', '## Producers', ...st.producers.map((p) => `- ${p.medium} ${p.producer}: ${p.state}${p.resetAt ? ` until ${p.resetAt}` : ''}`));
  return L.join('\n');
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const a = process.argv.slice(2);
  const st = mediaStatus({ probe: a.includes('--probe') });
  console.log(a.includes('--json') ? JSON.stringify(st, null, 1) : formatStatus(st, { all: a.includes('--all') }));
}
