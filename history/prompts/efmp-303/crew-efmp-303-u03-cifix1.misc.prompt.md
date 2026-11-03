---
id: crew-efmp-303-u03-cifix1
title: crew fix EFMP-303 unit 3 figure geometry
stage: misc
date: 2026-11-03
surface: agent
model: opencode
feature: efmp-303
branch: crew/batch-20261103-0846
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: null
  adr: null
  pr: 430
files:
 - static/img/figures/efmp-303/unit-03/fig-U3-4.ur.dark.svg
 - static/img/figures/efmp-303/unit-03/fig-U3-4.ur.svg
 - history/prompts/efmp-303/crew-efmp-303-u03-cifix1.misc.prompt.md
tests:
 - npm run check:content
---

## Prompt

# Crew job batch-20261103-0846-cifix1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/batch-20261103-0846`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
CI failed on PR #430 (checks: figure-geometry). Run `gh pr checks 430` and `gh run view --log-failed` to read the failure, fix it on this branch with the smallest change, and make `npm run check:content` pass. A build failure is usually malformed MDX or a broken relative link in this unit's files.

## Scope
The files this batch PR (#430) changes, which belong to the crew jobs efmp-301-u05-repair_en, efmp-303-u03-repair_en, efmp-304-u02-repair_en, geng-300-u04-repair_en, efmp-304-u03-repair_en. Change only what the merge or CI needs.

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
- (batch-20261103-0200-cifix1, fix, codex) CI must verify browser geometry; the brief prohibited local Playwright.
- (batch-20261103-0200-cifix1, fix, codex) CI must verify browser geometry; the brief prohibited local Playwright.
- (batch-20261102-2130-cifix1, fix, opencode) `measure-figure-text.mjs` was not run (Playwright forbidden); the fix was validated by a DejaVu advance-metric simulation that reproduced all 7 CI spills exactly before the change and 0 after, plus a pixel-diff render check showing the figure is unchanged.
- (batch-20261102-2130-cifix1, fix, opencode) Under CI's fallback font, response row 4 line 2 ("کریں اور محفوظ رسائی کی ضروریات کا حوالہ دیں") measures ~344px in a 322px panel; the gate ignores left overflow and production Nastaliq fits, but a future render inspection should confirm it.
- (batch-20261102-1300-cifix1, fix, opencode) The other three Unit 1 Urdu figures (fig-U1-1/3/4) still use per-shape transforms and pass the geometry gate only by layout coincidence; a future edit there could re-expose the same false positive.

## Response snapshot

Read the failed figure-geometry job for PR #430. It reported one text-geometry problem in two files: the Urdu label "استراتیجی منصوبہ بندی" and the adjacent column label "کسی بھی سطح پر" sat 3.2px apart, below the gate's 4px minimum. The English source figure already splits "Strategic planning" across two lines, so the Urdu mirror was split the same way ("استراتیجی" / "منصوبہ بندی") and the third line was moved to y=302 to mirror the English baseline. The dark variant was regenerated from the light source with `scripts/build-figure-variants.mjs`.

## Outcome

- Impact: fix EFMP-303 Unit 3 figure geometry for PR #430 by opencode (attempt 1).
- Tests: `npm run check:content` passed before and after the change (13/13 content gates).
- Files: 3 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: split the long Urdu "استراتیجی منصوبہ بندی" label in fig-U3-4.ur.svg into two lines matching the English source figure, moved "ایک طریقہ کار" to y=302, and regenerated the dark variant.
- Decisions the team must respect: the fix mirrors the English figure's line breaks; no content or manifest change was needed. G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The figure-geometry job was not run locally because the crew brief prohibits Playwright; the fix was validated by geometry reasoning against the CI log's measured 3.2px gap. A CI rerun is the confirmation.
  - The Urdu label "کسی بھی سطح پر" still nearly fills its 150px column under the CI fallback font; a future text edit there could re-expose a tight gap or spill.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: CI fallback font renders Urdu labels wider than production Nastaliq, so a label that fits in Nastaliq can still breach the 4px label-gap minimum.
- Graders run and results (PASS/FAIL): check:content PASS; figure-geometry not run locally (Playwright prohibited).
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
