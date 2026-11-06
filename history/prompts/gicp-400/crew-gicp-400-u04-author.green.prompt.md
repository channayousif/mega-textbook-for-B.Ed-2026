---
id: crew-gicp-400-u04-author
title: crew author GICP-400 unit 4
stage: misc
date: 2026-11-06
surface: agent
model: claude
feature: gicp-400
branch: crew/gicp-400-u04-author
user: crew
command: crew author
labels: ["crew", "claude", "author"]
links:
  spec: specs/content/gicp-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/gicp-400/unit-04/index.mdx
 - docs/semester-3/gicp-400/unit-04/topic-01.mdx
 - docs/semester-3/gicp-400/unit-04/topic-02.mdx
 - docs/semester-3/gicp-400/unit-04/topic-03.mdx
 - docs/semester-3/gicp-400/unit-04/unit-assessment.mdx
 - history/prompts/general/20261134-author-gicp400-unit-four.general.prompt.md
 - history/prompts/general/20261135-gicp400-unit-four-g2-evidence.general.prompt.md
 - specs/content/gicp-400/authoring/unit-04.md
 - specs/content/gicp-400/concepts/unit-04.md
 - specs/content/gicp-400/coverage/unit-04.md
 - specs/content/gicp-400/figures/unit-04.banner.md
 - specs/content/gicp-400/figures/unit-04.md
 - specs/content/gicp-400/reviews/unit-04/G2/20261106T162054269Z-gates.json
 - specs/content/gicp-400/reviews/unit-04/G2/logs-20261106T162054269Z/check-bloom-bands.txt
 - specs/content/gicp-400/reviews/unit-04/G2/logs-20261106T162054269Z/check-concept-graph.txt
 - specs/content/gicp-400/reviews/unit-04/G2/logs-20261106T162054269Z/check-depth-gate.txt
 - specs/content/gicp-400/reviews/unit-04/G2/logs-20261106T162054269Z/check-docs-sync.txt
 - specs/content/gicp-400/reviews/unit-04/G2/logs-20261106T162054269Z/check-figures.txt
 - specs/content/gicp-400/reviews/unit-04/G2/logs-20261106T162054269Z/check-no-answer-keys.txt
 - specs/content/gicp-400/reviews/unit-04/G2/logs-20261106T162054269Z/check-no-em-dash.txt
 - specs/content/gicp-400/reviews/unit-04/G2/logs-20261106T162054269Z/validate-content.txt
 - specs/content/gicp-400/sources/texts/abbas-2023-constitutional-crisis.md
 - specs/content/gicp-400/sources/texts/ecp-1988-report.md
 - specs/content/gicp-400/sources/texts/na-parliamentary-history.md
 - specs/content/gicp-400/sources/texts/pak-constitution-2024-edition.md
 - specs/content/gicp-400/sources/unit-04.md
 - specs/content/gicp-400/tasks.md
 - static/img/figures/gicp-400/unit-04/fig-U4-1.dark.svg
 - static/img/figures/gicp-400/unit-04/fig-U4-1.svg
 - static/img/figures/gicp-400/unit-04/fig-U4-2.dark.svg
 - static/img/figures/gicp-400/unit-04/fig-U4-2.svg
 - static/img/figures/gicp-400/unit-04/fig-U4-3.dark.svg
 - static/img/figures/gicp-400/unit-04/fig-U4-3.svg
 - static/img/figures/gicp-400/unit-04/fig-U4-4.dark.svg
 - static/img/figures/gicp-400/unit-04/fig-U4-4.svg
 - static/img/figures/gicp-400/unit-04/fig-U4-5.dark.svg
 - static/img/figures/gicp-400/unit-04/fig-U4-5.svg
 - static/img/figures/gicp-400/unit-04/fig-U4-6.dark.svg
 - static/img/figures/gicp-400/unit-04/fig-U4-6.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gicp-400-u04-author

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gicp-400-u04-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Author GICP-400 Unit 4 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job). Topic titles read "Topic N.M - Title" (validate:content checks it).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GICP-400 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gicp-400/`, and `static/img/figures/gicp-400/unit-04/`.

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
- GICP-400 Unit 4 (docs/semester-3/gicp-400/unit-04): 'G2 en-draft' row for Unit 4 is not done (status: '▣')


## Response snapshot

Merged main to clear the GICP-400 Unit 4 course-overview blocker, moved Unit 4's constitution note to its own source key, recorded deterministic G2 evidence with tracker and PHR, and got all 14 content gates passing.

## Outcome

- Impact: author for GICP-400 Unit 4 by claude (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 39 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged main to clear the GICP-400 Unit 4 course-overview blocker, moved Unit 4's constitution note to its own source key, recorded deterministic G2 evidence with tracker and PHR, and got all 14 content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Unit 4 cites `pak-constitution-2024-edition` (same work as the spec's mapped `pak-constitution-1973`, printed-page locators); the G3 reviewer should confirm that key is acceptable. It deliberately excludes the Twenty-seventh Amendment as a dated snapshot.
  - `measure-figure-text.mjs` for the six `fig-U4-*` SVGs and the site build are still unrun; the banner remains prompt-only and G6 is open.
  - Do not edit `sources/texts/pak-constitution-1973.md` from a unit job, because that invalidates Unit 1's G2 evidence; the `tasks.md` row for Unit 4 will conflict with sibling jobs on merge, so keep every unit's rows.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
