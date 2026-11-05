---
id: crew-gnas-301-u04-repair_en-r1-conflict2
title: crew fix GNAS-301 unit 4
stage: misc
date: 2026-11-05
surface: agent
model: opencode
feature: gnas-301
branch: crew/gnas-301-u04-repair_en-r1
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/gnas-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gnas-301/crew-gnas-301-u04-repair_en-r1-conflict2.misc.prompt.md
 - specs/content/gnas-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gnas-301-u04-repair_en-r1-conflict2

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gnas-301-u04-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/gnas-301-u04-repair_en-r1 conflicts with main (specs/content/gnas-301/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GNAS-301 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gnas-301/`, and `static/img/figures/gnas-301/unit-04/`.

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
- (gnas-301-u04-repair_en-r1-conflict1, fix, codex) G3 remains open pending owner authorization; live mobile and A4 print inspection remains outstanding.
- (gnas-301-u04-repair_en-r1-conflict1, fix, codex) G3 remains open pending owner authorization; live mobile and A4 print inspection remains outstanding.
- (gnas-301-u04-repair_en-r1, repair_en, agy) G3 remains unticked; third review cycle requires owner authorization under G-2026-31.
- (gnas-301-u04-repair_en-r1, repair_en, agy) Live 360px small-screen and A4 print view render inspection remains unperformed due to host limits and must be verified on a live build before G3 certification.
- (gnas-301-u04-repair_en-r1, repair_en, agy) who-hearing-2026.md heading is retained as-is because modifying it invalidates Unit 3's bound G2 gate evidence.

## Response snapshot

Merged origin/main into the branch, union-resolved the one conflict in the Unit 4 tracker, and refreshed the generated content-status report so every content gate passes.

## Outcome

- Impact: fix for GNAS-301 Unit 4 by opencode (attempt 2).
- Tests: npm run check:content passed after the merge and the content-status refresh.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: merge of origin/main with the Unit 4 G3 advisory tracker row preserved; both main's Unit 1 row and this branch's Unit 4 row kept in main-then-branch order.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this merge does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the branch touches a protected path).
- Notes for the next job on this unit:
  - G3 remains open pending owner authorization; live mobile and A4 print inspection remains outstanding.
  - Shared registries were untouched on both sides of the merge, so no ID re-keying was needed.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
