---
id: crew-batch-20261123-1645-cifix1
title: crew fix CREW unit 0
stage: misc
date: 2026-11-23
surface: agent
model: claude_crew
feature: crew
branch: crew/batch-20261123-1645
user: crew
command: crew fix
labels: ["crew", "claude_crew", "fix"]
links:
  spec: specs/content/crew/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/gcce-400/unit-07/index.mdx
 - docs/semester-4/gcce-400/unit-07/topic-01.mdx
 - docs/semester-4/gcce-400/unit-07/topic-02.mdx
 - docs/semester-4/gcce-400/unit-07/topic-03.mdx
 - docs/semester-4/gcce-400/unit-07/topic-04.mdx
 - docs/semester-4/gcce-400/unit-07/unit-assessment.mdx
 - docs/semester-4/gcce-400/unit-07/unit-teacher-notes.mdx
 - glossary.json
 - history/prompts/031-social-updates/20261255-social-roundup-2026-11-23-second.green.prompt.md
 - history/prompts/gcce-400/crew-gcce-400-u07-author-conflict1.misc.prompt.md
 - history/prompts/gcce-400/crew-gcce-400-u07-author.green.prompt.md
 - history/prompts/social/crew-social-2026-11-23-roundup.misc.prompt.md
 - specs/content/gcce-400/concepts/unit-07.md
 - specs/content/gcce-400/coverage/unit-07.md
 - specs/content/gcce-400/figures/unit-07.banner.md
 - specs/content/gcce-400/figures/unit-07.md
 - specs/content/gcce-400/reviews/unit-07/G2/20261122T132732300Z-gates.json
 - specs/content/gcce-400/reviews/unit-07/G2/logs-20261122T132732300Z/check-bloom-bands.txt
 - specs/content/gcce-400/reviews/unit-07/G2/logs-20261122T132732300Z/check-concept-graph.txt
 - specs/content/gcce-400/reviews/unit-07/G2/logs-20261122T132732300Z/check-depth-gate.txt
 - specs/content/gcce-400/reviews/unit-07/G2/logs-20261122T132732300Z/check-docs-sync.txt
 - specs/content/gcce-400/reviews/unit-07/G2/logs-20261122T132732300Z/check-figures.txt
 - specs/content/gcce-400/reviews/unit-07/G2/logs-20261122T132732300Z/check-no-answer-keys.txt
 - specs/content/gcce-400/reviews/unit-07/G2/logs-20261122T132732300Z/check-no-em-dash.txt
 - specs/content/gcce-400/reviews/unit-07/G2/logs-20261122T132732300Z/validate-content.txt
 - specs/content/gcce-400/sources/texts/constitution-pakistan.md
 - specs/content/gcce-400/sources/texts/openstax-sociology-3e.md
 - specs/content/gcce-400/sources/texts/pbs-census-2023.md
 - specs/content/gcce-400/sources/unit-07.md
 - specs/content/gcce-400/tasks.md
 - specs/social/updates.json
 - static/img/figures/gcce-400/unit-07/fig-U7-1.dark.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-1.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-2.dark.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-2.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-3.dark.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-3.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-4.dark.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-4.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-5.dark.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-5.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-6.dark.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-6.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-7.dark.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-7.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-8.dark.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-8.svg
 - tests/rls/_helpers.mjs
tests:
 - npm run check:content
---

## Prompt

# Crew job batch-20261123-1645-cifix1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/batch-20261123-1645`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
CI failed on PR #744 (checks: rls). Run `gh pr checks 744` and `gh run view --log-failed` to read the failure, fix it on this branch with the smallest change, and make `npm run check:content` pass. A build failure is usually malformed MDX or a broken relative link in this unit's files.

## Scope
The files this batch PR (#744) changes, which belong to the crew jobs gcce-400-u07-author, social-2026-11-23-roundup. Change only what the merge or CI needs.

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
- (batch-20261122-1603-cifix1, fix, claude_crew) CI measures changed SVGs with a DejaVu Sans fallback (no Noto Nastaliq on runners); local default-font runs can pass the same file, so always re-check with `--ci-fonts`.
- (batch-20261122-1603-cifix1, fix, claude_crew) The Urdu timeline's fourth line is the reason the last baseline was on the panel edge; any future text edit there should re-run `measure-figure-text.mjs --ci-fonts`.
- (batch-20261122-1231-cifix1, fix, agy) Urdu SVGs `fig-U1-5.ur.svg` and `fig-U1-5.ur.dark.svg` row header "مرکزی خصوصیت" was split across two lines to fit within the 116px column when rendered under CI fallback font DejaVu Sans.
- (batch-20261122-1231-cifix1, fix, agy) All changed figures passed `scripts/measure-figure-text.mjs --ci-fonts` and all 14 gates in `npm run check:content` passed cleanly.
- (batch-20261122-0130-cifix1, fix, agy) Replaced `$$\text{...}$$` math wrapper with standard Markdown blockquote (`> `) in GUHQ-301 Unit 7 Topic 1 because Docusaurus MDX parses unescaped curly braces as JavaScript expressions when KaTeX is not configured.


## Response snapshot

Fixed the PR #744 RLS red by making every Supabase client call in tests/rls/_helpers.mjs retry transient ECONNRESET transport errors while leaving policy responses untouched, and confirmed all 14 content gates pass.

## Outcome

- Impact: fix for CREW Unit 0 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 48 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Fixed the PR #744 RLS red by making every Supabase client call in tests/rls/_helpers.mjs retry transient ECONNRESET transport errors while leaving policy responses untouched, and confirmed all 14 content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The RLS red was a transient ECONNRESET on an assertion call, not a content or policy failure; the same flake red feat/032-slides and feat/figure-render-gate today, so those branches need this fix via main.
  - test:rls could not be run locally (no .env.local); the retry was verified with a mocked fetch that throws ECONNRESET once (2 calls, success) and returns a 401 once (1 call, no retry).
  - PR #744 is content-only except glossary.json, which the ci.yml `changes` regex does not classify as content, so content PRs still run rls+e2e; if the flake recurs, that classifier is the lever.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
