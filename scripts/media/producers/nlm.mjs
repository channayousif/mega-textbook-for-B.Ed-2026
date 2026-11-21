// nlm: NotebookLM audio and video overviews through the `nlm` CLI (Feature 030, T026).
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

export const AUTH_RE = /cookies? (have|has) expired|authentication (may have )?expired|not authenticated|re-?authenticate|nlm login|401|unauthori[sz]ed/i;
export const NLM_QUOTA_RE = /quota|limit reached|daily limit|too many requests|429/i;
const TYPE = { 'audio.brief': 'audio', 'audio.deeper': 'audio', 'video.overview': 'video' };
const EXT = { audio: 'm4a', video: 'mp4' };

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

/**
 * job: { key, kind, notebook_id, artifact_id?, format?, length?, language?, focus?, outDir }.
 * part is unused (one artifact per job).
 */
export function nlmProducer({ run = defaultRun, waitMs = 25 * 60 * 1000, pollMs = 30000, profile } = {}) {
  const pf = profile ? ['--profile', profile] : [];
  return async (job) => {
    const type = TYPE[job.kind];
    if (!type) return { status: 'failed', reason: `nlm does not make ${job.kind}` };
    let id = job.artifact_id;
    if (!id) {
      const args = [type, 'create', job.notebook_id, '--confirm', '--json', ...pf];
      if (job.format) args.push('--format', job.format);
      if (job.length) args.push('--length', job.length);
      if (job.language) args.push('--language', job.language);
      if (job.focus) args.push('--focus', job.focus);
      const r = run(args);
      if (r.status !== 0) return classify(r);
      id = artifactId(r.stdout);
      if (!id) return { status: 'failed', reason: `nlm create gave no artifact id: ${r.stdout.slice(0, 200)}` };
    }
    const until = Date.now() + waitMs;
    for (;;) {
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
    const d = run(['download', type, job.notebook_id, '--id', id, '--output', out, ...pf], 600000);
    if (d.status !== 0 || !existsSync(out) || statSync(out).size === 0) return { ...classify(d), mediaId: id };
    return { status: 'ok', source: 'generated', file: out, sha256: createHash('sha256').update(readFileSync(out)).digest('hex'), mediaId: id, credits: 0, model: `NotebookLM ${type}`, reason: 'generated' };
  };
}
