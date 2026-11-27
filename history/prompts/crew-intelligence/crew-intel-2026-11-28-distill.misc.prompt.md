---
id: crew-intel-2026-11-28-distill
title: crew intel_distill INTEL unit 0
stage: misc
date: 2026-11-27
surface: agent
model: agy2
feature: crew-intelligence
branch: crew/intel-2026-11-28-distill
user: crew
command: crew intel_distill
labels: ["crew", "agy2", "intel_distill"]
links:
  spec: specs/intelligence/registry.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/intelligence/daily/2026-11-28.md
tests:
 - npm run check:content
---

## Prompt

# Crew job intel-2026-11-28-distill

You are the agy2 worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/intel-2026-11-28-distill`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, and never touch course content (`docs/`, `licence/`, the Urdu docs trees,
`specs/content/`, `static/img/figures/`, `glossary.json`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.

## Task
Distil today's reusable intelligence (intel-distill skill) into `specs/intelligence/daily/2026-11-28.md`. These clusters grew in the last 24 hours (kind, recent count, total, signature, an example, evidence):

- [failure] x8 recent, 103 total, since 2026-10-17: ✗ pipeline gate failed with n finding(s):
  example: ✗ Pipeline gate failed with 1 finding(s):
  evidence: job:efpg-402-u06-translate, job:efpg-402-u07-translate, job:efpg-402-u08-translate
- [review] x6 recent, 18 total, since 2026-11-24: render and print inspection (npx viewport, table scrolling, desktop layout, an print, figure clipping) could not be performed
  example: Render and print inspection (360px viewport, table scrolling, desktop layout, A4 print, figure clipping) could not be performed
  evidence: review:specs/content/efpg-402/reviews/unit-03/G3/3043d3cb-2c9a-4666-bb72-3769cdb90044.json, review:specs/content/efpg-402/reviews/unit-01/G3/e9bd17ee-cecf-4f54-9149-3a5da9b53668.json, review:specs/content/efpc-411/reviews/unit-03/G3/crew-efpc-411-u03-review_en-r1.json
- [failure] x3 recent, 177 total, since 2026-10-28: left out of the batch: <path> conflicts with main (<path>).; merge fix queued
  example: left out of the batch: crew/gnas-301-u04-review_en conflicts with main (specs/content/gnas-301/tasks.md).; merge fix queued
  evidence: job:social-2026-11-26-roundup, job:efmp-301-u07-flashcards, job:efmp-301-u08-flashcards
- [review] x3 recent, 5 total, since 2026-11-24: in <path>:n-n, mcq correct keys are distributed as a
  example: In docs/semester-4/gcce-400/unit-06/unit-assessment.mdx:30-81, MCQ correct keys are distributed as A
  evidence: review:specs/content/gent-401/reviews/unit-03/G3/crew-gent-401-u03-review_en.json, review:specs/content/efpg-402/reviews/unit-01/G3/e9bd17ee-cecf-4f54-9149-3a5da9b53668.json, review:specs/content/efpc-411/reviews/unit-02/G3/cbe2e670-0dc7-446a-a8e2-b41ac6087cdb.json
- [handoff] x2 recent, 4 total, since 2026-11-26: unit banner fig-un-n is placed; unit n gn review and gn review remain open for independent evaluation.
  example: Unit banner fig-U5-7 is placed; Unit 5 G3 review and G5 review remain open for independent evaluation.
  evidence: job:gent-401-u02-illustrate, job:gent-401-u03-illustrate, job:gent-401-u05-illustrate
- [review] x2 recent, 3 total, since 2026-11-26: render and print inspection unavailable
  example: Render and print inspection unavailable
  evidence: review:specs/content/efmp-409/reviews/unit-01/G3/crew-efmp-409-u01-review_en-r1.json, review:specs/content/gent-401/reviews/unit-05/G3/crew-gent-401-u05-review_en-r1.json, review:specs/content/gent-401/reviews/unit-01/G3/crew-gent-401-u01-review_en-r1.json
- [handoff] x2 recent, 2 total, since 2026-11-26: advisory tracker row prepared in <path><sha><path>; gn remains open pending parent integration.
  example: Advisory tracker row prepared in specs/content/gent-401/reviews/unit-02/G3/agy-run1-20261127/advisory-tracker-row.md; G3 remains open pending parent integration.
  evidence: job:gent-401-u02-review_en, job:gict-300-u01-review_en
- [handoff] x2 recent, 2 total, since 2026-11-26: unit n banner fig-un-n is placed with gflow; gn en-review and gn ur-review remain open for independent evaluation.
  example: Unit 4 banner fig-U4-5 is placed with gflow; G3 en-review and G5 ur-review remain open for independent evaluation.
  evidence: job:gent-401-u04-illustrate, job:gent-401-u06-illustrate
- [review] x2 recent, 2 total, since 2026-11-27: reviewer confirmed source citations
  example: Reviewer confirmed source citations
  evidence: review:specs/content/gent-401/reviews/unit-02/G3/agy-run1-20261127.json, review:specs/content/efpg-402/reviews/unit-03/G3/3043d3cb-2c9a-4666-bb72-3769cdb90044.json
- [handoff] x2 recent, 2 total, since 2026-11-27: urdu mirror job (gn) will need to localize the n placed svgs (.ur.svg pairs) and translate the seven unit files.
  example: Urdu mirror job (G4) will need to localize the 10 placed SVGs (.ur.svg pairs) and translate the seven unit files.
  evidence: job:efpg-402-u04-author, job:efpg-402-u08-author
- [handoff] x2 recent, 2 total, since 2026-11-27: banner illustration fig-un-n remains prompt-only in <path> for the illustrate crew job.
  example: Banner illustration fig-U7-11 remains prompt-only in figures/unit-07.banner.md for the illustrate crew job.
  evidence: job:efpg-402-u07-author, job:efpg-402-u07-translate
- [handoff] x2 recent, 2 total, since 2026-11-27: independent qualified gn english review remains open in tasks.md.
  example: Independent qualified G3 English review remains open in tasks.md.
  evidence: job:efpg-402-u07-author, job:efpg-402-u07-translate
- [handoff] x2 recent, 2 total, since 2026-11-27: ci's figure-geometry job must re-run on pr #n to confirm; the local <code> run is the same measurement and exits n.
  example: CI's figure-geometry job must re-run on PR #931 to confirm; the local `--ci-fonts --changed c8efed9...` run is the same measurement and exits 0.
  evidence: job:batch-20261127-1300-cifix1, job:batch-20261127-1517-cifix1
- [failure] x1 recent, 27 total, since 2026-10-28: left out of the batch: <path> conflicts with main (<path>, <path>).; merge fix queued
  example: left out of the batch: crew/efmp-301-u05-review_en conflicts with main (specs/content/efmp-301/tasks.md, static/content-status.json).; merge fix queued
  evidence: job:efmp-408-u04-author, job:efmp-409-u04-author, job:efpg-402-u05-author
- [log-error] x1 recent, 6 total, since 2026-10-21: agy_error: {"short_error":"resource_exhausted (code n): individual quota reached. please upgrade your subscription to increase your limits. resets in nhnmns.","
  example: AGY_ERROR: {"short_error":"RESOURCE_EXHAUSTED (code 429): Individual quota reached. Please upgrade your subscription to increase your limits. Resets in 63h26m50s.","status":"RESOURCE_EXHAUSTED","error
  evidence: log:gsos-301-u04-review_en.1.log, log:efmp-301-u02-plan_illustrations.1.log, log:efmp-301-u05-slides.1.log
- [review] x1 recent, 3 total, since 2026-10-28: mcq key clustering
  example: MCQ key clustering
  evidence: review:specs/content/efmp-301/reviews/unit-10/G3/agent-g3-efmp301-u10-run002.json, review:specs/content/efmp-301/reviews/unit-10/G3/20261102T140729Z-g3-desk-2aa34b72.json, review:specs/content/efpc-411/reviews/unit-03/G3/crew-efpc-411-u03-review_en-r1.json
- [phr] x1 recent, 3 total, since 2026-11-11: next experiment (smallest change to try): confirm pr #n ci passes.
  example: next experiment (smallest change to try): Confirm PR #539 CI passes.
  evidence: phr:history/prompts/general/20261193-fix-pr539-urdu-figure-geometry.general.prompt.md, phr:history/prompts/general/20261215-fix-pr642-urdu-figure-geometry.general.prompt.md, phr:history/prompts/general/20261303-efpg402-u02-fig-ur-label-fix.general.prompt.md
- [review] x1 recent, 2 total, since 2026-11-02: carried unresolved from run n
  example: Carried unresolved from run 001
  evidence: review:specs/content/gict-300/reviews/unit-01/G3/20261102T140729Z-g3-desk-a27dc6a2.json, review:specs/content/gict-300/reviews/unit-01/G3/agy-cycle2-20261127.json
- [log-error] x1 recent, 2 total, since 2026-11-12: error: individual quota reached. please upgrade your subscription to increase your limits. resets in nhnmns. (response may be truncated)
  example: error: Individual quota reached. Please upgrade your subscription to increase your limits. Resets in 161h27m31s. (response may be truncated)
  evidence: log:efmp-301-u02-plan_illustrations.1.log, log:efmp-301-u05-slides.1.log
- [handoff] x1 recent, 2 total, since 2026-11-22: all three raster illustrations (unit banner fig-un-n, topic scenes fig-un-n and fig-un-n) were generated via gflow, inspected, accepted, placed with zero em das
  example: All three raster illustrations (unit banner fig-U2-5, topic scenes fig-U2-6 and fig-U2-7) were generated via gflow, inspected, accepted, placed with zero em dashes, and validated across all 14 content
  evidence: job:gqur-301-u02-illustrate, job:gqur-301-u07-illustrate
- [handoff] x1 recent, 2 total, since 2026-11-24: translation_status remains draft across both index.mdx files pending independent gn review.
  example: translation_status remains draft across both index.mdx files pending independent G5 review.
  evidence: job:gent-401-u05-translate, job:gent-401-u05-illustrate
- [review] x1 recent, 2 total, since 2026-11-26: residual mcq option-length cue (unit-assessment.mdx:n-n)
  example: Residual MCQ option-length cue (unit-assessment.mdx:34-83)
  evidence: review:specs/content/efmp-409/reviews/unit-01/G3/crew-efmp-409-u01-review_en-r1.json, review:specs/content/geng-301/reviews/unit-04/G3/crew-geng-301-u04-review_en-r2.json
- [phr] x1 recent, 1 total, since 2026-11-26: failure modes observed: two inaccurate first-draft descriptions, fixed before commit.
  example: failure modes observed: two inaccurate first-draft descriptions, fixed before commit.
  evidence: phr:history/prompts/034-backlog-tracking/20261284-guide-page-descriptions.green.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-26: failure modes observed: the notebooklm session obtained with nlm login --provider openclaw expires after a few minutes, and the notebooklm-mcp server caches its
  example: failure modes observed: The NotebookLM session obtained with nlm login --provider openclaw expires after a few minutes, and the notebooklm-mcp server caches its client, so every MCP call needs a fresh
  evidence: phr:history/prompts/030-media-studio/20261282-geng-300-unit-1-study-studio-media.green.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-26: next experiment (smallest change to try): have the notebooklm-mcp client reload on an auth-file mtime change, or record that a crew run must call refresh_auth a
  example: next experiment (smallest change to try): Have the notebooklm-mcp client reload on an auth-file mtime change, or record that a crew run must call refresh_auth after every nlm login.
  evidence: phr:history/prompts/030-media-studio/20261282-geng-300-unit-1-study-studio-media.green.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-26: failure modes observed: the mcp <code> <code> parameter is advertised as an array but the server serialises it to one comma-split string, so the tags land mangl
  example: failure modes observed: the MCP `upload_video` `tags` parameter is advertised as an array but the server serialises it to one comma-split string, so the tags land mangled and need a 50-unit `yt-descri
  evidence: phr:history/prompts/030-media-studio/20261281-efmp301-u4-studio-media-ur-audio-uploaded.green.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-26: next experiment (smallest change to try): have <code> emit the mcp's real field names (<code>, <code>, comma-joined <code>) so the upload call needs no translat
  example: next experiment (smallest change to try): have `youtube-meta.mjs` emit the MCP's real field names (`status`, `video_language`, comma-joined `tags`) so the upload call needs no translation and the tag 
  evidence: phr:history/prompts/030-media-studio/20261281-efmp301-u4-studio-media-ur-audio-uploaded.green.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-26: failure modes observed: the four playlist ids differ only slightly (<code> vs a dropped l) and a mistyped id surfaces as a n <code> on <code>, after the upload 
  example: failure modes observed: the four playlist ids differ only slightly (`PLLdTwYdZvUFc` vs a dropped L) and a mistyped id surfaces as a 404 `playlistNotFound` on `update_video`, after the upload already s
  evidence: phr:history/prompts/030-media-studio/20261274-efmp301-u4-studio-media-en-audio-uploaded.green.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-26: next experiment (smallest change to try): have <code> read the playlist id from a single channel-facts constant so a hand-copied id cannot be mistyped.
  example: next experiment (smallest change to try): have `youtube-meta.mjs` read the playlist id from a single channel-facts constant so a hand-copied id cannot be mistyped.
  evidence: phr:history/prompts/030-media-studio/20261274-efmp301-u4-studio-media-en-audio-uploaded.green.prompt.md
