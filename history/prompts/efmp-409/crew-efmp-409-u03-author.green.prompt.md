---
id: crew-efmp-409-u03-author
title: crew author EFMP-409 unit 3
stage: green
date: 2026-11-25
surface: agent
model: gemini
feature: efmp-409
branch: crew/efmp-409-u03-author
user: crew
command: crew author
labels: ["crew", "agy", "author"]
links:
  spec: specs/content/efmp-409/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-4/efmp-409/unit-03/index.mdx
  - docs/semester-4/efmp-409/unit-03/topic-01.mdx
  - docs/semester-4/efmp-409/unit-03/topic-02.mdx
  - docs/semester-4/efmp-409/unit-03/topic-03.mdx
  - docs/semester-4/efmp-409/unit-03/topic-04.mdx
  - docs/semester-4/efmp-409/unit-03/topic-05.mdx
  - docs/semester-4/efmp-409/unit-03/topic-06.mdx
  - docs/semester-4/efmp-409/unit-03/unit-assessment.mdx
  - docs/semester-4/efmp-409/unit-03/unit-teacher-notes.mdx
  - specs/content/efmp-409/concepts/unit-03.md
  - specs/content/efmp-409/coverage/unit-03.md
  - specs/content/efmp-409/figures/unit-03.banner.md
  - specs/content/efmp-409/figures/unit-03.md
  - specs/content/efmp-409/sources/texts/cheddadi-1994-ibn-khaldun.md
  - specs/content/efmp-409/sources/texts/iqbal-cyber-library.md
  - specs/content/efmp-409/sources/texts/sep-bertram-rousseau.md
  - specs/content/efmp-409/sources/texts/sep-hildebrand-dewey.md
  - specs/content/efmp-409/sources/texts/sep-kraut-plato.md
  - specs/content/efmp-409/sources/texts/sep-shields-aristotle.md
  - specs/content/efmp-409/sources/unit-03.md
  - specs/content/efmp-409/tasks.md
  - static/img/figures/efmp-409/unit-03/fig-U3-1.dark.svg
  - static/img/figures/efmp-409/unit-03/fig-U3-1.svg
  - static/img/figures/efmp-409/unit-03/fig-U3-2.dark.svg
  - static/img/figures/efmp-409/unit-03/fig-U3-2.svg
  - static/img/figures/efmp-409/unit-03/fig-U3-3.dark.svg
  - static/img/figures/efmp-409/unit-03/fig-U3-3.svg
  - static/img/figures/efmp-409/unit-03/fig-U3-4.dark.svg
  - static/img/figures/efmp-409/unit-03/fig-U3-4.svg
  - static/img/figures/efmp-409/unit-03/fig-U3-5.dark.svg
  - static/img/figures/efmp-409/unit-03/fig-U3-5.svg
  - static/img/figures/efmp-409/unit-03/fig-U3-6.dark.svg
  - static/img/figures/efmp-409/unit-03/fig-U3-6.svg
  - static/img/figures/efmp-409/unit-03/fig-U3-7.dark.svg
  - static/img/figures/efmp-409/unit-03/fig-U3-7.svg
  - static/img/figures/efmp-409/unit-03/fig-U3-8.dark.svg
  - static/img/figures/efmp-409/unit-03/fig-U3-8.svg
  - static/img/figures/efmp-409/unit-03/fig-U3-9.dark.svg
  - static/img/figures/efmp-409/unit-03/fig-U3-9.svg
  - static/img/figures/efmp-409/unit-03/fig-U3-10.dark.svg
  - static/img/figures/efmp-409/unit-03/fig-U3-10.svg
  - static/img/figures/efmp-409/unit-03/fig-U3-11.dark.svg
  - static/img/figures/efmp-409/unit-03/fig-U3-11.svg
  - static/img/figures/efmp-409/unit-03/fig-U3-12.dark.svg
  - static/img/figures/efmp-409/unit-03/fig-U3-12.svg
tests:
  - npm run check:content
---

## Prompt

# Crew job efmp-409-u03-author

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-409-u03-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Author EFMP-409 Unit 3 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job). Topic titles read "Topic N.M - Title" (validate:content checks it).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-409 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-409/`, and `static/img/figures/efmp-409/unit-03/`.

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

Authored EFMP-409 Unit 3 (six topics, 10/10/5 assessment, teacher notes, twelve placed SVG figures with dark variants) with sources, coverage, concepts, tracker and G2 evidence, all content gates green.

## Outcome

- Impact: author for EFMP-409 Unit 3 by agy.
- Tests: npm run check:content passed in the job worktree before completing task.
- Files: 46 file(s), listed above.

## Handoff (for CEO and agents)

- **What shipped**: Complete English authoring of EFMP-409 Unit 3 (The History of Education), including 6 topics, unit assessment (10 MCQs, 10 RRQs, 5 ERQs), teacher notes, 12 placed SVG figures (and 12 dark variants) with zero text overflows, full coverage matrix (U3-01 to U3-19), concept graph (CON:EFMP-409-3-1 to CON:EFMP-409-3-13), bound source texts, and verified G2 gate evidence.
- **Decisions**: Unit 3 is a 6-topic unit spanning Weeks 5-10; depth budget stands at 97 reading-min (within the approved 74-102 band).
- **Pending and owners**: G3 independent review, figure generation for banner (fig-U3-13 prompt-only), and Urdu translation (G4/G5) by subsequent crew workers.
- **Affected issues**: EFMP-409 Unit 3 curriculum progression.
