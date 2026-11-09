# News ticker and weekly email: operations (Feature 028)

Spec: `specs/028-news-ticker/`. Code: `scripts/build-news-feed.mjs`, `src/components/NewsTicker/`,
`src/pages/app/admin/news.tsx`, `supabase/functions/weekly-digest/`, `supabase/functions/digest-unsubscribe/`.

## One-time rollout (owner approval required)

1. Apply `supabase/migrations/0052_news_items.sql` and `0053_weekly_digest.sql` to the shared
   Supabase. CI's RLS job (`tests/rls/news-items.test.mjs`, `weekly-digest.test.mjs`) needs them.
2. Generate two secrets (`openssl rand -hex 32` each) and add them to `~/supabase-project/.env`:
   `DIGEST_CRON_SECRET`, `DIGEST_TOKEN_SECRET`. Pass them to the `functions` service in
   `~/supabase-project/docker-compose.yml` beside `RESEND_API_KEY`:
   ```yaml
   DIGEST_CRON_SECRET: ${DIGEST_CRON_SECRET}
   DIGEST_TOKEN_SECRET: ${DIGEST_TOKEN_SECRET}
   DIGEST_PUBLIC_FUNCTIONS_URL: https://api.textbook.com.pk/functions/v1
   DIGEST_MAX_RECIPIENTS: "500"
   ```
3. Copy the functions: `cp -r supabase/functions/{_shared,weekly-digest,digest-unsubscribe} ~/supabase-project/volumes/functions/`,
   then recreate the container so it reads the new env: `docker compose up -d functions` (in `~/supabase-project`).
4. Write the cron secret to `~/.config/textbook/digest-cron-secret` (mode 0600).
5. After the site deploys: on `/app/admin/news`, press "Preview this week" and "Send test to me";
   check the test in Gmail on desktop and mobile, in both halves.
6. Install the crontab line: `0 10 * * 0 /home/a2ahs/deploy/mega_book/ops/news/weekly-digest.sh`.

## Running

- Log: `~/deploy/weekly-digest.log`; per-week ledger: `public.digest_runs` (shown on the admin page).
- Re-running in the same ISO week does nothing. To resend a failed week, delete its `digest_runs`
  row first (service role), then run the script.
- Resend limits apply per account plan; `DIGEST_MAX_RECIPIENTS` caps one run.
