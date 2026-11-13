---
id: crew-efmp-305-u06-plan_illustrations
title: crew plan_illustrations EFMP-305 unit 6
stage: misc
date: 2026-11-13
surface: agent
model: claude
feature: efmp-305
branch: crew/efmp-305-u06-plan_illustrations
user: crew
command: crew plan_illustrations
labels: ["crew", "claude", "plan_illustrations"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/efmp-305/unit-06/topic-01.mdx
 - docs/semester-2/efmp-305/unit-06/topic-02.mdx
 - docs/semester-2/efmp-305/unit-06/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-06/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-06/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-06/topic-03.mdx
 - specs/content/efmp-305/figures/unit-06.banner.md
 - specs/content/efmp-305/figures/unit-06.md
 - specs/content/efmp-305/reviews/unit-06/G2/20261113T063338173Z-gates.json
 - specs/content/efmp-305/reviews/unit-06/G2/logs-20261113T063338173Z/check-bloom-bands.txt
 - specs/content/efmp-305/reviews/unit-06/G2/logs-20261113T063338173Z/check-concept-graph.txt
 - specs/content/efmp-305/reviews/unit-06/G2/logs-20261113T063338173Z/check-depth-gate.txt
 - specs/content/efmp-305/reviews/unit-06/G2/logs-20261113T063338173Z/check-docs-sync.txt
 - specs/content/efmp-305/reviews/unit-06/G2/logs-20261113T063338173Z/check-figures.txt
 - specs/content/efmp-305/reviews/unit-06/G2/logs-20261113T063338173Z/check-no-answer-keys.txt
 - specs/content/efmp-305/reviews/unit-06/G2/logs-20261113T063338173Z/check-no-em-dash.txt
 - specs/content/efmp-305/reviews/unit-06/G2/logs-20261113T063338173Z/validate-content.txt
 - specs/content/efmp-305/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-305-u06-plan_illustrations

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-305-u06-plan_illustrations`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Plan the raster images for EFMP-305 Unit 6 (ADR-0029 point 5; owner ruling 2026-11-09: units authored before the author-unit skill planned them are backfilled). Read `.claude/skills/author-unit/references/figure-prompts.md` and model the banner on `specs/content/efmp-304/figures/unit-02.banner.md`. Write `specs/content/efmp-305/figures/unit-06.banner.md` with one 16:9 banner row for the unit index (next free figure ID, Kind illustration, Status prompt-only). Then add one illustration scene per topic for its "A real classroom situation", unless the scene would only decorate: a `FIGURE[...]` marker in the English topic file and a matching prompt-only row in `figures/unit-06.md`. Every prompt is a complete brief for a scene that teaches the unit's point: a Sindh school or classroom, Pakistani dress, no text, maps, flags or emblems, and never a prophet, companion, angel or other sacred person, nor scripture or calligraphy (this matters most for Islamic studies and Qur'an courses: show teachers and pupils learning, not sacred figures). Alt text describes what the image will show. Do not generate, place or draw any image and do not touch other figures: the illustrate job produces and places these rows.

## Scope
EFMP-305 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-305/`, and `static/img/figures/efmp-305/unit-06/`.

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
- (efmp-305-u06-repair_en-r1, repair_en, opencode) The shared source records `specs/content/efmp-305/sources/texts/unicef2014.md` and `sources/unit-06.md` stay unchanged because Unit 1 and Unit 6 G2 evidence binds them; editing them requires `node scripts/prepare-gate-evidence.mjs --refresh-stale` after committing.
- (efmp-305-u06-repair_en-r1, repair_en, opencode) The 20261108 report's `input_manifest` predates commit `24d5f43d7`, so its 193-minute depth finding does not reproduce against current bytes (total 149).
- (efmp-305-u06-repair_en-r1, repair_en, opencode) G3 stays unticked; fresh independent review, G5, and rendered Urdu inspection remain pending from earlier jobs.
- (efmp-305-u06-repair_en-conflict1, fix, opencode) Fresh checkouts need `npm run build:content-status` before `npm run check:content` (the report is gitignored).
- (efmp-305-u06-repair_en-conflict1, fix, opencode) G3 remains unticked pending fresh independent review; Urdu translation remains draft pending independent G5 and fresh rendered inspection.


## Response snapshot

Planned EFMP-305 Unit 6 raster illustrations (banner fig-U6-7 plus prompt-only classroom scenes fig-U6-8, fig-U6-9 and fig-U6-10 with EN/UR markers and manifest rows) and refreshed the Unit 6 G2 evidence and tracker row.

## Outcome

- Impact: plan_illustrations for EFMP-305 Unit 6 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 18 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Planned EFMP-305 Unit 6 raster illustrations (banner fig-U6-7 plus prompt-only classroom scenes fig-U6-8, fig-U6-9 and fig-U6-10 with EN/UR markers and manifest rows) and refreshed the Unit 6 G2 evidence and tracker row.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - fig-U6-7 to fig-U6-10 are prompt-only. The illustrate job must generate, inspect and place them and swap the three topic markers (EN+UR) for `<Figure>`, which will make the Unit 6 G2 evidence stale again.
  - The 6.3 scene prompt deliberately leaves out the key-word blackboard corner that the prose describes, so the image has no text; keep it that way when generating.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
