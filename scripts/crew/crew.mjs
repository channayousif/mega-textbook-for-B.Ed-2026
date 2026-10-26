#!/usr/bin/env node
/**
 * crew - the repo-native replacement for the Paperclip CEO (ops/crew/README.md).
 *
 *   node scripts/crew/crew.mjs plan [--dry-run]     derive jobs from main's content state
 *   node scripts/crew/crew.mjs tick [--dry-run]     inbox, reap, PRs, launch (the lead loop body)
 *   node scripts/crew/crew.mjs status               write and print BOARD.md
 *   node scripts/crew/crew.mjs retire [--dry-run]   delete Paperclip branches replaced by merged salvage PRs
 *   node scripts/crew/crew.mjs cmd "<owner message>"  apply one owner command now and print the reply
 *   node scripts/crew/crew.mjs digest               send the daily digest to the owner
 *   node scripts/crew/crew.mjs add <course> <unit> <stage> [--branch b] [--pr n] [--task "..."]
 *   node scripts/crew/crew.mjs ask "<question>" [--options "a|b"] [--job id]
 *   node scripts/crew/crew.mjs health [worker ok|down|cooling]
 *   node scripts/crew/crew.mjs notify "<text>" [--urgent] [--dry-run]
 *
 * Run it from a clean checkout of origin/main (the "control" checkout). Workers
 * never touch that checkout; each job gets its own worktree under WT_DIR.
 * The crew never runs `npm run build` locally: CI builds every PR on GitHub's
 * runners, which keeps this production host's RAM for the live site.
 */
