---
id: crew-efmp-406-u05-plan_illustrations
title: crew plan_illustrations EFMP-406 unit 5
stage: misc
date: 2026-11-13
surface: agent
model: claude
feature: efmp-406
branch: crew/efmp-406-u05-plan_illustrations
user: crew
command: crew plan_illustrations
labels: ["crew", "claude", "plan_illustrations"]
links:
  spec: specs/content/efmp-406/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/efmp-406/unit-05/topic-01.mdx
 - docs/semester-3/efmp-406/unit-05/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-05/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-05/topic-02.mdx
 - specs/content/efmp-406/figures/unit-05.banner.md
 - specs/content/efmp-406/figures/unit-05.md
 - specs/content/efmp-406/reviews/unit-05/G2/20261113T084849097Z-gates.json
 - specs/content/efmp-406/reviews/unit-05/G2/logs-20261113T084849097Z/check-bloom-bands.txt
 - specs/content/efmp-406/reviews/unit-05/G2/logs-20261113T084849097Z/check-concept-graph.txt
 - specs/content/efmp-406/reviews/unit-05/G2/logs-20261113T084849097Z/check-depth-gate.txt
 - specs/content/efmp-406/reviews/unit-05/G2/logs-20261113T084849097Z/check-docs-sync.txt
 - specs/content/efmp-406/reviews/unit-05/G2/logs-20261113T084849097Z/check-figures.txt
 - specs/content/efmp-406/reviews/unit-05/G2/logs-20261113T084849097Z/check-no-answer-keys.txt
 - specs/content/efmp-406/reviews/unit-05/G2/logs-20261113T084849097Z/check-no-em-dash.txt
 - specs/content/efmp-406/reviews/unit-05/G2/logs-20261113T084849097Z/validate-content.txt
 - specs/content/efmp-406/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-406-u05-plan_illustrations

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-406-u05-plan_illustrations`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Plan the raster images for EFMP-406 Unit 5 (ADR-0029 point 5; owner ruling 2026-11-09: units authored before the author-unit skill planned them are backfilled). Read `.claude/skills/author-unit/references/figure-prompts.md` and model the banner on `specs/content/efmp-304/figures/unit-02.banner.md`. Write `specs/content/efmp-406/figures/unit-05.banner.md` with one 16:9 banner row for the unit index (next free figure ID, Kind illustration, Status prompt-only). Then add one illustration scene per topic for its "A real classroom situation", unless the scene would only decorate: a `FIGURE[...]` marker in the English topic file and a matching prompt-only row in `figures/unit-05.md`. Every prompt is a complete brief for a scene that teaches the unit's point: a Sindh school or classroom, Pakistani dress, no text, maps, flags or emblems, and never a prophet, companion, angel or other sacred person, nor scripture or calligraphy (this matters most for Islamic studies and Qur'an courses: show teachers and pupils learning, not sacred figures). Alt text describes what the image will show. Do not generate, place or draw any image and do not touch other figures: the illustrate job produces and places these rows.

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
- (efmp-406-u05-repair_en-conflict3, fix, opencode) G3 and G5 remain open and unsigned; independent review, browser/print checks and the owner's catalog ruling are still pending for Unit 5.
- (efmp-406-u05-repair_en-conflict3, fix, opencode) `static/content-status.json` is gitignored and was regenerated locally after the merge; a clean checkout will need `npm run build:content-status` before `check:content` passes.
- (efmp-406-u05-repair_en-conflict3, fix, opencode) This conflict was against main's newer efmp-406 Unit 3 rows (PR #447), not the old main; the tracker now carries both units' rows.
- (efmp-406-u05-repair_en-conflict2, fix, opencode) G3 and G5 remain open and unsigned; independent review, browser/print checks and the owner's catalog ruling are still pending for Unit 5.
- (efmp-406-u05-repair_en-conflict2, fix, opencode) `static/content-status.json` is gitignored and was regenerated locally after the merge; a clean checkout will need `npm run build:content-status` before `check:content` passes.


## Response snapshot

Planned the EFMP-406 Unit 5 banner (fig-U5-5) and two classroom scenes (fig-U5-6, fig-U5-7) at prompt-only, with EN/UR markers, manifest and banner rows, and refreshed Unit 5 G2 evidence and its tracker row.

## Outcome

- Impact: plan_illustrations for EFMP-406 Unit 5 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 16 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Planned the EFMP-406 Unit 5 banner (fig-U5-5) and two classroom scenes (fig-U5-6, fig-U5-7) at prompt-only, with EN/UR markers, manifest and banner rows, and refreshed Unit 5 G2 evidence and its tracker row.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The illustrate job must generate, inspect and place `fig-U5-5`, `fig-U5-6` and `fig-U5-7`, replace the EN and UR markers with `<Figure>`, then rerun G2 evidence (`node scripts/prepare-gate-evidence.mjs EFMP-406 5`, which needs a clean tree) and repoint the tracker row.
  - Both topic scenes are two-panel splits with no panel labels; check that the generated images have no readable text on the projected slide, the board, the poster, the leaflet or the phone screen.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
