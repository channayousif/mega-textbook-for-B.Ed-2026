---
id: 0024
title: Fix bundle budget with async client
stage: green
date: 2026-07-19
surface: agent
model: claude-sonnet-5
feature: 002-authentication
branch: 002-authentication
user: channayousif@gmail.com
command: null
labels: ["performance", "bundle-budget", "code-splitting", "t060", "art-v5"]
links:
  spec: specs/002-authentication/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - src/lib/supabase.ts
 - src/contexts/AuthContext.tsx
 - src/pages/app/reset.tsx
 - src/pages/app/signup.tsx
 - src/pages/app/profile.tsx
 - src/pages/app/login.tsx
 - src/pages/app/admin/users.tsx
 - src/pages/app/admin/audit.tsx
 - specs/002-authentication/tasks.md
tests:
 - "PASS: npx tsc --noEmit (clean)"
 - "PASS: npm test — 15 unit tests (unchanged)"
 - "PASS: npm run test:rls — 34/35, 1 skip (unchanged)"
 - "PASS: npx playwright test — 11/11 across all auth specs, against the rebuilt async client"
 - "Measured: main.js 697.2 KB raw/204.1 KB gzip -> 483.6 KB raw/146.6 KB gzip; supabase-js now a separate 214.6 KB raw/54.1 KB gzip chunk"
---

## Prompt

continue with Phase 8 polish

(this PHR covers T060 specifically, the first and most consequential Phase 8 task tackled)

## Response snapshot

Fixed the Constitution Art. V.5 bundle-budget violation flagged since PHR 0011 (the very first
implementation session): mounting `<AuthProvider>` at Root pulled all of `supabase-js` into
`main.js`, which every content page loads, pushing it 4.1 KB gzip over the 200 KB budget. Root
cause was `getSupabase()` using `require()` — a synchronous call webpack bundles statically rather
than code-splitting.

Converted `getSupabase()` to an async function using dynamic `import('@supabase/supabase-js')`,
caching the **in-flight promise**, not just the resolved client — important because multiple
callers (AuthContext's own effect, a page's own effect, both potentially mounting in the same
tick) would otherwise race to import and construct separate client instances.

Scoped the blast radius first rather than guessing: grepped every `getSupabase()` call site (14
across 7 files) and found all of them already lived inside an async function, except two
`useEffect`s — `AuthContext.tsx`'s session-rehydration effect and `reset.tsx`'s
`PASSWORD_RECOVERY` listener. Both needed the standard async-setup/sync-cleanup pattern: a
`cancelled` flag guarding state updates after unmount, and a replaceable `unsubscribe` starting as
a no-op so the effect's required synchronous cleanup return is always safe to call regardless of
whether the import has resolved yet. `admin/audit.tsx` needed a smaller fix — its existing async
IIFE just needed the `getSupabase()` call moved inside it rather than left outside in the
non-async effect body (caught immediately by `tsc`, not discovered live).

Rebuilt and measured directly rather than trusting the fix worked from code inspection alone:
`main.js` dropped from 204.1 KB gzip to **146.6 KB gzip** — comfortably under the 200 KB budget,
and only ~2 KB gzip above the original pre-auth baseline (144.5 KB) from Spec 001. supabase-js now
lives in its own 54.1 KB gzip chunk, fetched lazily. Confirmed no functional regression the same
way every other change this session was confirmed: full RLS suite (34/35) and the complete 11-spec
e2e suite, run against the rebuilt client, both still pass.

## Outcome

- ✅ Impact: the one open constitutional violation this feature carried since its first implementation session is now closed, with a measured number, not just a code change presumed correct.
- 🧪 Tests: tsc clean; unit 15/15; RLS 34/35 + 1 skip; e2e 11/11 — all against the rebuilt async client, confirming the refactor (7 files, 2 restructured effects) introduced no regression.
- 📁 Files: 8 modified (the client module + every consumer).
- 🔁 Next prompts: T060a (Lighthouse audit, needs deciding what "preview deployment" means without a public deployment of this feature yet), T061 (accessibility passes), T059 (Urdu RTL), T062 (CI wiring), T064 (RLS matrix write-up), T065 (quickstart walkthrough) — the rest of Phase 8.
- 🧠 Reflection: this is the first Phase 8 task and the only one of this session's many fixes that was flagged as a KNOWN issue from the start (recorded with exact numbers in PHR 0011) rather than discovered by testing — a useful contrast to this session's dominant pattern (bugs found only by execution). Fixing a known, measured problem with a known, standard technique (dynamic import code-splitting) went cleanly on the first attempt; the only surprises were mechanical (the two effects needing restructuring), not conceptual.

## Evaluation notes (flywheel)

- Failure modes observed: one caught immediately by `tsc` (the `admin/audit.tsx` await-outside-async-function), not by runtime testing — worth noting as the class of bug static typing is actually good at catching, unlike the API-shape and RLS-policy bugs this session's testing found that types can't see.
- Graders run and results (PASS/FAIL): tsc PASS; unit 15/15 PASS; RLS 34/35 PASS + 1 skip; e2e 11/11 PASS; bundle measurement PASS (146.6 KB < 200 KB budget).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): none needed here — this task went as planned, which is itself worth recording as a data point against the session's more common "plan meets execution and something's wrong" pattern.
