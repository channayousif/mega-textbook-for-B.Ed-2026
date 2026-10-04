---
id: 0092
title: feedback-widget-on-unit-pages
stage: general
date: 2026-10-04
surface: agent
model: gemini-3.1-pro
feature: none
branch: agent/TEX-32
user: paperclip
command: auto
labels: ["weblead", "ui", "feedback"]
links:
  spec: null
  ticket: TEX-32
  adr: null
  pr: pending
files:
 - src/theme/DocItem/Content.tsx
 - src/components/ReviewStatusBanner.tsx
tests:
 - npm run check:all
---

## Prompt

Publication notice: no feedback route on unit index pages, and the copy never mentions reporting errors. Decide whether the feedback route belongs on every unit page or whether the banner should carry its own inline report affordance.

## Response snapshot

Modified `src/theme/DocItem/Content.tsx` to conditionally render `FeedbackWidget` for all unit pages (when `courseCode` and `unitNo` are not null) rather than just `isTopicOrAssessment`.
Updated the `ReviewStatusBanner.tsx` body text for both `gated` and `provisional` tiers in `en` and `ur` locales to explicitly instruct users to use the feedback form at the bottom of the page to report errors.

## Outcome

- ✅ Impact: All unit pages now have a working error reporting mechanism and the publication banners instruct users to use it.
- 🧪 Tests: `npm run check:all` passed.
- 📁 Files: `Content.tsx`, `ReviewStatusBanner.tsx`
- 🔁 Next prompts: None
- 🧠 Reflection: Conditionally displaying the widget across all unit pages ensures better feedback coverage compared to restricting it to topic and assessment pages.

## Handoff (for CEO and agents)

- Shipped / changed: Feedback widget is now rendered on all unit pages. ReviewStatusBanner instructs users to use the feedback form to report errors in English and Urdu.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): None
- Prompt variant (if applicable): None
- Next experiment (smallest change to try): None
