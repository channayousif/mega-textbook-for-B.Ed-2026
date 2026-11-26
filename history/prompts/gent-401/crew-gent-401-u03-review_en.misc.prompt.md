---
id: crew-gent-401-u03-review_en
title: crew review_en GENT-401 unit 3
stage: misc
date: 2026-11-27
surface: agent
model: agy
feature: gent-401
branch: crew/gent-401-u03-review_en
user: crew
command: crew review_en
labels: ["crew", "agy", "review_en"]
links:
  spec: specs/content/gent-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gent-401/crew-gent-401-u03-review_en.misc.prompt.md
 - specs/content/gent-401/reviews/unit-03/G3/crew-gent-401-u03-review_en.json
 - specs/content/gent-401/reviews/unit-03/G3/crew-gent-401-u03-review_en/advisory-tracker-row.md
 - specs/content/gent-401/reviews/unit-03/G3/crew-gent-401-u03-review_en/assessment-solutions.md
 - specs/content/gent-401/reviews/unit-03/G3/crew-gent-401-u03-review_en/limitations.md
 - specs/content/gent-401/reviews/unit-03/G3/crew-gent-401-u03-review_en/make-report.mjs
 - specs/content/gent-401/reviews/unit-03/G3/crew-gent-401-u03-review_en/manifest.json
 - specs/content/gent-401/reviews/unit-03/G3/crew-gent-401-u03-review_en/summary.md
 - specs/content/gent-401/reviews/unit-03/G3/crew-gent-401-u03-review_en/logs/build-content-status.txt
 - specs/content/gent-401/reviews/unit-03/G3/crew-gent-401-u03-review_en/logs/check-content.txt
 - specs/content/gent-401/reviews/unit-03/G3/crew-gent-401-u03-review_en/logs/check_bloom-bands.txt
 - specs/content/gent-401/reviews/unit-03/G3/crew-gent-401-u03-review_en/logs/check_concept-graph.txt
 - specs/content/gent-401/reviews/unit-03/G3/crew-gent-401-u03-review_en/logs/check_depth-gate.txt
 - specs/content/gent-401/reviews/unit-03/G3/crew-gent-401-u03-review_en/logs/check_docs-sync.txt
 - specs/content/gent-401/reviews/unit-03/G3/crew-gent-401-u03-review_en/logs/check_figures.txt
 - specs/content/gent-401/reviews/unit-03/G3/crew-gent-401-u03-review_en/logs/check_no-answer-keys.txt
 - specs/content/gent-401/reviews/unit-03/G3/crew-gent-401-u03-review_en/logs/check_no-em-dash.txt
 - specs/content/gent-401/reviews/unit-03/G3/crew-gent-401-u03-review_en/logs/measure-figure-text.txt
 - specs/content/gent-401/reviews/unit-03/G3/crew-gent-401-u03-review_en/logs/render-review.txt
 - specs/content/gent-401/reviews/unit-03/G3/crew-gent-401-u03-review_en/logs/validate_content.txt
tests:
 - npm run check:content
---

## Prompt

# Crew job gent-401-u03-review_en

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gent-401-u03-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Act as the INDEPENDENT G3 English reviewer of GENT-401 Unit 3 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row; write the report JSON directly under specs/content/gent-401/reviews/unit-03/G3/ (supporting evidence may sit in a subfolder). Never tick G3, never add reviewer initials, never self-sign. For the rendered-page and print evidence, inspect the production build (CI-built from main) and never build or serve the site: if `git diff --quiet "$(cat ~/deploy/deployed-sha)" HEAD -- <this unit's English dir> static/img/figures/gent-401/unit-03/` exits 0, run `scripts/heavy.sh node scripts/render-inspect.mjs GENT-401 3 --base https://textbook.com.pk --no-pdf`, record its log and PNGs (stage the folder with `git add --sparse`) as the `render-review` command evidence, and cite the deployed SHA as the rendered input identity. If the diff is not empty, the live site is not your input: record `render-review` as unavailable and name the deployed SHA and HEAD. Changed images can be served stale for up to 30 days, so treat a missing or mismatched asset as unverified, not as a content defect.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GENT-401 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gent-401/`, and `static/img/figures/gent-401/unit-03/`.

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

Conducted the independent G3 English review of GENT-401 Unit 3. Produced review evidence report (disposition: escalate due to render-review unavailable from deployed build staleness), advisory tracker row, assessment solutions, limitations notes, summary, and command logs under `specs/content/gent-401/reviews/unit-03/G3/`.

## Outcome

- Impact: review_en for GENT-401 Unit 3 by agy (attempt 1).
- Tests: `npm run check:content` passed (all 14 content gates passed).
- Files: 20 files added under `specs/content/gent-401/reviews/unit-03/G3/` and `history/prompts/gent-401/`.
- Next prompts: crew planner derives next stage after review escalation handoff.

## Handoff (for CEO and agents)

- Shipped / changed: Produced GENT-401 Unit 3 G3 English advisory review report and supporting evidence at `specs/content/gent-401/reviews/unit-03/G3/`.
- Decisions the team must respect: G3 review is advisory with disposition escalate; does not certify unit or modify tracker rows.
- Pending / next owner: Host / human reviewer for live render inspection once deployed build includes Unit 3 banner illustration.
- Notes for the next job on this unit:
  - F1 uncertain: Render-review was unavailable (exit 1) because deployed SHA `366019f8ace647e892523e553b81ab6d1832ec68` differed from HEAD on `docs/semester-4/gent-401/unit-03/index.mdx` and `static/img/figures/gent-401/unit-03/fig-U3-5.webp`. Live visual accessibility remains unverified; structural accessibility and SVG geometry passed.
  - F2 advisory: Option D is never used as the correct key across all 10 MCQs (A: 2, B: 7, C: 1, D: 0). Future revision may balance option distribution.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
