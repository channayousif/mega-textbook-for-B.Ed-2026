---
id: 20261210
title: Follow links to the new social profiles in every description
stage: green
date: 2026-11-18
surface: agent
model: claude-opus-5-5
feature: 029-notebook-studio
branch: feat/029-social-links
user: M Yousif Channa
command: none
labels: [board-direct, notebook-studio, youtube, social]
links:
  spec: specs/029-notebook-studio/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - scripts/notebook-studio/describe.mjs
  - scripts/notebook-studio/teaser.mjs
  - tests/unit/notebook-studio-teaser.test.mjs
tests:
  - vitest notebook-studio suites: 74 pass
  - teaser description 4,895 bytes with all unit links; 10 published descriptions updated in place
---

## Prompt

https://www.tiktok.com/@textbook.com.pk, https://www.instagram.com/textbook.com.pk/, https://www.linkedin.com/company/textbook-com-pk, https://web.facebook.com/profile.php?id=61596368444198

## Response snapshot

- **Follow block.** `SOCIAL` in `describe.mjs` (YouTube, TikTok, Instagram, Facebook, LinkedIn);
  every description's More-about block ends with "📲 ہمیں فالو کریں" and the five links.
  Facebook is stored as `www.facebook.com/profile.php?id=…`.
- **Search line.** The visible search-terms line is dropped when the course block is present
  (the keywords stay in the tags), to keep the unit links under the byte limit.
- **Applied in place** with `yt-describe.mjs`: the 9 Unit 4 videos and the live teaser
  `Yi1FwWZbEg4`. `eSvYsQrmsBw` is no longer on the channel, so it was skipped.
- **Merges.** #634 and #635 were not merged (the required build was still queued and auto-merge
  is disabled for the repository); a background watcher merges each once its build passes.

## Outcome

- ✅ Impact: every published Studio video points viewers to all five textbook.com.pk profiles.
- 🧪 Tests: 74 pass.
- 📁 Files: describe.mjs, teaser.mjs, test.
- 🔁 Next prompts: owner creates the Meta, TikTok and LinkedIn developer apps and saves the keys; first cross-posts.
- 🧠 Reflection: the teaser description is within 5 bytes of the guard; the next teaser with longer unit titles will drop unit links first, which is the intended order.

## Handoff (for CEO and agents)

- Shipped / changed: YouTube descriptions on 10 videos (public, owner request); this PR.
- Decisions the team must respect: social profile URLs live only in `SOCIAL` (describe.mjs).
- Pending / next owner: owner: developer apps and keys; Claude: sign-ins and first cross-posts.
- Paperclip issues affected: none.
