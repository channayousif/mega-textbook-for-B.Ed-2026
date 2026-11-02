---
id: crew-efmp-406-u03-translate
title: crew translate EFMP-406 unit 3
stage: misc
date: 2026-11-02
surface: agent
model: codex
feature: efmp-406
branch: crew/efmp-406-u03-translate
user: crew
command: crew translate
labels: ["crew", "codex", "translate"]
links:
  spec: specs/content/efmp-406/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261053-record-unit-three-translation-blocker.general.prompt.md
 - history/prompts/general/20261054-repair-translation-hold-evidence-location.general.prompt.md
 - specs/content/efmp-406/reviews/unit-03/translation-hold/check-content-blocked.txt
 - specs/content/efmp-406/reviews/unit-03/translation-hold/check-content-continuation.txt
 - specs/content/efmp-406/reviews/unit-03/translation-hold/handoff.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-406-u03-translate

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-406-u03-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate EFMP-406 Unit 3 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-406 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-406/`, and `static/img/figures/efmp-406/unit-03/`.

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
- (efmp-406-u03-review_en, review_en, codex) Author repairs and fresh source, provenance, browser and print evidence are required; G3 remains open and unsigned.
- (efmp-406-u03-review_en, review_en, codex) Author repairs and fresh source, provenance, browser and print evidence are required; G3 remains open and unsigned.
- (efmp-406-u03-author-conflict1, fix, opencode) G3 independent English review for Unit 3 remains unscheduled (separate reviewer run). Urdu translation (G4) and review (G5) are downstream.
- (efmp-406-u03-author, author, agy) English Unit 3 draft is complete, G2 evidence recorded, and all 13 content gates pass.
- (efmp-406-u03-author, author, agy) G3 independent English review is ready to be scheduled with a separate reviewer run.

## Feedback from the previous attempt
npm run check:content has 2 finding(s) that main does not have:
✗ Pipeline gate failed with 1 finding(s):
- EFMP-406 Unit 3 (docs/semester-3/efmp-406/unit-03): G2 en-draft: stale or incomplete input manifest


## Response snapshot

Relocated translation-hold evidence to restore G2 validity and recorded the unresolved translation dependency.

## Outcome

- Impact: translate for EFMP-406 Unit 3 by codex (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 5 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Relocated translation-hold evidence to restore G2 validity and recorded the unresolved translation dependency.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Author must repair English/source defects before G4 resumes; G3/G5 remain open.
  - Author must repair English/source defects before G4 resumes; G3/G5 remain open.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
