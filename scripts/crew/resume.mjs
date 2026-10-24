/**
 * The "Resume here" block at the top of BOARD.md. Crew state was spread over the board, PHRs,
 * owner notes and decisions, so a fresh lead session (or the owner) had to read all of them to
 * find what was blocked and what came next. This block answers that in one place: are launches
 * flowing, what needs the owner, what needs the lead, what is running and what starts next.
 *
 * Pure functions only, so tests/crew/ can exercise them without running the dispatcher.
 */
import { stallLine } from './stall.mjs';

const ago = (t, nowMs) => { const m = Math.round((nowMs - Date.parse(t)) / 6e4); return m < 90 ? `${m}m` : `${Math.round(m / 60)}h`; };
const lastEvent = (j) => (j.history?.at(-1) || '').slice(25);

/**
 * @param {object} s
 * @param {object} s.board      crew board (jobs, awaitingG3)
 * @param {object} s.decisions  owner decisions (items)
 * @param {object} s.control    crew control (paused, launchStall)
 * @param {object[]} s.nextUp   queued jobs in launch order
 * @param {number} [s.nowMs]
 * @param {number} [s.show]     how many queued jobs to list
 */
export function resumeHere({ board, decisions, control, nextUp, nowMs = Date.now(), show = 5 }) {
  const jobs = board.jobs;
  const by = (status) => jobs.filter((j) => j.status === status);
  const launches = control.paused ? 'paused by the owner ("crew resume" restarts)'
    : control.launchStall ? `**${stallLine(control.launchStall, nowMs)}**`
      : 'flowing';
  const owner = [
    ...decisions.items.filter((d) => d.status === 'open').map((d) => `decision **${d.id}**: ${d.question}`),
    ...by('blocked').map((j) => `\`${j.id}\` is held (${lastEvent(j) || 'blocked'}); "crew retry ${j.id}" releases it`),
    ...(board.awaitingG3?.units?.length ? [`${board.awaitingG3.units.length} unit(s) await your G3 sign-off (list below)`] : []),
  ];
  const lead = by('gate_red').map((j) => `\`${j.id}\`: ${lastEvent(j) || 'gate red'}`);
  const running = by('running').map((j) => `\`${j.id}\` (${j.worker}, ${ago(j.startedAt, nowMs)})`);
  const prs = jobs.filter((j) => j.status === 'pr_open' && j.prNumber).map((j) => `#${j.prNumber} \`${j.id}\``);
  const next = nextUp.slice(0, show).map((j) => `\`${j.id}\``);
  const more = nextUp.length > show ? ` and ${nextUp.length - show} more` : '';
  const list = (xs) => (xs.length ? xs.map((x) => `  - ${x}`).join('\n') : '  - nothing');
  return `## Resume here
- Launches: ${launches}
- Needs the owner:
${list(owner)}
- Needs the lead:
${list(lead)}
- Running: ${running.join(', ') || 'none'}
- PRs waiting on CI or merge: ${prs.join(', ') || 'none'}
- Starts next: ${next.length ? `${next.join(', ')}${more}` : 'nothing queued'}`;
}
