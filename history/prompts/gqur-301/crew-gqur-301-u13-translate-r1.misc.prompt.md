---
id: crew-gqur-301-u13-translate-r1
title: crew translate GQUR-301 unit 13
stage: misc
date: 2026-10-24
surface: agent
model: claude
feature: gqur-301
branch: crew/gqur-301-u13-translate-r1
user: crew
command: crew translate
labels: ["crew", "claude", "translate"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/gqur-301/reviews/unit-13/translation-validation/handoff.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u13-translate-r1

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u13-translate-r1`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GQUR-301 Unit 13 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-301 Unit 13 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-13/`.

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
- (gqur-301-u13-figures, figures, codex) Urdu assets await placement when Unit 13’s missing Urdu topics are translated.
- (gqur-301-u13-figures, figures, codex) Urdu assets await placement when Unit 13’s missing Urdu topics are translated.
- (gqur-301-u13-translate, translate, codex) Separate English author must resolve G3 F1-F5 before translation resumes.
- (gqur-301-u13-translate, translate, codex) Separate English author must resolve G3 F1-F5 before translation resumes.
- (gqur-301-u13-review_en, review_en, codex) Separate author must resolve missing figures, RRQ8 contradiction, slope/inference claims and assessment demand; fresh review needs provenance, sources and render evidence.


## Response snapshot

Confirmed GQUR-301 Unit 13 English still has the G3 defects, so translation stayed blocked; added a dated re-check (including a new stray-character finding) to the unit's translation handoff note and committed it.

## Outcome

- Impact: translate for GQUR-301 Unit 13 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Confirmed GQUR-301 Unit 13 English still has the G3 defects, so translation stayed blocked; added a dated re-check (including a new stray-character finding) to the unit's translation handoff note and committed it.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - English Unit 13 still has G3 F1-F5 unfixed (question 8 same-data contradiction, the r-to-slope claim, unqualified interpolation), plus a stray "ȷ" (U+0237) at topic-02.mdx:123. A separate English repair has to land on main before translation can start.
  - There are no Urdu files for Unit 13 yet. The Urdu figure assets from gqur-301-u13-figures are waiting to be placed once the topics are translated.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
