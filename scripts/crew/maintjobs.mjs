/**
 * Board rules for weekly-maintenance jobs (ops/crew/README.md, "Weekly maintenance"): the
 * independent review every maintenance PR needs before it may merge, what a verdict does, and
 * the jobs a survey's tasks.md becomes. They only change the board; the dispatcher does the git
 * and gh work. Kept out of crew.mjs (which runs on import) so tests/crew/ can exercise them.
 */
import { ACTIVE, now } from './state.mjs';
import { parseTasks } from './maintenance.mjs';

/** Maintenance work that ships as its own reviewed PR, never in the hourly content batch. */
export const OWN_PR = new Set(['maint_refactor', 'maint_docs', 'maint_adr', 'maint_skill']);
/** Review rounds a maintenance PR gets before the lead is asked. */
export const MAX_REVIEWS = 3;

const note = (job, event) => { job.history = [...(job.history || []), `${now()} ${event}`].slice(-30); };

/** Queue the independent review a maintenance PR needs before it may merge (one at a time). */
export function queueReview(board, parent, events) {
  const reviews = board.jobs.filter((x) => x.parent === parent.id && x.stage === 'maint_review');
  if (reviews.some((x) => ACTIVE.includes(x.status))) return null;
  if (reviews.length >= MAX_REVIEWS) {
    parent.status = 'gate_red';
    note(parent, `${reviews.length} reviews without a pass; needs the lead`);
    events.push(`🔴 maintenance PR #${parent.prNumber} (${parent.id}) has no passing review after ${reviews.length} rounds`);
    return null;
  }
  const job = { id: `${parent.id}-review${reviews.length + 1}`, parent: parent.id, course: parent.course, unit: parent.unit, stage: 'maint_review',
    status: 'queued', attempts: 0, tried: [], branch: parent.branch, pr: parent.prNumber, week: parent.week, createdAt: now(),
    scope: `Read-only: PR #${parent.prNumber} on \`${parent.branch}\`.`, task: `The task this PR answers:\n\n${parent.task}` };
  board.jobs.push(job);
  note(parent, `review ${reviews.length + 1} queued`);
  return job;
}

/**
 * A reviewer's verdict (`{ verdict: 'pass'|'revise', note }`, with the review's one-line summary):
 * a pass lets the PR merge on green CI; a revise queues one fix with the reviewer's words, and
 * after MAX_REVIEWS - 1 fixes the lead is asked instead.
 */
export function recordReview(board, review, { verdict, note: why = '' }, summary, events) {
  review.status = 'merged';
  note(review, `verdict ${verdict} on ${review.worker}`);
  const parent = board.jobs.find((p) => p.id === review.parent);
  if (!parent) return null;
  parent.review = { verdict, note: why, by: review.worker, family: review.family, at: now(), job: review.id };
  note(parent, `review ${verdict} by ${review.worker} (${review.family})${why ? `: ${why.slice(0, 160)}` : ''}`);
  if (verdict === 'pass') { events.push(`👍 maintenance PR #${parent.prNumber} (${parent.id}) passed review by ${review.worker}`); return null; }
  const rounds = board.jobs.filter((x) => x.parent === parent.id && x.id.includes('-revise')).length;
  if (rounds >= MAX_REVIEWS - 1) {
    parent.status = 'gate_red';
    note(parent, `still revise after ${rounds} fix rounds; needs the lead`);
    events.push(`🔴 maintenance PR #${parent.prNumber} (${parent.id}) still fails review after ${rounds} fix rounds: ${why.slice(0, 160)}`);
    return null;
  }
  const fix = { id: `${parent.id}-revise${rounds + 1}`, parent: parent.id, course: parent.course, unit: parent.unit, stage: 'fix', status: 'queued',
    attempts: 0, tried: [], branch: parent.branch, pr: parent.prNumber, week: parent.week, createdAt: now(), scope: parent.scope,
    task: `An independent reviewer (${review.worker}, ${review.family}) asked for changes to maintenance PR #${parent.prNumber}:\n\n${summary}\n${why}\n\nMake exactly those changes and nothing else, within the original task:\n\n${parent.task}` };
  board.jobs.push(fix);
  return fix;
}

/**
 * The jobs a passed survey's tasks.md becomes (at most six), given the survey job and the text
 * of its tasks.md, spec.md and plan.md. Each job gets a unit number unique to its week, so last
 * week's open PR never blocks this week's task, and a brief that carries the task row plus the
 * spec and plan (which reach main only with the next hourly batch).
 */
export function fanOutJobs(board, survey, { tasks: tasksMd = '', spec = '', plan = '' }) {
  const tasks = parseTasks(tasksMd);
  const context = [spec, plan].join('\n\n').slice(0, 6000);
  const weekNum = Number(survey.week.slice(-2));
  const jobs = [];
  tasks.forEach((t, i) => {
    const id = `maint-${survey.week.toLowerCase()}-${t.id.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    if (board.jobs.some((x) => x.id === id)) return;
    jobs.push({ id, course: 'MAINT', unit: weekNum * 10 + i + 1, stage: t.stage, status: 'queued', attempts: 0, tried: [], week: survey.week, taskRow: t, createdAt: now(),
      scope: `The files this task names (${t.files || 'see the task'}) and what must change with them to stay consistent: callers, tests and docs. Nothing else.`,
      task: `Do maintenance task ${t.id} of ${survey.week} (weekly-maintenance skill, the section for area "${t.area}").

| ID | Area | Title | Files | Acceptance | Risk |
|---|---|---|---|---|---|
| ${t.id} | ${t.area} | ${t.title} | ${t.files} | ${t.acceptance} | ${t.risk} |

The survey's spec and plan follow (they are on the survey branch \`${survey.branch}\` and reach main with the next hourly batch):

${context}` });
  });
  board.jobs.push(...jobs);
  return jobs;
}
