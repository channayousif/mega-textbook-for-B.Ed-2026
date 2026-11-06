---
id: crew-gicp-400-u01-author
title: crew author GICP-400 unit 1
stage: misc
date: 2026-11-06
surface: agent
model: codex
feature: gicp-400
branch: crew/gicp-400-u01-author
user: crew
command: crew author
labels: ["crew", "codex", "author"]
links:
  spec: specs/content/gicp-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/gicp-400/_category_.json
 - docs/semester-3/gicp-400/course-overview.mdx
 - docs/semester-3/gicp-400/unit-01/index.mdx
 - docs/semester-3/gicp-400/unit-01/topic-01.mdx
 - docs/semester-3/gicp-400/unit-01/topic-02.mdx
 - docs/semester-3/gicp-400/unit-01/unit-assessment.mdx
 - history/prompts/general/551-author-gicp400-unit-one.general.prompt.md
 - specs/content/gicp-400/concepts/unit-01.md
 - specs/content/gicp-400/coverage/unit-01.md
 - specs/content/gicp-400/figures/unit-01.banner.md
 - specs/content/gicp-400/figures/unit-01.md
 - specs/content/gicp-400/reviews/unit-01/G2/20261106T152656845Z-gates.json
 - specs/content/gicp-400/reviews/unit-01/G2/logs-20261106T152656845Z/check-bloom-bands.txt
 - specs/content/gicp-400/reviews/unit-01/G2/logs-20261106T152656845Z/check-concept-graph.txt
 - specs/content/gicp-400/reviews/unit-01/G2/logs-20261106T152656845Z/check-depth-gate.txt
 - specs/content/gicp-400/reviews/unit-01/G2/logs-20261106T152656845Z/check-docs-sync.txt
 - specs/content/gicp-400/reviews/unit-01/G2/logs-20261106T152656845Z/check-figures.txt
 - specs/content/gicp-400/reviews/unit-01/G2/logs-20261106T152656845Z/check-no-answer-keys.txt
 - specs/content/gicp-400/reviews/unit-01/G2/logs-20261106T152656845Z/check-no-em-dash.txt
 - specs/content/gicp-400/reviews/unit-01/G2/logs-20261106T152656845Z/validate-content.txt
 - specs/content/gicp-400/sources/texts/hassan-2020-two-nation.md
 - specs/content/gicp-400/sources/texts/iqbal-1930-address.md
 - specs/content/gicp-400/sources/texts/iqbal-reconstruction.md
 - specs/content/gicp-400/sources/texts/jinnah-1940-lahore.md
 - specs/content/gicp-400/sources/texts/jinnah-1947-assembly.md
 - specs/content/gicp-400/sources/texts/pak-constitution-1973.md
 - specs/content/gicp-400/sources/texts/quran-public-ethics.md
 - specs/content/gicp-400/sources/texts/roberts-2025-ideology.md
 - specs/content/gicp-400/sources/texts/waluchow-kyritsis-2023.md
 - specs/content/gicp-400/sources/unit-01.md
 - specs/content/gicp-400/tasks.md
 - static/img/figures/gicp-400/unit-01/fig-U1-1.dark.svg
 - static/img/figures/gicp-400/unit-01/fig-U1-1.svg
 - static/img/figures/gicp-400/unit-01/fig-U1-2.dark.svg
 - static/img/figures/gicp-400/unit-01/fig-U1-2.svg
 - static/img/figures/gicp-400/unit-01/fig-U1-3.dark.svg
 - static/img/figures/gicp-400/unit-01/fig-U1-3.svg
 - static/img/figures/gicp-400/unit-01/fig-U1-4.dark.svg
 - static/img/figures/gicp-400/unit-01/fig-U1-4.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gicp-400-u01-author

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gicp-400-u01-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Author GICP-400 Unit 1 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job). Topic titles read "Topic N.M - Title" (validate:content checks it).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GICP-400 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gicp-400/`, and `static/img/figures/gicp-400/unit-01/`.

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

Completed English GICP-400 Unit 1 with assessments, figures, source records, concept graph and validated G2 evidence.

## Outcome

- Impact: author for GICP-400 Unit 1 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 39 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Completed English GICP-400 Unit 1 with assessments, figures, source records, concept graph and validated G2 evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3/G5, Urdu translation and banner production remain open.
  - SVG browser geometry inspection remains pending because the brief prohibits browser runs.
  - G3/G5, Urdu translation and banner production remain open.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
