---
id: crew-intel-2026-11-24-distill
title: crew intel_distill INTEL unit 0
stage: misc
date: 2026-11-23
surface: agent
model: agy
feature: crew-intelligence
branch: crew/intel-2026-11-24-distill
user: crew
command: crew intel_distill
labels: ["crew", "agy", "intel_distill"]
links:
  spec: specs/intelligence/registry.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/intelligence/daily/2026-11-24.md
tests:
 - npm run check:content
---

## Prompt

# Crew job intel-2026-11-24-distill

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/intel-2026-11-24-distill`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, and never touch course content (`docs/`, `licence/`, the Urdu docs trees,
`specs/content/`, `static/img/figures/`, `glossary.json`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.

## Task
Distil today's reusable intelligence (intel-distill skill) into `specs/intelligence/daily/2026-11-24.md`. These clusters grew in the last 24 hours (kind, recent count, total, signature, an example, evidence):

- [cron] x101 recent, 101 total, since 2026-11-22: gcce-n-un-author: error: enoent: no such file or directory, open '<path>'
  example: gcce-400-u07-author: Error: ENOENT: no such file or directory, open '/home/a2ahs/crew-wt/gcce-400-u07-author/.crew/brief.md'
  evidence: cron.log
- [failure] x3 recent, 158 total, since 2026-10-28: left out of the batch: <path> conflicts with main (<path>).; merge fix queued
  example: left out of the batch: crew/gnas-301-u04-review_en conflicts with main (specs/content/gnas-301/tasks.md).; merge fix queued
  evidence: job:efmp-407-u01-repair_en-r1, job:efmp-407-u07-repair_en-r1, job:efmp-407-u08-repair_en-r1
- [handoff] x3 recent, 3 total, since 2026-11-22: the n census narrative states a national male-female literacy gap of n.n percentage points while its own summary table shows n.n and n.n; the unit quotes the ta
  example: The 2023 census narrative states a national male-female literacy gap of 16.16 percentage points while its own summary table shows 68.00 and 52.84; the unit quotes the table values and the discrepancy 
  evidence: job:gcce-400-u07-author
- [handoff] x3 recent, 3 total, since 2026-11-22: kymlicka-norman-n and youniss-levine-n are print-only and declared under <code>; gn should confirm the framing attributed to them, as units n and n were asked t
  example: kymlicka-norman-2000 and youniss-levine-2009 are print-only and declared under `## Unverifiable sources`; G3 should confirm the framing attributed to them, as Units 1 and 2 were asked to.
  evidence: job:gcce-400-u07-author
