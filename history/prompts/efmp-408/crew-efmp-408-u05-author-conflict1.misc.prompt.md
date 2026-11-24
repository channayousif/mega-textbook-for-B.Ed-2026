---
id: crew-efmp-408-u05-author-conflict1
title: crew fix EFMP-408 unit 5
stage: misc
date: 2026-11-24
surface: agent
model: claude_crew
feature: efmp-408
branch: crew/efmp-408-u05-author
user: crew
command: crew fix
labels: ["crew", "claude_crew", "fix"]
links:
  spec: specs/content/efmp-408/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/efmp-408/unit-05/index.mdx
 - docs/semester-4/efmp-408/unit-05/topic-01.mdx
 - docs/semester-4/efmp-408/unit-05/topic-02.mdx
 - docs/semester-4/efmp-408/unit-05/topic-03.mdx
 - docs/semester-4/efmp-408/unit-05/unit-assessment.mdx
 - docs/semester-4/efmp-408/unit-05/unit-teacher-notes.mdx
 - history/prompts/efmp-408/crew-efmp-408-u05-author-conflict1.misc.prompt.md
 - history/prompts/efmp-408/crew-efmp-408-u05-author.green.prompt.md
 - specs/content/efmp-408/concepts/unit-05.md
 - specs/content/efmp-408/coverage/unit-05.md
 - specs/content/efmp-408/figures/unit-05.banner.md
 - specs/content/efmp-408/figures/unit-05.md
 - specs/content/efmp-408/reviews/unit-05/G2/20261124T201707838Z-gates.json
 - specs/content/efmp-408/reviews/unit-05/G2/20261124T210439864Z-gates.json
 - specs/content/efmp-408/reviews/unit-05/G2/logs-20261124T201707838Z/check-bloom-bands.txt
 - specs/content/efmp-408/reviews/unit-05/G2/logs-20261124T201707838Z/check-concept-graph.txt
 - specs/content/efmp-408/reviews/unit-05/G2/logs-20261124T201707838Z/check-depth-gate.txt
 - specs/content/efmp-408/reviews/unit-05/G2/logs-20261124T201707838Z/check-docs-sync.txt
 - specs/content/efmp-408/reviews/unit-05/G2/logs-20261124T201707838Z/check-figures.txt
 - specs/content/efmp-408/reviews/unit-05/G2/logs-20261124T201707838Z/check-no-answer-keys.txt
 - specs/content/efmp-408/reviews/unit-05/G2/logs-20261124T201707838Z/check-no-em-dash.txt
 - specs/content/efmp-408/reviews/unit-05/G2/logs-20261124T201707838Z/validate-content.txt
 - specs/content/efmp-408/reviews/unit-05/G2/logs-20261124T210439864Z/check-bloom-bands.txt
 - specs/content/efmp-408/reviews/unit-05/G2/logs-20261124T210439864Z/check-concept-graph.txt
 - specs/content/efmp-408/reviews/unit-05/G2/logs-20261124T210439864Z/check-depth-gate.txt
 - specs/content/efmp-408/reviews/unit-05/G2/logs-20261124T210439864Z/check-docs-sync.txt
 - specs/content/efmp-408/reviews/unit-05/G2/logs-20261124T210439864Z/check-figures.txt
 - specs/content/efmp-408/reviews/unit-05/G2/logs-20261124T210439864Z/check-no-answer-keys.txt
 - specs/content/efmp-408/reviews/unit-05/G2/logs-20261124T210439864Z/check-no-em-dash.txt
 - specs/content/efmp-408/reviews/unit-05/G2/logs-20261124T210439864Z/validate-content.txt
 - specs/content/efmp-408/sources/texts/openstax-statistics-2e.md
 - specs/content/efmp-408/sources/unit-05.md
 - specs/content/efmp-408/tasks.md
 - specs/gaps.md
 - static/img/figures/efmp-408/unit-05/fig-U5-1.dark.svg
 - static/img/figures/efmp-408/unit-05/fig-U5-1.svg
 - static/img/figures/efmp-408/unit-05/fig-U5-2.dark.svg
 - static/img/figures/efmp-408/unit-05/fig-U5-2.svg
 - static/img/figures/efmp-408/unit-05/fig-U5-3.dark.svg
 - static/img/figures/efmp-408/unit-05/fig-U5-3.svg
 - static/img/figures/efmp-408/unit-05/fig-U5-4.dark.svg
 - static/img/figures/efmp-408/unit-05/fig-U5-4.svg
 - static/img/figures/efmp-408/unit-05/fig-U5-5.dark.svg
 - static/img/figures/efmp-408/unit-05/fig-U5-5.svg
 - static/img/figures/efmp-408/unit-05/fig-U5-6.dark.svg
 - static/img/figures/efmp-408/unit-05/fig-U5-6.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-408-u05-author-conflict1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-408-u05-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
crew/efmp-408-u05-author conflicts with main (specs/content/efmp-408/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-408 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-408/`, and `static/img/figures/efmp-408/unit-05/`.

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
- (efmp-408-u05-author, author, claude_crew) Unit 5 total is 67 reading-minutes; if prose is expanded later, recompute `est_reading_minutes` before re-running `check:depth-gate`.
- (efmp-408-u05-author, author, claude_crew) `sources/texts/hec-2013-testdev.md` and `seifert-sutton-2009.md` were deliberately left untouched so Unit 1's accepted G2 evidence stays valid; a later job that edits them must re-run `prepare-gate-evidence.mjs efmp-408 1`.
- (efmp-408-u05-author, author, claude_crew) The four-point GPA scale in Topic 5.1 is an illustration, not a guide rule; it is `no-external-source` with gap `G-2026-235` and needs an owner decision.


## Response snapshot

Merged origin/main into crew/efmp-408-u05-author, resolved the tasks.md conflict keeping both sides' unit rows (Unit 5 titled per the approved content-spec), regenerated Unit 5's G2 gate evidence, and left all 14 content gates passing.

## Outcome

- Impact: fix for EFMP-408 Unit 5 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 46 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/efmp-408-u05-author, resolved the tasks.md conflict keeping both sides' unit rows (Unit 5 titled per the approved content-spec), regenerated Unit 5's G2 gate evidence, and left all 14 content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Unit 5's old G2 evidence `20261124T201707838Z-gates.json` is superseded but left in place as history; do not point the tracker back at it.
  - `tasks.md` now carries Units 1, 3, 5 and 6 together, so any future merge from main must not drop the Unit 3, 5 or 6 rows.
  - Gap `G-2026-235` (the illustrative four-point GPA scale in Topic 5.1) is still open and needs an owner decision; banner fig-U5-7 stays prompt-only, and Unit 5 G3 and the G4 Urdu mirror remain open.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
