# G5 Urdu review - EFMP-302 Unit 4 - feat023-r1, cycle 1

Report: `agent-g5-efmp302-u4-feat023-r1.json` (validated). Disposition: **revise**.
Reviewer `agent:g5-reviewer`, run `agent-g5-efmp302-u4-feat023-r1`, model LongCat-2.0,
author `commit:c138103`, started 2026-09-24T21:41:45Z. Advisory only: not a signature,
registry entry, qualification record, tracker transition or acceptance. `translation_status`
stays `draft`.

## What was reviewed

All 127 manifest inputs digest-verified against the prepared `feat023-r1/manifest.json`
with the contract's own `inputManifest()` (0 missing, 0 added, 0 mismatches, 0 dirty
inputs). All seven English/Urdu file pairs compared passage by passage (index, four
topics, assessment, teacher notes), plus the terminology bank, the concept graph, all 16
Urdu figure variants, and the rendered pages. The English bytes are digest-identical to
the advisory G3 feat023-r1 binding (8/8 unit inputs).

## Criteria

Pass: authority, coverage, assessment, accessibility, rtl.
Fail: sources, completeness, semantics, terminology, register.

## What holds

- Assessment equivalence: all 10 Urdu MCQs solved blind from Urdu alone before any key
  was read; every derived answer (1-ب 2-د 3-الف 4-ج 5-ب 6-د 7-ج 8-الف 9-ب 10-ج) matches
  the Urdu key and the English key. Option order الف ب ج د maps to a b c d. All ten RRQ
  schemes sum (59 total), the ERQ 10-cap and the RRQ-4 "conflicting but not incompatible"
  marking guard are preserved.
- The ten NPST standard names are complete, ordered and meaning-matched, with the
  secondary-corroboration caveat intact; every D-2026-0001 disclosure (2009
  MoE/UNESCO/USAID origin, full-text-not-here, teacher-notes verification limit, the
  fig-U4-4 in-figure caveat) survives at point of use.
- All four key_terms match the frozen bank exactly; 10 of the 13 authored concept labels
  are confirmed.
- Render: the shared build (verified fresh for this unit's Urdu pages; no rebuild run)
  served all 7 pages at 1280x900, 360x780 and A4 print with 0 defects. Nastaliq prose
  loads, tables and figures are RTL-correct (timeline stations run right-to-left,
  nesting bands right-aligned), figures are scrollable regions at 360px, print clips
  nothing. All 16 Urdu SVG variants measure clean (no overflow, no wordmark overprint,
  0 text-on-text candidates, 0 bbox contacts).

## Why it revises (13 blocking findings, all with file:line)

1. Corrupted codepoint: a literal U+FFFD inside چاہتا at `topic-04.mdx:100`, rendering
   as a broken glyph on the live page.
2. Inverted dependency: `index.mdx:78-79` says 4.2 cannot be done without 4.3; the
   English says the opposite.
3. The "improve the record instead of the practice" question is inverted in both files
   that carry it (`topic-03.mdx:177-178`, `unit-teacher-notes.mdx:92-93`), and the same
   teacher-notes sentence drops the negation of "does not survive being rushed".
4. "Stakes" rendered دہشت (terror) at `topic-01.mdx:96,193` and "high-stakes" as اعلیٰ
   دہشت at `topic-03.mdx:113`; the figures use the correct داؤ پر, proving the error.
5. "Tension/conflict" rendered تناوب (alternation) at four loci in the unit's central
   argument (`topic-01.mdx:141`, `topic-03.mdx:112`, `topic-04.mdx:97`,
   `unit-assessment.mdx:211`).
6. "A serving teacher" rendered فرضی استاد (hypothetical teacher) at four loci.
7. ERQ-2's "Integrative" label rendered مجموعی, the unit's own word for "summative",
   inside the assessment file (`unit-assessment.mdx:9,158`, `unit-teacher-notes.mdx:105`).
8. "Incentive structure" rendered "اشاریہ ڈھانچہ" (indicator structure) at
   `topic-04.mdx:107`.
9. clo_refs: Urdu topics 02/03/04 bind SLO:EFMP-302-4-1 where English binds 4-2.
10. Isore's "countries rarely use a pure form" weakened to "perhaps" (`topic-04.mdx:95`,
    also inside fig-U4-8's caption).
11. "The person appraised" reversed to the appraiser (`topic-04.mdx:10`).
12. "A well-founded risk to design against" reversed to "a risk that protects against
    design" (`topic-03.mdx:113-115`).
13. Nonsense wrong words: تالے (locks) for "tallies", خلاصی طور پر for "in the abstract",
    استعلام for استعمال, متبیل (x4) for متبادل, گرما for گرا, سنتا ہے for لگتا ہے.

## Uncertain finding (unresolved)

The G3 dependency rests on the unsigned advisory pass
(`G3/agent-g3-efmp302-u4-feat023-r1.json`, all seven criteria) because ADR-0019 blocks
agent certification and no protected signing host exists. The English bytes are verified
identical to that binding, but no signed G3 evidence exists, so the dependency cannot be
satisfied by any content repair (the G-2026-65 pattern). This alone forbids a pass.

## Unresolved advisories

Register garbles (شہادت کے قابلِ تفصیل، معیار معیار کو، چھیں چھیں، پیچھا کر سکے، لے کر
نہیں آنا، حاصل ممکن x9، embedded "formally" and "بہ طور ڈیفالٹ"); smaller omissions and
shifts (each located in the report); concept labels CON:4-12 and CON:4-15 need rework
before bank promotion; the host has no Nastaliq system font, so figure-internal labels
were verified under fallback Arabic metrics (repo-wide font stack; page prose Nastaliq
verified visually); the figures manifest's "no Urdu mirror on disk" note is now stale.

## Commands (all exit 0, logs under `logs-feat023-r1/`)

manifest-verify, validate:content, check:depth-gate, check:figures, check:no-em-dash,
check:no-answer-keys, check:docs-sync, site-build (freshness probe of the shared build;
no rebuild run), measure-figure-text (16 Urdu variants), measure-text-overlap (16 Urdu
variants, 0 overlaps), render-review (render-inspect at 1280x900 / 360x780 / A4, port
4624, artifacts under `renders-feat023-r1/`).
