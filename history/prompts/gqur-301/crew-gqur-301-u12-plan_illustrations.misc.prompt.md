---
id: crew-gqur-301-u12-plan_illustrations
title: crew plan_illustrations GQUR-301 unit 12
stage: misc
date: 2026-11-15
surface: agent
model: claude
feature: gqur-301
branch: crew/gqur-301-u12-plan_illustrations
user: crew
command: crew plan_illustrations
labels: ["crew", "claude", "plan_illustrations"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gqur-301/unit-12/topic-01.mdx
 - docs/semester-2/gqur-301/unit-12/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-12/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-12/topic-02.mdx
 - specs/content/gqur-301/figures/unit-12.banner.md
 - specs/content/gqur-301/figures/unit-12.md
 - specs/content/gqur-301/reviews/unit-12/G2/20261115T044721270Z-gates.json
 - specs/content/gqur-301/reviews/unit-12/G2/logs-20261115T044721270Z/check-bloom-bands.txt
 - specs/content/gqur-301/reviews/unit-12/G2/logs-20261115T044721270Z/check-concept-graph.txt
 - specs/content/gqur-301/reviews/unit-12/G2/logs-20261115T044721270Z/check-depth-gate.txt
 - specs/content/gqur-301/reviews/unit-12/G2/logs-20261115T044721270Z/check-docs-sync.txt
 - specs/content/gqur-301/reviews/unit-12/G2/logs-20261115T044721270Z/check-figures.txt
 - specs/content/gqur-301/reviews/unit-12/G2/logs-20261115T044721270Z/check-no-answer-keys.txt
 - specs/content/gqur-301/reviews/unit-12/G2/logs-20261115T044721270Z/check-no-em-dash.txt
 - specs/content/gqur-301/reviews/unit-12/G2/logs-20261115T044721270Z/validate-content.txt
 - specs/content/gqur-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u12-plan_illustrations

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u12-plan_illustrations`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Plan the raster images for GQUR-301 Unit 12 (ADR-0029 point 5; owner ruling 2026-11-09: units authored before the author-unit skill planned them are backfilled). Read `.claude/skills/author-unit/references/figure-prompts.md` and model the banner on `specs/content/efmp-304/figures/unit-02.banner.md`. Write `specs/content/gqur-301/figures/unit-12.banner.md` with one 16:9 banner row for the unit index (next free figure ID, Kind illustration, Status prompt-only). Then add one illustration scene per topic for its "A real classroom situation", unless the scene would only decorate: a `FIGURE[...]` marker in the English topic file and a matching prompt-only row in `figures/unit-12.md`. Every prompt is a complete brief for a scene that teaches the unit's point: a Sindh school or classroom, Pakistani dress, no text, maps, flags or emblems, and never a prophet, companion, angel or other sacred person, nor scripture or calligraphy (this matters most for Islamic studies and Qur'an courses: show teachers and pupils learning, not sacred figures). Alt text describes what the image will show. Do not generate, place or draw any image and do not touch other figures: the illustrate job produces and places these rows.

## Scope
GQUR-301 Unit 12 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-12/`.

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
- (gqur-301-u12-repair_en-r1, repair_en, opencode) The 20261108 desk report carries the same findings as 20261102 against the same post-repair bytes; hash the frozen input manifest before redoing any repair.
- (gqur-301-u12-repair_en-r1, repair_en, opencode) G3/G5 stay open; browser/print inspection, historical provenance, G1 authority and bound Chapter 4/OpenStax source evidence remain with the owner/review host.
- (gqur-301-u12-repair_en-r1, repair_en, opencode) The four `.ur.svg` figure variants still need a `generate-figures` Step 5 run before G4 can flip the unit to reviewed.
- (gqur-301-u12-repair_en-conflict1, fix, opencode) `static/content-status.json` is a gitignored artifact; regenerate it with `npm run build:content-status` if `check:content-status` fails on a fresh checkout.
- (gqur-301-u12-repair_en-conflict1, fix, opencode) Unit 12 G3 stays open/unticked; browser/print inspection, historical provenance, G1 and bound source evidence remain for the review host, and the 4 `.ur.svg` figure variants still need a `generate-figures` Step 5 run.


## Response snapshot

Planned a prompt-only 16:9 banner (fig-U12-5) and one classroom illustration for each of the two topics (fig-U12-6, fig-U12-7) for GQUR-301 Unit 12, with EN/UR markers and manifest rows, refreshed the G2 evidence and repointed the tracker row.

## Outcome

- Impact: plan_illustrations for GQUR-301 Unit 12 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 16 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Planned a prompt-only 16:9 banner (fig-U12-5) and one classroom illustration for each of the two topics (fig-U12-6, fig-U12-7) for GQUR-301 Unit 12, with EN/UR markers and manifest rows, refreshed the G2 evidence and repointed the tracker row.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - fig-U12-5 (banner), fig-U12-6 and fig-U12-7 are prompt-only. The illustrate job must generate, inspect and place them, then rerun `prepare-gate-evidence.mjs GQUR-301 12` and repoint the G2 tracker row.
  - fig-U12-6 and fig-U12-7 markers are already in the Urdu topic files. Check that the generated images show no numbers or text on the axes or the dot sheet.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
