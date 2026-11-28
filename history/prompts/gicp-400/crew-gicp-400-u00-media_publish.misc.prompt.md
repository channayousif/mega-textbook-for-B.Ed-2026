---
id: crew-gicp-400-u00-media_publish
title: crew media_publish GICP-400 unit 0
stage: misc
date: 2026-11-28
surface: agent
model: claude_crew
feature: gicp-400
branch: crew/gicp-400-u00-media_publish
user: crew
command: crew media_publish
labels: ["crew", "claude_crew", "media_publish"]
links:
  spec: specs/content/gicp-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/030-media-studio/20261313-gicp-400-teaser-publish.green.prompt.md
 - specs/studio/teaser-stats.json
 - specs/studio/teasers/media-teasers.json
tests:
 - npm run check:content
---

## Prompt

# Crew job gicp-400-u00-media_publish

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gicp-400-u00-media_publish`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
The owner approved publishing gicp-400-ur (`crew publish` via web at 2026-11-27T20:17:02.776Z, video moAasL2nNZs). If the item is `qa3-pass`, advance it: `node scripts/notebook-studio/teaser.mjs advance gicp-400-ur approved --json '{"gates":{"owner":{"verdict":"approve","by":"owner","date":"2026-11-27","note":"crew publish via web"}}}'`. Then set exactly that video (moAasL2nNZs) public with youtube-uploader `update_video` (privacy_status public), confirm with `list_videos`, and advance to `public` with `{"published_at":"<now ISO>"}`. Then run `node scripts/notebook-studio/teaser-stats.mjs` and commit `specs/studio/teaser-stats.json` (the home page ranks teasers by it). Change no other video.

Follow `.claude/skills/studio-teaser/SKILL.md` exactly; read it and every file it references before starting.

## Scope
The GICP-400 teaser only: `specs/studio/teasers/gicp-400.json` and its own item in `specs/studio/teasers/media-teasers.json` (no other item), plus your PHR. Media files live under ~/studio-media and never enter git.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Notes from earlier jobs on this unit
- (gicp-400-u00-media_assemble, media_assemble, claude_crew) `gicp-400-ur` is at `qa3-pass` (private `moAasL2nNZs`); the owner watches `https://youtube.com/shorts/moAasL2nNZs` and replies `crew publish gicp-400-ur` or `crew reject gicp-400-ur <note>`; the crew never publishes it.
- (gicp-400-u00-media_assemble, media_assemble, claude_crew) `youtube.upload` is at its 4/4 daily cap, held until 2026-11-27T19:00:00Z (00:00 PKT Nov 28); any further upload that day holds.
- (gicp-400-u00-media_assemble, media_assemble, claude_crew) `T sheet` must-watch is `efmp-406-ur` (first ur teaser); gicp-400-ur is one of 4 ready items but not must-watch (clips gate `pass`, no notes). Accepted owner notes: shot 5 soap bubbles, shot 4 ornate verandah, shots 2-3 are 82% crops.
- (gicp-400-u00-teaser_clips, teaser_clips, claude) assemble with chosen takes shot1 t1, shot2 t3, shot3 t3, shot4 t1, shot5 t1 (in `~/studio-media/teasers/gicp-400/ur/`); shots 2 and 3 have no takes left.
- (gicp-400-u00-teaser_clips, teaser_clips, claude) for the owner sheet, point to the soap bubbles in shot 5 and the ornate verandah in shot 4; check the caption crop on shots 2 and 3, which were enlarged from an 82% crop.


## Response snapshot

Published the owner-approved GICP-400 Urdu teaser (moAasL2nNZs public), advanced its ledger to `public`, and refreshed teaser-stats.json.

## Outcome

- Impact: media_publish for GICP-400 Unit 0 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 3 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Published the owner-approved GICP-400 Urdu teaser (moAasL2nNZs public), advanced its ledger to `public`, and refreshed teaser-stats.json.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Owner still needs to pin the comment from `teaser.mjs meta gicp-400-ur` (the MCP has no comment tool) and may set the Short's "Related video" in YouTube Studio.
  - `published_at` in the ledger is this job's write time, not YouTube's publish timestamp (YouTube shows 2026-11-27T10:42:38Z).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
