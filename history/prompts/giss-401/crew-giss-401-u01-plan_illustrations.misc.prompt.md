---
id: crew-giss-401-u01-plan_illustrations
title: crew plan_illustrations GISS-401 unit 1
stage: misc
date: 2026-11-14
surface: agent
model: claude
feature: giss-401
branch: crew/giss-401-u01-plan_illustrations
user: crew
command: crew plan_illustrations
labels: ["crew", "claude", "plan_illustrations"]
links:
  spec: specs/content/giss-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/giss-401/unit-01/topic-01.mdx
 - docs/semester-3/giss-401/unit-01/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-01/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-01/topic-02.mdx
 - specs/content/giss-401/figures/unit-01.banner.md
 - specs/content/giss-401/figures/unit-01.md
 - specs/content/giss-401/reviews/unit-01/G2/20261114T021742980Z-gates.json
 - specs/content/giss-401/reviews/unit-01/G2/logs-20261114T021742980Z/check-bloom-bands.txt
 - specs/content/giss-401/reviews/unit-01/G2/logs-20261114T021742980Z/check-concept-graph.txt
 - specs/content/giss-401/reviews/unit-01/G2/logs-20261114T021742980Z/check-depth-gate.txt
 - specs/content/giss-401/reviews/unit-01/G2/logs-20261114T021742980Z/check-docs-sync.txt
 - specs/content/giss-401/reviews/unit-01/G2/logs-20261114T021742980Z/check-figures.txt
 - specs/content/giss-401/reviews/unit-01/G2/logs-20261114T021742980Z/check-no-answer-keys.txt
 - specs/content/giss-401/reviews/unit-01/G2/logs-20261114T021742980Z/check-no-em-dash.txt
 - specs/content/giss-401/reviews/unit-01/G2/logs-20261114T021742980Z/validate-content.txt
 - specs/content/giss-401/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job giss-401-u01-plan_illustrations

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/giss-401-u01-plan_illustrations`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Plan the raster images for GISS-401 Unit 1 (ADR-0029 point 5; owner ruling 2026-11-09: units authored before the author-unit skill planned them are backfilled). Read `.claude/skills/author-unit/references/figure-prompts.md` and model the banner on `specs/content/efmp-304/figures/unit-02.banner.md`. Write `specs/content/giss-401/figures/unit-01.banner.md` with one 16:9 banner row for the unit index (next free figure ID, Kind illustration, Status prompt-only). Then add one illustration scene per topic for its "A real classroom situation", unless the scene would only decorate: a `FIGURE[...]` marker in the English topic file and a matching prompt-only row in `figures/unit-01.md`. Every prompt is a complete brief for a scene that teaches the unit's point: a Sindh school or classroom, Pakistani dress, no text, maps, flags or emblems, and never a prophet, companion, angel or other sacred person, nor scripture or calligraphy (this matters most for Islamic studies and Qur'an courses: show teachers and pupils learning, not sacred figures). Alt text describes what the image will show. Do not generate, place or draw any image and do not touch other figures: the illustrate job produces and places these rows.

## Scope
GISS-401 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/giss-401/`, and `static/img/figures/giss-401/unit-01/`.

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
- (giss-401-u01-translate, translate, codex) Status remains draft; tracker rows remain open per the skill. Browser geometry, RTL/print inspection and independent G5 review remain pending.
- (giss-401-u01-translate, translate, codex) Status remains draft; tracker rows remain open per the skill. Browser geometry, RTL/print inspection and independent G5 review remain pending.
- (giss-401-u01-review_en-conflict1, fix, opencode) The merge keeps main's newer Unit 1 G2 gates file (20261103T002225035Z); the branch's older 20261102T230118463Z file is no longer the tracker reference.
- (giss-401-u01-review_en-conflict1, fix, opencode) Unit 1 G3 remains open (▢) and unsigned pending qualified Islamic Studies sign-off; Unit 4 arrived from main with its own G3 pending.
- (giss-401-u01-review_en-conflict1, fix, opencode) Unit 1's four SVGs have never been measured by measure-figure-text; CI figure-geometry may flag them, so G6 stays ▣.


## Response snapshot

Planned GISS-401 Unit 1 raster illustrations (prompt-only banner fig-U1-5 plus topic classroom scenes fig-U1-6 and fig-U1-7 as markers and manifest rows) and refreshed the Unit 1 G2 evidence so check:content passes.

## Outcome

- Impact: plan_illustrations for GISS-401 Unit 1 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 16 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Planned GISS-401 Unit 1 raster illustrations (prompt-only banner fig-U1-5 plus topic classroom scenes fig-U1-6 and fig-U1-7 as markers and manifest rows) and refreshed the Unit 1 G2 evidence so check:content passes.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Placing fig-U1-5..7 changes the bound topic and manifest files, so the illustrate job must rerun `node scripts/prepare-gate-evidence.mjs GISS-401 1` and update the Unit 1 G2 row in tasks.md.
  - The Urdu topic files carry English FIGURE markers for fig-U1-6/7; when placing, mirror the `<Figure>` into the Urdu files and translate the alt text.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
