---
id: 2471
title: News ticker and weekly new-content email
stage: green
date: 2026-11-09
surface: agent
model: claude-opus-5-5
feature: 028-news-ticker
branch: feat/028-news-ticker
user: M Yousif Channa
command: plan mode, then implement
labels: [board-direct]
links:
  spec: specs/028-news-ticker/spec.md
  ticket: null
  adr: history/adr/0034-news-feed-sources-and-public-news-table.md, history/adr/0035-weekly-digest-email-delivery.md
  pr: null
files:
  - scripts/build-news-feed.mjs
  - docusaurus.config.ts
  - package.json
  - .gitignore
  - supabase/migrations/0052_news_items.sql
  - supabase/migrations/0053_weekly_digest.sql
  - supabase/functions/weekly-digest/index.ts
  - supabase/functions/digest-unsubscribe/index.ts
  - supabase/functions/_shared/digestEmail.ts
  - supabase/functions/_shared/digestToken.ts
  - src/components/NewsTicker/index.tsx
  - src/components/NewsTicker/styles.module.css
  - src/components/DigestPreference/index.tsx
  - src/components/icons/paths.ts
  - src/lib/news.ts
  - src/lib/newsMerge.ts
  - src/lib/types.ts
  - src/lib/dashboardNav.ts
  - src/pages/index.tsx
  - src/pages/app/dashboard/index.tsx
  - src/pages/app/teacher/index.tsx
  - src/pages/app/admin/index.tsx
  - src/pages/app/admin/news.tsx
  - src/pages/app/profile.tsx
  - src/pages/app/unsubscribe.tsx
  - i18n/ur/code.json
  - tests/profile-dependents.mjs
  - tests/unit/news-feed.test.mjs
  - tests/unit/news-merge.test.mjs
  - tests/unit/digest-email.test.mjs
  - tests/rls/news-items.test.mjs
  - tests/rls/weekly-digest.test.mjs
  - ops/news/weekly-digest.sh
  - ops/news/README.md
  - specs/028-news-ticker/spec.md
  - specs/028-news-ticker/plan.md
  - specs/028-news-ticker/tasks.md
tests:
  - npm test (unit suite, 410+ tests incl. 31 new)
  - npm run check:content (14/14)
  - migrations 0001-0053 applied to a throwaway supabase/postgres container; RLS/RPC behaviour exercised as anon, teacher and admin
  - npm run build (en + ur) and browser check of /, /ur/, admin news page
---

## Prompt

New feature: Add news/ Announcements widget to highlight latest unit additions and other Platform changes, scrolling preferably a horizontal bar with proper icons to standout. News can be managed from admin dashbouard, while content updates may be posted automatically.

(Clarifications answered in session: ticker on landing + dashboards; auto-posts built at build time from content; events = new English unit, Urdu translation added, new course, review cleared (G3/G5), plus "Other offers or news for the visitors from admin dashboard".)

Also Add a properly formatted email updates to the registered users with New content highlights once a week

(Clarifications answered in session: on by default with easy opt-out; bilingual in one email; Sunday 10:00 AM PKT.)

## Response snapshot

Planned in plan mode (approved), then built Feature 028 in worktree `/home/a2ahs/wt-news` on `feat/028-news-ticker`:
a git-derived automatic feed (`static/news-feed.json`, prerendered via `customFields.newsFeed`), an admin-managed
`news_items` table (first anon-readable table; audited security-definer RPCs), a WCAG 2.2.2-compliant bilingual
scrolling ticker on the landing page and dashboards, an admin console at `/app/admin/news`, and a weekly bilingual
digest (edge function + signed one-click unsubscribe + profile switch + per-ISO-week ledger) triggered by host cron.

## Outcome

- ✅ Impact: visitors see new units, Urdu translations, new courses, certified reviews and admin news; registered users can get a weekly email.
- 🧪 Tests: unit suite green; content gates 14/14; migrations and RLS verified in a disposable container; RLS suites written for CI (need migrations on the shared instance).
- 📁 Files: see front matter.
- 🔁 Next prompts: approve rollout (migrations, edge env secrets, function copy, cron).
- 🧠 Reflection: deriving events from git keeps the feed truthful and needs no CI database writes; the profile switch reads its own column so an early deploy cannot break sign-in.

## Handoff (for CEO and agents)

- Shipped / changed: Feature 028 code, migrations 0052/0053, two edge functions, ops/news cron wrapper. Not yet deployed to Supabase; cron not installed.
- Decisions the team must respect: owner rulings 2026-11-09 (ticker on landing + student/teacher dashboards only; auto events from git at build time; weekly email default-on with one-click opt-out, bilingual, Sundays 10:00 PKT, skipped in empty weeks). `news_items` writes only via `upsert_news_item`/`archive_news_item`. Do not add `digest_opt_out` to AuthContext's PROFILE_COLUMNS until 0053 is live everywhere.
- Pending / next owner: owner approval to apply 0052/0053 to the shared Supabase, add DIGEST_* secrets and copy functions (ops/news/README.md), then admin test send and crontab line. Owner: board.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: vitest cannot resolve `@site/...` imports, so pure helpers live in `src/lib/newsMerge.ts`; supabase/postgres image's `auth.uid()` reads `request.jwt.claim.sub`, not `request.jwt.claims`; the image has no `storage` schema, so 0019 needs a stub in a disposable test DB.
- Graders run and results (PASS/FAIL): unit PASS, content gates PASS, disposable-DB RLS PASS, npm run build (en + ur) PASS, served-build browser check PASS (EN scrolls left, UR scrolls right, no overflow at 390px, no page errors); reduced-motion layout fixed after the check (CSS only, not re-rendered).
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): let admins suppress individual automatic posts (news_suppressions table).
