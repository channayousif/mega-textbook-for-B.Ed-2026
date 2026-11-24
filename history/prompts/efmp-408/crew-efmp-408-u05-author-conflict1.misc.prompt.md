---
id: crew-efmp-408-u05-author-conflict1
title: crew merge main into EFMP-408 unit 5 author branch
stage: misc
date: 2026-11-25
surface: agent
model: claude_crew
feature: efmp-408
branch: crew/efmp-408-u05-author
user: crew
command: crew merge
labels: ["crew", "claude_crew", "merge"]
links:
  spec: specs/content/efmp-408/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/efmp-408/tasks.md
 - specs/content/efmp-408/reviews/unit-05/G2/20261124T210439864Z-gates.json
 - specs/content/efmp-408/reviews/unit-05/G2/logs-20261124T210439864Z/check-bloom-bands.txt
 - specs/content/efmp-408/reviews/unit-05/G2/logs-20261124T210439864Z/check-concept-graph.txt
 - specs/content/efmp-408/reviews/unit-05/G2/logs-20261124T210439864Z/check-depth-gate.txt
 - specs/content/efmp-408/reviews/unit-05/G2/logs-20261124T210439864Z/check-docs-sync.txt
 - specs/content/efmp-408/reviews/unit-05/G2/logs-20261124T210439864Z/check-figures.txt
 - specs/content/efmp-408/reviews/unit-05/G2/logs-20261124T210439864Z/check-no-answer-keys.txt
 - specs/content/efmp-408/reviews/unit-05/G2/logs-20261124T210439864Z/check-no-em-dash.txt
 - specs/content/efmp-408/reviews/unit-05/G2/logs-20261124T210439864Z/validate-content.txt
 - history/prompts/efmp-408/crew-efmp-408-u05-author-conflict1.misc.prompt.md

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

Merged origin/main into crew/efmp-408-u05-author, resolved the single tasks.md conflict by keeping both sides' unit and stage rows (Unit 5 title kept as the approved content-spec's "Grading, Reporting and Interpreting Scores"), regenerated Unit 5's G2 gate evidence invalidated by main's source-text update, and left the branch with all 14 content gates passing.

## Outcome

- Impact: merge fix for EFMP-408 Unit 5 by claude_crew (attempt 1).
- Tests: npm run check:content passed (14/14 content gates) in the job worktree; measure-figure-text exited 0 on every unit-05 SVG.
- Files: 10 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: merged origin/main (8fa83e44e) into crew/efmp-408-u05-author; resolved the tasks.md conflict keeping both sides' rows; re-ran prepare-gate-evidence for Unit 5 and pointed its G2 row at the new file; check:content is green.
- Decisions the team must respect: G3/G5 stay advisory; no review certification is claimed. Unit 5's title stays "Grading, Reporting and Interpreting Scores" (approved content-spec heading), not main's stale "Grading, Reporting and Assessment Statistics".
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Unit 5 G2 row points at `specs/content/efmp-408/reviews/unit-05/G2/20261124T210439864Z-gates.json`; the older `20261124T201707838Z-gates.json` is superseded but left in place as history.
  - `specs/content/efmp-408/tasks.md` now carries Unit 1, 3, 5 and 6 rows together; a future merge from main must not drop the Unit 3, 5 or 6 rows.
  - Gap `G-2026-235` (the illustrative four-point GPA scale) is still open and needs an owner decision; banner figure fig-U5-7 is still prompt-only; G3 review and the G4 Urdu mirror for Unit 5 remain open.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS (14/14)
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
