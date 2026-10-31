---
id: 0907
title: Production props use approved takes
stage: green
date: 2026-10-31
surface: agent
model: claude-opus-5-5
feature: video-studio
branch: feature/video-studio-prod-takes
user: M Yousif Channa
command: none
labels: ["board-direct", "video-studio", "render", "integrity"]
links:
  spec: specs/004-production-integrity/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - video-studio/scripts/lib/episode-props.ts
 - video-studio/scripts/kaggle-pack.ts
 - video-studio/tests/align.test.ts
tests:
 - npm test (26 pass)
 - npm run typecheck
---

## Prompt

merged

## Response snapshot

PR #386 (licence-intro voicing) merged. Made the planned production fix: `episodeProps()` used only
`status: 'accepted'` takes in production, but nothing ever sets that status, so no production
episode could render. Production now requires `assetsApproved: true` (passed by kaggle-pack only
after evaluate() finds a valid owner assets approval) and then uses the non-rejected takes, which
is exactly the set the assets approval digest binds. A take imported after approval changes that
digest, so the approval goes stale and kaggle-pack refuses (covered by tests/integrity.test.ts).

## Outcome

- Impact: production renders work once the owner approves the assets gate.
- Tests: align.test.ts now checks production without approval throws, with approval passes the audio
  stage, and a rejected take is never used. 26 pass; typecheck clean.
- Files: episode-props.ts, kaggle-pack.ts, align.test.ts.
- Next prompts: owner merges this PR and runs `npm run approve -- 20261030-licence-intro assets`;
  Claude then runs kaggle:pack/run/fetch.
- Reflection: the "accepted" status was a dead state; the approval log is the single source of acceptance.

## Handoff (for CEO and agents)

- Shipped: production props gated on the owner's assets approval instead of a status nobody sets.
- Decisions to respect: acceptance lives only in approvals.jsonl (PI-03); never set take status to
  accepted by hand to force a render.
- Pending: owner merge + assets gate for 20261030-licence-intro (script gate is valid, assets "not
  approved"); then render (Claude) and the owner render gate.
- Paperclip issues affected: none.
