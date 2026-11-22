# Feature 031: Social Updates

**Status:** in progress (PR 1 core) · **Owner ruling:** 2026-11-22 (D-2026-0096)

## Why
The news ticker (Feature 028) announces content work on the site. The same updates should reach
followers on social media, written and posted by the crew, with branding and an informative style,
and tied to green (merged and deployed) work.

## User stories
- **US1 (follower):** once a day I see one post that says what is new on textbook.com.pk, with a
  link, in English and Urdu.
- **US2 (owner):** content updates go out on their own; announcements of platform features wait
  for my approval.
- **US3 (owner):** nothing is announced before it is live, and nothing is announced twice.

## Requirements
- **FR-001** Only deployed work is announced. Content comes from the live news feed; a feature PR
  counts once the deploy log shows its merge commit live.
- **FR-002** There are two buckets per day. `content` covers courses, units, Urdu, illustrations,
  revisions, reviews and public teasers. `feature` covers user-facing `feat(...)` PRs. "Final review
  pending", crew, tooling, fix, test and docs PRs are not announced.
- **FR-003** Copy for content is deterministic from the source facts. Feature copy is written per
  PR in English and Urdu and checked before posting.
- **FR-004** Checks: no long dashes; Urdu present; every highlight backed by a source id; links on
  textbook.com.pk only; no certification wording outside a review event; headline 60 and highlight
  90 characters at most.
- **FR-005** The post is a branded 1080×1350 card (teal and amber, logo, date, headline, Urdu
  headline, up to five highlights, address) plus a bilingual caption with fixed hashtags.
  Instagram says "link in bio".
- **FR-006** Content posts publish automatically after a one-time pilot approval; feature posts
  need the owner's `crew post <id>`.
- **FR-007** Each source id is posted once; a platform that fails retries; a platform that
  succeeded is never posted again.
- **FR-008** No media in git. Cards live in `~/studio-media/social/` and the public storage bucket
  `social-cards`. Nothing a content gate imports depends on `scripts/social/`.
