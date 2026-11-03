---
id: crew-giss-401-u04-translate
title: crew translate GISS-401 unit 4
stage: misc
date: 2026-11-03
surface: agent
model: codex
feature: giss-401
branch: crew/giss-401-u04-translate
user: crew
command: crew translate
labels: ["crew", "codex", "translate"]
links:
  spec: specs/content/giss-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/549-translate-giss401-unit-four-urdu.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-04/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-04/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-04/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-04/unit-assessment.mdx
 - specs/content/giss-401/reviews/unit-04/G4/translation-handoff.md
 - static/img/figures/giss-401/unit-04/fig-U4-1.ur.dark.svg
 - static/img/figures/giss-401/unit-04/fig-U4-1.ur.svg
 - static/img/figures/giss-401/unit-04/fig-U4-2.ur.dark.svg
 - static/img/figures/giss-401/unit-04/fig-U4-2.ur.svg
 - static/img/figures/giss-401/unit-04/fig-U4-3.ur.dark.svg
 - static/img/figures/giss-401/unit-04/fig-U4-3.ur.svg
 - static/img/figures/giss-401/unit-04/fig-U4-4.ur.dark.svg
 - static/img/figures/giss-401/unit-04/fig-U4-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job giss-401-u04-translate

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/giss-401-u04-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GISS-401 Unit 4 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GISS-401 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/giss-401/`, and `static/img/figures/giss-401/unit-04/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Notes from earlier jobs on this unit
- (giss-401-u04-review_en, review_en, agy) GISS-401 Unit 4 English draft passes independent G3 evaluation with advisory report at specs/content/giss-401/reviews/unit-04/G3/a5031c12-2079-4b0e-b718-bb161d2381bc.json.
- (giss-401-u04-review_en, review_en, agy) G3 tracker row remains open ▢ per ADR-0019 pending trusted qualification and the specialized Islamic Studies reviewer sign-off noted in the course spec.
- (giss-401-u04-review_en, review_en, agy) Unit 4 is ready for the subsequent Urdu translation job (G4 ur-translation) and mirrored figures.
- (giss-401-u04-author-conflict1, fix, opencode) The four Unit 4 SVGs (and Unit 1's) have never been measured by measure-figure-text; CI figure-geometry may flag them, so G6 stays in progress.
- (giss-401-u04-author-conflict1, fix, opencode) The shared course-overview available-units sentence is a bound input, so updating it required refreshing the G2 evidence for Units 1 and 4 (now 20261103T002225035Z and 20261103T002225277Z).


## Response snapshot

Translated all four GISS-401 Unit 4 pages and four RTL figures with dark variants, preserving assessments and recording terminology proposals and validation limits.

## Outcome

- Impact: translate for GISS-401 Unit 4 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 14 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Translated all four GISS-401 Unit 4 pages and four RTL figures with dark variants, preserving assessments and recording terminology proposals and validation limits.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Browser geometry, narrow-screen and A4 checks remain pending because the brief forbids builds and Playwright.
  - Translation remains draft; G4 tracker unchanged per skill Step 7. Independent G5 remains pending.
  - Browser geometry, narrow-screen and A4 checks remain pending because the brief forbids builds and Playwright.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
