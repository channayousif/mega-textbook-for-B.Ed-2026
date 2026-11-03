---
id: crew-batch-20261102-2130-cifix1
title: crew fix CREW unit 0
stage: misc
date: 2026-11-02
surface: agent
model: opencode
feature: crew
branch: crew/batch-20261102-2130
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/crew/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/crew/crew-batch-20261102-2130-cifix1.misc.prompt.md
 - history/prompts/efmp-406/crew-efmp-406-u06-translate.misc.prompt.md
 - history/prompts/general/20261106-efmp406-u06-urdu-translation.general.prompt.md
 - history/prompts/general/20261109-repair-efmp406-u06-translation-evidence.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-06/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-06/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-06/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-06/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-06/unit-teacher-notes.mdx
 - specs/content/efmp-406/reviews/unit-06/G2/20261102T204643842Z-gates.json
 - specs/content/efmp-406/reviews/unit-06/G2/continuation-20261103/README.md
 - specs/content/efmp-406/reviews/unit-06/G2/continuation-20261103/before.txt
 - specs/content/efmp-406/reviews/unit-06/G2/continuation-20261103/final-draft.txt
 - specs/content/efmp-406/reviews/unit-06/G2/continuation-20261103/origin-main.txt
 - specs/content/efmp-406/reviews/unit-06/G2/continuation-20261103/temporary-reviewed.txt
 - specs/content/efmp-406/reviews/unit-06/G2/logs-20261102T204643842Z/check-bloom-bands.txt
 - specs/content/efmp-406/reviews/unit-06/G2/logs-20261102T204643842Z/check-concept-graph.txt
 - specs/content/efmp-406/reviews/unit-06/G2/logs-20261102T204643842Z/check-depth-gate.txt
 - specs/content/efmp-406/reviews/unit-06/G2/logs-20261102T204643842Z/check-docs-sync.txt
 - specs/content/efmp-406/reviews/unit-06/G2/logs-20261102T204643842Z/check-figures.txt
 - specs/content/efmp-406/reviews/unit-06/G2/logs-20261102T204643842Z/check-no-answer-keys.txt
 - specs/content/efmp-406/reviews/unit-06/G2/logs-20261102T204643842Z/check-no-em-dash.txt
 - specs/content/efmp-406/reviews/unit-06/G2/logs-20261102T204643842Z/validate-content.txt
 - specs/content/efmp-406/tasks.md
 - specs/content/efmp-406/translations/unit-06/handoff.md
 - specs/content/efmp-406/translations/unit-06/logs/check-content-draft.txt
 - specs/content/efmp-406/translations/unit-06/logs/check-content-origin-main.txt
 - specs/content/efmp-406/translations/unit-06/logs/check-content-temporary-reviewed.txt
 - specs/content/efmp-406/translations/unit-06/logs/mdx-syntax.txt
 - specs/content/efmp-406/translations/unit-06/logs/parity-self-check.txt
 - static/img/figures/efmp-406/unit-06/fig-U6-1.ur.dark.svg
 - static/img/figures/efmp-406/unit-06/fig-U6-1.ur.svg
 - static/img/figures/efmp-406/unit-06/fig-U6-2.ur.dark.svg
 - static/img/figures/efmp-406/unit-06/fig-U6-2.ur.svg
 - static/img/figures/efmp-406/unit-06/fig-U6-3.ur.dark.svg
 - static/img/figures/efmp-406/unit-06/fig-U6-3.ur.svg
 - static/img/figures/efmp-406/unit-06/fig-U6-4.ur.dark.svg
 - static/img/figures/efmp-406/unit-06/fig-U6-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job batch-20261102-2130-cifix1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/batch-20261102-2130`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
CI failed on PR #418 (checks: figure-geometry). Run `gh pr checks 418` and `gh run view --log-failed` to read the failure, fix it on this branch with the smallest change, and make `npm run check:content` pass. A build failure is usually malformed MDX or a broken relative link in this unit's files.

## Scope
The files this batch PR (#418) changes, which belong to the crew jobs efmp-406-u06-translate. Change only what the merge or CI needs.

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
- (batch-20261102-1300-cifix1, fix, opencode) The other three Unit 1 Urdu figures (fig-U1-1/3/4) still use per-shape transforms and pass the geometry gate only by layout coincidence; a future edit there could re-expose the same false positive.
- (batch-20261102-1300-cifix1, fix, opencode) Only `.ur.svg` files changed, so Unit 1's G2 input manifest is untouched (Urdu variants bind to G5 only); no G3/G5 status changed.
- (batch-20261102-0900-conflict1, fix, opencode) The new Unit 3 G2 evidence binds main's `scripts/lib/review-evidence.mjs` and `catalog/courses.json`; any further edit to those globals or Unit 3's bound files re-opens G2, so use `node scripts/prepare-gate-evidence.mjs --refresh-stale` rather than a hand edit.
- (batch-20261102-0900-conflict1, fix, opencode) `static/content-status.json` is gitignored and was regenerated locally; CI's prestart hook rebuilds it.
- (batch-20261102-0900-cifix1, fix, opencode) Unit 3's G2 input manifest was refreshed in place (6 figure hashes); any further edit under `static/img/figures/efmp-406/unit-03/` re-opens it, so recompute with `inputManifest(root, 'EFMP-406', 3, 'G3')`.


## Response snapshot

Converted Unit 6 `fig-U6-1.ur.svg` and its dark variant from transform-based RTL mirroring to coordinate mirroring so the geometry gate checks real panels, leaving the rendered figure pixel-identical, and committed the fix with its PHR.

## Outcome

- Impact: fix for CREW Unit 0 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 38 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Converted Unit 6 `fig-U6-1.ur.svg` and its dark variant from transform-based RTL mirroring to coordinate mirroring so the geometry gate checks real panels, leaving the rendered figure pixel-identical, and committed the fix with its PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - `measure-figure-text.mjs` was not run (Playwright forbidden); the fix was validated by a DejaVu advance-metric simulation that reproduced all 7 CI spills exactly before the change and 0 after, plus a pixel-diff render check showing the figure is unchanged.
  - Under CI's fallback font, response row 4 line 2 ("کریں اور محفوظ رسائی کی ضروریات کا حوالہ دیں") measures ~344px in a 322px panel; the gate ignores left overflow and production Nastaliq fits, but a future render inspection should confirm it.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
