---
id: 20261224
title: gflow detection fixed and EFMP-302 v2 pilot assembled
stage: green
date: 2026-11-20
surface: agent
model: claude-opus-5-5
feature: 029-notebook-studio
branch: feat/teasers-batch2
user: M Yousif Channa
command: none
labels: [board-direct, studio-teaser, gflow, youtube]
links:
  spec: specs/030-media-studio/spec.md
  ticket: null
  adr: history/adr/0037-unified-media-studio.md
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/668
files:
  - scripts/notebook-studio/assemble-teaser.mjs
tests:
  - vitest tests/unit/notebook-studio-teaser.test.mjs (24 pass)
  - media-qa short encoded PASS on the v2 pilot
---

## Prompt

check

(then, 2026-11-20: "yes, run the lite test shot"; the serve-window tracebacks; "check option 1";
"use Fast for the remaining shots"; "check, placed the forth"; the tunnel warning; "check")

## Response snapshot

Read the owner's gflow incident bundle: every batch-2 timeout came from the agent-only composer
taking a clip id only from flow-content.google URLs while the account serves opaque /asb/ URLs;
upstream ffroliva/gflow-cli#1354, fixed in 0.102.1, so no new issue was filed. The owner upgraded to
0.103.0. Flow's new agent sidebar (no tune button) then failed every call pre-submit with
UiSelectorDriftError (no spend); the owner closed the sidebar and turned the Agent chip off, giving
the classic composer. On it veo_lite has no duration control, so duration is omitted. The Lite test
shot (EFMP-302 v2 shot 1, on-screen presenter) came back automatically in 1 min 49 s for 10 credits.
Shots 2-5 ran on veo_fast in one project; shot 4 was billed but not returned (the owner downloaded it),
shot 5 was regenerated after a stale tunnel was cleared. All five transcripts match the approved
narration. Added `--speed` to the assembler (default 1.12 unchanged) and assembled the pilot at
1.25x: 32.8 s, 1080x1920, -15.4 LUFS, QG1 pass. Uploaded private for the owner's review:
N95VcU228Nk (not in the playlist).

## Outcome

- ✅ Impact: gflow generates and returns clips again; first recipe-v2 teaser ready for review.
- 🧪 Tests: teaser unit tests 24 pass; QG1 pass on all five clips and the encoded Short.
- 📁 Files: assemble-teaser.mjs (`--speed`).
- 🔁 Next prompts: owner judges the pilot; then recipe v2 is written into Feature 030 and the batch continues.
- 🧠 Reflection: a 600 s gflow timeout with approvals=1 means a paid clip exists; read the incident before retrying.

## Handoff (for CEO and agents)

- Shipped / changed: `assemble-teaser.mjs --speed`; EFMP-302 v2 pilot private (N95VcU228Nk).
- Decisions the team must respect: keep the Flow account on the classic composer (sidebar closed,
  Agent off); minimum gflow 0.102.1; omit `duration` for veo_lite and veo_fast on the classic pane;
  both models return 720x1280 on this account.
- Pending / next owner: owner watches the pilot and decides whether it replaces L031_W_u5WE; merge
  #668, #669, #656; optional upstream report of the sidebar drift and the structlog TypeError.
- Paperclip issues affected: none (crew era).

## Evaluation notes (flywheel)

- Failure modes observed: gflow returned "Error executing tool" for a billed clip (shot 4); the
  structlog TypeError hides every real error; a stale SSH reverse tunnel survived a PC drop.
- Graders run and results (PASS/FAIL): QG1 PASS x6; whisper QG2 PASS x5.
- Prompt variant (if applicable): recipe v2 (presenter shots 1 and 5, voice-over action 2-4, named camera moves).
- Next experiment (smallest change to try): Flow Character ingredient (r2v) for a consistent presenter across shots 1 and 5.
