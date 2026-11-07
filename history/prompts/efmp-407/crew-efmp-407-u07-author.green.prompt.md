---
id: crew-efmp-407-u07-author
title: crew author EFMP-407 unit 7
stage: misc
date: 2026-11-07
surface: agent
model: codex
feature: efmp-407
branch: crew/efmp-407-u07-author
user: crew
command: crew author
labels: ["crew", "codex", "author"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/efmp-407/unit-07/index.mdx
 - docs/semester-3/efmp-407/unit-07/topic-01.mdx
 - docs/semester-3/efmp-407/unit-07/topic-02.mdx
 - docs/semester-3/efmp-407/unit-07/unit-assessment.mdx
 - docs/semester-3/efmp-407/unit-07/unit-teacher-notes.mdx
 - history/prompts/general/20261143-author-efmp-407-unit-seven.general.prompt.md
 - specs/content/efmp-407/concepts/unit-07.md
 - specs/content/efmp-407/coverage/unit-07.md
 - specs/content/efmp-407/figures/unit-07.banner.md
 - specs/content/efmp-407/figures/unit-07.md
 - specs/content/efmp-407/reviews/unit-07/G2/20261107T081151799Z-gates.json
 - specs/content/efmp-407/reviews/unit-07/G2/logs-20261107T081151799Z/check-bloom-bands.txt
 - specs/content/efmp-407/reviews/unit-07/G2/logs-20261107T081151799Z/check-concept-graph.txt
 - specs/content/efmp-407/reviews/unit-07/G2/logs-20261107T081151799Z/check-depth-gate.txt
 - specs/content/efmp-407/reviews/unit-07/G2/logs-20261107T081151799Z/check-docs-sync.txt
 - specs/content/efmp-407/reviews/unit-07/G2/logs-20261107T081151799Z/check-figures.txt
 - specs/content/efmp-407/reviews/unit-07/G2/logs-20261107T081151799Z/check-no-answer-keys.txt
 - specs/content/efmp-407/reviews/unit-07/G2/logs-20261107T081151799Z/check-no-em-dash.txt
 - specs/content/efmp-407/reviews/unit-07/G2/logs-20261107T081151799Z/validate-content.txt
 - specs/content/efmp-407/sources/texts/hopkins-mckeown-2005.md
 - specs/content/efmp-407/sources/texts/jumani-abbasi-2015.md
 - specs/content/efmp-407/sources/texts/nep-2009.md
 - specs/content/efmp-407/sources/unit-07.md
 - specs/content/efmp-407/tasks.md
 - static/img/figures/efmp-407/unit-07/fig-U7-1.dark.svg
 - static/img/figures/efmp-407/unit-07/fig-U7-1.svg
 - static/img/figures/efmp-407/unit-07/fig-U7-2.dark.svg
 - static/img/figures/efmp-407/unit-07/fig-U7-2.svg
 - static/img/figures/efmp-407/unit-07/fig-U7-3.dark.svg
 - static/img/figures/efmp-407/unit-07/fig-U7-3.svg
 - static/img/figures/efmp-407/unit-07/fig-U7-4.dark.svg
 - static/img/figures/efmp-407/unit-07/fig-U7-4.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-407-u07-author

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u07-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Author EFMP-407 Unit 7 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job). Topic titles read "Topic N.M - Title" (validate:content checks it).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-407 Unit 7 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-407/`, and `static/img/figures/efmp-407/unit-07/`.

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

Authored English EFMP-407 Unit 7 with assessments, governance records, four schematics and validated G2 evidence.

## Outcome

- Impact: author for EFMP-407 Unit 7 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 32 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Authored English EFMP-407 Unit 7 with assessments, governance records, four schematics and validated G2 evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Independent review, Urdu translation, banner production and browser geometry validation remain pending.
  - Independent review, Urdu translation, banner production and browser geometry validation remain pending.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
