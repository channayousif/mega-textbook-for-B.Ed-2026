---
id: crew-efpg-402-u01-review_en
title: crew review_en EFPG-402 unit 1
stage: misc
date: 2026-11-27
surface: agent
model: agy
feature: efpg-402
branch: crew/efpg-402-u01-review_en
user: crew
command: crew review_en
labels: ["crew", "agy", "review_en"]
links:
  spec: specs/content/efpg-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/efpg-402/crew-efpg-402-u01-review_en.misc.prompt.md
  - specs/content/efpg-402/reviews/unit-01/G3/e9bd17ee-cecf-4f54-9149-3a5da9b53668.json
  - specs/content/efpg-402/reviews/unit-01/G3/e9bd17ee-cecf-4f54-9149-3a5da9b53668/advisory-tracker-row.md
  - specs/content/efpg-402/reviews/unit-01/G3/e9bd17ee-cecf-4f54-9149-3a5da9b53668/assessment-solutions.md
  - specs/content/efpg-402/reviews/unit-01/G3/e9bd17ee-cecf-4f54-9149-3a5da9b53668/limitations.md
  - specs/content/efpg-402/reviews/unit-01/G3/e9bd17ee-cecf-4f54-9149-3a5da9b53668/logs/build-content-status.log
  - specs/content/efpg-402/reviews/unit-01/G3/e9bd17ee-cecf-4f54-9149-3a5da9b53668/logs/check-content.log
  - specs/content/efpg-402/reviews/unit-01/G3/e9bd17ee-cecf-4f54-9149-3a5da9b53668/logs/check:depth-gate.log
  - specs/content/efpg-402/reviews/unit-01/G3/e9bd17ee-cecf-4f54-9149-3a5da9b53668/logs/check:docs-sync.log
  - specs/content/efpg-402/reviews/unit-01/G3/e9bd17ee-cecf-4f54-9149-3a5da9b53668/logs/check:figures.log
  - specs/content/efpg-402/reviews/unit-01/G3/e9bd17ee-cecf-4f54-9149-3a5da9b53668/logs/check:no-answer-keys.log
  - specs/content/efpg-402/reviews/unit-01/G3/e9bd17ee-cecf-4f54-9149-3a5da9b53668/logs/check:no-em-dash.log
  - specs/content/efpg-402/reviews/unit-01/G3/e9bd17ee-cecf-4f54-9149-3a5da9b53668/logs/measure-figure-text.log
  - specs/content/efpg-402/reviews/unit-01/G3/e9bd17ee-cecf-4f54-9149-3a5da9b53668/logs/render-review.txt
  - specs/content/efpg-402/reviews/unit-01/G3/e9bd17ee-cecf-4f54-9149-3a5da9b53668/logs/validate:content.log
  - specs/content/efpg-402/reviews/unit-01/G3/e9bd17ee-cecf-4f54-9149-3a5da9b53668/make-report.mjs
  - specs/content/efpg-402/reviews/unit-01/G3/e9bd17ee-cecf-4f54-9149-3a5da9b53668/manifest.json
  - specs/content/efpg-402/reviews/unit-01/G3/e9bd17ee-cecf-4f54-9149-3a5da9b53668/summary.md
tests:
  - npm run check:content
---

## Prompt

# Crew job efpg-402-u01-review_en

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpg-402-u01-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Act as the INDEPENDENT G3 English reviewer of EFPG-402 Unit 1 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row; write the report JSON directly under specs/content/efpg-402/reviews/unit-01/G3/ (supporting evidence may sit in a subfolder). Never tick G3, never add reviewer initials, never self-sign. For the rendered-page and print evidence, inspect the production build (CI-built from main) and never build or serve the site: if `git diff --quiet "$(cat ~/deploy/deployed-sha)" HEAD -- <this unit's English dir> static/img/figures/efpg-402/unit-01/` exits 0, run `scripts/heavy.sh node scripts/render-inspect.mjs EFPG-402 1 --base https://textbook.com.pk --no-pdf`, record its log and PNGs (stage the folder with `git add --sparse`) as the `render-review` command evidence, and cite the deployed SHA as the rendered input identity. If the diff is not empty, the live site is not your input: record `render-review` as unavailable and name the deployed SHA and HEAD. Changed images can be served stale for up to 30 days, so treat a missing or mismatched asset as unverified, not as a content defect.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFPG-402 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpg-402/`, and `static/img/figures/efpg-402/unit-01/`.

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

Produced validated independent G3 English review report (disposition: escalate) and supporting command and assessment evidence for EFPG-402 Unit 1 without modifying unit prose or certifying the stage. Render-review recorded as unavailable because deployed build differs from HEAD on index.mdx and fig-U1-11.webp.

## Outcome

- Impact: review_en for EFPG-402 Unit 1 by agy.
- Tests: node scripts/review-evidence.mjs validate and npm run check:content passed cleanly.
- Files: 18 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Produced validated independent G3 English review report (disposition: escalate) and supporting command/assessment evidence for EFPG-402 Unit 1 under specs/content/efpg-402/reviews/unit-01/G3/e9bd17ee-cecf-4f54-9149-3a5da9b53668.json.
- Decisions the team must respect: G3 stays advisory until qualified sign-off; no gate was ticked and no certification issued.
- Pending / next owner: crew lead.
- Notes for the next job on this unit:
  - Content criteria (authority, sources, coverage, assessment, readability, pedagogy) all verified pass.
  - Render-review was recorded as unavailable (exit code 1) because deployed SHA 0cbed86bb differs from HEAD 956c4ba91 on index.mdx and fig-U1-11.webp. Once a deployment containing fig-U1-11.webp is live, render inspection can verify visual presentation.
