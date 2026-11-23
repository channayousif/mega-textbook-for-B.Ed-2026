---
id: crew-efmp-301-u04-plan_illustrations
title: crew plan_illustrations EFMP-301 unit 4
stage: misc
date: 2026-11-23
surface: agent
model: claude
feature: efmp-301
branch: crew/efmp-301-u04-plan_illustrations
user: crew
command: crew plan_illustrations
labels: ["crew", "claude", "plan_illustrations"]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-1/efmp-301/unit-04/topic-01.mdx
 - docs/semester-1/efmp-301/unit-04/topic-02.mdx
 - docs/semester-1/efmp-301/unit-04/topic-03.mdx
 - specs/content/efmp-301/figures/unit-04.banner.md
 - specs/content/efmp-301/figures/unit-04.md
 - specs/content/efmp-301/reviews/unit-04/G2/20261123T124713559Z-gates.json
 - specs/content/efmp-301/reviews/unit-04/G2/logs-20261123T124713559Z/check-bloom-bands.txt
 - specs/content/efmp-301/reviews/unit-04/G2/logs-20261123T124713559Z/check-concept-graph.txt
 - specs/content/efmp-301/reviews/unit-04/G2/logs-20261123T124713559Z/check-depth-gate.txt
 - specs/content/efmp-301/reviews/unit-04/G2/logs-20261123T124713559Z/check-docs-sync.txt
 - specs/content/efmp-301/reviews/unit-04/G2/logs-20261123T124713559Z/check-figures.txt
 - specs/content/efmp-301/reviews/unit-04/G2/logs-20261123T124713559Z/check-no-answer-keys.txt
 - specs/content/efmp-301/reviews/unit-04/G2/logs-20261123T124713559Z/check-no-em-dash.txt
 - specs/content/efmp-301/reviews/unit-04/G2/logs-20261123T124713559Z/validate-content.txt
 - specs/content/efmp-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-301-u04-plan_illustrations

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-301-u04-plan_illustrations`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Plan the raster images for EFMP-301 Unit 4 (ADR-0029 point 5; owner ruling 2026-11-09: units authored before the author-unit skill planned them are backfilled). Read `.claude/skills/author-unit/references/figure-prompts.md` and model the banner on `specs/content/efmp-304/figures/unit-02.banner.md`. Write `specs/content/efmp-301/figures/unit-04.banner.md` with one 16:9 banner row for the unit index (next free figure ID, Kind illustration, Status prompt-only). Then add one illustration scene per topic for its "A real classroom situation", unless the scene would only decorate: a `FIGURE[...]` marker in the English topic file and a matching prompt-only row in `figures/unit-04.md`. The `FIGURE[...]` marker belongs in the English topic file only: do not edit the Urdu topic files, because the illustrate job adds the Urdu <Figure> with Urdu alt text when it places the image. Every prompt is a complete brief for a scene that teaches the unit's point: a Sindh school or classroom, Pakistani dress, no text, maps, flags or emblems, and never a prophet, companion, angel or other sacred person, nor scripture or calligraphy (this matters most for Islamic studies and Qur'an courses: show teachers and pupils learning, not sacred figures). Alt text describes what the image will show. Do not generate, place or draw any image and do not touch other figures: the illustrate job produces and places these rows.

## Scope
EFMP-301 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-301/`, and `static/img/figures/efmp-301/unit-04/`.

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
- (efmp-301-u04-repair_en, repair_en, claude) MCQ option order changed in both locales (keys 1a 2b 3d 4b 5d 6c 7a 8c 9a 10d); a G5 re-review should check the Urdu reorder.
- (efmp-301-u04-repair_en, repair_en, claude) 360px and A4 print inspection of Unit 4 is still unperformed and needs a host where building and browsers are allowed.
- (efmp-301-u04-repair_en, repair_en, claude) vosniadou2001 is no longer in Unit 4's sources table or coverage; re-binding it needs a longer excerpt plus both table and coverage rows.
- (efmp-301-u04-fix-r1, fix, codex) Pre-existing static/content-status.json changes remain unstaged.
- (efmp-301-u04-fix-r1, fix, codex) Other Urdu figures retain existing label spills, especially fig-U4-4; independent G3/G5 review remains pending.


## Response snapshot

Planned EFMP-301 Unit 4 raster images: a new banner sidecar (fig-U4-7) and one prompt-only classroom scene per topic (fig-U4-8 to fig-U4-10) with English markers and manifest rows, then refreshed the G2 evidence and tracker row.

## Outcome

- Impact: plan_illustrations for EFMP-301 Unit 4 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 15 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Planned EFMP-301 Unit 4 raster images: a new banner sidecar (fig-U4-7) and one prompt-only classroom scene per topic (fig-U4-8 to fig-U4-10) with English markers and manifest rows, then refreshed the G2 evidence and tracker row.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The illustrate job must add the Urdu `<Figure>` elements with Urdu alt text for fig-U4-8, fig-U4-9 and fig-U4-10 when it places them. The Urdu topic files have no markers for these yet.
  - `tasks.md` has two Unit 4 G2 en-draft rows (lines 47 and 153). Only the later one was updated to the new evidence file.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
