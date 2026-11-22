---
id: crew-efpg-401-u01-review_en
title: crew review_en EFPG-401 unit 1
stage: misc
date: 2026-11-22
surface: agent
model: claude
feature: efpg-401
branch: crew/efpg-401-u01-review_en
user: crew
command: crew review_en
labels: ["crew", "claude", "review_en"]
links:
  spec: specs/content/efpg-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efpg-401/crew-efpg-401-u01-review_en.misc.prompt.md
 - specs/content/efpg-401/reviews/unit-01/G3/manifest.json
 - specs/content/efpg-401/reviews/unit-01/G3/a0dffa23-4ae1-40fa-aef4-f60697bb4df8.json
 - specs/content/efpg-401/reviews/unit-01/G3/a0dffa23-4ae1-40fa-aef4-f60697bb4df8/summary.md
 - specs/content/efpg-401/reviews/unit-01/G3/a0dffa23-4ae1-40fa-aef4-f60697bb4df8/logs/build-content-status.txt
 - specs/content/efpg-401/reviews/unit-01/G3/a0dffa23-4ae1-40fa-aef4-f60697bb4df8/logs/check-content.txt
 - specs/content/efpg-401/reviews/unit-01/G3/a0dffa23-4ae1-40fa-aef4-f60697bb4df8/logs/check-figure-text-geometry.txt
 - specs/content/efpg-401/reviews/unit-01/G3/a0dffa23-4ae1-40fa-aef4-f60697bb4df8/logs/check:depth-gate.txt
 - specs/content/efpg-401/reviews/unit-01/G3/a0dffa23-4ae1-40fa-aef4-f60697bb4df8/logs/check:docs-sync.txt
 - specs/content/efpg-401/reviews/unit-01/G3/a0dffa23-4ae1-40fa-aef4-f60697bb4df8/logs/check:figures.txt
 - specs/content/efpg-401/reviews/unit-01/G3/a0dffa23-4ae1-40fa-aef4-f60697bb4df8/logs/check:no-answer-keys.txt
 - specs/content/efpg-401/reviews/unit-01/G3/a0dffa23-4ae1-40fa-aef4-f60697bb4df8/logs/check:no-em-dash.txt
 - specs/content/efpg-401/reviews/unit-01/G3/a0dffa23-4ae1-40fa-aef4-f60697bb4df8/logs/render-review.txt
 - specs/content/efpg-401/reviews/unit-01/G3/a0dffa23-4ae1-40fa-aef4-f60697bb4df8/logs/static-accessibility.txt
 - specs/content/efpg-401/reviews/unit-01/G3/a0dffa23-4ae1-40fa-aef4-f60697bb4df8/logs/validate:content.txt
 - specs/content/efpg-401/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efpg-401-u01-review_en

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpg-401-u01-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Act as the INDEPENDENT G3 English reviewer of EFPG-401 Unit 1 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row; write the report JSON directly under specs/content/efpg-401/reviews/unit-01/G3/ (supporting evidence may sit in a subfolder). Never tick G3, never add reviewer initials, never self-sign. For the rendered-page and print evidence, inspect the production build (CI-built from main) and never build or serve the site: if `git diff --quiet "$(cat ~/deploy/deployed-sha)" HEAD -- <this unit's English dir> static/img/figures/efpg-401/unit-01/` exits 0, run `scripts/heavy.sh node scripts/render-inspect.mjs EFPG-401 1 --base https://textbook.com.pk --no-pdf`, record its log and PNGs (stage the folder with `git add --sparse`) as the `render-review` command evidence, and cite the deployed SHA as the rendered input identity. If the diff is not empty, the live site is not your input: record `render-review` as unavailable and name the deployed SHA and HEAD. Changed images can be served stale for up to 30 days, so treat a missing or mismatched asset as unverified, not as a content defect.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFPG-401 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpg-401/`, and `static/img/figures/efpg-401/unit-01/`.

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

Completed an independent advisory G3 English review of EFPG-401 Unit 1 (disposition escalate) with the evidence report, logs, static accessibility evidence and an advisory tracker row.

## Outcome

- Impact: review_en for EFPG-401 Unit 1 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree (all 14 content gates PASS).
- Files: 16 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: independent advisory G3 English review of EFPG-401 Unit 1. Report at specs/content/efpg-401/reviews/unit-01/G3/a0dffa23-4ae1-40fa-aef4-f60697bb4df8.json (disposition escalate), evidence under the same run folder, and an advisory G3 tracker row in specs/content/efpg-401/tasks.md.
- Decisions the team must respect: G3 stays advisory and unticked; no certification, no self-sign, no human initials. Render evidence is unavailable because the production build (SHA f946ee78) predates the unit's placed illustrations and current English bytes (HEAD f17d30e9), and source support is unverified because all six bound reading records are paraphrase notes with title-only anchors.
- Pending / next owner: a separate author repairs the advisory findings (MCQ key balance, four-versus-five reading sub-skills, title-level attribution wording), then a fresh manifest and a new independent reviewer recheck. The crew lead merges when CI is green.
- Notes for the next job on this unit:
  - render-review must stay unavailable until a production deploy contains the current English bytes; do not build or serve locally.
  - The MCQ key is 8/10 B; the reading sub-skill count contradicts fig-U1-6 and the coverage matrix.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS; review-evidence validate PASS (disposition escalate)
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
