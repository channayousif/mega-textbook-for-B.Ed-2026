#!/usr/bin/env node
/**
 * Feature 034: keep spec task lists and GitHub issues in step.
 *
 *   node scripts/issue-sync.mjs                    report drift (read-only)
 *   node scripts/issue-sync.mjs --strict           same, exit 1 when any drift is found
 *   node scripts/issue-sync.mjs --create <tasks>   create missing issues for one tasks.md and write
 *                                                  the numbers back (the sp.taskstoissues flow, via gh)
 *   add --dry-run to --create to print what would be created
 *
 * Drift: an unticked `- [ ]` task with no `(#N)` reference, or a ticked task whose issue is open.
 * Scans `specs/NNN-*\/tasks.md` and `specs/maintenance/*\/tasks.md` only. Course trackers under
 * `specs/content/` are bound review inputs and are never read or written here. `- [-]` marks a
 * task closed without doing it (superseded) and is ignored.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const REPO = 'channayousif/mega-textbook-for-B.Ed-2026';

export const MILESTONES = {
  2: 'Stage 2 - Quick fixes',
  3: 'Stage 3 - Landing and navbar',
  4: 'Stage 4 - Learning features',
  5: 'Stage 5 - Carried-over engineering',
  6: 'Stage 6 - Owner and infrastructure',
};

const TASK = /^(\s*)- \[( |x|X)\] (.*)$/;
const ISSUE_REF = /\(#(\d+)\)\s*$/;

/** Parse checkbox tasks; metadata comes from the indented bullets under a task. */
export function parseTasks(text) {
  const lines = text.split('\n');
  const tasks = [];
  let cur = null;
  lines.forEach((line, i) => {
    const m = TASK.exec(line);
    if (m && m[1].length === 0) {
      const rest = m[3];
      const ref = ISSUE_REF.exec(rest);
      const body = ref ? rest.slice(0, ref.index).trimEnd() : rest;
      const idm = /^(T\d+|P\d+[a-z]?)\s+(.*)$/.exec(body);
      cur = {
        line: i,
        done: m[2] !== ' ',
        id: idm ? idm[1] : null,
        title: idm ? idm[2] : body,
        issue: ref ? Number(ref[1]) : null,
        meta: {},
        source: null,
        doneWhen: null,
      };
      tasks.push(cur);
      return;
    }
    if (!cur) return;
    if (/^\S/.test(line) || line.trim() === '') { if (/^\S/.test(line)) cur = null; return; }
    const sub = /^\s+- (Stage|Source|Done when):\s*(.*)$/.exec(line);
    if (!sub) return;
    if (sub[1] === 'Stage') {
      for (const part of `Stage: ${sub[2]}`.split('|')) {
        const [k, v] = part.split(':').map((s) => s.trim());
        if (k && v) cur.meta[k.toLowerCase()] = v;
      }
    } else if (sub[1] === 'Source') cur.source = sub[2];
    else cur.doneWhen = sub[2];
  });
  return tasks;
}

/** Labels for a task from its metadata. */
export function labelsFor(task) {
  const m = task.meta;
  const out = [];
  if (m.area) out.push(`area:${m.area}`);
  if (m.type) out.push(`type:${m.type}`);
  if (m.priority) out.push(`priority:${m.priority}`);
  if (m.owner === 'yes') out.push('blocked:owner');
  return out;
}

export function markerFor(feature, task) {
  return `<!-- task:${feature}/${task.id} -->`;
}

export function issueBody(feature, task) {
  return [
    `**Task:** \`specs/${feature}/tasks.md\` ${task.id}`,
    task.source ? `**Source:** ${task.source}` : null,
    '',
    '**Done when:**',
    task.doneWhen ?? '(see the task list)',
    '',
    task.meta.owner === 'yes' ? '_Blocked on the owner: needs an owner action or decision._' : null,
    'Close with `Closes #<this issue>` in the PR that finishes it, and tick the task.',
    markerFor(feature, task),
  ].filter((l) => l !== null).join('\n');
}

