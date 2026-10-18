---
id: crew-gqur-300-u05-translate
title: crew translate GQUR-300 unit 5
stage: misc
date: 2026-10-18
surface: agent
model: opencode
feature: gqur-300
branch: crew/gqur-300-u05-translate
user: crew
command: crew translate
labels: ["crew", "opencode", "translate"]
links:
  spec: specs/content/gqur-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gqur-300/0339-gqur-300-u05-translate-verify.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-05/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-05/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-05/unit-assessment.mdx
 - static/img/figures/gqur-300/unit-05/fig-U5-5.ur.dark.svg
 - static/img/figures/gqur-300/unit-05/fig-U5-5.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-300-u05-translate

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-300-u05-translate`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GQUR-300 Unit 5 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-300 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-300/`, and `static/img/figures/gqur-300/unit-05/`.

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

Generated static/content-status.json to clear the lone check:content finding, verified GQUR-300 Unit 6 Urdu mirror structurally complete and all 13 gates green, committed PHR.

## Outcome

- Impact: translate for GQUR-300 Unit 5 by opencode (attempt 3).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 6 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Generated static/content-status.json to clear the lone check:content finding, verified GQUR-300 Unit 6 Urdu mirror structurally complete and all 13 gates green, committed PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - GQUR-300 statistics terms (Mode/Mean/Median/Data/Bar chart/Pie chart/Line graph/Pictograph/Frequency table/Tally) are not banked in specs/content/terminology.csv - G5 review must resolve and the owner should bank them. The concept graph (specs/content/gqur-300/concepts/unit-05.md) uses عاد for Mode while the Urdu translation uses موڈ - flag this discrepancy to the G5 reviewer. translation_status stays draft; no G4/G5 tracker row appended per skill.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 2 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
