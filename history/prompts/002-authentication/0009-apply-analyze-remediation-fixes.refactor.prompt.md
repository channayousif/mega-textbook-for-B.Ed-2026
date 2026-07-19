---
id: 0009
title: Apply analyze remediation fixes
stage: refactor
date: 2026-07-18
surface: agent
model: claude-opus-4-8
feature: 002-authentication
branch: 002-authentication
user: channayousif@gmail.com
command: /sp.analyze (remediation)
labels: ["analyze", "remediation", "coverage-gap", "authentication", "traceability"]
links:
  spec: specs/002-authentication/spec.md
  ticket: null
  adr: history/adr/0005-self-selectable-teacher-role-with-verified-teacher-gate.md
  pr: null
files:
 - specs/002-authentication/spec.md
 - specs/002-authentication/plan.md
 - specs/002-authentication/tasks.md
 - specs/002-authentication/checklists/requirements.md
tests:
 - none run (planning artifacts); 6 new task-level tests specified
---

## Prompt

Suggest actions for all findings

→ then: apply all fixes starting with C1 as proposed

## Response snapshot

Ran `/sp.analyze` (read-only) producing 12 findings, proposed concrete remediation for each,
then applied all of them on the owner's approval.

**C1 (CRITICAL) — FR-002 email verification had zero coverage.** No task enabled Supabase's
confirmation setting (it existed only as quickstart prose) and no test asserted an unverified
account is refused a session — despite FR-002 being a MUST and appearing in US1's acceptance
scenarios and the contract checklist. Fixed with T007a (`enable_confirmations = true` in
`supabase/config.toml`, making it version-controlled rather than dashboard-only) and T021a (the
test that actually guarantees it in the hosted environment).

**HIGH**: FR-010's "users MUST be able to edit their own display name" had an RLS policy
permitting the update but no UI ever issuing it → T031a + T024a. Constitution Art. VII lists a
Lighthouse pass among mandated engineering-gate checks with no owning task → T060a with a
recorded threshold.

**MEDIUM**: FR-008/SC-005 role-change propagation was unverified → T041a, explicitly framed as
a regression guard for research.md R2 (it fails if anyone later moves role into a JWT claim,
which would silently make propagation take days under FR-011a's long sessions). SC-001 timing
folded into T063. FR-005 reworded to own the authorization obligation and delegate the
peer-teaching capabilities to Spec 003. FR-006/FR-010 and FR-016/FR-017 de-duplicated, with
FR-017 repurposed to cover indirect/side-channel disclosure rather than restating FR-016.
**User Story 5 added** to spec.md so FR-020–FR-022 gained an owning story; Phase 7 relabelled
`[US5]`.

**LOW**: plan.md source tree corrected (`authRedirect.ts`, `admin/audit.tsx`, five e2e specs
instead of one); shared-file conflict warnings added for `authErrors.ts` (T017/T035/T058) and
`profile.tsx` (T031/T031a/T045/T057), with T017 amended to stub all message keys up front so
later tasks stay additive.

Used suffixed task IDs (T007a, T021a, T024a, T031a, T041a, T060a) rather than renumbering,
matching the spec's own FR-003a convention and avoiding churn across 66 existing references.

Mechanically verified after applying: **72 tasks** (was 66), 0 malformed, 0 duplicate IDs,
story labels US1x14 US2x4 US3x11 US4x5 US5x8, and requirement citation coverage now
**27/27 FRs and 9/9 SCs** (was 22/27 and 7/9).

## Outcome

- ✅ Impact: All 12 analyze findings closed; no CRITICAL or HIGH issues remain before `/sp.implement`.
- 🧪 Tests: none run (planning artifacts). 6 new test tasks specified; total now 22 + harness.
- 📁 Files: spec.md (US5 + 3 FR rewordings), plan.md (source tree), tasks.md (+6 tasks, 3 amended, conflict notes), checklists/requirements.md (remediation log)
- 🔁 Next prompts: `/sp.implement` — start Phase 1, MVP checkpoint at end of Phase 3. Flip ADR-0005 Proposed to Accepted when the amendment commits (T066).
- 🧠 Reflection: Four of the six gaps (C1, G1, G3, G4) were *verification* gaps, not design flaws — the architecture handled each correctly but nothing proved it. That class of gap is invisible when reading artifacts individually and only surfaces when requirements are mechanically diffed against task citations.

## Evaluation notes (flywheel)

- Failure modes observed: the highest-severity finding (FR-002) was a requirement whose implementation lived in prose documentation (quickstart) rather than a task — so it read as "covered" to a human skimming, but had nothing executable behind it. Config-as-prose is a recurring blind spot worth grepping for.
- Graders run and results (PASS/FAIL): format validation PASS (72 tasks, 0 malformed, 0 dupes); FR citation coverage 27/27 PASS; SC citation coverage 9/9 PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): make requirement-citation coverage a mechanical check at the end of `/sp.tasks` itself, rather than waiting for `/sp.analyze` to find it — the grep is three lines and would have caught all five uncited FRs at generation time.
