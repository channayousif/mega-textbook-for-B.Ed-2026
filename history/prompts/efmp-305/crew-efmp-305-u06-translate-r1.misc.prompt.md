---
id: crew-efmp-305-u06-translate-r1
title: crew translate EFMP-305 unit 6
stage: misc
date: 2026-10-19
surface: agent
model: codex
feature: efmp-305
branch: crew/efmp-305-u06-translate-r1
user: crew
command: crew translate
labels: ["crew", "codex", "translate"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-305/522-unit-six-translation-validation.misc.prompt.md
 - history/prompts/efmp-305/crew-efmp-305-u06-translate-r1.misc.prompt.md
 - specs/content/efmp-305/reviews/unit-06/G4/translation-handoff.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-305-u06-translate-r1

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-305-u06-translate-r1`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate EFMP-305 Unit 6 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-305 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-305/`, and `static/img/figures/efmp-305/unit-06/`.

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
- (efmp-305-u06-translate-cifix1, fix, opencode) The test:review ENOTEMPTY in "unit-scoped binding: a sibling unit does not invalidate this unit" is a cleanup race in the harness, not a content issue  -  a re-run should clear it.
- (efmp-305-u06-translate-cifix1, fix, opencode) Unit 6 Urdu mirror (6 files + 6 .ur.svg variants) is on origin/main from earlier merges; this branch only carries the PHR and tasks.md G4 tracker update.
- (efmp-305-u06-translate, translate, agy) All 6 .ur.svg figure variants are wired in topics 1-3 with matching carrier alt text; figures:variants:check passes cleanly.
- (efmp-305-u06-translate, translate, agy) Structural, figure, and terminology parity verified clean under temporary reviewed flip (reverted to draft pending independent G5 review).
- (efmp-305-u06-translate, translate, agy) Proposed terms for curriculum owner: classroom culture (جماعتی ماحول کا چلن), empathy (ہمدردی), class charter (جماعتی عہد نامہ), buddy rota (ساتھی باری نامہ), shared support plan (مشترکہ معاونت منصوبہ).

## Feedback from the previous attempt
npm run check:content has 1 finding(s) that main does not have:
✗ static/content-status.json is missing. Run: npm run build:content-status


## Response snapshot

Verified the existing Unit 6 Urdu mirror, regenerated missing content-status data, and committed the validation handoff and PHR.

## Outcome

- Impact: translate for EFMP-305 Unit 6 by codex (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 3 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Verified the existing Unit 6 Urdu mirror, regenerated missing content-status data, and committed the validation handoff and PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Translation remains draft pending independent G5 review; fresh rendered Urdu inspection is still required.
  - Translation remains draft pending independent G5 review; fresh rendered Urdu inspection is still required.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
