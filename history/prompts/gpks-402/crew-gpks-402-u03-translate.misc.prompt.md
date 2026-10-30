---
id: crew-gpks-402-u03-translate
title: crew translate GPKS-402 unit 3
stage: misc
date: 2026-10-30
surface: agent
model: codex
feature: gpks-402
branch: crew/gpks-402-u03-translate
user: crew
command: crew translate
labels: ["crew", "codex", "translate"]
links:
  spec: specs/content/gpks-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261049-gpks402-u03-urdu-mirror.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-03/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-03/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-03/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-03/unit-assessment.mdx
 - specs/content/gpks-402/reviews/unit-03/G4/content-baseline.log
 - specs/content/gpks-402/reviews/unit-03/G4/content-final.log
 - specs/content/gpks-402/reviews/unit-03/G4/content-temporary-reviewed.log
 - specs/content/gpks-402/reviews/unit-03/G4/mirror-check.log
 - specs/content/gpks-402/reviews/unit-03/G4/translation-handoff.md
 - specs/content/gpks-402/tasks.md
 - static/img/figures/gpks-402/unit-03/fig-U3-1.ur.dark.svg
 - static/img/figures/gpks-402/unit-03/fig-U3-1.ur.svg
 - static/img/figures/gpks-402/unit-03/fig-U3-2.ur.dark.svg
 - static/img/figures/gpks-402/unit-03/fig-U3-2.ur.svg
 - static/img/figures/gpks-402/unit-03/fig-U3-3.ur.dark.svg
 - static/img/figures/gpks-402/unit-03/fig-U3-3.ur.svg
 - static/img/figures/gpks-402/unit-03/fig-U3-4.ur.dark.svg
 - static/img/figures/gpks-402/unit-03/fig-U3-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gpks-402-u03-translate

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gpks-402-u03-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GPKS-402 Unit 3 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GPKS-402 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gpks-402/`, and `static/img/figures/gpks-402/unit-03/`.

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
- (gpks-402-u03-review_en, review_en, agy) All seven G3 English criteria verified passing with evidence; all 25 assessment items independently solved; all 8 SVG variants pass geometry.
- (gpks-402-u03-review_en, review_en, agy) G3 tracker row in specs/content/gpks-402/tasks.md is updated to open ▢ per ADR-0019; certification remains blocked pending trusted qualification.
- (gpks-402-u03-review_en, review_en, agy) Unit 3 is ready for Urdu translation (G4 ur-translation) and subsequent independent Urdu review (G5 ur-review).
- (gpks-402-u03-author-conflict5, fix, codex) Unit 3 independent review, Urdu localisation and SVG geometry validation remain pending.
- (gpks-402-u03-author-conflict5, fix, codex) Unit 3 independent review, Urdu localisation and SVG geometry validation remain pending.


## Response snapshot

Translated all four GPKS-402 Unit 3 pages, added four RTL Urdu figure pairs, and committed tracker notes, validation evidence and handoff.

## Outcome

- Impact: translate for GPKS-402 Unit 3 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 19 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Translated all four GPKS-402 Unit 3 pages, added four RTL Urdu figure pairs, and committed tracker notes, validation evidence and handoff.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Urdu remains draft; SVG geometry, rendered inspection and independent G5 review remain pending under the brief’s browser restriction.
  - Urdu remains draft; SVG geometry, rendered inspection and independent G5 review remain pending under the brief’s browser restriction.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
