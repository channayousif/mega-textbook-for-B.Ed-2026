---
id: crew-efmp-406-u00-media_assemble
title: crew media_assemble EFMP-406 unit 0
stage: misc
date: 2026-11-25
surface: agent
model: claude_crew
feature: efmp-406
branch: crew/efmp-406-u00-media_assemble
user: crew
command: crew media_assemble
labels: ["crew", "claude_crew", "media_assemble"]
links:
  spec: specs/content/efmp-406/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/030-media-studio/20261272-efmp-406-teaser-assemble-upload.green.prompt.md
 - specs/studio/teasers/media-teasers.json
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-406-u00-media_assemble

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-406-u00-media_assemble`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Assemble and upload the efmp-406-ur Short PRIVATE (studio-teaser skill, steps 8-10). From the ledger's chosen takes, run `scripts/heavy.sh node scripts/notebook-studio/assemble-teaser.mjs efmp-406 ur ~/studio-media/teasers/efmp-406/ur/teaser.mp4 <shot1> ... <shot5>` (its speed and length limit come from the script's recipe; a teaser@2 or teaser@3 Short over 30 s fails), then `scripts/heavy.sh node scripts/notebook-studio/media-qa.mjs <out> --kind short --stage encoded`, look at the end card and thumbnail, and advance to `assembled` and `qa-pass`. Upload with youtube-uploader `upload_video` using `node scripts/notebook-studio/teaser.mjs meta efmp-406-ur` (privacy_status private, the AI-content disclosure on), then `update_video` with the playlist and thumbnail, and advance to `uploaded-private`. Before every YouTube upload run `node scripts/media/pacing.mjs check youtube.upload`: if it prints `hold`, upload nothing more, keep the ledger at the state reached, print one CREW-HANDOFF line with the next allowed time and stop. Right after each successful upload run `node scripts/media/pacing.mjs record youtube.upload`. QG3: `list_videos` shows it private and processed, title and description intact; advance to `qa3-pass`. Continue from whatever state the item is in. The owner watches it and replies `crew publish efmp-406-ur` or `crew reject efmp-406-ur <note>`. Never make a video public, unlisted or scheduled: every upload is `privacy_status: private` and only the owner's `crew publish` starts the one job that may publish (FR-013).

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
- (efmp-406-u00-teaser_clips-r1, teaser_clips, claude) Assemble with shot 5 take 2, not take 1, which failed on drawn viewfinder marks.
- (efmp-406-u00-teaser_clips-r1, teaser_clips, claude) The viewfinder marks showed only in the third strip frame, so check that frame at full size when reviewing presenter close-ups.
- (efmp-406-u00-teaser_clips, teaser_clips, claude) MEDIA-HOLD: held - waiting for the owner: make shot 4 in Flow from /home/a2ahs/studio-media/inbox/efmp-406-ur-prompts.html and save it as efmp-406-ur_shot-4.mp4
- (efmp-406-u00-teaser_clips, teaser_clips, claude) Shot 2 was never sent to Flow because gflow's credit check errored, so it was not billed; shots 2, 4 and 5 all still need a first take. Check the gflow serve window on the PC, then rerun `node scripts/media/teaser-clips.mjs efmp-406`.
- (efmp-406-u00-teaser_script, teaser_script, claude) `objectives` are omitted because `parseOverview` (`scripts/notebook-studio/describe.mjs`) expects "## Course learning outcomes" but the EFMP-406 overview says "## Learning outcomes"; this is metadata only, so they can be added later without reopening the approval.


## Response snapshot

Assembled the EFMP-406 Urdu Short from the passing takes, passed encoded QG1, uploaded it private as DQxspPM4QmE with playlist and thumbnail, and advanced the ledger to qa3-pass.

## Outcome

- Impact: media_assemble for EFMP-406 Unit 0 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Assembled the EFMP-406 Urdu Short from the passing takes, passed encoded QG1, uploaded it private as DQxspPM4QmE with playlist and thumbnail, and advanced the ledger to qa3-pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Owner spot-check is next: watch https://youtube.com/shorts/DQxspPM4QmE (private) and reply `crew publish efmp-406-ur` or `crew reject efmp-406-ur <note>`.
  - Nothing may be made public until that owner command; shot 5 take 1 stays recorded as failed (drawn viewfinder marks), so do not reuse it.
  - If a text fix is ever needed, use `yt-describe.mjs`, never a re-upload.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
