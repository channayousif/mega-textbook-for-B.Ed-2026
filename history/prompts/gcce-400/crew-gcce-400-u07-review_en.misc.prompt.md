---
id: crew-gcce-400-u07-review_en
title: crew review_en GCCE-400 unit 7
stage: misc
date: 2026-11-24
surface: agent
model: agy
feature: gcce-400
branch: crew/gcce-400-u07-review_en
user: crew
command: crew review_en
labels: ["crew", "agy", "review_en"]
links:
  spec: specs/content/gcce-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gcce-400/crew-gcce-400-u07-review_en.misc.prompt.md
 - specs/content/gcce-400/reviews/unit-07/G3/agy-run1-20261124.json
 - specs/content/gcce-400/reviews/unit-07/G3/agy-run1-20261124/advisory-tracker-row.md
 - specs/content/gcce-400/reviews/unit-07/G3/agy-run1-20261124/assessment-solutions.md
 - specs/content/gcce-400/reviews/unit-07/G3/agy-run1-20261124/limitations.md
 - specs/content/gcce-400/reviews/unit-07/G3/agy-run1-20261124/logs/build-content-status.log
 - specs/content/gcce-400/reviews/unit-07/G3/agy-run1-20261124/logs/check-content.log
 - specs/content/gcce-400/reviews/unit-07/G3/agy-run1-20261124/logs/check:depth-gate.log
 - specs/content/gcce-400/reviews/unit-07/G3/agy-run1-20261124/logs/check:docs-sync.log
 - specs/content/gcce-400/reviews/unit-07/G3/agy-run1-20261124/logs/check:figures.log
 - specs/content/gcce-400/reviews/unit-07/G3/agy-run1-20261124/logs/check:no-answer-keys.log
 - specs/content/gcce-400/reviews/unit-07/G3/agy-run1-20261124/logs/check:no-em-dash.log
 - specs/content/gcce-400/reviews/unit-07/G3/agy-run1-20261124/logs/measure-figure-text.log
 - specs/content/gcce-400/reviews/unit-07/G3/agy-run1-20261124/logs/render-review.txt
 - specs/content/gcce-400/reviews/unit-07/G3/agy-run1-20261124/logs/validate:content.log
 - specs/content/gcce-400/reviews/unit-07/G3/agy-run1-20261124/make-report.mjs
 - specs/content/gcce-400/reviews/unit-07/G3/agy-run1-20261124/manifest.json
 - specs/content/gcce-400/reviews/unit-07/G3/agy-run1-20261124/summary.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gcce-400-u07-review_en

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gcce-400-u07-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Act as the INDEPENDENT G3 English reviewer of GCCE-400 Unit 7 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row; write the report JSON directly under specs/content/gcce-400/reviews/unit-07/G3/ (supporting evidence may sit in a subfolder). Never tick G3, never add reviewer initials, never self-sign. For the rendered-page and print evidence, inspect the production build (CI-built from main) and never build or serve the site: if `git diff --quiet "$(cat ~/deploy/deployed-sha)" HEAD -- <this unit's English dir> static/img/figures/gcce-400/unit-07/` exits 0, run `scripts/heavy.sh node scripts/render-inspect.mjs GCCE-400 7 --base https://textbook.com.pk --no-pdf`, record its log and PNGs (stage the folder with `git add --sparse`) as the `render-review` command evidence, and cite the deployed SHA as the rendered input identity. If the diff is not empty, the live site is not your input: record `render-review` as unavailable and name the deployed SHA and HEAD. Changed images can be served stale for up to 30 days, so treat a missing or mismatched asset as unverified, not as a content defect.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GCCE-400 Unit 7 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gcce-400/`, and `static/img/figures/gcce-400/unit-07/`.

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

Conducted independent G3 English review of GCCE-400 Unit 7, verifying all content criteria, assessment solutions, and SVG geometries, producing validated evidence report and advisory tracker row with disposition escalate due to deployed build differences.

## Outcome

- Impact: review_en for GCCE-400 Unit 7 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before committing.
- Files: 18 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Conducted independent G3 English review of GCCE-400 Unit 7, verifying all content criteria, assessment solutions, and SVG geometries, producing validated evidence report and advisory tracker row with disposition escalate due to deployed build staleness.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this review does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Live render inspection could not be run because deployed SHA 5a3deb303 differs from HEAD 88e07887c on Unit 7 files (index.mdx and fig-U7-9.webp); visual accessibility remains unverified while all content criteria pass.
  - Test developers may note advisory findings: MCQ key distribution in unit-assessment.mdx has Option B as correct in 6 out of 10 items; and topic-02.mdx:40 cites Table 3.3 for literacy which matches Table 4.21 values.
  - G3 remains open, unticked, with reviewer token agent:g3-reviewer, disposition escalate, and report at specs/content/gcce-400/reviews/unit-07/G3/agy-run1-20261124.json.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
