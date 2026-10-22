---
id: crew-gqur-301-u16-author
title: crew author GQUR-301 unit 16
stage: misc
date: 2026-10-22
surface: agent
model: codex
feature: gqur-301
branch: crew/gqur-301-u16-author
user: crew
command: crew author
labels: ["crew", "codex", "author"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gqur-301/unit-16/index.mdx
 - docs/semester-2/gqur-301/unit-16/topic-01.mdx
 - docs/semester-2/gqur-301/unit-16/topic-02.mdx
 - docs/semester-2/gqur-301/unit-16/topic-03.mdx
 - docs/semester-2/gqur-301/unit-16/unit-assessment.mdx
 - docs/semester-2/gqur-301/unit-16/unit-teacher-notes.mdx
 - history/prompts/008-rich-unit-pedagogy/0020-apply-unit-sixteen-repository-guidance.misc.prompt.md
 - history/prompts/008-rich-unit-pedagogy/0021-author-quantitative-reasoning-unit-sixteen.misc.prompt.md
 - specs/content/gqur-301/authoring/unit-16/check-content-main.txt
 - specs/content/gqur-301/authoring/unit-16/design.md
 - specs/content/gqur-301/authoring/unit-16/handoff.md
 - specs/content/gqur-301/concepts/unit-16.md
 - specs/content/gqur-301/coverage/unit-16.md
 - specs/content/gqur-301/figures/unit-16.md
 - specs/content/gqur-301/reviews/unit-16/G2/20261022T004248886Z-gates.json
 - specs/content/gqur-301/reviews/unit-16/G2/20261022T004408483Z-gates.json
 - specs/content/gqur-301/reviews/unit-16/G2/README.md
 - specs/content/gqur-301/reviews/unit-16/G2/check-content-final.txt
 - specs/content/gqur-301/reviews/unit-16/G2/logs-20261022T004248886Z/check-bloom-bands.txt
 - specs/content/gqur-301/reviews/unit-16/G2/logs-20261022T004248886Z/check-concept-graph.txt
 - specs/content/gqur-301/reviews/unit-16/G2/logs-20261022T004248886Z/check-depth-gate.txt
 - specs/content/gqur-301/reviews/unit-16/G2/logs-20261022T004248886Z/check-docs-sync.txt
 - specs/content/gqur-301/reviews/unit-16/G2/logs-20261022T004248886Z/check-figures.txt
 - specs/content/gqur-301/reviews/unit-16/G2/logs-20261022T004248886Z/check-no-answer-keys.txt
 - specs/content/gqur-301/reviews/unit-16/G2/logs-20261022T004248886Z/check-no-em-dash.txt
 - specs/content/gqur-301/reviews/unit-16/G2/logs-20261022T004248886Z/validate-content.txt
 - specs/content/gqur-301/reviews/unit-16/G2/logs-20261022T004408483Z/check-bloom-bands.txt
 - specs/content/gqur-301/reviews/unit-16/G2/logs-20261022T004408483Z/check-concept-graph.txt
 - specs/content/gqur-301/reviews/unit-16/G2/logs-20261022T004408483Z/check-depth-gate.txt
 - specs/content/gqur-301/reviews/unit-16/G2/logs-20261022T004408483Z/check-docs-sync.txt
 - specs/content/gqur-301/reviews/unit-16/G2/logs-20261022T004408483Z/check-figures.txt
 - specs/content/gqur-301/reviews/unit-16/G2/logs-20261022T004408483Z/check-no-answer-keys.txt
 - specs/content/gqur-301/reviews/unit-16/G2/logs-20261022T004408483Z/check-no-em-dash.txt
 - specs/content/gqur-301/reviews/unit-16/G2/logs-20261022T004408483Z/validate-content.txt
 - specs/content/gqur-301/sources/texts/lane-u16-2026.md
 - specs/content/gqur-301/sources/texts/openstax-u16-2026.md
 - specs/content/gqur-301/sources/texts/pbs-u16-2026.md
 - specs/content/gqur-301/sources/unit-16.md
 - specs/content/gqur-301/tasks.md
 - static/img/figures/gqur-301/unit-16/fig-U16-1.dark.svg
 - static/img/figures/gqur-301/unit-16/fig-U16-1.svg
 - static/img/figures/gqur-301/unit-16/fig-U16-2.dark.svg
 - static/img/figures/gqur-301/unit-16/fig-U16-2.svg
 - static/img/figures/gqur-301/unit-16/fig-U16-3.dark.svg
 - static/img/figures/gqur-301/unit-16/fig-U16-3.svg
 - static/img/figures/gqur-301/unit-16/fig-U16-4.dark.svg
 - static/img/figures/gqur-301/unit-16/fig-U16-4.svg
 - static/img/figures/gqur-301/unit-16/fig-U16-5.dark.svg
 - static/img/figures/gqur-301/unit-16/fig-U16-5.svg
 - static/img/figures/gqur-301/unit-16/fig-U16-6.dark.svg
 - static/img/figures/gqur-301/unit-16/fig-U16-6.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u16-author

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u16-author`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Author GQUR-301 Unit 16 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-301 Unit 16 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-16/`.

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

Authored English GQUR-301 Unit 16 with three topic cycles, assessments, six schematics, source records and verified G2 evidence.

## Outcome

- Impact: author for GQUR-301 Unit 16 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 51 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Authored English GQUR-301 Unit 16 with three topic cycles, assessments, six schematics, source records and verified G2 evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Urdu translation, Urdu figures and independent G3/G5 reviews remain open.
  - Urdu translation, Urdu figures and independent G3/G5 reviews remain open.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
