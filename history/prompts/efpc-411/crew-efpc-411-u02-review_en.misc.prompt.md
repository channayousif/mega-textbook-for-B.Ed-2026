---
id: crew-efpc-411-u02-review_en
title: crew review_en EFPC-411 unit 2
stage: misc
date: 2026-11-27
surface: agent
model: agy2
feature: efpc-411
branch: crew/efpc-411-u02-review_en
user: crew
command: crew review_en
labels: ["crew", "agy2", "review_en"]
links:
  spec: specs/content/efpc-411/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efpc-411/crew-efpc-411-u02-review_en.misc.prompt.md
 - specs/content/efpc-411/reviews/unit-02/G3/cbe2e670-0dc7-446a-a8e2-b41ac6087cdb.json
 - specs/content/efpc-411/reviews/unit-02/G3/cbe2e670-0dc7-446a-a8e2-b41ac6087cdb/advisory-tracker-row.md
 - specs/content/efpc-411/reviews/unit-02/G3/cbe2e670-0dc7-446a-a8e2-b41ac6087cdb/assessment-solutions.md
 - specs/content/efpc-411/reviews/unit-02/G3/cbe2e670-0dc7-446a-a8e2-b41ac6087cdb/logs/build-content-status.log
 - specs/content/efpc-411/reviews/unit-02/G3/cbe2e670-0dc7-446a-a8e2-b41ac6087cdb/logs/check-content.log
 - specs/content/efpc-411/reviews/unit-02/G3/cbe2e670-0dc7-446a-a8e2-b41ac6087cdb/logs/check:depth-gate.log
 - specs/content/efpc-411/reviews/unit-02/G3/cbe2e670-0dc7-446a-a8e2-b41ac6087cdb/logs/check:docs-sync.log
 - specs/content/efpc-411/reviews/unit-02/G3/cbe2e670-0dc7-446a-a8e2-b41ac6087cdb/logs/check:figures.log
 - specs/content/efpc-411/reviews/unit-02/G3/cbe2e670-0dc7-446a-a8e2-b41ac6087cdb/logs/check:no-answer-keys.log
 - specs/content/efpc-411/reviews/unit-02/G3/cbe2e670-0dc7-446a-a8e2-b41ac6087cdb/logs/check:no-em-dash.log
 - specs/content/efpc-411/reviews/unit-02/G3/cbe2e670-0dc7-446a-a8e2-b41ac6087cdb/logs/measure-figure-text.log
 - specs/content/efpc-411/reviews/unit-02/G3/cbe2e670-0dc7-446a-a8e2-b41ac6087cdb/logs/validate:content.log
 - specs/content/efpc-411/reviews/unit-02/G3/cbe2e670-0dc7-446a-a8e2-b41ac6087cdb/make-report.mjs
 - specs/content/efpc-411/reviews/unit-02/G3/cbe2e670-0dc7-446a-a8e2-b41ac6087cdb/manifest.json
 - specs/content/efpc-411/reviews/unit-02/G3/cbe2e670-0dc7-446a-a8e2-b41ac6087cdb/renders/desktop-index.png
 - specs/content/efpc-411/reviews/unit-02/G3/cbe2e670-0dc7-446a-a8e2-b41ac6087cdb/renders/desktop-topic-01.png
 - specs/content/efpc-411/reviews/unit-02/G3/cbe2e670-0dc7-446a-a8e2-b41ac6087cdb/renders/desktop-topic-02.png
 - specs/content/efpc-411/reviews/unit-02/G3/cbe2e670-0dc7-446a-a8e2-b41ac6087cdb/renders/desktop-topic-03.png
 - specs/content/efpc-411/reviews/unit-02/G3/cbe2e670-0dc7-446a-a8e2-b41ac6087cdb/renders/desktop-topic-04.png
 - specs/content/efpc-411/reviews/unit-02/G3/cbe2e670-0dc7-446a-a8e2-b41ac6087cdb/renders/desktop-unit-assessment.png
 - specs/content/efpc-411/reviews/unit-02/G3/cbe2e670-0dc7-446a-a8e2-b41ac6087cdb/renders/narrow360-index.png
 - specs/content/efpc-411/reviews/unit-02/G3/cbe2e670-0dc7-446a-a8e2-b41ac6087cdb/renders/narrow360-topic-01.png
 - specs/content/efpc-411/reviews/unit-02/G3/cbe2e670-0dc7-446a-a8e2-b41ac6087cdb/renders/narrow360-topic-02.png
 - specs/content/efpc-411/reviews/unit-02/G3/cbe2e670-0dc7-446a-a8e2-b41ac6087cdb/renders/narrow360-topic-03.png
 - specs/content/efpc-411/reviews/unit-02/G3/cbe2e670-0dc7-446a-a8e2-b41ac6087cdb/renders/narrow360-topic-04.png
 - specs/content/efpc-411/reviews/unit-02/G3/cbe2e670-0dc7-446a-a8e2-b41ac6087cdb/renders/narrow360-unit-assessment.png
 - specs/content/efpc-411/reviews/unit-02/G3/cbe2e670-0dc7-446a-a8e2-b41ac6087cdb/renders/render-inspect.json
 - specs/content/efpc-411/reviews/unit-02/G3/cbe2e670-0dc7-446a-a8e2-b41ac6087cdb/renders/render-inspect.log
 - specs/content/efpc-411/reviews/unit-02/G3/cbe2e670-0dc7-446a-a8e2-b41ac6087cdb/summary.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efpc-411-u02-review_en

You are the agy2 worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpc-411-u02-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Act as the INDEPENDENT G3 English reviewer of EFPC-411 Unit 2 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row; write the report JSON directly under specs/content/efpc-411/reviews/unit-02/G3/ (supporting evidence may sit in a subfolder). Never tick G3, never add reviewer initials, never self-sign. For the rendered-page and print evidence, inspect the production build (CI-built from main) and never build or serve the site: if `git diff --quiet "$(cat ~/deploy/deployed-sha)" HEAD -- <this unit's English dir> static/img/figures/efpc-411/unit-02/` exits 0, run `scripts/heavy.sh node scripts/render-inspect.mjs EFPC-411 2 --base https://textbook.com.pk --no-pdf`, record its log and PNGs (stage the folder with `git add --sparse`) as the `render-review` command evidence, and cite the deployed SHA as the rendered input identity. If the diff is not empty, the live site is not your input: record `render-review` as unavailable and name the deployed SHA and HEAD. Changed images can be served stale for up to 30 days, so treat a missing or mismatched asset as unverified, not as a content defect.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFPC-411 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpc-411/`, and `static/img/figures/efpc-411/unit-02/`.

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

Produced validated independent G3 English review report (disposition: pass) and supporting visual/command evidence for EFPC-411 Unit 2 without modifying unit prose or certifying the stage.

## Outcome

- Impact: review_en for EFPC-411 Unit 2 by agy2 (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 30 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Produced validated independent G3 English review report (disposition: pass) and supporting visual/command evidence for EFPC-411 Unit 2 without modifying unit prose or certifying the stage.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Live site inspection passed with 0 defects against deployed SHA c8efed9b430b39867c1418fae61194c49cefcda9.
  - Advisory finding F1 notes that MCQ answer keys are concentrated on B (7) and C (3), with 0 options keyed to A or D.
  - Proposed advisory tracker row is ready for parent handoff in advisory-tracker-row.md; G3 remains open.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
