# Tasks: News ticker and weekly new-content email (Feature 028)

## Phase 1: Automatic feed
- [x] T001 `scripts/build-news-feed.mjs` derives unit, Urdu, course and certified-review events from git; wired into prestart/prebuild; output gitignored.
- [x] T002 `customFields.newsFeed` in `docusaurus.config.ts` (12 newest events, prerendered).
- [x] T003 `tests/unit/news-feed.test.mjs` (parsers, feed rules, real git fixture, no-git fallback).

## Phase 2: Admin news
- [x] T004 Migration `0052_news_items.sql` (public live read, admin read, audited RPCs).
- [x] T005 `src/lib/news.ts`, `src/lib/newsMerge.ts`, types.
- [x] T006 `src/pages/app/admin/news.tsx`; admin hub and sidebar entries.
- [x] T007 `tests/unit/news-merge.test.mjs`; `tests/rls/news-items.test.mjs`.

## Phase 3: Ticker
- [x] T008 `src/components/NewsTicker/` (marquee, RTL, reduced motion, pause); megaphone, gift, sparkle icons.
- [x] T009 Mounted on `/`, `/app/dashboard`, `/app/teacher`; Urdu strings in `i18n/ur/code.json`.

## Phase 4: Weekly email
- [x] T010 Migration `0053_weekly_digest.sql` (opt-out columns, `set_digest_preference`, `digest_runs`).
- [x] T011 `supabase/functions/weekly-digest`, `digest-unsubscribe`, `_shared/digestEmail.ts`, `_shared/digestToken.ts`.
- [x] T012 `src/pages/app/unsubscribe.tsx`; profile switch `src/components/DigestPreference`.
- [x] T013 `tests/unit/digest-email.test.mjs`; `tests/rls/weekly-digest.test.mjs`.
- [x] T014 `ops/news/weekly-digest.sh` cron wrapper and rollout notes.

## Phase 5: Rollout (owner approval required)
- [x] T015 Apply 0052 and 0053 to the shared Supabase (before CI's RLS job can pass).
- [x] T016 Add `DIGEST_CRON_SECRET`, `DIGEST_TOKEN_SECRET` to the edge-runtime env, copy the functions, restart the functions container.
- [ ] T017 After merge and deploy: admin preview and test send, checked in Gmail desktop and mobile.
- [ ] T018 Install the crontab line `0 10 * * 0` for `ops/news/weekly-digest.sh`.
