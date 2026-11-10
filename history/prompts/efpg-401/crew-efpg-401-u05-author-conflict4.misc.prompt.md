---
id: crew-efpg-401-u05-author-conflict4
title: crew fix EFPG-401 unit 5
stage: misc
date: 2026-11-11
surface: agent
model: opencode
feature: efpg-401
branch: crew/efpg-401-u05-author
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/efpg-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/efpg-401/unit-05/index.mdx
 - docs/semester-3/efpg-401/unit-05/topic-01.mdx
 - docs/semester-3/efpg-401/unit-05/topic-02.mdx
 - docs/semester-3/efpg-401/unit-05/topic-03.mdx
 - docs/semester-3/efpg-401/unit-05/topic-04.mdx
 - docs/semester-3/efpg-401/unit-05/topic-05.mdx
 - docs/semester-3/efpg-401/unit-05/topic-06.mdx
 - docs/semester-3/efpg-401/unit-05/topic-07.mdx
 - docs/semester-3/efpg-401/unit-05/unit-assessment.mdx
 - history/prompts/efpg-401/crew-efpg-401-u05-author-conflict1.misc.prompt.md
 - history/prompts/efpg-401/crew-efpg-401-u05-author-conflict2.misc.prompt.md
 - history/prompts/efpg-401/crew-efpg-401-u05-author-conflict3.misc.prompt.md
 - history/prompts/efpg-401/crew-efpg-401-u05-author-conflict4.misc.prompt.md
 - history/prompts/efpg-401/crew-efpg-401-u05-author.green.prompt.md
 - specs/content/efpg-401/concepts/unit-05.md
 - specs/content/efpg-401/coverage/unit-05.md
 - specs/content/efpg-401/figures/unit-05.md
 - specs/content/efpg-401/reviews/unit-05/G2/20261110T132807524Z-gates.json
 - specs/content/efpg-401/reviews/unit-05/G2/logs-20261110T132807524Z/check-bloom-bands.txt
 - specs/content/efpg-401/reviews/unit-05/G2/logs-20261110T132807524Z/check-concept-graph.txt
 - specs/content/efpg-401/reviews/unit-05/G2/logs-20261110T132807524Z/check-depth-gate.txt
 - specs/content/efpg-401/reviews/unit-05/G2/logs-20261110T132807524Z/check-docs-sync.txt
 - specs/content/efpg-401/reviews/unit-05/G2/logs-20261110T132807524Z/check-figures.txt
 - specs/content/efpg-401/reviews/unit-05/G2/logs-20261110T132807524Z/check-no-answer-keys.txt
 - specs/content/efpg-401/reviews/unit-05/G2/logs-20261110T132807524Z/check-no-em-dash.txt
 - specs/content/efpg-401/reviews/unit-05/G2/logs-20261110T132807524Z/validate-content.txt
 - specs/content/efpg-401/sources/texts/paulsrud-2024-lesson-planning.md
 - specs/content/efpg-401/sources/unit-05.md
 - specs/content/efpg-401/tasks.md
 - static/img/figures/efpg-401/unit-05/fig-U5-1.dark.svg
 - static/img/figures/efpg-401/unit-05/fig-U5-1.svg
 - static/img/figures/efpg-401/unit-05/fig-U5-10.dark.svg
 - static/img/figures/efpg-401/unit-05/fig-U5-10.svg
 - static/img/figures/efpg-401/unit-05/fig-U5-11.dark.svg
 - static/img/figures/efpg-401/unit-05/fig-U5-11.svg
 - static/img/figures/efpg-401/unit-05/fig-U5-12.dark.svg
 - static/img/figures/efpg-401/unit-05/fig-U5-12.svg
 - static/img/figures/efpg-401/unit-05/fig-U5-13.dark.svg
 - static/img/figures/efpg-401/unit-05/fig-U5-13.svg
 - static/img/figures/efpg-401/unit-05/fig-U5-14.dark.svg
 - static/img/figures/efpg-401/unit-05/fig-U5-14.svg
 - static/img/figures/efpg-401/unit-05/fig-U5-2.dark.svg
 - static/img/figures/efpg-401/unit-05/fig-U5-2.svg
 - static/img/figures/efpg-401/unit-05/fig-U5-3.dark.svg
 - static/img/figures/efpg-401/unit-05/fig-U5-3.svg
 - static/img/figures/efpg-401/unit-05/fig-U5-4.dark.svg
 - static/img/figures/efpg-401/unit-05/fig-U5-4.svg
 - static/img/figures/efpg-401/unit-05/fig-U5-5.dark.svg
 - static/img/figures/efpg-401/unit-05/fig-U5-5.svg
 - static/img/figures/efpg-401/unit-05/fig-U5-6.dark.svg
 - static/img/figures/efpg-401/unit-05/fig-U5-6.svg
 - static/img/figures/efpg-401/unit-05/fig-U5-7.dark.svg
 - static/img/figures/efpg-401/unit-05/fig-U5-7.svg
 - static/img/figures/efpg-401/unit-05/fig-U5-8.dark.svg
 - static/img/figures/efpg-401/unit-05/fig-U5-8.svg
 - static/img/figures/efpg-401/unit-05/fig-U5-9.dark.svg
 - static/img/figures/efpg-401/unit-05/fig-U5-9.svg
