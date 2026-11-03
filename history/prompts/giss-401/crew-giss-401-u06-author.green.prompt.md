---
id: crew-giss-401-u06-author
title: crew author GISS-401 unit 6
stage: misc
date: 2026-11-03
surface: agent
model: claude
feature: giss-401
branch: crew/giss-401-u06-author
user: crew
command: crew author
labels: ["crew", "claude", "author"]
links:
  spec: specs/content/giss-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/giss-401/unit-06/index.mdx
 - docs/semester-3/giss-401/unit-06/topic-01.mdx
 - docs/semester-3/giss-401/unit-06/topic-02.mdx
 - docs/semester-3/giss-401/unit-06/topic-03.mdx
 - docs/semester-3/giss-401/unit-06/unit-assessment.mdx
 - history/prompts/general/20261110-author-giss401-unit-six.general.prompt.md
 - specs/content/giss-401/concepts/unit-06.md
 - specs/content/giss-401/coverage/unit-06.md
 - specs/content/giss-401/figures/unit-06.md
 - specs/content/giss-401/reviews/unit-06/G2/20261103T000422959Z-gates.json
 - specs/content/giss-401/reviews/unit-06/G2/logs-20261103T000422959Z/check-bloom-bands.txt
 - specs/content/giss-401/reviews/unit-06/G2/logs-20261103T000422959Z/check-concept-graph.txt
 - specs/content/giss-401/reviews/unit-06/G2/logs-20261103T000422959Z/check-depth-gate.txt
 - specs/content/giss-401/reviews/unit-06/G2/logs-20261103T000422959Z/check-docs-sync.txt
 - specs/content/giss-401/reviews/unit-06/G2/logs-20261103T000422959Z/check-figures.txt
 - specs/content/giss-401/reviews/unit-06/G2/logs-20261103T000422959Z/check-no-answer-keys.txt
 - specs/content/giss-401/reviews/unit-06/G2/logs-20261103T000422959Z/check-no-em-dash.txt
 - specs/content/giss-401/reviews/unit-06/G2/logs-20261103T000422959Z/validate-content.txt
 - specs/content/giss-401/sources/texts/bhat-2019-education.md
 - specs/content/giss-401/sources/texts/met-science-education.md
 - specs/content/giss-401/sources/texts/quran-translation.md
 - specs/content/giss-401/sources/texts/sahih-muslim-1218a.md
 - specs/content/giss-401/sources/texts/sardar-2011-astronomy.md
 - specs/content/giss-401/sources/texts/unesco-samarkand.md
 - specs/content/giss-401/sources/unit-06.md
 - specs/content/giss-401/tasks.md
 - static/img/figures/giss-401/unit-06/fig-U6-1.dark.svg
 - static/img/figures/giss-401/unit-06/fig-U6-1.svg
 - static/img/figures/giss-401/unit-06/fig-U6-2.dark.svg
 - static/img/figures/giss-401/unit-06/fig-U6-2.svg
 - static/img/figures/giss-401/unit-06/fig-U6-3.dark.svg
 - static/img/figures/giss-401/unit-06/fig-U6-3.svg
 - static/img/figures/giss-401/unit-06/fig-U6-4.dark.svg
 - static/img/figures/giss-401/unit-06/fig-U6-4.svg
 - static/img/figures/giss-401/unit-06/fig-U6-5.dark.svg
 - static/img/figures/giss-401/unit-06/fig-U6-5.svg
 - static/img/figures/giss-401/unit-06/fig-U6-6.dark.svg
 - static/img/figures/giss-401/unit-06/fig-U6-6.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job giss-401-u06-author

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/giss-401-u06-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Author GISS-401 Unit 6 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GISS-401 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/giss-401/`, and `static/img/figures/giss-401/unit-06/`.

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
- GISS-401 Unit 6 (docs/semester-3/giss-401/unit-06): 'G2 en-draft' row for Unit 6 is not done (status: '▣')


## Response snapshot

Merged origin/main to get the GISS-401 course overview, resolved the shared tracker and excerpt conflicts, and recorded Unit 6 G2 gate evidence so `npm run check:content` passes 13/13.

## Outcome

- Impact: author for GISS-401 Unit 6 by claude (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 38 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main to get the GISS-401 course overview, resolved the shared tracker and excerpt conflicts, and recorded Unit 6 G2 gate evidence so `npm run check:content` passes 13/13.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 needs a qualified Islamic Studies reviewer who also fetches the full UDHR text independently; it is declared unverifiable because official pages returned HTTP 403.
  - Other GISS-401 unit branches also add to `tasks.md`, `sources/texts/quran-translation.md` and `sources/texts/bhat-2019-education.md`; expect add/add merge conflicts there and keep every unit's sections.
  - Still open: the Urdu mirror, `.ur.svg` labels and a `measure-figure-text` run, which needs a browser and this brief barred it.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
