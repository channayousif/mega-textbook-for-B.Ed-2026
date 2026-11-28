---
id: crew-efmp-406-u00-media_publish
title: crew media_publish EFMP-406 unit 0
stage: misc
date: 2026-11-27
surface: agent
model: claude
feature: efmp-406
branch: crew/efmp-406-u00-media_publish
user: crew
command: crew media_publish
labels: ["crew", "claude", "media_publish"]
links:
  spec: specs/content/efmp-406/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/030-media-studio/20261309-efmp-406-teaser-publish.green.prompt.md
 - specs/studio/teaser-stats.json
 - specs/studio/teasers/media-teasers.json
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-406-u00-media_publish

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-406-u00-media_publish`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
The owner approved publishing efmp-406-ur (`crew publish` via web at 2026-11-27T20:17:01.529Z, video DQxspPM4QmE). If the item is `qa3-pass`, advance it: `node scripts/notebook-studio/teaser.mjs advance efmp-406-ur approved --json '{"gates":{"owner":{"verdict":"approve","by":"owner","date":"2026-11-27","note":"crew publish via web"}}}'`. Then set exactly that video (DQxspPM4QmE) public with youtube-uploader `update_video` (privacy_status public), confirm with `list_videos`, and advance to `public` with `{"published_at":"<now ISO>"}`. Then run `node scripts/notebook-studio/teaser-stats.mjs` and commit `specs/studio/teaser-stats.json` (the home page ranks teasers by it). Change no other video.

Follow `.claude/skills/studio-teaser/SKILL.md` exactly; read it and every file it references before starting.

## Scope
The EFMP-406 teaser only: `specs/studio/teasers/efmp-406.json` and its own item in `specs/studio/teasers/media-teasers.json` (no other item), plus your PHR. Media files live under ~/studio-media and never enter git.

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
- (efmp-406-u00-media_assemble, media_assemble, claude_crew) Owner spot-check is next: watch https://youtube.com/shorts/DQxspPM4QmE (private) and reply `crew publish efmp-406-ur` or `crew reject efmp-406-ur <note>`.
- (efmp-406-u00-media_assemble, media_assemble, claude_crew) Nothing may be made public until that owner command; shot 5 take 1 stays recorded as failed (drawn viewfinder marks), so do not reuse it.
- (efmp-406-u00-media_assemble, media_assemble, claude_crew) If a text fix is ever needed, use `yt-describe.mjs`, never a re-upload.
- (efmp-406-u00-teaser_clips-r1, teaser_clips, claude) Assemble with shot 5 take 2, not take 1, which failed on drawn viewfinder marks.
- (efmp-406-u00-teaser_clips-r1, teaser_clips, claude) The viewfinder marks showed only in the third strip frame, so check that frame at full size when reviewing presenter close-ups.


## Response snapshot

Recorded the already-public EFMP-406 Urdu teaser (DQxspPM4QmE) as owner-approved and public, refreshed the teaser view stats and added the PHR, without changing any video on YouTube.

## Outcome

- Impact: media_publish for EFMP-406 Unit 0 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 3 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Recorded the already-public EFMP-406 Urdu teaser (DQxspPM4QmE) as owner-approved and public, refreshed the teaser view stats and added the PHR, without changing any video on YouTube.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - DQxspPM4QmE was public before the recorded owner approval (YouTube publishedAt 2026-11-26T15:58:17Z, `crew publish` 2026-11-27T20:17:01Z); cause unknown, owner to confirm.
  - the ledger `published_at` (2026-11-27T22:56:33Z) is the recording time, not YouTube's publish time.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
