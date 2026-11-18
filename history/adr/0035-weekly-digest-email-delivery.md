# ADR-0035: Weekly digest email delivery

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Accepted
- **Date:** 2026-11-09
- **Feature:** 028-news-ticker
- **Context:** The owner asked for a properly formatted weekly email of new content to registered users (rulings 2026-11-09: on by default with an easy opt-out, English and Urdu in one message, Sundays at 10:00 PKT). This is the platform's first bulk email to users; until now only GoTrue's auth mail and one transactional confirmation (`guest-feedback-submit`) were sent, both through Resend (ADR-0006). Constraints:
  - There is no application server (ADR-0007).
  - The host already runs crons and is resource-limited, and must stay inside OCI Always Free with no new resources.
  - Emails live in `auth.users`, not `profiles`.
  - Accounts can be suspended or tombstoned.
  - The content of the email must match the ticker.

## Decision

- **Sender:** a self-hosted Supabase edge function, `weekly-digest`. It runs with the service role already present in the edge runtime and sends through the existing Resend account, using the batch endpoint at 100 per call. No new external service is added.
- **Trigger:** a host crontab line (`0 10 * * 0`, host clock PKT) running `ops/news/weekly-digest.sh`. The script makes one HTTPS POST with an `x-cron-secret` header, matched in constant time against `DIGEST_CRON_SECRET`. Admins can also call `?mode=preview` and `?mode=test` with their own token, checked through `_shared/adminAuth.ts`.
- **Idempotency and audit:** `public.digest_runs`, keyed by ISO week. The function claims the week before sending, so a repeat call in the same week is a no-op. Counts and errors are recorded per week. The table is admin-read only and written by the service role only.
- **Content:** the last 7 days of the live site's `news-feed.json` (ADR-0034) plus admin `news_items` that went live in the window. A week with nothing new sends nothing.
- **Recipients and consent:**
  - Who gets it: active, non-deleted profiles with `digest_opt_out = false` and a confirmed auth email. The default is opt-out, per the owner ruling.
  - How to opt out:
    - The profile switch calls the `set_digest_preference` RPC, which changes the caller's own row only.
    - Every email carries an HMAC-SHA256 token signed for one profile with `DIGEST_TOKEN_SECRET`.
  - The email's link opens a confirm page (`/app/unsubscribe/`) that POSTs, so mail scanners cannot unsubscribe people.
  - The `List-Unsubscribe` and `List-Unsubscribe-Post` headers point at `digest-unsubscribe`, which supports RFC 8058 one-click.
- **Template:** a pure module, `_shared/digestEmail.ts`, that both Deno and vitest can load.
  - Layout: a 600px table with inline styles and a hosted PNG logo.
  - Languages: an English section, then an Urdu section with `dir="rtl"`.
  - It always includes a plain-text part and HTML-escapes all admin text.

## Consequences

### Positive

- No new infrastructure, vendor or OCI resource; the secrets live only in the edge-runtime env and a 0600 file on the host.
- One source of truth for "what is new" across the ticker and the email.
- Safe to re-run: duplicate cron firings or manual retries cannot double-send in a week.
- Opt-out works without sign-in, and is robust to link scanners and to mail clients' one-click unsubscribe.
- Tombstoned and suspended accounts are excluded by the same columns every RLS policy uses.

### Negative

- It depends on the host cron and the edge container both being up at 10:00 on Sunday. A missed run is not retried automatically; an operator re-runs the script (the ledger shows the gap).
- A failed week needs a manual ledger reset (delete the `digest_runs` row) before resending. Partial batch failures are counted but not retried per recipient.
- Resend plan limits cap reach. `DIGEST_MAX_RECIPIENTS` silently truncates beyond the cap, which needs revisiting as the user base grows.
- Default-on email is a consent choice that may need revisiting if the platform's privacy policy or applicable law changes.
- Deploying the secrets requires editing the self-hosted compose file and recreating the functions container, an ops step outside git.

## Alternatives Considered

- **`pg_cron` plus `pg_net` inside Postgres calling Resend or the function.** Rejected: adds database extensions and puts HTTP egress and the email secret in the database. It also makes failures harder to see than one log line on the host. The gain would have been no host dependency.
- **A Node script on the host sending directly with the service key.** Rejected: puts the service-role key on the host's deploy tree, which the deploy design keeps free of it. It would duplicate the user lookup outside the edge runtime.
- **A third-party newsletter service (Mailchimp, Buttondown) syncing the user list.** Rejected: a new vendor holding user emails, list sync to maintain, and a weaker fit with bilingual RTL content. The gain would have been managed deliverability and analytics.
- **Opt-in only.** Rejected by the owner, because reach would start near zero. It remains the fallback if consent rules tighten.
- **Unsubscribe links that act on GET.** Rejected: link scanners and previews would unsubscribe users silently.

## References

- Feature Spec: specs/028-news-ticker/spec.md
- Implementation Plan: specs/028-news-ticker/plan.md
- Related ADRs: ADR-0006 (self-hosted Supabase, Resend relay), ADR-0007 (no API layer), ADR-0008 (production deployment), ADR-0034 (news feed sources)
- Evaluator Evidence: history/prompts/028-news-ticker/2471-news-ticker-and-weekly-digest.green.prompt.md; ops/news/README.md
