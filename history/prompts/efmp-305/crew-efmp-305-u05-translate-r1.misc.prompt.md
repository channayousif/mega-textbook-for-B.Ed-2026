---
id: crew-efmp-305-u05-translate-r1
title: crew translate EFMP-305 unit 5
stage: misc
date: 2026-10-19
surface: agent
model: agy
feature: efmp-305
branch: crew/efmp-305-u05-translate-r1
user: crew
command: crew translate
labels: ["crew", "agy", "translate"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-305/crew-efmp-305-u05-translate-r1.misc.prompt.md
 - specs/content/efmp-305/reviews/unit-05/G4/translation-handoff.md
 - specs/content/efmp-305/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-305-u05-translate-r1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-305-u05-translate-r1`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate EFMP-305 Unit 5 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-305 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-305/`, and `static/img/figures/efmp-305/unit-05/`.

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
- (efmp-305-u05-translate, translate, opencode) EFMP-305 Unit 5 Urdu mirror (G4) is already complete on origin/main  -  6 files translated, all .ur.svg/.ur.dark.svg figure variants wired, 13/13 content gates pass. translation_status stays `draft` as required; no tracker row flipped. Next job on this unit should be an independent G5 Urdu review (separate session, ADR-0019) and G6 figure rendering.


## Response snapshot

Verified EFMP-305 Unit 5 complete Urdu mirror against English baseline 3a8a8c0e, verified 6 .ur.svg and .ur.dark.svg figure assets, authored G4 translation handoff with 26 unbanked concept labels documented for curriculum owner, recorded G4 tracker row in tasks.md with translation_status preserved as draft pending independent G5 review, and passed all 13 content gates.

## Outcome

- Impact: translate for EFMP-305 Unit 5 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before commit.
- Files: 3 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Verified EFMP-305 Unit 5 complete Urdu mirror against English baseline 3a8a8c0e, recorded durable G4 translation handoff and tracker row, and passed all 13 content gates.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - All 6 .ur.svg/.ur.dark.svg figure variants are wired with exact carrier alt matching SVG desc tags.
  - All 3 key_terms in index.mdx are bound to terminology.csv; translation_status stays draft pending independent G5 review.
  - 26 unbanked concept labels documented in reviews/unit-05/G4/translation-handoff.md for curriculum owner review.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
