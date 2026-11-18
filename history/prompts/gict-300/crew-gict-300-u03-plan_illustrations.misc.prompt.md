---
id: crew-gict-300-u03-plan_illustrations
title: crew plan_illustrations GICT-300 unit 3
stage: misc
date: 2026-11-14
surface: agent
model: claude
feature: gict-300
branch: crew/gict-300-u03-plan_illustrations
user: crew
command: crew plan_illustrations
labels: ["crew", "claude", "plan_illustrations"]
links:
  spec: specs/content/gict-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-1/gict-300/unit-03/topic-01.mdx
 - docs/semester-1/gict-300/unit-03/topic-02.mdx
 - docs/semester-1/gict-300/unit-03/topic-03.mdx
 - docs/semester-1/gict-300/unit-03/topic-04.mdx
 - specs/content/gict-300/figures/unit-03.banner.md
 - specs/content/gict-300/figures/unit-03.md
 - specs/content/gict-300/reviews/unit-03/G2/20261114T000301536Z-gates.json
 - specs/content/gict-300/reviews/unit-03/G2/logs-20261114T000301536Z/check-bloom-bands.txt
 - specs/content/gict-300/reviews/unit-03/G2/logs-20261114T000301536Z/check-concept-graph.txt
 - specs/content/gict-300/reviews/unit-03/G2/logs-20261114T000301536Z/check-depth-gate.txt
 - specs/content/gict-300/reviews/unit-03/G2/logs-20261114T000301536Z/check-docs-sync.txt
 - specs/content/gict-300/reviews/unit-03/G2/logs-20261114T000301536Z/check-figures.txt
 - specs/content/gict-300/reviews/unit-03/G2/logs-20261114T000301536Z/check-no-answer-keys.txt
 - specs/content/gict-300/reviews/unit-03/G2/logs-20261114T000301536Z/check-no-em-dash.txt
 - specs/content/gict-300/reviews/unit-03/G2/logs-20261114T000301536Z/validate-content.txt
 - specs/content/gict-300/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gict-300-u03-plan_illustrations

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gict-300-u03-plan_illustrations`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Plan the raster images for GICT-300 Unit 3 (ADR-0029 point 5; owner ruling 2026-11-09: units authored before the author-unit skill planned them are backfilled). Read `.claude/skills/author-unit/references/figure-prompts.md` and model the banner on `specs/content/efmp-304/figures/unit-02.banner.md`. Write `specs/content/gict-300/figures/unit-03.banner.md` with one 16:9 banner row for the unit index (next free figure ID, Kind illustration, Status prompt-only). Then add one illustration scene per topic for its "A real classroom situation", unless the scene would only decorate: a `FIGURE[...]` marker in the English topic file and a matching prompt-only row in `figures/unit-03.md`. Every prompt is a complete brief for a scene that teaches the unit's point: a Sindh school or classroom, Pakistani dress, no text, maps, flags or emblems, and never a prophet, companion, angel or other sacred person, nor scripture or calligraphy (this matters most for Islamic studies and Qur'an courses: show teachers and pupils learning, not sacred figures). Alt text describes what the image will show. Do not generate, place or draw any image and do not touch other figures: the illustrate job produces and places these rows.

## Scope
GICT-300 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gict-300/`, and `static/img/figures/gict-300/unit-03/`.

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
- (gict-300-u03-repair_en-r1, repair_en, agy) F9 (the ostep key has no year) remains an open owner decision touching approved content-spec or tooling.
- (gict-300-u03-repair_en-r1, repair_en, agy) ADR-0019 two-cycle G3 budget is exhausted; any fresh G3 run requires owner authorisation in specs/decisions/log.md.
- (gict-300-u03-repair_en-r1, repair_en, agy) G3 remains open and unticked pending owner review; translation stays draft.
- (gict-300-u03-repair_en-conflict1, fix, codex) The content-status report is ignored; fresh checkouts need `npm run build:content-status`.
- (gict-300-u03-repair_en-conflict1, fix, codex) The content-status report is ignored; fresh checkouts need `npm run build:content-status`.


## Response snapshot

Planned GICT-300 Unit 3 raster illustrations: added prompt-only banner fig-U3-9 in a new unit-03.banner.md and four topic classroom scenes fig-U3-10..13 as English FIGURE markers with matching manifest rows, then refreshed the unit's G2 evidence so check:content passes.

## Outcome

- Impact: plan_illustrations for GICT-300 Unit 3 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 16 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Planned GICT-300 Unit 3 raster illustrations: added prompt-only banner fig-U3-9 in a new unit-03.banner.md and four topic classroom scenes fig-U3-10..13 as English FIGURE markers with matching manifest rows, then refreshed the unit's G2 evidence so check:content passes.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The new markers are English-only; the draft Urdu topic files under `i18n/ur/.../gict-300/unit-03/` still need the same marker IDs fig-U3-10..13 when the translator or the illustrate job mirrors them.
  - Placing fig-U3-9..13 will change bound inputs again, so the illustrate job must regenerate G2 evidence (`node scripts/prepare-gate-evidence.mjs GICT-300 3`) and repoint the `tasks.md` row.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
