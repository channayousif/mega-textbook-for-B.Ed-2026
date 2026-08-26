---
id: 0004
title: Content pipeline implementation plan
stage: plan
date: 2026-08-24
surface: agent
model: claude-sonnet-5
feature: 006-content-pipeline
branch: 006-content-pipeline
user: channayousif@gmail.com
command: /sp.plan
labels: ["content-pipeline", "plan", "sdd"]
links:
  spec: specs/006-content-pipeline/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/006-content-pipeline/plan.md
 - specs/006-content-pipeline/research.md
 - specs/006-content-pipeline/data-model.md
 - specs/006-content-pipeline/quickstart.md
 - specs/006-content-pipeline/contracts/content-spec-frontmatter.schema.json
 - specs/006-content-pipeline/contracts/style-guide-frontmatter.schema.json
 - specs/006-content-pipeline/contracts/unit-frontmatter.schema.json
 - CLAUDE.md
tests:
 - none (planning stage; no code written)
---

## Prompt

(empty — `/sp.plan` invoked with no arguments, running the standard planning workflow against
the now-fully-clarified `specs/006-content-pipeline/spec.md`)

## Response snapshot

Ran `setup-plan.sh --json` to copy the plan template, then explored the existing codebase before
writing anything, since Spec 006 is unusual: it's a governance/process layer over content Spec
001 already publishes, not a new application feature. Key discoveries that reshaped the plan
versus a naive read of the spec:

- `scripts/check-no-answer-keys.mjs` **already exists** and already implements almost exactly
  what FR-016d (the CI answer-key keyword/pattern scan, added in `/sp.clarify`) called for —
  already wired into `ci.yml` twice (pre- and post-build). Plan reuses/extends it (research.md R5)
  instead of building a new script, adding one pattern (`correct answer`) and one scan target
  (`specs/content`).
- `contracts/course-overview.schema.json`'s own description already says "Spec 006 CP9" — Spec
  001 built the course-overview schema anticipating this feature, and EFMP-301's
  `course-overview.mdx` already carries populated `teaching_strategies`/`assessment_criteria`/
  `resources` front matter. Combined with EFMP-301 Unit 1 already being fully published
  (`translation_status: reviewed`, both locales), this made the golden-unit acceptance work
  retroactive (author `content-spec.md`/`tasks.md` against what's shipped) rather than a
  redraft — confirmed against spec.md's own Assumptions section (research.md R10).
- The existing `validate-content.mjs`/`check-add-course.mjs`/`_helpers.mjs` pattern (whole-tree
  walk, plain Node + `gray-matter`, no new dependency, Vitest fixture tests via a temp-dir
  `CONTENT_ROOT`) gave a ready-made shape for the one genuinely new script this feature needs:
  `scripts/check-pipeline-gate.mjs` (research.md R6), which reads the *new* `specs/content/` tree
  alongside the *existing* `docs/` tree the other scripts already walk.

Wrote `research.md` (R1–R10) turning each `/sp.clarify` policy decision into a concrete technical
design: Unit Spec as a content-spec.md subsection (R1); tasks.md as a parseable Markdown table
with a G0-excluded G1–G7 row set, since G0/course-intake is course-level not per-unit (R2);
content-spec approval as a `status: approved` front-matter field (R3); the terminology check
resolved into something actually automatable — a structured `{en, ur}` pair declared in the
*Urdu* file's own new `key_terms` front-matter field, checked by exact-match against
`terminology.csv`, rather than any prose scanning (R4); the answer-key-scan reuse (R5); the new
script's shape and single-responsibility rationale (R6); a no-new-dependency CSV parser (R7);
`style-guide.md`'s `version` field as the freeze marker for itself and the terminology bank as a
pair (R8); broadening the "quiz staging worksheet" to also cover `answer_keys` content, since
FR-012 already scoped both and there was nowhere else for formative/summative answer content to
stage (R9, a plan-level generalization, not a new scope decision); and the golden-unit retroactive
framing (R10).

Wrote `data-model.md` (file-based entities only, no DB — Course Content-Spec, Task Tracker,
Terminology Bank, Style Guide, Revision Task as a Task Tracker row variant, the new Key-Terms
Declaration front-matter extension, Assets Staging Worksheet) and `quickstart.md` (7 numbered
steps: seed shared docs → extend contracts → build the new script → gitignore staging → prove on
the golden unit → wire CI → prove the suggestion feedback loop end-to-end, plus a verification
checklist).

Wrote three contract files under `specs/006-content-pipeline/contracts/`: two new
(`content-spec-frontmatter.schema.json`, `style-guide-frontmatter.schema.json`) and one edited
copy of the existing repo-root `unit-frontmatter.schema.json` with the new optional `key_terms`
field added (following this repo's established pattern where `specs/<feature>/contracts/` holds
the Phase-1 planning proposal, later applied to the live repo-root `contracts/` during
implementation — confirmed by diffing Spec 001's frozen `specs/001-content-platform/contracts/`
copy against the repo-root's since-evolved version).

Wrote `plan.md`: Technical Context notes **no new dependency and no database** — the entire
feature is Markdown/CSV files plus two Node CLI scripts; Constitution Check table maps every
relevant article (II, III.5/6/7, IV, V.1/2/4, VI.1, VII) to a concrete design choice, all ✅, zero
Complexity Tracking entries. Ran `update-agent-context.sh claude`, then manually cleaned up two
tech-stack lines in `CLAUDE.md`'s "Active Technologies" section that the script had truncated
mid-sentence (a known script quirk when a Technical Context line runs long).

## Outcome

- ✅ Impact: Produced a complete Phase 0/1 plan for Spec 006 that reuses far more existing
  infrastructure than it adds — one new script, one extended script, two new + one edited contract
  file, zero new dependencies, zero new database tables — grounded in concrete discoveries (the
  answer-key scanner already exists; the golden unit already exists; the course-overview schema
  was already built anticipating this spec) rather than assumptions from the spec text alone.
- 🧪 Tests: none — planning stage; `tests/unit/pipeline-gate.test.mjs` is planned (quickstart.md,
  Project Structure) but not yet written.
- 📁 Files: `specs/006-content-pipeline/plan.md`, `research.md`, `data-model.md`, `quickstart.md`,
  `contracts/content-spec-frontmatter.schema.json`, `contracts/style-guide-frontmatter.schema.json`,
  `contracts/unit-frontmatter.schema.json` (all new); `CLAUDE.md` (agent-context update, cleaned up
  post-script).
- 🔁 Next prompts: `/sp.tasks` for Spec 006.
- 🧠 Reflection: Reading the actual repo state before planning (not just the spec) surfaced three
  load-bearing facts a spec-only read would have missed — an already-implemented answer-key
  scanner, a course-overview schema already built for this exact spec, and an already-published
  golden unit — each of which meaningfully shrank the plan's scope versus what the spec's FR list
  alone would suggest.

## Evaluation notes (flywheel)

- Failure modes observed: `update-agent-context.sh` truncated two "Active Technologies" lines
  mid-sentence (a pre-existing script quirk, not new to this session) — caught by re-reading
  `CLAUDE.md` after the script ran and manually rewriting both lines to complete sentences,
  consistent with the file's other entries.
- Graders run and results (PASS/FAIL): Constitution Check — PASS (no violations, empty Complexity
  Tracking table); placeholder scan on `plan.md` (`[FEATURE]`, `[DATE]`, `NEEDS CLARIFICATION`,
  `ACTION REQUIRED`) — PASS, none found.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
