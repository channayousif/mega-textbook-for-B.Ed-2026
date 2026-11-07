---
id: crew-efmp-407-u08-author
title: crew author EFMP-407 unit 8
stage: misc
date: 2026-11-07
surface: agent
model: gemini
feature: efmp-407
branch: crew/efmp-407-u08-author
user: crew
command: crew author
labels: ["crew", "agy", "author"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-3/efmp-407/unit-08/index.mdx
  - docs/semester-3/efmp-407/unit-08/topic-01.mdx
  - docs/semester-3/efmp-407/unit-08/topic-02.mdx
  - docs/semester-3/efmp-407/unit-08/unit-assessment.mdx
  - docs/semester-3/efmp-407/unit-08/unit-teacher-notes.mdx
  - history/prompts/efmp-407/crew-efmp-407-u08-author.green.prompt.md
  - specs/content/efmp-407/authoring/unit-08.md
  - specs/content/efmp-407/concepts/unit-08.md
  - specs/content/efmp-407/coverage/unit-08.md
  - specs/content/efmp-407/figures/unit-08.banner.md
  - specs/content/efmp-407/figures/unit-08.md
  - specs/content/efmp-407/reviews/unit-08/G2/20261107T082658818Z-gates.json
  - specs/content/efmp-407/reviews/unit-08/G2/logs-20261107T082658818Z/check-bloom-bands.txt
  - specs/content/efmp-407/reviews/unit-08/G2/logs-20261107T082658818Z/check-concept-graph.txt
  - specs/content/efmp-407/reviews/unit-08/G2/logs-20261107T082658818Z/check-depth-gate.txt
  - specs/content/efmp-407/reviews/unit-08/G2/logs-20261107T082658818Z/check-docs-sync.txt
  - specs/content/efmp-407/reviews/unit-08/G2/logs-20261107T082658818Z/check-figures.txt
  - specs/content/efmp-407/reviews/unit-08/G2/logs-20261107T082658818Z/check-no-answer-keys.txt
  - specs/content/efmp-407/reviews/unit-08/G2/logs-20261107T082658818Z/check-no-em-dash.txt
  - specs/content/efmp-407/reviews/unit-08/G2/logs-20261107T082658818Z/validate-content.txt
  - specs/content/efmp-407/sources/texts/jumani-abbasi-2015.md
  - specs/content/efmp-407/sources/texts/sindh-rte-act-2013.md
  - specs/content/efmp-407/sources/texts/wals-2024-whole-school.md
  - specs/content/efmp-407/sources/unit-08.md
  - specs/content/efmp-407/tasks.md
  - static/img/figures/efmp-407/unit-08/fig-U8-1.dark.svg
  - static/img/figures/efmp-407/unit-08/fig-U8-1.svg
  - static/img/figures/efmp-407/unit-08/fig-U8-2.dark.svg
  - static/img/figures/efmp-407/unit-08/fig-U8-2.svg
  - static/img/figures/efmp-407/unit-08/fig-U8-3.dark.svg
  - static/img/figures/efmp-407/unit-08/fig-U8-3.svg
  - static/img/figures/efmp-407/unit-08/fig-U8-4.dark.svg
  - static/img/figures/efmp-407/unit-08/fig-U8-4.svg
tests:
  - npm run check:content
---

## Prompt

# Crew job efmp-407-u08-author

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u08-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Author EFMP-407 Unit 8 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job). Topic titles read "Topic N.M - Title" (validate:content checks it).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-407 Unit 8 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-407/`, and `static/img/figures/efmp-407/unit-08/`.

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

Authored EFMP-407 Unit 8 in English with index, two nine-part topic cycles, 10/10/5 assessment bank with bounded answers and marking guidance, teacher notes, four placed SVG figures with derived dark variants, coverage matrix, sources with bound excerpts, concept graph, banner plan, tracker update, and G2 gate evidence, leaving G3, G4 and G5 open.

## Outcome

- Impact: author for EFMP-407 Unit 8 by agy worker (attempt 1).
- Tests: npm run check:content passed in the job worktree before completing the job.
- Files: 33 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Authored EFMP-407 Unit 8 in English with index, two nine-part topic cycles, 10/10/5 assessment bank with bounded answers, teacher notes, four placed SVG figures with derived dark variants, coverage matrix, sources with bound excerpts, concept graph, and G2 gate evidence.
- Decisions the team must respect: G3/G5 stay open awaiting an independent reviewer; this commit does not certify review.
- Pending / next owner: crew lead / G3 independent reviewer.
- Notes for the next job on this unit:
  - All ten Urdu concept labels in `concepts/unit-08.md` are authored because none is banked in `terminology.csv`.
  - Banner figure `fig-U8-5` in `figures/unit-08.banner.md` remains `prompt-only` for the illustrator pass.
  - Figure text geometry is unmeasured locally (`measure-figure-text.mjs` requires Chromium, forbidden by the brief); CI `figure-geometry` measures them.
- Paperclip issues affected: none (work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
