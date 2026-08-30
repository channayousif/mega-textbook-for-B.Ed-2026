---
id: 0006
title: Analyze 008 re-run and G-fixes
stage: misc
date: 2026-08-27
surface: agent
model: claude-sonnet-5
feature: 008-rich-unit-pedagogy
branch: 008-rich-unit-pedagogy
user: channayousif
command: /sp.analyze (re-run) + approved remediation
labels: ["analyze", "cross-artifact", "constitution", "golden-unit-versioning", "spec-008"]
links:
  spec: specs/008-rich-unit-pedagogy/spec.md
  ticket: null
  adr: history/adr/0011-nested-per-topic-unit-pedagogy-bounded-answer-keys-and-figure-markers.md
  pr: null
files:
 - .specify/memory/constitution.md
 - specs/008-rich-unit-pedagogy/spec.md
 - specs/008-rich-unit-pedagogy/research.md
 - specs/008-rich-unit-pedagogy/tasks.md
tests:
 - none (analysis + doc remediation)
---

## Prompt

> /sp.analyze  (second read-only pass, after the first pass's remediations landed)
> then: "fix All as recommended"

## Response snapshot

**Re-analysis** (constitution now v2.6.0; tasks 62, 1 done; all first-pass fixes verified held):
**0 CRITICAL, 0 HIGH.** X1 (Art. V.2 conflict) confirmed resolved by the v2.6.0 amendment. New /
residual findings: **G2, G3 (MEDIUM — both the EFMP-301 golden-unit pending-note / versioning),
S1 (LOW→MEDIUM — spec lagged the U2 gate hardening), G1 (LOW — stale header)**. Coverage 29/29 FR,
10/10 SC (SC-009 now covered by T062).

**Root fact surfaced (G3):** the v2.5.0 constitutional obligation — golden unit EFMP-301 Unit 1
brought to **style-guide v2.0** as the immediate-next content task — was **never started**
(`> Pending … v2.0` still on disk in `efmp-301/content-spec.md` + `specs/backlog.md`; style guide
still `"2.0"`). Spec 008 retargets it to **v3.0**, i.e. the golden unit skips v2.0.

**Remediations applied (all as recommended):**

- **G1** — `tasks.md` Phase 2 header: "⚠️ T004 … blocks every other task" → "T004 (constitution
  v2.6.0) is **complete** — T005–T012 may now run in parallel".
- **G2** — `tasks.md` T058 reworded from *"add a `> Pending … v3.0` note"* to *"**Replace** (do not
  duplicate) the existing `> Pending: Unit 1 v2.0 …` block"* in both `efmp-301/content-spec.md` and
  `specs/backlog.md`, with the full v3.0 per-topic re-proof recipe.
- **G3** — `.specify/memory/constitution.md` v2.6.0 SYNC block: added a **"Superseded obligation
  (owner-acknowledged)"** paragraph stating the v2.5.0 golden-unit → v2.0 obligation was NOT
  satisfied and is **superseded, not deferred** — the golden unit's next re-proof is directly at
  v3.0; Art. VI.1's mechanism (re-proof = tracked next task, EFMP-302 U1 = working exemplar) is
  still honoured. Reworked the "Prior TODOs carried forward" line accordingly.
- **S1** — `spec.md` FR-021 gains the clause: for every checklist sub-topic, ≥1 coverage row MUST
  name the exact `topic-NN.mdx` its topic-list row assigns it to; disagreement is a gated hard
  failure. FR-020's gate-check list updated to point at FR-021 + note per-sub-heading 10/10/5
  counting. `research.md` R10 mirrored (invariant (b) + "gates are binary, no non-failing finding"
  + "added by /sp.analyze remediation U2").

Post-fix verify: constitution `Version: 2.6.0`; tasks T001–T062 contiguous, no gaps; FR 29/29, SC
10/10; no placeholders.

## Outcome

- ✅ Impact: `008` analysis-clean (0 CRITICAL / 0 HIGH); spec, plan, tasks, research, contracts and
  the constitution now mutually consistent. Ready for `/sp.implement` at T005.
- 🧪 Tests: none (docs / governance only).
- 📁 Files: constitution, spec.md, research.md, tasks.md.
- 🔁 Next prompts: `/sp.implement` (T005 → …), or commit the planning + governance set (constitution
  v2.6.0, ADR-0011, spec/plan/tasks/contracts, PHRs) first.
- 🧠 Reflection: the golden-unit v2.0→v3.0 skip was the substantive item — worth an explicit
  "superseded, not satisfied" record in the constitution so a future audit doesn't read it as a
  dropped obligation.

## Evaluation notes (flywheel)

- Failure modes observed: first-pass remediation tightened contracts/tasks/data-model for U2 but
  didn't propagate to spec.md FR-021 — caught here as S1 (spec-drift, Art. IV.4).
- Graders run and results (PASS/FAIL): FR/SC coverage — PASS (29/29, 10/10); constitution internal
  consistency (V.2 carve-out vs IX.3 `verified_teacher`) — PASS; task-ID integrity — PASS
  (T001–T062 contiguous).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): before `/sp.implement`, commit the full planning set so
  the constitution amendment is on record independently of implementation progress.
