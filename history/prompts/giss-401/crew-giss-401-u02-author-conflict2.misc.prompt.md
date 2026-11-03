---
id: crew-giss-401-u02-author-conflict2
title: crew fix GISS-401 unit 2 (merge conflicts)
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
  - specs/content/giss-401/sources/texts/sahih-bukhari-muslim.md
  - specs/content/giss-401/tasks.md
  - specs/content/giss-401/authoring/unit-02.md
  - specs/content/giss-401/authoring/unit-02/checks/baseline-content.txt
  - specs/content/giss-401/authoring/unit-02/checks/draft-content.txt
  - specs/content/giss-401/authoring/unit-02/checks/mdx-syntax.txt
  - specs/content/giss-401/reviews/unit-02/G2/20261103T012756049Z-gates.json
  - specs/content/giss-401/reviews/unit-02/G2/logs-20261103T012756049Z/check-bloom-bands.txt
  - specs/content/giss-401/reviews/unit-02/G2/logs-20261103T012756049Z/check-concept-graph.txt
  - specs/content/giss-401/reviews/unit-02/G2/logs-20261103T012756049Z/check-depth-gate.txt
  - specs/content/giss-401/reviews/unit-02/G2/logs-20261103T012756049Z/check-docs-sync.txt
  - specs/content/giss-401/reviews/unit-02/G2/logs-20261103T012756049Z/check-figures.txt
  - specs/content/giss-401/reviews/unit-02/G2/logs-20261103T012756049Z/check-no-answer-keys.txt
  - specs/content/giss-401/reviews/unit-02/G2/logs-20261103T012756049Z/check-no-em-dash.txt
  - specs/content/giss-401/reviews/unit-02/G2/logs-20261103T012756049Z/validate-content.txt
  - history/prompts/giss-401/crew-giss-401-u02-author-conflict2.misc.prompt.md
tests:
  - npm run check:content
---

## Prompt

# Crew job giss-401-u02-author-conflict2

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/giss-401-u02-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/giss-401-u02-author conflicts with main (specs/content/giss-401/sources/texts/quran-translation.md, specs/content/giss-401/sources/texts/sahih-bukhari-muslim.md, specs/content/giss-401/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

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
- (giss-401-u02-author-conflict1, fix, opencode) Six Unit 2 SVGs have never been through measure-figure-text.mjs (Chromium barred locally); CI figure-geometry is their first real check, and the Urdu mirror still needs .ur.svg versions (generator lives in gitignored .crew/figgen/gen.py).
- (giss-401-u02-author-conflict1, fix, opencode) G3 requires a fresh independent review that includes a qualified Islamic Studies scholar; tasks.md will conflict with sibling units' tracker rows when merged.
- (giss-401-u02-author, author, claude) The six SVGs were never measured by `measure-figure-text.mjs` (Chromium is barred), so CI's figure-geometry job is their first real check. The Urdu mirror needs `.ur.svg` versions; the generator is at `.crew/figgen/gen.py`, which git ignores.
- (giss-401-u02-author, author, claude) `docs/semester-3/giss-401/course-overview.mdx` and `_category_.json` match `crew/giss-401-u01-author` exactly but differ from Unit 3's branch, so expect a merge conflict there; the overview still says "Unit 1 is available now".
- (giss-401-u02-author, author, claude) G3 needs a fresh independent review that includes a qualified Islamic Studies scholar, and `specs/content/giss-401/tasks.md` will conflict with sibling units' tracker rows.

## Response snapshot

Merged origin/main into crew/giss-401-u02-author, resolved the add/add conflicts by keeping main's Unit 1 and Unit 4 content first and appending this branch's Unit 2 content, moved the Unit 2 authoring check logs to a unit-scoped path, refreshed Unit 2's G2 gate evidence, and left all 13 content gates passing.

## Outcome

- Impact: fix for GISS-401 Unit 2 by opencode (attempt 2); the branch now merges main and passes every content gate.
- Tests: npm run check:content passed 13/13 after the merge and evidence refresh.
- Files: conflict-resolved source texts and tracker, renamed authoring check logs, refreshed G2 evidence and logs, this PHR.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: the previous conflict1 PHR claimed a clean merge that was never performed; this run did the actual merge.

## Handoff (for CEO and agents)

- Shipped / changed: origin/main merged; quran-translation.md and sahih-bukhari-muslim.md now carry main's Unit 1 and Unit 4 content followed by this branch's Unit 2 passages; tasks.md keeps main's course tracker and appends Unit 2 stage rows; authoring/unit-02-checks moved to authoring/unit-02/checks so its path names Unit 2 and no longer binds to every unit's review evidence; Unit 2 G2 evidence refreshed to 20261103T012756049Z-gates.json.
- Decisions the team must respect: main's entries were preserved verbatim; no G3/G5 claim, no human initials, no catalog or spec edits.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the branch touches a protected path).
- Notes for the next job on this unit:
  - Six Unit 2 SVGs have never been through measure-figure-text.mjs (Chromium barred locally); CI figure-geometry is their first real check, and the Urdu mirror still needs .ur.svg versions (generator lives in gitignored .crew/figgen/gen.py).
  - G3 requires a fresh independent review that includes a qualified Islamic Studies scholar.
  - The older Unit 2 G2 evidence (20261102T232136964Z-gates.json and 20261103T011905925Z-gates.json) is now unreferenced; the tracker points at 20261103T012756049Z-gates.json.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: the prior conflict1 run recorded a clean merge it never performed; the real merge had three add/add conflicts.
- Graders run and results (PASS/FAIL): check:content PASS (13/13).
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
