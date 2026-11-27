---
id: crew-efpg-402-u03-author
title: crew author EFPG-402 unit 3
stage: misc
date: 2026-11-27
surface: agent
model: claude
feature: efpg-402
branch: crew/efpg-402-u03-author
user: crew
command: crew author
labels: ["crew", "claude", "author"]
links:
  spec: specs/content/efpg-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/efpg-402/unit-03/index.mdx
 - docs/semester-4/efpg-402/unit-03/topic-01.mdx
 - docs/semester-4/efpg-402/unit-03/topic-02.mdx
 - docs/semester-4/efpg-402/unit-03/topic-03.mdx
 - docs/semester-4/efpg-402/unit-03/topic-04.mdx
 - docs/semester-4/efpg-402/unit-03/topic-05.mdx
 - docs/semester-4/efpg-402/unit-03/topic-06.mdx
 - docs/semester-4/efpg-402/unit-03/topic-07.mdx
 - docs/semester-4/efpg-402/unit-03/unit-assessment.mdx
 - specs/content/efpg-402/concepts/unit-03.md
 - specs/content/efpg-402/coverage/unit-03.md
 - specs/content/efpg-402/figures/unit-03.banner.md
 - specs/content/efpg-402/figures/unit-03.md
 - specs/content/efpg-402/reviews/unit-03/G2/20261127T111536636Z-gates.json
 - specs/content/efpg-402/reviews/unit-03/G2/logs-20261127T111536636Z/check-bloom-bands.txt
 - specs/content/efpg-402/reviews/unit-03/G2/logs-20261127T111536636Z/check-concept-graph.txt
 - specs/content/efpg-402/reviews/unit-03/G2/logs-20261127T111536636Z/check-depth-gate.txt
 - specs/content/efpg-402/reviews/unit-03/G2/logs-20261127T111536636Z/check-docs-sync.txt
 - specs/content/efpg-402/reviews/unit-03/G2/logs-20261127T111536636Z/check-figures.txt
 - specs/content/efpg-402/reviews/unit-03/G2/logs-20261127T111536636Z/check-no-answer-keys.txt
 - specs/content/efpg-402/reviews/unit-03/G2/logs-20261127T111536636Z/check-no-em-dash.txt
 - specs/content/efpg-402/reviews/unit-03/G2/logs-20261127T111536636Z/validate-content.txt
 - specs/content/efpg-402/sources/texts/banchi-bell-2008.md
 - specs/content/efpg-402/sources/texts/behrendt-franklin-2014.md
 - specs/content/efpg-402/sources/texts/bscs-2006-5e.md
 - specs/content/efpg-402/sources/texts/kilpatrick-1918.md
 - specs/content/efpg-402/sources/texts/morris-2020-kolb.md
 - specs/content/efpg-402/sources/texts/prince-felder-2006.md
 - specs/content/efpg-402/sources/unit-03.md
 - specs/content/efpg-402/tasks.md
 - static/img/figures/efpg-402/unit-03/fig-U3-1.dark.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-1.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-10.dark.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-10.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-11.dark.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-11.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-12.dark.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-12.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-13.dark.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-13.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-14.dark.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-14.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-2.dark.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-2.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-3.dark.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-3.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-4.dark.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-4.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-5.dark.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-5.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-6.dark.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-6.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-7.dark.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-7.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-8.dark.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-8.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-9.dark.svg
 - static/img/figures/efpg-402/unit-03/fig-U3-9.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efpg-402-u03-author

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpg-402-u03-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Author EFPG-402 Unit 3 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job). Topic titles read "Topic N.M - Title" (validate:content checks it).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFPG-402 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpg-402/`, and `static/img/figures/efpg-402/unit-03/`.

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

Authored EFPG-402 Unit 3 in English (seven topics, a 10/10/5 assessment, coverage, sources with six new bound excerpts, a concept graph and 14 placed schematic SVGs) and recorded its G2 gate evidence.

## Outcome

- Impact: author for EFPG-402 Unit 3 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 58 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Authored EFPG-402 Unit 3 in English (seven topics, a 10/10/5 assessment, coverage, sources with six new bound excerpts, a concept graph and 14 placed schematic SVGs) and recorded its G2 gate evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The 14 Unit 3 SVGs were drawn by Claude because Codex was out of quota; G3 should check whether each one fits its point. Urdu `.ur.svg` labels and banner fig-U3-15 (prompt-only) are still to do.
  - Unit 3 cites the existing `ncp-science-2022` and `sep-scientific-method` excerpts unchanged. Editing either file will make both Unit 1's and Unit 3's G2 evidence out of date.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
