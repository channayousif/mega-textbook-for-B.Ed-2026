---
id: crew-efpc-411-u03-review_en
title: crew review_en EFPC-411 unit 3
stage: misc
date: 2026-11-27
surface: agent
model: LongCat-2.5
feature: efpc-411
branch: crew/efpc-411-u03-review_en
user: crew
command: crew review_en
labels: ["crew", "claude_crew", "review_en"]
links:
  spec: specs/content/efpc-411/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efpc-411/crew-efpc-411-u03-review_en.misc.prompt.md
 - specs/content/efpc-411/reviews/unit-03/G3/crew-efpc-411-u03-review_en-r1.json
 - specs/content/efpc-411/reviews/unit-03/G3/crew-efpc-411-u03-review_en-r1/advisory-tracker-row.md
 - specs/content/efpc-411/reviews/unit-03/G3/crew-efpc-411-u03-review_en-r1/assessment-solutions.md
 - specs/content/efpc-411/reviews/unit-03/G3/crew-efpc-411-u03-review_en-r1/logs/build-content-status.txt
 - specs/content/efpc-411/reviews/unit-03/G3/crew-efpc-411-u03-review_en-r1/logs/check-content.txt
 - specs/content/efpc-411/reviews/unit-03/G3/crew-efpc-411-u03-review_en-r1/logs/checkbloom-bands.txt
 - specs/content/efpc-411/reviews/unit-03/G3/crew-efpc-411-u03-review_en-r1/logs/checkconcept-graph.txt
 - specs/content/efpc-411/reviews/unit-03/G3/crew-efpc-411-u03-review_en-r1/logs/checkdepth-gate.txt
 - specs/content/efpc-411/reviews/unit-03/G3/crew-efpc-411-u03-review_en-r1/logs/checkdocs-sync.txt
 - specs/content/efpc-411/reviews/unit-03/G3/crew-efpc-411-u03-review_en-r1/logs/checkfigures.txt
 - specs/content/efpc-411/reviews/unit-03/G3/crew-efpc-411-u03-review_en-r1/logs/checkno-answer-keys.txt
 - specs/content/efpc-411/reviews/unit-03/G3/crew-efpc-411-u03-review_en-r1/logs/checkno-em-dash.txt
 - specs/content/efpc-411/reviews/unit-03/G3/crew-efpc-411-u03-review_en-r1/logs/checksource-floor.txt
 - specs/content/efpc-411/reviews/unit-03/G3/crew-efpc-411-u03-review_en-r1/logs/checksvg-style.txt
 - specs/content/efpc-411/reviews/unit-03/G3/crew-efpc-411-u03-review_en-r1/logs/measure-figure-text.txt
 - specs/content/efpc-411/reviews/unit-03/G3/crew-efpc-411-u03-review_en-r1/logs/render-review.txt
 - specs/content/efpc-411/reviews/unit-03/G3/crew-efpc-411-u03-review_en-r1/logs/validatecontent.txt
 - specs/content/efpc-411/reviews/unit-03/G3/crew-efpc-411-u03-review_en-r1/manifest.json
 - specs/content/efpc-411/reviews/unit-03/G3/crew-efpc-411-u03-review_en-r1/source-verification.md
 - specs/content/efpc-411/reviews/unit-03/G3/crew-efpc-411-u03-review_en-r1/summary.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efpc-411-u03-review_en

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpc-411-u03-review_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Act as the INDEPENDENT G3 English reviewer of EFPC-411 Unit 3 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row; write the report JSON directly under specs/content/efpc-411/reviews/unit-03/G3/ (supporting evidence may sit in a subfolder). Never tick G3, never add reviewer initials, never self-sign. For the rendered-page and print evidence, inspect the production build (CI-built from main) and never build or serve the site: if `git diff --quiet "$(cat ~/deploy/deployed-sha)" HEAD -- <this unit's English dir> static/img/figures/efpc-411/unit-03/` exits 0, run `scripts/heavy.sh node scripts/render-inspect.mjs EFPC-411 3 --base https://textbook.com.pk --no-pdf`, record its log and PNGs (stage the folder with `git add --sparse`) as the `render-review` command evidence, and cite the deployed SHA as the rendered input identity. If the diff is not empty, the live site is not your input: record `render-review` as unavailable and name the deployed SHA and HEAD. Changed images can be served stale for up to 30 days, so treat a missing or mismatched asset as unverified, not as a content defect.

Follow `.claude/skills/review-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFPC-411 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpc-411/`, and `static/img/figures/efpc-411/unit-03/`.

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

Added the independent G3 English advisory report for EFPC-411 Unit 3 (disposition escalate: render-review unavailable because the deployed SHA differs from HEAD, plus five uncertain content findings) with its full evidence set and PHR, committed on the branch.

## Outcome

- Impact: review_en for EFPC-411 Unit 3 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree before the commit.
- Files: 21 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Added the independent G3 English advisory report for EFPC-411 Unit 3 (disposition escalate) with manifest, source verification, independent assessment solutions, summary, advisory tracker row and real gate logs, committed on the branch.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this job does not certify anything, does not tick G3 and does not edit the tracker. The report is unsigned.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path). A separate author owns any content repair; a fresh reviewer must recheck a changed input.
- Notes for the next job on this unit:
  - render-review is unavailable: deployed `c8efed9b430b39867c1418fae61194c49cefcda9` differs from reviewed HEAD `0cbed86bb96f7a6a03420ad3e5d726a47e8f5513` on all five English unit files and on fig-U3-9..13.webp. Visual accessibility and A4 print are unverified, not failed.
  - Repair targets if a revision job follows: `unit-assessment.mdx:119` RRQ 8 four-sections vs the taught eight-part structure; `topic-03.mdx:94` activity names Figure 3.6 but `fig-U3-6` omits the authoritarian column; `fig-U3-3` says "real leaves used" against the topic-02 scenario and fig-U3-11; the four-stage cycle and management typology attributions at `topic-02.mdx:71` / `topic-03.mdx:71` are not in the bound notes.
  - The suggested advisory tracker row is in `advisory-tracker-row.md`; G3 stays unticked and unsigned.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
