---
id: crew-gqur-301-u10-repair_en-conflict2
title: crew fix GQUR-301 unit 10
stage: misc
date: 2026-11-05
surface: agent
model: opencode
feature: gqur-301
branch: crew/gqur-301-u10-repair_en
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gqur-301/crew-gqur-301-u10-repair_en-conflict2.misc.prompt.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u10-repair_en-conflict2

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u10-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/gqur-301-u10-repair_en conflicts with main (specs/content/gqur-301/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GQUR-301 Unit 10 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-10/`.

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
- (gqur-301-u10-repair_en-conflict1, fix, opencode) Unit 10 G3 stays open and unsigned (ADR-0019), blocked on an authorised non-production render host; no content repair was possible or required.
- (gqur-301-u10-repair_en-conflict1, fix, opencode) `static/content-status.json` is gitignored and goes stale after any content-tree change; regenerate with `npm run build:content-status` before running `check:content`.
- (gqur-301-u10-repair_en, repair_en, codex) Rendering remains blocked pending an authorised non-production host.
- (gqur-301-u10-repair_en, repair_en, codex) Rendering remains blocked pending an authorised non-production host.
- (gqur-301-u10-translate, translate, codex) Translation remains draft; independent G3/G5 review, terminology approval and browser/A4 Urdu inspection remain pending.

## Response snapshot

Verified the branch already contains origin/main at c8cf9e9d7 through merge commit 5d7cc00db, confirmed the tasks.md resolution keeps main's Unit 2 and Unit 6 rows then this branch's Unit 10 row, found no shared-registry drift and no conflict markers, regenerated the gitignored content-status artifact, and confirmed all 14 content gates pass. No further merge or content change was required.

## Outcome

- Impact: verification for GQUR-301 Unit 10 by opencode (attempt 2).
- Tests: npm run check:content passed in the job worktree.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Verified the existing origin/main merge on `crew/gqur-301-u10-repair_en` (commit 5d7cc00db) is complete and correct; no new merge or content repair was needed.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this job does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Unit 10 G3 stays open and unsigned (ADR-0019), blocked on an authorised non-production render host; no content repair was possible or required.
  - `static/content-status.json` is gitignored and goes stale after any content-tree change; regenerate with `npm run build:content-status` before running `check:content`.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
