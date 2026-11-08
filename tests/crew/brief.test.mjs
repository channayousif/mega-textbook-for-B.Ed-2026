import test from 'node:test';
import assert from 'node:assert/strict';
import { briefRules } from '../../scripts/crew/brief.mjs';

for (const self of [false, true]) {
  test(`brief rules preserve host protections and require local gates (self=${self})`, () => {
    const rules = briefRules({ stage: self ? 'maint_refactor' : 'author' }, self);
    for (const sentence of [
      'no em dash (U+2014) anywhere',
      'heavy commands only through `scripts/heavy.sh`',
      'never run `npm run build`, a dev server or the Playwright e2e suite',
      'keep all scratch files inside your worktree (for example `.crew/`)',
      'never use `/tmp`',
      'a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server',
      'Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0.',
      '`static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git',
    ]) assert.ok(rules.includes(sentence), sentence);
    assert.ok(!rules.includes('a dev server or Playwright'));
    assert.ok(!rules.includes('\u2014'));
    const extra = self
      ? ', and never touch course content (`docs/`, `licence/`, the Urdu docs trees,\n`specs/content/`, `static/img/figures/`, `glossary.json`): the dispatcher rejects any such change. Never change\nwhat an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,\nAGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.'
      : ', never mark G3/G5 done, never self-sign or use\nhuman initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.';
    assert.ok(rules.endsWith(extra));
  });
}
