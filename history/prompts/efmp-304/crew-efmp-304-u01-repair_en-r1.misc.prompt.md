---
id: crew-efmp-304-u01-repair_en-r1
title: crew repair_en EFMP-304 unit 1
stage: misc
date: 2026-11-03
surface: agent
model: opencode
feature: efmp-304
branch: crew/efmp-304-u01-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "opencode", "repair_en"]
links:
  spec: specs/content/efmp-304/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-304/crew-efmp-304-u01-repair_en-r1.misc.prompt.md
 - specs/content/efmp-304/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-304-u01-repair_en-r1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-304-u01-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/efmp-304/reviews/unit-01/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 1 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-304 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-304/`, and `static/img/figures/efmp-304/unit-01/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Open findings from the latest G3 report
From `specs/content/efmp-304/reviews/unit-01/G3/20261102T212207Z-g3-desk-9cac2bab.json` (disposition: revise). Resolve each one:
- [blocking] Visual browser and print inspection (360px small-screen viewport, table scrollability, and A4 print view) could not be executed because the crew job brief explicitly prohibits running npm run build, a dev server, or Playwright (render-review exit code 1). Structural accessibility checks pass from source (alt text, headings, descriptive link titles, SVG XML syntax, and measure-figure-text). Full G3 certification requires visual inspection on a live build under permitted browser tooling.

## Notes from earlier jobs on this unit
- (efmp-304-u01-review_en-r1, review_en, agy) All five cycle 1 defects verified resolved on disk (SVG syntax, wordmark viewBox overflow, RRQ 2-per-topic balance, placed manifest preamble, descriptive links).
- (efmp-304-u01-review_en-r1, review_en, agy) Visual presentation across viewports (360px small-screen, table horizontal scrolling, A4 print view) remains uninspected due to host execution limits, requiring permitted browser inspection for final G3 certification.
- (efmp-304-u01-fix, fix, opencode) Independent G3 and dependent G5 review for EFMP-304 Unit 1 remain pending  -  G3 marked stale in tasks.md. Figure 3 footer intersection noted by earlier jobs was not re-inspected here (out of scope for geometry-only repair).
- (efmp-304-u01-repair_en-conflict5, fix, codex) Fresh independent G3/G5 review and narrow-width/A4 inspection remain pending; inspect Figure 3’s footer.
- (efmp-304-u01-repair_en-conflict5, fix, codex) Fresh independent G3/G5 review and narrow-width/A4 inspection remain pending; inspect Figure 3’s footer.


## Response snapshot

Verified the five cycle-1 G3 repairs are already resolved on disk and appended an unticked Unit 1 G3 advisory repair row naming the latest desk report (20261102T212207Z-g3-desk-9cac2bab.json).

## Outcome

- Impact: repair_en for EFMP-304 Unit 1 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Verified the five cycle-1 G3 repairs are already resolved on disk and appended an unticked Unit 1 G3 advisory repair row naming the latest desk report (20261102T212207Z-g3-desk-9cac2bab.json).
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Visual browser/print inspection (360px viewport, table scrollability, A4 print) remains unexecuted; full G3 certification needs permitted browser tooling on a live build.
  - Figure 3's cosmetic footer/wordmark intersection (88.7 x 15.0px in `.ur` variants; 88.3 x 4.5px in fig-U1-6/8/9) is non-failing; the next rendered inspection should check the footer.
  - Fresh independent G3 and dependent G5 remain pending; ADR-0019's two-cycle limit may need owner authorisation for any further run.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
