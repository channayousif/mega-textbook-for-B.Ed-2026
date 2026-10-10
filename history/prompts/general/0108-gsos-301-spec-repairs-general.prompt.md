---
id: 0108
title: GSOS-301 content-spec repairs
stage: green
date: 2026-10-10
surface: agent
model: LongCat-2.0
feature: gsos-301-authoring
branch: agent/TEX-43
user: curriculum-owner
command: /paperclip/assign
labels: ["BilingualAuthor", "gsos-301", "repairs", "content-spec"]
links:
  spec: null
  ticket: TEX-43
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/123
files:
  - specs/content/gsos-301/content-spec.md
  - specs/content/gsos-301/coverage/unit-01.md
  - specs/content/gsos-301/coverage/unit-02.md
  - specs/content/gsos-301/figures/unit-01.md
  - specs/content/gsos-301/figures/unit-02.md
  - specs/content/gsos-301/sources/unit-01.md
  - specs/content/gsos-301/sources/unit-02.md
  - specs/content/gsos-301/tasks.md
tests:
  - npm run check:content (10 of 13 gates PASS; pipeline gate and figures expected failures)
---

## Prompt

TEX-43 recovery: Board intake (D-2026-0051) and owner rulings (D-2026-0053) require content-spec repairs. Fix Units 3-6 format, week schedule, readings, open_access_floor, figure plans, tasks.md G1 claims, and coverage/source consistency.

## Response snapshot

Rewrote content-spec.md with all required repairs. Updated coverage matrices, source files, and figure manifests to match. Committed and pushed. Task set to in_review with pending confirmation interaction for board re-run of intake.

## Outcome

- Impact: Content-spec repairs complete. Ready for board re-run of intake.
- Tests: 10 of 13 gates PASS. Pipeline gate (unapproved spec) and figures (prompt-only) expected.
- Files: 8 files changed (177 insertions, 142 deletions).
- Next prompts: Board re-runs intake; on approval, spec moves to status: approved and authoring of Units 3-6 continues.

## Handoff (for CEO and agents)

- Shipped / changed: Content-spec repairs applied to all 6 units. Units 3-6 now in U<n>-seq format. Week schedule follows guide. Readings corrected and labelled author-selected. open_access_floor: 1 set.
- Decisions the team must respect: Do not author Units 3-6 until the spec is approved. Do not edit status: in content-spec.md.
- Pending / next owner: Board re-runs intake on fresh manifest. On approval, BilingualAuthor continues authoring Units 3-6.
- Paperclip issues affected: TEX-43.

## Evaluation notes (flywheel)

- Failure modes observed: None in this run.
- Graders run and results (PASS/FAIL): 10 PASS, 2 expected FAIL.
