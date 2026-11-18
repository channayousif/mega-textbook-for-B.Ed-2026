---
id: crew-efmp-303-u03-plan_illustrations
title: crew plan_illustrations EFMP-303 unit 3
stage: misc
date: 2026-11-13
surface: agent
model: claude
feature: efmp-303
branch: crew/efmp-303-u03-plan_illustrations
user: crew
command: crew plan_illustrations
labels: ["crew", "claude", "plan_illustrations"]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/efmp-303/unit-03/topic-01.mdx
 - docs/semester-2/efmp-303/unit-03/topic-02.mdx
 - docs/semester-2/efmp-303/unit-03/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-03/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-03/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-03/topic-03.mdx
 - specs/content/efmp-303/figures/unit-03.banner.md
 - specs/content/efmp-303/figures/unit-03.md
 - specs/content/efmp-303/reviews/unit-03/G2/20261113T030330595Z-gates.json
 - specs/content/efmp-303/reviews/unit-03/G2/logs-20261113T030330595Z/check-bloom-bands.txt
 - specs/content/efmp-303/reviews/unit-03/G2/logs-20261113T030330595Z/check-concept-graph.txt
 - specs/content/efmp-303/reviews/unit-03/G2/logs-20261113T030330595Z/check-depth-gate.txt
 - specs/content/efmp-303/reviews/unit-03/G2/logs-20261113T030330595Z/check-docs-sync.txt
 - specs/content/efmp-303/reviews/unit-03/G2/logs-20261113T030330595Z/check-figures.txt
 - specs/content/efmp-303/reviews/unit-03/G2/logs-20261113T030330595Z/check-no-answer-keys.txt
 - specs/content/efmp-303/reviews/unit-03/G2/logs-20261113T030330595Z/check-no-em-dash.txt
 - specs/content/efmp-303/reviews/unit-03/G2/logs-20261113T030330595Z/validate-content.txt
 - specs/content/efmp-303/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-303-u03-plan_illustrations

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-303-u03-plan_illustrations`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Plan the raster images for EFMP-303 Unit 3 (ADR-0029 point 5; owner ruling 2026-11-09: units authored before the author-unit skill planned them are backfilled). Read `.claude/skills/author-unit/references/figure-prompts.md` and model the banner on `specs/content/efmp-304/figures/unit-02.banner.md`. Write `specs/content/efmp-303/figures/unit-03.banner.md` with one 16:9 banner row for the unit index (next free figure ID, Kind illustration, Status prompt-only). Then add one illustration scene per topic for its "A real classroom situation", unless the scene would only decorate: a `FIGURE[...]` marker in the English topic file and a matching prompt-only row in `figures/unit-03.md`. Every prompt is a complete brief for a scene that teaches the unit's point: a Sindh school or classroom, Pakistani dress, no text, maps, flags or emblems, and never a prophet, companion, angel or other sacred person, nor scripture or calligraphy (this matters most for Islamic studies and Qur'an courses: show teachers and pupils learning, not sacred figures). Alt text describes what the image will show. Do not generate, place or draw any image and do not touch other figures: the illustrate job produces and places these rows.

## Scope
EFMP-303 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-303/`, and `static/img/figures/efmp-303/unit-03/`.

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
- (efmp-303-u03-repair_en-r1, repair_en, opencode) G3 stays unticked; fresh independent blind solving, author provenance, parent-frozen handoff, page renders and owner G1 reconciliation remain pending.
- (efmp-303-u03-repair_en-r1, repair_en, opencode) origin/main advanced by 21 commits during the session, including a Unit 1 G3 row appended to the same `specs/content/efmp-303/tasks.md` table; expect a possible merge conflict there.
- (efmp-303-u03-repair_en-r1, repair_en, opencode) Unit 3 G2 evidence was refreshed and its tracker row repointed to `20261109T235850396Z-gates.json`.
- (efmp-303-u03-repair_en-conflict1, fix, opencode) G3 for Unit 3 remains open; independent review, browser inspection and owner G1/figure-plan decisions are still pending.
- (efmp-303-u03-repair_en-conflict1, fix, opencode) The merge pulled main's Unit 4 repair changes into this branch; they are out of Unit 3 scope but now present. static/content-status.json is gitignored, so a fresh worktree needs `npm run build:content-status` before check:content.


## Response snapshot

Planned EFMP-303 Unit 3 raster illustrations (banner fig-U3-7 plus prompt-only Sindh classroom scenes fig-U3-8..10 with EN/UR markers and manifest rows), refreshed Unit 3 G2 evidence and repointed its tracker row; check:content passes 14/14.

## Outcome

- Impact: plan_illustrations for EFMP-303 Unit 3 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 18 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Planned EFMP-303 Unit 3 raster illustrations (banner fig-U3-7 plus prompt-only Sindh classroom scenes fig-U3-8..10 with EN/UR markers and manifest rows), refreshed Unit 3 G2 evidence and repointed its tracker row; check:content passes 14/14.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The prose places Topic 3.2 in Swabi and Topic 3.3 in Khyber Pakhtunkhwa, but `fig-U3-9` and `fig-U3-10` follow the brief's Sindh-setting rule and name no city. Check that this mismatch is acceptable before generating them.
  - The illustrate job still has to generate, inspect and place `fig-U3-7` to `fig-U3-10`, then replace the English and Urdu markers with `<Figure>` elements.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
