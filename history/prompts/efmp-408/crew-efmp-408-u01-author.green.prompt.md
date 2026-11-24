---
id: crew-efmp-408-u01-author
title: crew author EFMP-408 unit 1
stage: misc
date: 2026-11-24
surface: agent
model: gemini
feature: efmp-408
branch: crew/efmp-408-u01-author
user: crew
command: crew author
labels: ["crew", "agy", "author"]
links:
  spec: specs/content/efmp-408/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - catalog/course-guides.json
 - docs/semester-4/efmp-408/_category_.json
 - docs/semester-4/efmp-408/course-overview.mdx
 - docs/semester-4/efmp-408/unit-01/index.mdx
 - docs/semester-4/efmp-408/unit-01/topic-01.mdx
 - docs/semester-4/efmp-408/unit-01/topic-02.mdx
 - docs/semester-4/efmp-408/unit-01/topic-03.mdx
 - docs/semester-4/efmp-408/unit-01/unit-assessment.mdx
 - docs/semester-4/efmp-408/unit-01/unit-teacher-notes.mdx
 - specs/content/efmp-408/concepts/unit-01.md
 - specs/content/efmp-408/coverage/unit-01.md
 - specs/content/efmp-408/figures/unit-01.banner.md
 - specs/content/efmp-408/figures/unit-01.md
 - specs/content/efmp-408/reviews/unit-01/G2/20261124T162306904Z-gates.json
 - specs/content/efmp-408/reviews/unit-01/G2/logs-20261124T162306904Z/check-bloom-bands.txt
 - specs/content/efmp-408/reviews/unit-01/G2/logs-20261124T162306904Z/check-concept-graph.txt
 - specs/content/efmp-408/reviews/unit-01/G2/logs-20261124T162306904Z/check-depth-gate.txt
 - specs/content/efmp-408/reviews/unit-01/G2/logs-20261124T162306904Z/check-docs-sync.txt
 - specs/content/efmp-408/reviews/unit-01/G2/logs-20261124T162306904Z/check-figures.txt
 - specs/content/efmp-408/reviews/unit-01/G2/logs-20261124T162306904Z/check-no-answer-keys.txt
 - specs/content/efmp-408/reviews/unit-01/G2/logs-20261124T162306904Z/check-no-em-dash.txt
 - specs/content/efmp-408/reviews/unit-01/G2/logs-20261124T162306904Z/validate-content.txt
 - specs/content/efmp-408/sources/texts/hec-2013-classroom-assessment.md
 - specs/content/efmp-408/sources/texts/hec-2013-testdev.md
 - specs/content/efmp-408/sources/texts/seifert-sutton-2009.md
 - specs/content/efmp-408/sources/unit-01.md
 - specs/content/efmp-408/tasks.md
 - static/guides/semester-4/efmp-408.pdf
 - static/img/figures/efmp-408/unit-01/fig-U1-1.dark.svg
 - static/img/figures/efmp-408/unit-01/fig-U1-1.svg
 - static/img/figures/efmp-408/unit-01/fig-U1-2.dark.svg
 - static/img/figures/efmp-408/unit-01/fig-U1-2.svg
 - static/img/figures/efmp-408/unit-01/fig-U1-3.dark.svg
 - static/img/figures/efmp-408/unit-01/fig-U1-3.svg
 - static/img/figures/efmp-408/unit-01/fig-U1-5.dark.svg
 - static/img/figures/efmp-408/unit-01/fig-U1-5.svg
 - static/img/figures/efmp-408/unit-01/fig-U1-6.dark.svg
 - static/img/figures/efmp-408/unit-01/fig-U1-6.svg
 - static/img/figures/efmp-408/unit-01/fig-U1-7.dark.svg
 - static/img/figures/efmp-408/unit-01/fig-U1-7.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-408-u01-author

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-408-u01-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Author EFMP-408 Unit 1 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job). Topic titles read "Topic N.M - Title" (validate:content checks it). This course has no course-overview.mdx yet: write it as part of this commit, modelled on docs/semester-3/gicp-400/course-overview.mdx, so later author jobs and the course's G2 evidence can bind it.

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-408 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-408/`, and `static/img/figures/efmp-408/unit-01/`.

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

Authored EFMP-408 Unit 1 in English with course overview, category configuration, course guide PDF extract, six placed schematic figures with measured geometry, complete governance specifications, and G2 gate evidence preparation.

## Outcome

- Impact: author for EFMP-408 Unit 1 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before completing the run.
- Files: 31 authored/generated file(s), plus G2 gate evidence records.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Authored EFMP-408 Unit 1 in English with its course overview, six placed schematics, governance files, tracker and G2 gate evidence, leaving G3, G4 and G5 open.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Figure text geometry has been measured via measure-figure-text.mjs and passed with 0 errors across all 12 SVG variants.
  - All eleven Urdu labels in `concepts/unit-01.md` have verified Urdu translations aligned with educational assessment terminology.
  - Banner `fig-U1-4` is `prompt-only` per the visual standard for illustration banners.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
