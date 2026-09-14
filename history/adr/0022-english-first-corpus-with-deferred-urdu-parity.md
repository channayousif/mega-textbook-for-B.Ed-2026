# ADR-0022: English-first corpus with deferred Urdu parity

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Proposed
- **Date:** 2026-09-14
- **Feature:** none (cross-cutting; Phase 5 content sequencing)
- **Constitution:** 3.0.0 -> 4.0.0 (MAJOR) if accepted, amending Article III.2
- **Context:** Owner instruction 2026-09-14: "start with en version for all first, once the whole
  corpus as complete then we will move to the ur version."

<!-- Significance checklist (ALL must be true to justify this ADR)
     1) Impact: Long-term consequence for architecture/platform/security?
     2) Alternatives: Multiple viable options considered with tradeoffs?
     3) Scope: Cross-cutting concern (not an isolated detail)?
     If any are false, prefer capturing as a PHR note instead of an ADR. -->

## Context

Content has been produced one unit at a time through all seven gates, English and Urdu together:
G1 unit-spec, G2 en-draft, G3 en-review, G4 ur-translation, G5 ur-review, G6 assets, G7 publish.
Two units have completed that cycle in roughly two months.

The owner's instruction changes the axis: author the whole English corpus first, then translate.

**The collision.** Article III.2 is unconditional:

> every student-facing unit MUST have a complete Urdu version accepted through G5 **before
> publish**, except units belonging to a course explicitly designated English-only (e.g.
> GENG-300 Functional English), flagged `bilingual: false` in course-overview metadata.

So English-first is free for authoring and forbidden for publishing. Left unamended, roughly 200
units would accumulate in the repository, gate-green and invisible, until the Urdu phase
completed. The `bilingual: false` escape does not apply: it designates a course as permanently
English-only, which would be false for a B.Ed course with a Urdu-medium audience.

**The capability already exists.** `src/components/TranslationStatusBadge.tsx` has carried
`status="untranslated"` since Spec 001: "Urdu translation not yet available (EN fallback shown)".
The English-only reading path is built and constitutionally forbidden, not missing.

**The argument for sequencing this way** is stronger than convenience. The terminology bank
matures across the corpus as translators meet new words. Style guide v4.2 had to bank four terms
as *accepted pairs* precisely because EFMP-301 Unit 1 and EFMP-302 Unit 1 were translated at
different times against a bank that moved between them, leaving two live readings of the same
concept in signed content. Translating a complete corpus against a settled bank removes that
whole class of divergence rather than resolving it case by case.

**The argument against** is that it concentrates the least-measured and most-constrained work
into one terminal phase. G5 with one qualified human reviewer is the known bottleneck, and
ADR-0021 holds that review is where the rate has to be proven. Deferring every translation to
the end means the Urdu rate is discovered after the English corpus is already built, when it is
too late to reshape the plan around it.

## Decision

Four parts, taken together:

1. **Author the complete English corpus first**, course by course, through G3. Systematic Urdu
   translation begins once the English corpus is complete.
2. **Amend Article III.2.** Urdu parity becomes a **corpus completion requirement** rather than a
   per-unit publish gate. A unit MAY publish English-only, and MUST then render the
   `untranslated` banner so the reader is told plainly what they are looking at. Everything else
   in III.2 is unchanged: machine translation may draft, G5 must be performed by a qualified
   human or an independently qualified agent, a translation cannot approve itself, and the
   academic-plain register stands.
3. **One unit is translated early as a rate probe.** A single unit goes through G4/G5 during the
   English phase for the sole purpose of measuring the Urdu rate, so the terminal phase is
   planned from evidence rather than an estimate. This is measurement, not the start of the Urdu
   phase.
4. **Measurement run 001 is unaffected** (`specs/content/measurement-run-001.md`). It already
   measures English through G3 and explicitly excludes G4 as a separate rate.

## Consequences

### Positive

