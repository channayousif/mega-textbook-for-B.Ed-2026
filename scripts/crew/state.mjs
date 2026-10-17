/**
 * Crew runtime state. It lives on the host, OUTSIDE any checkout
 * (default ~/.crew/mega-book), because it changes every tick and a stand-in
 * lead (cron, Codex or agy) must find the same files the Claude lead left.
 *
 *   board.json      jobs
 *   health.json     per-worker ok / cooling / down
 *   decisions.json  owner decision queue (asked over openclaw)
 *   inbox.json      last-read message ids per channel
 *   control.json    paused flag, course priorities, owner notes
 *   handled.json    owner commands already answered by `crew.mjs cmd` (so the tick skips them)
 *   logs/<job>.log  worker output; logs/<job>.exit its exit code
 */
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

export const STATE_DIR = process.env.CREW_STATE_DIR || join(homedir(), '.crew', 'mega-book');
export const WT_DIR = process.env.CREW_WORKTREE_DIR || join(homedir(), 'crew-wt');
export const LOG_DIR = join(STATE_DIR, 'logs');
mkdirSync(LOG_DIR, { recursive: true });

const DEFAULTS = {
  board: { jobs: [] },
  health: {},
  decisions: { items: [] },
  inbox: {},
  handled: { items: [] },
  control: { paused: false, priority: [] },
};

export function load(name) {
  const file = join(STATE_DIR, `${name}.json`);
  if (!existsSync(file)) return structuredClone(DEFAULTS[name]);
  return JSON.parse(readFileSync(file, 'utf8'));
}

/** Write via rename so a crash mid-write never leaves half a board. */
export function save(name, value) {
  const file = join(STATE_DIR, `${name}.json`);
  writeFileSync(`${file}.tmp`, JSON.stringify(value, null, 2) + '\n');
  renameSync(`${file}.tmp`, file);
}

export const ACTIVE = ['queued', 'running', 'gate_red', 'pr_open'];
export const TERMINAL = ['merged', 'closed'];

export function jobId(course, unit, stage) {
  return `${course.toLowerCase()}-u${String(unit).padStart(2, '0')}-${stage}`;
}

export const now = () => new Date().toISOString();
