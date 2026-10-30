---
id: crew-intel-2026-10-29-distill
title: crew intel_distill INTEL unit 0
stage: misc
date: 2026-10-28
surface: agent
model: agy
feature: crew-intelligence
branch: crew/intel-2026-10-29-distill
user: crew
command: crew intel_distill
labels: ["crew", "agy", "intel_distill"]
links:
  spec: specs/intelligence/registry.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/intelligence/daily/2026-10-29.md
tests:
 - npm run check:content
---

## Prompt

# Crew job intel-2026-10-29-distill

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/intel-2026-10-29-distill`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, and never touch course content (`docs/`, `licence/`, the Urdu docs trees,
`specs/content/`, `static/img/figures/`, `glossary.json`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.

## Task
Distil today's reusable intelligence (intel-distill skill) into `specs/intelligence/daily/2026-10-29.md`. These clusters grew in the last 24 hours (kind, recent count, total, signature, an example, evidence):

- [failure] x48 recent, 48 total, since 2026-10-28: launch failed: <path> <path>: fatal: '<path>' is already used by worktree at '<path>'
  example: launch failed: /crew-wt/gnas-301-u05-review_en-conflict2 origin/crew/gnas-301-u05-review_en: fatal: 'crew/gnas-301-u05-review_en' is already used by worktree at '/home/a2ahs/crew-wt/gnas-301-u05-revie
  evidence: job:gnas-301-u05-review_en-conflict2, job:gnas-301-u05-review_en-conflict3, job:gnas-301-u06-review_en-conflict2
- [failure] x32 recent, 32 total, since 2026-10-28: left out of the batch: <path> conflicts with main (<path>).; merge fix queued
  example: left out of the batch: crew/gnas-301-u04-review_en conflicts with main (specs/content/gnas-301/tasks.md).; merge fix queued
  evidence: job:gnas-301-u04-review_en, job:gnas-301-u05-review_en, job:gnas-301-u06-review_en
- [log-error] x28 recent, 214 total, since 2026-10-17: n of n content gates failed: check:content-status.
  example: 1 of 13 content gates failed: check:content-status.
  evidence: log:efmp-301-u01-review_ur.2.log, log:efmp-302-u02-repair_en-conflict1.1.log, log:efmp-302-u02-repair_en-conflict4.1.log
- [log-error] x28 recent, 177 total, since 2026-10-17: ✗ <path> is stale - it no longer describes the working tree.
  example: ✗ static/content-status.json is stale - it no longer describes the working tree.
  evidence: log:efmp-302-u02-repair_en-conflict1.1.log, log:efmp-302-u02-repair_en-conflict4.1.log, log:efmp-302-u02-translate.1.log
- [failure] x10 recent, 45 total, since 2026-10-19: worker exited n:
  example: worker exited 1:
  evidence: job:geng-301-u03-review_en-conflict1, job:gqur-301-u11-author, job:gqur-301-u05-translate
- [failure] x8 recent, 8 total, since 2026-10-28: left out of the batch: <path> conflicts with main (<path>, <path>).; merge fix queued
  example: left out of the batch: crew/efmp-301-u05-review_en conflicts with main (specs/content/efmp-301/tasks.md, static/content-status.json).; merge fix queued
  evidence: job:efmp-301-u05-review_en, job:efmp-301-u06-review_en, job:efmp-301-u08-review_en
- [log-error] x7 recent, 86 total, since 2026-10-17: ✗ <path> is missing. run: npm run build:content-status
  example: ✗ static/content-status.json is missing. Run: npm run build:content-status
  evidence: log:efmp-301-u01-review_ur.2.log, log:efmp-302-u06-translate-r1.1.log, log:efmp-302-u06-translate-r1.2.log
- [review] x7 recent, 7 total, since 2026-10-28: previous finding n
  example: Previous finding 1
  evidence: review:specs/content/efmp-301/reviews/unit-05/G3/codex-crew-cycle2.json
- [log-error] x5 recent, 17 total, since 2026-10-19: ? <code>
  example: ? `\n${names} failed. Fix it and re-run; later gates did not run.`
  evidence: log:efmp-305-u01-repair_en-conflict2.1.log, log:efmp-305-u01-repair_en-conflict3.1.log, log:efmp-305-u01-repair_en-conflict4.1.log
- [failure] x5 recent, 7 total, since 2026-10-19: could not join a batch after n merge fixes
  example: could not join a batch after 5 merge fixes
  evidence: job:efmp-305-u01-repair_en, job:gsos-301-u06-author, job:gnas-301-u05-review_en
- [log-error] x4 recent, 68 total, since 2026-10-17: ✗ pipeline gate failed with n finding(s):
  example: ✗ Pipeline gate failed with 2 finding(s):
  evidence: log:efmp-302-u03-translate.1.log, log:efmp-302-u04-translate-r1.1.log, log:efmp-303-u01-translate-r1.1.log
- [log-error] x4 recent, 36 total, since 2026-10-17: n of n content gates failed: check:pipeline-gate.
  example: 1 of 13 content gates failed: check:pipeline-gate.
  evidence: log:efmp-302-u03-translate.1.log, log:efmp-304-u01-translate.2.log, log:efmp-304-u02-translate.2.log
- [log-error] x4 recent, 13 total, since 2026-10-19: n cosmetic wordmark collision(s) - reported, not failed.
  example: 2 cosmetic wordmark collision(s) - reported, not failed.
  evidence: log:efmp-304-u01-repair_en.1.log, log:gqur-301-u03-review_en.1.log, log:gqur-301-u08-review_en.1.log
- [handoff] x3 recent, 3 total, since 2026-10-27: owner must resolve remaining content findings and arrange visual, geometry and assessment evidence; this was the final authorized review cycle.
  example: Owner must resolve remaining content findings and arrange visual, geometry and assessment evidence; this was the final authorized review cycle.
  evidence: job:geng-301-u02-review_en-r1, job:geng-301-u02-review_en-r1-conflict1
- [handoff] x3 recent, 3 total, since 2026-10-28: unit n has completed urdu translation at <path>/ and is ready for independent gn review once gn is certified.
  example: Unit 3 has completed Urdu translation at i18n/ur/.../gnas-301/unit-03/ and is ready for independent G5 review once G3 is certified.
  evidence: job:gnas-301-u03-review_en, job:gqur-300-u03-review_en, job:gqur-300-u05-review_en
- [handoff] x3 recent, 3 total, since 2026-10-28: final cycle escalates remaining source, assessment and budget-order defects; current visual evidence is unavailable and gn remains open.
  example: Final cycle escalates remaining source, assessment and budget-order defects; current visual evidence is unavailable and G3 remains open.
  evidence: job:gqur-300-u06-review_en, job:gqur-300-u06-review_en-conflict1
- [review] x3 recent, 3 total, since 2026-10-28: pn carried
  example: P06 carried
  evidence: review:specs/content/gqur-300/reviews/unit-02/G3/codex-cycle2-20261028.json
- [review] x3 recent, 3 total, since 2026-10-28: host resource limits (agents.md and crew brief) prohibited running npm run build, background dev servers, and playwright
  example: Host resource limits (AGENTS.md and crew brief) prohibited running npm run build, background dev servers, and Playwright
  evidence: review:specs/content/gqur-300/reviews/unit-01/G3/agent-g3-gqur300-u1-run954d5f3b.json, review:specs/content/gnas-301/reviews/unit-03/G3/agent-g3-gnas301-u3-run7a60b18e.json, review:specs/content/efmp-305/reviews/unit-02/G3/agent-g3-efmp-305-u2-runfd523bce.json
- [review] x3 recent, 3 total, since 2026-10-28: visual browser and print inspection (npx viewport, keyboard table scrolling, desktop layout, and an print view) could not be executed because the crew job brief
  example: Visual browser and print inspection (360px viewport, keyboard table scrolling, desktop layout, and A4 print view) could not be executed because the crew job brief explicitly prohibits running npm run 
  evidence: review:specs/content/gnas-301/reviews/unit-04/G3/4361ffe1-f35e-49e5-877d-83d1f34398a8.json, review:specs/content/gnas-301/reviews/unit-01/G3/12ce2621-624d-4c79-bf71-dbaccdf17ac2.json, review:specs/content/efmp-301/reviews/unit-04/G3/8d35e67d-a55f-4595-a37c-c29acbf04727.json
- [review] x3 recent, 3 total, since 2026-10-28: assessment
  example: assessment
  evidence: review:specs/content/geng-301/reviews/unit-02/G3/crew-r1-20261028.json, review:specs/content/efmp-301/reviews/unit-09/G3/codex-efmp301-u09-cycle2-01a17f38-14aa-7e12-b5ba-14390f06b2ef.json
- [review] x3 recent, 3 total, since 2026-10-28: prior finding n remains
  example: Prior finding 4 remains
  evidence: review:specs/content/efmp-301/reviews/unit-11/G3/codex-cycle2-20261028.json
- [review] x3 recent, 3 total, since 2026-10-28: prior findingn partly unresolved
  example: Prior finding6 partly unresolved
  evidence: review:specs/content/efmp-301/reviews/unit-09/G3/codex-efmp301-u09-cycle2-01a17f38-14aa-7e12-b5ba-14390f06b2ef.json
- [review] x3 recent, 3 total, since 2026-10-28: rn partial
  example: R3 partial
  evidence: review:specs/content/efmp-301/reviews/unit-08/G3/codex-cycle2-20261028.json
- [log-error] x2 recent, 33 total, since 2026-10-17: n of n content gates failed: check:pipeline-gate, check:content-status.
  example: 2 of 13 content gates failed: check:pipeline-gate, check:content-status.
  evidence: log:efmp-302-u04-translate-r1.1.log, log:efmp-303-u01-translate-r1.1.log, log:efmp-303-u02-translate.1.log
- [failure] x2 recent, 29 total, since 2026-10-19: the worker exited without committing any change
  example: the worker exited without committing any change
  evidence: job:gict-300-u01-translate-r1, job:efmp-304-u04-translate-r1, job:efmp-303-u02-translate
- [handoff] x2 recent, 2 total, since 2026-10-27: fresh independent gn review is required before gn.
  example: Fresh independent G3 review is required before G5.
  evidence: job:efmp-303-u02-fix
- [handoff] x2 recent, 2 total, since 2026-10-27: scope approval pending for generated content-status refresh; fresh independent gn remains required.
  example: Scope approval pending for generated content-status refresh; fresh independent G3 remains required.
  evidence: job:efmp-305-u05-fix
- [handoff] x2 recent, 2 total, since 2026-10-27: unit n needs a fresh independent gn review; existing findings remain unresolved.
  example: Unit 2 needs a fresh independent G3 review; existing findings remain unresolved.
  evidence: job:gqur-301-u02-fix
- [handoff] x2 recent, 2 total, since 2026-10-27: <course> un fig-un-n and <course> un fig-un-n still need separate visual redraws per the prior repair record.
  example: EFMP-301 U4 fig-U4-3 and EFMP-303 U6 fig-U6-2 still need separate visual redraws per the prior repair record.
  evidence: job:batch-20261027-0132-cifix1
- [handoff] x2 recent, 2 total, since 2026-10-27: pre-existing <path> changes remain unstaged.
  example: Pre-existing static/content-status.json changes remain unstaged.
  evidence: job:efmp-301-u04-fix-r1
- [handoff] x2 recent, 2 total, since 2026-10-27: advisory tracker row is supplied as an artifact for parent insertion.
  example: Advisory tracker row is supplied as an artifact for parent insertion.
  evidence: job:efmp-301-u03-review_en
- [handoff] x2 recent, 2 total, since 2026-10-27: owner action required for unresolved source, blueprint, geometry and review-evidence findings; the authorised review cycles are exhausted.
  example: Owner action required for unresolved source, blueprint, geometry and review-evidence findings; the authorised review cycles are exhausted.
  evidence: job:efmp-301-u05-review_en
- [handoff] x2 recent, 2 total, since 2026-10-27: owner action needed on untaught rrq-n, unspecified erq word limits, and missing <path> evidence.
  example: Owner action needed on untaught RRQ-10, unspecified ERQ word limits, and missing source/render evidence.
  evidence: job:efmp-301-u08-review_en
- [handoff] x2 recent, 2 total, since 2026-10-27: owner handling is required for unresolved assessment, source and pedagogy findings, plus current <path> inspection.
  example: Owner handling is required for unresolved assessment, source and pedagogy findings, plus current mobile/A4 inspection.
  evidence: job:efmp-301-u09-review_en
- [handoff] x2 recent, 2 total, since 2026-10-27: owner escalation required for clinical source support, render evidence and review provenance; no automatic third cycle.
  example: Owner escalation required for clinical source support, render evidence and review provenance; no automatic third cycle.
  evidence: job:efmp-301-u11-review_en
- [handoff] x2 recent, 2 total, since 2026-10-27: owner action needed on modelling claims, unstated erq word limits, source uncertainty, and current visual inspection.
  example: Owner action needed on modelling claims, unstated ERQ word limits, source uncertainty, and current visual inspection.
  evidence: job:efmp-301-u12-review_en
- [handoff] x2 recent, 2 total, since 2026-10-27: owner must resolve <path> defects and missing <path> evidence; no third review cycle is authorized.
  example: Owner must resolve assessment/source defects and missing render/provenance evidence; no third review cycle is authorized.
  evidence: job:efmp-305-u01-review_en
- [handoff] x2 recent, 2 total, since 2026-10-27: owner action needed on assessment coverage, erq n’s missing stimulus, <path> gaps and unavailable render checks; final review cycle exhausted.
  example: Owner action needed on assessment coverage, ERQ 3’s missing stimulus, authority/provenance gaps and unavailable render checks; final review cycle exhausted.
  evidence: job:geng-300-u02-review_en-r1
- [handoff] x2 recent, 2 total, since 2026-10-27: owner action is required for remaining content defects and missing <path> evidence before another review cycle.
  example: Owner action is required for remaining content defects and missing render/provenance evidence before another review cycle.
  evidence: job:geng-301-u01-review_en-r1
- [handoff] x2 recent, 2 total, since 2026-10-27: owner must resolve cycle history, provenance and fresh render evidence; author repairs remain documented.
  example: Owner must resolve cycle history, provenance and fresh render evidence; author repairs remain documented.
  evidence: job:gnas-301-u02-review_en

Follow `.claude/skills/intel-distill/SKILL.md` exactly; read it and every file it references before starting.

## Scope
`specs/intelligence/daily/2026-10-29.md` only.

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
- (intel-2026-10-28-distill, intel_distill, agy) Commit `d70aa57a` re-added `static/content-status.json` to git tracking on main, regressing task M1 and triggering 40+ stale/check:content-status gate failures across workers.
- (intel-2026-10-28-distill, intel_distill, agy) Decoupling publication G4/G5 tracker assertions from the temporary `reviewed` flip in `check:pipeline-gate` (C2) will prevent false-alarm pipeline gate failures during translation drafts.
- (intel-2026-10-27-distill, intel_distill, agy) scripts/lib/review-evidence.mjs binds translation handoffs to G2 manifest; adding /translations/ to exclusions would prevent post-translation G2 invalidation.
- (intel-2026-10-27-distill, intel_distill, agy) PR #329 resolved the baseline workers.test.mjs agy_claude assertion; all 69 crew tests now pass.
- (intel-2026-10-26-distill, intel_distill, agy) Baseline test failure in `tests/crew/workers.test.mjs` ('expected codex, received agy_claude') is pre-existing on main and resolved in PR #329 (task M3).


## Response snapshot

Distilled 9 reusable intelligence candidates for 2026-10-29 covering worktree leaks, Claude quota regex evasion, tasks.md table collisions, and assessment ERQ word-count escalations.

## Outcome

- Impact: intel_distill for INTEL Unit 0 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Distilled 9 reusable intelligence candidates for 2026-10-29 covering worktree leaks, Claude quota regex evasion, tasks.md table collisions, and assessment ERQ word-count escalations.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Claude CLI's quota message 'hit your 5-hour limit' evades scripts/crew/workers.mjs QUOTA_RE because \w does not match the hyphen in 5-hour, burning job retry attempts.
  - Concurrent jobs in course focus repeatedly collide on specs/content/<course>/tasks.md table rows; extending resolveSharedConflicts with markdown table row reconciliation would eliminate mass batch exclusions.
  - .claude/settings.json permissions.deny contains a deprecated Write(...) rule that generates a CLI startup warning on every Claude invocation (Edit covers all file tools).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
