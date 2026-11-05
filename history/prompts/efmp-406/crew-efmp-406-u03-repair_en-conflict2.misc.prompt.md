---
id: crew-efmp-406-u03-repair_en-conflict2
title: crew fix EFMP-406 unit 3
stage: misc
date: 2026-11-05
surface: agent
model: opencode
feature: efmp-406
branch: crew/efmp-406-u03-repair_en
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/efmp-406/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-406/crew-efmp-406-u03-repair_en-conflict2.misc.prompt.md
 - specs/content/efmp-406/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-406-u03-repair_en-conflict2

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-406-u03-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/efmp-406-u03-repair_en conflicts with main (specs/content/efmp-406/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-406 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-406/`, and `static/img/figures/efmp-406/unit-03/`.

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
- (efmp-406-u03-repair_en-conflict1, fix, opencode) origin/main `b7f563c7c` is already an ancestor of this branch (ahead 5, behind 0), so there was no conflict to resolve and no merge commit exists.
- (efmp-406-u03-repair_en-conflict1, fix, opencode) Batch PR #439 (`crew/batch-20261103-1902`) is still open and will advance main with the Unit 2 tracker row update and advisory row; expect a fresh append-only conflict in `specs/content/efmp-406/tasks.md` when merging main after it lands.
- (efmp-406-u03-repair_en-conflict1, fix, opencode) All 14 content gates pass on the committed branch; G3/G5 remain open and unsigned.
- (efmp-406-u03-repair_en, repair_en, claude) The Papen and Ashraf source files previously held invented quotes; both are now real quotes, and Ashraf must not be cited for reading outcomes, dropout or MTB-MLE effects.
- (efmp-406-u03-repair_en, repair_en, claude) No source is attached for the literacy event/practice or dominant/vernacular terms (Topic 3.1 presents them as working terms); a later job could add Barton and Hamilton.

## Response snapshot

Merged origin/main (99473fec3) into the branch, resolved the single append-only conflict in `specs/content/efmp-406/tasks.md` by keeping main's Unit 2 G3 advisory row before this branch's Unit 3 G2 and G3 rows, regenerated the gitignored `static/content-status.json`, and confirmed all 14 content gates pass.

## Outcome

- Impact: fix for EFMP-406 Unit 3 by opencode (attempt 2).
- Tests: npm run check:content passed after the merge (14/14 gates).
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merge commit a16013f04 brings origin/main into the branch; the tasks.md conflict was resolved append-only (main's Unit 2 G3 row, then this branch's Unit 3 G2/G3 rows).
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this merge does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The merge is committed locally on `crew/efmp-406-u03-repair_en`; do not push or open a PR from this job.
  - `static/content-status.json` is gitignored and must be regenerated (`npm run build:content-status`) after any tracker edit or the content-status gate fails.
  - G3/G5 remain open and unsigned; the Unit 3 G3 advisory row still records missing author run identity and browser/print evidence.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
