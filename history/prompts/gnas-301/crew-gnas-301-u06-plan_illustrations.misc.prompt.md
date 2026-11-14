---
id: crew-gnas-301-u06-plan_illustrations
title: crew plan_illustrations GNAS-301 unit 6
stage: misc
date: 2026-11-14
surface: agent
model: claude
feature: gnas-301
branch: crew/gnas-301-u06-plan_illustrations
user: crew
command: crew plan_illustrations
labels: ["crew", "claude", "plan_illustrations"]
links:
  spec: specs/content/gnas-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-1/gnas-301/unit-06/topic-01.mdx
 - docs/semester-1/gnas-301/unit-06/topic-02.mdx
 - docs/semester-1/gnas-301/unit-06/topic-03.mdx
 - docs/semester-1/gnas-301/unit-06/topic-04.mdx
 - docs/semester-1/gnas-301/unit-06/topic-05.mdx
 - docs/semester-1/gnas-301/unit-06/topic-06.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-06/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-06/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-06/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-06/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-06/topic-05.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-06/topic-06.mdx
 - specs/content/gnas-301/figures/unit-06.banner.md
 - specs/content/gnas-301/figures/unit-06.md
 - specs/content/gnas-301/reviews/unit-06/G2/20261114T131813056Z-gates.json
 - specs/content/gnas-301/reviews/unit-06/G2/logs-20261114T131813056Z/check-bloom-bands.txt
 - specs/content/gnas-301/reviews/unit-06/G2/logs-20261114T131813056Z/check-concept-graph.txt
 - specs/content/gnas-301/reviews/unit-06/G2/logs-20261114T131813056Z/check-depth-gate.txt
 - specs/content/gnas-301/reviews/unit-06/G2/logs-20261114T131813056Z/check-docs-sync.txt
 - specs/content/gnas-301/reviews/unit-06/G2/logs-20261114T131813056Z/check-figures.txt
 - specs/content/gnas-301/reviews/unit-06/G2/logs-20261114T131813056Z/check-no-answer-keys.txt
 - specs/content/gnas-301/reviews/unit-06/G2/logs-20261114T131813056Z/check-no-em-dash.txt
 - specs/content/gnas-301/reviews/unit-06/G2/logs-20261114T131813056Z/validate-content.txt
 - specs/content/gnas-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gnas-301-u06-plan_illustrations

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gnas-301-u06-plan_illustrations`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Plan the raster images for GNAS-301 Unit 6 (ADR-0029 point 5; owner ruling 2026-11-09: units authored before the author-unit skill planned them are backfilled). Read `.claude/skills/author-unit/references/figure-prompts.md` and model the banner on `specs/content/efmp-304/figures/unit-02.banner.md`. Write `specs/content/gnas-301/figures/unit-06.banner.md` with one 16:9 banner row for the unit index (next free figure ID, Kind illustration, Status prompt-only). Then add one illustration scene per topic for its "A real classroom situation", unless the scene would only decorate: a `FIGURE[...]` marker in the English topic file and a matching prompt-only row in `figures/unit-06.md`. Every prompt is a complete brief for a scene that teaches the unit's point: a Sindh school or classroom, Pakistani dress, no text, maps, flags or emblems, and never a prophet, companion, angel or other sacred person, nor scripture or calligraphy (this matters most for Islamic studies and Qur'an courses: show teachers and pupils learning, not sacred figures). Alt text describes what the image will show. Do not generate, place or draw any image and do not touch other figures: the illustrate job produces and places these rows.

## Scope
GNAS-301 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gnas-301/`, and `static/img/figures/gnas-301/unit-06/`.

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
- (gnas-301-u06-repair_en-r1-conflict1, fix, opencode) G3 stays unticked; the four uncertain findings (accessibility, author provenance, source binding, blind assessment derivation) remain owner-owned and G-2026-33's cycle-count conflict is unresolved.
- (gnas-301-u06-repair_en-r1-conflict1, fix, opencode) The next job should re-check the corrected concept mappings and the new Bloom labels (ERQ-02 Apply, ERQ-05 Create 0-2, MCQ-05 Understand) against the content-spec blueprint.
- (gnas-301-u06-repair_en-r1, repair_en, opencode) G3 stays unticked; the four uncertain findings (accessibility, author provenance, source binding, blind assessment derivation) remain owner-owned and G-2026-33's cycle-count conflict is unresolved.
- (gnas-301-u06-repair_en-r1, repair_en, opencode) The next job should re-check the corrected concept mappings and the new Bloom labels (ERQ-02 Apply, ERQ-05 Create 0-2, MCQ-05 Understand) against the content-spec blueprint.
- (gnas-301-u06-repair_en-r1, repair_en, opencode) G2 evidence was refreshed at the repaired HEAD (20261103T051634155Z-gates.json); the gitignored static/content-status.json cache was regenerated locally.


## Response snapshot

Added a prompt-only 16:9 banner (fig-U6-13) and six topic classroom-scene illustrations (fig-U6-14 to fig-U6-19) for GNAS-301 Unit 6 as EN/UR markers and manifest rows, and refreshed the unit's G2 evidence so all content gates pass.

## Outcome

- Impact: plan_illustrations for GNAS-301 Unit 6 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 24 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Added a prompt-only 16:9 banner (fig-U6-13) and six topic classroom-scene illustrations (fig-U6-14 to fig-U6-19) for GNAS-301 Unit 6 as EN/UR markers and manifest rows, and refreshed the unit's G2 evidence so all content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Topic 6.5's text is set in Lahore, so the `fig-U6-18` prompt says only "a city on the plains of Pakistan" instead of a Sindh city. An owner or author should decide whether to move the scene to Sindh.
  - After placing `fig-U6-13` to `fig-U6-19`, rerun `node scripts/prepare-gate-evidence.mjs GNAS-301 6` and point the Unit 6 G2 row in `tasks.md` at the new file. When inspecting, check that the bottle labels (6.1), the dust drawing (6.3) and the framed photographs (6.6) have no readable text.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
