---
id: crew-efmp-305-u01-translate-r1
title: crew translate EFMP-305 unit 1
stage: misc
date: 2026-10-19
surface: agent
model: agy
feature: efmp-305
branch: crew/efmp-305-u01-translate-r1
user: crew
command: crew translate
labels: ["crew", "agy", "translate"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-305/crew-efmp-305-u01-translate-r1.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-01/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-01/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-01/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-01/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-01/unit-teacher-notes.mdx
 - specs/content/efmp-305/reviews/unit-01/G4/translation-handoff.md
 - specs/content/efmp-305/tasks.md
 - static/img/figures/efmp-305/unit-01/fig-U1-4.ur.dark.svg
 - static/img/figures/efmp-305/unit-01/fig-U1-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-305-u01-translate-r1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-305-u01-translate-r1`.
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

## Notes from earlier jobs on this unit
- (efmp-305-u01-translate, translate, opencode) Proposed terminology pending owner ratification - Segregation → علیحدگی, Integration → یکجائی, Equality → مساوات, Equity → انصاف (not in the frozen bank, drawn from glossery.json). The concept graph file uses "شامل تعلیم" for "Inclusive education" while the bank mandates "شمولیتی تعلیم" - owner should reconcile before G5 review.
- (efmp-305-u01-translate, translate, opencode) G5 Urdu review by an independent reviewer is the next step. translation_status stays draft. The bounded answers section in the assessment is translated; no English answer-key prose remains.


## Response snapshot

Reconciled and polished EFMP-305 Unit 1 Urdu translation across 5 content files and fig-U1-4, authored G4 translation handoff, and recorded the in-progress G4 row in tasks.md with all 13 content gates passing.

## Outcome

- Impact: translate for EFMP-305 Unit 1 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 10 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Reconciled and polished EFMP-305 Unit 1 Urdu translation across 5 content files and fig-U1-4, authored G4 translation handoff, and recorded the in-progress G4 row in tasks.md with all 13 content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G5 Urdu review by an independent reviewer is the next step; translation_status stays draft across all 5 files.
  - Bank term 'شمولیتی تعلیم' is strictly adhered to in all files; 8 unbanked concept labels are recorded in specs/content/efmp-305/reviews/unit-01/G4/translation-handoff.md for curriculum owner review.
  - The concept graph file (concepts/unit-01.md) still carries 'شامل تعلیم' for Inclusive Education and should be reconciled by the curriculum owner before G5 review.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
