---
id: crew-batch-20261106-2100-cifix1
title: crew fix batch-20261106-2100
stage: misc
date: 2026-11-07
surface: agent
model: opencode
feature: gicp-400
branch: crew/batch-20261106-2100
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/gicp-400/content-spec.md
  ticket: null
  adr: null
  pr: 465
files:
 - static/img/figures/gicp-400/unit-02/fig-U2-2.ur.svg
 - static/img/figures/gicp-400/unit-02/fig-U2-2.ur.dark.svg
 - history/prompts/crew/crew-batch-20261106-2100-cifix1.misc.prompt.md
tests:
 - npm run check:content
---

## Prompt

# Crew job batch-20261106-2100-cifix1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/batch-20261106-2100`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
CI failed on PR #465 (checks: figure-geometry). Run `gh pr checks 465` and `gh run view --log-failed` to read the failure, fix it on this branch with the smallest change, and make `npm run check:content` pass. A build failure is usually malformed MDX or a broken relative link in this unit's files.

## Scope
The files this batch PR (#465) changes, which belong to the crew jobs gicp-400-u06-author, gicp-400-u07-author, gicp-400-u04-translate, gicp-400-u05-translate, gicp-400-u02-translate, gicp-400-u03-review_en. Change only what the merge or CI needs.

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
- (batch-20261106-1031-cifix1, fix, opencode) CI must confirm browser geometry; local Playwright was prohibited. The fix was validated with a DejaVu advance-metric simulation (`.crew/sim-geometry.py`) that reproduces the CI log's spills and reports all 8 changed SVGs clean at 1.0x and 1.02x safety.
- (batch-20261106-1031-cifix1, fix, opencode) fig-U3-2 cell 3 row 3 still has one Urdu line ("روزمرہ خاندانی، ثقافتی، تجارتی، اور اجتماعی زندگی کو برقرار رکھتی ہے۔") that runs off the left edge of its panel; measure-figure-text.mjs does not check the left edge, so CI stays green, but the rendered figure is clipped and needs a wrap or a taller row.
- (batch-20261105-1316-cifix1, fix, codex) CI must confirm browser geometry; local Playwright was prohibited.
- (batch-20261105-1316-cifix1, fix, codex) CI must confirm browser geometry; local Playwright was prohibited.
- (batch-20261103-1902-cifix1, fix, codex) CI must confirm browser geometry; Playwright was prohibited by the brief.

## Response snapshot

Read the CI failure: `fig-U2-2.ur.svg` and its dark variant spilled "مشترکہ اجتماعی زندگی" 145.0px out of the neighbouring self-government panel. The label was right-anchored at the panel centre by a `text-anchor="end"` tspan override; changed that one tspan to `text-anchor="middle"` so the label centres inside its own 230px panel, matching the English original. Verified with a DejaVu advance-metric simulation that reproduces the CI spill before the edit and reports both files clean after.

## Outcome

- Impact: fix for GICP-400 unit 2 figure geometry by opencode (attempt 1).
- Tests: `npm run check:content` passed (all 14 content gates).
- Files: 3 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Centred the "مشترکہ اجتماعی زندگی" label in `static/img/figures/gicp-400/unit-02/fig-U2-2.ur.svg` and `.ur.dark.svg` (tspan `text-anchor` end to middle) so it no longer spills into the self-government panel.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - CI must confirm browser geometry; local Playwright was prohibited. The fix was validated with a DejaVu advance-metric simulation (`.crew/sim-geometry.py`) that reproduces the CI log's 145.0px spill before the edit and reports both files clean after.
  - The other Urdu panel labels in `fig-U2-2.ur.svg` still carry `text-anchor="end"` at panel centres (a translation artifact). They pass CI today but sit off-centre; a future cleanup should set them all to `middle`.
  - fig-U3-2 cell 3 row 3 still has one Urdu line ("روزمرہ خاندانی، ثقافتی، تجارتی، اور اجتماعی زندگی کو برقرار رکھتی ہے۔") that runs off the left edge of its panel; measure-figure-text.mjs does not check the left edge, so CI stays green, but the rendered figure is clipped and needs a wrap or a taller row.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
