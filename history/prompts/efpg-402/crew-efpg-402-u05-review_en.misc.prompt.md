---
id: crew-efpg-402-u05-review_en
title: crew review_en EFPG-402 unit 5
stage: misc
date: 2026-11-28
surface: agent
model: claude_crew
feature: efpg-402
branch: crew/efpg-402-u05-review_en
user: crew
command: crew review_en
labels: ["crew", "claude_crew", "review_en"]
links:
  spec: specs/content/efpg-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efpg-402/crew-efpg-402-u05-review_en.misc.prompt.md
 - specs/content/efpg-402/reviews/unit-05/G3/crew-job-efpg-402-u05-review_en.json
 - specs/content/efpg-402/reviews/unit-05/G3/crew-job-efpg-402-u05-review_en/assessment-solutions.md
 - specs/content/efpg-402/reviews/unit-05/G3/crew-job-efpg-402-u05-review_en/logs/check-bloom-bands.txt
 - specs/content/efpg-402/reviews/unit-05/G3/crew-job-efpg-402-u05-review_en/logs/check-concept-graph.txt
 - specs/content/efpg-402/reviews/unit-05/G3/crew-job-efpg-402-u05-review_en/logs/check-content.txt
 - specs/content/efpg-402/reviews/unit-05/G3/crew-job-efpg-402-u05-review_en/logs/check-depth-gate.txt
 - specs/content/efpg-402/reviews/unit-05/G3/crew-job-efpg-402-u05-review_en/logs/check-docs-sync.txt
 - specs/content/efpg-402/reviews/unit-05/G3/crew-job-efpg-402-u05-review_en/logs/check-figures.txt
 - specs/content/efpg-402/reviews/unit-05/G3/crew-job-efpg-402-u05-review_en/logs/check-no-answer-keys.txt
 - specs/content/efpg-402/reviews/unit-05/G3/crew-job-efpg-402-u05-review_en/logs/check-no-em-dash.txt
 - specs/content/efpg-402/reviews/unit-05/G3/crew-job-efpg-402-u05-review_en/logs/measure-figure-text.txt
 - specs/content/efpg-402/reviews/unit-05/G3/crew-job-efpg-402-u05-review_en/logs/render-review.txt
 - specs/content/efpg-402/reviews/unit-05/G3/crew-job-efpg-402-u05-review_en/logs/validate-content.txt
 - specs/content/efpg-402/reviews/unit-05/G3/crew-job-efpg-402-u05-review_en/manifest.json
 - specs/content/efpg-402/reviews/unit-05/G3/crew-job-efpg-402-u05-review_en/renders/desktop-index.png
 - specs/content/efpg-402/reviews/unit-05/G3/crew-job-efpg-402-u05-review_en/renders/desktop-topic-01.png
 - specs/content/efpg-402/reviews/unit-05/G3/crew-job-efpg-402-u05-review_en/renders/desktop-topic-02.png
 - specs/content/efpg-402/reviews/unit-05/G3/crew-job-efpg-402-u05-review_en/renders/desktop-topic-03.png
 - specs/content/efpg-402/reviews/unit-05/G3/crew-job-efpg-402-u05-review_en/renders/desktop-topic-04.png
 - specs/content/efpg-402/reviews/unit-05/G3/crew-job-efpg-402-u05-review_en/renders/desktop-topic-05.png
 - specs/content/efpg-402/reviews/unit-05/G3/crew-job-efpg-402-u05-review_en/renders/desktop-unit-assessment.png
 - specs/content/efpg-402/reviews/unit-05/G3/crew-job-efpg-402-u05-review_en/renders/narrow360-index.png
 - specs/content/efpg-402/reviews/unit-05/G3/crew-job-efpg-402-u05-review_en/renders/narrow360-topic-01.png
 - specs/content/efpg-402/reviews/unit-05/G3/crew-job-efpg-402-u05-review_en/renders/narrow360-topic-02.png
 - specs/content/efpg-402/reviews/unit-05/G3/crew-job-efpg-402-u05-review_en/renders/narrow360-topic-03.png
 - specs/content/efpg-402/reviews/unit-05/G3/crew-job-efpg-402-u05-review_en/renders/narrow360-topic-04.png
 - specs/content/efpg-402/reviews/unit-05/G3/crew-job-efpg-402-u05-review_en/renders/narrow360-topic-05.png
 - specs/content/efpg-402/reviews/unit-05/G3/crew-job-efpg-402-u05-review_en/renders/narrow360-unit-assessment.png
 - specs/content/efpg-402/reviews/unit-05/G3/crew-job-efpg-402-u05-review_en/renders/render-inspect.json
 - specs/content/efpg-402/reviews/unit-05/G3/crew-job-efpg-402-u05-review_en/renders/render-inspect.log
 - specs/content/efpg-402/reviews/unit-05/G3/crew-job-efpg-402-u05-review_en/summary.md
 - specs/content/efpg-402/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efpg-402-u05-review_en

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpg-402-u05-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Act as the INDEPENDENT G3 English reviewer of EFPG-402 Unit 5 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row; write the report JSON directly under specs/content/efpg-402/reviews/unit-05/G3/ (supporting evidence may sit in a subfolder). Never tick G3, never add reviewer initials, never self-sign. For the rendered-page and print evidence, inspect the production build (CI-built from main) and never build or serve the site: if `git diff --quiet "$(cat ~/deploy/deployed-sha)" HEAD -- <this unit's English dir> static/img/figures/efpg-402/unit-05/` exits 0, run `scripts/heavy.sh node scripts/render-inspect.mjs EFPG-402 5 --base https://textbook.com.pk --no-pdf`, record its log and PNGs (stage the folder with `git add --sparse`) as the `render-review` command evidence, and cite the deployed SHA as the rendered input identity. If the diff is not empty, the live site is not your input: record `render-review` as unavailable and name the deployed SHA and HEAD. Changed images can be served stale for up to 30 days, so treat a missing or mismatched asset as unverified, not as a content defect.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFPG-402 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpg-402/`, and `static/img/figures/efpg-402/unit-05/`.

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

Added the validated advisory G3 English review of EFPG-402 Unit 5 (disposition revise: a Rowe misstatement and an overstated sources declaration) with its manifest, logs, production render PNGs, assessment solutions, summary, PHR and unticked tracker row, all committed on `crew/efpg-402-u05-review_en`.

## Outcome

- Impact: review_en for EFPG-402 Unit 5 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 33 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Added the validated advisory G3 English review of EFPG-402 Unit 5 (disposition revise: a Rowe misstatement and an overstated sources declaration) with its manifest, logs, production render PNGs, assessment solutions, summary, PHR and unticked tracker row, all committed on `crew/efpg-402-u05-review_en`.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The two blocking findings are the whole blocker: fix the Rowe sentence and correct/recast the sources declaration, then a fresh bundle and reviewer are needed (ADR-0019 cycle 1 of 2).
  - `render-review` exited 1 only on the WebP-as-SVG tool limitation; the live pages, narrow view, A4 print and schematic SVG geometry were clean, so accessibility is recorded unverified rather than failed.
  - Report at `specs/content/efpg-402/reviews/unit-05/G3/crew-job-efpg-402-u05-review_en.json`; evidence, logs and PNGs in the sibling `crew-job-efpg-402-u05-review_en/` folder.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
