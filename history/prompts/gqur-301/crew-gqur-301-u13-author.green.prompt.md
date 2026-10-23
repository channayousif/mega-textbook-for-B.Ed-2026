---
id: crew-gqur-301-u13-author
title: crew author GQUR-301 unit 13
stage: misc
date: 2026-10-22
surface: agent
model: claude
feature: gqur-301
branch: crew/gqur-301-u13-author
user: crew
command: crew author
labels: ["crew", "claude", "author"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gqur-301/unit-13/_category_.json
 - docs/semester-2/gqur-301/unit-13/index.mdx
 - docs/semester-2/gqur-301/unit-13/topic-01.mdx
 - docs/semester-2/gqur-301/unit-13/topic-02.mdx
 - docs/semester-2/gqur-301/unit-13/unit-assessment.mdx
 - glossary.json
 - history/prompts/crew/0551-author-gqur-301-u13.green.prompt.md
 - history/prompts/crew/0552-gqur-301-u13-g2-and-rubric-fix.green.prompt.md
 - specs/content/gqur-301/concepts/unit-13.md
 - specs/content/gqur-301/coverage/unit-13.md
 - specs/content/gqur-301/figures/unit-13.md
 - specs/content/gqur-301/reviews/unit-13/G2/20261022T193430944Z-gates.json
 - specs/content/gqur-301/reviews/unit-13/G2/logs-20261022T193430944Z/check-bloom-bands.txt
 - specs/content/gqur-301/reviews/unit-13/G2/logs-20261022T193430944Z/check-concept-graph.txt
 - specs/content/gqur-301/reviews/unit-13/G2/logs-20261022T193430944Z/check-depth-gate.txt
 - specs/content/gqur-301/reviews/unit-13/G2/logs-20261022T193430944Z/check-docs-sync.txt
 - specs/content/gqur-301/reviews/unit-13/G2/logs-20261022T193430944Z/check-figures.txt
 - specs/content/gqur-301/reviews/unit-13/G2/logs-20261022T193430944Z/check-no-answer-keys.txt
 - specs/content/gqur-301/reviews/unit-13/G2/logs-20261022T193430944Z/check-no-em-dash.txt
 - specs/content/gqur-301/reviews/unit-13/G2/logs-20261022T193430944Z/validate-content.txt
 - specs/content/gqur-301/sources/unit-13.md
 - specs/content/gqur-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u13-author

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u13-author`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Author GQUR-301 Unit 13 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

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

## Feedback from the previous attempt
npm run check:content has 2 finding(s) that main does not have:
✗ Pipeline gate failed with 1 finding(s):
- GQUR-301 Unit 13 (docs/semester-2/gqur-301/unit-13): 'G2 en-draft' row for Unit 13 is not done (status: '▢')


## Response snapshot

Fixed wrong regression values in the Unit 13 rubric and table cells split by `|r|`, then recorded G2 gate evidence and marked G2 en-draft done, so all 13 content gates pass.

## Outcome

- Impact: author for GQUR-301 Unit 13 by claude (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 22 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Fixed wrong regression values in the Unit 13 rubric and table cells split by `|r|`, then recorded G2 gate evidence and marked G2 en-draft done, so all 13 content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The unit's figures are still prompt-only markers; there is no `static/img/figures/gqur-301/unit-13/` yet.
  - `npm run build` was not run, so check the escaped `\|r\|` table cells render correctly in `topic-01.mdx` and `unit-assessment.mdx`.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
