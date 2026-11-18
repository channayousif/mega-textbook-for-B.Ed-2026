---
id: crew-intel-2026-11-07-distill
title: crew intel_distill INTEL unit 0
stage: misc
date: 2026-11-06
surface: agent
model: claude
feature: crew-intelligence
branch: crew/intel-2026-11-07-distill
user: crew
command: crew intel_distill
labels: ["crew", "claude", "intel_distill"]
links:
  spec: specs/intelligence/registry.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/intelligence/daily/2026-11-07.md
tests:
 - npm run check:content
---

## Prompt

# Crew job intel-2026-11-07-distill

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/intel-2026-11-07-distill`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, and never touch course content (`docs/`, `licence/`, the Urdu docs trees,
`specs/content/`, `static/img/figures/`, `glossary.json`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.

## Task
Distil today's reusable intelligence (intel-distill skill) into `specs/intelligence/daily/2026-11-07.md`. These clusters grew in the last 24 hours (kind, recent count, total, signature, an example, evidence):

- [cron] x144 recent, 306 total, since 2026-11-03: owner-sync: fast-forward blocked (n behind): error: your local changes to the following files would be overwritten by merge: package.json please commit your cha
  example: owner-sync: fast-forward blocked (15 behind): error: Your local changes to the following files would be overwritten by merge: 	package.json Please commit your changes or stash them before you merge. A
  evidence: cron.log
- [log-error] x10 recent, 265 total, since 2026-10-17: ✗ <path> is stale - it no longer describes the working tree.
  example: ✗ static/content-status.json is stale - it no longer describes the working tree.
  evidence: log:efmp-302-u02-repair_en-conflict1.1.log, log:efmp-302-u02-repair_en-conflict4.1.log, log:efmp-302-u02-translate.1.log
- [log-error] x7 recent, 296 total, since 2026-10-17: n of n content gates failed: check:content-status.
  example: 1 of 13 content gates failed: check:content-status.
  evidence: log:efmp-301-u01-review_ur.2.log, log:efmp-302-u02-repair_en-conflict1.1.log, log:efmp-302-u02-repair_en-conflict4.1.log
- [failure] x7 recent, 118 total, since 2026-10-28: left out of the batch: <path> conflicts with main (<path>).; merge fix queued
  example: left out of the batch: crew/gnas-301-u04-review_en conflicts with main (specs/content/gnas-301/tasks.md).; merge fix queued
  evidence: job:gnas-301-u04-review_en, job:gnas-301-u05-review_en, job:gnas-301-u06-review_en
- [failure] x6 recent, 70 total, since 2026-10-17: ✗ pipeline gate failed with n finding(s):
  example: ✗ Pipeline gate failed with 1 finding(s):
  evidence: job:efmp-304-u01-translate, job:efmp-304-u02-translate, job:efmp-304-u04-translate
- [log-error] x4 recent, 90 total, since 2026-10-17: ✗ pipeline gate failed with n finding(s):
  example: ✗ Pipeline gate failed with 2 finding(s):
  evidence: log:efmp-302-u03-translate.1.log, log:efmp-302-u04-translate-r1.1.log, log:efmp-303-u01-translate-r1.1.log
- [log-error] x3 recent, 48 total, since 2026-10-17: n of n content gates failed: check:pipeline-gate, check:content-status.
  example: 2 of 13 content gates failed: check:pipeline-gate, check:content-status.
  evidence: log:efmp-302-u04-translate-r1.1.log, log:efmp-303-u01-translate-r1.1.log, log:efmp-303-u02-translate.1.log
- [log-error] x3 recent, 43 total, since 2026-10-17: error: the user rejected permission to use this specific tool call.
  example: Error: The user rejected permission to use this specific tool call.
  evidence: log:efmp-301-u01-review_ur.1.log, log:efmp-302-u02-repair_en-conflict2.1.log, log:efmp-302-u02-repair_en-conflict2.2.log
- [log-error] x2 recent, 44 total, since 2026-10-17: n of n content gates failed: check:pipeline-gate.
  example: 1 of 13 content gates failed: check:pipeline-gate.
  evidence: log:efmp-302-u03-translate.1.log, log:efmp-304-u01-translate.2.log, log:efmp-304-u02-translate.2.log
- [failure] x2 recent, 34 total, since 2026-10-19: the worker exited without committing any change
  example: the worker exited without committing any change
  evidence: job:gict-300-u01-translate-r1, job:efmp-304-u04-translate-r1, job:efmp-303-u02-translate
- [handoff] x2 recent, 4 total, since 2026-11-05: <path> remain open; existing review-host follow-ups still apply.
  example: G3/G5 remain open; existing review-host follow-ups still apply.
  evidence: job:gqur-301-u15-repair_en-conflict3, job:gqur-301-u15-repair_en-conflict5
- [phr] x2 recent, 2 total, since 2026-11-05: next experiment (smallest change to try): rerun ci figure-geometry on the committed repair.
  example: next experiment (smallest change to try): Rerun CI figure-geometry on the committed repair.
  evidence: phr:history/prompts/general/20261127-fix-batch-449-legend-spacing.general.prompt.md, phr:history/prompts/general/20261123-fix-pr439-urdu-figure-spacing.general.prompt.md
- [handoff] x2 recent, 2 total, since 2026-11-06: translation remains draft; independent gn and <path> geometry checks are pending.
  example: Translation remains draft; independent G5 and browser/A4/SVG geometry checks are pending.
  evidence: job:giss-401-u06-translate
- [handoff] x2 recent, 2 total, since 2026-11-06: resolve the assessment blueprint gap; arrange scholar review, source verification, independent assessment solving and <path> inspection.
  example: Resolve the assessment blueprint gap; arrange scholar review, source verification, independent assessment solving and browser/print inspection.
  evidence: job:giss-401-u02-review_en
- [handoff] x2 recent, 2 total, since 2026-11-06: a separate english author and qualified scholar must resolve the <path> assessment gap before translation resumes.
  example: A separate English author and qualified scholar must resolve the Ijma/Qiyas assessment gap before translation resumes.
  evidence: job:giss-401-u02-translate
- [handoff] x2 recent, 2 total, since 2026-11-06: gn remains pending: repair assessment and privacy findings; obtain scholar review, provenance and <path> evidence.
  example: G3 remains pending: repair assessment and privacy findings; obtain scholar review, provenance and browser/print evidence.
  evidence: job:giss-401-u07-review_en
- [handoff] x2 recent, 2 total, since 2026-11-06: author repairs and corrected source binding, authentic provenance, scholar review, and <path> inspection remain pending.
  example: Author repairs and corrected source binding, authentic provenance, scholar review, and browser/print inspection remain pending.
  evidence: job:giss-401-u05-review_en
- [handoff] x2 recent, 2 total, since 2026-11-06: english author must repair gn findings before translation resumes; <path> remain open and translation_status remains draft.
  example: English author must repair G3 findings before translation resumes; G4/G5 remain open and translation_status remains draft.
  evidence: job:giss-401-u05-translate
- [handoff] x2 recent, 2 total, since 2026-11-06: translation remains draft; independent gn and permitted <path> geometry checks remain pending.
  example: Translation remains draft; independent G5 and permitted browser/print/SVG geometry checks remain pending.
  evidence: job:efmp-406-u03-translate-r1
- [handoff] x2 recent, 2 total, since 2026-11-06: <path>, urdu translation and banner production remain open.
  example: G3/G5, Urdu translation and banner production remain open.
  evidence: job:gicp-400-u01-author
- [failure] x2 recent, 2 total, since 2026-11-06: worker exited n (timeout):
  example: worker exited 124 (timeout):
  evidence: job:gicp-400-u03-author
- [handoff] x2 recent, 2 total, since 2026-11-06: independent review, urdu translation, browser geometry validation and banner production remain pending.
  example: Independent review, Urdu translation, browser geometry validation and banner production remain pending.
  evidence: job:gicp-400-u03-author
- [handoff] x2 recent, 2 total, since 2026-11-06: independent review, urdu translation, banner production and browser geometry checks remain pending.
  example: Independent review, Urdu translation, banner production and browser geometry checks remain pending.
  evidence: job:gicp-400-u06-author
- [handoff] x2 recent, 2 total, since 2026-11-06: translation remains draft; english gn resolution, independent gn and <path> inspection remain pending.
  example: Translation remains draft; English G3 resolution, independent G5 and browser/print inspection remain pending.
  evidence: job:gicp-400-u01-translate
- [handoff] x2 recent, 2 total, since 2026-11-06: gn remains open: provenance, independent <path> verification and permitted render inspection are still required.
  example: G3 remains open: provenance, independent source/assessment verification and permitted render inspection are still required.
  evidence: job:gicp-400-u04-review_en
- [handoff] x2 recent, 2 total, since 2026-11-06: author should correct figure n.n’s resource-condition alt text.
  example: Author should correct Figure 5.6’s resource-condition alt text.
  evidence: job:gicp-400-u05-review_en
- [handoff] x2 recent, 2 total, since 2026-11-06: gn remains open pending source verification, run provenance and <path> inspection.
  example: G3 remains open pending source verification, run provenance and browser/A4 inspection.
  evidence: job:gicp-400-u02-review_en
- [log-error] x1 recent, 100 total, since 2026-10-17: ✗ <path> is missing. run: npm run build:content-status
  example: ✗ static/content-status.json is missing. Run: npm run build:content-status
  evidence: log:efmp-301-u01-review_ur.2.log, log:efmp-302-u06-translate-r1.1.log, log:efmp-302-u06-translate-r1.2.log
- [log-error] x1 recent, 20 total, since 2026-10-17: fatal: path '<path>' exists on disk, but not in '<path>'
  example: fatal: path 'static/content-status.json' exists on disk, but not in 'origin/main'
  evidence: log:efmp-302-u02-repair_en-conflict2.2.log, log:gpks-402-u00-salvage-conflict3.1.log, log:gqur-300-u05-translate.3.log
- [failure] x1 recent, 13 total, since 2026-10-19: could not join a batch after n merge fixes
  example: could not join a batch after 5 merge fixes
  evidence: job:efmp-305-u01-repair_en, job:gsos-301-u06-author, job:gnas-301-u05-review_en
- [handoff] x1 recent, 5 total, since 2026-11-05: unit n pn-pn (<path> provenance, open gn under d-n-n, answer-blind verification, rendered <path> inspection) remain open for the <path> host; gn stays open (adr
  example: Unit 5 P1-P4 (author/run provenance, open G1 under D-2026-0070, answer-blind verification, rendered narrow/A4 inspection) remain open for the evaluator/review host; G3 stays open (ADR-0019).
  evidence: job:gqur-301-u05-repair_en-conflict1, job:gqur-301-u05-repair_en-conflict2, job:gqur-301-u05-repair_en-conflict3
- [handoff] x1 recent, 5 total, since 2026-11-05: gn should verify nastaliq rendering and text-fit inside the inherited viewbox at narrow width and an print.
  example: G5 should verify Nastaliq rendering and text-fit inside the inherited viewBox at narrow width and A4 print.
  evidence: job:gqur-301-u05-repair_en-conflict1, job:gqur-301-u05-repair_en-conflict2, job:gqur-301-u05-repair_en-conflict3
- [log-error] x1 recent, 4 total, since 2026-10-17: assertionerror
  example: AssertionError
  evidence: log:efmp-302-u03-translate.1.log, log:efmp-304-u04-translate.1.log, log:efmp-301-u11-repair_en-conflict3.1.log
- [log-error] x1 recent, 3 total, since 2026-10-27: error: cannot find module '<path>'
  example: Error: Cannot find module '/home/a2ahs/crew-wt/efmp-301-u03-fix/.crew/main-baseline/.crew/main-baseline/scripts/report-content-status.mjs'
  evidence: log:efmp-301-u03-fix.1.log, log:gqur-300-u04-fix.1.log, log:gsos-301-u06-repair_en-conflict2.1.log
- [handoff] x1 recent, 3 total, since 2026-11-05: gn remains unticked; permitted <path> inspection and fresh independent review are pending.
  example: G3 remains unticked; permitted browser/print inspection and fresh independent review are pending.
  evidence: job:gsos-301-u06-repair_en, job:gsos-301-u06-repair_en-conflict1
- [handoff] x1 recent, 2 total, since 2026-11-05: content-spec.md's introductory "status is draft" paragraph still conflicts with its approved frontmatter; it is an approved spec, so it is an owner edit outside
  example: content-spec.md's introductory "Status is draft" paragraph still conflicts with its approved frontmatter; it is an approved spec, so it is an owner edit outside this job's scope.
  evidence: job:gsos-301-u04-repair_en, job:gsos-301-u04-repair_en-conflict1
- [handoff] x1 recent, 2 total, since 2026-11-05: no urdu mirror exists for unit n, so gn stays blocked until a fresh independent gn confirms these repairs.
  example: No Urdu mirror exists for Unit 4, so G4 stays blocked until a fresh independent G3 confirms these repairs.
  evidence: job:gsos-301-u04-repair_en, job:gsos-301-u04-repair_en-conflict1
- [cron] x1 recent, 1 total, since 2026-11-05: gqur-n-un-repair_en-conflictn: error: git push -q -u origin head:<path> --force-with-lease: remote: internal server error
  example: gqur-301-u11-repair_en-conflict1: Error: git push -q -u origin HEAD:crew/gqur-301-u11-repair_en --force-with-lease: remote: Internal Server Error
  evidence: cron.log
- [cron] x1 recent, 1 total, since 2026-11-05: error: failed to push some refs to '<url>
  example: error: failed to push some refs to 'https://github.com/channayousif/mega-textbook-for-B.Ed-2026.git'
  evidence: cron.log
- [cron] x1 recent, 1 total, since 2026-11-05: notify discord failed:
  example: notify discord failed:
  evidence: cron.log

Follow `.claude/skills/intel-distill/SKILL.md` exactly; read it and every file it references before starting.

## Scope
`specs/intelligence/daily/2026-11-07.md` only.

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
- (intel-2026-11-06-distill, intel_distill, agy) The owner checkout at `~/mega_book_for_B.Ed` has 5 modified tracked files preventing ff-merge and is now 299 commits behind origin/main.
- (intel-2026-11-06-distill, intel_distill, agy) 57 units currently wait in `awaitingG3` status on the crew board while ADR-0019 review signing remains host-blocked.
- (intel-2026-11-04-distill, intel_distill, agy) `sync-owner-checkout.sh` is blocked by 5 modified tracked files in `~/mega_book_for_B.Ed`, generating 18 cron error signals in 24 hours.
- (intel-2026-11-04-distill, intel_distill, agy) Crew briefs prohibiting Playwright lead workers to skip `measure-figure-text.mjs`, causing multiple batch PRs to fail CI `figure-geometry` and trigger CIFIX jobs.
- (intel-2026-11-03-distill, intel_distill, agy) Candidate C1 identifies that review-evidence.mjs inScope regex misses hyphenated design files (unit-02-*.md), causing them to bind across all units of a course.

## Feedback from the previous attempt
the worker exited without committing any change


## Response snapshot

10 candidates; the strongest is that the batch's append-only tracker merge misses in-place row edits.

## Outcome

- Impact: intel_distill for INTEL Unit 0 by claude (attempt 3).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: 10 candidates; the strongest is that the batch's append-only tracker merge misses in-place row edits.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - `gqur-301-u15-repair_en` is still `gate_red` after 5 merge fixes; requeue it once the tracker merge in C1 is fixed.
  - The registry still lists I-0015 as `proposed` although its code merged on 2026-11-01; the weekly survey should correct it.
  - The owner must keep or discard the 5 modified tracked files in `~/mega_book_for_B.Ed` before owner-sync can fast-forward.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 2 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
