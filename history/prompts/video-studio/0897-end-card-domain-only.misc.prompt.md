---
id: 0897
title: End card shows the domain only
stage: misc
date: 2026-10-28
surface: agent
model: claude-opus-5-5
feature: 027-video-studio
branch: feature/video-studio-ustani
user: M Yousif Channa
command: none
labels: ["board-direct", "video-studio", "end-card", "brand", "v007"]
links:
  spec: video-studio/specs/003-urdu-voice-benchmark/spec.md
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/354
files:
 - video-studio/remotion/src/UrduShort.tsx
tests:
 - npm test (video-studio): 20 pass; npm run typecheck: pass
 - Kaggle re-render of 20261028-sample-positive-reinforcement; end-card still inspected
---

## Prompt

show only textbook.com.pk on the end card

## Response snapshot

The end card now prints only the host of the CTA URL (`textbook.com.pk`) instead of the full lesson
path, which wrapped onto two lines. The CTA URL itself is unchanged in script.json (it is what the
post description links to, PI-07). Re-rendered the V007 sample short on Kaggle.

## Outcome

- Impact: a shorter, cleaner end card in every render.
- Tests: see `tests`.
- Files: see `files`.
- Next prompts: owner watches the re-rendered short.
- Reflection: none.

## Handoff (for CEO and agents)

- Shipped / changed: end card shows the domain only. PR #354.
- Decisions to respect: owner rule 2026-10-28: the end card shows `textbook.com.pk` only; the full lesson URL belongs in the post description, not on screen.
- Pending: owner review of the short.
- Paperclip issues affected: none.
