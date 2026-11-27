---
id: crew-efmp-302-u00-salvage
title: crew salvage EFMP-302 unit 0
stage: misc
date: 2026-11-26
surface: agent
model: claude_crew
feature: efmp-302
branch: crew/efmp-302-u00-salvage
user: crew
command: crew salvage
labels: ["crew", "claude_crew", "salvage"]
links:
  spec: specs/content/efmp-302/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-1/efmp-302/course-review.mdx
 - history/prompts/034-backlog-tracking/20261285-efmp302-course-review.green.prompt.md
 - specs/034-backlog-tracking/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-302-u00-salvage

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-302-u00-salvage`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
This branch carries earlier, unfinished work from an earlier branch (undefined). Run `git fetch origin && git rebase origin/main`, resolve every conflict (keep this unit's content; take main's version of shared files such as the style guide, gates and catalog), then make every content gate pass. Extra instructions: GitHub issue #820 (Feature 034 T033): author the English course review page docs/semester-1/efmp-302/course-review.mdx. Follow the contract specs/008-rich-unit-pedagogy/contracts/end-of-course-review.md exactly (front matter: title, course_code EFMP-302, sidebar_position 900, translation_status draft; body: <PrintHandout />, H1, ## Course summary, ## Practice questions with ### Multiple-choice questions (MCQs) ~15 spread over all six units Remember to Apply, ### Restricted-response questions (RRQs) ~10 Understand to Analyze with at least one per unit, ### Extended-response questions (ERQs) ~5 Analyze to Evaluate/Create each integrating two or more units, ## Project ideas for your practicum school with 3-6 briefs (purpose, rough method, evidence to bring back), and ## Answers and marking guidance as the FINAL ## section with ### MCQ answer key, ### RRQ model answers and mark schemes, ### ERQ rubrics). Take the through-lines, question mix and project ideas from the ## Course review plan section of specs/content/efmp-302/content-spec.md, and ground every question in what EFMP-302 Units 1-6 actually teach (read their topic files; no new facts, no invented statistics). Bloom levels as *(Level)* like the unit assessments. Zero em dashes. English only (the Urdu mirror is a later job; the untranslated banner covers it). Do not edit specs/content/, unit files or gate scripts. Run npm run check:content and fix findings. Write a PHR. PR title: feat(efmp-302): course review page; PR body must contain: Closes #820.

## Scope
The whole EFMP-302 course: its docs and i18n trees, `specs/content/efmp-302/`, its figures, and the shared files its PR already touches.

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

Authored the EFMP-302 `course-review.mdx` end-of-course page (summary, 15/10/5 practice bank, six practicum briefs, bounded answers) grounded in Units 1-6, ticked T033, wrote the PHR, and passed all 14 content gates.

## Outcome

- Impact: salvage for EFMP-302 Unit 0 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 3 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Authored the EFMP-302 `course-review.mdx` end-of-course page (summary, 15/10/5 practice bank, six practicum briefs, bounded answers) grounded in Units 1-6, ticked T033, wrote the PHR, and passed all 14 content gates.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The branch carries no earlier commits and the tree was clean, so the "salvage" was a fresh authoring job; the page is `translation_status: draft`, English only, and its Urdu mirror is still owed.
  - Per the brief I did not push or open a PR; when pushed, the PR title must be `feat(efmp-302): course review page` and the body must contain `Closes #820`.
  - No unit files, figure manifests, `specs/content/` or gate scripts were touched, so no G2 gate evidence needed regenerating; `issue-sync` reports `#820` as stale-open only because the issue is not yet merged.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
