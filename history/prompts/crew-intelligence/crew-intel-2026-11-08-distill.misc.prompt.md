---
id: crew-intel-2026-11-08-distill
title: crew intel_distill INTEL unit 0
stage: misc
date: 2026-11-08
surface: agent
model: agy
feature: crew-intelligence
branch: crew/intel-2026-11-08-distill
user: crew
command: crew intel_distill
labels: ["crew", "agy", "intel_distill"]
links:
  spec: specs/intelligence/registry.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/intelligence/daily/2026-11-08.md
tests:
 - npm run check:content
---

## Prompt

# Crew job intel-2026-11-08-distill

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/intel-2026-11-08-distill`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, and never touch course content (`docs/`, `licence/`, the Urdu docs trees,
`specs/content/`, `static/img/figures/`, `glossary.json`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.

## Task
Distil today's reusable intelligence (intel-distill skill) into `specs/intelligence/daily/2026-11-08.md`. These clusters grew in the last 24 hours (kind, recent count, total, signature, an example, evidence):

- [cron] x144 recent, 402 total, since 2026-11-03: owner-sync: fast-forward blocked (n behind): error: your local changes to the following files would be overwritten by merge: package.json please commit your cha
  example: owner-sync: fast-forward blocked (15 behind): error: Your local changes to the following files would be overwritten by merge: 	package.json Please commit your changes or stash them before you merge. A
  evidence: cron.log
- [log-error] x20 recent, 285 total, since 2026-10-17: ✗ <path> is stale - it no longer describes the working tree.
  example: ✗ static/content-status.json is stale - it no longer describes the working tree.
  evidence: log:efmp-302-u02-repair_en-conflict1.1.log, log:efmp-302-u02-repair_en-conflict4.1.log, log:efmp-302-u02-translate.1.log
- [log-error] x19 recent, 315 total, since 2026-10-17: n of n content gates failed: check:content-status.
  example: 1 of 13 content gates failed: check:content-status.
  evidence: log:efmp-301-u01-review_ur.2.log, log:efmp-302-u02-repair_en-conflict1.1.log, log:efmp-302-u02-repair_en-conflict4.1.log
- [failure] x14 recent, 132 total, since 2026-10-28: left out of the batch: <path> conflicts with main (<path>).; merge fix queued
  example: left out of the batch: crew/gnas-301-u04-review_en conflicts with main (specs/content/gnas-301/tasks.md).; merge fix queued
  evidence: job:gnas-301-u04-review_en, job:gnas-301-u05-review_en, job:gnas-301-u06-review_en
- [failure] x12 recent, 81 total, since 2026-10-17: ✗ pipeline gate failed with n finding(s):
  example: ✗ Pipeline gate failed with 1 finding(s):
  evidence: job:efmp-304-u01-translate, job:efmp-304-u02-translate, job:efmp-304-u04-translate
- [log-error] x8 recent, 98 total, since 2026-10-17: ✗ pipeline gate failed with n finding(s):
  example: ✗ Pipeline gate failed with 2 finding(s):
  evidence: log:efmp-302-u03-translate.1.log, log:efmp-302-u04-translate-r1.1.log, log:efmp-303-u01-translate-r1.1.log
- [log-error] x7 recent, 51 total, since 2026-10-17: n of n content gates failed: check:pipeline-gate.
  example: 1 of 13 content gates failed: check:pipeline-gate.
  evidence: log:efmp-302-u03-translate.1.log, log:efmp-304-u01-translate.2.log, log:efmp-304-u02-translate.2.log
- [review] x7 recent, 7 total, since 2026-11-07: inherited from <path>, not resolved
  example: Inherited from specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en/crew-efmp-407-u05-review_en.json, not resolved
  evidence: review:specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en-r1.json
- [log-error] x4 recent, 52 total, since 2026-10-17: n of n content gates failed: check:pipeline-gate, check:content-status.
  example: 2 of 13 content gates failed: check:pipeline-gate, check:content-status.
  evidence: log:efmp-302-u04-translate-r1.1.log, log:efmp-303-u01-translate-r1.1.log, log:efmp-303-u02-translate.1.log
- [failure] x4 recent, 38 total, since 2026-10-19: the worker exited without committing any change
  example: the worker exited without committing any change
  evidence: job:gict-300-u01-translate-r1, job:efmp-304-u04-translate-r1, job:efmp-303-u02-translate
- [log-error] x4 recent, 24 total, since 2026-10-17: fatal: path '<path>' exists on disk, but not in '<path>'
  example: fatal: path 'static/content-status.json' exists on disk, but not in 'origin/main'
  evidence: log:efmp-302-u02-repair_en-conflict2.2.log, log:gpks-402-u00-salvage-conflict3.1.log, log:gqur-300-u05-translate.3.log
- [failure] x4 recent, 16 total, since 2026-10-28: left out of the batch: <path> conflicts with main (<path>, <path>).; merge fix queued
  example: left out of the batch: crew/efmp-301-u05-review_en conflicts with main (specs/content/efmp-301/tasks.md, static/content-status.json).; merge fix queued
  evidence: job:efmp-301-u05-review_en, job:efmp-301-u06-review_en, job:efmp-301-u08-review_en
- [log-error] x3 recent, 103 total, since 2026-10-17: ✗ <path> is missing. run: npm run build:content-status
  example: ✗ static/content-status.json is missing. Run: npm run build:content-status
  evidence: log:efmp-301-u01-review_ur.2.log, log:efmp-302-u06-translate-r1.1.log, log:efmp-302-u06-translate-r1.2.log
- [log-error] x3 recent, 46 total, since 2026-10-17: error: the user rejected permission to use this specific tool call.
  example: Error: The user rejected permission to use this specific tool call.
  evidence: log:efmp-301-u01-review_ur.1.log, log:efmp-302-u02-repair_en-conflict2.1.log, log:efmp-302-u02-repair_en-conflict2.2.log
- [handoff] x3 recent, 3 total, since 2026-11-07: both english and urdu unit locales remain translation_status: draft with gn, gn, and gn open pending independent review and qualification.
  example: Both English and Urdu unit locales remain translation_status: draft with G3, G4, and G5 open pending independent review and qualification.
  evidence: job:gicp-400-u04-illustrate, job:gicp-400-u05-illustrate, job:gicp-400-u06-illustrate
- [handoff] x3 recent, 3 total, since 2026-11-07: banner <code> remains <code>; chromium figure geometry measurement is deferred to ci.
  example: banner `fig-U3-7` remains `prompt-only`; Chromium figure geometry measurement is deferred to CI.
  evidence: job:efmp-407-u03-author-conflict1, job:efmp-407-u03-author-conflict2, job:efmp-407-u03-author-conflict3
- [handoff] x3 recent, 3 total, since 2026-11-07: main's unit n backward-design table still carries five erroneous unit n tracker rows (pre-existing on main, left untouched per the merge rule).
  example: main's Unit 2 backward-design table still carries five erroneous Unit 1 tracker rows (pre-existing on main, left untouched per the merge rule).
  evidence: job:efmp-407-u06-author-conflict2, job:efmp-407-u08-author-conflict3, job:efmp-407-u08-author-conflict4
- [handoff] x3 recent, 3 total, since 2026-11-07: unit n banner fig-un-n is still prompt-only and its ten urdu concept labels await gn.
  example: Unit 8 banner fig-U8-5 is still prompt-only and its ten Urdu concept labels await G5.
  evidence: job:efmp-407-u08-author-conflict3, job:efmp-407-u08-author-conflict4, job:efmp-407-u08-author-conflict5
- [handoff] x3 recent, 3 total, since 2026-11-07: <code> is shared with unit n, so future edits re-stale both gn manifests and need <code> for each.
  example: `specs/content/efmp-407/sources/texts/jumani-abbasi-2015.md` is shared with Unit 7, so future edits re-stale both G2 manifests and need `prepare-gate-evidence.mjs` for each.
  evidence: job:efmp-407-u08-author-conflict3, job:efmp-407-u08-author-conflict4, job:efmp-407-u08-author-conflict5
- [review] x3 recent, 3 total, since 2026-11-07: no actual browser, narrow-screen or an print inspection; prohibited by brief.
  example: No actual browser, narrow-screen or A4 print inspection; prohibited by brief.
  evidence: review:specs/content/efmp-407/reviews/unit-06/G3/ebbc1750-23d0-4383-b305-07c7fb09db2a.json, review:specs/content/efmp-407/reviews/unit-04/G3/5c3f21c1-e47f-42d8-9764-e1974cb4dcdb.json, review:specs/content/efmp-407/reviews/unit-01/G3/20261107-codex.json
- [review] x3 recent, 3 total, since 2026-11-07: exact author conversation identity, parent frozen handoff and model build unavailable.
  example: Exact author conversation identity, parent frozen handoff and model build unavailable.
  evidence: review:specs/content/efmp-407/reviews/unit-06/G3/ebbc1750-23d0-4383-b305-07c7fb09db2a.json, review:specs/content/efmp-407/reviews/unit-04/G3/5c3f21c1-e47f-42d8-9764-e1974cb4dcdb.json, review:specs/content/efmp-407/reviews/unit-01/G3/20261107-codex.json
- [log-error] x2 recent, 18 total, since 2026-10-17: error: pathspec '<path>' did not match any file(s) known to git
  example: error: pathspec 'static/content-status.json' did not match any file(s) known to git
  evidence: log:efmp-302-u02-repair_en-conflict2.2.log, log:efmp-304-u02-review_en-cifix2.1.log, log:geng-300-u01-repair_en-conflict1.1.log
- [review] x2 recent, 5 total, since 2026-10-28: accessibility
  example: accessibility
  evidence: review:specs/content/geng-301/reviews/unit-02/G3/crew-r1-20261028.json, review:specs/content/geng-301/reviews/unit-02/G3/20261102T212207Z-g3-desk-90a85687.json, review:specs/content/geng-301/reviews/unit-02/G3/20261102T211054Z-g3-desk-bb0b1e2c.json
- [review] x2 recent, 5 total, since 2026-10-28: pedagogy
  example: Pedagogy
  evidence: review:specs/content/efmp-301/reviews/unit-09/G3/codex-efmp301-u09-cycle2-01a17f38-14aa-7e12-b5ba-14390f06b2ef.json, review:specs/content/efmp-301/reviews/unit-09/G3/20261102T212207Z-g3-desk-b282fccc.json, review:specs/content/efmp-301/reviews/unit-09/G3/20261102T211054Z-g3-desk-15f0d2e9.json
- [handoff] x2 recent, 2 total, since 2026-11-06: unit n gn review, urdu translation, banner production and browser geometry checks remain pending.
  example: Unit 6 G3 review, Urdu translation, banner production and browser geometry checks remain pending.
  evidence: job:gicp-400-u06-author-conflict2, job:gicp-400-u06-author-conflict3
- [handoff] x2 recent, 2 total, since 2026-11-06: primary constitutional text is updated to the twenty-seventh amendment (n); verify official gazette text for the nth amendment when available.
  example: Primary constitutional text is updated to the Twenty-seventh Amendment (2025); verify official gazette text for the 25th Amendment when available.
  evidence: job:gicp-400-u06-review_en, job:gicp-400-u06-illustrate
- [handoff] x2 recent, 2 total, since 2026-11-07: translation remains draft; independent gn and authorised <path> inspection are pending.
  example: Translation remains draft; independent G5 and authorised browser/A4 inspection are pending.
  evidence: job:gicp-400-u06-translate
- [handoff] x2 recent, 2 total, since 2026-11-06: english repairs and the owner’s ideology ruling must precede translation.
  example: English repairs and the owner’s ideology ruling must precede translation.
  evidence: job:gicp-400-u07-translate
- [review] x2 recent, 2 total, since 2026-11-07: actual author run identity (<path> / commit <sha>) was reconstructed from commit history; independent coordinator run attestation was not supplied in a parent h
  example: Actual author run identity (crew/gicp-400-u06-author / commit c1ab4c6ab) was reconstructed from commit history; independent coordinator run attestation was not supplied in a parent handoff bundle.
  evidence: review:specs/content/gicp-400/reviews/unit-06/G3/fcfc9788-9bcf-40ed-8d5e-73e82260e6d1.json, review:specs/content/gicp-400/reviews/unit-03/G3/f6947550-7510-4662-98d5-9c955da536bd.json
- [review] x2 recent, 2 total, since 2026-11-07: bind complete offline texts for secondary sources or record authorized unavailable-source declarations, and have an authorized host with chromium access execute
  example: Bind complete offline texts for secondary sources or record authorized unavailable-source declarations, and have an authorized host with Chromium access execute visual rendering and print checks.
  evidence: review:specs/content/gicp-400/reviews/unit-06/G3/fcfc9788-9bcf-40ed-8d5e-73e82260e6d1.json, review:specs/content/gicp-400/reviews/unit-03/G3/f6947550-7510-4662-98d5-9c955da536bd.json
- [review] x2 recent, 2 total, since 2026-11-07: sources (constitutional accuracy)
  example: sources (constitutional accuracy)
  evidence: review:specs/content/gicp-400/reviews/unit-07/G3/ddc654f7-48bb-4e03-a89f-fea2dde7b9d0.json
- [review] x2 recent, 2 total, since 2026-11-07: actual narrow-screen (npx) and an print inspection plus svg glyph geometry unavailable because <path> prohibits builds, a dev server, and playwright
  example: Actual narrow-screen (360px) and A4 print inspection plus SVG glyph geometry unavailable because .crew/brief.md prohibits builds, a dev server, and Playwright
  evidence: review:specs/content/gicp-400/reviews/unit-03/G3/f6947550-7510-4662-98d5-9c955da536bd.json, review:specs/content/gicp-400/reviews/unit-01/G3/7b8da038-290a-4b3b-9ba4-c275e02839bf.json
- [handoff] x2 recent, 2 total, since 2026-11-07: independent review, urdu translation, banner production and browser geometry validation remain pending.
  example: Independent review, Urdu translation, banner production and browser geometry validation remain pending.
  evidence: job:efmp-407-u07-author
- [handoff] x2 recent, 2 total, since 2026-11-07: no topic illustration prompts exist; the topic generation command had no matching rows.
  example: No topic illustration prompts exist; the topic generation command had no matching rows.
  evidence: job:efmp-407-u01-illustrate
- [handoff] x2 recent, 2 total, since 2026-11-07: fresh review needs complete source binding, run provenance, independent assessment solving and <path> evidence.
  example: Fresh review needs complete source binding, run provenance, independent assessment solving and browser/print evidence.
  evidence: job:efmp-407-u01-review_en
- [handoff] x2 recent, 2 total, since 2026-11-07: english author must repair orr attribution disclosure and rrq-n source uncertainty before gn resumes.
  example: English author must repair Orr attribution disclosure and RRQ-09 source uncertainty before G4 resumes.
  evidence: job:efmp-407-u01-translate
- [handoff] x2 recent, 2 total, since 2026-11-07: <code> is git-ignored and was regenerated locally only; a root-scope job must regenerate it before publication.
  example: `static/content-status.json` is git-ignored and was regenerated locally only; a root-scope job must regenerate it before publication.
  evidence: job:efmp-407-u04-author-conflict1, job:efmp-407-u04-translate-conflict1
- [handoff] x2 recent, 2 total, since 2026-11-07: browser geometry, <path> inspection and independent review remain pending; translation stays draft.
  example: Browser geometry, narrow-screen/A4 inspection and independent review remain pending; translation stays draft.
  evidence: job:efmp-407-u02-translate
- [handoff] x2 recent, 2 total, since 2026-11-07: unit n <code> can now be cleared, but only after real gn evidence exists (tracker row is <code>, so clearing it now fails <code>); regenerate <code> afterwards.
  example: Unit 3 `coming_soon: true` can now be cleared, but only after real G2 evidence exists (tracker row is `G2: ▣`, so clearing it now fails `check:pipeline-gate`); regenerate `static/content-status.json` 
  evidence: job:efmp-407-u03-author-conflict2, job:efmp-407-u03-author-conflict3
- [handoff] x2 recent, 2 total, since 2026-11-07: main's <code> table still carries five stray unit n tracker rows (merge artifact from <code>); harmless to gates but a cleanup owner may remove them.
  example: main's `## Unit 2 backward-design alignment` table still carries five stray Unit 1 tracker rows (merge artifact from `48c3d7c21`); harmless to gates but a cleanup owner may remove them.
  evidence: job:efmp-407-u03-author-conflict2, job:efmp-407-u03-author-conflict3

