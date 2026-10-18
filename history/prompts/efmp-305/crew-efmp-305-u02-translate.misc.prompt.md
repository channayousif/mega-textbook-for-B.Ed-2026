---
id: crew-efmp-305-u02-translate
title: crew translate EFMP-305 unit 2
stage: misc
date: 2026-10-18
surface: agent
model: agy
feature: efmp-305
branch: crew/efmp-305-u02-translate
user: crew
command: crew translate
labels: ["crew", "agy", "translate"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-305/crew-efmp-305-u02-translate.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-02/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-02/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-02/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-02/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-02/unit-teacher-notes.mdx
 - specs/content/efmp-305/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-305-u02-translate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-305-u02-translate`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate EFMP-305 Unit 2 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-305 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-305/`, and `static/img/figures/efmp-305/unit-02/`.

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

Authored complete 5-file Urdu mirror for EFMP-305 Unit 2 adhering to academic-plain Urdu register, wired all 4 `.ur.svg` figure variants with exact `<desc>` alignment, bound `key_terms` to `terminology.csv`, validated full parity and terminology under temporary `reviewed` flip (reverted), updated the G4 tracker row to in-progress (`▣`), and confirmed all 13 content gates pass.

## Outcome

- Impact: translate for EFMP-305 Unit 2 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before commit.
- Files: 7 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Authored complete 5-file Urdu mirror for EFMP-305 Unit 2 (index, topic-01, topic-02, unit-assessment, unit-teacher-notes), wired 4 `.ur.svg` figure variants matching SVGs' `<desc>`, confirmed parity and bank conformance under temporary reviewed status (reverted to draft), updated G4 tracker row in `tasks.md`, and passed all 13 content gates.
- Decisions the team must respect: G4 translation_status remains draft pending independent G5 review; this work does not self-certify or advance G5.
- Pending / next owner: independent G5 Urdu reviewer session.
- Notes for the next job on this unit:
  - Proposed terms for CurriculumOwner banking: "Learner diversity" (متعلمین کا تنوع / سیکھنے والوں کا تنوع), "Impairment" (خرابی), "Handicap" (ہینڈی کیپ / ماحولیاتی رکاوٹ), "Labelling" (لیبلنگ / منفی ٹھپا لگانا), "Stigma" (داغ / عیب).
  - All 5 key_terms in `index.mdx` (`Individual Differences`, `Inclusive Education`, `Slow Learner`, `Assessment`, `Attitude`) are banked in `terminology.csv`.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
