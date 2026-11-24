# GCCE-400 Unit 5 (Advocacy and Activism) - independent G3 English review, run 1 (advisory)

- **Reviewer:** agent:claude (fresh crew session; did not author or translate this unit)
- **Model:** LongCat-2.5
- **Reviewer run ID:** `crew-gcce-400-u05-review_en-run1-20261124`
- **Author run ID:** `commit:74703ca659fa9ce44df5a9f39125cbd3b5536fa2` (Unit 5 English authoring)
- **Reviewed HEAD:** `175a90b7a644bd366cf3d1d2592090a93f912bcb`
- **Deployed SHA checked:** `ac3d5e2fcd1818492dd11bc9b72d8cfed9a25e8d` (render input check)
- **Date:** 2026-11-24
- **Report:** `specs/content/gcce-400/reviews/unit-05/G3/crew-run1-20261124.json`
- **Disposition:** **escalate**

The unit is well written and the deterministic gates all pass. It cannot be certified and the
review is escalated for two reasons: (1) the required live render evidence cannot be obtained
because the production build is not the review input, so `accessibility` is unverified; and
(2) the central Topic 5.3 case study is attributed to a source that does not contain it, which
also contradicts the approved content-spec's mapped reading and therefore needs an owner/authority
decision rather than a silent unit edit.

## Criteria

| Criterion | Status | Basis |
|---|---|---|
| authority | pass | All three guide leaves (Week 10, 10.1-10.3) map to the approved content-spec and to the three topic headings; coverage matrix consistent. The mapped-reading defect is recorded under `sources` (F1). |
| sources | fail | F1 Batool et al. (2019) does not document the Lawyers' Movement; F2 digital-divide generalisation uncited; F3 Youniss & Levine declaration incomplete. |
| coverage | pass | `coverage/unit-05.md` maps every leaf to an exact heading; `check:depth-gate` exit 0. |
| assessment | fail | All 10 MCQ keys and all RRQ/ERQ items solved independently and reproduced; RRQ 6's mark scheme ignores the explanation the item demands (F4); MCQ key distribution skewed (F6). |
| accessibility | unverified | The deployed build differs from HEAD for this unit, so `render-review` is unavailable and no page or print view was inspected (F8). Source inspection only. |
| readability | pass | HSC register, terms defined at first use, Sindh examples; F5 and F7 are minor. |
| pedagogy | pass | Full learning cycle in all three topics, feasible activities, all three content-spec misconceptions addressed. |

## Findings

- **F1 (blocking, sources).** `topic-03.mdx:71,75-79,81`, fig-U5-6 (`topic-03.mdx:67`),
  `unit-assessment.mdx:113,201,234` attribute the Lawyers' Movement (2007-2009) case study and
  its "three fundamental pillars" to Batool, Mahmood & Ullah (2019). The article at the cited DOI
  is about civil society in Pakistan and Turkey and contains no Lawyers' Movement material; the
  bound note `sources/texts/batool-2019-civil-society.md:12` misrepresents it. The approved
  content-spec maps `batool-2019-civil-society` to Unit 5 and requires fig-U5-6's dates and
  events to come from a bound source, so the repair needs an owner ruling or a new bound source.
  See `source-checks/batool-2019-lawyers-movement.md`.
- **F2 (blocking, sources).** `topic-01.mdx:65` states "As studies of Pakistan's digital
  landscape demonstrate, millions of citizens ..." but no digital-divide source is cited in the
  unit; the course's digital-divide notes belong to Unit 6 and are outside this bundle. See
  `source-checks/digital-divide-claim.md`.
- **F3 (uncertain, sources).** The `youniss-levine-2009` declaration
  (`sources/unit-05.md`) describes a title-level use for U5-01 and U5-02, but `topic-01.mdx:52`
  attributes a specific socialisation finding to the book and `topic-02.mdx` never cites it in
  prose; the declaration does not name `D-2026-0001`. See
  `source-checks/youniss-levine-2009.md`.
- **F4 (uncertain, assessment).** `unit-assessment.mdx:105` RRQ 6 asks the learner to explain
  why gathering evidence must precede coordinated action, but the mark scheme
  (`unit-assessment.mdx:174-178`) awards marks only for naming the six steps.
- **F5 (advisory, readability).** `topic-03.mdx:99` contains the duplicated word
  "sanitation sanitation".
- **F6 (advisory, assessment).** MCQ key distribution is A1/B6/C3/D0; no item is keyed D and B
  is the key for 6 of 10 items. MCQ 2 is tagged Understand but is recall-level.
- **F7 (advisory, readability).** fig-U5-5's panel is labelled "3. Bureaucracy / Formal stage"
  while the prose heading, alt text and content-spec use "Bureaucratisation".
- **F8 (uncertain, accessibility).** `render-review` unavailable: the deployed SHA
  `ac3d5e2fcd1818492dd11bc9b72d8cfed9a25e8d` differs from HEAD for `index.mdx` and
  `fig-U5-7.webp`, so the live site is not the review input. No rendered page or print view was
  inspected.
- **F9 (advisory, readability).** Further-reading entries in all three topics use bare URLs as
  link text.
- **F10 (advisory, sources/coverage).** The approved figure plan for fig-U5-2
  (`content-spec.md:316`) names "family, school, media, religious and community leaders"; the
  unit's figure folds community leaders into "Family and local community" and omits religious
  leaders.
- **F11 (advisory, pedagogy).** `unit-teacher-notes.mdx` calls Community Event Planning "a core
  practical activity"; the guide lists the practical activities as optional.

## Commands

All six deterministic checks and `measure-figure-text` exited 0. `render-review` is recorded as
unavailable (exit 1). `npm run check:content` (14 gates) exited 0 at HEAD. See `logs/`.

## Acceptance status

Advisory only. No signature, no registry entry, no tracker row written, no G3 done state, no
publication. G3 remains open.
