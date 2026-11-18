---
id: crew-intel-2026-11-11-distill
title: crew intel_distill INTEL unit 0
stage: misc
date: 2026-11-10
surface: agent
model: agy
feature: crew-intelligence
branch: crew/intel-2026-11-11-distill
user: crew
command: crew intel_distill
labels: ["crew", "agy", "intel_distill"]
links:
  spec: specs/intelligence/registry.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/intelligence/daily/2026-11-11.md
tests:
 - npm run check:content
---

## Prompt

# Crew job intel-2026-11-11-distill

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/intel-2026-11-11-distill`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, and never touch course content (`docs/`, `licence/`, the Urdu docs trees,
`specs/content/`, `static/img/figures/`, `glossary.json`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.

## Task
Distil today's reusable intelligence (intel-distill skill) into `specs/intelligence/daily/2026-11-11.md`. These clusters grew in the last 24 hours (kind, recent count, total, signature, an example, evidence):

- [failure] x19 recent, 57 total, since 2026-10-19: the worker exited without committing any change
  example: the worker exited without committing any change
  evidence: job:gicp-400-u07-translate-r1, job:giss-401-u05-translate-r1, job:batch-20261110-1201-cifix1
- [failure] x14 recent, 146 total, since 2026-10-28: left out of the batch: <path> conflicts with main (<path>).; merge fix queued
  example: left out of the batch: crew/gnas-301-u04-review_en conflicts with main (specs/content/gnas-301/tasks.md).; merge fix queued
  evidence: job:efpg-401-u05-author, job:efpg-401-u06-author, job:efpg-401-u07-author
- [log-error] x14 recent, 60 total, since 2026-10-17: error: the user rejected permission to use this specific tool call.
  example: Error: The user rejected permission to use this specific tool call.
  evidence: log:efpg-401-u07-author-conflict1.1.log, log:gicp-400-u07-translate-r1.1.log, log:gicp-400-u07-translate-r1.2.log
- [log-error] x4 recent, 102 total, since 2026-10-17: ✗ pipeline gate failed with n finding(s):
  example: ✗ Pipeline gate failed with 2 finding(s):
  evidence: log:gpks-402-u02-repair_en-r1.1.log, log:efpg-401-u02-author.1.log, log:efpg-401-u05-author.1.log
- [log-error] x4 recent, 55 total, since 2026-10-17: n of n content gates failed: check:pipeline-gate.
  example: 1 of 13 content gates failed: check:pipeline-gate.
  evidence: log:gpks-402-u02-repair_en-r1.1.log, log:efpg-401-u02-author.1.log, log:efpg-401-u05-author.1.log
- [log-error] x3 recent, 321 total, since 2026-10-17: n of n content gates failed: check:content-status.
  example: 1 of 13 content gates failed: check:content-status.
  evidence: log:efmp-301-u09-repair_en-r1.1.log, log:gqur-300-u04-repair_en-r1.2.log, log:gqur-301-u08-repair_en-r1.1.log
- [log-error] x3 recent, 291 total, since 2026-10-17: ✗ <path> is stale - it no longer describes the working tree.
  example: ✗ static/content-status.json is stale - it no longer describes the working tree.
  evidence: log:efmp-301-u09-repair_en-r1.1.log, log:gqur-300-u04-repair_en-r1.2.log, log:gqur-301-u08-repair_en-r1.1.log
- [failure] x2 recent, 47 total, since 2026-10-19: worker exited n:
  example: worker exited 1:
  evidence: job:gqur-301-u15-author, job:gicp-400-u07-illustrate, job:efpg-401-u05-author-conflict1
- [log-error] x2 recent, 7 total, since 2026-10-22: ✗ read <path> failed
  example: ✗ Read scripts/check-content-status.mjs failed
  evidence: log:geng-301-u03-fix.1.log, log:efmp-304-u00-fix.1.log, log:efmp-304-u00-fix.2.log
- [log-error] x2 recent, 3 total, since 2026-11-05: ✗ cat <path> failed
  example: ✗ cat /home/a2ahs/mega_book_for_B.Ed/.git/config failed
  evidence: log:gqur-301-u06-repair_en-conflict1.1.log, log:efpg-401-u04-author-conflict3.1.log, log:efpg-401-u07-author-conflict1.1.log
- [handoff] x2 recent, 2 total, since 2026-11-09: unit n gn remains open and unticked pending owner authorisation for a subsequent review cycle under adr-n.
  example: Unit 11 G3 remains open and unticked pending owner authorisation for a subsequent review cycle under ADR-0019.
  evidence: job:efmp-301-u11-repair_en-r1, job:efmp-301-u12-repair_en-r1
- [handoff] x2 recent, 2 total, since 2026-11-09: narrow npx and an print render inspection remains undone; it needs a host allowed to build and run a browser.
  example: Narrow 360px and A4 print render inspection remains undone; it needs a host allowed to build and run a browser.
  evidence: job:efmp-303-u01-repair_en-r1, job:efmp-303-u05-repair_en-r1
- [handoff] x2 recent, 2 total, since 2026-11-10: no urdu mirror exists for unit n; gn must reconcile the sdg n category guidance and wire the banner figure from <code>.
  example: No Urdu mirror exists for Unit 3; G4 must reconcile the SDG 5 category guidance and wire the banner figure from `specs/content/efmp-407/figures/unit-03.illustration-notes.md`.
  evidence: job:efmp-407-u03-repair_en, job:efmp-407-u03-repair_en-conflict2
- [handoff] x2 recent, 2 total, since 2026-11-10: the glacier-grafting paragraph is framed at the level munir et al. (n)'s abstract supports; a fresh reviewer should check the full text for the ice-combination 
  example: The glacier-grafting paragraph is framed at the level Munir et al. (2021)'s abstract supports; a fresh reviewer should check the full text for the ice-combination mechanics.
  evidence: job:efmp-407-u05-repair_en, job:efmp-407-u05-repair_en-r1
- [handoff] x2 recent, 2 total, since 2026-11-10: <path> stay open and unsigned; a fresh independent review bundle is required after these repairs.
  example: G3/G5 stay open and unsigned; a fresh independent review bundle is required after these repairs.
  evidence: job:efmp-407-u05-repair_en, job:efmp-407-u05-repair_en-r1
- [handoff] x2 recent, 2 total, since 2026-11-10: the ideology strand remains pending an owner ruling before translation (gn) or final certification.
  example: The ideology strand remains pending an owner ruling before translation (G4) or final certification.
  evidence: job:gicp-400-u07-repair_en, job:gicp-400-u07-illustrate
- [handoff] x2 recent, 2 total, since 2026-11-10: fn (<path> rendering) and fn (host provenance) remain unverified under the crew prohibition; a fresh independent gn run should verify the repairs.
  example: F3 (narrow-screen/print rendering) and F4 (host provenance) remain unverified under the crew prohibition; a fresh independent G3 run should verify the repairs.
  evidence: job:efmp-407-u03-repair_en-conflict1, job:efmp-407-u03-repair_en-conflict2
- [log-error] x2 recent, 2 total, since 2026-11-10: ✗ free -m; echo "---"; cat <path> n><path>; echo "---"; cat <path> n><path> failed
  example: ✗ free -m; echo "---"; cat /proc/pressure/memory 2>/dev/null; echo "---"; cat /proc/pressure/io 2>/dev/null failed
  evidence: log:geng-301-u03-repair_en-r1.1.log, log:gqur-300-u06-repair_en-r1.2.log
- [phr] x2 recent, 2 total, since 2026-11-10: failure modes observed: stale review reports can describe a pre-repair state; always diff the report input manifest against current bytes.
  example: failure modes observed: stale review reports can describe a pre-repair state; always diff the report input manifest against current bytes.
  evidence: phr:history/prompts/general/556-repair-geng301-unit-five-g3.general.prompt.md, phr:history/prompts/general/555-repair-efmp301-unit-five-g3.general.prompt.md
- [handoff] x2 recent, 2 total, since 2026-11-10: <code> reports two cosmetic wordmark collisions (fig-un-n, fig-un-n) that exit n.
  example: `measure-figure-text` reports two cosmetic wordmark collisions (fig-U6-8, fig-U6-9) that exit 0.
  evidence: job:efpg-401-u06-author, job:efpg-401-u06-author-conflict1
- [handoff] x2 recent, 2 total, since 2026-11-10: gn urdu mirror still needs <code> variants and ur <code> wiring; gn review remains open.
  example: G4 Urdu mirror still needs `.ur.svg` variants and UR `<Figure>` wiring; G3 review remains open.
  evidence: job:efpg-401-u04-author-conflict1, job:efpg-401-u04-author-conflict2
- [handoff] x2 recent, 2 total, since 2026-11-10: unit n en is authored with n placed figures; no urdu mirror exists, so gn translation and independent <path> reviews are the open next steps.
  example: Unit 5 EN is authored with 14 placed figures; no Urdu mirror exists, so G4 translation and independent G3/G5 reviews are the open next steps.
  evidence: job:efpg-401-u05-author-conflict2, job:efpg-401-u05-author-conflict3
- [log-error] x2 recent, 2 total, since 2026-11-10: error: our servers are experiencing high traffic right now, please try again in a minute. (unavailable (code n): no capacity available for model gemini-n.n-flas
  example: error: Our servers are experiencing high traffic right now, please try again in a minute. (UNAVAILABLE (code 503): No capacity available for model gemini-3.8-flash-high on the server)
  evidence: log:efpg-401-u05-author-conflict1.1.log, log:gicp-400-u07-illustrate.1.log
- [log-error] x2 recent, 2 total, since 2026-11-10: agy_error: {"short_error":"unavailable (code n): no capacity available for model gemini-n.n-flash-high on the server","status":"unavailable","error_code":n,"cod
  example: AGY_ERROR: {"short_error":"UNAVAILABLE (code 503): No capacity available for model gemini-3.8-flash-high on the server","status":"UNAVAILABLE","error_code":503,"code_kind":"http","retryable":true,"err
  evidence: log:efpg-401-u05-author-conflict1.1.log, log:gicp-400-u07-illustrate.1.log
- [log-error] x1 recent, 25 total, since 2026-10-17: fatal: path '<path>' exists on disk, but not in '<path>'
  example: fatal: path 'static/content-status.json' exists on disk, but not in 'origin/main'
  evidence: log:gqur-301-u00-salvage-conflict1.1.log, log:gnas-301-u03-repair_en-conflict2.1.log, log:efpg-401-u06-author-conflict1.1.log
- [log-error] x1 recent, 18 total, since 2026-10-17: automatic merge failed; fix conflicts and then commit the result.
  example: Automatic merge failed; fix conflicts and then commit the result.
  evidence: log:gqur-301-u00-salvage-conflict2.1.log, log:gnas-301-u03-repair_en-conflict3.1.log, log:efpg-401-u04-author-conflict3.1.log
- [log-error] x1 recent, 9 total, since 2026-10-18: ✗ edit <path> failed
  example: ✗ Edit i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-03/topic-02.mdx failed
  evidence: log:gqur-301-u13-author.1.log, log:gnas-301-u05-fix.1.log, log:efmp-301-u08-repair_en-r1.1.log
- [log-error] x1 recent, 7 total, since 2026-10-18: error: could not find oldstring in the file. it must match exactly, including whitespace, indentation, and line endings.
  example: Error: Could not find oldString in the file. It must match exactly, including whitespace, indentation, and line endings.
  evidence: log:gqur-301-u08-author-conflict2.1.log, log:gqur-301-u13-author-conflict2.1.log, log:efmp-301-u08-repair_en-r1.1.log
- [handoff] x1 recent, 4 total, since 2026-11-03: fn <path> and a fresh independent gn with mcq re-solve remain <path> work; gn stays unticked.
  example: F1 provenance/rendering and a fresh independent G3 with MCQ re-solve remain owner/host work; G3 stays unticked.
  evidence: job:efmp-305-u05-repair_en-conflict2, job:efmp-305-u05-repair_en-conflict3, job:efmp-305-u05-repair_en-r1
- [handoff] x1 recent, 4 total, since 2026-11-07: both english and urdu unit locales remain translation_status: draft with gn, gn, and gn open pending independent review and qualification.
  example: Both English and Urdu unit locales remain translation_status: draft with G3, G4, and G5 open pending independent review and qualification.
  evidence: job:gicp-400-u05-illustrate, job:gicp-400-u06-illustrate, job:gicp-400-u07-illustrate
- [failure] x1 recent, 3 total, since 2026-10-28: left out of the batch: <path> conflicts with main (glossary.json, <path>).; merge fix queued
  example: left out of the batch: crew/gpks-402-u06-author conflicts with main (glossary.json, specs/content/gpks-402/tasks.md).; merge fix queued
  evidence: job:gpks-402-u06-author, job:efpg-401-u07-author
- [handoff] x1 recent, 3 total, since 2026-11-05: content-spec.md's introductory "status is draft" paragraph still conflicts with its approved frontmatter; it is an approved spec, so it is an owner edit outside
  example: content-spec.md's introductory "Status is draft" paragraph still conflicts with its approved frontmatter; it is an approved spec, so it is an owner edit outside this job's scope.
  evidence: job:gsos-301-u04-repair_en, job:gsos-301-u04-repair_en-conflict1, job:gsos-301-u04-repair_en-r1
- [handoff] x1 recent, 3 total, since 2026-11-05: no urdu mirror exists for unit n, so gn stays blocked until a fresh independent gn confirms these repairs.
  example: No Urdu mirror exists for Unit 4, so G4 stays blocked until a fresh independent G3 confirms these repairs.
  evidence: job:gsos-301-u04-repair_en, job:gsos-301-u04-repair_en-conflict1, job:gsos-301-u04-repair_en-r1
- [log-error] x1 recent, 3 total, since 2026-11-06: ci failed on pr #n (checks: figure-geometry). run <code> and <code> to read the failure, fix it on this branch with the smallest change, and make <code> pass. a
  example: CI failed on PR #449 (checks: figure-geometry). Run `gh pr checks 449` and `gh run view --log-failed` to read the failure, fix it on this branch with the smallest change, and make `npm run check:conte
  evidence: log:batch-20261106-1031-cifix1.1.log, log:batch-20261107-1545-cifix1.1.log, log:batch-20261110-1201-cifix1.2.log
