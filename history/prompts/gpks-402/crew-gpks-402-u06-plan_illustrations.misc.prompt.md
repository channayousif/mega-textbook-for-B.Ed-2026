---
id: crew-gpks-402-u06-plan_illustrations
title: crew plan_illustrations GPKS-402 unit 6
stage: misc
date: 2026-11-14
surface: agent
model: claude
feature: gpks-402
branch: crew/gpks-402-u06-plan_illustrations
user: crew
command: crew plan_illustrations
labels: ["crew", "claude", "plan_illustrations"]
links:
  spec: specs/content/gpks-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gpks-402/unit-06/topic-01.mdx
 - docs/semester-2/gpks-402/unit-06/topic-02.mdx
 - docs/semester-2/gpks-402/unit-06/topic-03.mdx
 - specs/content/gpks-402/figures/unit-06.banner.md
 - specs/content/gpks-402/figures/unit-06.md
 - specs/content/gpks-402/reviews/unit-06/G2/20261114T153300670Z-gates.json
 - specs/content/gpks-402/reviews/unit-06/G2/logs-20261114T153300670Z/check-bloom-bands.txt
 - specs/content/gpks-402/reviews/unit-06/G2/logs-20261114T153300670Z/check-concept-graph.txt
 - specs/content/gpks-402/reviews/unit-06/G2/logs-20261114T153300670Z/check-depth-gate.txt
 - specs/content/gpks-402/reviews/unit-06/G2/logs-20261114T153300670Z/check-docs-sync.txt
 - specs/content/gpks-402/reviews/unit-06/G2/logs-20261114T153300670Z/check-figures.txt
 - specs/content/gpks-402/reviews/unit-06/G2/logs-20261114T153300670Z/check-no-answer-keys.txt
 - specs/content/gpks-402/reviews/unit-06/G2/logs-20261114T153300670Z/check-no-em-dash.txt
 - specs/content/gpks-402/reviews/unit-06/G2/logs-20261114T153300670Z/validate-content.txt
 - specs/content/gpks-402/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gpks-402-u06-plan_illustrations

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gpks-402-u06-plan_illustrations`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Plan the raster images for GPKS-402 Unit 6 (ADR-0029 point 5; owner ruling 2026-11-09: units authored before the author-unit skill planned them are backfilled). Read `.claude/skills/author-unit/references/figure-prompts.md` and model the banner on `specs/content/efmp-304/figures/unit-02.banner.md`. Write `specs/content/gpks-402/figures/unit-06.banner.md` with one 16:9 banner row for the unit index (next free figure ID, Kind illustration, Status prompt-only). Then add one illustration scene per topic for its "A real classroom situation", unless the scene would only decorate: a `FIGURE[...]` marker in the English topic file and a matching prompt-only row in `figures/unit-06.md`. Every prompt is a complete brief for a scene that teaches the unit's point: a Sindh school or classroom, Pakistani dress, no text, maps, flags or emblems, and never a prophet, companion, angel or other sacred person, nor scripture or calligraphy (this matters most for Islamic studies and Qur'an courses: show teachers and pupils learning, not sacred figures). Alt text describes what the image will show. Do not generate, place or draw any image and do not touch other figures: the illustrate job produces and places these rows.

## Scope
GPKS-402 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gpks-402/`, and `static/img/figures/gpks-402/unit-06/`.

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
- (gpks-402-u06-repair_en-r1, repair_en, agy) F01 author-run provenance and F08 rendered narrow/A4 evidence remain host-supplied; G3 stays open under ADR-0019.
- (gpks-402-u06-repair_en-r1, repair_en, agy) A fresh independent G3 review of Unit 6 is needed before the unit can be ticked; refreshed G2 gate evidence is at [20261110T062724508Z-gates.json](file:///home/a2ahs/crew-wt/gpks-402-u06-repair_en-r1/specs/content/gpks-402/reviews/unit-06/G2/20261110T062724508Z-gates.json).
- (gpks-402-u06-repair_en-r1, repair_en, agy) No Urdu mirror exists yet for Unit 6, so Urdu translation remains a separate job.
- (gpks-402-u06-repair_en-conflict1, fix, opencode) F01 (author-run provenance) and F08 (rendered narrow/A4 evidence) remain host-supplied; G3 stays open under ADR-0019.
- (gpks-402-u06-repair_en-conflict1, fix, opencode) No Urdu mirror exists for Unit 6, so translation remains a separate job.


## Response snapshot

Planned prompt-only raster illustrations for GPKS-402 Unit 6 (banner `fig-U6-7` in a new `unit-06.banner.md` plus classroom scenes `fig-U6-8` to `fig-U6-10` with English topic markers and manifest rows), refreshed G2 evidence, and all content gates pass.

## Outcome

- Impact: plan_illustrations for GPKS-402 Unit 6 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 15 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Planned prompt-only raster illustrations for GPKS-402 Unit 6 (banner `fig-U6-7` in a new `unit-06.banner.md` plus classroom scenes `fig-U6-8` to `fig-U6-10` with English topic markers and manifest rows), refreshed G2 evidence, and all content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - There is no Urdu mirror for Unit 6, so the markers `fig-U6-8` to `fig-U6-10` are in the English topic files only. The translation job must copy the same marker IDs into its Urdu topic files.
  - The illustrate job should check that the regional cloth in `fig-U6-10` and the goods in `fig-U6-8`/`fig-U6-9` come out with no readable lettering or brand marks.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
