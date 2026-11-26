---
id: crew-efmp-409-u03-review_en-r1
title: crew review_en EFMP-409 unit 3
stage: misc
date: 2026-11-26
surface: agent
model: Claude Code (LongCat-2.5)
feature: efmp-409
branch: crew/efmp-409-u03-review_en
user: crew
command: crew review_en
labels: ["crew", "claude_crew", "review_en"]
links:
  spec: specs/content/efmp-409/content-spec.md
  ticket: null
  adr: history/adr/0019-independent-agents-for-g3-g5-review.md
  pr: null
files:
 - specs/content/efmp-409/reviews/unit-03/G3/crew-efmp-409-u03-review_en-r1.json
 - specs/content/efmp-409/reviews/unit-03/G3/crew-efmp-409-u03-review_en-r1/manifest.json
 - specs/content/efmp-409/reviews/unit-03/G3/crew-efmp-409-u03-review_en-r1/summary.md
 - specs/content/efmp-409/reviews/unit-03/G3/crew-efmp-409-u03-review_en-r1/limitations.md
 - specs/content/efmp-409/reviews/unit-03/G3/crew-efmp-409-u03-review_en-r1/source-verification.md
 - specs/content/efmp-409/reviews/unit-03/G3/crew-efmp-409-u03-review_en-r1/assessment-solutions.md
 - specs/content/efmp-409/reviews/unit-03/G3/crew-efmp-409-u03-review_en-r1/advisory-tracker-row.md
 - specs/content/efmp-409/reviews/unit-03/G3/crew-efmp-409-u03-review_en-r1/make-report.mjs
 - specs/content/efmp-409/reviews/unit-03/G3/crew-efmp-409-u03-review_en-r1/logs/prepare.txt
 - specs/content/efmp-409/reviews/unit-03/G3/crew-efmp-409-u03-review_en-r1/logs/input-verification.txt
 - specs/content/efmp-409/reviews/unit-03/G3/crew-efmp-409-u03-review_en-r1/logs/validate:content.txt
 - specs/content/efmp-409/reviews/unit-03/G3/crew-efmp-409-u03-review_en-r1/logs/check:depth-gate.txt
 - specs/content/efmp-409/reviews/unit-03/G3/crew-efmp-409-u03-review_en-r1/logs/check:figures.txt
 - specs/content/efmp-409/reviews/unit-03/G3/crew-efmp-409-u03-review_en-r1/logs/check:no-em-dash.txt
 - specs/content/efmp-409/reviews/unit-03/G3/crew-efmp-409-u03-review_en-r1/logs/check:no-answer-keys.txt
 - specs/content/efmp-409/reviews/unit-03/G3/crew-efmp-409-u03-review_en-r1/logs/check:docs-sync.txt
 - specs/content/efmp-409/reviews/unit-03/G3/crew-efmp-409-u03-review_en-r1/logs/render-review.txt
 - specs/content/efmp-409/reviews/unit-03/G3/crew-efmp-409-u03-review_en-r1/logs/check-content.txt
 - specs/content/efmp-409/reviews/unit-03/G3/crew-efmp-409-u03-review_en-r1/logs/check:concept-graph.txt
 - specs/content/efmp-409/reviews/unit-03/G3/crew-efmp-409-u03-review_en-r1/logs/check:bloom-bands.txt
 - specs/content/efmp-409/reviews/unit-03/G3/crew-efmp-409-u03-review_en-r1/logs/check:source-floor.txt
 - specs/content/efmp-409/reviews/unit-03/G3/crew-efmp-409-u03-review_en-r1/logs/check:licence.txt
 - specs/content/efmp-409/reviews/unit-03/G3/crew-efmp-409-u03-review_en-r1/logs/check:svg-style.txt
 - specs/content/efmp-409/reviews/unit-03/G3/crew-efmp-409-u03-review_en-r1/logs/check:pipeline-gate.txt
 - specs/content/efmp-409/reviews/unit-03/G3/crew-efmp-409-u03-review_en-r1/logs/measure-figure-text.txt
 - specs/content/efmp-409/reviews/unit-03/G3/crew-efmp-409-u03-review_en-r1/logs/build-content-status.txt
 - specs/content/efmp-409/reviews/unit-03/G3/crew-efmp-409-u03-review_en-r1/logs/report-validation.txt
 - specs/content/efmp-409/reviews/unit-03/G3/crew-efmp-409-u03-review_en-r1/render-verify/render-verify.txt
 - history/prompts/efmp-409/crew-efmp-409-u03-review_en-r1.misc.prompt.md
