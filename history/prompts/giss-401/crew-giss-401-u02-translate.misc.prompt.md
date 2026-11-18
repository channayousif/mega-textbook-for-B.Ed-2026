---
id: crew-giss-401-u02-translate
title: crew translate GISS-401 unit 2
stage: misc
date: 2026-11-06
surface: agent
model: codex
feature: giss-401
branch: crew/giss-401-u02-translate
user: crew
command: crew translate
labels: ["crew", "codex", "translate"]
links:
  spec: specs/content/giss-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261133-giss401-unit-two-translation-blocked.general.prompt.md
 - specs/content/giss-401/reviews/unit-02/G4/check-content-baseline.log
 - specs/content/giss-401/reviews/unit-02/G4/check-content-final.log
 - specs/content/giss-401/reviews/unit-02/G4/translation-blocker.md
tests:
 - npm run check:content
---

## Prompt

# Crew job giss-401-u02-translate

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/giss-401-u02-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GISS-401 Unit 2 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GISS-401 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/giss-401/`, and `static/img/figures/giss-401/unit-02/`.

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
- (giss-401-u02-review_en, review_en, codex) Resolve the assessment blueprint gap; arrange scholar review, source verification, independent assessment solving and browser/print inspection.
- (giss-401-u02-review_en, review_en, codex) Resolve the assessment blueprint gap; arrange scholar review, source verification, independent assessment solving and browser/print inspection.
- (giss-401-u02-author-conflict4, fix, opencode) Six Unit 2 SVGs have never been through measure-figure-text.mjs (Chromium barred locally); CI figure-geometry is their first real check, and the Urdu mirror still needs `.ur.svg` versions.
- (giss-401-u02-author-conflict4, fix, opencode) G3 needs a fresh independent review including a qualified Islamic Studies scholar; older Unit 2 G2 evidence files are unreferenced and the tracker points at `20261103T012756049Z-gates.json`.
- (giss-401-u02-author-conflict3, fix, opencode) Six Unit 2 SVGs have never been through measure-figure-text.mjs (Chromium barred locally); CI figure-geometry is their first real check, and the Urdu mirror still needs `.ur.svg` versions (generator in gitignored `.crew/figgen/gen.py`).


## Response snapshot

Recorded the verified Unit 2 translation blocker and passing checks; no Urdu translation was authored.

## Outcome

- Impact: translate for GISS-401 Unit 2 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 4 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Recorded the verified Unit 2 translation blocker and passing checks; no Urdu translation was authored.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - A separate English author and qualified scholar must resolve the Ijma/Qiyas assessment gap before translation resumes.
  - A separate English author and qualified scholar must resolve the Ijma/Qiyas assessment gap before translation resumes.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
