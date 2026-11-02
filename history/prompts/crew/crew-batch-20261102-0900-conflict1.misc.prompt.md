---
id: crew-batch-20261102-0900-conflict1
title: crew fix CREW unit 0
stage: misc
date: 2026-11-02
surface: agent
model: opencode
feature: crew
branch: crew/batch-20261102-0900
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/crew/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/efmp-406/unit-03/index.mdx
 - docs/semester-3/efmp-406/unit-03/topic-01.mdx
 - docs/semester-3/efmp-406/unit-03/topic-02.mdx
 - docs/semester-3/efmp-406/unit-03/unit-assessment.mdx
 - history/prompts/crew/crew-batch-20261102-0900-cifix1.misc.prompt.md
 - history/prompts/crew/crew-batch-20261102-0900-cifix2.misc.prompt.md
 - history/prompts/efmp-406/crew-efmp-406-u01-review_en.misc.prompt.md
 - history/prompts/efmp-406/crew-efmp-406-u03-author-conflict1.misc.prompt.md
 - history/prompts/efmp-406/crew-efmp-406-u03-author.green.prompt.md
 - specs/content/efmp-406/concepts/unit-03.md
 - specs/content/efmp-406/coverage/unit-03.md
 - specs/content/efmp-406/figures/unit-03.md
 - specs/content/efmp-406/reviews/unit-01/G3/5be15169-67ce-493e-9ccd-e4c8e6b64a2d.json
 - specs/content/efmp-406/reviews/unit-01/G3/5be15169-67ce-493e-9ccd-e4c8e6b64a2d.summary.md
 - specs/content/efmp-406/reviews/unit-01/G3/crew-5be15169/manifest.json
 - specs/content/efmp-406/reviews/unit-01/G3/logs-5be15169/check-content.txt
 - specs/content/efmp-406/reviews/unit-01/G3/logs-5be15169/check-depth-gate.txt
 - specs/content/efmp-406/reviews/unit-01/G3/logs-5be15169/check-docs-sync.txt
 - specs/content/efmp-406/reviews/unit-01/G3/logs-5be15169/check-figures.txt
 - specs/content/efmp-406/reviews/unit-01/G3/logs-5be15169/check-no-answer-keys.txt
 - specs/content/efmp-406/reviews/unit-01/G3/logs-5be15169/check-no-em-dash.txt
 - specs/content/efmp-406/reviews/unit-01/G3/logs-5be15169/fig-U1-1.png
 - specs/content/efmp-406/reviews/unit-01/G3/logs-5be15169/fig-U1-2.png
 - specs/content/efmp-406/reviews/unit-01/G3/logs-5be15169/fig-U1-3.png
 - specs/content/efmp-406/reviews/unit-01/G3/logs-5be15169/fig-U1-4.png
 - specs/content/efmp-406/reviews/unit-01/G3/logs-5be15169/measure-figure-text.txt
 - specs/content/efmp-406/reviews/unit-01/G3/logs-5be15169/render-review.txt
 - specs/content/efmp-406/reviews/unit-01/G3/logs-5be15169/validate-content.txt
 - specs/content/efmp-406/reviews/unit-01/G3/summary.md
 - specs/content/efmp-406/reviews/unit-03/G2/20261102T074142082Z-gates.json
 - specs/content/efmp-406/reviews/unit-03/G2/20261102T104941955Z-gates.json
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261102T074142082Z/check-bloom-bands.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261102T074142082Z/check-concept-graph.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261102T074142082Z/check-depth-gate.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261102T074142082Z/check-docs-sync.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261102T074142082Z/check-figures.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261102T074142082Z/check-no-answer-keys.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261102T074142082Z/check-no-em-dash.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261102T074142082Z/validate-content.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261102T104941955Z/check-bloom-bands.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261102T104941955Z/check-concept-graph.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261102T104941955Z/check-depth-gate.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261102T104941955Z/check-docs-sync.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261102T104941955Z/check-figures.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261102T104941955Z/check-no-answer-keys.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261102T104941955Z/check-no-em-dash.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261102T104941955Z/validate-content.txt
 - specs/content/efmp-406/sources/texts/ashraf-2021-multilingual.md
 - specs/content/efmp-406/sources/texts/papen-2023-nls.md
 - specs/content/efmp-406/sources/unit-03.md
 - specs/content/efmp-406/tasks.md
 - static/img/figures/efmp-406/unit-03/fig-U3-1.dark.svg
 - static/img/figures/efmp-406/unit-03/fig-U3-1.svg
 - static/img/figures/efmp-406/unit-03/fig-U3-2.dark.svg
 - static/img/figures/efmp-406/unit-03/fig-U3-2.svg
 - static/img/figures/efmp-406/unit-03/fig-U3-3.dark.svg
 - static/img/figures/efmp-406/unit-03/fig-U3-3.svg
 - static/img/figures/efmp-406/unit-03/fig-U3-4.dark.svg
 - static/img/figures/efmp-406/unit-03/fig-U3-4.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job batch-20261102-0900-conflict1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/batch-20261102-0900`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
PR #406 conflicts with main. Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
The files this batch PR (#406) changes, which belong to the crew jobs efmp-406-u03-author, efmp-406-u01-review_en. Change only what the merge or CI needs.

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
- (batch-20261102-0900-cifix1, fix, opencode) Unit 3's G2 input manifest was refreshed in place (6 figure hashes); any further edit under `static/img/figures/efmp-406/unit-03/` re-opens it, so recompute with `inputManifest(root, 'EFMP-406', 3, 'G3')`.
- (batch-20261102-0900-cifix1, fix, opencode) `fig-U3-4` table body type is now 11px and headers 13px (the repo's stated minimum label size); a reviewer wanting larger type should widen the columns, which needs about 808px at 13px/14px.
- (batch-20261102-0900-cifix1, fix, opencode) `fig-U3-1` right boxes are x=520 w=270 (text x=535); `fig-U3-3` left cards are 360 wide with arrows at x1=400 and x2=410.
- (batch-20261102-0200-cifix1, fix, opencode) The Potohar plateau label in fig-U4-6 is now 14px (vs the standard 16px `.label`)  -  a targeted override. If future edits touch this legend, keep the panel width constraint in mind; Urdu text runs wider than English.
- (batch-20261028-1715-cifix2, fix, codex) Platform owner must investigate dashboard load times above 2000ms and the flaky teacher-dashboard timeout.

## Feedback from the previous attempt
npm run check:content has 2 finding(s) that main does not have:
✗ Pipeline gate failed with 1 finding(s):
- EFMP-406 Unit 3 (docs/semester-3/efmp-406/unit-03): G2 en-draft: stale or incomplete input manifest


## Response snapshot

Refreshed EFMP-406 Unit 3 G2 gate evidence against post-merge inputs, repointed the tracker row, and committed it with a PHR; `npm run check:content` now passes 13/13.

## Outcome

- Impact: fix for CREW Unit 0 by opencode (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 59 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Refreshed EFMP-406 Unit 3 G2 gate evidence against post-merge inputs, repointed the tracker row, and committed it with a PHR; `npm run check:content` now passes 13/13.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The new Unit 3 G2 evidence binds main's `scripts/lib/review-evidence.mjs` and `catalog/courses.json`; any further edit to those globals or Unit 3's bound files re-opens G2, so use `node scripts/prepare-gate-evidence.mjs --refresh-stale` rather than a hand edit.
  - `static/content-status.json` is gitignored and was regenerated locally; CI's prestart hook rebuilds it.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
