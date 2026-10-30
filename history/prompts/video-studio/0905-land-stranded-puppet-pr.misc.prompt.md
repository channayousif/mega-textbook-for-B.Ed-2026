---
id: 0905
title: Land stranded puppet PR on main
stage: misc
date: 2026-10-31
surface: agent
model: claude-opus-5-5
feature: video-studio
branch: feature/video-studio-puppet-land
user: M Yousif Channa
command: none
labels: ["board-direct", "video-studio", "git", "puppet"]
links:
  spec: specs/001-urdu-shorts-pipeline/tasks.md
  ticket: null
  adr: null
  pr: null
files:
 - video-studio/episodes/20261030-licence-intro/script.json
 - (merge of feature/video-studio-cast-cut: T041 puppet files from PR #381)
tests:
 - npm test (26 pass)
 - npm run typecheck
---

## Prompt

i think i did merge it in wrong order

## Response snapshot

Checked GitHub: #380, #381, #382 and #383 are all merged, but #381 (T041 puppet) targeted
`feature/video-studio-cast-cut` and was merged there 25 s after #380 had already merged that branch
into main, so the puppet code (Puppet.tsx, lipsync.ts, rig.ts, cast_cut.py, cast_rig.py, tests,
props and episode-props changes, studio default set) never reached main. Opened a branch off main
that merges `feature/video-studio-cast-cut` (clean, no conflicts) and set the licence-intro
script's `source.revision` to #382's merge commit 8979a58 (Urdu file SHA-256 unchanged, 7267e6db...).

## Outcome

- Impact: puppet, lip sync and studio default set land on main through one PR.
- Tests: 26 pass, typecheck clean.
- Files: merge of the stranded branch plus one line in script.json.
- Next prompts: owner merges this PR, then approves the licence-intro script.
- Reflection: stacked PRs must be retargeted to main (or merged child first) before the parent merges.

## Handoff (for CEO and agents)

- Shipped: nothing new; this restores PR #381's reviewed T041 puppet work to main.
- Decisions to respect: studio is the default set; script approval must come after this merges,
  because it changes `brand/characters/shagird-bilal.md`, which the script digest binds.
- Pending: owner merges this PR, then runs `npm run approve -- 20261030-licence-intro script`;
  voicing follows (Claude). Ustani mouth_M/E/O still owed by the owner.
- Paperclip issues affected: none.
