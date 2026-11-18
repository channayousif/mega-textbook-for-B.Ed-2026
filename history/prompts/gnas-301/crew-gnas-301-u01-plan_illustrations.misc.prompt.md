---
id: crew-gnas-301-u01-plan_illustrations
title: crew plan_illustrations GNAS-301 unit 1
stage: misc
date: 2026-11-14
surface: agent
model: claude
feature: gnas-301
branch: crew/gnas-301-u01-plan_illustrations
user: crew
command: crew plan_illustrations
labels: ["crew", "claude", "plan_illustrations"]
links:
  spec: specs/content/gnas-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-1/gnas-301/unit-01/topic-01.mdx
 - docs/semester-1/gnas-301/unit-01/topic-02.mdx
 - docs/semester-1/gnas-301/unit-01/topic-03.mdx
 - docs/semester-1/gnas-301/unit-01/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-01/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-01/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-01/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-01/topic-04.mdx
 - specs/content/gnas-301/figures/unit-01.banner.md
 - specs/content/gnas-301/figures/unit-01.md
 - specs/content/gnas-301/reviews/unit-01/G2/20261114T100320661Z-gates.json
 - specs/content/gnas-301/reviews/unit-01/G2/logs-20261114T100320661Z/check-bloom-bands.txt
 - specs/content/gnas-301/reviews/unit-01/G2/logs-20261114T100320661Z/check-concept-graph.txt
 - specs/content/gnas-301/reviews/unit-01/G2/logs-20261114T100320661Z/check-depth-gate.txt
 - specs/content/gnas-301/reviews/unit-01/G2/logs-20261114T100320661Z/check-docs-sync.txt
 - specs/content/gnas-301/reviews/unit-01/G2/logs-20261114T100320661Z/check-figures.txt
 - specs/content/gnas-301/reviews/unit-01/G2/logs-20261114T100320661Z/check-no-answer-keys.txt
 - specs/content/gnas-301/reviews/unit-01/G2/logs-20261114T100320661Z/check-no-em-dash.txt
 - specs/content/gnas-301/reviews/unit-01/G2/logs-20261114T100320661Z/validate-content.txt
 - specs/content/gnas-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gnas-301-u01-plan_illustrations

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gnas-301-u01-plan_illustrations`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Plan the raster images for GNAS-301 Unit 1 (ADR-0029 point 5; owner ruling 2026-11-09: units authored before the author-unit skill planned them are backfilled). Read `.claude/skills/author-unit/references/figure-prompts.md` and model the banner on `specs/content/efmp-304/figures/unit-02.banner.md`. Write `specs/content/gnas-301/figures/unit-01.banner.md` with one 16:9 banner row for the unit index (next free figure ID, Kind illustration, Status prompt-only). Then add one illustration scene per topic for its "A real classroom situation", unless the scene would only decorate: a `FIGURE[...]` marker in the English topic file and a matching prompt-only row in `figures/unit-01.md`. Every prompt is a complete brief for a scene that teaches the unit's point: a Sindh school or classroom, Pakistani dress, no text, maps, flags or emblems, and never a prophet, companion, angel or other sacred person, nor scripture or calligraphy (this matters most for Islamic studies and Qur'an courses: show teachers and pupils learning, not sacred figures). Alt text describes what the image will show. Do not generate, place or draw any image and do not touch other figures: the illustrate job produces and places these rows.

## Scope
GNAS-301 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gnas-301/`, and `static/img/figures/gnas-301/unit-01/`.

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
- (gnas-301-u01-repair_en-r1, repair_en, codex) Browser/print inspection remains pending; defer the shared WHO heading until Unit 2 evidence refresh.
- (gnas-301-u01-repair_en-r1, repair_en, codex) Browser/print inspection remains pending; defer the shared WHO heading until Unit 2 evidence refresh.
- (gnas-301-u01-review_en-conflict1, fix, claude) Unit 1 G3 is still open and escalated (report `12ce2621-...json`): 10 figure text geometry defects in fig-U1-2, fig-U1-3.ur, fig-U1-6 and fig-U1-8 still need fixing.
- (gnas-301-u01-review_en, review_en, agy) 10 figure text geometry defects detected across fig-U1-2, fig-U1-3.ur, fig-U1-6, and fig-U1-8 need SVG coordinate adjustments so measure-figure-text.mjs passes.
- (gnas-301-u01-review_en, review_en, agy) Live 360px viewport, table horizontal scrolling, and A4 print view inspection remain unperformed due to job brief limits and must be verified on a live build before G3 certification.


## Response snapshot

Planned a prompt-only 16:9 banner (fig-U1-9) and four topic classroom-scene illustrations (fig-U1-10..13) for GNAS-301 Unit 1, with EN/UR markers and manifest rows, and refreshed the unit's G2 evidence.

## Outcome

- Impact: plan_illustrations for GNAS-301 Unit 1 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 20 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Planned a prompt-only 16:9 banner (fig-U1-9) and four topic classroom-scene illustrations (fig-U1-10..13) for GNAS-301 Unit 1, with EN/UR markers and manifest rows, and refreshed the unit's G2 evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - After the illustrate job places fig-U1-9..13, rerun `node scripts/prepare-gate-evidence.mjs GNAS-301 1` and repoint the Unit 1 G2 row in `specs/content/gnas-301/tasks.md`.
  - Check that the phone screen in fig-U1-10 is unreadable and that the bins in the banner have no labels or recycling logos.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
