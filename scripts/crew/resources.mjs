/**
 * Crew resource manager for media work (owner, 2026-11-25): "we can use different media producers
 * in parallel (eg notebook, flow, meta, agy, codex); each producer has max one slot in allotted time
 * already decided". The allotted time is the media hours of D-2026-0100 (scripts/media/pacing.mjs).
 *
 * Every media stage runs on a producer LANE. A lane holds at most one running job, lanes run in
 * parallel, and they sit outside the crew's text slots (CREW_MAX_PARALLEL), because a media job
 * mostly waits on a remote producer. A lane takes a job only in media hours and only while its
 * paced channel has room left today. Memory and disk floors, ledger rules and worker capacity are
 * checked by crew.mjs as for every launch.
 *
 * Pure (inputs are passed in), so tests/crew/resources.test.mjs can exercise it.
 */

/** Lanes, one running job each. `meta` is the Meta AI image producer (spec 033, D-2026-0102). */
export const LANES = ['notebook', 'notebook2', 'flow', 'flow2', 'agy', 'agy2', 'codex', 'meta', 'youtube', 'social'];

/** Image lanes, in the producer order of ADR-0029 (owner ruling 2026-11-18), and the
 * generate-illustration.mjs `--producer` name of each. */
export const IMAGE_LANES = ['agy', 'agy2', 'flow', 'flow2', 'codex', 'meta'];
export const LANE_PRODUCER = { agy: 'agy', agy2: 'agy2', flow: 'gflow', flow2: 'gflow2', codex: 'codex', meta: 'meta' };
/** The nlm profile a notebook lane uses (Feature 036): `notebook2` is the second Google account. */
export const LANE_NLM_PROFILE = { notebook: 'default', notebook2: 'second' };

/** Which lanes can run a stage; null for text and local stages (they use the text slots). */
export function stageLanes(stage) {
  switch (stage) {
    case 'illustrate': return IMAGE_LANES;
    case 'teaser_clips': return ['flow'];
    case 'studio_media': case 'audio_overview': return ['notebook', 'notebook2'];
    case 'media_assemble': case 'media_publish': case 'studio_publish': return ['youtube'];
    case 'social_roundup': return ['social'];
    default: return null;
  }
}
export const isLaneStage = (stage) => stageLanes(stage) !== null;

/** The lane a running job holds (jobs launched before lanes existed carry no `lane`). */
export const laneOf = (j) => j.lane ?? stageLanes(j.stage)?.[0] ?? null;

/**
 * Paced channels a job on this lane spends; it may launch when ANY of them has room today.
 * An empty list means the job spends nothing paced (setting a video public, placing links).
 */
export function laneChannels(stage, lane) {
  if (stage === 'media_publish' || stage === 'studio_publish') return [];
  // Clips try the first account, then the second (producers/index.mjs REGISTRY.clip): either has room.
  if (lane === 'flow') return stage === 'teaser_clips' ? ['gflow.video', 'gflow2.video'] : ['gflow.image'];
  if (lane === 'flow2') return ['gflow2.image'];
  if (lane === 'agy') return ['agy.image'];
  if (lane === 'agy2') return ['agy2.image'];
  if (lane === 'codex') return ['codex.image'];
  if (lane === 'meta') return ['meta.image'];
  // A studio job either makes NotebookLM artifacts or uploads finished ones, so either counts.
  if (lane === 'notebook') return ['nlm.studio', 'youtube.upload'];
  if (lane === 'notebook2') return ['nlm2.studio', 'youtube.upload'];
  if (lane === 'youtube') return ['youtube.upload'];
  if (lane === 'social') return ['social.facebook', 'social.instagram', 'social.linkedin'];
  return [];
}

const PKT_MS = 5 * 3600e3;
const pktDayStart = (ms) => Math.floor((ms + PKT_MS) / 86400e3) * 86400e3 - PKT_MS;

/**
 * Whether a channel has any room left today under its daily cap (the gap and hourly limits are
 * left to the producer, which sleeps or holds). `evs` are { at: ms, units } from pacing.mjs events().
 */
