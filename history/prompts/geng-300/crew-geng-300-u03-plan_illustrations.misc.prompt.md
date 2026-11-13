---
id: crew-geng-300-u03-plan_illustrations
title: crew plan_illustrations GENG-300 unit 3
stage: misc
date: 2026-11-13
surface: agent
model: claude
feature: geng-300
branch: crew/geng-300-u03-plan_illustrations
user: crew
command: crew plan_illustrations
labels: ["crew", "claude", "plan_illustrations"]
links:
  spec: specs/content/geng-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-1/geng-300/unit-03/topic-01.mdx
 - docs/semester-1/geng-300/unit-03/topic-02.mdx
 - docs/semester-1/geng-300/unit-03/topic-03.mdx
 - specs/content/geng-300/figures/unit-03.banner.md
 - specs/content/geng-300/figures/unit-03.md
 - specs/content/geng-300/reviews/unit-03/G2/20261113T161840992Z-gates.json
 - specs/content/geng-300/reviews/unit-03/G2/logs-20261113T161840992Z/check-bloom-bands.txt
 - specs/content/geng-300/reviews/unit-03/G2/logs-20261113T161840992Z/check-concept-graph.txt
 - specs/content/geng-300/reviews/unit-03/G2/logs-20261113T161840992Z/check-depth-gate.txt
 - specs/content/geng-300/reviews/unit-03/G2/logs-20261113T161840992Z/check-docs-sync.txt
 - specs/content/geng-300/reviews/unit-03/G2/logs-20261113T161840992Z/check-figures.txt
 - specs/content/geng-300/reviews/unit-03/G2/logs-20261113T161840992Z/check-no-answer-keys.txt
 - specs/content/geng-300/reviews/unit-03/G2/logs-20261113T161840992Z/check-no-em-dash.txt
 - specs/content/geng-300/reviews/unit-03/G2/logs-20261113T161840992Z/validate-content.txt
 - specs/content/geng-300/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job geng-300-u03-plan_illustrations

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-300-u03-plan_illustrations`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Plan the raster images for GENG-300 Unit 3 (ADR-0029 point 5; owner ruling 2026-11-09: units authored before the author-unit skill planned them are backfilled). Read `.claude/skills/author-unit/references/figure-prompts.md` and model the banner on `specs/content/efmp-304/figures/unit-02.banner.md`. Write `specs/content/geng-300/figures/unit-03.banner.md` with one 16:9 banner row for the unit index (next free figure ID, Kind illustration, Status prompt-only). Then add one illustration scene per topic for its "A real classroom situation", unless the scene would only decorate: a `FIGURE[...]` marker in the English topic file and a matching prompt-only row in `figures/unit-03.md`. Every prompt is a complete brief for a scene that teaches the unit's point: a Sindh school or classroom, Pakistani dress, no text, maps, flags or emblems, and never a prophet, companion, angel or other sacred person, nor scripture or calligraphy (this matters most for Islamic studies and Qur'an courses: show teachers and pupils learning, not sacred figures). Alt text describes what the image will show. Do not generate, place or draw any image and do not touch other figures: the illustrate job produces and places these rows.

## Scope
GENG-300 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/geng-300/`, and `static/img/figures/geng-300/unit-03/`.

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
- (geng-300-u03-repair_en-r1, repair_en, opencode) All three G3 findings are owner/render-host handoff, not author-repairable; G3 stays unticked.
- (geng-300-u03-repair_en-r1, repair_en, opencode) The duplicate D-2026-0019 entries cited by the report are gone from specs/decisions/log.md, but the three-vs-four-unit authority conflict and the intake Partition D-2026-00XX placeholder remain open for the owner.
- (geng-300-u03-repair_en-r1, repair_en, opencode) Fresh independent G3 needs owner authorisation under ADR-0019 (cycle limit).
- (geng-300-u03-repair_en-conflict2, fix, opencode) check:content-status reads the git-ignored static/content-status.json; regenerate it with `npm run build:content-status` in a fresh worktree before judging that gate.
- (geng-300-u03-repair_en-conflict2, fix, opencode) Unit 3 G3 stays unticked; all three desk findings are owner/render-host handoff, not author-repairable.


## Response snapshot

Planned GENG-300 Unit 3 raster images (banner fig-U3-8 plus topic scenes fig-U3-9 to fig-U3-11, all prompt-only, with English topic markers and manifest rows) and refreshed the unit's G2 evidence so check:content passes.

## Outcome

- Impact: plan_illustrations for GENG-300 Unit 3 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 15 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Planned GENG-300 Unit 3 raster images (banner fig-U3-8 plus topic scenes fig-U3-9 to fig-U3-11, all prompt-only, with English topic markers and manifest rows) and refreshed the unit's G2 evidence so check:content passes.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The banner row is in `specs/content/geng-300/figures/unit-03.banner.md`; generate it with `scripts/generate-illustration.mjs geng-300 3 --banner`.
  - The topic markers fig-U3-9 to fig-U3-11 are in English topic files only. The Urdu mirrors have none yet, and any later edit to these markers makes the Unit 3 G2 evidence stale again.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
