---
name: social-updates
description: >-
  Daily social-media roundup of deployed work on textbook.com.pk (Feature 031): collect what went
  live (new units, Urdu, courses, illustrations, revisions, reviews, public teasers, user-facing
  features), write the feature lines in English and Urdu, check, render the branded 4:5 card, and
  post to the Facebook Page, Instagram and LinkedIn. Content posts publish automatically after the
  pilot; feature posts wait for the owner (`crew post <id>`). Use for the crew's social_roundup stage
  or when asked to "post today's updates" or "draft the platform update post".
---

# Social updates

Read the **media-studio** skill for the shared rules: credentials, platform quirks, no media in git.
This skill holds the daily roundup.

## What counts (owner, 2026-11-22)
- **Deployed only.** Content comes from the live `https://textbook.com.pk/news-feed.json`, so it was
  merged green, passed main CI and was deployed. A feature PR counts only once the deploy log shows
  its merge commit live. Never announce work that is still in a PR.
- **Buckets:**
  - `content`: new courses, units, Urdu translations, illustrations, revised units, reviewed units,
    public teasers;
  - `feature`: user-facing `feat(...)` PRs (site pages, components, config).
- **Not announced:** "Final review pending", crew or tooling PRs, fixes, tests or docs.

## Steps
1. `node scripts/social/updates.mjs collect` adds the day's drafts to `specs/social/updates.json`.
   Each source id is announced once.
2. **Feature lines:** for every highlight marked `needs_copy`, read the PR (`gh pr view <n>`) and write
   one plain sentence in English (90 characters or fewer, starting with the place, for example
   "Home page: ...") and its Urdu rendering (simple spoken register, English technical terms kept).
   Edit the draft's `en` and `ur`, and set `needs_copy` to false.
3. `updates.mjs check <id>` must pass.
4. `updates.mjs render <id>`, then read the JPEG: nothing clipped, Urdu reads right to left, the
   address is visible.
5. **Approval:**
   - content: `updates.mjs approve <id> --by auto`, which the ledger refuses during the pilot;
   - feature: stop. The owner replies `crew post <id>` or `crew reject-post <id> <note>`.
6. `updates.mjs publish <id>` uploads the card to the public `social-cards` bucket and posts to each
   platform. A platform that fails is retried on the next publish; one that succeeded is never
   posted again.

## Voice
- Plain and informative: what changed, for whom, where to read it. No hype, no "revolutionary", no
  emoji walls, no exclamation strings.
- Facts from the source only (event, ledger or PR). Never claim certification, accreditation or
  official approval. "Reviewed" is used only for a `review` event.
- Bilingual: English first, then Urdu. No long dashes (a spaced hyphen instead).
- The card is text only: no faces, maps, flags or sacred imagery.

## Platforms
- Facebook Page photo and Instagram image take the card's public URL.
- LinkedIn posts as the owner's profile; Page posting waits on Community Management API approval.
- TikTok is skipped for image cards: photo posts need a pulled URL from a verified domain.
