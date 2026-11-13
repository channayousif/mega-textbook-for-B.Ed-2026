---
id: crew-geng-301-u03-plan_illustrations
title: crew plan_illustrations GENG-301 unit 3
stage: misc
date: 2026-11-13
surface: agent
model: claude
feature: geng-301
branch: crew/geng-301-u03-plan_illustrations
user: crew
command: crew plan_illustrations
labels: ["crew", "claude", "plan_illustrations"]
links:
  spec: specs/content/geng-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/geng-301/unit-03/topic-01.mdx
 - docs/semester-2/geng-301/unit-03/topic-02.mdx
 - docs/semester-2/geng-301/unit-03/topic-03.mdx
 - docs/semester-2/geng-301/unit-03/topic-04.mdx
 - specs/content/geng-301/figures/unit-03.banner.md
 - specs/content/geng-301/figures/unit-03.md
 - specs/content/geng-301/reviews/unit-03/G2/20261113T203345864Z-gates.json
 - specs/content/geng-301/reviews/unit-03/G2/logs-20261113T203345864Z/check-bloom-bands.txt
 - specs/content/geng-301/reviews/unit-03/G2/logs-20261113T203345864Z/check-concept-graph.txt
 - specs/content/geng-301/reviews/unit-03/G2/logs-20261113T203345864Z/check-depth-gate.txt
 - specs/content/geng-301/reviews/unit-03/G2/logs-20261113T203345864Z/check-docs-sync.txt
 - specs/content/geng-301/reviews/unit-03/G2/logs-20261113T203345864Z/check-figures.txt
 - specs/content/geng-301/reviews/unit-03/G2/logs-20261113T203345864Z/check-no-answer-keys.txt
 - specs/content/geng-301/reviews/unit-03/G2/logs-20261113T203345864Z/check-no-em-dash.txt
 - specs/content/geng-301/reviews/unit-03/G2/logs-20261113T203345864Z/validate-content.txt
 - specs/content/geng-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job geng-301-u03-plan_illustrations

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-301-u03-plan_illustrations`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Plan the raster images for GENG-301 Unit 3 (ADR-0029 point 5; owner ruling 2026-11-09: units authored before the author-unit skill planned them are backfilled). Read `.claude/skills/author-unit/references/figure-prompts.md` and model the banner on `specs/content/efmp-304/figures/unit-02.banner.md`. Write `specs/content/geng-301/figures/unit-03.banner.md` with one 16:9 banner row for the unit index (next free figure ID, Kind illustration, Status prompt-only). Then add one illustration scene per topic for its "A real classroom situation", unless the scene would only decorate: a `FIGURE[...]` marker in the English topic file and a matching prompt-only row in `figures/unit-03.md`. Every prompt is a complete brief for a scene that teaches the unit's point: a Sindh school or classroom, Pakistani dress, no text, maps, flags or emblems, and never a prophet, companion, angel or other sacred person, nor scripture or calligraphy (this matters most for Islamic studies and Qur'an courses: show teachers and pupils learning, not sacred figures). Alt text describes what the image will show. Do not generate, place or draw any image and do not touch other figures: the illustrate job produces and places these rows.

## Scope
GENG-301 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/geng-301/`, and `static/img/figures/geng-301/unit-03/`.

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
- (geng-301-u03-repair_en-r1, repair_en, agy) G3 remains open and unticked; fresh independent review with authenticated session provenance and blind solving required.
- (geng-301-u03-repair_en-r1, repair_en, agy) Desktop, narrow-screen (360px), and A4 print rendering remain deferred to an authorized browser host.
- (geng-301-u03-repair_en-conflict3, fix, opencode) G3 remains open; independent assessment, frozen handoff/provenance, narrow/print rendering and SVG geometry verification are still pending.
- (geng-301-u03-repair_en-conflict3, fix, opencode) `static/content-status.json` is generated and gitignored; run `npm run build:content-status` after any content-status edit or `check:content` will fail.
- (geng-301-u03-repair_en-conflict2, fix, opencode) G3 remains open; independent assessment, frozen handoff/provenance, narrow/print rendering and SVG geometry verification are still pending.


## Response snapshot

Added a prompt-only 16:9 banner row (fig-U3-9) and four prompt-only classroom-scene markers and manifest rows (fig-U3-10 to fig-U3-13) for GENG-301 Unit 3, and refreshed its G2 gate evidence.

## Outcome

- Impact: plan_illustrations for GENG-301 Unit 3 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 16 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Added a prompt-only 16:9 banner row (fig-U3-9) and four prompt-only classroom-scene markers and manifest rows (fig-U3-10 to fig-U3-13) for GENG-301 Unit 3, and refreshed its G2 gate evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Placing fig-U3-9..13 will change the topic files again, so the G2 evidence from 20261113T203345864Z must be regenerated afterwards (`node scripts/prepare-gate-evidence.mjs GENG-301 3`, then repoint the tasks.md Unit 3 G2 row).
  - GENG-301 Unit 3 has no Urdu mirror, so no UR markers were added; topics 3.2 and 3.3 are set in a secondary school because their prose features school pupils.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
