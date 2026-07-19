---
id: 0013
title: Correct stale hosted-Supabase docs
stage: misc
date: 2026-07-18
surface: agent
model: claude-sonnet-5
feature: 002-authentication
branch: 002-authentication
user: channayousif@gmail.com
command: null
labels: ["docs", "supabase", "self-hosted", "constitution", "consistency"]
links:
  spec: specs/002-authentication/spec.md
  ticket: null
  adr: history/adr/0006-self-hosted-supabase-backend.md
  pr: null
files:
 - specs/002-authentication/plan.md
 - specs/002-authentication/quickstart.md
 - specs/002-authentication/tasks.md
 - SDD/ROADMAP.md
 - .specify/memory/constitution.md
tests:
 - "N/A — documentation-only change"
---

## Prompt

improve the flagged ( plan.md, quickstart.md, and ROADMAP.md still describe a hosted-cloud
Supabase setup (Vercel, Mumbai region) that no longer applies )

## Response snapshot

Fixed all three flagged files, plus one directly-related one found while editing (`tasks.md`
T063 still referenced a "Vercel preview" redirect URL).

- **plan.md**: Technical Context rewritten (self-hosted VPS + Kong:8000, not Vercel/Mumbai);
  Constitution Check table updated to v2.2.0 with V.1/V.6 rows reflecting self-hosting; added a
  "Gate resolution (Art. V.1/V.6)" section mirroring the existing V.3 gate-resolution pattern
  already in the file, documenting the mid-implementation hosting decision.
- **quickstart.md**: §1 rewritten from a hosted-dashboard walkthrough (region picker, Google
  OAuth via dashboard) to a self-hosted Docker Compose walkthrough — **verified against
  Supabase's actual self-hosting docs via Context7/WebFetch rather than adapted from memory**.
  That check caught a real error in the ADR I'd just written: I'd assumed Kong needed remapping
  off a default `8443` HTTPS port; Supabase's stock self-hosted compose only exposes Kong on
  `8000` (HTTP) and leaves TLS to a reverse proxy, so no remapping is needed at all — corrected
  in ADR-0006 too, not just here. Also caught that the stock compose exposes Postgres publicly
  by default via Supavisor on `5432`/`6543`, which sharpened the ADR's "never expose Postgres"
  requirement into "must override the default port mapping before first `docker compose up`."
  §3 (migrations) and §7 (Edge Functions) rewritten for the self-hosted flow — no cloud
  `supabase link`/`functions deploy`; Edge Functions are a volume mount into the edge-runtime
  container instead. §4 also had a **pre-existing, unrelated bug**: the admin-seeding SQL keyed
  on `profiles.id`, but data-model.md's earlier correction (found during Phase 1–2 implementation)
  made `id` an independent PK — the lookup should key on `auth_user_id`. Fixed in passing since
  it was in the exact section being edited and would have silently matched zero rows.
- **tasks.md**: T063 no longer tells a future implementer to register a Vercel preview redirect
  URL that will never exist.
- **ROADMAP.md**: architecture diagram relabeled (self-hosted VPS, not "managed backend" /
  Vercel/Netlify); Decision #1 now states self-hosting explicitly; the "Domain & hosting" open
  question in "Decisions Still Needed" marked resolved with a strikethrough rather than deleted,
  preserving the historical question/answer shape the rest of that section uses.
- **constitution.md**: updated the v2.2.0 sync-impact report's "downstream artifacts" list from
  "flagged, not fixed" to "✅ updated," and added one new, narrower follow-up: Feature 001's own
  ADR-0002/plan.md still says "Vercel primary" for the *site*, which is a separate, pre-existing
  inaccuracy (the site has been self-hosted since its original deploy) that this session's ADR
  does not cover and did not create — named explicitly so it isn't conflated with today's change
  or silently dropped.

**Deliberately not touched**: `specs/002-authentication/spec.md`'s "a managed backend service"
line (explicitly technology-agnostic by the spec's own framing) and `research.md`'s "rejected:
Vercel serverless" line (documents a past rejected alternative, not a current claim) — both
still accurate as written. Feature 001's own plan.md/research.md/tasks.md Vercel references are
out of scope: that's ADR-0002's decision for the site, a different feature and a different ADR,
and rewriting it wasn't asked for — recorded as a named follow-up instead of silently expanding
scope.

## Outcome

- ✅ Impact: the three flagged Spec 002 planning docs, plus ROADMAP.md, now describe the actual chosen infrastructure (self-hosted VPS) instead of a hosted-cloud setup that was never built. A future implementer following quickstart.md will not hit a `supabase link`/dashboard flow that doesn't apply.
- 🧪 Tests: N/A — no code changed, only specs/docs. (`npx tsc --noEmit` re-run out of caution: still clean, confirming nothing here touched source.)
- 📁 Files: 5 modified, 0 new.
- 🔁 Next prompts: install Docker and stand up the stack per ADR-0006/quickstart.md §1; separately, correct Feature 001's own Vercel references against its real self-hosted deployment (flagged, not part of this request).
- 🧠 Reflection: fetching Supabase's real self-hosting docs before writing the quickstart steps caught an error in an ADR I'd written minutes earlier from generic Kong knowledge rather than the actual product's defaults — the same "verify externally, don't reason from memory" principle that caught the GoTrue identity-linking and CASCADE findings earlier this session, now catching my own just-written work rather than an inherited assumption.

## Evaluation notes (flywheel)

- Failure modes observed: wrote a technically-plausible-but-wrong infrastructure detail (Kong 8443) into governance documentation on the first pass, from general knowledge of a component (Kong) rather than the specific product's (Supabase self-hosted) actual defaults — caught only because the next task happened to require fetching the primary source for an unrelated reason (writing accurate quickstart commands).
- Graders run and results (PASS/FAIL): tsc PASS (no-op check, confirms no source touched); no other executable check applies to a docs-only change.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): when a decision record cites a specific technical default (a port, a flag, a config key) for a product you didn't just look up, treat that citation as a claim requiring the same verification as a code fact — fetch the primary source before committing it to a governance document, not just before writing the code that depends on it.
