---
id: crew-efmp-303-u05-translate-r1
title: crew translate EFMP-303 unit 5 retry 1
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
 - npm run figures:variants:check
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

Verified complete 5-file Urdu mirror for EFMP-303 Unit 5 at G4 (index.mdx, topic-01.mdx, topic-02.mdx, unit-assessment.mdx with 10/10/5 bank, unit-teacher-notes.mdx), 4 localized .ur.svg figure variants with dark variants, 3 bank-accepted key_terms, and clean silent parity gates under temporary reviewed flip. All 13 content gates pass.

## Outcome

- Impact: translate continuation for EFMP-303 Unit 5 by agy (attempt 2 / revision 1).
- Tests: npm run check:content (13/13 pass) and npm run figures:variants:check (clean) verified.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: complete mirror was already merged on main; re-verification confirmed full structural, component, figure, assessment, and terminology parity.

## Handoff (for CEO and agents)

- Shipped / changed: Re-verified EFMP-303 Unit 5 Urdu mirror against English baseline, validated 5 mirror files, 4 SVG figure variants, 10/10/5 assessment bank and rubric parity, bank-accepted key_terms, and 13/13 content gates.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this job does not certify anything. translation_status stays draft pending independent G5 review.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - EFMP-303 Unit 5 Urdu mirror is complete at G4 (5 files, 4 localized .ur.svg figures with dark variants, 13/13 content gates pass); translation_status stays draft pending independent G5 review.
  - Prior G3 English review was an advisory escalation; closing G3 and addressing author repairs in English remain open before G5 resolution.
  - Render inspection (desktop, narrow 360px, A4 print) was omitted per brief constraints and should be run during the independent G5 review session.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none; branch is clean and all 13 gates pass.
- Graders run and results (PASS/FAIL): check:content PASS (13/13).
- Prompt variant (if applicable): crew brief v1 retry r1.
- Next experiment (smallest change to try): none.
