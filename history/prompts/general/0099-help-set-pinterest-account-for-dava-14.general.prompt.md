---
id: 0099
title: help-set-pinterest-account-for-dava-14
stage: general
date: 2026-10-08
surface: agent
model: gemini-3.8-flash-high
feature: none
branch: main
user: Muhammad Yousif Channa
command: help me set pinterest account for DAVA-14
labels: ["board-direct", "paperclip", "ops", "pinterest", "dava", "dava-14"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/general/0099-help-set-pinterest-account-for-dava-14.general.prompt.md
tests:
  - ssh davinci "paperclipai issue get DAVA-14"
  - ssh davinci "paperclipai issue comments DAVA-14"
  - npm run check:no-em-dash
---

## Prompt

help me set pinterest account for DAVA-14

## Response snapshot

Queried the remote Paperclip instance on `davinci` via SSH for issue DAVA-14 ("Set up Pinterest account and draft pin formats") assigned to `EtsySpecialist`:
- Issue state: `in_review`, blocked on board action to provide the Pinterest account handle.
- Existing drafted assets verified on host in `/home/ubuntu/org/davinci/pinterest/` and `drafts/DAVA-14/`:
  - 5 pin format templates (`PF1` Room Scene, `PF2` Texture Macro, `PF3` Scale Graphic, `PF4` Variant Comparison, `PF5` Video Still).
  - First week pins ready with complete copy, dimensions, prices, and hashtags for all 16 active listings.
- User previously commented on DAVA-14: "i have made a pinterest account."
- Provided complete guidance to finalize the Pinterest account setup:
  - Business profile configuration (profile name, handle recommendations, bio, Etsy shop URL link).
  - 6 strategic board setups tailored to Da Vinci Art Store catalog.
  - Pin schedule and ready-to-use copy from the DAVA-14 drafts.
  - Requested the confirmed handle to update DAVA-14 in Paperclip and unblock task completion.

## Outcome

- Verified status and prerequisites for DAVA-14.
- Provided end-to-end profile, board, and pin setup guidelines for Pinterest.
- Tests: Paperclip CLI queries on `davinci` passed; no-em-dash check passed.
- Files: Recorded PHR 0099.

## Handoff (for CEO and agents)

- Shipped / changed: Delivered Pinterest account and board configuration guide for DAVA-14.
- Decisions the team must respect: Pin formats follow DAVA-10 visual-merchandising-spec §5; pins serve top-of-funnel discovery routing to Etsy.
- Pending / next owner: User to share the confirmed Pinterest handle so DAVA-14 can be marked complete in Paperclip.
- Paperclip issues affected: DAVA-14.