- [handoff] x1 recent, 2 total, since 2026-11-03: existing gn urdu mirror (n files, n figures) remains verified and intact with translation_status set to draft pending independent gn review.
  example: Existing G4 Urdu mirror (6 files, 6 figures) remains verified and intact with translation_status set to draft pending independent G5 review.
  evidence: job:efmp-303-u02-repair_en, job:efmp-303-u02-repair_en-r1
- [handoff] x1 recent, 2 total, since 2026-11-03: urdu pages remain uninspected on playwright chromium, narrow width (npx), and an print per crew host constraints; the gn review must verify these.
  example: Urdu pages remain uninspected on Playwright Chromium, narrow width (360px), and A4 print per crew host constraints; the G5 review must verify these.
  evidence: job:efmp-406-u01-repair_en, job:efmp-406-u01-repair_en-r1
- [handoff] x1 recent, 2 total, since 2026-11-03: proposed urdu terms in <path> and <path> entry for <course> remain pending owner rulings.
  example: Proposed Urdu terms in specs/content/efmp-406/translations/unit-01/handoff.md and catalog/courses.json entry for EFMP-406 remain pending owner rulings.
  evidence: job:efmp-406-u01-repair_en, job:efmp-406-u01-repair_en-r1
- [log-error] x1 recent, 2 total, since 2026-11-03: ✗ depth gate failed with n finding(s):
  example: ✗ Depth gate failed with 4 finding(s):
  evidence: log:geng-301-u01-repair_en-r1.1.log, log:efpg-401-u02-author.1.log
