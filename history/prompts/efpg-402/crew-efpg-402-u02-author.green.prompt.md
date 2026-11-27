---
id: crew-efpg-402-u02-author
title: crew author EFPG-402 unit 2
stage: misc
date: 2026-11-27
surface: agent
model: agy2
feature: efpg-402
branch: crew/efpg-402-u02-author
user: crew
command: crew author
labels: ["crew", "agy2", "author"]
links:
  spec: specs/content/efpg-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/efpg-402/unit-02/index.mdx
 - docs/semester-4/efpg-402/unit-02/topic-01.mdx
 - docs/semester-4/efpg-402/unit-02/topic-02.mdx
 - docs/semester-4/efpg-402/unit-02/topic-03.mdx
 - docs/semester-4/efpg-402/unit-02/topic-04.mdx
 - docs/semester-4/efpg-402/unit-02/topic-05.mdx
 - docs/semester-4/efpg-402/unit-02/unit-assessment.mdx
 - history/prompts/efpg-402/crew-efpg-402-u02-author.green.prompt.md
 - specs/content/efpg-402/concepts/unit-02.md
 - specs/content/efpg-402/coverage/unit-02.md
 - specs/content/efpg-402/figures/unit-02.md
 - specs/content/efpg-402/reviews/unit-02/G2/20261127T100934427Z-gates.json
 - specs/content/efpg-402/reviews/unit-02/G2/20261127T101358659Z-gates.json
 - specs/content/efpg-402/reviews/unit-02/G2/logs-20261127T100934427Z/check-bloom-bands.txt
 - specs/content/efpg-402/reviews/unit-02/G2/logs-20261127T100934427Z/check-concept-graph.txt
 - specs/content/efpg-402/reviews/unit-02/G2/logs-20261127T100934427Z/check-depth-gate.txt
 - specs/content/efpg-402/reviews/unit-02/G2/logs-20261127T100934427Z/check-docs-sync.txt
 - specs/content/efpg-402/reviews/unit-02/G2/logs-20261127T100934427Z/check-figures.txt
 - specs/content/efpg-402/reviews/unit-02/G2/logs-20261127T100934427Z/check-no-answer-keys.txt
 - specs/content/efpg-402/reviews/unit-02/G2/logs-20261127T100934427Z/check-no-em-dash.txt
 - specs/content/efpg-402/reviews/unit-02/G2/logs-20261127T100934427Z/validate-content.txt
 - specs/content/efpg-402/reviews/unit-02/G2/logs-20261127T101358659Z/check-bloom-bands.txt
 - specs/content/efpg-402/reviews/unit-02/G2/logs-20261127T101358659Z/check-concept-graph.txt
 - specs/content/efpg-402/reviews/unit-02/G2/logs-20261127T101358659Z/check-depth-gate.txt
 - specs/content/efpg-402/reviews/unit-02/G2/logs-20261127T101358659Z/check-docs-sync.txt
 - specs/content/efpg-402/reviews/unit-02/G2/logs-20261127T101358659Z/check-figures.txt
 - specs/content/efpg-402/reviews/unit-02/G2/logs-20261127T101358659Z/check-no-answer-keys.txt
 - specs/content/efpg-402/reviews/unit-02/G2/logs-20261127T101358659Z/check-no-em-dash.txt
 - specs/content/efpg-402/reviews/unit-02/G2/logs-20261127T101358659Z/validate-content.txt
 - specs/content/efpg-402/sources/unit-02.md
 - specs/content/efpg-402/tasks.md
 - static/img/figures/efpg-402/unit-02/fig-U2-1.dark.svg
 - static/img/figures/efpg-402/unit-02/fig-U2-1.svg
 - static/img/figures/efpg-402/unit-02/fig-U2-10.dark.svg
 - static/img/figures/efpg-402/unit-02/fig-U2-10.svg
 - static/img/figures/efpg-402/unit-02/fig-U2-2.dark.svg
 - static/img/figures/efpg-402/unit-02/fig-U2-2.svg
 - static/img/figures/efpg-402/unit-02/fig-U2-3.dark.svg
 - static/img/figures/efpg-402/unit-02/fig-U2-3.svg
 - static/img/figures/efpg-402/unit-02/fig-U2-4.dark.svg
 - static/img/figures/efpg-402/unit-02/fig-U2-4.svg
 - static/img/figures/efpg-402/unit-02/fig-U2-5.dark.svg
 - static/img/figures/efpg-402/unit-02/fig-U2-5.svg
 - static/img/figures/efpg-402/unit-02/fig-U2-6.dark.svg
 - static/img/figures/efpg-402/unit-02/fig-U2-6.svg
 - static/img/figures/efpg-402/unit-02/fig-U2-7.dark.svg
 - static/img/figures/efpg-402/unit-02/fig-U2-7.svg
 - static/img/figures/efpg-402/unit-02/fig-U2-8.dark.svg
 - static/img/figures/efpg-402/unit-02/fig-U2-8.svg
 - static/img/figures/efpg-402/unit-02/fig-U2-9.dark.svg
 - static/img/figures/efpg-402/unit-02/fig-U2-9.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efpg-402-u02-author

You are the agy2 worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpg-402-u02-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Author EFPG-402 Unit 2 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job). Topic titles read "Topic N.M - Title" (validate:content checks it).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFPG-402 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpg-402/`, and `static/img/figures/efpg-402/unit-02/`.

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

Authored EFPG-402 Unit 2 English learning cycles, placed 10 schematic SVGs with dark twins passing geometry checks, and recorded G2 gate evidence with all 14 content gates passing.

## Outcome

- Impact: author for EFPG-402 Unit 2 by agy2 (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 51 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Authored EFPG-402 Unit 2 English learning cycles, placed 10 schematic SVGs with dark twins passing geometry checks, and recorded G2 gate evidence with all 14 content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Urdu mirror job (G4) will need to translate the 10 placed SVGs (.ur.svg twins) and unit prose; G3 English review remains open for independent review.
  - Unit banner (unit-02.banner.md) is not yet drafted and will be handled during banner illustration passes.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
