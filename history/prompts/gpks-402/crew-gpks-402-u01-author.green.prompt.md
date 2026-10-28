---
id: crew-gpks-402-u01-author
title: crew author GPKS-402 unit 1
stage: misc
date: 2026-10-28
surface: agent
model: claude
feature: gpks-402
branch: crew/gpks-402-u01-author
user: crew
command: crew author
labels: ["crew", "claude", "author"]
links:
  spec: specs/content/gpks-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gpks-402/unit-01/index.mdx
 - docs/semester-2/gpks-402/unit-01/topic-01.mdx
 - docs/semester-2/gpks-402/unit-01/topic-02.mdx
 - docs/semester-2/gpks-402/unit-01/unit-assessment.mdx
 - glossary.json
 - specs/content/gpks-402/concepts/unit-01.md
 - specs/content/gpks-402/coverage/unit-01.md
 - specs/content/gpks-402/figures/unit-01.md
 - specs/content/gpks-402/reviews/unit-01/G2/20261028T093113893Z-gates.json
 - specs/content/gpks-402/reviews/unit-01/G2/logs-20261028T093113893Z/check-bloom-bands.txt
 - specs/content/gpks-402/reviews/unit-01/G2/logs-20261028T093113893Z/check-concept-graph.txt
 - specs/content/gpks-402/reviews/unit-01/G2/logs-20261028T093113893Z/check-depth-gate.txt
 - specs/content/gpks-402/reviews/unit-01/G2/logs-20261028T093113893Z/check-docs-sync.txt
 - specs/content/gpks-402/reviews/unit-01/G2/logs-20261028T093113893Z/check-figures.txt
 - specs/content/gpks-402/reviews/unit-01/G2/logs-20261028T093113893Z/check-no-answer-keys.txt
 - specs/content/gpks-402/reviews/unit-01/G2/logs-20261028T093113893Z/check-no-em-dash.txt
 - specs/content/gpks-402/reviews/unit-01/G2/logs-20261028T093113893Z/validate-content.txt
 - specs/content/gpks-402/sources/texts/hassan-2020-two-nation.md
 - specs/content/gpks-402/sources/texts/iqbal-1930-allahabad.md
 - specs/content/gpks-402/sources/texts/jinnah-1940-lahore.md
 - specs/content/gpks-402/sources/texts/jinnah-1947-assembly.md
 - specs/content/gpks-402/sources/texts/pak-constitution-1973.md
 - specs/content/gpks-402/sources/unit-01.md
 - specs/content/gpks-402/tasks.md
 - static/img/figures/gpks-402/unit-01/fig-U1-1.dark.svg
 - static/img/figures/gpks-402/unit-01/fig-U1-1.svg
 - static/img/figures/gpks-402/unit-01/fig-U1-2.dark.svg
 - static/img/figures/gpks-402/unit-01/fig-U1-2.svg
 - static/img/figures/gpks-402/unit-01/fig-U1-3.dark.svg
 - static/img/figures/gpks-402/unit-01/fig-U1-3.svg
 - static/img/figures/gpks-402/unit-01/fig-U1-4.dark.svg
 - static/img/figures/gpks-402/unit-01/fig-U1-4.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gpks-402-u01-author

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gpks-402-u01-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Author GPKS-402 Unit 1 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GPKS-402 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gpks-402/`, and `static/img/figures/gpks-402/unit-01/`.

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

Authored the English GPKS-402 Unit 1 (index, two topics, 10/10/5 assessment) with four placed figures, coverage/sources/concept/figure records, five source-excerpt files, nine glossary terms and G2 gate evidence; all 13 content gates pass.

## Outcome

- Impact: author for GPKS-402 Unit 1 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 32 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Authored the English GPKS-402 Unit 1 (index, two topics, 10/10/5 assessment) with four placed figures, coverage/sources/concept/figure records, five source-excerpt files, nine glossary terms and G2 gate evidence; all 13 content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Only content gates were run; the first `npm run build` must check that the four new pages in `docs/semester-2/gpks-402/unit-01/` render.
  - Urdu mirror job needs `.ur.svg` versions of fig-U1-1 to fig-U1-4 and G5 review of the authored Urdu glossary definitions and concept labels (`concepts/unit-01.md`).
  - Reading time is 61 min only at 180 wpm (about 58 at 190); the 60-80 budget may need another look, and Rabbani and the HEC curriculum still need checking against print copies.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
