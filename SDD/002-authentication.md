# SPEC 002 — Authentication & Roles

**Status:** Draft for approval • **Depends on:** Constitution, 001 • **Blocks:** 003, 004, 005

## 1. Problem & Goal
Students and teachers need accounts (Google OAuth **and** email/password) so dashboards, submissions, and grades can be personal and protected. Docusaurus is static, so authentication is delegated to **Supabase Auth**; the site talks to it from client-side React pages.

## 2. Roles & Provisioning
| Role | How obtained | Capabilities |
|---|---|---|
| `student` | Self sign-up (Google or email) → default role | Read book, join a class via code, submit work, view own dashboard |
| `teacher` | Self sign-up → requests teacher role → **admin approves** | Everything students have + create classes, assign, grade, give feedback, suggest book improvements |
| `admin` | Seeded manually (curriculum owner) | Approve teachers, manage semesters/courses metadata, view all |

Teacher self-declaration without approval is forbidden (Constitution Art. V.3) — otherwise any student could see answer keys.

## 3. User Stories
- **A1**: As a new user, I sign up with Google in ≤ 2 clicks, or with email + password (with email verification).
- **A2**: As a user, I reset a forgotten password via email link.
- **A3**: As a teacher, after sign-up I request teacher status; I see "pending approval" until the admin approves.
- **A4**: As an admin, I see pending teacher requests and approve/reject with one click.
- **A5**: As any user, my session persists across the textbook site; header shows my name and role; logout works everywhere.

## 4. Functional Requirements
| ID | Requirement |
|---|---|
| AU1 | Supabase Auth with providers: Google OAuth + email/password (email confirmation ON). |
| AU2 | `profiles` table: `id (auth uid)`, `full_name`, `role (student|teacher|admin)`, `teacher_status (none|pending|approved)`, `created_at`. Row auto-created via DB trigger on sign-up. |
| AU3 | Role is stored server-side only; client reads it, never writes it. RLS: users update only their own `full_name`. |
| AU4 | Auth UI lives at `/app/login`, `/app/signup`, `/app/reset` as Docusaurus custom React pages; redirect back to the page the user came from. |
| AU5 | Site-wide `<AuthProvider>` (Docusaurus theme swizzle of Root) exposes session + role to all pages; navbar shows Login / avatar accordingly. |
| AU6 | Google OAuth redirect URLs configured for local dev, preview, and prod domains. |
| AU7 | Rate-limit-friendly error messages in simple English + Urdu. |

## 5. Security Requirements
- All privileged reads/writes protected by Postgres RLS; anon key ships in the client (expected), service key never does.
- RLS test suite: student cannot read another student's profile; unapproved teacher cannot access teacher-only tables.
- Session tokens handled by supabase-js defaults (no custom token storage).

## 6. Step-by-Step Build Plan
1. Create Supabase project; enable Google provider (GCP OAuth consent screen + client ID/secret) and email provider.
2. Migration 001: `profiles` table + sign-up trigger + RLS policies.
3. Add `@supabase/supabase-js` to the Docusaurus app; create `src/lib/supabase.ts` with env-driven keys.
4. Swizzle Root → `<AuthProvider>`; add navbar auth widget.
5. Build `/app/login`, `/app/signup`, `/app/reset` pages (bilingual labels).
6. Teacher request flow: button on profile page → sets `teacher_status='pending'`; admin page `/app/admin/teachers` lists & approves (RLS: admin only).
7. Write RLS tests (SQL or Vitest against a test project) for the matrix in §5.
8. Configure redirect URLs for all environments; smoke-test Google flow on mobile.

## 7. Acceptance Criteria
- [ ] Google sign-in and email sign-up both produce a `profiles` row with role `student`.
- [ ] Unverified email cannot log in; reset flow works end-to-end.
- [ ] Pending teacher sees pending banner; approved teacher gains teacher UI on next load.
- [ ] RLS test matrix passes (documented in repo).
- [ ] Auth state survives navigation across textbook pages and dashboard pages.
