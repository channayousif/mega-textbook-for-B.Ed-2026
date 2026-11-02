---
id: crew-efmp-406-u03-author
title: crew author EFMP-406 unit 3
stage: misc
date: 2026-11-02
surface: agent
model: agy
feature: efmp-406
branch: crew/efmp-406-u03-author
user: crew
command: crew author
labels: ["crew", "agy", "author"]
links:
  spec: specs/content/efmp-406/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/efmp-406/_category_.json
 - docs/semester-3/efmp-406/course-overview.mdx
 - docs/semester-3/efmp-406/unit-03/index.mdx
 - docs/semester-3/efmp-406/unit-03/topic-01.mdx
 - docs/semester-3/efmp-406/unit-03/topic-02.mdx
 - docs/semester-3/efmp-406/unit-03/unit-assessment.mdx
 - history/prompts/efmp-406/crew-efmp-406-u03-author.green.prompt.md
 - specs/content/efmp-406/concepts/unit-03.md
 - specs/content/efmp-406/coverage/unit-03.md
 - specs/content/efmp-406/figures/unit-03.md
 - specs/content/efmp-406/reviews/unit-03/G2/20261102T074142082Z-gates.json
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261102T074142082Z/check-bloom-bands.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261102T074142082Z/check-concept-graph.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261102T074142082Z/check-depth-gate.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261102T074142082Z/check-docs-sync.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261102T074142082Z/check-figures.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261102T074142082Z/check-no-answer-keys.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261102T074142082Z/check-no-em-dash.txt
 - specs/content/efmp-406/reviews/unit-03/G2/logs-20261102T074142082Z/validate-content.txt
 - specs/content/efmp-406/sources/texts/ashraf-2021-multilingual.md
 - specs/content/efmp-406/sources/texts/papen-2023-nls.md
 - specs/content/efmp-406/sources/unit-03.md
 - specs/content/efmp-406/tasks.md
 - static/img/figures/efmp-406/unit-03/fig-U3-1.dark.svg
 - static/img/figures/efmp-406/unit-03/fig-U3-1.svg
 - static/img/figures/efmp-406/unit-03/fig-U3-2.dark.svg
 - static/img/figures/efmp-406/unit-03/fig-U3-2.svg
 - static/img/figures/efmp-406/unit-03/fig-U3-3.dark.svg
 - static/img/figures/efmp-406/unit-03/fig-U3-3.svg
 - static/img/figures/efmp-406/unit-03/fig-U3-4.dark.svg
 - static/img/figures/efmp-406/unit-03/fig-U3-4.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-406-u03-author

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-406-u03-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Author EFMP-406 Unit 3 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-406 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-406/`, and `static/img/figures/efmp-406/unit-03/`.

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

Authored English EFMP-406 Unit 3 ("Literacy, Language, and Society") with two 9-part topic cycles, 25-item Bloom-aligned assessment bank, four SVG figures with dark variants, verified open-access sources, and full content gate verification.

## Outcome

- Impact: author for EFMP-406 Unit 3 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 31 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Authored English EFMP-406 Unit 3 ("Literacy, Language, and Society") with two 9-part topic cycles, 25-item Bloom-aligned assessment bank, four SVG figures with dark variants, verified open-access sources, and full content gate verification.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - English Unit 3 draft is complete, G2 evidence recorded, and all 13 content gates pass.
  - G3 independent English review is ready to be scheduled with a separate reviewer run.
  - Urdu translation (G4) and review (G5) remain separate downstream tasks.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
