---
id: 0011
title: Implement auth foundation phases
stage: green
date: 2026-07-18
surface: agent
model: claude-opus-4-8
feature: 002-authentication
branch: 002-authentication
user: channayousif@gmail.com
command: /sp.implement
labels: ["implement", "authentication", "supabase", "rls", "migrations", "ssg"]
links:
  spec: specs/002-authentication/spec.md
  ticket: null
  adr: history/adr/0005-self-selectable-teacher-role-with-verified-teacher-gate.md
  pr: null
files:
 - supabase/config.toml
 - supabase/migrations/0001_enums.sql
 - supabase/migrations/0002_profiles.sql
 - supabase/migrations/0003_privilege_audit.sql
 - supabase/migrations/0004_is_admin.sql
 - supabase/migrations/0005_profiles_policies.sql
 - supabase/migrations/0006_audit_policies.sql
 - supabase/migrations/0007_handle_new_user.sql
 - supabase/migrations/0008_guard_privileged_columns.sql
 - supabase/migrations/0009_write_privilege_audit.sql
 - src/lib/supabase.ts
 - src/lib/authErrors.ts
 - src/contexts/AuthContext.tsx
 - src/theme/Root.tsx
 - scripts/check-no-service-key.mjs
 - tests/rls/_helpers.mjs
 - vitest.rls.config.ts
 - .env.example
 - docusaurus.config.ts
 - package.json
 - specs/002-authentication/data-model.md
 - specs/002-authentication/tasks.md
tests:
 - "PASS: npx tsc --noEmit (clean)"
 - "PASS: npm test (10 unit tests, 4 files) - no regression from config split"
 - "PASS: npm run build (full SSG, en + ur locales)"
 - "PASS: check-no-service-key verified against planted service_role JWT (blocks) and anon JWT (allows)"
 - "NOT RUN: npm run test:rls - no Supabase instance available (no psql, no docker)"
---

## Prompt

/sp.implement

## Response snapshot

Executed Phases 1 and 2 of tasks.md — **21 of 72 tasks (29%)**. Checklist gate passed (16/16)
so implementation proceeded automatically. Stopped at the Phase 2 checkpoint rather than
continuing into Phase 3, because Phase 3 is where verification requires a live database.

Delivered: 9 SQL migrations (profiles, privilege_audit, RLS policies, three triggers, three
SECURITY DEFINER helpers), the SSG-safe client singleton, AuthContext, the Root swizzle, the
bilingual error dictionary, the RLS test harness, and the service-key build guard.

**Verified (actually ran):** typecheck clean; 10 existing unit tests still green; full SSG build
passes for both `en` and `ur`. The build was the meaningful test — research.md R1 predicted a
`window is not defined` prerender failure from module-scope client construction, and the lazy
pattern held. The service-key guard was verified in both directions against planted fixtures:
it decodes the JWT payload and blocks `role=service_role` while allowing `role=anon`, rather
than pattern-matching token shape, which would flag the anon key that is *supposed* to ship.

**Not verified (stated plainly):** no `psql` and no `docker` in this environment, so all 526
lines of SQL are unexecuted and `npm run test:rls` has never run. Structural checks only
(balanced `$$`, dependency ordering). The RLS matrix — the SC-004 evidence and the actual
security guarantee — remains entirely unproven.

**Two problems found by implementing, which reading the docs had not surfaced:**

1. **data-model.md contradicted FR-021.** It specified `profiles.id` as PK with
   `FK → auth.users(id) ON DELETE CASCADE`. But `delete-account` calls
   `auth.admin.deleteUser()`, and CASCADE would destroy the tombstone that FR-021 mandates and
   that every Spec 003 foreign key depends on. The schema and the requirement were mutually
   exclusive. Implemented the corrected shape — independent PK plus nullable `auth_user_id`
   with ON DELETE SET NULL — and amended data-model.md and T008 per Constitution Art. IV.4.

2. **Constitution Art. V.5 is now violated, with numbers.** Mounting `<AuthProvider>` at Root
   pulls supabase-js into `main.js`, which every content page loads. Measured against a real
   baseline (moved `Root.tsx` aside, rebuilt): 465.2 KB raw / **144.5 KB gzip** → 697.2 KB raw /
   **204.1 KB gzip**. That is +59.6 KB gzip and 4.1 KB over the < 200 KB budget. Root cause is
   `require()` in `getSupabase()`, which webpack bundles statically instead of code-splitting.
   Recorded in T060 with root cause and two fix options; deliberately not fixed, since making
   `getSupabase()` async ripples through AuthContext and deserves its own reviewed change.

## Outcome

- ✅ Impact: Auth foundation in place; Phase 3 (US1, the MVP) is unblocked as soon as a Supabase project exists.
- 🧪 Tests: typecheck + 10 unit + SSG build (both locales) + guard fixtures PASS. RLS suite NOT RUN — no database available.
- 📁 Files: 17 new, 5 modified. Commit 7e01a4e.
- 🔁 Next prompts: create the Supabase project (quickstart.md §1 — needs the owner's Supabase and Google Cloud accounts), then `npm run test:rls` to prove the migrations, then Phase 3. Fix T060 before merging to main.
- 🧠 Reflection: The two most valuable findings came from *executing*, not reading — the FK/tombstone contradiction survived a spec pass, a plan pass, and two full `/sp.analyze` runs because both halves were individually reasonable and only conflict when you try to build them. Likewise Art. V.5 was a "watch item" until the build produced a number.

## Evaluation notes (flywheel)

- Failure modes observed: (a) a data-model decision that contradicted a functional requirement, invisible to document-level review; (b) a bundle-budget constraint that no static analysis would catch; (c) my own sed pattern silently failed to tick T006 (colon vs hyphen in the script name) — caught only by re-reading the file, which argues for verifying task-marking rather than assuming it.
- Graders run and results (PASS/FAIL): tsc PASS; vitest unit 10/10 PASS; docusaurus build PASS (en+ur); service-key guard PASS both directions; RLS suite NOT RUN (blocked on infrastructure, not on code).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): before writing migrations, dry-run the destructive paths on paper — "what does DELETE do to every FK pointing here?" would have caught the CASCADE/tombstone conflict at data-model time rather than at implementation time.
