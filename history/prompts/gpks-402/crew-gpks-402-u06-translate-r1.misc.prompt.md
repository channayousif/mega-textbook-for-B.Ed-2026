---
id: crew-gpks-402-u06-translate-r1
title: crew translate GPKS-402 unit 6
stage: misc
date: 2026-10-30
surface: agent
model: codex
feature: gpks-402
branch: crew/gpks-402-u06-translate-r1
user: crew
command: crew translate
labels: ["crew", "codex", "translate"]
links:
  spec: specs/content/gpks-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261048-gpks-402-u06-translation-retry.general.prompt.md
 - specs/content/gpks-402/reviews/unit-06/G4/translation-blocked.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gpks-402-u06-translate-r1

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gpks-402-u06-translate-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GPKS-402 Unit 6 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GPKS-402 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gpks-402/`, and `static/img/figures/gpks-402/unit-06/`.

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
- (gpks-402-u06-translate, translate, codex) English author must repair scoring and unresolved G3 findings before translation resumes.
- (gpks-402-u06-translate, translate, codex) English author must repair scoring and unresolved G3 findings before translation resumes.
- (gpks-402-u06-review_en, review_en, codex) Author must repair source support, assessment scoring and vocabulary; host must supply provenance and rendered-page evidence. G3/G5 remain open.
- (gpks-402-u06-review_en, review_en, codex) Author must repair source support, assessment scoring and vocabulary; host must supply provenance and rendered-page evidence. G3/G5 remain open.
- (gpks-402-u06-author-conflict4, fix, agy) Figures fig-U6-2, fig-U6-3, fig-U6-4, and fig-U6-6 have text-geometry issues reported by measure-figure-text.mjs that should be resolved in downstream asset refinement or review.


## Response snapshot

Recorded and committed the confirmed English blockers preventing Unit 6 Urdu translation.

## Outcome

- Impact: translate for GPKS-402 Unit 6 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Recorded and committed the confirmed English blockers preventing Unit 6 Urdu translation.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - English author must repair scoring and unresolved G3 findings before translation resumes; status remains draft.
  - English author must repair scoring and unresolved G3 findings before translation resumes; status remains draft.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
