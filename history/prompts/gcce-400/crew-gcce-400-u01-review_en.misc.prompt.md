---
id: crew-gcce-400-u01-review_en
title: crew review_en GCCE-400 unit 1
stage: misc
date: 2026-11-23
surface: agent
model: agy
feature: gcce-400
branch: crew/gcce-400-u01-review_en
user: crew
command: crew review_en
labels: ["crew", "agy", "review_en"]
links:
  spec: specs/content/gcce-400/content-spec.md
  ticket: null
  adr: history/adr/0019-independent-agents-for-g3-g5-review.md
  pr: null
files:
  - specs/content/gcce-400/reviews/unit-01/G3/29bfa88a-9bb9-423a-b2f1-07e612294e2f.json
  - specs/content/gcce-400/reviews/unit-01/G3/29bfa88a-9bb9-423a-b2f1-07e612294e2f/assessment-independent.md
  - specs/content/gcce-400/reviews/unit-01/G3/29bfa88a-9bb9-423a-b2f1-07e612294e2f/manifest.json
  - specs/content/gcce-400/reviews/unit-01/G3/29bfa88a-9bb9-423a-b2f1-07e612294e2f/source-verification.md
  - specs/content/gcce-400/reviews/unit-01/G3/29bfa88a-9bb9-423a-b2f1-07e612294e2f/summary.md
  - specs/content/gcce-400/reviews/unit-01/G3/29bfa88a-9bb9-423a-b2f1-07e612294e2f/logs/check-bloom-bands.txt
  - specs/content/gcce-400/reviews/unit-01/G3/29bfa88a-9bb9-423a-b2f1-07e612294e2f/logs/check-concept-graph.txt
  - specs/content/gcce-400/reviews/unit-01/G3/29bfa88a-9bb9-423a-b2f1-07e612294e2f/logs/check-content.txt
  - specs/content/gcce-400/reviews/unit-01/G3/29bfa88a-9bb9-423a-b2f1-07e612294e2f/logs/check-depth-gate.txt
  - specs/content/gcce-400/reviews/unit-01/G3/29bfa88a-9bb9-423a-b2f1-07e612294e2f/logs/check-docs-sync.txt
  - specs/content/gcce-400/reviews/unit-01/G3/29bfa88a-9bb9-423a-b2f1-07e612294e2f/logs/check-figures.txt
  - specs/content/gcce-400/reviews/unit-01/G3/29bfa88a-9bb9-423a-b2f1-07e612294e2f/logs/check-no-answer-keys.txt
  - specs/content/gcce-400/reviews/unit-01/G3/29bfa88a-9bb9-423a-b2f1-07e612294e2f/logs/check-no-em-dash.txt
  - specs/content/gcce-400/reviews/unit-01/G3/29bfa88a-9bb9-423a-b2f1-07e612294e2f/logs/check-source-floor.txt
  - specs/content/gcce-400/reviews/unit-01/G3/29bfa88a-9bb9-423a-b2f1-07e612294e2f/logs/check-svg-style.txt
  - specs/content/gcce-400/reviews/unit-01/G3/29bfa88a-9bb9-423a-b2f1-07e612294e2f/logs/input-verification.txt
  - specs/content/gcce-400/reviews/unit-01/G3/29bfa88a-9bb9-423a-b2f1-07e612294e2f/logs/measure-figure-text.txt
  - specs/content/gcce-400/reviews/unit-01/G3/29bfa88a-9bb9-423a-b2f1-07e612294e2f/logs/render-review.txt
  - specs/content/gcce-400/reviews/unit-01/G3/29bfa88a-9bb9-423a-b2f1-07e612294e2f/logs/static-accessibility.txt
  - specs/content/gcce-400/reviews/unit-01/G3/29bfa88a-9bb9-423a-b2f1-07e612294e2f/logs/validate-content.txt
  - specs/content/gcce-400/tasks.md
tests:
  - npm run check:content
---

## Prompt

# Crew job gcce-400-u01-review_en

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gcce-400-u01-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Act as the INDEPENDENT G3 English reviewer of GCCE-400 Unit 1 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row; write the report JSON directly under specs/content/gcce-400/reviews/unit-01/G3/ (supporting evidence may sit in a subfolder). Never tick G3, never add reviewer initials, never self-sign. For the rendered-page and print evidence, inspect the production build (CI-built from main) and never build or serve the site: if `git diff --quiet "$(cat ~/deploy/deployed-sha)" HEAD -- <this unit's English dir> static/img/figures/gcce-400/unit-01/` exits 0, run `scripts/heavy.sh node scripts/render-inspect.mjs GCCE-400 1 --base https://textbook.com.pk --no-pdf`, record its log and PNGs (stage the folder with `git add --sparse`) as the `render-review` command evidence, and cite the deployed SHA as the rendered input identity. If the diff is not empty, the live site is not your input: record `render-review` as unavailable and name the deployed SHA and HEAD. Changed images can be served stale for up to 30 days, so treat a missing or mismatched asset as unverified, not as a content defect.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GCCE-400 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gcce-400/`, and `static/img/figures/gcce-400/unit-01/`.

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

Conducted independent G3 English review for GCCE-400 Unit 1. Evaluated all required rubrics (authority, sources, coverage, assessment, accessibility, readability, pedagogy). Independently solved and verified 10 MCQs, 10 RRQs, and 5 ERQs. Verified all 12 citations, confirming the Kymlicka & Norman (2000) attribution and current 1973 constitutional currency. Determined that git diff between deployed SHA fa037af and HEAD ae721439e is non-empty, so recorded render-review as unavailable per brief instructions. Prepared manifest, logged all deterministic gate checks, validated report JSON, and recorded the advisory tracker row in tasks.md without certification.

## Outcome

- Impact: G3 English advisory review for GCCE-400 Unit 1 by agy.
- Tests: `validateReport` passed (structurally valid: escalate); all 14 content gates passed via `npm run check:content`.
- Files: 22 files created/updated under `specs/content/gcce-400/reviews/unit-01/G3/`, `specs/content/gcce-400/tasks.md`, and this prompt record.
- Disposition: escalate (advisory only; G3 remains open and unsigned; no certification).

## Handoff (for CEO and agents)

- Shipped / changed: G3 English evidence report JSON (`29bfa88a-9bb9-423a-b2f1-07e612294e2f.json`), prepared manifest, independent assessment solve, source verification, execution logs, and advisory tracker row in `specs/content/gcce-400/tasks.md`.
- Decisions the team must respect: G3 remains open (`▢`) with status advisory escalation; no certification or reviewer initials claimed.
- Pending / next owner: Production deployment to update live site so that `render-inspect.mjs` can run against deployed candidate bytes, or separate qualified reviewer / signing host when enabled.
- Notes for the next job on this unit:
  - All content, sources, coverage, and assessment items passed review.
  - Kymlicka & Norman (2000) attribution and 1973 constitutional currency confirmed.
  - Live site diff against deployed-sha fa037af was non-empty (index.mdx and fig-U1-7.webp differ).
