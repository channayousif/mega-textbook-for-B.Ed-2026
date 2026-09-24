# G5 Urdu review - EFMP-302 Unit 4 - feat023-r2, cycle 2

Report: `agent-g5-efmp302-u4-feat023-r2.json` (validated). Disposition: **revise**.
Reviewer `agent:g5-reviewer`, run `agent-g5-efmp302-u4-feat023-r2`, model LongCat-2.0,
author `commit:a483c9e`, started 2026-09-24T22:53:16Z, supersedes
`agent-g5-efmp302-u4-feat023-r1.json`. Advisory only: not a signature,
registry entry, qualification record, tracker transition or acceptance.
`translation_status` stays `draft`.

## What was reviewed

All 127 manifest inputs digest-verified against the prepared `feat023-r2/manifest.json`
with the contract's own `inputManifest()` (0 missing, 0 added, 0 mismatches, 0 dirty
inputs). Exactly the 7 Urdu unit files changed since the cycle-1 binding; no non-Urdu
input changed. The English bytes are digest-identical to the advisory G3 feat023-r1
binding (8/8). All seven English/Urdu file pairs compared passage by passage, plus the
terminology bank, the concept graph, all 16 Urdu figure variants and the rendered pages.
The shared two-locale build (produced at a483c9e, 2026-09-24T22:50Z) was probed and
serves this unit's current Urdu bytes; no rebuild was run.

## Criteria

Pass: authority, coverage, assessment, accessibility, rtl.
Fail: sources, completeness, semantics, terminology, register.

## The thirteen cycle-1 repairs: 12 verify fully, 1 partially

1. U+FFFD in چاہتا (topic-04:100): **verified** - zero U+FFFD in source, build and render.
2. Index 4.2/4.3 dependency: **verified** ("4.2 کے بغیر 4.3 مکمل نہیں ہو سکتا").
3. "Improve the record instead of the practice": **verified in both files**, with the
   rushed-negation restored ("جلدی کرنے پر باقی نہیں رہتا").
4. Stakes as داؤ (topic-01:96, :193; اعلیٰ داؤ والے at topic-03:113): **verified**; zero دہشت.
5. Tension as تضاد (topic-01:141, topic-03:112, topic-04:97, assessment:211): **verified**;
   zero تناوب.
6. Serving teacher as زیرِ خدمت استاد (topic-01:128, topic-04:57, :173, assessment:41):
   **verified**; فرضی survives only where it means "hypothetical".
7. ERQ-2 "integrative" as یکجائتی: **partial** - the ERQ-2 label (:158) is fixed, but the
   blooms_summary (:9), the ERQ-2 rubric title (:263, "مجموعی نقشہ") and the teacher notes
   (:105, "ERQ 2 مجموعی سوال ہے") still label the integrative item مجموعی, the unit's word
   for summative. The assessment file now contradicts itself.
8. Incentive structure as ترغیبی ڈھانچہ (topic-04:107): **verified**.
9. clo_refs on topics 02/03/04 -> SLO:EFMP-302-4-2: **verified**, byte-identical to English.
10. Isoré's "rarely" as شاذ و نادر: **verified in prose only** - the fig-U4-8.ur.svg and
    fig-U4-8.ur.dark.svg captions still say "ملک شاید کسی خالص شکل کا استعمال نہیں کرتے"
    (the repair commit touched no SVG), so the figure contradicts the corrected prose beside it.
11. "The person appraised" un-reversed (topic-04:10): **verified**.
12. "A well-founded risk to design against" (topic-03:113-115): **verified**.
13. Wrong-word cluster: **verified** for تالے->شمارشے, استعلام->استعمال, متبیل->متبادل (x4),
    گرما->گرا, سنتا->لگتا. Partial for خلاصی: topic-03:50 now reads "خلاصہ طور پر" (in
    summary) instead of the suggested نظری طور پر / مجرّد طور پر, so "in the abstract" is
    still not conveyed (meaning recoverable; recorded as a residual).

## What holds

