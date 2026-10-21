---
id: crew-gqur-301-u06-author
title: crew author GQUR-301 unit 6
stage: misc
date: 2026-10-21
surface: agent
model: claude
feature: gqur-301
branch: crew/gqur-301-u06-author
user: crew
command: crew author
labels: ["crew", "claude", "author"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gqur-301/unit-06/_category_.json
 - docs/semester-2/gqur-301/unit-06/index.mdx
 - docs/semester-2/gqur-301/unit-06/topic-01.mdx
 - docs/semester-2/gqur-301/unit-06/topic-02.mdx
 - docs/semester-2/gqur-301/unit-06/topic-03.mdx
 - docs/semester-2/gqur-301/unit-06/unit-assessment.mdx
 - docs/semester-2/gqur-301/unit-06/unit-teacher-notes.mdx
 - glossary.json
 - specs/content/gqur-301/concepts/unit-06.md
 - specs/content/gqur-301/coverage/unit-06.md
 - specs/content/gqur-301/figures/unit-06.md
 - specs/content/gqur-301/reviews/unit-06/G2/20261021T054446544Z-gates.json
 - specs/content/gqur-301/reviews/unit-06/G2/logs-20261021T054446544Z/check-bloom-bands.txt
 - specs/content/gqur-301/reviews/unit-06/G2/logs-20261021T054446544Z/check-concept-graph.txt
 - specs/content/gqur-301/reviews/unit-06/G2/logs-20261021T054446544Z/check-depth-gate.txt
 - specs/content/gqur-301/reviews/unit-06/G2/logs-20261021T054446544Z/check-docs-sync.txt
 - specs/content/gqur-301/reviews/unit-06/G2/logs-20261021T054446544Z/check-figures.txt
 - specs/content/gqur-301/reviews/unit-06/G2/logs-20261021T054446544Z/check-no-answer-keys.txt
 - specs/content/gqur-301/reviews/unit-06/G2/logs-20261021T054446544Z/check-no-em-dash.txt
 - specs/content/gqur-301/reviews/unit-06/G2/logs-20261021T054446544Z/validate-content.txt
 - specs/content/gqur-301/sources/texts/nist-sematech.md
 - specs/content/gqur-301/sources/unit-06.md
 - specs/content/gqur-301/tasks.md
 - static/img/figures/gqur-301/unit-06/fig-U6-1.dark.svg
 - static/img/figures/gqur-301/unit-06/fig-U6-1.svg
 - static/img/figures/gqur-301/unit-06/fig-U6-2.dark.svg
 - static/img/figures/gqur-301/unit-06/fig-U6-2.svg
 - static/img/figures/gqur-301/unit-06/fig-U6-3.dark.svg
 - static/img/figures/gqur-301/unit-06/fig-U6-3.svg
 - static/img/figures/gqur-301/unit-06/fig-U6-4.dark.svg
 - static/img/figures/gqur-301/unit-06/fig-U6-4.svg
 - static/img/figures/gqur-301/unit-06/fig-U6-5.dark.svg
 - static/img/figures/gqur-301/unit-06/fig-U6-5.svg
 - static/img/figures/gqur-301/unit-06/fig-U6-6.dark.svg
 - static/img/figures/gqur-301/unit-06/fig-U6-6.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u06-author

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u06-author`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Author GQUR-301 Unit 6 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-301 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-06/`.

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

Authored GQUR-301 Unit 6 (Measures of Dispersion) in English with three topics, a 10/10/5 assessment, teacher notes, the coverage, sources, figure and concept records, six placed SVG figures, five glossary entries and G2 gate evidence, with all content gates passing.

## Outcome

- Impact: author for GQUR-301 Unit 6 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 35 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Authored GQUR-301 Unit 6 (Measures of Dispersion) in English with three topics, a 10/10/5 assessment, teacher notes, the coverage, sources, figure and concept records, six placed SVG figures, five glossary entries and G2 gate evidence, with all content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The Urdu mirror still needs translated `.ur.svg` versions of fig-U6-1 to fig-U6-6, and the 10 Urdu concept labels in `concepts/unit-06.md` are my own wording and need G5 review.
  - `course-overview.mdx` still lists Unit 6 as "(coming soon)" with no link to `./unit-06/index.mdx`.
  - Do not add Unit 6 notes to `sources/texts/lane2023.md` or `openstax-stats.md`; that makes the G2 records for GQUR-301 Units 1-5 out of date.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
