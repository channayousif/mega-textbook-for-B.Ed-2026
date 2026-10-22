---
id: crew-gsos-301-u04-translate
title: crew translate GSOS-301 unit 4
stage: misc
date: 2026-10-22
surface: agent
model: codex
feature: gsos-301
branch: crew/gsos-301-u04-translate
user: crew
command: crew translate
labels: ["crew", "codex", "translate"]
links:
  spec: specs/content/gsos-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gsos-301/crew-gsos-301-u04-translate.misc.prompt.md
 - specs/content/gsos-301/reviews/unit-04/G4/content.log
 - specs/content/gsos-301/reviews/unit-04/G4/main-content.log
 - specs/content/gsos-301/reviews/unit-04/G4/translation-handoff.md
 - specs/content/gsos-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gsos-301-u04-translate

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gsos-301-u04-translate`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GSOS-301 Unit 4 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GSOS-301 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gsos-301/`, and `static/img/figures/gsos-301/unit-04/`.

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
- (gsos-301-u04-review_en, review_en, codex) Separate author must repair assessment guidance, rubric tables, RRQ demand and coverage mappings; fresh review needs provenance and browser/print evidence.
- (gsos-301-u04-review_en, review_en, codex) Separate author must repair assessment guidance, rubric tables, RRQ demand and coverage mappings; fresh review needs provenance and browser/print evidence.
- (gsos-301-u04-author, author, opencode) G3 en-review and G4 ur-translation remain for downstream jobs; no Urdu mirror exists yet (English-only scope).


## Response snapshot

Documented the Unit 4 translation blocker and validation evidence; no Urdu translation was authored.

## Outcome

- Impact: translate for GSOS-301 Unit 4 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 5 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Documented the Unit 4 translation blocker and validation evidence; no Urdu translation was authored.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Separate English author must repair assessment and coverage findings before G4 resumes.
  - Separate English author must repair assessment and coverage findings before G4 resumes.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
