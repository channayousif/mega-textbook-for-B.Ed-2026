---
id: crew-intel-2026-11-03-distill
title: crew intel_distill INTEL unit 0
stage: misc
date: 2026-11-02
surface: agent
model: agy
feature: crew-intelligence
branch: crew/intel-2026-11-03-distill
user: crew
command: crew intel_distill
labels: ["crew", "agy", "intel_distill"]
links:
  spec: specs/intelligence/registry.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/intelligence/daily/2026-11-03.md
tests:
 - npm run check:content
---

## Prompt

# Crew job intel-2026-11-03-distill

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/intel-2026-11-03-distill`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, and never touch course content (`docs/`, `licence/`, the Urdu docs trees,
`specs/content/`, `static/img/figures/`, `glossary.json`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.

## Task
Distil today's reusable intelligence (intel-distill skill) into `specs/intelligence/daily/2026-11-03.md`. These clusters grew in the last 24 hours (kind, recent count, total, signature, an example, evidence):

- [log-error] x19 recent, 200 total, since 2026-10-17: ✗ <path> is stale - it no longer describes the working tree.
  example: ✗ static/content-status.json is stale - it no longer describes the working tree.
  evidence: log:efmp-302-u02-repair_en-conflict1.1.log, log:efmp-302-u02-repair_en-conflict4.1.log, log:efmp-302-u02-translate.1.log
- [log-error] x16 recent, 234 total, since 2026-10-17: n of n content gates failed: check:content-status.
  example: 1 of 13 content gates failed: check:content-status.
  evidence: log:efmp-301-u01-review_ur.2.log, log:efmp-302-u02-repair_en-conflict1.1.log, log:efmp-302-u02-repair_en-conflict4.1.log
- [failure] x13 recent, 47 total, since 2026-10-28: left out of the batch: <path> conflicts with main (<path>).; merge fix queued
  example: left out of the batch: crew/gnas-301-u04-review_en conflicts with main (specs/content/gnas-301/tasks.md).; merge fix queued
  evidence: job:gnas-301-u04-review_en, job:gnas-301-u05-review_en, job:gnas-301-u06-review_en
- [failure] x12 recent, 50 total, since 2026-10-17: ✗ pipeline gate failed with n finding(s):
  example: ✗ Pipeline gate failed with 1 finding(s):
  evidence: job:efmp-304-u01-translate, job:efmp-304-u02-translate, job:efmp-304-u04-translate
- [log-error] x7 recent, 76 total, since 2026-10-17: ✗ pipeline gate failed with n finding(s):
  example: ✗ Pipeline gate failed with 2 finding(s):
  evidence: log:efmp-302-u03-translate.1.log, log:efmp-302-u04-translate-r1.1.log, log:efmp-303-u01-translate-r1.1.log
- [review] x7 recent, 10 total, since 2026-10-28: headless review tooling constraint
  example: Headless review tooling constraint
  evidence: review:specs/content/gpks-402/reviews/unit-05/G3/21030998-7c55-4596-9cef-92787e7cb7aa.json, review:specs/content/gpks-402/reviews/unit-01/G3/b35aebba-1391-47ae-88ff-481fd326cd8b.json, review:specs/content/gpks-402/reviews/unit-03/G3/608a5388-1312-4060-ac88-c7d64ddc8c72.json
- [review] x6 recent, 6 total, since 2026-11-02: a-n (carried from run-n via run-n and cycle-n, re-verified)
  example: A-06 (carried from run-005 via run-007 and cycle-1, re-verified)
  evidence: review:specs/content/efmp-302/reviews/unit-03/G3/20261102T140729Z-g3-desk-0893bf77.json
- [review] x6 recent, 6 total, since 2026-11-02: carried and still open from run-n [n] through run-n
  example: CARRIED AND STILL OPEN from run-006 [11] through run-007
  evidence: review:specs/content/efmp-302/reviews/unit-04/G3/20261102T140729Z-g3-desk-0ad5d431.json
- [review] x6 recent, 6 total, since 2026-11-02: carried and still open from run-n
  example: CARRIED AND STILL OPEN from run-007
  evidence: review:specs/content/efmp-302/reviews/unit-04/G3/20261102T140729Z-g3-desk-0ad5d431.json
- [log-error] x5 recent, 40 total, since 2026-10-17: n of n content gates failed: check:pipeline-gate, check:content-status.
  example: 2 of 13 content gates failed: check:pipeline-gate, check:content-status.
  evidence: log:efmp-302-u04-translate-r1.1.log, log:efmp-303-u01-translate-r1.1.log, log:efmp-303-u02-translate.1.log
- [review] x5 recent, 5 total, since 2026-11-02: carried from run n and run n, still live
  example: Carried from run 002 and run 007, still live
  evidence: review:specs/content/efmp-302/reviews/unit-05/G3/20261102T140729Z-g3-desk-1fa7b86a.json
- [review] x5 recent, 5 total, since 2026-11-02: carried from run n, still live
  example: Carried from run 007, still live
  evidence: review:specs/content/efmp-302/reviews/unit-05/G3/20261102T140729Z-g3-desk-1fa7b86a.json
- [review] x4 recent, 5 total, since 2026-10-31: teaching case illustrations and hypothetical examples
  example: Teaching case illustrations and hypothetical examples
  evidence: review:specs/content/gpks-402/reviews/unit-03/G3/608a5388-1312-4060-ac88-c7d64ddc8c72.json, review:specs/content/efmp-406/reviews/unit-05/G3/4df544c3-c825-473c-8c69-940a86171cf5.json, review:specs/content/gpks-402/reviews/unit-03/G3/20261102T140729Z-g3-desk-85679ed3.json
- [handoff] x4 recent, 4 total, since 2026-11-02: course overview still says only unit n is available; update that line once units n and n merge.
  example: Course overview still says only Unit 1 is available; update that line once Units 2 and 3 merge.
  evidence: job:efmp-406-u02-author-conflict2, job:efmp-406-u02-author-conflict3, job:efmp-406-u02-author-conflict4
- [log-error] x3 recent, 16 total, since 2026-10-17: automatic merge failed; fix conflicts and then commit the result.
  example: Automatic merge failed; fix conflicts and then commit the result.
  evidence: log:geng-301-u00-salvage-conflict1.1.log, log:geng-301-u00-salvage-conflict2.1.log, log:gpks-402-u00-salvage-conflict3.1.log
- [log-error] x3 recent, 14 total, since 2026-10-17: error: pathspec '<path>' did not match any file(s) known to git
  example: error: pathspec 'static/content-status.json' did not match any file(s) known to git
  evidence: log:efmp-302-u02-repair_en-conflict2.2.log, log:efmp-304-u02-review_en-cifix2.1.log, log:geng-300-u01-repair_en-conflict1.1.log
- [review] x3 recent, 6 total, since 2026-10-28: host resource limits (agents.md and crew brief) prohibited running npm run build, background dev servers, and playwright
  example: Host resource limits (AGENTS.md and crew brief) prohibited running npm run build, background dev servers, and Playwright
  evidence: review:specs/content/gqur-300/reviews/unit-01/G3/agent-g3-gqur300-u1-run954d5f3b.json, review:specs/content/gnas-301/reviews/unit-03/G3/agent-g3-gnas301-u3-run7a60b18e.json, review:specs/content/efmp-305/reviews/unit-02/G3/agent-g3-efmp-305-u2-runfd523bce.json
- [handoff] x3 recent, 5 total, since 2026-10-28: unit n is ready for urdu translation (gn ur-translation) and subsequent independent urdu review (gn ur-review).
  example: Unit 4 is ready for Urdu translation (G4 ur-translation) and subsequent independent Urdu review (G5 ur-review).
  evidence: job:gpks-402-u04-review_en, job:gpks-402-u03-review_en, job:efmp-406-u01-review_en
- [review] x3 recent, 4 total, since 2026-10-21: narrow-viewport (npx) and an-print css inspection was not performed with a real browser
  example: Narrow-viewport (360px) and A4-print CSS inspection was not performed with a real browser
  evidence: review:specs/content/gqur-301/reviews/unit-01/G3/72bd253b-1d1d-4ae1-b165-24f04c3d5ce7.json, review:specs/content/geng-301/reviews/unit-04/G3/20261102T140729Z-g3-desk-5aeebfbe.json, review:specs/content/gqur-301/reviews/unit-01/G3/20261102T140729Z-g3-desk-5ac63c06.json
- [review] x3 recent, 3 total, since 2026-11-02: a-n (carried from run-n via cycle-n, re-verified in current bytes)
  example: A-02 (carried from run-007 via cycle-1, re-verified in current bytes)
  evidence: review:specs/content/efmp-302/reviews/unit-03/G3/20261102T140729Z-g3-desk-0893bf77.json
- [review] x3 recent, 3 total, since 2026-11-02: carried and still open, unchanged from run-n through run-n
  example: CARRIED AND STILL OPEN, unchanged from run-003 through run-007
  evidence: review:specs/content/efmp-302/reviews/unit-04/G3/20261102T140729Z-g3-desk-0ad5d431.json
- [log-error] x2 recent, 89 total, since 2026-10-17: ✗ <path> is missing. run: npm run build:content-status
  example: ✗ static/content-status.json is missing. Run: npm run build:content-status
  evidence: log:efmp-301-u01-review_ur.2.log, log:efmp-302-u06-translate-r1.1.log, log:efmp-302-u06-translate-r1.2.log
- [log-error] x2 recent, 38 total, since 2026-10-17: n of n content gates failed: check:pipeline-gate.
  example: 1 of 13 content gates failed: check:pipeline-gate.
  evidence: log:efmp-302-u03-translate.1.log, log:efmp-304-u01-translate.2.log, log:efmp-304-u02-translate.2.log
- [log-error] x2 recent, 37 total, since 2026-10-17: error: the user rejected permission to use this specific tool call.
  example: Error: The user rejected permission to use this specific tool call.
  evidence: log:efmp-301-u01-review_ur.1.log, log:efmp-302-u02-repair_en-conflict2.1.log, log:efmp-302-u02-repair_en-conflict2.2.log
- [review] x2 recent, 3 total, since 2026-10-28: global glossary entries
  example: Global glossary entries
  evidence: review:specs/content/gpks-402/reviews/unit-05/G3/21030998-7c55-4596-9cef-92787e7cb7aa.json, review:specs/content/gpks-402/reviews/unit-04/G3/20261102T140729Z-g3-desk-8621b0c7.json, review:specs/content/gpks-402/reviews/unit-05/G3/20261102T140729Z-g3-desk-e7015f81.json
- [review] x2 recent, 3 total, since 2026-10-28: un-bound excerpt keys in manifest tooling
  example: Un-bound excerpt keys in manifest tooling
  evidence: review:specs/content/gpks-402/reviews/unit-01/G3/b35aebba-1391-47ae-88ff-481fd326cd8b.json, review:specs/content/gnas-301/reviews/unit-05/G3/20261102T140729Z-g3-desk-6da9f991.json, review:specs/content/gpks-402/reviews/unit-01/G3/20261102T140729Z-g3-desk-b1f9d57a.json
- [handoff] x2 recent, 2 total, since 2026-11-02: status remains draft; independent gn, svg geometry and rendered urdu inspection remain pending because browser runs were prohibited.
  example: Status remains draft; independent G5, SVG geometry and rendered Urdu inspection remain pending because browser runs were prohibited.
  evidence: job:gpks-402-u04-translate
- [handoff] x2 recent, 2 total, since 2026-11-02: shared glossary additions are staged; catalog registration, urdu translation and independent reviews remain pending.
  example: Shared glossary additions are staged; catalog registration, Urdu translation and independent reviews remain pending.
  evidence: job:efmp-406-u04-author
- [handoff] x2 recent, 2 total, since 2026-11-02: browser geometry measurement remains pending because the brief prohibits playwright; non-browser renders were inspected.
  example: Browser geometry measurement remains pending because the brief prohibits Playwright; non-browser renders were inspected.
  evidence: job:efmp-406-u06-author
- [handoff] x2 recent, 2 total, since 2026-11-02: author repairs and fresh source, provenance, browser and print evidence are required; gn remains open and unsigned.
  example: Author repairs and fresh source, provenance, browser and print evidence are required; G3 remains open and unsigned.
  evidence: job:efmp-406-u03-review_en
- [handoff] x2 recent, 2 total, since 2026-11-02: author must repair <path> defects before gn resumes; <path> remain open.
  example: Author must repair English/source defects before G4 resumes; G3/G5 remain open.
  evidence: job:efmp-406-u03-translate
- [handoff] x2 recent, 2 total, since 2026-11-02: unit n's four figures still have no urdu <code> versions and their concept-graph urdu labels need gn review (they use جائزہ for "evaluation" while the terminolo
  example: Unit 5's four figures still have no Urdu `.ur.svg` versions and their concept-graph Urdu labels need G5 review (they use جائزہ for "evaluation" while the terminology bank reserves it inside "Summative
  evidence: job:efmp-406-u05-author-conflict4, job:efmp-406-u05-author-conflict5
- [handoff] x2 recent, 2 total, since 2026-11-02: <code> still says only unit n is available; it was outside this job's scope.
  example: `course-overview.mdx` still says only Unit 1 is available; it was outside this job's scope.
  evidence: job:efmp-406-u05-author-conflict4, job:efmp-406-u05-author-conflict5
- [handoff] x2 recent, 2 total, since 2026-11-02: <code> is also added on branch <code>; this branch's version keeps unit n unchanged and appends a unit n section.
  example: `specs/content/efmp-406/sources/texts/minott-2011-critical.md` is also added on branch `crew/efmp-406-u02-author`; this branch's version keeps Unit 2 unchanged and appends a Unit 5 section.
  evidence: job:efmp-406-u05-author-conflict4, job:efmp-406-u05-author-conflict5
- [handoff] x2 recent, 2 total, since 2026-11-02: unit n design files under <code> still bind to every unit's manifest (<code> names miss the unit-scoping regex); unit n's gn evidence was refreshed to absorb th
  example: Unit 2 design files under `specs/content/efmp-406/design/` still bind to every unit's manifest (`unit-02-*` names miss the unit-scoping regex); Unit 1's G2 evidence was refreshed to absorb them, so th
  evidence: job:efmp-406-u02-author-conflict4, job:efmp-406-u02-author-conflict5
- [handoff] x2 recent, 2 total, since 2026-11-02: independent <path> reviews, urdu translation and authorised browser geometry checks remain open.
  example: Independent G3/G5 reviews, Urdu translation and authorised browser geometry checks remain open.
  evidence: job:efmp-406-u06-author-conflict4
- [handoff] x2 recent, 2 total, since 2026-11-02: all n gn criteria pass, n assessment items independently solved, and all n svg variants pass geometry; report validated with advisory pass disposition.
  example: All 7 G3 criteria pass, 25 assessment items independently solved, and all 8 SVG variants pass geometry; report validated with advisory pass disposition.
  evidence: job:efmp-406-u05-review_en, job:efmp-406-u06-review_en
- [handoff] x2 recent, 2 total, since 2026-11-02: the gn tracker row in <path> is updated to open ▢ per adr-n; certification remains blocked pending trusted qualification.
  example: The G3 tracker row in specs/content/efmp-406/tasks.md is updated to open ▢ per ADR-0019; certification remains blocked pending trusted qualification.
  evidence: job:efmp-406-u05-review_en, job:efmp-406-u06-review_en
- [handoff] x2 recent, 2 total, since 2026-11-02: urdu rendering, svg geometry inspection and independent gn review remain pending.
  example: Urdu rendering, SVG geometry inspection and independent G5 review remain pending.
  evidence: job:efmp-406-u05-translate
- [handoff] x2 recent, 2 total, since 2026-11-02: separate translator must repair semantic defects; fresh review needs translator provenance, gn dependency and <path> render evidence.
  example: Separate translator must repair semantic defects; fresh review needs translator provenance, G3 dependency and normal/narrow/A4 render evidence.
  evidence: job:efmp-305-u04-review_ur

Follow `.claude/skills/intel-distill/SKILL.md` exactly; read it and every file it references before starting.

## Scope
`specs/intelligence/daily/2026-11-03.md` only.

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
- (intel-2026-11-02-distill, intel_distill, agy) Candidate C1 identifies that `LOG_ERROR` in `scripts/crew/intel.mjs` matches design rationale ("Rejected:"), grep output line prefixes, and serialized JSON keys, leaking noise into error clusters.
- (intel-2026-11-02-distill, intel_distill, agy) Candidate C2 notes that `mergeAppendOnly`'s greedy first-occurrence scan in `scripts/crew/batch.mjs` risks misaligning duplicate lines (like empty lines) in `tasks.md`.
- (intel-2026-11-02-distill, intel_distill, agy) Candidate C4 highlights that assigning registry edits strictly to D1 during maintenance caused parallel worker S1 to cite an unmerged registry row (`I-0017`).
- (intel-2026-11-01-distill, intel_distill, agy) Candidate C2 notes that crew briefs forbidding browsers lead translators to leave Urdu units in draft without running SVG geometry (`scripts/heavy.sh node scripts/measure-figure-text.mjs`); clarifying that headless SVG geometry checks are permitted will unblock G5 handoffs.
- (intel-2026-11-01-distill, intel_distill, agy) Candidate C3 notes that providing full unit assessments with answer keys forces reviewers to inspect stems and keys together; generating isolated stem bundles (`unit-assessment-stems.mdx`) will restore independent pre-key solving under ADR-0019.


## Response snapshot

Distilled 10 reusable intelligence candidates into specs/intelligence/daily/2026-11-03.md covering unit-scoping regex gaps, excerpt binding, batch exclusion loops, course scaffolding, and tool restrictions.

## Outcome

- Impact: intel_distill for INTEL Unit 0 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Distilled 10 reusable intelligence candidates into specs/intelligence/daily/2026-11-03.md covering unit-scoping regex gaps, excerpt binding, batch exclusion loops, course scaffolding, and tool restrictions.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Candidate C1 identifies that review-evidence.mjs inScope regex misses hyphenated design files (unit-02-*.md), causing them to bind across all units of a course.
  - Candidate C2 notes that citedKeysFor BibTeX-only regex excludes kebab-case primary source excerpts (author-year-topic.md) from unit review manifests.
  - Candidates C5 and C6 address batch exclusion loops on shared tasks.md trackers and missing course-overview scaffolds during parallel authoring.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
