---
id: crew-efpg-401-u01-author
title: crew author EFPG-401 unit 1
stage: misc
date: 2026-11-09
surface: agent
model: agy
feature: efpg-401
branch: crew/efpg-401-u01-author
user: crew
command: crew author
labels: ["crew", "agy", "author"]
links:
  spec: specs/content/efpg-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/efpg-401/_category_.json
 - docs/semester-3/efpg-401/course-overview.mdx
 - docs/semester-3/efpg-401/unit-01/index.mdx
 - docs/semester-3/efpg-401/unit-01/topic-01.mdx
 - docs/semester-3/efpg-401/unit-01/topic-02.mdx
 - docs/semester-3/efpg-401/unit-01/topic-03.mdx
 - docs/semester-3/efpg-401/unit-01/topic-04.mdx
 - docs/semester-3/efpg-401/unit-01/unit-assessment.mdx
 - history/prompts/efpg-401/crew-efpg-401-u01-author.green.prompt.md
 - specs/content/efpg-401/concepts/unit-01.md
 - specs/content/efpg-401/coverage/unit-01.md
 - specs/content/efpg-401/figures/unit-01.md
 - specs/content/efpg-401/reviews/unit-01/G2/20261109T231800734Z-gates.json
 - specs/content/efpg-401/reviews/unit-01/G2/logs-20261109T231800734Z/check-bloom-bands.txt
 - specs/content/efpg-401/reviews/unit-01/G2/logs-20261109T231800734Z/check-concept-graph.txt
 - specs/content/efpg-401/reviews/unit-01/G2/logs-20261109T231800734Z/check-depth-gate.txt
 - specs/content/efpg-401/reviews/unit-01/G2/logs-20261109T231800734Z/check-docs-sync.txt
 - specs/content/efpg-401/reviews/unit-01/G2/logs-20261109T231800734Z/check-figures.txt
 - specs/content/efpg-401/reviews/unit-01/G2/logs-20261109T231800734Z/check-no-answer-keys.txt
 - specs/content/efpg-401/reviews/unit-01/G2/logs-20261109T231800734Z/check-no-em-dash.txt
 - specs/content/efpg-401/reviews/unit-01/G2/logs-20261109T231800734Z/validate-content.txt
 - specs/content/efpg-401/sources/texts/daulay-2025-listening.md
 - specs/content/efpg-401/sources/texts/hartati-2024-reading.md
 - specs/content/efpg-401/sources/texts/yunus-2013-writing.md
 - specs/content/efpg-401/sources/unit-01.md
 - specs/content/efpg-401/tasks.md
 - static/img/figures/efpg-401/unit-01/fig-U1-1.dark.svg
 - static/img/figures/efpg-401/unit-01/fig-U1-1.svg
 - static/img/figures/efpg-401/unit-01/fig-U1-2.dark.svg
 - static/img/figures/efpg-401/unit-01/fig-U1-2.svg
 - static/img/figures/efpg-401/unit-01/fig-U1-3.dark.svg
 - static/img/figures/efpg-401/unit-01/fig-U1-3.svg
 - static/img/figures/efpg-401/unit-01/fig-U1-4.dark.svg
 - static/img/figures/efpg-401/unit-01/fig-U1-4.svg
 - static/img/figures/efpg-401/unit-01/fig-U1-5.dark.svg
 - static/img/figures/efpg-401/unit-01/fig-U1-5.svg
 - static/img/figures/efpg-401/unit-01/fig-U1-6.dark.svg
 - static/img/figures/efpg-401/unit-01/fig-U1-6.svg
 - static/img/figures/efpg-401/unit-01/fig-U1-7.dark.svg
 - static/img/figures/efpg-401/unit-01/fig-U1-7.svg
 - static/img/figures/efpg-401/unit-01/fig-U1-8.dark.svg
 - static/img/figures/efpg-401/unit-01/fig-U1-8.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efpg-401-u01-author

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpg-401-u01-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Author EFPG-401 Unit 1 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job). Topic titles read "Topic N.M - Title" (validate:content checks it). This course has no course-overview.mdx yet: write it as part of this commit, modelled on docs/semester-3/gicp-400/course-overview.mdx, so later author jobs and the course's G2 evidence can bind it.

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFPG-401 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpg-401/`, and `static/img/figures/efpg-401/unit-01/`.

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

Authored English EFPG-401 Unit 1 with course overview, 4 pedagogical topics, 25 assessment items, 8 placed SVGs with dark twins, governance specs, and validated G2 gate evidence.

## Outcome

- Impact: author for EFPG-401 Unit 1 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 42 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Authored English EFPG-401 Unit 1 with course overview, 4 pedagogical topics, 25 assessment items, 8 placed SVGs with dark twins, governance specs, and validated G2 gate evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Print monographs by Abbas (1993), Corder (1973), and Harrison (1973) are registered under unretrievable sources with owner ruling D-2026-0001 per depth-gate standards.
  - Eight schematic SVGs are placed and measured; Urdu mirror (G4) and independent review (G3) remain open for downstream crew jobs.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
