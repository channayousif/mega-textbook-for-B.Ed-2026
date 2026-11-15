---
id: crew-gqur-301-u07-plan_illustrations
title: crew plan_illustrations GQUR-301 unit 7
stage: misc
date: 2026-11-15
surface: agent
model: claude
feature: gqur-301
branch: crew/gqur-301-u07-plan_illustrations
user: crew
command: crew plan_illustrations
labels: ["crew", "claude", "plan_illustrations"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gqur-301/unit-07/topic-01.mdx
 - docs/semester-2/gqur-301/unit-07/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-07/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-07/topic-02.mdx
 - specs/content/gqur-301/figures/unit-07.banner.md
 - specs/content/gqur-301/figures/unit-07.md
 - specs/content/gqur-301/reviews/unit-07/G2/20261115T001858706Z-gates.json
 - specs/content/gqur-301/reviews/unit-07/G2/logs-20261115T001858706Z/check-bloom-bands.txt
 - specs/content/gqur-301/reviews/unit-07/G2/logs-20261115T001858706Z/check-concept-graph.txt
 - specs/content/gqur-301/reviews/unit-07/G2/logs-20261115T001858706Z/check-depth-gate.txt
 - specs/content/gqur-301/reviews/unit-07/G2/logs-20261115T001858706Z/check-docs-sync.txt
 - specs/content/gqur-301/reviews/unit-07/G2/logs-20261115T001858706Z/check-figures.txt
 - specs/content/gqur-301/reviews/unit-07/G2/logs-20261115T001858706Z/check-no-answer-keys.txt
 - specs/content/gqur-301/reviews/unit-07/G2/logs-20261115T001858706Z/check-no-em-dash.txt
 - specs/content/gqur-301/reviews/unit-07/G2/logs-20261115T001858706Z/validate-content.txt
 - specs/content/gqur-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u07-plan_illustrations

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u07-plan_illustrations`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Plan the raster images for GQUR-301 Unit 7 (ADR-0029 point 5; owner ruling 2026-11-09: units authored before the author-unit skill planned them are backfilled). Read `.claude/skills/author-unit/references/figure-prompts.md` and model the banner on `specs/content/efmp-304/figures/unit-02.banner.md`. Write `specs/content/gqur-301/figures/unit-07.banner.md` with one 16:9 banner row for the unit index (next free figure ID, Kind illustration, Status prompt-only). Then add one illustration scene per topic for its "A real classroom situation", unless the scene would only decorate: a `FIGURE[...]` marker in the English topic file and a matching prompt-only row in `figures/unit-07.md`. Every prompt is a complete brief for a scene that teaches the unit's point: a Sindh school or classroom, Pakistani dress, no text, maps, flags or emblems, and never a prophet, companion, angel or other sacred person, nor scripture or calligraphy (this matters most for Islamic studies and Qur'an courses: show teachers and pupils learning, not sacred figures). Alt text describes what the image will show. Do not generate, place or draw any image and do not touch other figures: the illustrate job produces and places these rows.

## Scope
GQUR-301 Unit 7 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-07/`.

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
- (gqur-301-u07-repair_en-r1-conflict1, fix, opencode) Unit 7 P1-P4 (author-run provenance, open G1, rendered inspection, answer-blind verification) and immutable source captures remain open for the evaluator/review host; G3 stays open (ADR-0019).
- (gqur-301-u07-repair_en-r1-conflict1, fix, opencode) ERQ 4's constant-intake assumption is an author choice for owner adjudication; the final review cycle is exhausted, so further review needs recorded owner authorization in specs/decisions/log.md.
- (gqur-301-u07-repair_en-r1, repair_en, claude) ERQ 4's constant-intake assumption is an author choice for owner adjudication; the report says the final cycle is exhausted, so a further review needs recorded owner authorization in `specs/decisions/log.md`.
- (gqur-301-u07-repair_en-r1, repair_en, claude) P1-P4 and immutable source captures are not author-repairable; `translations/unit-07/handoff.md` and `input-digests.json` still describe the pre-repair ERQ 4 bytes, so G5 must review the new Urdu text.
- (gqur-301-u07-review_en-r1, review_en, codex) Owner must resolve ERQ 4 projection assumptions, G1/provenance, rendered evidence and answer-blind verification; further cycles require recorded authorization.


## Response snapshot

Planned GQUR-301 Unit 7 raster illustrations as prompt-only (banner fig-U7-5, topic scenes fig-U7-6 and fig-U7-7 with EN and UR markers and manifest rows) and refreshed the unit's G2 gate evidence and tracker rows.

## Outcome

- Impact: plan_illustrations for GQUR-301 Unit 7 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 16 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Planned GQUR-301 Unit 7 raster illustrations as prompt-only (banner fig-U7-5, topic scenes fig-U7-6 and fig-U7-7 with EN and UR markers and manifest rows) and refreshed the unit's G2 gate evidence and tracker rows.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The pending Unit 7 G3 review request (`⏳ CMY`, `g3-desk-253d4cd9`) was prepared against the files before the illustration markers were added, so it is now stale and must be re-prepared.
  - `tasks.md` has two Unit 7 G2 rows (lines 60 and 204). The pipeline gate reads the last one, so repoint both after any evidence refresh.
  - The Urdu topic files carry the English-language markers for `fig-U7-6` and `fig-U7-7`. The illustrate job must wire both locales when it places them.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
