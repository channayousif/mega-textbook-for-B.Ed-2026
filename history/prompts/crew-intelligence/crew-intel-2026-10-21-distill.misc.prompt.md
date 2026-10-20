---
id: crew-intel-2026-10-21-distill
title: crew intel_distill INTEL unit 0
stage: misc
date: 2026-10-20
surface: agent
model: agy
feature: crew-intelligence
branch: crew/intel-2026-10-21-distill
user: crew
command: crew intel_distill
labels: ["crew", "agy", "intel_distill"]
links:
  spec: specs/intelligence/registry.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/intelligence/daily/2026-10-21.md
tests:
 - npm run check:content
---

## Prompt

# Crew job intel-2026-10-21-distill

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/intel-2026-10-21-distill`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, and never touch course content (`docs/`, `licence/`, the Urdu docs trees,
`specs/content/`, `static/img/figures/`, `glossary.json`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.

## Task
Distil today's reusable intelligence (intel-distill skill) into `specs/intelligence/daily/2026-10-21.md`. These clusters grew in the last 24 hours (kind, recent count, total, signature, an example, evidence):

- [log-error] x18 recent, 90 total, since 2026-10-17: n of n content gates failed: check:content-status.
  example: 1 of 13 content gates failed: check:content-status.
  evidence: log:efmp-301-u01-review_ur.2.log, log:efmp-302-u02-repair_en-conflict1.1.log, log:efmp-302-u02-repair_en-conflict4.1.log
- [log-error] x14 recent, 62 total, since 2026-10-17: ✗ <path> is stale - it no longer describes the working tree.
  example: ✗ static/content-status.json is stale - it no longer describes the working tree.
  evidence: log:efmp-302-u02-repair_en-conflict1.1.log, log:efmp-302-u02-repair_en-conflict4.1.log, log:efmp-302-u02-translate.1.log
- [failure] x11 recent, 14 total, since 2026-10-19: left out of the batch: <path> conflicts with main (it could not join the hourly batch).; merge fix queued
  example: left out of the batch: crew/gnas-301-u03-repair_en conflicts with main (it could not join the hourly batch).; merge fix queued
  evidence: job:gnas-301-u03-repair_en, job:gnas-301-u05-repair_en, job:geng-301-u05-review_en
- [log-error] x8 recent, 50 total, since 2026-10-17: ✗ <path> is missing. run: npm run build:content-status
  example: ✗ static/content-status.json is missing. Run: npm run build:content-status
  evidence: log:efmp-301-u01-review_ur.2.log, log:efmp-302-u06-translate-r1.1.log, log:efmp-302-u06-translate-r1.2.log
- [log-error] x6 recent, 10 total, since 2026-10-19: ? <code>
  example: ? `\n${names} failed. Fix it and re-run; later gates did not run.`
  evidence: log:efmp-305-u01-repair_en-conflict2.1.log, log:efmp-305-u01-repair_en-conflict3.1.log, log:efmp-305-u01-repair_en-conflict4.1.log
- [log-error] x4 recent, 8 total, since 2026-10-17: automatic merge failed; fix conflicts and then commit the result.
  example: Automatic merge failed; fix conflicts and then commit the result.
  evidence: log:geng-301-u00-salvage-conflict1.1.log, log:geng-301-u00-salvage-conflict2.1.log, log:gpks-402-u00-salvage-conflict3.1.log
- [review] x4 recent, 4 total, since 2026-10-19: advisory on vocabulary
  example: Advisory on vocabulary
  evidence: review:specs/content/efmp-303/reviews/unit-02/G5/agent-g5-efmp303-u2-runb652e73e.json, review:specs/content/efmp-303/reviews/unit-02/G5/agent-g5-efmp303-u2-run54ea2d76.json
- [handoff] x4 recent, 4 total, since 2026-10-19: gn remains open; a third review cycle requires owner authorization under g-n-n.
  example: G3 remains open; a third review cycle requires owner authorization under G-2026-31.
  evidence: job:gnas-301-u04-repair_en-conflict2, job:gnas-301-u04-repair_en-conflict3
- [failure] x3 recent, 28 total, since 2026-10-19: left out of the batch: merged onto main's latest state, <path> fails npm run check:content (it could not join the hourly batch):; merge fix queued
  example: left out of the batch: Merged onto main's latest state, crew/efmp-302-u02-repair_en fails npm run check:content (it could not join the hourly batch):; merge fix queued
  evidence: job:efmp-302-u02-repair_en, job:efmp-304-u01-repair_en, job:efmp-305-u01-repair_en
- [log-error] x3 recent, 22 total, since 2026-10-17: error: the user rejected permission to use this specific tool call.
  example: Error: The user rejected permission to use this specific tool call.
  evidence: log:efmp-301-u01-review_ur.1.log, log:efmp-302-u02-repair_en-conflict2.1.log, log:efmp-302-u02-repair_en-conflict2.2.log
- [log-error] x3 recent, 9 total, since 2026-10-17: error: pathspec '<path>' did not match any file(s) known to git
  example: error: pathspec 'static/content-status.json' did not match any file(s) known to git
  evidence: log:efmp-302-u02-repair_en-conflict2.2.log, log:efmp-304-u02-review_en-cifix2.1.log, log:geng-300-u01-repair_en-conflict1.1.log
- [phr] x3 recent, 3 total, since 2026-10-19: next experiment (smallest change to try): targeted repair pr fixing fn, fn, and fn followed by fresh re-review.
  example: next experiment (smallest change to try): Targeted repair PR fixing f1, f2, and f3 followed by fresh re-review.
  evidence: phr:history/prompts/geng-300/0173-geng-300-u02-independent-g3-review.misc.prompt.md, phr:history/prompts/geng-300/0172-geng-300-u01-independent-g3-review.misc.prompt.md, phr:history/prompts/efmp-304/0171-efmp-304-u01-independent-g3-review.misc.prompt.md
- [phr] x3 recent, 3 total, since 2026-10-19: failure modes observed: <code> and <code> fail at repo level due to out-of-scope files in sibling units (<course> unit n depth overrun; <course> alt mismatches)
  example: failure modes observed: `check:depth-gate` and `check:figures` fail at repo level due to out-of-scope files in sibling units (EFMP-305 Unit 6 depth overrun; EFMP-304 alt mismatches), preventing a clea
  evidence: phr:history/prompts/efmp-305/0155-tex112-efmp305-u3-g3-review.misc.prompt.md, phr:history/prompts/efmp-305/0154-tex111-efmp305-u2-g3-review.misc.prompt.md, phr:history/prompts/efmp-305/0153-tex110-efmp305-u1-g3-review.misc.prompt.md
- [failure] x2 recent, 32 total, since 2026-10-17: ✗ <path> is missing. run: npm run build:content-status
  example: ✗ static/content-status.json is missing. Run: npm run build:content-status
  evidence: job:efmp-305-u00-salvage, job:efmp-301-u01-review_ur, job:efmp-304-u02-review_en
- [failure] x2 recent, 17 total, since 2026-10-19: the worker exited without committing any change
  example: the worker exited without committing any change
  evidence: job:gict-300-u01-translate-r1, job:efmp-304-u04-translate-r1, job:efmp-303-u02-translate
- [log-error] x2 recent, 4 total, since 2026-10-18: justification or are rejected.
  example: justification or are rejected.
  evidence: log:efmp-303-u05-review_en.2.log, log:efmp-304-u01-repair_en-conflict5.1.log, log:efmp-305-u01-repair_en-conflict3.1.log
- [handoff] x2 recent, 2 total, since 2026-10-19: author repairs and host <path> evidence are required before fresh review; gn remains incomplete.
  example: Author repairs and host provenance/render evidence are required before fresh review; G3 remains incomplete.
  evidence: job:geng-301-u06-review_en
- [handoff] x2 recent, 2 total, since 2026-10-19: earlier unit n repairs still need fresh independent gn review.
  example: Earlier Unit 2 repairs still need fresh independent G3 review.
  evidence: job:geng-300-u02-repair_en-conflict1
- [handoff] x2 recent, 2 total, since 2026-10-19: the content-status report is ignored; fresh checkouts need <code>.
  example: The content-status report is ignored; fresh checkouts need `npm run build:content-status`.
  evidence: job:gict-300-u03-repair_en-conflict1
- [handoff] x2 recent, 2 total, since 2026-10-19: prior review findings remain for the unit repair job: svg overflows, rrq n counts, and topic-n citations.
  example: Prior review findings remain for the unit repair job: SVG overflows, RRQ 5 counts, and topic-02 citations.
  evidence: job:gqur-301-u01-review_en-conflict1
- [handoff] x2 recent, 2 total, since 2026-10-19: rrq n sentence-number correction and rendered accessibility review remain pending with the author and independent reviewer.
  example: RRQ 5 sentence-number correction and rendered accessibility review remain pending with the author and independent reviewer.
  evidence: job:geng-301-u01-review_en-conflict1
- [handoff] x2 recent, 2 total, since 2026-10-19: gn remains incomplete; earlier author repairs, provenance and rendered inspection remain pending.
  example: G3 remains incomplete; earlier author repairs, provenance and rendered inspection remain pending.
  evidence: job:geng-301-u05-review_en-conflict1
- [handoff] x2 recent, 2 total, since 2026-10-19: fresh independent <path> review and <path> inspection remain pending; inspect figure n’s footer.
  example: Fresh independent G3/G5 review and narrow-width/A4 inspection remain pending; inspect Figure 3’s footer.
  evidence: job:efmp-304-u01-repair_en-conflict5
- [handoff] x2 recent, 2 total, since 2026-10-19: remote ci still needs a rerun; its failure was temporary git-directory cleanup in shared tests outside this batch’s scope.
  example: Remote CI still needs a rerun; its failure was temporary Git-directory cleanup in shared tests outside this batch’s scope.
  evidence: job:batch-20261019-1915-cifix1
- [review] x2 recent, 2 total, since 2026-10-19: full interactive live-browser rendering (narrow nxn viewport and an print emulation) was not performed because brief constraints specify "never run npm run buil
  example: Full interactive live-browser rendering (narrow 360x780 viewport and A4 print emulation) was not performed because brief constraints specify "never run npm run build or a dev server"
  evidence: review:specs/content/efmp-303/reviews/unit-01/G3/agent-g3-efmp-303-u1-run6844dc97.json, review:specs/content/efmp-303/reviews/unit-01/G3/agent-g3-efmp-303-u1-run044c8d2c.json
- [review] x2 recent, 2 total, since 2026-10-19: in <path>:n, unit n gn row states "board <path> intake pending", though <path> status is approved
  example: In specs/content/efmp-303/tasks.md:15, Unit 1 G1 row states "board G0/G1 intake pending", though specs/content/efmp-303/content-spec.md status is approved
  evidence: review:specs/content/efmp-303/reviews/unit-01/G3/agent-g3-efmp-303-u1-run6844dc97.json, review:specs/content/efmp-303/reviews/unit-01/G3/agent-g3-efmp-303-u1-run044c8d2c.json
- [review] x2 recent, 2 total, since 2026-10-19: in <path> (and <path> variants), measure-figure-text.mjs reports a cosmetic panel overlap with the bottom wordmark ([n,n,n,n] by n.n x n.npx)
  example: In static/img/figures/efmp-303/unit-01/fig-U1-8.svg (and dark/ur variants), measure-figure-text.mjs reports a cosmetic panel overlap with the bottom wordmark ([20,475,760,505] by 84.3 x 5.5px)
  evidence: review:specs/content/efmp-303/reviews/unit-01/G3/agent-g3-efmp-303-u1-run6844dc97.json, review:specs/content/efmp-303/reviews/unit-01/G3/agent-g3-efmp-303-u1-run044c8d2c.json
- [review] x2 recent, 2 total, since 2026-10-19: terminology banking proposal
  example: Terminology banking proposal
  evidence: review:specs/content/efmp-305/reviews/unit-04/G3/agent-g3-efmp-305-u4-run750d5970.json, review:specs/content/efmp-305/reviews/unit-03/G3/agent-g3-efmp-305-u3-runee4475a5.json
- [review] x2 recent, 2 total, since 2026-10-19: repository gate failure (check:depth-gate)
  example: Repository gate failure (check:depth-gate)
  evidence: review:specs/content/efmp-305/reviews/unit-02/G3/agent-g3-efmp-305-u2-run5873b2cc.json, review:specs/content/efmp-305/reviews/unit-01/G3/agent-g3-efmp-305-u1-run2f195870.json
- [review] x2 recent, 2 total, since 2026-10-19: repository gate failure (check:figures)
  example: Repository gate failure (check:figures)
  evidence: review:specs/content/efmp-305/reviews/unit-02/G3/agent-g3-efmp-305-u2-run5873b2cc.json, review:specs/content/efmp-305/reviews/unit-01/G3/agent-g3-efmp-305-u1-run2f195870.json
- [review] x2 recent, 2 total, since 2026-10-19: bare url in further reading
  example: Bare URL in Further reading
  evidence: review:specs/content/efmp-305/reviews/unit-02/G3/agent-g3-efmp-305-u2-run5873b2cc.json, review:specs/content/efmp-305/reviews/unit-01/G3/agent-g3-efmp-305-u1-run2f195870.json
- [review] x2 recent, 2 total, since 2026-10-19: unit depth budget
  example: Unit depth budget
  evidence: review:specs/content/efmp-305/reviews/unit-06/G3/agent-g3-efmp-305-u6-run741ff9ea.json, review:specs/content/efmp-305/reviews/unit-06/G3/agent-g3-efmp-305-u6-run4d766bf0.json
- [review] x2 recent, 2 total, since 2026-10-19: full-text source retrieval for unicef (n)
  example: Full-text source retrieval for UNICEF (2014)
  evidence: review:specs/content/efmp-305/reviews/unit-06/G3/agent-g3-efmp-305-u6-run741ff9ea.json, review:specs/content/efmp-305/reviews/unit-06/G3/agent-g3-efmp-305-u6-run4d766bf0.json
- [review] x2 recent, 2 total, since 2026-10-19: research context and local applicability
  example: Research context and local applicability
  evidence: review:specs/content/efmp-305/reviews/unit-06/G3/agent-g3-efmp-305-u6-run741ff9ea.json, review:specs/content/efmp-305/reviews/unit-06/G3/agent-g3-efmp-305-u6-run4d766bf0.json
- [review] x2 recent, 2 total, since 2026-10-19: figure alignment context
  example: Figure alignment context
  evidence: review:specs/content/efmp-303/reviews/unit-02/G5/agent-g5-efmp303-u2-runb652e73e.json, review:specs/content/efmp-303/reviews/unit-02/G5/agent-g5-efmp303-u2-run54ea2d76.json
- [handoff] x2 recent, 2 total, since 2026-10-20: repair topic-n tables and fig-un-n before resuming gn.
  example: Repair topic-03 tables and fig-U1-5 before resuming G4.
  evidence: job:gqur-301-u01-translate
- [handoff] x2 recent, 2 total, since 2026-10-20: separate english author must repair existing gn findings before gn resumes; translation status remains draft.
  example: Separate English author must repair existing G3 findings before G4 resumes; translation status remains draft.
  evidence: job:gqur-301-u02-translate
- [handoff] x2 recent, 2 total, since 2026-10-19: gn remains incomplete; author repairs, provenance and rendered inspection remain pending.
  example: G3 remains incomplete; author repairs, provenance and rendered inspection remain pending.
  evidence: job:geng-301-u05-review_en-conflict2
- [handoff] x2 recent, 2 total, since 2026-10-19: unit n author repairs and fresh <path> review remain pending; gn stays incomplete.
  example: Unit 6 author repairs and fresh provenance/render review remain pending; G3 stays incomplete.
  evidence: job:geng-301-u06-review_en-conflict1
- [handoff] x2 recent, 2 total, since 2026-10-20: separate english author must repair the existing gn findings before gn resumes; translation_status remains draft.
  example: Separate English author must repair the existing G3 findings before G4 resumes; translation_status remains draft.
  evidence: job:gqur-301-u02-translate-r1

Follow `.claude/skills/intel-distill/SKILL.md` exactly; read it and every file it references before starting.

## Scope
`specs/intelligence/daily/2026-10-21.md` only.

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
- (intel-2026-10-20-distill, intel_distill, agy) C1 (I-0007 recurrence) and C2 (I-0008 recurrence) account for over 150 gate errors and 16 permission rejections; ready for weekly maintenance promotion.
- (intel-2026-10-20-distill, intel_distill, agy) I-0005 batch content-status fix verified effective, dropping from 25 signals to 3 in the latest slot.


## Response snapshot

10 candidates; hourly batch merge conflicts on shared tracker files and ADR-0019 two-cycle review limbo.

## Outcome

- Impact: intel_distill for INTEL Unit 0 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: 10 candidates; hourly batch merge conflicts on shared tracker files and ADR-0019 two-cycle review limbo.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Batch merge conflicts on course trackers (`tasks.md`) grew to 11 recent failures (14 total); needs dispatcher serialization or batch auto-rebase.
  - Units exhausting ADR-0019 two-cycle review limits (e.g. GNAS-301 Unit 4 / G-2026-31) repeatedly loop on repair jobs; planner needs owner-escalation detection.
  - I-0005 verified effective; I-0007 (fresh worktree content-status) and I-0008 (workspace `/tmp` boundary) are ready for weekly maintenance promotion.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
