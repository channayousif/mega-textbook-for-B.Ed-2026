---
id: 2479
title: Study Studio media pipeline skill with YouTube MCP and quality gates
stage: green
date: 2026-11-09
surface: agent
model: claude-opus-5-5
feature: 029-notebook-studio
branch: feat/029-notebook-studio
user: M Yousif Channa
command: none
labels: [board-direct, notebook-studio, youtube, media-pipeline, skill]
links:
  spec: specs/029-notebook-studio/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - .claude/skills/studio-media/SKILL.md
  - scripts/notebook-studio/media-ledger.mjs
  - scripts/notebook-studio/media-qa.mjs
  - scripts/notebook-studio/audio-to-video.mjs
  - scripts/notebook-studio/youtube-meta.mjs
  - scripts/notebook-studio/place-media.mjs
  - scripts/check-studio-manifest.mjs
  - specs/studio/media-ledger.schema.json
  - specs/029-notebook-studio/tasks.md
  - tests/unit/notebook-studio-media.test.mjs
  - AGENTS.md
tests:
  - vitest notebook-studio-media (14 pass) and notebook-studio (16 pass)
  - check-studio-manifest OK
  - Real ffmpeg smoke: 200 s tone passes QG1 source; encoded MP4 first failed A/V match (0.7 s overshoot from -shortest), fixed by cutting to probed duration, then passed at -16 LUFS
  - Urdu card rendered and inspected: RTL order wrong twice (rtl+end overflow, no-direction LTR), fixed with direction=rtl + text-anchor start
---

## Prompt

use youtube mcp server to upload audio and videos, there are many. guide me to authenticate. organize it as the end to end audio-video pipeline skill with quality gates.

## Response snapshot

No YouTube MCP was installed. Research (Google's revision history, 2026-11-02) showed that
unverified API projects are no longer forced to private, and that uploads have their own bucket
of 100 per day (2026-06-01). Chose `anwerj/youtube-uploader-mcp` v0.3.1 (MIT; upload, update
with playlist/thumbnail/subtitles/privacy/synthetic disclosure, list). It has no arm64 release,
so it was built from the pinned tag after auditing its network hosts and file writes, then
registered at user scope with the existing Desktop OAuth client of `mega-edu-textbook`. Tokens
are kept in `~/.config/youtube-uploader`. Installed static ffmpeg 7.0.2 (md5 verified) in
`~/.local/bin`, and tightened one client-secret file from 664 to 600. In plan mode the owner
chose: public after the gates, a new textbook.com.pk brand channel, an owner spot-check sample
as the final gate, and EFMP-301 Unit 4 as the first run. Built the `studio-media` skill:
- a per-unit ledger state machine (planned to placed) with evidence per state, sha256 dedupe,
  and a 95-per-Pacific-day quota guard;
- QG1 technical checks (streams, duration bounds, silence, black runs, loudness and A/V match
  after encode);
- a brand-card encoder for audio and an audio-only loudnorm for video, plus thumbnails;
- QG2, Claude's transcript-versus-topic check via a NotebookLM source;
- private-first upload with AI disclosure, then QG3 after upload;
- the owner spot-check sheet;
- public publish, then placement into the Studio manifest.

The ledger schema and a media-in-repo ban were added to `check-studio-manifest`.

## Outcome

- ✅ Impact: repeatable path from NotebookLM files to checked, public YouTube links in the Studio panel.
- 🧪 Tests: 30 unit tests pass; studio gate OK; real ffmpeg smoke caught and fixed two defects.
- 📁 Files: skill, five scripts, ledger schema, gate update, tests, tasks, AGENTS skill list.
- 🔁 Next prompts: owner completes channel/playlists/API/consent; smoke upload; EFMP-301 Unit 4 pilot.
- 🧠 Reflection: run gates on real output early; both the A/V overshoot and the RTL card bug only showed up on real renders.

## Handoff (for CEO and agents)

- Shipped / changed: local branch only (uncommitted): studio-media skill, scripts, schema, tests; user-scope MCP `youtube-uploader` and host ffmpeg (not in the repo).
- Decisions the team must respect: owner rulings 2026-11-09: public after gates; textbook.com.pk brand channel; owner spot-check sample is the final gate; upload private first; `contains_synthetic_media` always true; at most 95 uploads per Pacific day; media never in git.
- Pending / next owner: owner does the channel, playlists, API enablement, publishing the OAuth app to production and the consent; Claude runs the smoke test and the EFMP-301 Unit 4 pilot; QG2 must confirm in the pilot that NotebookLM accepts m4a sources (fallback is YouTube auto-captions).
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: `-shortest` overshoot with a looped still; librsvg RTL anchoring; upstream binary version string stale.
- Graders run and results (PASS/FAIL): unit tests PASS; QG1 on real encode FAIL then PASS; visual card check FAIL twice then PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): add a tiny real-ffmpeg integration test gated on ffmpeg presence.
