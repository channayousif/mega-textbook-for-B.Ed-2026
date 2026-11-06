---
id: 2455
title: crew fix GQUR-301 unit 14
stage: misc
date: 2026-11-05
surface: agent
model: opencode
feature: gqur-301
branch: crew/gqur-301-u14-repair_en
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
 - history/prompts/gqur-301/2455-crew-gqur-301-u14-repair_en-conflict2.misc.prompt.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u14-repair_en-conflict2

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u14-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/gqur-301-u14-repair_en conflicts with main (specs/content/gqur-301/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GQUR-301 Unit 14 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-14/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exists on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Notes from earlier jobs on this unit
- (gqur-301-u14-repair_en-conflict1, fix, opencode) Unit 14 G3 stays open/unticked; uncertain findings (render accessibility, G1 under D-2026-0070, external source binding) remain for an authorized evaluation session.
- (gqur-301-u14-repair_en-conflict1, fix, opencode) The merge pulled in main's geng-301 u03, gsos-301 u02 and gqur-301 u08 repairs; those are main's work, not this branch's.
- (gqur-301-u14-repair_en, repair_en, agy) G2 gate evidence was refreshed with input hashes matching the repaired content; G3 remains unticked pending fresh independent review.
- (gqur-301-u14-repair_en, repair_en, agy) Classroom data values in Topic 01 now strictly produce sum 513, mean 34.2, and sample SD 3.80, perfectly matching all existing figures and references.
- (gqur-301-u14-repair_en, repair_en, agy) Uncertain findings from review (render accessibility inspection, G1 status under D-2026-0070, and external source binding) remain open for an authorized evaluation session.

## Response snapshot

Merged origin/main into crew/gqur-301-u14-repair_en. The sole conflict was specs/content/gqur-301/tasks.md; resolved by keeping both sides' rows in main's order (Unit 13, Unit 12) then this branch's Unit 14 row, with no exact duplicates. The four shared registries were unchanged on both sides relative to the merge base, so the append-only rule needed no edits. Regenerated the gitignored static/content-status.json and confirmed all 14 content gates pass.

## Outcome

- Impact: fix for GQUR-301 Unit 14 by opencode (attempt 2).
- Tests: npm run check:content passed (14/14 gates) after regenerating static/content-status.json.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/gqur-301-u14-repair_en and resolved the tasks.md conflict keeping both sides' rows in main's order then this branch's; regenerated the gitignored static/content-status.json so check:content passes.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this branch does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - `static/content-status.json` is a gitignored build artifact; regenerate it (`npm run build:content-status`) after any content-affecting merge or the `check:content-status` gate fails.
  - The merge pulled in main's repairs for other courses/units (gqur-301 unit 12 and unit 13, efmp-304 unit 2); those are main's work, not this branch's.
  - Unit 14 G3 stays open/unticked; uncertain findings (render accessibility, G1 status under D-2026-0070, external source binding) remain for an authorized evaluation session.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
