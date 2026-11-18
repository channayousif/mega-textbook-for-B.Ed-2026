---
id: crew-batch-20261110-1201-cifix1
title: crew fix CREW unit 0
stage: misc
date: 2026-11-10
surface: agent
model: agy
feature: crew
branch: crew/batch-20261110-1201
user: crew
command: crew fix
labels: ["crew", "agy", "fix"]
links:
  spec: specs/content/crew/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261191-gicp-400-unit-07-urdu-translation.general.prompt.md
 - history/prompts/gicp-400/crew-gicp-400-u07-translate-r1.misc.prompt.md
 - history/prompts/giss-401/crew-giss-401-u02-translate-r1.misc.prompt.md
 - history/prompts/giss-401/crew-giss-401-u05-translate-r1.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-07/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-07/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-07/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-02/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-02/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-02/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-02/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-02/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-05/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-05/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-05/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-05/unit-assessment.mdx
 - specs/content/gicp-400/reviews/unit-07/G4/translation-handoff.md
 - specs/content/gicp-400/tasks.md
 - specs/content/giss-401/reviews/unit-05/G4/translation-handoff.md
 - specs/content/giss-401/tasks.md
 - specs/content/svg-style-baseline.json
 - static/img/figures/gicp-400/unit-07/fig-U7-1.ur.dark.svg
 - static/img/figures/gicp-400/unit-07/fig-U7-1.ur.svg
 - static/img/figures/gicp-400/unit-07/fig-U7-2.ur.dark.svg
 - static/img/figures/gicp-400/unit-07/fig-U7-2.ur.svg
 - static/img/figures/gicp-400/unit-07/fig-U7-3.ur.dark.svg
 - static/img/figures/gicp-400/unit-07/fig-U7-3.ur.svg
 - static/img/figures/giss-401/unit-02/fig-U2-1.ur.dark.svg
 - static/img/figures/giss-401/unit-02/fig-U2-1.ur.svg
 - static/img/figures/giss-401/unit-02/fig-U2-2.ur.dark.svg
 - static/img/figures/giss-401/unit-02/fig-U2-2.ur.svg
 - static/img/figures/giss-401/unit-02/fig-U2-3.ur.dark.svg
 - static/img/figures/giss-401/unit-02/fig-U2-3.ur.svg
 - static/img/figures/giss-401/unit-02/fig-U2-4.ur.dark.svg
 - static/img/figures/giss-401/unit-02/fig-U2-4.ur.svg
 - static/img/figures/giss-401/unit-02/fig-U2-5.ur.dark.svg
 - static/img/figures/giss-401/unit-02/fig-U2-5.ur.svg
 - static/img/figures/giss-401/unit-02/fig-U2-6.ur.dark.svg
 - static/img/figures/giss-401/unit-02/fig-U2-6.ur.svg
 - static/img/figures/giss-401/unit-05/fig-U5-1.ur.dark.svg
 - static/img/figures/giss-401/unit-05/fig-U5-1.ur.svg
 - static/img/figures/giss-401/unit-05/fig-U5-2.ur.dark.svg
 - static/img/figures/giss-401/unit-05/fig-U5-2.ur.svg
 - static/img/figures/giss-401/unit-05/fig-U5-3.ur.dark.svg
 - static/img/figures/giss-401/unit-05/fig-U5-3.ur.svg
 - static/img/figures/giss-401/unit-05/fig-U5-4.ur.dark.svg
 - static/img/figures/giss-401/unit-05/fig-U5-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job batch-20261110-1201-cifix1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/batch-20261110-1201`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
CI failed on PR #533 (checks: figure-geometry). Run `gh pr checks 533` and `gh run view --log-failed` to read the failure, fix it on this branch with the smallest change, and make `npm run check:content` pass. A build failure is usually malformed MDX or a broken relative link in this unit's files.

## Scope
The files this batch PR (#533) changes, which belong to the crew jobs gicp-400-u07-translate-r1, giss-401-u05-translate-r1, giss-401-u02-translate-r1. Change only what the merge or CI needs.

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
- (batch-20261107-1545-cifix1, fix, opencode) CI must confirm browser geometry (local Playwright prohibited); `.crew/sim-geometry.py` reproduces the CI findings (1.1/7.2/0.2/17.9 vs CI 1.2/7.1/0.3/17.8) and reports all changed SVGs clean.
- (batch-20261107-1545-cifix1, fix, opencode) The unit 8 G2 input manifest binds `static/img/figures/`; any future unit 8 figure edit needs `node scripts/prepare-gate-evidence.mjs --refresh-stale` before `check:pipeline-gate` passes.
- (batch-20261107-1545-cifix1, fix, opencode) `fig-U8-2` now uses `.ink` 12px with a three-line Who cell; a later corpus-wide typography pass must not assume the 14px boilerplate for this figure.
- (batch-20261107-1315-cifix1, fix, opencode) CI must confirm browser geometry (local Playwright prohibited); `.crew/sim-geometry.py` reproduces the CI spills (19.1/6.2/16.2/5.4/14.7/29.6 vs CI 18.9/6.0/16.0/5.2/14.5/29.4) and reports all 12 unit 5 SVGs clean.
- (batch-20261107-1315-cifix1, fix, opencode) The unit 5 G2 input manifest binds `static/img/figures/`; any future figure edit in unit 5 needs `node scripts/prepare-gate-evidence.mjs --refresh-stale` before `check:pipeline-gate` passes.

## Feedback from the previous attempt
the worker exited without committing any change


## Response snapshot

Fixed text-geometry failure on PR #533 by rebalancing the row 2 principle line wrap across three lines in GISS-401 Unit 2 fig-U2-3.ur.svg and its dark twin.

## Outcome

- Impact: fix for CREW Unit 0 by agy (attempt 3).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 47 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Fixed text-geometry failure on PR #533 by rebalancing the row 2 principle line wrap across three lines in GISS-401 Unit 2 fig-U2-3.ur.svg and its dark twin.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Rebalanced the three-line wrap for the row 2 paraphrased principle in GISS-401 Unit 2 `fig-U2-3.ur.svg` and `fig-U2-3.ur.dark.svg` to keep glyph advances inside the 270px panel margin.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 2 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
