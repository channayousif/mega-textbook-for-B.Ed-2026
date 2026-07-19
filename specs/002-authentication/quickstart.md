# Quickstart: Authentication & Roles

**Feature**: 002-authentication | **Date**: 2026-07-18

How to stand up and exercise this feature locally. Assumes Spec 001's site already runs
(`npm start`).

---

## 1. Stand up self-hosted Supabase

**Self-hosted on the existing a2ahs.com VPS — not Supabase Cloud** (Constitution v2.2.0 Art.
V.1/V.6, ADR-0006). Docker is installed as of 2026-07-19 (Compose v2, via the official apt repo —
if starting fresh on a Docker-less box, install Docker Engine + the Compose plugin first).

```bash
# On the VPS
git clone --depth 1 https://github.com/supabase/supabase
mkdir supabase-project
cp -rf supabase/docker/* supabase-project
cp supabase/docker/.env.example supabase-project/.env
cd supabase-project
```

Before `docker compose up`, edit `docker-compose.yml` to firewall Postgres — the stock file
exposes it via Supavisor on `5432` (session) and `6543` (transaction) **by default**, not as an
opt-in. Restrict both to `127.0.0.1`/the Docker network only; the database must never be
reachable on the public interface (ADR-0006).

```bash
sh utils/generate-keys.sh        # generates JWT secret, anon key, service_role key into .env
sh run.sh start                  # docker compose pull + up -d; waits until healthy
docker compose ps                # confirm all services are healthy
```

Kong (the API gateway) listens on `8000` by default — confirmed free on this VPS (`ss -tln`
shows `80`/`443`/`8080`/`8443` already bound to nginx/apache2; `8000` is not). Add an nginx
server block for a new subdomain, e.g. `api.a2ahs.com`, terminating TLS and proxying to
`127.0.0.1:8000` — the same pattern already used for the docroot (`nginx → apache2:8080`). No
Kong port remapping is needed; it slots into the one free port.

Then, in `.env` (self-hosted `GOTRUE_*` variables, not a dashboard):

1. `GOTRUE_MAILER_AUTOCONFIRM=false` and confirm `supabase/config.toml`'s
   `[auth.email] enable_confirmations = true` matches (FR-002) — config.toml is version-controlled
   for the Supabase CLI's local dev loop; the self-hosted container reads its own `.env`, so both
   must agree by hand.
2. **Mail relay is mandatory, not optional** (ADR-0006): set `SMTP_HOST`/`SMTP_PORT`/`SMTP_USER`/
   `SMTP_PASS`/`SMTP_ADMIN_EMAIL`/`SMTP_SENDER_NAME` in `.env` to a transactional relay — never
   the box's local `exim4` (VPS-IP deliverability to Gmail is fragile; a bounced confirmation
   email is a broken FR-002 signup). This project uses Resend on a **dedicated subdomain**
   (`edu.a2ahs.com`, not the apex — keeps it isolated from the box's existing `mail.a2ahs.com`
   inbox): `SMTP_HOST=smtp.resend.com`, `SMTP_PORT=465`, `SMTP_USER=resend` (literally that
   string), `SMTP_PASS=<Resend API key, sending-access scope only>`. Verify the domain is
   actually *verified* in Resend (SPF+DKIM via Cloudflare DNS, DNS-only/grey-cloud) before
   trusting a new API key — a key created before verification finishes stays silently pinned to
   the wrong domain even after the dashboard shows "Verified" (found the hard way, ADR-0006).
   `docker compose up -d auth` (not `restart`) after changing `.env` — env vars are substituted
   at container creation, a plain restart reuses the old values.
3. `GOTRUE_EXTERNAL_GOOGLE_ENABLED=true` with the client ID/secret from a Google Cloud OAuth
   consent screen.
4. `GOTRUE_URI_ALLOW_LIST` — add redirect URLs for every environment:
   - `http://localhost:3000/**`
   - `https://www.a2ahs.com/**`

   Missing either produces a silent redirect failure that looks like a broken login — the
   single most common setup mistake here.

## 2. Environment

```bash
# .env.local  — never commit
DOCUSAURUS_SUPABASE_URL=https://api.a2ahs.com
DOCUSAURUS_SUPABASE_ANON_KEY=<anon key from generate-keys.sh output>
```

The anon key **is** meant to ship to the browser — it is safe only because RLS is enabled on
every table. The **service-role key never leaves Edge Functions** (Constitution Art. V.1); if
it ever appears in `src/`, that is a release-blocking defect. On self-hosted Supabase both keys
come from `generate-keys.sh`'s output, not a project dashboard.

Docusaurus only exposes variables to client code via `customFields` in `docusaurus.config.ts`
— reading `process.env` directly from a component will be `undefined` in the browser bundle.

## 3. Apply migrations

Self-hosted has no cloud project to `supabase link` against. Apply the SQL directly to the
stack's Postgres container:

```bash
cat supabase/migrations/*.sql | docker compose exec -T db psql -U postgres -d postgres
```

or, run individually in the numbered order below if debugging a specific migration. Order
matters — enums → `profiles` → `privilege_audit` → `is_admin()` → policies → triggers. Policies
referencing `is_admin()` fail to create if the function does not exist yet.

## 4. Seed the first admin

No self-service path creates an admin (FR-009), so the first one is seeded by hand. Sign up
normally through the UI, then connect to the self-hosted Postgres directly:

