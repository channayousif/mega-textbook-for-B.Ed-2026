---
id: crew-geng-300-u01-review_en-r1-conflict1
title: crew fix GENG-300 unit 1
stage: misc
date: 2026-10-28
surface: agent
model: agy
feature: geng-300
branch: crew/geng-300-u01-review_en-r1
user: crew
command: crew fix
labels: ["crew", "agy", "fix"]
links:
  spec: specs/content/geng-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/geng-300/0898-geng-300-u01-review_en-r1.misc.prompt.md
 - history/prompts/geng-300/crew-geng-300-u01-review_en-r1-conflict1.misc.prompt.md
 - history/prompts/geng-300/crew-geng-300-u01-review_en-r1.misc.prompt.md
 - specs/content/geng-300/reviews/unit-01/G3/agent-g3-geng-300-u1-run41b4c5ae.json
 - specs/content/geng-300/reviews/unit-01/G3/agent-g3-geng-300-u1-run41b4c5ae.summary.md
 - specs/content/geng-300/reviews/unit-01/G3/crew-41b4c5ae/manifest.json
 - specs/content/geng-300/reviews/unit-01/logs-41b4c5ae/check-depth-gate.txt
 - specs/content/geng-300/reviews/unit-01/logs-41b4c5ae/check-docs-sync.txt
 - specs/content/geng-300/reviews/unit-01/logs-41b4c5ae/check-figures.txt
 - specs/content/geng-300/reviews/unit-01/logs-41b4c5ae/check-no-answer-keys.txt
 - specs/content/geng-300/reviews/unit-01/logs-41b4c5ae/check-no-em-dash.txt
 - specs/content/geng-300/reviews/unit-01/logs-41b4c5ae/measure-figure-text.txt
 - specs/content/geng-300/reviews/unit-01/logs-41b4c5ae/render-review.txt
 - specs/content/geng-300/reviews/unit-01/logs-41b4c5ae/validate-content.txt
 - specs/content/geng-300/reviews/unit-01/renders-41b4c5ae/fig-U1-1.png
 - specs/content/geng-300/reviews/unit-01/renders-41b4c5ae/fig-U1-2.png
 - specs/content/geng-300/reviews/unit-01/renders-41b4c5ae/fig-U1-3.png
 - specs/content/geng-300/reviews/unit-01/renders-41b4c5ae/fig-U1-4.png
 - specs/content/geng-300/reviews/unit-01/renders-41b4c5ae/fig-U1-5.png
 - specs/content/geng-300/reviews/unit-01/renders-41b4c5ae/fig-U1-6.png
 - specs/content/geng-300/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job geng-300-u01-review_en-r1-conflict1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-300-u01-review_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/geng-300-u01-review_en-r1 conflicts with main (specs/content/geng-300/tasks.md, static/content-status.json). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GENG-300 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/geng-300/`, and `static/img/figures/geng-300/unit-01/`.

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
- (geng-300-u01-review_en-r1, review_en, agy) GENG-300 Unit 1 G3 review cycle 2 completed with disposition pass; all three prior blocking defects were confirmed resolved in commit 8a0b7828.
- (geng-300-u01-review_en-r1, review_en, agy) Advisory finding F1 notes minor 1.5px to 2.0px panel boundary clearance for 3 consonant labels in fig-U1-3, which remains inside the SVG canvas and does not affect readability.
- (geng-300-u01-review_en-r1, review_en, agy) Course is English-only (bilingual: false), so G4 Urdu translation and G5 Urdu review stages are waived; next pipeline step is G6 asset review.
- (geng-300-u01-fix, fix, opencode) G3 en-review stays open and stale; a fresh independent review is needed after the figure-geometry changes. No `.ur.svg` files exist for this English-only course.
- (geng-300-u01-repair_en-conflict1, fix, opencode) G3 review for GENG-300 Unit 1 remains open and unsigned  -  fresh independent review is pending (not part of this merge job).


## Response snapshot

Resolved merge conflict with origin/main in specs/content/geng-300/tasks.md by removing stale duplicate tracker rows from earlier repair work while preserving the cycle 2 G3 advisory review row.

## Outcome

- Impact: fix for GENG-300 Unit 1 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 21 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Resolved merge conflict with origin/main in specs/content/geng-300/tasks.md by removing stale duplicate tracker rows from earlier repair work while preserving the cycle 2 G3 advisory review row.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 review for GENG-300 Unit 1 remains open and unsigned (cycle 2 advisory pass recorded under ADR-0019).
  - GENG-300 is English-only (bilingual: false) so G4 translation and G5 Urdu review are waived; next pipeline step is G6 asset review.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
