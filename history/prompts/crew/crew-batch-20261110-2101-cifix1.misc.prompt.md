---
id: crew-batch-20261110-2101-cifix1
title: crew fix CREW unit 0
stage: misc
date: 2026-11-10
surface: agent
model: agy
feature: crew
branch: crew/batch-20261110-2101
user: crew
command: crew fix
labels: ["crew", "agy", "fix"]
links:
  spec: specs/content/crew/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/efpg-401/unit-04/index.mdx
 - docs/semester-3/efpg-401/unit-04/topic-01.mdx
 - docs/semester-3/efpg-401/unit-04/unit-assessment.mdx
 - history/prompts/efpg-401/crew-efpg-401-u04-author-conflict1.misc.prompt.md
 - history/prompts/efpg-401/crew-efpg-401-u04-author-conflict2.misc.prompt.md
 - history/prompts/efpg-401/crew-efpg-401-u04-author-conflict3.misc.prompt.md
 - history/prompts/efpg-401/crew-efpg-401-u04-author-conflict4.misc.prompt.md
 - history/prompts/efpg-401/crew-efpg-401-u04-author.green.prompt.md
 - history/prompts/efpg-401/crew-efpg-401-u07-translate.green.prompt.md
 - history/prompts/efpg-401/crew-efpg-401-u07-translate.misc.prompt.md
 - history/prompts/general/20261193-fix-pr539-urdu-figure-geometry.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-07/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-07/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-07/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-07/unit-assessment.mdx
 - specs/content/efpg-401/concepts/unit-04.md
 - specs/content/efpg-401/coverage/unit-04.md
 - specs/content/efpg-401/figures/unit-04.md
 - specs/content/efpg-401/reviews/unit-04/G2/20261110T124259085Z-gates.json
 - specs/content/efpg-401/reviews/unit-04/G2/logs-20261110T124259085Z/check-bloom-bands.txt
 - specs/content/efpg-401/reviews/unit-04/G2/logs-20261110T124259085Z/check-concept-graph.txt
 - specs/content/efpg-401/reviews/unit-04/G2/logs-20261110T124259085Z/check-depth-gate.txt
 - specs/content/efpg-401/reviews/unit-04/G2/logs-20261110T124259085Z/check-docs-sync.txt
 - specs/content/efpg-401/reviews/unit-04/G2/logs-20261110T124259085Z/check-figures.txt
 - specs/content/efpg-401/reviews/unit-04/G2/logs-20261110T124259085Z/check-no-answer-keys.txt
 - specs/content/efpg-401/reviews/unit-04/G2/logs-20261110T124259085Z/check-no-em-dash.txt
 - specs/content/efpg-401/reviews/unit-04/G2/logs-20261110T124259085Z/validate-content.txt
 - specs/content/efpg-401/reviews/unit-07/G4/translation-handoff.md
 - specs/content/efpg-401/sources/texts/kiran-2021-gtm-clt.md
 - specs/content/efpg-401/sources/texts/koca-2024-grammar.md
 - specs/content/efpg-401/sources/unit-04.md
 - specs/content/efpg-401/tasks.md
 - static/img/figures/efpg-401/unit-04/fig-U4-1.dark.svg
 - static/img/figures/efpg-401/unit-04/fig-U4-1.svg
 - static/img/figures/efpg-401/unit-04/fig-U4-2.dark.svg
 - static/img/figures/efpg-401/unit-04/fig-U4-2.svg
 - static/img/figures/efpg-401/unit-04/fig-U4-3.dark.svg
 - static/img/figures/efpg-401/unit-04/fig-U4-3.svg
 - static/img/figures/efpg-401/unit-07/fig-U7-1.ur.dark.svg
 - static/img/figures/efpg-401/unit-07/fig-U7-1.ur.svg
 - static/img/figures/efpg-401/unit-07/fig-U7-2.ur.dark.svg
 - static/img/figures/efpg-401/unit-07/fig-U7-2.ur.svg
 - static/img/figures/efpg-401/unit-07/fig-U7-3.ur.dark.svg
 - static/img/figures/efpg-401/unit-07/fig-U7-3.ur.svg
 - static/img/figures/efpg-401/unit-07/fig-U7-4.ur.dark.svg
 - static/img/figures/efpg-401/unit-07/fig-U7-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job batch-20261110-2101-cifix1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/batch-20261110-2101`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
CI failed on PR #539 (checks: figure-geometry). Run `gh pr checks 539` and `gh run view --log-failed` to read the failure, fix it on this branch with the smallest change, and make `npm run check:content` pass. A build failure is usually malformed MDX or a broken relative link in this unit's files.

## Scope
The files this batch PR (#539) changes, which belong to the crew jobs efpg-401-u04-author, efpg-401-u07-translate. Change only what the merge or CI needs.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Notes from earlier jobs on this unit
- (batch-20261110-1800-cifix1, fix, opencode) Local Playwright resolves a narrower Nastaliq face than CI's fallback, so local measure-figure-text passes these SVGs even at 14px; the 13px repair was sized from CI's measured widths (3.5px gap and 6.9px overlap become about 16.8px and 7.2px).
- (batch-20261110-1800-cifix1, fix, opencode) CI figure-geometry must confirm the repair on the next run; no G3/G5 status, evidence or publication state was touched.
- (batch-20261110-1201-cifix1, fix, agy) Rebalanced the three-line wrap for the row 2 paraphrased principle in GISS-401 Unit 2 `fig-U2-3.ur.svg` and `fig-U2-3.ur.dark.svg` to keep glyph advances inside the 270px panel margin.
- (batch-20261107-1545-cifix1, fix, opencode) CI must confirm browser geometry (local Playwright prohibited); `.crew/sim-geometry.py` reproduces the CI findings (1.1/7.2/0.2/17.9 vs CI 1.2/7.1/0.3/17.8) and reports all changed SVGs clean.
- (batch-20261107-1545-cifix1, fix, opencode) The unit 8 G2 input manifest binds `static/img/figures/`; any future unit 8 figure edit needs `node scripts/prepare-gate-evidence.mjs --refresh-stale` before `check:pipeline-gate` passes.


## Response snapshot

Fixed EFPG-401 unit 7 Urdu figure text geometry by shortening Criterion 4's parenthetical to `(Grammar)` and reducing `.sh` font size from 14px to 13px in `fig-U7-4.ur.svg` and `fig-U7-4.ur.dark.svg`.

## Outcome

- Impact: fix for CREW Unit 0 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 46 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Fixed EFPG-401 unit 7 Urdu figure text geometry by shortening Criterion 4's parenthetical to `(Grammar)` and reducing `.sh` font size from 14px to 13px in `fig-U7-4.ur.svg` and `fig-U7-4.ur.dark.svg`.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Local Playwright resolves a narrower Nastaliq face than CI's fallback, so local measure-figure-text passes these SVGs even at 14px; the repair was validated against CI fallback font simulation.
  - CI figure-geometry must confirm the repair on the next run; no G3/G5 status, evidence, or publication state was touched.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
