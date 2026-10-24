---
id: crew-gsos-301-u03-translate
title: crew translate GSOS-301 unit 3
stage: misc
date: 2026-10-24
surface: agent
model: codex
feature: gsos-301
branch: crew/gsos-301-u03-translate
user: crew
command: crew translate
labels: ["crew", "codex", "translate"]
links:
  spec: specs/content/gsos-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gsos-301/crew-gsos-301-u03-translate.misc.prompt.md
 - specs/content/gsos-301/reviews/unit-03/G4/content.log
 - specs/content/gsos-301/reviews/unit-03/G4/main-content.log
 - specs/content/gsos-301/reviews/unit-03/G4/translation-handoff.md
 - specs/content/gsos-301/tasks.md
 - static/content-status.json
tests:
 - npm run check:content
---

## Prompt

# Crew job gsos-301-u03-translate

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gsos-301-u03-translate`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GSOS-301 Unit 3 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GSOS-301 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gsos-301/`, and `static/img/figures/gsos-301/unit-03/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Notes from earlier jobs on this unit
- (gsos-301-u03-review_en, review_en, codex) Repair role terminology, missing figures, assessments and source mappings; fresh review needs author provenance and browser/print evidence.
- (gsos-301-u03-review_en, review_en, codex) Repair role terminology, missing figures, assessments and source mappings; fresh review needs author provenance and browser/print evidence.
- (gsos-301-u03-author-conflict4, fix, opencode) Unit 3 G3 English review (4 prompt-only figures fig-U3-1..U3-4) and G4/G5 Urdu remain downstream; nothing left blocking them.
- (gsos-301-u03-author-conflict3, fix, opencode) Unit 3 G3 English review, 4 prompt-only figures (fig-U3-1..U3-4), and G4/G5 Urdu remain downstream  -  nothing left blocking this branch.
- (gsos-301-u03-author-conflict2, fix, opencode) static/content-status.json is stale and pre-existing on main  -  the next job on this unit should run `npm run build:content-status` if their gate run hits it.


## Response snapshot

Recorded Unit 3 translation blockers and validation evidence without claiming translation completion.

## Outcome

- Impact: translate for GSOS-301 Unit 3 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 6 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Recorded Unit 3 translation blockers and validation evidence without claiming translation completion.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - A separate English author must resolve the existing G3 findings before G4 resumes.
  - A separate English author must resolve the existing G3 findings before G4 resumes.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
