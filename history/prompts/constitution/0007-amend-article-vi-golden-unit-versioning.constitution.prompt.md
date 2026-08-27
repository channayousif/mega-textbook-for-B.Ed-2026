---
id: 0007
title: Amend Article VI golden unit versioning
stage: constitution
date: 2026-08-27
surface: agent
model: claude-sonnet-5
feature: none
branch: 007-content-depth-standard
user: channayousif@gmail.com
command: /sp.constitution
labels: [constitution, article-vi, golden-unit, content-depth-standard, minor-bump]
links:
  spec: specs/007-content-depth-standard/spec.md
  ticket: null
  adr: history/adr/0010-content-depth-standard-and-reusable-unit-authoring-skill.md
  pr: null
files:
 - .specify/memory/constitution.md
 - specs/007-content-depth-standard/plan.md
 - specs/007-content-depth-standard/spec.md
 - history/prompts/constitution/0007-amend-article-vi-golden-unit-versioning.constitution.prompt.md
tests:
 - none (governance document; no code changed)
---

## Prompt

User: "fix in constitution"

(Context: Feature 007 planning surfaced a tension — Constitution Art. VI.1 names EFMP-301
Unit 1 as "the golden unit that sets the quality bar", but Feature 007 raises the bar via a
versioned content depth standard (style-guide v2.0) and proves it on EFMP-302 Unit 1 while
deferring the EFMP-301 Unit 1 re-draft, leaving the named golden unit temporarily below the
current standard. `/sp.plan` flagged this and offered a Constitution PATCH; the user chose to
fix it in the Constitution.)

`/sp.constitution` argument: amend Art. VI.1 so that (a) the golden unit stays EFMP-301 Unit 1
as the canonical structural/traceability exemplar; (b) on a standard version bump
(style-guide/terminology-bank freeze, Spec 006 FR-007) the golden unit MUST be brought to the
new version as the immediate next content task after the proving unit, tracked in the pipeline
task tracker, not a blocker on the version bump; (c) until then, the most recently accepted
unit at the current version is the working depth exemplar. Keep it minimal.

## Response snapshot

**Amendment: v2.4.0 → v2.5.0 (MINOR).** A materially expanded requirement is added to Art.
VI.1; nothing removed or redefined; no approved spec invalidated (Feature 007's approach is
exactly what the new wording permits).

**Modified — Article VI.1:**
- Golden unit line now names EFMP-301 Unit 1 explicitly as "the canonical exemplar for unit
  structure, CLO/SLO traceability, and bilingual parity."
- New **"Standard versioning"** paragraph appended: the standard is versioned by the
  style-guide + terminology-bank freeze marker (Spec 006 FR-007); on a bump, the raised bar is
  demonstrated on a **proving unit** (need not be the golden unit); the golden unit MUST then
  be brought to the new version as the **immediate next content task after the proving unit**,
  tracked in its course task tracker, and the version bump is not blocked on it; until
  re-proof, the most recently accepted unit at the current version is the **working depth
  exemplar**.
- Items VI.2 / VI.3 unchanged and deliberately **NOT renumbered** (cross-referenced from
  `specs/backlog.md`, specs 002/003/004/005, ADR-0007) — the new rule was folded into VI.1's
  prose instead of inserted as a new numbered item.

**Sync Impact Report** prepended to `constitution.md` as an HTML comment (v2.5.0 block above
the retained v2.4.0 block). Version footer → `**Version**: 2.5.0 | **Ratified**: 2026-07-17 |
**Last Amended**: 2026-08-27`.

**Propagation (same branch):**
- `.specify/templates/{plan,spec,tasks}-template.md` — grepped; no hardcoded Article VI /
  golden-unit references (generic Constitution Check), no edit needed.
- `specs/007-content-depth-standard/plan.md` — Constitution Check header → v2.5.0; VI.1 row
  rewritten from ⚠️ to ✅ (the amendment resolves it); the "VI.1 note" section rewritten as
  "resolved by the v2.5.0 amendment"; XI row notes the amendment; post-design re-check + Risk
  1 rewritten (re-proof is now a constitutional obligation, tracked as the immediate-next
  EFMP-301 pipeline task).
- `specs/007-content-depth-standard/spec.md` — Dependencies line reworded: Art. VI.1
  "golden-unit-first" → "golden-unit exemplar + the v2.5.0 Standard versioning clause".
- `history/adr/0010` — left as-is (records the decision as of its date; still accurate).

## Outcome

- ✅ Impact: The proving-unit / golden-unit / working-exemplar relationship is now
  constitutional, so future standard bumps (v2.1, v3.0, …) have a defined obligation rather
  than an ad-hoc "governance smell". Feature 007 is fully compliant with no deferral hand-wave.
- 🧪 Tests: none — governance doc.
- 📁 Files: `.specify/memory/constitution.md` (v2.5.0), `specs/007-content-depth-standard/plan.md`,
  `specs/007-content-depth-standard/spec.md`, this PHR.
- 🔁 Next prompts: `/sp.tasks` for Feature 007 — and ensure the task list (or the immediate
  follow-up) contains the EFMP-301 Unit 1 v2.0 re-proof task per the amended VI.1.
- 🧠 Reflection: Folding the rule into VI.1's prose rather than adding VI.4 avoided touching
  ~8 cross-references to VI.2/VI.3 across specs/ and history/adr/ — the renumber would have
  been a far larger, riskier diff than the governance change itself.
- 📋 Suggested commit message: `docs: amend constitution to v2.5.0 (Art. VI.1 standard-versioning / golden-unit re-proof)`

## Evaluation notes (flywheel)

- Failure modes observed: n/a (governance amendment).
- Graders run and results (PASS/FAIL): placeholder scan — PASS (no unresolved `[TOKENS]`);
  version line matches report; dates ISO; VI.2/VI.3 cross-refs verified intact (no renumber).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): when `/sp.tasks` runs, add an explicit
  "T0xx — open EFMP-301 Unit 1 v2.0 re-proof task in specs/content/efmp-301/tasks.md" so the
  constitutional obligation is not left to memory.
