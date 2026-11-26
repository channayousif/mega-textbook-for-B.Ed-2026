---
id: crew-geng-301-u04-review_en-r1
title: crew review_en GENG-301 unit 4
stage: misc
date: 2026-11-26
surface: agent
model: claude_crew
feature: geng-301
branch: crew/geng-301-u04-review_en-r1
user: crew
command: crew review_en
labels: ["crew", "claude_crew", "review_en"]
links:
  spec: specs/content/geng-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/geng-301/crew-geng-301-u04-review_en-r2.misc.prompt.md
 - specs/content/geng-301/reviews/unit-04/G3/crew-geng-301-u04-review_en-r2.json
 - specs/content/geng-301/reviews/unit-04/G3/crew-geng-301-u04-review_en-r2/advisory-tracker-row.md
 - specs/content/geng-301/reviews/unit-04/G3/crew-geng-301-u04-review_en-r2/assessment-solutions.md
 - specs/content/geng-301/reviews/unit-04/G3/crew-geng-301-u04-review_en-r2/limitations.md
 - specs/content/geng-301/reviews/unit-04/G3/crew-geng-301-u04-review_en-r2/logs/build-content-status.txt
 - specs/content/geng-301/reviews/unit-04/G3/crew-geng-301-u04-review_en-r2/logs/check-bloom-bands.txt
 - specs/content/geng-301/reviews/unit-04/G3/crew-geng-301-u04-review_en-r2/logs/check-concept-graph.txt
 - specs/content/geng-301/reviews/unit-04/G3/crew-geng-301-u04-review_en-r2/logs/check-content.txt
 - specs/content/geng-301/reviews/unit-04/G3/crew-geng-301-u04-review_en-r2/logs/check-depth-gate.txt
 - specs/content/geng-301/reviews/unit-04/G3/crew-geng-301-u04-review_en-r2/logs/check-docs-sync.txt
 - specs/content/geng-301/reviews/unit-04/G3/crew-geng-301-u04-review_en-r2/logs/check-figures.txt
 - specs/content/geng-301/reviews/unit-04/G3/crew-geng-301-u04-review_en-r2/logs/check-licence.txt
 - specs/content/geng-301/reviews/unit-04/G3/crew-geng-301-u04-review_en-r2/logs/check-no-answer-keys.txt
 - specs/content/geng-301/reviews/unit-04/G3/crew-geng-301-u04-review_en-r2/logs/check-no-em-dash.txt
 - specs/content/geng-301/reviews/unit-04/G3/crew-geng-301-u04-review_en-r2/logs/check-pipeline-gate.txt
 - specs/content/geng-301/reviews/unit-04/G3/crew-geng-301-u04-review_en-r2/logs/check-source-floor.txt
 - specs/content/geng-301/reviews/unit-04/G3/crew-geng-301-u04-review_en-r2/logs/check-svg-style.txt
 - specs/content/geng-301/reviews/unit-04/G3/crew-geng-301-u04-review_en-r2/logs/input-verification.txt
 - specs/content/geng-301/reviews/unit-04/G3/crew-geng-301-u04-review_en-r2/logs/measure-figure-text.txt
 - specs/content/geng-301/reviews/unit-04/G3/crew-geng-301-u04-review_en-r2/logs/render-review.txt
 - specs/content/geng-301/reviews/unit-04/G3/crew-geng-301-u04-review_en-r2/logs/validate-content.txt
 - specs/content/geng-301/reviews/unit-04/G3/crew-geng-301-u04-review_en-r2/make-report.mjs
 - specs/content/geng-301/reviews/unit-04/G3/crew-geng-301-u04-review_en-r2/manifest.json
tests:
 - npm run check:content
---

## Prompt

# Crew job geng-301-u04-review_en-r1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-301-u04-review_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Act as the INDEPENDENT G3 English reviewer of GENG-301 Unit 4 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row; write the report JSON directly under specs/content/geng-301/reviews/unit-04/G3/ (supporting evidence may sit in a subfolder). Never tick G3, never add reviewer initials, never self-sign. For the rendered-page and print evidence, inspect the production build (CI-built from main) and never build or serve the site: if `git diff --quiet "$(cat ~/deploy/deployed-sha)" HEAD -- <this unit's English dir> static/img/figures/geng-301/unit-04/` exits 0, run `scripts/heavy.sh node scripts/render-inspect.mjs GENG-301 4 --base https://textbook.com.pk --no-pdf`, record its log and PNGs (stage the folder with `git add --sparse`) as the `render-review` command evidence, and cite the deployed SHA as the rendered input identity. If the diff is not empty, the live site is not your input: record `render-review` as unavailable and name the deployed SHA and HEAD. Changed images can be served stale for up to 30 days, so treat a missing or mismatched asset as unverified, not as a content defect. This is the second and last review cycle (ADR-0019): repairs were applied for the latest report under the unit's reviews/.../G3/ folder. Verify each of its findings against the current files, carry any that remain unresolved, and give a new name to your report.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GENG-301 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/geng-301/`, and `static/img/figures/geng-301/unit-04/`.

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

Added the validated G3 cycle-2 advisory escalation report for GENG-301 Unit 4 with its hashed evidence bundle, assessment solve, limitations and advisory tracker row, verifying the wordmark fix closed and recording two new blocking findings (incomplete unverifiable-sources declaration, RRQ 9 mark-scheme arithmetic) plus the unavailable render evidence.

## Outcome

- Impact: review_en for GENG-301 Unit 4 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 24 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Added the validated G3 cycle-2 advisory escalation report for GENG-301 Unit 4 with its hashed evidence bundle, assessment solve, limitations and advisory tracker row, verifying the wordmark fix closed and recording two new blocking findings (incomplete unverifiable-sources declaration, RRQ 9 mark-scheme arithmetic) plus the unavailable render evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The advisory tracker row is written to `advisory-tracker-row.md`, not to `tasks.md` (appending it would make the unticked row authoritative and reopen the owner-signed G3 row); the parent must append it deliberately.
  - Both blocking repairs are content edits (sources declaration, RRQ 9 mark scheme), and this is the final ADR-0019 cycle, so they need the owner's authorisation before a further cycle.
  - Rendered/print evidence needs the repaired commit deployed first (or an owner-run build); a fresh G3 run on unchanged input is prohibited.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
