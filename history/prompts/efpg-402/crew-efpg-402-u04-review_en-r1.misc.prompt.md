---
id: crew-efpg-402-u04-review_en-r1
title: crew review_en EFPG-402 unit 4 run 2 (final G3 cycle)
stage: misc
date: 2026-11-28
surface: agent
model: claude_crew
feature: efpg-402
branch: crew/efpg-402-u04-review_en-r1
user: crew
command: crew review_en
labels: ["crew", "claude_crew", "review_en"]
links:
  spec: specs/content/efpg-402/content-spec.md
  ticket: null
  adr: history/adr/0019-independent-agents-for-g3-g5-review.md
  pr: null
files:
 - history/prompts/efpg-402/crew-efpg-402-u04-review_en-r1.misc.prompt.md
 - specs/content/efpg-402/reviews/unit-04/G3/75270cdd-f889-4ee3-bf95-5b1b88039d3a.json
 - specs/content/efpg-402/reviews/unit-04/G3/75270cdd-f889-4ee3-bf95-5b1b88039d3a/advisory-tracker-row.md
 - specs/content/efpg-402/reviews/unit-04/G3/75270cdd-f889-4ee3-bf95-5b1b88039d3a/assessment-solutions.md
 - specs/content/efpg-402/reviews/unit-04/G3/75270cdd-f889-4ee3-bf95-5b1b88039d3a/limitations.md
 - specs/content/efpg-402/reviews/unit-04/G3/75270cdd-f889-4ee3-bf95-5b1b88039d3a/make-report.mjs
 - specs/content/efpg-402/reviews/unit-04/G3/75270cdd-f889-4ee3-bf95-5b1b88039d3a/manifest.json
 - specs/content/efpg-402/reviews/unit-04/G3/75270cdd-f889-4ee3-bf95-5b1b88039d3a/prior-findings.md
 - specs/content/efpg-402/reviews/unit-04/G3/75270cdd-f889-4ee3-bf95-5b1b88039d3a/summary.md
 - specs/content/efpg-402/reviews/unit-04/G3/75270cdd-f889-4ee3-bf95-5b1b88039d3a/logs/build-content-status.log
 - specs/content/efpg-402/reviews/unit-04/G3/75270cdd-f889-4ee3-bf95-5b1b88039d3a/logs/check-content.log
 - specs/content/efpg-402/reviews/unit-04/G3/75270cdd-f889-4ee3-bf95-5b1b88039d3a/logs/check:depth-gate.log
 - specs/content/efpg-402/reviews/unit-04/G3/75270cdd-f889-4ee3-bf95-5b1b88039d3a/logs/check:docs-sync.log
 - specs/content/efpg-402/reviews/unit-04/G3/75270cdd-f889-4ee3-bf95-5b1b88039d3a/logs/check:figures.log
 - specs/content/efpg-402/reviews/unit-04/G3/75270cdd-f889-4ee3-bf95-5b1b88039d3a/logs/check:no-answer-keys.log
 - specs/content/efpg-402/reviews/unit-04/G3/75270cdd-f889-4ee3-bf95-5b1b88039d3a/logs/check:no-em-dash.log
 - specs/content/efpg-402/reviews/unit-04/G3/75270cdd-f889-4ee3-bf95-5b1b88039d3a/logs/measure-figure-text.log
 - specs/content/efpg-402/reviews/unit-04/G3/75270cdd-f889-4ee3-bf95-5b1b88039d3a/logs/render-review.txt
 - specs/content/efpg-402/reviews/unit-04/G3/75270cdd-f889-4ee3-bf95-5b1b88039d3a/logs/validate:content.log
 - specs/content/efpg-402/reviews/unit-04/G3/75270cdd-f889-4ee3-bf95-5b1b88039d3a/source-checks/khan-2019-low-cost.txt
 - specs/content/efpg-402/reviews/unit-04/G3/75270cdd-f889-4ee3-bf95-5b1b88039d3a/source-checks/ncp-science-2022-grade-check.txt
