---
id: crew-efmp-406-u04-author
title: crew author EFMP-406 unit 4
stage: misc
date: 2026-11-02
surface: agent
model: codex
feature: efmp-406
branch: crew/efmp-406-u04-author
user: crew
command: crew author
labels: ["crew", "codex", "author"]
links:
  spec: specs/content/efmp-406/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/efmp-406/unit-04/index.mdx
 - docs/semester-3/efmp-406/unit-04/topic-01.mdx
 - docs/semester-3/efmp-406/unit-04/topic-02.mdx
 - docs/semester-3/efmp-406/unit-04/unit-assessment.mdx
 - docs/semester-3/efmp-406/unit-04/unit-teacher-notes.mdx
 - history/prompts/general/20261051-author-efmp-406-unit-four.general.prompt.md
 - specs/content/efmp-406/authoring/unit-04.md
 - specs/content/efmp-406/concepts/unit-04.md
 - specs/content/efmp-406/coverage/unit-04.md
 - specs/content/efmp-406/figures/unit-04.md
 - specs/content/efmp-406/glossary/unit-04.json
 - specs/content/efmp-406/sources/texts/alcolea-2020-mil.md
 - specs/content/efmp-406/sources/texts/cc-licenses.md
 - specs/content/efmp-406/sources/texts/furenes-2021-screen.md
 - specs/content/efmp-406/sources/texts/greenhow-2009-sns.md
 - specs/content/efmp-406/sources/unit-04.md
 - specs/content/efmp-406/tasks.md
 - static/img/figures/efmp-406/unit-04/fig-U4-1.dark.svg
 - static/img/figures/efmp-406/unit-04/fig-U4-1.svg
 - static/img/figures/efmp-406/unit-04/fig-U4-2.dark.svg
 - static/img/figures/efmp-406/unit-04/fig-U4-2.svg
 - static/img/figures/efmp-406/unit-04/fig-U4-3.dark.svg
 - static/img/figures/efmp-406/unit-04/fig-U4-3.svg
 - static/img/figures/efmp-406/unit-04/fig-U4-4.dark.svg
 - static/img/figures/efmp-406/unit-04/fig-U4-4.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-406-u04-author

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-406-u04-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Author EFMP-406 Unit 4 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-406 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-406/`, and `static/img/figures/efmp-406/unit-04/`.

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

Authored EFMP-406 Unit 4’s English draft, assessment bank, four schematics, governance records and PHR.

## Outcome

- Impact: author for EFMP-406 Unit 4 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 25 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Authored EFMP-406 Unit 4’s English draft, assessment bank, four schematics, governance records and PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Shared glossary additions are staged; catalog registration, Urdu translation and independent reviews remain pending.
  - SVG browser measurement remains unrun under the brief’s Playwright prohibition.
  - Shared glossary additions are staged; catalog registration, Urdu translation and independent reviews remain pending.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
