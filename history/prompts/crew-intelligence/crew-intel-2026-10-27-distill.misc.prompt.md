---
id: crew-intel-2026-10-27-distill
title: crew intel_distill INTEL unit 0
stage: misc
date: 2026-10-26
surface: agent
model: agy
feature: crew-intelligence
branch: crew/intel-2026-10-27-distill
user: crew
command: crew intel_distill
labels: ["crew", "agy", "intel_distill"]
links:
  spec: specs/intelligence/registry.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/intelligence/daily/2026-10-27.md
tests:
 - npm run check:content
---

## Prompt

# Crew job intel-2026-10-27-distill

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/intel-2026-10-27-distill`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, and never touch course content (`docs/`, `licence/`, the Urdu docs trees,
`specs/content/`, `static/img/figures/`, `glossary.json`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.

## Task
Distil today's reusable intelligence (intel-distill skill) into `specs/intelligence/daily/2026-10-27.md`. These clusters grew in the last 24 hours (kind, recent count, total, signature, an example, evidence):

- [handoff] x2 recent, 2 total, since 2026-10-25: prior local generated-status change preserved in stash <code>.
  example: Prior local generated-status change preserved in stash `crew-conflict1-existing-generated-status`.
  evidence: job:maint-2026-w43-m3-conflict1
- [handoff] x1 recent, 1 total, since 2026-10-25: branch's translate-hold-revise row is i-n; branch's <path> rows are <path> (renumbered). if any later <path> branch references these by old id, update.
  example: Branch's translate-hold-revise row is I-0010; branch's brief/skill rows are I-0011/I-0012 (renumbered). If any later M3/M4 branch references these by old ID, update.
  evidence: job:maint-2026-w43-m2-conflict1
- [handoff] x1 recent, 1 total, since 2026-10-25: <code> is <path> (per main); regenerate on disk with <code> - do not commit it.
  example: `static/content-status.json` is gitignored/untracked (per main); regenerate on disk with `npm run build:content-status`  -  do not commit it.
  evidence: job:maint-2026-w43-m2-conflict1
- [phr] x1 recent, 1 total, since 2026-10-25: failure modes observed: existing crew worker-chain test expects codex after avoiding claude, but the chain now selects agy_claude.
  example: failure modes observed: Existing crew worker-chain test expects codex after avoiding claude, but the chain now selects agy_claude.
  evidence: phr:history/prompts/general/20261027-generate-adr-register.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-25: next experiment (smallest change to try): update the worker-chain test only under a separately scoped maintenance task.
  example: next experiment (smallest change to try): Update the worker-chain test only under a separately scoped maintenance task.
  evidence: phr:history/prompts/general/20261027-generate-adr-register.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-25: failure modes observed: baseline crew suite expects codex after avoiding claude but the configured chain selects agy_claude.
  example: failure modes observed: Baseline crew suite expects codex after avoiding claude but the configured chain selects agy_claude.
  evidence: phr:history/prompts/general/20261026-repair-crew-worktree-generated-status.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-25: next experiment (smallest change to try): measure missing and stale report signatures after deployment.
  example: next experiment (smallest change to try): Measure missing and stale report signatures after deployment.
  evidence: phr:history/prompts/general/20261026-repair-crew-worktree-generated-status.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-25: reflection: green deterministic gates cannot resolve semantic source defects.
  example: reflection: Green deterministic gates cannot resolve semantic source defects.
  evidence: phr:history/prompts/general/20261026-gsos301-u06-translation-retry-blocked.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-25: failure modes observed: retry scheduled before prerequisite repairs landed.
  example: failure modes observed: Retry scheduled before prerequisite repairs landed.
  evidence: phr:history/prompts/general/20261026-gsos301-u06-translation-retry-blocked.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-25: next experiment (smallest change to try): freeze repaired english before retrying gn.
  example: next experiment (smallest change to try): Freeze repaired English before retrying G4.
  evidence: phr:history/prompts/general/20261026-gsos301-u06-translation-retry-blocked.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-25: failure modes observed: earlier committed branch retained a stale gn manifest despite a stored passing log. post-commit validation also caught that updating tra
  example: failure modes observed: Earlier committed branch retained a stale G2 manifest despite a stored passing log. Post-commit validation also caught that updating translation handoff files invalidates G2: f
  evidence: phr:history/prompts/general/20261026-validate-unit-seven-urdu-retry.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-25: next experiment (smallest change to try): inspect the frozen urdu bundle at desktop, narrow width and an on an authorized rendering host.
  example: next experiment (smallest change to try): Inspect the frozen Urdu bundle at desktop, narrow width and A4 on an authorized rendering host.
  evidence: phr:history/prompts/general/20261026-validate-unit-seven-urdu-retry.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-25: failure modes observed: early figure run overlapped incomplete svg generation; regenerated dark variants resolved it. archive without git metadata could not val
  example: failure modes observed: Early figure run overlapped incomplete SVG generation; regenerated dark variants resolved it. Archive without Git metadata could not validate committed inputs; reran with basel
  evidence: phr:history/prompts/general/20261025-gqur-301-u07-draft-urdu-mirror.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-25: next experiment (smallest change to try): inspect the frozen urdu bundle in desktop, npx and an views in an authorized session.
  example: next experiment (smallest change to try): Inspect the frozen Urdu bundle in desktop, 360px and A4 views in an authorized session.
  evidence: phr:history/prompts/general/20261025-gqur-301-u07-draft-urdu-mirror.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-25: failure modes observed: .ur.svg desc prepared by the figures job was a shorter alt than any full translation, so check:figures fails under reviewed until desc a
  example: failure modes observed: .ur.svg desc prepared by the figures job was a shorter alt than any full translation, so check:figures fails under reviewed until desc and alt are synced.
  evidence: phr:history/prompts/gsos-301/20261025-gsos301-u03-translate-r1.misc.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-25: next experiment (smallest change to try): have the figures job write .ur.svg desc only after the urdu carrier alt exists, or have translate-unit own the desc sy
  example: next experiment (smallest change to try): have the figures job write .ur.svg desc only after the Urdu carrier alt exists, or have translate-unit own the desc sync.
  evidence: phr:history/prompts/gsos-301/20261025-gsos301-u03-translate-r1.misc.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-25: failure modes observed: known gn citation and mapping defects remain despite passing deterministic gates. the tracker-note edit invalidated the generated conten
  example: failure modes observed: Known G3 citation and mapping defects remain despite passing deterministic gates. The tracker-note edit invalidated the generated content-status digest; refreshed it with the p
  evidence: phr:history/prompts/gsos-301/20261025-gsos-301-u06-translation-blocked.misc.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-25: next experiment (smallest change to try): repair the english baseline in an author session before assigning translation again.
  example: next experiment (smallest change to try): Repair the English baseline in an author session before assigning translation again.
  evidence: phr:history/prompts/gsos-301/20261025-gsos-301-u06-translation-blocked.misc.prompt.md
- [handoff] x1 recent, 1 total, since 2026-10-25: baseline test failure in <code> ('expected codex, received agy_claude') is pre-existing on main and resolved in pr #n (task mn).
  example: Baseline test failure in `tests/crew/workers.test.mjs` ('expected codex, received agy_claude') is pre-existing on main and resolved in PR #329 (task M3).
  evidence: job:intel-2026-10-26-distill
- [handoff] x1 recent, 1 total, since 2026-10-25: pr #n resolved the <code> pathspec crash on untracked <code>, resuming cron ticks after a ~nh stall.
  example: PR #335 resolved the `tick.sh` pathspec crash on untracked `static/content-status.json`, resuming cron ticks after a ~16h stall.
  evidence: job:intel-2026-10-26-distill
- [handoff] x1 recent, 1 total, since 2026-10-25: task mn landed on main holding translation on unrepaired gn revise reports; gating on active or queued repair_en is proposed in cn.
  example: Task M2 landed on main holding translation on unrepaired G3 revise reports; gating on active or queued repair_en is proposed in C2.
  evidence: job:intel-2026-10-26-distill
- [handoff] x1 recent, 1 total, since 2026-10-25: main now owns <path>; branch's quota-reset lesson is i-n. phr n (n-honor-provider-quota-reset) updated. the <code> stash (content-status.json) is still parked a
  example: Main now owns I-0010/I-0011/I-0012; branch's quota-reset lesson is I-0013. PHR 541 (541-honor-provider-quota-reset) updated. The `crew-conflict1-existing-generated-status` stash (content-status.json) 
  evidence: job:maint-2026-w43-m3-conflict2
- [log-error] x1 recent, 1 total, since 2026-10-25: /** check names that failed on main's latest finished (not cancelled) ci run. */
  example: /** Check names that failed on main's latest finished (not cancelled) CI run. */
  evidence: log:maint-2026-w43-m4-review3.1.log

Follow `.claude/skills/intel-distill/SKILL.md` exactly; read it and every file it references before starting.

## Scope
`specs/intelligence/daily/2026-10-27.md` only.

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
- (intel-2026-10-26-distill, intel_distill, agy) Baseline test failure in `tests/crew/workers.test.mjs` ('expected codex, received agy_claude') is pre-existing on main and resolved in PR #329 (task M3).
- (intel-2026-10-26-distill, intel_distill, agy) PR #335 resolved the `tick.sh` pathspec crash on untracked `static/content-status.json`, resuming cron ticks after a ~16h stall.
- (intel-2026-10-26-distill, intel_distill, agy) Task M2 landed on main holding translation on unrepaired G3 revise reports; gating on active or queued repair_en is proposed in C2.
- (intel-2026-10-25-distill, intel_distill, agy) `static/content-status.json` merge conflicts in the control checkout stalled `tick.sh` cron for ~6h; task M1 untracking and tick reset resolve this.
- (intel-2026-10-25-distill, intel_distill, agy) Figure jobs generate `.ur.svg` schematics before Urdu topic MDX exists, requiring translation jobs to wire them.


## Response snapshot

8 candidates; strongest: review-evidence bound inputs include translation handoffs invalidating sealed G2 manifests, and Urdu figure desc diverges from carrier alt.

## Outcome

- Impact: intel_distill for INTEL Unit 0 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: 8 candidates; strongest: review-evidence bound inputs include translation handoffs invalidating sealed G2 manifests, and Urdu figure desc diverges from carrier alt.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - scripts/lib/review-evidence.mjs binds translation handoffs to G2 manifest; adding /translations/ to exclusions would prevent post-translation G2 invalidation.
  - PR #329 resolved the baseline workers.test.mjs agy_claude assertion; all 69 crew tests now pass.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
