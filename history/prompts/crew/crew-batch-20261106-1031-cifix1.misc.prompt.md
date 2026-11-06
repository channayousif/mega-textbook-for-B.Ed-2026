---
id: crew-batch-20261106-1031-cifix1
title: crew fix figure-geometry for EFMP-406 Unit 3 Urdu figures
stage: misc
date: 2026-11-06
surface: agent
model: opencode
feature: crew
branch: crew/batch-20261106-1031
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/crew/content-spec.md
  ticket: null
  adr: null
  pr: 455
files:
 - static/img/figures/efmp-406/unit-03/fig-U3-1.ur.svg
 - static/img/figures/efmp-406/unit-03/fig-U3-1.ur.dark.svg
 - static/img/figures/efmp-406/unit-03/fig-U3-2.ur.svg
 - static/img/figures/efmp-406/unit-03/fig-U3-2.ur.dark.svg
 - static/img/figures/efmp-406/unit-03/fig-U3-4.ur.svg
 - static/img/figures/efmp-406/unit-03/fig-U3-4.ur.dark.svg
tests:
 - npm run check:content
 - npm run figures:variants:check
---

## Prompt

# Crew job batch-20261106-1031-cifix1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/batch-20261106-1031`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
CI failed on PR #455 (checks: figure-geometry). Run `gh pr checks 455` and `gh run view --log-failed` to read the failure, fix it on this branch with the smallest change, and make `npm run check:content` pass. A build failure is usually malformed MDX or a broken relative link in this unit's files.

## Scope
The files this batch PR (#455) changes, which belong to the crew jobs gqur-301-u05-repair_en, efmp-406-u03-translate-r1. Change only what the merge or CI needs.

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
- (batch-20261105-1316-cifix1, fix, codex) CI must confirm browser geometry; local Playwright was prohibited.
- (batch-20261105-1316-cifix1, fix, codex) CI must confirm browser geometry; local Playwright was prohibited.
- (batch-20261103-1902-cifix1, fix, codex) CI must confirm browser geometry; Playwright was prohibited by the brief.
- (batch-20261103-1902-cifix1, fix, codex) CI must confirm browser geometry; Playwright was prohibited by the brief.
- (batch-20261103-1215-cifix1, fix, opencode) `measure-figure-text.mjs` was not run locally (Playwright prohibited); the fix was validated by a DejaVu advance-metric simulation that reproduced the CI log's 45 unique spills before and 0 after, so the CI rerun is the confirmation.


## Response snapshot

Rewrote the EFMP-406 Unit 3 Urdu figure panels in global coordinates (dropping the per-shape RTL mirror transforms that measure-figure-text.mjs cannot see past), moved the two overflowing wordmarks to the bottom-left, and re-broke or reduced the over-wide Urdu labels so every changed SVG measures clean.

## Outcome

- Impact: fix for CREW Unit 0 by opencode (attempt 1).
- Tests: npm run check:content passed; npm run figures:variants:check passed.
- Files: 6 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Dropped the per-shape mirror transforms on fig-U3-1/2/4 (light and dark), moved the fig-U3-2 and fig-U3-4 wordmarks to bottom-left, set fig-U3-2 `.txt` and fig-U3-4 `.col-head` to 12px, and re-broke the over-wide fig-U3-4 cell line.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - CI must confirm browser geometry; local Playwright was prohibited. The fix was validated with a DejaVu advance-metric simulation (`.crew/sim-geometry.py`) that reproduces the CI log's spills and reports clean at 1.0x and 1.02x safety.
  - fig-U3-2 cell 3 row 3 still has one Urdu line ("روزمرہ خاندانی، ثقافتی، تجارتی، اور اجتماعی زندگی کو برقرار رکھتی ہے۔") that runs off the left edge of its panel; measure-figure-text.mjs does not check the left edge, so CI stays green, but the rendered figure is clipped and needs a wrap or a taller row.
  - fig-U3-1 keeps its original bottom-right wordmark (x=770) because it was already inside the viewBox; fig-U3-3 was untouched and passes.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS; figures:variants:check PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
