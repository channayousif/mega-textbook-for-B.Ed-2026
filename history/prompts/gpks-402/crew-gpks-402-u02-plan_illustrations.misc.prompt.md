---
id: crew-gpks-402-u02-plan_illustrations
title: crew plan_illustrations GPKS-402 unit 2
stage: misc
date: 2026-11-14
surface: agent
model: claude
feature: gpks-402
branch: crew/gpks-402-u02-plan_illustrations
user: crew
command: crew plan_illustrations
labels: ["crew", "claude", "plan_illustrations"]
links:
  spec: specs/content/gpks-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gpks-402/unit-02/topic-01.mdx
 - docs/semester-2/gpks-402/unit-02/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-02/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-02/topic-02.mdx
 - specs/content/gpks-402/figures/unit-02.banner.md
 - specs/content/gpks-402/figures/unit-02.md
 - specs/content/gpks-402/reviews/unit-02/G2/20261114T141748674Z-gates.json
 - specs/content/gpks-402/reviews/unit-02/G2/logs-20261114T141748674Z/check-bloom-bands.txt
 - specs/content/gpks-402/reviews/unit-02/G2/logs-20261114T141748674Z/check-concept-graph.txt
 - specs/content/gpks-402/reviews/unit-02/G2/logs-20261114T141748674Z/check-depth-gate.txt
 - specs/content/gpks-402/reviews/unit-02/G2/logs-20261114T141748674Z/check-docs-sync.txt
 - specs/content/gpks-402/reviews/unit-02/G2/logs-20261114T141748674Z/check-figures.txt
 - specs/content/gpks-402/reviews/unit-02/G2/logs-20261114T141748674Z/check-no-answer-keys.txt
 - specs/content/gpks-402/reviews/unit-02/G2/logs-20261114T141748674Z/check-no-em-dash.txt
 - specs/content/gpks-402/reviews/unit-02/G2/logs-20261114T141748674Z/validate-content.txt
 - specs/content/gpks-402/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gpks-402-u02-plan_illustrations

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gpks-402-u02-plan_illustrations`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Plan the raster images for GPKS-402 Unit 2 (ADR-0029 point 5; owner ruling 2026-11-09: units authored before the author-unit skill planned them are backfilled). Read `.claude/skills/author-unit/references/figure-prompts.md` and model the banner on `specs/content/efmp-304/figures/unit-02.banner.md`. Write `specs/content/gpks-402/figures/unit-02.banner.md` with one 16:9 banner row for the unit index (next free figure ID, Kind illustration, Status prompt-only). Then add one illustration scene per topic for its "A real classroom situation", unless the scene would only decorate: a `FIGURE[...]` marker in the English topic file and a matching prompt-only row in `figures/unit-02.md`. Every prompt is a complete brief for a scene that teaches the unit's point: a Sindh school or classroom, Pakistani dress, no text, maps, flags or emblems, and never a prophet, companion, angel or other sacred person, nor scripture or calligraphy (this matters most for Islamic studies and Qur'an courses: show teachers and pupils learning, not sacred figures). Alt text describes what the image will show. Do not generate, place or draw any image and do not touch other figures: the illustrate job produces and places these rows.

## Scope
GPKS-402 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gpks-402/`, and `static/img/figures/gpks-402/unit-02/`.

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
- (gpks-402-u02-repair_en-r1, repair_en, opencode) G5 should read the new Urdu uncorroborated-source disclosures in topic-01/topic-02 for natural academic register.
- (gpks-402-u02-repair_en-r1, repair_en, opencode) G3 stays open; provenance, rendered accessibility and solve-before-key still need a fresh reviewer (ADR-0019).
- (gpks-402-u02-repair_en-r1, repair_en, opencode) G2 gate evidence refreshed at 20261110T051752668Z after the English edits; all 14 content gates pass.
- (gpks-402-u02-repair_en, repair_en, agy) GPKS-402 Unit 2 G2 gate evidence refreshed and all 14 content gates pass; ready for fresh independent G3 English review followed by G5 Urdu review.
- (gpks-402-u02-review_en, review_en, codex) Repair recorded assessment and chronology defects, then obtain fresh review with verified sources, provenance and screen/print inspection.


## Response snapshot

Planned GPKS-402 Unit 2 raster illustrations as prompt-only rows (banner fig-U2-5 in a new unit-02.banner.md, classroom scenes fig-U2-6 and fig-U2-7 as EN/UR markers and manifest rows) and refreshed the unit's G2 evidence, with all 14 content gates passing.

## Outcome

- Impact: plan_illustrations for GPKS-402 Unit 2 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 16 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Planned GPKS-402 Unit 2 raster illustrations as prompt-only rows (banner fig-U2-5 in a new unit-02.banner.md, classroom scenes fig-U2-6 and fig-U2-7 as EN/UR markers and manifest rows) and refreshed the unit's G2 evidence, with all 14 content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - fig-U2-5 (banner), fig-U2-6 and fig-U2-7 are prompt-only; the illustrate job should check that history scenes show no recognisable leader likenesses and that the picture cards and timeline strip come out without readable text.
  - Unit 2 G2 evidence was refreshed to 20261114T141748674Z; G3 and G5 remain open as before.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
