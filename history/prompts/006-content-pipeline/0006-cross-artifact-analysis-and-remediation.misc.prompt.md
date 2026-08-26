---
id: 0006
title: Cross-artifact analysis and remediation
stage: misc
date: 2026-08-25
surface: agent
model: claude-sonnet-5
feature: 006-content-pipeline
branch: 006-content-pipeline
user: channayousif@gmail.com
command: /sp.analyze
labels: ["content-pipeline", "analyze", "remediation", "sdd"]
links:
  spec: specs/006-content-pipeline/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/006-content-pipeline/spec.md
 - specs/006-content-pipeline/plan.md
 - specs/006-content-pipeline/research.md
 - specs/006-content-pipeline/tasks.md
tests:
 - none (analysis/remediation stage; no code written)
---

## Prompt

Turn 1 (`/sp.analyze`, no arguments): run the standard read-only cross-artifact consistency
analysis across `spec.md`/`plan.md`/`tasks.md` (plus `research.md`/`data-model.md`) against the
constitution, per the command's own outline (duplication/ambiguity/underspecification/
constitution-alignment/coverage-gap/inconsistency detection passes, severity-ranked findings
table, coverage summary, remediation offer — no file writes).

Turn 2 (verbatim): "suggest concrete remediation edits for all"

Turn 3 (verbatim): "go on"

## Response snapshot

Ran `check-prerequisites.sh --json --require-tasks --include-tasks`, re-read the constitution in
full (v2.4.0, 11 articles), and cross-checked spec.md's 18 FRs / 9 key entities / 7 SCs against
plan.md's 10-row Constitution Check table, research.md's R1–R10 decisions, and tasks.md's 35
tasks. Confirmed via `ls README.md` that the repo-root README the constitution's own v2.4.0 SYNC
IMPACT REPORT flagged as a still-open TODO does not yet exist.

Found 4 findings (1 CRITICAL, 1 HIGH, 2 MEDIUM), reported as a findings table + coverage summary
+ metrics, read-only, per the command's contract:

- **C1 (CRITICAL)**: Constitution Article X ("Documentation for Multiple Audiences," explicitly
  non-negotiable) — the Docs gate requires a spec changing contributor-facing setup/process to
  update `README.md` in the same branch. Spec 006 adds a new mandatory CI step
  (`check:pipeline-gate`) and a new content-authoring workflow, but `plan.md`'s Constitution Check
  table never evaluated Article X at all (not marked N/A, simply absent), and no task touched
  `README.md`.
- **U1 (HIGH)**: FR-016a's "the target stage" wording reads as generically PR-scoped, but
  research.md R6 / tasks T016/T021 hardcode a fixed EN(`G2`/`G3`)/UR(`G4`/`G5`) check applied to
  every unit unconditionally — `G1`/`G6`/`G7` are never automated-checked, and this narrowing
  wasn't stated in either the FR text or research.md's own rationale.
- **I1 (MEDIUM)**: FR-018 and spec.md's Key Entities scope the staging artifact to "quiz staging
  worksheet" (quiz-bank content only), but research.md R9 and data-model.md already broadened it
  to also cover formative/summative answer-key content and renamed it "Assets Staging Worksheet"
  — a real naming/scope drift between the spec's own text and its design artifacts.
- **G1 (MEDIUM)**: no task produces a concrete example Assets Staging Worksheet instance to prove
  FR-018's format actually works — only the `.gitignore` rule and an empty directory exist.

After the user approved ("suggest concrete remediation edits for all" → "go on"), drafted then
applied 6 edits across 4 files:

1. `plan.md` — added an `X.2` row to the Constitution Check table, resolving C1 by pointing at a
   new task (T036).
2. `spec.md` — reworded FR-016 clause (a) to explicitly name the `G2`/`G3`(/`G4`/`G5`) scope and
   state that `G1`/`G6`/`G7` are handled elsewhere/not re-checked, resolving U1.
3. `research.md` — added a "Scope note" to R6 explaining *why* `G1`/`G6`/`G7` are excluded (G1
   redundant with the approval check; G7 would be circular with the merge event itself; G6 has no
   committed artifact to inspect), resolving U1's missing rationale.
4. `spec.md` — reworded FR-018 to cover both quiz items and answer-key content, and renamed the
   Key Entities bullet from "Quiz Staging Worksheet" to "Assets Staging Worksheet" (with a
   parenthetical noting the rename traces to research.md R9), resolving I1.
5. `tasks.md` — added T036 (create/update `README.md` with a contributor-facing pipeline section,
   resolving C1's task-coverage half) and T037 (author one example Assets Staging Worksheet
   instance to prove FR-018's format, resolving G1) to the Polish phase.

## Outcome

- ✅ Impact: Closed all 4 findings from the read-only analysis pass — one constitutional gate
  (Article X) that had gone completely unevaluated in planning is now addressed with a concrete
  task; one spec/implementation semantic gap (FR-016a's stage scope) is now explicit in both the
  requirement text and the research rationale; one naming/scope drift (staging worksheet) is now
  consistent across spec.md and its design artifacts; one unproven requirement (FR-018's format)
  now has a task producing a concrete instance.
- 🧪 Tests: none — spec/plan/research/tasks text edits only, no code.
- 📁 Files: `specs/006-content-pipeline/spec.md` (FR-016, FR-018, Key Entities), `plan.md`
  (Constitution Check table), `research.md` (R6 scope note), `tasks.md` (T036, T037 added — total
  now 37 tasks).
- 🔁 Next prompts: `/sp.implement` for Spec 006 (tasks.md is now consistency-checked against spec/
  plan/constitution).
- 🧠 Reflection: The most valuable finding (C1) came from checking an artifact the command
  doesn't explicitly enumerate in its own "Load Artifacts" step (the constitution's Article X)
  against what the plan's own Constitution Check table *omitted* rather than got wrong — a
  completely absent row is a different (and easier-to-miss) failure mode than a present-but-wrong
  one, worth deliberately checking for in future `/sp.analyze` passes on any feature touching
  contributor/user-facing process.

## Evaluation notes (flywheel)

- Failure modes observed: none this session — the read-only analysis correctly withheld edits
  until explicit user approval ("suggest concrete remediation edits for all" was treated as
  "draft, don't apply yet," matching the command's constraint; "go on" was the actual apply
  trigger).
- Graders run and results (PASS/FAIL): re-scan for unresolved placeholders across all 4 edited
  files post-edit — PASS, none found; each proposed diff's `old_string` was verified against the
  file's actual current content (read earlier this session) before editing — PASS, all 6 edits
  applied without a "string not found" error.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
