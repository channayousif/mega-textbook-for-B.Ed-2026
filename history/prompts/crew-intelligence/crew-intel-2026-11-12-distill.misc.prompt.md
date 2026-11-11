---
id: crew-intel-2026-11-12-distill
title: crew intel_distill INTEL unit 0
stage: misc
date: 2026-11-11
surface: agent
model: agy
feature: crew-intelligence
branch: crew/intel-2026-11-12-distill
user: crew
command: crew intel_distill
labels: ["crew", "agy", "intel_distill"]
links:
  spec: specs/intelligence/registry.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/crew-intelligence/crew-intel-2026-11-12-distill.misc.prompt.md
 - specs/intelligence/daily/2026-11-12.md
tests:
 - npm run check:content
---

## Prompt

# Crew job intel-2026-11-12-distill

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/intel-2026-11-12-distill`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, and never touch course content (`docs/`, `licence/`, the Urdu docs trees,
`specs/content/`, `static/img/figures/`, `glossary.json`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.

## Task
Distil today's reusable intelligence (intel-distill skill) into `specs/intelligence/daily/2026-11-12.md`. These clusters grew in the last 24 hours (kind, recent count, total, signature, an example, evidence):

- [failure] x4 recent, 150 total, since 2026-10-28: left out of the batch: <path> conflicts with main (<path>).; merge fix queued
  example: left out of the batch: crew/gnas-301-u04-review_en conflicts with main (specs/content/gnas-301/tasks.md).; merge fix queued
  evidence: job:efpg-401-u03-author, job:efpg-401-u04-author, job:efpg-401-u05-author
- [failure] x2 recent, 15 total, since 2026-10-19: could not join a batch after n merge fixes
  example: could not join a batch after 5 merge fixes
  evidence: job:gqur-300-u05-review_en, job:efpg-401-u03-author, job:efpg-401-u05-author
- [handoff] x2 recent, 3 total, since 2026-11-10: unit n urdu gn mirror and independent <path> remain the downstream jobs; branch is n behind <path> and n ahead, no push and no pr.
  example: Unit 3 Urdu G4 mirror and independent G3/G5 remain the downstream jobs; branch is 0 behind origin/main and 11 ahead, no push and no PR.
  evidence: job:efpg-401-u03-author-conflict3, job:efpg-401-u03-author-conflict4, job:efpg-401-u03-author-conflict5
- [handoff] x2 recent, 2 total, since 2026-11-10: tasks.md status line still reads main's "units n, n and n authored; unit n english draft complete"; left unchanged under the never-change-main's-entry rule.
  example: tasks.md status line still reads main's "Units 1, 2 and 7 authored; Unit 6 English draft complete"; left unchanged under the never-change-main's-entry rule.
  evidence: job:efpg-401-u03-author-conflict4, job:efpg-401-u03-author-conflict5
- [handoff] x2 recent, 2 total, since 2026-11-10: unit n en still has no urdu mirror, so gn translation and independent <path> review remain the open next steps.
  example: Unit 5 EN still has no Urdu mirror, so G4 translation and independent G3/G5 review remain the open next steps.
  evidence: job:efpg-401-u05-author-conflict4, job:efpg-401-u05-author-conflict5
- [log-error] x1 recent, 19 total, since 2026-10-17: automatic merge failed; fix conflicts and then commit the result.
  example: Automatic merge failed; fix conflicts and then commit the result.
  evidence: log:gnas-301-u03-repair_en-conflict3.1.log, log:efpg-401-u04-author-conflict3.1.log, log:efpg-401-u03-author-conflict4.1.log
- [failure] x1 recent, 17 total, since 2026-10-28: left out of the batch: <path> conflicts with main (<path>, <path>).; merge fix queued
  example: left out of the batch: crew/efmp-301-u05-review_en conflicts with main (specs/content/efmp-301/tasks.md, static/content-status.json).; merge fix queued
  evidence: job:efmp-301-u11-review_en, job:geng-300-u01-review_en-r1, job:efpg-401-u03-author
- [phr] x1 recent, 3 total, since 2026-11-05: next experiment (smallest change to try): rerun ci figure-geometry on the committed repair.
  example: next experiment (smallest change to try): Rerun CI figure-geometry on the committed repair.
  evidence: phr:history/prompts/general/20261127-fix-batch-449-legend-spacing.general.prompt.md, phr:history/prompts/general/20261123-fix-pr439-urdu-figure-spacing.general.prompt.md, phr:history/prompts/general/20261192-fix-pr536-urdu-figure-spacing.general.prompt.md
- [handoff] x1 recent, 3 total, since 2026-11-10: gn urdu mirror still needs <code> variants and ur <code> wiring; gn review remains open.
  example: G4 Urdu mirror still needs `.ur.svg` variants and UR `<Figure>` wiring; G3 review remains open.
  evidence: job:efpg-401-u04-author-conflict1, job:efpg-401-u04-author-conflict2, job:efpg-401-u04-author-conflict4
- [phr] x1 recent, 1 total, since 2026-11-10: reflection: the latest desk report carries findings identical to the <sha> report against the same post-repair files; verified all findings in the repository by
  example: reflection: The latest desk report carries findings identical to the 20261102 report against the same post-repair files; verified all findings in the repository bytes and updated tracker and repair do
  evidence: phr:history/prompts/general/20261190-repair-gqur301-unit-fourteen-g3.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-10: failure modes observed: desk reports can restate earlier findings verbatim against post-repair bytes; the input manifest matched the current docs while the crit
  example: failure modes observed: Desk reports can restate earlier findings verbatim against post-repair bytes; the input manifest matched the current docs while the criteria and findings were stale, so each fi
  evidence: phr:history/prompts/general/20261190-gsos-301-unit-02-g3-desk-repair.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-10: next experiment (smallest change to try): independent answer-blind assessment and rendered review of the repaired version.
  example: next experiment (smallest change to try): Independent answer-blind assessment and rendered review of the repaired version.
  evidence: phr:history/prompts/general/20261190-gsos-301-unit-02-g3-desk-repair.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-10: failure modes observed: the <sha> desk report carries findings identical to the <sha> report while its input manifest hashes the current post-repair files, so t
  example: failure modes observed: The 20261108 desk report carries findings identical to the 20261102 report while its input manifest hashes the current post-repair files, so the report is a carry-forward rathe
  evidence: phr:history/prompts/general/20261190-repair-gqur301-unit-twelve-g3.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-10: next experiment (smallest change to try): fresh independent review of the committed repaired inputs on an authorised host, with real rendered artifacts.
  example: next experiment (smallest change to try): Fresh independent review of the committed repaired inputs on an authorised host, with real rendered artifacts.
  evidence: phr:history/prompts/general/20261190-repair-gqur301-unit-twelve-g3.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-10: failure modes observed: the <sha> desk report repeated the findings from the earlier <sha> report because desk reports were generated from a frozen batch. re-ve
  example: failure modes observed: The 20261108 desk report repeated the findings from the earlier 20261102 report because desk reports were generated from a frozen batch. Re-verifying current bytes confirmed al
  evidence: phr:history/prompts/general/20261190-repair-gqur301-unit-eleven-g3.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-10: next experiment (smallest change to try): fresh independent review of the committed inputs on an authorized review host.
  example: next experiment (smallest change to try): Fresh independent review of the committed inputs on an authorized review host.
  evidence: phr:history/prompts/general/20261190-repair-gqur301-unit-eleven-g3.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-10: failure modes observed: stale review findings can persist in a new report even when some manifest hashes match current bytes; always diff each finding against t
  example: failure modes observed: stale review findings can persist in a new report even when some manifest hashes match current bytes; always diff each finding against the current text.
  evidence: phr:history/prompts/general/20261189-repair-gqur301-unit-eight-g3.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-10: failure modes observed: stale review findings can persist in a new report even when the manifest matches current bytes; always diff each finding against the cur
  example: failure modes observed: stale review findings can persist in a new report even when the manifest matches current bytes; always diff each finding against the current text.
  evidence: phr:history/prompts/general/557-repair-gqur301-unit-five-g3.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-10: failure modes observed: the <sha> desk report carries findings identical to the <sha> report while its input manifest hashes the post-repair files, so the repor
  example: failure modes observed: The 20261108 desk report carries findings identical to the 20261102 report while its input manifest hashes the post-repair files, so the report is a carry-forward rather than a
  evidence: phr:history/prompts/general/20261189-repair-gqur301-unit-six-g3.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-10: next experiment (smallest change to try): fresh independent review of the committed repaired inputs on an authorised host.
  example: next experiment (smallest change to try): Fresh independent review of the committed repaired inputs on an authorised host.
  evidence: phr:history/prompts/general/20261189-repair-gqur301-unit-six-g3.general.prompt.md
- [handoff] x1 recent, 1 total, since 2026-11-10: local playwright resolves a narrower nastaliq face than ci's fallback, so local measure-figure-text passes these svgs even at npx; the npx repair was sized from
  example: Local Playwright resolves a narrower Nastaliq face than CI's fallback, so local measure-figure-text passes these SVGs even at 14px; the 13px repair was sized from CI's measured widths (3.5px gap and 6
  evidence: job:batch-20261110-1800-cifix1
- [handoff] x1 recent, 1 total, since 2026-11-10: ci figure-geometry must confirm the repair on the next run; no <path> status, evidence or publication state was touched.
  example: CI figure-geometry must confirm the repair on the next run; no G3/G5 status, evidence or publication state was touched.
  evidence: job:batch-20261110-1800-cifix1
- [handoff] x1 recent, 1 total, since 2026-11-10: four-file urdu mirror and four localized svg pairs prepared from english <sha>; translation_status remains draft pending independent gn.
  example: Four-file Urdu mirror and four localized SVG pairs prepared from English 0c79bb31d; translation_status remains draft pending independent G5.
  evidence: job:efpg-401-u07-translate
- [handoff] x1 recent, 1 total, since 2026-11-10: all four localized schematic svgs and their derived dark variants passed measure-figure-text with exit n.
  example: All four localized schematic SVGs and their derived dark variants passed measure-figure-text with exit 0.
  evidence: job:efpg-401-u07-translate
- [handoff] x1 recent, 1 total, since 2026-11-10: the only conflict was <path>; main's unit n <path> and the branch's unit n <path> were both kept, and the branch added no registry ids so nothing was renumbered
  example: The only conflict was specs/content/efpg-401/tasks.md; main's Unit 7 rows/status and the branch's Unit 4 rows/status were both kept, and the branch added no registry IDs so nothing was renumbered.
  evidence: job:efpg-401-u04-author-conflict4
- [handoff] x1 recent, 1 total, since 2026-11-10: the merge brought main's <course> unit n and unit n authoring files into this branch; they are outside this job's scope.
  example: The merge brought main's EFPG-401 Unit 2 and Unit 7 authoring files into this branch; they are outside this job's scope.
  evidence: job:efpg-401-u04-author-conflict4
- [handoff] x1 recent, 1 total, since 2026-11-10: the merge brought in main's unit <path> urdu mirrors and unit n en; tasks.md now carries all their rows, so a future job should not re-add them.
  example: The merge brought in main's Unit 2/6 Urdu mirrors and Unit 7 EN; tasks.md now carries all their rows, so a future job should not re-add them.
  evidence: job:efpg-401-u05-author-conflict4
- [handoff] x1 recent, 1 total, since 2026-11-10: tasks.md already carries main's unit <path> urdu mirror and unit n en rows; a future job should not re-add them.
  example: tasks.md already carries main's Unit 2/6 Urdu mirror and Unit 7 EN rows; a future job should not re-add them.
  evidence: job:efpg-401-u05-author-conflict5
- [handoff] x1 recent, 1 total, since 2026-11-10: local playwright resolves a narrower nastaliq face than ci's fallback, so local measure-figure-text passes these svgs even at npx; the repair was validated agai
  example: Local Playwright resolves a narrower Nastaliq face than CI's fallback, so local measure-figure-text passes these SVGs even at 14px; the repair was validated against CI fallback font simulation.
  evidence: job:batch-20261110-2101-cifix1
- [handoff] x1 recent, 1 total, since 2026-11-10: ci figure-geometry must confirm the repair on the next run; no <path> status, evidence, or publication state was touched.
  example: CI figure-geometry must confirm the repair on the next run; no G3/G5 status, evidence, or publication state was touched.
  evidence: job:batch-20261110-2101-cifix1
- [handoff] x1 recent, 1 total, since 2026-11-10: cn documents n empty worker exits caused by opencode auto-rejecting external_directory access when attempting to read <path>/* or follow .git worktree pointer f
  example: C1 documents 19 empty worker exits caused by opencode auto-rejecting external_directory access when attempting to read /proc/pressure/* or follow .git worktree pointer files; explicit brief guidance i
  evidence: job:intel-2026-11-11-distill
- [handoff] x1 recent, 1 total, since 2026-11-10: cn identifies unhandled gemini http n capacity errors in quota_re that burned job attempts instead of triggering worker cooldown.
  example: C3 identifies unhandled Gemini HTTP 503 capacity errors in QUOTA_RE that burned job attempts instead of triggering worker cooldown.
  evidence: job:intel-2026-11-11-distill
- [handoff] x1 recent, 1 total, since 2026-11-10: cn highlights n batch exclusions from course tasks.md conflicts, supporting adoption of proposed i-n (pr #n).
  example: C2 highlights 14 batch exclusions from course tasks.md conflicts, supporting adoption of proposed I-0021 (PR #498).
  evidence: job:intel-2026-11-11-distill
- [handoff] x1 recent, 1 total, since 2026-11-10: three-file urdu mirror and n localized svg pairs prepared from english baseline <sha>; translation_status remains draft pending independent gn.
  example: Three-file Urdu mirror and 3 localized SVG pairs prepared from English baseline b43a52ced; translation_status remains draft pending independent G5.
  evidence: job:efpg-401-u04-translate
- [handoff] x1 recent, 1 total, since 2026-11-10: all three localized schematic figures and their dark variants passed measure-figure-text with exit n.
  example: All three localized schematic figures and their dark variants passed measure-figure-text with exit 0.
  evidence: job:efpg-401-u04-translate
- [phr] x1 recent, 1 total, since 2026-11-11: failure modes observed: criterion n heading overflowed horizontal panel space in ci's fallback font, overlapping the marks label by n.npx.
  example: failure modes observed: Criterion 4 heading overflowed horizontal panel space in CI's fallback font, overlapping the marks label by 57.8px.
  evidence: phr:history/prompts/general/20261193-fix-pr539-urdu-figure-geometry.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-11: next experiment (smallest change to try): confirm pr #n ci passes.
  example: next experiment (smallest change to try): Confirm PR #539 CI passes.
  evidence: phr:history/prompts/general/20261193-fix-pr539-urdu-figure-geometry.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-11: failure modes observed: urdu <code> headers overflow their columns under ci's wider fallback font; local playwright passes because it resolves a narrower nastal
  example: failure modes observed: Urdu `.sh` headers overflow their columns under CI's wider fallback font; local Playwright passes because it resolves a narrower Nastaliq face.
  evidence: phr:history/prompts/general/20261192-fix-pr536-urdu-figure-spacing.general.prompt.md

Follow `.claude/skills/intel-distill/SKILL.md` exactly; read it and every file it references before starting.

## Scope
`specs/intelligence/daily/2026-11-12.md` only.

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
- (intel-2026-11-11-distill, intel_distill, agy) C1 documents 19 empty worker exits caused by opencode auto-rejecting external_directory access when attempting to read /proc/pressure/* or follow .git worktree pointer files; explicit brief guidance is needed.
- (intel-2026-11-11-distill, intel_distill, agy) C3 identifies unhandled Gemini HTTP 503 capacity errors in QUOTA_RE that burned job attempts instead of triggering worker cooldown.
- (intel-2026-11-11-distill, intel_distill, agy) C2 highlights 14 batch exclusions from course tasks.md conflicts, supporting adoption of proposed I-0021 (PR #498).
- (intel-2026-11-10-distill, intel_distill, agy) Nested review bundles under reviews/unit-NN/G3/<folder>/ continue causing premature repeat reviews that escalate on unchanged inputs (C1).
- (intel-2026-11-10-distill, intel_distill, agy) Human desk reviews with unnumbered rubric prefixes collapse distinct findings into single-word signatures, requiring expanded label stripping in FINDING_LABEL (C2).


## Response snapshot

Distilled 8 reusable intelligence candidates for 2026-11-12 covering tasks.md 5-fix ceilings, Playwright-CI font geometry mismatches, and desk review carry-forwards into specs/intelligence/daily/2026-11-12.md with a PHR.

## Outcome

- Impact: intel_distill for INTEL Unit 0 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Distilled 8 reusable intelligence candidates for 2026-11-12 covering tasks.md 5-fix ceilings, Playwright-CI font geometry mismatches, and desk review carry-forwards into specs/intelligence/daily/2026-11-12.md with a PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - C1 documents 2 authoring jobs (EFPG-401 U3, U5) permanently aborted at 5 merge fixes due to unkeyed `## Units` summary table conflicts in course `tasks.md`.
  - C2 highlights local Playwright font advances resolving narrower than CI fallback fonts, causing false-positive local geometry passes on Urdu SVGs.
  - C3 details 7 desk review carry-forwards repeating stale findings against post-repair file hashes, producing zero-edit repair loops.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
