# Feature Specification: News ticker and weekly new-content email

**Feature Branch**: `feat/028-news-ticker`
**Created**: 2026-11-09
**Status**: Implemented, awaiting deploy
**Input**: Owner (board-direct): "Add news/announcements widget to highlight latest unit additions and other platform changes, scrolling preferably a horizontal bar with proper icons to stand out. News can be managed from admin dashboard, while content updates may be posted automatically." Follow-up: "Also add a properly formatted email update to the registered users with new content highlights once a week."

## Owner rulings (2026-11-09)

- The ticker shows on the landing page and the student and teacher dashboards, not on reading pages.
- Content updates are posted automatically at build time from the repository (no database writes from CI).
- Automatic events: new English unit, Urdu translation added, new course, certified G3/G5 review. Admins add news, offers and notices.
- The weekly email is on by default with a one-click opt-out, bilingual in one message, sent Sundays at 10:00 PKT, and only in weeks with new items.

## User Scenarios & Testing

### User Story 1 - Visitors see what is new (P1)

A visitor on the landing page, or a signed-in student or teacher on their dashboard, sees a horizontal "Latest" bar of recent changes, each with an icon, a short badge, the title and a date, linking to the page.

**Acceptance**
1. Given a unit was authored in the last 60 days, the bar shows a "New unit" item linking to the unit, without JavaScript (prerendered).
2. Given its Urdu mirror was added, the bar shows an "In Urdu" item; in the Urdu locale titles are Urdu where they exist.
3. The bar pauses on hover, on keyboard focus and with a Pause button, and does not move for readers who prefer reduced motion.
4. In Urdu the bar runs right to left in reading order.

### User Story 2 - Admins manage news (P1)

An admin opens `/app/admin/news`, writes a headline in English (and optionally Urdu), picks a kind and icon, an optional link and a show-from/until window, previews it, and publishes, pins, edits or archives it.

**Acceptance**
1. A published, in-window item appears in every visitor's ticker; drafts, scheduled, expired and archived items do not.
2. Only admins can write; every write is recorded in `admin_action_history`.
3. Links must be site-relative or https; icons come from a fixed list.

### User Story 3 - Registered users get a weekly email (P2)

Every Sunday at 10:00 PKT, active registered users with a confirmed email receive one bilingual email grouping the week's new courses, units, Urdu translations, reviewed units and admin news, unless they opted out.

**Acceptance**
1. A week with nothing new sends nothing; a second run in the same ISO week sends nothing.
2. Every email has a working unsubscribe link (confirm page) and RFC 8058 one-click headers.
3. Users can turn the email on or off from their account page.
4. Admins can preview the week's email and send themselves a test.

### Edge Cases

- Shallow clone or no git: the feed is empty with a warning; the build never fails.
- A unit moved by rename has no add date and is skipped rather than reported as new.
- A later tracker revision row that re-opens G3/G5 withdraws the review event.
- The site deploys before migrations 0052/0053 reach the database: the ticker shows automatic items only and the profile switch hides itself.

## Requirements

- FR-001 Automatic events are derived from git history and the content-status report only.
- FR-002 `news_items` is publicly readable for live rows only; writes only through admin-checked, audited RPCs.
- FR-003 The ticker meets WCAG 2.2.2 (pause, stop, hide) and works in both locales.
- FR-004 The weekly email is idempotent per ISO week, honours opt-out, and never reaches deleted or suspended accounts.
- FR-005 Unsubscribe tokens are HMAC-signed per profile; no sign-in required; link scanners cannot unsubscribe (confirm page POSTs).
