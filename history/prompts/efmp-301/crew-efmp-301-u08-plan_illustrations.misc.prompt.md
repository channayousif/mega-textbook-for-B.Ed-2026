---
id: crew-efmp-301-u08-plan_illustrations
title: crew plan_illustrations EFMP-301 unit 8
stage: misc
date: 2026-11-13
surface: agent
model: claude
feature: efmp-301
branch: crew/efmp-301-u08-plan_illustrations
user: crew
command: crew plan_illustrations
labels: ["crew", "claude", "plan_illustrations"]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-1/efmp-301/unit-08/topic-01.mdx
 - docs/semester-1/efmp-301/unit-08/topic-02.mdx
 - docs/semester-1/efmp-301/unit-08/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-08/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-08/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-08/topic-03.mdx
 - specs/content/efmp-301/figures/unit-08.banner.md
 - specs/content/efmp-301/figures/unit-08.md
 - specs/content/efmp-301/reviews/unit-08/G2/20261113T000300821Z-gates.json
 - specs/content/efmp-301/reviews/unit-08/G2/logs-20261113T000300821Z/check-bloom-bands.txt
 - specs/content/efmp-301/reviews/unit-08/G2/logs-20261113T000300821Z/check-concept-graph.txt
 - specs/content/efmp-301/reviews/unit-08/G2/logs-20261113T000300821Z/check-depth-gate.txt
 - specs/content/efmp-301/reviews/unit-08/G2/logs-20261113T000300821Z/check-docs-sync.txt
 - specs/content/efmp-301/reviews/unit-08/G2/logs-20261113T000300821Z/check-figures.txt
 - specs/content/efmp-301/reviews/unit-08/G2/logs-20261113T000300821Z/check-no-answer-keys.txt
 - specs/content/efmp-301/reviews/unit-08/G2/logs-20261113T000300821Z/check-no-em-dash.txt
 - specs/content/efmp-301/reviews/unit-08/G2/logs-20261113T000300821Z/validate-content.txt
 - specs/content/efmp-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-301-u08-plan_illustrations

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-301-u08-plan_illustrations`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Plan the raster images for EFMP-301 Unit 8 (ADR-0029 point 5; owner ruling 2026-11-09: units authored before the author-unit skill planned them are backfilled). Read `.claude/skills/author-unit/references/figure-prompts.md` and model the banner on `specs/content/efmp-304/figures/unit-02.banner.md`. Write `specs/content/efmp-301/figures/unit-08.banner.md` with one 16:9 banner row for the unit index (next free figure ID, Kind illustration, Status prompt-only). Then add one illustration scene per topic for its "A real classroom situation", unless the scene would only decorate: a `FIGURE[...]` marker in the English topic file and a matching prompt-only row in `figures/unit-08.md`. Every prompt is a complete brief for a scene that teaches the unit's point: a Sindh school or classroom, Pakistani dress, no text, maps, flags or emblems, and never a prophet, companion, angel or other sacred person, nor scripture or calligraphy (this matters most for Islamic studies and Qur'an courses: show teachers and pupils learning, not sacred figures). Alt text describes what the image will show. Do not generate, place or draw any image and do not touch other figures: the illustrate job produces and places these rows.

## Scope
EFMP-301 Unit 8 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-301/`, and `static/img/figures/efmp-301/unit-08/`.

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
- (efmp-301-u08-repair_en-r1, repair_en, opencode) The 20261108 desk report's findings array is byte-identical to the 20261102 report already repaired at 44e895fb; the desk pipeline re-issues prior findings under a fresh manifest, so verify current bytes before editing.
- (efmp-301-u08-repair_en-r1, repair_en, opencode) Owner still owes narrow-screen/A4 render evidence and a parent-prepared frozen handoff (ADR-0019 cycles exhausted); the Urdu "کاؤنٹرائزنگ" mistranslation for "management" needs a G5/translation job.
- (efmp-301-u08-repair_en-conflict3, fix, opencode) `check:content-status` fails on both branches because the gitignored `static/content-status.json` is stale/missing; CI regenerates it before checking, so it is a separate fix job.
- (efmp-301-u08-repair_en-conflict3, fix, opencode) Urdu Unit 8 still carries the "کاؤنٹرائزنگ" mistranslation for "management" and the narrow-screen/A4 render check is uninspected; both need a G5/translation or owner job.
- (efmp-301-u08-repair_en-conflict3, fix, opencode) The merge auto-resolved main's newer Unit 5/Unit 9 G2 evidence rows over the branch's older ones (same unit/stage, updated gates); expected, not a lost entry.


## Response snapshot

Planned the EFMP-301 Unit 8 banner (fig-U8-7) and one prompt-only classroom illustration per topic (fig-U8-8..10) with English and Urdu markers and manifest rows, and refreshed the Unit 8 G2 evidence so check:content passes.

## Outcome

- Impact: plan_illustrations for EFMP-301 Unit 8 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 18 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Planned the EFMP-301 Unit 8 banner (fig-U8-7) and one prompt-only classroom illustration per topic (fig-U8-8..10) with English and Urdu markers and manifest rows, and refreshed the Unit 8 G2 evidence so check:content passes.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The illustrate job should produce `fig-U8-7` (banner, `--banner`) and `fig-U8-8`..`fig-U8-10` (topics 8.1, 8.2, 8.3); the Urdu topic files already carry the same markers.
  - `tasks.md` has two Unit 8 G2 rows (lines 75 and 149). The gate reads only the last one, now pointing to `20261113T000300821Z`; any further Unit 8 edit makes it stale again (rerun `npm run gates:evidence -- EFMP-301 8` after committing).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
