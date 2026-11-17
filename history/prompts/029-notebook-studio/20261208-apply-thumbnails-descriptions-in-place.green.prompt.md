---
id: 20261208
title: Apply thumbnails, update descriptions in place, teaser playlist
stage: green
date: 2026-11-17
surface: agent
model: claude-opus-5-5
feature: 029-notebook-studio
branch: feat/029-teaser-urdu-only
user: M Yousif Channa
command: none
labels: [board-direct, notebook-studio, youtube, production]
links:
  spec: specs/029-notebook-studio/spec.md
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/632
files:
  - scripts/notebook-studio/yt-describe.mjs
  - scripts/notebook-studio/describe.mjs
  - scripts/notebook-studio/youtube-meta.mjs
  - scripts/notebook-studio/teaser.mjs
  - tests/unit/notebook-studio-describe.test.mjs
  - .claude/skills/studio-media/SKILL.md
  - .claude/skills/studio-teaser/SKILL.md
tests:
  - vitest notebook-studio suites: 74 pass
  - 9 thumbnails set (update_video success); 11 descriptions updated in place (videos.update 200)
---

## Prompt

apply, 2. re-upload with updated description, address is full, you car verify it. show me how for meta, tiktok and linkedin, and fresh sign in

## Response snapshot

- **Thumbnails.** New thumbnails set on the 9 published EFMP-301 Unit 4 videos.
- **Descriptions.** Instead of re-uploading (new IDs would break the site embeds and cost 1,600
  quota units each, beyond the daily quota for 10 videos), new `yt-describe.mjs` updates them in
  place with YouTube `videos.update` (50 units), reusing the youtube-uploader MCP's saved sign-in
  without printing secrets.
  - Updated: the 9 unit videos, the live teaser `Yi1FwWZbEg4` and the private overlay teaser
    `eSvYsQrmsBw` (now with the thumbnail).
  - Unit descriptions link the teaser playlist rather than a teaser ID.
- **Playlist.** `PLCJn7gAoYIJs` verified ("Urdu Course teasers"); recorded as `TEASER_PLAYLIST`.
  The live teaser was added to it.
- **Guides.** Meta, TikTok and LinkedIn app setup and the NotebookLM sign-in given in the reply.

## Outcome

- ✅ Impact: all published Studio videos carry the new thumbnail and the richer description, with IDs and site links unchanged.
- 🧪 Tests: 74 pass.
- 📁 Files: yt-describe.mjs, describe/youtube-meta/teaser updates, test, both skills.
- 🔁 Next prompts: owner swaps `eSvYsQrmsBw` public (overlay version); owner sets up the Meta/TikTok/LinkedIn apps and sends credentials; owner sends a fresh NotebookLM cURL.
- 🧠 Reflection: the playlist ID was complete; YouTube IDs can be short, so check rather than assume truncation.

## Handoff (for CEO and agents)

- Shipped / changed: YouTube thumbnails and descriptions on 11 videos (public change, owner-approved); this PR.
- Decisions the team must respect: edit published descriptions in place with `yt-describe.mjs`, never by re-upload.
- Pending / next owner: owner: swap decision, platform apps, NotebookLM cookie; Claude: first cross-posts, next teaser scripts.
- Paperclip issues affected: none.
