---
id: crew-gpks-402-u01-translate
title: crew translate GPKS-402 unit 1
stage: misc
date: 2026-10-28
surface: agent
model: codex
feature: gpks-402
branch: crew/gpks-402-u01-translate
user: crew
command: crew translate
labels: ["crew", "codex", "translate"]
links:
  spec: specs/content/gpks-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/006-content-pipeline/0026-translate-gpks402-unit-one-urdu.green.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-01/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-01/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-01/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-01/unit-assessment.mdx
 - specs/content/gpks-402/reviews/unit-01/G4/translation-checks.md
 - specs/content/gpks-402/reviews/unit-01/G4/translation-handoff.md
 - specs/content/gpks-402/tasks.md
 - static/img/figures/gpks-402/unit-01/fig-U1-1.ur.dark.svg
 - static/img/figures/gpks-402/unit-01/fig-U1-1.ur.svg
 - static/img/figures/gpks-402/unit-01/fig-U1-2.ur.dark.svg
 - static/img/figures/gpks-402/unit-01/fig-U1-2.ur.svg
 - static/img/figures/gpks-402/unit-01/fig-U1-3.ur.dark.svg
 - static/img/figures/gpks-402/unit-01/fig-U1-3.ur.svg
 - static/img/figures/gpks-402/unit-01/fig-U1-4.ur.dark.svg
 - static/img/figures/gpks-402/unit-01/fig-U1-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gpks-402-u01-translate

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gpks-402-u01-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GPKS-402 Unit 1 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GPKS-402 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gpks-402/`, and `static/img/figures/gpks-402/unit-01/`.

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
- (gpks-402-u01-review_en, review_en, agy) Unit 1 G3 English review passed with advisory report specs/content/gpks-402/reviews/unit-01/G3/b35aebba-1391-47ae-88ff-481fd326cd8b.json; G3 status remains open ▢ and unsigned in tasks.md per ADR-0019.
- (gpks-402-u01-review_en, review_en, agy) All 7 criteria verified; all 8 SVG variants pass measure-figure-text.mjs (0 overflows); 10/10 MCQs, 10/10 RRQs, and 5/5 ERQs independently solved and matched to key.
- (gpks-402-u01-review_en, review_en, agy) Urdu mirror job (G4 translation) and subsequent G5 review can proceed against this frozen English unit.
- (gpks-402-u01-author, author, claude) Only content gates were run; the first `npm run build` must check that the four new pages in `docs/semester-2/gpks-402/unit-01/` render.
- (gpks-402-u01-author, author, claude) Urdu mirror job needs `.ur.svg` versions of fig-U1-1 to fig-U1-4 and G5 review of the authored Urdu glossary definitions and concept labels (`concepts/unit-01.md`).


## Response snapshot

Translated all four GPKS-402 Unit 1 pages and four Urdu schematics with dark variants, preserving terminology and assessment parity.

## Outcome

- Impact: translate for GPKS-402 Unit 1 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 16 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Translated all four GPKS-402 Unit 1 pages and four Urdu schematics with dark variants, preserving terminology and assessment parity.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Urdu remains draft; browser geometry, rendered Urdu inspection and independent G5 review remain pending.
  - Urdu remains draft; browser geometry, rendered Urdu inspection and independent G5 review remain pending.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