Follow `.claude/skills/intel-distill/SKILL.md` exactly; read it and every file it references before starting.

## Scope
`specs/intelligence/daily/2026-11-08.md` only.

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
- (intel-2026-11-07-distill, intel_distill, claude) `gqur-301-u15-repair_en` is still `gate_red` after 5 merge fixes; requeue it once the tracker merge in C1 is fixed.
- (intel-2026-11-07-distill, intel_distill, claude) The registry still lists I-0015 as `proposed` although its code merged on 2026-11-01; the weekly survey should correct it.
- (intel-2026-11-07-distill, intel_distill, claude) The owner must keep or discard the 5 modified tracked files in `~/mega_book_for_B.Ed` before owner-sync can fast-forward.
- (intel-2026-11-06-distill, intel_distill, agy) The owner checkout at `~/mega_book_for_B.Ed` has 5 modified tracked files preventing ff-merge and is now 299 commits behind origin/main.
- (intel-2026-11-06-distill, intel_distill, agy) 57 units currently wait in `awaitingG3` status on the crew board while ADR-0019 review signing remains host-blocked.


## Response snapshot

Distilled 10 daily reusable intelligence candidates and effects into specs/intelligence/daily/2026-11-08.md with all gates and crew tests passing.

## Outcome

- Impact: intel_distill for INTEL Unit 0 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Distilled 10 daily reusable intelligence candidates and effects into specs/intelligence/daily/2026-11-08.md with all gates and crew tests passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Nested review bundles under `reviews/unit-NN/G3/<folder>/` are invisible to `latestReport`, causing premature `review_en-r1` runs on EFMP-407 Units 5 and 8.
  - The owner checkout at `~/mega_book_for_B.Ed` has 5 modified tracked files preventing ff-merge and is now 790 commits behind origin/main.
  - 78 units currently wait in `awaitingG3` status while ADR-0019 review signing remains host-blocked.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
