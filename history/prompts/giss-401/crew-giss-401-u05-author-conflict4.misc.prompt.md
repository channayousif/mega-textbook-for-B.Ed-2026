---
id: crew-giss-401-u05-author-conflict4
title: crew fix GISS-401 unit 5
stage: misc
date: 2026-11-03
surface: agent
model: opencode
feature: giss-401
branch: crew/giss-401-u05-author
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/giss-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/giss-401/crew-giss-401-u05-author-conflict4.misc.prompt.md
 - specs/content/giss-401/reviews/unit-03/G2/20261103T031913180Z-gates.json
 - specs/content/giss-401/reviews/unit-03/G2/logs-20261103T031913180Z/check-bloom-bands.txt
 - specs/content/giss-401/reviews/unit-03/G2/logs-20261103T031913180Z/check-concept-graph.txt
 - specs/content/giss-401/reviews/unit-03/G2/logs-20261103T031913180Z/check-depth-gate.txt
 - specs/content/giss-401/reviews/unit-03/G2/logs-20261103T031913180Z/check-docs-sync.txt
 - specs/content/giss-401/reviews/unit-03/G2/logs-20261103T031913180Z/check-figures.txt
 - specs/content/giss-401/reviews/unit-03/G2/logs-20261103T031913180Z/check-no-answer-keys.txt
 - specs/content/giss-401/reviews/unit-03/G2/logs-20261103T031913180Z/check-no-em-dash.txt
 - specs/content/giss-401/reviews/unit-03/G2/logs-20261103T031913180Z/validate-content.txt
 - specs/content/giss-401/reviews/unit-06/G2/20261103T031913754Z-gates.json
 - specs/content/giss-401/reviews/unit-06/G2/logs-20261103T031913754Z/check-bloom-bands.txt
 - specs/content/giss-401/reviews/unit-06/G2/logs-20261103T031913754Z/check-concept-graph.txt
 - specs/content/giss-401/reviews/unit-06/G2/logs-20261103T031913754Z/check-depth-gate.txt
 - specs/content/giss-401/reviews/unit-06/G2/logs-20261103T031913754Z/check-docs-sync.txt
 - specs/content/giss-401/reviews/unit-06/G2/logs-20261103T031913754Z/check-figures.txt
 - specs/content/giss-401/reviews/unit-06/G2/logs-20261103T031913754Z/check-no-answer-keys.txt
 - specs/content/giss-401/reviews/unit-06/G2/logs-20261103T031913754Z/check-no-em-dash.txt
 - specs/content/giss-401/reviews/unit-06/G2/logs-20261103T031913754Z/validate-content.txt
 - specs/content/giss-401/sources/texts/quran-translation.md
 - specs/content/giss-401/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job giss-401-u05-author-conflict4

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/giss-401-u05-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/giss-401-u05-author conflicts with main (specs/content/giss-401/sources/texts/quran-translation.md, specs/content/giss-401/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GISS-401 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/giss-401/`, and `static/img/figures/giss-401/unit-05/`.

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
- (giss-401-u05-author-conflict3, fix, opencode) Merged `quran-translation.md` keeps main's Unit 4 notes before this branch's U5 sections and its intro now reads "Units 1, 4 and 5"; `abdel-salam-2015-democracy.md` keeps main's citation and passage locators and appends this branch's U5 excerpts.
- (giss-401-u05-author-conflict3, fix, opencode) Unit 5 G3 English review and G4/G5 Urdu translation remain open downstream jobs; no G3/G5 row is marked done.
- (giss-401-u05-author-conflict1, fix, opencode) Unit 5 G3 English review and G4/G5 Urdu translation are still open downstream jobs; no G3/G5 row was marked done.
- (giss-401-u05-author-conflict1, fix, opencode) The merge changed shared bound inputs (`course-overview.mdx`, `pak-constitution-1973.md`), so both units' G2 evidence was re-recorded; a later main change to those files needs the same `prepare-gate-evidence.mjs --refresh-stale` step.
- (giss-401-u05-author-conflict1, fix, opencode) `static/content-status.json` is gitignored and was regenerated locally; CI's prestart hooks regenerate it too.

## Response snapshot

Merged origin/main into crew/giss-401-u05-author and resolved the two conflicts. `quran-translation.md` keeps main's Unit 1/3/4 material and its Unit 6 notes, with this branch's U5-01 to U5-06 sections before them and an intro covering Units 1, 3, 4, 5 and 6. `tasks.md` keeps main's Unit 3 and Unit 6 rows and G3 advisory rows, takes this branch's newer Unit 1/4 G2 evidence rows and its Unit 5 rows. The merge changed shared bound inputs, so the stale G2 evidence for Units 3 and 6 was refreshed with `prepare-gate-evidence.mjs --refresh-stale`, `static/content-status.json` was regenerated, and all 13 content gates pass.

## Outcome

- Impact: fix for GISS-401 Unit 5 by opencode (conflict4).
- Tests: npm run check:content passed in the job worktree after the refresh.
- Files: 21 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/giss-401-u05-author, resolved the `quran-translation.md` and `tasks.md` conflicts preserving both sides, refreshed the stale G2 evidence for Units 3 and 6, regenerated `static/content-status.json`, and left all content gates passing with the work committed.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this branch does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the branch touches a protected path).
- Notes for the next job on this unit:
  - `quran-translation.md` now carries U1, U3, U4, U5 and U6 material; the intro names all five units and the section pointers.
  - `tasks.md` Unit 1/4 G2 rows point at this branch's refreshed evidence (20261103T021608724Z, 20261103T021608931Z); Unit 3/6 G2 rows were repointed to 20261103T031913180Z and 20261103T031913754Z after the merge.
  - Unit 5 G3 English review and G4/G5 Urdu translation remain open downstream jobs; no G3/G5 row is marked done.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
