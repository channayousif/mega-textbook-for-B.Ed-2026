---
id: 20261204
title: EFMP-301 Urdu teaser pilot with an off-screen narrator
stage: green
date: 2026-11-17
surface: agent
model: claude-opus-5-5
feature: 029-notebook-studio
branch: feat/029-teaser-urdu-only
user: M Yousif Channa
command: none
labels: [board-direct, notebook-studio, youtube-shorts, flow]
links:
  spec: specs/029-notebook-studio/spec.md
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/632
files:
  - specs/studio/teasers/efmp-301.json
  - specs/studio/teasers/media-teasers.json
  - scripts/notebook-studio/assemble-teaser.mjs
  - scripts/notebook-studio/audio-to-video.mjs
  - scripts/notebook-studio/media-qa.mjs
  - tests/unit/notebook-studio-teaser.test.mjs
  - .claude/skills/studio-teaser/SKILL.md
tests:
  - vitest notebook-studio suites: 47 pass at the pilot (letterbox crop, bidiUr tests)
  - media-qa encoded QG1 pass (43.6 s, 1080x1920, -16.6 LUFS, -2.1 dBTP)
---

## Prompt

script approved, generate narrator portraits

2, start the pilot

(AskUserQuestion answer) Off-screen voice (Recommended)

## Response snapshot

- **Narrator.** Four free Flow portraits made; the owner picked 2. The first r2v shot was refused
  by gflow 0.101 (`FlowHostMigratedError`, r2v not ported to the migrated agent composer, #799;
  no credits spent), so the owner chose an off-screen woman narrator.
- **Script.** Visuals rewritten as five classroom scenes without a speaking face; the approved
  Urdu narration is unchanged. Re-approval recorded in the script gate (new sha256).
- **Clips.** Five t2v Veo 3.1 Fast 8 s shots, one take each, 100 credits (751 to 651). All five
  transcripts (QA notebook) match the approved lines.
- **Assembler fixes.** Auto-crop of Veo letterbox bars (cropdetect); Urdu captions keep the space
  beside English terms (`bidiUr`: LTR isolates with NBSP padding, wrap only on ASCII space);
  Short silence allowance 6.5 s (5 s end card plus a quiet tail).

## Outcome

- ✅ Impact: the Flow-to-YouTube pipeline works end to end on the owner's PC route.
- 🧪 Tests: 47 pass; QG1 encoded pass.
- 📁 Files: script, ledger, assembler, wrap, media-qa, tests, skill.
- 🔁 Next prompts: private upload, owner spot-check, publish.
- 🧠 Reflection: check what a migrated Flow account supports (t2v/t2i only) before planning a character route.

## Handoff (for CEO and agents)

- Shipped / changed: EFMP-301 Urdu teaser media (not in git); assembler crop and caption fixes.
- Decisions the team must respect: off-screen narrator for teasers while gflow lacks r2v on migrated Flow; 8 s clips only.
- Pending / next owner: Claude uploads privately; owner reviews.
- Paperclip issues affected: none.
