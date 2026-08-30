---
id: 0005
title: Analyze 008 findings and remediation
stage: misc
date: 2026-08-27
surface: agent
model: claude-sonnet-5
feature: 008-rich-unit-pedagogy
branch: 008-rich-unit-pedagogy
user: channayousif
command: /sp.analyze (+ approved remediation)
labels: ["analyze", "cross-artifact", "constitution-v2.6.0", "remediation", "spec-008"]
links:
  spec: specs/008-rich-unit-pedagogy/spec.md
  ticket: null
  adr: history/adr/0011-nested-per-topic-unit-pedagogy-bounded-answer-keys-and-figure-markers.md
  pr: null
files:
 - .specify/memory/constitution.md
 - specs/008-rich-unit-pedagogy/spec.md
 - specs/008-rich-unit-pedagogy/plan.md
 - specs/008-rich-unit-pedagogy/data-model.md
 - specs/008-rich-unit-pedagogy/tasks.md
 - specs/008-rich-unit-pedagogy/contracts/topic-cycle.md
 - specs/008-rich-unit-pedagogy/contracts/end-of-unit-assessment.md
 - specs/008-rich-unit-pedagogy/contracts/end-of-course-review.md
 - specs/008-rich-unit-pedagogy/contracts/coverage-matrix-v2.md
tests:
 - none (analysis + doc remediation)
---

## Prompt

> /sp.analyze  (read-only cross-artifact consistency analysis)
>
> then: "fix all as recommended
> X1: update constitution
> C1: add a small task to T055/Polish: 'dry-run the rewritten skill against one un-started EFMP-302
> topic and confirm no structure questions arise'"

## Response snapshot

**Analysis** (spec.md 29 FR / 10 SC / 5 stories · plan.md · tasks.md 61 → 62 tasks · 7 contracts):
0 blocking issues. 1 CRITICAL-by-rule (X1 — Art. V.2 answer-key conflict, already remediated in-plan
via T004), 0 HIGH, 5 MEDIUM, 6 LOW. 100% FR→task coverage; SC-009 was the one uncovered success
criterion.

**Remediations applied (owner-approved, all as recommended):**

- **X1 — Constitution v2.5.0 → v2.6.0 (MINOR), performed now.** Prepended a `SYNC IMPACT REPORT
  (v2.6.0)` block; edited Art. III.1 (structure ≠ register reaffirmation), Art. III.3 (per-topic
  cycle + unit-end 10/10/5 bank; Analyze+ at both levels), Art. III.6 (per-topic layout as an
  alternative carrier; FR-004 superseded *in part*), **Art. V.2** (the bounded
  `## Answers and marking guidance` carve-out vs. the RLS-protected Spec 003 LMS store; front-matter
  key ban + everywhere-else scan retained), Art. VI.1 (v3.0 standard-versioning re-run recorded),
  Art. VII (Engineering-gate row gains figure-marker↔manifest consistency). Footer → `Version: 2.6.0`.
  tasks T004 marked **✅ done**; plan.md Constitution Check + spec.md Dependencies annotated
  "amendment applied".
- **U1** — `contracts/end-of-unit-assessment.md` + T020 + T013: the 10/10/5 (and per-topic ≥3)
  counters are **scoped per `###`/`##` section**, not file-wide; numbered lines under
  `## Answers and marking guidance` don't count.
- **U2** — `contracts/coverage-matrix-v2.md` + `data-model.md` §11 + T020 + T013: the
  coverage-`File` vs `### Topic list` assignment mismatch is a **hard failure** (no non-failing
  "finding" — the gates are binary); every checklist ID needs ≥1 coverage row on its assigned
  `topic-NN.mdx`.
- **T1** — plan.md "new-layout" → "new-shape" (sole occurrence; whole 008 tree now consistent).
- **U3** — `contracts/end-of-course-review.md`: the phantom "light structural check" reworded to
  "human Content gate only; validator checks front matter only" (aligns with T021).
- **C1** — new **T062** (Phase 8, [P], any time after T037+T027): dry-run the rewritten skill's
  Steps 1–3 against one EFMP-302 Unit 1 topic from only the content-spec + `topic-cycle.md`, confirm
  zero structure questions → SC-009 met; tighten T005/T032 if not.
- **M1** — T004 tagged `[FR-011, FR-024]`.
- **M2** — T024/T045 tagged `[FR-019, research D6]`; T061 tagged `[FR-029, …]`.
- **A1** — T021's "T016 of Spec 001" collision removed ("the Spec 001 heading-vector parity gate").
- **D1** — T032 note: land with/immediately after T031 (until then `structure-standard.md` holds
  old v2.0 content).
- **P1** — `contracts/topic-cycle.md`: added that the EN↔UR parity gate compares heading
  *structure*, not literal text, so a translated `## Activity: <name>` is fine.

Post-remediation verification: constitution `Version: 2.6.0`; tasks T001–T062 contiguous, no
gaps/dupes, 1 done; all 29 FR + all 10 SC referenced in tasks; no "new-layout" residue; no
unresolved placeholders.

## Outcome

- ✅ Impact: `008` is analysis-clean and implementation-ready; the constitution amendment (the only
  CRITICAL) is landed, so `/sp.implement` starts at T005.
- 🧪 Tests: none (docs + governance only).
- 📁 Files: constitution (v2.6.0), spec.md, plan.md, data-model.md, tasks.md (+T062, T004 done),
  4 contracts.
- 🔁 Next prompts: `/sp.implement` (T005 → …), or commit the planning + governance set first.
- 🧠 Reflection: doing X1 now (rather than as the first `/sp.implement` task) removes the
  merge-freeze ambiguity and lets the rest of Phase 2 proceed in parallel immediately.

## Evaluation notes (flywheel)

- Failure modes observed: none.
- Graders run and results (PASS/FAIL): FR/SC coverage — PASS (29/29 FR, 10/10 SC); constitution
  Art. XI procedure — PASS (written rationale + sync block + version bump + downstream review);
  task-ID integrity — PASS (T001–T062 contiguous).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): during `/sp.implement`, run `npm test` after each of
  T020/T021/T022 individually so a legacy regression is caught at its cause, not at the T024
  checkpoint.