- Translation happens once, against a settled terminology bank. The accepted-pair mechanism v4.2
  introduced becomes a way to record genuine regional or register splits rather than a way to
  paper over a bank that moved mid-corpus.
- Content becomes visible as it is written. Under the unamended article, the English corpus would
  have been invisible to every reader until the final phase closed.
- Authoring runs as one sustained track without per-unit context switching between composition
  and translation, which is the shape the 15 units/week hypothesis assumes.
- The rate probe converts the single largest unknown in the back half of Phase 5 into a measured
  number at the cost of one unit.

### Negative

- **The bilingual promise is weakened in the interim, and it is a real promise.** The product is
  positioned as a bilingual B.Ed textbook for a Urdu-medium audience. For the duration of the
  English phase, that audience gets an English page with a banner explaining the gap. The banner
  is honest, but honesty about a shortfall is not the same as not having one.
- **A MAJOR constitution amendment.** Article III.2's publish gate is one of the oldest
  commitments in the document, and relaxing it sets the precedent that a parity requirement can
  be rescheduled under delivery pressure.
- **Urdu debt accrues silently and at scale.** One untranslated unit is a banner; two hundred is
  a second project, carrying the review bottleneck that Feature 017 exists to address and has not
  yet lifted.
- **Reversal gets more expensive the longer it runs.** Returning to per-unit parity after fifty
  English-only units means a fifty-unit translation backlog before anything new can publish.
- The corpus-wide terminology benefit is real but unproven; it is an argument from one observed
  divergence (v4.2's four pairs), not from measurement.

## Alternatives Considered

**A. Keep Article III.2; author English first but publish nothing until Urdu lands.**
Honours the bilingual commitment exactly. Rejected by the owner: it produces a long period with
no visible progress, and it makes the English corpus a large uncommitted bet whose value is
unrealised until the very end. It also removes the feedback that publishing provides, since
reader feedback (Spec 010) cannot arrive for unpublished content.

**B. Amend per course rather than globally.**
Allow English-only publishing for opted-in courses, so the licence tier and Tier 1 courses ship
early while the rest keep full parity. Finer control and a smaller constitutional change.
Rejected as more machinery than the situation needs, and the opt-in list would in practice grow
to match the whole corpus. Worth revisiting if the interim proves longer than planned.

**C. Status quo: interleave English and Urdu per unit.**
The current model. Rejected as the thing being changed: it produced two units in two months, and
it is what exposed the bank to mid-corpus drift.

**D. Chosen: English corpus first, Article III.2 amended to a corpus-completion requirement with
a mandatory untranslated banner, plus one early translation as a rate probe.**
Accepts a real and visible interim shortfall against the bilingual promise in exchange for
throughput, a settled bank at translation time, and an early measurement of the phase everyone is
guessing about.

## References

- Owner instruction: 2026-09-14, recorded in
  `history/prompts/general/0022-english-first-corpus-sequencing.general.prompt.md`
- Constitution: `.specify/memory/constitution.md:488` (Article III.2, the clause amended)
- Existing capability: `src/components/TranslationStatusBadge.tsx:6` (`untranslated` status,
  Spec 001's EN fallback)
- Related ADRs: ADR-0021 (quality enforcement moves to review; supplies the argument that the
  review side is where the rate must be proven, which motivates decision 3). ADR-0019 (delegated
  G3/G5 review), whose activation determines whether the terminal Urdu phase is survivable.
- Measurement: `specs/content/measurement-run-001.md`
- Evidence for the bank-drift argument: `specs/content/style-guide.md` v4.2 changelog entry and
  `specs/content/terminology.csv` (the four accepted pairs)

## Not done by this ADR

The amendment itself. This records the decision and its reasoning; changing Article III.2 and
bumping the constitution to 4.0.0 is a separate, explicit act (`/sp.constitution`), as is the
audit of every artefact that restates the parity rule - `specs/content/style-guide.md:118`,
Spec 001's FR-003, and the G7 gate description.
