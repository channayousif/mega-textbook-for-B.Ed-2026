/**
 * Hourly batch PRs (owner, 2026-10-19). One PR per finished job meant a push to main
 * every few minutes. Each push queues a full CI run (rls and e2e share one database
 * and run one at a time), and scripts/deploy-prod.sh deploys only main's head once
 * ITS run passes, so the head moved on before any run finished and production
 * stopped deploying. Finished jobs now wait as `ready`, and at most once an hour,
 * with no batch PR already open, the crew merges them into one batch branch and
 * opens one PR for all of them.
 *
 * Pure functions only, so tests/crew/ can exercise them without running the dispatcher.
 */

export const BATCH_EVERY_MIN = Number(process.env.CREW_BATCH_EVERY_MIN || 60);
const FIX_STATUSES = ['queued', 'running'];

/** True when a batch may be opened now: none open and the last one at least `everyMin` ago. */
export function batchDue(board, nowMs = Date.now(), everyMin = BATCH_EVERY_MIN) {
  if (board.jobs.some((j) => j.stage === 'batch' && ['pr_open', 'gate_red'].includes(j.status))) return false;
  if (!board.lastBatchAt) return true;
  return nowMs - Date.parse(board.lastBatchAt) >= everyMin * 60e3;
}

/** Ready jobs to try in the next batch, oldest first; a job with a fix still running waits. */
export function batchCandidates(jobs) {
  const fixing = new Set(jobs.filter((x) => x.parent && FIX_STATUSES.includes(x.status)).map((x) => x.parent));
  return jobs
    .filter((j) => j.status === 'ready' && !fixing.has(j.id))
    .sort((a, b) => String(a.readyAt || a.createdAt).localeCompare(String(b.readyAt || b.createdAt)));
}

/** `batch-YYYYMMDD-HHMM` in UTC. */
export function batchId(iso) {
  return `batch-${iso.slice(0, 10).replace(/-/g, '')}-${iso.slice(11, 16).replace(':', '')}`;
}

export function batchTitle(members, iso) {
  const courses = [...new Set(members.map((j) => j.course))].sort();
  const shown = courses.length > 4 ? `${courses.slice(0, 4).join(', ')} +${courses.length - 4}` : courses.join(', ');
  return `crew: batch ${iso.slice(0, 16).replace('T', ' ')}Z, ${members.length} job${members.length === 1 ? '' : 's'} (${shown})`;
}

export function batchBody(members, { left = [], supersedes = [] } = {}) {
  const rows = members.map((j) => `| \`${j.id}\` | ${j.stage} | ${j.worker || ''} | ${(j.summary || '').replace(/\|/g, '/').replace(/\n/g, ' ')} |`);
  return [
    `One crew batch: ${members.length} finished job${members.length === 1 ? '' : 's'}, merged together onto main's head. \`npm run check:content\` passed on the combined branch; CI builds the site. The crew auto-merges this PR when CI is green.`,
    '',
    '| Job | Stage | Worker | Summary |',
    '|---|---|---|---|',
    ...rows,
    ...(left.length ? ['', `Left for the next batch (a merge fix is queued): ${left.map((j) => `\`${j.id}\``).join(', ')}.`] : []),
    ...(supersedes.length ? ['', `Supersedes ${supersedes.map((n) => `#${n}`).join(', ')}.`] : []),
    '',
    '🤖 Generated with [Claude Code](https://claude.com/claude-code)',
  ].join('\n');
}

/**
 * Build the exclusion reason for a job that could not join the hourly batch.
 * Starts with "<branch> conflicts with main" and lists at most five of the
 * unmerged paths, with a count of the rest.
 */
export function exclusionReason(branch, paths) {
  const base = `${branch} conflicts with main`;
  if (!paths.length) return `${base}.`;
  const shown = paths.slice(0, 5);
  const rest = paths.length - shown.length;
  const list = rest ? `${shown.join(', ')} and ${rest} more` : shown.join(', ');
  return `${base} (${list}).`;
}
