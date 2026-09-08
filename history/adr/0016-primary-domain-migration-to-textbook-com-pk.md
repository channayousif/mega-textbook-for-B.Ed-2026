# ADR-0016: Primary Domain Migration from a2ahs.com to textbook.com.pk

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Accepted
- **Date:** 2026-09-08
- **Feature:** none (infrastructure / operations)
- **Context:** The project's public domain `a2ahs.com` expired and was not renewed. Every
  externally reachable surface built in Specs 001 to 010 is bound to it: the Docusaurus site
  (`www.a2ahs.com`, ADR-0002), the self-hosted Supabase edge (`api.a2ahs.com` to Kong, ADR-0006),
  the transactional-mail sender domain (`edu.a2ahs.com` on Resend, ADR-0006), and the HestiaCP
  panel / box hostname (`hcp.a2ahs.com`). A new domain, `textbook.com.pk`, was registered and its
  DNS delegated to Cloudflare. The owner's call was a full-estate move to `textbook.com.pk` with
  the apex as the canonical site URL, rather than a site-only move that would leave auth-gated
  features (login, dashboards, guest feedback email) broken. The serving architecture, the
  pull-based CI-gated deploy pipeline (ADR-0008), and the self-hosted backend model (ADR-0006) are
  all unchanged; only hostnames, DNS, and origin TLS material move. This ADR records the new
  host map and the choices made during cutover so ADR-0002 / ADR-0006 / ADR-0008 can be read with
  their `a2ahs.com` hostnames mentally rewritten, without editing those historical records.

<!-- Significance checklist (ALL true):
     1) Impact - changes every public hostname, the origin TLS trust model, and the SITE_URL /
        redirect-allow-list that GoTrue and the guest-feedback edge function depend on; other
        engineers will read every prior ADR through this remap.
     2) Alternatives - site-only vs full-estate migration; apex vs www canonical; Let's Encrypt
        vs Cloudflare Origin CA at the origin; keep api. as a Hestia domain vs standalone vhost.
     3) Scope - cross-cutting: DNS, origin nginx/Apache, the deploy script's docroot, the
        Supabase stack's .env, Google OAuth config, and the Resend sender domain all move together. -->

## Decision

Migrate the entire externally reachable estate to `textbook.com.pk` as one change set.

### 1. Host map

| Old (`a2ahs.com`) | New (`textbook.com.pk`) | Role (unchanged) |
| --- | --- | --- |
| `www.a2ahs.com`, `a2ahs.com` | `textbook.com.pk` (apex canonical); `www.` 301-redirects to apex via a Cloudflare Single Redirect rule | Docusaurus static site |
| `api.a2ahs.com` | `api.textbook.com.pk` | standalone nginx vhost to Kong `127.0.0.1:8000` |
| `edu.a2ahs.com` | `edu.textbook.com.pk` | Resend sender domain (SPF/DKIM) |
| `hcp.a2ahs.com` | `hcp.textbook.com.pk` | HestiaCP panel + box system hostname |

Inbound mail (`mail.a2ahs.com` MX, `webmail.a2ahs.com`) is **not** migrated: the project sends
through Resend only and operates no inbound mailboxes.

### 2. Apex is the canonical site URL, not `www`

`docusaurus.config.ts` `url` becomes `https://textbook.com.pk`. `www.textbook.com.pk` stays as a
proxied CNAME to the apex and is 301-redirected in Cloudflare (dynamic-redirect ruleset,
query-string preserved). ADR-0002's `trailingSlash: true` and `baseUrl: '/'` are unchanged.

### 3. Origin TLS is a Cloudflare Origin CA certificate, Full (strict)

A single 15-year Origin CA certificate for `textbook.com.pk` + `*.textbook.com.pk` (created via
the Cloudflare API) is installed both in the standalone `api.textbook.com.pk` nginx vhost and, via
`v-add-web-domain-ssl`, in the HestiaCP site vhost. Cloudflare SSL/TLS mode is set to Full
(strict) once every proxied origin serves that certificate. This matches the approach ADR-0006
already took for `api.a2ahs.com` and keeps HTTP-01 out of the loop for a Cloudflare-proxied
origin. The `hcp.` panel record stays DNS-only (its port 8083 is not Cloudflare-proxyable) and
keeps a Let's Encrypt certificate via `v-add-letsencrypt-host`.

### 4. `api.textbook.com.pk` stays a standalone nginx vhost, not a Hestia web domain

Unchanged from ADR-0006's reasoning: a Hestia domain rebuild regenerates its templated
`nginx.conf` and would silently discard the hand-tuned proxy-to-Kong config.
`/etc/nginx/conf.d/api.textbook.com.pk.conf` is a copy of the old file with the `server_name` and
`ssl_certificate*` paths changed.

### 5. Backend reconfiguration

