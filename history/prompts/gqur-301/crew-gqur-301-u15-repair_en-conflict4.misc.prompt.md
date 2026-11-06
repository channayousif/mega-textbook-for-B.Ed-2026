---
id: crew-gqur-301-u15-repair_en-conflict4
title: crew fix GQUR-301 unit 15
stage: misc
date: 2026-11-06
surface: agent
model: opencode
feature: gqur-301
branch: crew/gqur-301-u15-repair_en
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/gqur-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u15-repair_en-conflict4

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u15-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/gqur-301-u15-repair_en conflicts with main (specs/content/gqur-301/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GQUR-301 Unit 15 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-15/`.

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
- (gqur-301-u15-repair_en-conflict3, fix, codex) G3/G5 remain open; existing review-host follow-ups still apply.
- (gqur-301-u15-repair_en-conflict3, fix, codex) G3/G5 remain open; existing review-host follow-ups still apply.
- (gqur-301-u15-repair_en-conflict2, fix, opencode) Unit 15 G3 stays open/unticked; F12 rendered accessibility, F13 source bundle and F14 G1 authority remain for the review host, and the Urdu mirror needs a G5 read of the new statistical terminology.
- (gqur-301-u15-repair_en-conflict2, fix, opencode) The merge pulled in main's repairs for efmp-304 unit 2 and gqur-301 units 12/13; those are main's work, not this branch's.
- (gqur-301-u15-repair_en-conflict2, fix, opencode) `static/content-status.json` is gitignored and was regenerated locally after the merge.

## Response snapshot

Merged origin/main into the branch, resolved the single tasks.md conflict by keeping both main's Unit 14 G3 row and this branch's Unit 15 G3 row, regenerated the gitignored content-status report, and passed all content gates.

## Outcome

- Impact: fix for GQUR-301 Unit 15 by opencode (attempt 4).
- Tests: npm run check:content passed (14 of 14 gates).
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main and resolved the tasks.md conflict; both main's Unit 14 G3 row and this branch's Unit 15 G3 row are preserved. All content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this branch does not certify anything.
- Pending / next owner: crew lead (merge when CI is green).
- Notes for the next job on this unit:
  - G3/G5 remain open; existing review-host follow-ups still apply.
  - Unit 15 G3 stays open/unticked; F12 rendered accessibility, F13 source bundle and F14 G1 authority remain for the review host.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
