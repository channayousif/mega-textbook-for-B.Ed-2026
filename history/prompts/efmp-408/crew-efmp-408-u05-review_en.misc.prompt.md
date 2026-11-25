---
id: crew-efmp-408-u05-review_en
title: crew review_en EFMP-408 unit 5
stage: misc
date: 2026-11-25
surface: agent
model: agy
feature: efmp-408
branch: crew/efmp-408-u05-review_en
user: crew
command: crew review_en
labels: ["crew", "agy", "review_en"]
links:
  spec: specs/content/efmp-408/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/efmp-408/crew-efmp-408-u05-review_en.misc.prompt.md
  - specs/content/efmp-408/reviews/unit-05/G3/crew-efmp-408-u05-review_en-r1.json
  - specs/content/efmp-408/reviews/unit-05/G3/crew-efmp-408-u05-review_en-r1/advisory-tracker-row.md
  - specs/content/efmp-408/reviews/unit-05/G3/crew-efmp-408-u05-review_en-r1/assessment-solutions.md
  - specs/content/efmp-408/reviews/unit-05/G3/crew-efmp-408-u05-review_en-r1/source-verification.md
  - specs/content/efmp-408/reviews/unit-05/G3/crew-efmp-408-u05-review_en-r1/summary.md
  - specs/content/efmp-408/reviews/unit-05/G3/crew-efmp-408-u05-review_en-r1/manifest.json
  - specs/content/efmp-408/reviews/unit-05/G3/crew-efmp-408-u05-review_en-r1/logs/check-content.txt
  - specs/content/efmp-408/reviews/unit-05/G3/crew-efmp-408-u05-review_en-r1/logs/checkbloom-bands.txt
  - specs/content/efmp-408/reviews/unit-05/G3/crew-efmp-408-u05-review_en-r1/logs/checkconcept-graph.txt
  - specs/content/efmp-408/reviews/unit-05/G3/crew-efmp-408-u05-review_en-r1/logs/checkdepth-gate.txt
  - specs/content/efmp-408/reviews/unit-05/G3/crew-efmp-408-u05-review_en-r1/logs/checkdocs-sync.txt
  - specs/content/efmp-408/reviews/unit-05/G3/crew-efmp-408-u05-review_en-r1/logs/checkfigures.txt
  - specs/content/efmp-408/reviews/unit-05/G3/crew-efmp-408-u05-review_en-r1/logs/checkno-answer-keys.txt
  - specs/content/efmp-408/reviews/unit-05/G3/crew-efmp-408-u05-review_en-r1/logs/checkno-em-dash.txt
  - specs/content/efmp-408/reviews/unit-05/G3/crew-efmp-408-u05-review_en-r1/logs/checksvg-style.txt
  - specs/content/efmp-408/reviews/unit-05/G3/crew-efmp-408-u05-review_en-r1/logs/measure-figure-text.txt
  - specs/content/efmp-408/reviews/unit-05/G3/crew-efmp-408-u05-review_en-r1/logs/render-review.txt
  - specs/content/efmp-408/reviews/unit-05/G3/crew-efmp-408-u05-review_en-r1/logs/validatecontent.txt
tests:
  - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

# Crew job efmp-408-u05-review_en

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-408-u05-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Act as the INDEPENDENT G3 English reviewer of EFMP-408 Unit 5 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row; write the report JSON directly under specs/content/efmp-408/reviews/unit-05/G3/ (supporting evidence may sit in a subfolder). Never tick G3, never add reviewer initials, never self-sign. For the rendered-page and print evidence, inspect the production build (CI-built from main) and never build or serve the site: if `git diff --quiet "$(cat ~/deploy/deployed-sha)" HEAD -- <this unit's English dir> static/img/figures/efmp-408/unit-05/` exits 0, run `scripts/heavy.sh node scripts/render-inspect.mjs EFMP-408 5 --base https://textbook.com.pk --no-pdf`, record its log and PNGs (stage the folder with `git add --sparse`) as the `render-review` command evidence, and cite the deployed SHA as the rendered input identity. If the diff is not empty, the live site is not your input: record `render-review` as unavailable and name the deployed SHA and HEAD. Changed images can be served stale for up to 30 days, so treat a missing or mismatched asset as unverified, not as a content defect.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-408 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-408/`, and `static/img/figures/efmp-408/unit-05/`.

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

Added a validated advisory G3 escalate review of EFMP-408 Unit 5 with a hashed evidence bundle (gate logs, independent assessment solutions, source verification, render-review unavailable record) and an open advisory tracker row on `crew/efmp-408-u05-review_en`.

## Outcome

- Impact: review_en for EFMP-408 Unit 5 by agy (cycle 1).
- Status: Completed advisory review, escalated due to render-review unavailability (deployed SHA differs from HEAD).
- Disposition: escalate. G3 remains open, no self-sign or certification.

## Handoff (for CEO and agents)

- Shipped: Advisory G3 review report at `specs/content/efmp-408/reviews/unit-05/G3/crew-efmp-408-u05-review_en-r1.json` with supporting evidence bundle.
- Decisions: Unit 5 content, sources, coverage, and assessment pass all criteria. Visual accessibility is unverified because deployed SHA 7d1ba9655 differs from HEAD 7fb77de68 (unit 5 index.mdx and banner fig-U5-7). Disposition is escalate; G3 remains open.
- Pending: Visual rendering inspection once main is deployed to production. Distractor clustering advisory (7 of 10 MCQ keys are B) for future authoring maintenance.
- Affected issues: None.
