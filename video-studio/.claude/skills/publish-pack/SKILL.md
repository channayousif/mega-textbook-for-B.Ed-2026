---
name: publish-pack
description: Create copy-ready upload packs (title, description, hashtags, pinned comment, UTM link, AI disclosure, cover frame) for YouTube Shorts, Instagram Reels, Facebook Reels and TikTok from an approved episode. Use for /video-publish.
---

# Publish pack

Precondition: status `render_approved`, render approval hash matches `final.mp4`, and `mode: production`.

## For each platform write `publish/<platform>.md`
- **Title** (Urdu, ≤60 chars for YouTube; hook-style, no clickbait claims) + optional English subtitle in brackets for search.
- **Description** (Urdu): 2 lines on what the viewer learns · link line `مکمل سبق: <url_ur>?<utm>` · 3–5 hashtags (base from brand bible + 2 topic tags) · AI disclosure line.
- **Pinned/first comment**: link again + one question to drive comments ("آپ کی کلاس میں یہ کیسے کام کرتا ہے؟").
- Platform notes:
  - YouTube Shorts: links in Shorts descriptions are not clickable in the feed - put the link in the pinned comment and description; add to playlist matching the series; tick "altered or synthetic content".
  - Instagram Reels: links aren't clickable in captions - say "لنک بائیو میں" and keep the bio link pointing to textbook.com.pk/ur/; apply the AI label.
  - Facebook Reels: link allowed in description; AI label.
  - TikTok: "AI-generated content" toggle on; link in bio.
- UTM: `brand.publishing.utm` with platform and episode_id, built by the URL builder (PI005): the
  base URL must be the episode's verified lesson route on textbook.com.pk (from the harvested
  topic), never a home page fallback, shortener or redirect.
- Hard gate (PI009): refuse if `mode: sample`, any asset lacks a rights/consent note, any
  approval digest is stale, or QA/review failed.

## Subtitles
Include `captions.ur.srt` in the pack; YouTube and Facebook accept an uploaded subtitle file
(language: Urdu) - add it so captions are searchable and toggleable.

## Cover
Export the frame where the hook title is fully visible (`npx remotion still`) → `publish/cover.png` (1080×1920).

## After upload
Owner pastes post URLs → write them into `episode.json.publish`, status `published`, and append the episode id to its topic's `episodes` in `queue/topics.json`.
