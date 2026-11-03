---
id: crew-giss-401-u01-author
title: crew author GISS-401 unit 1
stage: misc
date: 2026-11-02
surface: agent
model: claude
feature: giss-401
branch: crew/giss-401-u01-author
user: crew
command: crew author
labels: ["crew", "claude", "author"]
links:
  spec: specs/content/giss-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/giss-401/_category_.json
 - docs/semester-3/giss-401/course-overview.mdx
 - docs/semester-3/giss-401/unit-01/index.mdx
 - docs/semester-3/giss-401/unit-01/topic-01.mdx
 - docs/semester-3/giss-401/unit-01/topic-02.mdx
 - docs/semester-3/giss-401/unit-01/unit-assessment.mdx
 - specs/content/giss-401/authoring/unit-01.md
 - specs/content/giss-401/concepts/unit-01.md
 - specs/content/giss-401/coverage/unit-01.md
 - specs/content/giss-401/figures/unit-01.md
 - specs/content/giss-401/reviews/unit-01/G2/20261102T230118463Z-gates.json
 - specs/content/giss-401/reviews/unit-01/G2/logs-20261102T230118463Z/check-bloom-bands.txt
 - specs/content/giss-401/reviews/unit-01/G2/logs-20261102T230118463Z/check-concept-graph.txt
 - specs/content/giss-401/reviews/unit-01/G2/logs-20261102T230118463Z/check-depth-gate.txt
 - specs/content/giss-401/reviews/unit-01/G2/logs-20261102T230118463Z/check-docs-sync.txt
 - specs/content/giss-401/reviews/unit-01/G2/logs-20261102T230118463Z/check-figures.txt
 - specs/content/giss-401/reviews/unit-01/G2/logs-20261102T230118463Z/check-no-answer-keys.txt
 - specs/content/giss-401/reviews/unit-01/G2/logs-20261102T230118463Z/check-no-em-dash.txt
 - specs/content/giss-401/reviews/unit-01/G2/logs-20261102T230118463Z/validate-content.txt
 - specs/content/giss-401/sources/texts/bhat-2019-education.md
 - specs/content/giss-401/sources/texts/pak-constitution-1973.md
 - specs/content/giss-401/sources/texts/quran-translation.md
 - specs/content/giss-401/sources/texts/sahih-bukhari-muslim.md
 - specs/content/giss-401/sources/unit-01.md
 - specs/content/giss-401/tasks.md
 - static/img/figures/giss-401/unit-01/fig-U1-1.dark.svg
 - static/img/figures/giss-401/unit-01/fig-U1-1.svg
 - static/img/figures/giss-401/unit-01/fig-U1-2.dark.svg
 - static/img/figures/giss-401/unit-01/fig-U1-2.svg
 - static/img/figures/giss-401/unit-01/fig-U1-3.dark.svg
 - static/img/figures/giss-401/unit-01/fig-U1-3.svg
 - static/img/figures/giss-401/unit-01/fig-U1-4.dark.svg
 - static/img/figures/giss-401/unit-01/fig-U1-4.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job giss-401-u01-author

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/giss-401-u01-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Author GISS-401 Unit 1 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GISS-401 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/giss-401/`, and `static/img/figures/giss-401/unit-01/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.


## Response snapshot

Authored GISS-401 Unit 1 in English (opening page, two topics, 10/10/5 assessment, four placed figures with dark versions, coverage/sources/excerpts/figures/concepts records, course tracker, G2 gate record and course overview), with all 13 content gates passing.

## Outcome

- Impact: author for GISS-401 Unit 1 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 33 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Authored GISS-401 Unit 1 in English (opening page, two topics, 10/10/5 assessment, four placed figures with dark versions, coverage/sources/excerpts/figures/concepts records, course tracker, G2 gate record and course overview), with all 13 content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Figures were checked by eye only (`measure-figure-text.mjs` needs Chromium, which the brief forbids), so CI's figure-geometry job is the first real measurement of the four GISS-401 Unit 1 SVGs.
  - G3 for this unit also needs a qualified Islamic Studies reviewer (content-spec drafting note 2). Maududi is declared unverifiable and backs the title only; `islami-nazriya-e-hayat` is not cited.
  - No Urdu `.ur.svg` files, `glossary.json` entries or `terminology.csv` entries exist yet; the ten Urdu concept labels I wrote are flagged for G5 review.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
