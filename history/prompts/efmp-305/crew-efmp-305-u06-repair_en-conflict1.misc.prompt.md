---
id: crew-efmp-305-u06-repair_en-conflict1
title: crew fix EFMP-305 unit 6
stage: misc
date: 2026-11-03
surface: agent
model: opencode
feature: efmp-305
branch: crew/efmp-305-u06-repair_en
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-305/2445-unit-six-g3-repair-verification.misc.prompt.md
 - history/prompts/efmp-305/crew-efmp-305-u06-repair_en-conflict1.misc.prompt.md
 - history/prompts/efmp-305/crew-efmp-305-u06-repair_en.misc.prompt.md
 - specs/content/efmp-305/reviews/unit-06/G3/20261103-repair-notes.md
 - specs/content/efmp-305/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-305-u06-repair_en-conflict1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-305-u06-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/efmp-305-u06-repair_en conflicts with main (specs/content/efmp-305/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-305 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-305/`, and `static/img/figures/efmp-305/unit-06/`.

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
- (efmp-305-u06-repair_en, repair_en, codex) G3 remains unticked pending fresh independent review.
- (efmp-305-u06-repair_en, repair_en, codex) G3 remains unticked pending fresh independent review.
- (efmp-305-u06-translate-r1, translate, codex) Translation remains draft pending independent G5 review; fresh rendered Urdu inspection is still required.
- (efmp-305-u06-translate-r1, translate, codex) Translation remains draft pending independent G5 review; fresh rendered Urdu inspection is still required.
- (efmp-305-u06-translate-cifix1, fix, opencode) The test:review ENOTEMPTY in "unit-scoped binding: a sibling unit does not invalidate this unit" is a cleanup race in the harness, not a content issue  -  a re-run should clear it.


## Response snapshot

Merged origin/main into crew/efmp-305-u06-repair_en, resolving the tasks.md conflict by keeping both sides' G3 rows (main's Unit 3 first, then the branch's Unit 6), and all 14 content gates pass.

## Outcome

- Impact: fix for EFMP-305 Unit 6 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 5 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/efmp-305-u06-repair_en, resolving the tasks.md conflict by keeping both sides' G3 rows (main's Unit 3 first, then the branch's Unit 6), and all 14 content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Fresh checkouts need `npm run build:content-status` before `npm run check:content` (the report is gitignored).
  - G3 remains unticked pending fresh independent review; Urdu translation remains draft pending independent G5 and fresh rendered inspection.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
