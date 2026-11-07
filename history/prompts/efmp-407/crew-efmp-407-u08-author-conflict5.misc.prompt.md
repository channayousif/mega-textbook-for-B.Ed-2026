---
id: crew-efmp-407-u08-author-conflict5
title: crew fix EFMP-407 unit 8
stage: misc
date: 2026-11-07
surface: agent
model: opencode
feature: efmp-407
branch: crew/efmp-407-u08-author
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/efmp-407/tasks.md
 - history/prompts/efmp-407/crew-efmp-407-u08-author-conflict5.misc.prompt.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-407-u08-author-conflict5

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u08-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/efmp-407-u08-author conflicts with main (specs/content/efmp-407/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-407 Unit 8 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-407/`, and `static/img/figures/efmp-407/unit-08/`.

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
- (efmp-407-u08-author-conflict4, fix, opencode) Unit 8 banner fig-U8-5 is still prompt-only and its ten Urdu concept labels await G5.
- (efmp-407-u08-author-conflict4, fix, opencode) `specs/content/efmp-407/sources/texts/jumani-abbasi-2015.md` is shared with Unit 7, so future edits re-stale both G2 manifests and need `prepare-gate-evidence.mjs` for each.
- (efmp-407-u08-author-conflict4, fix, opencode) main's Unit 2 backward-design table still carries five erroneous Unit 1 tracker rows (pre-existing on main, left untouched per the merge rule).
- (efmp-407-u08-author-conflict3, fix, opencode) Unit 8 banner fig-U8-5 is still prompt-only and its ten Urdu concept labels await G5.
- (efmp-407-u08-author-conflict3, fix, opencode) `specs/content/efmp-407/sources/texts/jumani-abbasi-2015.md` is shared with Unit 7, so future edits re-stale both G2 manifests and need `prepare-gate-evidence.mjs` for each.

## Response snapshot

Merged origin/main into crew/efmp-407-u08-author. The only conflict was specs/content/efmp-407/tasks.md, where main added Unit 5 rows and this branch added Unit 8 rows; both sets were kept, main's Unit 5 rows first, with no duplicates. The shared registries were untouched by both sides since the last merge. Regenerated the gitignored static/content-status.json after the merge, committed the merge and PHR, and all 14 content gates pass.

## Outcome

- Impact: fix for EFMP-407 Unit 8 by opencode (attempt 1).
- Tests: npm run check:content passed (14/14 content gates).
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/efmp-407-u08-author, resolved the tasks.md conflict by keeping main's Unit 5 rows then this branch's Unit 8 rows, regenerated the gitignored content-status report, and committed the merge plus PHR so all 14 content gates pass.
- Decisions the team must respect: main's Unit 6 G3 row and Unit 1 G2 evidence timestamp were left exactly as main has them; no main entry was changed or removed. G3/G5 stay advisory until a qualified sign-off.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the branch touches a protected path).
- Notes for the next job on this unit:
  - Unit 8 banner fig-U8-5 is still prompt-only and its ten Urdu concept labels await G5.
  - `specs/content/efmp-407/sources/texts/jumani-abbasi-2015.md` is shared with Unit 7, so future edits re-stale both G2 manifests and need `prepare-gate-evidence.mjs` for each.
  - main's Unit 2 backward-design table still carries five erroneous Unit 1 tracker rows (pre-existing on main, left untouched per the merge rule).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
