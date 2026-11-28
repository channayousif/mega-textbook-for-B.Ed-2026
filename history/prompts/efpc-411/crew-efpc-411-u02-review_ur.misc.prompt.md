---
id: crew-efpc-411-u02-review_ur
title: crew review_ur EFPC-411 unit 2
stage: misc
date: 2026-11-28
surface: agent
model: LongCat-2.5
feature: efpc-411
branch: crew/efpc-411-u02-review_ur
user: crew
command: crew review_ur
labels: ["crew", "claude_crew", "review_ur"]
links:
  spec: specs/content/efpc-411/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efpc-411/crew-efpc-411-u02-review_ur.misc.prompt.md
 - specs/content/efpc-411/reviews/unit-02/G5/f67d0bac-a925-413a-a498-d981462563b0.json
 - specs/content/efpc-411/reviews/unit-02/G5/f67d0bac-a925-413a-a498-d981462563b0/advisory-tracker-row.md
 - specs/content/efpc-411/reviews/unit-02/G5/f67d0bac-a925-413a-a498-d981462563b0/assessment-solutions.md
 - specs/content/efpc-411/reviews/unit-02/G5/f67d0bac-a925-413a-a498-d981462563b0/findings.md
 - specs/content/efpc-411/reviews/unit-02/G5/f67d0bac-a925-413a-a498-d981462563b0/summary.md
 - specs/content/efpc-411/reviews/unit-02/G5/f67d0bac-a925-413a-a498-d981462563b0/report-validation.log
 - specs/content/efpc-411/reviews/unit-02/G5/f67d0bac-a925-413a-a498-d981462563b0/validate_content.log
 - specs/content/efpc-411/reviews/unit-02/G5/f67d0bac-a925-413a-a498-d981462563b0/check_depth-gate.log
 - specs/content/efpc-411/reviews/unit-02/G5/f67d0bac-a925-413a-a498-d981462563b0/check_figures.log
 - specs/content/efpc-411/reviews/unit-02/G5/f67d0bac-a925-413a-a498-d981462563b0/check_no-em-dash.log
 - specs/content/efpc-411/reviews/unit-02/G5/f67d0bac-a925-413a-a498-d981462563b0/check_no-answer-keys.log
 - specs/content/efpc-411/reviews/unit-02/G5/f67d0bac-a925-413a-a498-d981462563b0/check_docs-sync.log
 - specs/content/efpc-411/reviews/unit-02/G5/f67d0bac-a925-413a-a498-d981462563b0/check-content.log
 - specs/content/efpc-411/reviews/unit-02/G5/f67d0bac-a925-413a-a498-d981462563b0/build-content-status.log
 - specs/content/efpc-411/reviews/unit-02/G5/f67d0bac-a925-413a-a498-d981462563b0/measure-figure-text.log
 - specs/content/efpc-411/reviews/unit-02/G5/f67d0bac-a925-413a-a498-d981462563b0/render-review.log
 - specs/content/efpc-411/reviews/unit-02/G5/f67d0bac-a925-413a-a498-d981462563b0/renders/render-inspect.json
 - specs/content/efpc-411/reviews/unit-02/G5/f67d0bac-a925-413a-a498-d981462563b0/renders/render-inspect.log
 - specs/content/efpc-411/reviews/unit-02/G5/f67d0bac-a925-413a-a498-d981462563b0/renders/desktop-index.png
 - specs/content/efpc-411/reviews/unit-02/G5/f67d0bac-a925-413a-a498-d981462563b0/renders/desktop-topic-01.png
 - specs/content/efpc-411/reviews/unit-02/G5/f67d0bac-a925-413a-a498-d981462563b0/renders/desktop-topic-02.png
 - specs/content/efpc-411/reviews/unit-02/G5/f67d0bac-a925-413a-a498-d981462563b0/renders/desktop-topic-03.png
 - specs/content/efpc-411/reviews/unit-02/G5/f67d0bac-a925-413a-a498-d981462563b0/renders/desktop-topic-04.png
 - specs/content/efpc-411/reviews/unit-02/G5/f67d0bac-a925-413a-a498-d981462563b0/renders/desktop-unit-assessment.png
 - specs/content/efpc-411/reviews/unit-02/G5/f67d0bac-a925-413a-a498-d981462563b0/renders/narrow360-index.png
 - specs/content/efpc-411/reviews/unit-02/G5/f67d0bac-a925-413a-a498-d981462563b0/renders/narrow360-topic-01.png
 - specs/content/efpc-411/reviews/unit-02/G5/f67d0bac-a925-413a-a498-d981462563b0/renders/narrow360-topic-02.png
 - specs/content/efpc-411/reviews/unit-02/G5/f67d0bac-a925-413a-a498-d981462563b0/renders/narrow360-topic-03.png
 - specs/content/efpc-411/reviews/unit-02/G5/f67d0bac-a925-413a-a498-d981462563b0/renders/narrow360-topic-04.png
 - specs/content/efpc-411/reviews/unit-02/G5/f67d0bac-a925-413a-a498-d981462563b0/renders/narrow360-unit-assessment.png
 - specs/content/efpc-411/reviews/unit-02/G5/f67d0bac-a925-413a-a498-d981462563b0/renders/crop-fig-U2-1b.png
 - specs/content/efpc-411/reviews/unit-02/G5/prep-claude-f67d0bac/manifest.json
