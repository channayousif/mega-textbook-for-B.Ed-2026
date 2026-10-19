---
id: crew-efmp-305-u02-translate-r1
title: crew translate EFMP-305 unit 2 continuation
stage: misc
date: 2026-10-19
surface: agent
model: agy
feature: efmp-305
branch: crew/efmp-305-u02-translate-r1
user: crew
command: crew translate
labels: ["crew", "agy", "translate"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-305/crew-efmp-305-u02-translate-r1.misc.prompt.md
 - specs/content/efmp-305/reviews/unit-02/G4/translation-handoff.md
 - specs/content/efmp-305/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-305-u02-translate-r1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-305-u02-translate-r1`.
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

## Notes from earlier jobs on this unit
- (efmp-305-u02-translate, translate, agy) All 4 .ur.svg figure variants are wired in topics 1 and 2 with exact carrier alt text matching the SVG `<desc>` tags.
- (efmp-305-u02-translate, translate, agy) All 5 key_terms in `index.mdx` are bound to `terminology.csv`; `translation_status` remains `draft` pending independent G5 review.
- (efmp-305-u02-translate, translate, agy) Proposed terms for curriculum owner: learner diversity (متعلمین کا تنوع), impairment (خرابی), handicap (ہینڈی کیپ / ماحولیاتی رکاوٹ), labelling (لیبلنگ / منفی ٹھپا لگانا), stigma (داغ / عیب).


## Response snapshot

Verified complete 5-file Urdu mirror for EFMP-305 Unit 2 against English baseline 9e6da648, authored G4 translation-handoff.md, updated tasks.md G4 tracker row, and confirmed all 13 content gates pass cleanly.

## Outcome

- Impact: translate continuation for EFMP-305 Unit 2 by agy (attempt 2 / revision 1).
- Tests: npm run check:content passed in the job worktree before commit.
- Files: 3 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Produced durable G4 translation-handoff.md, updated G4 tracker row in tasks.md with English baseline commit and handoff path, and validated 13/13 content gates.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this job does not certify anything. translation_status stays draft pending independent G5 review.
- Pending / next owner: crew lead (auto-merge when CI is green).
- Notes for the next job on this unit:
  - All 4 .ur.svg figure variants are wired in topics 1 and 2 with exact carrier alt text matching the SVG `<desc>` tags.
  - All 5 key_terms in `index.mdx` are bound to `terminology.csv`; `translation_status` remains `draft` pending independent G5 review.
  - Proposed terms for curriculum owner: learner diversity (متعلمین کا تنوع), impairment (خرابی), handicap (ہینڈی کیپ / ماحولیاتی رکاوٹ), labelling (لیبلنگ / منفی ٹھپا لگانا), stigma (داغ / عیب).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
