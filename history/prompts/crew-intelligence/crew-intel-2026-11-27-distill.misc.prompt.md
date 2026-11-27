---
id: crew-intel-2026-11-27-distill
title: crew intel_distill INTEL unit 0
stage: misc
date: 2026-11-27
surface: agent
model: claude
feature: crew-intelligence
branch: crew/intel-2026-11-27-distill
user: crew
command: crew intel_distill
labels: ["crew", "claude", "intel_distill"]
links:
  spec: specs/intelligence/registry.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/intelligence/daily/2026-11-27.md
tests:
 - npm run check:content
---

## Prompt

# Crew job intel-2026-11-27-distill

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/intel-2026-11-27-distill`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, and never touch course content (`docs/`, `licence/`, the Urdu docs trees,
`specs/content/`, `static/img/figures/`, `glossary.json`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.

## Task
Distil today's reusable intelligence (intel-distill skill) into `specs/intelligence/daily/2026-11-27.md`. These clusters grew in the last 24 hours (kind, recent count, total, signature, an example, evidence):

- [review] x7 recent, 12 total, since 2026-11-24: render and print inspection (npx viewport, table scrolling, desktop layout, an print, figure clipping) could not be performed
  example: Render and print inspection (360px viewport, table scrolling, desktop layout, A4 print, figure clipping) could not be performed
  evidence: review:specs/content/efmp-409/reviews/unit-05/G3/agy-run1-20261126.json, review:specs/content/efmp-409/reviews/unit-04/G3/agy-run1-20261126.json, review:specs/content/efmp-409/reviews/unit-02/G3/agy-run1-20261126.json
- [handoff] x3 recent, 3 total, since 2026-11-26: visual accessibility remains unverified because deployed sha <sha> predates commit <sha> (fig-un-n.webp placed in index.mdx); re-run render-inspect once deploye
  example: Visual accessibility remains unverified because deployed SHA 074ab1145 predates commit 6d7ad156e (fig-U2-5.webp placed in index.mdx); re-run render-inspect once deployed.
  evidence: job:efmp-409-u02-review_en, job:efmp-409-u04-review_en, job:efmp-409-u05-review_en
- [log-error] x2 recent, 3 total, since 2026-11-24: error: you’ve hit your usage limit. upgrade to plus to continue using codex (<url> or try again at dec nth, n n:n pm.
  example: ERROR: You’ve hit your usage limit. Upgrade to Plus to continue using Codex (https://chatgpt.com/explore/plus), or try again at Dec 18th, 2026 8:11 PM.
  evidence: log:gent-401-u03-translate.1.log, log:efmp-301-u07-flashcards.1.log, log:efmp-303-u01-refresh_figures.1.log
- [handoff] x2 recent, 2 total, since 2026-11-26: unit banner fig-un-n is placed; unit n gn review and gn review remain open for independent evaluation.
  example: Unit banner fig-U5-7 is placed; Unit 5 G3 review and G5 review remain open for independent evaluation.
  evidence: job:efmp-409-u05-illustrate, job:gent-401-u02-illustrate
- [phr] x2 recent, 2 total, since 2026-11-26: failure modes observed: the production host can lag the reviewed commit, so the admissible render path is unavailable; the report must say so rather than borrow
  example: failure modes observed: the production host can lag the reviewed commit, so the admissible render path is unavailable; the report must say so rather than borrowing an earlier render. The MCQ key distr
  evidence: phr:history/prompts/efmp-409/crew-efmp-409-u03-review_en-r1.misc.prompt.md, phr:history/prompts/efmp-409/crew-efmp-409-u01-review_en-r1.misc.prompt.md
- [failure] x1 recent, 174 total, since 2026-10-28: left out of the batch: <path> conflicts with main (<path>).; merge fix queued
  example: left out of the batch: crew/gnas-301-u04-review_en conflicts with main (specs/content/gnas-301/tasks.md).; merge fix queued
  evidence: job:efmp-408-u05-author, job:efmp-301-u03-flashcards, job:social-2026-11-26-roundup
- [failure] x1 recent, 6 total, since 2026-11-23: the worker committed only a phr (<path>/); a job must produce its stage's work, and the crew writes the phr itself
  example: the worker committed only a PHR (history/prompts/); a job must produce its stage's work, and the crew writes the PHR itself
  evidence: job:gent-401-u05-author-conflict3, job:efmp-301-u04-studio_media, job:social-2026-11-26-roundup-conflict1
- [review] x1 recent, 5 total, since 2026-10-28: mcq option key clustering
  example: MCQ option key clustering
  evidence: review:specs/content/efmp-301/reviews/unit-07/G3/agy-cycle2-20261124.json, review:specs/content/efmp-303/reviews/unit-06/G3/agy-cycle2-20261125.json, review:specs/content/efmp-304/reviews/unit-06/G3/agy-cycle2-20261125.json
- [review] x1 recent, 5 total, since 2026-10-28: figure geometry
  example: Figure geometry
  evidence: review:specs/content/efmp-301/reviews/unit-05/G3/20261102T211054Z-g3-desk-5bdd915a.json, review:specs/content/efmp-301/reviews/unit-05/G3/20261108T203238Z-g3-desk-c3af68da.json, review:specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r1.json
- [handoff] x1 recent, 3 total, since 2026-11-25: gn gate evidence for unit n refreshed to ntnz-gates.json with full logs committed.
  example: G2 gate evidence for Unit 3 refreshed to 20261125T142256890Z-gates.json with full logs committed.
  evidence: job:efmp-408-u03-illustrate, job:efmp-408-u05-illustrate, job:efmp-409-u03-illustrate
- [cron] x1 recent, 2 total, since 2026-11-05: notify discord failed:
  example: notify discord failed:
  evidence: cron.log
- [review] x1 recent, 2 total, since 2026-11-24: in <path>:n-n, mcq correct keys are distributed as a
  example: In docs/semester-4/gcce-400/unit-06/unit-assessment.mdx:30-81, MCQ correct keys are distributed as A
  evidence: review:specs/content/gcce-400/reviews/unit-06/G3/agy-run1-20261124.json, review:specs/content/efmp-408/reviews/unit-02/G3/agy-run1-20261125.json
- [cron] x1 recent, 1 total, since 2026-11-25: batch batch-<sha>-n: gh pr create failed: pull request create failed: graphql: something went wrong while executing your query on n-n-ntn:n:nz. please include <
  example: batch batch-20261125-1546: gh pr create failed: pull request create failed: GraphQL: Something went wrong while executing your query on 2026-11-25T15:47:31Z. Please include `CFA0:3788DC:4D8A6A6:F6DD88
  evidence: cron.log
