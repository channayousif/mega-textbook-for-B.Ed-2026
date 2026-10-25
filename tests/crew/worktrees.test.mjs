import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
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
    linkNodeModules() {},
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
