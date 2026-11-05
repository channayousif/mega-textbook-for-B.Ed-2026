---
id: crew-efmp-305-u05-repair_en-conflict3
title: crew fix EFMP-305 unit 5
stage: misc
date: 2026-11-05
surface: agent
model: opencode
feature: efmp-305
branch: crew/efmp-305-u05-repair_en
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/efmp-305/tasks.md
 - history/prompts/efmp-305/crew-efmp-305-u05-repair_en-conflict3.misc.prompt.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-305-u05-repair_en-conflict3

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-305-u05-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/efmp-305-u05-repair_en conflicts with main (specs/content/efmp-305/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-305 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-305/`, and `static/img/figures/efmp-305/unit-05/`.

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
- (efmp-305-u05-repair_en-conflict2, fix, opencode) The stated tasks.md conflict was already resolved by conflict1's merge `cda326287`; this run only synced main's later EFMP-301 Unit 4 repair.
- (efmp-305-u05-repair_en-conflict2, fix, opencode) F1 provenance/rendering and a fresh independent G3 with MCQ re-solve remain owner/host work; G3 stays unticked.
- (efmp-305-u05-repair_en-conflict2, fix, opencode) `static/content-status.json` is gitignored and was regenerated locally; CI generates it before the gate.
- (efmp-305-u05-repair_en-conflict1, fix, opencode) The branch's Unit 5 G2 row (`20261103T180403253Z-gates.json`) is the authoritative last matching row; main's Unit 3 row is preserved unchanged.
- (efmp-305-u05-repair_en-conflict1, fix, opencode) F1 provenance/rendering and a fresh independent G3 with MCQ re-solve remain owner/host work; G3 stays unticked.

## Response snapshot

Merged origin/main into `crew/efmp-305-u05-repair_en`, resolved the sole `specs/content/efmp-305/tasks.md` conflict by keeping main's Unit 6 G3 row then this branch's Unit 5 G3/G2 rows, regenerated gitignored `static/content-status.json`, and committed the conflict3 PHR so all 14 content gates pass.

## Outcome

- Impact: fix for EFMP-305 Unit 5 by opencode (attempt 1).
- Tests: npm run check:content passed (14/14) in the job worktree.
- Files: 2 file(s) changed by this job; the merge also synced 142 files from origin/main.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merge commit `503ca8904` resolved the tasks.md conflict (main's Unit 6 G3 advisory row kept first, then this branch's Unit 5 G3/G2 rows); `static/content-status.json` regenerated locally; all 14 content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this merge does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The tasks.md conflict is resolved; no other conflicted paths remained.
  - F1 provenance/rendering and a fresh independent G3 with MCQ re-solve remain owner/host work; G3 stays unticked.
  - `static/content-status.json` is gitignored and was regenerated locally; CI generates it before the gate.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
