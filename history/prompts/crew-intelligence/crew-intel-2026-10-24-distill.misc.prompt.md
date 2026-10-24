---
id: crew-intel-2026-10-24-distill
title: crew intel_distill INTEL unit 0
stage: misc
date: 2026-10-24
surface: agent
model: agy
feature: crew-intelligence
branch: crew/intel-2026-10-24-distill
user: crew
command: crew intel_distill
labels: ["crew", "agy", "intel_distill"]
links:
  spec: specs/intelligence/registry.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/intelligence/daily/2026-10-24.md
tests:
 - npm run check:content
---

## Prompt

# Crew job intel-2026-10-24-distill

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/intel-2026-10-24-distill`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, and never touch course content (`docs/`, `licence/`, the Urdu docs trees,
`specs/content/`, `static/img/figures/`, `glossary.json`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.

## Task
Distil today's reusable intelligence (intel-distill skill) into `specs/intelligence/daily/2026-10-24.md`. These clusters grew in the last 24 hours (kind, recent count, total, signature, an example, evidence):

- [log-error] x25 recent, 103 total, since 2026-10-17: ✗ <path> is stale - it no longer describes the working tree.
  example: ✗ static/content-status.json is stale - it no longer describes the working tree.
  evidence: log:efmp-302-u02-repair_en-conflict1.1.log, log:efmp-302-u02-repair_en-conflict4.1.log, log:efmp-302-u02-translate.1.log
- [log-error] x23 recent, 142 total, since 2026-10-17: n of n content gates failed: check:content-status.
  example: 1 of 13 content gates failed: check:content-status.
  evidence: log:efmp-301-u01-review_ur.2.log, log:efmp-302-u02-repair_en-conflict1.1.log, log:efmp-302-u02-repair_en-conflict4.1.log
- [failure] x9 recent, 32 total, since 2026-10-17: ✗ pipeline gate failed with n finding(s):
  example: ✗ Pipeline gate failed with 1 finding(s):
  evidence: job:efmp-304-u01-translate, job:efmp-304-u02-translate, job:efmp-304-u04-translate
- [log-error] x6 recent, 46 total, since 2026-10-17: ✗ pipeline gate failed with n finding(s):
  example: ✗ Pipeline gate failed with 2 finding(s):
  evidence: log:efmp-302-u03-translate.1.log, log:efmp-302-u04-translate-r1.1.log, log:efmp-303-u01-translate-r1.1.log
- [failure] x6 recent, 22 total, since 2026-10-19: left out of the batch: <path> conflicts with main (it could not join the hourly batch).; merge fix queued
  example: left out of the batch: crew/gnas-301-u03-repair_en conflicts with main (it could not join the hourly batch).; merge fix queued
  evidence: job:gnas-301-u03-repair_en, job:gnas-301-u05-repair_en, job:geng-301-u05-review_en
- [log-error] x5 recent, 30 total, since 2026-10-17: error: the user rejected permission to use this specific tool call.
  example: Error: The user rejected permission to use this specific tool call.
  evidence: log:efmp-301-u01-review_ur.1.log, log:efmp-302-u02-repair_en-conflict2.1.log, log:efmp-302-u02-repair_en-conflict2.2.log
- [log-error] x5 recent, 16 total, since 2026-10-17: n of n content gates failed: check:pipeline-gate.
  example: 1 of 13 content gates failed: check:pipeline-gate.
  evidence: log:efmp-302-u03-translate.1.log, log:efmp-304-u01-translate.2.log, log:efmp-304-u02-translate.2.log
- [failure] x5 recent, 5 total, since 2026-10-22: the shared registries are append-only: keep every entry main has exactly as it is, add this branch's entries after them, give a new entry whose id main already 
  example: The shared registries are append-only: keep every entry main has exactly as it is, add this branch's entries after them, give a new entry whose ID main already uses the next free ID (and update its re
  evidence: job:gsos-301-u03-author
- [log-error] x3 recent, 11 total, since 2026-10-17: automatic merge failed; fix conflicts and then commit the result.
  example: Automatic merge failed; fix conflicts and then commit the result.
  evidence: log:geng-301-u00-salvage-conflict1.1.log, log:geng-301-u00-salvage-conflict2.1.log, log:gpks-402-u00-salvage-conflict3.1.log
- [log-error] x2 recent, 27 total, since 2026-10-17: n of n content gates failed: check:pipeline-gate, check:content-status.
  example: 2 of 13 content gates failed: check:pipeline-gate, check:content-status.
  evidence: log:efmp-302-u04-translate-r1.1.log, log:efmp-303-u01-translate-r1.1.log, log:efmp-303-u02-translate.1.log
- [failure] x2 recent, 22 total, since 2026-10-19: the worker exited without committing any change
  example: the worker exited without committing any change
  evidence: job:gict-300-u01-translate-r1, job:efmp-304-u04-translate-r1, job:efmp-303-u02-translate
- [log-error] x2 recent, 3 total, since 2026-10-22: error: file not found: <path>
  example: Error: File not found: /home/a2ahs/crew-wt/gqur-301-u16-review_en-r1/scripts/lib/review-evidence.md
  evidence: log:gqur-301-u16-review_en-r1.1.log, log:gsos-301-u03-author-conflict3.2.log, log:gsos-301-u03-author.1.log
- [handoff] x2 recent, 2 total, since 2026-10-22: fn (data sum n not n) touches topic-n, topic-n, all four fig-un svgs plus dark variants, and the rrq n key; fix them together and re-measure fig-un-n.
  example: F1 (data sum 503 not 513) touches topic-01, topic-02, all four fig-U14 SVGs plus dark variants, and the RRQ 1 key; fix them together and re-measure fig-U14-4.
  evidence: job:gqur-301-u14-review_en, job:intel-2026-10-23-distill
- [handoff] x2 recent, 2 total, since 2026-10-22: fn (z vs t) may need an owner ruling if the course intends z only; until then items that supply z* stay answerable.
  example: F3 (z vs t) may need an owner ruling if the course intends z only; until then items that supply z* stay answerable.
  evidence: job:gqur-301-u14-review_en, job:intel-2026-10-23-distill
- [handoff] x2 recent, 2 total, since 2026-10-22: <path> is tracked and out of date on <path>; check:content-status fails there too.
  example: static/content-status.json is tracked and out of date on origin/main; check:content-status fails there too.
  evidence: job:gqur-301-u14-review_en, job:intel-2026-10-23-distill
- [log-error] x2 recent, 2 total, since 2026-10-22: ✗ read <path> failed
  example: ✗ Read scripts/check-content-status.mjs failed
  evidence: log:gsos-301-u03-author-conflict3.2.log, log:gsos-301-u03-author.1.log
- [handoff] x2 recent, 2 total, since 2026-10-23: urdu assets await placement when unit n’s missing urdu topics are translated.
  example: Urdu assets await placement when Unit 13’s missing Urdu topics are translated.
  evidence: job:gqur-301-u13-figures
- [handoff] x2 recent, 2 total, since 2026-10-23: separate author must resolve missing figures, rrqn contradiction, <path> claims and assessment demand; fresh review needs provenance, sources and render evidenc
  example: Separate author must resolve missing figures, RRQ8 contradiction, slope/inference claims and assessment demand; fresh review needs provenance, sources and render evidence.
  evidence: job:gqur-301-u13-review_en
- [handoff] x2 recent, 2 total, since 2026-10-23: separate english author must resolve gn fn-fn before translation resumes.
  example: Separate English author must resolve G3 F1-F5 before translation resumes.
  evidence: job:gqur-301-u13-translate
- [handoff] x2 recent, 2 total, since 2026-10-23: repair role terminology, missing figures, assessments and source mappings; fresh review needs author provenance and <path> evidence.
  example: Repair role terminology, missing figures, assessments and source mappings; fresh review needs author provenance and browser/print evidence.
  evidence: job:gsos-301-u03-review_en
- [log-error] x1 recent, 74 total, since 2026-10-17: ✗ <path> is missing. run: npm run build:content-status
  example: ✗ static/content-status.json is missing. Run: npm run build:content-status
  evidence: log:efmp-301-u01-review_ur.2.log, log:efmp-302-u06-translate-r1.1.log, log:efmp-302-u06-translate-r1.2.log
- [log-error] x1 recent, 11 total, since 2026-10-18: ✗ figure gate failed with n finding(s):
  example: ✗ Figure gate failed with 6 finding(s):
  evidence: log:efmp-303-u03-translate.1.log, log:efmp-305-u01-translate.1.log, log:gsos-301-u01-translate.1.log
- [log-error] x1 recent, 8 total, since 2026-10-17: review evidence rejected: stale or incomplete input manifest
  example: Review evidence rejected: stale or incomplete input manifest
  evidence: log:efmp-301-u01-review_ur.2.log, log:efmp-303-u04-review_en.2.log, log:efmp-304-u03-review_en.1.log
- [log-error] x1 recent, 6 total, since 2026-10-19: n of n content gates failed: check:pipeline-gate, check:figures, check:content-status.
  example: 3 of 13 content gates failed: check:pipeline-gate, check:figures, check:content-status.
  evidence: log:efmp-303-u03-translate.1.log, log:gqur-301-u09-translate.1.log, log:gsos-301-u04-author.2.log
- [log-error] x1 recent, 5 total, since 2026-10-18: error: could not find oldstring in the file. it must match exactly, including whitespace, indentation, and line endings.
  example: Error: Could not find oldString in the file. It must match exactly, including whitespace, indentation, and line endings.
  evidence: log:efmp-305-u03-translate.1.log, log:gict-300-u05-translate-r1.1.log, log:gqur-301-u05-translate.3.log
- [log-error] x1 recent, 3 total, since 2026-10-17: ✗ read <path> failed [limit=n]
  example: ✗ Read /tmp/review-efmp303-u04/manifest.json failed [limit=10]
  evidence: log:efmp-303-u04-review_en.1.log, log:efmp-304-u02-review_en-cifix1.1.log, log:gsos-301-u03-author-conflict3.2.log
- [failure] x1 recent, 2 total, since 2026-10-19: could not join a batch after n merge fixes
  example: could not join a batch after 5 merge fixes
  evidence: job:efmp-305-u01-repair_en, job:gsos-301-u06-author
- [log-error] x1 recent, 2 total, since 2026-10-17: error: your local changes to the following files would be overwritten by merge:
  example: error: Your local changes to the following files would be overwritten by merge:
  evidence: log:geng-301-u00-salvage-conflict1.1.log, log:gsos-301-u06-author-conflict4.1.log
- [log-error] x1 recent, 2 total, since 2026-10-17: merge with strategy ort failed.
  example: Merge with strategy ort failed.
  evidence: log:geng-301-u00-salvage-conflict1.1.log, log:gsos-301-u06-author-conflict4.1.log
- [log-error] x1 recent, 2 total, since 2026-10-19: rejected because the owner wants a stable capability boundary and codex already proved the built-in
  example: Rejected because the owner wants a stable capability boundary and Codex already proved the built-in
  evidence: log:gnas-301-u06-repair_en-conflict1.1.log, log:gqur-301-u11-translate-conflict2.1.log
- [review] x1 recent, 2 total, since 2026-10-19: render inspection (visual accessibility
  example: Render inspection (visual accessibility
  evidence: review:specs/content/efmp-304/reviews/unit-03/G3/crew-efmp-304-u03-g3-r65d2428e.json, review:specs/content/gsos-301/reviews/unit-05/G3/crew-gsos-301-u05-g3-r9f2a1b0c.json
- [log-error] x1 recent, 2 total, since 2026-10-21: ✗ edit glossary.json failed
  example: ✗ Edit glossary.json failed
  evidence: log:gqur-301-u08-author-conflict2.1.log, log:gqur-301-u13-author-conflict2.1.log
- [log-error] x1 recent, 2 total, since 2026-10-21: error: no changes to apply: oldstring and newstring are identical.
  example: Error: No changes to apply: oldString and newString are identical.
  evidence: log:gqur-301-u13-author.1.log, log:gqur-301-u13-author-conflict2.1.log
- [handoff] x1 recent, 1 total, since 2026-10-22: the unit's figures are still prompt-only markers; there is no <code> yet.
  example: The unit's figures are still prompt-only markers; there is no `static/img/figures/gqur-301/unit-13/` yet.
  evidence: job:gqur-301-u13-author
- [handoff] x1 recent, 1 total, since 2026-10-22: <code> was not run, so check the escaped <code> table cells render correctly in <code> and <code>.
  example: `npm run build` was not run, so check the escaped `\|r\|` table cells render correctly in `topic-01.mdx` and `unit-assessment.mdx`.
  evidence: job:gqur-301-u13-author
- [handoff] x1 recent, 1 total, since 2026-10-22: the english draft (index, <path>, unit-assessment, teacher-notes) and governance files (coverage, sources, figures, concepts) were authored in commit <sha> and 
  example: The English draft (index, topic-01/02/03, unit-assessment, teacher-notes) and governance files (coverage, sources, figures, concepts) were authored in commit e9cb5127 and are unchanged. Next job on th
  evidence: job:gqur-301-u15-author
- [handoff] x1 recent, 1 total, since 2026-10-22: unit n english content (index, n topics, assessment, teacher notes) + governance artifacts (coverage, sources, figures, concepts) are authored and gn-gated from
  example: Unit 3 English content (index, 2 topics, assessment, teacher notes) + governance artifacts (coverage, sources, figures, concepts) are authored and G2-gated from the previous attempt; next stage is G3 
  evidence: job:gsos-301-u03-author
- [handoff] x1 recent, 1 total, since 2026-10-22: figure manifest has n prompt-only rows (fig-un-n diagram, fig-un-n table, fig-un-n flowchart, fig-un-n table); figures are not yet rendered - that is a downstre
  example: Figure manifest has 4 prompt-only rows (fig-U3-1 diagram, fig-U3-2 table, fig-U3-3 flowchart, fig-U3-4 table); figures are not yet rendered - that is a downstream generate-figures job.
  evidence: job:gsos-301-u03-author
- [handoff] x1 recent, 1 total, since 2026-10-22: three pakistani facts are not tied to a source and are marked <code> for the gn reviewer to check: the lady health worker programme starting in n, the spread of
  example: Three Pakistani facts are not tied to a source and are marked `no-external-source` for the G3 reviewer to check: the Lady Health Worker programme starting in 1994, the spread of low-fee private school
  evidence: job:gsos-301-u05-author
- [handoff] x1 recent, 1 total, since 2026-10-22: the urdu translation job needs to make <code> versions of fig-un-n to fig-un-n. all n urdu concept labels are newly authored (none are in <code>) and need gn re
  example: The Urdu translation job needs to make `.ur.svg` versions of fig-U5-1 to fig-U5-4. All 14 Urdu concept labels are newly authored (none are in `terminology.csv`) and need G5 review.
  evidence: job:gsos-301-u05-author

Follow `.claude/skills/intel-distill/SKILL.md` exactly; read it and every file it references before starting.

## Scope
`specs/intelligence/daily/2026-10-24.md` only.

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
- (intel-2026-10-23-distill, intel_distill, opencode) F1 (data sum 503 not 513) touches topic-01, topic-02, all four fig-U14 SVGs plus dark variants, and the RRQ 1 key; fix them together and re-measure fig-U14-4.
- (intel-2026-10-23-distill, intel_distill, opencode) F3 (z vs t) may need an owner ruling if the course intends z only; until then items that supply z* stay answerable.
- (intel-2026-10-23-distill, intel_distill, opencode) static/content-status.json is tracked and out of date on origin/main; check:content-status fails there too.
- (intel-2026-10-21-distill, intel_distill, agy) Batch merge conflicts on course trackers (`tasks.md`) grew to 11 recent failures (14 total); needs dispatcher serialization or batch auto-rebase.
- (intel-2026-10-21-distill, intel_distill, agy) Units exhausting ADR-0019 two-cycle review limits (e.g. GNAS-301 Unit 4 / G-2026-31) repeatedly loop on repair jobs; planner needs owner-escalation detection.


## Response snapshot

Distilled 38 growing clusters into 9 actionable intelligence candidates in specs/intelligence/daily/2026-10-24.md covering tracked stale content-status, translation skill flip pipeline failures, cascading merge fixes, /tmp access rejections, and review escalation behavior.

## Outcome

- Impact: intel_distill for INTEL Unit 0 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Distilled 38 growing clusters into 9 actionable intelligence candidates in specs/intelligence/daily/2026-10-24.md covering tracked stale content-status, translation skill flip pipeline failures, cascading merge fixes, /tmp access rejections, and review escalation behavior.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - static/content-status.json is tracked and out of date on origin/main, causing check:content-status to fail in every fresh worktree.
  - Step 5 of translate-unit trips check:pipeline-gate because flipping translation_status to reviewed asserts that G4 and G5 tracker rows are already done.
  - Adopted gate I-0006 successfully protected glossary.json against duplicate term insertions during gsos-301-u03-author.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
