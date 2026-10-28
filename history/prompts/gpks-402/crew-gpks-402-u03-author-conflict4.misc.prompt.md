---
id: crew-gpks-402-u03-author-conflict4
title: crew fix GPKS-402 unit 3
stage: misc
date: 2026-10-28
surface: agent
model: agy
feature: gpks-402
branch: crew/gpks-402-u03-author
user: crew
command: crew fix
labels: ["crew", "agy", "fix"]
links:
  spec: specs/content/gpks-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gpks-402/unit-03/index.mdx
 - docs/semester-2/gpks-402/unit-03/topic-01.mdx
 - docs/semester-2/gpks-402/unit-03/topic-02.mdx
 - docs/semester-2/gpks-402/unit-03/unit-assessment.mdx
 - history/prompts/general/20261037-verify-gpks402-unit-three-integration.general.prompt.md
 - history/prompts/general/20261038-resolve-gpks-unit-three-merge.general.prompt.md
 - history/prompts/general/2433-merge-gpks-unit-three-tracker.general.prompt.md
 - history/prompts/general/545-author-gpks402-constitutional-development.general.prompt.md
 - history/prompts/gpks-402/crew-gpks-402-u03-author-conflict1.misc.prompt.md
 - history/prompts/gpks-402/crew-gpks-402-u03-author-conflict2.misc.prompt.md
 - history/prompts/gpks-402/crew-gpks-402-u03-author-conflict3.misc.prompt.md
 - history/prompts/gpks-402/crew-gpks-402-u03-author-conflict4.misc.prompt.md
 - history/prompts/gpks-402/crew-gpks-402-u03-author.green.prompt.md
 - specs/content/gpks-402/authoring/unit-03.md
 - specs/content/gpks-402/concepts/unit-03.md
 - specs/content/gpks-402/coverage/unit-03.md
 - specs/content/gpks-402/figures/unit-03.md
 - specs/content/gpks-402/reviews/unit-03/G2/20261028T094251597Z-gates.json
 - specs/content/gpks-402/reviews/unit-03/G2/20261028T110307089Z-gates.json
 - specs/content/gpks-402/reviews/unit-03/G2/20261028T110452515Z-gates.json
 - specs/content/gpks-402/reviews/unit-03/G2/logs-20261028T094251597Z/check-bloom-bands.txt
 - specs/content/gpks-402/reviews/unit-03/G2/logs-20261028T094251597Z/check-concept-graph.txt
 - specs/content/gpks-402/reviews/unit-03/G2/logs-20261028T094251597Z/check-depth-gate.txt
 - specs/content/gpks-402/reviews/unit-03/G2/logs-20261028T094251597Z/check-docs-sync.txt
 - specs/content/gpks-402/reviews/unit-03/G2/logs-20261028T094251597Z/check-figures.txt
 - specs/content/gpks-402/reviews/unit-03/G2/logs-20261028T094251597Z/check-no-answer-keys.txt
 - specs/content/gpks-402/reviews/unit-03/G2/logs-20261028T094251597Z/check-no-em-dash.txt
 - specs/content/gpks-402/reviews/unit-03/G2/logs-20261028T094251597Z/validate-content.txt
 - specs/content/gpks-402/reviews/unit-03/G2/logs-20261028T110307089Z/check-bloom-bands.txt
 - specs/content/gpks-402/reviews/unit-03/G2/logs-20261028T110307089Z/check-concept-graph.txt
 - specs/content/gpks-402/reviews/unit-03/G2/logs-20261028T110307089Z/check-depth-gate.txt
 - specs/content/gpks-402/reviews/unit-03/G2/logs-20261028T110307089Z/check-docs-sync.txt
 - specs/content/gpks-402/reviews/unit-03/G2/logs-20261028T110307089Z/check-figures.txt
 - specs/content/gpks-402/reviews/unit-03/G2/logs-20261028T110307089Z/check-no-answer-keys.txt
 - specs/content/gpks-402/reviews/unit-03/G2/logs-20261028T110307089Z/check-no-em-dash.txt
 - specs/content/gpks-402/reviews/unit-03/G2/logs-20261028T110307089Z/validate-content.txt
 - specs/content/gpks-402/reviews/unit-03/G2/logs-20261028T110452515Z/check-bloom-bands.txt
 - specs/content/gpks-402/reviews/unit-03/G2/logs-20261028T110452515Z/check-concept-graph.txt
 - specs/content/gpks-402/reviews/unit-03/G2/logs-20261028T110452515Z/check-depth-gate.txt
 - specs/content/gpks-402/reviews/unit-03/G2/logs-20261028T110452515Z/check-docs-sync.txt
 - specs/content/gpks-402/reviews/unit-03/G2/logs-20261028T110452515Z/check-figures.txt
 - specs/content/gpks-402/reviews/unit-03/G2/logs-20261028T110452515Z/check-no-answer-keys.txt
 - specs/content/gpks-402/reviews/unit-03/G2/logs-20261028T110452515Z/check-no-em-dash.txt
 - specs/content/gpks-402/reviews/unit-03/G2/logs-20261028T110452515Z/validate-content.txt
 - specs/content/gpks-402/sources/texts/constitution-1956.md
 - specs/content/gpks-402/sources/texts/constitution-1962.md
 - specs/content/gpks-402/sources/texts/first-amendment-1962.md
 - specs/content/gpks-402/sources/texts/hussain-kokab-2012-18th.md
 - specs/content/gpks-402/sources/texts/na-parliamentary-history.md
 - specs/content/gpks-402/sources/unit-03.md
 - specs/content/gpks-402/sources/unit-03/constitution-notes.md
 - specs/content/gpks-402/tasks.md
 - static/img/figures/gpks-402/unit-03/fig-U3-1.dark.svg
 - static/img/figures/gpks-402/unit-03/fig-U3-1.svg
 - static/img/figures/gpks-402/unit-03/fig-U3-2.dark.svg
 - static/img/figures/gpks-402/unit-03/fig-U3-2.svg
 - static/img/figures/gpks-402/unit-03/fig-U3-3.dark.svg
 - static/img/figures/gpks-402/unit-03/fig-U3-3.svg
 - static/img/figures/gpks-402/unit-03/fig-U3-4.dark.svg
 - static/img/figures/gpks-402/unit-03/fig-U3-4.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gpks-402-u03-author-conflict4

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gpks-402-u03-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/gpks-402-u03-author conflicts with main (specs/content/gpks-402/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GPKS-402 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gpks-402/`, and `static/img/figures/gpks-402/unit-03/`.

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
- (gpks-402-u03-author, author, codex) SVG geometry validation remains pending because the brief prohibits Playwright.
- (gpks-402-u03-author, author, codex) Independent G3 review and Urdu translation/localisation remain open.
- (gpks-402-u03-author, author, codex) SVG geometry validation remains pending because the brief prohibits Playwright.


## Response snapshot

Resolved the GPKS-402 tracker conflict, refreshed generated content status, and committed the merge and PHR.

## Outcome

- Impact: fix for GPKS-402 Unit 3 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 59 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Resolved the GPKS-402 tracker conflict, refreshed generated content status, and committed the merge and PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
