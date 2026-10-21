---
id: crew-gqur-301-u09-author
title: crew author GQUR-301 unit 9
stage: misc
date: 2026-10-21
surface: agent
model: codex
feature: gqur-301
branch: crew/gqur-301-u09-author
user: crew
command: crew author
labels: ["crew", "codex", "author"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gqur-301/unit-09/index.mdx
 - docs/semester-2/gqur-301/unit-09/topic-01.mdx
 - docs/semester-2/gqur-301/unit-09/topic-02.mdx
 - docs/semester-2/gqur-301/unit-09/unit-assessment.mdx
 - history/prompts/gqur-301/0550-author-gqur-301-unit-nine.misc.prompt.md
 - specs/content/gqur-301/concepts/unit-09.md
 - specs/content/gqur-301/coverage/unit-09.md
 - specs/content/gqur-301/coverage/unit-09/design.md
 - specs/content/gqur-301/figures/unit-09.md
 - specs/content/gqur-301/reviews/unit-09/G2/20261021T061312899Z-gates.json
 - specs/content/gqur-301/reviews/unit-09/G2/20261021T061433933Z-gates.json
 - specs/content/gqur-301/reviews/unit-09/G2/README.md
 - specs/content/gqur-301/reviews/unit-09/G2/logs-20261021T061312899Z/check-bloom-bands.txt
 - specs/content/gqur-301/reviews/unit-09/G2/logs-20261021T061312899Z/check-concept-graph.txt
 - specs/content/gqur-301/reviews/unit-09/G2/logs-20261021T061312899Z/check-depth-gate.txt
 - specs/content/gqur-301/reviews/unit-09/G2/logs-20261021T061312899Z/check-docs-sync.txt
 - specs/content/gqur-301/reviews/unit-09/G2/logs-20261021T061312899Z/check-figures.txt
 - specs/content/gqur-301/reviews/unit-09/G2/logs-20261021T061312899Z/check-no-answer-keys.txt
 - specs/content/gqur-301/reviews/unit-09/G2/logs-20261021T061312899Z/check-no-em-dash.txt
 - specs/content/gqur-301/reviews/unit-09/G2/logs-20261021T061312899Z/validate-content.txt
 - specs/content/gqur-301/reviews/unit-09/G2/logs-20261021T061433933Z/check-bloom-bands.txt
 - specs/content/gqur-301/reviews/unit-09/G2/logs-20261021T061433933Z/check-concept-graph.txt
 - specs/content/gqur-301/reviews/unit-09/G2/logs-20261021T061433933Z/check-depth-gate.txt
 - specs/content/gqur-301/reviews/unit-09/G2/logs-20261021T061433933Z/check-docs-sync.txt
 - specs/content/gqur-301/reviews/unit-09/G2/logs-20261021T061433933Z/check-figures.txt
 - specs/content/gqur-301/reviews/unit-09/G2/logs-20261021T061433933Z/check-no-answer-keys.txt
 - specs/content/gqur-301/reviews/unit-09/G2/logs-20261021T061433933Z/check-no-em-dash.txt
 - specs/content/gqur-301/reviews/unit-09/G2/logs-20261021T061433933Z/validate-content.txt
 - specs/content/gqur-301/reviews/unit-09/author-validation/comparison.md
 - specs/content/gqur-301/reviews/unit-09/author-validation/origin-main-content-gates.txt
 - specs/content/gqur-301/reviews/unit-09/author-validation/unit-09-content-gates.txt
 - specs/content/gqur-301/sources/texts/u09-lane-2023.md
 - specs/content/gqur-301/sources/texts/u09-nist-2026.md
 - specs/content/gqur-301/sources/texts/u09-openstax-2023.md
 - specs/content/gqur-301/sources/texts/unit-09/openalex-openstax.json
 - specs/content/gqur-301/sources/unit-09.md
 - specs/content/gqur-301/tasks.md
 - static/img/figures/gqur-301/unit-09/fig-U9-1.dark.svg
 - static/img/figures/gqur-301/unit-09/fig-U9-1.svg
 - static/img/figures/gqur-301/unit-09/fig-U9-2.dark.svg
 - static/img/figures/gqur-301/unit-09/fig-U9-2.svg
 - static/img/figures/gqur-301/unit-09/fig-U9-3.dark.svg
 - static/img/figures/gqur-301/unit-09/fig-U9-3.svg
 - static/img/figures/gqur-301/unit-09/fig-U9-4.dark.svg
 - static/img/figures/gqur-301/unit-09/fig-U9-4.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u09-author

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u09-author`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Author GQUR-301 Unit 9 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-301 Unit 9 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-09/`.

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

Authored English GQUR-301 Unit 9 with two topics, a 10/10/5 assessment, four themed figures, source records and valid G2 evidence.

## Outcome

- Impact: author for GQUR-301 Unit 9 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 45 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Authored English GQUR-301 Unit 9 with two topics, a 10/10/5 assessment, four themed figures, source records and valid G2 evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Independent G3 review, Urdu translation and figure localisation remain pending.
  - Independent G3 review, Urdu translation and figure localisation remain pending.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
