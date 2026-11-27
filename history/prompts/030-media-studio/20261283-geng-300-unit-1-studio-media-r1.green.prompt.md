---
id: 20261283
title: GENG-300 Unit 1 Study Studio media (resume r1)
stage: green
date: 2026-11-26
surface: agent
model: claude_crew
feature: 030-media-studio
branch: crew/geng-300-u01-studio_media-r1
user: crew
command: crew studio_media
labels: ["crew", "claude_crew", "studio_media", "geng-300"]
links:
  spec: specs/030-media-studio/spec.md
  ticket: null
  adr: history/adr/0037-unified-media-studio.md
  pr: null
files:
 - specs/studio/geng-300/media-unit-01.json
 - history/prompts/030-media-studio/20261283-geng-300-unit-1-studio-media-r1.green.prompt.md
tests:
 - npm run check:content (14/14 PASS)
 - node scripts/check-studio-manifest.mjs (2 manifests OK)
 - node scripts/media/pacing.mjs check youtube.upload (go, then hold at the hourly cap)
---

## Prompt

# Crew job geng-300-u01-studio_media-r1

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-300-u01-studio_media-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Run the Study Studio of GENG-300 Unit 1 (studio-media skill), audio and video. Read `node scripts/notebook-studio/media-ledger.mjs status GENG-300 1` and carry every item that is not blocked from its current state up to `qa3-pass`: generate, download, QG1, encode, QG2 (your own transcript check against the topic text), upload PRIVATE, QG3. Never edit the ledger by hand; every change goes through `node scripts/notebook-studio/media-ledger.mjs advance`. Before every NotebookLM `studio_create` run `node scripts/media/pacing.mjs check nlm.studio`: on `hold`, create nothing more, print one CREW-HANDOFF line with the next allowed time and stop. Right after each successful creation run `node scripts/media/pacing.mjs record nlm.studio`. Before every YouTube upload run `node scripts/media/pacing.mjs check youtube.upload`: if it prints `hold`, upload nothing more, keep the ledger at the state reached, print one CREW-HANDOFF line with the next allowed time and stop. Right after each successful upload run `node scripts/media/pacing.mjs record youtube.upload`. A hold is normal: commit what you advanced and stop with the CREW-HANDOFF line; the crew resumes in the next media hours. When every item is at `qa3-pass`, run `node scripts/notebook-studio/media-ledger.mjs sheet GENG-300 1` and print one CREW-HANDOFF line with the private links the owner should watch and "reply `crew approve-studio GENG-300 1`". If `nlm` reports expired cookies, stop and print one CREW-HANDOFF line asking the owner to run `nlm login`; commit nothing else. Commit `specs/studio/geng-300/media-unit-01.json` with your PHR. Never make a video public, unlisted or scheduled: every upload is `privacy_status: private` and only the owner's `crew publish` starts the one job that may publish (FR-013).

