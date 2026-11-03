---
id: crew-giss-401-u06-author-conflict1
title: crew fix GISS-401 unit 6
stage: misc
date: 2026-11-03
surface: agent
model: codex
feature: giss-401
branch: crew/giss-401-u06-author
user: crew
command: crew fix
labels: ["crew", "codex", "fix"]
links:
  spec: specs/content/giss-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/giss-401/unit-06/index.mdx
 - docs/semester-3/giss-401/unit-06/topic-01.mdx
 - docs/semester-3/giss-401/unit-06/topic-02.mdx
 - docs/semester-3/giss-401/unit-06/topic-03.mdx
 - docs/semester-3/giss-401/unit-06/unit-assessment.mdx
 - history/prompts/general/20261110-author-giss401-unit-six.general.prompt.md
 - history/prompts/general/20261111-resolve-giss-unit-six-conflicts.general.prompt.md
 - history/prompts/giss-401/crew-giss-401-u06-author.green.prompt.md
 - specs/content/giss-401/concepts/unit-06.md
 - specs/content/giss-401/coverage/unit-06.md
 - specs/content/giss-401/figures/unit-06.md
 - specs/content/giss-401/reviews/unit-06/G2/20261103T000422959Z-gates.json
 - specs/content/giss-401/reviews/unit-06/G2/20261103T011742805Z-gates.json
 - specs/content/giss-401/reviews/unit-06/G2/logs-20261103T000422959Z/check-bloom-bands.txt
 - specs/content/giss-401/reviews/unit-06/G2/logs-20261103T000422959Z/check-concept-graph.txt
 - specs/content/giss-401/reviews/unit-06/G2/logs-20261103T000422959Z/check-depth-gate.txt
 - specs/content/giss-401/reviews/unit-06/G2/logs-20261103T000422959Z/check-docs-sync.txt
 - specs/content/giss-401/reviews/unit-06/G2/logs-20261103T000422959Z/check-figures.txt
 - specs/content/giss-401/reviews/unit-06/G2/logs-20261103T000422959Z/check-no-answer-keys.txt
 - specs/content/giss-401/reviews/unit-06/G2/logs-20261103T000422959Z/check-no-em-dash.txt
 - specs/content/giss-401/reviews/unit-06/G2/logs-20261103T000422959Z/validate-content.txt
 - specs/content/giss-401/reviews/unit-06/G2/logs-20261103T011742805Z/check-bloom-bands.txt
 - specs/content/giss-401/reviews/unit-06/G2/logs-20261103T011742805Z/check-concept-graph.txt
 - specs/content/giss-401/reviews/unit-06/G2/logs-20261103T011742805Z/check-depth-gate.txt
 - specs/content/giss-401/reviews/unit-06/G2/logs-20261103T011742805Z/check-docs-sync.txt
 - specs/content/giss-401/reviews/unit-06/G2/logs-20261103T011742805Z/check-figures.txt
 - specs/content/giss-401/reviews/unit-06/G2/logs-20261103T011742805Z/check-no-answer-keys.txt
 - specs/content/giss-401/reviews/unit-06/G2/logs-20261103T011742805Z/check-no-em-dash.txt
 - specs/content/giss-401/reviews/unit-06/G2/logs-20261103T011742805Z/validate-content.txt
 - specs/content/giss-401/sources/texts/bhat-2019-education.md
 - specs/content/giss-401/sources/texts/met-science-education.md
 - specs/content/giss-401/sources/texts/quran-translation.md
 - specs/content/giss-401/sources/texts/sahih-muslim-1218a.md
 - specs/content/giss-401/sources/texts/sardar-2011-astronomy.md
 - specs/content/giss-401/sources/texts/unesco-samarkand.md
 - specs/content/giss-401/sources/unit-06.md
 - specs/content/giss-401/tasks.md
 - static/img/figures/giss-401/unit-06/fig-U6-1.dark.svg
 - static/img/figures/giss-401/unit-06/fig-U6-1.svg
 - static/img/figures/giss-401/unit-06/fig-U6-2.dark.svg
 - static/img/figures/giss-401/unit-06/fig-U6-2.svg
 - static/img/figures/giss-401/unit-06/fig-U6-3.dark.svg
 - static/img/figures/giss-401/unit-06/fig-U6-3.svg
 - static/img/figures/giss-401/unit-06/fig-U6-4.dark.svg
 - static/img/figures/giss-401/unit-06/fig-U6-4.svg
 - static/img/figures/giss-401/unit-06/fig-U6-5.dark.svg
 - static/img/figures/giss-401/unit-06/fig-U6-5.svg
 - static/img/figures/giss-401/unit-06/fig-U6-6.dark.svg
 - static/img/figures/giss-401/unit-06/fig-U6-6.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job giss-401-u06-author-conflict1

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/giss-401-u06-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/giss-401-u06-author conflicts with main (specs/content/giss-401/sources/texts/quran-translation.md, specs/content/giss-401/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GISS-401 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/giss-401/`, and `static/img/figures/giss-401/unit-06/`.

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
- (giss-401-u06-author, author, claude) G3 needs a qualified Islamic Studies reviewer who also fetches the full UDHR text independently; it is declared unverifiable because official pages returned HTTP 403.
- (giss-401-u06-author, author, claude) Other GISS-401 unit branches also add to `tasks.md`, `sources/texts/quran-translation.md` and `sources/texts/bhat-2019-education.md`; expect add/add merge conflicts there and keep every unit's sections.
- (giss-401-u06-author, author, claude) Still open: the Urdu mirror, `.ur.svg` labels and a `measure-figure-text` run, which needs a browser and this brief barred it.


## Response snapshot

Resolved both conflicts while preserving both units, refreshed Unit 6 G2 evidence, and committed the required work record.

## Outcome

- Impact: fix for GISS-401 Unit 6 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 49 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Resolved both conflicts while preserving both units, refreshed Unit 6 G2 evidence, and committed the required work record.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