tests:
 - npm run check:content
 - node scripts/review-evidence.mjs validate specs/content/efmp-409/reviews/unit-03/G3/crew-efmp-409-u03-review_en-r1/crew-efmp-409-u03-review_en-r1.json
 - scripts/heavy.sh node scripts/measure-figure-text.mjs static/img/figures/efmp-409/unit-03/*.svg
---

## Prompt

# Crew job efmp-409-u03-review_en

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-409-u03-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Act as the INDEPENDENT G3 English reviewer of EFMP-409 Unit 3 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row; write the report JSON directly under specs/content/efmp-409/reviews/unit-03/G3/ (supporting evidence may sit in a subfolder). Never tick G3, never add reviewer initials, never self-sign. For the rendered-page and print evidence, inspect the production build (CI-built from main) and never build or serve the site: if `git diff --quiet "$(cat ~/deploy/deployed-sha)" HEAD -- <this unit's English dir> static/img/figures/efmp-409/unit-03/` exits 0, run `scripts/heavy.sh node scripts/render-inspect.mjs EFMP-409 3 --base https://textbook.com.pk --no-pdf`, record its log and PNGs (stage the folder with `git add --sparse`) as the `render-review` command evidence, and cite the deployed SHA as the rendered input identity. If the diff is not empty, the live site is not your input: record `render-review` as unavailable and name the deployed SHA and HEAD. Changed images can be served stale for up to 30 days, so treat a missing or mismatched asset as unverified, not as a content defect.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-409 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-409/`, and `static/img/figures/efmp-409/unit-03/`.

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

Produced the first-cycle G3 English review of EFMP-409 Unit 3. Authority, sources, readability and pedagogy pass; coverage and assessment fail on four blocking findings (MCQ key pattern, MCQ trace mis-mapping, MCQ per-topic spread, missing Bloom tags in topic 3.6), and the report escalates because the rendered-page and print inspection is unavailable for the current bytes (the deployed SHA differs from HEAD on the unit index and the banner figure).

## Outcome

- Impact: review_en cycle 1 for EFMP-409 Unit 3 by claude_crew (attempt 1 of this branch).
- Tests: `npm run check:content` passed (14 gates); `node scripts/review-evidence.mjs validate` exit 0; `scripts/heavy.sh node scripts/measure-figure-text.mjs` exit 0 on all 48 unit SVGs.
- Files: 28 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Added the EFMP-409 Unit 3 G3 advisory report and its evidence bundle under `specs/content/efmp-409/reviews/unit-03/G3/crew-efmp-409-u03-review_en-r1/`, with the report JSON at `specs/content/efmp-409/reviews/unit-03/G3/crew-efmp-409-u03-review_en-r1/crew-efmp-409-u03-review_en-r1.json`.
- Decisions the team must respect: G3 stays unticked and advisory. The report escalates. `coverage` and `assessment` fail on four blocking findings: the MCQ key is B in 9 of 10 items and the longest option in 9 of 10; `coverage/unit-03.md:52,54-55` and `concepts/unit-03.md:15-17` assign MCQ-07/08/09 to the wrong sub-topics; the MCQ bank leaves one of topics 3.5/3.6 without an MCQ against the approved `>= 1 per topic` rule; and `topic-06.mdx:138-140` carries three formative items with no Bloom tag. `accessibility` is unverified because deployed SHA `074ab11456b999cf5d3c9b8aa6e603b2de834eb5` differs from HEAD `895cc30bc6b9edbc87b56365f50f479c8939d049` on `docs/semester-4/efmp-409/unit-03/index.mdx` and `static/img/figures/efmp-409/unit-03/fig-U3-13.webp`, so `render-review` is recorded as unavailable (exit 1).
- Pending / next owner: the crew lead should append the advisory tracker row (`advisory-tracker-row.md`) to `specs/content/efmp-409/tasks.md`; a separate author must repair the four blocking findings, then a fresh reviewer rechecks. The Islamic material (Ibn Khaldun's Muqaddimah, Iqbal's Khudi and educational poetry) still needs a qualified scholar per content-spec drafting note 8. A rendered/print inspection of the current bytes needs a deploy or an owner-run build.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: the production host can lag the reviewed commit, so the admissible render path is unavailable; the report must say so rather than borrowing an earlier render. The MCQ key distribution and option lengths are not covered by any gate, so a 9-of-10 B key with a 9-of-10 longest-option cue passed all deterministic checks. `check:bloom-bands` only scans `unit-assessment.mdx`, so untagged per-topic formative items in `topic-06.mdx` also passed.
- Graders run and results (PASS/FAIL): check:content PASS; review-evidence validate PASS; measure-figure-text PASS.
- Prompt variant (if applicable): crew brief v1, cycle 1.
- Next experiment (smallest change to try): add a gate that reads the MCQ answer key and flags a key-position imbalance or a keyed option that is the unique longest in most items, and extend `check:bloom-bands` to the per-topic `## Check your understanding` items.
