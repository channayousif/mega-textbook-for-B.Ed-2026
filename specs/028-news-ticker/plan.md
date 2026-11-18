# Implementation Plan: News ticker and weekly new-content email (Feature 028)

## Context
The platform has no way to tell visitors what changed: new units, Urdu translations, new courses, units that cleared review, or admin news and offers. The owner wants a horizontal scrolling bar with clear icons. Admins manage news from the admin dashboard, and content updates are posted automatically.

Owner choices (2026-11-09):
- **Where it shows:** the landing page and the signed-in dashboards. It does not show on reading pages.
- **How auto-posts are made:** at build time, from the content and git history. Nothing is written to the database from CI.
- **What gets auto-posted:** new English unit, Urdu translation added, new course, review cleared (G3/G5).
- **Manual posts:** news, offers and other notices written by admins.
- **Weekly email (added on review):** registered users get a formatted email every week that highlights the new content.

No news, announcement or ticker feature exists today (verified by search).

## Approach

### 1. Auto feed built from git (no database)
New script `scripts/build-news-feed.mjs`. It is added to `prestart` and `prebuild` after `report-content-status`, and writes `static/news-feed.json`, which is gitignored like `content-status.json`.

**How events are found:**
- One `git log --diff-filter=A --name-only --format=%H%x09%cI` call over `docs/`, `licence/` and `i18n/ur/docusaurus-plugin-content-docs/current/` collects the date each file was first added.
  - **New English unit:** the date the unit's `unit-NN/index.mdx` was added under `docs/` or `licence/`. Only units that `static/content-status.json` marks `authored` count.
  - **Urdu translation added:** the date the Urdu `unit-NN/index.mdx` was added.
  - **New course:** the earliest English unit date for that course.
- **Review cleared (G3/G5):** walk `git log --since=<window> --format=%H%x09%cI -- specs/content/*/tasks.md`. For each tracker commit, run `git show sha:path` and parse it with `parseTasksTable` and `latestRow` from `scripts/lib/tracker-rows.mjs`. The event is the first commit where a unit's G3 (or G5) row becomes done, using the existing "done" rule. To make that rule reusable, export it from `tracker-rows.mjs`; this is a small change, not a new definition.

**Feed rules:**
- Look back 60 days, then keep the newest 24 events.
- Each event is `{id, type, date, course_code, unit_no, title_en, title_ur, permalink}`.
  - Course titles come from `catalog/courses.json`.
  - English unit titles come from front matter. Urdu unit titles come from the Urdu tree's front matter, which `siteStats()` already walks.
  - The permalink is built with the same logic as `build-content-index.mjs`.
- Ids are stable (`type:course:unit`), so the output is the same on every run.
- If git is missing or the clone is shallow, write an empty feed with a warning. The build never fails because of the feed.
- Expose the feed as `customFields.newsFeed` in `docusaurus.config.ts`, read the same way `siteStats()` reads `content-status.json`. Auto items are then part of the prerendered HTML: no layout shift, and they work without JavaScript.

### 2. Admin news table (migration `supabase/migrations/0052_news_items.sql`)
**Table `public.news_items`:**
- `id uuid pk`
- `kind text check in ('news','offer','update','event','alert')`
- `title_en text not null`, `title_ur text`
- `link_url text`, checked to be either `/…` or `https://…`
- `icon text`, checked against an allowlist of `IconName`s
- `pinned bool`, `published bool default false`
- `starts_at timestamptz default now()`, `ends_at timestamptz`
- `created_by`, `created_at`, `updated_at`, `archived_at`

**RLS:** this is the first table anonymous visitors can read, so the policies are split.
- Public read: `for select to anon, authenticated using (published and archived_at is null and starts_at <= now() and (ends_at is null or ends_at > now()))`. This policy must not call `is_admin()`, because that function is granted to `authenticated` only (`0004_is_admin.sql:74-77`).
- Admin read: `for select to authenticated using (public.is_admin())`, so admins also see drafts, scheduled and expired items.
- Grants: `revoke all … from anon, authenticated`, then `grant select` only. This follows `0050_g3_signoffs.sql:80-94`.

