---
id: crew-batch-20261107-1430-cifix1
title: crew fix CREW unit 0
stage: misc
date: 2026-11-07
surface: agent
model: opencode
feature: crew
branch: crew/batch-20261107-1430
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/crew/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/efmp-407/unit-03/index.mdx
 - history/prompts/efmp-407/20261159-efmp407-unit03-g2-evidence.general.prompt.md
 - history/prompts/efmp-407/crew-efmp-407-u03-author-r1.green.prompt.md
 - history/prompts/efmp-407/crew-efmp-407-u04-translate-conflict1.misc.prompt.md
 - history/prompts/efmp-407/crew-efmp-407-u04-translate.misc.prompt.md
 - history/prompts/general/20261157-efmp407-unit-four-urdu-mirror.general.prompt.md
 - history/prompts/general/20261158-efmp407-unit-four-g2-refresh.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-04/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-04/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-04/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-04/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-04/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-04/unit-teacher-notes.mdx
 - specs/content/efmp-407/reviews/unit-03/G2/20261107T131920558Z-gates.json
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261107T131920558Z/check-bloom-bands.txt
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261107T131920558Z/check-concept-graph.txt
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261107T131920558Z/check-depth-gate.txt
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261107T131920558Z/check-docs-sync.txt
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261107T131920558Z/check-figures.txt
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261107T131920558Z/check-no-answer-keys.txt
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261107T131920558Z/check-no-em-dash.txt
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261107T131920558Z/validate-content.txt
 - specs/content/efmp-407/reviews/unit-04/G2/20261107T111834578Z-gates.json
 - specs/content/efmp-407/reviews/unit-04/G2/logs-20261107T111834578Z/check-bloom-bands.txt
 - specs/content/efmp-407/reviews/unit-04/G2/logs-20261107T111834578Z/check-concept-graph.txt
 - specs/content/efmp-407/reviews/unit-04/G2/logs-20261107T111834578Z/check-depth-gate.txt
 - specs/content/efmp-407/reviews/unit-04/G2/logs-20261107T111834578Z/check-docs-sync.txt
 - specs/content/efmp-407/reviews/unit-04/G2/logs-20261107T111834578Z/check-figures.txt
 - specs/content/efmp-407/reviews/unit-04/G2/logs-20261107T111834578Z/check-no-answer-keys.txt
 - specs/content/efmp-407/reviews/unit-04/G2/logs-20261107T111834578Z/check-no-em-dash.txt
 - specs/content/efmp-407/reviews/unit-04/G2/logs-20261107T111834578Z/validate-content.txt
 - specs/content/efmp-407/tasks.md
 - specs/content/efmp-407/translation/unit-04.md
 - static/img/figures/efmp-407/unit-04/fig-U4-1.ur.dark.svg
 - static/img/figures/efmp-407/unit-04/fig-U4-1.ur.svg
 - static/img/figures/efmp-407/unit-04/fig-U4-2.ur.dark.svg
 - static/img/figures/efmp-407/unit-04/fig-U4-2.ur.svg
 - static/img/figures/efmp-407/unit-04/fig-U4-3.ur.dark.svg
 - static/img/figures/efmp-407/unit-04/fig-U4-3.ur.svg
 - static/img/figures/efmp-407/unit-04/fig-U4-4.ur.dark.svg
 - static/img/figures/efmp-407/unit-04/fig-U4-4.ur.svg
 - static/img/figures/efmp-407/unit-04/fig-U4-5.ur.dark.svg
 - static/img/figures/efmp-407/unit-04/fig-U4-5.ur.svg
 - static/img/figures/efmp-407/unit-04/fig-U4-6.ur.dark.svg
 - static/img/figures/efmp-407/unit-04/fig-U4-6.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job batch-20261107-1430-cifix1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/batch-20261107-1430`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
CI failed on PR #479 (checks: figure-geometry). Run `gh pr checks 479` and `gh run view --log-failed` to read the failure, fix it on this branch with the smallest change, and make `npm run check:content` pass. A build failure is usually malformed MDX or a broken relative link in this unit's files.

## Scope
The files this batch PR (#479) changes, which belong to the crew jobs efmp-407-u04-translate, efmp-407-u03-author-r1. Change only what the merge or CI needs.

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
- (batch-20261107-1315-cifix1, fix, opencode) CI must confirm browser geometry (local Playwright prohibited); `.crew/sim-geometry.py` reproduces the CI spills (19.1/6.2/16.2/5.4/14.7/29.6 vs CI 18.9/6.0/16.0/5.2/14.5/29.4) and reports all 12 unit 5 SVGs clean.
- (batch-20261107-1315-cifix1, fix, opencode) The unit 5 G2 input manifest binds `static/img/figures/`; any future figure edit in unit 5 needs `node scripts/prepare-gate-evidence.mjs --refresh-stale` before `check:pipeline-gate` passes.
- (batch-20261107-1315-cifix1, fix, opencode) Unit 5 now uses `.small` 12px and `.ink` 12px; a later corpus-wide typography pass must not assume the 13px/14px boilerplate for this unit.
- (batch-20261107-1145-cifix1, fix, opencode) CI must confirm browser geometry (local Playwright prohibited); validated with `.crew/sim-geometry.py` (DejaVu advance metrics), which reproduces the CI spills and reports all 12 unit 3 SVGs clean.
- (batch-20261107-1145-cifix1, fix, opencode) `fig-U3-1` col 4 "Water conservation, waste audits," keeps only ~1.7px panel margin (pre-existing, passes CI); `fig-U3-2` descriptions such as "Heritage and mutual learning" still render slightly outside their 220px panels because `measure-figure-text.mjs` does not flag text whose left edge is outside the holder.


## Response snapshot

fix for CREW Unit 0

## Outcome

- Impact: fix for CREW Unit 0 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 45 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: fix for CREW Unit 0
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
