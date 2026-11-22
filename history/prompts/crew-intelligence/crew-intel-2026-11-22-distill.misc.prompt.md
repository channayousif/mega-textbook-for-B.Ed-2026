---
id: crew-intel-2026-11-22-distill
title: crew intel_distill INTEL unit 0
stage: misc
date: 2026-11-22
surface: agent
model: agy
feature: crew-intelligence
branch: crew/intel-2026-11-22-distill
user: crew
command: crew intel_distill
labels: ["crew", "agy", "intel_distill"]
links:
  spec: specs/intelligence/registry.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/intelligence/daily/2026-11-22.md
tests:
 - npm run check:content
---

## Prompt

# Crew job intel-2026-11-22-distill

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/intel-2026-11-22-distill`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, and never touch course content (`docs/`, `licence/`, the Urdu docs trees,
`specs/content/`, `static/img/figures/`, `glossary.json`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.

## Task
Distil today's reusable intelligence (intel-distill skill) into `specs/intelligence/daily/2026-11-22.md`. These clusters grew in the last 24 hours (kind, recent count, total, signature, an example, evidence):

- [phr] x1 recent, 1 total, since 2026-11-20: failure modes observed: gflow returned "error executing tool" for a billed clip (shot n); the
  example: failure modes observed: gflow returned "Error executing tool" for a billed clip (shot 4); the
  evidence: phr:history/prompts/029-notebook-studio/20261224-efmp-302-v2-pilot-gflow-fixed.green.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-20: next experiment (smallest change to try): flow character ingredient (rnv) for a consistent presenter across shots n and n.
  example: next experiment (smallest change to try): Flow Character ingredient (r2v) for a consistent presenter across shots 1 and 5.
  evidence: phr:history/prompts/029-notebook-studio/20261224-efmp-302-v2-pilot-gflow-fixed.green.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-21: failure modes observed: #n merged into its stacked base after that base had already merged to main.
  example: failure modes observed: #673 merged into its stacked base after that base had already merged to main.
  evidence: phr:history/prompts/030-media-studio/20261229-media-studio-status-view.green.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-21: next experiment (smallest change to try): show status in <code> replies too.
  example: next experiment (smallest change to try): show status in `crew media status` replies too.
  evidence: phr:history/prompts/030-media-studio/20261229-media-studio-status-view.green.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-21: failure modes observed: worker-chains test pins every stage chain (updated); a producer test leaked a quota record into ~<path> (fixed with mega_book_media_quot
  example: failure modes observed: worker-chains test pins every stage chain (updated); a producer test leaked a quota record into ~/.cache (fixed with MEGA_BOOK_MEDIA_QUOTA_FILE in the test).
  evidence: phr:history/prompts/030-media-studio/20261228-media-studio-crew-stages.green.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-21: next experiment (smallest change to try): run one teaser_clips job live on a batch-n retake once the tunnel is up.
  example: next experiment (smallest change to try): run one teaser_clips job live on a batch-3 retake once the tunnel is up.
  evidence: phr:history/prompts/030-media-studio/20261228-media-studio-crew-stages.green.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-21: failure modes observed: qgn first scored every cta line n.n-n.n because whisper writes the site as "textbook.com.pk"; fixed by expanding addresses before matchi
  example: failure modes observed: QG2 first scored every CTA line 0.64-0.71 because whisper writes the site as "textbook.com.pk"; fixed by expanding addresses before matching.
  evidence: phr:history/prompts/030-media-studio/20261227-media-studio-recipes-and-producers.green.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-21: next experiment (smallest change to try): run gflow-video.mjs on one batch-n retake (<course> shot n) to confirm the journal and project reuse live.
  example: next experiment (smallest change to try): run gflow-video.mjs on one batch-3 retake (GPKS-402 shot 2) to confirm the journal and project reuse live.
  evidence: phr:history/prompts/030-media-studio/20261227-media-studio-recipes-and-producers.green.prompt.md
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

Follow `.claude/skills/intel-distill/SKILL.md` exactly; read it and every file it references before starting.

## Scope
`specs/intelligence/daily/2026-11-22.md` only.

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
- (intel-2026-11-21-distill, intel_distill, agy) GFlow tool errors during clip generation can leave remote clips rendered and billed while structlog TypeError masks the error; recover over port 18801 before retrying.
- (intel-2026-11-21-distill, intel_distill, agy) Presenter visual consistency across shots 1 and 5 in teaser recipe v2 requires Flow Character reference ingredient (r2v).
- (intel-2026-11-20-distill, intel_distill, agy) In `scripts/render-inspect.mjs:306-310`, Section D attempts to fetch `.svg` variants for all placed figures in `unitFigures()`, failing on WebP illustrations (`kind: illustration`).
- (intel-2026-11-20-distill, intel_distill, agy) `prepare-gate-evidence.mjs` rejects lowercase course codes (e.g., `efpg-401`); uppercase arguments remain required until the script normalizes them automatically.
- (intel-2026-11-19-distill, intel_distill, claude) `specs/content/efpg-401/concepts/unit-05.md` has the wrong Urdu word ساتھ ("with") where it should say سات ("seven"); the file is a hashed G2 input, so it needs an English-side repair job.


## Response snapshot

Distilled 7 reusable intelligence candidates for 2026-11-22 covering skill path staleness, course focus independence, stacked PR base merges, whisper URL scoring, test cache isolation, and teaser generation continuity.

## Outcome

- Impact: intel_distill for INTEL Unit 0 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Distilled 7 reusable intelligence candidates for 2026-11-22 covering skill path staleness, course focus independence, stacked PR base merges, whisper URL scoring, test cache isolation, and teaser generation continuity.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Live checkpoint for gflow submission journal recovery awaits the owner reverse tunnel on port 18801.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