- [handoff] x3 recent, 3 total, since 2026-11-22: course-overview.mdx still introduces only unit n (left unchanged because it is bound into every unit's gn evidence); banner fig-un-n is prompt-only and there ar
  example: course-overview.mdx still introduces only Unit 1 (left unchanged because it is bound into every unit's G2 evidence); banner fig-U7-9 is prompt-only and there are no .ur.svg files yet.
  evidence: job:gcce-400-u07-author
- [review] x2 recent, 3 total, since 2026-11-19: render-review unavailable
  example: render-review unavailable
  evidence: review:specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en.json, review:specs/content/efpg-401/reviews/unit-01/G3/a0dffa23-4ae1-40fa-aef4-f60697bb4df8.json, review:specs/content/gcce-400/reviews/unit-03/G3/52caad24-9ea1-412b-918e-0ec74d99f5d0.json
- [phr] x2 recent, 2 total, since 2026-11-22: next experiment (smallest change to try): let parseoverview accept both "learning outcomes" headings.
  example: next experiment (smallest change to try): let parseOverview accept both "Learning outcomes" headings.
  evidence: phr:history/prompts/030-media-studio/20261240-efmp-406-teaser-script.green.prompt.md, phr:history/prompts/030-media-studio/20261245-efmp-407-teaser-script.green.prompt.md
- [handoff] x2 recent, 2 total, since 2026-11-23: unit n gn needs a fresh independent review: report <sha> repeats the rn findings that <sha> and <sha> had already fixed.
  example: Unit 7 G3 needs a fresh independent review: report f45bf9fe repeats the r1 findings that b02ba6e6e and a9c118a0a had already fixed.
  evidence: job:efmp-407-u07-repair_en-r1, job:efmp-407-u07-repair_en-r1-conflict1
- [review] x2 recent, 2 total, since 2026-11-23: live site build (<sha>) does not match candidate inputs (<sha>), as index.mdx and fig-un-n.webp differ
  example: Live site build (6804a30cf4f25aad3058c29f9f1b29416decbbe5) does not match candidate inputs (e30a8ed69d1bd845227fc187ae5522ee92c4aa71), as index.mdx and fig-U2-5.webp differ
  evidence: review:specs/content/gcce-400/reviews/unit-02/G3/5e1512cc-a227-4b8b-b563-9df2a22db9f6.json, review:specs/content/gcce-400/reviews/unit-01/G3/29bfa88a-9bb9-423a-b2f1-07e612294e2f.json
- [review] x2 recent, 2 total, since 2026-11-23: assessment bank items solved and verified independently from question prompts; formal blind solve with answer keys withheld from worktree remains best practice.
  example: Assessment bank items solved and verified independently from question prompts; formal blind solve with answer keys withheld from worktree remains best practice.
  evidence: review:specs/content/gcce-400/reviews/unit-02/G3/5e1512cc-a227-4b8b-b563-9df2a22db9f6.json, review:specs/content/gcce-400/reviews/unit-01/G3/29bfa88a-9bb9-423a-b2f1-07e612294e2f.json
- [failure] x1 recent, 4 total, since 2026-11-06: worker exited n (timeout):
  example: worker exited 124 (timeout):
  evidence: job:gicp-400-u03-author, job:efpg-401-u03-illustrate, job:gcce-400-u01-illustrate
- [log-error] x1 recent, 4 total, since 2026-11-06: error: interrupted
  example: error: interrupted
  evidence: log:efpg-401-u03-illustrate.1.log, log:gnas-301-u04-illustrate.1.log, log:gcce-400-u01-illustrate.1.log
- [review] x1 recent, 3 total, since 2026-11-19: this independent report is advisory only
  example: This independent report is advisory only
  evidence: review:specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en.json, review:specs/content/efpg-401/reviews/unit-03/G3/crew-job-efpg-401-u03-review_en.json, review:specs/content/efpg-401/reviews/unit-01/G3/a0dffa23-4ae1-40fa-aef4-f60697bb4df8.json
- [failure] x1 recent, 2 total, since 2026-10-28: left out of the batch: <path> conflicts with main (glossary.json, <path>, <path>).; merge fix queued
  example: left out of the batch: crew/gpks-402-u04-author conflicts with main (glossary.json, specs/content/gpks-402/sources/texts/pak-constitution-1973.md, specs/content/gpks-402/tasks.md).; merge fix queued
  evidence: job:gpks-402-u04-author, job:gcce-400-u07-author
- [phr] x1 recent, 2 total, since 2026-11-07: next experiment (smallest change to try): commit refreshed gate evidence in the same change that adds a unit-named handoff file, so the branch never carries a s
  example: next experiment (smallest change to try): Commit refreshed gate evidence in the same change that adds a unit-named handoff file, so the branch never carries a stale G2 row.
  evidence: phr:history/prompts/general/20261158-efmp407-unit-four-g2-refresh.general.prompt.md, phr:history/prompts/general/20261241-gcce-400-unit-1-g2-refresh.general.prompt.md
- [handoff] x1 recent, 2 total, since 2026-11-10: browser, narrow-screen, and an print rendering remain host-prohibited under the crew brief and are left as owner handoffs.
  example: Browser, narrow-screen, and A4 print rendering remain host-prohibited under the crew brief and are left as owner handoffs.
  evidence: job:efmp-407-u01-repair_en, job:efmp-407-u01-repair_en-r1
- [handoff] x1 recent, 2 total, since 2026-11-10: unit n gn remains unticked pending fresh independent review and owner disposition under adr-n.
  example: Unit 1 G3 remains unticked pending fresh independent review and owner disposition under ADR-0019.
  evidence: job:efmp-407-u01-repair_en, job:efmp-407-u01-repair_en-r1
- [handoff] x1 recent, 2 total, since 2026-11-10: rendered mobile npx and an print layout inspection remain outstanding under the crew browser restriction.
  example: Rendered mobile 360px and A4 print layout inspection remain outstanding under the crew browser restriction.
  evidence: job:gicp-400-u07-translate-r1, job:gicp-400-u07-repair_en-r1
- [review] x1 recent, 2 total, since 2026-11-19: render-review tooling limitation
  example: render-review tooling limitation
  evidence: review:specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en-r1.json, review:specs/content/gcce-400/reviews/unit-03/G3/7558a5eb-ca9c-48c8-bdd0-b7deb07922bf.json
- [phr] x1 recent, 1 total, since 2026-11-22: failure modes observed: unticked tasks made a finished feature look half done.
  example: failure modes observed: unticked tasks made a finished feature look half done.
  evidence: phr:history/prompts/024-licence-topic-design/20261244-licence-strict-gate-and-coverage-refresh.misc.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-22: next experiment (smallest change to try): a weekly check that flags tasks whose files exist on main.
  example: next experiment (smallest change to try): a weekly check that flags tasks whose files exist on main.
  evidence: phr:history/prompts/024-licence-topic-design/20261244-licence-strict-gate-and-coverage-refresh.misc.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-22: failure modes observed: svg <code> flipped the urdu anchor in librsvg; fixed by anchoring only.
  example: failure modes observed: SVG `direction` flipped the Urdu anchor in librsvg; fixed by anchoring only.
  evidence: phr:history/prompts/031-social-updates/20261243-social-updates-core.green.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-22: next experiment (smallest change to try): add the highlight's course badge colour per course.
  example: next experiment (smallest change to try): add the highlight's course badge colour per course.
  evidence: phr:history/prompts/031-social-updates/20261243-social-updates-core.green.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-22: failure modes observed: a dedupe rule written before the data was checked.
  example: failure modes observed: a dedupe rule written before the data was checked.
  evidence: phr:history/prompts/028-news-ticker/20261242-three-row-ticker-pinning-fresher-feed.green.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-22: next experiment (smallest change to try): rank lanes by recency per course so one course cannot fill a row.
  example: next experiment (smallest change to try): rank lanes by recency per course so one course cannot fill a row.
  evidence: phr:history/prompts/028-news-ticker/20261242-three-row-ticker-pinning-fresher-feed.green.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-22: failure modes observed: the first mechanical glossary splice put both sides inside one json object because the shared <code> and <code> braces sat outside the c
  example: failure modes observed: the first mechanical glossary splice put both sides inside one JSON object because the shared `{` and `}` braces sat outside the conflict markers; fixed by splitting the juncti
  evidence: phr:history/prompts/gcce-400/crew-gcce-400-u06-author-conflict1.green.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-22: failure modes observed: the committed translation left its own gn evidence stale because the handoff file is bound to the unit's input manifest; the previous at
  example: failure modes observed: The committed translation left its own G2 evidence stale because the handoff file is bound to the unit's input manifest; the previous attempt's handoff claimed the G2 evidence 
  evidence: phr:history/prompts/general/20261241-gcce-400-unit-1-g2-refresh.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-22: failure modes observed: trackers not ticked when work shipped under another route.
  example: failure modes observed: trackers not ticked when work shipped under another route.
  evidence: phr:history/prompts/general/20261241-unfinished-plans-inventory-and-stale-ticks.misc.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-22: next experiment (smallest change to try): the weekly survey flags feature tasks.md boxes whose work is on main.
  example: next experiment (smallest change to try): the weekly survey flags feature tasks.md boxes whose work is on main.
  evidence: phr:history/prompts/general/20261241-unfinished-plans-inventory-and-stale-ticks.misc.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-22: failure modes observed: overview heading variant breaks the objectives count in qgn.
  example: failure modes observed: overview heading variant breaks the objectives count in QG0.
  evidence: phr:history/prompts/030-media-studio/20261240-efmp-406-teaser-script.green.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-22: failure modes observed: a stage requirement ("home and catalogue cards") met only on the
  example: failure modes observed: a stage requirement ("home and catalogue cards") met only on the
  evidence: phr:history/prompts/030-media-studio/20261238-home-page-teaser-picks.green.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-22: next experiment (smallest change to try): rank by views per day since publishing so new teasers
  example: next experiment (smallest change to try): rank by views per day since publishing so new teasers
  evidence: phr:history/prompts/030-media-studio/20261238-home-page-teaser-picks.green.prompt.md
- [review] x1 recent, 1 total, since 2026-11-22: source support unverified
  example: Source support unverified
  evidence: review:specs/content/efpg-401/reviews/unit-01/G3/a0dffa23-4ae1-40fa-aef4-f60697bb4df8.json
- [review] x1 recent, 1 total, since 2026-11-22: <path>:n-n
  example: docs/semester-3/efpg-401/unit-01/unit-assessment.mdx:32-93
  evidence: review:specs/content/efpg-401/reviews/unit-01/G3/a0dffa23-4ae1-40fa-aef4-f60697bb4df8.json
- [review] x1 recent, 1 total, since 2026-11-22: <path>:n says "teachers must train primary pupils in four primary reading sub-skills" but then lists five
  example: docs/semester-3/efpg-401/unit-01/topic-03.mdx:75 says "Teachers must train primary pupils in four primary reading sub-skills" but then lists five
  evidence: review:specs/content/efpg-401/reviews/unit-01/G3/a0dffa23-4ae1-40fa-aef4-f60697bb4df8.json
- [review] x1 recent, 1 total, since 2026-11-22: specific claims are attributed to the three title-level monographs
  example: Specific claims are attributed to the three title-level monographs
  evidence: review:specs/content/efpg-401/reviews/unit-01/G3/a0dffa23-4ae1-40fa-aef4-f60697bb4df8.json
- [review] x1 recent, 1 total, since 2026-11-22: <path>:n asks the summative bank to include an analyze-or-higher item that asks which of the four skills a grade n english lesson develops and how well
  example: specs/content/efpg-401/content-spec.md:89 asks the summative bank to include an Analyze-or-higher item that asks which of the four skills a Grade 4 English lesson develops and how well
  evidence: review:specs/content/efpg-401/reviews/unit-01/G3/a0dffa23-4ae1-40fa-aef4-f60697bb4df8.json
- [phr] x1 recent, 1 total, since 2026-11-22: failure modes observed: translation stales the english gn input manifest (third time today).
  example: failure modes observed: translation stales the English G2 input manifest (third time today).
  evidence: phr:history/prompts/general/20261239-lead-fix-guhq-301-u03-translate.misc.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-22: next experiment (smallest change to try): have the translate stage re-run prepare-gate-evidence
  example: next experiment (smallest change to try): have the translate stage re-run prepare-gate-evidence
  evidence: phr:history/prompts/general/20261239-lead-fix-guhq-301-u03-translate.misc.prompt.md
- [handoff] x1 recent, 1 total, since 2026-11-22: gn en-review of english unit n (kymlicka-norman-n attribution, constitutional currency) and gn ur-review remain open for independent reviewers.
  example: G3 en-review of English Unit 1 (kymlicka-norman-2000 attribution, constitutional currency) and G5 ur-review remain open for independent reviewers.
  evidence: job:gcce-400-u01-illustrate

Follow `.claude/skills/intel-distill/SKILL.md` exactly; read it and every file it references before starting.

## Scope
`specs/intelligence/daily/2026-11-24.md` only.

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
- (intel-2026-11-23-distill, intel_distill, claude) gcce-400-u07-author has been stuck `running` since 2026-11-22 12:47Z because its worktree has no `.crew/brief.md`; its finished Unit 7 needs the lead to release it (for example restore the brief file or reap it by hand).
- (intel-2026-11-22-distill, intel_distill, agy) Live checkpoint for gflow submission journal recovery awaits the owner reverse tunnel on port 18801.
- (intel-2026-11-21-distill, intel_distill, agy) GFlow tool errors during clip generation can leave remote clips rendered and billed while structlog TypeError masks the error; recover over port 18801 before retrying.
- (intel-2026-11-21-distill, intel_distill, agy) Presenter visual consistency across shots 1 and 5 in teaser recipe v2 requires Flow Character reference ingredient (r2v).
- (intel-2026-11-20-distill, intel_distill, agy) In `scripts/render-inspect.mjs:306-310`, Section D attempts to fetch `.svg` variants for all placed figures in `unitFigures()`, failing on WebP illustrations (`kind: illustration`).


## Response snapshot

Distilled 10 reusable intelligence candidates into specs/intelligence/daily/2026-11-24.md led by the stuck reap loop and parseOverview regex mismatch.

## Outcome

- Impact: intel_distill for INTEL Unit 0 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Distilled 10 reusable intelligence candidates into specs/intelligence/daily/2026-11-24.md led by the stuck reap loop and parseOverview regex mismatch.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - gcce-400-u07-author remains pinned in reap with 101 ENOENT cron errors; lead or owner must release or reap it by hand.
  - EFMP-406 and EFMP-407 teaser scripts currently omit objectives because parseOverview in describe.mjs requires ## Course learning outcomes.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
