---
id: crew-gqur-301-u08-author
title: crew author GQUR-301 unit 8
stage: misc
date: 2026-10-21
surface: agent
model: claude
feature: gqur-301
branch: crew/gqur-301-u08-author
user: crew
command: crew author
labels: ["crew", "claude", "author"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gqur-301/unit-08/_category_.json
 - docs/semester-2/gqur-301/unit-08/index.mdx
 - docs/semester-2/gqur-301/unit-08/topic-01.mdx
 - docs/semester-2/gqur-301/unit-08/topic-02.mdx
 - docs/semester-2/gqur-301/unit-08/topic-03.mdx
 - docs/semester-2/gqur-301/unit-08/unit-assessment.mdx
 - docs/semester-2/gqur-301/unit-08/unit-teacher-notes.mdx
 - glossary.json
 - specs/content/gqur-301/concepts/unit-08.md
 - specs/content/gqur-301/coverage/unit-08.md
 - specs/content/gqur-301/figures/unit-08.md
 - specs/content/gqur-301/reviews/unit-08/G2/20261021T061205981Z-gates.json
 - specs/content/gqur-301/reviews/unit-08/G2/logs-20261021T061205981Z/check-bloom-bands.txt
 - specs/content/gqur-301/reviews/unit-08/G2/logs-20261021T061205981Z/check-concept-graph.txt
 - specs/content/gqur-301/reviews/unit-08/G2/logs-20261021T061205981Z/check-depth-gate.txt
 - specs/content/gqur-301/reviews/unit-08/G2/logs-20261021T061205981Z/check-docs-sync.txt
 - specs/content/gqur-301/reviews/unit-08/G2/logs-20261021T061205981Z/check-figures.txt
 - specs/content/gqur-301/reviews/unit-08/G2/logs-20261021T061205981Z/check-no-answer-keys.txt
 - specs/content/gqur-301/reviews/unit-08/G2/logs-20261021T061205981Z/check-no-em-dash.txt
 - specs/content/gqur-301/reviews/unit-08/G2/logs-20261021T061205981Z/validate-content.txt
 - specs/content/gqur-301/sources/texts/openstax-precalc.md
 - specs/content/gqur-301/sources/unit-08.md
 - specs/content/gqur-301/tasks.md
 - static/img/figures/gqur-301/unit-08/fig-U8-1.dark.svg
 - static/img/figures/gqur-301/unit-08/fig-U8-1.svg
 - static/img/figures/gqur-301/unit-08/fig-U8-2.dark.svg
 - static/img/figures/gqur-301/unit-08/fig-U8-2.svg
 - static/img/figures/gqur-301/unit-08/fig-U8-3.dark.svg
 - static/img/figures/gqur-301/unit-08/fig-U8-3.svg
 - static/img/figures/gqur-301/unit-08/fig-U8-4.dark.svg
 - static/img/figures/gqur-301/unit-08/fig-U8-4.svg
 - static/img/figures/gqur-301/unit-08/fig-U8-5.dark.svg
 - static/img/figures/gqur-301/unit-08/fig-U8-5.svg
 - static/img/figures/gqur-301/unit-08/fig-U8-6.dark.svg
 - static/img/figures/gqur-301/unit-08/fig-U8-6.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u08-author

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u08-author`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Author GQUR-301 Unit 8 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-301 Unit 8 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-08/`.

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

Authored GQUR-301 Unit 8 in English (3 topics, assessment, teacher notes, 6 placed SVG figures, glossary terms, coverage/sources/figure/concept records and G2 gate evidence), with all Unit 8 gates passing.

## Outcome

- Impact: author for GQUR-301 Unit 8 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 35 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Authored GQUR-301 Unit 8 in English (3 topics, assessment, teacher notes, 6 placed SVG figures, glossary terms, coverage/sources/figure/concept records and G2 gate evidence), with all Unit 8 gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Urdu versions of fig-U8-1..6 and the 8 Urdu concept labels in `specs/content/gqur-301/concepts/unit-08.md` are not done and need the Urdu review.
  - `course-overview.mdx` still lists Unit 8 as "(coming soon)"; that shared file was outside this job's scope.
  - the build was not run on this branch; run it before merging.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
