---
id: crew-efmp-305-u04-translate-r1
title: crew translate EFMP-305 unit 4
stage: misc
date: 2026-10-19
surface: agent
model: opencode
feature: efmp-305
branch: crew/efmp-305-u04-translate-r1
user: crew
command: crew translate
labels: ["crew", "opencode", "translate"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-305/crew-efmp-305-u04-translate-r1.misc.prompt.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-305-u04-translate-r1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-305-u04-translate-r1`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate EFMP-305 Unit 4 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-305 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-305/`, and `static/img/figures/efmp-305/unit-04/`.

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
- (efmp-305-u04-translate, translate, agy) Unit 4 Urdu mirror has full 5-file structural and heading parity with English baseline c31cad8f; translation_status stays draft pending fresh independent G5 review.
- (efmp-305-u04-translate, translate, agy) 18 unbanked concept labels from concepts/unit-04.md are documented in reviews/unit-04/G4/translation-handoff.md for curriculum owner promotion.
- (efmp-305-u04-translate, translate, agy) Generated static/content-status.json refreshed; all 13 content gates pass.


## Response snapshot

Verified EFMP-305 Unit 4 Urdu mirror is complete and gate-clean (13/13 pass); branch matches origin/main with only a PHR added  -  no translation changes needed.

## Outcome

- Impact: translate for EFMP-305 Unit 4 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Verified EFMP-305 Unit 4 Urdu mirror is complete and gate-clean (13/13 pass); branch matches origin/main with only a PHR added  -  no translation changes needed.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - 18 unbanked concept labels from concepts/unit-04.md are documented in reviews/unit-04/G4/translation-handoff.md for curriculum owner promotion  -  G5 should check them as a set.
  - translation_status stays draft across all 5 files; no certification claimed. A fresh independent G5 review is required before flipping to reviewed.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
