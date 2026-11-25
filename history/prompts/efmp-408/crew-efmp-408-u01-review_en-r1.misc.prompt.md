---
id: crew-efmp-408-u01-review_en-r1
title: crew review_en EFMP-408 unit 1
stage: misc
date: 2026-11-25
surface: agent
model: LongCat-2.5
feature: efmp-408
branch: crew/efmp-408-u01-review_en
user: crew
command: crew review_en
labels: ["crew", "claude", "review_en"]
links:
  spec: specs/content/efmp-408/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/efmp-408/reviews/unit-01/G3/crew-efmp-408-u01-review_en-r1.json
 - specs/content/efmp-408/reviews/unit-01/G3/crew-efmp-408-u01-review_en-r1/manifest.json
 - specs/content/efmp-408/reviews/unit-01/G3/crew-efmp-408-u01-review_en-r1/summary.md
 - specs/content/efmp-408/reviews/unit-01/G3/crew-efmp-408-u01-review_en-r1/limitations.md
 - specs/content/efmp-408/reviews/unit-01/G3/crew-efmp-408-u01-review_en-r1/assessment-solutions.md
 - specs/content/efmp-408/reviews/unit-01/G3/crew-efmp-408-u01-review_en-r1/advisory-tracker-row.md
 - specs/content/efmp-408/reviews/unit-01/G3/crew-efmp-408-u01-review_en-r1/make-report.mjs
 - specs/content/efmp-408/reviews/unit-01/G3/crew-efmp-408-u01-review_en-r1/logs/input-verification.txt
 - specs/content/efmp-408/reviews/unit-01/G3/crew-efmp-408-u01-review_en-r1/logs/validate-content.txt
 - specs/content/efmp-408/reviews/unit-01/G3/crew-efmp-408-u01-review_en-r1/logs/check-depth-gate.txt
 - specs/content/efmp-408/reviews/unit-01/G3/crew-efmp-408-u01-review_en-r1/logs/check-figures.txt
 - specs/content/efmp-408/reviews/unit-01/G3/crew-efmp-408-u01-review_en-r1/logs/check-no-em-dash.txt
 - specs/content/efmp-408/reviews/unit-01/G3/crew-efmp-408-u01-review_en-r1/logs/check-no-answer-keys.txt
 - specs/content/efmp-408/reviews/unit-01/G3/crew-efmp-408-u01-review_en-r1/logs/check-docs-sync.txt
 - specs/content/efmp-408/reviews/unit-01/G3/crew-efmp-408-u01-review_en-r1/logs/render-review.txt
 - specs/content/efmp-408/reviews/unit-01/G3/crew-efmp-408-u01-review_en-r1/logs/check-content.txt
 - specs/content/efmp-408/reviews/unit-01/G3/crew-efmp-408-u01-review_en-r1/logs/build-content-status.txt
 - specs/content/efmp-408/reviews/unit-01/G3/crew-efmp-408-u01-review_en-r1/logs/measure-figure-text.txt
 - specs/content/efmp-408/reviews/unit-01/G3/crew-efmp-408-u01-review_en-r1/logs/report-validation.txt
 - specs/content/efmp-408/tasks.md
 - history/prompts/efmp-408/crew-efmp-408-u01-review_en-r1.misc.prompt.md
tests:
 - npm run check:content
 - node scripts/review-evidence.mjs validate specs/content/efmp-408/reviews/unit-01/G3/crew-efmp-408-u01-review_en-r1.json
---

## Prompt

# Crew job efmp-408-u01-review_en

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-408-u01-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Act as the INDEPENDENT G3 English reviewer of EFMP-408 Unit 1 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row; write the report JSON directly under specs/content/efmp-408/reviews/unit-01/G3/ (supporting evidence may sit in a subfolder). Never tick G3, never add reviewer initials, never self-sign. For the rendered-page and print evidence, inspect the production build (CI-built from main) and never build or serve the site: if `git diff --quiet "$(cat ~/deploy/deployed-sha)" HEAD -- <this unit's English dir> static/img/figures/efmp-408/unit-01/` exits 0, run `scripts/heavy.sh node scripts/render-inspect.mjs EFMP-408 1 --base https://textbook.com.pk --no-pdf`, record its log and PNGs (stage the folder with `git add --sparse`) as the `render-review` command evidence, and cite the deployed SHA as the rendered input identity. If the diff is not empty, the live site is not your input: record `render-review` as unavailable and name the deployed SHA and HEAD. Changed images can be served stale for up to 30 days, so treat a missing or mismatched asset as unverified, not as a content defect.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-408 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-408/`, and `static/img/figures/efmp-408/unit-01/`.

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

Added the EFMP-408 Unit 1 r1 G3 English advisory revise report (render-review unavailable; formative band breach; RRQ 4 below floor; MCQ key never uses D; NPSTP not bound to Unit 1) with hashed logs, an advisory tracker row, and a validated report, committed on the branch.

## Outcome

- Impact: review_en for EFMP-408 Unit 1 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree; report validation passed.
- Files: 21 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Added the EFMP-408 Unit 1 r1 G3 English advisory revise report at specs/content/efmp-408/reviews/unit-01/G3/crew-efmp-408-u01-review_en-r1.json with 18 hashed evidence files, plus an advisory tracker row in specs/content/efmp-408/tasks.md.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this job certifies nothing and marks no gate done.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path). A separate author owns the content repairs; a fresh reviewer rechecks after a new bundle.
- Notes for the next job on this unit:
  - render-review is unavailable: deployed SHA 3910d26161b35a1faf18ce848fd50ab0b4cf59f7 differs from HEAD 7bb9e4d484428859cbfe2f6e3775c0e8291b11ea on index.mdx and fig-U1-4.webp. A later permitted render job should confirm the live pages once the deploy catches up.
  - Repair targets: topic-02.mdx item 4 and topic-03.mdx item 3 (Analyze over the approved Remember/Understand/Apply); 12 formative items against the approved 9; RRQ 4 at Remember; MCQ key never D; bind NPSTP Standard 5 to Unit 1 or declare it.
  - The report is advisory and unsigned; do not treat the tracker row's agent identity as a certification.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS; review-evidence validate PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