Follow `.claude/skills/studio-media/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GENG-300 Unit 1 Study Studio only: `specs/studio/geng-300/media-unit-01.json` and its manifest row, plus your PHR. Media files live under ~/studio-media and never enter git.

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
- (geng-300-u01-studio_media, studio_media, claude_crew) youtube.upload is 4/4 and nlm.studio is 6/6, both held until 2026-11-26T19:00:00Z; the four qa2-pass items (t2-en-audio-p1, t2-en-video, t3-en-audio-p1, t3-en-video) still need a private upload, QG3 and `sheet geng-300 1`.
- (geng-300-u01-studio_media, studio_media, claude_crew) owner spot-check the two private links https://youtu.be/Fre7sTw5_6c and https://youtu.be/ENYN7SBfvio, then reply `crew approve-studio geng-300 1`; the t1 video QG2 note flags that `topic-01.mdx:52` reads backwards (it says "we commit a mistake (not make a mistake)").
- (geng-300-u01-studio_media, studio_media, claude_crew) no GENG-300 video playlist exists on the channel, so both videos went up without one (add it with `update_video` later); the nlm session from `nlm login --provider openclaw` expires within minutes, so refresh it and call `refresh_auth` before each NotebookLM MCP call.
- (geng-300-u01-repair_en-r1, repair_en, claude) run7c5e7ce2 is older than run41b4c5ae, yet the job planner picked it as the latest report, probably because it sorts filenames alphabetically ("run4…" before "run7…"). It may choose a stale report again for other units.
- (geng-300-u01-repair_en-r1, repair_en, claude) All G3 findings for Unit 1 are resolved (8a0b7828, 3a482d34). The next step is a fresh G3 run on the current HEAD, not another repair.

## Response snapshot

Resumed GENG-300 Unit 1 Study Studio from the ledger state left by the earlier run. The two t1 items were already at qa3-pass; the four t2/t3 items were at qa2-pass. Built the YouTube metadata for all four, checked the pacing channel, uploaded t2-en-audio-p1 private (DPYt3jQonhw), set its playlist, thumbnail and synthetic-media disclosure with update_video, repaired its tags in place with yt-describe.mjs, verified it with the YouTube Data API (private, processed, in PLLdTwYdZvUFc) and advanced it to qa3-pass. The youtube.upload hourly cap then held, so the remaining three items stay at qa2-pass.

## Outcome

- ✅ Impact: studio_media for GENG-300 Unit 1 by claude_crew (resume r1): t2-en-audio-p1 now PRIVATE at qa3-pass (DPYt3jQonhw, EN audio podcast playlist PLLdTwYdZvUFc); t2-en-video, t3-en-audio-p1 and t3-en-video remain at qa2-pass.
- 🧪 Tests: npm run check:content 14/14 PASS; check-studio-manifest 2 manifests OK; pacing go then hold as designed.
- 📁 Files: specs/studio/geng-300/media-unit-01.json, this PHR. Media only under ~/studio-media, never git.
- 🔁 Next prompts: the next media-hours run uploads t2-en-video, t3-en-audio-p1 and t3-en-video private one at a time at the 45-minute pacing gap (audio to PLLdTwYdZvUFc, video with no course playlist), repairs tags, runs QG3, advances to qa3-pass, then media-ledger.mjs sheet geng-300 1 for the owner.
- 🧠 Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: t2-en-audio-p1 PRIVATE at qa3-pass (DPYt3jQonhw) in the EN audio podcast playlist PLLdTwYdZvUFc, custom thumbnail and contains_synthetic_media set, tags repaired. Note: t1-en-audio-p1 (Fre7sTw5_6c) and t1-en-video (ENYN7SBfvio) now appear PUBLIC on the channel although the ledger still records qa3-pass, so the owner has already published them by hand; the owner should still reply crew approve-studio geng-300 1 to record the approval in the ledger.
- Decisions the team must respect: Private first; every ledger change through media-ledger.mjs advance; never edit the ledger by hand. No GENG-300 video playlist exists on the channel, so the videos upload without a playlist; add one with update_video when the owner creates it.
- Pending / next owner: Claude (next media-hours run, from 2026-11-26T20:22:25Z): youtube.upload is at its hourly cap of 1 (next allowed 2026-11-26T20:22:25Z; 4 a day). Upload t2-en-video, t3-en-audio-p1 and t3-en-video private one at a time, update_video with thumbnail and contains_synthetic_media, repair tags with yt-describe.mjs, run list_videos for QG3, advance to qa3-pass, then sheet geng-300 1. Owner: spot-check the private links and reply crew approve-studio geng-300 1.
- Paperclip issues affected: none

## Evaluation notes (flywheel)

- Failure modes observed: The youtube-uploader MCP still splits a tags array into per-element quoted strings on upload; yt-describe.mjs unit repairs them in place (verified through the YouTube Data API). list_videos with privacy_status=private is a reliable way to confirm what is still private.
- Graders run and results (PASS/FAIL): check:content 14/14 PASS; check-studio-manifest 2 manifests OK; pacing check go then hold at the hourly cap.
- Prompt variant (if applicable): crew brief v1 (r1)
- Next experiment (smallest change to try): none; the pacing hold is the intended stop.
