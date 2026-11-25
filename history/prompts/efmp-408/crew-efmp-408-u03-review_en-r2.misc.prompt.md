---
id: crew-efmp-408-u03-review_en-r2
title: crew review_en EFMP-408 unit 3 (cycle 2)
stage: misc
date: 2026-11-26
surface: agent
model: LongCat-2.5
feature: efmp-408
branch: crew/efmp-408-u03-review_en-r1
user: crew
command: crew review_en
labels: ["crew", "claude", "review_en"]
links:
  spec: specs/content/efmp-408/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/efmp-408/reviews/unit-03/G3/crew-efmp-408-u03-review_en-r2.json
 - specs/content/efmp-408/reviews/unit-03/G3/crew-efmp-408-u03-review_en-r2/manifest.json
 - specs/content/efmp-408/reviews/unit-03/G3/crew-efmp-408-u03-review_en-r2/summary.md
 - specs/content/efmp-408/reviews/unit-03/G3/crew-efmp-408-u03-review_en-r2/limitations.md
 - specs/content/efmp-408/reviews/unit-03/G3/crew-efmp-408-u03-review_en-r2/assessment-solutions.md
 - specs/content/efmp-408/reviews/unit-03/G3/crew-efmp-408-u03-review_en-r2/source-verification.md
 - specs/content/efmp-408/reviews/unit-03/G3/crew-efmp-408-u03-review_en-r2/advisory-tracker-row.md
 - specs/content/efmp-408/reviews/unit-03/G3/crew-efmp-408-u03-review_en-r2/logs/build-content-status.txt
 - specs/content/efmp-408/reviews/unit-03/G3/crew-efmp-408-u03-review_en-r2/logs/check-bloom-bands.txt
 - specs/content/efmp-408/reviews/unit-03/G3/crew-efmp-408-u03-review_en-r2/logs/check-concept-graph.txt
 - specs/content/efmp-408/reviews/unit-03/G3/crew-efmp-408-u03-review_en-r2/logs/check-content.txt
 - specs/content/efmp-408/reviews/unit-03/G3/crew-efmp-408-u03-review_en-r2/logs/check-docs-sync.txt
 - specs/content/efmp-408/reviews/unit-03/G3/crew-efmp-408-u03-review_en-r2/logs/check-figures.txt
 - specs/content/efmp-408/reviews/unit-03/G3/crew-efmp-408-u03-review_en-r2/logs/check-no-answer-keys.txt
 - specs/content/efmp-408/reviews/unit-03/G3/crew-efmp-408-u03-review_en-r2/logs/check-no-em-dash.txt
 - specs/content/efmp-408/reviews/unit-03/G3/crew-efmp-408-u03-review_en-r2/logs/check-svg-style.txt
 - specs/content/efmp-408/reviews/unit-03/G3/crew-efmp-408-u03-review_en-r2/logs/checkdepth-gate.txt
 - specs/content/efmp-408/reviews/unit-03/G3/crew-efmp-408-u03-review_en-r2/logs/input-verification.txt
 - specs/content/efmp-408/reviews/unit-03/G3/crew-efmp-408-u03-review_en-r2/logs/measure-figure-text.txt
 - specs/content/efmp-408/reviews/unit-03/G3/crew-efmp-408-u03-review_en-r2/logs/render-review.txt
 - specs/content/efmp-408/reviews/unit-03/G3/crew-efmp-408-u03-review_en-r2/logs/report-validation.txt
 - specs/content/efmp-408/reviews/unit-03/G3/crew-efmp-408-u03-review_en-r2/logs/validatecontent.txt
 - history/prompts/efmp-408/crew-efmp-408-u03-review_en-r2.misc.prompt.md
tests:
 - npm run check:content
 - node scripts/review-evidence.mjs validate specs/content/efmp-408/reviews/unit-03/G3/crew-efmp-408-u03-review_en-r2/crew-efmp-408-u03-review_en-r2.json
---

## Prompt

