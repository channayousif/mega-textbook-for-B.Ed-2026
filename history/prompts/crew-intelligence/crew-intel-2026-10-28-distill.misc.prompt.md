---
id: crew-intel-2026-10-28-distill
title: crew intel_distill INTEL unit 0
stage: misc
date: 2026-10-27
surface: agent
model: agy
feature: crew-intelligence
branch: crew/intel-2026-10-28-distill
user: crew
command: crew intel_distill
labels: ["crew", "agy", "intel_distill"]
links:
  spec: specs/intelligence/registry.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/intelligence/daily/2026-10-28.md
tests:
 - npm run check:content
---

## Prompt

# Crew job intel-2026-10-28-distill

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/intel-2026-10-28-distill`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, and never touch course content (`docs/`, `licence/`, the Urdu docs trees,
`specs/content/`, `static/img/figures/`, `glossary.json`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.

## Task
Distil today's reusable intelligence (intel-distill skill) into `specs/intelligence/daily/2026-10-28.md`. These clusters grew in the last 24 hours (kind, recent count, total, signature, an example, evidence):

- [log-error] x43 recent, 149 total, since 2026-10-17: ✗ <path> is stale - it no longer describes the working tree.
  example: ✗ static/content-status.json is stale - it no longer describes the working tree.
  evidence: log:efmp-302-u02-repair_en-conflict1.1.log, log:efmp-302-u02-repair_en-conflict4.1.log, log:efmp-302-u02-translate.1.log
- [log-error] x40 recent, 186 total, since 2026-10-17: n of n content gates failed: check:content-status.
  example: 1 of 13 content gates failed: check:content-status.
  evidence: log:efmp-301-u01-review_ur.2.log, log:efmp-302-u02-repair_en-conflict1.1.log, log:efmp-302-u02-repair_en-conflict4.1.log
- [log-error] x16 recent, 64 total, since 2026-10-17: ✗ pipeline gate failed with n finding(s):
  example: ✗ Pipeline gate failed with 2 finding(s):
  evidence: log:efmp-302-u03-translate.1.log, log:efmp-302-u04-translate-r1.1.log, log:efmp-303-u01-translate-r1.1.log
- [log-error] x15 recent, 32 total, since 2026-10-17: n of n content gates failed: check:pipeline-gate.
  example: 1 of 13 content gates failed: check:pipeline-gate.
  evidence: log:efmp-302-u03-translate.1.log, log:efmp-304-u01-translate.2.log, log:efmp-304-u02-translate.2.log
- [log-error] x6 recent, 9 total, since 2026-10-19: n cosmetic wordmark collision(s) - reported, not failed.
  example: 2 cosmetic wordmark collision(s) - reported, not failed.
  evidence: log:efmp-304-u01-repair_en.1.log, log:gqur-301-u03-review_en.1.log, log:gqur-301-u08-review_en.1.log
- [handoff] x6 recent, 6 total, since 2026-10-27: gn is marked stale and needs a fresh independent review.
  example: G3 is marked stale and needs a fresh independent review.
  evidence: job:efmp-301-u04-fix, job:gqur-300-u02-fix, job:gict-300-u06-fix
- [log-error] x6 recent, 6 total, since 2026-10-27: ✗ <path>
  example: ✗ static/img/figures/efmp-304/unit-05/fig-U5-7.svg
  evidence: log:efmp-304-u05-fix.1.log, log:gqur-300-u06-fix.2.log, log:efmp-304-u03-fix.1.log
- [log-error] x5 recent, 35 total, since 2026-10-17: error: the user rejected permission to use this specific tool call.
  example: Error: The user rejected permission to use this specific tool call.
  evidence: log:efmp-301-u01-review_ur.1.log, log:efmp-302-u02-repair_en-conflict2.1.log, log:efmp-302-u02-repair_en-conflict2.2.log
- [failure] x5 recent, 27 total, since 2026-10-19: the worker exited without committing any change
  example: the worker exited without committing any change
  evidence: job:gict-300-u01-translate-r1, job:efmp-304-u04-translate-r1, job:efmp-303-u02-translate
- [failure] x4 recent, 37 total, since 2026-10-17: ✗ pipeline gate failed with n finding(s):
  example: ✗ Pipeline gate failed with 1 finding(s):
  evidence: job:efmp-304-u01-translate, job:efmp-304-u02-translate, job:efmp-304-u04-translate
- [log-error] x3 recent, 79 total, since 2026-10-17: ✗ <path> is missing. run: npm run build:content-status
  example: ✗ static/content-status.json is missing. Run: npm run build:content-status
  evidence: log:efmp-301-u01-review_ur.2.log, log:efmp-302-u06-translate-r1.1.log, log:efmp-302-u06-translate-r1.2.log
- [log-error] x3 recent, 31 total, since 2026-10-17: n of n content gates failed: check:pipeline-gate, check:content-status.
  example: 2 of 13 content gates failed: check:pipeline-gate, check:content-status.
  evidence: log:efmp-302-u04-translate-r1.1.log, log:efmp-303-u01-translate-r1.1.log, log:efmp-303-u02-translate.1.log
- [log-error] x3 recent, 8 total, since 2026-10-17: fatal: path '<path>' exists on disk, but not in '<path>'
  example: fatal: path 'static/content-status.json' exists on disk, but not in 'origin/main'
  evidence: log:efmp-302-u02-repair_en-conflict2.2.log, log:gpks-402-u00-salvage-conflict3.1.log, log:gqur-300-u05-translate.3.log
- [log-error] x3 recent, 5 total, since 2026-10-22: ✗ read <path> failed
  example: ✗ Read scripts/check-content-status.mjs failed
  evidence: log:gsos-301-u03-author-conflict3.2.log, log:gsos-301-u03-author.1.log, log:efmp-304-u05-fix.1.log
- [log-error] x2 recent, 11 total, since 2026-10-17: error: pathspec '<path>' did not match any file(s) known to git
  example: error: pathspec 'static/content-status.json' did not match any file(s) known to git
  evidence: log:efmp-302-u02-repair_en-conflict2.2.log, log:efmp-304-u02-review_en-cifix2.1.log, log:geng-300-u01-repair_en-conflict1.1.log
- [log-error] x2 recent, 6 total, since 2026-10-18: ✗ edit <path> failed
  example: ✗ Edit i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-03/topic-02.mdx failed
  evidence: log:efmp-305-u03-translate.1.log, log:gict-300-u05-translate-r1.1.log, log:gqur-301-u05-translate.3.log
- [handoff] x2 recent, 2 total, since 2026-10-26: fresh independent gn remains required; <path> were not certified.
  example: Fresh independent G3 remains required; G3/G5 were not certified.
  evidence: job:efmp-304-u02-fix
- [handoff] x2 recent, 2 total, since 2026-10-26: fresh independent gn and urdu <path> reviews remain pending.
  example: Fresh independent G3 and Urdu rendering/G5 reviews remain pending.
  evidence: job:gqur-301-u16-fix
- [handoff] x2 recent, 2 total, since 2026-10-27: gn remains unticked and requires a fresh independent review.
  example: G3 remains unticked and requires a fresh independent review.
  evidence: job:gnas-301-u02-fix
- [handoff] x2 recent, 2 total, since 2026-10-27: gn evidence is marked stale and needs a fresh independent review.
  example: G3 evidence is marked stale and needs a fresh independent review.
  evidence: job:gnas-301-u03-fix
- [handoff] x2 recent, 2 total, since 2026-10-27: fresh independent gn and dependent gn reviews remain pending.
  example: Fresh independent G3 and dependent G5 reviews remain pending.
  evidence: job:efmp-304-u04-fix
- [handoff] x2 recent, 2 total, since 2026-10-27: gn remains unticked and needs a fresh independent review.
  example: G3 remains unticked and needs a fresh independent review.
  evidence: job:gsos-301-u01-fix
- [handoff] x2 recent, 2 total, since 2026-10-27: fresh independent gn is required; urdu inspection and gn remain pending.
  example: Fresh independent G3 is required; Urdu inspection and G5 remain pending.
  evidence: job:efmp-303-u06-fix
- [handoff] x2 recent, 2 total, since 2026-10-27: unit n needs a fresh independent gn review.
  example: Unit 6 needs a fresh independent G3 review.
  evidence: job:gqur-300-u06-fix
- [handoff] x2 recent, 2 total, since 2026-10-27: fresh independent gn review remains required; <path> remain pending.
  example: Fresh independent G3 review remains required; G3/G5 remain pending.
  evidence: job:gqur-300-u01-fix
- [handoff] x2 recent, 2 total, since 2026-10-27: fresh gn review required; derived content-status update awaits scope approval.
  example: Fresh G3 review required; derived content-status update awaits scope approval.
  evidence: job:efmp-301-u03-fix
- [handoff] x2 recent, 2 total, since 2026-10-27: gn remains incomplete and explicitly stale; fresh independent review and outstanding <path> repairs remain pending.
  example: G3 remains incomplete and explicitly stale; fresh independent review and outstanding author/provenance repairs remain pending.
  evidence: job:geng-301-u06-fix
- [handoff] x2 recent, 2 total, since 2026-10-27: pre-existing dirty <path> was refreshed locally and remains unstaged.
  example: Pre-existing dirty static/content-status.json was refreshed locally and remains unstaged.
  evidence: job:efmp-302-u04-fix
- [handoff] x2 recent, 2 total, since 2026-10-27: unit n needs a fresh independent gn review; pre-existing content-status metadata edits remain uncommitted.
  example: Unit 5 needs a fresh independent G3 review; pre-existing content-status metadata edits remain uncommitted.
  evidence: job:efmp-301-u05-fix
- [handoff] x2 recent, 2 total, since 2026-10-27: approve the content-status digest refresh; fresh independent <path> reviews remain pending.
  example: Approve the content-status digest refresh; fresh independent G3/G5 reviews remain pending.
  evidence: job:gict-300-u02-fix
- [handoff] x2 recent, 2 total, since 2026-10-27: gn remains open; fn-fn need separate author repair and fresh independent review.
  example: G3 remains open; F1-F6 need separate author repair and fresh independent review.
  evidence: job:gqur-301-u12-fix
- [handoff] x2 recent, 2 total, since 2026-10-27: final gate remains blocked by the content-status digest; fresh gn review remains required.
  example: Final gate remains blocked by the content-status digest; fresh G3 review remains required.
  evidence: job:gqur-301-u13-fix
- [handoff] x2 recent, 2 total, since 2026-10-27: existing academic findings still need author repair and fresh independent gn review.
  example: Existing academic findings still need author repair and fresh independent G3 review.
  evidence: job:gqur-301-u14-fix
- [handoff] x2 recent, 2 total, since 2026-10-27: fresh independent gn review required; pre-existing <path> change left untouched.
  example: Fresh independent G3 review required; pre-existing static/content-status.json change left untouched.
  evidence: job:gict-300-u05-fix
- [handoff] x2 recent, 2 total, since 2026-10-27: regenerated <path> remains uncommitted; it was already modified at task start.
  example: Regenerated static/content-status.json remains uncommitted; it was already modified at task start.
  evidence: job:efmp-303-u05-fix
- [handoff] x2 recent, 2 total, since 2026-10-27: fresh independent gn review required; local generated content-status.json remains uncommitted.
  example: Fresh independent G3 review required; local generated content-status.json remains uncommitted.
  evidence: job:efmp-301-u11-fix
- [log-error] x2 recent, 2 total, since 2026-10-27: error: cannot find module '<path>'
  example: Error: Cannot find module '/home/a2ahs/crew-wt/efmp-301-u03-fix/.crew/main-baseline/.crew/main-baseline/scripts/report-content-status.mjs'
  evidence: log:efmp-301-u03-fix.1.log, log:gqur-300-u04-fix.1.log
- [handoff] x1 recent, 1 total, since 2026-10-26: <path> binds translation handoffs to gn manifest; adding <path>/ to exclusions would prevent post-translation gn invalidation.
  example: scripts/lib/review-evidence.mjs binds translation handoffs to G2 manifest; adding /translations/ to exclusions would prevent post-translation G2 invalidation.
  evidence: job:intel-2026-10-27-distill
- [handoff] x1 recent, 1 total, since 2026-10-26: pr #n resolved the baseline workers.test.mjs agy_claude assertion; all n crew tests now pass.
  example: PR #329 resolved the baseline workers.test.mjs agy_claude assertion; all 69 crew tests now pass.
  evidence: job:intel-2026-10-27-distill
- [handoff] x1 recent, 1 total, since 2026-10-26: no viewbox height changes were needed (the text-anchor fix alone provided enough horizontal space), so figure carrier height attributes were untouched and remai
  example: No viewBox height changes were needed (the text-anchor fix alone provided enough horizontal space), so Figure carrier height attributes were untouched and remain at 470.
  evidence: job:gqur-301-u05-fix

Follow `.claude/skills/intel-distill/SKILL.md` exactly; read it and every file it references before starting.

## Scope
`specs/intelligence/daily/2026-10-28.md` only.

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
- (intel-2026-10-27-distill, intel_distill, agy) scripts/lib/review-evidence.mjs binds translation handoffs to G2 manifest; adding /translations/ to exclusions would prevent post-translation G2 invalidation.
- (intel-2026-10-27-distill, intel_distill, agy) PR #329 resolved the baseline workers.test.mjs agy_claude assertion; all 69 crew tests now pass.
- (intel-2026-10-26-distill, intel_distill, agy) Baseline test failure in `tests/crew/workers.test.mjs` ('expected codex, received agy_claude') is pre-existing on main and resolved in PR #329 (task M3).
- (intel-2026-10-26-distill, intel_distill, agy) PR #335 resolved the `tick.sh` pathspec crash on untracked `static/content-status.json`, resuming cron ticks after a ~16h stall.
- (intel-2026-10-26-distill, intel_distill, agy) Task M2 landed on main holding translation on unrepaired G3 revise reports; gating on active or queued repair_en is proposed in C2.


## Response snapshot

Distilled 35 growing clusters into 8 prioritized intelligence candidates, registry effects, and signal triage in specs/intelligence/daily/2026-10-28.md.

## Outcome

- Impact: intel_distill for INTEL Unit 0 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Distilled 35 growing clusters into 8 prioritized intelligence candidates, registry effects, and signal triage in specs/intelligence/daily/2026-10-28.md.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Commit `d70aa57a` re-added `static/content-status.json` to git tracking on main, regressing task M1 and triggering 40+ stale/check:content-status gate failures across workers.
  - Decoupling publication G4/G5 tracker assertions from the temporary `reviewed` flip in `check:pipeline-gate` (C2) will prevent false-alarm pipeline gate failures during translation drafts.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
