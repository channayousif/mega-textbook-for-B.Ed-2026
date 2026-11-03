---
id: crew-batch-20261103-1215-cifix1
title: crew fix GISS-401 Unit 5 figure geometry
stage: misc
date: 2026-11-03
surface: agent
model: opencode
feature: crew
branch: crew/batch-20261103-1215
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/crew/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - static/img/figures/giss-401/unit-05/fig-U5-1.svg
 - static/img/figures/giss-401/unit-05/fig-U5-1.dark.svg
 - static/img/figures/giss-401/unit-05/fig-U5-2.svg
 - static/img/figures/giss-401/unit-05/fig-U5-2.dark.svg
 - static/img/figures/giss-401/unit-05/fig-U5-3.svg
 - static/img/figures/giss-401/unit-05/fig-U5-3.dark.svg
 - static/img/figures/giss-401/unit-05/fig-U5-4.svg
 - static/img/figures/giss-401/unit-05/fig-U5-4.dark.svg
 - specs/content/giss-401/tasks.md
 - specs/content/giss-401/reviews/unit-05/G2/20261103T130415550Z-gates.json
 - specs/content/giss-401/reviews/unit-05/G2/logs-20261103T130415550Z/check-bloom-bands.txt
 - specs/content/giss-401/reviews/unit-05/G2/logs-20261103T130415550Z/check-concept-graph.txt
 - specs/content/giss-401/reviews/unit-05/G2/logs-20261103T130415550Z/check-depth-gate.txt
 - specs/content/giss-401/reviews/unit-05/G2/logs-20261103T130415550Z/check-docs-sync.txt
 - specs/content/giss-401/reviews/unit-05/G2/logs-20261103T130415550Z/check-figures.txt
 - specs/content/giss-401/reviews/unit-05/G2/logs-20261103T130415550Z/check-no-answer-keys.txt
 - specs/content/giss-401/reviews/unit-05/G2/logs-20261103T130415550Z/check-no-em-dash.txt
 - specs/content/giss-401/reviews/unit-05/G2/logs-20261103T130415550Z/validate-content.txt
 - history/prompts/crew/crew-batch-20261103-1215-cifix1.misc.prompt.md
tests:
 - npm run check:content
---

## Prompt

# Crew job batch-20261103-1215-cifix1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/batch-20261103-1215`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
CI failed on PR #436 (checks: figure-geometry). Run `gh pr checks 436` and `gh run view --log-failed` to read the failure, fix it on this branch with the smallest change, and make `npm run check:content` pass. A build failure is usually malformed MDX or a broken relative link in this unit's files.

## Scope
The files this batch PR (#436) changes, which belong to the crew jobs giss-401-u05-author. Change only what the merge or CI needs.

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
- (batch-20261103-0846-cifix1, fix, opencode) figure-geometry was not run locally (Playwright prohibited by the brief); the fix was validated by geometry reasoning against the CI log's measured 3.2px gap, so the CI rerun is the confirmation.
- (batch-20261103-0846-cifix1, fix, opencode) the adjacent Urdu label "کسی بھی سطح پر" still nearly fills its 150px column under the CI fallback font; a future text edit there could re-expose a tight gap or spill.
- (batch-20261103-0200-cifix1, fix, codex) CI must verify browser geometry; the brief prohibited local Playwright.
- (batch-20261103-0200-cifix1, fix, codex) CI must verify browser geometry; the brief prohibited local Playwright.
- (batch-20261102-2130-cifix1, fix, opencode) `measure-figure-text.mjs` was not run (Playwright forbidden); the fix was validated by a DejaVu advance-metric simulation that reproduced all 7 CI spills exactly before the change and 0 after, plus a pixel-diff render check showing the figure is unchanged.

## Response snapshot

Reduced the label font sizes in all four GISS-401 Unit 5 schematics to the 11px floor (support) and 12px (th/label), widened the fig-U5-1 top panels from 220 to 237 and the fig-U5-3 pillar cells from 235 to 245, and reworded three labels that still overflowed the CI fallback font. Regenerated the four dark variants and refreshed the stale G2 gate evidence that the SVG edits invalidated.

## Outcome

- Impact: fix for GISS-401 Unit 5 figure geometry by opencode (attempt 1).
- Tests: npm run check:content passed (all 13 gates) in the job worktree.
- Files: 19 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: All four GISS-401 Unit 5 SVGs now fit the CI fallback font (DejaVu Sans) at the 11px minimum label size; dark variants regenerated; G2 gate evidence refreshed and the tracker row repointed.
- Decisions the team must respect: the figures keep their archetypes, figure IDs, alt text and manifest rows; only label text, font sizes and box widths changed. G3/G5 stay open and this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - `measure-figure-text.mjs` was not run locally (Playwright prohibited by the brief). The fix was validated with a DejaVu advance-metric simulation (fontTools hmtx + kern, SVG whitespace rules) that reproduced the CI log's 45 unique spills before the change and 0 after; the CI rerun is the confirmation.
  - The tightest remaining margins under the simulation are about 4px (fig-U5-3 "Independent judiciary with no executive") and 6px (fig-U5-1 "Circulates capital; stops hoarding (59:7)"), so a future text edit there could re-expose a spill.
  - The G2 evidence refresh repointed `specs/content/giss-401/tasks.md` to `specs/content/giss-401/reviews/unit-05/G2/20261103T130415550Z-gates.json`; the old evidence file is left in place.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
