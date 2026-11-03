---
id: crew-giss-401-u04-author-conflict1
title: crew fix GISS-401 unit 4
stage: misc
date: 2026-11-03
surface: agent
model: opencode
feature: giss-401
branch: crew/giss-401-u04-author
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/giss-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/giss-401/course-overview.mdx
 - docs/semester-3/giss-401/unit-04/index.mdx
 - docs/semester-3/giss-401/unit-04/topic-01.mdx
 - docs/semester-3/giss-401/unit-04/topic-02.mdx
 - docs/semester-3/giss-401/unit-04/unit-assessment.mdx
 - history/prompts/general/547-author-giss401-unit-four.general.prompt.md
 - history/prompts/general/548-clear-giss401-unit-four-g2.general.prompt.md
 - history/prompts/giss-401/crew-giss-401-u04-author.green.prompt.md
 - specs/content/giss-401/concepts/unit-04.md
 - specs/content/giss-401/coverage/unit-04.md
 - specs/content/giss-401/figures/unit-04.md
 - specs/content/giss-401/reviews/unit-01/G2/20261103T002225035Z-gates.json
 - specs/content/giss-401/reviews/unit-01/G2/logs-20261103T002225035Z/check-bloom-bands.txt
 - specs/content/giss-401/reviews/unit-01/G2/logs-20261103T002225035Z/check-concept-graph.txt
 - specs/content/giss-401/reviews/unit-01/G2/logs-20261103T002225035Z/check-depth-gate.txt
 - specs/content/giss-401/reviews/unit-01/G2/logs-20261103T002225035Z/check-docs-sync.txt
 - specs/content/giss-401/reviews/unit-01/G2/logs-20261103T002225035Z/check-figures.txt
 - specs/content/giss-401/reviews/unit-01/G2/logs-20261103T002225035Z/check-no-answer-keys.txt
 - specs/content/giss-401/reviews/unit-01/G2/logs-20261103T002225035Z/check-no-em-dash.txt
 - specs/content/giss-401/reviews/unit-01/G2/logs-20261103T002225035Z/validate-content.txt
 - specs/content/giss-401/reviews/unit-04/G2/20261102T233255375Z-gates.json
 - specs/content/giss-401/reviews/unit-04/G2/20261103T002225277Z-gates.json
 - specs/content/giss-401/reviews/unit-04/G2/logs-20261102T233255375Z/check-bloom-bands.txt
 - specs/content/giss-401/reviews/unit-04/G2/logs-20261102T233255375Z/check-concept-graph.txt
 - specs/content/giss-401/reviews/unit-04/G2/logs-20261102T233255375Z/check-depth-gate.txt
 - specs/content/giss-401/reviews/unit-04/G2/logs-20261102T233255375Z/check-docs-sync.txt
 - specs/content/giss-401/reviews/unit-04/G2/logs-20261102T233255375Z/check-figures.txt
 - specs/content/giss-401/reviews/unit-04/G2/logs-20261102T233255375Z/check-no-answer-keys.txt
 - specs/content/giss-401/reviews/unit-04/G2/logs-20261102T233255375Z/check-no-em-dash.txt
 - specs/content/giss-401/reviews/unit-04/G2/logs-20261102T233255375Z/validate-content.txt
 - specs/content/giss-401/reviews/unit-04/G2/logs-20261103T002225277Z/check-bloom-bands.txt
 - specs/content/giss-401/reviews/unit-04/G2/logs-20261103T002225277Z/check-concept-graph.txt
 - specs/content/giss-401/reviews/unit-04/G2/logs-20261103T002225277Z/check-depth-gate.txt
 - specs/content/giss-401/reviews/unit-04/G2/logs-20261103T002225277Z/check-docs-sync.txt
 - specs/content/giss-401/reviews/unit-04/G2/logs-20261103T002225277Z/check-figures.txt
 - specs/content/giss-401/reviews/unit-04/G2/logs-20261103T002225277Z/check-no-answer-keys.txt
 - specs/content/giss-401/reviews/unit-04/G2/logs-20261103T002225277Z/check-no-em-dash.txt
 - specs/content/giss-401/reviews/unit-04/G2/logs-20261103T002225277Z/validate-content.txt
 - specs/content/giss-401/sources/texts/abdel-salam-2015-democracy.md
 - specs/content/giss-401/sources/texts/quran-translation.md
 - specs/content/giss-401/sources/unit-04.md
 - specs/content/giss-401/tasks.md
 - static/img/figures/giss-401/unit-04/fig-U4-1.dark.svg
 - static/img/figures/giss-401/unit-04/fig-U4-1.svg
 - static/img/figures/giss-401/unit-04/fig-U4-2.dark.svg
 - static/img/figures/giss-401/unit-04/fig-U4-2.svg
 - static/img/figures/giss-401/unit-04/fig-U4-3.dark.svg
 - static/img/figures/giss-401/unit-04/fig-U4-3.svg
 - static/img/figures/giss-401/unit-04/fig-U4-4.dark.svg
 - static/img/figures/giss-401/unit-04/fig-U4-4.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job giss-401-u04-author-conflict1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/giss-401-u04-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/giss-401-u04-author conflicts with main (specs/content/giss-401/sources/texts/quran-translation.md, specs/content/giss-401/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GISS-401 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/giss-401/`, and `static/img/figures/giss-401/unit-04/`.

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
- (giss-401-u04-author, author, claude) The shared course-overview.mdx still says "Unit 1 is available now"; update the available-units sentence once, when the GISS-401 unit branches are merged.
- (giss-401-u04-author, author, claude) The four Unit 4 SVGs have never been measured by measure-figure-text (Chromium barred), so CI's figure-geometry job may flag them; G6 stays in progress.


## Response snapshot

Merged origin/main into crew/giss-401-u04-author, resolving the quran-translation.md and tasks.md add/add conflicts by keeping both sides' Unit 1 and Unit 4 content, updating the shared course-overview available-units sentence, and refreshing the G2 gate evidence that the shared-file edit invalidated.

## Outcome

- Impact: fix for GISS-401 Unit 4 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 50 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/giss-401-u04-author, resolving the quran-translation.md and tasks.md add/add conflicts by keeping both sides' Unit 1 and Unit 4 content, updating the shared course-overview available-units sentence, and refreshing the G2 gate evidence that the shared-file edit invalidated.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The four Unit 4 SVGs (and Unit 1's) have never been measured by measure-figure-text; CI figure-geometry may flag them, so G6 stays in progress.
  - The shared course-overview available-units sentence is a bound input, so updating it required refreshing the G2 evidence for Units 1 and 4 (now 20261103T002225035Z and 20261103T002225277Z).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
