---
id: crew-efmp-407-u00-media_publish
title: crew media_publish EFMP-407 unit 0
stage: misc
date: 2026-11-28
surface: agent
model: claude_crew
feature: efmp-407
branch: crew/efmp-407-u00-media_publish
user: crew
command: crew media_publish
labels: ["crew", "claude_crew", "media_publish"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-407/crew-efmp-407-u00-media_publish.misc.prompt.md
 - specs/studio/teaser-stats.json
 - specs/studio/teasers/media-teasers.json
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-407-u00-media_publish

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u00-media_publish`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
The owner approved publishing efmp-407-ur (`crew publish` via web at 2026-11-27T20:17:02.045Z, video Xgx6-JJ5ReY). If the item is `qa3-pass`, advance it: `node scripts/notebook-studio/teaser.mjs advance efmp-407-ur approved --json '{"gates":{"owner":{"verdict":"approve","by":"owner","date":"2026-11-27","note":"crew publish via web"}}}'`. Then set exactly that video (Xgx6-JJ5ReY) public with youtube-uploader `update_video` (privacy_status public), confirm with `list_videos`, and advance to `public` with `{"published_at":"<now ISO>"}`. Then run `node scripts/notebook-studio/teaser-stats.mjs` and commit `specs/studio/teaser-stats.json` (the home page ranks teasers by it). Change no other video.

Follow `.claude/skills/studio-teaser/SKILL.md` exactly; read it and every file it references before starting.

## Scope
The EFMP-407 teaser only: `specs/studio/teasers/efmp-407.json` and its own item in `specs/studio/teasers/media-teasers.json` (no other item), plus your PHR. Media files live under ~/studio-media and never enter git.

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
- (efmp-407-u00-media_assemble-r1, media_assemble, claude_crew) The owner now watches the private Short at https://youtube.com/shorts/Xgx6-JJ5ReY and replies `crew publish efmp-407-ur` (or `crew reject efmp-407-ur <note>`); the publish job sets that one video public and commits specs/studio/teaser-stats.json.
- (efmp-407-u00-media_assemble-r1, media_assemble, claude_crew) `youtube.upload` is 2/4 today and held until 2026-11-26T21:50:29Z, so any further YouTube upload must re-check pacing first.
- (efmp-407-u00-media_assemble-r1, media_assemble, claude_crew) Shot 3 assembles from take 2; take 1 is the failed REC-overlay clip and must not be used.
- (efmp-407-u00-media_assemble, media_assemble, claude_crew) efmp-407-ur is at qa-pass; the next job re-checks `youtube.upload` (held until 2026-11-26T20:22:25.607Z), uploads private, then `update_video` with playlist `PLCJn7gAoYIJs` and the recorded thumbnail, QG3, `qa3-pass`.
- (efmp-407-u00-media_assemble, media_assemble, claude_crew) shot 3 assembles from take 2 (take 1 is the failed REC-overlay clip); nothing may be made public until the owner's `crew publish efmp-407-ur`.


## Response snapshot

Published the owner-approved EFMP-407 Urdu teaser Xgx6-JJ5ReY, recorded the owner gate and published_at in the teaser ledger, and refreshed specs/studio/teaser-stats.json, all committed with the PHR.

## Outcome

- Impact: media_publish for EFMP-407 Unit 0 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 3 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Published the owner-approved EFMP-407 Urdu teaser Xgx6-JJ5ReY, recorded the owner gate and published_at in the teaser ledger, and refreshed specs/studio/teaser-stats.json, all committed with the PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - `youtube.upload` is at its 4/4 daily cap until 2026-11-28T19:00:00Z; re-check pacing before any further upload.
  - Cross-posting (studio-teaser step 11) is now unblocked for this public Short; render the platform variant, QG1 it, then `social-post.mjs post <platform> efmp-407-ur <file>`.
  - efmp-406-ur (DQxspPM4QmE) and efpg-401-ur (-mJSyWxcAyA) also hold `crew publish` approvals and are still private; they belong to other jobs.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
