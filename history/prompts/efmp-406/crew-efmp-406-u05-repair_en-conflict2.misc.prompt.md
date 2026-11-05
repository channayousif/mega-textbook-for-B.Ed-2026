---
id: crew-efmp-406-u05-repair_en-conflict2
title: crew fix EFMP-406 unit 5
stage: misc
date: 2026-11-05
surface: agent
model: opencode
feature: efmp-406
branch: crew/efmp-406-u05-repair_en
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/efmp-406/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/efmp-406/tasks.md
 - history/prompts/efmp-406/crew-efmp-406-u05-repair_en-conflict2.misc.prompt.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-406-u05-repair_en-conflict2

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-406-u05-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/efmp-406-u05-repair_en conflicts with main (specs/content/efmp-406/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-406 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-406/`, and `static/img/figures/efmp-406/unit-05/`.

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
- (efmp-406-u05-repair_en, repair_en, codex) G3 remains open; fresh independent review, browser/print checks and the owner’s catalog ruling remain pending.
- (efmp-406-u05-repair_en, repair_en, codex) G3 remains open; fresh independent review, browser/print checks and the owner’s catalog ruling remain pending.
- (efmp-406-u05-translate, translate, codex) Urdu rendering, SVG geometry inspection and independent G5 review remain pending.
- (efmp-406-u05-translate, translate, codex) Urdu rendering, SVG geometry inspection and independent G5 review remain pending.
- (efmp-406-u05-review_en, review_en, agy) All 7 G3 criteria pass, 25 assessment items independently solved, and all 8 SVG variants pass geometry; report validated with advisory pass disposition.

## Response snapshot

Merged origin/main and resolved the single conflict in `specs/content/efmp-406/tasks.md` by keeping both sides' appended G3 rows (main's Unit 2 revise row first, then this branch's Unit 5 revise row). No shared registry was touched by either side, so no ID renumbering was needed. Regenerated the gitignored `static/content-status.json` after the merge and passed all 14 content gates.

## Outcome

- Impact: fix for EFMP-406 Unit 5 by opencode (attempt 2, conflict resolution).
- Tests: npm run check:content passed (14 of 14 gates) after regenerating the local content-status report.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: origin/main merged into `crew/efmp-406-u05-repair_en`; the Unit 2 and Unit 5 G3 revise rows are both present in the tracker, main's first.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this merge does not certify anything and does not push or open a PR.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path); independent G3/G5 review, browser/print checks and the owner's catalog ruling remain pending.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS (14/14)
- Prompt variant (if applicable): crew brief conflict2
- Next experiment (smallest change to try): none
