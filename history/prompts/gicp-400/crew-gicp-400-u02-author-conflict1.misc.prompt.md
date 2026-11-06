---
id: crew-gicp-400-u02-author-conflict1
title: crew fix GICP-400 unit 2
stage: misc
date: 2026-11-06
surface: agent
model: opencode
feature: gicp-400
branch: crew/gicp-400-u02-author
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/gicp-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-3/gicp-400/course-overview.mdx
  - history/prompts/gicp-400/crew-gicp-400-u02-author-conflict1.misc.prompt.md
  - specs/content/gicp-400/reviews/unit-02/G2/20261106T172059990Z-gates.json
  - specs/content/gicp-400/reviews/unit-02/G2/logs-20261106T172059990Z/check-bloom-bands.txt
  - specs/content/gicp-400/reviews/unit-02/G2/logs-20261106T172059990Z/check-concept-graph.txt
  - specs/content/gicp-400/reviews/unit-02/G2/logs-20261106T172059990Z/check-depth-gate.txt
  - specs/content/gicp-400/reviews/unit-02/G2/logs-20261106T172059990Z/check-docs-sync.txt
  - specs/content/gicp-400/reviews/unit-02/G2/logs-20261106T172059990Z/check-figures.txt
  - specs/content/gicp-400/reviews/unit-02/G2/logs-20261106T172059990Z/check-no-answer-keys.txt
  - specs/content/gicp-400/reviews/unit-02/G2/logs-20261106T172059990Z/check-no-em-dash.txt
  - specs/content/gicp-400/reviews/unit-02/G2/logs-20261106T172059990Z/validate-content.txt
  - specs/content/gicp-400/sources/texts/hassan-2020-two-nation.md
  - specs/content/gicp-400/sources/texts/iqbal-reconstruction.md
  - specs/content/gicp-400/sources/texts/jinnah-1947-assembly.md
  - specs/content/gicp-400/tasks.md
tests:
  - npm run check:content
---

## Prompt

# Crew job gicp-400-u02-author-conflict1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gicp-400-u02-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/gicp-400-u02-author conflicts with main (docs/semester-3/gicp-400/course-overview.mdx, specs/content/gicp-400/sources/texts/hassan-2020-two-nation.md, specs/content/gicp-400/sources/texts/iqbal-reconstruction.md, specs/content/gicp-400/sources/texts/jinnah-1947-assembly.md, specs/content/gicp-400/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GICP-400 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gicp-400/`, and `static/img/figures/gicp-400/unit-02/`.

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
- (gicp-400-u02-author, author, opencode) The G2 evidence path requires a course-level `course-overview.mdx`; I added it and the course `_category_.json` as a prerequisite, which is just outside the strict Unit 2 scope.
- (gicp-400-u02-author, author, opencode) G3/G5 remain open (`▢`); no independent review, human initials or signing was performed.
- (gicp-400-u02-author, author, opencode) The Playwright-based SVG geometry check was not run (crew prohibition); the banner figure remains prompt-only.

## Feedback from the previous attempt
npm run check:content has 2 finding(s) that main does not have:
✗ Pipeline gate failed with 1 finding(s):
- GICP-400 Unit 2 (docs/semester-3/gicp-400/unit-02): G2 en-draft: stale or incomplete input manifest

## Response snapshot

The merge with origin/main was already committed on this branch. Verified main's course overview and its three bound source notes are byte-identical after the merge, and the Unit 2 tracker rows follow main's. Refreshed the Unit 2 G2 gate evidence against the merged bytes with `prepare-gate-evidence.mjs --refresh-stale`, repointed the Unit 2 G2 tracker row, regenerated `static/content-status.json`, and confirmed all 14 content gates pass.

## Outcome

- Impact: fix for GICP-400 Unit 2 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree.
- Files: 15 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Verified the origin/main merge kept main's course overview and three bound source notes byte-identical, refreshed the Unit 2 G2 gate evidence against the merged bytes, repointed the Unit 2 G2 tracker row, and regenerated the content-status report.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this branch does not certify anything. The branch added no entries to the shared registries, so no ID reallocation was needed.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the branch touches a protected path).
- Notes for the next job on this unit:
  - The old Unit 2 G2 evidence (`20261106T152644075Z-gates.json`) is now orphaned but left in place, matching the repo's refresh convention.
  - G3/G5 remain open; no independent review, human initials or signing was performed.
  - The Playwright-based SVG geometry check was not run (crew prohibition); the banner figure remains prompt-only.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
