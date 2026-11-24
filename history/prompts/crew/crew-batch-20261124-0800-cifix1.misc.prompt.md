---
id: crew-batch-20261124-0800-cifix1
title: crew fix GENT-401 unit 4
stage: misc
date: 2026-11-24
surface: agent
model: LongCat-2.5
feature: crew
branch: crew/batch-20261124-0800
user: crew
command: crew fix
labels: ["crew", "claude", "fix"]
links:
  spec: specs/content/gent-401/content-spec.md
  ticket: null
  adr: null
  pr: 760
files:
 - docs/semester-4/gent-401/unit-04/topic-01.mdx
 - history/prompts/crew/crew-batch-20261124-0800-cifix1.misc.prompt.md
 - specs/content/gent-401/reviews/unit-04/G2/20261124T093431464Z-gates.json
 - specs/content/gent-401/reviews/unit-04/G2/logs-20261124T093431464Z/check-bloom-bands.txt
 - specs/content/gent-401/reviews/unit-04/G2/logs-20261124T093431464Z/check-concept-graph.txt
 - specs/content/gent-401/reviews/unit-04/G2/logs-20261124T093431464Z/check-depth-gate.txt
 - specs/content/gent-401/reviews/unit-04/G2/logs-20261124T093431464Z/check-docs-sync.txt
 - specs/content/gent-401/reviews/unit-04/G2/logs-20261124T093431464Z/check-figures.txt
 - specs/content/gent-401/reviews/unit-04/G2/logs-20261124T093431464Z/check-no-answer-keys.txt
 - specs/content/gent-401/reviews/unit-04/G2/logs-20261124T093431464Z/check-no-em-dash.txt
 - specs/content/gent-401/reviews/unit-04/G2/logs-20261124T093431464Z/validate-content.txt
 - specs/content/gent-401/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job batch-20261124-0800-cifix1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/batch-20261124-0800`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
CI failed on PR #760 (checks: build). Run `gh pr checks 760` and `gh run view --log-failed` to read the failure, fix it on this branch with the smallest change, and make `npm run check:content` pass. A build failure is usually malformed MDX or a broken relative link in this unit's files.

## Scope
The files this batch PR (#760) changes, which belong to the crew jobs gent-401-u04-author. Change only what the merge or CI needs.

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
- (batch-20261123-1645-cifix1, fix, claude_crew) The RLS red was a transient ECONNRESET on an assertion call, not a content or policy failure; the same flake red feat/032-slides and feat/figure-render-gate today, so those branches need this fix via main.
- (batch-20261123-1645-cifix1, fix, claude_crew) test:rls could not be run locally (no .env.local); the retry was verified with a mocked fetch that throws ECONNRESET once (2 calls, success) and returns a 401 once (1 call, no retry).
- (batch-20261123-1645-cifix1, fix, claude_crew) PR #744 is content-only except glossary.json, which the ci.yml `changes` regex does not classify as content, so content PRs still run rls+e2e; if the flake recurs, that classifier is the lever.
- (batch-20261122-1603-cifix1, fix, claude_crew) CI measures changed SVGs with a DejaVu Sans fallback (no Noto Nastaliq on runners); local default-font runs can pass the same file, so always re-check with `--ci-fonts`.
- (batch-20261122-1603-cifix1, fix, claude_crew) The Urdu timeline's fourth line is the reason the last baseline was on the panel edge; any future text edit there should re-run `measure-figure-text.mjs --ci-fonts`.

## Response snapshot

Fixed the PR #760 build failure by replacing the unsupported LaTeX math block at docs/semester-4/gent-401/unit-04/topic-01.mdx:101 with the plain bold formula this repo uses elsewhere, then refreshed the Unit 4 G2 gate evidence and repointed its tracker row.

## Outcome

- Impact: fix for GENT-401 Unit 4 by claude_crew (attempt 1).
- Tests: npm run check:content passed all 14 content gates in the job worktree.
- Files: 11 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: replaced the `$$\text{...}$$` LaTeX block at topic-01.mdx:101 with `**Mission = Target Customer + Core Need/Problem + Specific Offering + Distinctive Approach**`, refreshed G2 evidence (20261124T093431464Z-gates.json) and repointed the Unit 4 G2 row in tasks.md.
- Decisions the team must respect: the site has no remark-math/KaTeX plugin, so braces in prose are read as MDX expressions; use plain-text bold formulas (precedent: docs/semester-2/gqur-301/unit-04/topic-01.mdx:45). G3/G5 stay advisory; this PR certifies nothing.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: Docusaurus MDX parses unescaped curly braces in `$$...$$` LaTeX as JavaScript expressions when no math plugin is configured, so acorn rejects `{Target Customer}` ("Could not parse expression with acorn").
- Graders run and results (PASS/FAIL): check:content PASS (14/14); local @mdx-js/mdx 3.1.1 compile of all five Unit 4 files OK.
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): add a remark-math/rehype-katex pipeline so formulas can stay in LaTeX, or add a check that flags `{` in prose before CI.
