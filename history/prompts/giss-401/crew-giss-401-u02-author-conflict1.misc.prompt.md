---
id: crew-giss-401-u02-author-conflict1
title: crew fix GISS-401 unit 2
stage: misc
date: 2026-11-03
surface: agent
model: opencode
feature: giss-401
branch: crew/giss-401-u02-author
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
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
 - history/prompts/general/20261112-merge-origin-main-giss401-unit-two.general.prompt.md
 - history/prompts/giss-401/crew-giss-401-u02-author.green.prompt.md
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

# Crew job giss-401-u02-author-conflict1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/giss-401-u02-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/giss-401-u02-author conflicts with main (specs/content/giss-401/sources/texts/quran-translation.md, specs/content/giss-401/sources/texts/sahih-bukhari-muslim.md, specs/content/giss-401/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

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

## Notes from earlier jobs on this unit
- (giss-401-u02-author, author, claude) The six SVGs were never measured by `measure-figure-text.mjs` (Chromium is barred), so CI's figure-geometry job is their first real check. The Urdu mirror needs `.ur.svg` versions; the generator is at `.crew/figgen/gen.py`, which git ignores.
- (giss-401-u02-author, author, claude) `docs/semester-3/giss-401/course-overview.mdx` and `_category_.json` match `crew/giss-401-u01-author` exactly but differ from Unit 3's branch, so expect a merge conflict there; the overview still says "Unit 1 is available now".
- (giss-401-u02-author, author, claude) G3 needs a fresh independent review that includes a qualified Islamic Studies scholar, and `specs/content/giss-401/tasks.md` will conflict with sibling units' tracker rows.


## Response snapshot

Merged origin/main cleanly into crew/giss-401-u02-author with no conflicts, confirmed shared registries needed no changes, and left all 13 content gates passing plus a PHR recording the merge.

## Outcome

- Impact: fix for GISS-401 Unit 2 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 47 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main cleanly into crew/giss-401-u02-author with no conflicts, confirmed shared registries needed no changes, and left all 13 content gates passing plus a PHR recording the merge.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Six Unit 2 SVGs have never been through measure-figure-text.mjs (Chromium barred locally); CI figure-geometry is their first real check, and the Urdu mirror still needs .ur.svg versions (generator lives in gitignored .crew/figgen/gen.py).
  - G3 requires a fresh independent review that includes a qualified Islamic Studies scholar; tasks.md will conflict with sibling units' tracker rows when merged.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
