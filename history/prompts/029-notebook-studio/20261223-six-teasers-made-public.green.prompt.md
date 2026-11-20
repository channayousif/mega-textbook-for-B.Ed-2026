---
id: 20261223
title: Six batch-2 teasers made public
stage: green
date: 2026-11-20
surface: agent
model: claude-opus-5-5
feature: 029-notebook-studio
branch: feat/teasers-batch2
user: M Yousif Channa
command: none
labels: [board-direct, studio-teaser, youtube]
links:
  spec: specs/029-notebook-studio/spec.md
  ticket: null
  adr: history/adr/0037-unified-media-studio.md
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/668
files:
  - specs/studio/teasers/media-teasers.json
tests:
  - youtube list_videos shows all six public
---

## Prompt

make them public, check for incident again

## Response snapshot

Set EFMP-302, GENG-300, GICT-300, GNAS-301, EFMP-303 and EFMP-304 to public on YouTube
(L031_W_u5WE, CeawyLtdtQc, 4wpqhahqZr8, pENNFf-WHNw, 1bNmtFdmNEE, LwAvxLfGyQw) and confirmed with
list_videos. Recorded the owner gate (approve, 2026-11-20) and advanced each ledger item
qa3-pass -> approved -> public with published_at. Incident check: both tunnel ports listen on the
server but neither 18800 nor 18801 answers, so the PC end is down; no incident zip could be read.

## Outcome

- ✅ Impact: six more course teasers public (8 public teaser videos in total, with EFMP-301).
- 🧪 Tests: list_videos confirms privacy_status public for all six.
- 📁 Files: teaser ledger.
- 🔁 Next prompts: owner restarts gflow serve, the file server and the tunnel, and zips the incident; cross-posting per D-2026-0084 when wanted.
- 🧠 Reflection: a listening tunnel port is not proof the PC is up; probe with a request.

## Handoff (for CEO and agents)

- Shipped / changed: six teasers public; ledger at public.
- Decisions the team must respect: owner approved the six as is, with the known notes (GENG shot 4
  "job", EFMP-303 repeated word, GNAS clipped last word).
- Pending / next owner: owner merges #668, #669 and #656; owner brings the PC tunnel back and zips the gflow incident.
- Paperclip issues affected: none (crew era).

## Evaluation notes (flywheel)

- Failure modes observed: stale SSH reverse tunnel (ports listen, no response).
- Graders run and results (PASS/FAIL): YouTube status check PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): add a tunnel liveness probe to the gflow producer (Feature 030 Phase 3).
