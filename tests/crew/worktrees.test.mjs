import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import { runInNewContext } from 'node:vm';

// Exercise the orchestrator functions without importing its stateful CLI entry point.
const source = readFileSync(new URL('../../scripts/crew/crew.mjs', import.meta.url), 'utf8');
function loadFunction(name, end, context) {
  return runInNewContext(`${source.slice(source.indexOf(`function ${name}(`), source.indexOf(end, source.indexOf(`function ${name}(`)))}\n${name}`, context);
}
function fixture(t) {
  const base = resolve('.crew');
  mkdirSync(base, { recursive: true });
  const dir = mkdtempSync(join(base, 'm1-test-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  return dir;
}

test('prepareWorktree refreshes the report for new, reused and parent worktrees', (t) => {
  const base = fixture(t);
  const calls = [];
  const prepare = loadFunction('prepareWorktree', '\n/**', {
    WT_DIR: base, ROOT: base, SPARSE: [], join, existsSync, mkdirSync,
    linkNodeModules() {}, freeBranch() {},
    sh(cmd, args, cwd) {
      calls.push({ cmd, args: Array.from(args), cwd });
      if (args[0] === 'worktree') mkdirSync(args[5], { recursive: true });
      return { ok: false };
    },
  });
  const job = { id: 'job', branch: 'crew/test' };
  const wt = prepare({ jobs: [] }, job);
  prepare({ jobs: [] }, job);
  prepare({ jobs: [{ id: 'parent', worktree: wt }] }, { parent: 'parent' });
  assert.equal(calls.filter((c) => c.cmd === 'node' && c.cwd === wt && c.args[0] === 'scripts/report-content-status.mjs').length, 3);
  assert.equal(calls.filter((c) => c.args[0] === 'worktree').length, 1);
});

test('freeBranch removes a leftover folder holding the branch, but never a running job\'s', (t) => {
  const dir = fixture(t);
  const repo = join(dir, 'repo');
  const wtDir = join(dir, 'wt');
  mkdirSync(repo);
  const git = (cwd, ...args) => execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  git(repo, 'init', '-q', '-b', 'main');
  git(repo, '-c', 'user.email=t@example.invalid', '-c', 'user.name=t', 'commit', '-q', '--allow-empty', '-m', 'base');
  const sh = (cmd, args, cwd = repo) => { try { return { ok: true, out: git(cwd, ...args) }; } catch { return { ok: false, out: '' }; } };
  const free = loadFunction('freeBranch', '\n/**', { WT_DIR: wtDir, ROOT: repo, sh });
  const left = join(wtDir, 'u05-conflict1');
  git(repo, 'worktree', 'add', '-q', '-b', 'crew/u05', left);

  free({ jobs: [{ status: 'running', worktree: left }] }, 'crew/u05');
  assert.ok(existsSync(left), 'a running job keeps its folder');
  free({ jobs: [] }, 'crew/other');
  assert.ok(existsSync(left), 'another branch is untouched');
  free({ jobs: [{ status: 'merged', worktree: left }] }, 'crew/u05');
  assert.ok(!existsSync(left), 'the leftover folder is removed');
  git(repo, 'worktree', 'add', '-q', '-B', 'crew/u05', join(wtDir, 'u05-conflict2'));
});

for (const oursDeletes of [true, false]) {
  test(`shared report modify/delete conflict stays untracked (ours deletes: ${oursDeletes})`, (t) => {
    const wt = fixture(t);
    const git = (...args) => execFileSync('git', args, { cwd: wt, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
    git('init', '-q');
    git('config', 'user.email', 'test@example.invalid');
    git('config', 'user.name', 'Crew test');
    mkdirSync(join(wt, 'static'));
    writeFileSync(join(wt, '.gitignore'), 'static/content-status.json\n');
    writeFileSync(join(wt, 'static/content-status.json'), 'base');
    git('add', '.gitignore');
    git('add', '-f', 'static/content-status.json');
    git('commit', '-qm', 'base');
    git('branch', 'other');
    const change = (deletes) => {
      if (deletes) git('rm', 'static/content-status.json');
      else { writeFileSync(join(wt, 'static/content-status.json'), 'modified'); git('add', '-u'); }
      git('commit', '-qm', deletes ? 'delete' : 'modify');
    };
    change(oursDeletes);
    git('checkout', '-q', 'other');
    change(!oursDeletes);
    git('checkout', '-q', '-');
    assert.throws(() => git('merge', '--no-edit', 'other'));
    let generated = 0;
    const resolveConflicts = loadFunction('resolveSharedConflicts', '\n/**', {
      join, writeFileSync,
      sh(cmd, args, cwd, { allowFail = false } = {}) {
        if (cmd === 'node') {
          generated++;
          writeFileSync(join(cwd, 'static/content-status.json'), 'regenerated');
          return { ok: true };
        }
        try { return { ok: true, out: git(...args) }; }
        catch (error) { if (!allowFail) throw error; return { ok: false, out: '' }; }
      },
    });
    assert.equal(resolveConflicts(wt), true);
    assert.equal(generated, 1);
    assert.equal(git('ls-files', 'static/content-status.json'), '');
    assert.equal(git('status', '--porcelain'), '');
    assert.equal(readFileSync(join(wt, 'static/content-status.json'), 'utf8'), 'regenerated');
    assert.equal(git('check-ignore', 'static/content-status.json'), 'static/content-status.json');
  });
}

test('common brief rules keep every worker scratch file inside its worktree', () => {
  const rules = loadFunction('briefRules', '\n/**', {});
  for (const self of [true, false]) {
    assert.match(rules({}, self), /keep all scratch files inside your worktree/);
    assert.match(rules({}, self), /never use `\/tmp`/);
  }
});

test('pruneScratch drops worker folders in .crew but keeps the dispatcher files', (t) => {
  const wt = fixture(t);
  mkdirSync(join(wt, '.crew', 'main-baseline', 'docs'), { recursive: true });
  writeFileSync(join(wt, '.crew', 'main-baseline', 'docs', 'a.md'), 'x');
  writeFileSync(join(wt, '.crew', 'brief.md'), 'brief');
  writeFileSync(join(wt, '.crew', 'content-final.log'), 'log');
  const prune = loadFunction('pruneScratch', '\n/**', { join, existsSync, readdirSync, rmSync });
  prune(wt);
  prune(join(wt, 'missing'));
  assert.equal(existsSync(join(wt, '.crew', 'main-baseline')), false);
  assert.equal(existsSync(join(wt, '.crew', 'brief.md')), true);
  assert.equal(existsSync(join(wt, '.crew', 'content-final.log')), true);
});

test('dropWaitingWorktrees removes folders of ready and batched jobs unless a running job uses them', (t) => {
  const base = fixture(t);
  const dirs = ['ready', 'batched', 'shared', 'running', 'red'].map((n) => { const d = join(base, n); mkdirSync(d); return d; });
  const removed = [];
  const drop = loadFunction('dropWaitingWorktrees', '\n/**', {
    DRY: false, ROOT: base, existsSync, console,
    sh(cmd, args) { removed.push(args.at(-1)); },
  });
  drop({ jobs: [
    { id: 'a', status: 'ready', worktree: dirs[0] },
    { id: 'b', status: 'batched', worktree: dirs[1] },
    { id: 'c', status: 'ready', worktree: dirs[2] },
    { id: 'c-cifix1', status: 'running', worktree: dirs[2] },
    { id: 'd', status: 'running', worktree: dirs[3] },
    { id: 'e', status: 'gate_red', worktree: dirs[4] },
    { id: 'f', status: 'ready', worktree: join(base, 'gone') },
    { id: 'g', status: 'ready' },
  ] });
  assert.deepEqual(removed, [dirs[0], dirs[1]]);
});