- [handoff] x1 recent, 1 total, since 2026-11-27: the "slow learner" card uses the terminology.csv term کمزور متعلم, while urdu topic n.n says سست سیکھنے والا and teaches that slow is not weak; this is the conf
  example: The "Slow Learner" card uses the terminology.csv term کمزور متعلم, while Urdu topic 7.2 says سست سیکھنے والا and teaches that slow is not weak; this is the conflict already escalated to the owner.
  evidence: job:efmp-301-u07-flashcards
- [handoff] x1 recent, 1 total, since 2026-11-27: the "individual differences" card uses the terminology.csv term انفرادی اختلافات, which urdu topic n.n shows only through the glossary tag; a gn review may chec
  example: The "Individual Differences" card uses the terminology.csv term انفرادی اختلافات, which Urdu topic 7.1 shows only through the Glossary tag; a G5 review may check it.
  evidence: job:efmp-301-u07-flashcards
- [handoff] x1 recent, 1 total, since 2026-11-27: <code> rewrites tracked, git-ignored files under <code> for other courses; restore them before committing.
  example: `build-studio-index` rewrites tracked, git-ignored files under `static/studio/flashcards/` for other courses; restore them before committing.
  evidence: job:efmp-301-u07-flashcards
- [handoff] x1 recent, 1 total, since 2026-11-27: the urdu mirrors of topics n.n to n.n use "کاؤنٹرائزنگ" for "management" throughout the body text, not only in the figure description; the deck avoids it, and a
  example: The Urdu mirrors of topics 8.1 to 8.3 use "کاؤنٹرائزنگ" for "management" throughout the body text, not only in the figure description; the deck avoids it, and a G5 or translation job should fix the to
  evidence: job:efmp-301-u08-flashcards
