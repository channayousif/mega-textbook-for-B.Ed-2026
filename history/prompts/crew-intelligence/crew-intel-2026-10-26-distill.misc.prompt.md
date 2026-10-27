---
id: crew-intel-2026-10-26-distill
title: crew intel_distill INTEL unit 0
stage: misc
date: 2026-10-25
surface: agent
model: agy
feature: crew-intelligence
branch: crew/intel-2026-10-26-distill
user: crew
command: crew intel_distill
labels: ["crew", "agy", "intel_distill"]
links:
  spec: specs/intelligence/registry.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/intelligence/daily/2026-10-26.md
tests:
 - npm run check:content
---

## Prompt

# Crew job intel-2026-10-26-distill

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/intel-2026-10-26-distill`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, and never touch course content (`docs/`, `licence/`, the Urdu docs trees,
`specs/content/`, `static/img/figures/`, `glossary.json`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.

## Task
Distil today's reusable intelligence (intel-distill skill) into `specs/intelligence/daily/2026-10-26.md`. These clusters grew in the last 24 hours (kind, recent count, total, signature, an example, evidence):

- [log-error] x3 recent, 146 total, since 2026-10-17: n of n content gates failed: check:content-status.
  example: 1 of 13 content gates failed: check:content-status.
  evidence: log:efmp-301-u01-review_ur.2.log, log:efmp-302-u02-repair_en-conflict1.1.log, log:efmp-302-u02-repair_en-conflict4.1.log
- [log-error] x2 recent, 76 total, since 2026-10-17: ✗ <path> is missing. run: npm run build:content-status
  example: ✗ static/content-status.json is missing. Run: npm run build:content-status
  evidence: log:efmp-301-u01-review_ur.2.log, log:efmp-302-u06-translate-r1.1.log, log:efmp-302-u06-translate-r1.2.log
- [handoff] x2 recent, 2 total, since 2026-10-24: english author must repair the citation, sialkot typo and <path> mappings before translation resumes.
  example: English author must repair the citation, Sialkot typo and coverage/concept mappings before translation resumes.
  evidence: job:gsos-301-u06-translate
- [handoff] x2 recent, 2 total, since 2026-10-24: translation remains draft; independent <path> review and authorized rendered urdu inspection remain pending.
  example: Translation remains draft; independent G3/G5 review and authorized rendered Urdu inspection remain pending.
  evidence: job:gqur-301-u07-translate-r1
- [handoff] x2 recent, 2 total, since 2026-10-24: english author must repair the citation, sialkot typo and assessment mappings before gn resumes.
  example: English author must repair the citation, Sialkot typo and assessment mappings before G4 resumes.
  evidence: job:gsos-301-u06-translate-r1
- [handoff] x2 recent, 2 total, since 2026-10-24: protected crew script changes require owner review.
  example: Protected crew script changes require owner review.
  evidence: job:maint-2026-w43-m1
- [handoff] x2 recent, 2 total, since 2026-10-24: crew tests pass <path>; pre-existing worker-chain assertion expects codex instead of agy_claude.
  example: Crew tests pass 59/60; pre-existing worker-chain assertion expects codex instead of agy_claude.
  evidence: job:maint-2026-w43-a1
- [handoff] x2 recent, 2 total, since 2026-10-24: changes touch protected scripts and require owner approval.
  example: Changes touch protected scripts and require owner approval.
  evidence: job:maint-2026-w43-m3
- [handoff] x2 recent, 2 total, since 2026-10-25: prior local generated-status change preserved in stash <code>.
  example: Prior local generated-status change preserved in stash `crew-conflict1-existing-generated-status`.
  evidence: job:maint-2026-w43-m3-conflict1
- [log-error] x1 recent, 106 total, since 2026-10-17: ✗ <path> is stale - it no longer describes the working tree.
  example: ✗ static/content-status.json is stale - it no longer describes the working tree.
  evidence: log:efmp-302-u02-repair_en-conflict1.1.log, log:efmp-302-u02-repair_en-conflict4.1.log, log:efmp-302-u02-translate.1.log
- [log-error] x1 recent, 48 total, since 2026-10-17: ✗ pipeline gate failed with n finding(s):
  example: ✗ Pipeline gate failed with 2 finding(s):
  evidence: log:efmp-302-u03-translate.1.log, log:efmp-302-u04-translate-r1.1.log, log:efmp-303-u01-translate-r1.1.log
- [failure] x1 recent, 33 total, since 2026-10-17: ✗ pipeline gate failed with n finding(s):
  example: ✗ Pipeline gate failed with 1 finding(s):
  evidence: job:efmp-304-u01-translate, job:efmp-304-u02-translate, job:efmp-304-u04-translate
- [log-error] x1 recent, 17 total, since 2026-10-17: n of n content gates failed: check:pipeline-gate.
  example: 1 of 13 content gates failed: check:pipeline-gate.
  evidence: log:efmp-302-u03-translate.1.log, log:efmp-304-u01-translate.2.log, log:efmp-304-u02-translate.2.log
- [log-error] x1 recent, 12 total, since 2026-10-19: ? <code>
  example: ? `\n${names} failed. Fix it and re-run; later gates did not run.`
  evidence: log:efmp-305-u01-repair_en-conflict2.1.log, log:efmp-305-u01-repair_en-conflict3.1.log, log:efmp-305-u01-repair_en-conflict4.1.log
- [log-error] x1 recent, 12 total, since 2026-10-17: automatic merge failed; fix conflicts and then commit the result.
  example: Automatic merge failed; fix conflicts and then commit the result.
  evidence: log:geng-301-u00-salvage-conflict1.1.log, log:geng-301-u00-salvage-conflict2.1.log, log:gpks-402-u00-salvage-conflict3.1.log
- [log-error] x1 recent, 2 total, since 2026-10-19: fatal: path '<path>' exists on disk, but not in 'head'
  example: fatal: path 'static/content-status.json' exists on disk, but not in 'HEAD'
  evidence: log:efmp-304-u01-repair_en-conflict4.2.log, log:maint-2026-w43-m1-conflict1.1.log
- [log-error] x1 recent, 2 total, since 2026-10-19: research.md's line documents a rejected alternative, not a current claim.
  example: research.md's line documents a rejected alternative, not a current claim.
  evidence: log:gqur-301-u01-review_en-conflict1.1.log, log:maint-2026-w43-m2-review1.1.log
- [phr] x1 recent, 1 total, since 2026-10-24: reflection: the disk guard fails silently from the owner's view; the digest should flag a launch stall.
  example: reflection: the disk guard fails silently from the owner's view; the digest should flag a launch stall.
  evidence: phr:history/prompts/general/0865-check-crew-status-and-open-prs.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-24: failure modes observed: crew silently idle ~n h on disk guard.
  example: failure modes observed: crew silently idle ~37 h on disk guard.
  evidence: phr:history/prompts/general/0865-check-crew-status-and-open-prs.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-24: next experiment: add disk-stall alert to crew digest.
  example: next experiment: add disk-stall alert to crew digest.
  evidence: phr:history/prompts/general/0865-check-crew-status-and-open-prs.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-24: reflection: the crew digest should alert on a disk-guard stall.
  example: reflection: the crew digest should alert on a disk-guard stall.
  evidence: phr:history/prompts/general/0866-clean-worktrees-rerun-pr-317.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-24: failure modes observed: translate was planned before the english repair it depended on.
  example: failure modes observed: translate was planned before the English repair it depended on.
  evidence: phr:history/prompts/general/0867-stop-gqur301-u7-translate-repair-first.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-24: next experiment: planner could gate translate on a queued repair_en for the same unit.
  example: next experiment: planner could gate translate on a queued repair_en for the same unit.
  evidence: phr:history/prompts/general/0867-stop-gqur301-u7-translate-repair-first.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-24: reflection: the kit's per-task (not per-message) phr rule conflicts with this repo's phr-per-prompt rule; noted as a cost trade-off, not a change.
  example: reflection: the kit's per-task (not per-message) PHR rule conflicts with this repo's PHR-per-prompt rule; noted as a cost trade-off, not a change.
  evidence: phr:history/prompts/general/0868-evaluate-agent-phase-kit-applicability.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-24: next experiment: measure the size of a crew brief's mandatory reads before and after slimming claude.md.
  example: next experiment: measure the size of a crew brief's mandatory reads before and after slimming CLAUDE.md.
  evidence: phr:history/prompts/general/0868-evaluate-agent-phase-kit-applicability.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-24: reflection: check alerts in code before calling a stall silent.
  example: reflection: check alerts in code before calling a stall silent.
  evidence: phr:history/prompts/general/0869-one-rulebook-stall-alerts-resume-block.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-24: failure modes observed: an earlier claim (no alert) was wrong until the code was read.
  example: failure modes observed: an earlier claim (no alert) was wrong until the code was read.
  evidence: phr:history/prompts/general/0869-one-rulebook-stall-alerts-resume-block.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-24: next experiment: measure worker token use per job before and after the agents.md change.
  example: next experiment: measure worker token use per job before and after the AGENTS.md change.
  evidence: phr:history/prompts/general/0869-one-rulebook-stall-alerts-resume-block.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-24: failure modes observed: shared supabase stale test data (leftover "fix typo a" rows) makes strict-mode ene filter assertions non-deterministic; ene retries nx e
  example: failure modes observed: shared Supabase stale test data (leftover "Fix typo A" rows) makes strict-mode e2e filter assertions non-deterministic; e2e retries 3x each fail identically. Known pattern from
  evidence: phr:history/prompts/general/540-batch-20261023-cifix1-diagnose.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-24: next experiment: isolate suggestion-moderation test with a pre-flight delete of matching rows or use per-run unique body text, so stale data from prior runs can
  example: next experiment: isolate suggestion-moderation test with a pre-flight DELETE of matching rows or use per-run unique body text, so stale data from prior runs cannot collide.
  evidence: phr:history/prompts/general/540-batch-20261023-cifix1-diagnose.general.prompt.md
- [handoff] x1 recent, 1 total, since 2026-10-24: english mcq n + key, topic n.n village example and teacher notes conflate role conflict with role strain; rrq n guidance and rrq n-n bloom levels also need engl
  example: English MCQ 3 + key, topic 3.1 village example and teacher notes conflate role conflict with role strain; RRQ 3 guidance and RRQ 1-2 Bloom levels also need English repair, after which only those Urdu 
  evidence: job:gsos-301-u03-translate-r1
- [handoff] x1 recent, 1 total, since 2026-10-24: concept graph labels con:<course>-n-n as مواصلات while the urdu prose uses the banked ابلاغ; the owner should align them. proposed urdu terms are listed in <pat
  example: Concept graph labels CON:GSOS-301-3-13 as مواصلات while the Urdu prose uses the banked ابلاغ; the owner should align them. Proposed Urdu terms are listed in reviews/unit-03/G4/translation-handoff.md.
  evidence: job:gsos-301-u03-translate-r1
- [handoff] x1 recent, 1 total, since 2026-10-24: rendered urdu (desktop, npx, an) has not been inspected; run render-inspect --locale ur on a permitted host before gn.
  example: Rendered Urdu (desktop, 360px, A4) has not been inspected; run render-inspect --locale ur on a permitted host before G5.
  evidence: job:gsos-301-u03-translate-r1
- [handoff] x1 recent, 1 total, since 2026-10-24: mn, mn and mn all edit <path> in different functions, and mn to mn each add a row to <path>, so whichever merges later may need a rebase.
  example: M1, M3 and M4 all edit scripts/crew/crew.mjs in different functions, and M1 to M4 each add a row to specs/intelligence/registry.md, so whichever merges later may need a rebase.
  evidence: job:maint-2026-w43-survey
- [handoff] x1 recent, 1 total, since 2026-10-24: <path> was already failing before this job (it expects codex, the chain now gives agy_claude); mn fixes it.
  example: tests/crew/workers.test.mjs was already failing before this job (it expects codex, the chain now gives agy_claude); M3 fixes it.
  evidence: job:maint-2026-w43-survey
- [handoff] x1 recent, 1 total, since 2026-10-24: after mn untracks <path>, branches that still change it will hit a <path> merge conflict; mn's acceptance requires resolvesharedconflicts to handle that.
  example: After M1 untracks static/content-status.json, branches that still change it will hit a modify/delete merge conflict; M1's acceptance requires resolveSharedConflicts to handle that.
  evidence: job:maint-2026-w43-survey
- [handoff] x1 recent, 1 total, since 2026-10-24: crew suite retains one baseline failure in workers.test.mjs: expected codex, received agy_claude.
  example: Crew suite retains one baseline failure in workers.test.mjs: expected codex, received agy_claude.
  evidence: job:maint-2026-w43-m1
- [handoff] x1 recent, 1 total, since 2026-10-24: registry row uses i-n on the assumption that mn's new "stop tracking content-status" row takes i-n; whichever of <path> merges after this must check for id coll
  example: Registry row uses I-0010 on the assumption that M1's new "Stop tracking content-status" row takes I-0009; whichever of M1/M3/M4 merges after this must check for ID collisions in specs/intelligence/reg
  evidence: job:maint-2026-w43-m2
- [handoff] x1 recent, 1 total, since 2026-10-24: <path> "a worker in avoid is skipped for the next in the chain" fails before and after this change (pre-existing, not touched).
  example: tests/crew/workers.test.mjs "a worker in avoid is skipped for the next in the chain" fails before and after this change (pre-existing, not touched).
  evidence: job:maint-2026-w43-m2
- [handoff] x1 recent, 1 total, since 2026-10-24: owner review required for the protected adr path.
  example: Owner review required for the protected ADR path.
  evidence: job:maint-2026-w43-a1

Follow `.claude/skills/intel-distill/SKILL.md` exactly; read it and every file it references before starting.

## Scope
`specs/intelligence/daily/2026-10-26.md` only.

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
- (intel-2026-10-25-distill, intel_distill, agy) `static/content-status.json` merge conflicts in the control checkout stalled `tick.sh` cron for ~6h; task M1 untracking and tick reset resolve this.
- (intel-2026-10-25-distill, intel_distill, agy) Figure jobs generate `.ur.svg` schematics before Urdu topic MDX exists, requiring translation jobs to wire them.
- (intel-2026-10-25-distill, intel_distill, agy) Batch CI fix jobs failed on pre-existing e2e suggestion-moderation row accumulation and shared Supabase 30s RLS timeouts.
- (intel-2026-10-24-distill, intel_distill, agy) static/content-status.json is tracked and out of date on origin/main, causing check:content-status to fail in every fresh worktree.
- (intel-2026-10-24-distill, intel_distill, agy) Step 5 of translate-unit trips check:pipeline-gate because flipping translation_status to reviewed asserts that G4 and G5 tracker rows are already done.


## Response snapshot

Distilled 40 growing intelligence clusters into 10 prioritized daily candidates in specs/intelligence/daily/2026-10-26.md, led by untracked content-status cron pathspec stall, upstream English repair translation gating, and disk launch guard visibility.

## Outcome

- Impact: intel_distill for INTEL Unit 0 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Distilled 40 growing intelligence clusters into 10 prioritized daily candidates in specs/intelligence/daily/2026-10-26.md, led by untracked content-status cron pathspec stall, upstream English repair translation gating, and disk launch guard visibility.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Baseline test failure in `tests/crew/workers.test.mjs` ('expected codex, received agy_claude') is pre-existing on main and resolved in PR #329 (task M3).
  - PR #335 resolved the `tick.sh` pathspec crash on untracked `static/content-status.json`, resuming cron ticks after a ~16h stall.
  - Task M2 landed on main holding translation on unrepaired G3 revise reports; gating on active or queued repair_en is proposed in C2.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
