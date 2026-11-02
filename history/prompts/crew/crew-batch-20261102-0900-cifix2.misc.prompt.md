---
id: crew-batch-20261102-0900-cifix2
title: crew conflict merge and G2 re-evidence
stage: misc
date: 2026-11-02
surface: agent
model: opencode
feature: crew
branch: crew/batch-20261102-0900
user: crew
command: crew conflict1
labels: ["crew", "opencode", "conflict"]
links:
  spec: null
  ticket: null
  adr: null
  pr: 406
files:
 - specs/content/efmp-406/tasks.md
 - specs/content/efmp-406/reviews/unit-03/G2/20261102T104941955Z-gates.json
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261102T104941955Z/check-bloom-bands.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261102T104941955Z/check-concept-graph.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261102T104941955Z/check-depth-gate.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261102T104941955Z/check-docs-sync.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261102T104941955Z/check-figures.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261102T104941955Z/check-no-answer-keys.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261102T104941955Z/check-no-em-dash.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261102T104941955Z/validate-content.txt
 - history/prompts/crew/crew-batch-20261102-0900-cifix2.misc.prompt.md
tests:
 - npm run check:content
 - node scripts/prepare-gate-evidence.mjs --refresh-stale
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

Confirmed origin/main was already merged (a4f1ad53) and was an ancestor of HEAD, so no further merge was needed. The remaining failure was EFMP-406 Unit 3 G2 evidence bound to pre-merge globals: main had changed `scripts/lib/review-evidence.mjs` (inside the hashed review-script closure) and `catalog/courses.json` (sliced catalog binding), so the sealed manifest no longer matched. Refreshed the evidence with `node scripts/prepare-gate-evidence.mjs --refresh-stale` (the repo's intended tool for binding changes), which re-ran all eight draft gates at HEAD, wrote `20261102T104941955Z-gates.json`, repointed the Unit 3 G2 tracker row, and regenerated `static/content-status.json`. `npm run check:content` then passed 13/13.

## Outcome

- Impact: fix for CREW Unit 0 by opencode (attempt 2, conflict1 follow-up).
- Tests: `npm run check:content` passed (13/13 content gates) after the refresh; `--refresh-stale` exited 0 with all eight draft gates PASS.
- Files: 11 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Refreshed EFMP-406 Unit 3 G2 gate evidence against post-merge inputs (main's `scripts/lib/review-evidence.mjs` and `catalog/courses.json`), repointed the tracker row to `20261102T104941955Z-gates.json`, and regenerated the local content-status report.
- Decisions the team must respect: G2 is deterministic `auto:gates` evidence, not a human sign-off; G3/G5 remain advisory and unsigned. No gate was marked done by an agent.
- Pending / next owner: crew lead (merge PR #406 once CI is green).
- Notes for the next job on this unit:
  - The new manifest binds main's review-script closure and sliced catalog. Any further edit to `scripts/lib/review-evidence.mjs`, `catalog/courses.json`, or any of Unit 3's bound files re-opens G2; use `node scripts/prepare-gate-evidence.mjs --refresh-stale`, not a hand edit.
  - `static/content-status.json` is gitignored and regenerated by `npm run build:content-status`; CI's prestart hook rebuilds it.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: merging main invalidated G2 evidence because main changed a file inside the hashed review-script closure (`scripts/lib/review-evidence.mjs`) and the sliced `catalog/courses.json` binding; the generic "stale or incomplete input manifest" signature does not name the two differing digests.
- Graders run and results (PASS/FAIL): check:content PASS; prepare-gate-evidence --refresh-stale PASS.
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): have the stale-manifest diagnostic print the differing paths so the next worker does not have to diff the manifest by hand.
