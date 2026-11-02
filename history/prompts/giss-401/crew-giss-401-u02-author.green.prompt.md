---
id: crew-giss-401-u02-author
title: crew author GISS-401 unit 2
stage: misc
date: 2026-11-02
surface: agent
model: claude
feature: giss-401
branch: crew/giss-401-u02-author
user: crew
command: crew author
labels: ["crew", "claude", "author"]
links:
  spec: specs/content/giss-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/giss-401/_category_.json
 - docs/semester-3/giss-401/course-overview.mdx
 - docs/semester-3/giss-401/unit-02/index.mdx
 - docs/semester-3/giss-401/unit-02/topic-01.mdx
 - docs/semester-3/giss-401/unit-02/topic-02.mdx
 - docs/semester-3/giss-401/unit-02/topic-03.mdx
 - docs/semester-3/giss-401/unit-02/unit-assessment.mdx
 - history/prompts/general/20261110-author-giss401-unit-two-english.general.prompt.md
 - history/prompts/general/20261111-place-giss401-unit-two-figures.general.prompt.md
 - specs/content/giss-401/authoring/unit-02-checks/baseline-content.txt
 - specs/content/giss-401/authoring/unit-02-checks/draft-content.txt
 - specs/content/giss-401/authoring/unit-02-checks/mdx-syntax.txt
 - specs/content/giss-401/authoring/unit-02.md
 - specs/content/giss-401/concepts/unit-02.md
 - specs/content/giss-401/coverage/unit-02.md
 - specs/content/giss-401/figures/unit-02.md
 - specs/content/giss-401/reviews/unit-02/G2/20261102T232136964Z-gates.json
 - specs/content/giss-401/reviews/unit-02/G2/logs-20261102T232136964Z/check-bloom-bands.txt
 - specs/content/giss-401/reviews/unit-02/G2/logs-20261102T232136964Z/check-concept-graph.txt
 - specs/content/giss-401/reviews/unit-02/G2/logs-20261102T232136964Z/check-depth-gate.txt
 - specs/content/giss-401/reviews/unit-02/G2/logs-20261102T232136964Z/check-docs-sync.txt
 - specs/content/giss-401/reviews/unit-02/G2/logs-20261102T232136964Z/check-figures.txt
 - specs/content/giss-401/reviews/unit-02/G2/logs-20261102T232136964Z/check-no-answer-keys.txt
 - specs/content/giss-401/reviews/unit-02/G2/logs-20261102T232136964Z/check-no-em-dash.txt
 - specs/content/giss-401/reviews/unit-02/G2/logs-20261102T232136964Z/validate-content.txt
 - specs/content/giss-401/sources/texts/motala-2023-sahih.md
 - specs/content/giss-401/sources/texts/mudawam-2021-usul.md
 - specs/content/giss-401/sources/texts/mufti-2019-hasan.md
 - specs/content/giss-401/sources/texts/quran-translation.md
 - specs/content/giss-401/sources/texts/sahih-bukhari-muslim.md
 - specs/content/giss-401/sources/texts/von-denffer-ulum.md
 - specs/content/giss-401/sources/unit-02.md
 - specs/content/giss-401/tasks.md
 - static/img/figures/giss-401/unit-02/fig-U2-1.dark.svg
 - static/img/figures/giss-401/unit-02/fig-U2-1.svg
 - static/img/figures/giss-401/unit-02/fig-U2-2.dark.svg
 - static/img/figures/giss-401/unit-02/fig-U2-2.svg
 - static/img/figures/giss-401/unit-02/fig-U2-3.dark.svg
 - static/img/figures/giss-401/unit-02/fig-U2-3.svg
 - static/img/figures/giss-401/unit-02/fig-U2-4.dark.svg
 - static/img/figures/giss-401/unit-02/fig-U2-4.svg
 - static/img/figures/giss-401/unit-02/fig-U2-5.dark.svg
 - static/img/figures/giss-401/unit-02/fig-U2-5.svg
 - static/img/figures/giss-401/unit-02/fig-U2-6.dark.svg
 - static/img/figures/giss-401/unit-02/fig-U2-6.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job giss-401-u02-author

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/giss-401-u02-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Author GISS-401 Unit 2 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GISS-401 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/giss-401/`, and `static/img/figures/giss-401/unit-02/`.

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
npm run check:content has 7 finding(s) that main does not have:
✗ Pipeline gate failed with 1 finding(s):
- GISS-401 Unit 2 (docs/semester-3/giss-401/unit-02): 'G2 en-draft' row for Unit 2 is not done (status: '▣')
✗ Figure gate failed with 4 finding(s):
- GISS-401 Unit 2 (docs/semester-3/giss-401/unit-02): topic file topic-01.mdx renders 0 figure(s) (2 still a prompt-only marker, which renders nothing)  -  Constitution III.10 requires at least 2 rendered <Figure> elements
- GISS-401 Unit 2 (docs/semester-3/giss-401/unit-02): topic file topic-02.mdx renders 0 figure(s) (2 still a prompt-only marker, which renders nothing)  -  Constitution III.10 requires at least 2 rendered <Figure> elements
- GISS-401 Unit 2 (docs/semester-3/giss-401/unit-02): topic file topic-03.mdx renders 0 figure(s) (2 still a prompt-only marker, which renders nothing)  -  Constitution III.10 requires at least 2 rendered <Figure> elements
- GISS-401 Unit 2 (docs/semester-3/giss-401/unit-02): unit has a concept-map / flowchart / timeline planned but none placed - Art. III.10 schematic requirement is a floor on rendered output, not on intent


## Response snapshot

Placed six English SVG schematics for GISS-401 Unit 2, added the shared course overview, recorded G2 gate evidence and a PHR, and brought `npm run check:content` to 13/13 passing.

## Outcome

- Impact: author for GISS-401 Unit 2 by claude (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 45 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Placed six English SVG schematics for GISS-401 Unit 2, added the shared course overview, recorded G2 gate evidence and a PHR, and brought `npm run check:content` to 13/13 passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The six SVGs were never measured by `measure-figure-text.mjs` (Chromium is barred), so CI's figure-geometry job is their first real check. The Urdu mirror needs `.ur.svg` versions; the generator is at `.crew/figgen/gen.py`, which git ignores.
  - `docs/semester-3/giss-401/course-overview.mdx` and `_category_.json` match `crew/giss-401-u01-author` exactly but differ from Unit 3's branch, so expect a merge conflict there; the overview still says "Unit 1 is available now".
  - G3 needs a fresh independent review that includes a qualified Islamic Studies scholar, and `specs/content/giss-401/tasks.md` will conflict with sibling units' tracker rows.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
