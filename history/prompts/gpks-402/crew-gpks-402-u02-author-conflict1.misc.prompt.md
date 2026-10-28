---
id: crew-gpks-402-u02-author-conflict1
title: crew fix GPKS-402 unit 2
stage: misc
date: 2026-10-28
surface: agent
model: agy
feature: gpks-402
branch: crew/gpks-402-u02-author
user: crew
command: crew fix
labels: ["crew", "agy", "fix"]
links:
  spec: specs/content/gpks-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gpks-402/unit-02/index.mdx
 - docs/semester-2/gpks-402/unit-02/topic-01.mdx
 - docs/semester-2/gpks-402/unit-02/topic-02.mdx
 - docs/semester-2/gpks-402/unit-02/unit-assessment.mdx
 - docs/semester-2/gpks-402/unit-02/unit-teacher-notes.mdx
 - history/prompts/gpks-402/crew-gpks-402-u02-author.green.prompt.md
 - history/prompts/gpks-402/crew-gpks-402-u02-author.misc.prompt.md
 - specs/content/gpks-402/concepts/unit-02.md
 - specs/content/gpks-402/coverage/unit-02.md
 - specs/content/gpks-402/figures/unit-02.md
 - specs/content/gpks-402/reviews/unit-02/G2/20261028T094524432Z-gates.json
 - specs/content/gpks-402/reviews/unit-02/G2/logs-20261028T094524432Z/check-bloom-bands.txt
 - specs/content/gpks-402/reviews/unit-02/G2/logs-20261028T094524432Z/check-concept-graph.txt
 - specs/content/gpks-402/reviews/unit-02/G2/logs-20261028T094524432Z/check-depth-gate.txt
 - specs/content/gpks-402/reviews/unit-02/G2/logs-20261028T094524432Z/check-docs-sync.txt
 - specs/content/gpks-402/reviews/unit-02/G2/logs-20261028T094524432Z/check-figures.txt
 - specs/content/gpks-402/reviews/unit-02/G2/logs-20261028T094524432Z/check-no-answer-keys.txt
 - specs/content/gpks-402/reviews/unit-02/G2/logs-20261028T094524432Z/check-no-em-dash.txt
 - specs/content/gpks-402/reviews/unit-02/G2/logs-20261028T094524432Z/validate-content.txt
 - specs/content/gpks-402/sources/unit-02.md
 - specs/content/gpks-402/tasks.md
 - static/img/figures/gpks-402/unit-02/fig-U2-1.dark.svg
 - static/img/figures/gpks-402/unit-02/fig-U2-1.svg
 - static/img/figures/gpks-402/unit-02/fig-U2-2.dark.svg
 - static/img/figures/gpks-402/unit-02/fig-U2-2.svg
 - static/img/figures/gpks-402/unit-02/fig-U2-3.dark.svg
 - static/img/figures/gpks-402/unit-02/fig-U2-3.svg
 - static/img/figures/gpks-402/unit-02/fig-U2-4.dark.svg
 - static/img/figures/gpks-402/unit-02/fig-U2-4.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gpks-402-u02-author-conflict1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gpks-402-u02-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/gpks-402-u02-author conflicts with main (specs/content/gpks-402/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GPKS-402 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gpks-402/`, and `static/img/figures/gpks-402/unit-02/`.

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
- (gpks-402-u02-author, author, agy) All four Unit 2 schematic figures (fig-U2-1 timeline, fig-U2-2 diagram, fig-U2-3 flowchart, fig-U2-4 table) and their derived dark variants are placed; Urdu variants (.ur.svg) remain to be created during G4 translation.
- (gpks-402-u02-author, author, agy) G2 gate evidence is recorded in specs/content/gpks-402/reviews/unit-02/G2/ and verified with tasks.md; unit is ready for independent G3 English review.


## Response snapshot

Merged origin/main into crew/gpks-402-u02-author, resolved conflict in specs/content/gpks-402/tasks.md by preserving Unit 1 and Unit 2 tracker rows, and verified all 13 content gates pass.

## Outcome

- Impact: fix for GPKS-402 Unit 2 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 29 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/gpks-402-u02-author, resolved conflict in specs/content/gpks-402/tasks.md by preserving Unit 1 and Unit 2 tracker rows, and verified all 13 content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Preserved both Unit 1 and Unit 2 G2 gate evidence and tracker rows in specs/content/gpks-402/tasks.md.
  - Unit 2 English draft and 4 schematic figures remain verified and ready for independent G3 English review.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
