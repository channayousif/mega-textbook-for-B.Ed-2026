---
id: crew-intel-2026-10-22-distill
title: crew intel_distill INTEL unit 0
stage: misc
date: 2026-10-21
surface: agent
model: codex
feature: crew-intelligence
branch: crew/intel-2026-10-22-distill
user: crew
command: crew intel_distill
labels: ["crew", "codex", "intel_distill"]
links:
  spec: specs/intelligence/registry.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/intelligence/daily/2026-10-22.md
tests:
 - npm run check:content
---

## Prompt

# Crew job intel-2026-10-22-distill

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/intel-2026-10-22-distill`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, and never touch course content (`docs/`, `licence/`, the Urdu docs trees,
`specs/content/`, `static/img/figures/`, `glossary.json`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.

## Task
Distil today's reusable intelligence (intel-distill skill) into `specs/intelligence/daily/2026-10-22.md`. These clusters grew in the last 24 hours (kind, recent count, total, signature, an example, evidence):

- [log-error] x6 recent, 96 total, since 2026-10-17: n of n content gates failed: check:content-status.
  example: 1 of 13 content gates failed: check:content-status.
  evidence: log:efmp-301-u01-review_ur.2.log, log:efmp-302-u02-repair_en-conflict1.1.log, log:efmp-302-u02-repair_en-conflict4.1.log
- [log-error] x5 recent, 55 total, since 2026-10-17: ✗ <path> is missing. run: npm run build:content-status
  example: ✗ static/content-status.json is missing. Run: npm run build:content-status
  evidence: log:efmp-301-u01-review_ur.2.log, log:efmp-302-u06-translate-r1.1.log, log:efmp-302-u06-translate-r1.2.log
- [failure] x4 recent, 18 total, since 2026-10-17: ✗ pipeline gate failed with n finding(s):
  example: ✗ Pipeline gate failed with 1 finding(s):
  evidence: job:efmp-304-u01-translate, job:efmp-304-u02-translate, job:efmp-304-u04-translate
- [log-error] x2 recent, 64 total, since 2026-10-17: ✗ <path> is stale - it no longer describes the working tree.
  example: ✗ static/content-status.json is stale - it no longer describes the working tree.
  evidence: log:efmp-302-u02-repair_en-conflict1.1.log, log:efmp-302-u02-repair_en-conflict4.1.log, log:efmp-302-u02-translate.1.log
- [log-error] x2 recent, 30 total, since 2026-10-17: ✗ pipeline gate failed with n finding(s):
  example: ✗ Pipeline gate failed with 2 finding(s):
  evidence: log:efmp-302-u03-translate.1.log, log:efmp-302-u04-translate-r1.1.log, log:efmp-303-u01-translate-r1.1.log
- [failure] x2 recent, 16 total, since 2026-10-19: left out of the batch: <path> conflicts with main (it could not join the hourly batch).; merge fix queued
  example: left out of the batch: crew/gnas-301-u03-repair_en conflicts with main (it could not join the hourly batch).; merge fix queued
  evidence: job:gnas-301-u03-repair_en, job:gnas-301-u05-repair_en, job:geng-301-u05-review_en
- [handoff] x2 recent, 2 total, since 2026-10-21: gn review is advisory and unsigned (status ▢, no initials) under adr-n; disposition is pass with advisory finding fn (headless render limitation).
  example: G3 review is advisory and unsigned (status ▢, no initials) under ADR-0019; disposition is pass with advisory finding F1 (headless render limitation).
  evidence: job:gqur-301-u01-review_en-r1, job:gqur-301-u03-review_en-r1
- [handoff] x2 recent, 2 total, since 2026-10-21: next lifecycle stage for unit n is gn urdu translation.
  example: Next lifecycle stage for Unit 1 is G4 Urdu translation.
  evidence: job:gqur-301-u01-review_en-r1, job:gqur-301-u03-review_en-r1
- [handoff] x2 recent, 2 total, since 2026-10-21: four revision requests need separate author repair; provenance, source and rendered evidence remain incomplete.
  example: Four revision requests need separate author repair; provenance, source and rendered evidence remain incomplete.
  evidence: job:gqur-301-u02-review_en-r1
- [handoff] x2 recent, 2 total, since 2026-10-21: resolve assessment findings, <path> evidence, run provenance and rendered inspection before fresh review.
  example: Resolve assessment findings, G1/source evidence, run provenance and rendered inspection before fresh review.
  evidence: job:gqur-301-u05-review_en
- [handoff] x2 recent, 2 total, since 2026-10-21: independent gn review, urdu translation and figure localisation remain pending.
  example: Independent G3 review, Urdu translation and figure localisation remain pending.
  evidence: job:gqur-301-u09-author
- [handoff] x2 recent, 2 total, since 2026-10-21: independent gn review, urdu translation and localized figures, and gn review remain open.
  example: Independent G3 review, Urdu translation and localized figures, and G5 review remain open.
  evidence: job:gqur-301-u10-author
- [log-error] x2 recent, 2 total, since 2026-10-21: error: individual quota reached. please upgrade your subscription to increase your limits. resets in nhnmns.
  example: error: Individual quota reached. Please upgrade your subscription to increase your limits. Resets in 63h26m50s.
  evidence: log:gqur-301-u11-author.1.log, log:gqur-301-u05-translate.1.log
- [log-error] x2 recent, 2 total, since 2026-10-21: agy_error: {"short_error":"resource_exhausted (code n): individual quota reached. please upgrade your subscription to increase your limits. resets in nhnmns.","
  example: AGY_ERROR: {"short_error":"RESOURCE_EXHAUSTED (code 429): Individual quota reached. Please upgrade your subscription to increase your limits. Resets in 63h26m50s.","status":"RESOURCE_EXHAUSTED","error
  evidence: log:gqur-301-u11-author.1.log, log:gqur-301-u05-translate.1.log
- [handoff] x2 recent, 2 total, since 2026-10-21: translation remains draft; independent <path> review and browser inspection remain pending.
  example: Translation remains draft; independent G3/G5 review and browser inspection remain pending.
  evidence: job:gqur-301-u03-translate
- [log-error] x1 recent, 22 total, since 2026-10-17: n of n content gates failed: check:pipeline-gate, check:content-status.
  example: 2 of 13 content gates failed: check:pipeline-gate, check:content-status.
  evidence: log:efmp-302-u04-translate-r1.1.log, log:efmp-303-u01-translate-r1.1.log, log:efmp-303-u02-translate.1.log
- [log-error] x1 recent, 9 total, since 2026-10-17: n of n content gates failed: check:pipeline-gate.
  example: 1 of 13 content gates failed: check:pipeline-gate.
  evidence: log:efmp-302-u03-translate.1.log, log:efmp-304-u01-translate.2.log, log:efmp-304-u02-translate.2.log
- [failure] x1 recent, 2 total, since 2026-10-19: worker exited n:
  example: worker exited 1:
  evidence: job:geng-301-u03-review_en-conflict1, job:gqur-301-u11-author
- [log-error] x1 recent, 2 total, since 2026-10-17: ✗ content validation failed with n error(s):
  example: ✗ Content validation failed with 316 error(s):
  evidence: log:efmp-303-u04-review_en.1.log, log:gqur-301-u12-author.1.log
- [log-error] x1 recent, 2 total, since 2026-10-19: n cosmetic wordmark collision(s) - reported, not failed.
  example: 2 cosmetic wordmark collision(s) - reported, not failed.
  evidence: log:efmp-304-u01-repair_en.1.log, log:gqur-301-u03-review_en.1.log
- [handoff] x1 recent, 1 total, since 2026-10-20: batch merge conflicts on course trackers (<code>) grew to n recent failures (n total); needs dispatcher serialization or batch auto-rebase.
  example: Batch merge conflicts on course trackers (`tasks.md`) grew to 11 recent failures (14 total); needs dispatcher serialization or batch auto-rebase.
  evidence: job:intel-2026-10-21-distill
- [handoff] x1 recent, 1 total, since 2026-10-20: units exhausting adr-n two-cycle review limits (e.g. <course> unit n / g-n-n) repeatedly loop on repair jobs; planner needs owner-escalation detection.
  example: Units exhausting ADR-0019 two-cycle review limits (e.g. GNAS-301 Unit 4 / G-2026-31) repeatedly loop on repair jobs; planner needs owner-escalation detection.
  evidence: job:intel-2026-10-21-distill
- [handoff] x1 recent, 1 total, since 2026-10-20: i-n verified effective; i-n (fresh worktree content-status) and i-n (workspace <code> boundary) are ready for weekly maintenance promotion.
  example: I-0005 verified effective; I-0007 (fresh worktree content-status) and I-0008 (workspace `/tmp` boundary) are ready for weekly maintenance promotion.
  evidence: job:intel-2026-10-21-distill
- [handoff] x1 recent, 1 total, since 2026-10-21: all four figure svgs pass measure-figure-text cleanly with no wordmark or viewbox overflow.
  example: All four figure SVGs pass measure-figure-text cleanly with no wordmark or viewBox overflow.
  evidence: job:gqur-301-u01-review_en-r1
- [handoff] x1 recent, 1 total, since 2026-10-21: advisory findings fn and fn note minor cosmetic background card rect overlap with the wordmark on fig-un-n (n.npx) and fig-un-n (n.npx).
  example: Advisory findings F1 and F2 note minor cosmetic background card rect overlap with the wordmark on fig-U4-3 (2.5px) and fig-U4-4 (4.5px).
  evidence: job:gqur-301-u04-review_en
- [handoff] x1 recent, 1 total, since 2026-10-21: unit n gn review passed all n criteria; the unit is ready for gn urdu translation.
  example: Unit 4 G3 review passed all 7 criteria; the unit is ready for G4 Urdu translation.
  evidence: job:gqur-301-u04-review_en
- [handoff] x1 recent, 1 total, since 2026-10-21: the urdu mirror still needs translated <code> versions of fig-un-n to fig-un-n, and the n urdu concept labels in <code> are my own wording and need gn review.
  example: The Urdu mirror still needs translated `.ur.svg` versions of fig-U6-1 to fig-U6-6, and the 10 Urdu concept labels in `concepts/unit-06.md` are my own wording and need G5 review.
  evidence: job:gqur-301-u06-author
- [handoff] x1 recent, 1 total, since 2026-10-21: <code> still lists unit n as "(coming soon)" with no link to <code>.
  example: `course-overview.mdx` still lists Unit 6 as "(coming soon)" with no link to `./unit-06/index.mdx`.
  evidence: job:gqur-301-u06-author
- [handoff] x1 recent, 1 total, since 2026-10-21: do not add unit n notes to <code> or <code>; that makes the gn records for <course> units n-n out of date.
  example: Do not add Unit 6 notes to `sources/texts/lane2023.md` or `openstax-stats.md`; that makes the G2 records for GQUR-301 Units 1-5 out of date.
  evidence: job:gqur-301-u06-author
- [handoff] x1 recent, 1 total, since 2026-10-21: the urdu mirror still needs <code> versions of fig-un-n to fig-un-n, and the n urdu concept labels in <code> (none are in <code>, so i wrote them) need gn revie
  example: The Urdu mirror still needs `.ur.svg` versions of fig-U7-1 to fig-U7-4, and the 7 Urdu concept labels in `concepts/unit-07.md` (none are in `terminology.csv`, so I wrote them) need G5 review.
  evidence: job:gqur-301-u07-author
- [handoff] x1 recent, 1 total, since 2026-10-21: <code> still lists unit n as "(coming soon)"; editing it changes a file every unit's review record depends on. <code> has not been run on this branch.
  example: `course-overview.mdx` still lists Unit 7 as "(coming soon)"; editing it changes a file every unit's review record depends on. `npm run build` has not been run on this branch.
  evidence: job:gqur-301-u07-author
- [handoff] x1 recent, 1 total, since 2026-10-21: <code> (college algebra ne §n.n) is new for this unit and does not count towards the open-access minimum; units n+ may reuse it and its excerpt file <code>.
  example: `openstax-algebra` (College Algebra 2e §9.5) is new for this unit and does not count towards the open-access minimum; Units 8+ may reuse it and its excerpt file `sources/texts/openstax-algebra.md`.
  evidence: job:gqur-301-u07-author
- [handoff] x1 recent, 1 total, since 2026-10-21: urdu versions of fig-un-n..n and the n urdu concept labels in <code> are not done and need the urdu review.
  example: Urdu versions of fig-U8-1..6 and the 8 Urdu concept labels in `specs/content/gqur-301/concepts/unit-08.md` are not done and need the Urdu review.
  evidence: job:gqur-301-u08-author
- [handoff] x1 recent, 1 total, since 2026-10-21: <code> still lists unit n as "(coming soon)"; that shared file was outside this job's scope.
  example: `course-overview.mdx` still lists Unit 8 as "(coming soon)"; that shared file was outside this job's scope.
  evidence: job:gqur-301-u08-author
- [handoff] x1 recent, 1 total, since 2026-10-21: the build was not run on this branch; run it before merging.
  example: the build was not run on this branch; run it before merging.
  evidence: job:gqur-301-u08-author
- [handoff] x1 recent, 1 total, since 2026-10-21: gn independent review still pending (separate run); gn urdu mirror needs <code> variants for all n figures.
  example: G3 independent review still pending (separate run); G4 Urdu mirror needs `.ur.svg` variants for all 4 figures.
  evidence: job:gqur-301-u12-author
- [handoff] x1 recent, 1 total, since 2026-10-21: all four figure svgs pass measure-figure-text cleanly with no viewbox overflow (two cosmetic wordmark collisions reported in fig-un-n but not failed).
  example: All four figure SVGs pass measure-figure-text cleanly with no viewBox overflow (two cosmetic wordmark collisions reported in fig-U3-2 but not failed).
  evidence: job:gqur-301-u03-review_en-r1
- [handoff] x1 recent, 1 total, since 2026-10-21: urdu versions of fig-un-n..n and the n urdu concept labels in <path> are not done and need urdu review.
  example: Urdu versions of fig-U8-1..6 and the 8 Urdu concept labels in specs/content/gqur-301/concepts/unit-08.md are not done and need Urdu review.
  evidence: job:gqur-301-u08-author-conflict1
- [handoff] x1 recent, 1 total, since 2026-10-21: course-overview.mdx still lists unit n as "(coming soon)" - outside this job's scope.
  example: course-overview.mdx still lists Unit 8 as "(coming soon)"  -  outside this job's scope.
  evidence: job:gqur-301-u08-author-conflict1
- [log-error] x1 recent, 1 total, since 2026-10-21: ✗ webfetch <url> failed
  example: ✗ WebFetch https://onlinestatbook.com/1/Intro/index.html failed
  evidence: log:gqur-301-u03-review_en.1.log

Follow `.claude/skills/intel-distill/SKILL.md` exactly; read it and every file it references before starting.

## Scope
`specs/intelligence/daily/2026-10-22.md` only.

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
- (intel-2026-10-21-distill, intel_distill, agy) Batch merge conflicts on course trackers (`tasks.md`) grew to 11 recent failures (14 total); needs dispatcher serialization or batch auto-rebase.
- (intel-2026-10-21-distill, intel_distill, agy) Units exhausting ADR-0019 two-cycle review limits (e.g. GNAS-301 Unit 4 / G-2026-31) repeatedly loop on repair jobs; planner needs owner-escalation detection.
- (intel-2026-10-21-distill, intel_distill, agy) I-0005 verified effective; I-0007 (fresh worktree content-status) and I-0008 (workspace `/tmp` boundary) are ready for weekly maintenance promotion.
- (intel-2026-10-20-distill, intel_distill, agy) C1 (I-0007 recurrence) and C2 (I-0008 recurrence) account for over 150 gate errors and 16 permission rejections; ready for weekly maintenance promotion.
- (intel-2026-10-20-distill, intel_distill, agy) I-0005 batch content-status fix verified effective, dropping from 25 signals to 3 in the latest slot.


## Response snapshot

Added five evidence-backed intelligence candidates for October 22, led by recurring content-status preparation failures.

## Outcome

- Impact: intel_distill for INTEL Unit 0 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Added five evidence-backed intelligence candidates for October 22, led by recurring content-status preparation failures.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