import { spawn, spawnSync } from 'node:child_process';
import { appendFileSync, closeSync, existsSync, mkdirSync, openSync, readFileSync, readSync, readdirSync, renameSync, rmSync, statSync, symlinkSync, writeFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { WORKERS, STAGES, QUOTA_RE, COOLDOWN_MIN, resetMinutes, pickWorker } from './workers.mjs';
import { STATE_DIR, WT_DIR, LOG_DIR, load, save, ACTIVE, TERMINAL, jobId, now } from './state.mjs';
import { send, reply, readInbox } from './notify.mjs';
import { reviewFindingsSection, parseHandoff, priorHandoffsSection } from './handoff.mjs';
import { freshChecks } from './checks.mjs';
import { batchDue, batchCandidates, batchId, batchTitle, batchBody, exclusionReason } from './batch.mjs';
import { stagesFor, awaitingG3, mirrorComplete, pickLatestReport, specUnitNumbers } from './planner.mjs';
import { walkUnits } from '../lib/content-roots.mjs';
import { REGISTRIES, registryProblems, mergeGlossary } from './registries.mjs';
import { weekId, local, harvestSlot, slotsBetween, harvestDue, distillDue, maintenanceDue, contentFiles, maintenanceVerdict, parseVerdict } from './maintenance.mjs';
import { OWN_PR, queueReview, recordReview, fanOutJobs } from './maintjobs.mjs';
import { boardSignals, logSignals, cronSignals, phrSignals, reviewSignals, foldSignals, newlyHot, distillDigest, effect, parseRegistry } from './intel.mjs';
import { noteStall, clearStall, stallAlertDue, heldFor, stallLine } from './stall.mjs';
import { resumeHere } from './resume.mjs';

const ROOT = resolve(new URL('../..', import.meta.url).pathname);
const MAX_PARALLEL = Number(process.env.CREW_MAX_PARALLEL || 3);
const MIN_FREE_MB = Number(process.env.CREW_MIN_FREE_MB || 3072);
// A full checkout is about 2.3 GB, most of it G3/G5 render evidence that no gate reads, so job
// worktrees are sparse (about 0.6 GB). The disk floor keeps the live site and Supabase writable:
// on 2026-10-17 the disk reached 99% and every tick crashed in `git worktree add`.
const MIN_FREE_DISK_MB = Number(process.env.CREW_MIN_FREE_DISK_MB || 8192);
const SPARSE = ['/*', '!/specs/content/*/reviews/**/renders-*/'];
const JOB_TIMEOUT = process.env.CREW_JOB_TIMEOUT || '3h';
const PUSH_SETTLE_MS = 3 * 60e3;
// Self-maintenance stages sit just after fixes: a handful a week, so the corpus queue cannot starve them.
const STAGE_ORDER = ['salvage', 'fix', 'maint_review', 'maint_survey', 'maint_refactor', 'maint_docs', 'maint_adr', 'maint_skill', 'intel_distill',
  'repair_en', 'review_en', 'review_ur', 'translate', 'figures', 'illustrate', 'author'];
/** Self-maintenance (scripts/crew/maintenance.mjs) and intelligence (scripts/crew/intel.mjs) stages. */
const isSelf = (stage) => /^(maint|intel)_/.test(stage);
const INTEL_DIR = join(STATE_DIR, 'intel');
/** A PR touching any of these is never auto-merged; the owner is asked instead. */
const PROTECTED = [/^specs\/content\/style-guide\.md$/, /^\.specify\//, /^history\/adr\//, /^\.github\//,
  /^scripts\//, /^catalog\//, /^package(-lock)?\.json$/, /content-spec\.md$/, /\/intake(-\d+)?\//, /^CLAUDE\.md$/, /^AGENTS\.md$/];
/** Maintenance PRs also ask before changing skills or agent definitions: they steer every worker. */
const MAINT_PROTECTED = [...PROTECTED, /^\.claude\//];

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const opt = (name) => { const i = args.indexOf(`--${name}`); return i >= 0 ? args[i + 1] : undefined; };
const DRY = flag('dry-run');

function sh(cmd, cmdArgs, cwd = ROOT, { allowFail = false } = {}) {
  const r = spawnSync(cmd, cmdArgs, { cwd, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  if (r.status !== 0 && !allowFail) throw new Error(`${cmd} ${cmdArgs.join(' ')}: ${(r.stderr || r.stdout).trim().slice(-800)}`);
  return { ok: r.status === 0, out: (r.stdout || '').trim(), err: (r.stderr || '').trim() };
}
const familyOf = (worker) => WORKERS[worker]?.family;
const unitKey = (j) => `${j.course}#${j.unit}`;
const pad = (n) => String(n).padStart(2, '0');
function log(board, job, event) { job.history = [...(job.history || []), `${now()} ${event}`].slice(-30); }

// ---------------------------------------------------------------- plan

/** Reads main's content state (the same source the status report and the site use). */
function contentStatus() {
  sh('node', ['scripts/report-content-status.mjs']);
  return JSON.parse(readFileSync(join(ROOT, 'static', 'content-status.json'), 'utf8'));
}

function latestReport(course, unit, gate) {
  const dir = join(ROOT, 'specs', 'content', course.toLowerCase(), 'reviews', `unit-${pad(unit)}`, gate);
  if (!existsSync(dir)) return null;
  const entries = readdirSync(dir).filter((f) => f.endsWith('.json')).map((f) => {
    try { return { file: join(dir, f), json: JSON.parse(readFileSync(join(dir, f), 'utf8')) }; } catch { return { file: join(dir, f), json: null }; }
  });
  return pickLatestReport(entries);
}

function trackerSuggestion(course, unit, stagePrefix) {
  const file = join(ROOT, 'specs', 'content', course.toLowerCase(), 'tasks.md');
  if (!existsSync(file)) return '';
  const rows = readFileSync(file, 'utf8').split('\n').filter((l) => l.startsWith(`| Unit ${unit} | ${stagePrefix}`));
  return rows.at(-1) || '';
}

function isBilingual(catalog, code) {
  for (const s of catalog.semesters) for (const c of s.courses) if (c.code === code) return c.bilingual !== false;
  return true;
}

/** Every unit's English and Urdu folders, keyed `COURSE#unit`, from the shared content-roots helper. */
function unitDirs() {
  return new Map(walkUnits(ROOT).map((u) => [`${u.courseCode}#${u.unitNo}`, u]));
}
const listDir = (dir) => (existsSync(dir) ? readdirSync(dir) : []);

/** course code -> unit numbers its approved content-spec defines. */
function specUnits() {
  const out = new Map();
  const dir = join(ROOT, 'specs', 'content');
  for (const name of listDir(dir)) {
    const file = join(dir, name, 'content-spec.md');
    if (!existsSync(file)) continue;
    const text = readFileSync(file, 'utf8');
    const code = /^course_code:\s*"?([A-Z]{4}-\d{3})/m.exec(text)?.[1];
    if (code) out.set(code, specUnitNumbers(text));
  }
  return out;
}

/** What the planner needs to know about a unit on main (rules in scripts/crew/planner.mjs). */
function unitFacts(course, u, bilingual, dirs) {
  const d = dirs.get(`${course}#${u.unit_no}`);
  return {
    bilingual,
    g3Report: latestReport(course, u.unit_no, 'G3'),
    g3Repaired: /repairs applied/i.test(trackerSuggestion(course, u.unit_no, 'G3')),
    g5Report: latestReport(course, u.unit_no, 'G5'),
    mirrorComplete: d ? mirrorComplete(listDir(d.unitDir), listDir(d.urUnitDir)) : false,
  };
}

function plan() {
  const board = load('board');
  const catalog = JSON.parse(readFileSync(join(ROOT, 'catalog', 'courses.json'), 'utf8'));
  const status = contentStatus();
  const dirs = unitDirs();
  const added = [];
  const awaiting = [];
  const queue = (course, unit, stage) => {
    const base = jobId(course, unit, stage);
    const prior = board.jobs.filter((j) => j.id === base || j.id.startsWith(`${base}-r`));
    if (prior.some((j) => ACTIVE.includes(j.status) || j.status === 'blocked')) return;
    // A merged job whose need persists means its output did not change main's state; do not loop on it.
    if (prior.filter((j) => j.status === 'merged').length >= 2) return;
    const id = prior.length ? `${base}-r${prior.length}` : base;
    added.push({ id, course, unit, stage, status: 'queued', attempts: 0, tried: [], createdAt: now() });
  };
  for (const c of status.courses) {
    for (const u of c.units) {
      const facts = unitFacts(c.course_code, u, isBilingual(catalog, c.course_code), dirs);
      if (awaitingG3(u, facts)) {
        awaiting.push({ course: c.course_code, unit: u.unit_no, disposition: facts.g3Report.disposition, report: relative(ROOT, facts.g3Report.file) });
      }
      for (const stage of stagesFor(u, facts)) queue(c.course_code, u.unit_no, stage);
    }
  }
  // Units an approved spec defines but nobody has written yet are not in the content status at all.
  for (const [course, units] of specUnits()) {
    const onDisk = new Set((status.courses.find((c) => c.course_code === course)?.units || []).map((u) => u.unit_no));
    for (const n of units) if (!onDisk.has(n)) queue(course, n, 'author');
  }
  // Units whose agent review is done and that wait only for a person's G3 sign-off (ADR-0019).
  board.awaitingG3 = { at: now(), units: awaiting };
  if (!DRY) { board.jobs.push(...added); save('board', board); }
  console.log(`${DRY ? '[dry-run] ' : ''}planned ${added.length} job(s); ${awaiting.length} unit(s) await G3 sign-off`);
  for (const j of added) console.log(`  + ${j.id}`);
  return added;
}

// ---------------------------------------------------------------- briefs

const STAGE_TASK = {
  salvage: (j) => `This branch carries earlier, unfinished work from ${j.pr ? `PR #${j.pr}` : 'an earlier branch'} (${j.base}). Run \`git fetch origin && git rebase origin/main\`, resolve every conflict (keep this unit's content; take main's version of shared files such as the style guide, gates and catalog), then make every content gate pass.${j.task ? ` Extra instructions: ${j.task}` : ''}`,
  author: (j) => `Author ${j.course} Unit ${j.unit} from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job).`,
  repair_en: (j) => `Apply the findings of the latest G3 report under specs/content/${j.course.toLowerCase()}/reviews/unit-${pad(j.unit)}/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit ${j.unit} G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.`,
  figures: (j) => `Render every prompt-only schematic figure for ${j.course} Unit ${j.unit} (generate-figures skill): diagrams, tables, concept maps, flowcharts and timelines as SVG with their .ur.svg variants. Leave raster illustrations at prompt-only for the illustrate job.`,
  illustrate: (j) => `Produce the raster illustrations for ${j.course} Unit ${j.unit} with \`scripts/heavy.sh node scripts/generate-illustration.mjs\` per ADR-0029, inspect each for pedagogy and cultural accuracy, optimise, place, and move the manifest rows to placed.`,
  review_en: (j) => `Act as the INDEPENDENT G3 English reviewer of ${j.course} Unit ${j.unit} (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign.`,
  translate: (j) => `Translate ${j.course} Unit ${j.unit} into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.`,
  review_ur: (j) => `Act as the INDEPENDENT G5 Urdu reviewer of ${j.course} Unit ${j.unit} (review-unit skill, .claude/agents/g5-reviewer.md). You did not translate this unit. Produce the evidence report and advisory tracker row. Never tick G5, never self-sign.`,
  fix: (j) => j.task || `Make every content gate pass for ${j.course} Unit ${j.unit} with the smallest edits.`,
  intel_distill: (j) => `Distil today's reusable intelligence (intel-distill skill) into \`specs/intelligence/daily/${j.day}.md\`. These clusters grew in the last 24 hours (kind, recent count, total, signature, an example, evidence):\n\n${j.task}`,
  maint_survey: (j) => `Run the ${j.week} maintenance survey (weekly-maintenance skill, "Survey"). Look at what changed since ${j.since.slice(0, 10)} and at this week's intelligence (\`specs/intelligence/daily/\`, \`specs/intelligence/registry.md\`), and write \`specs/maintenance/${j.week}/spec.md\`, \`plan.md\`, \`tasks.md\` and \`intelligence.md\`.`,
  maint_refactor: (j) => j.task,
  maint_docs: (j) => j.task,
  maint_adr: (j) => j.task,
  maint_skill: (j) => j.task,
  maint_review: (j) => `Act as the INDEPENDENT reviewer of maintenance PR #${j.pr} (weekly-maintenance skill, "Review"). Another model family wrote it. Read the task it answers and \`git diff origin/main...HEAD\`, check every acceptance item and the rules, and change nothing.\n\n${j.task}`,
};

/** The rules line every brief opens with; self-maintenance may touch what content jobs must not. */
function briefRules(j, self) {
  const common = 'no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`';
  if (!self) return `${common}, never mark G3/G5 done, never self-sign or use\nhuman initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.`;
  return `${common}, and never touch course content (\`docs/\`, \`licence/\`, the Urdu docs trees,
\`specs/content/\`, \`static/img/figures/\`, \`glossary.json\`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.`;
}

/** How a job proves it is finished. */
function doneWhen(j, self) {
  if (j.stage === 'maint_review') return `1. You changed nothing and committed nothing.
2. Your final output ends with one line: \`CREW-VERDICT: pass\` or \`CREW-VERDICT: revise - <what must change, specifically>\`.
3. Just before it, one line \`CREW-SUMMARY: <your verdict in one sentence>\`.`;
  const handoff = `4. Optional, just before it: up to 3 lines \`CREW-HANDOFF: <note>\` for facts the next job needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.`;
  if (self) return `1. The acceptance checks in your task pass; \`npm run check:content\` reports nothing new against origin/main;
   any \`node --test tests/crew/*.test.mjs\` or unit tests covering what you changed pass.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: \`CREW-SUMMARY: <what you changed, in one sentence>\`.
${handoff}`;
  return `1. \`npm run check:content\` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: \`CREW-SUMMARY: <what you changed, in one sentence>\`.
${handoff.replace('the next job needs', 'the next job on this unit needs')}`;
}

function brief(j, board) {
  const skill = STAGES[j.stage].skill;
  const findings = j.stage === 'repair_en' ? reviewFindingsSection(latestReport(j.course, j.unit, 'G3'), { root: ROOT }) : '';
  const notes = priorHandoffsSection(board.jobs, j);
  const scope = j.scope || (j.unit === 0
    ? `The whole ${j.course} course: its docs and i18n trees, \`specs/content/${j.course.toLowerCase()}/\`, its figures, and the shared files its PR already touches.`
    : `${j.course} Unit ${j.unit} only: its docs/licence and i18n files, its rows and folders under
\`specs/content/${j.course.toLowerCase()}/\`, and \`static/img/figures/${j.course.toLowerCase()}/unit-${pad(j.unit)}/\`.`);
  return `# Crew job ${j.id}

You are the ${j.worker} worker on the B.Ed bilingual textbook repo, working in this checkout on branch \`${j.branch}\`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): ${briefRules(j, selfJob(board, j))}

## Task
${STAGE_TASK[j.stage](j)}
${skill ? `\nFollow \`.claude/skills/${skill}/SKILL.md\` exactly; read it and every file it references before starting.\n` : ''}
## Scope
${scope}

## Continue, do not restart
Earlier attempts may have left work on this branch. Check \`git log origin/main..HEAD\` and \`git status\` and build on it.

## Done when
${doneWhen(j, selfJob(board, j))}
${findings ? `\n## Open findings from the latest G3 report\n${findings}\n` : ''}${notes ? `\n## Notes from earlier jobs on this unit\n${notes}\n` : ''}${j.feedback ? `\n## Feedback from the previous attempt\n${j.feedback}\n` : ''}`;
}

// ---------------------------------------------------------------- launch

function memAvailableMb() {
  const m = readFileSync('/proc/meminfo', 'utf8').match(/MemAvailable:\s+(\d+)/);
  return m ? Number(m[1]) / 1024 : 0;
}

function diskFreeMb() {
  mkdirSync(WT_DIR, { recursive: true });
  const r = sh('df', ['-Pm', WT_DIR], ROOT, { allowFail: true });
  return Number(r.out.split('\n').at(-1)?.split(/\s+/)[3] || 0);
}

function linkNodeModules(wt) {
  const nm = join(ROOT, 'node_modules');
  if (existsSync(nm) && !existsSync(join(wt, 'node_modules'))) symlinkSync(nm, join(wt, 'node_modules'));
}

function prepareWorktree(board, j) {
  // A CI-fix job works on its parent's branch, which is already checked out in the parent's worktree.
  const parent = j.parent && board.jobs.find((p) => p.id === j.parent);
  if (parent?.worktree && existsSync(parent.worktree)) {
    mkdirSync(join(parent.worktree, '.crew'), { recursive: true });
    sh('node', ['scripts/report-content-status.mjs'], parent.worktree);
    return parent.worktree;
  }
  const wt = join(WT_DIR, j.id);
  if (!existsSync(wt)) {
    mkdirSync(WT_DIR, { recursive: true });
    sh('git', ['fetch', '-q', 'origin']);
    const exists = sh('git', ['ls-remote', '--exit-code', '--heads', 'origin', j.branch], ROOT, { allowFail: true }).ok;
    const ref = exists ? `origin/${j.branch}` : j.base ? `origin/${j.base}` : 'origin/main';
    sh('git', ['worktree', 'add', '--no-checkout', '-B', j.branch, wt, ref]);
    sh('git', ['sparse-checkout', 'set', '--no-cone', ...SPARSE], wt);
    sh('git', ['reset', '-q', '--hard', 'HEAD'], wt);
    linkNodeModules(wt);
  }
  mkdirSync(join(wt, '.crew'), { recursive: true });
  // Gitignored generated report: refresh for new worktrees and every reused job worktree.
  sh('node', ['scripts/report-content-status.mjs'], wt);
  return wt;
}

/**
 * Only the crew pushes, after its own gate (finishSuccess). The brief says so, but a worker
 * ignored it on 2026-10-17: it pushed a broken conflict merge (invalid glossary.json) mid-run,
 * the owner's merge approval landed it on main, and every PR went red. So each job worktree
 * gets a push URL that cannot work, lifted only for the crew's own push.
 */
function guardPush(wt) {
  sh('git', ['config', 'extensions.worktreeConfig', 'true'], wt);
  sh('git', ['config', '--worktree', 'remote.origin.pushurl', 'crew-only-the-crew-pushes://disabled'], wt);
}
/** The worker has exited by now: lift the guard for the crew's own push, then restore it. */
function crewPush(wt, args) {
  sh('git', ['config', '--worktree', '--unset-all', 'remote.origin.pushurl'], wt, { allowFail: true });
  try { return sh('git', ['push', ...args], wt); } finally { guardPush(wt); }
}

function launch(board, j, worker) {
  j.worker = worker;
  j.family = familyOf(worker);
  j.branch = j.branch || `crew/${j.id}`;
  j.worktree = prepareWorktree(board, j);
  guardPush(j.worktree);
  const briefText = brief(j, board);
  writeFileSync(join(j.worktree, '.crew', 'brief.md'), briefText);
  const prompt = `Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.`;
  const [bin, binArgs] = WORKERS[worker].cmd(prompt);
  j.log = join(LOG_DIR, `${j.id}.${(j.attempts || 0) + 1}.log`);
  const exitFile = `${j.log}.exit`;
  // A requeued job reuses its log name (retry and a quota requeue both lower the attempt count),
  // and a stale exit file would make reap take the old exit code while the worker still runs.
  rmSync(exitFile, { force: true });
  const q = (s) => `'${String(s).replace(/'/g, `'\\''`)}'`;
  const line = `timeout ${JOB_TIMEOUT} ${[bin, ...binArgs].map(q).join(' ')} < /dev/null > ${q(j.log)} 2>&1; echo $? > ${q(exitFile)}`;
  const child = spawn('bash', ['-c', line], { cwd: j.worktree, detached: true, stdio: 'ignore' });
  child.unref();
  j.pid = child.pid;
  j.status = 'running';
  j.startedAt = now();
  // A fix job's branch is already ahead of main, so "ahead of main" cannot show that the worker did
  // anything; finishSuccess compares with this instead (cifix1 on #164 pushed only its PHR, 2026-10-18).
  j.startHead = sh('git', ['rev-parse', 'HEAD'], j.worktree).out;
  j.attempts = (j.attempts || 0) + 1;
  j.tried = [...new Set([...(j.tried || []), worker])];
  log(board, j, `launched on ${worker} (attempt ${j.attempts})`);
  console.log(`launched ${j.id} on ${worker}`);
}

function excludedFamilies(board, j) {
  const of = STAGES[j.stage].reviewOf;
  if (!of) return [];
  if (of === 'parent') {
    const parent = board.jobs.find((p) => p.id === j.parent);
    return parent?.family ? [parent.family] : [];
  }
  const producers = board.jobs.filter((x) => unitKey(x) === unitKey(j) && x.stage === of && x.status === 'merged').map((x) => x.family);
  // Legacy units were produced by the Claude-based Paperclip authors, so Claude may not review them.
  return producers.length ? [...new Set(producers)] : ['anthropic'];
}

/** Queued jobs in launch order: owner priority, then stage, then age. */
function queueOrder(board, control) {
  const prio = (j) => { const i = (control.priority || []).indexOf(j.course); return i < 0 ? 99 : i; };
  return board.jobs.filter((j) => j.status === 'queued')
    .sort((a, b) => prio(a) - prio(b) || STAGE_ORDER.indexOf(a.stage) - STAGE_ORDER.indexOf(b.stage) || a.createdAt.localeCompare(b.createdAt));
}

/** Hold launches below a resource floor, and track the hold (scripts/crew/stall.mjs). */
function resourceHold(control, events, queued) {
  const mem = memAvailableMb();
  const disk = diskFreeMb();
  const hold = !queued ? null
    : mem < MIN_FREE_MB ? ['memory', `${mem} MB available, floor ${MIN_FREE_MB} MB`]
      : disk < MIN_FREE_DISK_MB ? ['disk', `${(disk / 1024).toFixed(1)} GB free, floor ${Math.round(MIN_FREE_DISK_MB / 1024)} GB`] : null;
  if (!hold) {
    const ended = clearStall(control);
    if (ended?.alertedAt) events.push(`✅ launches resumed after ${heldFor(ended)} held (${ended.reason})`);
    return false;
  }
  const stall = noteStall(control, ...hold);
  console.log(`${stallLine(stall)}; not launching`);
  if (stallAlertDue(stall)) {
    stall.alertedAt = now();
    const fix = stall.reason === 'disk' ? 'free disk space (stale worktrees are the usual cause)' : 'wait, or stop a heavy job';
    events.push(`⚠️ ${stallLine(stall)}: no new jobs until then; ${fix}`);
  }
  return true;
}

function launchQueued(board, health, control, events) {
  const running = board.jobs.filter((j) => j.status === 'running');
  const busyUnits = new Set(board.jobs.filter((j) => ['running', 'gate_red', 'pr_open', 'ready', 'batched'].includes(j.status) && j.stage !== 'fix').map(unitKey));
  const queue = queueOrder(board, control);
  if (resourceHold(control, events, queue.length)) return 0;
  let launched = 0;
  for (const j of queue) {
    if (running.length >= MAX_PARALLEL) break;
    // Each launch uses memory and disk, so the floors are checked again before the next one.
    if (memAvailableMb() < MIN_FREE_MB) { console.log(`memory below ${MIN_FREE_MB} MB; not launching`); break; }
    if (diskFreeMb() < MIN_FREE_DISK_MB) { console.log(`disk below ${MIN_FREE_DISK_MB} MB; not launching`); break; }
    // A fix or review works on its parent's open PR, so the parent's unit being busy is the point.
    if (busyUnits.has(unitKey(j)) && j.stage !== 'fix' && !j.parent) continue;
    // Children of one parent (a review and a fix) share its worktree: one at a time.
    if (j.parent && running.some((r) => r.parent === j.parent)) continue;
    const worker = pickWorker(j.stage, { health, running, excludeFamilies: excludedFamilies(board, j), avoid: j.avoid || [] });
    if (!worker) continue; // waits; other stages keep flowing
    if (DRY) { console.log(`[dry-run] would launch ${j.id} on ${worker}`); running.push({ worker }); continue; }
    try {
      launch(board, j, worker);
    } catch (e) {
      // One bad worktree must not abort the tick: an aborted tick saves nothing, so every job it
      // launched is forgotten and launched again next tick (gpks-402 ran 9 times on 2026-10-17).
      j.launchErrors = (j.launchErrors || 0) + 1;
      log(board, j, `launch failed: ${e.message.slice(-200)}`);
      if (j.launchErrors >= 3) { j.status = 'gate_red'; events.push(`🔴 ${j.id} could not be launched 3 times: ${e.message.slice(-160)}`); }
      continue;
    }
    save('board', board);
    running.push(j);
    busyUnits.add(unitKey(j));
    launched++;
  }
  return launched;
}

// ---------------------------------------------------------------- reap

const alive = (pid) => { try { process.kill(pid, 0); return true; } catch { return false; } };

function cool(health, worker, reason) {
  const h = health[worker] || {};
  const strikes = (h.strikes || 0) + 1;
  const mins = Math.max(COOLDOWN_MIN[Math.min(strikes, COOLDOWN_MIN.length) - 1], resetMinutes(reason) ?? 0);
  health[worker] = { state: 'cooling', strikes, until: new Date(Date.now() + mins * 60000).toISOString(), last_error: reason.slice(-300) };
  return mins;
}

/** Where a job's PHR goes and what it links: its course, or the self-maintenance records. */
function phrHome(j) {
  if (j.stage === 'intel_distill') return { feature: 'crew-intelligence', spec: 'specs/intelligence/registry.md' };
  if (isSelf(j.stage)) return { feature: 'crew-maintenance', spec: `specs/maintenance/${j.week}/spec.md` };
  return { feature: j.course.toLowerCase(), spec: `specs/content/${j.course.toLowerCase()}/content-spec.md` };
}

function writePhr(j, summary) {
  const home = phrHome(j);
  const dir = join(j.worktree, 'history', 'prompts', home.feature);
  mkdirSync(dir, { recursive: true });
  const files = sh('git', ['diff', '--name-only', 'origin/main...HEAD'], j.worktree, { allowFail: true }).out.split('\n').filter(Boolean);
  const body = `---
id: crew-${j.id}
title: crew ${j.stage} ${j.course} unit ${j.unit}
stage: misc
date: ${now().slice(0, 10)}
surface: agent
model: ${j.worker}
feature: ${home.feature}
branch: ${j.branch}
user: crew
command: crew ${j.stage}
labels: ["crew", "${j.worker}", "${j.stage}"]
links:
  spec: ${home.spec}
  ticket: null
  adr: null
  pr: null
files:
${files.map((f) => ` - ${f}`).join('\n') || ' - none'}
tests:
 - npm run check:content
---

## Prompt

${readFileSync(join(j.worktree, '.crew', 'brief.md'), 'utf8')}

## Response snapshot

${summary}

## Outcome

- Impact: ${j.stage} for ${j.course} Unit ${j.unit} by ${j.worker} (attempt ${j.attempts}).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: ${files.length} file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: ${summary}
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).${j.handoff?.length ? `\n- Notes for the next job on this unit:\n${j.handoff.map((n) => `  - ${n}`).join('\n')}` : ''}
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: ${j.attempts > 1 ? `${j.attempts - 1} earlier attempt(s); see the board history` : 'none'}
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
`;
  writeFileSync(join(dir, `crew-${j.id}.${j.stage === 'author' ? 'green' : 'misc'}.prompt.md`), body.replace(/\u2014/g, ' - '));
}

/**
 * Gate findings as a set of normalised lines. A job is judged against MAIN's
 * findings, not against zero: when main itself is red (a corpus-wide standard
 * change, say), a unit job that adds nothing new must still be able to land.
 */
function gateFindings(cwd) {
  // static/content-status.json is gitignored, so a fresh worktree lacks it and check:content-status fails
  // there but not in ROOT. Regenerate it first, as ci.yml does; otherwise every batch member looks red.
  sh('node', ['scripts/report-content-status.mjs'], cwd, { allowFail: true });
  const r = sh('npm', ['run', '-s', 'check:content'], cwd, { allowFail: true });
  if (r.ok) return [];
  return [...new Set((r.out + '\n' + r.err).split('\n')
    .filter((l) => /^\s+[-✗•]\s|✗|error/i.test(l) && !/PASS|FAIL\s+\d|DeprecationWarning/.test(l))
    .map((l) => l.trim()))];
}
let mainBaseline = null;
function newFindings(wt) {
  const mine = gateFindings(wt);
  if (!mine.length) return [];
  mainBaseline ??= new Set(gateFindings(ROOT));
  return mine.filter((l) => !mainBaseline.has(l));
}

/**
 * Keep the dispatcher's own files out of a job's commits. Exclude pathspecs (':!.crew') cannot do
 * it: with --sparse, git exits 1 when one names an ignored path, and that throw stalled every reap
 * from 2026-10-17 15:15 for 13 hours. The shared info/exclude covers old branches whose
 * .gitignore lacks these entries too.
 */
function excludeCrewFiles(wt) {
  const common = sh('git', ['rev-parse', '--path-format=absolute', '--git-common-dir'], wt).out;
  const file = join(common, 'info', 'exclude');
  const have = existsSync(file) ? readFileSync(file, 'utf8').split('\n') : [];
  const missing = ['/.crew/', '/node_modules'].filter((l) => !have.includes(l));
  if (missing.length) { mkdirSync(join(common, 'info'), { recursive: true }); appendFileSync(file, `\n${missing.join('\n')}\n`); }
}

/** Damage to the shared registries in a worktree, against its merge base with main (scripts/crew/registries.mjs). */
function registryDamage(wt) {
  const base = sh('git', ['merge-base', 'origin/main', 'HEAD'], wt, { allowFail: true }).out;
  if (!base) return [];
  return REGISTRIES.flatMap((path) => {
    const was = sh('git', ['show', `${base}:${path}`], wt, { allowFail: true });
    const file = join(wt, path);
    return registryProblems(path, was.ok ? was.out : null, existsSync(file) ? readFileSync(file, 'utf8') : null);
  });
}

const REGISTRY_RULE = 'The shared registries are append-only: keep every entry main has exactly as it is, add this branch\'s entries after them, give a new entry whose ID main already uses the next free ID (and update its references), and keep glossary.json valid JSON.';

/**
 * A maintenance review commits nothing: it runs in its parent's worktree, so anything it left is
 * thrown away before its verdict is read, and the parent's branch stays exactly as reviewed.
 */
function finishReview(j, logText) {
  const wt = j.worktree;
  if (j.startHead) sh('git', ['reset', '-q', '--hard', j.startHead], wt, { allowFail: true });
  sh('git', ['clean', '-fdq', '-e', '.crew', '-e', 'node_modules'], wt, { allowFail: true });
  const v = parseVerdict(logText);
  if (!v) return { ok: false, why: 'the review ended without a `CREW-VERDICT: pass` or `CREW-VERDICT: revise - <what must change>` line' };
  const summary = (logText.match(/CREW-SUMMARY:\s*(.+)/g) || []).at(-1)?.replace(/CREW-SUMMARY:\s*/, '') || `review: ${v.verdict}`;
  return { ok: true, summary: summary.replace(/\u2014/g, ' - '), verdict: v };
}

function finishSuccess(board, j, logText) {
  if (j.stage === 'maint_review') return finishReview(j, logText);
  const wt = j.worktree;
  if (sh('git', ['status', '--porcelain'], wt).out.replace(/^.. (\.crew|node_modules).*$/gm, '').trim()) {
    excludeCrewFiles(wt);
    sh('git', ['add', '-A', '--sparse'], wt);
    sh('git', ['commit', '-q', '-m', `chore(crew): ${j.id} uncommitted work from ${j.worker}`], wt, { allowFail: true });
  }
  const ahead = Number(sh('git', ['rev-list', '--count', 'origin/main..HEAD'], wt).out || 0);
  const made = j.startHead ? Number(sh('git', ['rev-list', '--count', `${j.startHead}..HEAD`], wt, { allowFail: true }).out || 0) : ahead;
  if (!ahead || !made) return { ok: false, why: 'the worker exited without committing any change' };
  if (selfJob(board, j)) {
    const changed = sh('git', ['diff', '--name-only', 'origin/main...HEAD'], wt, { allowFail: true }).out.split('\n').filter(Boolean);
    const content = contentFiles(changed);
    if (content.length) return { ok: false, why: `Self-maintenance never touches course content (the corpus crew owns it). Revert these files to origin/main: ${content.slice(0, 20).join(', ')}` };
  }
  const fresh = newFindings(wt);
  if (fresh.length) return { ok: false, why: `npm run check:content has ${fresh.length} finding(s) that main does not have:\n${fresh.slice(0, 40).join('\n')}` };
  const damage = registryDamage(wt);
  if (damage.length) return { ok: false, why: `${REGISTRY_RULE} This branch breaks that:\n${damage.join('\n')}` };
  const summary = (logText.match(/CREW-SUMMARY:\s*(.+)/g) || []).at(-1)?.replace(/CREW-SUMMARY:\s*/, '') || `${j.stage} for ${j.course} Unit ${j.unit}`;
  j.handoff = parseHandoff(logText);
  if (j.handoff.length) j.handoffAt = now();
  writePhr(j, summary.replace(/\u2014/g, ' - '));
  sh('git', ['add', 'history/prompts'], wt);
  sh('git', ['commit', '-q', '-m', `docs(phr): crew ${j.id}`], wt, { allowFail: true });
  crewPush(wt, ['-q', '-u', 'origin', `HEAD:${j.branch}`, '--force-with-lease']);
  j.summary = summary;
  const prJob = j.parent ? board.jobs.find((p) => p.id === j.parent) : j;
  if (prJob) prJob.pushedAt = now();
  if (j.parent) return { ok: true, summary }; // fix job: the push updated its parent's branch
  // Work waits for the hourly batch PR (batchPhase). A job touching a protected path still
  // gets its own PR, so the owner question it raises never holds up a whole batch.
  const touched = sh('git', ['diff', '--name-only', 'origin/main...HEAD'], wt, { allowFail: true }).out
    .split('\n').filter((f) => PROTECTED.some((re) => re.test(f)));
  // Maintenance tasks always get their own reviewed PR (managePrs merges it on CI green + review pass).
  if (!touched.length && !OWN_PR.has(j.stage)) { j.readyAt = now(); return { ok: true, summary }; }
  const title = OWN_PR.has(j.stage)
    ? `crew(maint ${j.week}): ${j.taskRow?.id || j.stage} ${j.taskRow?.title || ''}`.trim()
    : `crew(${j.course.toLowerCase()}): ${j.stage} unit ${j.unit} by ${j.worker}`;
  const body = `${summary}\n\nCrew job \`${j.id}\`, worker **${j.worker}** (${j.family}), attempt ${j.attempts}. \`npm run check:content\` passed before push; CI builds the site.\n${j.supersedes ? `\nSupersedes ${String(j.supersedes).split(',').map((n) => `#${n}`).join(', ')}.\n` : ''}\n🤖 Generated with [Claude Code](https://claude.com/claude-code)`;
  const pr = sh('gh', ['pr', 'create', '--head', j.branch, '--base', 'main', '--title', title, '--body', body], wt, { allowFail: true });
  const url = pr.out.match(/https:\S+\/pull\/(\d+)/);
  if (!url) {
    const existing = sh('gh', ['pr', 'view', j.branch, '--json', 'number', '-q', '.number'], wt, { allowFail: true }).out;
    if (!existing) return { ok: false, why: `gh pr create failed: ${pr.err.slice(-500)}` };
    j.prNumber = Number(existing);
  } else j.prNumber = Number(url[1]);
  for (const old of String(j.supersedes || '').split(',').filter(Boolean)) {
    sh('gh', ['pr', 'close', old, '--comment', `Salvaged into #${j.prNumber} by the crew (job \`${j.id}\`). Paperclip is paused; the crew board tracks this work now.`], wt, { allowFail: true });
  }
  return { ok: true, summary };
}

function reap(board, health, events) {
  for (const j of board.jobs.filter((x) => x.status === 'running')) {
    // One job's failure must not stop the others being reaped: a single throw here used to
    // leave every finished job marked running, holding all launch slots (2026-10-17/18).
    try { reapOne(board, health, events, j); } catch (e) {
      const why = `reap failed: ${e.message.slice(-300)}`;
      console.error(`${j.id}: ${e.stack || e.message}`);
      if (j.history?.at(-1)?.slice(25) !== why) log(board, j, why);
    }
  }
}

function reapOne(board, health, events, j) {
  const exitFile = `${j.log}.exit`;
  if (alive(j.pid) && !existsSync(exitFile)) return;
  // Reaping commits, pushes and opens PRs, so a dry run only reports it.
  if (DRY) { console.log(`[dry-run] would reap ${j.id}`); return; }
  const code = existsSync(exitFile) ? Number(readFileSync(exitFile, 'utf8').trim()) : -1;
  const logText = existsSync(j.log) ? readFileSync(j.log, 'utf8') : '';
  const tail = logText.slice(-4000);
  const ahead = Number(sh('git', ['rev-list', '--count', 'origin/main..HEAD'], j.worktree, { allowFail: true }).out || 0);
  const quota = QUOTA_RE.test(tail.slice(-1500)) && (code !== 0 || !ahead);
  if (quota || (code === 124 && !tail.trim())) {
    const mins = cool(health, j.worker, tail || `exit ${code}`);
    j.status = 'queued';
    // A limit says nothing about the work, so it must not use up one of the job's three attempts.
    j.attempts = Math.max(0, (j.attempts || 1) - 1);
    log(board, j, `${j.worker} hit a limit (exit ${code}); cooling ${mins} min; requeued`);
    events.push(`⏸ ${j.worker} cooling ${mins} min; ${j.id} moves to the next worker`);
    return;
  }
  const result = code === 0 ? finishSuccess(board, j, logText) : { ok: false, why: `worker exited ${code}${code === 124 ? ' (timeout)' : ''}:\n${tail.slice(-1500)}` };
  if (result.ok) {
    health[j.worker] = { state: 'ok', strikes: 0 };
    if (j.stage === 'maint_review') { recordReview(board, j, result.verdict, result.summary, events); return; }
    if (j.parent) {
      // A fix job only updated its parent's branch; the parent PR goes back to waiting on CI.
      j.status = 'merged';
      const parent = board.jobs.find((p) => p.id === j.parent);
      if (parent) {
        parent.status = parent.prNumber ? 'pr_open' : 'ready';
        log(board, parent, `fixed by ${j.id}`);
        // A changed maintenance PR is reviewed again; the old verdict judged the old diff.
        if (OWN_PR.has(parent.stage)) { delete parent.review; queueReview(board, parent, events); }
      }
    } else j.status = j.prNumber ? 'pr_open' : 'ready';
    if (OWN_PR.has(j.stage) && j.prNumber) queueReview(board, j, events);
    if (j.stage === 'maint_survey') fanOut(board, j, events);
    log(board, j, `done on ${j.worker}${j.prNumber ? `; PR #${j.prNumber}` : j.status === 'ready' ? '; ready for the next batch' : ''}`);
    events.push(`✅ ${j.id} by ${j.worker}${j.prNumber ? ` -> PR #${j.prNumber}` : ''}: ${result.summary}`);
  } else if (j.attempts < 2) {
    j.status = 'queued';
    j.feedback = result.why;
    log(board, j, `attempt ${j.attempts} failed; retrying with feedback`);
  } else if (j.attempts < 3) {
    // Third attempt goes to a different worker in the chain, carrying the same feedback.
    j.status = 'queued';
    j.feedback = result.why;
    j.avoid = [j.worker];
    log(board, j, `second failure on ${j.worker}; handing to another worker`);
  } else {
    j.status = 'gate_red';
    j.feedback = result.why; // the lead needs the last failure, not the one before it
    log(board, j, `failed ${j.attempts} times; needs the lead`);
    events.push(`🔴 ${j.id} failed ${j.attempts} times (last: ${j.worker}). ${result.why.split('\n')[0]}`);
  }
}

// ---------------------------------------------------------------- PRs

/** Remove a finished job's worktree; the branch history lives on in the merged PR. */
function cleanup(j) {
  if (j.parent || !j.worktree || !existsSync(j.worktree)) return;
  sh('git', ['worktree', 'remove', '--force', j.worktree], ROOT, { allowFail: true });
}

function prFiles(n) {
  return sh('gh', ['pr', 'view', String(n), '--json', 'files', '-q', '.files[].path'], ROOT, { allowFail: true }).out.split('\n').filter(Boolean);
}

/**
 * A re-run on the same head commit (re-opened PR, re-run job) leaves the old run's check
 * runs in the rollup beside the new ones, so a stale FAILURE would outlive a green re-run
 * and queue a needless fix job. Keep only the most recent result per workflow and check.
 */
export function latestChecks(checks) {
  const latest = new Map();
  for (const c of checks) {
    const key = `${c.workflowName || ''}/${c.name || c.context}`;
    const at = Date.parse(c.startedAt || c.createdAt || 0) || 0;
    if (!latest.has(key) || at >= latest.get(key).at) latest.set(key, { c, at });
  }
  return [...latest.values()].map((x) => x.c);
}

/** Check names that failed on main's latest finished (not cancelled) CI run. */
function mainFailures() {
  const r = sh('gh', ['run', 'list', '--workflow', 'CI', '--branch', 'main', '--event', 'push', '--limit', '10',
    '--json', 'databaseId,status,conclusion'], ROOT, { allowFail: true });
  if (!r.ok) return null;
  const run = JSON.parse(r.out || '[]').find((x) => x.status === 'completed' && x.conclusion !== 'cancelled');
  if (!run) return null;
  const v = sh('gh', ['run', 'view', String(run.databaseId), '--json', 'jobs'], ROOT, { allowFail: true });
  if (!v.ok) return null;
  return new Set(JSON.parse(v.out).jobs.filter((x) => x.conclusion === 'failure').map((x) => x.name));
}

/**
 * Queue CI-fix jobs only for failures that belong to the PR. On 2026-10-17 three CI breaks
 * (a workflow test, an invalid glossary.json on main, the e2e webServer) turned every PR red
 * at once, and the crew sent workers to "fix" each PR; one copied ci.yml into a content
 * branch. A check that also failed on main's latest finished run, or that fails on 3+ PRs
 * in the same tick, is systemic: those PRs are held (still pr_open, so a re-run picks them
 * up) and the owner gets one alert.
 */
function queueCiFixes(board, red, events) {
  if (!red.length) return;
  const count = {};
  for (const { names } of red) for (const n of new Set(names)) count[n] = (count[n] || 0) + 1;
  const onMain = mainFailures() || new Set();
  const systemic = new Set(Object.keys(count).filter((n) => onMain.has(n) || count[n] >= 3));
  const held = [];
  for (const { j, names } of red) {
    if (names.every((n) => systemic.has(n))) {
      held.push(j.prNumber);
      if (!/held: systemic/.test(j.history?.at(-1) || '')) log(board, j, `CI red on ${names.join(', ')}, held: systemic (main or 3+ PRs), no fix job`);
      continue;
    }
    const fixes = board.jobs.filter((x) => x.parent === j.id && x.id.includes('-cifix')).length;
    if (fixes >= 2) { j.status = 'gate_red'; events.push(`🔴 PR #${j.prNumber} (${j.id}) still red after ${fixes} CI fixes`); continue; }
    board.jobs.push({ id: `${j.id}-cifix${fixes + 1}`, parent: j.id, course: j.course, unit: j.unit, stage: 'fix', status: 'queued', attempts: 0, tried: [],
      branch: j.branch, pr: j.prNumber, createdAt: now(), scope: batchScope(j),
      task: `CI failed on PR #${j.prNumber} (checks: ${names.join(', ')}). Run \`gh pr checks ${j.prNumber}\` and \`gh run view --log-failed\` to read the failure, fix it on this branch with the smallest change, and make \`npm run check:content\` pass. A build failure is usually malformed MDX or a broken relative link in this unit's files.` });
    j.status = 'gate_red';
    log(board, j, `CI red: ${names.join(', ')}; fix job queued`);
  }
  const key = [...systemic].sort().join(',');
  const prev = board.systemicAlert || {};
  if (held.length && (prev.key !== key || Date.now() - Date.parse(prev.at || 0) > 6 * 36e5)) {
    board.systemicAlert = { key, at: now() };
    events.push(`⚠️ CI check(s) ${key} fail on ${onMain.size ? 'main and ' : ''}${held.length} PR(s) (#${held.join(', #')}). Treated as a CI or main problem, not the PRs': no fix jobs queued. They re-check when CI is fixed and re-run.`);
  }
}

/**
 * Files every unit touches, so concurrent branches conflict in them on almost every batch:
 * glossary.json (terms appended at the end) and, on older branches, static/content-status.json.
 * When a batch merge conflicts in these alone, resolve it here instead of spending a merge-fix
 * job: glossary by mergeGlossary, content-status by regenerating it. The batch's registry and
 * content gates still run on the result. Returns false (caller aborts) for any other conflict.
 */
function resolveSharedConflicts(wt) {
  const files = sh('git', ['diff', '--name-only', '--diff-filter=U'], wt, { allowFail: true }).out.split('\n').filter(Boolean);
  if (!files.length || !files.every((f) => f === 'glossary.json' || f === 'static/content-status.json')) return false;
  if (files.includes('glossary.json')) {
    const stage = (n) => { const r = sh('git', ['show', `:${n}:glossary.json`], wt, { allowFail: true }); return r.ok ? r.out : null; };
    const merged = mergeGlossary(stage(1), stage(2), stage(3));
    if (merged === null) return false;
    writeFileSync(join(wt, 'glossary.json'), merged);
  }
  if (files.includes('static/content-status.json')) {
    // Older branches can modify the now-untracked report: resolve even a modify/delete
    // conflict by removing its index entries, then rebuild the ignored working copy.
    sh('git', ['rm', '-f', '--cached', '--', 'static/content-status.json'], wt);
    if (!sh('node', ['scripts/report-content-status.mjs'], wt, { allowFail: true }).ok) return false;
  }
  if (files.includes('glossary.json')) sh('git', ['add', '--', 'glossary.json'], wt);
  return sh('git', ['commit', '-q', '--no-edit'], wt, { allowFail: true }).ok;
}

/** A ready job that could not join a batch gets a merge fix on its own branch, five at most. */
function queueMergeFix(board, j, why, events) {
  const tries = board.jobs.filter((x) => x.parent === j.id && x.id.includes('-conflict')).length;
  if (tries >= 5) {
    j.status = 'gate_red';
    log(board, j, `could not join a batch after ${tries} merge fixes`);
    events.push(`🔴 ${j.id} still cannot join a batch after ${tries} merge fixes`);
    return;
  }
  board.jobs.push({ id: `${j.id}-conflict${tries + 1}`, parent: j.id, course: j.course, unit: j.unit, stage: 'fix', status: 'queued', attempts: 0, tried: [],
    branch: j.branch, createdAt: now(), task: mergeMainTask(why) });
  log(board, j, `left out of the batch: ${why.split('\n')[0]}; merge fix queued`);
}

/**
 * Hourly batch (scripts/crew/batch.mjs). Merges every ready job onto main's head in a fresh
 * worktree and opens ONE PR for them. A job whose merge conflicts, or that fails the content
 * gate only in combination with the others, is left out and gets a merge fix; the rest go on.
 */
function batchPhase(board, events) {
  if (!batchDue(board)) return;
  const ready = batchCandidates(board.jobs);
  if (!ready.length) return;
  if (DRY) { console.log(`[dry-run] would batch ${ready.map((j) => j.id).join(', ')}`); return; }
  const at = now();
  const id = batchId(at);
  const branch = `crew/${id}`;
  const wt = join(WT_DIR, id);
  sh('git', ['fetch', '-q', 'origin']);
  sh('git', ['worktree', 'add', '--no-checkout', '-B', branch, wt, 'origin/main']);
  sh('git', ['sparse-checkout', 'set', '--no-cone', ...SPARSE], wt);
  sh('git', ['reset', '-q', '--hard', 'HEAD'], wt);
  linkNodeModules(wt);
  const why = new Map();
  const tryMerge = (j) => {
    // The job's worktree branch is local to this checkout; its pushed copy is the fallback.
    const ref = sh('git', ['rev-parse', '--verify', '-q', j.branch], ROOT, { allowFail: true }).ok ? j.branch : `origin/${j.branch}`;
    const r = sh('git', ['merge', '--no-ff', '--no-edit', '-m', `crew: ${j.id} (${j.stage}, ${j.worker})`, ref], wt, { allowFail: true });
    if (r.ok || resolveSharedConflicts(wt)) return true;
    const conflictFiles = sh('git', ['diff', '--name-only', '--diff-filter=U'], wt, { allowFail: true }).out.split('\n').filter(Boolean);
    sh('git', ['merge', '--abort'], wt, { allowFail: true });
    why.set(j.id, exclusionReason(j.branch, conflictFiles));
    return false;
  };
  let members = ready.filter(tryMerge);
  if (members.length && (newFindings(wt).length || registryDamage(wt).length)) {
    // Something fails only in combination: rebuild one job at a time, keeping each that leaves the gate clean.
    sh('git', ['reset', '-q', '--hard', 'origin/main'], wt);
    const tried = members;
    members = [];
    for (const j of tried) {
      if (!tryMerge(j)) continue;
      const fresh = [...newFindings(wt), ...registryDamage(wt)];
      if (!fresh.length) { members.push(j); continue; }
      sh('git', ['reset', '-q', '--hard', 'HEAD^'], wt);
      why.set(j.id, `Merged onto main's latest state, ${j.branch} fails npm run check:content (it could not join the hourly batch):\n${fresh.slice(0, 20).join('\n')}`);
    }
  }
  const left = ready.filter((j) => why.has(j.id));
  for (const j of left) queueMergeFix(board, j, why.get(j.id), events);
  const drop = () => { sh('git', ['worktree', 'remove', '--force', wt], ROOT, { allowFail: true }); sh('git', ['branch', '-D', branch], ROOT, { allowFail: true }); };
  if (!members.length) { drop(); return; }
  sh('git', ['push', '-q', '-u', 'origin', `HEAD:${branch}`, '--force'], wt);
  const supersedes = members.flatMap((j) => String(j.supersedes || '').split(',').filter(Boolean));
  const pr = sh('gh', ['pr', 'create', '--head', branch, '--base', 'main', '--title', batchTitle(members, at), '--body', batchBody(members, { left, supersedes })], wt, { allowFail: true });
  const n = Number(pr.out.match(/\/pull\/(\d+)/)?.[1] || 0);
  if (!n) {
    console.error(`batch ${id}: gh pr create failed: ${pr.err.slice(-300)}`);
    sh('git', ['push', '-q', 'origin', '--delete', branch], ROOT, { allowFail: true });
    drop();
    return; // the jobs stay ready; the next tick tries again
  }
  for (const old of supersedes) {
    sh('gh', ['pr', 'close', old, '--comment', `Salvaged into batch PR #${n} by the crew. Paperclip is paused; the crew board tracks this work now.`], wt, { allowFail: true });
  }
  board.jobs.push({ id, course: 'CREW', unit: 0, stage: 'batch', status: 'pr_open', attempts: 1, tried: [], worker: 'crew',
    branch, worktree: wt, prNumber: n, members: members.map((j) => j.id), createdAt: at, pushedAt: at,
    history: [`${at} opened batch PR #${n} with ${members.length} jobs`] });
  for (const j of members) { j.status = 'batched'; j.batch = id; j.batchPr = n; log(board, j, `in batch PR #${n}`); }
  board.lastBatchAt = at;
  events.push(`📦 batch PR #${n}: ${members.length} jobs (${members.map((j) => j.id).join(', ')})${left.length ? `; ${left.length} left for a merge fix` : ''}`);
}

/** The merge-main instructions every conflict fix gets. */
function mergeMainTask(why) {
  return `${why} Run \`git fetch origin && git merge origin/main\` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make \`npm run check:content\` pass.`;
}

/** A fix on a batch branch works on the files of the jobs in it, not on one unit. */
function batchScope(j) {
  return j.stage === 'batch'
    ? `The files this batch PR (#${j.prNumber}) changes, which belong to the crew jobs ${j.members.join(', ')}. Change only what the merge or CI needs.`
    : undefined;
}

/** A merged PR: a batch takes every job in it along. */
function landed(board, j, how) {
  j.status = 'merged';
  log(board, j, how);
  cleanup(j);
  for (const id of j.members || []) {
    const m = board.jobs.find((x) => x.id === id);
    if (!m) continue;
    m.status = 'merged';
    log(board, m, `merged in ${j.id} (PR #${j.prNumber})`);
    cleanup(m);
    sh('git', ['push', '-q', 'origin', '--delete', m.branch], ROOT, { allowFail: true });
  }
}

function managePrs(board, decisions, events) {
  const red = [];
  for (const j of board.jobs.filter((x) => x.status === 'pr_open' && x.prNumber)) {
    const v = sh('gh', ['pr', 'view', String(j.prNumber), '--json', 'state,mergeable,statusCheckRollup,isDraft'], ROOT, { allowFail: true });
    if (!v.ok) continue;
    const pr = JSON.parse(v.out);
    if (DRY && pr.state !== 'OPEN') { console.log(`[dry-run] PR #${j.prNumber} is ${pr.state.toLowerCase()}`); continue; }
    if (pr.state === 'MERGED') { landed(board, j, 'merged'); continue; }
    if (pr.state === 'CLOSED') {
      j.status = 'closed'; log(board, j, 'closed'); cleanup(j);
      // Closing a batch PR by hand is an owner signal: hold its jobs rather than re-batch them.
      for (const id of j.members || []) { const m = board.jobs.find((x) => x.id === id); if (m) { m.status = 'blocked'; log(board, m, `held: batch PR #${j.prNumber} was closed`); } }
      if (j.members?.length) events.push(`⏹ batch PR #${j.prNumber} was closed; its ${j.members.length} jobs are held ("crew retry <job>" requeues one)`);
      continue;
    }
    // Right after a crew push GitHub still reports the old head's checks and mergeability: on
    // 2026-10-18 a tick read #164's day-old failed build 1 s after the fix landed and queued a second
    // fix while the new CI run was starting. Judge a PR only on checks that started after the push.
    if (j.pushedAt && Date.now() - Date.parse(j.pushedAt) < PUSH_SETTLE_MS) continue;
    const checks = freshChecks(latestChecks(pr.statusCheckRollup || []), j.pushedAt);
    // GitHub runs no PR CI while a PR conflicts, so waiting would stall it forever. Salvage
    // branches all append to the same registries, so each salvage that merges conflicts
    // the rest; resolving needs judgement (keep both sides, renumber clashing IDs).
    if (pr.mergeable === 'CONFLICTING') {
      if (board.jobs.some((x) => x.parent === j.id && ACTIVE.includes(x.status))) continue;
      const tries = board.jobs.filter((x) => x.parent === j.id && x.id.includes('-conflict')).length;
      if (tries >= 5) { j.status = 'gate_red'; events.push(`🔴 PR #${j.prNumber} (${j.id}) still conflicts after ${tries} merge attempts`); continue; }
      board.jobs.push({ id: `${j.id}-conflict${tries + 1}`, parent: j.id, course: j.course, unit: j.unit, stage: 'fix', status: 'queued', attempts: 0, tried: [],
        branch: j.branch, pr: j.prNumber, createdAt: now(),
        scope: batchScope(j), task: mergeMainTask(`PR #${j.prNumber} conflicts with main.`) });
      log(board, j, `conflicts with main; merge job queued`);
      continue;
    }
    // CheckRun carries status/conclusion; a legacy StatusContext carries state.
    const pending = checks.some((c) => (c.status ? c.status !== 'COMPLETED' : ['PENDING', 'EXPECTED'].includes(c.state)));
    const failed = checks.filter((c) => (c.status ? !['SUCCESS', 'NEUTRAL', 'SKIPPED'].includes(c.conclusion) : ['FAILURE', 'ERROR'].includes(c.state)));
    if (pending || !checks.length) continue;
    if (failed.length) {
      // Decided after the loop: a failure shared with main or with many PRs is not this PR's.
      if (!board.jobs.some((x) => x.parent === j.id && ACTIVE.includes(x.status))) red.push({ j, names: failed.map((c) => c.name || c.context) });
      continue;
    }
    // Maintenance PRs merge only after an independent reviewer of another model family passed them
    // (owner ruling 2026-10-19: auto-merge safe areas on green CI plus review). A missing review is
    // queued here; a revise has queued a fix, so the PR waits for it.
    const maint = OWN_PR.has(j.stage);
    if (maint && j.review?.verdict !== 'pass') { if (!j.review) queueReview(board, j, events); continue; }
    const files = prFiles(j.prNumber);
    if (maint && maintenanceVerdict({ files, ciGreen: true, reviewPassed: true, protectedPatterns: MAINT_PROTECTED }) === 'merge') log(board, j, 'green, reviewed and unprotected: merging');
    const touched = files.filter((f) => (maint ? MAINT_PROTECTED : PROTECTED).some((re) => re.test(f)));
    // An owner "merge" approves the protected files they were shown. If later commits touch
    // others, ask again; either way the merge itself waits for green CI (checked above).
    const approved = new Set(j.ownerApproved?.files || []);
    if (touched.length && !touched.every((f) => approved.has(f))) {
      if (!decisions.items.some((d) => d.pr === j.prNumber && d.status === 'open')) {
        ask(decisions, `PR #${j.prNumber} (${j.id}) is green but touches protected files: ${touched.slice(0, 6).join(', ')}${touched.length > 6 ? ` and ${touched.length - 6} more` : ''}. Merge it?`, ['merge', 'hold'], { pr: j.prNumber, job: j.id, files: touched });
      }
      continue;
    }
    if (DRY) { console.log(`[dry-run] would merge PR #${j.prNumber}`); continue; }
    if (pr.isDraft) sh('gh', ['pr', 'ready', String(j.prNumber)], ROOT, { allowFail: true });
    const m = sh('gh', ['pr', 'merge', String(j.prNumber), '--merge', '--admin'], ROOT, { allowFail: true });
    if (m.ok) {
      landed(board, j, 'auto-merged (CI green)');
      events.push(`🚀 merged PR #${j.prNumber} (${j.id}${j.members ? `, ${j.members.length} jobs` : ''})`);
      sh('git', ['push', '-q', 'origin', '--delete', j.branch], ROOT, { allowFail: true });
    }
  }
  queueCiFixes(board, red, events);
}

/**
 * Owner ruling 2026-10-17: once a salvage PR is on main, delete the Paperclip branches it
 * replaced (the head branches of its `supersedes` PRs, and its `base`). The salvage branch
 * carries that work, rebased. A branch is kept while any open PR uses it as head or base,
 * or while its own PR is still open. Runs for every merged job once (`retired`), however
 * the merge happened.
 */
function retireSuperseded(board, events) {
  const todo = board.jobs.filter((j) => j.status === 'merged' && !j.retired && (j.supersedes || j.base));
  if (!todo.length) return;
  const open = sh('gh', ['pr', 'list', '--state', 'open', '--limit', '200', '--json', 'headRefName,baseRefName'], ROOT, { allowFail: true });
  if (!open.ok) return; // try again next tick rather than delete blind
  const inUse = new Set(JSON.parse(open.out || '[]').flatMap((p) => [p.headRefName, p.baseRefName]));
  for (const j of todo) {
    const branches = new Set(j.base ? [j.base] : []);
    for (const n of String(j.supersedes || '').split(',').filter(Boolean)) {
      const v = sh('gh', ['pr', 'view', n, '--json', 'state,headRefName'], ROOT, { allowFail: true });
      if (!v.ok) continue;
      const { state, headRefName } = JSON.parse(v.out);
      if (state !== 'OPEN') branches.add(headRefName);
    }
    const gone = [];
    for (const b of branches) {
      if (!b || b === 'main' || b === j.branch || b.startsWith('crew/') || inUse.has(b)) continue;
      if (DRY) { console.log(`[dry-run] would delete branch ${b} (superseded by ${j.id})`); continue; }
      const r = sh('git', ['push', '-q', 'origin', '--delete', b], ROOT, { allowFail: true });
      if (r.ok || /remote ref does not exist/.test(r.err)) gone.push(b);
    }
    if (DRY) continue;
    j.retired = true;
    log(board, j, `retired superseded branches: ${gone.join(', ') || 'none left'}`);
    if (gone.length) events.push(`🧹 ${j.id}: deleted superseded branches ${gone.join(', ')}`);
  }
}

// ---------------------------------------------------------------- decisions and owner commands

function ask(decisions, question, options = ['yes', 'no'], extra = {}) {
  const n = decisions.items.length + 1;
  const id = `C-${String(n).padStart(3, '0')}`;
  decisions.items.push({ id, question, options, status: 'open', askedAt: now(), ...extra });
  send(`❓ ${id}: ${question}\nReply "${id} ${options.join(`" or "${id} `)}" (free text after the option is recorded).`, { urgent: true, dryRun: DRY });
  return id;
}

const HELP = 'commands: crew status | crew pause | crew resume | crew prioritise <COURSE> | crew stop <job> | crew retry <job> | crew note <directions for the crew> | crew maintenance now|skip|status | crew intel now|status | C-### <option> [note]';

/**
 * One owner message -> one reply (or null when it is not for the crew). Shared by the tick's
 * inbox poll and by `crew.mjs cmd`, which openclaw's crew skill calls so the owner gets an answer
 * in seconds instead of at the next tick.
 */
function handleCommand(text, { board, decisions, control, health }, via = 'cli') {
  text = text.trim();
  const c = text.match(/^\/?crew\b[\s:,.-]*(\w+)?\s*([\s\S]*)$/i);
  if (c) {
    const v = (c[1] || 'status').toLowerCase();
    const arg = c[2].trim();
    if (v === 'status') return statusText(board, health, decisions, control);
    if (v === 'help') return HELP;
    if (v === 'pause') { control.paused = true; return 'paused: running jobs finish, no new jobs start. "crew resume" restarts.'; }
    if (v === 'resume') { control.paused = false; return 'resumed: queued jobs start at the next tick (within 15 min).'; }
    if (v.startsWith('priorit')) {
      if (!arg) return 'usage: crew prioritise <COURSE>, e.g. crew prioritise EFMP-305';
      const course = arg.split(/\s+/)[0].toUpperCase();
      control.priority = [course, ...(control.priority || []).filter((x) => x !== course)];
      return `priority: ${control.priority.join(' > ')}`;
    }
    if (v === 'stop' || v === 'retry') {
      const j = board.jobs.find((x) => x.id === arg.split(/\s+/)[0]);
      if (!j) return `no job "${arg}". "crew status" lists job ids.`;
      if (v === 'stop') { if (j.pid && alive(j.pid)) try { process.kill(-j.pid); } catch {} j.status = 'blocked'; log(board, j, `stopped by owner via ${via}`); return `stopped ${j.id}`; }
      j.status = 'queued'; j.attempts = 0; j.launchErrors = 0; delete j.avoid; delete j.feedback; log(board, j, `requeued by owner via ${via}`); return `requeued ${j.id}`;
    }
    if (v.startsWith('maint')) {
      const sub = (arg.split(/\s+/)[0] || 'status').toLowerCase();
      const week = weekId(new Date());
      if (sub === 'now') {
        const id = queueSurvey(board, week, [], `owner via ${via}`);
        return id ? `maintenance ${week}: survey ${id} queued; it starts at the next tick. Sunday's run still happens.` : 'a maintenance survey is already queued or running.';
      }
      if (sub === 'skip') { board.maint = { ...board.maint, lastWeek: week }; return `maintenance skipped for ${week}; next run Sunday 02:00 PKT of the following week.`; }
      return `Maintenance: ${maintenanceLine(board)}`;
    }
    if (v === 'intel') {
      if ((arg.split(/\s+/)[0] || '').toLowerCase() === 'now') {
        const h = harvest(board, [], harvestSlot(new Date()));
        const id = queueDistill(board, [], local(new Date()).date, `owner via ${via}`);
        return `harvested ${h.signals} signals into ${h.clusters} clusters (${h.hot} newly hot); ${id ? `distill ${id} queued` : 'nothing new to distil, or a distill is already queued'}.`;
      }
      return intelStatus(board);
    }
    if (v === 'note') {
      if (!arg) return 'usage: crew note <directions>';
      control.notes = [...(control.notes || []), { at: now(), via, text: arg }].slice(-50);
      appendFileSync(join(STATE_DIR, 'OWNER-NOTES.md'), `\n## ${now()} (${via})\n${arg}\n`);
      return 'noted. The crew lead reads owner notes before planning; anything that needs a decision comes back to you as a C-### question.';
    }
    return `unknown crew command "${v}". ${HELP}`;
  }
  const d = text.match(/^\/?(C-\d{3})\b\s*[:,-]?\s*(\S+)?\s*([\s\S]*)/i);
  if (!d) return null; // ordinary chat is openclaw's business, not the crew's
  const item = decisions.items.find((x) => x.id.toUpperCase() === d[1].toUpperCase());
  if (!item) return `no decision ${d[1].toUpperCase()}.`;
  if (item.status !== 'open') return `${item.id} was already answered: ${item.answer}.`;
  const answer = (d[2] || '').toLowerCase();
  if (!item.options.includes(answer)) return `${item.id} options are: ${item.options.join(' / ')}. Reply e.g. "${item.id} ${item.options[0]}".`;
  item.status = 'answered'; item.answer = answer; item.note = d[3]?.trim(); item.answeredAt = now(); item.via = via;
  let extra = '';
  if (item.pr && answer === 'merge') {
    // Never merge here: the PR may have changed since it was green. The tick merges it once
    // CI is green on its latest commit.
    const j = board.jobs.find((x) => x.id === item.job);
    if (j) { j.ownerApproved = { id: item.id, files: item.files || [] }; log(board, j, `approved by owner (${item.id}); merges when CI is green`); }
    extra = `; PR #${item.pr} merges as soon as CI is green on its latest commit`;
  }
  if (item.job && answer === 'hold') { const j = board.jobs.find((x) => x.id === item.job); if (j) j.status = 'blocked'; }
  return `noted ${item.id}: ${answer}${extra}`;
}

const norm = (t) => t.trim().toLowerCase().replace(/^\//, '').replace(/\s+/g, ' ');

function handleInbox(board, decisions, control, health) {
  const handled = load('handled');
  for (const m of readInbox()) {
    // Already answered instantly through openclaw (`crew.mjs cmd`): do not apply it twice.
    const i = handled.items.findIndex((h) => h.text === norm(m.text) && Math.abs(Date.parse(h.at) - Date.parse(m.at)) < 30 * 6e4);
    if (i >= 0) { handled.items.splice(i, 1); continue; }
    const r = handleCommand(m.text, { board, decisions, control, health }, m.source);
    if (r) reply(m.source, `🤖 crew: ${r}`, { dryRun: DRY });
  }
  handled.items = handled.items.filter((h) => Date.now() - Date.parse(h.at) < 2 * 36e5);
  if (!DRY) save('handled', handled);
}

// ---------------------------------------------------------------- views

/** "N units (first few)" for the owner: units that only a person's G3 sign-off can move on. */
function g3Line(board) {
  const units = board.awaitingG3?.units || [];
  if (!units.length) return 'none';
  const shown = units.slice(0, 6).map((x) => `${x.course} U${x.unit}`).join(', ');
  return `${units.length} unit${units.length === 1 ? '' : 's'} (${shown}${units.length > 6 ? ', ...' : ''})`;
}

function summaryLine(board, health) {
  const by = (s) => board.jobs.filter((j) => j.status === s).length;
  const hs = Object.entries(health).filter(([, h]) => h.state !== 'ok').map(([w, h]) => `${w} ${h.state}${h.until ? ` until ${h.until.slice(11, 16)}Z` : ''}`);
  return `running ${by('running')}, queued ${by('queued')}, ready ${by('ready')}, batched ${by('batched')}, PRs open ${by('pr_open')}, red ${by('gate_red')}, blocked ${by('blocked')}, merged ${by('merged')}${hs.length ? `; ${hs.join(', ')}` : '; all workers ok'}`;
}

function statusText(board, health, decisions, control = load('control')) {
  const ago = (t) => { const m = Math.round((Date.now() - Date.parse(t)) / 6e4); return m < 90 ? `${m}m` : `${Math.round(m / 60)}h`; };
  const running = board.jobs.filter((j) => j.status === 'running').map((j) => `${j.id} (${j.worker}, ${ago(j.startedAt)})`);
  const prs = board.jobs.filter((j) => j.status === 'pr_open').map((j) => `#${j.prNumber} ${j.id}`);
  const red = board.jobs.filter((j) => j.status === 'gate_red').map((j) => j.id);
  const open = decisions.items.filter((d) => d.status === 'open').map((d) => `${d.id} ${d.question}`);
  return [`Crew status ${now().slice(0, 16).replace('T', ' ')} UTC${control.paused ? ' (PAUSED)' : ''}`,
    summaryLine(board, health),
    ...(control.launchStall ? [`⚠️ ${stallLine(control.launchStall)}`] : []),
    `Running: ${running.join(', ') || 'none'}`,
    `PRs waiting on CI or merge: ${prs.join(', ') || 'none'}`,
    `Ready for the next hourly batch: ${board.jobs.filter((j) => j.status === 'ready').length}`,
    `Awaiting your G3 sign-off: ${g3Line(board)}`,
    `Weekly maintenance: ${maintenanceLine(board)}`,
    `Intelligence: ${intelLine(board)}`,
    ...(red.length ? [`Needs a fix: ${red.join(', ')}`] : []),
    `Needs you: ${open.join(' | ') || 'nothing'}`,
    ...(control.priority?.length ? [`Priority: ${control.priority.join(' > ')}`] : [])].join('\n');
}

function status() {
  const board = load('board');
  const health = load('health');
  const decisions = load('decisions');
  const control = load('control');
  const rows = board.jobs.filter((j) => !TERMINAL.includes(j.status) || Date.now() - Date.parse(j.history?.at(-1)?.slice(0, 24) || j.createdAt) < 7 * 864e5)
    .sort((a, b) => a.course.localeCompare(b.course) || a.unit - b.unit);
  const md = `# Crew board

Generated ${now()}. ${summaryLine(board, health)}

${resumeHere({ board, decisions, control, nextUp: queueOrder(board, control) })}

## Workers
| Worker | Family | State | Until | Last error |
|---|---|---|---|---|
${Object.keys(WORKERS).map((w) => { const h = health[w] || { state: 'ok' }; return `| ${w} | ${WORKERS[w].family} | ${h.state} | ${h.until || ''} | ${(h.last_error || '').replace(/[|\n]/g, ' ').slice(0, 80)} |`; }).join('\n')}

## Open owner decisions
${decisions.items.filter((d) => d.status === 'open').map((d) => `- **${d.id}** ${d.question} (${d.options.join(' / ')})`).join('\n') || 'none'}

## Awaiting your G3 sign-off
Agent review is done; only a person's G3 sign-off (ADR-0019) lets these units move on to the Urdu review.
${(board.awaitingG3?.units || []).map((x) => `- ${x.course} Unit ${x.unit}: advisory ${x.disposition}, \`${x.report}\``).join('\n') || 'none'}

## Weekly maintenance and intelligence
- Maintenance: ${maintenanceLine(board)}
${intelStatus(board).split('\n').map((l) => (l.startsWith('- ') ? `  ${l}` : `- ${l}`)).join('\n')}

## Jobs
| Job | Stage | Status | Worker | Tries | PR | Last event |
|---|---|---|---|---|---|---|
${rows.map((j) => `| ${j.id} | ${j.stage} | ${j.status} | ${j.worker || ''} | ${j.attempts} | ${j.prNumber || j.batchPr ? `#${j.prNumber || j.batchPr}` : ''} | ${(j.history?.at(-1) || '').slice(25).replace(/\|/g, '/')} |`).join('\n')}
`;
  writeFileSync(join(STATE_DIR, 'BOARD.md'), md);
  console.log(md);
  return md;
}

function digest() {
  const board = load('board');
  const health = load('health');
  const since = Date.now() - 864e5;
  const recent = board.jobs.filter((j) => (j.history || []).some((h) => Date.parse(h.slice(0, 24)) > since && /merged|done on/.test(h)));
  const stall = load('control').launchStall;
  const text = `📘 Crew daily digest ${now().slice(0, 10)}
${summaryLine(board, health)}${stall ? `\n⚠️ ${stallLine(stall)}` : ''}
Last 24 h: ${recent.length ? recent.map((j) => `${j.id}${j.prNumber ? ` #${j.prNumber}` : ''} (${j.status})`).join(', ') : 'nothing finished'}
Needs you: ${load('decisions').items.filter((d) => d.status === 'open').map((d) => d.id).join(', ') || 'nothing'}
Awaiting your G3 sign-off: ${g3Line(board)}
Weekly maintenance: ${maintenanceLine(board)}
Intelligence: ${intelLine(board)}`;
  send(text, { dryRun: DRY });
}

// ---------------------------------------------------------------- self-maintenance and intelligence

/** Is this job self-maintenance, itself or as a fix or review of a maintenance PR? */
function selfJob(board, j) {
  return isSelf(j.stage) || isSelf(board.jobs.find((p) => p.id === j.parent)?.stage || '');
}


/** After a survey passes, each row of its tasks.md becomes a job (scripts/crew/maintjobs.mjs). */
function fanOut(board, survey, events) {
  const dir = join(survey.worktree, 'specs', 'maintenance', survey.week);
  const read = (f) => (existsSync(join(dir, f)) ? readFileSync(join(dir, f), 'utf8') : '');
  const jobs = fanOutJobs(board, survey, { tasks: read('tasks.md'), spec: read('spec.md'), plan: read('plan.md') });
  events.push(jobs.length
    ? `🧹 maintenance ${survey.week}: ${jobs.length} task(s) queued (${jobs.map((t) => t.taskRow.id).join(', ')})`
    : `🧹 maintenance ${survey.week}: the survey found nothing worth a task`);
}

/** Queue the week's survey. Only the scheduled run marks the week done; "crew maintenance now" is extra. */
function queueSurvey(board, week, events, why, { scheduled = false } = {}) {
  board.maint ||= {};
  if (board.jobs.some((x) => x.stage === 'maint_survey' && ['queued', 'running'].includes(x.status))) return null;
  const base = `maint-${week.toLowerCase()}-survey`;
  const n = board.jobs.filter((x) => x.id === base || x.id.startsWith(`${base}-r`)).length;
  const id = n ? `${base}-r${n}` : base;
  board.jobs.push({ id, course: 'MAINT', unit: Number(week.slice(-2)) * 10, stage: 'maint_survey', status: 'queued', attempts: 0, tried: [], week,
    since: board.maint.lastRunAt || new Date(Date.now() - 7 * 864e5).toISOString(), createdAt: now(),
    scope: `\`specs/maintenance/${week}/\` only: the survey writes its four files and changes nothing else.` });
  if (scheduled) board.maint.lastWeek = week;
  board.maint.lastRunAt = now();
  events.push(`🧹 maintenance ${week}: survey queued (${why})`);
  if (DRY) console.log(`[dry-run] would queue ${id}`);
  return id;
}

function maintenancePhase(board, events) {
  const week = maintenanceDue(board.maint?.lastWeek, new Date());
  if (week) queueSurvey(board, week, events, 'Sunday 02:00 PKT', { scheduled: true });
}

function loadClusters() {
  try { return JSON.parse(readFileSync(join(INTEL_DIR, 'clusters.json'), 'utf8')); } catch { return {}; }
}

/**
 * The 12-hourly harvest (scripts/crew/intel.mjs): signals from everything new since the cursor,
 * folded into clusters on the host (~/.crew/<project>/intel/). No model is called. A crew failure
 * that turns hot is announced at once, at most five per harvest.
 */
function harvest(board, events, slot) {
  board.intel ||= {};
  const since = board.intel.cursor || new Date(Date.now() - 7 * 864e5).toISOString();
  const at = now();
  const signals = boardSignals(board.jobs, since);
  for (const f of existsSync(LOG_DIR) ? readdirSync(LOG_DIR) : []) {
    if (!f.endsWith('.log')) continue;
    const st = statSync(join(LOG_DIR, f));
    if (st.mtime.toISOString() <= since) continue;
    signals.push(...logSignals(readFileSync(join(LOG_DIR, f), 'utf8').slice(-20000), `log:${f}`, st.mtime.toISOString()));
  }
  const cron = join(STATE_DIR, 'cron.log');
  let cronOffset = board.intel.cronOffset;
  if (existsSync(cron)) {
    const size = statSync(cron).size;
    // cron.log lines carry no time, so old lines cannot be placed in the slot they happened in: the
    // first harvest starts at the end (a back-fill would book a week of history as "now"), and a
    // rotated (shrunk) log starts again from its top.
    const from = cronOffset === undefined ? size : cronOffset > size ? 0 : cronOffset;
    const buf = Buffer.alloc(size - from);
    const fd = openSync(cron, 'r');
    try { readSync(fd, buf, 0, buf.length, from); } finally { closeSync(fd); }
    signals.push(...cronSignals(buf.toString('utf8'), at));
    cronOffset = size;
  }
  const changed = sh('git', ['log', `--since=${since}`, '--name-only', '--format=', '--', 'history/prompts', 'specs/content'], ROOT, { allowFail: true }).out.split('\n');
  for (const f of new Set(changed.filter(Boolean))) {
    const p = join(ROOT, f);
    if (!existsSync(p)) continue;
    if (f.startsWith('history/prompts/') && f.endsWith('.md')) signals.push(...phrSignals(readFileSync(p, 'utf8'), `phr:${f}`, at));
    else if (/\/reviews\/unit-\d+\/G[35]\/[^/]+\.json$/.test(f) && !/manifest/.test(f)) {
      try { signals.push(...reviewSignals(JSON.parse(readFileSync(p, 'utf8')), `review:${f}`, at)); } catch { /* not a report */ }
    }
  }
  // Count each signal in the slot it happened in (board events and logs carry their own time), so a
  // first harvest's back-fill still shows the before/after of fixes adopted during that week.
  const clusters = foldSignals(loadClusters(), signals, (s) => (s.at && s.at < at ? harvestSlot(new Date(s.at)) : slot));
  const hot = newlyHot(clusters, slot);
  // The first harvest back-fills a week: what is hot then is the baseline, mostly fixed already,
  // so it is marked but not announced.
  const alerts = board.intel.cursor ? hot.filter((c) => ['failure', 'cron', 'log-error'].includes(c.kind)) : [];
  for (const c of hot) c.alertedAt = at;
  for (const c of alerts.slice(0, 5)) events.push(`🧠 recurring ${c.kind} x${c.count} since ${c.first.slice(0, 10)}: ${c.example.replace(/\n/g, ' ').slice(0, 160)}`);
  if (alerts.length > 5) events.push(`🧠 and ${alerts.length - 5} more recurring problems ("crew intel status")`);
  for (const [k, c] of Object.entries(clusters)) if (c.count < 3 && Date.now() - Date.parse(c.last) > 60 * 864e5) delete clusters[k];
  const summary = { slot, signals: signals.length, clusters: Object.keys(clusters).length, hot: hot.length };
  if (DRY) { console.log(`[dry-run] harvest ${JSON.stringify(summary)}`); return summary; }
  mkdirSync(INTEL_DIR, { recursive: true });
  writeFileSync(join(INTEL_DIR, 'clusters.json.tmp'), JSON.stringify(clusters, null, 1));
  renameSync(join(INTEL_DIR, 'clusters.json.tmp'), join(INTEL_DIR, 'clusters.json'));
  if (signals.length) appendFileSync(join(INTEL_DIR, 'ledger.jsonl'), signals.map((s) => JSON.stringify({ slot, ...s })).join('\n') + '\n');
  Object.assign(board.intel, { cursor: at, lastHarvestSlot: slot, cronOffset, slots: [...(board.intel.slots || []), slot].slice(-120), lastHarvest: summary });
  return summary;
}

/** The daily distill job, given the clusters that grew over the last two harvests. */
function queueDistill(board, events, day, why) {
  board.intel ||= {};
  board.intel.lastDistill = day;
  const digestText = distillDigest(loadClusters(), slotsBetween(new Date(Date.now() - 864e5), new Date()));
  if (!digestText) return null;
  if (board.jobs.some((x) => x.stage === 'intel_distill' && ['queued', 'running'].includes(x.status))) return null;
  const base = `intel-${day}-distill`;
  const n = board.jobs.filter((x) => x.id === base || x.id.startsWith(`${base}-r`)).length;
  const id = n ? `${base}-r${n}` : base;
  board.jobs.push({ id, course: 'INTEL', unit: 0, stage: 'intel_distill', status: 'queued', attempts: 0, tried: [], day, createdAt: now(),
    task: digestText, scope: `\`specs/intelligence/daily/${day}.md\` only.` });
  events.push(`🧠 intelligence ${day}: distill queued (${why})`);
  if (DRY) console.log(`[dry-run] would queue ${id}`);
  return id;
}

function intelPhase(board, events) {
  board.intel ||= {};
  const date = new Date();
  if (harvestDue(board.intel.lastHarvestSlot, date)) harvest(board, events, harvestSlot(date));
  const day = distillDue(board.intel.lastDistill, date);
  if (day) queueDistill(board, events, day, '03:00 PKT');
}

/** Effect of each adopted registry item on the cluster it targets ("worked", "no change", ...). */
function registryEffects(board) {
  const file = join(ROOT, 'specs', 'intelligence', 'registry.md');
  if (!existsSync(file)) return [];
  const clusters = Object.values(loadClusters());
  const first = clusters.reduce((m, c) => (c.first < m ? c.first : m), now());
  const slots = slotsBetween(new Date(first), new Date());
  return parseRegistry(readFileSync(file, 'utf8')).filter((r) => r.signature && r.adopted)
    .map((r) => `${r.id} ${effect(clusters.find((c) => c.sig === r.signature), r.adopted, slots)}`);
}

function maintenanceLine(board) {
  const week = board.maint?.lastWeek || board.jobs.filter((j) => j.week).at(-1)?.week;
  if (!week) return 'not run yet';
  const jobs = board.jobs.filter((j) => j.week === week && OWN_PR.has(j.stage));
  const count = (pred) => jobs.filter(pred).length;
  return `${week}: ${count((j) => j.status === 'merged')} merged, ${count((j) => j.status === 'pr_open')} open, ${count((j) => ['queued', 'running'].includes(j.status))} in progress, ${count((j) => j.status === 'gate_red')} red`;
}

function intelLine(board) {
  const h = board.intel?.lastHarvest;
  if (!h) return 'no harvest yet';
  const effects = registryEffects(board);
  return `last harvest ${h.slot} PKT: ${h.signals} signals, ${h.clusters} clusters, ${h.hot} newly hot${effects.length ? `; registry: ${effects.join(', ')}` : ''}`;
}

function intelStatus(board) {
  const slots = slotsBetween(new Date(Date.now() - 7 * 864e5), new Date());
  const top = Object.values(loadClusters())
    .map((c) => ({ c, recent: slots.reduce((n, s) => n + (c.slots[s] || 0), 0) }))
    .filter((x) => x.recent > 0).sort((a, b) => b.recent - a.recent).slice(0, 8)
    .map(({ c, recent }) => `- ${c.kind} x${recent} this week (${c.count} total): ${c.example.replace(/\n/g, ' ').slice(0, 120)}`);
  return [`Intelligence: ${intelLine(board)}`, ...(top.length ? ['Top clusters this week:', ...top] : [])].join('\n');
}

// ---------------------------------------------------------------- tick

function tick() {
  const board = load('board');
  const health = load('health');
  const decisions = load('decisions');
  const control = load('control');
  const events = [];
  // Each phase is isolated and state is saved in `finally`: a crash in one phase used to discard
  // the whole tick, so finished jobs were never reaped and launches were repeated every tick.
  const phase = (name, fn) => { try { fn(); } catch (e) { console.error(`${name}: ${e.stack || e.message}`); } };
  try {
    phase('inbox', () => handleInbox(board, decisions, control, health));
    phase('reap', () => reap(board, health, events));
    phase('batch', () => batchPhase(board, events));
    phase('intel', () => intelPhase(board, events));
    phase('maintenance', () => maintenancePhase(board, events));
    // A cooling worker becomes eligible again when its time passes; the next real job is the probe.
    for (const [w, h] of Object.entries(health)) if (h.state === 'cooling' && Date.parse(h.until) <= Date.now()) health[w] = { ...h, state: 'ok' };
    phase('prs', () => managePrs(board, decisions, events));
    phase('retire', () => retireSuperseded(board, events));
    if (!control.paused) phase('launch', () => launchQueued(board, health, control, events));
    const eligible = Object.keys(WORKERS).filter((w) => !['down', 'cooling'].includes(health[w]?.state));
    if (!eligible.length) events.push('⚠️ every worker is cooling or down; nothing can run until one recovers');
    const red = events.filter((e) => /^(🔴|⚠️)/.test(e));
    if (events.length && !DRY) phase('notify', () => send(events.join('\n'), { urgent: red.length > 0 }));
  } finally {
    if (!DRY) { save('board', board); save('health', health); save('decisions', decisions); save('control', control); }
  }
  console.log(summaryLine(board, health));
}

// ---------------------------------------------------------------- main

const firstFlag = args.findIndex((a) => a.startsWith('--'));
const [cmd, ...rest] = firstFlag < 0 ? args : args.slice(0, firstFlag);
if (cmd === 'plan') plan();
else if (cmd === 'tick') tick();
else if (cmd === 'status') status();
else if (cmd === 'retire') { const board = load('board'); const events = []; retireSuperseded(board, events); if (!DRY) { save('board', board); if (events.length) send(events.join('\n')); } console.log(events.join('\n') || 'nothing to retire'); }
else if (cmd === 'cmd') {
  // openclaw's crew skill: `crew.mjs cmd "<owner message>" [--via whatsapp]`; prints the reply.
  const text = rest.join(' ');
  // A state-changing command waits for a running tick (tick.sh holds this lock), otherwise the
  // tick's final save would overwrite it. Status is read-only and answers at once.
  if (!flag('locked') && !/^\/?crew\s*(status|help)?\s*$/i.test(text.trim())) {
    const r = spawnSync('flock', ['-w', '100', join(STATE_DIR, 'tick.lock'), process.execPath, new URL(import.meta.url).pathname, ...args, '--locked'], { stdio: 'inherit' });
    if (r.status !== 0) console.log('the crew is busy with a tick; send it again in a few minutes.');
    process.exit(0);
  }
  const state = { board: load('board'), decisions: load('decisions'), control: load('control'), health: load('health') };
  const r = handleCommand(text, state, opt('via') || 'openclaw');
  console.log(r ?? `not a crew command. ${HELP}`);
  if (r && !DRY) {
    if (flag('locked')) { save('board', state.board); save('decisions', state.decisions); save('control', state.control); }
    const handled = load('handled');
    handled.items.push({ text: norm(text), at: now() });
    save('handled', handled);
  }
}
else if (cmd === 'digest') digest();
else if (cmd === 'notify') send(rest.join(' '), { urgent: flag('urgent'), dryRun: DRY });
else if (cmd === 'ask') { const d = load('decisions'); ask(d, rest.join(' '), (opt('options') || 'yes|no').split('|'), { job: opt('job') }); if (!DRY) save('decisions', d); }
else if (cmd === 'add') {
  const [course, unit, stage] = rest;
  if (!course || !unit || !STAGES[stage]) throw new Error('usage: add <COURSE> <unit> <stage> [--branch b] [--pr n] [--task "..."]');
  const board = load('board');
  const base = jobId(course.toUpperCase(), unit, stage);
  const n = board.jobs.filter((j) => j.id === base || j.id.startsWith(`${base}-r`)).length;
  const job = { id: n ? `${base}-r${n}` : base, course: course.toUpperCase(), unit: Number(unit), stage, status: 'queued', attempts: 0, tried: [], createdAt: now(),
    base: opt('branch'), pr: opt('pr') ? Number(opt('pr')) : undefined, supersedes: opt('supersedes') || opt('pr'), task: opt('task') };
  board.jobs.push(job); save('board', board); console.log(`added ${job.id}`);
} else if (cmd === 'adopt') {
  // Track an existing PR (e.g. a green Paperclip PR) so the crew merges or fixes it like its own.
  const [n, course, unit = '0'] = rest;
  const v = JSON.parse(sh('gh', ['pr', 'view', n, '--json', 'headRefName']).out);
  const board = load('board');
  board.jobs.push({ id: `pr${n}`, course: (course || 'MISC').toUpperCase(), unit: Number(unit), stage: 'fix', status: 'pr_open', attempts: 1, tried: [],
    worker: 'paperclip', family: 'anthropic', branch: v.headRefName, prNumber: Number(n), createdAt: now(), history: [`${now()} adopted existing PR #${n}`] });
  save('board', board); console.log(`adopted PR #${n}`);
} else if (cmd === 'health') {
  const health = load('health');
  if (rest[0] && rest[1]) { health[rest[0]] = rest[1] === 'ok' ? { state: 'ok', strikes: 0 } : { state: rest[1], until: rest[2] || new Date(Date.now() + 36e5).toISOString(), last_error: 'set by lead' }; save('health', health); }
  console.log(JSON.stringify(health, null, 2));
} else {
  console.log(readFileSync(new URL(import.meta.url), 'utf8').split('\n').slice(2, 14).join('\n'));
}
