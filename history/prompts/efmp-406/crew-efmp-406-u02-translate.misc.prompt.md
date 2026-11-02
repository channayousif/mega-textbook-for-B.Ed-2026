---
id: crew-efmp-406-u02-translate
title: crew translate EFMP-406 unit 2
stage: misc
date: 2026-11-02
surface: agent
model: codex
feature: efmp-406
branch: crew/efmp-406-u02-translate
user: crew
command: crew translate
labels: ["crew", "codex", "translate"]
links:
  spec: specs/content/efmp-406/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261109-efmp406-unit-two-translation-blocked.general.prompt.md
 - history/prompts/general/546-refresh-efmp406-unit-two-g2.general.prompt.md
 - specs/content/efmp-406/reviews/unit-02/G2/20261102T193204741Z-gates.json
 - specs/content/efmp-406/reviews/unit-02/G2/logs-20261102T193204741Z/check-bloom-bands.txt
 - specs/content/efmp-406/reviews/unit-02/G2/logs-20261102T193204741Z/check-concept-graph.txt
 - specs/content/efmp-406/reviews/unit-02/G2/logs-20261102T193204741Z/check-depth-gate.txt
 - specs/content/efmp-406/reviews/unit-02/G2/logs-20261102T193204741Z/check-docs-sync.txt
 - specs/content/efmp-406/reviews/unit-02/G2/logs-20261102T193204741Z/check-figures.txt
 - specs/content/efmp-406/reviews/unit-02/G2/logs-20261102T193204741Z/check-no-answer-keys.txt
 - specs/content/efmp-406/reviews/unit-02/G2/logs-20261102T193204741Z/check-no-em-dash.txt
 - specs/content/efmp-406/reviews/unit-02/G2/logs-20261102T193204741Z/validate-content.txt
 - specs/content/efmp-406/tasks.md
 - specs/content/efmp-406/translations/unit-02/handoff.md
 - specs/content/efmp-406/translations/unit-02/logs/check-content.txt
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-406-u02-translate

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-406-u02-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate EFMP-406 Unit 2 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-406 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-406/`, and `static/img/figures/efmp-406/unit-02/`.

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
- (efmp-406-u02-review_en, review_en, codex) G3 remains open: repair RRQ 2/3/9 marking alignment and supply source, run-provenance and browser/print evidence.
- (efmp-406-u02-review_en, review_en, codex) G3 remains open: repair RRQ 2/3/9 marking alignment and supply source, run-provenance and browser/print evidence.
- (efmp-406-u02-author-conflict5, fix, opencode) Unit 2 design files under `specs/content/efmp-406/design/` still bind to every unit's manifest (`unit-02-*` names miss the unit-scoping regex); Unit 5's G2 evidence was refreshed to absorb them, so the next Unit 2 addition there will re-invalidate other units' G2 evidence again.
- (efmp-406-u02-author-conflict5, fix, opencode) `tasks.md` G2 evidence paths: Unit 5 at `20261102T155654755Z`, Unit 1 at `20261102T142934562Z`, Unit 3 at `20261102T114853349Z`; keep the newest on any later merge.
- (efmp-406-u02-author-conflict5, fix, opencode) Course overview still says only Unit 1 is available; update that line once Units 2 and 3 merge.

## Feedback from the previous attempt
npm run check:content has 2 finding(s) that main does not have:
✗ Pipeline gate failed with 1 finding(s):
- EFMP-406 Unit 2 (docs/semester-3/efmp-406/unit-02): G2 en-draft: stale or incomplete input manifest


## Response snapshot

Repaired stale Unit 2 G2 evidence and verified all content gates while preserving the required translation blocker.

## Outcome

- Impact: translate for EFMP-406 Unit 2 by codex (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 14 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Repaired stale Unit 2 G2 evidence and verified all content gates while preserving the required translation blocker.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - English author must repair RRQ 2/3/9 before translation resumes; draft status and G3/G5 remain unchanged.
  - English author must repair RRQ 2/3/9 before translation resumes; draft status and G3/G5 remain unchanged.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
