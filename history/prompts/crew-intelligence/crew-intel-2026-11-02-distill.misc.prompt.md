---
id: crew-intel-2026-11-02-distill
title: crew intel_distill INTEL unit 0
stage: misc
date: 2026-11-01
surface: agent
model: agy
feature: crew-intelligence
branch: crew/intel-2026-11-02-distill
user: crew
command: crew intel_distill
labels: ["crew", "agy", "intel_distill"]
links:
  spec: specs/intelligence/registry.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/intelligence/daily/2026-11-02.md
tests:
 - npm run check:content
---

## Prompt

# Crew job intel-2026-11-02-distill

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/intel-2026-11-02-distill`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, and never touch course content (`docs/`, `licence/`, the Urdu docs trees,
`specs/content/`, `static/img/figures/`, `glossary.json`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.

## Task
Distil today's reusable intelligence (intel-distill skill) into `specs/intelligence/daily/2026-11-02.md`. These clusters grew in the last 24 hours (kind, recent count, total, signature, an example, evidence):

- [handoff] x2 recent, 2 total, since 2026-10-31: protected script changes require owner review.
  example: Protected script changes require owner review.
  evidence: job:maint-2026-w44-m2
- [handoff] x2 recent, 2 total, since 2026-10-31: protected adr changes require owner review.
  example: Protected ADR changes require owner review.
  evidence: job:maint-2026-w44-a1
- [log-error] x1 recent, 2 total, since 2026-10-24: simplest and fully coherent. rejected: it uses one subscription, stops when that subscription hits
  example: Simplest and fully coherent. Rejected: it uses one subscription, stops when that subscription hits
  evidence: log:maint-2026-w43-m3.1.log, log:maint-2026-w44-m1-review2.1.log
- [log-error] x1 recent, 2 total, since 2026-10-24: responsibility, matching adr-n's original split. rejected by the owner ("any one may be
  example: responsibility, matching ADR-0024's original split. Rejected by the owner ("any one may be
  evidence: log:maint-2026-w43-m3.1.log, log:maint-2026-w44-m1-review2.1.log
- [handoff] x1 recent, 1 total, since 2026-10-31: mn is the only medium-risk task: it writes course <code> files automatically during the batch, so the reviewer should check that the merge helper returns null w
  example: M1 is the only medium-risk task: it writes course `tasks.md` files automatically during the batch, so the reviewer should check that the merge helper returns null whenever either side changes or delet
  evidence: job:maint-2026-w44-survey
- [handoff] x1 recent, 1 total, since 2026-10-31: only dn may edit <code> this week; if mn, mn, mn or sn touch it, send them back for revision.
  example: Only D1 may edit `specs/intelligence/registry.md` this week; if M1, M2, M3 or S1 touch it, send them back for revision.
  evidence: job:maint-2026-w44-survey
- [handoff] x1 recent, 1 total, since 2026-10-31: <code> step n does not say that the batch now resolves glossary, content-status and course-tracker conflicts itself; the wn docs task should add it.
  example: `ops/crew/README.md` step 5 does not say that the batch now resolves glossary, content-status and course-tracker conflicts itself; the W44 docs task should add it.
  evidence: job:maint-2026-w44-m1
- [handoff] x1 recent, 1 total, since 2026-10-31: <code> matches base lines in order, first occurrence first. if one side adds a line identical to a later base line (say a blank line), it may be matched to the 
  example: `mergeAppendOnly` matches base lines in order, first occurrence first. If one side adds a line identical to a later base line (say a blank line), it may be matched to the wrong spot. The output still 
  evidence: job:maint-2026-w44-m1
- [handoff] x1 recent, 1 total, since 2026-10-31: the <code> rule needed no change (already returned true for an unrepaired escalate). the <code> was left untouched per task scope. no other callers of <code> ne
  example: The `awaitingG3` rule needed no change (already returned true for an unrepaired escalate). The `registry.md` was left untouched per task scope. No other callers of `stagesFor` need changes  -  the esc
  evidence: job:maint-2026-w44-m3
- [handoff] x1 recent, 1 total, since 2026-10-31: registry row i-n exists only on the dn branch (<code>, <sha>), not on main, so the reviewer should check the citation against that branch.
  example: registry row I-0017 exists only on the D1 branch (`crew/maint-2026-w44-d1`, 33dea9f7), not on main, so the reviewer should check the citation against that branch.
  evidence: job:maint-2026-w44-s1
- [handoff] x1 recent, 1 total, since 2026-10-31: the new advice to drop an unbanked term from <code> is safe because only <code> reads <code>; grep found no other consumer in <code>.
  example: the new advice to drop an unbanked term from `key_terms` is safe because only `check:pipeline-gate` reads `key_terms`; grep found no other consumer in `scripts/`.
  evidence: job:maint-2026-w44-s1
- [handoff] x1 recent, 1 total, since 2026-10-31: <code>, which supplies the registry rows, is only on <code> (and this branch), so the reviewer should check the registry against that copy until it reaches main
  example: `intelligence.md`, which supplies the registry rows, is only on `crew/maint-2026-w44-survey` (and this branch), so the reviewer should check the registry against that copy until it reaches main.
  evidence: job:maint-2026-w44-d1
- [handoff] x1 recent, 1 total, since 2026-10-31: candidate cn notes that crew briefs forbidding browsers lead translators to leave urdu units in draft without running svg geometry (<code>); clarifying that hea
  example: Candidate C2 notes that crew briefs forbidding browsers lead translators to leave Urdu units in draft without running SVG geometry (`scripts/heavy.sh node scripts/measure-figure-text.mjs`); clarifying
  evidence: job:intel-2026-11-01-distill
- [handoff] x1 recent, 1 total, since 2026-10-31: candidate cn notes that providing full unit assessments with answer keys forces reviewers to inspect stems and keys together; generating isolated stem bundles (
  example: Candidate C3 notes that providing full unit assessments with answer keys forces reviewers to inspect stems and keys together; generating isolated stem bundles (`unit-assessment-stems.mdx`) will restor
  evidence: job:intel-2026-11-01-distill
- [log-error] x1 recent, 1 total, since 2026-10-31: reason, cross-issue writes failed with run-binding ns, quota monitors outlived adapter switches,
  example: reason, cross-issue writes failed with run-binding 403s, quota monitors outlived adapter switches,
  evidence: log:maint-2026-w44-m1-review2.1.log
- [log-error] x1 recent, 1 total, since 2026-10-31: 'failure_modes':'existing quota regex rejected n-hour; reported-failure prose and question lines became error signals.',
  example: 'FAILURE_MODES':'Existing quota regex rejected 5-hour; reported-failure prose and question lines became error signals.',
  evidence: log:maint-2026-w44-m2.1.log
- [log-error] x1 recent, 1 total, since 2026-10-31: n: reason, cross-issue writes failed with run-binding ns, quota monitors outlived adapter switches,
  example: 11:  reason, cross-issue writes failed with run-binding 403s, quota monitors outlived adapter switches,
  evidence: log:maint-2026-w44-m2.1.log
- [phr] x1 recent, 1 total, since 2026-11-01: failure modes observed: join-based equality drops blank-line insertions from one side silently.
  example: failure modes observed: join-based equality drops blank-line insertions from one side silently.
  evidence: phr:history/prompts/crew-maintenance/crew-maint-2026-w44-m1-revise1.misc.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-01: failure modes observed: initial scratch-script invocation used unavailable python; reran with pythonn. initial dash scan included unchanged historical adrs; sco
  example: failure modes observed: Initial scratch-script invocation used unavailable python; reran with python3. Initial dash scan included unchanged historical ADRs; scoped it to the task files.
  evidence: phr:history/prompts/general/20261050-refresh-adr-register-through-0033.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-01: failure modes observed: existing quota regex rejected n-hour; reported-failure prose and question lines became error signals.
  example: failure modes observed: Existing quota regex rejected 5-hour; reported-failure prose and question lines became error signals.
  evidence: phr:history/prompts/general/20261050-recognise-quota-filter-harvester-noise.general.prompt.md

Follow `.claude/skills/intel-distill/SKILL.md` exactly; read it and every file it references before starting.

## Scope
`specs/intelligence/daily/2026-11-02.md` only.

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
- (intel-2026-11-01-distill, intel_distill, agy) Candidate C2 notes that crew briefs forbidding browsers lead translators to leave Urdu units in draft without running SVG geometry (`scripts/heavy.sh node scripts/measure-figure-text.mjs`); clarifying that headless SVG geometry checks are permitted will unblock G5 handoffs.
- (intel-2026-11-01-distill, intel_distill, agy) Candidate C3 notes that providing full unit assessments with answer keys forces reviewers to inspect stems and keys together; generating isolated stem bundles (`unit-assessment-stems.mdx`) will restore independent pre-key solving under ADR-0019.
- (intel-2026-10-31-distill, intel_distill, agy) Translation and retry jobs should be held when G3 report disposition is escalate or revise with unresolved blocking defects (candidate C1).
- (intel-2026-10-31-distill, intel_distill, agy) Unpaged PostgREST queries in admin pages risk hitting the 1000-row limit when test accounts accumulate; use fetchAllPages (candidate C2).
- (intel-2026-10-31-distill, intel_distill, agy) Merging tasks.md table rows across concurrent course jobs requires row reconciliation by (Unit, Stage) to avoid duplicate rows and pipeline gate failures (candidate C3).


## Response snapshot

7 candidates; the strongest filters design rationale and grep output from harvester error clusters.

## Outcome

- Impact: intel_distill for INTEL Unit 0 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: 7 candidates; the strongest filters design rationale and grep output from harvester error clusters.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Candidate C1 identifies that `LOG_ERROR` in `scripts/crew/intel.mjs` matches design rationale ("Rejected:"), grep output line prefixes, and serialized JSON keys, leaking noise into error clusters.
  - Candidate C2 notes that `mergeAppendOnly`'s greedy first-occurrence scan in `scripts/crew/batch.mjs` risks misaligning duplicate lines (like empty lines) in `tasks.md`.
  - Candidate C4 highlights that assigning registry edits strictly to D1 during maintenance caused parallel worker S1 to cite an unmerged registry row (`I-0017`).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
