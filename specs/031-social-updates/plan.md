# Plan: Feature 031 Social Updates

The design, reuse map and delivery order are in the owner-approved plan of 2026-11-22. In short:
- **Collector** (`scripts/social/updates.mjs`): reads only deployed sources (the live news feed, the
  teaser ledger's public items, merged `feat(...)` PRs whose merge commit the deploy log shows live)
  and writes two daily drafts to `specs/social/updates.json`.
- **Card and publish:** the card (`card.mjs`, sharp) goes to the public Supabase bucket
  `social-cards`; Facebook and Instagram fetch it by URL, and LinkedIn takes an upload
  (`publish.mjs`, `social-post.mjs postImage`).
- **Crew:** a daily `social_roundup` stage on the claude worker. Content posts auto-approve after the
  pilot; feature posts wait for `crew post <id>`.
