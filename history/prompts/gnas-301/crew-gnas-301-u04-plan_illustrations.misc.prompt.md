---
id: crew-gnas-301-u04-plan_illustrations
title: crew plan_illustrations GNAS-301 unit 4
stage: misc
date: 2026-11-14
surface: agent
model: claude
feature: gnas-301
branch: crew/gnas-301-u04-plan_illustrations
user: crew
command: crew plan_illustrations
labels: ["crew", "claude", "plan_illustrations"]
links:
  spec: specs/content/gnas-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-1/gnas-301/unit-04/topic-01.mdx
 - docs/semester-1/gnas-301/unit-04/topic-02.mdx
 - docs/semester-1/gnas-301/unit-04/topic-03.mdx
 - docs/semester-1/gnas-301/unit-04/topic-04.mdx
 - docs/semester-1/gnas-301/unit-04/topic-05.mdx
 - docs/semester-1/gnas-301/unit-04/topic-06.mdx
 - docs/semester-1/gnas-301/unit-04/topic-07.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-04/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-04/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-04/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-04/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-04/topic-05.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-04/topic-06.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-04/topic-07.mdx
 - specs/content/gnas-301/figures/unit-04.banner.md
 - specs/content/gnas-301/figures/unit-04.md
 - specs/content/gnas-301/reviews/unit-04/G2/20261114T120419100Z-gates.json
 - specs/content/gnas-301/reviews/unit-04/G2/logs-20261114T120419100Z/check-bloom-bands.txt
 - specs/content/gnas-301/reviews/unit-04/G2/logs-20261114T120419100Z/check-concept-graph.txt
 - specs/content/gnas-301/reviews/unit-04/G2/logs-20261114T120419100Z/check-depth-gate.txt
 - specs/content/gnas-301/reviews/unit-04/G2/logs-20261114T120419100Z/check-docs-sync.txt
 - specs/content/gnas-301/reviews/unit-04/G2/logs-20261114T120419100Z/check-figures.txt
 - specs/content/gnas-301/reviews/unit-04/G2/logs-20261114T120419100Z/check-no-answer-keys.txt
 - specs/content/gnas-301/reviews/unit-04/G2/logs-20261114T120419100Z/check-no-em-dash.txt
 - specs/content/gnas-301/reviews/unit-04/G2/logs-20261114T120419100Z/validate-content.txt
 - specs/content/gnas-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gnas-301-u04-plan_illustrations

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gnas-301-u04-plan_illustrations`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Plan the raster images for GNAS-301 Unit 4 (ADR-0029 point 5; owner ruling 2026-11-09: units authored before the author-unit skill planned them are backfilled). Read `.claude/skills/author-unit/references/figure-prompts.md` and model the banner on `specs/content/efmp-304/figures/unit-02.banner.md`. Write `specs/content/gnas-301/figures/unit-04.banner.md` with one 16:9 banner row for the unit index (next free figure ID, Kind illustration, Status prompt-only). Then add one illustration scene per topic for its "A real classroom situation", unless the scene would only decorate: a `FIGURE[...]` marker in the English topic file and a matching prompt-only row in `figures/unit-04.md`. Every prompt is a complete brief for a scene that teaches the unit's point: a Sindh school or classroom, Pakistani dress, no text, maps, flags or emblems, and never a prophet, companion, angel or other sacred person, nor scripture or calligraphy (this matters most for Islamic studies and Qur'an courses: show teachers and pupils learning, not sacred figures). Alt text describes what the image will show. Do not generate, place or draw any image and do not touch other figures: the illustrate job produces and places these rows.

## Scope
GNAS-301 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gnas-301/`, and `static/img/figures/gnas-301/unit-04/`.

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
- (gnas-301-u04-repair_en-r1-conflict2, fix, opencode) `static/content-status.json` is gitignored and was regenerated locally after the merge; CI regenerates it via `prestart`, so no commit was needed.
- (gnas-301-u04-repair_en-r1-conflict2, fix, opencode) G3 remains open pending owner authorization; live mobile and A4 print inspection remains outstanding.
- (gnas-301-u04-repair_en-r1-conflict1, fix, codex) G3 remains open pending owner authorization; live mobile and A4 print inspection remains outstanding.
- (gnas-301-u04-repair_en-r1-conflict1, fix, codex) G3 remains open pending owner authorization; live mobile and A4 print inspection remains outstanding.
- (gnas-301-u04-repair_en-r1, repair_en, agy) G3 remains unticked; third review cycle requires owner authorization under G-2026-31.


## Response snapshot

Planned prompt-only raster illustrations for GNAS-301 Unit 4 (banner fig-U4-15 plus topic scenes fig-U4-16..22 as EN/UR markers and manifest rows) and refreshed its G2 evidence so all 14 content gates pass.

## Outcome

- Impact: plan_illustrations for GNAS-301 Unit 4 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 26 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Planned prompt-only raster illustrations for GNAS-301 Unit 4 (banner fig-U4-15 plus topic scenes fig-U4-16..22 as EN/UR markers and manifest rows) and refreshed its G2 evidence so all 14 content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The fig-U4-16, -18, -19 and -20 prompts don't name a Sindh city because their prose is set in Faisalabad or Lahore. An owner or author decides whether to re-set the prose in Sindh.
  - After placing fig-U4-15 to fig-U4-22, rerun `prepare-gate-evidence.mjs GNAS-301 4` and repoint the Unit 4 G2 row in `tasks.md`. When inspecting, check that the fig-U4-18 rules sheet and the fig-U4-20 notebook carry no readable text.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
