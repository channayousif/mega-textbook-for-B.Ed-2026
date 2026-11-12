---
id: crew-efmp-301-u02-plan_illustrations
title: crew plan_illustrations EFMP-301 unit 2
stage: misc
date: 2026-11-12
surface: agent
model: claude
feature: efmp-301
branch: crew/efmp-301-u02-plan_illustrations
user: crew
command: crew plan_illustrations
labels: ["crew", "claude", "plan_illustrations"]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-1/efmp-301/unit-02/topic-01.mdx
 - docs/semester-1/efmp-301/unit-02/topic-02.mdx
 - docs/semester-1/efmp-301/unit-02/topic-03.mdx
 - docs/semester-1/efmp-301/unit-02/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-02/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-02/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-02/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-02/topic-04.mdx
 - specs/content/efmp-301/figures/unit-02.banner.md
 - specs/content/efmp-301/figures/unit-02.md
 - specs/content/efmp-301/reviews/unit-02/G2/20261112T220233129Z-gates.json
 - specs/content/efmp-301/reviews/unit-02/G2/logs-20261112T220233129Z/check-bloom-bands.txt
 - specs/content/efmp-301/reviews/unit-02/G2/logs-20261112T220233129Z/check-concept-graph.txt
 - specs/content/efmp-301/reviews/unit-02/G2/logs-20261112T220233129Z/check-depth-gate.txt
 - specs/content/efmp-301/reviews/unit-02/G2/logs-20261112T220233129Z/check-docs-sync.txt
 - specs/content/efmp-301/reviews/unit-02/G2/logs-20261112T220233129Z/check-figures.txt
 - specs/content/efmp-301/reviews/unit-02/G2/logs-20261112T220233129Z/check-no-answer-keys.txt
 - specs/content/efmp-301/reviews/unit-02/G2/logs-20261112T220233129Z/check-no-em-dash.txt
 - specs/content/efmp-301/reviews/unit-02/G2/logs-20261112T220233129Z/validate-content.txt
 - specs/content/efmp-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-301-u02-plan_illustrations

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-301-u02-plan_illustrations`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Plan the raster images for EFMP-301 Unit 2 (ADR-0029 point 5; owner ruling 2026-11-09: units authored before the author-unit skill planned them are backfilled). Read `.claude/skills/author-unit/references/figure-prompts.md` and model the banner on `specs/content/efmp-304/figures/unit-02.banner.md`. Write `specs/content/efmp-301/figures/unit-02.banner.md` with one 16:9 banner row for the unit index (next free figure ID, Kind illustration, Status prompt-only). Then add one illustration scene per topic for its "A real classroom situation", unless the scene would only decorate: a `FIGURE[...]` marker in the English topic file and a matching prompt-only row in `figures/unit-02.md`. Every prompt is a complete brief for a scene that teaches the unit's point: a Sindh school or classroom, Pakistani dress, no text, maps, flags or emblems, and never a prophet, companion, angel or other sacred person, nor scripture or calligraphy (this matters most for Islamic studies and Qur'an courses: show teachers and pupils learning, not sacred figures). Alt text describes what the image will show. Do not generate, place or draw any image and do not touch other figures: the illustrate job produces and places these rows.

## Scope
EFMP-301 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-301/`, and `static/img/figures/efmp-301/unit-02/`.

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
- (efmp-301-u02-repair_en-r1, repair_en, claude) Checking the unit at a 360px-wide screen and in A4 print is still not done. It needs a browser, and the brief bans one.
- (efmp-301-u02-repair_en-r1, repair_en, claude) Unit 2 has used both of its ADR-0019 review cycles, so a fresh G3 review needs the owner's authorisation.
- (efmp-301-u02-repair_en-r1, repair_en, claude) `seifert-hk` is listed only as a supporting source and is not cited in the unit text; any later edit to `sources/unit-02.md` makes the G2 evidence out of date again.
- (efmp-301-u02-repair_en, repair_en, claude) A fresh G3 run on current HEAD is needed. The visual and print check at 360px is still open, and Unit 2 has already used both of its ADR-0019 review cycles, so the owner has to authorise another one.
- (efmp-301-u02-repair_en, repair_en, claude) Any further edit to sources/unit-02.md makes the G2 evidence stale again. Rerun `scripts/heavy.sh npm run gates:evidence -- EFMP-301 2` on a clean tree and update the tracker's G2 row.

## Feedback from the previous attempt
npm run check:content has 2 finding(s) that main does not have:
✗ Pipeline gate failed with 1 finding(s):
- EFMP-301 Unit 2 (docs/semester-1/efmp-301/unit-02): G2 en-draft: ENOENT: no such file or directory, open '/home/a2ahs/crew-wt/efmp-301-u02-plan_illustrations/specs/content/efmp-301/reviews/unit-02/G2/logs-20261112T214719698Z/validate-content.txt'


## Response snapshot

Planned the EFMP-301 Unit 2 banner and four topic illustration scenes as prompt-only rows, and regenerated the Unit 2 G2 evidence with its logs committed so check:content passes.

## Outcome

- Impact: plan_illustrations for EFMP-301 Unit 2 by claude (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 20 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Planned the EFMP-301 Unit 2 banner and four topic illustration scenes as prompt-only rows, and regenerated the Unit 2 G2 evidence with its logs committed so check:content passes.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The G2 evidence now points to `20261112T220233129Z-gates.json`, and its logs are committed. Any later edit to Unit 2 inputs makes it out of date again, so rerun gates:evidence and commit the `logs-*` folder with the JSON.
  - The banner and the four topic illustration rows are still prompt-only. The illustrate job has to generate, check and place them.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