- Assessment equivalence re-verified: all 10 Urdu MCQs solved blind (1-ب 2-د 3-الف 4-ج
  5-ب 6-د 7-ج 8-الف 9-ب 10-ج) match the Urdu and English keys; option order الف ب ج د maps
  to a b c d; RRQ schemes sum to 59; the ERQ 10-cap and the RRQ-4 "conflicting but not
  incompatible" marking guard are preserved.
- The ten NPST standard names are complete, ordered and meaning-matched with the
  secondary-corroboration caveat intact; every D-2026-0001 disclosure survives at point of
  use, including the fig-U4-4 in-figure caveat.
- All four key_terms match the frozen bank; the Isoré quotations in the prose retain their
  supporting meaning (متضاد / ناممکنِ امتزاج).
- Render: the shared build (verified fresh) served all 7 pages at 1280x900, 360x780 and A4
  print with 0 defects; Nastaliq prose loads, figures and tables are RTL-correct, figures
  are scrollable regions at 360px, print clips nothing; all 16 Urdu SVG variants measure
  clean. This reviewer read the rendered pages and 20 targeted passage crops.

## Why it still revises (4 unresolved blocking findings)

1. The "integrative" repair is incomplete at three loci (assessment:9 blooms_summary,
   assessment:263 rubric title, teacher-notes:105) - the integrative item is still labelled
   "summative" in the file that owns the term.
2. The fig-U4-8 Urdu captions (light and dark) still weaken Isoré's "rarely" to "شاید"
   beside the corrected prose; both variants need regenerating.
3. خلاصی (escape) still renders "Abstract" in the ERQ-1 rubric's Limited band
   (assessment:261) - the same wrong-word class cycle 1 repaired at topic-03:50, at a
   locus cycle 1 did not flag.
4. The non-word ثبٹ (for ثبوت, proof) at topic-03:99 and :154 - the same non-word typo
   class as the cycle-1 متبیل finding.

## Uncertain finding (unresolved, carried from cycle 1)

The G3 dependency rests on the unsigned advisory pass
(`G3/agent-g3-efmp302-u4-feat023-r1.json`) because ADR-0019 blocks agent certification and
no protected signing host exists. The English bytes are verified identical to that binding,
but no signed G3 evidence exists, so the dependency cannot be satisfied by any content
repair (the G-2026-65 pattern). This alone forbids a pass.

## Unresolved advisories

The full cycle-1 register garble list (شہادت کے قابلِ تفصیل، معیار معیار کو، چھیں چھیں،
پیچھا کر سکے، لے کر نہیں آنا، حاصل ممکن x9، embedded "formally" and "بہ طور ڈیفالٹ"، the
doubled full stop at topic-03:94) plus new minors (embedded "fail" x2, نا مشاہدہ/نا حاصل
spacing, حیرتان درست، بیچ for cohort, حقیقی کمرے، "کا مجموعہ" in the fig-U4-8 bar label);
the smaller semantic shifts and omissions (cycle-1 set plus "to show anything" dropped x2,
"game" softened, the ترقی/ترقی double-duty for development/promotion); concept labels
CON:4-12 and CON:4-15 need rework before bank promotion; the host has no Nastaliq system
font, so figure-internal labels were verified under fallback Arabic metrics; the figures
manifest's "no Urdu mirror on disk" note is stale; and a cycle-limit process note - this is
review cycle 2 of 2 allowed per submission, so the owner must decide how the remaining
repairs are validated (owner-recorded human review or a fresh submission) rather than
assuming a third automatic agent cycle.

## Commands (all exit 0, logs under `logs-feat023-r2/`)

manifest-verify, validate:content, check:depth-gate, check:figures, check:no-em-dash,
check:no-answer-keys, check:docs-sync, site-build (freshness probe of the shared build; no
rebuild run), measure-figure-text (16 Urdu variants), render-review (render-inspect at
1280x900 / 360x780 / A4 on port 4625 plus this reviewer's reading of the pages and 20
passage crops; artifacts under `renders-feat023-r2/`).
