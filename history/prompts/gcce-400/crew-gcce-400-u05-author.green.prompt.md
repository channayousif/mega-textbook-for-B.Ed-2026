---
id: crew-gcce-400-u05-author
title: crew author GCCE-400 unit 5
stage: misc
date: 2026-11-22
surface: agent
model: agy
feature: gcce-400
branch: crew/gcce-400-u05-author
user: crew
command: crew author
labels: ["crew", "agy", "author"]
links:
  spec: specs/content/gcce-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/gcce-400/unit-05/index.mdx
 - docs/semester-4/gcce-400/unit-05/topic-01.mdx
 - docs/semester-4/gcce-400/unit-05/topic-02.mdx
 - docs/semester-4/gcce-400/unit-05/topic-03.mdx
 - docs/semester-4/gcce-400/unit-05/unit-assessment.mdx
 - docs/semester-4/gcce-400/unit-05/unit-teacher-notes.mdx
 - history/prompts/gcce-400/crew-gcce-400-u05-author.green.prompt.md
 - specs/content/gcce-400/concepts/unit-05.md
 - specs/content/gcce-400/coverage/unit-05.md
 - specs/content/gcce-400/figures/unit-05.banner.md
 - specs/content/gcce-400/figures/unit-05.md
 - specs/content/gcce-400/reviews/unit-05/G2/20261122T123558274Z-gates.json
 - specs/content/gcce-400/reviews/unit-05/G2/20261122T124257339Z-gates.json
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261122T123558274Z/check-bloom-bands.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261122T123558274Z/check-concept-graph.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261122T123558274Z/check-depth-gate.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261122T123558274Z/check-docs-sync.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261122T123558274Z/check-figures.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261122T123558274Z/check-no-answer-keys.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261122T123558274Z/check-no-em-dash.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261122T123558274Z/validate-content.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261122T124257339Z/check-bloom-bands.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261122T124257339Z/check-concept-graph.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261122T124257339Z/check-depth-gate.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261122T124257339Z/check-docs-sync.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261122T124257339Z/check-figures.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261122T124257339Z/check-no-answer-keys.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261122T124257339Z/check-no-em-dash.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261122T124257339Z/validate-content.txt
 - specs/content/gcce-400/sources/texts/batool-2019-civil-society.md
 - specs/content/gcce-400/sources/texts/openstax-sociology-3e.md
 - specs/content/gcce-400/sources/unit-05.md
 - specs/content/gcce-400/tasks.md
 - static/img/figures/gcce-400/unit-05/fig-U5-1.dark.svg
 - static/img/figures/gcce-400/unit-05/fig-U5-1.svg
 - static/img/figures/gcce-400/unit-05/fig-U5-2.dark.svg
 - static/img/figures/gcce-400/unit-05/fig-U5-2.svg
 - static/img/figures/gcce-400/unit-05/fig-U5-3.dark.svg
 - static/img/figures/gcce-400/unit-05/fig-U5-3.svg
 - static/img/figures/gcce-400/unit-05/fig-U5-4.dark.svg
 - static/img/figures/gcce-400/unit-05/fig-U5-4.svg
 - static/img/figures/gcce-400/unit-05/fig-U5-5.dark.svg
 - static/img/figures/gcce-400/unit-05/fig-U5-5.svg
 - static/img/figures/gcce-400/unit-05/fig-U5-6.dark.svg
 - static/img/figures/gcce-400/unit-05/fig-U5-6.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gcce-400-u05-author

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gcce-400-u05-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Author GCCE-400 Unit 5 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job). Topic titles read "Topic N.M - Title" (validate:content checks it).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GCCE-400 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gcce-400/`, and `static/img/figures/gcce-400/unit-05/`.

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

Authored GCCE-400 Unit 5 Advocacy and Activism in English with three topic cycles, 10/10/5 assessment, six placed schematic SVGs with dark variants, complete governance artifacts, G2 gate evidence, and full check:content gate clearance.

## Outcome

- Impact: author for GCCE-400 Unit 5 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 45 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Authored GCCE-400 Unit 5 Advocacy and Activism in English with three topic cycles, 10/10/5 assessment, six placed schematic SVGs with dark variants, complete governance artifacts, G2 gate evidence, and full check:content gate clearance.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 English review and G4 Urdu translation remain open as separate jobs; banner fig-U5-7 is prompt-only for the illustrate pass.
  - Reviewers should confirm the Lawyers' Movement timeline against Batool et al. (2019) and the cited constitutional provisions against the latest text.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
