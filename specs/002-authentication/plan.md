# Implementation Plan: Authentication & Roles

**Branch**: `002-authentication` | **Date**: 2026-07-18 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-authentication/spec.md`

## Summary

Add accounts, roles, and sessions to the existing static bilingual textbook site. Users sign up
with Google or email/password and pick `student` or `teacher` **at sign-up only**; the role is
immutable to them afterwards and changeable by an admin alone. Peer-teaching capability is
self-selectable, but access to answer keys and restricted material is a separate
`verified_teacher` capability that only an admin grants — the control that preserves the
constitution's answer-key protection after the teacher-approval workflow was removed. Every
privilege change is written to an append-only audit table by the same trigger that authorises
it. Admins can suspend accounts; users can delete their own, which strips identity while
retaining submissions anonymously.

Technical approach: Supabase (Postgres + GoTrue + RLS) reached directly from the browser with
the anon key; authorization lives entirely in database policies and triggers, never in the UI.
A `Root` swizzle mounts an `<AuthProvider>` so one session spans textbook and app pages. Two
Edge Functions cover the only operations needing the service-role key (suspension, deletion).

## Technical Context

**Language/Version**: TypeScript 5.6 on Node 20+ (repo pins `~5.6.0`, engines `>=20`)
**Primary Dependencies**: Docusaurus 3.10 (existing), `@supabase/supabase-js` ^2 (new), React 18.3
**Storage**: Supabase Postgres (`profiles`, `privilege_audit`) — first database in this repo; content stays in Git per Constitution Art. V.1
**Testing**: Vitest (unit + RLS matrix), Playwright (auth e2e) — both already configured
**Target Platform**: Static site (`www.a2ahs.com`) + self-hosted Supabase — both on the existing a2ahs.com VPS (nginx → apache2 for the docroot; nginx → Kong:8000 for a new `api.a2ahs.com`, per ADR-0006). Not Vercel: the site has run on this VPS since its original deploy, and the backend is now self-hosted rather than Supabase Cloud.
**Project Type**: Web — static frontend + self-hosted backend; no application server
**Performance Goals**: Google sign-up → signed in < 30 s, ≤ 2 clicks (SC-001); auth bundle must not push content pages past the < 200 KB first-load budget (Art. V.5)
**Constraints**: Self-hosted, cost-controlled infrastructure (Art. V.6, ADR-0006) — no vendor-tier caps, but backups/upgrades/uptime are now the project's own obligation; anon key ships to browser, service-role key never does (Art. V.1); SSG-safe — no `window` at module scope; bilingual EN/UR incl. RTL (Art. III.8)
**Scale/Scope**: Low hundreds of users initially (one faculty); 4 auth pages + 1 admin area + 2 Edge Functions + 2 tables

## Constitution Check

*GATE: evaluated against Constitution v2.2.0 (re-checked after the v2.2.0 self-hosting amendment — see gate resolution below).*

| Article | Requirement | Status |
|---|---|---|
| V.1 | Content in Git; app state in a self-hosted Supabase stack; static site holds no secrets | ✅ Only anon key client-side; service-role confined to Edge Functions; self-hosted per ADR-0006 |
| V.2 | Security in the backend; answer keys protected by RLS, not hidden pages | ✅ `verified_teacher` enforced in RLS; nothing gated by static-bundle obscurity |
| V.3 | Roles self-selectable **at sign-up only**; admin never self-selectable; teacher ≠ restricted access | ✅ Trigger allowlist + guard trigger; matches FR-003/010/010a — **see gate resolution below** |
| V.4 | Adding a course must not require platform-code change | ✅ Feature adds no per-course logic |
| V.5 | < 200 KB first load, low-bandwidth first | ⚠️ supabase-js adds weight — mitigated by lazy-loading auth on content pages; verify in Art. VII engineering gate |
| V.6 | Cost-controlled infrastructure (self-hosted, not a metered vendor tier) | ✅ Self-hosted on the existing a2ahs.com VPS — ADR-0006; no Supabase Cloud/Vercel dependency |
| VIII.1 | Student data visible only to student, their teachers, admin — RLS-tested | ✅ Access-control matrix + negative tests (SC-004) |
| VIII.2 | Collect the minimum — no CNIC/phone/address | ✅ Only name (optional), email, role |
| VIII.3 | No plaintext passwords | ✅ Delegated to GoTrue |
| VIII.4 | Deletion anonymises rather than destroying gradebooks | ✅ Tombstone profile; FR-021/R6 |
| IX.1 | Google + email/password only | ✅ No other provider |
| IX.2 | Authorize at the database layer, not only UI | ✅ RLS + triggers; UI gating is cosmetic only |
| IX.3 | `verified_teacher` grant is an explicit admin action and MUST be recorded | ✅ `privilege_audit`, trigger-written, unforgeable `actor_id` |

**Gate resolution (Art. V.3)** — an initial violation was found and fixed before design:
Constitution v2.0.0 said "a user MAY switch their own role between these two", contradicting
spec FR-010/FR-010a (role fixed at sign-up, admin-only thereafter) from the 2026-07-18 clarify
session. Owner confirmed the spec is authoritative; the constitution was amended to **v2.1.0**
(MINOR — narrows a stated capability). Gate now passes with no outstanding violations.

**Post-Phase-1 re-check**: design introduces no new constitutional conflict. The one item to
watch is V.5 (bundle budget), tracked as a measurable check rather than a violation.

**Gate resolution (Art. V.1/V.6, added mid-implementation, 2026-07-18)** — the owner made an
explicit hosting-model decision (`#decision: we will go with selfhosted backend...`) after Phase
1–2 implementation had begun: self-hosted Supabase on the existing a2ahs.com VPS rather than
Supabase Cloud's free tier. This is a hosting-location change, not an architecture change —
self-hosted Supabase is the same OSS stack (Postgres + GoTrue + PostgREST + RLS) the migrations
and client code already target, so nothing built in Phase 1–2 required rework. The constitution
was amended to **v2.2.0** (Art. V.1 "managed backend" → "self-hosted"; Art. V.6 "Free-tier
friendly" → "Cost-controlled infrastructure") and the decision recorded in **ADR-0006**, which
also fixes the Kong/Postgres port-mapping and mandates a transactional mail relay (Resend/SES)
for GoTrue email — local `exim4` deliverability to Gmail is fragile enough to break FR-002/FR-004
silently. The Technical Context above, and quickstart.md, are updated to match; Docker is not yet
installed on the host, which is the concrete blocker before this can be exercised end-to-end.

## Project Structure

### Documentation (this feature)

```text
specs/002-authentication/
├── plan.md              # This file
├── spec.md              # Feature specification (9 clarifications, FR-001…FR-022)
├── research.md          # Phase 0 — R1…R7
├── data-model.md        # Phase 1 — tables, transitions, access matrix, triggers
├── quickstart.md        # Phase 1 — setup, verification, failure modes
├── contracts/
│   └── auth-operations.md   # Phase 1 — permitted ops, Edge Function endpoints, test checklist
├── checklists/
│   └── requirements.md
└── tasks.md             # Phase 2 — created by /sp.tasks, NOT by this command
```

### Source Code (repository root)

The repo is a single Docusaurus app at root (no `site/` subdirectory). New paths:

```text
src/
├── lib/
│   ├── supabase.ts             # lazy singleton client (SSG-safe)
│   ├── authErrors.ts           # provider error code → bilingual message
│   └── authRedirect.ts         # return-to-origin handling
├── contexts/
│   └── AuthContext.tsx         # session + profile + role, exposed site-wide
├── theme/
│   └── Root.tsx                # swizzle: wraps every page in <AuthProvider>
├── components/
│   ├── AuthGuard.tsx           # role/capability gating for app pages
│   └── NavbarAuthWidget.tsx    # sign-in link or account menu
└── pages/app/
    ├── login.tsx  signup.tsx  reset.tsx  profile.tsx
    └── admin/
        ├── users.tsx           # role mgmt, verified-teacher grant, suspend
        └── audit.tsx           # privilege-change history view

supabase/
├── config.toml                 # enable_confirmations = true (email verification, FR-002)
├── migrations/                 # enums → tables → is_admin() → policies → triggers
└── functions/
    ├── admin-suspend/          # service-role: status + global signOut
    └── delete-account/         # service-role: strip identity + delete auth user

scripts/
└── check-no-service-key.mjs    # build guard: fails if a service-role key reaches src/

tests/
├── rls/                        # NEW — access-control matrix (SC-004 evidence)
└── e2e/auth-{signup,reset,roles,role-propagation,session,signout}.spec.ts
```

**Structure Decision**: Extend the existing root-level Docusaurus app rather than introducing a
separate frontend/backend split — there is no application server to house, and the constitution
explicitly forbids adding one. `src/lib`, `src/contexts`, and `src/pages/app/` are new
directories alongside the existing `src/components` and `src/theme` from Spec 001. Database
artifacts live in a new top-level `supabase/` directory, keeping migrations reviewable in Git
the same way content is. Note `contracts/` at repo root already holds Spec 001's JSON Schemas,
so this feature's contracts stay scoped under `specs/002-authentication/contracts/`.

## Phase 0 — Research (complete)

See [research.md](./research.md). Seven unknowns resolved: static-site session handling (R1),
server-authoritative roles (R2), safe sign-up role capture (R3), unforgeable audit (R4),
immediate suspension (R5), anonymising deletion (R6), bilingual auth copy (R7). No
NEEDS CLARIFICATION markers remain.

Three findings materially shaped the design:
- Role must be read from `profiles`, not a JWT claim — long-lived sessions (FR-011a) would
  otherwise serve stale roles for days, breaking FR-008's "next visit" guarantee.
- `raw_user_meta_data` is user-controlled, so the sign-up trigger must allowlist the requested
  role or a client could self-assign `admin`.
- A `status` column alone cannot suspend a live session; refresh-token revocation is required.

## Phase 1 — Design & Contracts (complete)

- [data-model.md](./data-model.md) — `profiles`, `privilege_audit`, enums, state transitions,
  the access-control matrix, four triggers/functions, and the RLS recursion trap.
- [contracts/auth-operations.md](./contracts/auth-operations.md) — permitted client operations
  with expected denials, two Edge Function endpoints with status codes, and a 15-item contract
  test checklist.
- [quickstart.md](./quickstart.md) — Supabase setup, migration order, admin seeding,
  verification steps, and the five failure modes most likely to bite.

Agent context refreshed via `.specify/scripts/bash/update-agent-context.sh claude`.

## Complexity Tracking

No constitutional violations require justification. Two deliberate complexity choices are
recorded for review:

| Choice | Why needed | Simpler alternative rejected because |
|---|---|---|
| Two Edge Functions | Suspension and deletion need the service-role key, which must never reach the browser (Art. V.1) | Doing it client-side would require shipping the service key — a total compromise of the security model |
| Guard trigger *plus* RLS policies | RLS cannot express "update this row but not these columns" safely | Policy-only protection leaves `role`/`verified_teacher` writable by a crafted UPDATE, voiding FR-006 |

## Risks

1. **RLS policy error silently grants access.** Blast radius: answer keys leak to unverified
   teachers — the exact harm Art. V.2 exists to prevent. Mitigation: the RLS suite must assert
   negative cases and run in CI; treat a missing negative test as a failing gate, since
   happy-path tests cannot detect an over-permissive policy.
2. **Bundle growth breaks the < 200 KB budget (Art. V.5).** Blast radius: every content page
   slows for low-bandwidth users. Mitigation: lazy-load the auth client on content pages;
   measure in the engineering gate before merge.
3. **OAuth redirect misconfiguration per environment.** Blast radius: login silently broken in
   preview or production while working locally. Mitigation: all three URL sets registered up
   front (quickstart §1.4) and a smoke test on the deployed preview, including mobile.

## Follow-ups

- **ADR-0005 is still `Proposed`** — flip to `Accepted` when the governance amendment commits.
  Its role-switching prose should also note the sign-up-only restriction introduced in v2.1.0.
- Two obligations were handed to **Spec 003**, not resolved here: what happens to a teacher's
  active classes when an admin changes their role, and how a gradebook renders an anonymised
  author after deletion.
- Deferred as implementation detail: admin user-list search/pagination, rate-limit thresholds,
  and observability beyond the privilege audit.
