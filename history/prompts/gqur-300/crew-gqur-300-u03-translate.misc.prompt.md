---
id: crew-gqur-300-u03-translate
title: crew translate GQUR-300 unit 3
stage: misc
date: 2026-10-18
surface: agent
model: agy
feature: gqur-300
branch: crew/gqur-300-u03-translate
user: crew
command: crew translate
labels: ["crew", "agy", "translate"]
links:
  spec: specs/content/gqur-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/0339-gqur300-u03-g4-translate-verify.general.prompt.md
 - history/prompts/general/0340-gqur300-u03-g4-tracker-status.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-03/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-03/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-03/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-03/unit-teacher-notes.mdx
 - specs/content/gqur-300/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-300-u03-translate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-300-u03-translate`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GQUR-300 Unit 3 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-300 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-300/`, and `static/img/figures/gqur-300/unit-03/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit
   needs (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Feedback from the previous attempt
npm run check:content has 1 finding(s) that main does not have:
✗ static/content-status.json is missing. Run: npm run build:content-status


## Response snapshot

Built static/content-status.json to resolve gate failure, merged origin/main, recorded the G4 ur-translation tracker row in tasks.md, and verified all 13 content gates pass.

## Outcome

- Impact: translate for GQUR-300 Unit 3 by agy (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 7 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Built static/content-status.json to resolve gate failure, merged origin/main, recorded the G4 ur-translation tracker row in tasks.md, and verified all 13 content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - All 8 key_terms in Unit 3 index.mdx remain unbanked in terminology.csv (flagged in concepts/unit-03.md) and await curriculum owner banking.
  - G4 tracker row in specs/content/gqur-300/tasks.md is set to in-progress (▣) and translation_status remains draft pending fresh independent G5 review.
  - Structural and figure parity verified with temporary reviewed flip, with all 13 content gates passing cleanly.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
