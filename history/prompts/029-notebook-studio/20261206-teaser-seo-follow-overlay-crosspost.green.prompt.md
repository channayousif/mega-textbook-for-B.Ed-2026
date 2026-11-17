---
id: 20261206
title: Teaser SEO descriptions, follow overlay and cross-posting
stage: green
date: 2026-11-17
surface: agent
model: claude-opus-5-5
feature: 029-notebook-studio
branch: feat/029-teaser-urdu-only
user: M Yousif Channa
command: none
labels: [board-direct, notebook-studio, youtube-shorts, social, decision]
links:
  spec: specs/029-notebook-studio/spec.md
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/632
files:
  - scripts/notebook-studio/teaser.mjs
  - scripts/notebook-studio/assemble-teaser.mjs
  - scripts/notebook-studio/social-post.mjs
  - scripts/check-studio-manifest.mjs
  - specs/studio/teaser-script.schema.json
  - specs/studio/teasers/efmp-301.json
  - tests/unit/notebook-studio-teaser.test.mjs
  - tests/unit/notebook-studio-social.test.mjs
  - .claude/skills/studio-teaser/SKILL.md
  - specs/decisions/log.md
tests:
  - vitest notebook-studio suites: 64 pass (SEO description, captions, overlay windows, cross-post ledger, upload request builders)
  - EFMP-301 youtube and tiktok renders: QG1 encoded pass; overlay frames checked at each window
---

## Prompt

Also add proper Description optimized for SEO and AI, CTA to subscribe the channel, also i want to upload shorts to other platforms like tiktok, instagram and other with noticable traffic/audiances and any educational platform

(AskUserQuestion answers) Platforms: TikTok, Instagram Reels, Facebook Page Reels, LinkedIn. Route: Official APIs, free (Recommended). Subscribe: "it should be CTA layer on top of video, periodically appearing reminding to take action, Text+icons only. should be platform aware"

## Response snapshot

- **Descriptions.** `shortMeta` now writes a keyword line, a summary and bullets from the
  approved narration, the course link, a subscribe link (`?sub_confirmation=1`), a site line,
  search phrases, the AI disclosure and ordered hashtags; tags up to the cap; the pinned comment
  carries the subscribe link. Optional `keywords` per script locale (metadata only). Unverified
  phrases ("AIOU B.Ed", "learning theories") were left out.
- **Follow overlay.** `ctaSvg`/`PLATFORM_CTA`: brand pill with a drawn bell or person-plus icon,
  "چینل سبسکرائب کریں" on YouTube and "فالو کریں" elsewhere, shown three times over the shots,
  never on the end card; TikTok and Instagram end cards say "لنک بائیو میں". `--platform` flag.
- **Cross-posting.** New `social-post.mjs` with sign-in and upload for Meta (Instagram Reels
  resumable upload, Facebook Page Reels), TikTok (inbox draft) and LinkedIn (Videos and Posts
  APIs). `T social` captions, `T crosspost` ledger records only after YouTube is public; manifest
  check validates them.
- **EFMP-301.** New YouTube render with the overlay and description uploaded private as
  `eSvYsQrmsBw` for the owner's review; `Yi1FwWZbEg4` stays public until then.
- **Ruling.** D-2026-0084 recorded.

## Outcome

- ✅ Impact: teasers carry a subscribe reminder and search-ready text, and can go to four more platforms.
- 🧪 Tests: 64 pass; both renders QG1 pass.
- 📁 Files: teaser, assembler, uploader, manifest check, schema, script keywords, tests, skill, decision log.
- 🔁 Next prompts: owner reviews `eSvYsQrmsBw`; owner creates the Meta, TikTok and LinkedIn apps and signs in; first cross-posts.
- 🧠 Reflection: TikTok's docs block scrapers; endpoints were taken from its migration notice, so verify on the first real upload.

## Handoff (for CEO and agents)

- Shipped / changed: this PR; one private YouTube upload (`eSvYsQrmsBw`); no Flow credits spent.
- Decisions the team must respect: D-2026-0084 (fast pace, follow overlay without platform logos, official-API cross-posting after YouTube approval, tokens outside git).
- Pending / next owner:
  - owner: review `eSvYsQrmsBw` (swap for `Yi1FwWZbEg4`?), create the Meta/TikTok/LinkedIn developer apps and send the client IDs and secrets privately, link Instagram (Professional) to the Facebook Page, set bio links, send the full playlist ID;
  - Claude: sign-ins, first cross-posts, ledger records; then the remaining Urdu scripts.
- Paperclip issues affected: none.
