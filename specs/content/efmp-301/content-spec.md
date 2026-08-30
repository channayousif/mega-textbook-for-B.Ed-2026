---
course_code: EFMP-301
status: approved
---

# EFMP-301 — Educational Psychology — Content Spec

> **Pending: Unit 1 v3.0 per-topic re-proof.** Constitution Art. VI.1 ("Standard versioning",
> re-run in the v2.6.0 amendment) makes this the *immediate-next content task* after Spec 008's
> proving unit (EFMP-302 Unit 1, restructured to the per-topic layout on 2026-08-30). The
> earlier v2.5.0 obligation to re-prove Unit 1 at the flat v2.0 depth standard is **superseded,
> owner-acknowledged** — the golden unit skips straight to v3.0 rather than being re-drafted
> twice. It is not started here — Spec 008 only queues it. When scheduled, on its own branch:
> add a `### Sub-topic checklist` (with a `Topic` column) + a `### Topic list` + a re-baselined
> `**Depth budget**` to the Unit 1 subsection below; restructure the unit to the per-topic
> layout (`index.mdx` opening + `topic-NN.mdx` cycles + `unit-assessment.mdx`); emit
> `specs/content/efmp-301/coverage/unit-01.md` (v2) + `.../sources/unit-01.md` +
> `.../figures/unit-01.md`; then create the matching `G1`–`G7` rows in
> `specs/content/efmp-301/tasks.md` **at that point** (not before — a `▢` row here would flip
> the already-published Unit 1 to "not done" in `check-pipeline-gate.mjs` and break the deploy
> cron). Until then, EFMP-302 Unit 1 is the working exemplar and EFMP-301 stays grandfathered
> by the opt-in predicate (no `### Topic list` → legacy depth-gate path).

Golden course (Constitution Art. VI.1, research.md R10). This content-spec is authored
**retroactively** against EFMP-301 Unit 1, which was already drafted, reviewed, and published
bilingual by Spec 001's earlier template work — no prose below is new; this document records the
existing content's traceability and starting reference set (FR-002).

Per FR-017's Definition of Done, this feature's golden-unit proof is scoped to Unit 1 only.
Remaining units of this course's guide will each gain their own `## Unit N` subsection here as
their own G1 (Unit Spec) stage completes, tracked through this course's `tasks.md` — not a
condition of Spec 006 being marked done.

## Course-wide items

Mirrors `docs/semester-1/efmp-301/course-overview.mdx`'s front matter and body (FR-003):

- **Teaching strategies**: Interactive lecture with Pakistani classroom examples; small-group
  discussion and case analysis.
- **Assessment criteria**: Class test and mid-term (formative); end-of-semester examination
  (summative).
- **Assessment weighting**: 60% summative / 40% formative (Constitution Art. III.7 default).
- **Recommended resources**: Woolfolk, A. — *Educational Psychology* (course-guide recommended
  reading; cited by reference only, never reproduced, Constitution Art. III.5).
- **Practical work**: none listed as a distinct course-wide item beyond what each unit's
  Teacher Notes carries (Constitution Art. III.6 — not invented where the guide is silent).

## Unit 1: Introduction to Educational Psychology

The Unit Spec (G1 output) for `docs/semester-1/efmp-301/unit-01/` — CLO refs, key terms,
activity concepts, reading materials, and the assessment blueprint (research.md R1).

- **CLO/SLO refs**: `SLO:EFMP-301-1-1`, `SLO:EFMP-301-1-2` (already in the unit's `clo_refs`
  front matter).
- **Bloom's summary**: Remember and Understand the scope of educational psychology; Apply its
  ideas to a classroom situation (`index.mdx`); Analyze a classroom scenario using unit concepts
  (`summative.mdx`).
- **Key terms**: Educational Psychology (`تعلیمی نفسیات`), Cognition — both already used via
  `<Glossary>` tags in `index.mdx`. "Educational Psychology" is the term declared in the unit's
  UR `index.mdx` `key_terms` front matter (FR-016c) and matches `specs/content/terminology.csv`.
- **Worked-example / activity concepts**: "Spot the learning" (pair discussion identifying a
  real learning moment) and "Plan a small change" (apply one unit idea to a lesson change) —
  already drafted in `activities.mdx`.
- **Reading materials**: course-wide Woolfolk reference (above); no unit-specific additional
  reading beyond the course-wide resource list.
- **Assessment blueprint**:
  - Formative (`formative.mdx`): 2 low-stakes quick-check items (Remember/Understand level).
    **Deviation note (FR-008)**: the formative default is 5–8 items; this introductory unit's
    2-item "quick check" is a deliberately lighter first-unit formative touchpoint, justified by
    its Remember/Understand-only scope — later units in this course return to the 5–8 item
    default.
  - Summative (`summative.mdx`): one mixed constructed-response scenario-analysis item, reaching
    Analyze (satisfies "at least one Analyze-or-higher item").
  - Weighting: 60/40 default, no per-unit deviation (matches course-wide default above).
- **Practical work**: bring one remembered lesson example and discuss what made learning stick
  (`teacher-notes.mdx` "Practical work" block).
