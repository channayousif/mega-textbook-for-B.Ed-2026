---
id: 20261237
title: Batch-3 teasers approved and scheduled hourly; crew media stages on
stage: green
date: 2026-11-22
surface: agent
model: claude-opus-5-5
feature: 029-notebook-studio
branch: studio/teasers-batch3-publish
user: M Yousif Channa
command: approve, schedule, crew media on
labels: [board-direct, studio-teaser, media-studio, crew]
links:
  spec: specs/030-media-studio/spec.md
  ticket: null
  adr: history/adr/0037-unified-media-studio.md
  pr: null
files:
  - specs/studio/teasers/media-teasers.json
  - scripts/crew/media.mjs
  - tests/crew/media-stages.test.mjs
tests:
  - npm run test:crew (156 pass)
---

## Prompt

approved, scedule them for publication at 1 hour intervals, Turn on the crew's media

## Response snapshot

- Recorded the owner gate (`gates.owner`, by owner) on the six batch-3 teasers and advanced them
  to `approved` with `scheduled_publish_at`.
- Scheduled each private Short in YouTube with `update_video publish_at` (all `success`):
  GQUR-300 uqt3LR8XIW0 10:00, EFMP-305 o-qh7iMDPA4 11:00, GENG-301 M-9XdegQL-0 12:00,
  GPKS-402 rn5h_utUprg 13:00, GQUR-301 kNFsqdPHyVU 14:00, GSOS-301 MYeopBflsA0 15:00
  (2026-11-22, PKT, +05:00).
- Sent `crew media on` through `crew.mjs cmd` on the crew checkout; the dry-run plan queues
  `efmp-406-u00-teaser_script` first (scripts only; no credits before the owner approves).
- Found that the planner queues `media_publish` for every `approved` teaser, which the launch
  check then refuses without a `crew publish` record, so it would hold the single media slot.
  Fixed: an `approved` item with `scheduled_publish_at` gets no job and appears in the owner line
  as "scheduled to go public". Shipped in the same PR as the ledger approvals so the crew never
  sees one without the other.

## Outcome

- ✅ Impact: six Shorts go public one an hour from 10:00 to 15:00 PKT without any crew job; the
  media stages draft new teaser scripts.
- 🧪 Tests: test:crew 156/156 (new scheduled-publish test).
- 📁 Files: teaser ledger, crew media planner, crew media test.
- 🔁 Next prompts: after 15:00 record each Short as `public` with its `published_at`, give the
  owner the pinned-comment lines (`teaser.mjs meta`), then cross-post per platform.
- 🧠 Reflection: YouTube scheduling is a publish path the media planner did not know; any new
  route to public needs a planner state, or the one-job media slot can jam.

## Handoff (for CEO and agents)

- Shipped / changed: six teasers `approved` and scheduled in YouTube; crew media stages on;
  planner skips scheduled teasers.
- Decisions the team must respect: never set these six public or change their schedule; YouTube
  publishes them. Only the owner approves scripts (`crew approve-script`) and publishing.
- Pending / next owner: Claude (or the next session) advances each to `public` with
  `published_at` after its time and posts cross-posts; the owner approves the first crew-drafted
  teaser script (EFMP-406) when it arrives. GPKS-402 publishes with the shot-1 flag the owner saw.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: planner queued a job its own launch check refuses (latent slot jam).
- Graders run and results (PASS/FAIL): test:crew PASS; update_video schedule PASS x6.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): let the planner advance a scheduled item to `public`
  once its time has passed and `list_videos` shows it public.
