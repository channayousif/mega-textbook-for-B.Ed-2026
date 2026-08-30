---
id: 0002
title: Plan 008 rich unit pedagogy
stage: plan
date: 2026-08-27
surface: agent
model: claude-sonnet-5
feature: 008-rich-unit-pedagogy
branch: 008-rich-unit-pedagogy
user: channayousif
command: /sp.plan
labels: ["content-standard", "unit-structure", "gates", "constitution-amendment", "adr-suggested", "spec-007-successor"]
links:
  spec: specs/008-rich-unit-pedagogy/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/008-rich-unit-pedagogy/plan.md
 - specs/008-rich-unit-pedagogy/research.md
 - specs/008-rich-unit-pedagogy/data-model.md
 - specs/008-rich-unit-pedagogy/quickstart.md
 - specs/008-rich-unit-pedagogy/contracts/content-spec-v3.md
 - specs/008-rich-unit-pedagogy/contracts/coverage-matrix-v2.md
 - specs/008-rich-unit-pedagogy/contracts/topic-cycle.md
 - specs/008-rich-unit-pedagogy/contracts/end-of-unit-assessment.md
 - specs/008-rich-unit-pedagogy/contracts/end-of-course-review.md
 - specs/008-rich-unit-pedagogy/contracts/figures-manifest.md
 - specs/008-rich-unit-pedagogy/contracts/course-review.schema.json
 - CLAUDE.md
tests:
 - none (plan stage)
---

## Prompt

> Plan feature 008-rich-unit-pedagogy. The full technical design is already approved and captured in
> /home/a2ahs/.claude/plans/1-restructure-the-unit-jazzy-river.md — treat it as the authoritative
> design input alongside specs/008-rich-unit-pedagogy/spec.md. Formalise it into plan.md, research.md,
> data-model.md, contracts/ (content-spec-v3.md, coverage-matrix-v2.md, topic-cycle.md,
> end-of-unit-assessment.md, end-of-course-review.md, figures-manifest.md, plus the
> course-review.schema.json shape), and quickstart.md. Model the ceremony on
> specs/007-content-depth-standard/. Run the Constitution Check against v2.5.0 and flag that FR-024
> requires a v2.6.0 amendment (Articles III.1/III.3/III.6, V.2 carve-out, VI.1 standard-versioning
> re-run, VII figure-gate row). Surface the ADR suggestion for the decision cluster (nested per-topic
> cycle over flat 5-file; in-book bounded answer sections vs the RLS quiz bank; comment-marker +
> manifest + gate for figures; opt-in via topic-list + topic-*.mdx; proving unit = EFMP-302 U1).

## Response snapshot

Ran `.specify/scripts/bash/setup-plan.sh` and wrote the full Phase 0 + Phase 1 artefact set for
`008-rich-unit-pedagogy`, modelled on Spec 007:

- **plan.md** — Summary; Technical Context (plain Node 22, `gray-matter` + `ajv` existing, no new
  dependency, filesystem/Git only, Vitest, one new CI step); **Constitution Check vs v2.5.0** →
  PASS *with a required v2.6.0 MINOR amendment* (III.1 reaffirm, III.3 assessment, III.6 file-type
  rule, **V.2 answer-key carve-out**, VI.1 standard-versioning re-run, VII figure-gate row) and one
  Complexity Tracking entry (the V.2 carve-out, with the rejected alternatives). Project Structure
  tree covering every edited/new file. Phase 0 headline R1–R13. Phase 1 design for the new gate +
  the three gate rewrites + the skill. Post-design re-check PASS. Risks (EFMP-301 v3.0 re-proof
  obligation; reading-minutes explosion; the loosened answer-key gate).
- **research.md** — R1–R13 as Decision / Rationale / Alternatives (opt-in predicate; `topic-NN.mdx`
  naming; nine-part headings; `unit-assessment.mdx`; course-level `course-review.mdx` +
  `sidebar_position: 900`; the bounded answer-key exception; figure marker grammar + manifest;
  reading-minutes re-baseline; coverage v2; `course-review.schema.json`; one-skill packaging;
  search index) + a D1–D6 cross-cutting decisions table.
- **data-model.md** — 15 file-based entities (unit-opening, topic file + `topic_no`/`topic_label`,
  end-of-unit matter, optional teacher-notes, course-review, topic list, extended checklist,
  re-baselined depth budget, figure marker, figure manifest, coverage v2, answers section, structure
  standard, skill) + state transitions (legacy→new-shape irreversible; half-migration blocked;
  reviewed-unit re-restructure handoff).
- **contracts/** — 6 Markdown format contracts (`topic-cycle.md` with the nine canonical headings +
  match regexes + annotated example; `end-of-unit-assessment.md` with the 10/10/5 + bounded-block
  rule; `end-of-course-review.md`; `figures-manifest.md` with the marker regex + gate table;
  `coverage-matrix-v2.md`; `content-spec-v3.md` with the `### Topic list`) + `course-review.schema.json`
  (new JSON Schema, answer-key key ban retained, the sanctioned `sidebar_position`).
- **quickstart.md** — 11 numbered steps in dependency order (amend constitution → draft v3.0
  style-guide sections → contracts → FR-004 note → gates + red-first tests → skill rewrite →
  EFMP-302 content-spec v3 → proving-unit draft → gate green → Urdu handoff → human Content gate →
  freeze/docs/records) + an end-to-end verification block.
- Ran `update-agent-context.sh claude`; tidied the two auto-added CLAUDE.md lines into one clean
  entry pair matching the 006/007 style.

**ADR suggestion surfaced** in plan.md (Constitution Check section): the five-decision cluster —
`/sp.adr nested-per-topic-unit-pedagogy`.

## Outcome

- ✅ Impact: Phase 0 + Phase 1 complete; `008` ready for `/sp.adr` (recommended first) then `/sp.tasks`.
- 🧪 Tests: none (plan stage).
- 📁 Files: plan.md, research.md, data-model.md, quickstart.md, 7 contracts (new); CLAUDE.md (edited).
- 🔁 Next prompts: `/sp.adr nested-per-topic-unit-pedagogy` (the decision cluster), then `/sp.tasks`
  to decompose the 12-phase quickstart into a dependency-ordered `tasks.md`.
- 🧠 Reflection: the constitution amendment (v2.6.0) is the first blocking task; the V.2 carve-out
  is the one genuine complexity entry and the strongest ADR driver.

## Evaluation notes (flywheel)

- Failure modes observed: `update-agent-context.sh` grabbed multi-line fragments from the plan's
  Technical Context (cosmetic; hand-corrected).
- Graders run and results (PASS/FAIL): Constitution Check — PASS with required amendment; spec
  quality checklist — unchanged, still PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): in `/sp.tasks`, front-load a "legacy regression floor
  green" task right after each gate rewrite so SC-007 is proven continuously, not just at the end.
