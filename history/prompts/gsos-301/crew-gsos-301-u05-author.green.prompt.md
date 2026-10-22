---
id: crew-gsos-301-u05-author
title: crew author GSOS-301 unit 5
stage: misc
date: 2026-10-22
surface: agent
model: claude
feature: gsos-301
branch: crew/gsos-301-u05-author
user: crew
command: crew author
labels: ["crew", "claude", "author"]
links:
  spec: specs/content/gsos-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gsos-301/unit-05/index.mdx
 - docs/semester-2/gsos-301/unit-05/topic-01.mdx
 - docs/semester-2/gsos-301/unit-05/topic-02.mdx
 - docs/semester-2/gsos-301/unit-05/unit-assessment.mdx
 - docs/semester-2/gsos-301/unit-05/unit-teacher-notes.mdx
 - glossary.json
 - history/prompts/gsos-301/0048-author-gsos-301-unit-05-institutions.green.prompt.md
 - specs/content/gsos-301/concepts/unit-05.md
 - specs/content/gsos-301/coverage/unit-05.md
 - specs/content/gsos-301/figures/unit-05.md
 - specs/content/gsos-301/reviews/unit-05/G2/20261022T202830186Z-gates.json
 - specs/content/gsos-301/reviews/unit-05/G2/logs-20261022T202830186Z/check-bloom-bands.txt
 - specs/content/gsos-301/reviews/unit-05/G2/logs-20261022T202830186Z/check-concept-graph.txt
 - specs/content/gsos-301/reviews/unit-05/G2/logs-20261022T202830186Z/check-depth-gate.txt
 - specs/content/gsos-301/reviews/unit-05/G2/logs-20261022T202830186Z/check-docs-sync.txt
 - specs/content/gsos-301/reviews/unit-05/G2/logs-20261022T202830186Z/check-figures.txt
 - specs/content/gsos-301/reviews/unit-05/G2/logs-20261022T202830186Z/check-no-answer-keys.txt
 - specs/content/gsos-301/reviews/unit-05/G2/logs-20261022T202830186Z/check-no-em-dash.txt
 - specs/content/gsos-301/reviews/unit-05/G2/logs-20261022T202830186Z/validate-content.txt
 - specs/content/gsos-301/sources/unit-05.md
 - specs/content/gsos-301/tasks.md
 - static/img/figures/gsos-301/unit-05/fig-U5-1.dark.svg
 - static/img/figures/gsos-301/unit-05/fig-U5-1.svg
 - static/img/figures/gsos-301/unit-05/fig-U5-2.dark.svg
 - static/img/figures/gsos-301/unit-05/fig-U5-2.svg
 - static/img/figures/gsos-301/unit-05/fig-U5-3.dark.svg
 - static/img/figures/gsos-301/unit-05/fig-U5-3.svg
 - static/img/figures/gsos-301/unit-05/fig-U5-4.dark.svg
 - static/img/figures/gsos-301/unit-05/fig-U5-4.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gsos-301-u05-author

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gsos-301-u05-author`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Author GSOS-301 Unit 5 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GSOS-301 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gsos-301/`, and `static/img/figures/gsos-301/unit-05/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.


## Response snapshot

Revised and completed GSOS-301 Unit 5 in English (two topics, assessment, teacher notes, four placed SVG figures, governance tables, glossary, G2 evidence and PHR), passing every content gate except the content-status gate that origin/main also fails.

## Outcome

- Impact: author for GSOS-301 Unit 5 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 29 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Revised and completed GSOS-301 Unit 5 in English (two topics, assessment, teacher notes, four placed SVG figures, governance tables, glossary, G2 evidence and PHR), passing every content gate except the content-status gate that origin/main also fails.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Three Pakistani facts are not tied to a source and are marked `no-external-source` for the G3 reviewer to check: the Lady Health Worker programme starting in 1994, the spread of low-fee private schools, and the Council of Islamic Ideology's advisory role.
  - The Urdu translation job needs to make `.ur.svg` versions of fig-U5-1 to fig-U5-4. All 14 Urdu concept labels are newly authored (none are in `terminology.csv`) and need G5 review.
  - The sharp image renderer draws these SVGs solid black because it can't read their colour variables, so to preview one, substitute the colour values first.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
