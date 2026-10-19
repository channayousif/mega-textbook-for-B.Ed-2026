---
id: crew-gqur-300-u04-translate-r1
title: crew translate GQUR-300 unit 4
stage: misc
date: 2026-10-19
surface: agent
model: codex
feature: gqur-300
branch: crew/gqur-300-u04-translate-r1
user: crew
command: crew translate
labels: ["crew", "codex", "translate"]
links:
  spec: specs/content/gqur-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/0346-gqur300-unit-four-translation-continuation.general.prompt.md
 - history/prompts/gqur-300/0345-gqur300-u04-g4-handoff.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-04/unit-assessment.mdx
 - specs/content/gqur-300/reviews/unit-04/G4/handoff.md
 - specs/content/gqur-300/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-300-u04-translate-r1

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-300-u04-translate-r1`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GQUR-300 Unit 4 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-300 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-300/`, and `static/img/figures/gqur-300/unit-04/`.

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
- (gqur-300-u04-translate, translate, opencode) All 12 key_terms (Area, Centimetre, Circle, Kilogram, Millilitre, Perimeter, Radius, Rectangle, Square, Triangle, Unit of measurement, Volume) remain unbanked in terminology.csv and await curriculum owner banking before G5 review.
- (gqur-300-u04-translate, translate, opencode) The temporary reviewed flip (Step 5 parity check) was reverted; translation_status stays draft on both EN and UR index.mdx.
- (gqur-300-u04-translate, translate, opencode) Urdu mirror was already committed on origin/main from an earlier attempt; this job only verified and recorded the G4 row.

## Feedback from the previous attempt
npm run check:content has 1 finding(s) that main does not have:
✗ static/content-status.json is missing. Run: npm run build:content-status


## Response snapshot

Completed Urdu assessment labels and answer references, restored generated content status, and updated the Unit 4 handoff and prompt record.

## Outcome

- Impact: translate for GQUR-300 Unit 4 by codex (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 5 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Completed Urdu assessment labels and answer references, restored generated content status, and updated the Unit 4 handoff and prompt record.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Twelve terms await owner banking; translation remains draft pending independent G5 and rendered RTL/A4 inspection.
  - Twelve terms await owner banking; translation remains draft pending independent G5 and rendered RTL/A4 inspection.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
