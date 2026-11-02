---
id: crew-giss-401-u05-author
title: crew author GISS-401 unit 5
stage: misc
date: 2026-11-03
surface: agent
model: agy
feature: giss-401
branch: crew/giss-401-u05-author
user: crew
command: crew author
labels: ["crew", "agy", "author"]
links:
  spec: specs/content/giss-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-3/giss-401/_category_.json
  - docs/semester-3/giss-401/course-overview.mdx
  - docs/semester-3/giss-401/unit-05/index.mdx
  - docs/semester-3/giss-401/unit-05/topic-01.mdx
  - docs/semester-3/giss-401/unit-05/topic-02.mdx
  - docs/semester-3/giss-401/unit-05/unit-assessment.mdx
  - history/prompts/giss-401/crew-giss-401-u05-author.green.prompt.md
  - specs/content/giss-401/authoring/unit-05.md
  - specs/content/giss-401/concepts/unit-05.md
  - specs/content/giss-401/coverage/unit-05.md
  - specs/content/giss-401/figures/unit-05.md
  - specs/content/giss-401/reviews/unit-05/G2/20261102T233631738Z-gates.json
  - specs/content/giss-401/reviews/unit-05/G2/logs-20261102T233631738Z/check-bloom-bands.txt
  - specs/content/giss-401/reviews/unit-05/G2/logs-20261102T233631738Z/check-concept-graph.txt
  - specs/content/giss-401/reviews/unit-05/G2/logs-20261102T233631738Z/check-depth-gate.txt
  - specs/content/giss-401/reviews/unit-05/G2/logs-20261102T233631738Z/check-docs-sync.txt
  - specs/content/giss-401/reviews/unit-05/G2/logs-20261102T233631738Z/check-figures.txt
  - specs/content/giss-401/reviews/unit-05/G2/logs-20261102T233631738Z/check-no-answer-keys.txt
  - specs/content/giss-401/reviews/unit-05/G2/logs-20261102T233631738Z/check-no-em-dash.txt
  - specs/content/giss-401/reviews/unit-05/G2/logs-20261102T233631738Z/validate-content.txt
  - specs/content/giss-401/sources/texts/abdel-salam-2015-democracy.md
  - specs/content/giss-401/sources/texts/pak-constitution-1973.md
  - specs/content/giss-401/sources/texts/quran-translation.md
  - specs/content/giss-401/sources/texts/rahman-2020-zakat.md
  - specs/content/giss-401/sources/unit-05.md
  - specs/content/giss-401/tasks.md
  - static/img/figures/giss-401/unit-05/fig-U5-1.dark.svg
  - static/img/figures/giss-401/unit-05/fig-U5-1.svg
  - static/img/figures/giss-401/unit-05/fig-U5-2.dark.svg
  - static/img/figures/giss-401/unit-05/fig-U5-2.svg
  - static/img/figures/giss-401/unit-05/fig-U5-3.dark.svg
  - static/img/figures/giss-401/unit-05/fig-U5-3.svg
  - static/img/figures/giss-401/unit-05/fig-U5-4.dark.svg
  - static/img/figures/giss-401/unit-05/fig-U5-4.svg
tests:
  - npm run check:content
---

## Prompt

# Crew job giss-401-u05-author

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/giss-401-u05-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Author GISS-401 Unit 5 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GISS-401 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/giss-401/`, and `static/img/figures/giss-401/unit-05/`.

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

Authored English GISS-401 Unit 5 ("The Economic and Political Systems of Islam") with two 9-part topic cycles, 25-item Bloom-aligned assessment bank, four SVG figures with dark variants, verified open-access sources, G2 gate evidence, and full content gate verification.

## Outcome

- Impact: author for GISS-401 Unit 5 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before committing.
- Files: 34 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Authored English GISS-401 Unit 5 ("The Economic and Political Systems of Islam") with two 9-part topic cycles, 25-item Bloom-aligned assessment bank, four SVG figures with dark variants, verified open-access sources, G2 gate evidence recorded, and full content gate verification.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this job records deterministic G2 gate evidence only and does not certify review.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - English Unit 5 draft is complete, G2 evidence recorded, and all 13 content gates pass cleanly.
  - G3 independent English review is ready to be scheduled with a separate reviewer run.
  - Urdu translation (G4) and review (G5) remain separate downstream tasks.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
