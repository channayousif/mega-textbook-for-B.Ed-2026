---
id: 0029
title: Document auth architecture as ADR
stage: plan
date: 2026-07-19
surface: agent
model: claude-sonnet-5
feature: 002-authentication
branch: main
user: channayousif@gmail.com
command: /sp.adr
labels: ["adr", "architecture", "authorization", "governance"]
links:
  spec: specs/002-authentication/spec.md
  ticket: null
  adr: history/adr/0007-authentication-and-authorization-architecture.md
  pr: null
files:
 - history/adr/0007-authentication-and-authorization-architecture.md
tests:
 - "n/a — governance document"
---

## Prompt

/sp.adr (no additional input)

## Response snapshot

`.specify/scripts/bash/check-prerequisites.sh --json` requires a `NNN-feature-name` branch and
failed on `main` (both features are already merged). Asked the owner which feature's `plan.md`
to review; they chose `002-authentication`.

Read `plan.md`, `research.md`, and the two existing 002-authentication ADRs (0005 role policy,
0006 hosting location) to find decision clusters neither already covers. Found one: the
technical shape of authorization itself — direct browser-to-Supabase with no API/BFF layer, RLS
+ a guard trigger as the sole enforcement boundary, role read live from `profiles` rather than a
JWT claim (research.md R2, specifically because FR-008's "applies by next visit" guarantee would
break under FR-011a's long-lived sessions if cached in a token), and the service-role key
confined to exactly two Edge Functions. This was captured only as scattered bullets in
`research.md` and a Complexity Tracking table in `plan.md` — never as its own ADR — despite
passing all three significance tests (cross-cutting impact on every future roles/permissions
feature; explicit alternatives already on record; the JWT-claim alternative specifically flagged
as something a future engineer might mistakenly "optimize" into).

Created ADR-0007 via `create-adr.sh`, filled every placeholder from the actual plan.md/research.md
content (not invented), and verified every file reference cited (tests, guard script, both
related ADRs) actually exists before finalizing.

## Outcome

- ✅ Impact: closes a real documentation gap — the authorization architecture pattern every
  future Spec 003–005 feature must follow now has a permanent, reviewable record with explicit
  alternatives, rather than living only as implementation-detail bullets in research.md.
- 🧪 Tests: n/a (governance document); referenced test files (`auth-role-propagation.spec.ts`,
  `privileged-columns.test.mjs`, `admin-role-change.test.mjs`) and the build guard
  (`check-no-service-key.mjs`) confirmed to exist before citing them.
- 📁 Files: `history/adr/0007-authentication-and-authorization-architecture.md` (new).
- 🔁 Next prompts: none required. Noted in passing (not acted on): plan.md's Follow-ups section
  still says "ADR-0005 is still Proposed" but ADR-0005's own Status field already reads
  "Accepted" — a stale note in plan.md, not a real gap, left as-is since fixing it wasn't part of
  this command's scope.
- 🧠 Reflection: the two existing 002-authentication ADRs each explicitly scope themselves away
  from this decision (0005: "purely... the role model"; 0006: "a hosting-model decision, not an
  application-architecture one") — reading both fully, not just checking that *an* ADR existed
  for the feature, is what surfaced the gap.

## Evaluation notes (flywheel)

- Failure modes observed: none — this was a documentation-completeness gap, not a discovered
  bug.
- Graders run and results (PASS/FAIL): significance-test checklist PASS on all three items
  (impact, alternatives, cross-cutting scope); quality checklist PASS (clustered not atomic,
  explicit alternatives with rationale, pros/cons for chosen + rejected options, concise).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
