---
id: crew-geng-300-u01-studio_media-r1
title: crew studio_media GENG-300 unit 1
stage: misc
date: 2026-11-26
surface: agent
model: claude_crew
feature: geng-300
branch: crew/geng-300-u01-studio_media-r1
user: crew
command: crew studio_media
labels: ["crew", "claude_crew", "studio_media"]
links:
  spec: specs/content/geng-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/030-media-studio/20261283-geng-300-unit-1-studio-media-r1.green.prompt.md
 - specs/studio/geng-300/media-unit-01.json
tests:
 - npm run check:content
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

Uploaded GENG-300 Unit 1 t2-en-audio-p1 private (DPYt3jQonhw), passed QG3 and advanced it to qa3-pass, then stopped at the youtube.upload hourly cap with three items still at qa2-pass, committing the ledger and PHR.

## Outcome

- Impact: studio_media for GENG-300 Unit 1 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Uploaded GENG-300 Unit 1 t2-en-audio-p1 private (DPYt3jQonhw), passed QG3 and advanced it to qa3-pass, then stopped at the youtube.upload hourly cap with three items still at qa2-pass, committing the ledger and PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - youtube.upload is at its hourly cap of 1; next allowed 2026-11-26T20:22:25Z (4 a day). Remaining qa2-pass items for the next media-hours run: t2-en-video, t3-en-audio-p1 (audio playlist PLLdTwYdZvUFc), t3-en-video (still no GENG-300 video playlist on the channel).
  - t2-en-audio-p1 is private at qa3-pass (https://youtu.be/DPYt3jQonhw). The t1 items Fre7sTw5_6c and ENYN7SBfvio now list as PUBLIC on the channel although the ledger still says qa3-pass, so the owner should still reply `crew approve-studio geng-300 1` to record approval.
  - `list_videos` with `privacy_status=private` is the reliable way to confirm what is still private; the tags array mismatch recurs on every upload and is fixed with `yt-describe.mjs unit geng-300 1 <key>`.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
