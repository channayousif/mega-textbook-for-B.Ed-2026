---
id: crew-batch-20261107-1315-cifix1
title: crew fix CREW unit 0
stage: misc
date: 2026-11-07
surface: agent
model: opencode
feature: crew
branch: crew/batch-20261107-1315
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/crew/content-spec.md
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/478
files:
 - static/img/figures/efmp-407/unit-05/fig-U5-4.svg
 - static/img/figures/efmp-407/unit-05/fig-U5-4.dark.svg
 - static/img/figures/efmp-407/unit-05/fig-U5-5.svg
 - static/img/figures/efmp-407/unit-05/fig-U5-5.dark.svg
 - static/img/figures/efmp-407/unit-05/fig-U5-6.svg
 - static/img/figures/efmp-407/unit-05/fig-U5-6.dark.svg
 - specs/content/efmp-407/tasks.md
 - specs/content/efmp-407/reviews/unit-05/G2/20261107T134915417Z-gates.json
 - specs/content/efmp-407/reviews/unit-05/G2/logs-20261107T134915417Z/check-bloom-bands.txt
 - specs/content/efmp-407/reviews/unit-05/G2/logs-20261107T134915417Z/check-concept-graph.txt
 - specs/content/efmp-407/reviews/unit-05/G2/logs-20261107T134915417Z/check-depth-gate.txt
 - specs/content/efmp-407/reviews/unit-05/G2/logs-20261107T134915417Z/check-docs-sync.txt
 - specs/content/efmp-407/reviews/unit-05/G2/logs-20261107T134915417Z/check-figures.txt
 - specs/content/efmp-407/reviews/unit-05/G2/logs-20261107T134915417Z/check-no-answer-keys.txt
 - specs/content/efmp-407/reviews/unit-05/G2/logs-20261107T134915417Z/check-no-em-dash.txt
 - specs/content/efmp-407/reviews/unit-05/G2/logs-20261107T134915417Z/validate-content.txt
 - history/prompts/crew/crew-batch-20261107-1315-cifix1.misc.prompt.md
tests:
 - npm run check:content
---

## Prompt

# Crew job batch-20261107-1315-cifix1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/batch-20261107-1315`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
CI failed on PR #478 (checks: figure-geometry). Run `gh pr checks 478` and `gh run view --log-failed` to read the failure, fix it on this branch with the smallest change, and make `npm run check:content` pass. A build failure is usually malformed MDX or a broken relative link in this unit's files.

## Scope
The files this batch PR (#478) changes, which belong to the crew jobs efmp-407-u05-author, efmp-407-u01-illustrate, efmp-407-u06-review_en, efmp-407-u07-translate. Change only what the merge or CI needs.

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
- (batch-20261107-1145-cifix1, fix, opencode) CI must confirm browser geometry (local Playwright prohibited); validated with `.crew/sim-geometry.py` (DejaVu advance metrics), which reproduces the CI spills and reports all 12 unit 3 SVGs clean.
- (batch-20261107-1145-cifix1, fix, opencode) `fig-U3-1` col 4 "Water conservation, waste audits," keeps only ~1.7px panel margin (pre-existing, passes CI); `fig-U3-2` descriptions such as "Heritage and mutual learning" still render slightly outside their 220px panels because `measure-figure-text.mjs` does not flag text whose left edge is outside the holder.
- (batch-20261107-1145-cifix1, fix, opencode) `fig-U3-6` body text is now 12px and its label 14px; a later corpus-wide typography pass must not assume the 15px/13px boilerplate for unit 3.
- (batch-20261106-2100-cifix1, fix, opencode) CI must confirm browser geometry (local Playwright prohibited); the fix was validated with a DejaVu advance-metric sim (`.crew/sim-geometry.py`) that reproduces the 145.0px spill before the edit and reports both files clean after.
- (batch-20261106-2100-cifix1, fix, opencode) The other Urdu panel labels in `fig-U2-2.ur.svg` still carry `text-anchor="end"` at panel centres (a translation artifact); they pass CI today but sit off-centre.

## Response snapshot

Fixed the figure-geometry CI failure on PR #478 by reducing the font size of the overflowing text in EFMP-407 unit 5 figures: `.small` from 13px to 12px in fig-U5-4 and `.ink` from 14px to 12px in fig-U5-5 and fig-U5-6, in both light and dark SVGs. The unit 5 G2 gate evidence binds those SVG files, so the edit made its input manifest stale; refreshed it with `node scripts/prepare-gate-evidence.mjs --refresh-stale`, which repointed the tracker row. `npm run check:content` passes.

## Outcome

- Impact: fix for CREW Unit 0 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree.
- Files: 17 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Fixed the figure-geometry CI failure on PR #478 by reducing the font size of the overflowing text in EFMP-407 unit 5 figures (fig-U5-4 `.small` to 12px, fig-U5-5 and fig-U5-6 `.ink` to 12px, light and dark), then refreshed the unit 5 G2 gate evidence whose input manifest binds those files.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - CI must confirm browser geometry (local Playwright prohibited); validated with `.crew/sim-geometry.py` (DejaVu advance metrics), which reproduces the CI spills (19.1/6.2/16.2/5.4/14.7/29.6 against CI 18.9/6.0/16.0/5.2/14.5/29.4) and reports all 12 unit 5 SVGs clean after.
  - The unit 5 G2 input manifest binds `static/img/figures/`; any future figure edit in unit 5 requires `node scripts/prepare-gate-evidence.mjs --refresh-stale` before `check:pipeline-gate` can pass.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
