---
id: crew-batch-20261102-2130-cifix1
title: crew fix CREW unit 0
stage: misc
date: 2026-11-03
surface: agent
model: opencode
feature: crew
branch: crew/batch-20261102-2130
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/efmp-406/content-spec.md
  ticket: null
  adr: null
  pr: 418
files:
 - history/prompts/crew/crew-batch-20261102-2130-cifix1.misc.prompt.md
 - static/img/figures/efmp-406/unit-06/fig-U6-1.ur.svg
 - static/img/figures/efmp-406/unit-06/fig-U6-1.ur.dark.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job batch-20261102-2130-cifix1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/batch-20261102-2130`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
CI failed on PR #418 (checks: figure-geometry). Run `gh pr checks 418` and `gh run view --log-failed` to read the failure, fix it on this branch with the smallest change, and make `npm run check:content` pass. A build failure is usually malformed MDX or a broken relative link in this unit's files.

## Scope
The files this batch PR (#418) changes, which belong to the crew jobs efmp-406-u06-translate. Change only what the merge or CI needs.

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
- (batch-20261102-1300-cifix1, fix, opencode) The other three Unit 1 Urdu figures (fig-U1-1/3/4) still use per-shape transforms and pass the geometry gate only by layout coincidence; a future edit there could re-expose the same false positive.
- (batch-20261102-1300-cifix1, fix, opencode) Only `.ur.svg` files changed, so Unit 1's G2 input manifest is untouched (Urdu variants bind to G5 only); no G3/G5 status changed.
- (batch-20261102-0900-conflict1, fix, opencode) The new Unit 3 G2 evidence binds main's `scripts/lib/review-evidence.mjs` and `catalog/courses.json`; any further edit to those globals or Unit 3's bound files re-opens G2, so use `node scripts/prepare-gate-evidence.mjs --refresh-stale` rather than a hand edit.
- (batch-20261102-0900-conflict1, fix, opencode) `static/content-status.json` is gitignored and was regenerated locally; CI's prestart hook rebuilds it.
- (batch-20261102-0900-cifix1, fix, opencode) Unit 3's G2 input manifest was refreshed in place (6 figure hashes); any further edit under `static/img/figures/efmp-406/unit-03/` re-opens it, so recompute with `inputManifest(root, 'EFMP-406', 3, 'G3')`.

## Response snapshot

Converted fig-U6-1.ur.svg and its dark variant from per-shape transform mirroring to coordinate mirroring (rect x becomes 780-x-width and the transform is dropped), so the figure-geometry gate measures each Urdu label against its real panel. The rendered figure is pixel-identical. Regenerated the dark variant with the repository's variant builder.

## Outcome

- Impact: fix for CREW Unit 0 by opencode (attempt 1).
- Tests: npm run check:content passed 13/13 in the job worktree. The geometry gate was not run because the crew brief forbids Playwright; a DejaVu-metric simulation reproduced all 7 CI spills exactly (150.4px) before the change and 0 after.
- Files: 3 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Rewrote fig-U6-1.ur.svg and its dark variant from transform-based RTL mirroring to coordinate mirroring, so measure-figure-text.mjs compares labels against the intended panels. Rendered output is pixel-identical (sharp render diff max channel delta 1).
- Decisions the team must respect: G3/G5 stay advisory; this PR does not certify anything. The `.ur.svg` files are not in Unit 6's G2 input manifest (only the English variants are), so no gate-evidence refresh was needed. Only the two failing files changed.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - `measure-figure-text.mjs` was not run (it launches Playwright Chromium, which the brief forbids). The fix was checked with a local DejaVu advance-metric simulation of the gate and a sharp render diff, both matching CI's observed numbers.
  - Under CI's fallback font, Unit 6 fig-U6-1 response row 4 line 2 ("کریں اور محفوظ رسائی کی ضروریات کا حوالہ دیں") measures about 344px in a 322px panel (bbox x1 about -10), so it can clip at the viewBox left edge. The gate does not test left overflow, and under the production Nastaliq font the sharp render fits (ink min x about 79). A render inspection with production fonts should confirm this line.
  - fig-U6-2/3/4.ur.svg still use per-shape transforms and were not touched; they passed the CI geometry run.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none beyond the known transform-vs-coordinate false positive, reproduced exactly by simulation.
- Graders run and results (PASS/FAIL): check:content PASS; figure-geometry predicted PASS by simulation (not executed).
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