- [cron] x1 recent, 1 total, since 2026-11-25: batch batch-<sha>-n: gh pr create failed: pull request create failed: http n: n bad gateway (<url>
  example: batch batch-20261125-1602: gh pr create failed: pull request create failed: HTTP 502: 502 Bad Gateway (https://api.github.com/graphql)
  evidence: cron.log
- [review] x1 recent, 1 total, since 2026-11-25: unit-assessment.mdx:n (mcq n key)
  example: unit-assessment.mdx:156 (MCQ 10 key)
  evidence: review:specs/content/efmp-408/reviews/unit-03/G3/crew-efmp-408-u03-review_en-r1.json
- [review] x1 recent, 1 total, since 2026-11-25: unit-assessment.mdx rrq n ("define a table of specifications"), rrq n ("describe the anatomical structure of a multiple-choice question") and rrq n ("state thre
  example: unit-assessment.mdx RRQ 1 ("Define a Table of Specifications"), RRQ 7 ("Describe the anatomical structure of a multiple-choice question") and RRQ 9 ("State three essential structural rules") are tagge
  evidence: review:specs/content/efmp-408/reviews/unit-03/G3/crew-efmp-408-u03-review_en-r1.json
- [review] x1 recent, 1 total, since 2026-11-25: the unit carries n formative items (n per topic
  example: The unit carries 16 formative items (4 per topic
  evidence: review:specs/content/efmp-408/reviews/unit-03/G3/crew-efmp-408-u03-review_en-r1.json
- [review] x1 recent, 1 total, since 2026-11-25: topic-n.mdx:n formative item n ("critique this marking procedure and explain why marking question-by-question ..
  example: topic-02.mdx:131 formative item 4 ("Critique this marking procedure and explain why marking question-by-question ..
  evidence: review:specs/content/efmp-408/reviews/unit-03/G3/crew-efmp-408-u03-review_en-r1.json
- [review] x1 recent, 1 total, since 2026-11-25: topic-n.mdx:n attributes "three objective criteria" for weightage to "(hec, n)"; the bound hec guide (testdeveval_septn.txt:n-n) specifies content coverage, que
  example: topic-01.mdx:61 attributes "three objective criteria" for weightage to "(HEC, 2012)"; the bound HEC guide (TestDevEval_Sept13.txt:1266-1272) specifies content coverage, question types, marks distribut
  evidence: review:specs/content/efmp-408/reviews/unit-03/G3/crew-efmp-408-u03-review_en-r1.json
- [review] x1 recent, 1 total, since 2026-11-25: topic-n.mdx:n states "studies consistently show" that neat handwriting and rhetoric raise marks, with no citation; the bound seifert excerpt names halo effects 
  example: topic-02.mdx:94 states "Studies consistently show" that neat handwriting and rhetoric raise marks, with no citation; the bound Seifert excerpt names halo effects and rubrics but no study or effect siz
  evidence: review:specs/content/efmp-408/reviews/unit-03/G3/crew-efmp-408-u03-review_en-r1.json
- [review] x1 recent, 1 total, since 2026-11-25: topic-n.mdx:n names "aku-eb and the sindh higher education commission" as bodies that enforce four mandatory marking protocols, and topic-n.mdx:n attributes the
  example: topic-02.mdx:101 names "AKU-EB and the Sindh Higher Education Commission" as bodies that enforce four mandatory marking protocols, and topic-04.mdx:86 attributes the advice against "All of the above"/
  evidence: review:specs/content/efmp-408/reviews/unit-03/G3/crew-efmp-408-u03-review_en-r1.json
- [review] x1 recent, 1 total, since 2026-11-25: bare-url link text on the further reading lists of topic-n.mdx:n-n, topic-n.mdx:n-n, topic-n.mdx:n-n and topic-n.mdx:n-n (hec and open textbook library urls)
  example: Bare-URL link text on the Further reading lists of topic-01.mdx:177-178, topic-02.mdx:174-175, topic-03.mdx:174-175 and topic-04.mdx:192-193 (HEC and Open Textbook Library URLs)
  evidence: review:specs/content/efmp-408/reviews/unit-03/G3/crew-efmp-408-u03-review_en-r1.json
- [review] x1 recent, 1 total, since 2026-11-25: the unit key terms (table of specifications, blueprint, weightage, stem, distractor, matching, <path>) have no glossary.json entry, although style-guide.md:n an
  example: The unit key terms (Table of Specifications, blueprint, weightage, stem, distractor, matching, true/false) have no glossary.json entry, although style-guide.md:131 and :311 ask for a bilingual glossar
  evidence: review:specs/content/efmp-408/reviews/unit-03/G3/crew-efmp-408-u03-review_en-r1.json
- [phr] x1 recent, 1 total, since 2026-11-25: failure modes observed: overview heading variant breaks the objectives count in qgn (third course).
  example: failure modes observed: overview heading variant breaks the objectives count in QG0 (third course).
  evidence: phr:history/prompts/030-media-studio/20261273-efpg-401-teaser-script.green.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-25: next experiment (smallest change to try): let parseoverview accept "learning outcomes" and "course objectives" headings.
  example: next experiment (smallest change to try): let parseOverview accept "Learning outcomes" and "Course objectives" headings.
  evidence: phr:history/prompts/030-media-studio/20261273-efpg-401-teaser-script.green.prompt.md
- [review] x1 recent, 1 total, since 2026-11-25: formative blueprint breach
  example: Formative blueprint breach
  evidence: review:specs/content/efmp-408/reviews/unit-01/G3/crew-efmp-408-u01-review_en-r1.json
- [review] x1 recent, 1 total, since 2026-11-25: unit-assessment.mdx:n rrq n is tagged *(remember)*, below the style guide rrq floor of understand (<path>:n)
  example: unit-assessment.mdx:106 RRQ 4 is tagged *(Remember)*, below the style guide RRQ floor of Understand (specs/content/style-guide.md:248)
  evidence: review:specs/content/efmp-408/reviews/unit-01/G3/crew-efmp-408-u01-review_en-r1.json
- [review] x1 recent, 1 total, since 2026-11-25: mcq answer key never uses option d (<path> across unit-assessment.mdx:n-n)
  example: MCQ answer key never uses option D (A2/B4/C4/D0 across unit-assessment.mdx:36-94)
  evidence: review:specs/content/efmp-408/reviews/unit-01/G3/crew-efmp-408-u01-review_en-r1.json
- [review] x1 recent, 1 total, since 2026-11-25: topic-n.mdx:n, unit-assessment.mdx:n and :n cite npstp standard n, but npstp-n is not a key in <path> and has no coverage row
  example: topic-01.mdx:55, unit-assessment.mdx:54 and :142 cite NPSTP Standard 5, but npstp-2009 is not a Key in specs/content/efmp-408/sources/unit-01.md and has no coverage row
  evidence: review:specs/content/efmp-408/reviews/unit-01/G3/crew-efmp-408-u01-review_en-r1.json
- [review] x1 recent, 1 total, since 2026-11-25: <path>:n-n declares scheerens-n unverifiable with the retrieval attempt and date, but does not record the owner authorisation that d-n-n requires
  example: sources/unit-01.md:12-14 declares scheerens-2003 unverifiable with the retrieval attempt and date, but does not record the owner authorisation that D-2026-0001 requires
  evidence: review:specs/content/efmp-408/reviews/unit-01/G3/crew-efmp-408-u01-review_en-r1.json
- [review] x1 recent, 1 total, since 2026-11-25: topic-n.mdx:n defines assessment as "gathering, documenting and interpreting information about student knowledge, skills, attitudes and beliefs"; the bound hec 
  example: topic-01.mdx:41 defines assessment as "gathering, documenting and interpreting information about student knowledge, skills, attitudes and beliefs"; the bound HEC note (sources/texts/hec-2013-classroom
  evidence: review:specs/content/efmp-408/reviews/unit-01/G3/crew-efmp-408-u01-review_en-r1.json
- [review] x1 recent, 1 total, since 2026-11-25: topic-n.mdx:n defines appraisal and adds a pakistani teacher-education usage (holistic reviews encompassing academic performance, conduct, social interaction an
  example: topic-01.mdx:78 defines appraisal and adds a Pakistani teacher-education usage (holistic reviews encompassing academic performance, conduct, social interaction and motor participation)
  evidence: review:specs/content/efmp-408/reviews/unit-01/G3/crew-efmp-408-u01-review_en-r1.json
- [phr] x1 recent, 1 total, since 2026-11-25: failure modes observed: stale local checkout would have reported specs n and n as unfinished.
  example: failure modes observed: stale local checkout would have reported specs 011 and 031 as unfinished.
  evidence: phr:history/prompts/034-backlog-tracking/20261272-backlog-consolidation-and-issue-tracking.plan.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-25: next experiment (smallest change to try): run <code> from the crew daily digest.
  example: next experiment (smallest change to try): run `issue-sync.mjs` from the crew daily digest.
  evidence: phr:history/prompts/034-backlog-tracking/20261272-backlog-consolidation-and-issue-tracking.plan.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-25: failure modes observed: first attempt used bare subcommands, which print usage.
  example: failure modes observed: first attempt used bare subcommands, which print usage.
  evidence: phr:history/prompts/general/20261271-crew-flashcards-refresh-on.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-25: failure modes observed: an owner answer recorded in an ambiguous form was built the opposite way.
  example: failure modes observed: an owner answer recorded in an ambiguous form was built the opposite way.
  evidence: phr:history/prompts/general/20261271-media-hours-outside-office-hours.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-25: next experiment (smallest change to try): restate any time window as "runs from x to y" in the plan before building.
  example: next experiment (smallest change to try): restate any time window as "runs from X to Y" in the plan before building.
  evidence: phr:history/prompts/general/20261271-media-hours-outside-office-hours.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-25: failure modes observed: phr script id scheme drift (n vs nnnnn).
  example: failure modes observed: PHR script ID scheme drift (2487 vs 2026NNNN).
  evidence: phr:history/prompts/general/20261270-adr-0038-producer-lanes-merge-studio-on.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-25: next experiment (smallest change to try): fix create-phr.sh to allocate the next nnnnn id.
  example: next experiment (smallest change to try): fix create-phr.sh to allocate the next 2026NNNN ID.
  evidence: phr:history/prompts/general/20261270-adr-0038-producer-lanes-merge-studio-on.general.prompt.md
- [review] x1 recent, 1 total, since 2026-11-25: distractor distribution
  example: Distractor distribution
  evidence: review:specs/content/efmp-304/reviews/unit-05/G3/agy-cycle2-20261125.json

Follow `.claude/skills/intel-distill/SKILL.md` exactly; read it and every file it references before starting.

## Scope
`specs/intelligence/daily/2026-11-27.md` only.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. The acceptance checks in your task pass; `npm run check:content` reports nothing new against origin/main;
   any `node --test tests/crew/*.test.mjs` or unit tests covering what you changed pass.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Notes from earlier jobs on this unit
- (intel-2026-11-26-distill, intel_distill, agy) In `scripts/crew/batch.mjs` (`trackerLines`), status block parsing consumes until the next `## ` heading; adding `## Units` to `specs/content/efmp-409/tasks.md` or terminating status blocks before table rows will stop `mergeTrackerRows` from dropping newly added unit rows.
- (intel-2026-11-26-distill, intel_distill, agy) G3 review render inspection against production continues to force `escalate` dispositions on candidate branches until `render-inspect.mjs` or `review-unit` treats unmerged assets as advisory limitations.
- (intel-2026-11-25-distill, intel_distill, agy) gcce-400-u07-author remains pinned in reap with 101 ENOENT cron errors; lead or owner must release or reap it by hand.
- (intel-2026-11-25-distill, intel_distill, agy) Root glossary.json edits trigger full RLS and Playwright suites in CI until ci.yml classifies glossary.json as content.
- (intel-2026-11-25-distill, intel_distill, agy) G3 render inspection against candidate branches continues to force escalate verdicts until render-inspect or review-unit permits advisory recording for unmerged assets.


## Response snapshot

Wrote 7 intelligence candidates for 2026-11-27, the strongest being a planner hold on G3 reviews until the deploy includes the unit.

## Outcome

- Impact: intel_distill for INTEL Unit 0 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Wrote 7 intelligence candidates for 2026-11-27, the strongest being a planner hold on G3 reviews until the deploy includes the unit.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Codex shows 24 strikes in `~/.crew/mega-book/health.json` and its quota resets 2026-12-18; until C2 lands, a lead may want to mark codex down by hand.
  - 7 content specs (efmp-305, efmp-408, geng-300, geng-301, gqur-300, gqur-301, gsos-301) have no per-unit Bloom bands, so `check:bloom-bands` passes them without checking anything.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
