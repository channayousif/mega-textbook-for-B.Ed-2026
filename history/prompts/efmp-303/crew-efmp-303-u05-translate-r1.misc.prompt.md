---
id: crew-efmp-303-u05-translate-r1
title: crew translate EFMP-303 unit 5
stage: misc
date: 2026-10-19
surface: agent
model: agy
feature: efmp-303
branch: crew/efmp-303-u05-translate-r1
user: crew
command: crew translate
labels: ["crew", "agy", "translate"]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-303/crew-efmp-303-u05-translate-r1.misc.prompt.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-303-u05-translate-r1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-303-u05-translate-r1`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate EFMP-303 Unit 5 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-303 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-303/`, and `static/img/figures/efmp-303/unit-05/`.

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
- (efmp-303-u05-translate, translate, agy) EFMP-303 Unit 5 Urdu mirror is complete at G4 (5 files, 4 localized .ur.svg figures with dark variants, 13/13 content gates pass); translation_status stays draft pending independent G5 review.
- (efmp-303-u05-translate, translate, agy) Prior G3 English review was an advisory escalation; closing G3 and addressing author repairs in English remain open before G5 resolution.
- (efmp-303-u05-translate, translate, agy) Render inspection (desktop, narrow 360px, A4 print) was omitted per brief constraints and should be run during the independent G5 review session.
- (efmp-303-u05-review_en, review_en, codex) Author repairs and owner-supplied provenance/current renders remain required before fresh independent review.
- (efmp-303-u05-review_en, review_en, codex) Author repairs and owner-supplied provenance/current renders remain required before fresh independent review.


## Response snapshot

Verified EFMP-303 Unit 5 complete Urdu mirror at G4 with passing content gates and recorded session PHR.

## Outcome

- Impact: translate for EFMP-303 Unit 5 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Verified EFMP-303 Unit 5 complete Urdu mirror at G4 with passing content gates and recorded session PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - EFMP-303 Unit 5 Urdu mirror is complete at G4 (5 files, 4 localized .ur.svg figures with dark variants, 13/13 content gates pass); translation_status stays draft pending independent G5 review.
  - Render inspection (desktop, narrow 360px, A4 print) was omitted per brief constraints and should be run during the independent G5 review session.
  - Prior G3 English review was an advisory escalation; closing G3 and addressing author repairs in English remain open before G5 resolution.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
