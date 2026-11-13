---
id: crew-efmp-305-u01-plan_illustrations
title: crew plan_illustrations EFMP-305 unit 1
stage: misc
date: 2026-11-13
surface: agent
model: claude
feature: efmp-305
branch: crew/efmp-305-u01-plan_illustrations
user: crew
command: crew plan_illustrations
labels: ["crew", "claude", "plan_illustrations"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/efmp-305/unit-01/topic-01.mdx
 - docs/semester-2/efmp-305/unit-01/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-01/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-01/topic-02.mdx
 - specs/content/efmp-305/figures/unit-01.banner.md
 - specs/content/efmp-305/figures/unit-01.md
 - specs/content/efmp-305/reviews/unit-01/G2/20261113T051724612Z-gates.json
 - specs/content/efmp-305/reviews/unit-01/G2/logs-20261113T051724612Z/check-bloom-bands.txt
 - specs/content/efmp-305/reviews/unit-01/G2/logs-20261113T051724612Z/check-concept-graph.txt
 - specs/content/efmp-305/reviews/unit-01/G2/logs-20261113T051724612Z/check-depth-gate.txt
 - specs/content/efmp-305/reviews/unit-01/G2/logs-20261113T051724612Z/check-docs-sync.txt
 - specs/content/efmp-305/reviews/unit-01/G2/logs-20261113T051724612Z/check-figures.txt
 - specs/content/efmp-305/reviews/unit-01/G2/logs-20261113T051724612Z/check-no-answer-keys.txt
 - specs/content/efmp-305/reviews/unit-01/G2/logs-20261113T051724612Z/check-no-em-dash.txt
 - specs/content/efmp-305/reviews/unit-01/G2/logs-20261113T051724612Z/validate-content.txt
 - specs/content/efmp-305/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-305-u01-plan_illustrations

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-305-u01-plan_illustrations`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Plan the raster images for EFMP-305 Unit 1 (ADR-0029 point 5; owner ruling 2026-11-09: units authored before the author-unit skill planned them are backfilled). Read `.claude/skills/author-unit/references/figure-prompts.md` and model the banner on `specs/content/efmp-304/figures/unit-02.banner.md`. Write `specs/content/efmp-305/figures/unit-01.banner.md` with one 16:9 banner row for the unit index (next free figure ID, Kind illustration, Status prompt-only). Then add one illustration scene per topic for its "A real classroom situation", unless the scene would only decorate: a `FIGURE[...]` marker in the English topic file and a matching prompt-only row in `figures/unit-01.md`. Every prompt is a complete brief for a scene that teaches the unit's point: a Sindh school or classroom, Pakistani dress, no text, maps, flags or emblems, and never a prophet, companion, angel or other sacred person, nor scripture or calligraphy (this matters most for Islamic studies and Qur'an courses: show teachers and pupils learning, not sacred figures). Alt text describes what the image will show. Do not generate, place or draw any image and do not touch other figures: the illustrate job produces and places these rows.

## Scope
EFMP-305 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-305/`, and `static/img/figures/efmp-305/unit-01/`.

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
- (efmp-305-u01-repair_en-r1, repair_en, opencode) ERQ Bloom-label blueprint discrepancy (assessment tags exceed the approved MCQ Remember-Apply / RRQ Understand-Analyze / ERQ Analyze-Evaluate bands) is left for the curriculum owner; I did not re-tag items or edit the approved spec.
- (efmp-305-u01-repair_en-r1, repair_en, opencode) Render evidence (narrow-screen, keyboard, A4) and author provenance remain unavailable under the brief prohibition; no third review cycle is authorised.
- (efmp-305-u01-repair_en-r1, repair_en, opencode) `static/content-status.json` is git-ignored; run `npm run build:content-status` before `check:content` on a fresh checkout.
- (efmp-305-u01-review_en, review_en, codex) Owner must resolve assessment/source defects and missing render/provenance evidence; no third review cycle is authorized.
- (efmp-305-u01-review_en, review_en, codex) Owner must resolve assessment/source defects and missing render/provenance evidence; no third review cycle is authorized.


## Response snapshot

Planned EFMP-305 Unit 1 raster illustrations (banner fig-U1-5 plus prompt-only classroom scenes fig-U1-6 and fig-U1-7 with EN/UR markers and manifest rows) and refreshed the Unit 1 G2 evidence so check:content passes.

## Outcome

- Impact: plan_illustrations for EFMP-305 Unit 1 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 16 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Planned EFMP-305 Unit 1 raster illustrations (banner fig-U1-5 plus prompt-only classroom scenes fig-U1-6 and fig-U1-7 with EN/UR markers and manifest rows) and refreshed the Unit 1 G2 evidence so check:content passes.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Three images to produce at prompt-only: banner fig-U1-5 (figures/unit-01.banner.md), plus fig-U1-6 and fig-U1-7, whose markers are in both the EN and UR topic-01/topic-02 files; swap each marker for a `<Figure>` when placing.
  - Placing the images changes the manifest and topic files again, so the Unit 1 G2 evidence will go stale; rerun `node scripts/prepare-gate-evidence.mjs EFMP-305 1` and repoint tasks.md line 30.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
