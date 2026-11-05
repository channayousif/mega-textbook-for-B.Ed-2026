---
id: crew-intel-2026-11-04-distill
title: crew intel_distill INTEL unit 0
stage: misc
date: 2026-11-05
surface: agent
model: agy
feature: crew-intelligence
branch: crew/intel-2026-11-04-distill
user: crew
command: crew intel_distill
labels: ["crew", "agy", "intel_distill"]
links:
  spec: specs/intelligence/registry.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/intelligence/daily/2026-11-04.md
tests:
 - npm run check:content
---

## Prompt

# Crew job intel-2026-11-04-distill

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/intel-2026-11-04-distill`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, and never touch course content (`docs/`, `licence/`, the Urdu docs trees,
`specs/content/`, `static/img/figures/`, `glossary.json`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.

## Task
Distil today's reusable intelligence (intel-distill skill) into `specs/intelligence/daily/2026-11-04.md`. These clusters grew in the last 24 hours (kind, recent count, total, signature, an example, evidence):

- [log-error] x27 recent, 227 total, since 2026-10-17: ✗ <path> is stale - it no longer describes the working tree.
  example: ✗ static/content-status.json is stale - it no longer describes the working tree.
  evidence: log:efmp-302-u02-repair_en-conflict1.1.log, log:efmp-302-u02-repair_en-conflict4.1.log, log:efmp-302-u02-translate.1.log
- [failure] x27 recent, 74 total, since 2026-10-28: left out of the batch: <path> conflicts with main (<path>).; merge fix queued
  example: left out of the batch: crew/gnas-301-u04-review_en conflicts with main (specs/content/gnas-301/tasks.md).; merge fix queued
  evidence: job:gnas-301-u04-review_en, job:gnas-301-u05-review_en, job:gnas-301-u06-review_en
- [log-error] x26 recent, 260 total, since 2026-10-17: n of n content gates failed: check:content-status.
  example: 1 of 13 content gates failed: check:content-status.
  evidence: log:efmp-301-u01-review_ur.2.log, log:efmp-302-u02-repair_en-conflict1.1.log, log:efmp-302-u02-repair_en-conflict4.1.log
- [cron] x18 recent, 18 total, since 2026-11-03: owner-sync: fast-forward blocked (n behind): error: your local changes to the following files would be overwritten by merge: package.json please commit your cha
  example: owner-sync: fast-forward blocked (15 behind): error: Your local changes to the following files would be overwritten by merge: 	package.json Please commit your changes or stash them before you merge. A
  evidence: cron.log
- [review] x15 recent, 18 total, since 2026-10-28: headless review tooling constraint
  example: Headless review tooling constraint
  evidence: review:specs/content/gpks-402/reviews/unit-05/G3/21030998-7c55-4596-9cef-92787e7cb7aa.json, review:specs/content/gpks-402/reviews/unit-01/G3/b35aebba-1391-47ae-88ff-481fd326cd8b.json, review:specs/content/gpks-402/reviews/unit-03/G3/608a5388-1312-4060-ac88-c7d64ddc8c72.json
- [review] x14 recent, 21 total, since 2026-10-28: previous finding n
  example: Previous finding 1
  evidence: review:specs/content/efmp-301/reviews/unit-05/G3/codex-crew-cycle2.json, review:specs/content/efmp-301/reviews/unit-05/G3/20261102T212207Z-g3-desk-99b62591.json, review:specs/content/efmp-301/reviews/unit-05/G3/20261102T211054Z-g3-desk-5bdd915a.json
- [failure] x13 recent, 63 total, since 2026-10-17: ✗ pipeline gate failed with n finding(s):
  example: ✗ Pipeline gate failed with 1 finding(s):
  evidence: job:efmp-304-u01-translate, job:efmp-304-u02-translate, job:efmp-304-u04-translate
- [review] x11 recent, 12 total, since 2026-10-31: teaching case illustrations and hypothetical examples
  example: Teaching case illustrations and hypothetical examples
  evidence: review:specs/content/gpks-402/reviews/unit-03/G3/608a5388-1312-4060-ac88-c7d64ddc8c72.json, review:specs/content/efmp-406/reviews/unit-05/G3/4df544c3-c825-473c-8c69-940a86171cf5.json, review:specs/content/gpks-402/reviews/unit-03/G3/20261102T140729Z-g3-desk-85679ed3.json
- [review] x10 recent, 15 total, since 2026-10-22: fn, uncertain
  example: F4, uncertain
  evidence: review:specs/content/gqur-301/reviews/unit-08/G3/01a1608a-2fc5-7f41-a824-c08320f0383b.json, review:specs/content/gqur-301/reviews/unit-08/G3/20261102T212207Z-g3-desk-d528518f.json, review:specs/content/gqur-301/reviews/unit-08/G3/20261102T211054Z-g3-desk-3d8b226c.json
- [review] x8 recent, 11 total, since 2026-10-30: fn sources
  example: F02 sources
  evidence: review:specs/content/gpks-402/reviews/unit-06/G3/01a18ccb-4a8c-7c60-8ed2-7c546d08340e.json, review:specs/content/geng-301/reviews/unit-06/G3/20261102T212207Z-g3-desk-f5b7ea25.json, review:specs/content/gpks-402/reviews/unit-06/G3/20261102T212207Z-g3-desk-181b4e13.json
- [review] x8 recent, 9 total, since 2026-10-30: fn <path>
  example: F07 pedagogy/assessment
  evidence: review:specs/content/gpks-402/reviews/unit-06/G3/01a18ccb-4a8c-7c60-8ed2-7c546d08340e.json, review:specs/content/geng-301/reviews/unit-06/G3/20261102T212207Z-g3-desk-f5b7ea25.json, review:specs/content/gpks-402/reviews/unit-06/G3/20261102T212207Z-g3-desk-181b4e13.json
- [review] x8 recent, 8 total, since 2026-11-02: catalog entry pending owner ruling
  example: Catalog entry pending owner ruling
  evidence: review:specs/content/efmp-406/reviews/unit-05/G3/4df544c3-c825-473c-8c69-940a86171cf5.json, review:specs/content/efmp-406/reviews/unit-01/G3/5be15169-67ce-493e-9ccd-e4c8e6b64a2d.json, review:specs/content/giss-401/reviews/unit-01/G3/fb1baf5a-8583-4edd-a5d3-bf7e01304eaf.json
- [log-error] x7 recent, 96 total, since 2026-10-17: ✗ <path> is missing. run: npm run build:content-status
  example: ✗ static/content-status.json is missing. Run: npm run build:content-status
  evidence: log:efmp-301-u01-review_ur.2.log, log:efmp-302-u06-translate-r1.1.log, log:efmp-302-u06-translate-r1.2.log
- [log-error] x6 recent, 82 total, since 2026-10-17: ✗ pipeline gate failed with n finding(s):
  example: ✗ Pipeline gate failed with 2 finding(s):
  evidence: log:efmp-302-u03-translate.1.log, log:efmp-302-u04-translate-r1.1.log, log:efmp-303-u01-translate-r1.1.log
- [review] x6 recent, 9 total, since 2026-10-22: fn, blocking
  example: F1, blocking
  evidence: review:specs/content/gqur-301/reviews/unit-08/G3/01a1608a-2fc5-7f41-a824-c08320f0383b.json, review:specs/content/gqur-301/reviews/unit-08/G3/20261102T212207Z-g3-desk-d528518f.json, review:specs/content/gqur-301/reviews/unit-08/G3/20261102T211054Z-g3-desk-3d8b226c.json
- [review] x6 recent, 9 total, since 2026-10-28: pn carried
  example: P06 carried
  evidence: review:specs/content/gqur-300/reviews/unit-02/G3/codex-cycle2-20261028.json, review:specs/content/gqur-300/reviews/unit-02/G3/20261102T212207Z-g3-desk-710069ea.json, review:specs/content/gqur-300/reviews/unit-02/G3/20261102T211054Z-g3-desk-6800ea3b.json
- [review] x6 recent, 9 total, since 2026-10-28: assessment
  example: assessment
  evidence: review:specs/content/geng-301/reviews/unit-02/G3/crew-r1-20261028.json, review:specs/content/efmp-301/reviews/unit-09/G3/codex-efmp301-u09-cycle2-01a17f38-14aa-7e12-b5ba-14390f06b2ef.json, review:specs/content/efmp-301/reviews/unit-09/G3/20261102T212207Z-g3-desk-b282fccc.json
- [review] x6 recent, 9 total, since 2026-10-28: prior finding n remains
  example: Prior finding 4 remains
  evidence: review:specs/content/efmp-301/reviews/unit-11/G3/codex-cycle2-20261028.json, review:specs/content/efmp-301/reviews/unit-11/G3/20261102T212207Z-g3-desk-c705dbc8.json, review:specs/content/efmp-301/reviews/unit-11/G3/20261102T211054Z-g3-desk-baae4994.json
- [review] x6 recent, 9 total, since 2026-10-28: prior findingn partly unresolved
  example: Prior finding6 partly unresolved
  evidence: review:specs/content/efmp-301/reviews/unit-09/G3/codex-efmp301-u09-cycle2-01a17f38-14aa-7e12-b5ba-14390f06b2ef.json, review:specs/content/efmp-301/reviews/unit-09/G3/20261102T212207Z-g3-desk-b282fccc.json, review:specs/content/efmp-301/reviews/unit-09/G3/20261102T211054Z-g3-desk-15f0d2e9.json
- [review] x6 recent, 9 total, since 2026-10-28: rn partial
  example: R3 partial
  evidence: review:specs/content/efmp-301/reviews/unit-08/G3/codex-cycle2-20261028.json, review:specs/content/efmp-301/reviews/unit-08/G3/20261102T212207Z-g3-desk-04504f15.json, review:specs/content/efmp-301/reviews/unit-08/G3/20261102T211054Z-g3-desk-f27564cd.json
- [review] x6 recent, 7 total, since 2026-10-30: fn assessment
  example: F05 assessment
  evidence: review:specs/content/gpks-402/reviews/unit-06/G3/01a18ccb-4a8c-7c60-8ed2-7c546d08340e.json, review:specs/content/geng-301/reviews/unit-06/G3/20261102T212207Z-g3-desk-f5b7ea25.json, review:specs/content/gpks-402/reviews/unit-06/G3/20261102T212207Z-g3-desk-181b4e13.json
- [review] x6 recent, 6 total, since 2026-11-02: a-n (carried from run-n via run-n and cycle-n, re-verified)
  example: A-06 (carried from run-005 via run-007 and cycle-1, re-verified)
  evidence: review:specs/content/efmp-302/reviews/unit-03/G3/20261102T140729Z-g3-desk-0893bf77.json
- [review] x6 recent, 6 total, since 2026-11-02: carried and still open from run-n [n] through run-n
  example: CARRIED AND STILL OPEN from run-006 [11] through run-007
  evidence: review:specs/content/efmp-302/reviews/unit-04/G3/20261102T140729Z-g3-desk-0ad5d431.json
- [review] x6 recent, 6 total, since 2026-11-02: carried and still open from run-n
  example: CARRIED AND STILL OPEN from run-007
  evidence: review:specs/content/efmp-302/reviews/unit-04/G3/20261102T140729Z-g3-desk-0ad5d431.json
- [review] x6 recent, 6 total, since 2026-11-03: an (residual of run-n an)
  example: A3 (residual of run-001 A9)
  evidence: review:specs/content/gict-300/reviews/unit-04/G3/20261102T212207Z-g3-desk-3326366e.json, review:specs/content/gict-300/reviews/unit-04/G3/20261102T211054Z-g3-desk-1865df22.json
- [review] x5 recent, 5 total, since 2026-11-02: carried from run n and run n, still live
  example: Carried from run 002 and run 007, still live
  evidence: review:specs/content/efmp-302/reviews/unit-05/G3/20261102T140729Z-g3-desk-1fa7b86a.json
- [review] x5 recent, 5 total, since 2026-11-02: carried from run n, still live
  example: Carried from run 007, still live
  evidence: review:specs/content/efmp-302/reviews/unit-05/G3/20261102T140729Z-g3-desk-1fa7b86a.json
- [log-error] x4 recent, 44 total, since 2026-10-17: n of n content gates failed: check:pipeline-gate, check:content-status.
  example: 2 of 13 content gates failed: check:pipeline-gate, check:content-status.
  evidence: log:efmp-302-u04-translate-r1.1.log, log:efmp-303-u01-translate-r1.1.log, log:efmp-303-u02-translate.1.log
- [log-error] x4 recent, 13 total, since 2026-10-17: fatal: path '<path>' exists on disk, but not in '<path>'
  example: fatal: path 'static/content-status.json' exists on disk, but not in 'origin/main'
  evidence: log:efmp-302-u02-repair_en-conflict2.2.log, log:gpks-402-u00-salvage-conflict3.1.log, log:gqur-300-u05-translate.3.log
- [failure] x4 recent, 12 total, since 2026-10-28: left out of the batch: <path> conflicts with main (<path>, <path>).; merge fix queued
  example: left out of the batch: crew/efmp-301-u05-review_en conflicts with main (specs/content/efmp-301/tasks.md, static/content-status.json).; merge fix queued
  evidence: job:efmp-301-u05-review_en, job:efmp-301-u06-review_en, job:efmp-301-u08-review_en
- [review] x4 recent, 6 total, since 2026-10-19: render inspection (visual accessibility
  example: Render inspection (visual accessibility
  evidence: review:specs/content/efmp-304/reviews/unit-03/G3/crew-efmp-304-u03-g3-r65d2428e.json, review:specs/content/gsos-301/reviews/unit-05/G3/crew-gsos-301-u05-g3-r9f2a1b0c.json, review:specs/content/efmp-304/reviews/unit-03/G3/20261102T212207Z-g3-desk-fc9b67f2.json
- [review] x4 recent, 6 total, since 2026-10-28: content-n
  example: CONTENT-01
  evidence: review:specs/content/gnas-301/reviews/unit-02/G3/codex-20261028-reconciliation.json, review:specs/content/gnas-301/reviews/unit-02/G3/20261102T212207Z-g3-desk-bc87d518.json, review:specs/content/gnas-301/reviews/unit-02/G3/20261102T211054Z-g3-desk-207756e4.json
- [review] x4 recent, 6 total, since 2026-10-28: prior finding n
  example: Prior finding 2
  evidence: review:specs/content/geng-301/reviews/unit-01/G3/crew-20261028-r2.json, review:specs/content/geng-301/reviews/unit-01/G3/20261102T212207Z-g3-desk-df5b9545.json, review:specs/content/geng-301/reviews/unit-01/G3/20261102T211054Z-g3-desk-78d0fea3.json
- [review] x4 recent, 6 total, since 2026-10-28: carry-forward prior finding n
  example: Carry-forward prior finding 5
  evidence: review:specs/content/efmp-301/reviews/unit-03/G3/crew-cycle2-20261028.json, review:specs/content/efmp-301/reviews/unit-03/G3/20261102T212207Z-g3-desk-aaa9f247.json, review:specs/content/efmp-301/reviews/unit-03/G3/20261102T211054Z-g3-desk-1ffb278b.json
- [review] x4 recent, 5 total, since 2026-10-23: <path>, rrq n model answer
  example: docs/semester-2/gqur-301/unit-11/unit-assessment.mdx, RRQ 10 model answer
  evidence: review:specs/content/gqur-301/reviews/unit-11/G3/crew-20261023.json, review:specs/content/gqur-301/reviews/unit-11/G3/20261102T212207Z-g3-desk-7832f50b.json, review:specs/content/gqur-301/reviews/unit-15/G3/20261102T212207Z-g3-desk-b5cee406.json
- [review] x4 recent, 5 total, since 2026-10-23: rendered accessibility unverified
  example: Rendered accessibility unverified
  evidence: review:specs/content/gqur-301/reviews/unit-14/G3/crew-20261023.json, review:specs/content/gqur-301/reviews/unit-14/G3/20261102T212207Z-g3-desk-b6a93c25.json, review:specs/content/gqur-301/reviews/unit-15/G3/20261102T212207Z-g3-desk-b5cee406.json
- [review] x4 recent, 5 total, since 2026-10-30: fn readability
  example: F06 readability
  evidence: review:specs/content/gpks-402/reviews/unit-06/G3/01a18ccb-4a8c-7c60-8ed2-7c546d08340e.json, review:specs/content/geng-301/reviews/unit-06/G3/20261102T212207Z-g3-desk-f5b7ea25.json, review:specs/content/gpks-402/reviews/unit-06/G3/20261102T212207Z-g3-desk-181b4e13.json
- [review] x4 recent, 4 total, since 2026-11-02: abstract-level citation for shakir et al
  example: Abstract-level citation for Shakir et al
  evidence: review:specs/content/efmp-406/reviews/unit-01/G3/5be15169-67ce-493e-9ccd-e4c8e6b64a2d.json, review:specs/content/efmp-406/reviews/unit-01/G3/20261102T212036Z-g3-desk-45e9b45b.json, review:specs/content/efmp-406/reviews/unit-01/G3/20261102T210200Z-g3-desk-ca7ba17e.json
- [handoff] x4 recent, 4 total, since 2026-11-03: six unit n svgs have never been through measure-figure-text.mjs (chromium barred locally); ci figure-geometry is their first real check, and the urdu mirror sti
  example: Six Unit 2 SVGs have never been through measure-figure-text.mjs (Chromium barred locally); CI figure-geometry is their first real check, and the Urdu mirror still needs .ur.svg versions (generator liv
  evidence: job:giss-401-u02-author-conflict1, job:giss-401-u02-author-conflict2, job:giss-401-u02-author-conflict3
- [review] x4 recent, 4 total, since 2026-11-03: carried unresolved from cycle n
  example: Carried unresolved from cycle 1
  evidence: review:specs/content/efmp-302/reviews/unit-02/G3/20261102T212207Z-g3-desk-d78cf623.json, review:specs/content/efmp-302/reviews/unit-02/G3/20261102T211054Z-g3-desk-4739b695.json

Follow `.claude/skills/intel-distill/SKILL.md` exactly; read it and every file it references before starting.

## Scope
`specs/intelligence/daily/2026-11-04.md` only.

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
- (intel-2026-11-03-distill, intel_distill, agy) Candidate C1 identifies that review-evidence.mjs inScope regex misses hyphenated design files (unit-02-*.md), causing them to bind across all units of a course.
- (intel-2026-11-03-distill, intel_distill, agy) Candidate C2 notes that citedKeysFor BibTeX-only regex excludes kebab-case primary source excerpts (author-year-topic.md) from unit review manifests.
- (intel-2026-11-03-distill, intel_distill, agy) Candidates C5 and C6 address batch exclusion loops on shared tasks.md trackers and missing course-overview scaffolds during parallel authoring.
- (intel-2026-11-02-distill, intel_distill, agy) Candidate C1 identifies that `LOG_ERROR` in `scripts/crew/intel.mjs` matches design rationale ("Rejected:"), grep output line prefixes, and serialized JSON keys, leaking noise into error clusters.
- (intel-2026-11-02-distill, intel_distill, agy) Candidate C2 notes that `mergeAppendOnly`'s greedy first-occurrence scan in `scripts/crew/batch.mjs` risks misaligning duplicate lines (like empty lines) in `tasks.md`.


## Response snapshot

8 candidates; owner-sync blocked by dirty checkout, measure-figure-text Playwright confusion, tasks.md batch exclusions, and stale catalog spec notes

## Outcome

- Impact: intel_distill for INTEL Unit 0 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: 8 candidates; owner-sync blocked by dirty checkout, measure-figure-text Playwright confusion, tasks.md batch exclusions, and stale catalog spec notes
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - `sync-owner-checkout.sh` is blocked by 5 modified tracked files in `~/mega_book_for_B.Ed`, generating 18 cron error signals in 24 hours.
  - Crew briefs prohibiting Playwright lead workers to skip `measure-figure-text.mjs`, causing multiple batch PRs to fail CI `figure-geometry` and trigger CIFIX jobs.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