/** Write `(#N)` after each task line whose id is in `numbers` (Map id -> number). */
export function writeBack(text, numbers) {
  const lines = text.split('\n');
  for (const t of parseTasks(text)) {
    if (t.issue || !t.id || !numbers.has(t.id)) continue;
    lines[t.line] = `${lines[t.line].trimEnd()} (#${numbers.get(t.id)})`;
  }
  return lines.join('\n');
}

export function taskFiles(root = ROOT) {
  const specs = join(root, 'specs');
  const out = [];
  for (const d of readdirSync(specs)) {
    if (/^\d{3}-/.test(d) && existsSync(join(specs, d, 'tasks.md'))) out.push(join(specs, d, 'tasks.md'));
  }
  const maint = join(specs, 'maintenance');
  if (existsSync(maint)) {
    for (const d of readdirSync(maint)) {
      const f = join(maint, d, 'tasks.md');
      if (existsSync(f)) out.push(f);
    }
  }
  return out.sort();
}

function gh(args, input) {
  return execFileSync('gh', args, { encoding: 'utf8', input, stdio: ['pipe', 'pipe', 'inherit'] });
}

function allIssues() {
  return JSON.parse(gh(['issue', 'list', '-R', REPO, '--state', 'all', '--limit', '1000', '--json', 'number,state,body']));
}

function checkRemote() {
  const url = execFileSync('git', ['config', '--get', 'remote.origin.url'], { cwd: ROOT, encoding: 'utf8' }).trim();
  if (!url.includes(REPO)) throw new Error(`remote ${url} is not ${REPO}; refusing to create issues`);
}

function report(strict) {
  const issues = new Map(allIssues().map((i) => [i.number, i.state]));
  let drift = 0;
  for (const f of taskFiles()) {
    const rel = relative(ROOT, f);
    for (const t of parseTasks(readFileSync(f, 'utf8'))) {
      const name = `${rel}:${t.line + 1} ${t.id ?? ''} ${t.title}`.replace(/\s+/g, ' ').slice(0, 150);
      if (!t.done && !t.issue) { drift++; console.log(`untracked  ${name}`); }
      else if (t.done && t.issue && issues.get(t.issue) === 'OPEN') { drift++; console.log(`stale-open #${t.issue} ${name}`); }
      else if (!t.done && t.issue && issues.get(t.issue) === 'CLOSED') { drift++; console.log(`closed-but-unticked #${t.issue} ${name}`); }
    }
  }
  console.log(drift ? `${drift} task(s) out of step with issues.` : 'All tasks are in step with issues.');
  if (strict && drift) process.exitCode = 1;
}

function create(file, dryRun) {
  checkRemote();
  const path = join(ROOT, file);
  const feature = relative(join(ROOT, 'specs'), path).split('/').slice(0, -1).join('/');
  const text = readFileSync(path, 'utf8');
  const existing = dryRun ? [] : allIssues();
  const numbers = new Map();
  for (const t of parseTasks(text)) {
    if (t.done || t.issue || !t.id) continue;
    const marker = markerFor(feature, t);
    const found = existing.find((i) => (i.body ?? '').includes(marker));
    if (found) { numbers.set(t.id, found.number); continue; }
    const args = ['issue', 'create', '-R', REPO, '--title', t.title, '--body-file', '-'];
    for (const l of labelsFor(t)) args.push('--label', l);
    const ms = MILESTONES[Number(t.meta.stage)];
    if (ms) args.push('--milestone', ms);
    if (dryRun) { console.log(`would create: ${t.id} ${t.title} [${labelsFor(t).join(', ')}] ${ms ?? ''}`); continue; }
    const url = gh(args, issueBody(feature, t)).trim();
    const n = Number(url.split('/').pop());
    numbers.set(t.id, n);
    console.log(`#${n} ${t.id} ${t.title}`);
  }
  if (!dryRun && numbers.size) writeFileSync(path, writeBack(text, numbers));
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const args = process.argv.slice(2);
  const i = args.indexOf('--create');
  if (i >= 0) create(args[i + 1], args.includes('--dry-run'));
  else report(args.includes('--strict'));
}
