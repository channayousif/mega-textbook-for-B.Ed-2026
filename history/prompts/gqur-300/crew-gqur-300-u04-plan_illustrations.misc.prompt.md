---
id: crew-gqur-300-u04-plan_illustrations
title: crew plan_illustrations GQUR-300 unit 4
stage: misc
date: 2026-11-14
surface: agent
model: claude
feature: gqur-300
branch: crew/gqur-300-u04-plan_illustrations
user: crew
command: crew plan_illustrations
labels: ["crew", "claude", "plan_illustrations"]
links:
  spec: specs/content/gqur-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-1/gqur-300/unit-04/topic-01.mdx
 - docs/semester-1/gqur-300/unit-04/topic-02.mdx
 - docs/semester-1/gqur-300/unit-04/topic-03.mdx
 - specs/content/gqur-300/figures/unit-04.banner.md
 - specs/content/gqur-300/figures/unit-04.md
 - specs/content/gqur-300/reviews/unit-04/G2/20261114T174730328Z-gates.json
 - specs/content/gqur-300/reviews/unit-04/G2/logs-20261114T174730328Z/check-bloom-bands.txt
 - specs/content/gqur-300/reviews/unit-04/G2/logs-20261114T174730328Z/check-concept-graph.txt
 - specs/content/gqur-300/reviews/unit-04/G2/logs-20261114T174730328Z/check-depth-gate.txt
 - specs/content/gqur-300/reviews/unit-04/G2/logs-20261114T174730328Z/check-docs-sync.txt
 - specs/content/gqur-300/reviews/unit-04/G2/logs-20261114T174730328Z/check-figures.txt
 - specs/content/gqur-300/reviews/unit-04/G2/logs-20261114T174730328Z/check-no-answer-keys.txt
 - specs/content/gqur-300/reviews/unit-04/G2/logs-20261114T174730328Z/check-no-em-dash.txt
 - specs/content/gqur-300/reviews/unit-04/G2/logs-20261114T174730328Z/validate-content.txt
 - specs/content/gqur-300/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-300-u04-plan_illustrations

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-300-u04-plan_illustrations`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Plan the raster images for GQUR-300 Unit 4 (ADR-0029 point 5; owner ruling 2026-11-09: units authored before the author-unit skill planned them are backfilled). Read `.claude/skills/author-unit/references/figure-prompts.md` and model the banner on `specs/content/efmp-304/figures/unit-02.banner.md`. Write `specs/content/gqur-300/figures/unit-04.banner.md` with one 16:9 banner row for the unit index (next free figure ID, Kind illustration, Status prompt-only). Then add one illustration scene per topic for its "A real classroom situation", unless the scene would only decorate: a `FIGURE[...]` marker in the English topic file and a matching prompt-only row in `figures/unit-04.md`. Every prompt is a complete brief for a scene that teaches the unit's point: a Sindh school or classroom, Pakistani dress, no text, maps, flags or emblems, and never a prophet, companion, angel or other sacred person, nor scripture or calligraphy (this matters most for Islamic studies and Qur'an courses: show teachers and pupils learning, not sacred figures). Alt text describes what the image will show. Do not generate, place or draw any image and do not touch other figures: the illustrate job produces and places these rows.

## Scope
GQUR-300 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-300/`, and `static/img/figures/gqur-300/unit-04/`.

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
- (gqur-300-u04-repair_en-r1, repair_en, opencode) The Nov 8 G3 report's input-manifest hashes for the unit files do not match origin/main, so its findings were carried forward from the pre-repair state; a fresh G3 run against the committed bytes is needed before acceptance.
- (gqur-300-u04-repair_en-r1, repair_en, opencode) `glossary.json` (repo root) is outside this brief's scope, so Length/Mass/Capacity remain unbanked; the pipeline gate would fail if `<Glossary>` wrappers were added before the entries exist.
- (gqur-300-u04-repair_en, repair_en, codex) Owner follow-ups remain for source support, shared glossary entries, current renders, fresh blind assessment verification and review provenance.
- (gqur-300-u04-repair_en, repair_en, codex) Owner follow-ups remain for source support, shared glossary entries, current renders, fresh blind assessment verification and review provenance.
- (gqur-300-u04-review_en, review_en, codex) Owner must resolve assessment and source-support concerns; current renders and a fresh blind solve remain pending. G3 stays open.


## Response snapshot

Added a prompt-only 16:9 banner row (fig-U4-7) and one classroom-situation illustration marker and manifest row per topic (fig-U4-8 to fig-U4-10) for GQUR-300 Unit 4, and refreshed its G2 gate evidence.

## Outcome

- Impact: plan_illustrations for GQUR-300 Unit 4 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 15 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Added a prompt-only 16:9 banner row (fig-U4-7) and one classroom-situation illustration marker and manifest row per topic (fig-U4-8 to fig-U4-10) for GQUR-300 Unit 4, and refreshed its G2 gate evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The Urdu topic files don't have the new fig-U4-8 to fig-U4-10 markers yet; the illustrate job should add them when it places the images.
  - The 4.1 scene follows the prose, so it is set in a Hyderabad fabric shop, not a classroom.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
