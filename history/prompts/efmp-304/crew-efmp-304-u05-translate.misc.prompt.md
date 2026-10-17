---
id: crew-efmp-304-u05-translate
title: crew translate EFMP-304 unit 5
stage: misc
date: 2026-10-17
surface: agent
model: claude
feature: efmp-304
branch: crew/efmp-304-u05-translate
user: crew
command: crew translate
labels: ["crew", "claude", "translate"]
links:
  spec: specs/content/efmp-304/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-05/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-05/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-05/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-05/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-05/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-05/unit-assessment.mdx
 - specs/content/efmp-304/tasks.md
 - static/img/figures/efmp-304/unit-05/fig-U5-1.ur.dark.svg
 - static/img/figures/efmp-304/unit-05/fig-U5-1.ur.svg
 - static/img/figures/efmp-304/unit-05/fig-U5-2.ur.dark.svg
 - static/img/figures/efmp-304/unit-05/fig-U5-2.ur.svg
 - static/img/figures/efmp-304/unit-05/fig-U5-3.ur.dark.svg
 - static/img/figures/efmp-304/unit-05/fig-U5-3.ur.svg
 - static/img/figures/efmp-304/unit-05/fig-U5-4.ur.dark.svg
 - static/img/figures/efmp-304/unit-05/fig-U5-4.ur.svg
 - static/img/figures/efmp-304/unit-05/fig-U5-5.ur.dark.svg
 - static/img/figures/efmp-304/unit-05/fig-U5-5.ur.svg
 - static/img/figures/efmp-304/unit-05/fig-U5-6.ur.dark.svg
 - static/img/figures/efmp-304/unit-05/fig-U5-6.ur.svg
 - static/img/figures/efmp-304/unit-05/fig-U5-7.ur.dark.svg
 - static/img/figures/efmp-304/unit-05/fig-U5-7.ur.svg
 - static/img/figures/efmp-304/unit-05/fig-U5-8.ur.dark.svg
 - static/img/figures/efmp-304/unit-05/fig-U5-8.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-304-u05-translate

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-304-u05-translate`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate EFMP-304 Unit 5 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-304 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-304/`, and `static/img/figures/efmp-304/unit-05/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.


## Response snapshot

Completed the EFMP-304 Unit 5 Urdu mirror by adding Urdu versions of all 8 figures and wiring them in, translating `blooms_summary` and the Topic/Unit labels, and marking G4 `auto:gates` in the tracker (G5 flagged for a fresh review) with check:content green.

## Outcome

- Impact: translate for EFMP-304 Unit 5 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 23 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Completed the EFMP-304 Unit 5 Urdu mirror by adding Urdu versions of all 8 figures and wiring them in, translating `blooms_summary` and the Topic/Unit labels, and marking G4 `auto:gates` in the tracker (G5 flagged for a fresh review) with check:content green.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
