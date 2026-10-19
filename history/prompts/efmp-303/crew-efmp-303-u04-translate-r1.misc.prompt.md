---
id: crew-efmp-303-u04-translate-r1
title: crew translate EFMP-303 unit 4 retry 1
stage: misc
date: 2026-10-19
surface: agent
model: agy
feature: efmp-303
branch: crew/efmp-303-u04-translate-r1
user: crew
command: crew translate
labels: ["crew", "agy", "translate"]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-303/crew-efmp-303-u04-translate-r1.misc.prompt.md
 - specs/content/efmp-303/tasks.md
tests:
 - npm run check:content
 - npm run figures:variants:check
---

## Prompt

# Crew job efmp-303-u04-translate-r1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-303-u04-translate-r1`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate EFMP-303 Unit 4 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-303 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-303/`, and `static/img/figures/efmp-303/unit-04/`.

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
- (efmp-303-u04-translate, translate, agy) All 4 .ur.svg figure variants and derived dark variants are wired in topics 1-2 with matching carrier alt text and passing figures:variants:check.
- (efmp-303-u04-translate, translate, agy) Structural, figure, and terminology parity verified clean under temporary reviewed flip; translation_status stays draft pending independent G5 review.
- (efmp-303-u04-translate, translate, agy) Proposed unbanked terms recorded in translation-handoff.md for curriculum owner review.
- (efmp-303-u04-review_en-conflict1, fix, opencode) Advisory G3 review escalation for EFMP-303 Unit 4 remains at specs/content/efmp-303/reviews/unit-04/G3/crew-20261018.json; branch added no shared-registry entries so no ID reassignments were needed.
- (efmp-303-u04-review_en, review_en, agy) Advisory escalation recorded for EFMP-303 Unit 4 G3 (`specs/content/efmp-303/reviews/unit-04/G3/crew-20261018.json`) because live browser and A4 print view render inspection cannot be performed under the host build/dev-server prohibition.


## Response snapshot

Verified complete 5-file Urdu mirror for EFMP-303 Unit 4 against English baseline c0e60d31, validated bank-bound key_terms and figure variants wiring, refreshed tasks.md G4 tracker row with handoff path and baseline reference, and confirmed all 13 content gates pass cleanly.

## Outcome

- Impact: translate continuation for EFMP-303 Unit 4 by agy (attempt 2 / revision 1).
- Tests: npm run check:content and npm run figures:variants:check passed before commit.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: translation mirror was already authored and gate-clean; verified full parity and aligned tasks.md tracker notes.

## Handoff (for CEO and agents)

- Shipped / changed: Verified EFMP-303 Unit 4 complete Urdu mirror against English baseline c0e60d31, aligned tasks.md G4 tracker row with baseline and handoff links, and validated 13/13 content gates.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this job does not certify anything. translation_status stays draft pending independent G5 review.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - All 4 .ur.svg figure variants and derived dark variants are wired in topics 1-2 with matching carrier alt text and passing figures:variants:check.
  - Structural, figure, and terminology parity verified clean under temporary reviewed flip; translation_status stays draft pending independent G5 review.
  - Proposed unbanked terms recorded in translation-handoff.md for curriculum owner review.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none; branch is clean and all 13 gates pass.
- Graders run and results (PASS/FAIL): check:content PASS (13/13).
- Prompt variant (if applicable): crew brief v1 retry r1.
- Next experiment (smallest change to try): none.
