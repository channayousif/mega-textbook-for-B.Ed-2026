---
id: 559
title: GCCE400 Unit4 G3 first review
stage: general
date: 2026-11-24
surface: agent
model: claude-opus-5-5
feature: none
branch: crew/gcce-400-u04-review_en
user: owner via crew brief
command: crew gcce-400-u04-review_en
labels: [claude, crew, g3-review]
links:
  spec: specs/014-agent-review-governance/spec.md
  ticket: null
  adr: history/adr/0019-independent-agents-for-g3-g5-review.md
  pr: null
files:
  - specs/content/gcce-400/reviews/unit-04/G3/crew-run1-20261124.json
  - specs/content/gcce-400/reviews/unit-04/G3/crew-run1-20261124/
  - specs/content/gcce-400/tasks.md
  - history/prompts/general/559-gcce400-unit-four-g3-run1.general.prompt.md
tests:
  - Six mandatory deterministic review commands, all exit 0
  - render-inspect against https://textbook.com.pk (deployed SHA identical for unit inputs), exit 1 on three lazy SVGs
  - node scripts/measure-figure-text.mjs on 20 unit SVGs, exit 0
  - node scripts/review-evidence.mjs validate, revise report valid
  - npm run check:content
---

## Prompt

# Crew job gcce-400-u04-review_en

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gcce-400-u04-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Act as the INDEPENDENT G3 English reviewer of GCCE-400 Unit 4 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row; write the report JSON directly under specs/content/gcce-400/reviews/unit-04/G3/ (supporting evidence may sit in a subfolder). Never tick G3, never add reviewer initials, never self-sign. For the rendered-page and print evidence, inspect the production build (CI-built from main) and never build or serve the site: if `git diff --quiet "$(cat ~/deploy/deployed-sha)" HEAD -- <this unit's English dir> static/img/figures/gcce-400/unit-04/` exits 0, run `scripts/heavy.sh node scripts/render-inspect.mjs GCCE-400 4 --base https://textbook.com.pk --no-pdf`, record its log and PNGs (stage the folder with `git add --sparse`) as the `render-review` command evidence, and cite the deployed SHA as the rendered input identity. If the diff is not empty, the live site is not your input: record `render-review` as unavailable and name the deployed SHA and HEAD. Changed images can be served stale for up to 30 days, so treat a missing or mismatched asset as unverified, not as a content defect.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GCCE-400 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gcce-400/`, and `static/img/figures/gcce-400/unit-04/`.

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

Advisory G3 run 1 of GCCE-400 Unit 4 returns revise. Sources, coverage, readability and
pedagogy pass; all ten MCQ keys were reproduced independently; Articles 16, 19 and 25 were
re-read in the current transcription and are unchanged by the 26th and 27th Amendments.
One blocking defect: the Topic 4.2 IAP2 table's Collaborate example implies a joint
decision and the unit never teaches that the agency still decides at Involve and
Collaborate, yet the RRQ 6 model answer requires that point. No sign-off, no signature.

## Outcome

- Impact: New input-bound advisory G3 evidence and an append-only open tracker row.
- Tests: Six mandatory checks exit 0; figure text measurement exits 0; report validates as revise.
- Files: Report, prepared manifest, summary, assessment solutions, limitations, source-check
  excerpts, advisory row, hashed logs and production render PNGs; one tracker row; this PHR.
- Next prompts: A separate author repairs F1 (Topic 4.2 Collaborate example plus one sentence,
  or RRQ 6 model answer), then a fresh G3 run (cycle 2 of 2).
- Reflection: render-inspect reports lazy below-the-fold SVGs as not loaded; curl plus cmp of the
  served bytes separates a stale or missing asset from an inspector artefact.

## Handoff (for CEO and agents)

- Shipped / changed: Advisory G3 run 1 of GCCE-400 Unit 4 at HEAD 9502097ff, rendered input
  deployed SHA 98fbbb064.
- Decisions the team must respect: G3 remains open. No signature, acceptance, registry edit,
  content edit or publication change. The brief authorises the advisory tracker row.
- Pending / next owner: Content repair of F1 by an author job; optional advisories F3-F6; a rerun
  of render-inspect that scrolls fig-U4-2, fig-U4-4 and fig-U4-5 into view.
- Issues affected: gcce-400-u04-review_en crew job; no issue ID supplied.

## Evaluation notes (flywheel)

- Failure modes observed: render-inspect lazy-image false positives on three figures.
- Graders run and results (PASS/FAIL): PASS deterministic commands; PASS report validation; REVISE semantic review.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): have render-inspect scroll each figure into view before measuring natural size.
