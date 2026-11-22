---
id: crew-guhq-301-u06-author
title: crew author GUHQ-301 unit 6
stage: misc
date: 2026-11-22
surface: agent
model: gemini-3.8-flash
feature: guhq-301
branch: crew/guhq-301-u06-author
user: crew
command: crew author
labels: ["crew", "agy", "author"]
links:
  spec: specs/content/guhq-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/guhq-301/unit-06/index.mdx
 - docs/semester-3/guhq-301/unit-06/topic-01.mdx
 - docs/semester-3/guhq-301/unit-06/unit-assessment.mdx
 - history/prompts/guhq-301/crew-guhq-301-u06-author.green.prompt.md
 - specs/content/guhq-301/concepts/unit-06.md
 - specs/content/guhq-301/coverage/unit-06.md
 - specs/content/guhq-301/figures/unit-06.md
 - specs/content/guhq-301/reviews/unit-06/G2/20261122T005752846Z-gates.json
 - specs/content/guhq-301/reviews/unit-06/G2/logs-20261122T005752846Z/check-bloom-bands.txt
 - specs/content/guhq-301/reviews/unit-06/G2/logs-20261122T005752846Z/check-concept-graph.txt
 - specs/content/guhq-301/reviews/unit-06/G2/logs-20261122T005752846Z/check-depth-gate.txt
 - specs/content/guhq-301/reviews/unit-06/G2/logs-20261122T005752846Z/check-docs-sync.txt
 - specs/content/guhq-301/reviews/unit-06/G2/logs-20261122T005752846Z/check-figures.txt
 - specs/content/guhq-301/reviews/unit-06/G2/logs-20261122T005752846Z/check-no-answer-keys.txt
 - specs/content/guhq-301/reviews/unit-06/G2/logs-20261122T005752846Z/check-no-em-dash.txt
 - specs/content/guhq-301/reviews/unit-06/G2/logs-20261122T005752846Z/validate-content.txt
 - specs/content/guhq-301/sources/unit-06.md
 - specs/content/guhq-301/tasks.md
 - static/img/figures/guhq-301/unit-06/fig-U6-1.dark.svg
 - static/img/figures/guhq-301/unit-06/fig-U6-1.svg
 - static/img/figures/guhq-301/unit-06/fig-U6-2.dark.svg
 - static/img/figures/guhq-301/unit-06/fig-U6-2.svg
 - static/img/figures/guhq-301/unit-06/fig-U6-3.dark.svg
 - static/img/figures/guhq-301/unit-06/fig-U6-3.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job guhq-301-u06-author

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/guhq-301-u06-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Author GUHQ-301 Unit 6 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job). Topic titles read "Topic N.M - Title" (validate:content checks it).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GUHQ-301 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/guhq-301/`, and `static/img/figures/guhq-301/unit-06/`.

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

Authored GUHQ-301 Unit 6 (Historical and Cultural Context of the Quran) in English with Topic 6.1, a 10/10/5 assessment, three placed schematic SVGs with dark variants, coverage/sources/figures/concepts governance artefacts, G2 gate evidence and updated tasks.md tracker; all 14 content gates pass.

## Outcome

- Impact: authored GUHQ-301 Unit 6 English content and schematics by agy.
- Tests: npm run check:content passed in the job worktree before completion.
- Files: 24 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Authored GUHQ-301 Unit 6 (Historical and Cultural Context of the Quran) in English with Topic 6.1 (Revelation in its setting), a 10/10/5 assessment, three placed schematic SVGs with dark variants, coverage/sources/figures/concepts artefacts, G2 gate evidence and the tracker row; all 14 content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Urdu job needs `.ur.svg` for all three figures and G5 review of the six authored Urdu concept labels.
  - G3 must make the religious-content check (content-spec drafting note 7); the classroom cases and pedagogical routines are flagged in `sources/unit-06.md` as instructional models.