`~/supabase-project/.env`: `SITE_URL=https://textbook.com.pk`,
`ADDITIONAL_REDIRECT_URLS=http://localhost:3000/**,https://textbook.com.pk/**`,
`API_EXTERNAL_URL=https://api.textbook.com.pk/auth/v1`,
`SUPABASE_PUBLIC_URL=https://api.textbook.com.pk`,
`SMTP_ADMIN_EMAIL=noreply@edu.textbook.com.pk`; plus the hardcoded `SITE_URL` on the
edge-functions service in `docker-compose.yml`. Build-time `DOCUSAURUS_SUPABASE_URL` (dev
`.env.local`, the deploy clone's `.env.local`, and the CI secret) becomes
`https://api.textbook.com.pk`. Google OAuth gains the
`https://api.textbook.com.pk/auth/v1/callback` redirect URI and `https://textbook.com.pk` JS
origin.

### 6. Deploy pipeline docroot

`scripts/deploy-prod.sh` `DOCROOT` becomes `/home/a2ahs/web/textbook.com.pk/public_html`. The
pull-based, CI-gated cron mechanism (ADR-0008) is otherwise untouched. The new Hestia web domain
and its docroot must exist before this lands on `main`, or the deploy's `rsync --delete` fails.

## Consequences

### Positive

- Auth-gated features keep working: moving `api.` and the Resend sender domain in the same change
  set means login, dashboards, and confirmation email are not left broken.
- One Origin CA certificate covers the apex and every subdomain for 15 years, with no HTTP-01
  renewal dependency on any Cloudflare-proxied host.
- Prior ADRs need no edits: this ADR is the single remap reference. ADR-0002 / ADR-0006 / ADR-0008
  stay accurate as historical records.
- Apex-canonical removes the `www.` prefix from every future share link and QR code for a
  print-facing textbook audience.

### Negative

- Four external systems (Cloudflare DNS, the origin box, the Supabase stack, Google/Resend
  consoles) must be changed in a specific order for a clean cutover; a partial change leaves a
  visible break. Mitigation: the migration plan sequences them and keeps the old `a2ahs.com`
  Hestia domain and `api.a2ahs.com.conf` in place until the new path is verified.
- The `~/supabase-project/.env` edit plus `run.sh recreate` is the one hard-to-revert step.
  Mitigation: `.env.old` is retained and `docker-compose.yml` is diffed before recreate.
- Historical `www.a2ahs.com` strings remain throughout `specs/` and `SDD/ROADMAP.md` as
  now-dead references; they are documentation debt, cleaned opportunistically, not load-bearing.
- `edu.textbook.com.pk` starts with zero Resend sender reputation, same cold-start as
  `edu.a2ahs.com` had (ADR-0006); early confirmation mail may land in spam until the domain warms.

## Alternatives Considered

- **Site-only migration** (move `www` only, deal with `api.` later). Rejected: it ships a site
  where every sign-in, dashboard load, and guest-feedback email is broken until a second migration
  lands, for no saved effort overall.
- **`www.textbook.com.pk` as canonical** (matching the old `www.a2ahs.com` convention). Rejected:
  the apex is cleaner for a textbook's shared/printed URLs and Cloudflare proxies the apex without
  the CNAME-flattening caveats that mattered before.
- **Let's Encrypt at the origin via `v-add-letsencrypt-domain`.** Rejected for the proxied hosts:
  it needs a grey-cloud window for every issuance and renewal; the Origin CA certificate is the
  standard HTTP-01-free choice for a Cloudflare-proxied origin and is already the pattern here.
- **Make `api.textbook.com.pk` a proper Hestia web domain.** Rejected, unchanged from ADR-0006: a
  domain rebuild would overwrite the proxy-to-Kong vhost.
- **Migrate inbound mail too** (`mail.`/`webmail.`, MX, exim4). Rejected: no inbound mailboxes are
  in use; outbound Resend is the only mail path.

## References

- Related ADRs: [ADR-0002](0002-content-platform-architecture-and-hosting.md) (site hosting and
  the WordPress replacement), [ADR-0006](0006-self-hosted-supabase-backend.md) (`api.` / `edu.`
  subdomains, Origin CA precedent, Resend cold-start), [ADR-0008](0008-production-deployment-architecture.md)
  (the pull-based CI-gated deploy this docroot change plugs into). This ADR supersedes the
  hostnames in all three; their decisions are otherwise intact.
- Migration plan: `~/.claude/plans/my-domain-a2ahs-is-encapsulated-planet.md` (Cloudflare API
  calls, HestiaCP commands, cutover order, verification checklist).
- Changed in this repo: `docusaurus.config.ts`, `scripts/deploy-prod.sh`, `supabase/config.toml`,
  `supabase/functions/guest-feedback-submit/index.ts`, `.github/workflows/deploy.yml`.