**Writes go through `security definer` RPCs**, the house style used by `agent-jobs` and `g3_signoffs`:
- `upsert_news_item(...)` and `archive_news_item(id)`.
- Each checks `is_admin()` and raises error code `42501` otherwise.
- Each writes an audit row to `public.admin_action_history` (pattern in `0047_admin_moderation_audit.sql`).
- Execute is revoked from `public` and `anon`.

### 3. Client lib `src/lib/news.ts`
- `fetchLiveNews()` (anonymous visitors allowed), `fetchAllNews()` (admin), `saveNewsItem()`, `archiveNewsItem()`. All use the lazy `getSupabase()` from `src/lib/supabase.ts`, following the pattern in `src/lib/suggestions.ts`.
- `mergeNews(manual, auto, locale)` is a pure function:
  1. Pinned manual items come first.
  2. Everything else follows, newest first.
  3. In Urdu, items fall back to their English title when `title_ur` is empty.
  4. The list is capped at about 12 items.
- Add a `NewsItem` type to `src/lib/types.ts`.

### 4. Ticker component `src/components/NewsTicker/`
It follows the proven marquee in `src/components/LogoCarousel/` (`index.tsx` and `styles.module.css`).
- **Markup:** a `section` with an `aria-label` and the `print-hidden` class. It holds two `<ul>` sets, and the second is `aria-hidden`.
- **Motion:**
  - The keyframe distance goes through a CSS variable (`--revolve-end`), so the Urdu build's rtlcss pass does not silently reverse it.
  - It pauses on `:hover` and `:focus-within`, and has a pause/play button with `aria-pressed` and a 44px minimum size.
  - Under `prefers-reduced-motion` it does not scroll: items sit in a static wrapped row and the duplicate list is hidden.
- **Each item** is a link with these parts:
  - an icon chip coloured by type, using `Icon` from `src/components/icons/Icon.tsx`
  - a short badge, e.g. New unit, اردو, New course, Reviewed, Offer, News, Alert
  - the title and a relative date
