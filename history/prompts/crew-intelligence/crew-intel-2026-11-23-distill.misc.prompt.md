---
id: crew-intel-2026-11-23-distill
title: crew intel_distill INTEL unit 0
stage: misc
date: 2026-11-22
surface: agent
model: claude
feature: crew-intelligence
branch: crew/intel-2026-11-23-distill
user: crew
command: crew intel_distill
labels: ["crew", "claude", "intel_distill"]
links:
  spec: specs/intelligence/registry.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/intelligence/daily/2026-11-23.md
tests:
 - npm run check:content
---

## Prompt

# Crew job intel-2026-11-23-distill

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/intel-2026-11-23-distill`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, and never touch course content (`docs/`, `licence/`, the Urdu docs trees,
`specs/content/`, `static/img/figures/`, `glossary.json`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.

## Task
Distil today's reusable intelligence (intel-distill skill) into `specs/intelligence/daily/2026-11-23.md`. These clusters grew in the last 24 hours (kind, recent count, total, signature, an example, evidence):

- [cron] x22 recent, 22 total, since 2026-11-22: gcce-n-un-author: error: enoent: no such file or directory, open '<path>'
  example: gcce-400-u07-author: Error: ENOENT: no such file or directory, open '/home/a2ahs/crew-wt/gcce-400-u07-author/.crew/brief.md'
  evidence: cron.log
- [failure] x11 recent, 94 total, since 2026-10-17: ✗ pipeline gate failed with n finding(s):
  example: ✗ Pipeline gate failed with 1 finding(s):
  evidence: job:gcce-400-u01-translate, job:gcce-400-u04-translate, job:gcce-400-u06-translate
- [failure] x5 recent, 155 total, since 2026-10-28: left out of the batch: <path> conflicts with main (<path>).; merge fix queued
  example: left out of the batch: crew/gnas-301-u04-review_en conflicts with main (specs/content/gnas-301/tasks.md).; merge fix queued
  evidence: job:efpg-401-u05-author, job:guhq-301-u05-author, job:gcce-400-u03-author
- [handoff] x2 recent, 2 total, since 2026-11-22: <code> remains <code> across english and urdu indices pending independent gn review.
  example: `translation_status` remains `draft` across English and Urdu indices pending independent G5 review.
  evidence: job:gcce-400-u04-translate, job:gcce-400-u06-translate
- [handoff] x2 recent, 2 total, since 2026-11-22: gn en-review is still open for unit n; the reviewer should confirm the currency of cited constitutional provisions under the n constitution (articles n-n and ar
  example: G3 en-review is still open for Unit 3; the reviewer should confirm the currency of cited constitutional provisions under the 1973 Constitution (Articles 8-28 and Article 5).
  evidence: job:gcce-400-u03-author-conflict2, job:gcce-400-u03-author-conflict3
- [handoff] x2 recent, 2 total, since 2026-11-22: urdu <path> is a separate downstream job; unit n stays under the required untranslated notice.
  example: Urdu G4/G5 is a separate downstream job; Unit 3 stays under the required untranslated notice.
  evidence: job:gcce-400-u03-author-conflict2, job:gcce-400-u03-author-conflict3
- [log-error] x1 recent, 107 total, since 2026-10-17: ✗ pipeline gate failed with n finding(s):
  example: ✗ Pipeline gate failed with 2 finding(s):
  evidence: log:efpg-401-u06-illustrate.1.log, log:efpg-401-u07-illustrate.1.log, log:guhq-301-u05-author.1.log
- [failure] x1 recent, 18 total, since 2026-10-28: left out of the batch: <path> conflicts with main (<path>, <path>).; merge fix queued
  example: left out of the batch: crew/efmp-301-u05-review_en conflicts with main (specs/content/efmp-301/tasks.md, static/content-status.json).; merge fix queued
  evidence: job:geng-300-u01-review_en-r1, job:efpg-401-u03-author, job:guhq-301-u02-author
- [failure] x1 recent, 4 total, since 2026-10-17: ✗ content validation failed with n error(s):
  example: ✗ Content validation failed with 316 error(s):
  evidence: job:gsos-301-u00-salvage-conflict1, job:geng-301-u00-salvage-conflict2, job:gcce-400-u01-author
- [failure] x1 recent, 4 total, since 2026-10-28: left out of the batch: <path> conflicts with main (glossary.json, <path>).; merge fix queued
  example: left out of the batch: crew/gpks-402-u06-author conflicts with main (glossary.json, specs/content/gpks-402/tasks.md).; merge fix queued
  evidence: job:gpks-402-u06-author, job:efpg-401-u07-author, job:gcce-400-u06-author
- [log-error] x1 recent, 3 total, since 2026-10-17: ✗ content validation failed with n error(s):
  example: ✗ Content validation failed with 316 error(s):
  evidence: log:efmp-303-u04-review_en.1.log, log:gqur-301-u12-author.1.log, log:guhq-301-u05-author.1.log
- [review] x1 recent, 3 total, since 2026-11-19: this independent report is advisory only
  example: This independent report is advisory only
  evidence: review:specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en.json, review:specs/content/efpg-401/reviews/unit-03/G3/crew-job-efpg-401-u03-review_en.json, review:specs/content/efpg-401/reviews/unit-01/G3/a0dffa23-4ae1-40fa-aef4-f60697bb4df8.json
- [phr] x1 recent, 2 total, since 2026-11-07: next experiment (smallest change to try): commit refreshed gate evidence in the same change that adds a unit-named handoff file, so the branch never carries a s
  example: next experiment (smallest change to try): Commit refreshed gate evidence in the same change that adds a unit-named handoff file, so the branch never carries a stale G2 row.
  evidence: phr:history/prompts/general/20261158-efmp407-unit-four-g2-refresh.general.prompt.md, phr:history/prompts/general/20261241-gcce-400-unit-1-g2-refresh.general.prompt.md
- [review] x1 recent, 2 total, since 2026-11-19: render-review unavailable
  example: render-review unavailable
  evidence: review:specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en.json, review:specs/content/efpg-401/reviews/unit-01/G3/a0dffa23-4ae1-40fa-aef4-f60697bb4df8.json
- [phr] x1 recent, 2 total, since 2026-11-20: failure modes observed: gflow returned "error executing tool" for a billed clip (shot n); the
  example: failure modes observed: gflow returned "Error executing tool" for a billed clip (shot 4); the
  evidence: phr:history/prompts/029-notebook-studio/20261224-efmp-302-v2-pilot-gflow-fixed.green.prompt.md
- [phr] x1 recent, 2 total, since 2026-11-20: next experiment (smallest change to try): flow character ingredient (rnv) for a consistent presenter across shots n and n.
  example: next experiment (smallest change to try): Flow Character ingredient (r2v) for a consistent presenter across shots 1 and 5.
  evidence: phr:history/prompts/029-notebook-studio/20261224-efmp-302-v2-pilot-gflow-fixed.green.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-21: failure modes observed: status read from a stale checkout; a serial external-quota job starved the whole authoring pipeline.
  example: failure modes observed: status read from a stale checkout; a serial external-quota job starved the whole authoring pipeline.
  evidence: phr:history/prompts/crew/20261234-media-work-never-holds-course-focus.green.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-21: next experiment (smallest change to try): show "held because of" on the board when the focus course has only waiting work.
  example: next experiment (smallest change to try): show "held because of" on the board when the focus course has only waiting work.
  evidence: phr:history/prompts/crew/20261234-media-work-never-holds-course-focus.green.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-21: failure modes observed: stale skill steps (veo_fast, duration n) that would have failed on the current flow composer.
  example: failure modes observed: stale skill steps (veo_fast, duration 8) that would have failed on the current Flow composer.
  evidence: phr:history/prompts/030-media-studio/20261232-media-studio-polish-and-close.green.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-21: next experiment (smallest change to try): a check that every script path a skill names exists.
  example: next experiment (smallest change to try): a check that every script path a skill names exists.
  evidence: phr:history/prompts/030-media-studio/20261232-media-studio-polish-and-close.green.prompt.md
- [handoff] x1 recent, 1 total, since 2026-11-22: the fig-un-n, -n, -n and -n prompts do not name a sindh city because their prose is set in faisalabad or lahore; author or owner decides whether to re-set prose
  example: The fig-U4-16, -18, -19 and -20 prompts do not name a Sindh city because their prose is set in Faisalabad or Lahore; author or owner decides whether to re-set prose in Sindh.
  evidence: job:gnas-301-u04-illustrate
- [handoff] x1 recent, 1 total, since 2026-11-22: unit n gn review remains open pending owner authorization (third cycle owner-gated by g-n-n); live mobile and an print inspection remains outstanding.
  example: Unit 4 G3 review remains open pending owner authorization (third cycle owner-gated by G-2026-31); live mobile and A4 print inspection remains outstanding.
  evidence: job:gnas-301-u04-illustrate
- [handoff] x1 recent, 1 total, since 2026-11-22: gn remains open and unticked awaiting fresh independent review against committed bytes.
  example: G3 remains open and unticked awaiting fresh independent review against committed bytes.
  evidence: job:gqur-300-u06-illustrate
- [handoff] x1 recent, 1 total, since 2026-11-22: all four raster illustrations (fig-un-n through fig-un-n) were inspected and placed with zero em dashes in english and urdu files.
  example: All four raster illustrations (fig-U6-7 through fig-U6-10) were inspected and placed with zero em dashes in English and Urdu files.
  evidence: job:gqur-300-u06-illustrate
- [handoff] x1 recent, 1 total, since 2026-11-21: the claim that everyday urdu pronounces groups of arabic letters alike (topic n.n table) has no open-access source; the sources file flags it, along with the ge
  example: The claim that everyday Urdu pronounces groups of Arabic letters alike (Topic 1.2 table) has no open-access source; the sources file flags it, along with the general-knowledge material (characteristic
  evidence: job:guhq-301-u01-author
- [handoff] x1 recent, 1 total, since 2026-11-21: the urdu job needs <code> versions of all four figures (two contain arabic words) and must have the seven authored urdu concept labels reviewed at gn; banner fi
  example: The Urdu job needs `.ur.svg` versions of all four figures (two contain Arabic words) and must have the seven authored Urdu concept labels reviewed at G5; banner fig-U1-5 is still prompt-only for the i
  evidence: job:guhq-301-u01-author
- [handoff] x1 recent, 1 total, since 2026-11-21: gn is a separate fresh session; it must check the rendered urdu verses (saheeh international meaning), the religious-content note and the seven authored concept
  example: G5 is a separate fresh session; it must check the rendered Urdu verses (Saheeh International meaning), the religious-content note and the seven authored concept labels.
  evidence: job:guhq-301-u01-translate
- [handoff] x1 recent, 1 total, since 2026-11-21: editing anything under <code> re-opens gn; rerun <code>.
  example: Editing anything under `specs/content/guhq-301/translations/unit-01/` re-opens G2; rerun `node scripts/prepare-gate-evidence.mjs --refresh-stale`.
  evidence: job:guhq-301-u01-translate
- [handoff] x1 recent, 1 total, since 2026-11-21: urdu job needs <code> mirrors for all eight figures (several contain arabic) and gn review of the twelve authored urdu concept labels.
  example: Urdu job needs `.ur.svg` mirrors for all eight figures (several contain Arabic) and G5 review of the twelve authored Urdu concept labels.
  evidence: job:guhq-301-u02-author
- [handoff] x1 recent, 1 total, since 2026-11-21: <path> tables are general-knowledge grammar flagged in <path> for the gn reviewer, who must also make the religious-content check in content-spec drafting note 
  example: Conjugation/pronoun/negation/preposition tables are general-knowledge grammar flagged in sources/unit-02.md for the G3 reviewer, who must also make the religious-content check in content-spec drafting
  evidence: job:guhq-301-u02-author
- [handoff] x1 recent, 1 total, since 2026-11-21: gn and the urdu mirror remain open; the urdu job needs <code> mirrors for <path> and a gn check of the eight authored concept labels. banner fig-un-n is still <
  example: G3 and the Urdu mirror remain open; the Urdu job needs `.ur.svg` mirrors for fig-U3-1/2/3/4 and a G5 check of the eight authored concept labels. Banner fig-U3-5 is still `prompt-only` for the illustra
  evidence: job:guhq-301-u03-author
- [handoff] x1 recent, 1 total, since 2026-11-21: the "passive is common" claim rests on four counted examples, not a corpus frequency count, and is flagged in <code> for the gn religious-content reviewer.
  example: The "passive is common" claim rests on four counted examples, not a corpus frequency count, and is flagged in `sources/unit-03.md` for the G3 religious-content reviewer.
  evidence: job:guhq-301-u03-author
- [handoff] x1 recent, 1 total, since 2026-11-21: urdu job needs <code> for all six figures and gn review of the nine authored urdu concept labels.
  example: Urdu job needs `.ur.svg` for all six figures and G5 review of the nine authored Urdu concept labels.
  evidence: job:guhq-301-u04-author
- [handoff] x1 recent, 1 total, since 2026-11-21: gn must make the religious-content check (content-spec drafting note n); classroom routines have no bound source and are flagged in <code>.
  example: G3 must make the religious-content check (content-spec drafting note 7); classroom routines have no bound source and are flagged in `sources/unit-04.md`.
  evidence: job:guhq-301-u04-author
- [handoff] x1 recent, 1 total, since 2026-11-21: <code> pdf host timed out, so its bound excerpt rests on the abstract; a reviewer with access should read the full article.
  example: `rafei-2024-ruqu` PDF host timed out, so its bound excerpt rests on the abstract; a reviewer with access should read the full article.
  evidence: job:guhq-301-u04-author
- [handoff] x1 recent, 1 total, since 2026-11-21: urdu job needs <code> for all four figures and gn review of the seven authored urdu concept labels.
  example: Urdu job needs `.ur.svg` for all four figures and G5 review of the seven authored Urdu concept labels.
  evidence: job:guhq-301-u05-author
- [handoff] x1 recent, 1 total, since 2026-11-21: gn must make the religious-content check (content-spec drafting note n); the classroom routines and the ordering of the sources of tafsir are flagged in <code> 
  example: G3 must make the religious-content check (content-spec drafting note 7); the classroom routines and the ordering of the sources of tafsir are flagged in `sources/unit-05.md` as having no bound source.
  evidence: job:guhq-301-u05-author
- [handoff] x1 recent, 1 total, since 2026-11-21: <code> (mapped reading) could not be identified and is not cited; <code> carries the rules-of-interpretation claims.
  example: `tafseer-talim-ul-quran` (mapped reading) could not be identified and is not cited; `kadir-2022-asbab` carries the rules-of-interpretation claims.
  evidence: job:guhq-301-u05-author
- [handoff] x1 recent, 1 total, since 2026-11-22: urdu job needs <code> for all three placed schematic figures and independent gn review for the six authored urdu concept labels.
  example: Urdu job needs `.ur.svg` for all three placed schematic figures and independent G5 review for the six authored Urdu concept labels.
  evidence: job:guhq-301-u06-author
- [handoff] x1 recent, 1 total, since 2026-11-22: gn review must make the religious-content check (content-spec drafting note n); classroom scenarios and pedagogical applications are flagged as instructional mo
  example: G3 review must make the religious-content check (content-spec drafting note 7); classroom scenarios and pedagogical applications are flagged as instructional models.
  evidence: job:guhq-301-u06-author

Follow `.claude/skills/intel-distill/SKILL.md` exactly; read it and every file it references before starting.

## Scope
`specs/intelligence/daily/2026-11-23.md` only.

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
- (intel-2026-11-22-distill, intel_distill, agy) Live checkpoint for gflow submission journal recovery awaits the owner reverse tunnel on port 18801.
- (intel-2026-11-21-distill, intel_distill, agy) GFlow tool errors during clip generation can leave remote clips rendered and billed while structlog TypeError masks the error; recover over port 18801 before retrying.
- (intel-2026-11-21-distill, intel_distill, agy) Presenter visual consistency across shots 1 and 5 in teaser recipe v2 requires Flow Character reference ingredient (r2v).
- (intel-2026-11-20-distill, intel_distill, agy) In `scripts/render-inspect.mjs:306-310`, Section D attempts to fetch `.svg` variants for all placed figures in `unitFigures()`, failing on WebP illustrations (`kind: illustration`).
- (intel-2026-11-20-distill, intel_distill, agy) `prepare-gate-evidence.mjs` rejects lowercase course codes (e.g., `efpg-401`); uppercase arguments remain required until the script normalizes them automatically.


## Response snapshot

Wrote specs/intelligence/daily/2026-11-23.md with 8 candidates; the strongest is that a deleted `.crew/brief.md` leaves a finished job stuck in reap for good.

## Outcome

- Impact: intel_distill for INTEL Unit 0 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Wrote specs/intelligence/daily/2026-11-23.md with 8 candidates; the strongest is that a deleted `.crew/brief.md` leaves a finished job stuck in reap for good.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - gcce-400-u07-author has been stuck `running` since 2026-11-22 12:47Z because its worktree has no `.crew/brief.md`; its finished Unit 7 needs the lead to release it (for example restore the brief file or reap it by hand).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
