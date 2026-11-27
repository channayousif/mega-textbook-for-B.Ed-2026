---
id: 20261294
title: EFMP-407 Urdu teaser uploaded private, playlist and thumbnail set, QG3 passed
stage: green
date: 2026-11-27
surface: agent
model: claude_crew
feature: 030-media-studio
branch: crew/efmp-407-u00-media_assemble-r1
user: crew
command: crew media_assemble
labels: ["crew", "claude_crew", "media_assemble", "efmp-407"]
links:
  spec: specs/030-media-studio/spec.md
  ticket: null
  adr: history/adr/0037-unified-media-studio.md
  pr: null
files:
  - specs/studio/teasers/media-teasers.json
  - history/prompts/030-media-studio/20261294-efmp-407-teaser-upload-private-qa3.green.prompt.md
tests:
  - node scripts/notebook-studio/media-qa.mjs ~/studio-media/teasers/efmp-407/ur/teaser.mp4 --kind short --stage encoded (pass, 28.9 s)
  - npm run check:content (14/14 PASS)
  - node scripts/media/pacing.mjs check youtube.upload (go)
  - list_videos QG3: Xgx6-JJ5ReY private, title and description intact
---

## Prompt

# Crew job efmp-407-u00-media_assemble-r1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u00-media_assemble-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Assemble and upload the efmp-407-ur Short PRIVATE (studio-teaser skill, steps 8-10). From the ledger's chosen takes, run `scripts/heavy.sh node scripts/notebook-studio/assemble-teaser.mjs efmp-407 ur ~/studio-media/teasers/efmp-407/ur/teaser.mp4 <shot1> ... <shot5>` (its speed and length limit come from the script's recipe; a teaser@2 or teaser@3 Short over 30 s fails), then `scripts/heavy.sh node scripts/notebook-studio/media-qa.mjs <out> --kind short --stage encoded`, look at the end card and thumbnail, and advance to `assembled` and `qa-pass`. Upload with youtube-uploader `upload_video` using `node scripts/notebook-studio/teaser.mjs meta efmp-407-ur` (privacy_status private, the AI-content disclosure on), then `update_video` with the playlist and thumbnail, and advance to `uploaded-private`. Before every YouTube upload run `node scripts/media/pacing.mjs check youtube.upload`: if it prints `hold`, upload nothing more, keep the ledger at the state reached, print one CREW-HANDOFF line with the next allowed time and stop. Right after each successful upload run `node scripts/media/pacing.mjs record youtube.upload`. QG3: `list_videos` shows it private and processed, title and description intact; advance to `qa3-pass`. Continue from whatever state the item is in. The owner watches it and replies `crew publish efmp-407-ur` or `crew reject efmp-407-ur <note>`. Never make a video public, unlisted or scheduled: every upload is `privacy_status: private` and only the owner's `crew publish` starts the one job that may publish (FR-013).

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
- (efmp-407-u00-media_assemble, media_assemble, claude_crew) efmp-407-ur is at qa-pass; the next job re-checks `youtube.upload` (held until 2026-11-26T20:22:25.607Z), uploads private, then `update_video` with playlist `PLCJn7gAoYIJs` and the recorded thumbnail, QG3, `qa3-pass`.
- (efmp-407-u00-media_assemble, media_assemble, claude_crew) shot 3 assembles from take 2 (take 1 is the failed REC-overlay clip); nothing may be made public until the owner's `crew publish efmp-407-ur`.
- (efmp-407-u00-teaser_clips, teaser_clips, claude_crew) Shot 3 assembles from take 2; take 1 is the failed REC-overlay clip, so `assemble-teaser.mjs efmp-407 ur <out> 1 2 3 4 5` resolves the right take via `chosenTakes`.
- (efmp-407-u00-teaser_clips, teaser_clips, claude_crew) `youtube.upload` is at its 4/4 daily cap until 2026-11-26T19:00:00Z (00:00 PKT Nov 27), so an upload attempt before then will hold.
- (efmp-407-u00-teaser_clips, teaser_clips, claude_crew) PHR id 20261283 was the next free id on origin/main at commit time (20261245 was already taken).

## Response snapshot

Continued from qa-pass. Re-ran encoded QG1 (28.9 s, 1080x1920, -14.8 LUFS, -3.0 dBTP, no silence or black runs), checked the end card and the phone-size thumbnail, confirmed pacing go, uploaded the Short private as Xgx6-JJ5ReY with the AI disclosure on, set the teaser playlist PLCJn7gAoYIJs and the custom thumbnail, recorded the upload, and passed QG3. The ledger is at qa3-pass and the owner now watches the private Short.

## Outcome

- Impact: media_assemble for EFMP-407 Unit 0 by claude_crew, resume run from qa-pass to qa3-pass.
- Tests: media-qa pass; check:content 14/14 PASS; pacing check go; list_videos QG3 pass.
- Files: 2 file(s), listed above.
- Next prompts: the owner replies `crew publish efmp-407-ur` (or `crew reject efmp-407-ur <note>`); the publish job then sets that one video public and commits specs/studio/teaser-stats.json.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: uploaded the EFMP-407 Urdu Short private as Xgx6-JJ5ReY, set the teaser playlist PLCJn7gAoYIJs and the custom thumbnail, and advanced the ledger from qa-pass to qa3-pass.
- Decisions the team must respect: private only, no crew code may set it public (FR-013); shot 3 is take 2 (take 1 is the failed REC-overlay clip).
- Pending / next owner: the owner watches the private Short and replies `crew publish efmp-407-ur` or `crew reject efmp-407-ur <note>`.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): media-qa PASS; check:content 14/14 PASS; pacing check go
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
