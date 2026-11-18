---
id: crew-intel-2026-11-06-distill
title: crew intel_distill INTEL unit 0
stage: misc
date: 2026-11-06
surface: agent
model: agy
feature: crew-intelligence
branch: crew/intel-2026-11-06-distill
user: crew
command: crew intel_distill
labels: ["crew", "agy", "intel_distill"]
links:
  spec: specs/intelligence/registry.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/intelligence/daily/2026-11-06.md
tests:
 - npm run check:content
---

## Prompt

# Crew job intel-2026-11-06-distill

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/intel-2026-11-06-distill`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, and never touch course content (`docs/`, `licence/`, the Urdu docs trees,
`specs/content/`, `static/img/figures/`, `glossary.json`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.

## Task
Distil today's reusable intelligence (intel-distill skill) into `specs/intelligence/daily/2026-11-06.md`. These clusters grew in the last 24 hours (kind, recent count, total, signature, an example, evidence):

- [cron] x144 recent, 210 total, since 2026-11-03: owner-sync: fast-forward blocked (n behind): error: your local changes to the following files would be overwritten by merge: package.json please commit your cha
  example: owner-sync: fast-forward blocked (15 behind): error: Your local changes to the following files would be overwritten by merge: 	package.json Please commit your changes or stash them before you merge. A
  evidence: cron.log
- [failure] x37 recent, 111 total, since 2026-10-28: left out of the batch: <path> conflicts with main (<path>).; merge fix queued
  example: left out of the batch: crew/gnas-301-u04-review_en conflicts with main (specs/content/gnas-301/tasks.md).; merge fix queued
  evidence: job:gnas-301-u04-review_en, job:gnas-301-u05-review_en, job:gnas-301-u06-review_en
- [log-error] x28 recent, 289 total, since 2026-10-17: n of n content gates failed: check:content-status.
  example: 1 of 13 content gates failed: check:content-status.
  evidence: log:efmp-301-u01-review_ur.2.log, log:efmp-302-u02-repair_en-conflict1.1.log, log:efmp-302-u02-repair_en-conflict4.1.log
- [log-error] x27 recent, 255 total, since 2026-10-17: ✗ <path> is stale - it no longer describes the working tree.
  example: ✗ static/content-status.json is stale - it no longer describes the working tree.
  evidence: log:efmp-302-u02-repair_en-conflict1.1.log, log:efmp-302-u02-repair_en-conflict4.1.log, log:efmp-302-u02-translate.1.log
- [log-error] x6 recent, 19 total, since 2026-10-17: fatal: path '<path>' exists on disk, but not in '<path>'
  example: fatal: path 'static/content-status.json' exists on disk, but not in 'origin/main'
  evidence: log:efmp-302-u02-repair_en-conflict2.2.log, log:gpks-402-u00-salvage-conflict3.1.log, log:gqur-300-u05-translate.3.log
- [log-error] x4 recent, 86 total, since 2026-10-17: ✗ pipeline gate failed with n finding(s):
  example: ✗ Pipeline gate failed with 2 finding(s):
  evidence: log:efmp-302-u03-translate.1.log, log:efmp-302-u04-translate-r1.1.log, log:efmp-303-u01-translate-r1.1.log
- [handoff] x4 recent, 4 total, since 2026-11-05: other <course> units still cite the shared <code> excerpt, which lacks chapter n; that course-level gap is outside this unit n job.
  example: Other GQUR-301 units still cite the shared `lane2023` excerpt, which lacks Chapter 3; that course-level gap is outside this Unit 5 job.
  evidence: job:gqur-301-u05-repair_en, job:gqur-301-u05-repair_en-conflict2, job:gqur-301-u05-repair_en-conflict3
- [handoff] x4 recent, 4 total, since 2026-11-05: unit n pn-pn (<path> provenance, open gn under d-n-n, answer-blind verification, rendered <path> inspection) remain open for the <path> host; gn stays open (adr
  example: Unit 5 P1-P4 (author/run provenance, open G1 under D-2026-0070, answer-blind verification, rendered narrow/A4 inspection) remain open for the evaluator/review host; G3 stays open (ADR-0019).
  evidence: job:gqur-301-u05-repair_en-conflict1, job:gqur-301-u05-repair_en-conflict2, job:gqur-301-u05-repair_en-conflict3
- [handoff] x4 recent, 4 total, since 2026-11-05: gn should verify nastaliq rendering and text-fit inside the inherited viewbox at narrow width and an print.
  example: G5 should verify Nastaliq rendering and text-fit inside the inherited viewBox at narrow width and A4 print.
  evidence: job:gqur-301-u05-repair_en-conflict1, job:gqur-301-u05-repair_en-conflict2, job:gqur-301-u05-repair_en-conflict3
- [log-error] x3 recent, 99 total, since 2026-10-17: ✗ <path> is missing. run: npm run build:content-status
  example: ✗ static/content-status.json is missing. Run: npm run build:content-status
  evidence: log:efmp-301-u01-review_ur.2.log, log:efmp-302-u06-translate-r1.1.log, log:efmp-302-u06-translate-r1.2.log
- [log-error] x3 recent, 40 total, since 2026-10-17: error: the user rejected permission to use this specific tool call.
  example: Error: The user rejected permission to use this specific tool call.
  evidence: log:efmp-301-u01-review_ur.1.log, log:efmp-302-u02-repair_en-conflict2.1.log, log:efmp-302-u02-repair_en-conflict2.2.log
- [log-error] x3 recent, 6 total, since 2026-10-19: fatal: path '<path>' exists on disk, but not in 'head'
  example: fatal: path 'static/content-status.json' exists on disk, but not in 'HEAD'
  evidence: log:efmp-304-u01-repair_en-conflict4.2.log, log:maint-2026-w43-m1-conflict1.1.log, log:giss-401-u07-author-conflict5.1.log
- [handoff] x3 recent, 3 total, since 2026-11-05: render inspection remains blocked by the brief; a permitted session must perform <path> checks before gn can close.
  example: Render inspection remains blocked by the brief; a permitted session must perform mobile/print checks before G3 can close.
  evidence: job:gsos-301-u05-repair_en, job:gsos-301-u05-repair_en-conflict1
- [handoff] x3 recent, 3 total, since 2026-11-05: gn remains open; independent assessment, frozen <path>, <path> rendering and svg geometry verification are still pending.
  example: G3 remains open; independent assessment, frozen handoff/provenance, narrow/print rendering and SVG geometry verification are still pending.
  evidence: job:geng-301-u03-repair_en-conflict1, job:geng-301-u03-repair_en-conflict2, job:geng-301-u03-repair_en-conflict3
- [handoff] x3 recent, 3 total, since 2026-11-05: gn remains open pending owner authorization; live mobile and an print inspection remains outstanding.
  example: G3 remains open pending owner authorization; live mobile and A4 print inspection remains outstanding.
  evidence: job:gnas-301-u04-repair_en-r1-conflict1, job:gnas-301-u04-repair_en-r1-conflict2
- [handoff] x3 recent, 3 total, since 2026-11-05: unit n gn stays open and unsigned (adr-n), blocked on an authorised non-production render host; no content repair was possible or required.
  example: Unit 10 G3 stays open and unsigned (ADR-0019), blocked on an authorised non-production render host; no content repair was possible or required.
  evidence: job:gqur-301-u10-repair_en-conflict1, job:gqur-301-u10-repair_en-conflict2, job:gqur-301-u10-repair_en-conflict3
- [handoff] x3 recent, 3 total, since 2026-11-05: <code> is gitignored and goes stale after any content-tree change; regenerate with <code> before running <code>.
  example: `static/content-status.json` is gitignored and goes stale after any content-tree change; regenerate with `npm run build:content-status` before running `check:content`.
  evidence: job:gqur-301-u10-repair_en-conflict1, job:gqur-301-u10-repair_en-conflict2, job:gqur-301-u10-repair_en-conflict3
- [failure] x2 recent, 32 total, since 2026-10-19: the worker exited without committing any change
  example: the worker exited without committing any change
  evidence: job:gict-300-u01-translate-r1, job:efmp-304-u04-translate-r1, job:efmp-303-u02-translate
- [log-error] x2 recent, 16 total, since 2026-10-17: error: pathspec '<path>' did not match any file(s) known to git
  example: error: pathspec 'static/content-status.json' did not match any file(s) known to git
  evidence: log:efmp-302-u02-repair_en-conflict2.2.log, log:efmp-304-u02-review_en-cifix2.1.log, log:geng-300-u01-repair_en-conflict1.1.log
- [handoff] x2 recent, 2 total, since 2026-11-05: gn remains open; independent assessment, frozen <path>, <path> rendering and svg geometry verification remain pending.
  example: G3 remains open; independent assessment, frozen handoff/provenance, narrow/print rendering and SVG geometry verification remain pending.
  evidence: job:geng-301-u03-repair_en
- [handoff] x2 recent, 2 total, since 2026-11-05: gn remains open; host provenance, svg geometry and fresh render inspection are pending.
  example: G3 remains open; host provenance, SVG geometry and fresh render inspection are pending.
  evidence: job:geng-301-u06-repair_en
- [handoff] x2 recent, 2 total, since 2026-11-05: an needs curriculum-owner reconciliation; an needs an out-of-scope tooling fix.
  example: A3 needs curriculum-owner reconciliation; A6 needs an out-of-scope tooling fix.
  evidence: job:gict-300-u04-repair_en-r1
- [handoff] x2 recent, 2 total, since 2026-11-05: fn (author-run provenance) and fn (rendered <path> evidence) remain host-supplied; gn stays open under adr-n.
  example: F01 (author-run provenance) and F08 (rendered narrow/A4 evidence) remain host-supplied; G3 stays open under ADR-0019.
  evidence: job:gpks-402-u06-repair_en, job:gpks-402-u06-repair_en-conflict1
- [handoff] x2 recent, 2 total, since 2026-11-05: <path> remain open; owner must resolve render, provenance, source-bundle and editorial evidence needs recorded in the repair handoff.
  example: G3/G5 remain open; owner must resolve render, provenance, source-bundle and editorial evidence needs recorded in the repair handoff.
  evidence: job:gqur-300-u02-repair_en
- [handoff] x2 recent, 2 total, since 2026-11-05: owner follow-ups remain for source support, shared glossary entries, current renders, fresh blind assessment verification and review provenance.
  example: Owner follow-ups remain for source support, shared glossary entries, current renders, fresh blind assessment verification and review provenance.
  evidence: job:gqur-300-u04-repair_en
- [handoff] x2 recent, 2 total, since 2026-11-05: gn remains open; independent review, <path> checks and permitted visual checks are pending. urdu mirror is absent.
  example: G3 remains open; independent review, authority/provenance checks and permitted visual checks are pending. Urdu mirror is absent.
  evidence: job:gqur-301-u02-repair_en
- [handoff] x2 recent, 2 total, since 2026-11-05: gn remains open pending <path> resolution and authorised geometry, narrow-screen and an inspection; urdu translation remains pending.
  example: G3 remains open pending authority/provenance resolution and authorised geometry, narrow-screen and A4 inspection; Urdu translation remains pending.
  evidence: job:gqur-301-u06-repair_en
- [handoff] x2 recent, 2 total, since 2026-11-05: rendering remains blocked pending an authorised non-production host.
  example: Rendering remains blocked pending an authorised non-production host.
  evidence: job:gqur-301-u10-repair_en
- [handoff] x2 recent, 2 total, since 2026-11-05: gn remains open; independent review still needs <path> inspection, provenance and <path> evidence.
  example: G3 remains open; independent review still needs browser/print inspection, provenance and G1/source evidence.
  evidence: job:gqur-301-u12-repair_en
- [handoff] x2 recent, 2 total, since 2026-11-05: gn remains open; gn authority, provenance, rendered inspection and urdu translation require separate owners.
  example: G3 remains open; G1 authority, provenance, rendered inspection and Urdu translation require separate owners.
  evidence: job:gqur-301-u13-repair_en
- [handoff] x2 recent, 2 total, since 2026-11-05: gn remains unticked; render inspection and original <path> source evidence remain pending.
  example: G3 remains unticked; render inspection and original provenance/complete source evidence remain pending.
  evidence: job:gsos-301-u02-repair_en
- [handoff] x2 recent, 2 total, since 2026-11-05: owner must correct the approved-spec conflation; independent <path> and rendered reviews remain pending. <path> stay open.
  example: Owner must correct the approved-spec conflation; independent source/provenance and rendered reviews remain pending. G3/G5 stay open.
  evidence: job:gsos-301-u03-repair_en
- [handoff] x2 recent, 2 total, since 2026-11-05: gn remains unticked; permitted <path> inspection and fresh independent review are pending.
  example: G3 remains unticked; permitted browser/print inspection and fresh independent review are pending.
  evidence: job:gsos-301-u06-repair_en
- [handoff] x2 recent, 2 total, since 2026-11-05: <path> inspection remains pending; defer the shared who heading until unit n evidence refresh.
  example: Browser/print inspection remains pending; defer the shared WHO heading until Unit 2 evidence refresh.
  evidence: job:gnas-301-u01-repair_en-r1
- [handoff] x2 recent, 2 total, since 2026-11-05: ci must confirm browser geometry; playwright was prohibited by the brief.
  example: CI must confirm browser geometry; Playwright was prohibited by the brief.
  evidence: job:batch-20261103-1902-cifix1
- [handoff] x2 recent, 2 total, since 2026-11-05: status remains draft; independent <path> review and authorised browser, print and svg geometry checks remain pending.
  example: Status remains draft; independent G3/G5 review and authorised browser, print and SVG geometry checks remain pending.
  evidence: job:efmp-406-u02-translate-r1
- [handoff] x2 recent, 2 total, since 2026-11-05: gn and gn remain open and unsigned; independent review, <path> checks and the owner's catalog ruling are still pending for unit n.
  example: G3 and G5 remain open and unsigned; independent review, browser/print checks and the owner's catalog ruling are still pending for Unit 5.
  evidence: job:efmp-406-u05-repair_en-conflict2, job:efmp-406-u05-repair_en-conflict3
- [handoff] x2 recent, 2 total, since 2026-11-05: <code> is gitignored and was regenerated locally after the merge; a clean checkout will need <code> before <code> passes.
  example: `static/content-status.json` is gitignored and was regenerated locally after the merge; a clean checkout will need `npm run build:content-status` before `check:content` passes.
  evidence: job:efmp-406-u05-repair_en-conflict2, job:efmp-406-u05-repair_en-conflict3
- [handoff] x2 recent, 2 total, since 2026-11-05: unit n still needs fresh independent gn review and <path> inspection.
  example: Unit 5 still needs fresh independent G3 review and provenance/render inspection.
  evidence: job:geng-301-u05-repair_en-conflict2
- [handoff] x2 recent, 2 total, since 2026-11-05: gn remains open pending authority, provenance and rendered inspection; urdu translation remains pending.
  example: G3 remains open pending authority, provenance and rendered inspection; Urdu translation remains pending.
  evidence: job:gqur-301-u06-repair_en-conflict1

Follow `.claude/skills/intel-distill/SKILL.md` exactly; read it and every file it references before starting.

## Scope
`specs/intelligence/daily/2026-11-06.md` only.

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
- (intel-2026-11-04-distill, intel_distill, agy) `sync-owner-checkout.sh` is blocked by 5 modified tracked files in `~/mega_book_for_B.Ed`, generating 18 cron error signals in 24 hours.
- (intel-2026-11-04-distill, intel_distill, agy) Crew briefs prohibiting Playwright lead workers to skip `measure-figure-text.mjs`, causing multiple batch PRs to fail CI `figure-geometry` and trigger CIFIX jobs.
- (intel-2026-11-03-distill, intel_distill, agy) Candidate C1 identifies that review-evidence.mjs inScope regex misses hyphenated design files (unit-02-*.md), causing them to bind across all units of a course.
- (intel-2026-11-03-distill, intel_distill, agy) Candidate C2 notes that citedKeysFor BibTeX-only regex excludes kebab-case primary source excerpts (author-year-topic.md) from unit review manifests.
- (intel-2026-11-03-distill, intel_distill, agy) Candidates C5 and C6 address batch exclusion loops on shared tasks.md trackers and missing course-overview scaffolds during parallel authoring.


## Response snapshot

Distilled 9 reusable intelligence candidates into specs/intelligence/daily/2026-11-06.md; strongest is owner-sync ff-block log flood and 299-commit drift.

## Outcome

- Impact: intel_distill for INTEL Unit 0 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Distilled 9 reusable intelligence candidates into specs/intelligence/daily/2026-11-06.md; strongest is owner-sync ff-block log flood and 299-commit drift.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The owner checkout at `~/mega_book_for_B.Ed` has 5 modified tracked files preventing ff-merge and is now 299 commits behind origin/main.
  - 57 units currently wait in `awaitingG3` status on the crew board while ADR-0019 review signing remains host-blocked.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
