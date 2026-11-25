---
id: crew-intel-2026-11-25-distill
title: crew intel_distill INTEL unit 0
stage: misc
date: 2026-11-24
surface: agent
model: agy
feature: crew-intelligence
branch: crew/intel-2026-11-25-distill
user: crew
command: crew intel_distill
labels: ["crew", "agy", "intel_distill"]
links:
  spec: specs/intelligence/registry.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/intelligence/daily/2026-11-25.md
tests:
 - npm run check:content
---

## Prompt

# Crew job intel-2026-11-25-distill

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/intel-2026-11-25-distill`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, and never touch course content (`docs/`, `licence/`, the Urdu docs trees,
`specs/content/`, `static/img/figures/`, `glossary.json`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.

## Task
Distil today's reusable intelligence (intel-distill skill) into `specs/intelligence/daily/2026-11-25.md`. These clusters grew in the last 24 hours (kind, recent count, total, signature, an example, evidence):

- [cron] x31 recent, 101 total, since 2026-11-22: gcce-n-un-author: error: enoent: no such file or directory, open '<path>'
  example: gcce-400-u07-author: Error: ENOENT: no such file or directory, open '/home/a2ahs/crew-wt/gcce-400-u07-author/.crew/brief.md'
  evidence: cron.log
- [failure] x7 recent, 165 total, since 2026-10-28: left out of the batch: <path> conflicts with main (<path>).; merge fix queued
  example: left out of the batch: crew/gnas-301-u04-review_en conflicts with main (specs/content/gnas-301/tasks.md).; merge fix queued
  evidence: job:gent-401-u04-author, job:gent-401-u06-author, job:efmp-408-u02-author
- [failure] x5 recent, 23 total, since 2026-10-28: left out of the batch: <path> conflicts with main (<path>, <path>).; merge fix queued
  example: left out of the batch: crew/efmp-301-u05-review_en conflicts with main (specs/content/efmp-301/tasks.md, static/content-status.json).; merge fix queued
  evidence: job:guhq-301-u02-author, job:gent-401-u05-author, job:gent-401-u07-author
- [failure] x4 recent, 6 total, since 2026-11-02: left out of the batch: <path> conflicts with main (<path>, <path>, <path>).; merge fix queued
  example: left out of the batch: crew/giss-401-u03-author conflicts with main (docs/semester-3/giss-401/course-overview.mdx, specs/content/giss-401/sources/texts/quran-translation.md, specs/content/giss-401/tas
  evidence: job:gent-401-u04-author, job:gent-401-u05-author, job:gent-401-u06-author
- [review] x4 recent, 4 total, since 2026-11-24: render and print inspection (npx viewport, table scrolling, desktop layout, an print, figure clipping) could not be performed
  example: Render and print inspection (360px viewport, table scrolling, desktop layout, A4 print, figure clipping) could not be performed
  evidence: review:specs/content/gcce-400/reviews/unit-04/G3/agy-cycle2-20261124.json, review:specs/content/efmp-301/reviews/unit-07/G3/agy-cycle2-20261124.json, review:specs/content/efmp-301/reviews/unit-04/G3/crew-cycle2-20261124.json
- [handoff] x3 recent, 3 total, since 2026-11-24: unit n gn en-review and the urdu <path> mirror are still open; the reviewer should verify secp ezfile incorporation steps and ipo-pakistan ip classifications.
  example: Unit 6 G3 en-review and the Urdu G4/G5 mirror are still open; the reviewer should verify SECP eZfile incorporation steps and IPO-Pakistan IP classifications.
  evidence: job:gent-401-u06-author-conflict1, job:gent-401-u06-author-conflict2, job:gent-401-u06-author-conflict3
- [handoff] x2 recent, 2 total, since 2026-11-23: gn remains open (adr-n cycle n of n), unticked, reviewer token agent:gn-reviewer, no certification.
  example: G3 remains open (ADR-0019 cycle 2 of 2), unticked, reviewer token agent:g3-reviewer, no certification.
  evidence: job:efmp-301-u07-review_en-r1, job:gcce-400-u04-review_en-r1
- [handoff] x2 recent, 2 total, since 2026-11-23: gn ur-review remains open; translation_status is draft across english and urdu indices, and gn owns nastaliq shaping, npx and an print layout inspection.
  example: G5 ur-review remains open; translation_status is draft across English and Urdu indices, and G5 owns Nastaliq shaping, 360px and A4 print layout inspection.
  evidence: job:gcce-400-u05-illustrate, job:gcce-400-u06-illustrate
- [handoff] x2 recent, 2 total, since 2026-11-24: gn remains open, unticked, with reviewer token agent:gn-reviewer, disposition escalate, and report at <path><sha>.json.
  example: G3 remains open, unticked, with reviewer token agent:g3-reviewer, disposition escalate, and report at specs/content/gcce-400/reviews/unit-06/G3/agy-run1-20261124.json.
  evidence: job:gcce-400-u06-review_en, job:gcce-400-u07-review_en
- [handoff] x2 recent, 2 total, since 2026-11-24: <course> unit n gn is still unticked with no reviewer initials, and <code> are still unplaced.
  example: EFMP-301 Unit 11 G3 is still unticked with no reviewer initials, and `fig-U11-5/6/7` are still unplaced.
  evidence: job:efmp-301-u11-flashcards-conflict1, job:efmp-301-u11-flashcards-conflict2
- [failure] x1 recent, 95 total, since 2026-10-17: ✗ pipeline gate failed with n finding(s):
  example: ✗ Pipeline gate failed with 1 finding(s):
  evidence: job:gcce-400-u04-translate, job:gcce-400-u06-translate, job:gcce-400-u07-translate
- [review] x1 recent, 3 total, since 2026-10-28: mcq option key clustering
  example: MCQ option key clustering
  evidence: review:specs/content/efmp-301/reviews/unit-07/G3/agent-g3-efmp301-u7-run002.json, review:specs/content/efmp-301/reviews/unit-07/G3/20261102T140729Z-g3-desk-e8869756.json, review:specs/content/efmp-301/reviews/unit-07/G3/agy-cycle2-20261124.json
- [review] x1 recent, 3 total, since 2026-11-19: render-review unavailable
  example: render-review unavailable
  evidence: review:specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en.json, review:specs/content/efpg-401/reviews/unit-01/G3/a0dffa23-4ae1-40fa-aef4-f60697bb4df8.json, review:specs/content/gcce-400/reviews/unit-03/G3/52caad24-9ea1-412b-918e-0ec74d99f5d0.json
- [handoff] x1 recent, 2 total, since 2026-10-27: unit n round-n blocking findings (rohrer & pashler n citation and <path> blueprint spread) are verified resolved; gn tracker row remains open ▢ awaiting human s
  example: Unit 7 round-1 blocking findings (Rohrer & Pashler 2012 citation and 5/5 blueprint spread) are verified resolved; G3 tracker row remains open ▢ awaiting human sign-off.
  evidence: job:efmp-301-u07-review_en, job:efmp-301-u07-illustrate
- [handoff] x1 recent, 2 total, since 2026-10-27: gn urdu review should note the slow learner terminology conflict (کمزور متعلم vs slow-is-not-weak teaching) previously escalated to the owner.
  example: G5 Urdu review should note the Slow Learner terminology conflict (کمزور متعلم vs slow-is-not-weak teaching) previously escalated to the owner.
  evidence: job:efmp-301-u07-review_en, job:efmp-301-u07-illustrate
- [failure] x1 recent, 2 total, since 2026-10-28: left out of the batch: <path> conflicts with main (glossary.json, <path>, <path>, <path>).; merge fix queued
  example: left out of the batch: crew/gpks-402-u06-author conflicts with main (glossary.json, specs/content/gpks-402/sources/texts/pak-constitution-1973.md, specs/content/gpks-402/sources/texts/worldbank-pdu-20
  evidence: job:gpks-402-u06-author, job:gent-401-u05-author
- [handoff] x1 recent, 2 total, since 2026-11-03: mcq option order changed in both locales (keys na nb nd nb nd nc na nc na nd); a gn re-review should check the urdu reorder.
  example: MCQ option order changed in both locales (keys 1a 2b 3d 4b 5d 6c 7a 8c 9a 10d); a G5 re-review should check the Urdu reorder.
  evidence: job:efmp-301-u04-repair_en, job:efmp-301-u04-illustrate
- [handoff] x1 recent, 2 total, since 2026-11-03: npx and an print inspection of unit n is still unperformed and needs a host where building and browsers are allowed.
  example: 360px and A4 print inspection of Unit 4 is still unperformed and needs a host where building and browsers are allowed.
  evidence: job:efmp-301-u04-repair_en, job:efmp-301-u04-illustrate
- [handoff] x1 recent, 2 total, since 2026-11-03: vosniadoun is no longer in unit n's sources table or coverage; re-binding it needs a longer excerpt plus both table and coverage rows.
  example: vosniadou2001 is no longer in Unit 4's sources table or coverage; re-binding it needs a longer excerpt plus both table and coverage rows.
  evidence: job:efmp-301-u04-repair_en, job:efmp-301-u04-illustrate
- [review] x1 recent, 2 total, since 2026-11-19: render-review tooling limitation
  example: render-review tooling limitation
  evidence: review:specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en-r1.json, review:specs/content/gcce-400/reviews/unit-03/G3/7558a5eb-ca9c-48c8-bdd0-b7deb07922bf.json
- [failure] x1 recent, 2 total, since 2026-11-23: the worker committed only a phr (<path>/); a job must produce its stage's work, and the crew writes the phr itself
  example: the worker committed only a PHR (history/prompts/); a job must produce its stage's work, and the crew writes the PHR itself
  evidence: job:efmp-407-u01-repair_en-r1-conflict1, job:gent-401-u05-author-conflict3
- [handoff] x1 recent, 1 total, since 2026-11-23: the rls red was a transient econnreset on an assertion call, not a content or policy failure; the same flake red <path> and <path> today, so those branches need
  example: The RLS red was a transient ECONNRESET on an assertion call, not a content or policy failure; the same flake red feat/032-slides and feat/figure-render-gate today, so those branches need this fix via 
  evidence: job:batch-20261123-1645-cifix1
- [handoff] x1 recent, 1 total, since 2026-11-23: test:rls could not be run locally (no .env.local); the retry was verified with a mocked fetch that throws econnreset once (n calls, success) and returns a n onc
  example: test:rls could not be run locally (no .env.local); the retry was verified with a mocked fetch that throws ECONNRESET once (2 calls, success) and returns a 401 once (1 call, no retry).
  evidence: job:batch-20261123-1645-cifix1
- [handoff] x1 recent, 1 total, since 2026-11-23: pr #n is content-only except glossary.json, which the ci.yml <code> regex does not classify as content, so content prs still run rls+ene; if the flake recurs, t
  example: PR #744 is content-only except glossary.json, which the ci.yml `changes` regex does not classify as content, so content PRs still run rls+e2e; if the flake recurs, that classifier is the lever.
  evidence: job:batch-20261123-1645-cifix1
- [cron] x1 recent, 1 total, since 2026-11-23: automatic merge failed; fix conflicts and then commit the result.
  example: Automatic merge failed; fix conflicts and then commit the result.
  evidence: cron.log
- [phr] x1 recent, 1 total, since 2026-11-23: failure modes observed: cross-course glossary matches; escaped closing backtick in a brief.
  example: failure modes observed: cross-course glossary matches; escaped closing backtick in a brief.
  evidence: phr:history/prompts/032-textbook-visuals/20261255-flashcards.green.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-23: next experiment (smallest change to try): show card counts per unit in the crew status.
  example: next experiment (smallest change to try): show card counts per unit in the crew status.
  evidence: phr:history/prompts/032-textbook-visuals/20261255-flashcards.green.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-23: failure modes observed: a tick that merges <path> with --no-edit leaves conflict markers and keeps running.
  example: failure modes observed: a tick that merges origin/main with --no-edit leaves conflict markers and keeps running.
  evidence: phr:history/prompts/general/20261256-crew-checkout-conflict-claude-crew-upstream.misc.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-23: next experiment (smallest change to try): tick.sh aborts the merge and alerts on conflict instead of leaving markers.
  example: next experiment (smallest change to try): tick.sh aborts the merge and alerts on conflict instead of leaving markers.
  evidence: phr:history/prompts/general/20261256-crew-checkout-conflict-claude-crew-upstream.misc.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-23: failure modes observed: shell-sourcing an env file with a malformed line echoes values.
  example: failure modes observed: shell-sourcing an env file with a malformed line echoes values.
  evidence: phr:history/prompts/032-textbook-visuals/20261254-self-check-server-marking.green.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-23: next experiment (smallest change to try): a ci job that re-imports when an assessment page changes.
  example: next experiment (smallest change to try): a CI job that re-imports when an assessment page changes.
  evidence: phr:history/prompts/032-textbook-visuals/20261254-self-check-server-marking.green.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-23: failure modes observed: an escaped closing backtick in a brief template; a test pinning every
  example: failure modes observed: an escaped closing backtick in a brief template; a test pinning every
  evidence: phr:history/prompts/032-textbook-visuals/20261253-animations-social-studio-refresh-stage.green.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-23: next experiment (smallest change to try): dry-run the planner with refresh on and list candidates.
  example: next experiment (smallest change to try): dry-run the planner with refresh on and list candidates.
  evidence: phr:history/prompts/032-textbook-visuals/20261253-animations-social-studio-refresh-stage.green.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-23: failure modes observed: a long caption over instagram's limit; headline cut on the card.
  example: failure modes observed: a long caption over Instagram's limit; headline cut on the card.
  evidence: phr:history/prompts/031-social-updates/20261252-descriptive-social-copy-full-titles.green.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-23: next experiment (smallest change to try): show the owner a rendered preview in the digest.
  example: next experiment (smallest change to try): show the owner a rendered preview in the digest.
  evidence: phr:history/prompts/031-social-updates/20261252-descriptive-social-copy-full-titles.green.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-23: failure modes observed: mirroring with a forgotten width; counter-transformed text; paint order;
  example: failure modes observed: mirroring with a forgotten width; counter-transformed text; paint order;
  evidence: phr:history/prompts/032-textbook-visuals/20261251-figure-defects-urdu-mirroring-invisible-labels.green.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-23: next experiment (smallest change to try): a gate that renders each figure and flags text whose
  example: next experiment (smallest change to try): a gate that renders each figure and flags text whose
  evidence: phr:history/prompts/032-textbook-visuals/20261251-figure-defects-urdu-mirroring-invisible-labels.green.prompt.md
- [review] x1 recent, 1 total, since 2026-11-23: article n was omitted from the constitution by the twenty-seventh amendment act, n (article n, effective n november n)
  example: Article 184 was omitted from the Constitution by the Twenty-seventh Amendment Act, 2025 (Article 29, effective 13 November 2025)
  evidence: review:specs/content/gcce-400/reviews/unit-03/G3/7558a5eb-ca9c-48c8-bdd0-b7deb07922bf.json
- [review] x1 recent, 1 total, since 2026-11-23: this independent review is advisory only
  example: This independent review is advisory only
  evidence: review:specs/content/gcce-400/reviews/unit-03/G3/7558a5eb-ca9c-48c8-bdd0-b7deb07922bf.json
- [review] x1 recent, 1 total, since 2026-11-23: constitutional currency
  example: Constitutional currency
  evidence: review:specs/content/gcce-400/reviews/unit-03/G3/52caad24-9ea1-412b-918e-0ec74d99f5d0.json

Follow `.claude/skills/intel-distill/SKILL.md` exactly; read it and every file it references before starting.

## Scope
`specs/intelligence/daily/2026-11-25.md` only.

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
- (intel-2026-11-24-distill, intel_distill, agy) gcce-400-u07-author remains pinned in reap with 101 ENOENT cron errors; lead or owner must release or reap it by hand.
- (intel-2026-11-24-distill, intel_distill, agy) EFMP-406 and EFMP-407 teaser scripts currently omit objectives because parseOverview in describe.mjs requires ## Course learning outcomes.
- (intel-2026-11-23-distill, intel_distill, claude) gcce-400-u07-author has been stuck `running` since 2026-11-22 12:47Z because its worktree has no `.crew/brief.md`; its finished Unit 7 needs the lead to release it (for example restore the brief file or reap it by hand).
- (intel-2026-11-22-distill, intel_distill, agy) Live checkpoint for gflow submission journal recovery awaits the owner reverse tunnel on port 18801.
- (intel-2026-11-21-distill, intel_distill, agy) GFlow tool errors during clip generation can leave remote clips rendered and billed while structlog TypeError masks the error; recover over port 18801 before retrying.


## Response snapshot

Distilled 10 reusable intelligence candidates and adopted effect tracking for 2026-11-25 into specs/intelligence/daily/2026-11-25.md, passing all 14 content gates and 186 crew unit tests.

## Outcome

- Impact: intel_distill for INTEL Unit 0 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Distilled 10 reusable intelligence candidates and adopted effect tracking for 2026-11-25 into specs/intelligence/daily/2026-11-25.md, passing all 14 content gates and 186 crew unit tests.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - gcce-400-u07-author remains pinned in reap with 101 ENOENT cron errors; lead or owner must release or reap it by hand.
  - Root glossary.json edits trigger full RLS and Playwright suites in CI until ci.yml classifies glossary.json as content.
  - G3 render inspection against candidate branches continues to force escalate verdicts until render-inspect or review-unit permits advisory recording for unmerged assets.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