tests:
 - npm run check:content
 - node scripts/measure-figure-text.mjs static/img/figures/efpg-401/unit-05/*.svg
---

## Prompt

# Crew job efpg-401-u05-author-conflict4

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpg-401-u05-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/efpg-401-u05-author conflicts with main (specs/content/efpg-401/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

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
- (efpg-401-u05-author-conflict3, fix, opencode) Unit 5 EN is authored with 14 placed figures; no Urdu mirror exists, so G4 translation and independent G3/G5 reviews are the open next steps.
- (efpg-401-u05-author-conflict3, fix, opencode) Unit 6 EN landed from main with 10 placed figures; its G4 Urdu mirror is a separate job.
- (efpg-401-u05-author-conflict3, fix, opencode) No D-/G-ID or glossary-key conflicts were found; main's 6 new glossary terms were retained in main's order.
- (efpg-401-u05-author-conflict2, fix, opencode) Unit 5 EN is authored with 14 placed figures; no Urdu mirror exists, so G4 translation and independent G3/G5 reviews are the open next steps.
- (efpg-401-u05-author, author, opencode) Urdu mirror (G4) and independent G3/G5 review remain open; no UR files were created.

## Response snapshot

Merged origin/main into crew/efpg-401-u05-author, resolved the tasks.md status-header conflict so it records Units 1, 2, 5, 6 and 7 as authored, and left all 14 content gates passing.

## Outcome

- Impact: fix for EFPG-401 Unit 5 by opencode (attempt 4).
- Tests: npm run check:content passed (all 14 gates PASS); measure-figure-text exited 0 on all 28 unit-05 SVGs.
- Files: 57 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/efpg-401-u05-author and resolved the tasks.md conflict by combining both sides' status lines (Units 1, 2, 5, 6 and 7 authored) while keeping every table and stage row from both sides.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this merge does not certify anything. The branch did not touch glossary.json, specs/decisions/log.md, specs/gaps.md or specs/content/terminology.csv, so no ID or glossary-key renumbering was needed.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Unit 5 EN is authored with 14 placed figures; no Urdu mirror exists, so G4 translation and independent G3/G5 reviews are the open next steps.
  - Unit 6 EN and Unit 7 EN landed from main with 10 and 4 placed figures respectively; their G4 Urdu mirrors are separate jobs.
  - The merge brought in main's Unit 2 and Unit 6 Urdu mirrors and Unit 7 English; tasks.md now carries all of their rows.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS (14/14); measure-figure-text PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
