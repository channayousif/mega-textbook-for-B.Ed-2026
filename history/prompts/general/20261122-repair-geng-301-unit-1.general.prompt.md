---
id: 20261122
title: Repair GENG-301 Unit 1 English review findings
stage: general
date: 2026-11-03
surface: agent
model: Codex GPT-6 family (exact deployed version unavailable)
feature: none
branch: crew/geng-301-u01-repair_en-r1
user: crew
command: Read .crew/brief.md and carry it out
labels: ["codex", "geng-301", "repair_en"]
links:
  spec: specs/content/geng-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-2/geng-301/unit-01/
  - specs/content/geng-301/
  - static/img/figures/geng-301/unit-01/
tests:
  - npm run check:content (branch and origin/main baseline)
  - scripts/heavy.sh npm test
  - FIGURE_ROOT=static/img/figures/geng-301/unit-01 node scripts/build-figure-variants.mjs --check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Repaired six-type coverage, assessment alignment, source disclosures and paragraph teaching. G3 remains open; evidence limitations recorded. Commit locally without push or PR.

## Outcome

- ✅ Impact: Bounded English author repairs address F1-F4 and F8.
- 🧪 Tests: All 14 content gates pass on the repaired branch and origin/main after generating ignored content status. All 368 tests in 31 files passed. Scoped figure dark variants pass freshness checks.
- 📁 Files: Unit 1 prose, assessment, coverage, concepts, sources, figure manifest, two figures and dark variants, tracker and repair handoff.
- 🔁 Next prompts: Owner resolves source mapping and review evidence gaps.
- 🧠 Reflection: Source code inspection cannot substitute for prohibited browser geometry checks.

## Handoff (for CEO and agents)

- Shipped / changed: Unit 1 English repairs and dated retrieval evidence.
- Decisions the team must respect: Approved spec preserved; no certification or new review cycle.
- Pending / next owner: Owner: source mapping, rendering/geometry evidence, provenance and fresh blind assessment review.
- Paperclip issues affected: No ticket supplied; GENG-301 Unit 1 G3 remains open.

## Evaluation notes (flywheel)

- Failure modes observed: Content edits stale G2 manifests; refresh only after committing bound inputs.
- Graders run and results (PASS/FAIL): PASS: check:content (14/14), npm test (368/368), scoped figures:variants --check, git diff --check. Browser geometry and print were prohibited, not passed.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Independent review with an authenticated frozen bundle and render evidence when authorised.

## Final validation addendum

The first content run found stale G2 inputs and a figure font-stack issue. The repaired run also
caught declaration-scope formatting, which was fixed and rechecked. The final branch and isolated
origin/main baseline both pass all 14 content gates after build:content-status generates the ignored
status artifact. No site build or browser was run. The G2 record generated at 20261103T183724789Z
binds author commit 82b1502a8; its eight draft checks passed. Unit 1's existing G2 row now points to
that record. G3 remains in progress. All work is local; no push or pull request.