tests:
 - npm run check:content
 - node scripts/review-evidence.mjs validate specs/content/efpg-402/reviews/unit-04/G3/75270cdd-f889-4ee3-bf95-5b1b88039d3a.json
 - scripts/heavy.sh node scripts/measure-figure-text.mjs static/img/figures/efpg-402/unit-04/*.svg
---

## Prompt

# Crew job efpg-402-u04-review_en-r1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpg-402-u04-review_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Act as the INDEPENDENT G3 English reviewer of EFPG-402 Unit 4 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row; write the report JSON directly under specs/content/efpg-402/reviews/unit-04/G3/ (supporting evidence may sit in a subfolder). Never tick G3, never add reviewer initials, never self-sign. For the rendered-page and print evidence, inspect the production build (CI-built from main) and never build or serve the site: if `git diff --quiet "$(cat ~/deploy/deployed-sha)" HEAD -- <this unit's English dir> static/img/figures/efpg-402/unit-04/` exits 0, run `scripts/heavy.sh node scripts/render-inspect.mjs EFPG-402 4 --base https://textbook.com.pk --no-pdf`, record its log and PNGs (stage the folder with `git add --sparse`) as the `render-review` command evidence, and cite the deployed SHA as the rendered input identity. If the diff is not empty, the live site is not your input: record `render-review` as unavailable and name the deployed SHA and HEAD. Changed images can be served stale for up to 30 days, so treat a missing or mismatched asset as unverified, not as a content defect. This is the second and last review cycle (ADR-0019): repairs were applied for the latest report under the unit's reviews/.../G3/ folder. Verify each of its findings against the current files, carry any that remain unresolved, and give a new name to your report.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFPG-402 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpg-402/`, and `static/img/figures/efpg-402/unit-04/`.

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

Added the validated advisory G3 English review of EFPG-402 Unit 4, run 2 (final cycle), disposition `escalate`, report `75270cdd-f889-4ee3-bf95-5b1b88039d3a.json`, with its evidence bundle, independent NCP and Khan source checks, assessment solve, render-unavailable record and advisory tracker row, committed on `crew/efpg-402-u04-review_en-r1`.

## Outcome

- ✅ Impact: review_en for EFPG-402 Unit 4 by claude_crew (attempt 2, final ADR-0019 cycle).
- 🧪 Tests: `npm run check:content` passed (all 14 content gates); `node scripts/review-evidence.mjs validate` passed; `measure-figure-text` exit 0 on all 40 SVGs.
- 📁 Files: 21 file(s), listed above.
- 🔁 Next prompts: the crew planner derives the unit's next stage from main after merge.
- 🧠 Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Added the validated advisory G3 English review of EFPG-402 Unit 4 run 2 (disposition `escalate`, report `75270cdd-f889-4ee3-bf95-5b1b88039d3a.json`) with its evidence bundle, independent NCP and Khan source checks, assessment solve, render-unavailable record and advisory tracker row, committed on `crew/efpg-402-u04-review_en-r1`.
- Decisions the team must respect: all three run-1 blocking findings are verified resolved (Dale cone aligned to four levels across topic-01, fig-U4-2 and RRQ 2; ERQ 3 now Grade 5 SLO S-05-B-16; every NCP grade reference re-verified against the retrieved progression grid). G3/G5 stay advisory until a qualified sign-off; this job does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the job touches a protected path). A machine pass needs a fresh render inspection of the current bytes after HEAD is deployed, or an authorised local render.
- Notes for the next job on this unit:
  - Report `specs/content/efpg-402/reviews/unit-04/G3/75270cdd-f889-4ee3-bf95-5b1b88039d3a.json`, disposition `escalate`; the only blocker is `render-review` unavailable because deployed SHA `b7b7e00c9a8640158b8d336ba1215e4fcfed01e9` differs from HEAD `b2dc2715255b31026bf257e58e451ecbf983d001` on eight unit files. Once HEAD is deployed and the diff is quiet, a fresh render can close accessibility without content changes.
  - Carried advisories: content-spec.md:307 fig-U4-9 plan wording ("museum" vs delivered "Pottery / Brick Kiln"); figure-manifest prompts for fig-U4-14 (Grade 5) and fig-U4-15 (Grade 8) still carry pre-repair grades while the prose is Grade 7; fig-U4-6 retains "electrical conductivity" (not an NCP SLO phrase); MCQ 6 retains a Grade 5 teacher scenario for a Grade 7 mechanism.
  - `khan-2019-low-cost` is now bound at `specs/content/efpg-402/sources/texts/khan-2019-low-cost.md` and no longer declared unverifiable; the repaired topic-03 wording ("active engagement") matches the retrieved article.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS; review-evidence validate PASS; measure-figure-text PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
