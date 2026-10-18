---
id: crew-gqur-300-u06-translate
title: crew translate GQUR-300 unit 6
stage: misc
date: 2026-10-18
surface: agent
model: agy
feature: gqur-300
branch: crew/gqur-300-u06-translate
user: crew
command: crew translate
labels: ["crew", "agy", "translate"]
links:
  spec: specs/content/gqur-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/gqur-300/crew-gqur-300-u06-translate.misc.prompt.md
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-06/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-06/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-06/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-06/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-06/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-06/unit-teacher-notes.mdx
  - specs/content/gqur-300/reviews/unit-06/G4/handoff.md
  - specs/content/gqur-300/tasks.md
tests:
  - npm run check:content
---

## Prompt

# Crew job gqur-300-u06-translate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-300-u06-translate`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GQUR-300 Unit 6 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-300 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-300/`, and `static/img/figures/gqur-300/unit-06/`.

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

Completed and verified the GQUR-300 Unit 6 Urdu mirror at G4 against English baseline 2976ef5e: translated all Bloom tags and MCQ options, synced bounded answers and rubric markers, repaired index and teacher-notes phrasing, created reviews/unit-06/G4/handoff.md, updated the G4 tracker row in tasks.md, and verified all 13 content gates pass cleanly.

## Outcome

- Impact: translate for GQUR-300 Unit 6 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before commit.
- Files: 9 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Completed and verified the GQUR-300 Unit 6 Urdu mirror at G4 against English baseline 2976ef5e. Translated all Bloom tags to Urdu across all topics and the assessment bank, transliterated MCQ options to Urdu letters with corresponding answer key entries, standardized bounded answer headings and rubric tags, repaired index and teacher-notes phrasing, created G4 handoff record under reviews/unit-06/G4/handoff.md, and updated tasks.md tracker row.
- Decisions the team must respect: G3/G5 stay advisory until qualified independent review; this work does not certify or approve itself.
- Pending / next owner: crew lead (auto-merge when CI is green).
- Notes for the next job on this unit:
  - All 5 key_terms in Unit 6 index.mdx (Budget, Interest, Loss, Profit, Simple interest) and the 11 concept labels remain unbanked in terminology.csv and await curriculum owner decision.
  - The G4 tracker row in specs/content/gqur-300/tasks.md is set to in-progress (▣) and translation_status remains draft pending independent G5 review.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