- [handoff] x1 recent, 1 total, since 2026-11-27: <code> is git-ignored but n files under it are still tracked, so <code> dirties other courses' files; restore them before committing.
  example: `static/studio/flashcards/` is git-ignored but 61 files under it are still tracked, so `build-studio-index.mjs` dirties other courses' files; restore them before committing.
  evidence: job:efmp-301-u08-flashcards
- [handoff] x1 recent, 1 total, since 2026-11-27: unit n needs a fresh gn run; the gn reviewer should check the redrawn urdu svgs, including numeral order such as "n تا n تا n تا n".
  example: Unit 1 needs a fresh G3 run; the G5 reviewer should check the redrawn Urdu SVGs, including numeral order such as "5 تا 3 تا 2 تا 2".
  evidence: job:efmp-303-u01-refresh_figures
- [handoff] x1 recent, 1 total, since 2026-11-27: fig-un-n's main connectors are now double-headed to match its alt text; reviewers should confirm that reading.
  example: fig-U1-4's main connectors are now double-headed to match its alt text; reviewers should confirm that reading.
  evidence: job:efmp-303-u01-refresh_figures
- [handoff] x1 recent, 1 total, since 2026-11-27: svg text in <code> files needs <code> around labels that start with a number or end with punctuation, or they display in the wrong order.
  example: SVG text in `.ur.svg` files needs `&#x200F;` around labels that start with a number or end with punctuation, or they display in the wrong order.
  evidence: job:efmp-303-u01-refresh_figures
