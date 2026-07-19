---
id: 0017
title: Exempt English-only courses from parity gate
stage: green
date: 2026-07-19
surface: agent
model: claude-sonnet-5
feature: 001-content-platform
branch: 002-authentication
user: channayousif@gmail.com
command: null
labels: ["bilingual", "validator", "urdu-parity", "content-schema"]
links:
  spec: specs/001-content-platform/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/001-content-platform/spec.md
 - specs/001-content-platform/data-model.md
 - contracts/course-overview.schema.json
 - specs/001-content-platform/contracts/course-overview.schema.json
 - scripts/validate-content.mjs
 - docs/semester-1/geng-300/course-overview.mdx
 - catalog/courses.json
 - tests/unit/_helpers.mjs
 - tests/unit/parity.test.mjs
tests:
 - "PASS: npm test — 16/16 (added: 'passes when a reviewed unit has no UR mirror but its course is bilingual: false')"
 - "PASS: node scripts/validate-content.mjs — no regressions on the real docs/ tree"
---

## Prompt

please note that there are some english only courses that do not require urdu translation like Functional english. edit the related artifacts

## Response snapshot

Traced the existing EN<->UR parity gate (`scripts/validate-content.mjs`, T016) — it fires whenever
a unit's `translation_status` is `reviewed`, with no course-level override, matching Constitution
III.2's then-unconditional wording and FR-001's build-enforcement rule. GENG-300 (Functional
English) currently ships as an unauthored `coming_soon` scaffold, so the gate has never actually
fired for it, but authoring it later under the old rule would have wrongly demanded a phantom
Urdu mirror for a course that, by the user's instruction, should never need one.

Added a general `bilingual` boolean to the Course entity (default `true`), sourced from
`course-overview.mdx` and validated by `contracts/course-overview.schema.json`. The validator
gained an `isBilingualCourse()` helper reading that flag per course and threading it into
`checkUnit()`, so the parity gate is skipped entirely for `bilingual: false` courses regardless of
`translation_status`. Flagged GENG-300 accordingly in its `course-overview.mdx` and, for reference
only (this file isn't read by the validator), in `catalog/courses.json`.

Amended spec.md (new Clarifications entry, FR-001, FR-003, Key Entities' Course line) and
data-model.md (Course entity's field table, Unit's per-language "State" list) to document the
exception and its `/ur/` fallback behavior — no "translation not yet available" banner for an
English-only course, since the absence is by design rather than a pending gap.

Proved the mechanism actually works, not just that nothing regressed: extended the shared fixture
helper (`tests/unit/_helpers.mjs`) to optionally write a `course-overview.mdx`, then added a test
that a reviewed unit with `bilingual: false` and no UR mirror at all still passes — a case that
would fail loudly under the old unconditional gate.

## Outcome

- ✅ Impact: English-only courses (starting with GENG-300 Functional English) can now be authored
  and reach `translation_status: reviewed` without the build ever demanding a UR mirror that was
  never meant to exist. The mechanism is general — any future English-only course needs only the
  same `bilingual: false` flag, no code change.
- 🧪 Tests: `npm test` 16/16 (new test added and passing); `node scripts/validate-content.mjs`
  clean against the real `docs/` tree.
- 📁 Files: spec.md, data-model.md, both copies of `course-overview.schema.json`,
  `validate-content.mjs`, GENG-300's `course-overview.mdx`, `catalog/courses.json`, and the
  parity test fixture + a new test case.
- 🔁 Next prompts: none required now; if more English-only courses are identified, they only need
  the same `course-overview.mdx` flag.
- 🧠 Reflection: caught the "would this have actually blocked something later" question before
  committing — GENG-300 being still `coming_soon` meant a docs-only fix would have silently
  passed today's validator run and looked done, while leaving a real trap for whoever authors it
  next. Wrote the fixture test specifically to fail under the old code path and pass under the
  new one, rather than trusting that the real tree's current (accidental) pass was evidence of
  anything.

## Evaluation notes (flywheel)

- Failure modes observed: none in this change; the risk avoided was a *future* false-positive
  gate failure, not a bug found in existing behavior.
- Graders run and results (PASS/FAIL): unit tests 16/16 PASS; validator against real tree PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