export function dailyRoom(channel, evs, lim, nowMs = Date.now()) {
  const c = lim.channels?.[channel];
  if (!c) return false;
  const today = evs.filter((e) => e.at >= pktDayStart(nowMs));
  if (c.perDayCount != null && today.length >= c.perDayCount) return false;
  // Veo's monthly pool is left to the producer (pacing.mjs decide), which holds the job if it bites.
  if (c.perDayUnits != null && today.reduce((s, e) => s + (e.units ?? 1), 0) >= c.perDayUnits) return false;
  return true;
}

/** Room left today per channel, for the board ("3 of 4"). */
export function dailyUse(channel, evs, lim, nowMs = Date.now()) {
  const c = lim.channels?.[channel] ?? {};
  const today = evs.filter((e) => e.at >= pktDayStart(nowMs));
  if (c.perDayUnits != null) return { used: today.reduce((s, e) => s + (e.units ?? 1), 0), cap: c.perDayUnits, unit: 'credits' };
  return { used: today.length, cap: c.perDayCount ?? null, unit: 'calls' };
}

/**
 * The lane a queued job may launch on now, or why it waits.
 * @param {object} j                     the queued job
 * @param {object} ctx
 * @param {boolean} ctx.open             inside media hours
 * @param {Set<string>} ctx.busy         lanes holding a running job
 * @param {(ch: string) => boolean} ctx.room       a paced channel has room today
 * @param {(lane: string) => boolean} ctx.producerOk   the producer is reachable and not out of quota
 * @returns {{ lane: string, producer?: string } | { wait: string }}
 */
export function pickLane(j, { open, busy, room, producerOk = () => true }) {
  const lanes = stageLanes(j.stage);
  if (!lanes) return { wait: 'not a media stage' };
  if (!open) return { wait: 'media hours closed' };
  const reasons = [];
  for (const lane of lanes) {
    if (busy.has(lane)) { reasons.push(`${lane} busy`); continue; }
    if (!producerOk(lane)) { reasons.push(`${lane} out of quota or offline`); continue; }
    const chans = laneChannels(j.stage, lane);
    if (chans.length && !chans.some(room)) { reasons.push(`${lane} daily cap reached`); continue; }
    return LANE_PRODUCER[lane] && j.stage === 'illustrate' ? { lane, producer: LANE_PRODUCER[lane] } : { lane };
  }
  return { wait: reasons.join(', ') };
}

/**
 * Jobs that write one ledger must never overlap: the teaser ledger (one file for every course) and
 * each unit's Study Studio ledger. Returns the ledger key a job writes, or null.
 */
export function ledgerOf(j) {
  if (['teaser_script', 'teaser_clips', 'media_assemble', 'media_publish'].includes(j.stage)) return 'teasers';
  if (['studio_media', 'audio_overview', 'studio_publish'].includes(j.stage)) return `studio:${j.course}#${j.unit}`;
  return null;
}

/**
 * "Today's media plan" for BOARD.md: the window, each lane (running job, or the next queued job and
 * why it waits), and the room left on every paced channel.
 */
export function todayPlan({ open, nextOpenAt, running, queued, waits = {}, use = {} }) {
  const lines = [`Media hours ${open ? 'open' : `closed; next opening ${nextOpenAt}`}. One job per producer lane; lanes run in parallel, outside the text slots.`];
  lines.push('', '| Lane | Now | Next | Waiting because |', '|---|---|---|---|');
  for (const lane of LANES) {
    const r = running.find((j) => laneOf(j) === lane);
    const next = queued.find((j) => stageLanes(j.stage)?.includes(lane));
    const why = r ? '' : next ? (waits[next.id] ?? (open ? '' : 'media hours closed')) : 'nothing queued';
    lines.push(`| ${lane} | ${r ? `\`${r.id}\`` : 'idle'} | ${next ? `\`${next.id}\`` : '-'} | ${why} |`);
  }
  const chans = Object.entries(use);
  if (chans.length) lines.push('', `Used today: ${chans.map(([c, u]) => `${c} ${u.used}${u.cap != null ? `/${u.cap}` : ''}`).join(' · ')}`);
  return lines.join('\n');
}