- **Two new icons:** add `megaphone` (the bar's leading label and news items) and `gift` (offers) to `src/components/icons/paths.ts`.
- **Colours** come from `src/css/tokens.css`: the brand teal, `--brand-amber-text` for amber text on light backgrounds, and alert items in the warning colour.
- **Leading label:** "Latest" / "تازہ ترین".
- **Data loading:** auto items render from `customFields.newsFeed` at build time. Live manual items are fetched after mount and merged in. If there are no items at all, the bar renders nothing.
- **Strings:** use `translate()` with new ids in `i18n/ur/code.json`. The landing page passes nothing locale-specific, so the component handles its own strings.

### 5. Placement
- **Landing:** in `src/pages/index.tsx`, directly after `<ReturningStrip>` and before `<main>` (around line 110).
- **Dashboards:** at the top of the student dashboard (`src/pages/app/dashboard/index.tsx`) and the teacher dashboard home (`src/pages/app/teacher/index.tsx`). It goes inside the page body, not in `AppDashboardShell`, so admin, reviewer and form pages stay clean.

### 6. Admin page `src/pages/app/admin/news.tsx`
- **Wrapper:** `Layout` → `AppDashboardShell` → `OwnerConsoleGuard` → `PageHeader`, the same as the other admin pages.
- **Item list:**
  - Each row shows a status pill (Live / Scheduled / Draft / Expired / Archived, using `StatusPill`).
  - Each row has Edit and Archive actions.
- **Create/edit form:** uses `FormField` for:
  - Kind, which presets a default icon
  - Icon picker with a preview
  - English and Urdu titles
  - Link
  - Start and end time
  - Pinned and Published
- **Preview:** a live preview of the item as it will appear in the ticker.
- **Auto-posts:** a read-only "Automatic posts" panel lists the current auto feed, so admins can see everything visitors will see.
- **Navigation:** register the page in the admin hub `sections` and `HUB_ICONS` (`src/pages/app/admin/index.tsx:10-26`) and in `src/lib/dashboardNav.ts`.

### 7. Weekly "new content" email to registered users

**Owner choices (2026-11-09):** on by default with a one-click opt-out; one bilingual email (English, then Urdu); sent Sunday at 10:00 PKT, and only in weeks that have new items.

**Migration `0053_weekly_digest.sql`:**
- Add `digest_opt_out boolean not null default false` and `digest_opt_out_at timestamptz` to `profiles`.
- New RPC `set_digest_preference(opt_out bool)`. It is `security definer` and changes only the caller's own row (`current_profile_id()`).
- New table `public.digest_runs`:
  - Columns: `iso_week text pk`, `status` (`claimed|sent|skipped|failed`), `items`, `recipients`, `sent`, `failed`, `started_at`, `finished_at`, `error`.
  - Admin read only, using the `0050` grant pattern.
  - Because the primary key is the ISO week, a second run in the same week does nothing, so nobody gets the email twice.

**Edge function `supabase/functions/weekly-digest/index.ts`:**
- **Auth:** `POST` only, with header `x-cron-secret` matched against the `DIGEST_CRON_SECRET` env value. As a second route, an admin bearer token (`_shared/adminAuth.ts`) can request `?mode=preview` (returns the HTML) or `?mode=test` (sends to the calling admin only).
- **Content:**
  - Fetch `${SITE_URL}/news-feed.json` (the static feed from step 1) and keep events from the last 7 days.
  - Add `news_items` that went live in the same 7 days.
  - If nothing is new, record the run as `skipped` and stop.
- **Recipients:** profiles that are `status='active'`, have `deleted_at is null` and `digest_opt_out=false`, and have a confirmed email (read through the service client). The test-account tombstones from the recent purge are excluded automatically.
- **Sending:**
  - Use the Resend batch endpoint, at most 100 per call, with the same `RESEND_API_KEY` and `RESEND_FROM_EMAIL` as `guest-feedback-submit/index.ts:69-90`.
  - Each email carries `List-Unsubscribe` and `List-Unsubscribe-Post: List-Unsubscribe=One-Click` headers.
  - Each run sends to at most `DIGEST_MAX_RECIPIENTS` people and logs the counts into `digest_runs`. Check the account's Resend plan limits during implementation; there are about 16 real users today.

**Template `supabase/functions/_shared/digestEmail.ts`:**
- A pure function, `renderDigest({items, weekLabel, unsubscribeUrl, profileUrl}) → {subject, html, text}`. Vitest can import it.
- **Layout:** a 600px table layout with inline styles that works in Gmail and Outlook.
  - A header with the hosted PNG logo; SVG is avoided because Gmail strips it.
  - A teal and amber brand band.
  - A summary line ("3 new units, 2 Urdu translations this week").
  - Grouped sections: New courses, New units, Urdu translations, Reviewed units, News and offers. Each item has an emoji or PNG icon, a title, and a link to the page.
  - A "Continue learning" button.
  - An Urdu block with `dir="rtl"` and a Nastaliq-first font stack.
  - A footer that explains why the reader got the email, with the unsubscribe and email-settings links.
- A plain-text alternative is always included.
- The subject is bilingual, e.g. "This week on textbook.com.pk: 3 new units | اس ہفتے نیا مواد".

**Unsubscribe:**
- **Token:** `profile_id.HMAC-SHA256(DIGEST_TOKEN_SECRET, profile_id)` (base64url), checked in constant time.
- **The email's link** opens the site page `src/pages/app/unsubscribe.tsx`. It confirms with a button and then POSTs to `supabase/functions/digest-unsubscribe/index.ts`. This avoids link scanners unsubscribing people just by visiting the link.
- **One-click unsubscribe:** the function also accepts the RFC 8058 POST directly. It sets `digest_opt_out=true` and `digest_opt_out_at`.

**Profile toggle:** add a "Weekly new-content email" switch to `src/pages/app/profile.tsx`. It calls `set_digest_preference`.

**Admin:** add a "Weekly email" panel to `src/pages/app/admin/news.tsx`. It shows a preview iframe of this week's email, a "Send test to me" button, and the last 8 `digest_runs`.

**Scheduler (host cron, light job):**
- `~/bin/weekly-digest.sh` sends a `curl -fsS -X POST https://api.textbook.com.pk/functions/v1/weekly-digest` with the secret read from a 0600 file.
- Crontab entry: `0 10 * * 0` (the host clock is PKT, +05).
- The cron job is installed only after the PR merges and with owner approval.
- The secrets `DIGEST_CRON_SECRET` and `DIGEST_TOKEN_SECRET` go into the self-hosted edge-runtime env, `supabase-project/.env`, which needs a restart of the functions container. They are never committed.
- Functions are deployed by copying them into `supabase-project/volumes/functions/`, as in `specs/002-authentication/quickstart.md:155-180`.

### 8. Spec and records
- Add `specs/028-news-ticker/spec.md`, `plan.md` and `tasks.md`, written from this plan.
- Add a board-direct PHR under `history/prompts/028-news-ticker/`.
- Suggest an ADR for "first anonymous-readable table + build-time git-derived feed" (owner consent needed).

## Out of scope (possible follow-ups)
- Letting admins hide or edit individual auto-posts. That would need a small `news_suppressions` table.
- Push notifications, and emails sent the moment something is posted (weekly only for now).
- An email-only language preference (the email is bilingual for now).
- Showing the ticker on reading pages.

## Verification
1. **Unit tests (vitest, through `scripts/heavy.sh`):**
   - `tests/unit/build-news-feed.test.mjs`: event detection against a temporary git repo fixture, the empty feed on a shallow clone, and stable ids.
   - `tests/unit/news-merge.test.ts`: ordering, pinning, Urdu fallback and the cap.
2. **RLS test `tests/rls/news-items.test.mjs`**, modelled on `page-feedback.test.mjs` and `g3-signoffs.test.mjs`, with a sentinel title prefix for cleanup:
   - Anonymous visitors see only live published items; drafts, scheduled, expired and archived items stay hidden.
   - Anonymous and teacher accounts are refused when they insert, update, delete or call the RPCs.
   - An admin can upsert and archive, and an audit row is written.
3. **Weekly email:**
   - `tests/unit/digest-email.test.ts` renders a fixture. It asserts the grouped sections, the RTL Urdu block, the unsubscribe link and headers, the text alternative, no em dash, and an empty-week result of null.
   - `tests/unit/digest-token.test.ts` covers token signing and verification.
   - `tests/rls/weekly-digest.test.mjs` checks four things:
     1. `weekly-digest` refuses calls that have no secret or a wrong one.
     2. Teacher and anonymous accounts cannot read `digest_runs`.
     3. `set_digest_preference` changes only the caller's own row.
     4. An unsubscribe with a tampered token is refused.
   - **Live check after merge:** an admin "Send test to me" email, viewed in Gmail on desktop and mobile in both languages. Then one dry `?mode=preview` call before the first Sunday run.
4. **Gates and checks:**
   - `npm run check:content` and `node scripts/check-no-service-key.mjs`.
   - Confirm `check-docs-sync` still passes; no new gate is added.
5. **Build and browser check:** first check `free -m`, then run `scripts/heavy.sh npm run build`.
   - Serve the build and check `/`, `/ur/`, and `/app/admin/news` as an admin.
   - Confirm the scroll direction in RTL, pause on hover and focus, the static fallback under reduced motion, and keyboard focus on the links.
   - Stop the server afterwards.
6. **Migrations:**
   - Apply `0052` and `0053` to local or staging Supabase first.
   - Apply it to production only after the PR merges, with owner approval.
