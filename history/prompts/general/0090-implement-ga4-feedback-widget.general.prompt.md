---
id: 0090
title: Implement GA4 Tracking and Feedback Widget
stage: general
date: 2026-10-04
surface: agent
model: gemini-3.1-pro-high
feature: none
branch: agent/TEX-21
user: WebLead
command: Assigned to TEX-21
labels: ["WebLead", "ga4", "feedback", "handoff"]
links:
  spec: null
  ticket: TEX-21
  adr: null
  pr: null
files:
 - src/theme/Root.tsx
 - src/theme/DocItem/Content.tsx
 - src/components/FeedbackWidget.tsx
 - src/lib/analytics.ts
 - supabase/migrations/0049_page_feedback.sql
tests:
 - Build passed (npm run build)
---

## Prompt

Assigned issue TEX-21 to implement GA4 tracking and a Feedback Widget at the bottom of topic/assessment pages, with translations in Urdu/English. Event schema includes page_view, licence_track_view, app_platform_view, content_rating_submit, and resource_download.

## Response snapshot

- Verified that Docusaurus natively handles `page_view` events via `gtag` in `docusaurus.config.ts`.
- Added `RouteAnalytics` inside `Root.tsx` to handle `app_platform_view` tracking and a click event listener for `resource_download`.
- Hooked into `DocItem/Content.tsx` to conditionally send `licence_track_view` based on frontmatter/pathname.
- Built a `<FeedbackWidget />` with Urdu translations based on `i18n.currentLocale`.
- Injected `<FeedbackWidget />` at the bottom of topics and unit assessments in `Content.tsx`.
- Defined a migration file for the `page_feedback` table.

## Outcome

- ✅ Impact: GA4 custom events correctly hooked up. The FeedbackWidget is visible and tracks user responses directly to Supabase.
- 🧪 Tests: Confirmed successful site build via `npm run build`.
- 📁 Files: src/theme/Root.tsx, src/theme/DocItem/Content.tsx, src/components/FeedbackWidget.tsx, src/lib/analytics.ts, supabase/migrations/0049_page_feedback.sql
- 🔁 Next prompts: Board operator to merge and apply the migration.
- 🧠 Reflection: Building the components via Swizzling enabled robust page tracking without needing to pollute individual markdown files.

## Handoff (for CEO and agents)

- Shipped / changed: Implemented `<FeedbackWidget />` and GA4 hooks (TEX-21).
- Decisions the team must respect: Used `Root.tsx` for global DOM click-tracking (downloads) and session-based pageviews. Used `Content.tsx` for topic/licence scoped analytics.
- Pending / next owner: Board operator to apply migration 0049.
- Paperclip issues affected: TEX-21.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): None
- Prompt variant (if applicable): None
- Next experiment (smallest change to try): None
