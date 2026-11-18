---
id: crew-intel-2026-11-09-distill
title: crew intel_distill INTEL unit 0
stage: misc
date: 2026-11-09
surface: agent
model: agy
feature: crew-intelligence
branch: crew/intel-2026-11-09-distill
user: crew
command: crew intel_distill
labels: ["crew", "agy", "intel_distill"]
links:
  spec: specs/intelligence/registry.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/intelligence/daily/2026-11-09.md
tests:
 - npm run check:content
---

## Prompt

# Crew job intel-2026-11-09-distill

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/intel-2026-11-09-distill`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, and never touch course content (`docs/`, `licence/`, the Urdu docs trees,
`specs/content/`, `static/img/figures/`, `glossary.json`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.

## Task
Distil today's reusable intelligence (intel-distill skill) into `specs/intelligence/daily/2026-11-09.md`. These clusters grew in the last 24 hours (kind, recent count, total, signature, an example, evidence):

- [cron] x112 recent, 466 total, since 2026-11-03: owner-sync: fast-forward blocked (n behind): error: your local changes to the following files would be overwritten by merge: package.json please commit your cha
  example: owner-sync: fast-forward blocked (15 behind): error: Your local changes to the following files would be overwritten by merge: 	package.json Please commit your changes or stash them before you merge. A
  evidence: cron.log
- [cron] x24 recent, 24 total, since 2026-11-08: owner-sync: fast-forward blocked (n behind): error: your local changes to the following files would be overwritten by merge: agents.md package.json <path>
  example: owner-sync: fast-forward blocked (772 behind): error: Your local changes to the following files would be overwritten by merge: 	AGENTS.md 	package.json 	scripts/heavy.sh
  evidence: cron.log
- [review] x9 recent, 9 total, since 2026-11-08: inherited unresolved finding from <path>
  example: Inherited unresolved finding from specs/content/efmp-407/reviews/unit-08/G3/crew-efmp-407-u08-review_en/crew-efmp-407-u08-review_en.json
  evidence: review:specs/content/efmp-407/reviews/unit-08/G3/crew-efmp-407-u08-review_en-r1.json
- [review] x7 recent, 7 total, since 2026-11-07: inherited from <path>, not resolved
  example: Inherited from specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en/crew-efmp-407-u05-review_en.json, not resolved
  evidence: review:specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en-r1.json
- [phr] x4 recent, 4 total, since 2026-11-08: reflection: automated generation with strict visual inspection ensures compliance with house style and cultural authenticity. refreshing stale gn evidence immed
  example: reflection: Automated generation with strict visual inspection ensures compliance with house style and cultural authenticity. Refreshing stale G2 evidence immediately after placing banner maintains gr
  evidence: phr:history/prompts/general/2467-efmp-407-u07-illustrate.general.prompt.md, phr:history/prompts/general/2466-efmp-407-u06-illustrate.general.prompt.md, phr:history/prompts/general/2465-efmp-407-u05-illustrate.general.prompt.md
- [log-error] x3 recent, 318 total, since 2026-10-17: n of n content gates failed: check:content-status.
  example: 1 of 13 content gates failed: check:content-status.
  evidence: log:efmp-302-u02-translate.1.log, log:efmp-302-u06-translate-r1.1.log, log:efmp-407-u08-translate-conflict1.1.log
- [log-error] x3 recent, 288 total, since 2026-10-17: ✗ <path> is stale - it no longer describes the working tree.
  example: ✗ static/content-status.json is stale - it no longer describes the working tree.
  evidence: log:efmp-302-u04-translate-r1.1.log, log:efmp-302-u06-translate-r1.3.log, log:efmp-407-u08-translate-conflict1.1.log
- [review] x3 recent, 3 total, since 2026-11-07: no actual browser, narrow-screen or an print inspection; prohibited by brief.
  example: No actual browser, narrow-screen or A4 print inspection; prohibited by brief.
  evidence: review:specs/content/efmp-407/reviews/unit-06/G3/ebbc1750-23d0-4383-b305-07c7fb09db2a.json, review:specs/content/efmp-407/reviews/unit-04/G3/5c3f21c1-e47f-42d8-9764-e1974cb4dcdb.json, review:specs/content/efmp-407/reviews/unit-01/G3/20261107-codex.json
- [review] x3 recent, 3 total, since 2026-11-07: exact author conversation identity, parent frozen handoff and model build unavailable.
  example: Exact author conversation identity, parent frozen handoff and model build unavailable.
  evidence: review:specs/content/efmp-407/reviews/unit-06/G3/ebbc1750-23d0-4383-b305-07c7fb09db2a.json, review:specs/content/efmp-407/reviews/unit-04/G3/5c3f21c1-e47f-42d8-9764-e1974cb4dcdb.json, review:specs/content/efmp-407/reviews/unit-01/G3/20261107-codex.json
- [handoff] x3 recent, 3 total, since 2026-11-07: independent gn english review and gn urdu review remain open and uncertified.
  example: Independent G3 English review and G5 Urdu review remain open and uncertified.
  evidence: job:efmp-407-u04-illustrate, job:efmp-407-u05-illustrate, job:efmp-407-u06-illustrate
- [log-error] x2 recent, 105 total, since 2026-10-17: ✗ <path> is missing. run: npm run build:content-status
  example: ✗ static/content-status.json is missing. Run: npm run build:content-status
  evidence: log:efmp-303-u02-translate.1.log, log:efmp-303-u03-review_en.1.log, log:efmp-407-u08-translate-conflict1.1.log
- [failure] x2 recent, 82 total, since 2026-10-17: ✗ pipeline gate failed with n finding(s):
  example: ✗ Pipeline gate failed with 1 finding(s):
  evidence: job:efmp-304-u04-translate, job:gict-300-u03-translate, job:efmp-304-u06-translate-r1
- [handoff] x2 recent, 4 total, since 2026-10-31: protected script changes require owner review.
  example: Protected script changes require owner review.
  evidence: job:maint-2026-w44-m2, job:maint-2026-w45-m1
- [review] x2 recent, 2 total, since 2026-11-07: assessment items solved and verified, but withheld-guidance independent solve by blind reviewer remains recommended.
  example: Assessment items solved and verified, but withheld-guidance independent solve by blind reviewer remains recommended.
  evidence: review:specs/content/efmp-407/reviews/unit-06/G3/ebbc1750-23d0-4383-b305-07c7fb09db2a.json, review:specs/content/efmp-407/reviews/unit-04/G3/5c3f21c1-e47f-42d8-9764-e1974cb4dcdb.json
- [handoff] x2 recent, 2 total, since 2026-11-07: gn repairs, independent gn, browser geometry and <path> inspection remain pending; translation_status stays draft.
  example: G3 repairs, independent G5, browser geometry and Urdu/A4 inspection remain pending; translation_status stays draft.
  evidence: job:efmp-407-u08-translate
- [handoff] x2 recent, 2 total, since 2026-11-07: gn remains open. prior findings fn-fn need author repairs; fresh review requires runtime provenance and <path> evidence.
  example: G3 remains open. Prior findings F1-F9 need author repairs; fresh review requires runtime provenance and browser/print evidence.
  evidence: job:efmp-407-u08-review_en-r1
- [handoff] x2 recent, 2 total, since 2026-11-08: owner review required because this changes a protected script.
  example: Owner review required because this changes a protected script.
  evidence: job:maint-2026-w45-m3
- [phr] x2 recent, 2 total, since 2026-11-08: failure modes observed: initial live assertion assumed tmux service leaf; corrected to validated agent-slice ancestry. inline scratch test quoting failed before
  example: failure modes observed: Initial live assertion assumed tmux service leaf; corrected to validated agent-slice ancestry. Inline scratch test quoting failed before execution and was replaced by reusable 
  evidence: phr:history/prompts/general/20261123-vscode-containment-persistent-agents.general.prompt.md, phr:history/prompts/general/20261124-windows-contained-ssh-key-instructions.general.prompt.md
- [phr] x2 recent, 2 total, since 2026-11-08: next experiment (smallest change to try): connect two real vs code windows through dedicated identity and check all child cgroups.
  example: next experiment (smallest change to try): Connect two real VS Code windows through dedicated identity and check all child cgroups.
  evidence: phr:history/prompts/general/20261123-vscode-containment-persistent-agents.general.prompt.md, phr:history/prompts/general/20261124-windows-contained-ssh-key-instructions.general.prompt.md
- [log-error] x1 recent, 53 total, since 2026-10-17: n of n content gates failed: check:pipeline-gate, check:content-status.
  example: 2 of 13 content gates failed: check:pipeline-gate, check:content-status.
  evidence: log:efmp-303-u02-translate.1.log, log:efmp-304-u01-translate-r1.2.log, log:efmp-304-u04-translate-r1.1.log
- [review] x1 recent, 7 total, since 2026-10-28: visual browser and print inspection (npx viewport, keyboard table scrolling, desktop layout, and an print view) could not be executed because the crew job brief
  example: Visual browser and print inspection (360px viewport, keyboard table scrolling, desktop layout, and A4 print view) could not be executed because the crew job brief explicitly prohibits running npm run 
  evidence: review:specs/content/efmp-301/reviews/unit-04/G3/8d35e67d-a55f-4595-a37c-c29acbf04727.json, review:specs/content/efmp-301/reviews/unit-04/G3/20261102T141142Z-g3-desk-26537ed9.json, review:specs/content/efmp-301/reviews/unit-04/G3/20261102T211929Z-g3-desk-a812ec4a.json
- [handoff] x1 recent, 2 total, since 2026-11-06: the owner checkout at <code> has n modified tracked files preventing ff-merge and is now n commits behind <path>
  example: The owner checkout at `~/mega_book_for_B.Ed` has 5 modified tracked files preventing ff-merge and is now 299 commits behind origin/main.
  evidence: job:intel-2026-11-06-distill, job:intel-2026-11-08-distill
- [handoff] x1 recent, 1 total, since 2026-11-07: placed banner fig-un-n.webp in english index.mdx; when translation creates the urdu mirror, wire the banner using the draft snippet in <path>
  example: Placed banner fig-U3-7.webp in English index.mdx; when translation creates the Urdu mirror, wire the banner using the draft snippet in specs/content/efmp-407/figures/unit-03.illustration-notes.md.
  evidence: job:efmp-407-u03-illustrate
- [handoff] x1 recent, 1 total, since 2026-11-07: english author repairs remain prerequisite for gn translation to reconcile sdg n category guidance and resolve open gn findings.
  example: English author repairs remain prerequisite for G4 translation to reconcile SDG 5 category guidance and resolve open G3 findings.
  evidence: job:efmp-407-u03-illustrate
- [phr] x1 recent, 1 total, since 2026-11-07: failure modes observed: pre-commit gate success missed the new handoff entering the committed input manifest.
  example: failure modes observed: Pre-commit gate success missed the new handoff entering the committed input manifest.
  evidence: phr:history/prompts/general/20261161-efmp-407-u03-evidence-repair.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-07: next experiment (smallest change to try): refresh gn after committing bound documentation, then rerun content gates.
  example: next experiment (smallest change to try): Refresh G2 after committing bound documentation, then rerun content gates.
  evidence: phr:history/prompts/general/20261161-efmp-407-u03-evidence-repair.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-07: failure modes observed: existing english category contradiction survived the prior repair job. translating it would preserve a defective assessment.
  example: failure modes observed: Existing English category contradiction survived the prior repair job. Translating it would preserve a defective assessment.
  evidence: phr:history/prompts/general/2462-efmp-407-u03-translation-blocked.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-07: next experiment (smallest change to try): recheck sdg n categorisation in teaching and assessment after english repair before translating.
  example: next experiment (smallest change to try): Recheck SDG 5 categorisation in teaching and assessment after English repair before translating.
  evidence: phr:history/prompts/general/2462-efmp-407-u03-translation-blocked.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-07: failure modes observed: prior review marked accessibility pass without actual page inspection; inputs unchanged; parent provenance absent. tracker edit invalida
  example: failure modes observed: Prior review marked accessibility pass without actual page inspection; inputs unchanged; parent provenance absent. Tracker edit invalidated ignored static/content-status.json; 
  evidence: phr:history/prompts/general/20261159-efmp-407-unit-five-review-continuation.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-07: next experiment (smallest change to try): repair sources and formative items in a separate author session, then prepare a new frozen bundle.
  example: next experiment (smallest change to try): Repair sources and formative items in a separate author session, then prepare a new frozen bundle.
  evidence: phr:history/prompts/general/20261159-efmp-407-unit-five-review-continuation.general.prompt.md
- [review] x1 recent, 1 total, since 2026-11-07: mandatory fresh narrow-screen and an print render inspection cannot run under the crew brief
  example: Mandatory fresh narrow-screen and A4 print render inspection cannot run under the crew brief
  evidence: review:specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en-r1.json
- [review] x1 recent, 1 total, since 2026-11-07: no parent-prepared frozen handoff or actual author runtime identity supplied
  example: No parent-prepared frozen handoff or actual author runtime identity supplied
  evidence: review:specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en-r1.json
- [review] x1 recent, 1 total, since 2026-11-07: all n bound digests match prior review; continuation preserves unresolved findings and escalates without repeating a full semantic review or independently solvi
  example: All 100 bound digests match prior review; continuation preserves unresolved findings and escalates without repeating a full semantic review or independently solving the unchanged bank
  evidence: review:specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en-r1.json
- [phr] x1 recent, 1 total, since 2026-11-07: failure modes observed: national framework unavailable but detailed policy claims undisclosed; assessment contradicts its own tier list; original source retriev
  example: failure modes observed: National framework unavailable but detailed policy claims undisclosed; assessment contradicts its own tier list; original source retrieval blocked; no browser permission. pytho
  evidence: phr:history/prompts/general/20261160-efmp407-u03-g3-review.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-07: next experiment (smallest change to try): bind authoritative national-policy text and correct the tier-dependent questions before a fresh review.
  example: next experiment (smallest change to try): Bind authoritative national-policy text and correct the tier-dependent questions before a fresh review.
  evidence: phr:history/prompts/general/20261160-efmp407-u03-g3-review.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-07: failure modes observed: translation scheduled before english repair.
  example: failure modes observed: Translation scheduled before English repair.
  evidence: phr:history/prompts/general/20261158-efmp-407-u07-translation-retry-blocked.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-07: next experiment (smallest change to try): schedule repair_en before retrying translation.
  example: next experiment (smallest change to try): Schedule repair_en before retrying translation.
  evidence: phr:history/prompts/general/20261158-efmp-407-u07-translation-retry-blocked.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-07: failure modes observed: initial nastaliq previews showed tight line spacing, corrected by expanding vertical geometry. the first temporary reviewed run also fou
  example: failure modes observed: Initial Nastaliq previews showed tight line spacing, corrected by expanding vertical geometry. The first temporary reviewed run also found stale ignored content-status data, co
  evidence: phr:history/prompts/006-content-pipeline/20261158-efmp-407-unit-06-urdu-mirror.misc.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-07: next experiment (smallest change to try): use an authorized inspection host for exact-commit urdu pages and all new svg geometry; do not infer rendered usabilit
  example: next experiment (smallest change to try): Use an authorized inspection host for exact-commit Urdu pages and all new SVG geometry; do not infer rendered usability from green source gates.
  evidence: phr:history/prompts/006-content-pipeline/20261158-efmp-407-unit-06-urdu-mirror.misc.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-07: failure modes observed: the brief asked to author a unit that was already merged; the real leftover was the gn evidence step.
  example: failure modes observed: the brief asked to author a unit that was already merged; the real leftover was the G2 evidence step.
  evidence: phr:history/prompts/efmp-407/20261159-efmp407-unit03-g2-evidence.general.prompt.md

Follow `.claude/skills/intel-distill/SKILL.md` exactly; read it and every file it references before starting.

## Scope
`specs/intelligence/daily/2026-11-09.md` only.

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
- (intel-2026-11-08-distill, intel_distill, agy) Nested review bundles under `reviews/unit-NN/G3/<folder>/` are invisible to `latestReport`, causing premature `review_en-r1` runs on EFMP-407 Units 5 and 8.
- (intel-2026-11-08-distill, intel_distill, agy) The owner checkout at `~/mega_book_for_B.Ed` has 5 modified tracked files preventing ff-merge and is now 790 commits behind origin/main.
- (intel-2026-11-08-distill, intel_distill, agy) 78 units currently wait in `awaitingG3` status while ADR-0019 review signing remains host-blocked.
- (intel-2026-11-07-distill, intel_distill, claude) `gqur-301-u15-repair_en` is still `gate_red` after 5 merge fixes; requeue it once the tracker merge in C1 is fixed.
- (intel-2026-11-07-distill, intel_distill, claude) The registry still lists I-0015 as `proposed` although its code merged on 2026-11-01; the weekly survey should correct it.


## Response snapshot

Distilled 2026-11-09 intelligence candidates into `specs/intelligence/daily/2026-11-09.md` covering invisible nested review reports, owner-sync cron errors, temporary reviewed flip pipeline gate friction, content-status staleness, premature translation dispatch, protected script maintenance PRs, and review render inspection limitations.

## Outcome

- Impact: intel_distill for INTEL Unit 0 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Distilled 2026-11-09 intelligence candidates into `specs/intelligence/daily/2026-11-09.md` covering invisible nested review reports, owner-sync cron errors, temporary reviewed flip pipeline gate friction, content-status staleness, premature translation dispatch, protected script maintenance PRs, and review render inspection limitations.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Nested review bundles under `reviews/unit-NN/G3/<folder>/` continue causing premature repeat reviews that escalate on unchanged inputs (C1).
  - The owner checkout at `~/mega_book_for_B.Ed` moved to `fix/purge-test-accounts`, ending the 136-signal/day blocked loop; PR #500 awaits owner decision C-019 (C2).
  - Merging green maintenance PRs for decisions C-017 through C-021 will unblock workflow fixes (row-keyed tracker merge, brief rules, and owner-sync alerts).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
