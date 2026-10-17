---
id: crew-efmp-302-u05-translate
title: crew translate EFMP-302 unit 5
stage: misc
date: 2026-10-17
surface: agent
model: codex
feature: efmp-302
branch: crew/efmp-302-u05-translate
user: crew
command: crew translate
labels: ["crew", "codex", "translate"]
links:
  spec: specs/content/efmp-302/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/006-content-pipeline/0011-repair-efmp302-unit-five-urdu.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-05/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-05/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-05/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-05/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-05/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-05/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-05/unit-teacher-notes.mdx
 - specs/content/efmp-302/reviews/unit-05/G4-crew-20261017/final-content.log
 - specs/content/efmp-302/reviews/unit-05/G4-crew-20261017/handoff.md
 - specs/content/efmp-302/reviews/unit-05/G4-crew-20261017/origin-main-content.log
 - specs/content/efmp-302/reviews/unit-05/G4-crew-20261017/parity.log
 - specs/content/efmp-302/reviews/unit-05/G4-crew-20261017/svg-geometry-fallback-font.log
 - specs/content/efmp-302/reviews/unit-05/G4-crew-20261017/svg-geometry-nastaliq.json
 - specs/content/efmp-302/reviews/unit-05/G4-crew-20261017/temporary-reviewed-content.log
 - specs/content/efmp-302/reviews/unit-05/G4-crew-20261017/terminology.md
 - specs/content/efmp-302/reviews/unit-05/G4-crew-20261017/translation-digests.json
 - specs/content/efmp-302/reviews/unit-05/G4-crew-20261017/urdu-figures-contact.png
 - specs/content/efmp-302/tasks.md
 - static/img/figures/efmp-302/unit-05/fig-U5-1.ur.dark.svg
 - static/img/figures/efmp-302/unit-05/fig-U5-1.ur.svg
 - static/img/figures/efmp-302/unit-05/fig-U5-2.ur.dark.svg
 - static/img/figures/efmp-302/unit-05/fig-U5-2.ur.svg
 - static/img/figures/efmp-302/unit-05/fig-U5-3.ur.dark.svg
 - static/img/figures/efmp-302/unit-05/fig-U5-3.ur.svg
 - static/img/figures/efmp-302/unit-05/fig-U5-4.ur.dark.svg
 - static/img/figures/efmp-302/unit-05/fig-U5-4.ur.svg
 - static/img/figures/efmp-302/unit-05/fig-U5-5.ur.dark.svg
 - static/img/figures/efmp-302/unit-05/fig-U5-5.ur.svg
 - static/img/figures/efmp-302/unit-05/fig-U5-6.ur.dark.svg
 - static/img/figures/efmp-302/unit-05/fig-U5-6.ur.svg
 - static/img/figures/efmp-302/unit-05/fig-U5-7.ur.dark.svg
 - static/img/figures/efmp-302/unit-05/fig-U5-7.ur.svg
 - static/img/figures/efmp-302/unit-05/fig-U5-8.ur.dark.svg
 - static/img/figures/efmp-302/unit-05/fig-U5-8.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-302-u05-translate

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-302-u05-translate`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate EFMP-302 Unit 5 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-302 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-302/`, and `static/img/figures/efmp-302/unit-05/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.


## Response snapshot

Repaired EFMP-302 Unit 5’s seven-file Urdu mirror, refreshed eight bilingual schematics and dark variants, and committed G4 records and validation evidence.

## Outcome

- Impact: translate for EFMP-302 Unit 5 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 35 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Repaired EFMP-302 Unit 5’s seven-file Urdu mirror, refreshed eight bilingual schematics and dark variants, and committed G4 records and validation evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
