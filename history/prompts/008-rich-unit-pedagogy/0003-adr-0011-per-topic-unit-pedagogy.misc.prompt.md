---
id: 0003
title: ADR 0011 per-topic unit pedagogy
stage: misc
date: 2026-08-27
surface: agent
model: claude-sonnet-5
feature: 008-rich-unit-pedagogy
branch: 008-rich-unit-pedagogy
user: channayousif
command: /sp.adr
labels: ["adr", "content-architecture", "answer-key-policy", "figures", "constitution-v2.6.0", "spec-008"]
links:
  spec: specs/008-rich-unit-pedagogy/spec.md
  ticket: null
  adr: history/adr/0011-nested-per-topic-unit-pedagogy-bounded-answer-keys-and-figure-markers.md
  pr: null
files:
 - history/adr/0011-nested-per-topic-unit-pedagogy-bounded-answer-keys-and-figure-markers.md
 - specs/008-rich-unit-pedagogy/plan.md
 - specs/008-rich-unit-pedagogy/spec.md
tests:
 - none (ADR stage)
---

## Prompt

> ok do adr
>
> nested-per-topic-unit-pedagogy — Document the Spec 008 decision cluster: (1) a nested per-topic
> learning cycle as an opt-in alternative to the flat five-file unit; (2) permitting bounded
> self-study answer keys / rubrics in published content (Constitution Art. V.2 carve-out) drawing a
> governance line against the RLS-protected LMS quiz/answer-key store (Spec 003); (3) comment-marker
> + committed manifest + CI gate for teaching figures, with nothing rendered in this feature;
> (4) the opt-in predicate — `### Topic list` in the content-spec AND `topic-*.mdx` on disk — with
> loud depth-gate failure when the two signals disagree; (5) EFMP-302 Unit 1 as the v3.0 proving
> unit, EFMP-301 Unit 1 golden-unit re-proof as the tracked next content task. Sources:
> specs/008-rich-unit-pedagogy/plan.md (Constitution Check + Complexity Tracking), research.md
> (R1, R6, R7, R8, D1–D6), spec.md (FR-008–014, FR-018, FR-024–025, FR-029). Constitution amendment
> required: v2.5.0 → v2.6.0 (MINOR).

## Response snapshot

Ran `.specify/scripts/bash/check-prerequisites.sh`; scanned `history/adr/` (0001–0010 present, none
covering this cluster). Applied the clustering + significance tests: the five decisions ship
together, are co-motivated, and would be revised together → **one ADR** (matching ADR-0010's
one-ADR-per-content-standard precedent); rejected splitting into three (the answer-key carve-out
only exists because of the end-of-unit assessment file, which only exists because of the structure).
All three significance tests PASS.

Created **ADR-0011 — "Nested Per-Topic Unit Pedagogy, Bounded Answer Keys, and Figure Markers"**
(`history/adr/0011-…md`), Status **Accepted**, Date 2026-08-27, Feature 008-rich-unit-pedagogy.
Sections:

- **Decision** — the five components, each with its own subsection: (1) the opt-in nested per-topic
  shape (`index` + `topic-NN` + `unit-assessment` + optional `unit-teacher-notes`; `course-review`
  with the sole sanctioned `sidebar_position`; legacy layout frozen not deprecated; FR-004
  superseded in part; proving unit = EFMP-302 U1); (2) the Art. V.2 answer-key carve-out with its
  five guards and the explicit LMS/textbook line; (3) figure comment-marker + manifest + gate,
  nothing rendered, alt-text mandatory; (4) the two-signal opt-in predicate with loud failure on
  disagreement; (5) the golden-unit re-proof obligation + the "prose note now, tracker rows later"
  handling.
- **Consequences** — 7 positive (teaching-shaped reader experience; mechanically enforceable
  structure; zero disruption to legacy content; the answer-key line now explicit; figures queued
  without a rendering commitment; finer traceability; easier per-file EN↔UR parity) and 7 negative
  (reading-minutes balloon ~2–3×; a safety gate deliberately loosened; sidebar depth; bilingual
  debt; four gate scripts rewritten; large proving-unit diff; the unavoidable EFMP-301 re-proof
  obligation).
- **Alternatives Considered** — A keep-5-files-nest-in-index; B answers out-of-book; C answers only
  in teacher-notes; D a `<TeachingImage>` component; E a single opt-in signal; F lightweight branch;
  G split into multiple ADRs — each with why-rejected.
- **References** — spec/plan/research/data-model/contracts + Related ADRs 0010 (extended), 0005
  (the `verified_teacher` line), 0004 (content-integrity build-gate lineage) + the constitution
  amendment + the plan PHR as evaluator evidence.

Updated `plan.md` (ADR-suggestion block → "decision recorded" with the link; Project Structure tree
`00NN` → `0011`) and `spec.md` (added an `**ADR**:` header line).

## Outcome

- ✅ Impact: ADR-0011 Accepted; the Spec 008 decision cluster is now a permanent reviewable record;
  plan.md + spec.md link to it.
- 🧪 Tests: none (ADR stage).
- 📁 Files: `history/adr/0011-…md` (new); `plan.md`, `spec.md` (edited).
- 🔁 Next prompts: `/sp.tasks` — decompose the quickstart's 12 phases into a dependency-ordered
  `tasks.md`, with the constitution v2.6.0 amendment as the first blocking task.
- 🧠 Reflection: kept it one ADR because the answer-key carve-out and the figure gate are both
  *dependent on* the structure decision — separating them would create a cross-reference tangle for
  no gain.

## Evaluation notes (flywheel)

- Failure modes observed: `create-adr.sh` needs `--title` (positional arg rejected) — retried with
  the flag.
- Graders run and results (PASS/FAIL): ADR significance checklist — PASS (clustered, ≥1 alternative
  with rationale, pros+cons for chosen and alternatives, concise-but-sufficient).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): in `/sp.tasks`, tag each task with the FR(s) it
  satisfies so the tasks↔spec map is auditable at review time.
