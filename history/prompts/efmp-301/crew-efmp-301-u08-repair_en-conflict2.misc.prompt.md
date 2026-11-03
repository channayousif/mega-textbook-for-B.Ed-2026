---
id: crew-efmp-301-u08-repair_en-conflict2
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
 - history/prompts/efmp-301/crew-efmp-301-u08-repair_en-conflict2.misc.prompt.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-301-u08-repair_en-conflict2

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
- (efmp-301-u08-repair_en, repair_en, claude) The Urdu Unit 8 files contain a mistranslated term "کاؤنٹرائزنگ" in place of "management" (for example in MCQ 2-3, RRQ 3, ERQ 5 and the topic-02 summary). It was out of scope for this English repair; a G5 or translation job should fix it.
- (efmp-301-u08-repair_en, repair_en, claude) The narrow-screen/A4 render check and fuller Seifert source passages are still owed by the owner, and the report marked this the final G3 cycle, so a fresh G3 run needs owner authorisation.
- (efmp-301-u08-review_en-conflict1, fix, agy_claude) The `check:content-status` gate fails on both this branch and origin/main because `static/content-status.json` was deleted; regenerating it requires `npm run build:content-status` but that is a separate fix job.
- (efmp-301-u08-review_en, review_en, codex) Owner action needed on untaught RRQ-10, unspecified ERQ word limits, and missing source/render evidence.
- (efmp-301-u08-review_en, review_en, codex) Owner action needed on untaught RRQ-10, unspecified ERQ word limits, and missing source/render evidence.

## Response snapshot

Resolved the single conflict in `specs/content/efmp-301/tasks.md` by keeping main's Unit 3 and Unit 12 rows ahead of this branch's Unit 8 rows, committed the merge, and ran the content gate.

## Outcome

- Impact: merge conflict resolution for EFMP-301 Unit 8 by opencode (attempt conflict2).
- Tests: `npm run check:content` - 12 of 13 gates pass; `check:content-status` fails on the gitignored `static/content-status.json`, which is absent on origin/main and whose on-disk digest matches neither the current tree nor origin/main, so the failure is pre-existing.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: merge commit `6b3fb7514` resolving `specs/content/efmp-301/tasks.md`; both sides' rows kept, main's first, no exact duplicates.
- Decisions the team must respect: this branch added no `D-`/`G-` IDs, so no ID collision needed renumbering; the shared registries were unchanged on both sides relative to the merge base.
- Pending / next owner: `check:content-status` needs `npm run build:content-status` (separate fix job); the Urdu "کاؤنٹرائزنگ" mistranslation and the narrow-screen/A4 render check remain open for a G5/translation or owner job.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: `check:content-status` fails on both this branch and origin/main because the gitignored `static/content-status.json` is stale or missing.
- Graders run and results (PASS/FAIL): `npm run check:content` - 12 PASS, 1 pre-existing FAIL.
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