tests:
 - npm run check:content
 - node scripts/review-evidence.mjs validate specs/content/efpc-411/reviews/unit-02/G5/f67d0bac-a925-413a-a498-d981462563b0.json
 - scripts/heavy.sh node scripts/render-inspect.mjs EFPC-411 2 --locale ur --base https://textbook.com.pk --no-pdf
 - scripts/heavy.sh node scripts/measure-figure-text.mjs static/img/figures/efpc-411/unit-02/*.ur.svg
---

## Prompt

# Crew job efpc-411-u02-review_ur

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpc-411-u02-review_ur`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Act as the INDEPENDENT G5 Urdu reviewer of EFPC-411 Unit 2 (review-unit skill, .claude/agents/g5-reviewer.md). You did not translate this unit. Produce the evidence report and advisory tracker row; write the report JSON directly under specs/content/efpc-411/reviews/unit-02/G5/ (supporting evidence may sit in a subfolder). Never tick G5, never self-sign. For the rendered-page and print evidence, inspect the production build (CI-built from main) and never build or serve the site: if `git diff --quiet "$(cat ~/deploy/deployed-sha)" HEAD -- <this unit's English dir> <its Urdu mirror dir> static/img/figures/efpc-411/unit-02/` exits 0, run `scripts/heavy.sh node scripts/render-inspect.mjs EFPC-411 2 --locale ur --base https://textbook.com.pk --no-pdf`, record its log and PNGs (stage the folder with `git add --sparse`) as the `render-review` command evidence, and cite the deployed SHA as the rendered input identity. If the diff is not empty, the live site is not your input: record `render-review` as unavailable and name the deployed SHA and HEAD. Changed images can be served stale for up to 30 days, so treat a missing or mismatched asset as unverified, not as a content defect.

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

Produced a validated independent G5 Urdu review report (disposition: revise) with paired EN/UR findings, command logs and rendered-page/print evidence, without modifying unit prose or certifying the stage.

## Outcome

- Impact: review_ur for EFPC-411 Unit 2 by claude_crew (attempt 1).
- Tests: `npm run check:content` passed (14/14); `review-evidence.mjs validate` exit 0; `measure-figure-text.mjs` exit 0 on all eight `.ur.svg`; `render-inspect.mjs` exit 1 with 16 false-positive wordmark flags.
- Files: 34 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Validated G5 Urdu review report `specs/content/efpc-411/reviews/unit-02/G5/f67d0bac-a925-413a-a498-d981462563b0.json` (revise) with findings, assessment re-solve, command logs and production renders.
- Decisions the team must respect: G5 stays advisory until a qualified sign-off; this job does not certify anything, tick G5, or change `translation_status`.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path). A separate repair job must fix F1-F5 and re-run G5 with a fresh manifest.
- Notes for the next job on this unit:
  - Five blocking semantic defects: F1 "period" -> "hour" in 8 places; F2 "marked" -> "solved"; F3 "managing complexity" dropped; F4 "exclusion" -> "تفریق"; F5 "stated, acknowledged and redirected" omitted.
  - `render-inspect.mjs` wordmark flags are false positives on mirrored Urdu figures; `measure-figure-text.mjs` is the symmetric check.
  - No signed G3 report exists; the tracker's Unit 2 G3 row is a human desk record outside the report schema.
  - Proposed advisory tracker row is ready in `advisory-tracker-row.md`; G5 remains open.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS; report validate PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
