---
id: 20261272
title: EFMP-406 Urdu teaser assembled, uploaded private and QG3-passed
stage: green
date: 2026-11-25
surface: agent
model: LongCat-2.5
feature: 030-media-studio
branch: crew/efmp-406-u00-media_assemble
user: M Yousif Channa
command: crew media_assemble
labels: [claude_crew, media-studio, studio-teaser]
links:
  spec: specs/030-media-studio/spec.md
  ticket: null
  adr: history/adr/0037-unified-media-studio.md
  pr: null
files:
  - specs/studio/teasers/media-teasers.json
  - history/prompts/030-media-studio/20261272-efmp-406-teaser-assemble-upload.green.prompt.md
tests:
  - scripts/heavy.sh node scripts/notebook-studio/media-qa.mjs ~/studio-media/teasers/efmp-406/ur/teaser.mp4 --kind short --stage encoded (pass)
  - npm run check:content (all 14 gates pass)
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

Continued from `clips-qa` (no branch commits ahead of main; the ledger on main already held the
approved script and five passing takes). Assembled the Short from the chosen takes
(shot 1 t1, 2 t1, 3 t1, 4 t1, 5 t2) with the recipe's teaser@3 speed, ran encoded QG1, inspected
the end card, a nine-frame grid and the phone-size thumbnail, then uploaded private.
- Assemble: 29.367 s, 1080x1920, h264/aac, thumbnail `teaser.thumb.jpg`.
- QG1 encoded: pass, -16.3 LUFS, -3.1 dBTP, 0 silences, 0 black runs.
- Visual check: captions fully visible and Urdu RTL correct in every frame; end card headline,
  CTA and the exact address `/ur/semester-3/efmp-406/course-overview/`; thumbnail hook reads at
  phone size.
- Upload: pacing `check youtube.upload` returned `go`; `upload_video` private returned
  `DQxspPM4QmE`; `pacing record` done; `update_video` set playlist `PLCJn7gAoYIJs` and the custom
  thumbnail (both `success`).
- QG3: `list_videos` shows `DQxspPM4QmE` private with title and description intact.
Advanced `assembled`, `qa-pass`, `uploaded-private`, `qa3-pass`. Nothing was made public.

## Outcome

- ✅ Impact: efmp-406-ur is at `qa3-pass` with YouTube id `DQxspPM4QmE` (private). The owner now watches it and replies `crew publish efmp-406-ur` or `crew reject efmp-406-ur <note>`.
- 🧪 Tests: encoded QG1 pass; `npm run check:content` all 14 gates pass.
- 📁 Files: ledger item efmp-406-ur and this PHR.
- 🔁 Next prompts: `crew publish efmp-406-ur` (owner only) then `media_publish`, or a reject note to remake.
- 🧠 Reflection: pacing `check` returned `go` at 18:48 PKT and the upload recorded cleanly; the assembled Short is 29.37 s at the recipe's 1.4x voice.

## Handoff (for CEO and agents)

- Shipped / changed: efmp-406-ur advanced `clips-qa → assembled → qa-pass → uploaded-private → qa3-pass`; private YouTube Short `DQxspPM4QmE` with playlist and custom thumbnail.
- Decisions the team must respect: assembly used shot 5 take 2 (take 1 failed on drawn viewfinder marks). The video is private; only the owner's `crew publish` may make it public (FR-013). Do not re-upload for text edits, use `yt-describe.mjs`.
- Pending / next owner: the owner's spot-check (`crew publish efmp-406-ur` or `crew reject efmp-406-ur <note>`). Publication, the pinned comment and cross-posting follow only after that.
- Paperclip issues affected: none (Paperclip retired; crew board tracks this).

## Evaluation notes (flywheel)

- Failure modes observed: none new; the known shot 5 viewfinder failure was avoided by using take 2.
- Graders run and results (PASS/FAIL): encoded QG1 PASS; check:content PASS (14/14); QG3 PASS.
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none.
