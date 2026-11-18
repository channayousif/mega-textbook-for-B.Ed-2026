# ADR-0034: News feed sources and public news table

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Accepted
- **Date:** 2026-11-09
- **Feature:** 028-news-ticker
- **Context:** The owner asked for a scrolling "Latest" bar that announces new units, Urdu translations, new courses and certified reviews automatically, plus news and offers written by admins (rulings 2026-11-09: landing page and student/teacher dashboards only; automatic posts built from the content). The site is static Docusaurus with no application server (ADR-0007: the browser talks to self-hosted Supabase with the anon key; authorization lives in RLS). CI builds every PR against a shared live Supabase instance, and the production build runs on the deploy host from a full clone of `main` (ADR-0008). Every table so far has required a signed-in user, and `is_admin()` is granted to `authenticated` only (0004). The ticker must show to visitors who are not signed in.

## Decision

Two sources, merged in the browser, each owned by the layer that already holds its truth:

- **Automatic content events come from git, at build time.** `scripts/build-news-feed.mjs` runs in prestart/prebuild after `report-content-status`. It dates a unit by the commit that added its first topic file (`git log --diff-filter=A`), an Urdu mirror likewise, a course by its earliest unit, and a G3/G5 certification by the newest tracker commit that added the ticked, attributed row, emitted only when `static/content-status.json` says that gate is `done` now. Output: `static/news-feed.json` (gitignored, 60-day window, 24 events). `docusaurus.config.ts` embeds the newest 12 as `customFields.newsFeed`, so the ticker is prerendered. A shallow clone or missing git produces an empty feed with a warning, never a failed build.
- **Admin news lives in `public.news_items`, the first anon-readable table.**
  - A public select policy (`to anon, authenticated`) returns only published, unarchived rows inside their show window. It deliberately does not call `is_admin()`.
  - A separate admin select policy (`is_admin()`, `to authenticated`) shows drafts, scheduled, expired and archived rows.
  - The table has no client write grants. All writes go through `security definer` RPCs `upsert_news_item` and `archive_news_item`. Each checks `is_admin()`, raises `42501` otherwise, and writes `admin_action_history`.
  - Check constraints limit links to site-relative paths or `https://`, icons to a fixed list, and titles to 160 characters.
- **The ticker reads admin rows with a plain PostgREST `fetch` and the anon key**, not supabase-js, then merges them with the prerendered events (pinned admin items first, then newest first, capped at 12; Urdu falls back to English).

## Consequences

### Positive

- The automatic feed cannot claim something the content does not show: it is recomputed from the repository on every build and withdraws a review event when a later tracker row re-opens the gate.
- CI and the deploy host never need write credentials or a service key to announce content; there is no sync job to fail or drift.
- Prerendered events show without JavaScript and never shift the layout.
- Admin writes follow the established house pattern (RPC-only, audited, as in ADR-0032's ledger), so the console is convenience only and RLS is the boundary.
- An early site deploy before the migration is harmless: the fetch fails quietly and automatic items still show.

### Negative

- Event dates depend on full git history. A moved or renamed unit has no "added" commit at its new path and is skipped. A bulk restructure that re-adds files under new paths would announce them as new.
- Admins cannot hide or edit an automatic post; that would need a suppression table (deferred).
- Anonymous read access is a new class of exposure. Every future column added to `news_items` is public once a row is live, so nothing private may ever be stored there.
- Automatic events appear only after a deploy, not the moment content merges (in practice within the ~5-minute CD cycle).

## Alternatives Considered

- **CI or the deploy job inserts content events into a database table with the service key.** Rejected: puts a service-role credential into CI, which the repo forbids for the build (the deploy script runs without one). It also adds a second record that can drift from the content, and needs idempotent sync logic for re-runs and reverts. In return, admins could have edited or hidden auto-posts like manual ones.
- **Admins post every update by hand, including content changes.** Rejected: the owner asked for automatic posts, and the crew publishes many units a week.
- **Docusaurus's built-in `announcementBar`.** Rejected: one static message, set in config, with no admin editing, no list and no icons.
- **Public read through a `security definer` RPC instead of a table policy.** Rejected: it adds a function per query shape. A row policy with explicit grants is simpler to test, and PostgREST can serve it directly.

## References

- Feature Spec: specs/028-news-ticker/spec.md
- Implementation Plan: specs/028-news-ticker/plan.md
- Related ADRs: ADR-0007 (authorization in RLS, anon key from the browser), ADR-0008 (production deployment), ADR-0032 (RPC-only audited ledger pattern)
- Evaluator Evidence: history/prompts/028-news-ticker/2471-news-ticker-and-weekly-digest.green.prompt.md
