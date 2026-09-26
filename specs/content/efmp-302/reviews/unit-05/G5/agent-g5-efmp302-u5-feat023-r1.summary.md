# G5 Urdu review - EFMP-302 Unit 5 (feat023-r1, cycle 1)

- Report: `specs/content/efmp-302/reviews/unit-05/G5/agent-g5-efmp302-u5-feat023-r1.json`
- Disposition: **revise** (advisory; not certification; `translation_status` stays `draft`)
- Reviewer: `agent:g5-reviewer` / run `agent-g5-efmp302-u5-feat023-r1` / model LongCat-2.0
- Author run: `commit:a483c9e`; inputs bound by `feat023-r1/manifest.json` (131 paths, verified 131/131 with the contract's own `inputManifest()`, skill_digest match)
- G3 dependency: `specs/content/efmp-302/reviews/unit-05/G3/agent-g3-efmp302-u5-feat023-r1.json` (advisory pass, all seven criteria; its English digests are identical to this review's English inputs)

## Criteria

| Criterion | Status | In one line |
|---|---|---|
| authority | pass | All six outcomes taught and assessed in Urdu; exact heading/link/list parity; the four-for-three topic split disclosure preserved |
| sources | **fail** | Isoré's central finding distorted by تناوب (alternation) for "tension"; "impose consequences" weakened to "draw conclusions"; the other seven source keys' scope statements are faithful |
| coverage | pass | All twelve sub-topics taught, nine-part cycles complete, nothing outside the guide added |
| assessment | pass | Blind-solved the 10 Urdu MCQs 10/10; option order الف-ب-ج-د maps to a-b-c-d; RRQ totals 50 with RRQ 9 at Understand/7 marks; ERQ 20-mark rubrics and the 10-cap preserved |
| accessibility | pass | Desktop/narrow/A4 print clean on all seven pages; figures are scroll containers; Urdu alt text; Nastaliq webfont loads with correct bidi, digits and embedded Latin |
| completeness | **fail** | Untranslated "fixed" in the ERQ 1 rubric; heading addition "اور اختتام"; MCQ 7 key drops autonomy; topic-03 rubric adds "اگلے ہفتے" |
| semantics | **fail** | Three inversions/garbles (stance on accountability; "are not nothing"; the cost leg) plus تناوب, the weakened mechanism and the collapsed RRQ 1 marking-point contrast |
| terminology | **fail** | تناوب wrong term (Unit 4 uses تضاد for the same source concept); non-word ششہ in fig-U5-8; لچک names both elasticity and resilience. All four key_terms are bank-exact; the 14 authored concept labels are fit for promotion |
| register | **fail** | Good academic-plain overall, but a repairable batch: 4 code-mixed "quote" verbs, 7 typos, 3 gender-agreement slips, شہادت for "evidence", mixed workload terms |
| rtl | **fail** | Rendering itself is clean (RTL mirroring correct on both flowcharts and the regions diagram; zero text overlap over all 16 Urdu variants; print fits), but the Law recognition cell reads بلند where the EN figure reads "Mixed", and fig-U5-8 carries the non-word ششہ |

## Blocking findings (9, all with precise loci and repair requests in the report)

1. topic-02.mdx:45 - "does not dispute" inverted to "does not agree" (the unit's stance on accountability).
2. topic-04.mdx:89-90 - "are not nothing" inverted to "are nothing at all" before the four-resource list.
3. topic-03.mdx:71-72 - "cost her the only thirty minutes" garbled to "their meaning is ... thirty minutes".
4. topic-02.mdx:50-51 - تناوب (alternation) for Isoré's "tension"; recurrence of the Unit 4 G5 finding.
5. topic-02.mdx:51-52 - "impose consequences" weakened to "draw conclusions".
6. unit-assessment.mdx:198-200 - RRQ 1 point 4's commitment-vs-duty contrast collapsed to duty-vs-duty.
7. fig-U5-4.ur.svg / .ur.dark.svg - Law row recognition cell بلند (High) vs EN "Mixed".
8. fig-U5-8.ur.svg / .ur.dark.svg - station 1 label carries the non-word "ششہ" for EN "discipline".
9. unit-assessment.mdx:245 - "fixed" left untranslated in the ERQ 1 rubric cell.

## Unresolved uncertain finding (1)

- The G3 dependency cannot be satisfied by signed evidence (G-2026-65 pattern). ADR-0019 blocks agent certification; the best available G3 is the unsigned feat023-r1 advisory pass, whose English inputs are byte-identical (verified) to this review's. Owner-side resolution required before any certified G5 pass; this alone forbids a pass disposition.

## Commands (all exit 0, logs under `logs-feat023-r1/`)

`validate:content`, `check:depth-gate`, `check:figures`, `check:no-em-dash`, `check:no-answer-keys`, `check:docs-sync`, `site-build` (freshness probe of the shared a483c9e build, not a rebuild: every current-source probe found, all 16 Urdu figure assets byte-identical), `render-review` (render-inspect on port 4626 plus the reviewer's visual inspection record, section E), `measure-figure-text`, `measure-text-overlap` (reviewer instrument: zero text-on-text superposition across all 16 Urdu variants), `verify-inputs`, `figure-shots`, `targeted-shots`. 76 evidence files hashed; rendered PNGs include all 7 desktop and narrow pages, all 8 figures in both themes, 11 targeted crops and print-emulation shots.

## Notes for the repair cycle

- The تناوب error repeats the Unit 4 G5 systematic finding despite that review's repair; worth a translator-level note.
- The three prose inversions all sit in load-bearing sentences (stance, hinge into the resource list, the three-question application); each is a one-phrase repair listed in the report.
- Figure repairs touch four committed SVG files (two variants each of fig-U5-4 and fig-U5-8); `check:figures` and `figures:variants:check` should re-run after them.
- Advisories (register batch, smaller shifts, لچک polysemy, carried G3 advisories, the stale figures/unit-05.md prose) are enumerated in the report and can ride the same repair.