```bash
docker compose exec db psql -U postgres -d postgres
```

```sql
update profiles set role = 'admin' where auth_user_id = '<your auth.users id>';
```

Note the column is `auth_user_id`, not `id` — `profiles.id` is its own independent primary key
(data-model.md's 2026-07-18 correction), not the `auth.users` id. This direct `psql` session
runs as the `postgres` superuser and bypasses the guard trigger — which is exactly why it works
here and not from the client.

## 5. Verify the happy paths

```bash
npm start                 # http://localhost:3000
```

| Check | Expect | Spec |
|---|---|---|
| Sign up with Google from a docs page | Land back on that same page, signed in | FR-013 |
| Header while signed in | Name, or email when no name set | FR-010b |
| Sign up with email | Verification mail; sign-in refused until confirmed | FR-002 |
| Sign up choosing "teacher" | `role='teacher'`, `verified_teacher=false` | FR-003, FR-005a |
| Navigate docs → `/app/…` → docs | Still signed in throughout | FR-011 |
| Close browser, reopen | Still signed in | FR-011a, SC-006 |
| Switch locale to Urdu, then visit an auth page | **Auth screens stay English by design** (owner decision, 2026-07-19 — only book *content* is bilingual); no internal auth link ever locale-prefixes into `/ur/app/*`, confirmed in `tasks.md` T059 | FR-014, SC-007 |

## 6. Verify the access controls (the part that matters)

```bash
npm run test:rls          # RLS matrix from contracts/auth-operations.md §D
```

This suite is the evidence for SC-004 and Constitution Art. VII's engineering gate. It must
prove the **negative** cases — a passing suite that only tests happy paths proves nothing about
authorization. Minimum: student cannot read another profile; non-admin cannot write `role` /
`verified_teacher` / `status`; unverified teacher cannot reach answer keys; nobody can write
`privilege_audit`; suspended user is locked out.

Manual spot-checks worth doing once:

```sql
-- as a non-admin session: must ERROR, not silently no-op
update profiles set verified_teacher = true where auth_user_id = auth.uid();

-- as admin: must succeed AND leave exactly one audit row
update profiles set role = 'teacher' where auth_user_id = '<other-account-auth-uid>';
select * from privilege_audit order by created_at desc limit 1;
```

## 7. Edge Functions — admin user list, suspension & deletion

Self-hosted Edge Functions are not `supabase functions deploy`d to a cloud project — the
edge-runtime container serves whatever is mounted into it, dynamically, per request
(`EdgeRuntime.userWorkers.create` in `main/index.ts`, the router every self-hosted install
ships with). **No restart needed to pick up a new or changed function** — verified directly:
`admin-list-users`, `admin-suspend`, and `delete-account` were all added and (in `admin-suspend`'s
case) edited again after a bug fix, over several hours, against a `functions` container that had
been running continuously since before any of them existed. All three worked immediately on the
next request. All three share `supabase/functions/_shared/adminAuth.ts` for the "resolve caller
from their own token, verify active admin" logic.

```yaml
functions:
  volumes:
    - ./volumes/functions:/home/deno/functions   # mount supabase/functions/ here
  environment:
    JWT_SECRET: ${JWT_SECRET}
    SUPABASE_URL: http://kong:8000
    SUPABASE_SERVICE_ROLE_KEY: ${SERVICE_ROLE_KEY}   # from generate-keys.sh
```

```bash
cp -r supabase/functions/* supabase-project/volumes/functions/
# that's it — no docker compose restart/up needed for function code changes
```

- **`admin-list-users`**: `GET`, admin-only, returns `profiles` joined with `auth.users.email` —
  needed because `profiles` deliberately has no email column (Art. VIII.2), so an admin managing
  *other* accounts has no way to identify them without reading `auth.users`, which needs the
  service-role key.
- Suspend a test user from the admin page → their open session stops working on the next
  protected request (RLS `status='active'` check) and a **fresh** sign-in attempt is refused
  outright with GoTrue's own `user_banned` error (FR-020). Uses
  `auth.admin.updateUserById(uid, { ban_duration })` — **not** `auth.admin.signOut(user_id,
  'global')`, which research.md R5 originally specified and which does not work: it revokes
  sessions for whoever a *JWT* belongs to, not an arbitrary user id, and an admin acting on
  someone else's account never holds their JWT. Found by actually calling the function
  (`supabase/functions/admin-suspend/index.ts`, research.md R5's 2026-07-19 correction).
- Delete a test account that has submissions → confirm the `auth.users` row is gone, the
  `profiles` tombstone remains with `full_name IS NULL`, and the submissions still resolve
  (FR-021, SC-009).

## 8. Common failure modes

| Symptom | Cause |
|---|---|
| Build fails with `window is not defined` | Supabase client created at module top level — must be lazy / `<BrowserOnly>` (R1) |
| `infinite recursion detected in policy` | A `profiles` policy queries `profiles` without `is_admin()`'s SECURITY DEFINER escape (data-model R2) |
| OAuth returns to `localhost:3000/?code=…` and nothing happens | Redirect URL not registered for this environment (step 1.4) |
| Sign-up succeeds but no profile row | `handle_new_user` not `SECURITY DEFINER`, or missing grant on `public.profiles` |
| Suspended user still browsing | RLS policies missing the `status='active'` predicate — the status column alone does not enforce anything |
