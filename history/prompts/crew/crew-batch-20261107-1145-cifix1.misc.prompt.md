---
id: crew-batch-20261107-1145-cifix1
title: crew fix EFMP-407 unit 3 figure geometry
stage: misc
date: 2026-11-07
surface: agent
model: opencode
feature: efmp-407
branch: crew/batch-20261107-1145
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: 477
files:
  - static/img/figures/efmp-407/unit-03/fig-U3-1.svg
  - static/img/figures/efmp-407/unit-03/fig-U3-1.dark.svg
  - static/img/figures/efmp-407/unit-03/fig-U3-2.svg
  - static/img/figures/efmp-407/unit-03/fig-U3-2.dark.svg
  - static/img/figures/efmp-407/unit-03/fig-U3-4.svg
  - static/img/figures/efmp-407/unit-03/fig-U3-4.dark.svg
  - static/img/figures/efmp-407/unit-03/fig-U3-6.svg
  - static/img/figures/efmp-407/unit-03/fig-U3-6.dark.svg
  - history/prompts/crew/crew-batch-20261107-1145-cifix1.misc.prompt.md
tests:
  - npm run check:content
---

## Prompt

# Crew job batch-20261107-1145-cifix1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/batch-20261107-1145`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
CI failed on PR #477 (checks: figure-geometry). Run `gh pr checks 477` and `gh run view --log-failed` to read the failure, fix it on this branch with the smallest change, and make `npm run check:content` pass. A build failure is usually malformed MDX or a broken relative link in this unit's files.

## Scope
The files this batch PR (#477) changes, which belong to the crew jobs efmp-407-u03-author, efmp-407-u02-translate, efmp-407-u07-review_en-r1. Change only what the merge or CI needs.

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
- (batch-20261106-2100-cifix1, fix, opencode) CI must confirm browser geometry (local Playwright prohibited); the fix was validated with a DejaVu advance-metric sim (`.crew/sim-geometry.py`) that reproduces the 145.0px spill before the edit and reports both files clean after.
- (batch-20261106-2100-cifix1, fix, opencode) The other Urdu panel labels in `fig-U2-2.ur.svg` still carry `text-anchor="end"` at panel centres (a translation artifact); they pass CI today but sit off-centre.
- (batch-20261106-2100-cifix1, fix, opencode) `fig-U3-2` cell 3 row 3 still has one Urdu line that runs off the left edge of its panel; `measure-figure-text.mjs` does not check the left edge, so CI stays green, but the rendered figure is clipped and needs a wrap or a taller row.
- (batch-20261106-1031-cifix1, fix, opencode) CI must confirm browser geometry; local Playwright was prohibited. The fix was validated with a DejaVu advance-metric simulation (`.crew/sim-geometry.py`) that reproduces the CI log's spills and reports all 8 changed SVGs clean at 1.0x and 1.02x safety.
- (batch-20261106-1031-cifix1, fix, opencode) fig-U3-2 cell 3 row 3 still has one Urdu line ("روزمرہ خاندانی، ثقافتی، تجارتی، اور اجتماعی زندگی کو برقرار رکھتی ہے۔") that runs off the left edge of its panel; measure-figure-text.mjs does not check the left edge, so CI stays green, but the rendered figure is clipped and needs a wrap or a taller row.

## Response snapshot

Fixed the four failing EFMP-407 unit 3 English figures and their derived dark twins. In `fig-U3-1` the two overflowing SDG-number cells were wrapped onto two lines and the label class dropped 15px to 14px; `fig-U3-2`, `fig-U3-4` and `fig-U3-6` also moved the label class to 14px; `fig-U3-6` moved the body class 13px to 12px and rewrapped its three Learning Objective cells. A DejaVu advance-metric simulation of `scripts/measure-figure-text.mjs` reports all 12 unit 3 SVGs clean, and `npm run check:content` passes.

## Outcome

- Impact: fix for EFMP-407 unit 3 figure geometry by opencode (attempt 1).
- Tests: npm run check:content passed (14/14 content gates).
- Files: 9 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Wrapped the overflowing SDG-number cells in `fig-U3-1`, reduced the label class 15px to 14px in `fig-U3-1`, `fig-U3-2`, `fig-U3-4` and `fig-U3-6`, reduced the body class 13px to 12px and rewrapped the three Learning Objective cells in `fig-U3-6`, and regenerated the four dark twins with `scripts/build-figure-variants.mjs`.
- Decisions the team must respect: text content is unchanged; only line breaks and font sizes moved. The label class is now 14px and the fig-U3-6 body class 12px in these files, so a later corpus-wide typography pass must not assume the 15px/13px boilerplate for unit 3.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - CI must confirm browser geometry (local Playwright prohibited). The fix was validated with `.crew/sim-geometry.py`, a DejaVu advance-metric simulation of `scripts/measure-figure-text.mjs`; it reproduces the CI log's spills on the pre-fix files and reports all 12 unit 3 SVGs clean after.
  - `fig-U3-1` col 4 line "Water conservation, waste audits," still has only about 1.7px of panel margin (pre-existing, passes CI); a later font or width change could tip it.
  - `fig-U3-2` still has panel descriptions wider than their 220px panels (for example "Heritage and mutual learning" and "Resource care and moderation"); `measure-figure-text.mjs` does not flag them because their left edge falls outside the holder rect, but they render slightly outside the panel.
  - `fig-U3-6` body text is now 12px; if the unit's figures are later standardised on 13px body, this figure needs a matching rewrap.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
