---
id: 0009
title: Apply analyze remediations
stage: misc
date: 2026-07-17
surface: agent
model: claude-opus-4-8
feature: 001-content-platform
branch: 001-content-platform
user: channayousif@gmail.com
command: /sp.analyze (remediation follow-up)
labels: ["remediation", "consistency", "validator", "bugfix"]
links:
  spec: specs/001-content-platform/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/001-content-platform/tasks.md
 - specs/001-content-platform/spec.md
 - specs/001-content-platform/data-model.md
 - specs/001-content-platform/contracts/unit-frontmatter.schema.json
 - specs/001-content-platform/research.md
tests:
 - none (spec/plan artifacts only)
---

## Prompt

apply all 7 edits

(Following the /sp.analyze report's 7 findings: C1, C2, A1, Con1, I1, N1, T1.)

## Response snapshot

Applied all seven:
- **C1 (MEDIUM)** tasks.md T009 — added the custom `assessment_weighting.summative + formative == 100` cross-field check (ajv can't express it) to the validator scope.
- **C2 (MEDIUM)** tasks.md T012 — folded the SC-001 "<2 seconds" toggle-timing assertion into the US1 read test.
- **A1 (MEDIUM)** contracts/unit-frontmatter.schema.json + data-model.md + spec FR-010 — added optional `assessment_weighting_note` field for per-unit weighting-deviation justification.
- **Con1 (LOW)** spec Assumptions — added a line delegating per-item Bloom's validation (Constitution III.3) to Spec 006; 001 only carries `blooms_summary` + renders `<BloomTag>`.
- **I1 (LOW → actual bug)** verified against specs/gaps.md: EFMP-301 (Educational Psychology) is a **Semester I** course, not Semester 4. Fixed tasks.md T020/T021 path `semester-4` → `semester-1`.
- **N1 (LOW)** tasks.md T037 — added a check that the self-hosted Nastaliq font's first-load weight stays within budget (font counts against first paint though SC-002's text budget excludes images).
- **T1 (LOW)** already fully tracked (spec Clarifications + Open-terminology note + gaps follow-up) — no file edit needed; verified adequacy.
- Also synced research.md metadata-gate summary row to list the weighting-sum check.

Notable: the "verify before editing" step on I1 turned a LOW assumption-flag into a caught correctness bug (wrong semester folder for the golden unit).

## Outcome

- ✅ Impact: All analyze findings resolved; artifacts consistent and a real path bug fixed. Feature 001 is implementation-ready.
- 🧪 Tests: none (spec/plan only); new checks are now testable (weighting-sum fixture belongs under T032/T009).
- 📁 Files: tasks.md, spec.md, data-model.md, contracts/unit-frontmatter.schema.json, research.md.
- 🔁 Next prompts: /sp.implement (Phase 1→2→US1 MVP); optionally /sp.adr for grouped plan decisions.
- 🧠 Reflection: Grounding I1 in specs/gaps.md instead of trusting the earlier task text prevented shipping a mis-placed golden unit.

## Evaluation notes (flywheel)

- Failure modes observed: a hardcoded semester assumption (semester-4) that contradicted the tracked catalog — surfaced only by cross-checking gaps.md.
- Graders run and results (PASS/FAIL): post-edit consistency re-scan = PASS.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): add an explicit weighting-sum validator fixture task under US4 during /sp.implement.
