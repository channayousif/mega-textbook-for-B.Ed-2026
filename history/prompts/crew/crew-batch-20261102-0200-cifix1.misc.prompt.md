---
id: crew-batch-20261102-0200-cifix1
title: crew fix CREW unit 0
stage: misc
date: 2026-11-02
surface: agent
model: opencode
feature: crew
branch: crew/batch-20261102-0200
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/crew/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261042-gpks402-unit-four-urdu-mirror.general.prompt.md
 - history/prompts/gpks-402/crew-gpks-402-u04-translate-conflict1.misc.prompt.md
 - history/prompts/gpks-402/crew-gpks-402-u04-translate.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-04/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-04/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-04/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-04/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-04/unit-assessment.mdx
 - specs/content/gpks-402/reviews/unit-04/G4/translation-handoff.md
 - specs/content/gpks-402/tasks.md
 - static/img/figures/gpks-402/unit-04/fig-U4-1.ur.dark.svg
 - static/img/figures/gpks-402/unit-04/fig-U4-1.ur.svg
 - static/img/figures/gpks-402/unit-04/fig-U4-2.ur.dark.svg
 - static/img/figures/gpks-402/unit-04/fig-U4-2.ur.svg
 - static/img/figures/gpks-402/unit-04/fig-U4-3.ur.dark.svg
 - static/img/figures/gpks-402/unit-04/fig-U4-3.ur.svg
 - static/img/figures/gpks-402/unit-04/fig-U4-4.ur.dark.svg
 - static/img/figures/gpks-402/unit-04/fig-U4-4.ur.svg
 - static/img/figures/gpks-402/unit-04/fig-U4-5.ur.dark.svg
 - static/img/figures/gpks-402/unit-04/fig-U4-5.ur.svg
 - static/img/figures/gpks-402/unit-04/fig-U4-6.ur.dark.svg
 - static/img/figures/gpks-402/unit-04/fig-U4-6.ur.svg
 - static/img/figures/gpks-402/unit-04/fig-U4-7.ur.dark.svg
 - static/img/figures/gpks-402/unit-04/fig-U4-7.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job batch-20261102-0200-cifix1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/batch-20261102-0200`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
CI failed on PR #400 (checks: figure-geometry). Run `gh pr checks 400` and `gh run view --log-failed` to read the failure, fix it on this branch with the smallest change, and make `npm run check:content` pass. A build failure is usually malformed MDX or a broken relative link in this unit's files.

## Scope
The files this batch PR (#400) changes, which belong to the crew jobs gpks-402-u04-translate. Change only what the merge or CI needs.

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
- (batch-20261028-1715-cifix2, fix, codex) Platform owner must investigate dashboard load times above 2000ms and the flaky teacher-dashboard timeout.
- (batch-20261028-1715-cifix2, fix, codex) Platform owner must investigate dashboard load times above 2000ms and the flaky teacher-dashboard timeout.
- (batch-20261028-1715-cifix1, fix, codex) Platform owner must investigate unrelated dashboard and reviewer e2e timeouts.
- (batch-20261028-1715-cifix1, fix, codex) CI must verify SVG geometry; local Playwright was prohibited.
- (batch-20261028-1715-cifix1, fix, codex) Platform owner must investigate unrelated dashboard and reviewer e2e timeouts.


## Response snapshot

Shrunk the "3۔ پوٹھوہار کی سطحِ مرتفع" label from 16px to 14px in both `fig-U4-6.ur.svg` and `fig-U4-6.ur.dark.svg` to clear the 2.9px/22.9px right-edge overflow that CI's figure-geometry job caught.

## Outcome

- Impact: fix for CREW Unit 0 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 24 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Shrunk the "3۔ پوٹھوہار کی سطحِ مرتفع" label from 16px to 14px in both `fig-U4-6.ur.svg` and `fig-U4-6.ur.dark.svg` to clear the 2.9px/22.9px right-edge overflow that CI's figure-geometry job caught.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The Potohar plateau label in fig-U4-6 is now 14px (vs the standard 16px `.label`)  -  a targeted override. If future edits touch this legend, keep the panel width constraint in mind; Urdu text runs wider than English.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
