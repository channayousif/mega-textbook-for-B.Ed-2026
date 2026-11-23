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
- [x] T018 Install the crontab line `0 10 * * 0` for `ops/news/weekly-digest.sh`.

## Phase 6: Three-row ticker, full list, pinning, fresher feed (owner, 2026-11-17)
- [x] T019 Feed: `updated` (40+ changed lines on a day, a week or more after the unit appeared), `figures` (new figure files per unit per day, counted once across `.ur`/`.dark` variants, not for a unit's first week) and `provisional` (only while G3 is `provisional`) events in `scripts/build-news-feed.mjs`; `MAX_EVENTS` 120; `customFields.newsFeed` carries the newest 40, trimmed.
- [x] T020 Migration `0054_news_pins.sql`: `news_pins` keyed by feed event id, public read of active pins, admin read of all, writes only through the audited `set_news_pin`; `news_pins.created_by` in `tests/profile-dependents.mjs`.
- [x] T021 `src/lib/newsMerge.ts`: `laneOf`, `groupBursts` (one kind, one course, within a week; pinned never grouped; figures count figures), `buildLanes` (up to three rows, two still pins per row, ten scrolling).
- [x] T022 `src/components/NewsTicker`: rows with label buttons, still pinned chips with a pin mark, one Pause, "View all" panel (full 60-day feed, pinned first, bursts expandable, Esc returns focus); `pin` and `figures` icons; Urdu strings.
- [x] T023 Admin page: Pin/Unpin with an optional end date on each automatic post.
- [x] T024 Weekly email: "Updated units" (revisions and final review pending) and "New illustrations" (with counts).
- [x] T025 Tests: `news-feed`, `news-merge`, `digest-email`, `icon-pack`; `tests/rls/news-items.test.mjs` news_pins case. 0054 verified on stubs in a disposable `supabase/postgres:17.6.1.136` container (roles, grants, policies, RPC, audit, set-null).
- [x] T026 Rollout (owner approval): apply 0054 to the shared Supabase (CI's RLS job needs it) and `notify pgrst`; after merge copy `_shared/digestEmail.ts` to the edge volume; curl anonymous `news_pins`.
