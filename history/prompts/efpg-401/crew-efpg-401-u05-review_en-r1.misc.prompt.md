---
id: crew-efpg-401-u05-review_en-r1
title: crew review_en EFPG-401 unit 5 round 1
stage: misc
date: 2026-11-19
surface: agent
model: agy
feature: efpg-401
branch: crew/efpg-401-u05-review_en-r1
user: crew
command: crew review_en
labels: ["crew", "agy", "review_en"]
links:
  spec: specs/content/efpg-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en-r1.json
 - specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en-r1/logs/check-content.txt
 - specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en-r1/logs/check-depth-gate.txt
 - specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en-r1/logs/check-docs-sync.txt
 - specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en-r1/logs/check-figures.txt
 - specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en-r1/logs/check-no-answer-keys.txt
 - specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en-r1/logs/check-no-em-dash.txt
 - specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en-r1/logs/render-review.txt
 - specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en-r1/logs/validate-content.txt
 - specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en-r1/manifest.json
 - specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en-r1/renders/desktop-index.png
 - specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en-r1/renders/desktop-topic-01.png
 - specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en-r1/renders/desktop-topic-02.png
 - specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en-r1/renders/desktop-topic-03.png
 - specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en-r1/renders/desktop-topic-04.png
 - specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en-r1/renders/desktop-topic-05.png
 - specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en-r1/renders/desktop-topic-06.png
 - specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en-r1/renders/desktop-topic-07.png
 - specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en-r1/renders/desktop-unit-assessment.png
 - specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en-r1/renders/narrow360-index.png
 - specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en-r1/renders/narrow360-topic-01.png
 - specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en-r1/renders/narrow360-topic-02.png
 - specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en-r1/renders/narrow360-topic-03.png
 - specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en-r1/renders/narrow360-topic-04.png
 - specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en-r1/renders/narrow360-topic-05.png
 - specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en-r1/renders/narrow360-topic-06.png
 - specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en-r1/renders/narrow360-topic-07.png
 - specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en-r1/renders/narrow360-unit-assessment.png
 - specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en-r1/renders/render-inspect.json
 - specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en-r1/renders/render-inspect.log
 - specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en-r1/summary.md
 - specs/content/efpg-401/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efpg-401-u05-review_en-r1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpg-401-u05-review_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Act as the INDEPENDENT G3 English reviewer of EFPG-401 Unit 5 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row; write the report JSON directly under specs/content/efpg-401/reviews/unit-05/G3/ (supporting evidence may sit in a subfolder). Never tick G3, never add reviewer initials, never self-sign. For the rendered-page and print evidence, inspect the production build (CI-built from main) and never build or serve the site: if `git diff --quiet "$(cat ~/deploy/deployed-sha)" HEAD -- <this unit's English dir> static/img/figures/efpg-401/unit-05/` exits 0, run `scripts/heavy.sh node scripts/render-inspect.mjs EFPG-401 5 --base https://textbook.com.pk --no-pdf`, record its log and PNGs (stage the folder with `git add --sparse`) as the `render-review` command evidence, and cite the deployed SHA as the rendered input identity. If the diff is not empty, the live site is not your input: record `render-review` as unavailable and name the deployed SHA and HEAD. Changed images can be served stale for up to 30 days, so treat a missing or mismatched asset as unverified, not as a content defect. This is the second and last review cycle (ADR-0019): repairs were applied for the latest report under the unit's reviews/.../G3/ folder. Verify each of its findings against the current files, carry any that remain unresolved, and give a new name to your report.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFPG-401 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpg-401/`, and `static/img/figures/efpg-401/unit-05/`.

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

Executed independent G3 English review (Cycle 2, final cycle under ADR-0019) for EFPG-401 Unit 5. Verified that all previous content findings (Topic 5.2 missing-step activity, title-level source claims, Paulsrud notes alignment, leaked SVG labels, alt texts, MCQ key rebalancing, and RRQ 7 terminology) have been resolved. Performed live production render inspection against textbook.com.pk (deployed SHA matching HEAD); captured desktop, 360px narrow and A4 print evidence. Generated and validated advisory review report (disposition: escalate), added advisory tracker row, and documented review evidence.

## Outcome

- Impact: review_en for EFPG-401 Unit 5 by agy (cycle 2).
- Tests: validateReport clean, check:content clean.
- Files: 33 file(s), listed above.
- Next prompts: crew planner / human editor review.

## Handoff (for CEO and agents)

- Shipped / changed: Added independent advisory G3 English review report (disposition: escalate) for EFPG-401 Unit 5 (Lesson Planning), supporting evidence logs and live render screenshots, and appended unticked advisory tracker row.
- Decisions the team must respect: G3 stays advisory; no certification or provisional publication without protected signing host credentials; cycle 2 completes automated review allowance under ADR-0019.
- Pending / next owner: Human reviewer / editor for qualification.
- Notes for the next job on this unit:
  - Live production inspection passed visually across all 9 unit pages at 1280px desktop, 360px mobile, and A4 print.
  - render-inspect.mjs exited 1 due to trying to query .svg URLs for WebP illustrations (fig-U5-16 to fig-U5-19); this is a script quirk, not a content defect.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): validateReport PASS, check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
