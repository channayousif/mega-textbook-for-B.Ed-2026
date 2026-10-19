---
id: crew-geng-301-u02-review_en-conflict1
title: crew fix GENG-301 unit 2
stage: misc
date: 2026-10-19
surface: agent
model: opencode
feature: geng-301
branch: crew/geng-301-u02-review_en
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/geng-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/0531-geng-301-u02-independent-g3-review.general.prompt.md
 - history/prompts/general/0534-merge-origin-main-content-status-fix.general.prompt.md
 - history/prompts/geng-301/crew-geng-301-u02-review_en.misc.prompt.md
 - specs/content/geng-301/reviews/unit-02/G3/04ddc645-f479-4d6d-a614-8f7e23db9fc0.json
 - specs/content/geng-301/reviews/unit-02/G3/04ddc645-f479-4d6d-a614-8f7e23db9fc0.md
 - specs/content/geng-301/reviews/unit-02/G3/logs-04ddc645/check-content.log
 - specs/content/geng-301/reviews/unit-02/G3/logs-04ddc645/check-depth-gate.log
 - specs/content/geng-301/reviews/unit-02/G3/logs-04ddc645/check-docs-sync.log
 - specs/content/geng-301/reviews/unit-02/G3/logs-04ddc645/check-figures.log
 - specs/content/geng-301/reviews/unit-02/G3/logs-04ddc645/check-no-answer-keys.log
 - specs/content/geng-301/reviews/unit-02/G3/logs-04ddc645/check-no-em-dash.log
 - specs/content/geng-301/reviews/unit-02/G3/logs-04ddc645/measure-figure-text.log
 - specs/content/geng-301/reviews/unit-02/G3/logs-04ddc645/render-review.log
 - specs/content/geng-301/reviews/unit-02/G3/logs-04ddc645/validate-content.log
 - specs/content/geng-301/reviews/unit-02/G3/manifest.json
 - specs/content/geng-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job geng-301-u02-review_en-conflict1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-301-u02-review_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Merged onto main's latest state, crew/geng-301-u02-review_en fails npm run check:content (it could not join the hourly batch):
✗ static/content-status.json is missing. Run: npm run build:content-status Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GENG-301 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/geng-301/`, and `static/img/figures/geng-301/unit-02/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit
   needs (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Notes from earlier jobs on this unit
- (geng-301-u02-review_en, review_en, agy) GENG-301 Unit 2 G3 review recorded 5 blocking revise defects: wordmark text overflow in all 16 SVGs under static/img/figures/geng-301/unit-02/, subtopic U2-05 omitted from summative assessments, RRQ 5 mark scheme arithmetic contradiction, and incomplete unverifiable source declarations.
- (geng-301-u02-review_en, review_en, agy) Advisory tracker entry is recorded in specs/content/geng-301/tasks.md leaving G3 unticked and unsigned.


## Response snapshot

Merged origin/main's content-status.json regeneration fix into the review branch, resolving the missing `static/content-status.json` failure so all 13 `npm run check:content` gates now pass.

## Outcome

- Impact: fix for GENG-301 Unit 2 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 16 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main's content-status.json regeneration fix into the review branch, resolving the missing `static/content-status.json` failure so all 13 `npm run check:content` gates now pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - GENG-301 Unit 2's 5 blocking G3 revise defects (SVG wordmark overflow, U2-05 summative omission, RRQ 5 mark scheme contradiction, incomplete source declarations) remain from the earlier `agy` review  -  this branch's content was not touched, only the merge and gate fix.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
