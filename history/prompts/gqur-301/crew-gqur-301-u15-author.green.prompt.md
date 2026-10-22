---
id: crew-gqur-301-u15-author
title: crew author GQUR-301 unit 15
stage: misc
date: 2026-10-22
surface: agent
model: opencode
feature: gqur-301
branch: crew/gqur-301-u15-author
user: crew
command: crew author
labels: ["crew", "opencode", "author"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gqur-301/unit-15/_category_.json
 - docs/semester-2/gqur-301/unit-15/index.mdx
 - docs/semester-2/gqur-301/unit-15/topic-01.mdx
 - docs/semester-2/gqur-301/unit-15/topic-02.mdx
 - docs/semester-2/gqur-301/unit-15/topic-03.mdx
 - docs/semester-2/gqur-301/unit-15/unit-assessment.mdx
 - docs/semester-2/gqur-301/unit-15/unit-teacher-notes.mdx
 - history/prompts/gqur-301/0552-crew-gqur-301-u15-author.green.prompt.md
 - history/prompts/gqur-301/0553-gqur-301-u15-g2-gate-complete.green.prompt.md
 - specs/content/gqur-301/concepts/unit-15.md
 - specs/content/gqur-301/coverage/unit-15.md
 - specs/content/gqur-301/figures/unit-15.md
 - specs/content/gqur-301/reviews/unit-15/G2/2026-10-22T1951231Z-gates.json
 - specs/content/gqur-301/reviews/unit-15/G2/logs-2026-10-22T1951231Z/check-bloom-bands.txt
 - specs/content/gqur-301/reviews/unit-15/G2/logs-2026-10-22T1951231Z/check-concept-graph.txt
 - specs/content/gqur-301/reviews/unit-15/G2/logs-2026-10-22T1951231Z/check-depth-gate.txt
 - specs/content/gqur-301/reviews/unit-15/G2/logs-2026-10-22T1951231Z/check-docs-sync.txt
 - specs/content/gqur-301/reviews/unit-15/G2/logs-2026-10-22T1951231Z/check-figures.txt
 - specs/content/gqur-301/reviews/unit-15/G2/logs-2026-10-22T1951231Z/check-no-answer-keys.txt
 - specs/content/gqur-301/reviews/unit-15/G2/logs-2026-10-22T1951231Z/check-no-em-dash.txt
 - specs/content/gqur-301/reviews/unit-15/G2/logs-2026-10-22T1951231Z/validate-content.txt
 - specs/content/gqur-301/sources/unit-15.md
 - specs/content/gqur-301/tasks.md
 - static/img/figures/gqur-301/unit-15/fig-U15-1.dark.svg
 - static/img/figures/gqur-301/unit-15/fig-U15-1.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u15-author

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u15-author`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Author GQUR-301 Unit 15 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-301 Unit 15 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-15/`.

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
- GQUR-301 Unit 15 (docs/semester-2/gqur-301/unit-15): 'G2 en-draft' row for Unit 15 is not done (status: '▢')


## Response snapshot

Completed the G2 en-draft gate for GQUR-301 Unit 15 by generating gate evidence (all 8 DRAFT_COMMANDS passing), marking the tasks.md row done with auto:gates, and rebuilding content-status  -  the previous commit had already authored all English content but left the tracker row open, blocking the pipeline gate.

## Outcome

- Impact: author for GQUR-301 Unit 15 by opencode (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 25 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Completed the G2 en-draft gate for GQUR-301 Unit 15 by generating gate evidence (all 8 DRAFT_COMMANDS passing), marking the tasks.md row done with auto:gates, and rebuilding content-status  -  the previous commit had already authored all English content but left the tracker row open, blocking the pipeline gate.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The English draft (index, topic-01/02/03, unit-assessment, teacher-notes) and governance files (coverage, sources, figures, concepts) were authored in commit e9cb5127 and are unchanged. Next job on this unit is a G3 independent English review in a fresh reviewer session (ADR-0019), then G4 Urdu translation.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
