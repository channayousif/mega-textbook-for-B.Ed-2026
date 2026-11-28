---
id: crew-efpg-402-u02-review_en
title: crew review_en EFPG-402 unit 2
stage: misc
date: 2026-11-28
surface: agent
model: claude-longcat-2.5
feature: efpg-402
branch: crew/efpg-402-u02-review_en
user: crew
command: crew review_en
labels: ["crew", "claude_crew", "review_en"]
links:
  spec: specs/content/efpg-402/content-spec.md
  ticket: null
  adr: history/adr/0019-independent-agents-for-g3-g5-review.md
  pr: null
files:
  - history/prompts/efpg-402/crew-efpg-402-u02-review_en.misc.prompt.md
  - specs/content/efpg-402/reviews/unit-02/G3/1947560f-ec6d-49d7-86e1-0c8e0c563ccb.json
  - specs/content/efpg-402/reviews/unit-02/G3/1947560f-ec6d-49d7-86e1-0c8e0c563ccb/
tests:
  - npm run check:content (14 content gates, all pass)
  - node scripts/review-evidence.mjs validate (report valid, disposition revise)
  - scripts/heavy.sh node scripts/measure-figure-text.mjs on 40 unit SVGs, exit 0
  - scripts/heavy.sh node scripts/render-inspect.mjs EFPG-402 2 --base https://textbook.com.pk --no-pdf (exit 1 on WebP false positives; A/B/C clean)
---

## Prompt

# Crew job efpg-402-u02-review_en

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpg-402-u02-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Act as the INDEPENDENT G3 English reviewer of EFPG-402 Unit 2 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row; write the report JSON directly under specs/content/efpg-402/reviews/unit-02/G3/ (supporting evidence may sit in a subfolder). Never tick G3, never add reviewer initials, never self-sign. For the rendered-page and print evidence, inspect the production build (CI-built from main) and never build or serve the site: if `git diff --quiet "$(cat ~/deploy/deployed-sha)" HEAD -- <this unit's English dir> static/img/figures/efpg-402/unit-02/` exits 0, run `scripts/heavy.sh node scripts/render-inspect.mjs EFPG-402 2 --base https://textbook.com.pk --no-pdf`, record its log and PNGs (stage the folder with `git add --sparse`) as the `render-review` command evidence, and cite the deployed SHA as the rendered input identity. If the diff is not empty, the live site is not your input: record `render-review` as unavailable and name the deployed SHA and HEAD. Changed images can be served stale for up to 30 days, so treat a missing or mismatched asset as unverified, not as a content defect.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFPG-402 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpg-402/`, and `static/img/figures/efpg-402/unit-02/`.

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

Advisory G3 run 1 of EFPG-402 Unit 2 returns revise. Authority, coverage, readability and pedagogy
pass; all ten MCQ keys were reproduced independently. One blocking source defect: three NCP SLO
wordings are invented and presented in quotation marks (topic-03 worked example, the RRQ 1 model
answer and topic-04), confirmed absent from the full 74-page NCP Science progression-grid PDF.
Assessment fails because the RRQ 7 model answer names "relevance", which is not one of the six
checklist criteria. render-inspect against the production build (deployed SHA matches HEAD for this
unit) is clean on desktop, 360px and A4 print but exits 1 on the five WebP illustrations, so visual
accessibility is unverified. No sign-off, no signature, no tracker change.

## Outcome

- Impact: new input-bound advisory G3 evidence for EFPG-402 Unit 2; G3 remains open.
- Tests: six mandatory deterministic commands exit 0; measure-figure-text 40/40 exit 0; check:content
  14/14 pass; report validates as revise.
- Files: report, prepared manifest, summary, assessment solutions, limitations, advisory row,
  source-check log, hashed command logs and fourteen production render PNGs; this PHR.
- Next prompts: a separate author repairs F1 (invented NCP quotations), F2 (six-aims framing) and
  F3 (RRQ 7 model answer), then a fresh G3 run rechecks the repaired bytes.
- Reflection: render-inspect requests `.svg` variants for every placed figure, so a unit with placed
  WebP illustrations always exits 1 even when the rendered pages are clean; the A/B/C sections are
  the usable evidence and the exit code must still be reported honestly.

## Handoff (for CEO and agents)

- Shipped / changed: advisory G3 run 1 of EFPG-402 Unit 2 at HEAD e29224ece, rendered input deployed
  SHA 00ac8dbb5ee318db7387243e2b3b92aed650ae8c (matches HEAD for the unit's English dir and figures).
- Decisions the team must respect: G3 remains open and unsigned. No content, tracker, registry,
  translation-status or publication change. The advisory tracker row is a proposal only.
- Pending / next owner: content repair of F1-F3 by an author job; then a fresh independent G3 run.
  Advisories F5-F8 can be folded into the same repair.
- Issues affected: crew job efpg-402-u02-review_en; no issue ID supplied.

## Evaluation notes (flywheel)

- Failure modes observed: render-inspect WebP-as-SVG false positives; NCP SLO wording invented in
  quotation marks; a model answer naming a criterion outside the taught checklist.
- Graders run and results (PASS/FAIL): PASS deterministic commands; PASS report validation; REVISE
  semantic review.
- Prompt variant (if applicable): crew brief v1.
- Next experiment (smallest change to try): teach render-inspect to skip non-SVG figure kinds in
  section D so units with placed illustrations can produce a clean exit code.
