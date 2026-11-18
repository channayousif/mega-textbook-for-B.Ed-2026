---
id: 2482
title: Course teaser Shorts pipeline with Google Flow and gates
stage: green
date: 2026-11-13
surface: agent
model: claude-opus-5-5
feature: 029-notebook-studio
branch: feat/029-teasers
user: M Yousif Channa
command: none
labels: [board-direct, notebook-studio, youtube-shorts, google-flow, skill]
links:
  spec: specs/029-notebook-studio/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - .claude/skills/studio-teaser/SKILL.md
  - scripts/notebook-studio/teaser.mjs
  - scripts/notebook-studio/assemble-teaser.mjs
  - scripts/notebook-studio/media-qa.mjs
  - scripts/notebook-studio/media-ledger.mjs
  - scripts/check-studio-manifest.mjs
  - specs/studio/teaser-script.schema.json
  - specs/studio/teasers/efmp-301.json
  - specs/decisions/log.md
  - tests/unit/notebook-studio-teaser.test.mjs
  - AGENTS.md
tests:
  - vitest notebook-studio-teaser (14), notebook-studio-media (14), notebook-studio (16) pass
  - check-studio-manifest OK (pilot script passes QG0)
  - Real ffmpeg smoke on five synthetic 720x1280 clips: 44 s 1080x1920 Shorts in EN and UR; frames inspected (captions, end card)
---

## Prompt

i want to generate short video overview/teaser for each unit using its content in youtube shorts format for inviting viewers to study full unit at the link attached. videos should be uploaded on the channel under shorts. the video shorts will be created with my google flow pro using its MCP server implimentation, there are many community built MCP servers (Just need some research).

(follow-up after the plan was approved, new session) continue

## Response snapshot

I researched the Flow MCP servers:
- **Chosen:** `ffroliva/gflow-cli` (MIT, 372 stars, active, 19 tools, 9:16 Veo, credits read,
  `--no-spend` mode).
- **Rejected:** smaller servers and hosted services that need the owner's Google login or their
  own paid credits.
- **Blocker:** gflow needs headed system Google Chrome, which has no Linux arm64 build. So the
  owner chose to run it on their Windows PC, reached over an SSH reverse tunnel. Server ports
  8000/8001 are taken (8000 is Kong, the Supabase gateway), so the tunnel uses 18800/18801.

The owner chose Veo narration per language, about 45 s from five shots, and a first batch of one
teaser per course plus the licence track. This is recorded as D-2026-0082 (the video-studio rule
against automating subscription sites stays in force there).

I built the `studio-teaser` skill and its pieces:
- `teaser.mjs`: QG0 script check, verified trailing-slash routes (the live site 301-redirects the
  bare path), a forward-only ledger with owner script approval before credits and at most two
  retakes per shot, Shorts metadata, and the owner sheet.
- `assemble-teaser.mjs`: 1080x1920 at 30 fps, per-shot burned captions (Nastaliq RTL for UR), 0.2 s
  cross-fades, a 5 s brand end card with the exact address, and loudnorm with the limiter.
- `media-qa.mjs`: `clip` and `short` kinds (vertical check; the end-card silence is allowed).
- Teaser checks in `check-studio-manifest`.
- The EFMP-301 pilot script, EN and UR, written from its course overview.

The smoke test caught English captions overflowing their box and Urdu captions truncated with an
ellipsis (the final question was lost). Both are fixed: captions never truncate, and the font
steps down for long lines.

## Outcome

- ✅ Impact: a repeatable, gated path from course pages to Flow-generated Shorts on the channel; ready for the Windows smoke test.
- 🧪 Tests: 44 unit tests pass; gate OK; real ffmpeg assembly verified on synthetic clips.
- 📁 Files: skill, two new scripts, QA and ledger extensions, schema, pilot script, ruling, tests.
- 🔁 Next prompts: owner completes the Windows setup and tunnel; smoke test; owner approves the EFMP-301 script; generate, gate, assemble and upload the pilot; then 17 more scripts.
- 🧠 Reflection: probe the server's ports before prescribing a tunnel; 8000 was the live Supabase gateway.

## Handoff (for CEO and agents)

- Shipped / changed: branch feat/029-teasers (this PR): studio-teaser skill and tooling; no media, no Flow credits spent, no uploads.
- Decisions the team must respect: D-2026-0082 (Flow automation only from the owner's PC; per-language Veo narration; owner approves scripts before credits; private-first uploads; teaser uploads share the 95-a-day guard).
- Pending / next owner:
  - owner: Windows gflow setup and tunnel on 18800/18801, the narrator character pick, teaser playlists, and approval of the EFMP-301 script;
  - Claude: smoke test, pilot, then the remaining 17 scripts.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: tunnel port collision with Kong; caption overflow and truncation; trailing-slash redirects on course routes.
- Graders run and results (PASS/FAIL): unit tests PASS; QG0 PASS on the pilot; encoded QG1 PASS after the end-card silence rule; visual frame check PASS after the caption fix.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): test whether Veo keeps the narrator's voice consistent across five r2v shots; if not, try one omni_1_2_flash 15 s shot per pair of beats.
