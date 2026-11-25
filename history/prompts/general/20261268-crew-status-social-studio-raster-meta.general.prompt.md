---
id: 20261268
title: Crew status check - social roundup gap, Study Studio, raster images, Meta
stage: general
date: 2026-11-25
surface: agent
model: claude-opus-5-5
feature: none
branch: docs/phr-linkedin-comments
user: M Yousif Channa
command: none
labels: [board-direct, crew, social, media-studio, status]
links:
  spec: null
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/785
files:
  - history/prompts/general/20261268-crew-status-social-studio-raster-meta.general.prompt.md
tests:
  - read-only: ~/.crew/mega-book board, cron.log, media status, pacing status, social dry collect, davinci workspace Chrome tabs
---

## Prompt

why platform updates are not created, also study-studio is paused, is raster images generating? did we test meta? other unfinished work?

## Response snapshot

Read-only diagnosis, no changes. Social roundup: D-2026-0100 (PR #762, merged 2026-11-24 14:49 PKT) moved the roundup into media hours 09:00-15:00 PKT with the queue opening at 13:00; it reached the crew after the 15:00 close, so on 24 Nov every evening tick found fresh drafts but socialDue returned null, and board.social.lastDay stayed 2026-11-23. A dry collect now finds 2026-11-25 content (5 highlights) and feature (4) drafts, so a roundup queues at 13:00 today; it runs only on the claude worker, which is cooling until 13:30 PKT, leaving a short window before 15:00. Study Studio: flashcards and slide decks continue (EFMP-301); NotebookLM audio/video has no planned items beyond the EFMP-301 pilot, and 3 video overviews, 2 audio briefs and 1 slide doc sit at assembled/checked with no crew stage that resumes them (audioNeeds only picks planned items). Raster: generating; EFMP-303 Unit 6 placed 2026-11-25 09:00 PKT, 149 placed, 120 planned, efmp-304-u05-illustrate queued (media hours plus two shared crew slots). Meta: Facebook and Instagram posting via the Graph API worked in the 23 Nov roundup; meta.ai and Business Suite sessions are open on the davinci desktop, but Meta AI was never tested as a producer and has no spec.

## Outcome

- ✅ Impact: causes identified for the missing roundup and the stalled NotebookLM items; nothing changed.
- 🧪 Tests: none (read-only).
- 📁 Files: this PHR.
- 🔁 Next prompts: owner choice on fixes: social_roundup fallback worker or earlier queue time; a stage that resumes assembled Study Studio items and plans new units; a Meta AI producer spec.
- 🧠 Reflection: a time-window rule merged near the end of its own window silently skips a day; window changes should queue the missed day.

## Handoff (for CEO and agents)

- Shipped / changed: nothing.
- Decisions the team must respect: none new.
- Pending / next owner: owner G3 sign-off for 32 units; owner script approval efmp-407-ur; owner `crew post 2026-11-23-feature-2`; lead: efmp-408-u04-author could not join a batch after 5 merge fixes; owner: renew the crew Claude sign-in before 2026-11-27 (codex out of usage, agy_claude quota until 2026-11-26).
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: media-hours gate merged at 14:49 PKT skipped the 24 Nov roundup; single-worker chain for social_roundup; assembled NotebookLM items have no resuming stage.
- Graders run and results (PASS/FAIL): none.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): add a fallback worker to the social_roundup chain and check that today's 13:00 roundup launches before 15:00.
