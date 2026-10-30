---
id: crew-intel-2026-10-31-distill
title: crew intel_distill INTEL unit 0
stage: misc
date: 2026-10-30
surface: agent
model: agy
feature: crew-intelligence
branch: crew/intel-2026-10-31-distill
user: crew
command: crew intel_distill
labels: ["crew", "agy", "intel_distill"]
links:
  spec: specs/intelligence/registry.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/crew-intelligence/crew-intel-2026-10-31-distill.misc.prompt.md
 - specs/intelligence/daily/2026-10-31.md
tests:
 - npm run check:content
---

## Prompt

# Crew job intel-2026-10-31-distill

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/intel-2026-10-31-distill`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, and never touch course content (`docs/`, `licence/`, the Urdu docs trees,
`specs/content/`, `static/img/figures/`, `glossary.json`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.

## Task
Distil today's reusable intelligence (intel-distill skill) into `specs/intelligence/daily/2026-10-31.md`. These clusters grew in the last 24 hours (kind, recent count, total, signature, an example, evidence):

- [log-error] x3 recent, 218 total, since 2026-10-17: n of n content gates failed: check:content-status.
  example: 1 of 13 content gates failed: check:content-status.
  evidence: log:efmp-301-u01-review_ur.2.log, log:efmp-302-u02-repair_en-conflict1.1.log, log:efmp-302-u02-repair_en-conflict4.1.log
- [log-error] x3 recent, 181 total, since 2026-10-17: ✗ <path> is stale - it no longer describes the working tree.
  example: ✗ static/content-status.json is stale - it no longer describes the working tree.
  evidence: log:efmp-302-u02-repair_en-conflict1.1.log, log:efmp-302-u02-repair_en-conflict4.1.log, log:efmp-302-u02-translate.1.log
- [failure] x3 recent, 10 total, since 2026-10-19: could not join a batch after n merge fixes
  example: could not join a batch after 5 merge fixes
  evidence: job:efmp-305-u01-repair_en, job:gsos-301-u06-author, job:gnas-301-u05-review_en
- [review] x3 recent, 3 total, since 2026-10-30: fn sources
  example: F02 sources
  evidence: review:specs/content/gpks-402/reviews/unit-06/G3/01a18ccb-4a8c-7c60-8ed2-7c546d08340e.json
- [log-error] x2 recent, 35 total, since 2026-10-17: n of n content gates failed: check:pipeline-gate, check:content-status.
  example: 2 of 13 content gates failed: check:pipeline-gate, check:content-status.
  evidence: log:efmp-302-u04-translate-r1.1.log, log:efmp-303-u01-translate-r1.1.log, log:efmp-303-u02-translate.1.log
- [failure] x2 recent, 34 total, since 2026-10-28: left out of the batch: <path> conflicts with main (<path>).; merge fix queued
  example: left out of the batch: crew/gnas-301-u04-review_en conflicts with main (specs/content/gnas-301/tasks.md).; merge fix queued
  evidence: job:gnas-301-u04-review_en, job:gnas-301-u05-review_en, job:gnas-301-u06-review_en
- [handoff] x2 recent, 2 total, since 2026-10-30: repair recorded assessment and chronology defects, then obtain fresh review with verified sources, provenance and <path> inspection.
  example: Repair recorded assessment and chronology defects, then obtain fresh review with verified sources, provenance and screen/print inspection.
  evidence: job:gpks-402-u02-review_en
- [handoff] x2 recent, 2 total, since 2026-10-30: author must repair source support, assessment scoring and vocabulary; host must supply provenance and rendered-page evidence. <path> remain open.
  example: Author must repair source support, assessment scoring and vocabulary; host must supply provenance and rendered-page evidence. G3/G5 remain open.
  evidence: job:gpks-402-u06-review_en
- [handoff] x2 recent, 2 total, since 2026-10-30: english author must repair scoring and unresolved gn findings before translation resumes.
  example: English author must repair scoring and unresolved G3 findings before translation resumes.
  evidence: job:gpks-402-u06-translate
- [handoff] x2 recent, 2 total, since 2026-10-30: english author must repair scoring and unresolved gn findings before translation resumes; status remains draft.
  example: English author must repair scoring and unresolved G3 findings before translation resumes; status remains draft.
  evidence: job:gpks-402-u06-translate-r1
- [log-error] x1 recent, 87 total, since 2026-10-17: ✗ <path> is missing. run: npm run build:content-status
  example: ✗ static/content-status.json is missing. Run: npm run build:content-status
  evidence: log:efmp-301-u01-review_ur.2.log, log:efmp-302-u06-translate-r1.1.log, log:efmp-302-u06-translate-r1.2.log
- [log-error] x1 recent, 69 total, since 2026-10-17: ✗ pipeline gate failed with n finding(s):
  example: ✗ Pipeline gate failed with 2 finding(s):
  evidence: log:efmp-302-u03-translate.1.log, log:efmp-302-u04-translate-r1.1.log, log:efmp-303-u01-translate-r1.1.log
- [log-error] x1 recent, 13 total, since 2026-10-17: automatic merge failed; fix conflicts and then commit the result.
  example: Automatic merge failed; fix conflicts and then commit the result.
  evidence: log:geng-301-u00-salvage-conflict1.1.log, log:geng-301-u00-salvage-conflict2.1.log, log:gpks-402-u00-salvage-conflict3.1.log
- [log-error] x1 recent, 5 total, since 2026-10-17: fatal: pathspec '<path>' did not match any files
  example: fatal: pathspec 'history/prompts/efmp-302/0175-diagnose-unit-six-ci-failure.misc.prompt.md' did not match any files
  evidence: log:efmp-302-u06-translate-cifix1.1.log, log:efmp-304-u03-review_en-cifix1.1.log, log:geng-301-u05-review_en-conflict1.1.log
- [phr] x1 recent, 1 total, since 2026-10-29: reflection: exaggeration alone barely moves this clone; test the reference recording first next time.
  example: reflection: exaggeration alone barely moves this clone; test the reference recording first next time.
  evidence: phr:history/prompts/video-studio/0898-bilal-energy-cast-handoff.misc.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-29: next experiment (smallest change to try): check:figures requires a <code> note on any map row.
  example: next experiment (smallest change to try): check:figures requires a `Source:` note on any map row.
  evidence: phr:history/prompts/gpks-402/2434-sourced-pakistan-map-for-gpks402-u4.misc.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-29: reflection: ene flakes block crew merges repeatedly; a policy decision is overdue.
  example: reflection: e2e flakes block crew merges repeatedly; a policy decision is overdue.
  evidence: phr:history/prompts/general/2436-crew-status-and-failing-ci.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-29: failure modes observed: ene latency flake rotates across tests, so retries are a lottery.
  example: failure modes observed: e2e latency flake rotates across tests, so retries are a lottery.
  evidence: phr:history/prompts/general/2436-crew-status-and-failing-ci.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-29: next experiment (smallest change to try): raise ene per-test timeout and perf budget tolerance in ci only.
  example: next experiment (smallest change to try): raise e2e per-test timeout and perf budget tolerance in CI only.
  evidence: phr:history/prompts/general/2436-crew-status-and-failing-ci.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-29: reflection: leeway is ci-only so local runs still catch real regressions at the spec budget.
  example: reflection: leeway is CI-only so local runs still catch real regressions at the spec budget.
  evidence: phr:history/prompts/general/2437-ci-e2e-timeout-leeway.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-29: failure modes observed: rotating latency timeouts in supabase-backed ene.
  example: failure modes observed: rotating latency timeouts in Supabase-backed e2e.
  evidence: phr:history/prompts/general/2437-ci-e2e-timeout-leeway.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-29: next experiment (smallest change to try): watch the next n crew batch runs.
  example: next experiment (smallest change to try): watch the next 5 crew batch runs.
  evidence: phr:history/prompts/general/2437-ci-e2e-timeout-leeway.general.prompt.md
- [handoff] x1 recent, 1 total, since 2026-10-30: editing scripts listed under manifestroots (such as check-figures.mjs) invalidates review evidence corpus-wide; new gate checks must be independent scripts call
  example: Editing scripts listed under manifestRoots (such as check-figures.mjs) invalidates review evidence corpus-wide; new gate checks must be independent scripts called via npm test.
  evidence: job:intel-2026-10-30-distill
- [handoff] x1 recent, 1 total, since 2026-10-30: crew briefs prohibiting playwright cause workers to skip <path> node <path>, causing avoidable ci figure-geometry failures.
  example: Crew briefs prohibiting Playwright cause workers to skip scripts/heavy.sh node scripts/measure-figure-text.mjs, causing avoidable CI figure-geometry failures.
  evidence: job:intel-2026-10-30-distill
- [handoff] x1 recent, 1 total, since 2026-10-30: review-evidence citedkeysfor regex excludes source excerpt filenames having descriptive slug suffixes after the year (e.g. hassan-n-two-nation.md).
  example: review-evidence citedKeysFor regex excludes source excerpt filenames having descriptive slug suffixes after the year (e.g. hassan-2020-two-nation.md).
  evidence: job:intel-2026-10-30-distill
- [log-error] x1 recent, 1 total, since 2026-10-30: the <code> gate failed because <code> is stale after the merge. let me regenerate it.
  example: The `check:content-status` gate failed because `static/content-status.json` is stale after the merge. Let me regenerate it.
  evidence: log:gpks-402-u06-review_en-conflict1.1.log
- [log-error] x1 recent, 1 total, since 2026-10-30: final verification: the first post-tracker check failed only generated content-status freshness. ran "'<code> to refresh the ignored local metadata, then all n 
  example: Final verification: the first post-tracker check failed only generated content-status freshness. Ran "'`npm run build:content-status` to refresh the ignored local metadata, then all 13 content gates p
  evidence: log:gpks-402-u06-review_en.1.log
- [phr] x1 recent, 1 total, since 2026-10-30: reflection: the sample voices run about n.n words a second with gaps, slower than the brand bible's n wpm; size scripts from the measured pace.
  example: reflection: the sample voices run about 2.2 words a second with gaps, slower than the brand bible's 150 wpm; size scripts from the measured pace.
  evidence: phr:history/prompts/video-studio/0904-licence-intro-script-draft.misc.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-30: reflection: the policy does not make the licence mandatory for jobs or tie it to pay; the section says neither.
  example: reflection: the policy does not make the licence mandatory for jobs or tie it to pay; the section says neither.
  evidence: phr:history/prompts/015-licence-content-tree/0903-why-the-teaching-licence-matters.misc.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-30: reflection: a busy or gradient backdrop breaks a single-colour flood fill; model the background per row.
  example: reflection: a busy or gradient backdrop breaks a single-colour flood fill; model the background per row.
  evidence: phr:history/prompts/video-studio/0901-cast-layers-cut.misc.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-30: reflection: structural gates cannot resolve semantic scoring defects.
  example: reflection: Structural gates cannot resolve semantic scoring defects.
  evidence: phr:history/prompts/general/20261048-gpks-402-u06-translation-retry.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-30: failure modes observed: retry scheduled before prerequisite repair landed.
  example: failure modes observed: Retry scheduled before prerequisite repair landed.
  evidence: phr:history/prompts/general/20261048-gpks-402-u06-translation-retry.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-30: next experiment (smallest change to try): separate author repair of rrq n and erq n.
  example: next experiment (smallest change to try): Separate author repair of RRQ 8 and ERQ 2.
  evidence: phr:history/prompts/general/20261048-gpks-402-u06-translation-retry.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-30: failure modes observed: english stems and scoring demands disagree despite green content gates.
  example: failure modes observed: English stems and scoring demands disagree despite green content gates.
  evidence: phr:history/prompts/general/20261047-gpks-402-u06-translation-blocked.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-30: next experiment (smallest change to try): repair the english scoring demands before translation.
  example: next experiment (smallest change to try): Repair the English scoring demands before translation.
  evidence: phr:history/prompts/general/20261047-gpks-402-u06-translation-blocked.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-30: reflection: duplicate rows in tasks.md caused check:pipeline-gate to fail; keeping main's newer gn row fixed the gate.
  example: reflection: duplicate rows in tasks.md caused check:pipeline-gate to fail; keeping main's newer G2 row fixed the gate.
  evidence: phr:history/prompts/gpks-402/2435-resolve-gpks402-u04-review_en-conflict1.misc.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-30: failure modes observed: duplicate (unit, stage) rows in tasks.md caused check:pipeline-gate to fail; resolved by keeping main's row.
  example: failure modes observed: duplicate (Unit, Stage) rows in tasks.md caused check:pipeline-gate to fail; resolved by keeping main's row.
  evidence: phr:history/prompts/gpks-402/2435-resolve-gpks402-u04-review_en-conflict1.misc.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-30: failure modes observed: unauthenticated source excerpts, postdated claims attributed to n, <path> mismatch, missing render and author-run evidence. local pdftot
  example: failure modes observed: Unauthenticated source excerpts, postdated claims attributed to 1999, rubric/stem mismatch, missing render and author-run evidence. Local pdftotext unavailable; publisher PDF i
  evidence: phr:history/prompts/general/20261046-gpks402-unit06-advisory-g3.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-30: next experiment (smallest change to try): repair original-source provenance and scoring alignment before preparing a fresh review bundle.
  example: next experiment (smallest change to try): Repair original-source provenance and scoring alignment before preparing a fresh review bundle.
  evidence: phr:history/prompts/general/20261046-gpks402-unit06-advisory-g3.general.prompt.md
- [review] x1 recent, 1 total, since 2026-10-30: fn provenance
  example: F01 provenance
  evidence: review:specs/content/gpks-402/reviews/unit-06/G3/01a18ccb-4a8c-7c60-8ed2-7c546d08340e.json

Follow `.claude/skills/intel-distill/SKILL.md` exactly; read it and every file it references before starting.

## Scope
`specs/intelligence/daily/2026-10-31.md` only.

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
- (intel-2026-10-30-distill, intel_distill, agy) Editing scripts listed under manifestRoots (such as check-figures.mjs) invalidates review evidence corpus-wide; new gate checks must be independent scripts called via npm test.
- (intel-2026-10-30-distill, intel_distill, agy) Crew briefs prohibiting Playwright cause workers to skip scripts/heavy.sh node scripts/measure-figure-text.mjs, causing avoidable CI figure-geometry failures.
- (intel-2026-10-30-distill, intel_distill, agy) review-evidence citedKeysFor regex excludes source excerpt filenames having descriptive slug suffixes after the year (e.g. hassan-2020-two-nation.md).
- (intel-2026-10-29-distill, intel_distill, agy) Claude CLI's quota message 'hit your 5-hour limit' evades scripts/crew/workers.mjs QUOTA_RE because \w does not match the hyphen in 5-hour, burning job retry attempts.
- (intel-2026-10-29-distill, intel_distill, agy) Concurrent jobs in course focus repeatedly collide on specs/content/<course>/tasks.md table rows; extending resolveSharedConflicts with markdown table row reconciliation would eliminate mass batch exclusions.


## Response snapshot

10 candidates; hold translation on G3 escalations, leak-proof e2e users, and reconcile tasks.md table rows.

## Outcome

- Impact: intel_distill for INTEL Unit 0 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: 10 candidates; hold translation on G3 escalations, leak-proof e2e users, and reconcile tasks.md table rows.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Translation and retry jobs should be held when G3 report disposition is escalate or revise with unresolved blocking defects (candidate C1).
  - Unpaged PostgREST queries in admin pages risk hitting the 1000-row limit when test accounts accumulate; use fetchAllPages (candidate C2).
  - Merging tasks.md table rows across concurrent course jobs requires row reconciliation by (Unit, Stage) to avoid duplicate rows and pipeline gate failures (candidate C3).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
