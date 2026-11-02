---
id: crew-efmp-406-u02-author
title: crew author EFMP-406 unit 2
stage: misc
date: 2026-11-02
surface: agent
model: claude
feature: efmp-406
branch: crew/efmp-406-u02-author
user: crew
command: crew author
labels: ["crew", "claude", "author"]
links:
  spec: specs/content/efmp-406/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/efmp-406/_category_.json
 - docs/semester-3/efmp-406/course-overview.mdx
 - docs/semester-3/efmp-406/unit-02/index.mdx
 - docs/semester-3/efmp-406/unit-02/topic-01.mdx
 - docs/semester-3/efmp-406/unit-02/topic-02.mdx
 - docs/semester-3/efmp-406/unit-02/unit-assessment.mdx
 - docs/semester-3/efmp-406/unit-02/unit-teacher-notes.mdx
 - history/prompts/general/20261051-author-efmp406-unit-two.general.prompt.md
 - history/prompts/general/20261052-efmp406-unit-two-g2-evidence.general.prompt.md
 - specs/content/efmp-406/concepts/unit-02.md
 - specs/content/efmp-406/coverage/unit-02.md
 - specs/content/efmp-406/design/unit-02-course-overview-proposal.md
 - specs/content/efmp-406/design/unit-02-glossary-candidates.json
 - specs/content/efmp-406/design/unit-02-validation.md
 - specs/content/efmp-406/design/unit-02.md
 - specs/content/efmp-406/figures/unit-02.md
 - specs/content/efmp-406/reviews/unit-02/G2/20261102T074938805Z-gates.json
 - specs/content/efmp-406/reviews/unit-02/G2/logs-20261102T074938805Z/check-bloom-bands.txt
 - specs/content/efmp-406/reviews/unit-02/G2/logs-20261102T074938805Z/check-concept-graph.txt
 - specs/content/efmp-406/reviews/unit-02/G2/logs-20261102T074938805Z/check-depth-gate.txt
 - specs/content/efmp-406/reviews/unit-02/G2/logs-20261102T074938805Z/check-docs-sync.txt
 - specs/content/efmp-406/reviews/unit-02/G2/logs-20261102T074938805Z/check-figures.txt
 - specs/content/efmp-406/reviews/unit-02/G2/logs-20261102T074938805Z/check-no-answer-keys.txt
 - specs/content/efmp-406/reviews/unit-02/G2/logs-20261102T074938805Z/check-no-em-dash.txt
 - specs/content/efmp-406/reviews/unit-02/G2/logs-20261102T074938805Z/validate-content.txt
 - specs/content/efmp-406/sources/texts/alcolea-2020-mil.md
 - specs/content/efmp-406/sources/texts/jisc-digital-capabilities.md
 - specs/content/efmp-406/sources/texts/minott-2011-critical.md
 - specs/content/efmp-406/sources/texts/unesco-2021-mil.md
 - specs/content/efmp-406/sources/unit-02.md
 - specs/content/efmp-406/tasks.md
 - static/img/figures/efmp-406/unit-02/fig-U2-1.dark.svg
 - static/img/figures/efmp-406/unit-02/fig-U2-1.svg
 - static/img/figures/efmp-406/unit-02/fig-U2-2.dark.svg
 - static/img/figures/efmp-406/unit-02/fig-U2-2.svg
 - static/img/figures/efmp-406/unit-02/fig-U2-3.dark.svg
 - static/img/figures/efmp-406/unit-02/fig-U2-3.svg
 - static/img/figures/efmp-406/unit-02/fig-U2-4.dark.svg
 - static/img/figures/efmp-406/unit-02/fig-U2-4.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-406-u02-author

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-406-u02-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Author EFMP-406 Unit 2 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-406 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-406/`, and `static/img/figures/efmp-406/unit-02/`.

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
- EFMP-406 Unit 2 (docs/semester-3/efmp-406/unit-02): 'G2 en-draft' row for Unit 2 is not done (status: '▣')


## Response snapshot

Recorded EFMP-406 Unit 2 G2 gate evidence and tracker rows, adding the course overview from PR #405 that the evidence required, so all 13 content gates pass.

## Outcome

- Impact: author for EFMP-406 Unit 2 by claude (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 39 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Recorded EFMP-406 Unit 2 G2 gate evidence and tracker rows, adding the course overview from PR #405 that the evidence required, so all 13 content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The Unit 2 branch carries the course overview, `_category_.json` and `tasks.md` exactly as in PR #405; when merging, keep #405's overview and every unit's tracker rows.
  - The `crew/efmp-406-u03-author` branch has a different `course-overview.mdx` and `_category_.json`, so it will conflict with #405 and this branch.
  - The course overview still says only Unit 1 is available; update that line once Units 2 and 3 merge.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
