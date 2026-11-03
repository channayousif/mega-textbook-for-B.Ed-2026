---
id: crew-giss-401-u03-author-conflict2
title: crew fix GISS-401 unit 3
stage: misc
date: 2026-11-03
surface: agent
model: opencode
feature: giss-401
branch: crew/giss-401-u03-author
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
 - docs/semester-3/giss-401/unit-03/index.mdx
 - docs/semester-3/giss-401/unit-03/topic-01.mdx
 - docs/semester-3/giss-401/unit-03/topic-02.mdx
 - docs/semester-3/giss-401/unit-03/unit-assessment.mdx
 - history/prompts/giss-401/crew-giss-401-u03-author-conflict2.misc.prompt.md
 - specs/content/giss-401/concepts/unit-03.md
 - specs/content/giss-401/coverage/unit-03.md
 - specs/content/giss-401/figures/unit-03.md
 - specs/content/giss-401/reviews/unit-03/G2/20261103T012212981Z-gates.json
 - specs/content/giss-401/reviews/unit-03/G2/logs-20261103T012212981Z/check-bloom-bands.txt
 - specs/content/giss-401/reviews/unit-03/G2/logs-20261103T012212981Z/check-concept-graph.txt
 - specs/content/giss-401/reviews/unit-03/G2/logs-20261103T012212981Z/check-depth-gate.txt
 - specs/content/giss-401/reviews/unit-03/G2/logs-20261103T012212981Z/check-docs-sync.txt
 - specs/content/giss-401/reviews/unit-03/G2/logs-20261103T012212981Z/check-figures.txt
 - specs/content/giss-401/reviews/unit-03/G2/logs-20261103T012212981Z/check-no-answer-keys.txt
 - specs/content/giss-401/reviews/unit-03/G2/logs-20261103T012212981Z/check-no-em-dash.txt
 - specs/content/giss-401/reviews/unit-03/G2/logs-20261103T012212981Z/validate-content.txt
 - specs/content/giss-401/sources/texts/quran-translation.md
 - specs/content/giss-401/sources/texts/sutomo-2014-akhlaq.md
 - specs/content/giss-401/sources/unit-03.md
 - specs/content/giss-401/tasks.md
 - static/img/figures/giss-401/unit-03/fig-U3-1.dark.svg
 - static/img/figures/giss-401/unit-03/fig-U3-1.svg
 - static/img/figures/giss-401/unit-03/fig-U3-2.dark.svg
 - static/img/figures/giss-401/unit-03/fig-U3-2.svg
 - static/img/figures/giss-401/unit-03/fig-U3-3.dark.svg
 - static/img/figures/giss-401/unit-03/fig-U3-3.svg
 - static/img/figures/giss-401/unit-03/fig-U3-4.dark.svg
 - static/img/figures/giss-401/unit-03/fig-U3-4.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job giss-401-u03-author-conflict2

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/giss-401-u03-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/giss-401-u03-author conflicts with main (docs/semester-3/giss-401/course-overview.mdx, specs/content/giss-401/sources/texts/quran-translation.md, specs/content/giss-401/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GISS-401 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/giss-401/`, and `static/img/figures/giss-401/unit-03/`.

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
- (giss-401-u03-author-conflict1, fix, opencode) The brief's conflict list was stale - course-overview.mdx, quran-translation.md and tasks.md exist only on sibling unit branches, not on main.
- (giss-401-u03-author-conflict1, fix, opencode) G3/G5 remain open and unsigned; Unit 3 English draft is otherwise untouched by the merge.
- (giss-401-u03-author, author, agy) English Unit 3 draft is complete, G2 gate evidence is recorded, and all 13 content gates pass.
- (giss-401-u03-author, author, agy) G3 independent English review is ready to be scheduled with a separate reviewer run.
- (giss-401-u03-author, author, agy) Urdu translation (G4) and Urdu review (G5) remain open downstream tasks.

## Response snapshot

Merged origin/main into crew/giss-401-u03-author twice: main advanced mid-job to include GISS-401 Unit 4. First merge resolved three add/add conflicts (kept main's guide-accurate course-overview.mdx, combined main's Unit 1 excerpts with Unit 3's verses in quran-translation.md, kept both Unit 1 and Unit 3 rows in tasks.md). Second merge appended main's Unit 4 verses to quran-translation.md and Unit 4 rows to tasks.md. Refreshed Unit 3's G2 gate evidence after each merge; all 13 content gates pass.

## Outcome

- Impact: fix for GISS-401 Unit 3 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 30 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/giss-401-u03-author twice (main advanced to include Unit 4 mid-job); resolved course-overview.mdx, quran-translation.md and tasks.md conflicts; refreshed Unit 3 G2 gate evidence after each merge; all 13 content gates pass.
- Decisions the team must respect: course-overview.mdx stays main's guide-accurate version (the spec's "Course Objectives", reading list and GETH-401 note); quran-translation.md is a shared per-unit excerpt file carrying Unit 1, Unit 3 and Unit 4. G3/G5 stay open and unsigned.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The shared quran-translation.md now carries Unit 1, Unit 3 and Unit 4 verses; do not collapse it back to one unit.
  - Unit 3's G2 evidence was refreshed twice; the current file is `specs/content/giss-401/reviews/unit-03/G2/20261103T012212981Z-gates.json`. Older evidence (`20261102T230636766Z`, `20261103T011416059Z`) is superseded but left in place.
  - `static/content-status.json` is gitignored and generated; rebuild it with `npm run build:content-status` after any tracker edit.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
