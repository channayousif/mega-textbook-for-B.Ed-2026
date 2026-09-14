# ADR-0021: Quality enforcement moves from specification to review

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Proposed
- **Date:** 2026-09-14
- **Feature:** none (cross-cutting; touches the authoring standard, the gate set, and the review pipeline)
- **Context:** The authoring standard is being revised far faster than the content it governs is
  produced, and the quality failures that actually reach readers are the ones no gate can express.

<!-- Significance checklist (ALL must be true to justify this ADR)
     1) Impact: Long-term consequence for architecture/platform/security?
     2) Alternatives: Multiple viable options considered with tradeoffs?
     3) Scope: Cross-cutting concern (not an isolated detail)?
     If any are false, prefer capturing as a PHR note instead of an ADR. -->

## Context

Measured from the working tree on 2026-09-14:

| Measure | Value |
|---|---|
| Recorded style-guide revisions, v2.0 to v4.2 | 9 in 18 days |
| Units shipped in that window (at the measured 0.25/week) | ~0.6 |
| **Revisions per unit produced** | **~15** |
| Specification lines vs EN content words | 21,808 : 28,388 |
| Gates in `FULL_GATES` / `scripts/check-*.mjs` | 15 / 9 |
| Per-unit governance tables (`coverage`, `sources`, `figures`, `concepts`) | 111 lines per unit |
| Units at publishable standard | 2 |

Three findings drive this decision.

**1. The freeze is not a gate.** v4.0 (2026-09-13) froze the standard "until 50 units exist."
It was overridden twice in the following 24 hours, by v4.1 and v4.2, each with a dutifully
recorded reason. The freeze is prose in a document, so nothing can fail when it is violated.
This is the same defect the project already diagnosed in content itself: "The estimate was never
re-checked because **Phase 5 had no gate that could fail**" (`SDD/ROADMAP.md:140`). Gates were
added to content; the rule governing the rules kept the flaw.

**2. The gate is pointed away from the risk.** `check:pipeline-gate` validates the two terms in
a unit's `key_terms` front matter and never reads the 121-term bank against roughly 2,000 words
of prose per file. The EFMP-301 Unit 1 G5 register pass (2026-09-14) found five real
terminology divergences by hand, including a figure and the paragraph beside it displaying
different Urdu words for one concept on the same screen. No gate could see any of them, because
register, terminology-in-prose and figure/caption agreement are judgements, not predicates.

**3. The standard grows because it is the only place knowledge can land.** `SDD/ROADMAP.md:113`
records that six of the eight specs built outside the phase plan "rebuild the authoring
standard." Every quality lesson learned so far has been written as a new rule and a new gate,
because there is nowhere else to put it. That is why the document has nine revisions and two
units.

The ex-ante model asks the standard to predict every failure before it happens. Failures a gate
cannot express stay invisible no matter how large the standard grows, and the standard competes
for the same hours as the content.

## Decision

Quality is enforced after the fact by review, not before the fact by specification.

- **Authoring: automated end to end.** The `author-unit` skill emits the unit and its governance
  artefacts. A human does not hand-maintain what the pipeline can derive from the content.
- **Review: the agent is primary.** The G3/G5 review agents (ADR-0019, Features 014/017) become
  the standing quality mechanism for every unit, not a parallel or advisory path.
- **Human review: calibrates the reviewer, not the unit.** The human pass stops being per-unit
  inspection and becomes the source of comparators that raise the review agent's ability. Its
  output is reviewer capability, which compounds, rather than one certified unit, which does not.
- **The standard shrinks to two things.** Invariants a gate can check deterministically, and a
  growing comparator corpus that carries judgement. New quality knowledge lands in comparators
  by default, and in the style guide only when it is genuinely a deterministic invariant.
- **`terminology.csv` decouples from the style-guide freeze** and versions as the data it is.
  Today a five-cell vocabulary edit forced a version bump, a changelog entry, and a gate that
  verifies the changelog (`specs/content/style-guide.md:12`).
- **Per-unit governance tables survive only where "derivable from content" is false.**

