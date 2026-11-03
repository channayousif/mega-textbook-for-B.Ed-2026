---
id: crew-efmp-301-u08-repair_en-conflict3
title: crew fix EFMP-301 unit 8
stage: misc
date: 2026-11-03
surface: agent
model: opencode
feature: efmp-301
branch: crew/efmp-301-u08-repair_en
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/efmp-301/tasks.md
 - history/prompts/efmp-301/crew-efmp-301-u08-repair_en-conflict3.misc.prompt.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-301-u08-repair_en-conflict3

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-301-u08-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/efmp-301-u08-repair_en conflicts with main (specs/content/efmp-301/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-301 Unit 8 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-301/`, and `static/img/figures/efmp-301/unit-08/`.

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
- (efmp-301-u08-repair_en-conflict2, fix, opencode) `check:content-status` fails on both branches because the gitignored `static/content-status.json` is stale/missing; regenerating it needs `npm run build:content-status` (separate fix job).
- (efmp-301-u08-repair_en-conflict2, fix, opencode) Urdu Unit 8 still carries the "کاؤنٹرائزنگ" mistranslation for "management" and the narrow-screen/A4 render check is uninspected; both need a G5/translation or owner job.
- (efmp-301-u08-repair_en-conflict2, fix, opencode) `specs/content/efmp-301/tasks.md` now holds main's Unit 3 and Unit 12 rows followed by this branch's Unit 8 rows; no ID collisions required renumbering.
- (efmp-301-u08-repair_en, repair_en, claude) The Urdu Unit 8 files contain a mistranslated term "کاؤنٹرائزنگ" in place of "management" (for example in MCQ 2-3, RRQ 3, ERQ 5 and the topic-02 summary). It was out of scope for this English repair; a G5 or translation job should fix it.
- (efmp-301-u08-repair_en, repair_en, claude) The narrow-screen/A4 render check and fuller Seifert source passages are still owed by the owner, and the report marked this the final G3 cycle, so a fresh G3 run needs owner authorisation.

## Response snapshot

Merged origin/main into `crew/efmp-301-u08-repair_en`, resolved the sole conflict in `specs/content/efmp-301/tasks.md` by keeping both sides' rows (main's Unit 9/5/4 rows first, then this branch's Unit 8 G3/G2 rows), committed the merge, and left `npm run check:content` with only the pre-existing `check:content-status` failure.

## Outcome

- Impact: fix for EFMP-301 Unit 8 by opencode (attempt 1).
- Tests: `npm run check:content` ran 13 gates; 12 PASS, 1 FAIL (`check:content-status`), which origin/main also reports because the gitignored `static/content-status.json` is stale/missing.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: merged origin/main into `crew/efmp-301-u08-repair_en` and resolved the sole conflict in `specs/content/efmp-301/tasks.md` by keeping both sides' rows (main's Unit 9/5/4 rows first, then this branch's Unit 8 G3/G2 rows); committed the merge.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this merge does not certify anything. All of main's tracker rows are preserved; the branch's two Unit 8 rows are appended after main's.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - `check:content-status` fails on both branches because the gitignored `static/content-status.json` is stale/missing; regenerating it needs `npm run build:content-status` (separate fix job).
  - Urdu Unit 8 still carries the "کاؤنٹرائزنگ" mistranslation for "management" and the narrow-screen/A4 render check is uninspected; both need a G5/translation or owner job.
  - The merge auto-resolved main's newer Unit 5/Unit 9 G2 evidence rows over the branch's older ones (same unit/stage, updated gates); this is expected, not a lost entry.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content 12 PASS / 1 pre-existing FAIL (content-status)
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
