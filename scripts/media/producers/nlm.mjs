// nlm: NotebookLM audio and video overviews, mind maps and study guides through the `nlm` CLI
// (Feature 030, T026; doc kinds #908).
//
// Wraps the studio-media skill's generate and download steps. Generation takes minutes, so the
// producer is resumable: it creates the artifact once (job.artifact_id afterwards), waits up to
// `waitMs` for it, and downloads it. Still generating returns `unavailable` with `mediaId`, so the
// next call downloads the same artifact instead of creating (and paying for) another.
// Expired cookies are `unavailable`, never `failed`: the owner refreshes the login (`nlm login`).
// Do not import this file from any content gate (FR-018).
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, statSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { pace, paceRecord, PaceHold } from '../pacing.mjs';

export const AUTH_RE = /cookies? (have|has) expired|authentication (may have )?expired|not authenticated|re-?authenticate|nlm login|401|unauthori[sz]ed/i;
export const NLM_QUOTA_RE = /quota|limit reached|daily limit|too many requests|429/i;
const TYPE = { 'audio.brief': 'audio', 'audio.deeper': 'audio', 'video.overview': 'video', 'doc.mindmap': 'mindmap', 'doc.studyguide': 'report' };
const EXT = { audio: 'm4a', video: 'mp4', mindmap: 'json', report: 'md' };
/** `nlm download <what>` per type. */
const DOWNLOAD = { audio: 'audio', video: 'video', mindmap: 'mind-map', report: 'report' };
/** A mind map is saved as a note the moment it is created; there is no studio status to wait on. */
const INSTANT = new Set(['mindmap']);

const defaultRun = (args, timeoutMs = 300000) => {
  const r = spawnSync('nlm', args, { encoding: 'utf8', timeout: timeoutMs });
  return { status: r.status, stdout: r.stdout ?? '', stderr: r.stderr ?? (r.error ? r.error.message : '') };
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Map a failed nlm run to a contract status. */
export function classify(r) {
  const text = `${r.stderr}\n${r.stdout}`;
  if (AUTH_RE.test(text)) return { status: 'unavailable', reason: 'NotebookLM login expired; run `nlm login` (owner)' };
  if (NLM_QUOTA_RE.test(text)) return { status: 'quota', reason: text.trim().slice(0, 300) };
  if (r.status === null) return { status: 'unavailable', reason: 'nlm timed out' };
  return { status: 'failed', reason: text.trim().slice(0, 300) || `nlm exit ${r.status}` };
}

/** First artifact id in nlm JSON output ({ artifact_id } or { id }, possibly nested). */
export function artifactId(stdout) {
  try {
    const j = JSON.parse(stdout);
    const find = (o) => (o && typeof o === 'object' ? o.artifact_id ?? o.id ?? Object.values(o).map(find).find(Boolean) : null);
    return find(j);
  } catch { return stdout.match(/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i)?.[0] ?? null; }
}

/** The artifact's status from `nlm studio status --json --artifact-id`. */
export function artifactStatus(stdout) {
  try {
    const j = JSON.parse(stdout);
    const list = Array.isArray(j) ? j : j.artifacts ?? [j];
    return String(list[0]?.status ?? '').toLowerCase();
  } catch { return ''; }
}

/** The `nlm ... create` arguments for a job. */
export function createArgs(type, job) {
  if (type === 'mindmap') return ['mindmap', 'create', job.notebook_id, '--confirm', '--json', ...(job.title ? ['--title', job.title] : [])];
  if (type === 'report') {
    // English uses the built-in Study Guide (it takes no prompt); Urdu uses Create Your Own with the
    // prompt from specs/studio/prompts/study-guide.md plus the Urdu register suffix.
    const args = ['report', 'create', job.notebook_id, '--confirm', '--json', '--format', job.prompt ? 'Create Your Own' : 'Study Guide'];
    if (job.prompt) args.push('--prompt', job.prompt);
    if (job.language) args.push('--language', job.language);
    return args;
  }
  const args = [type, 'create', job.notebook_id, '--confirm', '--json'];
  if (job.format) args.push('--format', job.format);
  if (job.length) args.push('--length', job.length);
  if (job.language) args.push('--language', job.language);
  if (job.focus) args.push('--focus', job.focus);
  return args;
}

/**
 * job: { key, kind, notebook_id, artifact_id?, format?, length?, language?, focus?, title?, prompt?, outDir }.
 * part is unused (one artifact per job). title is the mind map's title; prompt makes an Urdu study guide.
 */
export function nlmProducer({ run = defaultRun, waitMs = 25 * 60 * 1000, pollMs = 30000, profile, pace: paceFn = pace, record: recordFn = paceRecord } = {}) {
  const pf = profile ? ['--profile', profile] : [];
  return async (job) => {
    const type = TYPE[job.kind];
    if (!type) return { status: 'failed', reason: `nlm does not make ${job.kind}` };
    let id = job.artifact_id;
    if (!id) {
      // Paced (D-2026-0100): creating an artifact is the call NotebookLM counts; downloads are not.
      try {
        await paceFn('nlm.studio', 1);
      } catch (e) {
        if (e instanceof PaceHold) return { status: 'quota', paced: true, resetAt: e.resetAt, reason: e.message };
        throw e;
      }
      recordFn('nlm.studio', 1);
      const r = run([...createArgs(type, job), ...pf]);
      if (r.status !== 0) return classify(r);
      id = artifactId(r.stdout);
      if (!id) return { status: 'failed', reason: `nlm create gave no artifact id: ${r.stdout.slice(0, 200)}` };
    }
    const until = Date.now() + waitMs;
    while (!INSTANT.has(type)) {
      const s = run(['studio', 'status', job.notebook_id, '--json', '--artifact-id', id, ...pf], 120000);
      if (s.status !== 0) return { ...classify(s), mediaId: id };
      const st = artifactStatus(s.stdout);
      if (/fail|error/.test(st)) return { status: 'failed', mediaId: id, reason: `NotebookLM reports ${st}` };
      if (/complete|ready|done/.test(st)) break;
      if (Date.now() + pollMs > until) return { status: 'unavailable', mediaId: id, reason: `still generating (${st || 'unknown'}); the next call downloads ${id}` };
      await sleep(pollMs);
    }
    mkdirSync(job.outDir, { recursive: true });
    const out = join(job.outDir, `${job.key}.${EXT[type]}`);
    const d = run(['download', DOWNLOAD[type], job.notebook_id, '--id', id, '--output', out, ...pf], 600000);
    if (d.status !== 0 || !existsSync(out) || statSync(out).size === 0) return { ...classify(d), mediaId: id };
    return { status: 'ok', source: 'generated', file: out, sha256: createHash('sha256').update(readFileSync(out)).digest('hex'), mediaId: id, credits: 0, model: `NotebookLM ${type}`, reason: 'generated' };
  };
}
