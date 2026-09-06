---
id: 0007
title: Confirm ADRs already cover grouped decisions
stage: misc
date: 2026-09-05
surface: agent
model: claude-sonnet-5
feature: 010-curriculum-owner-console
branch: 010-curriculum-owner-console
user: M Yousif Channa
command: /sp.adr (via /sp.implement T045)
labels: ["adr", "curriculum-owner-console", "implementation"]
links:
  spec: specs/010-curriculum-owner-console/spec.md
  ticket: null
  adr: history/adr/0013-reader-feedback-dedicated-table-and-in-house-passage-capture.md, history/adr/0015-curriculum-owner-catalog-edits-download-and-commit-flow.md
  pr: null
files:
 - (none - no new files; this run only verified existing ADRs)
tests:
 - (none - documentation-only verification)
---

## Prompt

Curriculum-owner console and the content-improvement loop: grouped decision cluster from
specs/010-curriculum-owner-console/plan.md - (1) content_feedback as a distinct table from
activity_feedback/improvement_suggestions, (2) best-effort in-house passage capture/re-location
via window.getSelection() rather than an annotation library, (3) the catalog-edit mechanism as a
download-a-patched-courses.json flow rather than a live-database write. Group these as one ADR per
plan.md's own recommendation.

(Issued as the final step of `/sp.implement`'s T045: "`/sp.adr` for the grouped decision cluster
spec.md names," after the user was asked for consent and chose to run it now.)

## Response snapshot

Ran Step 1-3 of the `/sp.adr` workflow (load plan.md, extract decision clusters, scan
`history/adr/`) and found all three requested decisions were **already documented** from an
earlier planning-stage `/sp.adr` run (PHR 0006, before this implementation session began):

- **ADR-0013** (`reader-feedback-dedicated-table-and-in-house-passage-capture.md`, Accepted,
  2026-09-05) covers items (1) and (2) exactly: `content_feedback` as a dedicated table
  distinct from `activity_feedback`/`improvement_suggestions`, with server-stamped identity/
  forced initial status, `window.getSelection()`-based passage capture with no annotation
  library, and the five-page-kind reach rule - as one integrated four-part decision, with
  alternatives (shared polymorphic table, extending `improvement_suggestions`, a real
  annotation library, a generic reach rule) and consequences for each.
- **ADR-0015** (`curriculum-owner-catalog-edits-download-and-commit-flow.md`, Accepted,
  2026-09-05) covers item (3) exactly: the build-time static copy + owner-edits-a-form +
  download-a-patched-`courses.json` flow, never a live database write, with alternatives
  (a live database write with Git sync, a GitHub API PR-creation flow) and consequences.
- (Adjacent but not requested this run: **ADR-0014** covers the self-assessment
  checklist's position-keyed DOM-hydration mechanism - plan.md's fourth, "lighter"
  decision candidate.)

No new ADR was created - creating a fourth document restating the same decisions would be
redundant, not a genuine new architectural record. No conflicts were found between these ADRs
and the final implementation (all 46 tasks in `tasks.md` are now complete and consistent with
what ADR-0013/0015 describe: `supabase/migrations/0032-0035` match ADR-0013's schema/trigger
description; `admin/overview.tsx`'s catalog-edit form and `scripts/build-content-index.mjs`'s
static copy match ADR-0015's flow).

## Outcome

- ✅ Impact: Confirmed (not created) - the grouped architectural decision is already a permanent,
  reviewable record; no drift between the ADRs and the shipped implementation.
- 🧪 Tests: N/A (documentation verification only).
- 📁 Files: None changed by this step; this PHR is the only new file.
- 🔁 Next prompts: None required - this was the final task (T045) of `/sp.implement` for Spec 010.
- 🧠 Reflection: The three ADRs existed from a prior session's planning-stage `/sp.adr` run,
  present as uncommitted files at the start of this implementation session - worth checking
  `history/adr/` for existing coverage before assuming a task like T045 requires new authoring.

## Evaluation notes (flywheel)

- Failure modes observed: none - the check-existing-ADRs step (Step 3 of the `/sp.adr` skill)
  worked exactly as designed, preventing a duplicate ADR.
- Graders run and results (PASS/FAIL): Significance/clustering checklist - PASS for both
  ADR-0013 and ADR-0015 (already recorded in their own significance-checklist comments).
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
