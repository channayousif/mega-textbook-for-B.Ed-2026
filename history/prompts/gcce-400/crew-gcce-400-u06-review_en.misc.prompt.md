---
id: crew-gcce-400-u06-review_en
title: crew review_en GCCE-400 unit 6
stage: misc
date: 2026-11-24
surface: agent
model: agy
feature: gcce-400
branch: crew/gcce-400-u06-review_en
user: crew
command: crew review_en
labels: ["crew", "agy", "review_en"]
links:
  spec: specs/content/gcce-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/gcce-400/crew-gcce-400-u06-review_en.misc.prompt.md
  - specs/content/gcce-400/reviews/unit-06/G3/agy-run1-20261124.json
  - specs/content/gcce-400/reviews/unit-06/G3/agy-run1-20261124/advisory-tracker-row.md
  - specs/content/gcce-400/reviews/unit-06/G3/agy-run1-20261124/assessment-solutions.md
  - specs/content/gcce-400/reviews/unit-06/G3/agy-run1-20261124/limitations.md
  - specs/content/gcce-400/reviews/unit-06/G3/agy-run1-20261124/logs/build-content-status.log
  - specs/content/gcce-400/reviews/unit-06/G3/agy-run1-20261124/logs/check-content.log
  - specs/content/gcce-400/reviews/unit-06/G3/agy-run1-20261124/logs/check:depth-gate.log
  - specs/content/gcce-400/reviews/unit-06/G3/agy-run1-20261124/logs/check:docs-sync.log
  - specs/content/gcce-400/reviews/unit-06/G3/agy-run1-20261124/logs/check:figures.log
  - specs/content/gcce-400/reviews/unit-06/G3/agy-run1-20261124/logs/check:no-answer-keys.log
  - specs/content/gcce-400/reviews/unit-06/G3/agy-run1-20261124/logs/check:no-em-dash.log
  - specs/content/gcce-400/reviews/unit-06/G3/agy-run1-20261124/logs/measure-figure-text.log
  - specs/content/gcce-400/reviews/unit-06/G3/agy-run1-20261124/logs/render-review.txt
  - specs/content/gcce-400/reviews/unit-06/G3/agy-run1-20261124/logs/validate:content.log
  - specs/content/gcce-400/reviews/unit-06/G3/agy-run1-20261124/make-report.mjs
  - specs/content/gcce-400/reviews/unit-06/G3/agy-run1-20261124/manifest.json
  - specs/content/gcce-400/reviews/unit-06/G3/agy-run1-20261124/summary.md
tests:
  - npm run check:content
---

## Prompt

# Crew job gcce-400-u06-review_en

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gcce-400-u06-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Act as the INDEPENDENT G3 English reviewer of GCCE-400 Unit 6 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row; write the report JSON directly under specs/content/gcce-400/reviews/unit-06/G3/ (supporting evidence may sit in a subfolder). Never tick G3, never add reviewer initials, never self-sign. For the rendered-page and print evidence, inspect the production build (CI-built from main) and never build or serve the site: if `git diff --quiet "$(cat ~/deploy/deployed-sha)" HEAD -- <this unit's English dir> static/img/figures/gcce-400/unit-06/` exits 0, run `scripts/heavy.sh node scripts/render-inspect.mjs GCCE-400 6 --base https://textbook.com.pk --no-pdf`, record its log and PNGs (stage the folder with `git add --sparse`) as the `render-review` command evidence, and cite the deployed SHA as the rendered input identity. If the diff is not empty, the live site is not your input: record `render-review` as unavailable and name the deployed SHA and HEAD. Changed images can be served stale for up to 30 days, so treat a missing or mismatched asset as unverified, not as a content defect.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GCCE-400 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gcce-400/`, and `static/img/figures/gcce-400/unit-06/`.

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

Completed independent G3 English review for GCCE-400 Unit 6, validating all content criteria (authority, sources, coverage, assessment correctness, readability, pedagogy), verifying figure geometry on all 24 SVGs with measure-figure-text, passing all content gates, and escalating on unavailable live render review due to deployed build staleness (HEAD differs from deployed SHA on index.mdx and fig-U6-7.webp).

## Outcome

- Impact: review_en for GCCE-400 Unit 6 by agy (run 1).
- Tests: npm run check:content passed in the job worktree before committing.
- Files: 18 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Completed independent G3 English run 1 review for GCCE-400 Unit 6, producing validated evidence report and advisory tracker row with disposition escalate due to deployed build staleness.
- Decisions the team must respect: G3/G5 stay advisory until qualified sign-off; this review does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless PR touches a protected path).
- Notes for the next job on this unit:
  - A permitted host must run render-inspect against a deployment matching HEAD 6da753a0c; deployed SHA 175a90b7a lacks the placed banner fig-U6-7.
  - G3 remains open, unticked, reviewer token agent:g3-reviewer, no certification.
  - Author should consider advisory findings: RRQ 6 model answer describes check 4 (harm) rather than check 5 (decide); MCQ key balance lacks option D; and sources/texts/shair-2022-digital-divide.md references Unit 1 instead of Unit 6.
- Paperclip issues affected: none (Paperclip paused; work tracked by crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
