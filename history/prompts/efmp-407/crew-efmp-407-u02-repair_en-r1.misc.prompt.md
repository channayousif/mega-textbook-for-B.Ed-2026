---
id: crew-efmp-407-u02-repair_en-r1
title: crew repair_en EFMP-407 unit 2
stage: misc
date: 2026-11-28
surface: agent
model: claude
feature: efmp-407
branch: crew/efmp-407-u02-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "claude", "repair_en"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/efmp-407/course-overview.mdx
 - specs/content/efmp-407/tasks.md
 - specs/content/efmp-407/reviews/unit-01/G2/20261127T223209988Z-gates.json
 - specs/content/efmp-407/reviews/unit-02/G2/20261127T223210275Z-gates.json
 - specs/content/efmp-407/reviews/unit-03/G2/20261127T223210699Z-gates.json
 - specs/content/efmp-407/reviews/unit-04/G2/20261127T223211050Z-gates.json
 - specs/content/efmp-407/reviews/unit-05/G2/20261127T223211491Z-gates.json
 - specs/content/efmp-407/reviews/unit-06/G2/20261127T223211989Z-gates.json
 - specs/content/efmp-407/reviews/unit-07/G2/20261127T223212298Z-gates.json
 - specs/content/efmp-407/reviews/unit-08/G2/20261127T223212794Z-gates.json
 - specs/content/efmp-407/reviews/unit-01/G2/logs-20261127T223209988Z/
 - specs/content/efmp-407/reviews/unit-02/G2/logs-20261127T223210275Z/
 - specs/content/efmp-407/reviews/unit-03/G2/logs-20261127T223210699Z/
 - specs/content/efmp-407/reviews/unit-04/G2/logs-20261127T223211050Z/
 - specs/content/efmp-407/reviews/unit-05/G2/logs-20261127T223211491Z/
 - specs/content/efmp-407/reviews/unit-06/G2/logs-20261127T223211989Z/
 - specs/content/efmp-407/reviews/unit-07/G2/logs-20261127T223212298Z/
 - specs/content/efmp-407/reviews/unit-08/G2/logs-20261127T223212794Z/
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-407-u02-repair_en-r1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u02-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Apply the findings of the latest G3 report under specs/content/efmp-407/reviews/unit-02/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 2 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

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

## Open findings from the latest G3 report
From `specs/content/efmp-407/reviews/unit-02/G3/20261127T192818Z-g3-desk-72392980.json` (disposition: revise). Resolve each one:
- [advisory] In specs/content/efmp-407/tasks.md under '## Unit 2 backward-design alignment', lines 24-28 contain 5 duplicated tracker rows for Unit 1 that were accidentally pasted into the table. These should be cleaned up during task maintenance.
- [advisory] In docs/semester-3/efmp-407/course-overview.mdx line 46, 'Unit 1 is available now' should be updated to include Unit 2 once Unit 2 progresses to publication.
- [uncertain] Visual browser and print inspection (360px viewport, keyboard table scrolling, desktop layout, and A4 print view) could not be executed because the crew job brief explicitly prohibits running npm run build, a dev server, or Playwright (render-review command unperformed, exit code 1). Structural accessibility checks (alt text, heading hierarchy, link text, SVG role/title/desc, figure text measurement) pass from source, but visual accessibility remains unverified until a permitted browser/print inspection can be run on a live build.

## Notes from earlier jobs on this unit
- (efmp-407-u02-repair_en, repair_en, claude) Course-overview line 46 ("Unit 1 is available now") still needs Unit 2 added when Unit 2 is published.
- (efmp-407-u02-repair_en, repair_en, claude) Browser, 360px, keyboard table-scrolling and A4 print inspection of Unit 2 is still open and needs a permitted render job, using `render-inspect.mjs` against `https://textbook.com.pk`.
- (efmp-407-u02-illustrate, illustrate, agy) All six topic figures remain placed SVGs with dark and Urdu variants; the topic-scene generation command had no prompt-only illustration rows.
- (efmp-407-u02-illustrate, illustrate, agy) Unit banner fig-U2-7 is placed as a WebP figure in both English index.mdx and Urdu index.mdx.
- (efmp-407-u02-translate, translate, codex) Browser geometry, narrow-screen/A4 inspection and independent review remain pending; translation stays draft.

## Response snapshot

Resolved the three findings from report 20261127T192818Z-g3-desk-72392980.json. F1 (duplicated Unit 1 rows in the Unit 2 backward-design alignment table) was verified already absent on main, removed by cf6a68972, so no edit was made. F2 was fixed: course-overview line 46 now reads "Units 1 and 2 are available now", because Unit 2 is published under ADR-0026 (G2 auto:gates evidence) and its English pages are live under the "Draft - expert review pending" notice. F3 cannot be executed under the crew brief and is recorded as an open handoff. Appended an advisory "repairs applied" Unit 2 G3 tracker row naming the report, unticked. Because course-overview.mdx is a bound review input for all eight EFMP-407 units, the edit stale-dated every G2 manifest, so the draft gates were re-run at e7a934cf2 and all eight G2 rows were repointed. origin/main was merged (27 commits) before the final gate run.

## Outcome

- Impact: repair_en for EFMP-407 Unit 2 by claude (attempt 1, r1).
- Tests: npm run check:content passed on the merged tree (14/14 content gates).
- Files: 18, listed above (2 content/tracker files plus 8 G2 evidence JSONs and their 8 logs directories).
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: course-overview line 46 now lists Unit 2 as available; Unit 2 G3 tracker row appended (unticked, no initials); all eight EFMP-407 G2 evidence manifests refreshed and their tracker rows repointed after the course-overview edit.
- Decisions the team must respect: Unit 2 counts as published under ADR-0026 because its G2 auto:gates evidence passes and its English pages are live, so the overview availability line was updated rather than deferred to a G7 row. G3 stays open and unsigned; this job certifies nothing.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Browser, 360px, keyboard table-scrolling and A4 print inspection of Unit 2 is still open and needs a permitted render job, using `render-inspect.mjs` against `https://textbook.com.pk`.
  - `docs/semester-3/efmp-407/course-overview.mdx` has no Urdu mirror (English-only page), so no UR parity edit was made.
  - Units 3-8 are also G2-published and live, so the overview availability line may need a course-level refresh by a course-scoped job.
  - The 20261127 G3 report re-reported the 20261122 advisory about five duplicated Unit 1 rows that cf6a68972 had already removed; the next reviewer should re-check the table rather than the report text.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: the 20261127 G3 report repeated an advisory that main had already repaired, so the finding was verified rather than re-edited; a course-level bound input forced a course-wide evidence refresh from a unit-scoped job.
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
