---
id: crew-efmp-303-u06-review_en-r1
title: crew review_en EFMP-303 unit 6
stage: misc
date: 2026-11-25
surface: agent
model: agy
feature: efmp-303
branch: crew/efmp-303-u06-review_en-r1
user: crew
command: crew review_en
labels: ["crew", "agy", "review_en"]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-303/crew-efmp-303-u06-review_en-r1.misc.prompt.md
 - specs/content/efmp-303/reviews/unit-06/G3/agy-cycle2-20261125.json
 - specs/content/efmp-303/reviews/unit-06/G3/agy-cycle2-20261125/advisory-tracker-row.md
 - specs/content/efmp-303/reviews/unit-06/G3/agy-cycle2-20261125/assessment-solutions.md
 - specs/content/efmp-303/reviews/unit-06/G3/agy-cycle2-20261125/limitations.md
 - specs/content/efmp-303/reviews/unit-06/G3/agy-cycle2-20261125/logs/build-content-status.log
 - specs/content/efmp-303/reviews/unit-06/G3/agy-cycle2-20261125/logs/check-content.log
 - specs/content/efmp-303/reviews/unit-06/G3/agy-cycle2-20261125/logs/check:depth-gate.log
 - specs/content/efmp-303/reviews/unit-06/G3/agy-cycle2-20261125/logs/check:docs-sync.log
 - specs/content/efmp-303/reviews/unit-06/G3/agy-cycle2-20261125/logs/check:figures.log
 - specs/content/efmp-303/reviews/unit-06/G3/agy-cycle2-20261125/logs/check:no-answer-keys.log
 - specs/content/efmp-303/reviews/unit-06/G3/agy-cycle2-20261125/logs/check:no-em-dash.log
 - specs/content/efmp-303/reviews/unit-06/G3/agy-cycle2-20261125/logs/measure-figure-text.log
 - specs/content/efmp-303/reviews/unit-06/G3/agy-cycle2-20261125/logs/render-review.txt
 - specs/content/efmp-303/reviews/unit-06/G3/agy-cycle2-20261125/logs/validate:content.log
 - specs/content/efmp-303/reviews/unit-06/G3/agy-cycle2-20261125/make-report.mjs
 - specs/content/efmp-303/reviews/unit-06/G3/agy-cycle2-20261125/manifest.json
 - specs/content/efmp-303/reviews/unit-06/G3/agy-cycle2-20261125/prior-findings.md
 - specs/content/efmp-303/reviews/unit-06/G3/agy-cycle2-20261125/summary.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-303-u06-review_en-r1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-303-u06-review_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Act as the INDEPENDENT G3 English reviewer of EFMP-303 Unit 6 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row; write the report JSON directly under specs/content/efmp-303/reviews/unit-06/G3/ (supporting evidence may sit in a subfolder). Never tick G3, never add reviewer initials, never self-sign. For the rendered-page and print evidence, inspect the production build (CI-built from main) and never build or serve the site: if `git diff --quiet "$(cat ~/deploy/deployed-sha)" HEAD -- <this unit's English dir> static/img/figures/efmp-303/unit-06/` exits 0, run `scripts/heavy.sh node scripts/render-inspect.mjs EFMP-303 6 --base https://textbook.com.pk --no-pdf`, record its log and PNGs (stage the folder with `git add --sparse`) as the `render-review` command evidence, and cite the deployed SHA as the rendered input identity. If the diff is not empty, the live site is not your input: record `render-review` as unavailable and name the deployed SHA and HEAD. Changed images can be served stale for up to 30 days, so treat a missing or mismatched asset as unverified, not as a content defect. This is the second and last review cycle (ADR-0019): repairs were applied for the latest report under the unit's reviews/.../G3/ folder. Verify each of its findings against the current files, carry any that remain unresolved, and give a new name to your report.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-303 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-303/`, and `static/img/figures/efmp-303/unit-06/`.

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

Recorded independent G3 English cycle-2 review report and evidence for EFMP-303 Unit 6 escalating on unavailable live render inspection while all content gates passed.

## Outcome

- Impact: review_en for EFMP-303 Unit 6 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 19 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Recorded independent G3 English cycle-2 review report and evidence for EFMP-303 Unit 6 escalating on unavailable live render inspection while all content gates passed.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Live site `7ca7b2129` differs from HEAD `5a14660cb` on Unit 6 prose and 4 raster illustration assets; visual accessibility remains unverified until inspected on a matching deployment.
  - G3 remains advisory (cycle 2 of 2, disposition escalate, reviewer token `agent:g3-reviewer`); no certification or tracker tick was performed.
  - Advisory findings carried: Khan (2018) in further reading and 9 of 10 MCQ keys clustering on option (B).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
