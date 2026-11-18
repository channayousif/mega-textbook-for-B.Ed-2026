---
id: crew-giss-401-u05-translate
title: crew translate GISS-401 unit 5
stage: misc
date: 2026-11-06
surface: agent
model: codex
feature: giss-401
branch: crew/giss-401-u05-translate
user: crew
command: crew translate
labels: ["crew", "codex", "translate"]
links:
  spec: specs/content/giss-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261133-giss-unit-five-translation-dependency.general.prompt.md
 - specs/content/giss-401/reviews/unit-05/G4/translation-handoff.md
tests:
 - npm run check:content
---

## Prompt

# Crew job giss-401-u05-translate

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/giss-401-u05-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GISS-401 Unit 5 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GISS-401 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/giss-401/`, and `static/img/figures/giss-401/unit-05/`.

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
- (giss-401-u05-review_en, review_en, codex) Author repairs and corrected source binding, authentic provenance, scholar review, and browser/print inspection remain pending.
- (giss-401-u05-review_en, review_en, codex) Author repairs and corrected source binding, authentic provenance, scholar review, and browser/print inspection remain pending.
- (giss-401-u05-author-conflict5, fix, opencode) Unit 5 G3 English review and G4/G5 Urdu translation remain open downstream jobs; no G3/G5 row is marked done.
- (giss-401-u05-author-conflict5, fix, opencode) The merge was clean because main had not touched `specs/content/giss-401/tasks.md` since the merge base, so both sides' rows are intact.
- (giss-401-u05-author-conflict4, fix, opencode) Unit 5 G3 English review and G4/G5 Urdu translation remain open downstream jobs; no G3/G5 row is marked done.


## Response snapshot

Recorded and committed the Unit 5 translation blocker without propagating known English errors into Urdu.

## Outcome

- Impact: translate for GISS-401 Unit 5 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Recorded and committed the Unit 5 translation blocker without propagating known English errors into Urdu.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - English author must repair G3 findings before translation resumes; G4/G5 remain open and translation_status remains draft.
  - English author must repair G3 findings before translation resumes; G4/G5 remain open and translation_status remains draft.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
