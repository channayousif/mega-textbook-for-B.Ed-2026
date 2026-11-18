---
id: crew-efmp-301-u09-plan_illustrations
title: crew plan_illustrations EFMP-301 unit 9
stage: misc
date: 2026-11-13
surface: agent
model: claude
feature: efmp-301
branch: crew/efmp-301-u09-plan_illustrations
user: crew
command: crew plan_illustrations
labels: ["crew", "claude", "plan_illustrations"]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-1/efmp-301/unit-09/topic-01.mdx
 - docs/semester-1/efmp-301/unit-09/topic-02.mdx
 - docs/semester-1/efmp-301/unit-09/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-09/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-09/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-09/topic-03.mdx
 - specs/content/efmp-301/figures/unit-09.banner.md
 - specs/content/efmp-301/figures/unit-09.md
 - specs/content/efmp-301/reviews/unit-09/G2/20261113T001804900Z-gates.json
 - specs/content/efmp-301/reviews/unit-09/G2/logs-20261113T001804900Z/check-bloom-bands.txt
 - specs/content/efmp-301/reviews/unit-09/G2/logs-20261113T001804900Z/check-concept-graph.txt
 - specs/content/efmp-301/reviews/unit-09/G2/logs-20261113T001804900Z/check-depth-gate.txt
 - specs/content/efmp-301/reviews/unit-09/G2/logs-20261113T001804900Z/check-docs-sync.txt
 - specs/content/efmp-301/reviews/unit-09/G2/logs-20261113T001804900Z/check-figures.txt
 - specs/content/efmp-301/reviews/unit-09/G2/logs-20261113T001804900Z/check-no-answer-keys.txt
 - specs/content/efmp-301/reviews/unit-09/G2/logs-20261113T001804900Z/check-no-em-dash.txt
 - specs/content/efmp-301/reviews/unit-09/G2/logs-20261113T001804900Z/validate-content.txt
 - specs/content/efmp-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-301-u09-plan_illustrations

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-301-u09-plan_illustrations`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Plan the raster images for EFMP-301 Unit 9 (ADR-0029 point 5; owner ruling 2026-11-09: units authored before the author-unit skill planned them are backfilled). Read `.claude/skills/author-unit/references/figure-prompts.md` and model the banner on `specs/content/efmp-304/figures/unit-02.banner.md`. Write `specs/content/efmp-301/figures/unit-09.banner.md` with one 16:9 banner row for the unit index (next free figure ID, Kind illustration, Status prompt-only). Then add one illustration scene per topic for its "A real classroom situation", unless the scene would only decorate: a `FIGURE[...]` marker in the English topic file and a matching prompt-only row in `figures/unit-09.md`. Every prompt is a complete brief for a scene that teaches the unit's point: a Sindh school or classroom, Pakistani dress, no text, maps, flags or emblems, and never a prophet, companion, angel or other sacred person, nor scripture or calligraphy (this matters most for Islamic studies and Qur'an courses: show teachers and pupils learning, not sacred figures). Alt text describes what the image will show. Do not generate, place or draw any image and do not touch other figures: the illustrate job produces and places these rows.

## Scope
EFMP-301 Unit 9 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-301/`, and `static/img/figures/efmp-301/unit-09/`.

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
- (efmp-301-u09-repair_en-r1, repair_en, opencode) Owner must still arrange permitted current render review and authenticated independent review provenance; the desk report's MCQ3/MCQ9 Apply-label note is stale (RRQ8 is already Analyze) and needs no edit.
- (efmp-301-u09-repair_en-conflict1, fix, opencode) Unit 9 G3 stays unticked; owner must arrange current mobile/A4 rendering and authenticated independent review provenance.
- (efmp-301-u09-repair_en-conflict1, fix, opencode) The shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, terminology.csv) were untouched by both sides, so no union or ID renumbering was needed.
- (efmp-301-u09-repair_en, repair_en, codex) G3 remains unticked; owner must arrange current mobile/A4 rendering and authenticated independent review provenance.
- (efmp-301-u09-repair_en, repair_en, codex) G3 remains unticked; owner must arrange current mobile/A4 rendering and authenticated independent review provenance.


## Response snapshot

Planned the EFMP-301 Unit 9 banner (fig-U9-7) and one prompt-only classroom illustration per topic (fig-U9-8..10) with EN/UR markers and manifest rows, and refreshed the Unit 9 G2 evidence so check:content passes.

## Outcome

- Impact: plan_illustrations for EFMP-301 Unit 9 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 18 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Planned the EFMP-301 Unit 9 banner (fig-U9-7) and one prompt-only classroom illustration per topic (fig-U9-8..10) with EN/UR markers and manifest rows, and refreshed the Unit 9 G2 evidence so check:content passes.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - fig-U9-7 (banner) and fig-U9-8..10 are prompt-only; the illustrate job must generate, inspect and place them, then replace the topic markers in both the EN and UR topic files.
  - Unit 9 G2 evidence now points to 20261113T001804900Z-gates.json; any later edit to Unit 9 inputs makes it stale, so rerun `npm run gates:evidence -- EFMP-301 9` after committing and commit the logs folder with the JSON.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
