# Phase 0 Research: Authentication & Roles

**Feature**: 002-authentication | **Date**: 2026-07-18 | **Spec**: [spec.md](./spec.md)

Purpose: resolve every NEEDS CLARIFICATION from the plan's Technical Context before design.
The stack itself is not an open question — Constitution Art. V.1 and ROADMAP Decision #1 lock
Docusaurus + Supabase. Research here concerns *how* to apply that stack to this feature.

---

## R1 — Auth client integration with a static Docusaurus site

**Decision**: Use `@supabase/supabase-js` v2 in the browser only, with a singleton client in
`src/lib/supabase.ts`, wrapped by an `<AuthProvider>` mounted via a Docusaurus `Root` swizzle
(`src/theme/Root.tsx`). Session persistence and refresh are left to supabase-js defaults
(`persistSession: true`, `autoRefreshToken: true`, localStorage).

**Rationale**:
- Docusaurus is a static site generator; there is no server to hold a session. Auth must be
  client-side (Constitution Art. V.1: "Docusaurus is static and MUST NOT be trusted with
  secrets or access control").
- `Root` is the only Docusaurus swizzle point that wraps *every* page including docs, so it is
  the single place that satisfies FR-011 (session visible across textbook and app pages).
  Swizzling `Layout` or `Navbar` would miss or double-mount the provider.
- supabase-js defaults already implement FR-011a (long-lived, auto-refreshing, survives browser
  restarts) — writing custom token storage would violate the spec's "no custom token storage"
  intent and add a security surface for no gain.

**SSG constraint discovered**: Spec 001 hit a `require.resolveWeak` SSG failure traced to
`"type": "module"` in package.json. Auth code must therefore be guarded for server-side
rendering — Docusaurus prerenders every page in Node, where `window`/`localStorage` do not
exist. Mitigation: create the client lazily and gate browser-only work behind Docusaurus's
`useIsBrowser()` / `<BrowserOnly>`, never at module top level.

**Alternatives considered**:
- *Auth via serverless functions on Vercel*: rejected — adds a backend tier the constitution
  deliberately avoids, and RLS already provides authorization.
- *NextAuth / Auth.js*: rejected — requires a Next.js server runtime; incompatible with static
  Docusaurus.
- *Custom JWT handling in localStorage*: rejected — reimplements refresh/rotation badly.

---

## R2 — Enforcing "role is server-authoritative" (FR-010) under RLS

**Decision**: Store role and capabilities in a `profiles` table keyed by `auth.users.id`.
Grant the client `SELECT` on its own row and an `UPDATE` restricted by a column-level policy
plus a `BEFORE UPDATE` trigger that rejects any change to `role`, `verified_teacher`, or
`status` originating from a non-admin caller. Row creation happens in a
`SECURITY DEFINER` trigger on `auth.users` insert.

**Rationale**:
- Postgres RLS policies alone cannot express "you may update this row but not these columns"
  in a way that is safe against a crafted `UPDATE`; the standard remedy is a trigger that
  compares `OLD`/`NEW` on privileged columns and raises unless the caller is an admin.
  This is what makes FR-006 ("cannot grant themselves") enforceable rather than aspirational.
- The sign-up trigger must be `SECURITY DEFINER` because the inserting role is `supabase_auth_admin`,
  which has no rights on `public.profiles` by default.
- Role must be read from `profiles`, not from a JWT claim, because FR-008 requires an admin's
  change to apply "no later than their next visit" — a JWT claim would persist stale until
  token expiry, which under FR-011a's long-lived sessions could be days.

**Alternatives considered**:
- *Role in JWT app_metadata*: rejected as the source of truth for the reason above (stale
  claims under long sessions). MAY be added later as a read-through cache if profile lookups
  become a latency problem.
- *Separate `user_roles` table*: rejected — one role per user in v1; a join table is
  unjustified complexity (Constitution Art. VI.2).

---

## R3 — Sign-up-time role selection with an immutable-thereafter role

**Decision**: Pass the chosen role through `options.data` on `signUp()` (and for OAuth, apply
a default then let the user confirm on first load), and have the sign-up trigger read it from
`raw_user_meta_data`, **validating it against an allowlist of `student`/`teacher` only**.
Subsequent changes are blocked by the R2 trigger.

**Rationale**:
- `raw_user_meta_data` is user-controlled input. Without an allowlist check in the trigger a
  user could self-assign `admin` at sign-up — the exact attack FR-006/FR-009 forbid. The
  trigger must therefore treat the metadata as untrusted and coerce anything outside
  `{student, teacher}` to `student`.
- Google OAuth has no pre-consent metadata hook, so the role cannot be captured before the
  redirect; defaulting to `student` and offering a one-time role choice on first sign-in
  satisfies FR-003's "defaulting to student when no choice is made".

**Open consequence for design**: the "one-time role choice" for OAuth users needs a
first-run state. Handled in data-model as a nullable `role_chosen_at`.

**Alternatives considered**:
- *Trusting `raw_user_meta_data` unvalidated*: rejected — privilege-escalation hole.
- *Asking role before OAuth redirect and stashing in `localStorage`*: rejected — survives
  poorly across the redirect and is trivially tampered with; the trigger allowlist is the
  real control regardless.

---

## R4 — Audit trail that cannot be forged or erased (FR-018, FR-019)

**Decision**: `privilege_audit` table, append-only. RLS grants `SELECT` to admins only and
grants `INSERT` to no one; rows are written exclusively by the same `SECURITY DEFINER` trigger
that authorises privilege changes. No `UPDATE`/`DELETE` policy exists, so those are denied by
default under RLS.

**Rationale**:
- Writing the audit row from the client would let a caller change a role and skip the audit,
  or forge entries. Emitting it from the trigger makes the audit a side effect of the change
  itself — they cannot diverge.
- Omitting `UPDATE`/`DELETE` policies entirely (rather than writing deny policies) is the
  correct RLS idiom: with RLS enabled and no permissive policy for a command, that command is
  refused.
- `actor_id` comes from `auth.uid()` inside the trigger, not from client input, so FR-018's
  "who made the change" cannot be spoofed.

**Alternatives considered**:
- *Supabase's built-in audit log*: rejected — covers platform/dashboard actions, not
  application-domain privilege changes, and is not queryable by admins in-app (FR-019).
- *Application-level logging to an external service*: rejected — free-tier constraint
  (Art. V.6) and adds a dependency for something Postgres does natively.

---

## R5 — Account suspension with immediate session termination (FR-020)

**Decision**: `profiles.status` (`active` | `suspended`), enforced in two places: (a) every RLS
policy on protected tables requires the caller's status to be `active`; (b) the admin suspend
action also calls an Edge Function that invokes the Admin API
`auth.admin.signOut(user_id, 'global')` to revoke refresh tokens.

**Rationale**:
- A status column alone does not end a live session — an already-issued access token stays
  valid until it expires (~1 hour). FR-020 requires the user be "signed out immediately", so
  refresh-token revocation is required to stop renewal, and the RLS status check makes the
  remaining access-token window harmless (all protected reads/writes fail).
- The Admin API needs the service-role key, which per Constitution Art. V.1 must never ship to
  the browser — hence an Edge Function, the only server-side compute in this stack.

**Alternatives considered**:
- *Status check only, no token revocation*: rejected — user keeps a working session until
  token expiry, contradicting "signed out immediately".
- *Very short access-token TTL*: rejected — fights FR-011a's long-lived-session requirement
  and increases refresh traffic for every user to address a rare admin action.

---

## R6 — Account deletion that anonymises rather than destroys (FR-021, FR-022)

**Decision**: An Edge Function performs, in one transaction: null out `full_name`, set a
tombstone `deleted_at`, then `auth.admin.deleteUser(uid)`. Academic tables (owned by Spec 003)
reference `profiles.id` with `ON DELETE SET NULL` **or** retain the id against a tombstoned
profile row — the profile row itself is retained, stripped of identity, so foreign keys from
future submissions/grades stay valid.

**Rationale**:
- Constitution Art. VIII.4 and FR-021 require submissions to survive deletion, so a hard
  `DELETE` on `profiles` with cascade is wrong. Retaining a stripped tombstone row keeps
  referential integrity for Spec 003's gradebook without keeping personal data.
- Deleting the `auth.users` row (rather than just disabling it) is what frees the email for
  re-registration per FR-022, and satisfies "sign-in credentials removed".
- Requires the service-role key → Edge Function, same reasoning as R5.

**Deferred to Spec 003 (recorded, not resolved here)**: how a gradebook renders an anonymised
author, and whether teacher-owned classes transfer on admin role change. This plan defines
only the identity-removal obligation and the tombstone contract those specs will build on.

**Alternatives considered**:
- *Soft-delete only (keep auth.users, mark disabled)*: rejected — email stays occupied,
  contradicting FR-022.
- *Hard delete with cascade*: rejected — destroys teacher gradebooks, violating Art. VIII.4.

---

## R7 — Bilingual auth UI (FR-014) on Docusaurus i18n

**Decision**: Author auth pages under `src/pages/app/` and translate via Docusaurus's
`<Translate>` / `translate()` API, with strings extracted to
`i18n/ur/code.json` through `npm run write-translations`. Map Supabase error codes to a small
dictionary of friendly bilingual messages rather than surfacing raw provider text.

**Rationale**:
- Spec 001 already established the `ur` locale and RTL handling; reusing that pipeline keeps
  one translation mechanism (Art. V.4's spirit — no new platform machinery).
- Supabase auth errors arrive in English only and are often technical ("Invalid login
  credentials", rate-limit messages). FR-014 requires simple English *and* Urdu, so a mapping
  layer is required — raw pass-through cannot satisfy the requirement.
- Custom pages under `src/pages/` are exempt from the content-validation front-matter gate
  (they are `.tsx`, not docs Markdown), so they will not trip Spec 001's parity validator.

**Alternatives considered**:
- *Supabase Auth UI (`@supabase/auth-ui-react`)*: rejected — its theming/i18n do not reach the
  bilingual + RTL standard of Art. III.8, and it pulls a dependency for four simple forms.

---

## Resolved unknowns summary

| # | Unknown | Resolution |
|---|---------|-----------|
| R1 | Session exposure across a static site | supabase-js singleton + `Root` swizzle `<AuthProvider>`; SSR-guarded |
| R2 | Server-authoritative roles | `profiles` + RLS + `BEFORE UPDATE` trigger on privileged columns |
| R3 | Capturing role at sign-up safely | `raw_user_meta_data` with a trigger-side allowlist (never trusted) |
| R4 | Unforgeable audit | `privilege_audit`, trigger-written, admin-read, no update/delete policy |
| R5 | Immediate suspension | `status` column in RLS + Edge Function global sign-out |
| R6 | Anonymising deletion | Edge Function: strip identity, tombstone profile, delete auth user |
| R7 | Bilingual auth copy | Docusaurus `<Translate>` + error-code → bilingual message map |

**No NEEDS CLARIFICATION markers remain.** Proceed to Phase 1.
