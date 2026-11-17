---
id: 20261203
title: Course teasers are Urdu-only for now
stage: green
date: 2026-11-17
surface: agent
model: claude-opus-5-5
feature: 029-notebook-studio
branch: feat/029-teaser-urdu-only
user: M Yousif Channa
command: none
labels: [board-direct, notebook-studio, youtube-shorts, decision]
links:
  spec: specs/029-notebook-studio/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/decisions/log.md
  - specs/studio/teaser-script.schema.json
  - scripts/notebook-studio/teaser.mjs
  - scripts/notebook-studio/assemble-teaser.mjs
  - tests/unit/notebook-studio-teaser.test.mjs
  - .claude/skills/studio-teaser/SKILL.md
tests:
  - vitest notebook-studio-teaser, -media, notebook-studio: 45 pass (new Urdu-only test)
  - check-studio-manifest OK
---

## Prompt

i have decided to make urdu teasers only for now

## Response snapshot

- **Ruling.** Recorded D-2026-0083, which amends D-2026-0082: Urdu teasers only, so the first
  batch is 18 Shorts (about 1,800 credits plus retakes) and needs one playlist.
- **Schema and checks.** The teaser script schema now requires only `ur`, and QG0 checks whichever
  locales are present. `shortMeta` and the assembler refuse a locale the script does not have.
- **Skill.** The studio-teaser skill plans and uploads only `ur`.
- **Branch.** PR #557 had already merged (2026-11-15), so the smoke-test commit was moved onto
  this new branch off main.

## Outcome

- ✅ Impact: pipeline and budget now match the owner's Urdu-only scope.
- 🧪 Tests: 45 pass; manifest gate OK.
- 📁 Files: ruling, schema, teaser.mjs, assemble-teaser.mjs, test, skill.
- 🔁 Next prompts: owner approves the EFMP-301 Urdu script, picks the narrator, creates the "Course teasers (اردو)" playlist and re-exports nlm cookies; then the Urdu pilot.
- 🧠 Reflection: check a PR's merge state before pushing follow-ups to its branch.

## Handoff (for CEO and agents)

- Shipped / changed: this PR; no media, no credits spent.
- Decisions the team must respect: D-2026-0083 (Urdu-only teasers until the owner reopens English).
- Pending / next owner:
  - owner: approve the EFMP-301 Urdu script, pick the narrator, create the playlist, re-export nlm cookies;
  - Claude: Urdu pilot, then 17 Urdu scripts.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: pushed a follow-up to an already-merged PR branch (recovered by cherry-pick).
- Graders run and results (PASS/FAIL): vitest PASS; check-studio-manifest PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none.
