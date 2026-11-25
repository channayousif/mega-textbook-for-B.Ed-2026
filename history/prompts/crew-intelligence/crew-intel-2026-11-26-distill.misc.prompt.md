---
id: crew-intel-2026-11-26-distill
title: crew intel_distill INTEL unit 0
stage: misc
date: 2026-11-25
surface: agent
model: agy
feature: crew-intelligence
branch: crew/intel-2026-11-26-distill
user: crew
command: crew intel_distill
labels: ["crew", "agy", "intel_distill"]
links:
  spec: specs/intelligence/registry.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/intelligence/daily/2026-11-26.md
tests:
 - npm run check:content
---

## Prompt

# Crew job intel-2026-11-26-distill

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/intel-2026-11-26-distill`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, and never touch course content (`docs/`, `licence/`, the Urdu docs trees,
`specs/content/`, `static/img/figures/`, `glossary.json`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.

## Task
Distil today's reusable intelligence (intel-distill skill) into `specs/intelligence/daily/2026-11-26.md`. These clusters grew in the last 24 hours (kind, recent count, total, signature, an example, evidence):

- [failure] x8 recent, 173 total, since 2026-10-28: left out of the batch: <path> conflicts with main (<path>).; merge fix queued
  example: left out of the batch: crew/gnas-301-u04-review_en conflicts with main (specs/content/gnas-301/tasks.md).; merge fix queued
  evidence: job:efmp-408-u02-author, job:efmp-408-u05-author, job:efmp-301-u03-flashcards
- [failure] x8 recent, 36 total, since 2026-10-19: left out of the batch: merged onto main's latest state, <path> fails npm run check:content (it could not join the hourly batch):; merge fix queued
  example: left out of the batch: Merged onto main's latest state, crew/efmp-302-u02-repair_en fails npm run check:content (it could not join the hourly batch):; merge fix queued
  evidence: job:efmp-409-u03-author, job:efmp-409-u04-author, job:efmp-409-u05-author
- [review] x5 recent, 9 total, since 2026-11-24: render and print inspection (npx viewport, table scrolling, desktop layout, an print, figure clipping) could not be performed
  example: Render and print inspection (360px viewport, table scrolling, desktop layout, A4 print, figure clipping) could not be performed
  evidence: review:specs/content/efmp-408/reviews/unit-02/G3/agy-run1-20261125.json, review:specs/content/efmp-304/reviews/unit-06/G3/agy-cycle2-20261125.json, review:specs/content/efmp-304/reviews/unit-05/G3/agy-cycle2-20261125.json
- [handoff] x4 recent, 4 total, since 2026-11-24: <code> also edits <code> (unit n rows), so its next merge will conflict on that file again.
  example: `crew/efmp-408-u02-author` also edits `specs/content/efmp-408/tasks.md` (Unit 2 rows), so its next merge will conflict on that file again.
  evidence: job:efmp-408-u04-author-conflict3, job:efmp-408-u04-author-conflict4, job:efmp-408-u04-author-conflict5
- [failure] x3 recent, 26 total, since 2026-10-28: left out of the batch: <path> conflicts with main (<path>, <path>).; merge fix queued
  example: left out of the batch: crew/efmp-301-u05-review_en conflicts with main (specs/content/efmp-301/tasks.md, static/content-status.json).; merge fix queued
  evidence: job:gent-401-u07-author, job:efmp-408-u04-author, job:efmp-409-u04-author
- [failure] x3 recent, 5 total, since 2026-11-23: the worker committed only a phr (<path>/); a job must produce its stage's work, and the crew writes the phr itself
  example: the worker committed only a PHR (history/prompts/); a job must produce its stage's work, and the crew writes the PHR itself
  evidence: job:efmp-407-u01-repair_en-r1-conflict1, job:gent-401-u05-author-conflict3, job:efmp-301-u04-studio_media
- [handoff] x3 recent, 3 total, since 2026-11-24: unit n gn urdu translation and independent <path> review are still open; banner fig-un-n stays prompt-only for the illustrate job.
  example: Unit 2 G4 Urdu translation and independent G3/G5 review are still open; banner fig-U2-7 stays prompt-only for the illustrate job.
  evidence: job:efmp-408-u02-author-conflict2, job:efmp-408-u02-author-conflict3, job:efmp-408-u02-author-conflict5
- [handoff] x3 recent, 3 total, since 2026-11-25: unit n gn english review and gn urdu review remain open; translation_status stays draft in both index.mdx files pending independent gn acceptance.
  example: Unit 2 G3 English review and G5 Urdu review remain open; translation_status stays draft in both index.mdx files pending independent G5 acceptance.
  evidence: job:efmp-408-u02-translate, job:efmp-408-u02-illustrate, job:efmp-408-u06-illustrate
- [review] x2 recent, 5 total, since 2026-10-28: mcq option key clustering
  example: MCQ option key clustering
  evidence: review:specs/content/efmp-301/reviews/unit-07/G3/agy-cycle2-20261124.json, review:specs/content/efmp-303/reviews/unit-06/G3/agy-cycle2-20261125.json, review:specs/content/efmp-304/reviews/unit-06/G3/agy-cycle2-20261125.json
- [handoff] x2 recent, 2 total, since 2026-11-24: banner figure fig-un-n remains prompt-only in <path> awaiting raster asset production.
  example: Banner figure fig-U3-9 remains prompt-only in specs/content/efmp-408/figures/unit-03.banner.md awaiting raster asset production.
  evidence: job:efmp-408-u03-author, job:efmp-408-u02-translate
- [handoff] x2 recent, 2 total, since 2026-11-24: unit n is still english-only at <code> with <path> open, and the banner <code> remains <code> for the illustrate job.
  example: Unit 4 is still English-only at `translation_status: draft` with G3/G5 open, and the banner `fig-U4-4` remains `prompt-only` for the illustrate job.
  evidence: job:efmp-408-u04-author-conflict2, job:efmp-408-u04-author-conflict3
- [handoff] x2 recent, 2 total, since 2026-11-24: unit n is still english-only at <code> with <path> open, and banner <code> remains <code> for the illustrate job.
  example: Unit 4 is still English-only at `translation_status: draft` with G3/G5 open, and banner `fig-U4-4` remains `prompt-only` for the illustrate job.
  evidence: job:efmp-408-u04-author-conflict4, job:efmp-408-u04-author-conflict5
- [handoff] x2 recent, 2 total, since 2026-11-25: unit n <path> stay open; gn still owes the motivation urdu term call (محرک vs حوصلہ) and the topic-n بیساکی / بیساکھی typo check.
  example: Unit 3 G3/G5 stay open; G5 still owes the Motivation Urdu term call (محرک vs حوصلہ) and the topic-04 بیساکی / بیساکھی typo check.
  evidence: job:efmp-301-u03-flashcards-conflict1, job:efmp-301-u03-flashcards-conflict2
- [handoff] x2 recent, 2 total, since 2026-11-25: gn remains advisory (cycle n of n, disposition escalate, reviewer token agent:gn-reviewer); no certification or tracker tick was performed.
  example: G3 remains advisory (cycle 2 of 2, disposition escalate, reviewer token agent:g3-reviewer); no certification or tracker tick was performed.
  evidence: job:efmp-304-u05-review_en, job:efmp-304-u06-review_en
- [handoff] x2 recent, 2 total, since 2026-11-25: unit n gn en-review and gn ur-review rows remain open and require fresh independent review runs following figure placements.
  example: Unit 6 G3 en-review and G5 ur-review rows remain open and require fresh independent review runs following figure placements.
  evidence: job:efmp-304-u06-illustrate, job:efmp-408-u01-illustrate
- [handoff] x2 recent, 2 total, since 2026-11-25: all unit n figures (schematic svgs fig-un-n through fig-un-n and banner raster fig-un-n) are placed in both english and urdu mirrors.
  example: All Unit 2 figures (schematic SVGs fig-U2-1 through fig-U2-6 and banner raster fig-U2-7) are placed in both English and Urdu mirrors.
  evidence: job:efmp-408-u02-illustrate, job:efmp-408-u06-illustrate
- [handoff] x2 recent, 2 total, since 2026-11-25: gn gate evidence for unit n refreshed to ntnz-gates.json with full logs committed.
  example: G2 gate evidence for Unit 3 refreshed to 20261125T142256890Z-gates.json with full logs committed.
  evidence: job:efmp-408-u03-illustrate, job:efmp-408-u05-illustrate
- [handoff] x2 recent, 2 total, since 2026-11-25: banner figure fig-un-n is placed in english and urdu index.mdx; unit n gn review and gn review remain open for independent evaluation.
  example: Banner figure fig-U3-9 is placed in English and Urdu index.mdx; Unit 3 G3 review and G5 review remain open for independent evaluation.
  evidence: job:efmp-408-u03-illustrate, job:efmp-408-u05-illustrate
- [handoff] x2 recent, 2 total, since 2026-11-25: ci's figure-geometry job still has to confirm on pr #n, though the local <code> run is the same measurement and exits n.
  example: CI's figure-geometry job still has to confirm on PR #792, though the local `--ci-fonts --changed origin/main` run is the same measurement and exits 0.
  evidence: job:batch-20261125-1216-cifix1, job:batch-20261125-1431-cifix1
- [failure] x1 recent, 61 total, since 2026-10-19: the worker exited without committing any change
  example: the worker exited without committing any change
  evidence: job:batch-20261110-1201-cifix1, job:efpg-401-u01-plan_illustrations, job:efmp-409-u03-author-conflict1
- [failure] x1 recent, 16 total, since 2026-10-19: could not join a batch after n merge fixes
  example: could not join a batch after 5 merge fixes
  evidence: job:efpg-401-u03-author, job:efpg-401-u05-author, job:efmp-408-u04-author
- [failure] x1 recent, 5 total, since 2026-10-28: left out of the batch: <path> conflicts with main (glossary.json, <path>).; merge fix queued
  example: left out of the batch: crew/gpks-402-u06-author conflicts with main (glossary.json, specs/content/gpks-402/tasks.md).; merge fix queued
  evidence: job:efpg-401-u07-author, job:gcce-400-u06-author, job:efmp-408-u04-author
- [review] x1 recent, 3 total, since 2026-10-19: further reading sections list khan (n) which content-spec replaced with gem-reportn (unresolvable)
  example: Further reading sections list Khan (2018) which content-spec replaced with gem-report2020 (unresolvable)
  evidence: review:specs/content/efmp-303/reviews/unit-06/G3/20261018T200000000Z.json, review:specs/content/efmp-303/reviews/unit-06/G3/20261102T140729Z-g3-desk-218f29ab.json, review:specs/content/efmp-303/reviews/unit-06/G3/agy-cycle2-20261125.json
- [cron] x1 recent, 2 total, since 2026-11-05: notify discord failed:
  example: notify discord failed:
  evidence: cron.log
- [review] x1 recent, 2 total, since 2026-11-24: in <path>:n-n, mcq correct keys are distributed as a
  example: In docs/semester-4/gcce-400/unit-06/unit-assessment.mdx:30-81, MCQ correct keys are distributed as A
  evidence: review:specs/content/gcce-400/reviews/unit-06/G3/agy-run1-20261124.json, review:specs/content/efmp-408/reviews/unit-02/G3/agy-run1-20261125.json
- [handoff] x1 recent, 1 total, since 2026-11-24: unit n gn review and urdu translation (gn) stages remain open in <path>
  example: Unit 3 G3 review and Urdu translation (G4) stages remain open in specs/content/efmp-408/tasks.md.
  evidence: job:efmp-408-u03-author
- [handoff] x1 recent, 1 total, since 2026-11-24: unit n is english-only at <code>; <path> are open and uncertified, and the banner <code> is still <code> for the illustrate job.
  example: Unit 4 is English-only at `translation_status: draft`; G3/G5 are open and uncertified, and the banner `fig-U4-4` is still `prompt-only` for the illustrate job.
  evidence: job:efmp-408-u04-author
- [handoff] x1 recent, 1 total, since 2026-11-24: the shared seifert and sutton evidence note gained its unit n use, which invalidated unit n's accepted gn manifest, so unit n's evidence was refreshed and its t
  example: The shared Seifert and Sutton evidence note gained its Unit 4 use, which invalidated Unit 1's accepted G2 manifest, so Unit 1's evidence was refreshed and its tracker row repointed; a later merge of t
  evidence: job:efmp-408-u04-author
- [phr] x1 recent, 1 total, since 2026-11-24: failure modes observed: hourly hold reset earlier than the gap (fixed); worktree without node_modules made unrelated crew tests fail (environment only).
  example: failure modes observed: hourly hold reset earlier than the gap (fixed); worktree without node_modules made unrelated crew tests fail (environment only).
  evidence: phr:history/prompts/030-media-studio/20261262-media-pacing-office-hours-caps.green.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-24: next experiment (smallest change to try): show <code> in board.md so held media jobs explain themselves.
  example: next experiment (smallest change to try): show `pacing.mjs status` in BOARD.md so held media jobs explain themselves.
  evidence: phr:history/prompts/030-media-studio/20261262-media-pacing-office-hours-caps.green.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-24: failure modes observed: default node heap oom in <code>; background jobs dying with the session (fixed by <code>); <code> patterns matching their own wrapper.
  example: failure modes observed: default Node heap OOM in `docusaurus build`; background jobs dying with the session (fixed by `setsid nohup`); `pkill -f` patterns matching their own wrapper.
  evidence: phr:history/prompts/011-dashboard-redesign/20261263-dashboard-e2e-specs-and-fixes.green.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-24: next experiment (smallest change to try): add <code> to <code> itself so every local build has the heap it needs.
  example: next experiment (smallest change to try): add `NODE_OPTIONS=--max-old-space-size=4096` to `npm run build` itself so every local build has the heap it needs.
  evidence: phr:history/prompts/011-dashboard-redesign/20261263-dashboard-e2e-specs-and-fixes.green.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-24: failure modes observed: debian tigervnc ignored <code> (exit n); gflow login timed out when only google was signed in; flow signed in inside the workspace chrom
  example: failure modes observed: Debian tigervnc ignored `~/.config/tigervnc` (exit 1); gflow login timed out when only Google was signed in; Flow signed in inside the workspace Chrome does not create a gflow 
  evidence: phr:history/prompts/030-media-studio/20261261-davinci-media-desktop-gflow-nlm-meta.green.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-24: next experiment (smallest change to try): a crew health line that calls <code> (not just a port probe) and alerts when the flow session expires.
  example: next experiment (smallest change to try): a crew health line that calls `gflow_auth_status` (not just a port probe) and alerts when the Flow session expires.
  evidence: phr:history/prompts/030-media-studio/20261261-davinci-media-desktop-gflow-nlm-meta.green.prompt.md
- [handoff] x1 recent, 1 total, since 2026-11-25: the register repair list in the gn report json for <course> unit n still needs a translator pass (<path> terminology alignment).
  example: The register repair list in the G5 report JSON for EFMP-303 Unit 6 still needs a translator pass (fig-U6-3/4/6.ur.svg terminology alignment).
  evidence: job:efmp-303-u06-illustrate
- [handoff] x1 recent, 1 total, since 2026-11-25: next gn review needs browser inspection across all six urdu pages and n urdu svg variants, plus a signed gn or owner path for human cmy gn.
  example: Next G5 review needs browser inspection across all six Urdu pages and 12 Urdu SVG variants, plus a signed G3 or owner path for human CMY G3.
  evidence: job:efmp-303-u06-illustrate
- [handoff] x1 recent, 1 total, since 2026-11-24: unit n gn still needs a fresh independent run that covers the redrawn figures (tasks.md line n already asks for one).
  example: Unit 9 G3 still needs a fresh independent run that covers the redrawn figures (tasks.md line 179 already asks for one).
  evidence: job:efmp-301-u09-refresh_figures
- [handoff] x1 recent, 1 total, since 2026-11-24: in fig-un-n urdu, the label under the dashed arrow sits just clear of the curve; a reviewer may want to check it at mobile width.
  example: In fig-U9-5 Urdu, the label under the dashed arrow sits just clear of the curve; a reviewer may want to check it at mobile width.
  evidence: job:efmp-301-u09-refresh_figures
- [handoff] x1 recent, 1 total, since 2026-11-25: the urdu card "iq (ذہانت کا خارج قسمت)" corrects the urdu topic's garbled "خارج قسمے" wording. the topic file itself still has the garbled text, which gn should
  example: The Urdu card "IQ (ذہانت کا خارج قسمت)" corrects the Urdu topic's garbled "خارج قسمے" wording. The topic file itself still has the garbled text, which G5 should check.
  evidence: job:efmp-301-u05-flashcards
- [handoff] x1 recent, 1 total, since 2026-11-25: i didn't use the <code> pair "accommodation" → سہولت کاری, because it is an <course> access sense. topic n.n uses "accommodation" for matching a pupil's skill l
  example: I didn't use the `terminology.csv` pair "Accommodation" → سہولت کاری, because it is an EFMP-305 access sense. Topic 5.2 uses "accommodation" for matching a pupil's skill level and writes it as سہارا.
  evidence: job:efmp-301-u05-flashcards

Follow `.claude/skills/intel-distill/SKILL.md` exactly; read it and every file it references before starting.

## Scope
`specs/intelligence/daily/2026-11-26.md` only.

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
- (intel-2026-11-25-distill, intel_distill, agy) gcce-400-u07-author remains pinned in reap with 101 ENOENT cron errors; lead or owner must release or reap it by hand.
- (intel-2026-11-25-distill, intel_distill, agy) Root glossary.json edits trigger full RLS and Playwright suites in CI until ci.yml classifies glossary.json as content.
- (intel-2026-11-25-distill, intel_distill, agy) G3 render inspection against candidate branches continues to force escalate verdicts until render-inspect or review-unit permits advisory recording for unmerged assets.
- (intel-2026-11-24-distill, intel_distill, agy) gcce-400-u07-author remains pinned in reap with 101 ENOENT cron errors; lead or owner must release or reap it by hand.
- (intel-2026-11-24-distill, intel_distill, agy) EFMP-406 and EFMP-407 teaser scripts currently omit objectives because parseOverview in describe.mjs requires ## Course learning outcomes.


## Response snapshot

Distilled 10 reusable intelligence candidates for 2026-11-26 into specs/intelligence/daily/2026-11-26.md with root cause analysis, evidence links and effect measurements.

## Outcome

- Impact: intel_distill for INTEL Unit 0 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Distilled 10 reusable intelligence candidates for 2026-11-26 into specs/intelligence/daily/2026-11-26.md with root cause analysis, evidence links and effect measurements.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - In `scripts/crew/batch.mjs` (`trackerLines`), status block parsing consumes until the next `## ` heading; adding `## Units` to `specs/content/efmp-409/tasks.md` or terminating status blocks before table rows will stop `mergeTrackerRows` from dropping newly added unit rows.
  - G3 review render inspection against production continues to force `escalate` dispositions on candidate branches until `render-inspect.mjs` or `review-unit` treats unmerged assets as advisory limitations.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
