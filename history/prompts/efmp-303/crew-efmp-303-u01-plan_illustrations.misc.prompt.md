---
id: crew-efmp-303-u01-plan_illustrations
title: crew plan_illustrations EFMP-303 unit 1
stage: misc
date: 2026-11-13
surface: agent
model: claude
feature: efmp-303
branch: crew/efmp-303-u01-plan_illustrations
user: crew
command: crew plan_illustrations
labels: ["crew", "claude", "plan_illustrations"]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/efmp-303/unit-01/topic-01.mdx
 - docs/semester-2/efmp-303/unit-01/topic-02.mdx
 - docs/semester-2/efmp-303/unit-01/topic-03.mdx
 - docs/semester-2/efmp-303/unit-01/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-01/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-01/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-01/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-01/topic-04.mdx
 - specs/content/efmp-303/figures/unit-01.banner.md
 - specs/content/efmp-303/figures/unit-01.md
 - specs/content/efmp-303/reviews/unit-01/G2/20261113T020229525Z-gates.json
 - specs/content/efmp-303/reviews/unit-01/G2/logs-20261113T020229525Z/check-bloom-bands.txt
 - specs/content/efmp-303/reviews/unit-01/G2/logs-20261113T020229525Z/check-concept-graph.txt
 - specs/content/efmp-303/reviews/unit-01/G2/logs-20261113T020229525Z/check-depth-gate.txt
 - specs/content/efmp-303/reviews/unit-01/G2/logs-20261113T020229525Z/check-docs-sync.txt
 - specs/content/efmp-303/reviews/unit-01/G2/logs-20261113T020229525Z/check-figures.txt
 - specs/content/efmp-303/reviews/unit-01/G2/logs-20261113T020229525Z/check-no-answer-keys.txt
 - specs/content/efmp-303/reviews/unit-01/G2/logs-20261113T020229525Z/check-no-em-dash.txt
 - specs/content/efmp-303/reviews/unit-01/G2/logs-20261113T020229525Z/validate-content.txt
 - specs/content/efmp-303/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-303-u01-plan_illustrations

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-303-u01-plan_illustrations`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Plan the raster images for EFMP-303 Unit 1 (ADR-0029 point 5; owner ruling 2026-11-09: units authored before the author-unit skill planned them are backfilled). Read `.claude/skills/author-unit/references/figure-prompts.md` and model the banner on `specs/content/efmp-304/figures/unit-02.banner.md`. Write `specs/content/efmp-303/figures/unit-01.banner.md` with one 16:9 banner row for the unit index (next free figure ID, Kind illustration, Status prompt-only). Then add one illustration scene per topic for its "A real classroom situation", unless the scene would only decorate: a `FIGURE[...]` marker in the English topic file and a matching prompt-only row in `figures/unit-01.md`. Every prompt is a complete brief for a scene that teaches the unit's point: a Sindh school or classroom, Pakistani dress, no text, maps, flags or emblems, and never a prophet, companion, angel or other sacred person, nor scripture or calligraphy (this matters most for Islamic studies and Qur'an courses: show teachers and pupils learning, not sacred figures). Alt text describes what the image will show. Do not generate, place or draw any image and do not touch other figures: the illustrate job produces and places these rows.

## Scope
EFMP-303 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-303/`, and `static/img/figures/efmp-303/unit-01/`.

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
- (efmp-303-u01-repair_en-r1, repair_en, opencode) Latest G3 report 20261108T203238Z repeats the previous report's findings verbatim; the fig-U1-8 wordmark and G1 note were already repaired on main (4f36f05ad), so a fresh G3 run should re-measure rather than re-apply.
- (efmp-303-u01-repair_en-r1, repair_en, opencode) Narrow 360px and A4 print render inspection remains undone; it needs a host allowed to build and run a browser.
- (efmp-303-u01-repair_en-r1, repair_en, opencode) G1 row stays unticked until the CurriculumOwner formally signs off on D-2026-0063.
- (efmp-303-u01-repair_en, repair_en, claude) Checking Unit 1 at 360px width and in A4 print is still not done; it needs a host that is allowed to build and run a browser.
- (efmp-303-u01-repair_en, repair_en, claude) The G1 row stays unticked until the CurriculumOwner formally signs off on the D-2026-0063 approval.


## Response snapshot

Planned the EFMP-303 Unit 1 banner (fig-U1-9) and four prompt-only classroom scenes (fig-U1-10..13) with EN/UR markers and manifest rows, and refreshed the Unit 1 G2 evidence so check:content passes.

## Outcome

- Impact: plan_illustrations for EFMP-303 Unit 1 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 20 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Planned the EFMP-303 Unit 1 banner (fig-U1-9) and four prompt-only classroom scenes (fig-U1-10..13) with EN/UR markers and manifest rows, and refreshed the Unit 1 G2 evidence so check:content passes.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Topic 1.3's prose sets the classroom in Lahore (and has a pupil call the female teacher "Sir"), so `fig-U1-12` names no city instead of Sindh. Check whether the prose should change.
  - The illustrate job needs to generate, inspect and place `fig-U1-9` to `fig-U1-13`, then swap the EN/UR markers for `<Figure>` elements.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