- [handoff] x1 recent, 2 total, since 2026-11-05: the urdu translation job still needs <code> variants of fig-un-n to fig-un-n (n new urdu concept labels pending gn review).
  example: The Urdu translation job still needs `.ur.svg` variants of fig-U5-1 to fig-U5-4 (14 new Urdu concept labels pending G5 review).
  evidence: job:gsos-301-u05-repair_en-conflict1, job:gsos-301-u05-repair_en-r1
- [phr] x1 recent, 2 total, since 2026-11-05: next experiment (smallest change to try): fresh independent reviewer checks the committed repair without author reasoning.
  example: next experiment (smallest change to try): Fresh independent reviewer checks the committed repair without author reasoning.
  evidence: phr:history/prompts/general/20261122-geng-301-unit-03-g3-repairs.general.prompt.md, phr:history/prompts/general/20261110-efmp-407-u03-repair-en.general.prompt.md

Follow `.claude/skills/intel-distill/SKILL.md` exactly; read it and every file it references before starting.

## Scope
`specs/intelligence/daily/2026-11-11.md` only.

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
- (intel-2026-11-10-distill, intel_distill, agy) Nested review bundles under reviews/unit-NN/G3/<folder>/ continue causing premature repeat reviews that escalate on unchanged inputs (C1).
- (intel-2026-11-10-distill, intel_distill, agy) Human desk reviews with unnumbered rubric prefixes collapse distinct findings into single-word signatures, requiring expanded label stripping in FINDING_LABEL (C2).
- (intel-2026-11-10-distill, intel_distill, agy) Merging PR #500 (decision C-019) will permanently throttle blocked owner-sync logging if the owner checkout returns to main with local modifications (C6).
- (intel-2026-11-09-distill, intel_distill, agy) Nested review bundles under `reviews/unit-NN/G3/<folder>/` continue causing premature repeat reviews that escalate on unchanged inputs (C1).
- (intel-2026-11-09-distill, intel_distill, agy) The owner checkout at `~/mega_book_for_B.Ed` moved to `fix/purge-test-accounts`, ending the 136-signal/day blocked loop; PR #500 awaits owner decision C-019 (C2).


## Response snapshot

10 candidates; external_directory permission rejections aborting workers, course tracker batch conflicts, unhandled Gemini 503 capacity errors, and G2 pipeline gate gaps.

## Outcome

- Impact: intel_distill for INTEL Unit 0 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: 10 candidates; external_directory permission rejections aborting workers, course tracker batch conflicts, unhandled Gemini 503 capacity errors, and G2 pipeline gate gaps.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - C1 documents 19 empty worker exits caused by opencode auto-rejecting external_directory access when attempting to read /proc/pressure/* or follow .git worktree pointer files; explicit brief guidance is needed.
  - C3 identifies unhandled Gemini HTTP 503 capacity errors in QUOTA_RE that burned job attempts instead of triggering worker cooldown.
  - C2 highlights 14 batch exclusions from course tasks.md conflicts, supporting adoption of proposed I-0021 (PR #498).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
