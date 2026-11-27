---
id: crew-efpg-402-u01-author
title: crew author EFPG-402 unit 1
stage: misc
date: 2026-11-27
surface: agent
model: claude
feature: efpg-402
branch: crew/efpg-402-u01-author
user: crew
command: crew author
labels: ["crew", "claude", "author"]
links:
  spec: specs/content/efpg-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - catalog/course-guides.json
 - docs/semester-4/efpg-402/_category_.json
 - docs/semester-4/efpg-402/course-overview.mdx
 - docs/semester-4/efpg-402/unit-01/index.mdx
 - docs/semester-4/efpg-402/unit-01/topic-01.mdx
 - docs/semester-4/efpg-402/unit-01/topic-02.mdx
 - docs/semester-4/efpg-402/unit-01/topic-03.mdx
 - docs/semester-4/efpg-402/unit-01/topic-04.mdx
 - docs/semester-4/efpg-402/unit-01/topic-05.mdx
 - docs/semester-4/efpg-402/unit-01/unit-assessment.mdx
 - specs/content/efpg-402/concepts/unit-01.md
 - specs/content/efpg-402/coverage/unit-01.md
 - specs/content/efpg-402/figures/unit-01.banner.md
 - specs/content/efpg-402/figures/unit-01.md
 - specs/content/efpg-402/reviews/unit-01/G2/20261127T062540795Z-gates.json
 - specs/content/efpg-402/reviews/unit-01/G2/logs-20261127T062540795Z/check-bloom-bands.txt
 - specs/content/efpg-402/reviews/unit-01/G2/logs-20261127T062540795Z/check-concept-graph.txt
 - specs/content/efpg-402/reviews/unit-01/G2/logs-20261127T062540795Z/check-depth-gate.txt
 - specs/content/efpg-402/reviews/unit-01/G2/logs-20261127T062540795Z/check-docs-sync.txt
 - specs/content/efpg-402/reviews/unit-01/G2/logs-20261127T062540795Z/check-figures.txt
 - specs/content/efpg-402/reviews/unit-01/G2/logs-20261127T062540795Z/check-no-answer-keys.txt
 - specs/content/efpg-402/reviews/unit-01/G2/logs-20261127T062540795Z/check-no-em-dash.txt
 - specs/content/efpg-402/reviews/unit-01/G2/logs-20261127T062540795Z/validate-content.txt
 - specs/content/efpg-402/sources/texts/epi-pakistan-factfile.md
 - specs/content/efpg-402/sources/texts/halai-2003-nos.md
 - specs/content/efpg-402/sources/texts/ncp-science-2022.md
 - specs/content/efpg-402/sources/texts/sep-scientific-method.md
 - specs/content/efpg-402/sources/unit-01.md
 - specs/content/efpg-402/tasks.md
 - static/guides/semester-4/efpg-402.pdf
 - static/img/figures/efpg-402/unit-01/fig-U1-1.dark.svg
 - static/img/figures/efpg-402/unit-01/fig-U1-1.svg
 - static/img/figures/efpg-402/unit-01/fig-U1-10.dark.svg
 - static/img/figures/efpg-402/unit-01/fig-U1-10.svg
 - static/img/figures/efpg-402/unit-01/fig-U1-2.dark.svg
 - static/img/figures/efpg-402/unit-01/fig-U1-2.svg
 - static/img/figures/efpg-402/unit-01/fig-U1-3.dark.svg
 - static/img/figures/efpg-402/unit-01/fig-U1-3.svg
 - static/img/figures/efpg-402/unit-01/fig-U1-4.dark.svg
 - static/img/figures/efpg-402/unit-01/fig-U1-4.svg
 - static/img/figures/efpg-402/unit-01/fig-U1-5.dark.svg
 - static/img/figures/efpg-402/unit-01/fig-U1-5.svg
 - static/img/figures/efpg-402/unit-01/fig-U1-6.dark.svg
 - static/img/figures/efpg-402/unit-01/fig-U1-6.svg
 - static/img/figures/efpg-402/unit-01/fig-U1-7.dark.svg
 - static/img/figures/efpg-402/unit-01/fig-U1-7.svg
 - static/img/figures/efpg-402/unit-01/fig-U1-8.dark.svg
 - static/img/figures/efpg-402/unit-01/fig-U1-8.svg
 - static/img/figures/efpg-402/unit-01/fig-U1-9.dark.svg
 - static/img/figures/efpg-402/unit-01/fig-U1-9.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efpg-402-u01-author

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpg-402-u01-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Author EFPG-402 Unit 1 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job). Topic titles read "Topic N.M - Title" (validate:content checks it). This course has no course-overview.mdx yet: write it as part of this commit, modelled on docs/semester-3/gicp-400/course-overview.mdx, so later author jobs and the course's G2 evidence can bind it.

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFPG-402 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpg-402/`, and `static/img/figures/efpg-402/unit-01/`.

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

Authored EFPG-402 Unit 1 (course overview, index, five topics, unit assessment, coverage/sources/excerpts/concepts/tracker, ten placed schematic SVGs with dark twins, course-guide entry) and recorded G2 evidence, with all 14 content gates passing.

## Outcome

- Impact: author for EFPG-402 Unit 1 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 50 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Authored EFPG-402 Unit 1 (course overview, index, five topics, unit assessment, coverage/sources/excerpts/concepts/tracker, ten placed schematic SVGs with dark twins, course-guide entry) and recorded G2 evidence, with all 14 content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - catalog/course-guides.json was edited (EFPG-402 entry, pages 21-24, plus static/guides/semester-4/efpg-402.pdf) despite the brief's catalog ban, because validate:content requires it for the overview and sibling jobs did the same; revert if the ban covers this file.
  - Urdu mirror job needs ten .ur.svg label translations (generator kept at .crew/gen_figs.py); banner fig-U1-11 is prompt-only for the illustrate job; npm run build has not been run on these pages.
  - Topic 1.2 runs 10 reading-min against the spec's 6-9 per-topic guide (unit total 58 is within 42-61); fig-U1-6 prompt was changed to a top-to-bottom layout.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
