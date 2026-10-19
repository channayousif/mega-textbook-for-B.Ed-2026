---
id: crew-gict-300-u06-translate-r1
title: crew translate GICT-300 unit 6
stage: misc
date: 2026-10-19
surface: agent
model: agy
feature: gict-300
branch: crew/gict-300-u06-translate-r1
user: crew
command: crew translate
labels: ["crew", "agy", "translate"]
links:
  spec: specs/content/gict-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gict-300/crew-gict-300-u06-translate-r1.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-06/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-06/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-06/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-06/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-06/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-06/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-06/unit-teacher-notes.mdx
 - specs/content/gict-300/reviews/unit-06/G4/translation-handoff.md
 - specs/content/gict-300/tasks.md
 - static/img/figures/gict-300/unit-06/fig-U6-2.ur.dark.svg
 - static/img/figures/gict-300/unit-06/fig-U6-2.ur.svg
 - static/img/figures/gict-300/unit-06/fig-U6-3.ur.dark.svg
 - static/img/figures/gict-300/unit-06/fig-U6-3.ur.svg
 - static/img/figures/gict-300/unit-06/fig-U6-4.ur.dark.svg
 - static/img/figures/gict-300/unit-06/fig-U6-4.ur.svg
 - static/img/figures/gict-300/unit-06/fig-U6-5.ur.dark.svg
 - static/img/figures/gict-300/unit-06/fig-U6-5.ur.svg
 - static/img/figures/gict-300/unit-06/fig-U6-6.ur.dark.svg
 - static/img/figures/gict-300/unit-06/fig-U6-6.ur.svg
 - static/img/figures/gict-300/unit-06/fig-U6-7.ur.dark.svg
 - static/img/figures/gict-300/unit-06/fig-U6-7.ur.svg
 - static/img/figures/gict-300/unit-06/fig-U6-8.ur.dark.svg
 - static/img/figures/gict-300/unit-06/fig-U6-8.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gict-300-u06-translate-r1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gict-300-u06-translate-r1`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GICT-300 Unit 6 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GICT-300 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gict-300/`, and `static/img/figures/gict-300/unit-06/`.

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
- (gict-300-u06-translate, translate, opencode) Tracker row for Unit 6 G4 left as `▢` per translate-unit skill Step 7 (skill forbids appending a G4 row); `translation_status: draft` preserved. Next gate is an independent G5 review on the frozen bundle.


## Response snapshot

Reconciled GICT-300 Unit 6 Urdu mirror key_terms with terminology.csv, polished semantic, register, and figure-label text across 7 content files and 7 figure pairs, authored the G4 translation handoff record, derived dark figure variants, and updated tasks.md with all 13 content gates passing.

## Outcome

- Impact: translate for GICT-300 Unit 6 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 24 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Reconciled GICT-300 Unit 6 Urdu mirror key_terms with terminology.csv, polished semantic, register, and figure-label text across 7 content files and 7 figure pairs, authored the G4 translation handoff record, derived dark figure variants, and updated tasks.md with all 13 content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Unit 6 Urdu mirror has complete 7-file structural, heading, and figure parity with English baseline 34f207fb; translation_status stays draft pending fresh independent G5 review.
  - Declared key_terms in index.mdx are bound to terminology.csv; all 15 unbanked concept labels from concepts/unit-06.md are documented in reviews/unit-06/G4/translation-handoff.md for curriculum owner review.
  - Advisory G3 review is already passing (agent-g3-gict300-u6-20260923T171945671Z.json); the unit is ready for fresh independent G5 review.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
