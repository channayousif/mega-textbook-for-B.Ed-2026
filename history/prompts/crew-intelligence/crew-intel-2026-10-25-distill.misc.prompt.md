---
id: crew-intel-2026-10-25-distill
title: crew intel_distill INTEL unit 0
stage: misc
date: 2026-10-25
surface: agent
model: agy
feature: crew-intelligence
branch: crew/intel-2026-10-25-distill
user: crew
command: crew intel_distill
labels: ["crew", "agy", "intel_distill"]
links:
  spec: specs/intelligence/registry.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/intelligence/daily/2026-10-25.md
tests:
  - npm run check:content
  - node --test tests/crew/intel.test.mjs
---

## Prompt

# Crew job intel-2026-10-25-distill

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/intel-2026-10-25-distill`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, and never touch course content (`docs/`, `licence/`, the Urdu docs trees,
`specs/content/`, `static/img/figures/`, `glossary.json`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.

## Task
Distil today's reusable intelligence (intel-distill skill) into `specs/intelligence/daily/2026-10-25.md`. These clusters grew in the last 24 hours (kind, recent count, total, signature, an example, evidence):

- [log-error] x2 recent, 105 total, since 2026-10-17: ✗ <path> is stale - it no longer describes the working tree.
  example: ✗ static/content-status.json is stale - it no longer describes the working tree.
  evidence: log:efmp-302-u02-repair_en-conflict1.1.log, log:efmp-302-u02-repair_en-conflict4.1.log, log:efmp-302-u02-translate.1.log
- [handoff] x2 recent, 2 total, since 2026-10-24: urdu unit n pages are absent; the translation job must wire the prepared urdu svgs.
  example: Urdu Unit 3 pages are absent; the translation job must wire the prepared Urdu SVGs.
  evidence: job:gsos-301-u03-figures
- [handoff] x2 recent, 2 total, since 2026-10-24: a separate english author must resolve the existing gn findings before gn resumes.
  example: A separate English author must resolve the existing G3 findings before G4 resumes.
  evidence: job:gsos-301-u03-translate
- [log-error] x1 recent, 143 total, since 2026-10-17: n of n content gates failed: check:content-status.
  example: 1 of 13 content gates failed: check:content-status.
  evidence: log:efmp-301-u01-review_ur.2.log, log:efmp-302-u02-repair_en-conflict1.1.log, log:efmp-302-u02-repair_en-conflict4.1.log
- [log-error] x1 recent, 47 total, since 2026-10-17: ✗ pipeline gate failed with n finding(s):
  example: ✗ Pipeline gate failed with 2 finding(s):
  evidence: log:efmp-302-u03-translate.1.log, log:efmp-302-u04-translate-r1.1.log, log:efmp-303-u01-translate-r1.1.log
- [log-error] x1 recent, 28 total, since 2026-10-17: n of n content gates failed: check:pipeline-gate, check:content-status.
  example: 2 of 13 content gates failed: check:pipeline-gate, check:content-status.
  evidence: log:efmp-302-u04-translate-r1.1.log, log:efmp-303-u01-translate-r1.1.log, log:efmp-303-u02-translate.1.log
- [phr] x1 recent, 1 total, since 2026-10-23: failure modes observed: style-guide default contradicted a gate-enforced floor.
  example: failure modes observed: style-guide default contradicted a gate-enforced floor.
  evidence: phr:history/prompts/general/0862-owner-ruling-g-2026-154-formative-items.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-23: next experiment (smallest change to try): amend style-guide.md:n in a standalone pr.
  example: next experiment (smallest change to try): amend style-guide.md:227 in a standalone PR.
  evidence: phr:history/prompts/general/0862-owner-ruling-g-2026-154-formative-items.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-23: failure modes observed: earlier intake approved readings whose urls were n, misattributed or home pages.
  example: failure modes observed: earlier intake approved readings whose URLs were 404, misattributed or home pages.
  evidence: phr:history/prompts/general/0861-gpks-402-reading-list-repair.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-23: next experiment (smallest change to try): have check:source-floor or intake resolve reading-list urls.
  example: next experiment (smallest change to try): have check:source-floor or intake resolve reading-list URLs.
  evidence: phr:history/prompts/general/0861-gpks-402-reading-list-repair.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-23: failure modes observed: d-n-n "bound to" digest is n hex chars and does not match <path>; <code> excludes <code> but not <code> or <code>, so bundle dirs fall i
  example: failure modes observed: D-2026-0069 "Bound to" digest is 63 hex chars and does not match intake-88/manifest.json; `bound()` excludes `/intake/` but not `intake-NN/` or `intake-<date>/`, so bundle dirs
  evidence: phr:history/prompts/general/0859-gpks-402-fresh-intake.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-23: next experiment (smallest change to try): exclude <code> in bound().
  example: next experiment (smallest change to try): exclude `/intake[^/]*/` in bound().
  evidence: phr:history/prompts/general/0859-gpks-402-fresh-intake.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-23: failure modes observed: tick aborted on merge conflict with self-generated file for ~nh without alerting.
  example: failure modes observed: tick aborted on merge conflict with self-generated file for ~6h without alerting.
  evidence: phr:history/prompts/general/0856-unstall-crew-tick-dirty-content-status.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-23: next experiment (smallest change to try): <code> before the merge in tick.sh.
  example: next experiment (smallest change to try): `git checkout -- static/content-status.json` before the merge in tick.sh.
  evidence: phr:history/prompts/general/0856-unstall-crew-tick-dirty-content-status.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-23: reflection: a green deterministic draft gate does not resolve source defects.
  example: reflection: A green deterministic draft gate does not resolve source defects.
  evidence: phr:history/prompts/006-content-pipeline/0025-record-unit13-translation-prerequisite-blocker.misc.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-23: failure modes observed: unresolved english errors block faithful translation; generated content-status metadata stale at baseline.
  example: failure modes observed: Unresolved English errors block faithful translation; generated content-status metadata stale at baseline.
  evidence: phr:history/prompts/006-content-pipeline/0025-record-unit13-translation-prerequisite-blocker.misc.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-23: next experiment (smallest change to try): repair english before resuming urdu work.
  example: next experiment (smallest change to try): Repair English before resuming Urdu work.
  evidence: phr:history/prompts/006-content-pipeline/0025-record-unit13-translation-prerequisite-blocker.misc.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-23: reflection: passing deterministic scripts did not detect absent assets behind prompt-only manifest rows or assessment semantic defects.
  example: reflection: Passing deterministic scripts did not detect absent assets behind prompt-only manifest rows or assessment semantic defects.
  evidence: phr:history/prompts/014-agent-review-governance/0008-gqur301-unit-thirteen-advisory-review.misc.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-23: failure modes observed: missing <path> evidence; absent live figure targets passed deterministic checks because manifest rows remain prompt-only; rrqn contradic
  example: failure modes observed: Missing source/provenance/render evidence; absent live Figure targets passed deterministic checks because manifest rows remain prompt-only; RRQ8 contradicts its same-data premi
  evidence: phr:history/prompts/014-agent-review-governance/0008-gqur301-unit-thirteen-advisory-review.misc.prompt.md
- [phr] x1 recent, 1 total, since 2026-10-23: next experiment (smallest change to try): repair the observed defects separately and provide a frozen <path> bundle plus current rendered views to the next revi
  example: next experiment (smallest change to try): Repair the observed defects separately and provide a frozen source/provenance bundle plus current rendered views to the next reviewer.
  evidence: phr:history/prompts/014-agent-review-governance/0008-gqur301-unit-thirteen-advisory-review.misc.prompt.md
- [review] x1 recent, 1 total, since 2026-10-23: <path> and topic-n.mdx, four figure elements
  example: docs/semester-2/gqur-301/unit-13/topic-01.mdx and topic-02.mdx, four Figure elements
  evidence: review:specs/content/gqur-301/reviews/unit-13/G3/crew-20261023.json
- [review] x1 recent, 1 total, since 2026-10-23: <path>, rrqn and its model guidance
  example: docs/semester-2/gqur-301/unit-13/unit-assessment.mdx, RRQ8 and its model guidance
  evidence: review:specs/content/gqur-301/reviews/unit-13/G3/crew-20261023.json
- [review] x1 recent, 1 total, since 2026-10-23: <path>, what the regression line does not do
  example: docs/semester-2/gqur-301/unit-13/topic-02.mdx, What the regression line does not do
  evidence: review:specs/content/gqur-301/reviews/unit-13/G3/crew-20261023.json
- [review] x1 recent, 1 total, since 2026-10-23: <path>, what the sign and size of r tell a teacher, and topic-n.mdx, using the line to predict
  example: docs/semester-2/gqur-301/unit-13/topic-01.mdx, What the sign and size of r tell a teacher, and topic-02.mdx, Using the line to predict
  evidence: review:specs/content/gqur-301/reviews/unit-13/G3/crew-20261023.json
- [review] x1 recent, 1 total, since 2026-10-23: both topic summative task mini-rubrics demand only routine computation, interpretation and repetition of the generic causation caveat, despite analyze labels
  example: Both topic Summative task mini-rubrics demand only routine computation, interpretation and repetition of the generic causation caveat, despite Analyze labels
  evidence: review:specs/content/gqur-301/reviews/unit-13/G3/crew-20261023.json
- [review] x1 recent, 1 total, since 2026-10-23: current gn authority is unverified
  example: Current G1 authority is unverified
  evidence: review:specs/content/gqur-301/reviews/unit-13/G3/crew-20261023.json
- [review] x1 recent, 1 total, since 2026-10-23: the host supplied no prepared parent bundle or actual <path> conversation identities; the current fresh reviewer did not author the reviewed bytes and <path> a 
  example: The host supplied no prepared parent bundle or actual author/reviewer conversation identities; the current fresh reviewer did not author the reviewed bytes and prepared/recomputed a clean local 87-pat
  evidence: review:specs/content/gqur-301/reviews/unit-13/G3/crew-20261023.json
- [review] x1 recent, 1 total, since 2026-10-23: required actual <path> presentation evidence is unavailable under the brief prohibition on <path>
  example: Required actual browser/narrow-screen/A4 presentation evidence is unavailable under the brief prohibition on build/server/Playwright
  evidence: review:specs/content/gqur-301/reviews/unit-13/G3/crew-20261023.json
- [review] x1 recent, 1 total, since 2026-10-23: relevant source passages were not supplied as bound inputs
  example: Relevant source passages were not supplied as bound inputs
  evidence: review:specs/content/gqur-301/reviews/unit-13/G3/crew-20261023.json
- [review] x1 recent, 1 total, since 2026-10-23: <path> reinforcement rows misassign coefficient computation to mcqn (residual), mcqn (causal inference), rrqn (<path>), rrqn (interpolation); revise their mappi
  example: coverage/unit-13.md reinforcement rows misassign coefficient computation to MCQ7 (residual), MCQ10 (causal inference), RRQ4 (line/prediction), RRQ7 (interpolation); revise their mappings
  evidence: review:specs/content/gqur-301/reviews/unit-13/G3/crew-20261023.json
- [handoff] x1 recent, 1 total, since 2026-10-24: erq n is now a collected real-school-data task; a fresh gn reviewer should judge whether this meets the course-spec real-pakistan-data requirement.
  example: ERQ 4 is now a collected real-school-data task; a fresh G3 reviewer should judge whether this meets the course-spec real-Pakistan-data requirement.
  evidence: job:gqur-301-u07-repair_en
- [handoff] x1 recent, 1 total, since 2026-10-24: pn-pn (author-run provenance, open gn under d-n-n, <path> inspection, answer-blind verification) were not repairable by the author and remain open.
  example: P1-P4 (author-run provenance, open G1 under D-2026-0070, rendered/A4 inspection, answer-blind verification) were not repairable by the author and remain open.
  evidence: job:gqur-301-u07-repair_en
- [handoff] x1 recent, 1 total, since 2026-10-24: there is no urdu mirror yet; gn must translate the repaired erq <path>, rrq <path> and topic-n worked example n.
  example: There is no Urdu mirror yet; G4 must translate the repaired ERQ 2/4, RRQ 9/10 and topic-02 Worked example 2.
  evidence: job:gqur-301-u07-repair_en
- [handoff] x1 recent, 1 total, since 2026-10-24: english unit n still has gn fn-fn unfixed (question n same-data contradiction, the r-to-slope claim, unqualified interpolation), plus a stray "ȷ" (u+n) at topic
  example: English Unit 13 still has G3 F1-F5 unfixed (question 8 same-data contradiction, the r-to-slope claim, unqualified interpolation), plus a stray "ȷ" (U+0237) at topic-02.mdx:123. A separate English repa
  evidence: job:gqur-301-u13-translate-r1
- [handoff] x1 recent, 1 total, since 2026-10-24: there are no urdu files for unit n yet. the urdu figure assets from gqur-n-un-figures are waiting to be placed once the topics are translated.
  example: There are no Urdu files for Unit 13 yet. The Urdu figure assets from gqur-301-u13-figures are waiting to be placed once the topics are translated.
  evidence: job:gqur-301-u13-translate-r1
- [handoff] x1 recent, 1 total, since 2026-10-24: ene failure <code> ("fix typo a" filter → n elements) is pre-existing on main and needs either stale-row cleanup or per-run unique body text in a separate job -
  example: e2e failure `suggestion-moderation.spec.ts:75` ("Fix typo A" filter → 2 elements) is pre-existing on main and needs either stale-row cleanup or per-run unique body text in a separate job  -  it will n
  evidence: job:batch-20261023-1645-cifix1
- [handoff] x1 recent, 1 total, since 2026-10-24: <path> is tracked and out of date on <path>, causing check:content-status to fail in every fresh worktree.
  example: static/content-status.json is tracked and out of date on origin/main, causing check:content-status to fail in every fresh worktree.
  evidence: job:intel-2026-10-24-distill
- [handoff] x1 recent, 1 total, since 2026-10-24: step n of translate-unit trips check:pipeline-gate because flipping translation_status to reviewed asserts that gn and gn tracker rows are already done.
  example: Step 5 of translate-unit trips check:pipeline-gate because flipping translation_status to reviewed asserts that G4 and G5 tracker rows are already done.
  evidence: job:intel-2026-10-24-distill
- [handoff] x1 recent, 1 total, since 2026-10-24: adopted gate i-n successfully protected glossary.json against duplicate term insertions during gsos-n-un-author.
  example: Adopted gate I-0006 successfully protected glossary.json against duplicate term insertions during gsos-301-u03-author.
  evidence: job:intel-2026-10-24-distill
- [handoff] x1 recent, 1 total, since 2026-10-24: ene <code> and rls <code> timeout are both pre-existing on main / shared-contention - neither clears from content changes; needs a ci rerun after shared-supabas
  example: e2e `suggestion-moderation.spec.ts:75` and RLS `enrollment-restore.test.mjs` timeout are both pre-existing on main / shared-contention  -  neither clears from content changes; needs a CI rerun after s
  evidence: job:batch-20261023-1645-cifix2

Follow `.claude/skills/intel-distill/SKILL.md` exactly; read it and every file it references before starting.

## Scope
`specs/intelligence/daily/2026-10-25.md` only.

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
- (intel-2026-10-24-distill, intel_distill, agy) static/content-status.json is tracked and out of date on origin/main, causing check:content-status to fail in every fresh worktree.
- (intel-2026-10-24-distill, intel_distill, agy) Step 5 of translate-unit trips check:pipeline-gate because flipping translation_status to reviewed asserts that G4 and G5 tracker rows are already done.
- (intel-2026-10-24-distill, intel_distill, agy) Adopted gate I-0006 successfully protected glossary.json against duplicate term insertions during gsos-301-u03-author.
- (intel-2026-10-23-distill, intel_distill, opencode) F1 (data sum 503 not 513) touches topic-01, topic-02, all four fig-U14 SVGs plus dark variants, and the RRQ 1 key; fix them together and re-measure fig-U14-4.
- (intel-2026-10-23-distill, intel_distill, opencode) F3 (z vs t) may need an owner ruling if the course intends z only; until then items that supply z* stay answerable.

## Response snapshot

Distilled 21 growing signal clusters into 10 prioritized intelligence candidates in specs/intelligence/daily/2026-10-25.md covering tracked content-status cron merge stalls (tick.sh), premature Urdu figure generation before topic translation, translation holds on unaddressed English G3 defects, style-guide formative item range tension (G-2026-154), intake reading list URL resolution, intake bundle nested directory exclusions, pre-existing shared-state test flakes in batch CI jobs, prompt-only figure manifest gaps during G3 review, governance/environmental review limitation routing, and translate-unit skill reviewed-flip pipeline failures.

## Outcome

- Impact: intel_distill for INTEL Unit 0 by agy (attempt 1).
- Tests: npm run check:content passed (13 of 13 gates PASS); node --test tests/crew/intel.test.mjs passed (8 of 8 tests PASS).
- Files: specs/intelligence/daily/2026-10-25.md and this PHR.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: None recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Distilled 21 growing clusters into 10 prioritized intelligence candidates in specs/intelligence/daily/2026-10-25.md and recorded execution in this PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - tick.sh aborted for ~6h due to merge conflicts on tracked static/content-status.json in the control checkout; task M1 untracking and tick.sh checkout clean resolve this.
  - Figure jobs render .ur.svg files before Urdu topic MDX exists, requiring translators to wire them.
  - Batch CI fix jobs failed on pre-existing e2e suggestion-moderation duplicate row state and shared Supabase 30s RLS timeouts.
- Paperclip issues affected: none (Paperclip retired).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS (13/13 gates); tests/crew/intel.test.mjs PASS (8/8 tests).
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
