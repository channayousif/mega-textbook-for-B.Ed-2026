---
id: crew-efmp-407-u02-author
title: crew author EFMP-407 unit 2
stage: misc
date: 2026-11-07
surface: agent
model: claude
feature: efmp-407
branch: crew/efmp-407-u02-author
user: crew
command: crew author
labels: ["crew", "claude", "author"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/efmp-407/unit-02/index.mdx
 - docs/semester-3/efmp-407/unit-02/topic-01.mdx
 - docs/semester-3/efmp-407/unit-02/topic-02.mdx
 - docs/semester-3/efmp-407/unit-02/topic-03.mdx
 - docs/semester-3/efmp-407/unit-02/unit-assessment.mdx
 - docs/semester-3/efmp-407/unit-02/unit-teacher-notes.mdx
 - history/prompts/efmp-407/20261144-efmp407-unit02-g2-after-overview.general.prompt.md
 - history/prompts/general/20261143-recheck-efmp407-g2-dependency.general.prompt.md
 - history/prompts/general/553-author-efmp407-unit-two.general.prompt.md
 - specs/content/efmp-407/concepts/unit-02.md
 - specs/content/efmp-407/coverage/unit-02.md
 - specs/content/efmp-407/figures/unit-02.banner.md
 - specs/content/efmp-407/figures/unit-02.md
 - specs/content/efmp-407/reviews/unit-02/G2/20261107T073248216Z-gates.json
 - specs/content/efmp-407/reviews/unit-02/G2/logs-20261107T073248216Z/check-bloom-bands.txt
 - specs/content/efmp-407/reviews/unit-02/G2/logs-20261107T073248216Z/check-concept-graph.txt
 - specs/content/efmp-407/reviews/unit-02/G2/logs-20261107T073248216Z/check-depth-gate.txt
 - specs/content/efmp-407/reviews/unit-02/G2/logs-20261107T073248216Z/check-docs-sync.txt
 - specs/content/efmp-407/reviews/unit-02/G2/logs-20261107T073248216Z/check-figures.txt
 - specs/content/efmp-407/reviews/unit-02/G2/logs-20261107T073248216Z/check-no-answer-keys.txt
 - specs/content/efmp-407/reviews/unit-02/G2/logs-20261107T073248216Z/check-no-em-dash.txt
 - specs/content/efmp-407/reviews/unit-02/G2/logs-20261107T073248216Z/validate-content.txt
 - specs/content/efmp-407/sources/texts/maurer-bogner-2019.md
 - specs/content/efmp-407/sources/texts/unesco-2017-esd-objectives.md
 - specs/content/efmp-407/sources/texts/unesco-2024-greening.md
 - specs/content/efmp-407/sources/unit-02.md
 - specs/content/efmp-407/tasks.md
 - static/img/figures/efmp-407/unit-02/fig-U2-1.dark.svg
 - static/img/figures/efmp-407/unit-02/fig-U2-1.svg
 - static/img/figures/efmp-407/unit-02/fig-U2-2.dark.svg
 - static/img/figures/efmp-407/unit-02/fig-U2-2.svg
 - static/img/figures/efmp-407/unit-02/fig-U2-3.dark.svg
 - static/img/figures/efmp-407/unit-02/fig-U2-3.svg
 - static/img/figures/efmp-407/unit-02/fig-U2-4.dark.svg
 - static/img/figures/efmp-407/unit-02/fig-U2-4.svg
 - static/img/figures/efmp-407/unit-02/fig-U2-5.dark.svg
 - static/img/figures/efmp-407/unit-02/fig-U2-5.svg
 - static/img/figures/efmp-407/unit-02/fig-U2-6.dark.svg
 - static/img/figures/efmp-407/unit-02/fig-U2-6.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-407-u02-author

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u02-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Author EFMP-407 Unit 2 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job). Topic titles read "Topic N.M - Title" (validate:content checks it).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-407 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-407/`, and `static/img/figures/efmp-407/unit-02/`.

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
- EFMP-407 Unit 2 (docs/semester-3/efmp-407/unit-02): 'G2 en-draft' row for Unit 2 is not done (status: '▣')


## Response snapshot

Merged main to bring in the EFMP-407 course overview, then generated Unit 2's G2 evidence and marked its tracker row done so all 14 content gates pass on top of the existing English draft.

## Outcome

- Impact: author for EFMP-407 Unit 2 by claude (attempt 3).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 39 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged main to bring in the EFMP-407 course overview, then generated Unit 2's G2 evidence and marked its tracker row done so all 14 content gates pass on top of the existing English draft.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Figure text geometry for `fig-U2-1` to `fig-U2-6` has never been browser-measured, so check the CI `figure-geometry` result first.
  - `tasks.md` is shared with the Unit 3 and Unit 4 jobs and will conflict again when they merge; keep every unit's rows, and rerun `npm run build:content-status` after the tracker changes because `static/content-status.json` is gitignored.
  - Kopnina (2012) returned 403 and three other mapped readings remain bibliography-only, so G3 should check the open-access substitutes listed in `sources/unit-02.md`; `course-overview.mdx` still says "Unit 1 is available now" and needs updating by whoever owns course integration.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 2 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
