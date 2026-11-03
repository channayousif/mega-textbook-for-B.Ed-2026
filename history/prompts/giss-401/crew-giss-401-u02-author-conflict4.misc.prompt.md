---
id: crew-giss-401-u02-author-conflict4
title: crew fix GISS-401 unit 2
stage: misc
date: 2026-11-03
surface: agent
model: opencode
feature: giss-401
branch: crew/giss-401-u02-author
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/giss-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/giss-401/sources/texts/quran-translation.md
 - specs/content/giss-401/tasks.md
 - history/prompts/giss-401/crew-giss-401-u02-author-conflict4.misc.prompt.md
tests:
 - npm run check:content
---

## Prompt

# Crew job giss-401-u02-author-conflict4

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/giss-401-u02-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/giss-401-u02-author conflicts with main (specs/content/giss-401/sources/texts/quran-translation.md, specs/content/giss-401/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GISS-401 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/giss-401/`, and `static/img/figures/giss-401/unit-02/`.

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
- (giss-401-u02-author-conflict3, fix, opencode) Six Unit 2 SVGs have never been through measure-figure-text.mjs (Chromium barred locally); CI figure-geometry is their first real check, and the Urdu mirror still needs `.ur.svg` versions (generator in gitignored `.crew/figgen/gen.py`).
- (giss-401-u02-author-conflict3, fix, opencode) G3 needs a fresh independent review including a qualified Islamic Studies scholar; older Unit 2 G2 evidence files are unreferenced and the tracker points at `20261103T012756049Z-gates.json`.
- (giss-401-u02-author-conflict2, fix, opencode) Six Unit 2 SVGs have never been through measure-figure-text.mjs (Chromium barred locally); CI figure-geometry is their first real check, and the Urdu mirror still needs `.ur.svg` versions (generator lives in gitignored `.crew/figgen/gen.py`).
- (giss-401-u02-author-conflict2, fix, opencode) G3 requires a fresh independent review that includes a qualified Islamic Studies scholar; the older Unit 2 G2 evidence files are unreferenced and the tracker points at `20261103T012756049Z-gates.json`.
- (giss-401-u02-author-conflict1, fix, opencode) Six Unit 2 SVGs have never been through measure-figure-text.mjs (Chromium barred locally); CI figure-geometry is their first real check, and the Urdu mirror still needs .ur.svg versions (generator lives in gitignored .crew/figgen/gen.py).


## Response snapshot

Merged origin/main into crew/giss-401-u02-author and resolved both add/add conflicts by keeping both sides' entries: main's Unit 6 bound passages before this branch's Unit 2 passages in quran-translation.md, and both sides' Unit 2 and Unit 6 tracker rows plus the Unit 6 authoring notes in tasks.md. origin/main advanced during the job (Unit 1 Urdu translation), so a second merge brought the branch level with main. Confirmed the shared registries were already identical between HEAD and origin/main, regenerated the gitignored static/content-status.json, and left all 13 content gates passing.

## Outcome

- Impact: fix for GISS-401 Unit 2 by opencode (attempt 4).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 3 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/giss-401-u02-author (twice, as main advanced during the job), resolved both add/add conflicts keeping both sides' entries, regenerated the gitignored content-status report, and left all 13 content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Six Unit 2 SVGs have never been through measure-figure-text.mjs (Chromium barred locally); CI figure-geometry is their first real check, and the Urdu mirror still needs .ur.svg versions (generator lives in gitignored .crew/figgen/gen.py).
  - G3 needs a fresh independent review including a qualified Islamic Studies scholar; older Unit 2 G2 evidence files are unreferenced and the tracker points at `20261103T012756049Z-gates.json`.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
