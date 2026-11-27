/**
 * The independent reviewer account (owner ruling 2026-11-27). Only the owner's account works on the
 * repo, so the ruleset's "1 approving review" could only be met by `gh pr merge --admin`, and that
 * bypass also let PRs with a red e2e onto main (two red streaks, #875/#876 and #894/#900). A second
 * GitHub user, driven by the crew, gives the approvals instead; once it is live the ruleset drops the
 * admin bypass and requires CI (ops/crew/README.md, "Reviewer account").
 *
 * The token sits in `$STATE_DIR/reviewer.env` (`REVIEWER_GH_TOKEN=...`), never in the crew's own
 * environment: workers are spawned from crew.mjs and would inherit it (the same reason tick.sh keeps
 * signoff.env in a subshell). Only the `gh` calls below see it. No file, no reviewer: the crew falls
 * back to today's `--admin` merge, so this module is inert until the owner creates the account.
 *
 * Pure helpers apart from readReviewerToken, so tests/crew/reviewer.test.mjs can exercise them.
 */
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

export const REVIEWER_FILE = 'reviewer.env';

/** `REVIEWER_GH_TOKEN=...` from the state dir's reviewer.env, or null. */
export function readReviewerToken(stateDir) {
  const file = join(stateDir, REVIEWER_FILE);
  if (!existsSync(file)) return null;
  return parseReviewerEnv(readFileSync(file, 'utf8'));
}

export function parseReviewerEnv(text) {
  const m = String(text || '').match(/^\s*(?:export\s+)?REVIEWER_GH_TOKEN\s*=\s*['"]?([^'"\s#]+)/m);
  return m ? m[1] : null;
}

/** Child-process env for a `gh` call made as the reviewer account. */
export function reviewerEnv(token, base = process.env) {
  const env = { ...base, GH_TOKEN: token };
  delete env.GITHUB_TOKEN; // gh prefers GH_TOKEN, but never leave the owner's token beside it
  return env;
}

/**
 * The merge command. With a reviewer the PR has just been approved, so merge without the admin
 * bypass and only if the head is still the one approved (the ruleset dismisses stale approvals,
 * and `--match-head-commit` refuses a head that moved in between).
 */
export function mergeArgs(prNumber, { reviewer, headSha } = {}) {
  const base = ['pr', 'merge', String(prNumber), '--merge'];
  if (!reviewer) return [...base, '--admin'];
  return headSha ? [...base, '--match-head-commit', headSha] : base;
}

export function approveArgs(prNumber, body, headSha) {
  // `gh pr review` has no head pin; the caller passes the head it judged so the body records it.
  return ['pr', 'review', String(prNumber), '--approve', '--body', headSha ? `${body}\n\nHead: ${headSha}` : body];
}

export function commentArgs(prNumber, body) {
  return ['pr', 'review', String(prNumber), '--comment', '--body', body];
}

/** What the reviewer account says when it approves a crew PR on the crew's automated checks. */
export function crewApprovalBody(j) {
  const what = j.members?.length ? `crew batch of ${j.members.length} job${j.members.length === 1 ? '' : 's'}` : `crew job \`${j.id}\` (${j.stage})`;
  const review = j.review?.verdict === 'pass' ? ` An independent ${j.review.family} reviewer (${j.review.by}) passed it.` : '';
  return `Automated approval for this ${what}: every CI check is green and \`npm run check:content\` passed on the branch.${review} No human has read this diff; content gates G3/G5 stay with their own reviews.`;
}

/** Every check finished and none failed (CheckRun conclusion or legacy StatusContext state). */
export function ciState(checks) {
  if (!checks?.length) return 'none';
  const pending = checks.some((c) => (c.status ? c.status !== 'COMPLETED' : ['PENDING', 'EXPECTED'].includes(c.state)));
  if (pending) return 'pending';
  const failed = checks.some((c) => (c.status ? !['SUCCESS', 'NEUTRAL', 'SKIPPED'].includes(c.conclusion) : ['FAILURE', 'ERROR'].includes(c.state)));
  return failed ? 'red' : 'green';
}

/** Board id of the review of one PR head: a new push gets a new review. */
export const prReviewId = (n, sha) => `pr${n}-review-${String(sha).slice(0, 7)}`;

/** Reviews of the same PR before the crew stops and asks the owner. */
export const MAX_PR_REVIEWS = 3;

/**
 * Open PRs that need an independent review: not a crew branch (the crew approves its own on its
 * checks), not a draft, CI green, and no review job yet for this head. `latest` reduces a
 * statusCheckRollup to one entry per check (crew.mjs latestChecks).
 */
export function prsToReview(prs, board, latest = (c) => c) {
  return prs.filter((pr) => !pr.isDraft && !String(pr.headRefName).startsWith('crew/')
    && ciState(latest(pr.statusCheckRollup || [])) === 'green'
    && !board.jobs.some((j) => j.id === prReviewId(pr.number, pr.headRefOid))
    && board.jobs.filter((j) => j.stage === 'pr_review' && j.pr === pr.number).length < MAX_PR_REVIEWS);
}

export function prReviewJob(pr, createdAt) {
  return {
    id: prReviewId(pr.number, pr.headRefOid), course: 'PR', unit: pr.number, stage: 'pr_review', status: 'queued', attempts: 0, tried: [],
    pr: pr.number, prBranch: pr.headRefName, headSha: pr.headRefOid, createdAt,
    branch: `crew/${prReviewId(pr.number, pr.headRefOid)}`, base: pr.headRefName,
    scope: `Read-only: PR #${pr.number} on \`${pr.headRefName}\` at ${String(pr.headRefOid).slice(0, 7)}.`,
    task: `PR #${pr.number}: ${pr.title || ''}\n\n${String(pr.body || '').slice(0, 4000)}`,
  };
}

/**
 * What the crew does with a finished PR review: approve a pass on the head it reviewed, comment a
 * revise, and do nothing when the PR moved on (a new head gets its own review) or closed.
 */
export function prReviewAction({ verdict }, pr, reviewedSha) {
  if (!pr || pr.state !== 'OPEN') return 'skip';
  if (pr.headRefOid !== reviewedSha) return 'stale';
  return verdict === 'pass' ? 'approve' : 'comment';
}

export function prReviewBody(job, { verdict, note }, summary) {
  const head = `Independent review by the crew's ${job.family} worker (${job.worker}); the PR's author works on another model family.`;
  return verdict === 'pass'
    ? `${head}\n\n${summary}`
    : `${head} Changes requested before approval:\n\n${summary}\n\n${note || ''}`.trim();
}