## Consequences

### Positive

- Quality knowledge lands somewhere that scales with units instead of competing with them.
  Comparators accumulate as a by-product of review; style-guide revisions consume authoring hours.
- The failure classes that actually reach readers (register, prose terminology, figure/caption
  agreement) come under a mechanism that can see them for the first time.
- It is the only route to the 15 units/week target. One human closing every G3 and G5 cannot
  reach it, and `SDD/ROADMAP.md:157` already states the target "sets a hard requirement on the
  review side, which is where the target has to be proven."
- Vocabulary growth stops being a standard revision, which removes the most frequent cause of
  freeze violations.
- The standard can stop growing without quality stopping, which is what a freeze was trying and
  failing to achieve by declaration.

### Negative

- **Quality becomes dependent on an agent that is not yet qualified.** Feature 014 T007 (signing
  host and CI trust root) and T008 (real qualification results) are unstarted, and CLAUDE.md
  holds certification blocked until they land. Until then this is direction, not capability.
- **Comparators are a corpus with no gate of their own.** They can rot, contradict each other,
  or encode one reviewer's idiosyncrasy as if it were the standard. That risk is real and is not
  addressed here.
- **Deterministic coverage shrinks deliberately.** Trading gates for judgement means accepting
  that some regressions will be caught later, by review, rather than at commit time.
- **The comparator base is one person's judgement today.** `specs/reviewers/human-reviewers.md`
  has a single entry, so early calibration inherits whatever that reviewer is wrong about. The
  backlog already names this: the reviewer feature "is not finished in the sense that matters
  until a second entry appears."
- Reversal is cheap in principle (the gates still exist) but costly in practice once quality
  knowledge has been written as comparators rather than rules.

## Alternatives Considered

**A. Status quo: ex-ante specification, gates, human closes every G3/G5.**
Rejected on its own measurements: ~15 standard revisions per unit produced, a freeze that cannot
be enforced, and 0.25 units/week against a 15/week target. It also cannot express the failure
class that the register pass just demonstrated.

**B. Keep the ex-ante model, but make the freeze a real gate.**
A `check:standard-freeze` blocking any `style-guide.md` or `terminology.csv` edit without an
owner-approved exception. Rejected: it treats the revision rate as the disease rather than the
symptom. It would also have blocked both of today's legitimate revisions (v4.1's RTL mirroring
rule, v4.2's bank pairing), and it leaves judgement-shaped failures as invisible as before.
Worth reconsidering as a complement once the standard has stopped moving.

**C. Drop the written standard; rely on human review alone.**
Rejected: it makes the single human reviewer the bottleneck that the entire rate target depends
on, and tacit standards do not transfer to a second reviewer or to an agent. The project already
has the evidence, since every tracker row carries the same initials.

**D. Chosen: automated authoring, agent review as the primary mechanism, human review as
calibration, standard reduced to deterministic invariants plus a comparator corpus.**
Accepts a real dependency on unqualified agent capability in exchange for the only model in
which quality knowledge and content throughput stop competing for the same hours.

## References

- Feature Spec: none (cross-cutting)
- Implementation Plan: none; activation gated on Feature 014 T007/T008
- Related ADRs: ADR-0019 (independent agents for G3/G5 review) which permitted delegated review;
  this ADR makes delegated review primary and redefines the human pass as calibration.
  Also ADR-0010, ADR-0011, ADR-0017, ADR-0018, the standard-building ADRs whose accumulation is
  the evidence in the Context section.
- Evidence: `SDD/ROADMAP.md:107` (2 units), `:113` (six specs rebuild the standard), `:140`
  (no gate that could fail), `:157` (review is where the rate is proven);
  `specs/content/style-guide.md:12` (bank frozen to the rulebook), `:57` (the v4.0 freeze note);
  `scripts/lib/gates.mjs` (the gate tiers); `specs/backlog.md` (deferred improvements, and the
  single-reviewer note from Feature 017).
- Evaluator Evidence: `history/prompts/general/0021-overspecification-and-review-locus.general.prompt.md`
