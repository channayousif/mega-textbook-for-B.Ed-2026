---
id: crew-gent-401-u01-author
title: crew author GENT-401 unit 1
stage: misc
date: 2026-11-24
surface: agent
model: claude
feature: gent-401
branch: crew/gent-401-u01-author
user: crew
command: crew author
labels: ["crew", "claude", "author"]
links:
  spec: specs/content/gent-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - catalog/course-guides.json
 - docs/semester-4/gent-401/_category_.json
 - docs/semester-4/gent-401/course-overview.mdx
 - docs/semester-4/gent-401/unit-01/index.mdx
 - docs/semester-4/gent-401/unit-01/topic-01.mdx
 - docs/semester-4/gent-401/unit-01/topic-02.mdx
 - docs/semester-4/gent-401/unit-01/unit-assessment.mdx
 - docs/semester-4/gent-401/unit-01/unit-teacher-notes.mdx
 - specs/content/gent-401/concepts/unit-01.md
 - specs/content/gent-401/coverage/unit-01.md
 - specs/content/gent-401/figures/unit-01.banner.md
 - specs/content/gent-401/figures/unit-01.md
 - specs/content/gent-401/reviews/unit-01/G2/20261124T023608050Z-gates.json
 - specs/content/gent-401/reviews/unit-01/G2/logs-20261124T023608050Z/check-bloom-bands.txt
 - specs/content/gent-401/reviews/unit-01/G2/logs-20261124T023608050Z/check-concept-graph.txt
 - specs/content/gent-401/reviews/unit-01/G2/logs-20261124T023608050Z/check-depth-gate.txt
 - specs/content/gent-401/reviews/unit-01/G2/logs-20261124T023608050Z/check-docs-sync.txt
 - specs/content/gent-401/reviews/unit-01/G2/logs-20261124T023608050Z/check-figures.txt
 - specs/content/gent-401/reviews/unit-01/G2/logs-20261124T023608050Z/check-no-answer-keys.txt
 - specs/content/gent-401/reviews/unit-01/G2/logs-20261124T023608050Z/check-no-em-dash.txt
 - specs/content/gent-401/reviews/unit-01/G2/logs-20261124T023608050Z/validate-content.txt
 - specs/content/gent-401/sources/texts/butler-iea.md
 - specs/content/gent-401/sources/texts/openstax-entrepreneurship.md
 - specs/content/gent-401/sources/texts/saeed-2014-ee.md
 - specs/content/gent-401/sources/unit-01.md
 - specs/content/gent-401/tasks.md
 - static/guides/semester-4/gent-401.pdf
 - static/img/figures/gent-401/unit-01/fig-U1-1.dark.svg
 - static/img/figures/gent-401/unit-01/fig-U1-1.svg
 - static/img/figures/gent-401/unit-01/fig-U1-2.dark.svg
 - static/img/figures/gent-401/unit-01/fig-U1-2.svg
 - static/img/figures/gent-401/unit-01/fig-U1-3.dark.svg
 - static/img/figures/gent-401/unit-01/fig-U1-3.svg
 - static/img/figures/gent-401/unit-01/fig-U1-4.dark.svg
 - static/img/figures/gent-401/unit-01/fig-U1-4.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gent-401-u01-author

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gent-401-u01-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Author GENT-401 Unit 1 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job). Topic titles read "Topic N.M - Title" (validate:content checks it). This course has no course-overview.mdx yet: write it as part of this commit, modelled on docs/semester-3/gicp-400/course-overview.mdx, so later author jobs and the course's G2 evidence can bind it.

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GENT-401 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gent-401/`, and `static/img/figures/gent-401/unit-01/`.

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

Authored GENT-401 Unit 1 in English (index, two topic cycles, 10/10/5 assessment, teacher notes, four placed schematic SVGs with dark variants, coverage, sources, concepts, tracker and G2 evidence) plus the course overview, sidebar category and course-guide entry, with all content gates passing.

## Outcome

- Impact: author for GENT-401 Unit 1 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 35 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Authored GENT-401 Unit 1 in English (index, two topic cycles, 10/10/5 assessment, teacher notes, four placed schematic SVGs with dark variants, coverage, sources, concepts, tracker and G2 evidence) plus the course overview, sidebar category and course-guide entry, with all content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The G3 reviewer should confirm Butler's IEA edition year (spec says 2020, a search result said 2022, an IEA listing from April 2021 conflicts with 2022) and that the unverifiable mellor-2009 row backs only the premise in its title.
  - This job added the GENT-401 entry to catalog/course-guides.json (pages 10-13) and cut static/guides/semester-4/gent-401.pdf so the overview passes validate:content; the owner should approve or revert it.
  - Figures are placed in English only (fig-U1-1 to fig-U1-4, no .ur.svg yet); banner fig-U1-5 is a prompt-only row in figures/unit-01.banner.md for the illustrate job.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
