---
id: crew-efmp-305-u01-translate
title: crew translate EFMP-305 unit 1
stage: misc
date: 2026-10-18
surface: agent
model: opencode
feature: efmp-305
branch: crew/efmp-305-u01-translate
user: crew
command: crew translate
labels: ["crew", "opencode", "translate"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-305/520-efmp-305-u01-translate.green.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-01/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-01/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-01/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-01/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-01/unit-teacher-notes.mdx
 - static/img/figures/efmp-305/unit-01/fig-U1-1.ur.dark.svg
 - static/img/figures/efmp-305/unit-01/fig-U1-1.ur.svg
 - static/img/figures/efmp-305/unit-01/fig-U1-2.ur.dark.svg
 - static/img/figures/efmp-305/unit-01/fig-U1-2.ur.svg
 - static/img/figures/efmp-305/unit-01/fig-U1-3.ur.dark.svg
 - static/img/figures/efmp-305/unit-01/fig-U1-3.ur.svg
 - static/img/figures/efmp-305/unit-01/fig-U1-4.ur.dark.svg
 - static/img/figures/efmp-305/unit-01/fig-U1-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-305-u01-translate

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-305-u01-translate`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate EFMP-305 Unit 1 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-305 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-305/`, and `static/img/figures/efmp-305/unit-01/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit
   needs (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.


## Response snapshot

Translated EFMP-305 Unit 1 (Foundations of Inclusive Education) into its complete Urdu G4 mirror - five files (index, two topics, assessment, teacher notes) bound to the frozen terminology bank, with figure alt text translated and SVG `<desc>` elements updated, all 13 content gates passing, committed on branch `crew/efmp-305-u01-translate`.

## Outcome

- Impact: translate for EFMP-305 Unit 1 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 14 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Translated EFMP-305 Unit 1 (Foundations of Inclusive Education) into its complete Urdu G4 mirror - five files (index, two topics, assessment, teacher notes) bound to the frozen terminology bank, with figure alt text translated and SVG `<desc>` elements updated, all 13 content gates passing, committed on branch `crew/efmp-305-u01-translate`.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Proposed terminology pending owner ratification - Segregation → علیحدگی, Integration → یکجائی, Equality → مساوات, Equity → انصاف (not in the frozen bank, drawn from glossery.json). The concept graph file uses "شامل تعلیم" for "Inclusive education" while the bank mandates "شمولیتی تعلیم" - owner should reconcile before G5 review.
  - G5 Urdu review by an independent reviewer is the next step. translation_status stays draft. The bounded answers section in the assessment is translated; no English answer-key prose remains.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