- [handoff] x1 recent, 1 total, since 2026-11-26: youtube.upload is at its hourly cap of n; next allowed n-n-ntn:n:nz (n a day). remaining qan-pass items for the next media-hours run: tn-en-video, tn-en-audio-p
  example: youtube.upload is at its hourly cap of 1; next allowed 2026-11-26T20:22:25Z (4 a day). Remaining qa2-pass items for the next media-hours run: t2-en-video, t3-en-audio-p1 (audio playlist PLLdTwYdZvUFc)
  evidence: job:geng-300-u01-studio_media-r1
- [handoff] x1 recent, 1 total, since 2026-11-26: tn-en-audio-pn is private at qan-pass (<url> the tn items frenstwn_nc and enynnsbfvio now list as public on the channel although the ledger still says qan-pass,
  example: t2-en-audio-p1 is private at qa3-pass (https://youtu.be/DPYt3jQonhw). The t1 items Fre7sTw5_6c and ENYN7SBfvio now list as PUBLIC on the channel although the ledger still says qa3-pass, so the owner s
  evidence: job:geng-300-u01-studio_media-r1
- [handoff] x1 recent, 1 total, since 2026-11-26: <code> with <code> is the reliable way to confirm what is still private; the tags array mismatch recurs on every upload and is fixed with <code>.
  example: `list_videos` with `privacy_status=private` is the reliable way to confirm what is still private; the tags array mismatch recurs on every upload and is fixed with `yt-describe.mjs unit geng-300 1 <key
  evidence: job:geng-300-u01-studio_media-r1

Follow `.claude/skills/intel-distill/SKILL.md` exactly; read it and every file it references before starting.

## Scope
`specs/intelligence/daily/2026-11-28.md` only.

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
- (intel-2026-11-27-distill, intel_distill, claude) Codex shows 24 strikes in `~/.crew/mega-book/health.json` and its quota resets 2026-12-18; until C2 lands, a lead may want to mark codex down by hand.
- (intel-2026-11-27-distill, intel_distill, claude) 7 content specs (efmp-305, efmp-408, geng-300, geng-301, gqur-300, gqur-301, gsos-301) have no per-unit Bloom bands, so `check:bloom-bands` passes them without checking anything.
- (intel-2026-11-26-distill, intel_distill, agy) In `scripts/crew/batch.mjs` (`trackerLines`), status block parsing consumes until the next `## ` heading; adding `## Units` to `specs/content/efmp-409/tasks.md` or terminating status blocks before table rows will stop `mergeTrackerRows` from dropping newly added unit rows.
- (intel-2026-11-26-distill, intel_distill, agy) G3 review render inspection against production continues to force `escalate` dispositions on candidate branches until `render-inspect.mjs` or `review-unit` treats unmerged assets as advisory limitations.
- (intel-2026-11-25-distill, intel_distill, agy) gcce-400-u07-author remains pinned in reap with 101 ENOENT cron errors; lead or owner must release or reap it by hand.


## Response snapshot

Distilled 10 reusable intelligence candidates for 2026-11-28, strongest addressing translation handoff files under specs/content tripping G2 stale-manifest pipeline failures.

## Outcome

- Impact: intel_distill for INTEL Unit 0 by agy2 (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Distilled 10 reusable intelligence candidates for 2026-11-28, strongest addressing translation handoff files under specs/content tripping G2 stale-manifest pipeline failures.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - 61 git-ignored files under `static/studio/flashcards/` remain tracked on `main`, causing `build-studio-index.mjs` to rewrite and dirty other courses' files during builds until `git rm -r --cached static/studio/flashcards/` is run on `main`.
  - Worker briefs still omit `--ci-fonts` for `measure-figure-text.mjs`, causing local runs to pass with system fonts while GitHub Actions CI fails on DejaVu Sans font width fallbacks.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
