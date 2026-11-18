---
id: crew-efpg-401-u05-plan_illustrations
title: crew plan_illustrations EFPG-401 unit 5
stage: misc
date: 2026-11-18
surface: agent
model: claude
feature: efpg-401
branch: crew/efpg-401-u05-plan_illustrations
user: crew
command: crew plan_illustrations
labels: ["crew", "claude", "plan_illustrations"]
links:
  spec: specs/content/efpg-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/efpg-401/unit-05/topic-01.mdx
 - docs/semester-3/efpg-401/unit-05/topic-03.mdx
 - docs/semester-3/efpg-401/unit-05/topic-04.mdx
 - docs/semester-3/efpg-401/unit-05/topic-06.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-05/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-05/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-05/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-05/topic-06.mdx
 - specs/content/efpg-401/figures/unit-05.banner.md
 - specs/content/efpg-401/figures/unit-05.md
 - specs/content/efpg-401/reviews/unit-05/G2/20261118T100235483Z-gates.json
 - specs/content/efpg-401/reviews/unit-05/G2/logs-20261118T100235483Z/check-bloom-bands.txt
 - specs/content/efpg-401/reviews/unit-05/G2/logs-20261118T100235483Z/check-concept-graph.txt
 - specs/content/efpg-401/reviews/unit-05/G2/logs-20261118T100235483Z/check-depth-gate.txt
 - specs/content/efpg-401/reviews/unit-05/G2/logs-20261118T100235483Z/check-docs-sync.txt
 - specs/content/efpg-401/reviews/unit-05/G2/logs-20261118T100235483Z/check-figures.txt
 - specs/content/efpg-401/reviews/unit-05/G2/logs-20261118T100235483Z/check-no-answer-keys.txt
 - specs/content/efpg-401/reviews/unit-05/G2/logs-20261118T100235483Z/check-no-em-dash.txt
 - specs/content/efpg-401/reviews/unit-05/G2/logs-20261118T100235483Z/validate-content.txt
 - specs/content/efpg-401/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efpg-401-u05-plan_illustrations

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpg-401-u05-plan_illustrations`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Plan the raster images for EFPG-401 Unit 5 (ADR-0029 point 5; owner ruling 2026-11-09: units authored before the author-unit skill planned them are backfilled). Read `.claude/skills/author-unit/references/figure-prompts.md` and model the banner on `specs/content/efmp-304/figures/unit-02.banner.md`. Write `specs/content/efpg-401/figures/unit-05.banner.md` with one 16:9 banner row for the unit index (next free figure ID, Kind illustration, Status prompt-only). Then add one illustration scene per topic for its "A real classroom situation", unless the scene would only decorate: a `FIGURE[...]` marker in the English topic file and a matching prompt-only row in `figures/unit-05.md`. Every prompt is a complete brief for a scene that teaches the unit's point: a Sindh school or classroom, Pakistani dress, no text, maps, flags or emblems, and never a prophet, companion, angel or other sacred person, nor scripture or calligraphy (this matters most for Islamic studies and Qur'an courses: show teachers and pupils learning, not sacred figures). Alt text describes what the image will show. Do not generate, place or draw any image and do not touch other figures: the illustrate job produces and places these rows.

## Scope
EFPG-401 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpg-401/`, and `static/img/figures/efpg-401/unit-05/`.

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
- (efpg-401-u05-translate, translate, claude) `specs/content/efpg-401/concepts/unit-05.md` has wrong Urdu labels that I left alone because the file is a hashed G2 input: `سبقی منصوبے کے ساتھ مراحل` should use سات ("seven") rather than ساتھ ("with"), and `شعری سبق کا سير` uses an Arabic yeh. Fixing them means regenerating the G2 evidence.
- (efpg-401-u05-translate, translate, claude) The rendered Urdu (Nastaliq at 360px and A4 print) has not been checked; run `scripts/render-inspect.mjs EFPG-401 5 --locale ur --base https://textbook.com.pk` once the unit is deployed, before G5.
- (efpg-401-u05-translate, translate, claude) The English doesn't give a gender for several unnamed colleagues, but Urdu verbs need one, so I chose feminine in Topics 5.1, 5.5 and 5.6 and masculine in 5.2 and 5.7. The owner or the G5 reviewer may want to change these.
- (efpg-401-u05-author-conflict5, fix, opencode) Unit 5 EN still has no Urdu mirror, so G4 translation and independent G3/G5 review remain the open next steps.
- (efpg-401-u05-author-conflict5, fix, opencode) tasks.md already carries main's Unit 2/6 Urdu mirror and Unit 7 EN rows; a future job should not re-add them.


## Response snapshot

Planned the EFPG-401 Unit 5 raster images at prompt-only (a 16:9 banner fig-U5-15 and classroom scenes fig-U5-16 to fig-U5-19 for topics 5.1, 5.3, 5.4 and 5.6, with markers in the English and Urdu files), regenerated the G2 evidence and repointed the tracker.

## Outcome

- Impact: plan_illustrations for EFPG-401 Unit 5 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 20 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Planned the EFPG-401 Unit 5 raster images at prompt-only (a 16:9 banner fig-U5-15 and classroom scenes fig-U5-16 to fig-U5-19 for topics 5.1, 5.3, 5.4 and 5.6, with markers in the English and Urdu files), regenerated the G2 evidence and repointed the tracker.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The Urdu topic files carry the new markers with the English prompt and alt text. The illustrate job should turn them into `<Figure>` elements with Urdu alt text.
  - `scripts/prepare-gate-evidence.mjs` needs the course code in capitals (`EFPG-401 5`). With `efpg-401` it fails with "invalid unit or stage".
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
