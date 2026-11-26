---
id: crew-gent-401-u06-review_en
title: crew review_en GENT-401 unit 6
stage: misc
date: 2026-11-26
surface: agent
model: claude_crew
feature: gent-401
branch: crew/gent-401-u06-review_en
user: crew
command: crew review_en
labels: ["crew", "claude_crew", "review_en"]
links:
  spec: specs/content/gent-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gent-401/crew-gent-401-u06-review_en.green.prompt.md
 - specs/content/gent-401/reviews/unit-06/G3/crew-gent-401-u06-review_en-r1/crew-gent-401-u06-review_en-r1.json
 - specs/content/gent-401/reviews/unit-06/G3/crew-gent-401-u06-review_en-r1/logs-20261126T220359677Z/build-content-status.txt
 - specs/content/gent-401/reviews/unit-06/G3/crew-gent-401-u06-review_en-r1/logs-20261126T220359677Z/check-content.txt
 - specs/content/gent-401/reviews/unit-06/G3/crew-gent-401-u06-review_en-r1/logs-20261126T220359677Z/check:bloom-bands.txt
 - specs/content/gent-401/reviews/unit-06/G3/crew-gent-401-u06-review_en-r1/logs-20261126T220359677Z/check:concept-graph.txt
 - specs/content/gent-401/reviews/unit-06/G3/crew-gent-401-u06-review_en-r1/logs-20261126T220359677Z/check:depth-gate.txt
 - specs/content/gent-401/reviews/unit-06/G3/crew-gent-401-u06-review_en-r1/logs-20261126T220359677Z/check:docs-sync.txt
 - specs/content/gent-401/reviews/unit-06/G3/crew-gent-401-u06-review_en-r1/logs-20261126T220359677Z/check:figures.txt
 - specs/content/gent-401/reviews/unit-06/G3/crew-gent-401-u06-review_en-r1/logs-20261126T220359677Z/check:no-answer-keys.txt
 - specs/content/gent-401/reviews/unit-06/G3/crew-gent-401-u06-review_en-r1/logs-20261126T220359677Z/check:no-em-dash.txt
 - specs/content/gent-401/reviews/unit-06/G3/crew-gent-401-u06-review_en-r1/logs-20261126T220359677Z/figure-inspection.txt
 - specs/content/gent-401/reviews/unit-06/G3/crew-gent-401-u06-review_en-r1/logs-20261126T220359677Z/measure-figure-text.txt
 - specs/content/gent-401/reviews/unit-06/G3/crew-gent-401-u06-review_en-r1/logs-20261126T220359677Z/render-review-unavailable.txt
 - specs/content/gent-401/reviews/unit-06/G3/crew-gent-401-u06-review_en-r1/logs-20261126T220359677Z/validate:content.txt
 - specs/content/gent-401/reviews/unit-06/G3/crew-gent-401-u06-review_en-r1/manifest.json
 - specs/content/gent-401/reviews/unit-06/G3/crew-gent-401-u06-review_en-r1/summary.md
 - specs/content/gent-401/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gent-401-u06-review_en

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gent-401-u06-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Act as the INDEPENDENT G3 English reviewer of GENT-401 Unit 6 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row; write the report JSON directly under specs/content/gent-401/reviews/unit-06/G3/ (supporting evidence may sit in a subfolder). Never tick G3, never add reviewer initials, never self-sign. For the rendered-page and print evidence, inspect the production build (CI-built from main) and never build or serve the site: if `git diff --quiet "$(cat ~/deploy/deployed-sha)" HEAD -- <this unit's English dir> static/img/figures/gent-401/unit-06/` exits 0, run `scripts/heavy.sh node scripts/render-inspect.mjs GENT-401 6 --base https://textbook.com.pk --no-pdf`, record its log and PNGs (stage the folder with `git add --sparse`) as the `render-review` command evidence, and cite the deployed SHA as the rendered input identity. If the diff is not empty, the live site is not your input: record `render-review` as unavailable and name the deployed SHA and HEAD. Changed images can be served stale for up to 30 days, so treat a missing or mismatched asset as unverified, not as a content defect.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GENT-401 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gent-401/`, and `static/img/figures/gent-401/unit-06/`.

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

Added the independent advisory G3 English review of GENT-401 Unit 6 (escalate, 8 findings, evidence logs and manifest) plus the advisory tracker row and PHR, with all content gates passing and no unit prose changed.

## Outcome

- Impact: review_en for GENT-401 Unit 6 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 18 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Added the independent advisory G3 English review of GENT-401 Unit 6 (escalate, 8 findings, evidence logs and manifest) plus the advisory tracker row and PHR, with all content gates passing and no unit prose changed.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 is advisory escalate and unsigned; the next author repair should fix F1-F8, then a fresh G3 run needs a renderable input (deployed SHA must equal HEAD for `docs/semester-4/gent-401/unit-06/` and `static/img/figures/gent-401/unit-06/`).
  - `check:bloom-bands` does not read per-topic `## Check your understanding` items and `check:concept-graph` does not judge mapping semantics, so F1/F2 pass the gates; verify fixes by reading, not by the gate.
  - Live SECP/IPO pages were unreachable (403 / TLS failure), so source support was judged against `specs/content/gent-401/sources/texts/`; F4/F5 would need a new bound note or a softened claim.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
