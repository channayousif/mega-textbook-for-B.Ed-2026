# Quickstart: Authentication & Roles

**Feature**: 002-authentication | **Date**: 2026-07-18

How to stand up and exercise this feature locally. Assumes Spec 001's site already runs
(`npm start`).

---

## 1. Supabase project

Region **Mumbai `ap-south-1`** (nearest to Hyderabad, per ROADMAP). Free tier is sufficient
(Constitution Art. V.6).

1. Create the project; note the Project URL and the **anon** key.
2. Auth → Providers → enable **Email** with "Confirm email" **ON** (FR-002).
3. Auth → Providers → enable **Google**; paste the client ID/secret from a Google Cloud OAuth
   consent screen.
4. Auth → URL Configuration → add redirect URLs for all three environments:
   - `http://localhost:3000/**`
   - `https://<preview>.vercel.app/**`
   - `https://www.a2ahs.com/**`

   Missing any of these produces a silent redirect failure that looks like a broken login —
   the single most common setup mistake here.

## 2. Environment

```bash
# .env.local  — never commit
DOCUSAURUS_SUPABASE_URL=https://<ref>.supabase.co
DOCUSAURUS_SUPABASE_ANON_KEY=<anon key>
```

The anon key **is** meant to ship to the browser — it is safe only because RLS is enabled on
every table. The **service-role key never leaves Edge Functions** (Constitution Art. V.1); if
it ever appears in `src/`, that is a release-blocking defect.

Docusaurus only exposes variables to client code via `customFields` in `docusaurus.config.ts`
— reading `process.env` directly from a component will be `undefined` in the browser bundle.

## 3. Apply migrations

```bash
supabase link --project-ref <ref>
supabase db push          # applies supabase/migrations/*.sql
```

Migration order matters — enums → `profiles` → `privilege_audit` → `is_admin()` → policies →
triggers. Policies referencing `is_admin()` fail to create if the function does not exist yet.

## 4. Seed the first admin

No self-service path creates an admin (FR-009), so the first one is seeded by hand. Sign up
normally through the UI, then in the SQL editor:

```sql
update profiles set role = 'admin' where id = '<your-uuid>';
```

This direct update runs as the service role and bypasses the guard trigger — which is exactly
why it works here and not from the client.

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
| Switch locale to Urdu | Auth screens and errors in Urdu | FR-014, SC-007 |

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
update profiles set verified_teacher = true where id = auth.uid();

-- as admin: must succeed AND leave exactly one audit row
update profiles set role = 'teacher' where id = '<someone>';
select * from privilege_audit order by created_at desc limit 1;
```

## 7. Suspension & deletion

```bash
supabase functions deploy admin-suspend delete-account
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=<service key>
```

- Suspend a test user from the admin page → their open session stops working on the next
  protected request and they cannot sign back in (FR-020).
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