# Crew job efmp-408-u03-review_en-r1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-408-u03-review_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Act as the INDEPENDENT G3 English reviewer of EFMP-408 Unit 3 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row; write the report JSON directly under specs/content/efmp-408/reviews/unit-03/G3/ (supporting evidence may sit in a subfolder). Never tick G3, never add reviewer initials, never self-sign. For the rendered-page and print evidence, inspect the production build (CI-built from main) and never build or serve the site: if `git diff --quiet "$(cat ~/deploy/deployed-sha)" HEAD -- <this unit's English dir> static/img/figures/efmp-408/unit-03/` exits 0, run `scripts/heavy.sh node scripts/render-inspect.mjs EFMP-408 3 --base https://textbook.com.pk --no-pdf`, record its log and PNGs (stage the folder with `git add --sparse`) as the `render-review` command evidence, and cite the deployed SHA as the rendered input identity. If the diff is not empty, the live site is not your input: record `render-review` as unavailable and name the deployed SHA and HEAD. Changed images can be served stale for up to 30 days, so treat a missing or mismatched asset as unverified, not as a content defect. This is the second and last review cycle (ADR-0019): repairs were applied for the latest report under the unit's reviews/.../G3/ folder. Verify each of its findings against the current files, carry any that remain unresolved, and give a new name to your report.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-408 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-408/`, and `static/img/figures/efmp-408/unit-03/`.

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

Added the EFMP-408 Unit 3 cycle-2 G3 English advisory escalate report. Every cycle-1 content
finding (A-1 to A-4, S-1 to S-3, R-1) was verified closed against the current bytes; R-2
(glossary entries) remains advisory and the render is unavailable because the deployed SHA is
not the reviewed input and the brief forbids building or serving the site. The report carries 21
hashed evidence files, an advisory tracker row file is provided for the host, and the report
validates. `npm run check:content` passes on HEAD (origin/main).

## Outcome

- Impact: review_en for EFMP-408 Unit 3 by claude (attempt 2, final cycle under ADR-0019).
- Tests: `npm run check:content` passed in the job worktree after the review files were written; `node scripts/review-evidence.mjs validate ...r2.json` passed.
- Files: 23 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Added the EFMP-408 Unit 3 cycle-2 G3 English advisory escalate report at `specs/content/efmp-408/reviews/unit-03/G3/crew-efmp-408-u03-review_en-r2.json` with 21 hashed evidence files, plus `advisory-tracker-row.md` for the host to append (the reviewer does not edit the tracker).
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this job certifies nothing and marks no gate done. The report disposition is `escalate`, not `pass`, so it cannot support `review:` or `provisional:`.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path). A separate permitted render job must inspect the live pages once the deploy reaches HEAD; a fresh independent G3 rechecks after a new bundle.
- Notes for the next job on this unit:
  - render-review is unavailable: deployed SHA `7fb77de68f5d59bbc507e85c07a892a3cbf93eca` differs from HEAD `467e2a0876a783e4c8649e4aad7f476f0ccf330a` on `topic-01.mdx`, `topic-02.mdx`, `topic-03.mdx`, `topic-04.mdx` and `unit-assessment.mdx`. A later permitted render job should confirm the live pages once the deploy catches up.
  - All cycle-1 content findings are closed: MCQ 10 rebuilt so "an" cues the keyed vowel-initial option Amri with a correct rationale; RRQ 1/7/9 raised to Understand; the formative bank is 12 (3 per topic) and the Analyze formative item is gone; the weightage criteria and 30/40/30 split are marked author synthesis; the handwriting claim is softened and tied to the halo effect; the AKU-EB/Sindh HEC and HEC/AKU-EB attributions are restated as general professional practice; Further reading link text is descriptive in EN and UR.
  - Two minor advisories remain: the unit key terms still have no `glossary.json` entry (outside unit scope); and ERQ 4 criterion 1 prints 18 marks as 35% and 12 marks as 25% (presentational only).
  - The report is advisory and unsigned; do not treat the tracker row's agent identity as a certification.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS; review-evidence validate PASS
- Prompt variant (if applicable): crew brief v1, cycle 2
- Next experiment (smallest change to try): none
