---
id: crew-intel-2026-10-20-distill
title: crew intel_distill INTEL unit 0
stage: misc
date: 2026-10-19
surface: agent
model: agy
feature: crew-intelligence
branch: crew/intel-2026-10-20-distill
user: crew
command: crew intel_distill
labels: ["crew", "agy", "intel_distill"]
links:
  spec: specs/intelligence/registry.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/intelligence/daily/2026-10-20.md
tests:
 - npm run check:content
---

## Prompt

# Crew job intel-2026-10-20-distill

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/intel-2026-10-20-distill`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, and never touch course content (`docs/`, `licence/`, the Urdu docs trees,
`specs/content/`, `static/img/figures/`, `glossary.json`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.

## Task
Distil today's reusable intelligence (intel-distill skill) into `specs/intelligence/daily/2026-10-20.md`. These clusters grew in the last 24 hours (kind, recent count, total, signature, an example, evidence):

- [log-error] x61 recent, 75 total, since 2026-10-17: n of n content gates failed: check:content-status.
  example: 1 of 13 content gates failed: check:content-status.
  evidence: log:efmp-301-u01-review_ur.2.log, log:efmp-302-u02-repair_en-conflict1.1.log, log:efmp-302-u02-repair_en-conflict4.1.log
- [log-error] x41 recent, 50 total, since 2026-10-17: ✗ <path> is stale - it no longer describes the working tree.
  example: ✗ static/content-status.json is stale - it no longer describes the working tree.
  evidence: log:efmp-302-u02-repair_en-conflict1.1.log, log:efmp-302-u02-repair_en-conflict4.1.log, log:efmp-302-u02-translate.1.log
- [log-error] x33 recent, 43 total, since 2026-10-17: ✗ <path> is missing. run: npm run build:content-status
  example: ✗ static/content-status.json is missing. Run: npm run build:content-status
  evidence: log:efmp-301-u01-review_ur.2.log, log:efmp-302-u06-translate-r1.1.log, log:efmp-302-u06-translate-r1.2.log
- [failure] x28 recent, 28 total, since 2026-10-19: left out of the batch: merged onto main's latest state, <path> fails npm run check:content (it could not join the hourly batch):; merge fix queued
  example: left out of the batch: Merged onto main's latest state, crew/efmp-302-u02-repair_en fails npm run check:content (it could not join the hourly batch):; merge fix queued
  evidence: job:efmp-302-u02-repair_en, job:efmp-304-u01-repair_en, job:efmp-305-u01-repair_en
- [log-error] x25 recent, 28 total, since 2026-10-17: ✗ pipeline gate failed with n finding(s):
  example: ✗ Pipeline gate failed with 2 finding(s):
  evidence: log:efmp-302-u03-translate.1.log, log:efmp-302-u04-translate-r1.1.log, log:efmp-303-u01-translate-r1.1.log
- [failure] x21 recent, 30 total, since 2026-10-17: ✗ <path> is missing. run: npm run build:content-status
  example: ✗ static/content-status.json is missing. Run: npm run build:content-status
  evidence: job:efmp-305-u00-salvage, job:efmp-301-u01-review_ur, job:efmp-304-u02-review_en
- [log-error] x20 recent, 21 total, since 2026-10-17: n of n content gates failed: check:pipeline-gate, check:content-status.
  example: 2 of 13 content gates failed: check:pipeline-gate, check:content-status.
  evidence: log:efmp-302-u04-translate-r1.1.log, log:efmp-303-u01-translate-r1.1.log, log:efmp-303-u02-translate.1.log
- [failure] x17 recent, 17 total, since 2026-10-19: the worker exited without committing any change
  example: the worker exited without committing any change
  evidence: job:gict-300-u01-translate-r1, job:efmp-304-u04-translate-r1, job:efmp-303-u02-translate
- [log-error] x16 recent, 22 total, since 2026-10-17: error: the user rejected permission to use this specific tool call.
  example: Error: The user rejected permission to use this specific tool call.
  evidence: log:efmp-301-u01-review_ur.1.log, log:efmp-302-u02-repair_en-conflict2.1.log, log:efmp-302-u02-repair_en-conflict2.2.log
- [failure] x12 recent, 14 total, since 2026-10-17: ✗ pipeline gate failed with n finding(s):
  example: ✗ Pipeline gate failed with 1 finding(s):
  evidence: job:efmp-304-u01-translate, job:efmp-304-u02-translate, job:efmp-304-u04-translate
- [log-error] x7 recent, 7 total, since 2026-10-19: ? <code>
  example: ? `\n${names} failed. Fix it and re-run; later gates did not run.`
  evidence: log:efmp-305-u01-repair_en-conflict2.1.log, log:efmp-305-u01-repair_en-conflict3.1.log, log:efmp-305-u01-repair_en-conflict4.1.log
- [log-error] x5 recent, 8 total, since 2026-10-17: n of n content gates failed: check:pipeline-gate.
  example: 1 of 13 content gates failed: check:pipeline-gate.
  evidence: log:efmp-302-u03-translate.1.log, log:efmp-304-u01-translate.2.log, log:efmp-304-u02-translate.2.log
- [failure] x5 recent, 6 total, since 2026-10-17: ✗ <path> is stale - it no longer describes the working tree.
  example: ✗ static/content-status.json is stale - it no longer describes the working tree.
  evidence: job:gict-300-u02-translate, job:efmp-302-u06-translate-r1, job:efmp-304-u03-translate-r1
- [log-error] x4 recent, 6 total, since 2026-10-17: error: pathspec '<path>' did not match any file(s) known to git
  example: error: pathspec 'static/content-status.json' did not match any file(s) known to git
  evidence: log:efmp-302-u02-repair_en-conflict2.2.log, log:efmp-304-u02-review_en-cifix2.1.log, log:geng-300-u01-repair_en-conflict1.1.log
- [handoff] x4 recent, 4 total, since 2026-10-18: translation remains draft pending english gn repairs, full-page <path> inspection and independent gn.
  example: Translation remains draft pending English G3 repairs, full-page RTL/print inspection and independent G5.
  evidence: job:efmp-304-u02-translate, job:efmp-304-u02-translate-r1
- [handoff] x4 recent, 4 total, since 2026-10-18: all n key_terms in unit n index.mdx remain unbanked in terminology.csv (flagged in <path>) and await curriculum owner banking.
  example: All 15 key_terms in Unit 4 index.mdx remain unbanked in terminology.csv (flagged in concepts/unit-04.md) and await curriculum owner banking.
  evidence: job:gict-300-u04-translate, job:gqur-300-u02-translate, job:gqur-300-u03-translate
- [handoff] x4 recent, 4 total, since 2026-10-19: translation remains draft pending independent gn and rendered urdu inspection; builds and servers were prohibited.
  example: Translation remains draft pending independent G5 and rendered Urdu inspection; builds and servers were prohibited.
  evidence: job:efmp-303-u06-translate, job:efmp-303-u06-translate-r1
- [review] x4 recent, 4 total, since 2026-10-19: advisory on vocabulary
  example: Advisory on vocabulary
  evidence: review:specs/content/efmp-303/reviews/unit-02/G5/agent-g5-efmp303-u2-runb652e73e.json, review:specs/content/efmp-303/reviews/unit-02/G5/agent-g5-efmp303-u2-run54ea2d76.json
- [log-error] x3 recent, 4 total, since 2026-10-17: fatal: path '<path>' exists on disk, but not in '<path>'
  example: fatal: path 'static/content-status.json' exists on disk, but not in 'origin/main'
  evidence: log:efmp-302-u02-repair_en-conflict2.2.log, log:gpks-402-u00-salvage-conflict3.1.log, log:gqur-300-u05-translate.3.log
- [log-error] x3 recent, 4 total, since 2026-10-17: automatic merge failed; fix conflicts and then commit the result.
  example: Automatic merge failed; fix conflicts and then commit the result.
  evidence: log:geng-301-u00-salvage-conflict1.1.log, log:geng-301-u00-salvage-conflict2.1.log, log:gpks-402-u00-salvage-conflict3.1.log
- [handoff] x3 recent, 3 total, since 2026-10-19: declared key_terms in index.mdx are bound to terminology.csv; all n unbanked concept labels from <path> are documented in <path> for curriculum owner review.
  example: Declared key_terms in index.mdx are bound to terminology.csv; all 12 unbanked concept labels from concepts/unit-01.md are documented in reviews/unit-01/G4/translation-handoff.md for curriculum owner r
  evidence: job:gict-300-u01-translate-r1, job:gict-300-u04-translate-r1, job:gict-300-u06-translate-r1
- [failure] x3 recent, 3 total, since 2026-10-19: left out of the batch: <path> conflicts with main (it could not join the hourly batch).; merge fix queued
  example: left out of the batch: crew/gnas-301-u03-repair_en conflicts with main (it could not join the hourly batch).; merge fix queued
  evidence: job:gnas-301-u03-repair_en, job:gnas-301-u05-repair_en, job:geng-301-u05-review_en
- [handoff] x3 recent, 3 total, since 2026-10-19: translation remains draft; <path> rendered inspection pending.
  example: Translation remains draft; narrow-width/A4 rendered inspection pending.
  evidence: job:efmp-304-u01-repair_en-conflict2, job:efmp-304-u01-repair_en-conflict3, job:efmp-304-u01-repair_en-conflict4
- [log-error] x3 recent, 3 total, since 2026-10-18: ✗ figure gate failed with n finding(s):
  example: ✗ Figure gate failed with 6 finding(s):
  evidence: log:efmp-303-u03-translate.1.log, log:efmp-305-u01-translate.1.log, log:gsos-301-u01-translate.1.log
- [log-error] x3 recent, 3 total, since 2026-10-18: justification or are rejected.
  example: justification or are rejected.
  evidence: log:efmp-303-u05-review_en.2.log, log:efmp-304-u01-repair_en-conflict5.1.log, log:efmp-305-u01-repair_en-conflict3.1.log
- [phr] x3 recent, 3 total, since 2026-10-19: next experiment (smallest change to try): targeted repair pr fixing fn, fn, and fn followed by fresh re-review.
  example: next experiment (smallest change to try): Targeted repair PR fixing f1, f2, and f3 followed by fresh re-review.
  evidence: phr:history/prompts/geng-300/0173-geng-300-u02-independent-g3-review.misc.prompt.md, phr:history/prompts/geng-300/0172-geng-300-u01-independent-g3-review.misc.prompt.md, phr:history/prompts/efmp-304/0171-efmp-304-u01-independent-g3-review.misc.prompt.md
- [phr] x3 recent, 3 total, since 2026-10-19: failure modes observed: <code> and <code> fail at repo level due to out-of-scope files in sibling units (<course> unit n depth overrun; <course> alt mismatches)
  example: failure modes observed: `check:depth-gate` and `check:figures` fail at repo level due to out-of-scope files in sibling units (EFMP-305 Unit 6 depth overrun; EFMP-304 alt mismatches), preventing a clea
  evidence: phr:history/prompts/efmp-305/0155-tex112-efmp305-u3-g3-review.misc.prompt.md, phr:history/prompts/efmp-305/0154-tex111-efmp305-u2-g3-review.misc.prompt.md, phr:history/prompts/efmp-305/0153-tex110-efmp305-u1-g3-review.misc.prompt.md
- [log-error] x2 recent, 4 total, since 2026-10-17: review evidence rejected: stale or incomplete input manifest
  example: Review evidence rejected: stale or incomplete input manifest
  evidence: log:efmp-301-u01-review_ur.2.log, log:efmp-303-u04-review_en.2.log, log:efmp-304-u03-review_en.1.log
- [log-error] x2 recent, 3 total, since 2026-10-17: review evidence rejected: evidence file changed
  example: Review evidence rejected: evidence file changed
  evidence: log:efmp-304-u03-review_en.1.log, log:geng-301-u01-review_en.1.log, log:geng-301-u04-review_en.1.log
- [handoff] x2 recent, 2 total, since 2026-10-18: translation remains draft pending accepted gn and fresh independent gn with rendered urdu inspection.
  example: Translation remains draft pending accepted G3 and fresh independent G5 with rendered Urdu inspection.
  evidence: job:gict-300-u03-translate
- [handoff] x2 recent, 2 total, since 2026-10-18: the gn tracker row in <path> is set to in-progress (▣) and translation_status remains draft pending independent gn review.
  example: The G4 tracker row in specs/content/gict-300/tasks.md is set to in-progress (▣) and translation_status remains draft pending independent G5 review.
  evidence: job:gict-300-u04-translate, job:gqur-300-u02-translate
- [handoff] x2 recent, 2 total, since 2026-10-18: gn tracker row in <path> is set to in-progress (▣) and translation_status remains draft pending fresh independent gn review.
  example: G4 tracker row in specs/content/gqur-300/tasks.md is set to in-progress (▣) and translation_status remains draft pending fresh independent G5 review.
  evidence: job:gqur-300-u03-translate, job:gqur-300-u03-translate-r1
- [handoff] x2 recent, 2 total, since 2026-10-18: all n key_terms (budget, interest, loss, profit, simple interest) and n concept graph labels are unbanked proposals awaiting curriculum owner decision.
  example: All 5 key_terms (Budget, Interest, Loss, Profit, Simple interest) and 11 concept graph labels are unbanked proposals awaiting curriculum owner decision.
  evidence: job:gqur-300-u06-translate, job:gqur-300-u06-translate-r1
- [handoff] x2 recent, 2 total, since 2026-10-18: gn tracker row in <path> is set to in-progress (▣) pointing to <path> with initials left blank.
  example: G4 tracker row in specs/content/gqur-300/tasks.md is set to in-progress (▣) pointing to reviews/unit-06/G4/handoff.md with initials left blank.
  evidence: job:gqur-300-u06-translate, job:gqur-300-u06-translate-r1
- [handoff] x2 recent, 2 total, since 2026-10-19: unit n urdu mirror has complete n-file structural, heading, and figure parity with english baseline <sha>; translation_status remains draft pending fresh indepe
  example: Unit 1 Urdu mirror has complete 7-file structural, heading, and figure parity with English baseline ee13c3e2; translation_status remains draft pending fresh independent G5 review.
  evidence: job:gict-300-u01-translate-r1, job:gict-300-u04-translate-r1
- [handoff] x2 recent, 2 total, since 2026-10-19: translation remains draft; fresh independent gn and full-page <path> inspection remain pending.
  example: Translation remains draft; fresh independent G5 and full-page RTL/A4 inspection remain pending.
  evidence: job:efmp-304-u06-translate-r1
- [handoff] x2 recent, 2 total, since 2026-10-19: translation remains draft; independent <path>, full-page rendering and existing owner decisions remain pending.
  example: Translation remains draft; independent G3/G5, full-page rendering and existing owner decisions remain pending.
  evidence: job:efmp-302-u06-translate-r1
- [handoff] x2 recent, 2 total, since 2026-10-19: all n .ur.svg figure variants and derived dark variants are wired in topics n-n with matching carrier alt text and passing figures:variants:check.
  example: All 8 .ur.svg figure variants and derived dark variants are wired in topics 1-4 with matching carrier alt text and passing figures:variants:check.
  evidence: job:efmp-303-u01-translate, job:efmp-303-u04-translate
- [handoff] x2 recent, 2 total, since 2026-10-19: structural, figure, and terminology parity verified clean under temporary reviewed flip; translation_status stays draft pending independent gn review.
  example: Structural, figure, and terminology parity verified clean under temporary reviewed flip; translation_status stays draft pending independent G5 review.
  evidence: job:efmp-303-u01-translate, job:efmp-303-u04-translate
- [handoff] x2 recent, 2 total, since 2026-10-18: gn remains open; recorded content repairs and fresh independent <path> checks are pending.
  example: G3 remains open; recorded content repairs and fresh independent assessment/render checks are pending.
  evidence: job:efmp-303-u03-review_en

Follow `.claude/skills/intel-distill/SKILL.md` exactly; read it and every file it references before starting.

## Scope
`specs/intelligence/daily/2026-10-20.md` only.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. The acceptance checks in your task pass; `npm run check:content` reports nothing new against origin/main;
   any `node --test tests/crew/*.test.mjs` or unit tests covering what you changed pass.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.


## Response snapshot

Distilled 10 reusable intelligence candidates into specs/intelligence/daily/2026-10-20.md, led by worktree content-status regeneration and external /tmp permission rejections.

## Outcome

- Impact: intel_distill for INTEL Unit 0 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Distilled 10 reusable intelligence candidates into specs/intelligence/daily/2026-10-20.md, led by worktree content-status regeneration and external /tmp permission rejections.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - C1 (I-0007 recurrence) and C2 (I-0008 recurrence) account for over 150 gate errors and 16 permission rejections; ready for weekly maintenance promotion.
  - I-0005 batch content-status fix verified effective, dropping from 25 signals to 3 in the latest slot.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
