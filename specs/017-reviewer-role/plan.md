# Implementation Plan: The reviewer role

**Branch**: `017-reviewer-role` | **Date**: 2026-09-13 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/017-reviewer-role/spec.md`

## Summary

Grant, audit and exercise a `reviewer` capability so a qualified person other than the curriculum
owner can certify G3 and G5. The feature is smaller than the roadmap implied: Art. VII already
permits a qualified human executor, and the pipeline gate already accepts human initials, so no
constitutional amendment and no gate change are needed. What remains is one migration, one helper
function, RLS, one admin page, an export following ADR-0015, tests, and a governance record.

## Technical Context

**Language/Version**: TypeScript 5.6 on Node 22+; migrations are SQL; gate scripts unchanged
**Primary Dependencies**: Docusaurus 3.10, React 18.3, `@supabase/supabase-js` ^2 - **no new dependency**
**Storage**: Supabase Postgres - one column, one enum value, one function, RLS. Certification evidence is **not** stored here; it is a Git artefact (research R3)
**Testing**: `vitest.rls.config.ts` for RLS policy tests, `vitest` for unit tests, Playwright for the page
**Target Platform**: the existing self-hosted site and Supabase instance
**Project Type**: single project - a Docusaurus site with embedded app pages over Supabase
**Performance Goals**: none specific; the review queue is a small admin-only list
**Constraints**: Art. V.1 keeps gate outcomes in Git; Art. V.2 puts enforcement in the backend, never the UI; Art. V.3 closes the role set, so the capability pattern is mandatory
**Scale/Scope**: 1 migration, 1 page, 1 export, ~5 RLS tests, 1 governance record. No new prose, no gate change.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

| Article | Requirement | Verdict |
|---|---|---|
| **V.3 - closed role set** | Roles are `student`, `teacher`, `admin`; restricted access is a separate admin-granted capability | **PASS, and load-bearing** - a fourth role would violate the enumeration; the capability design is what the article prescribes |
| V.2 - security in the backend | Enforcement is RLS, not UI | **PASS** - `is_reviewer()` gates every policy; the page is a view over what RLS already permits |
| V.1 - content in version control | Gate outcomes stay in Git | **PASS** - certifications are Git artefacts; Postgres holds ephemeral queue state only (R3) |
| VII - review gates | G3/G5 execution | **PASS** - exercises the existing "qualified human" permission; no amendment (R5) |
| VIII - data protection | Certifications name people | **PASS** - reviewer identity is already public in tracker rows by design; no new personal data beyond initials |
| IX - authentication and access | Capability granted only by admin | **PASS** - `guard_privileged_columns` blocks self-grant; `privilege_audit` records both directions |
| IV - SDD law | Approved spec precedes implementation | **PASS** - spec at PR #51 |
| VI - scope discipline | No standard change | **PASS** - v4.0 is frozen and untouched |

Post-Phase-1 re-check: unchanged. No article is in tension, and V.3 actively prescribes the design.

## Project Structure

### Documentation (this feature)

```text
specs/017-reviewer-role/
├── plan.md              # This file
├── research.md          # Phase 0 - R1 capability, R2 helper, R3 Git evidence, R4 reuse, R5 no gate change
├── data-model.md        # Phase 1 - capability column, audit type, queue state, certification artefact
├── quickstart.md        # Phase 1 - granting, certifying, applying
├── contracts/
│   └── certification.md # Phase 1 - the certification artefact and its tracker row
└── tasks.md             # Phase 2 (/sp.tasks - NOT created here)
```

### Source Code (repository root)

```text
supabase/migrations/
└── 0043_reviewer_capability.sql   # NEW - column, audit enum value, is_reviewer(), RLS

src/
├── lib/reviewQueue.ts              # NEW - queue reads, certification builder, export
└── pages/app/admin/
    ├── users.tsx                   # MODIFIED - reviewer toggle beside verified_teacher
    └── review-queue.tsx            # NEW - the review surface

tests/rls/
└── reviewer-capability.test.mjs    # NEW - the five policy assertions

specs/reviewers/
└── human-reviewers.md              # NEW - the qualification record (R5: governance, not a gate input)
```

**Structure Decision**: single project, following the existing app-page-over-Supabase shape. The
review surface is an admin page like `feedback-queue.tsx`, not a new surface type, because it is
read-mostly and admin-scoped.

## Phase 0 - Research

Complete. See [research.md](./research.md). The load-bearing finding is R1: Art. V.3 closes the
role set and names the capability as the extension point, so the design the spec argued for on
engineering grounds is the one the constitution prescribes.

## Phase 1 - Design & Contracts

Complete. [data-model.md](./data-model.md) defines the capability column, the audit enum extension,
the ephemeral queue state and the certification artefact.
[contracts/certification.md](./contracts/certification.md) fixes the artefact shape and its tracker
row, deliberately matching the agent report so both paths produce comparable evidence.
[quickstart.md](./quickstart.md) is the grant-certify-apply walkthrough.

No HTTP API contracts: the feature adds no endpoint. Supabase RLS is the contract, and
`contracts/certification.md` is the file-level one.

## Phase 2 - Task planning approach

`/sp.tasks` should order so the backend is provably safe before any UI exists:

1. **Migration and helper**, with RLS tests written against them directly. A capability that
   suspension does not revoke is the failure that matters, and it is testable with no page.
2. **The grant path** - `users.tsx` toggle plus audit assertions. At this point the capability can
   be held but does nothing.
3. **The review surface** - queue, side-by-side EN/UR for G5, and the three actions.
4. **The export** - certification artefact plus tracker row, following `feedback-queue.tsx`.
5. **The governance record** - `specs/reviewers/human-reviewers.md`, and the owner's own entry, so
   the path is exercised end to end before anyone external holds the capability.

Step 5 is deliberately last and deliberately included: the spec's own objection is that a
capability nobody holds relieves no bottleneck.

## Complexity Tracking

No constitution violations to justify. The one design choice that could have been a violation -
modelling reviewer as a role - is ruled out by Art. V.3 and avoided by R1.
