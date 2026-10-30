---
id: crew-intel-2026-10-30-distill
title: crew intel_distill INTEL unit 0
stage: misc
date: 2026-10-30
surface: agent
model: agy
feature: crew-intelligence
branch: crew/intel-2026-10-30-distill
user: crew
command: crew intel_distill
labels: ["crew", "agy", "intel_distill"]
links:
  spec: specs/intelligence/registry.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/intelligence/daily/2026-10-30.md
tests:
 - npm run check:content
---

## Prompt

# Crew job intel-2026-10-30-distill

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/intel-2026-10-30-distill`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, and never touch course content (`docs/`, `licence/`, the Urdu docs trees,
`specs/content/`, `static/img/figures/`, `glossary.json`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.

## Task
Distil today's reusable intelligence (intel-distill skill) into `specs/intelligence/daily/2026-10-30.md`. These clusters grew in the last 24 hours (kind, recent count, total, signature, an example, evidence):

- [log-error] x2 recent, 19 total, since 2026-10-19: ? <code>
  example: ? `\n${names} failed. Fix it and re-run; later gates did not run.`
  evidence: log:efmp-305-u01-repair_en-conflict2.1.log, log:efmp-305-u01-repair_en-conflict3.1.log, log:efmp-305-u01-repair_en-conflict4.1.log
- [review] x2 recent, 2 total, since 2026-10-28: headless review tooling constraint
  example: Headless review tooling constraint
  evidence: review:specs/content/gpks-402/reviews/unit-05/G3/21030998-7c55-4596-9cef-92787e7cb7aa.json, review:specs/content/gpks-402/reviews/unit-01/G3/b35aebba-1391-47ae-88ff-481fd326cd8b.json
- [handoff] x2 recent, 2 total, since 2026-10-29: platform owner must investigate dashboard load times above nms and the flaky teacher-dashboard timeout.
  example: Platform owner must investigate dashboard load times above 2000ms and the flaky teacher-dashboard timeout.
  evidence: job:batch-20261028-1715-cifix2
- [log-error] x1 recent, 215 total, since 2026-10-17: n of n content gates failed: check:content-status.
  example: 1 of 13 content gates failed: check:content-status.
  evidence: log:efmp-301-u01-review_ur.2.log, log:efmp-302-u02-repair_en-conflict1.1.log, log:efmp-302-u02-repair_en-conflict4.1.log
- [log-error] x1 recent, 178 total, since 2026-10-17: ✗ <path> is stale - it no longer describes the working tree.
  example: ✗ static/content-status.json is stale - it no longer describes the working tree.
  evidence: log:efmp-302-u02-repair_en-conflict1.1.log, log:efmp-302-u02-repair_en-conflict4.1.log, log:efmp-302-u02-translate.1.log
- [phr] x1 recent, 1 total, since 2026-10-28: failure modes observed: one persistent admin dashboard timeout and three flaky platform tests; n tests passed directly. build and figure geometry passed.
  example: failure modes observed: One persistent admin dashboard timeout and three flaky platform tests; 70 tests passed directly. Build and figure geometry passed.
  evidence: phr:history/prompts/general/20261041-record-pr366-e2e-scope-blocker.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-28: next experiment (smallest change to try): investigate the existing ci trace for the admin dashboard test in a platform-scoped job; do not increase timeouts with
  example: next experiment (smallest change to try): Investigate the existing CI trace for the admin dashboard test in a platform-scoped job; do not increase timeouts without evidence.
  evidence: phr:history/prompts/general/20261041-record-pr366-e2e-scope-blocker.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-28: failure modes observed: header overlap of n.npx and timeline text assigned to an adjacent panel, spilling n.npx, each in both themes; unrelated teacher-dashboar
  example: failure modes observed: Header overlap of 3.9px and timeline text assigned to an adjacent panel, spilling 84.1px, each in both themes; unrelated teacher-dashboard e2e timeout.
  evidence: phr:history/prompts/general/20261040-fix-gpks402-urdu-figure-spacing.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-28: next experiment (smallest change to try): run changed-figure geometry in ci, then investigate the independent platform timeout.
  example: next experiment (smallest change to try): Run changed-figure geometry in CI, then investigate the independent platform timeout.
  evidence: phr:history/prompts/general/20261040-fix-gpks402-urdu-figure-spacing.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-28: failure modes observed: initial resolution command used unavailable python; corrected with pythonn and amended merge before validation completed. main already h
  example: failure modes observed: Initial resolution command used unavailable python; corrected with python3 and amended merge before validation completed. Main already has stale generated status report.
  evidence: phr:history/prompts/general/20261039-resolve-unit-four-tracker-conflict.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-28: next experiment (smallest change to try): no additional experiment required.
  example: next experiment (smallest change to try): No additional experiment required.
  evidence: phr:history/prompts/general/20261039-resolve-unit-four-tracker-conflict.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-28: failure modes observed: post-commit checking exposed that translator notes under translations/ entered gn input manifests; relocated them to the evidence-exclud
  example: failure modes observed: Post-commit checking exposed that translator notes under translations/ entered G2 input manifests; relocated them to the evidence-excluded reviews/unit-01/G4/ folder without ch
  evidence: phr:history/prompts/006-content-pipeline/0026-translate-gpks402-unit-one-urdu.green.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-28: next experiment (smallest change to try): run the deferred svg geometry and <path> inspection in a job explicitly permitted to use playwright before any gn pass
  example: next experiment (smallest change to try): Run the deferred SVG geometry and narrow/A4 inspection in a job explicitly permitted to use Playwright before any G5 pass.
  evidence: phr:history/prompts/006-content-pipeline/0026-translate-gpks402-unit-one-urdu.green.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-28: failure modes observed: scientific society label spilled n.npx outside its panel; seven pairs of table labels overlapped in each theme. the post-edit content ru
  example: failure modes observed: Scientific Society label spilled 3.4px outside its panel; seven pairs of table labels overlapped in each theme. The post-edit content run detected stale G2 inputs, resolved by 
  evidence: phr:history/prompts/gpks-402/20261038-fix-unit-two-figure-geometry.green.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-28: next experiment (smallest change to try): run the existing ci figure-geometry job on this commit.
  example: next experiment (smallest change to try): Run the existing CI figure-geometry job on this commit.
  evidence: phr:history/prompts/gpks-402/20261038-fix-unit-two-figure-geometry.green.prompt.md
- [review] x1 recent, 1 total, since 2026-10-28: fictional numerical and case illustrations
  example: Fictional numerical and case illustrations
  evidence: review:specs/content/gpks-402/reviews/unit-05/G3/21030998-7c55-4596-9cef-92787e7cb7aa.json
- [review] x1 recent, 1 total, since 2026-10-28: global glossary entries
  example: Global glossary entries
  evidence: review:specs/content/gpks-402/reviews/unit-05/G3/21030998-7c55-4596-9cef-92787e7cb7aa.json
- [review] x1 recent, 1 total, since 2026-10-28: print monographs declared under verification and limits
  example: Print monographs declared under Verification and limits
  evidence: review:specs/content/gpks-402/reviews/unit-05/G3/21030998-7c55-4596-9cef-92787e7cb7aa.json
- [review] x1 recent, 1 total, since 2026-10-28: un-bound excerpt keys in manifest tooling
  example: Un-bound excerpt keys in manifest tooling
  evidence: review:specs/content/gpks-402/reviews/unit-01/G3/b35aebba-1391-47ae-88ff-481fd326cd8b.json
- [review] x1 recent, 1 total, since 2026-10-28: teacher notes absence
  example: Teacher notes absence
  evidence: review:specs/content/gpks-402/reviews/unit-01/G3/b35aebba-1391-47ae-88ff-481fd326cd8b.json
- [phr] x1 recent, 1 total, since 2026-10-28: failure modes observed: skill instructions still allow prompt-only figures, but the current gate requires rendered figures. source scope strings using “to” were
  example: failure modes observed: Skill instructions still allow prompt-only figures, but the current gate requires rendered figures. Source scope strings using “to” were not expanded by the parser; use explici
  evidence: phr:history/prompts/general/20261037-author-gpks402-unit-five.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-28: next experiment (smallest change to try): use the same approved unit and source bundle for a fresh independent review, without author self-certification.
  example: next experiment (smallest change to try): Use the same approved unit and source bundle for a fresh independent review, without author self-certification.
  evidence: phr:history/prompts/general/20261037-author-gpks402-unit-five.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-28: failure modes observed: concurrent append conflict in the shared course tracker.
  example: failure modes observed: Concurrent append conflict in the shared course tracker.
  evidence: phr:history/prompts/gnas-301/2432-merge-unit-five-review.misc.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-28: next experiment (smallest change to try): show per-course "done for the crew / waits on owner" counts in the digest.
  example: next experiment (smallest change to try): show per-course "done for the crew / waits on owner" counts in the digest.
  evidence: phr:history/prompts/general/0902-crew-one-course-focus.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-28: failure modes observed: an approved intake waited on an owner confirmation nobody was prompted for.
  example: failure modes observed: an approved intake waited on an owner confirmation nobody was prompted for.
  evidence: phr:history/prompts/general/0901-confirm-d2026-0074-gpks-402.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-28: next experiment (smallest change to try): list pending-owner-review intake decisions under "needs the owner" in board.md.
  example: next experiment (smallest change to try): list pending-owner-review intake decisions under "Needs the owner" in BOARD.md.
  evidence: phr:history/prompts/general/0901-confirm-d2026-0074-gpks-402.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-28: failure modes observed: concurrent appended course tracker rows conflicted.
  example: failure modes observed: Concurrent appended course tracker rows conflicted.
  evidence: phr:history/prompts/general/20261037-merge-unit-three-review-conflict.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-28: next experiment (smallest change to try): no further changes needed if all content gates pass.
  example: next experiment (smallest change to try): No further changes needed if all content gates pass.
  evidence: phr:history/prompts/general/20261037-merge-unit-three-review-conflict.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-28: failure modes observed: - leaked worktrees blocked launches.
  example: failure modes observed: - Leaked worktrees blocked launches.
  evidence: phr:history/prompts/general/0900-crew-free-conflict-worktrees.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-28: next experiment (smallest change to try): when a launch fails because a branch is already in use, surface that in the stall alert instead of counting it as a me
  example: next experiment (smallest change to try): when a launch fails because a branch is already in use, surface that in the stall alert instead of counting it as a merge-fix attempt.
  evidence: phr:history/prompts/general/0900-crew-free-conflict-worktrees.general.prompt.md
- [handoff] x1 recent, 1 total, since 2026-10-28: claude cli's quota message 'hit your n-hour limit' evades <path> quota_re because \w does not match the hyphen in n-hour, burning job retry attempts.
  example: Claude CLI's quota message 'hit your 5-hour limit' evades scripts/crew/workers.mjs QUOTA_RE because \w does not match the hyphen in 5-hour, burning job retry attempts.
  evidence: job:intel-2026-10-29-distill
- [handoff] x1 recent, 1 total, since 2026-10-28: concurrent jobs in course focus repeatedly collide on <path>/<course><path> table rows; extending resolvesharedconflicts with markdown table row reconciliation 
  example: Concurrent jobs in course focus repeatedly collide on specs/content/<course>/tasks.md table rows; extending resolveSharedConflicts with markdown table row reconciliation would eliminate mass batch exc
  evidence: job:intel-2026-10-29-distill
- [handoff] x1 recent, 1 total, since 2026-10-28: <path> permissions.deny contains a deprecated write(...) rule that generates a cli startup warning on every claude invocation (edit covers all file tools).
  example: .claude/settings.json permissions.deny contains a deprecated Write(...) rule that generates a CLI startup warning on every Claude invocation (Edit covers all file tools).
  evidence: job:intel-2026-10-29-distill
- [log-error] x1 recent, 1 total, since 2026-10-28: + - gh run view <sha> --log-failed
  example: +  - gh run view 40780504265 --log-failed
  evidence: log:batch-20261028-1715-cifix2.1.log
- [phr] x1 recent, 1 total, since 2026-10-29: failure modes observed: editing a bound gate script silently invalidated corpus-wide review evidence.
  example: failure modes observed: editing a bound gate script silently invalidated corpus-wide review evidence.
  evidence: phr:history/prompts/general/2435-sourced-figures-policy-adr-0033.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-29: next experiment (smallest change to try): make check-docs-sync warn when a pr touches a file bound in review manifests.
  example: next experiment (smallest change to try): make check-docs-sync warn when a PR touches a file bound in review manifests.
  evidence: phr:history/prompts/general/2435-sourced-figures-policy-adr-0033.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-29: failure modes observed: a worker accepted a manifest prompt asking for a "map-style diagram" and drew a
  example: failure modes observed: a worker accepted a manifest prompt asking for a "map-style diagram" and drew a
  evidence: phr:history/prompts/gpks-402/2433-withdraw-inaccurate-gpks402-u4-map.misc.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-29: next experiment (smallest change to try): check:figures rejects map-of-real-territory rows that lack a <code> provenance note.
  example: next experiment (smallest change to try): check:figures rejects map-of-real-territory rows that lack a `Source:` provenance note.
  evidence: phr:history/prompts/gpks-402/2433-withdraw-inaccurate-gpks402-u4-map.misc.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-29: reflection: exaggeration alone barely moves this clone; test the reference recording first next time.
  example: reflection: exaggeration alone barely moves this clone; test the reference recording first next time.
  evidence: phr:history/prompts/video-studio/0898-bilal-energy-cast-handoff.misc.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-29: next experiment (smallest change to try): check:figures requires a <code> note on any map row.
  example: next experiment (smallest change to try): check:figures requires a `Source:` note on any map row.
  evidence: phr:history/prompts/gpks-402/2434-sourced-pakistan-map-for-gpks402-u4.misc.prompt.md

Follow `.claude/skills/intel-distill/SKILL.md` exactly; read it and every file it references before starting.

## Scope
`specs/intelligence/daily/2026-10-30.md` only.

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
- (intel-2026-10-29-distill, intel_distill, agy) Claude CLI's quota message 'hit your 5-hour limit' evades scripts/crew/workers.mjs QUOTA_RE because \w does not match the hyphen in 5-hour, burning job retry attempts.
- (intel-2026-10-29-distill, intel_distill, agy) Concurrent jobs in course focus repeatedly collide on specs/content/<course>/tasks.md table rows; extending resolveSharedConflicts with markdown table row reconciliation would eliminate mass batch exclusions.
- (intel-2026-10-29-distill, intel_distill, agy) .claude/settings.json permissions.deny contains a deprecated Write(...) rule that generates a CLI startup warning on every Claude invocation (Edit covers all file tools).
- (intel-2026-10-28-distill, intel_distill, agy) Commit `d70aa57a` re-added `static/content-status.json` to git tracking on main, regressing task M1 and triggering 40+ stale/check:content-status gate failures across workers.
- (intel-2026-10-28-distill, intel_distill, agy) Decoupling publication G4/G5 tracker assertions from the temporary `reviewed` flip in `check:pipeline-gate` (C2) will prevent false-alarm pipeline gate failures during translation drafts.


## Response snapshot

Distilled 10 daily intelligence candidates for 2026-10-30 covering bound script evidence invalidation, content batch PR e2e blockers, brief Playwright prohibitions, un-bound excerpt keys, and intake notification gaps.

## Outcome

- Impact: intel_distill for INTEL Unit 0 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Distilled 10 daily intelligence candidates for 2026-10-30 covering bound script evidence invalidation, content batch PR e2e blockers, brief Playwright prohibitions, un-bound excerpt keys, and intake notification gaps.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Editing scripts listed under manifestRoots (such as check-figures.mjs) invalidates review evidence corpus-wide; new gate checks must be independent scripts called via npm test.
  - Crew briefs prohibiting Playwright cause workers to skip scripts/heavy.sh node scripts/measure-figure-text.mjs, causing avoidable CI figure-geometry failures.
  - review-evidence citedKeysFor regex excludes source excerpt filenames having descriptive slug suffixes after the year (e.g. hassan-2020-two-nation.md).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
