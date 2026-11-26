---
id: 20261282
title: GENG-300 Unit 1 Study Studio media
stage: green
date: 2026-11-26
surface: agent
model: claude_crew
feature: 030-media-studio
branch: crew/geng-300-u01-studio_media
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
 - specs/studio/geng-300/unit-01.json
 - specs/studio/geng-300/unit-01-mnemonics.md
 - history/prompts/030-media-studio/20261282-geng-300-unit-1-study-studio-media.green.prompt.md
tests:
 - npm run check:content (14/14 PASS)
 - node scripts/check-studio-manifest.mjs (2 manifests OK)
 - node scripts/media/pacing.mjs check nlm.studio / youtube.upload (holds as expected)
---

## Prompt

# Crew job geng-300-u01-studio_media

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-300-u01-studio_media`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Run the Study Studio of GENG-300 Unit 1 (studio-media skill), audio and video. This unit has no Study Studio ledger yet: plan it first (studio-media skill, step 1). For every topic of the unit, plan one audio brief (part 1) and one video in English with `node scripts/notebook-studio/media-ledger.mjs plan GENG-300 1 --json '...'` (prompts `specs/studio/prompts/audio.md` and `video.md`, a title and alt text from the topic itself), and the same two in Urdu when the topic's Urdu mirror exists. Build the source pack and the notebook as the skill says. Read `node scripts/notebook-studio/media-ledger.mjs status GENG-300 1` and carry every item that is not blocked from its current state up to `qa3-pass`: generate, download, QG1, encode, QG2 (your own transcript check against the topic text), upload PRIVATE, QG3. Never edit the ledger by hand; every change goes through `node scripts/notebook-studio/media-ledger.mjs advance`. Before every NotebookLM `studio_create` run `node scripts/media/pacing.mjs check nlm.studio`: on `hold`, create nothing more, print one CREW-HANDOFF line with the next allowed time and stop. Right after each successful creation run `node scripts/media/pacing.mjs record nlm.studio`. Before every YouTube upload run `node scripts/media/pacing.mjs check youtube.upload`: if it prints `hold`, upload nothing more, keep the ledger at the state reached, print one CREW-HANDOFF line with the next allowed time and stop. Right after each successful upload run `node scripts/media/pacing.mjs record youtube.upload`. A hold is normal: commit what you advanced and stop with the CREW-HANDOFF line; the crew resumes in the next media hours. When every item is at `qa3-pass`, run `node scripts/notebook-studio/media-ledger.mjs sheet GENG-300 1` and print one CREW-HANDOFF line with the private links the owner should watch and "reply `crew approve-studio GENG-300 1`". If `nlm` reports expired cookies, stop and print one CREW-HANDOFF line asking the owner to run `nlm login`; commit nothing else. Commit `specs/studio/geng-300/media-unit-01.json` with your PHR. Never make a video public, unlisted or scheduled: every upload is `privacy_status: private` and only the owner's `crew publish` starts the one job that may publish (FR-013).

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
- (geng-300-u01-repair_en-r1, repair_en, claude) run7c5e7ce2 is older than run41b4c5ae, yet the job planner picked it as the latest report, probably because it sorts filenames alphabetically ("run4…" before "run7…"). It may choose a stale report again for other units.
- (geng-300-u01-repair_en-r1, repair_en, claude) All G3 findings for Unit 1 are resolved (8a0b7828, 3a482d34). The next step is a fresh G3 run on the current HEAD, not another repair.
- (geng-300-u01-review_en-r1-conflict1, fix, agy) G3 review for GENG-300 Unit 1 remains open and unsigned (cycle 2 advisory pass recorded under ADR-0019).
- (geng-300-u01-review_en-r1-conflict1, fix, agy) GENG-300 is English-only (bilingual: false) so G4 translation and G5 Urdu review are waived; next pipeline step is G6 asset review.
- (geng-300-u01-review_en-r1, review_en, agy) GENG-300 Unit 1 G3 review cycle 2 completed with disposition pass; all three prior blocking defects were confirmed resolved in commit 8a0b7828.

## Response snapshot

Planned and generated all six GENG-300 Unit 1 Study Studio items (three topics, English audio brief and video each; the course is English-only so there is no Urdu mirror), built the unit notebook and source packs, and carried two items to qa3-pass with private YouTube uploads. The other four passed QG1, encoded and passed the QG2 transcript check, and wait for the daily YouTube upload cap to reset at 19:00Z.

## Outcome

- ✅ Impact: studio_media for GENG-300 Unit 1 by claude_crew (attempt 1): six items planned and generated, two at qa3-pass private on YouTube, four at qa2-pass.
- 🧪 Tests: npm run check:content 14/14 PASS; check-studio-manifest 2 manifests OK; pacing holds obeyed.
- 📁 Files: specs/studio/geng-300/media-unit-01.json, specs/studio/geng-300/unit-01.json, specs/studio/geng-300/unit-01-mnemonics.md, this PHR. Media only under ~/studio-media, never git.
- 🔁 Next prompts: the next media-hours run uploads the four qa2-pass items private after the youtube.upload cap resets, runs QG3, then media-ledger.mjs sheet geng-300 1 for the owner.
- 🧠 Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Six items planned and generated. t1-en-audio-p1 PRIVATE at qa3-pass (Fre7sTw5_6c, EN audio podcast playlist PLLdTwYdZvUFc) and t1-en-video PRIVATE at qa3-pass (ENYN7SBfvio, no course playlist exists yet). t2-en-audio-p1, t2-en-video, t3-en-audio-p1 and t3-en-video are at qa2-pass with encoded mp4 and thumbnail.
- Decisions the team must respect: Private first; every ledger change through media-ledger.mjs advance; never edit the ledger by hand. No GENG-300 video playlist exists on the channel, so the two videos were uploaded without a playlist; add one with update_video when the owner creates it. The unit manifest was created with six planned rows so place-media.mjs can update them at publication.
- Pending / next owner: Claude (next media-hours run, from 2026-11-26T19:00:00Z): youtube.upload is 4/4 for the day and nlm.studio is 6/6, both held until 19:00:00Z. Upload the four qa2-pass items private one at a time at the 45-minute pacing gap (audio to PLLdTwYdZvUFc, video with no playlist), update_video with thumbnail and contains_synthetic_media, repair tags with yt-describe.mjs, run list_videos for QG3, advance to qa3-pass, then sheet geng-300 1. Owner: spot-check the two private links and reply crew approve-studio geng-300 1.
- Paperclip issues affected: none

## Evaluation notes (flywheel)

- Failure modes observed: The NotebookLM session obtained with nlm login --provider openclaw expires after a few minutes, and the notebooklm-mcp server caches its client, so every MCP call needs a fresh nlm login followed by the refresh_auth tool. The youtube-uploader MCP splits a tags array into per-element quoted strings; yt-describe.mjs unit repairs them in place.
- Graders run and results (PASS/FAIL): check:content 14/14 PASS; check-studio-manifest 2 manifests OK; pacing check go then hold at the daily caps, as expected.
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): Have the notebooklm-mcp client reload on an auth-file mtime change, or record that a crew run must call refresh_auth after every nlm login.
