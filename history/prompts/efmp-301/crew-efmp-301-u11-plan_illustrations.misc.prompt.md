---
id: crew-efmp-301-u11-plan_illustrations
title: crew plan_illustrations EFMP-301 unit 11
stage: misc
date: 2026-11-13
surface: agent
model: claude
feature: efmp-301
branch: crew/efmp-301-u11-plan_illustrations
user: crew
command: crew plan_illustrations
labels: ["crew", "claude", "plan_illustrations"]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-1/efmp-301/unit-11/topic-01.mdx
 - docs/semester-1/efmp-301/unit-11/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-11/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-11/topic-02.mdx
 - specs/content/efmp-301/figures/unit-11.banner.md
 - specs/content/efmp-301/figures/unit-11.md
 - specs/content/efmp-301/reviews/unit-11/G2/20261113T010332576Z-gates.json
 - specs/content/efmp-301/reviews/unit-11/G2/logs-20261113T010332576Z/check-bloom-bands.txt
 - specs/content/efmp-301/reviews/unit-11/G2/logs-20261113T010332576Z/check-concept-graph.txt
 - specs/content/efmp-301/reviews/unit-11/G2/logs-20261113T010332576Z/check-depth-gate.txt
 - specs/content/efmp-301/reviews/unit-11/G2/logs-20261113T010332576Z/check-docs-sync.txt
 - specs/content/efmp-301/reviews/unit-11/G2/logs-20261113T010332576Z/check-figures.txt
 - specs/content/efmp-301/reviews/unit-11/G2/logs-20261113T010332576Z/check-no-answer-keys.txt
 - specs/content/efmp-301/reviews/unit-11/G2/logs-20261113T010332576Z/check-no-em-dash.txt
 - specs/content/efmp-301/reviews/unit-11/G2/logs-20261113T010332576Z/validate-content.txt
 - specs/content/efmp-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-301-u11-plan_illustrations

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-301-u11-plan_illustrations`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Plan the raster images for EFMP-301 Unit 11 (ADR-0029 point 5; owner ruling 2026-11-09: units authored before the author-unit skill planned them are backfilled). Read `.claude/skills/author-unit/references/figure-prompts.md` and model the banner on `specs/content/efmp-304/figures/unit-02.banner.md`. Write `specs/content/efmp-301/figures/unit-11.banner.md` with one 16:9 banner row for the unit index (next free figure ID, Kind illustration, Status prompt-only). Then add one illustration scene per topic for its "A real classroom situation", unless the scene would only decorate: a `FIGURE[...]` marker in the English topic file and a matching prompt-only row in `figures/unit-11.md`. Every prompt is a complete brief for a scene that teaches the unit's point: a Sindh school or classroom, Pakistani dress, no text, maps, flags or emblems, and never a prophet, companion, angel or other sacred person, nor scripture or calligraphy (this matters most for Islamic studies and Qur'an courses: show teachers and pupils learning, not sacred figures). Alt text describes what the image will show. Do not generate, place or draw any image and do not touch other figures: the illustrate job produces and places these rows.

## Scope
EFMP-301 Unit 11 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-301/`, and `static/img/figures/efmp-301/unit-11/`.

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
- (efmp-301-u11-repair_en-r1, repair_en, agy) Qualified subject review of WHO-bound clinical interpretation, urgency, and local referral procedure remains an owner escalation item prior to certification.
- (efmp-301-u11-repair_en-r1, repair_en, agy) Visual render (360px/print) and author session provenance evidence remain unverified under host resource controls.
- (efmp-301-u11-repair_en-r1, repair_en, agy) Unit 11 G3 remains open and unticked pending owner authorisation for a subsequent review cycle under ADR-0019.
- (efmp-301-u11-repair_en, repair_en, claude) Owner escalation is still needed for a qualified subject review of the WHO-bound clinical, urgency and referral wording, for render inspection, and for review provenance; a fresh G3 run needs owner authorisation under ADR-0019.
- (efmp-301-u11-repair_en, repair_en, claude) `sources/texts/who2026.md`'s "Used for" note still lists U11-2 signs; I didn't edit it because the file is shared with Unit 12 and changing it makes Unit 12's G2 evidence stale.


## Response snapshot

Planned EFMP-301 Unit 11's banner (`fig-U11-5`) and two prompt-only classroom-scene illustrations (`fig-U11-6`, `fig-U11-7`) with EN and UR markers and manifest rows, and refreshed the Unit 11 G2 evidence and its tracker row.

## Outcome

- Impact: plan_illustrations for EFMP-301 Unit 11 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 16 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Planned EFMP-301 Unit 11's banner (`fig-U11-5`) and two prompt-only classroom-scene illustrations (`fig-U11-6`, `fig-U11-7`) with EN and UR markers and manifest rows, and refreshed the Unit 11 G2 evidence and its tracker row.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The illustrate job still has to generate, inspect and place `fig-U11-5` (banner, `--banner`), `fig-U11-6` and `fig-U11-7`, and swap the EN and UR markers for `<Figure>` elements.
  - These scenes show pupil distress in a mental-health unit, so check that the images stay calm and non-dramatic, with no self-harm cues and no readable marks on papers.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
