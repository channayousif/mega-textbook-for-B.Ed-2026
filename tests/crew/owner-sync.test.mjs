import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, rmSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const script = path.join(root, 'scripts/crew/sync-owner-checkout.sh');
function fixture(t) {
  mkdirSync(path.join(root, '.crew'), { recursive: true });
  const dir = mkdtempSync(path.join(root, '.crew/owner-sync-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const origin = path.join(dir, 'origin.git');
  const owner = path.join(dir, 'owner');
  const source = path.join(dir, 'source');
  const git = (cwd, ...args) => execFileSync('git', ['-C', cwd, ...args], {
    encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, GIT_CONFIG_GLOBAL: '/dev/null', GIT_CONFIG_NOSYSTEM: '1',
      GIT_AUTHOR_NAME: 'Test', GIT_AUTHOR_EMAIL: 'test@example.com',
      GIT_COMMITTER_NAME: 'Test', GIT_COMMITTER_EMAIL: 'test@example.com' },
  }).trim();
  git(dir, 'init', '--bare', '--initial-branch=main', origin);
  git(dir, 'clone', origin, source);
  const commit = (file, text) => {
    writeFileSync(path.join(source, file), text);
    git(source, 'add', file);
    git(source, 'commit', '-m', text);
    git(source, 'push', 'origin', 'main');
  };
  commit('one.txt', 'initial');
  commit('two.txt', 'initial two');
  git(dir, 'clone', origin, owner);
  const stateDir = path.join(dir, 'state');
  const state = path.join(stateDir, 'owner-sync.state');
  const calls = path.join(dir, 'calls');
  const stub = path.join(dir, 'notify.sh');
  writeFileSync(stub, '#!/bin/bash\nprintf "%s\\0" "$1" >> "$CALLS"\nexit 1\n');
  const run = () => execFileSync('bash', [script], { encoding: 'utf8', env: {
    ...process.env, CREW_OWNER_CHECKOUT: owner, CREW_STATE_DIR: stateDir,
    CREW_OWNER_SYNC_NOTIFY: `bash '${stub}'`, CALLS: calls,
  } });
  const notifications = () => existsSync(calls) ? readFileSync(calls, 'utf8').split('\0').filter(Boolean) : [];
  return { dir, owner, source, git, commit, run, state, stateDir, notifications };
}

test('dirty checkout reports and notifies once, ignores growing behind count, then fast-forwards', t => {
  const f = fixture(t);
  f.commit('one.txt', 'upstream');
  writeFileSync(path.join(f.owner, 'one.txt'), 'owner edit');
  assert.match(f.run(), /fast-forward blocked \(1 behind\)/);
  assert.equal(f.run(), '');
  assert.equal(f.notifications().length, 1);
  assert.match(f.notifications()[0], /1 behind[\s\S]*one.txt/);
  assert.doesNotMatch(readFileSync(f.state, 'utf8'), /behind|Updating /);
  f.commit('one.txt', 'new upstream');
  assert.equal(f.run(), '');
  assert.equal(f.notifications().length, 1);
  assert.equal(readFileSync(path.join(f.owner, 'one.txt'), 'utf8'), 'owner edit');
  // Restore the known fixture bytes without asking the sync script to discard anything.
  writeFileSync(path.join(f.owner, 'one.txt'), 'initial');
  assert.match(f.run(), /fast-forwarded main by 2/);
  assert.equal(existsSync(f.state), false);
  assert.equal(f.git(f.owner, 'rev-parse', 'HEAD'), f.git(f.source, 'rev-parse', 'HEAD'));
  mkdirSync(f.stateDir, { recursive: true });
  writeFileSync(f.state, 'stale');
  assert.equal(f.run(), '');
  assert.equal(existsSync(f.state), false);
});

test('24-hour reminder logs without notifying again; changed file list notifies again', t => {
  const f = fixture(t);
  f.commit('one.txt', 'upstream');
  f.commit('two.txt', 'upstream two');
  writeFileSync(path.join(f.owner, 'one.txt'), 'owner edit');
  f.run();
  const reason = readFileSync(f.state, 'utf8').split('\n').slice(1).join('\n');
  writeFileSync(f.state, `${Math.floor(Date.now() / 1000) - 86401}\n${reason}`);
  assert.match(f.run(), /fast-forward blocked/);
  assert.equal(f.notifications().length, 1);
  assert.equal(f.run(), '');
  writeFileSync(path.join(f.owner, 'two.txt'), 'second edit');
  assert.match(f.run(), /fast-forward blocked/);
  assert.equal(f.notifications().length, 2);
  assert.match(f.notifications()[1], /one.txt[\s\S]*two.txt/);
});

test('untracked files are preserved and included in notifications', t => {
  const f = fixture(t);
  f.commit('new.txt', 'upstream');
  writeFileSync(path.join(f.owner, 'new.txt'), 'untracked owner file');
  assert.match(f.run(), /fast-forward blocked/);
  assert.equal(f.run(), '');
  assert.match(f.notifications()[0], /new.txt/);
  assert.equal(readFileSync(path.join(f.owner, 'new.txt'), 'utf8'), 'untracked owner file');
});

test('in-progress operations, local commits and not-on-main behavior remain unchanged', t => {
  const f = fixture(t);
  f.commit('one.txt', 'upstream');
  for (const marker of ['rebase-merge', 'MERGE_HEAD']) {
    const file = path.join(f.owner, '.git', marker);
    writeFileSync(file, 'fixture');
    assert.match(f.run(), new RegExp(`${marker} in progress`));
    rmSync(file);
  }
  f.git(f.owner, 'switch', '-c', 'topic');
  const head = f.git(f.owner, 'rev-parse', 'HEAD');
  assert.match(f.run(), /moved main by 1 commit\(s\) \(checkout is on topic\)/);
  assert.equal(f.git(f.owner, 'rev-parse', 'HEAD'), head);
  f.git(f.owner, 'switch', 'main');
  writeFileSync(path.join(f.owner, 'local.txt'), 'local');
  f.git(f.owner, 'add', 'local.txt');
  f.git(f.owner, 'commit', '-m', 'local');
  f.commit('one.txt', 'next upstream');
  assert.match(f.run(), /local main has 1 commit\(s\) not on origin/);
  assert.equal(existsSync(f.state), false);
  assert.equal(f.notifications().length, 0);
});
