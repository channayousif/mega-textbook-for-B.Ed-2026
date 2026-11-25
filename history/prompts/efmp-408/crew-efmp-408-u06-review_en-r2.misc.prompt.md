---
id: crew-efmp-408-u06-review_en-r2
title: crew review_en EFMP-408 unit 6 (cycle 2)
stage: misc
date: 2026-11-25
surface: agent
model: Claude Code (LongCat-2.5)
feature: efmp-408
branch: crew/efmp-408-u06-review_en-r2
user: crew
command: crew review_en
labels: ["crew", "claude_crew", "review_en"]
links:
  spec: specs/content/efmp-408/content-spec.md
  ticket: null
  adr: history/adr/0019-independent-agents-for-g3-g5-review.md
  pr: null
files:
 - specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r2/crew-efmp-408-u06-review_en-r2.json
 - specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r2/summary.md
 - specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r2/limitations.md
 - specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r2/source-verification.md
 - specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r2/assessment-solutions.md
 - specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r2/advisory-tracker-row.md
 - specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r2/manifest.json
 - specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r2/make-report.mjs
 - specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r2/render-verify/render-verify.txt
 - specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r2/logs/build-content-status.txt
 - specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r2/logs/check-bloom-bands.txt
 - specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r2/logs/check-concept-graph.txt
 - specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r2/logs/check-content.txt
 - specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r2/logs/check-depth-gate.txt
 - specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r2/logs/check-docs-sync.txt
 - specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r2/logs/check-figures.txt
 - specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r2/logs/check-licence.txt
 - specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r2/logs/check-no-answer-keys.txt
 - specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r2/logs/check-no-em-dash.txt
 - specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r2/logs/check-pipeline-gate.txt
 - specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r2/logs/check-source-floor.txt
 - specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r2/logs/check-svg-style.txt
 - specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r2/logs/input-verification.txt
 - specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r2/logs/measure-figure-text.txt
 - specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r2/logs/prepare.txt
 - specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r2/logs/render-review.txt
 - specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r2/logs/report-validation.txt
 - specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r2/logs/validate-content.txt
 - history/prompts/efmp-408/crew-efmp-408-u06-review_en-r2.misc.prompt.md
tests:
 - npm run check:content
 - node scripts/review-evidence.mjs validate specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r2/crew-efmp-408-u06-review_en-r2.json
---

## Prompt

# Crew job efmp-408-u06-review_en-r1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-408-u06-review_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Act as the INDEPENDENT G3 English reviewer of EFMP-408 Unit 6 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row; write the report JSON directly under specs/content/efmp-408/reviews/unit-06/G3/ (supporting evidence may sit in a subfolder). Never tick G3, never add reviewer initials, never self-sign. For the rendered-page and print evidence, inspect the production build (CI-built from main) and never build or serve the site: if `git diff --quiet "$(cat ~/deploy/deployed-sha)" HEAD -- <this unit's English dir> static/img/figures/efmp-408/unit-06/` exits 0, run `scripts/heavy.sh node scripts/render-inspect.mjs EFMP-408 6 --base https://textbook.com.pk --no-pdf`, record its log and PNGs (stage the folder with `git add --sparse`) as the `render-review` command evidence, and cite the deployed SHA as the rendered input identity. If the diff is not empty, the live site is not your input: record `render-review` as unavailable and name the deployed SHA and HEAD. Changed images can be served stale for up to 30 days, so treat a missing or mismatched asset as unverified, not as a content defect. This is the second and last review cycle (ADR-0019): repairs were applied for the latest report under the unit's reviews/.../G3/ folder. Verify each of its findings against the current files, carry any that remain unresolved, and give a new name to your report.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-408 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-408/`, and `static/img/figures/efmp-408/unit-06/`.

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

Produced the second-cycle G3 English review of EFMP-408 Unit 6: all six cycle-1 findings verified as closed against the repaired files, one new advisory on the residual MCQ option-length cue, and the report escalated because the rendered-page and print inspection is unavailable for the current bytes.

## Outcome

- Impact: review_en cycle 2 for EFMP-408 Unit 6 by claude_crew (attempt 1 of this branch).
- Tests: `npm run check:content` passed (14 gates) in the job worktree; `node scripts/review-evidence.mjs validate` exit 0; `measure-figure-text` exit 0 on all 16 bound SVGs.
- Files: 28 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Added the EFMP-408 Unit 6 G3 cycle-2 advisory report and its evidence bundle under `specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r2/`.
- Decisions the team must respect: G3 stays unticked and advisory. The report escalates because `accessibility` is unverified: the deployed SHA differs from HEAD on the unit, so `render-review` is recorded as unavailable. This is the second and final ADR-0019 cycle, so no unchanged-input retry is permitted.
- Pending / next owner: the crew lead must append the advisory tracker row (`advisory-tracker-row.md`) to `specs/content/efmp-408/tasks.md` and decide how to obtain the rendered/print inspection for the repaired bytes (deploy first, or an owner-run build) before any further G3 attempt.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: the production host can lag the reviewed commit, so the admissible render path is unavailable on a repair cycle; the report must say so rather than borrowing the previous cycle's render.
- Graders run and results (PASS/FAIL): check:content PASS; review-evidence validate PASS; measure-figure-text PASS.
- Prompt variant (if applicable): crew brief v1, cycle 2.
- Next experiment (smallest change to try): add a standing rule that a repair cycle's render evidence is only admissible after the repaired commit is deployed.
