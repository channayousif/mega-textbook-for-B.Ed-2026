# G5 Urdu review - GICT-300 Unit 4 (Cyber security and Data Protection) - run 001

Report: `agent-g5-gict300-u4-run001.json` (validated, advisory under ADR-0019)
Reviewer: `agent:g5-reviewer`, model LongCat-2.0, fresh session (did not author/translate these bytes)
Reviewed at: HEAD `bde5520`, 2026-09-23. Author run: `commit:a7200d2` (English repairs mirrored into Urdu).
Inputs: prepared manifest at `specs/content/gict-300/reviews/unit-04/G5/manifest.json` - all 125 input
digestes and the skill digest recomputed identical (no mismatch; 684e916/bde5520 touched only
unit-01/02 files and other units' manifests).

## Disposition: ESCALATE

The Urdu translation is close - assessment equivalence is exact, coverage and sources hold, RTL
rendering is clean - but the English G3 dependency is unsatisfied, and the Urdu carries six
actionable content defects (below) that should be repaired in the same cycle.

## Escalation driver

The only G3 report (`../G3/agent-g3-gict300-u4-run001.json`, advisory run 001, disposition
**revise**) binds pre-repair English inputs. Recomputed against the current tree,
`docs/semester-1/gict-300/unit-04/topic-01.mdx`, `unit-assessment.mdx`, and governance files
`concepts/unit-04.md`, `coverage/unit-04.md`, `sources/unit-04.md`,
`sources/texts/bourgeois2019.md` all hash differently (repaired at `a7200d2`, after that G3 ran).
The G5 rubric requires accepted G3 evidence for the exact English inputs and invalidates the
dependency on a changed digest. The repairs are the G3-directed ones mirrored into Urdu in the
same commit, which supports confidence but does not substitute for a fresh accepted G3.
Required before G5 can pass: a fresh G3 run on the current English bytes. Same driver as Unit 1's
G5 run001 escalation.

## Blocking findings (Urdu, actionable now)

1. **"پرچار کریں" for "Discuss"** - `i18n/ur/.../unit-04/topic-02.mdx:75` and `topic-03.mdx:90`.
   پرچار means propaganda/publicity. Expected "تبادلہ خیال کریں" / "بحث کریں".
2. **Non-word "ناجانز"** - `topic-01.mdx:77` ("ناجانز USB ڈرائیوس" for "unknown USB drives";
   expected نامعلوم/اجنبی).
3. **Untranslated "reasoned"** - `unit-assessment.mdx:186`, RRQ-9 mark scheme
   ("بچے کی رضامندی کی reasoned وضاحت پر 1"; expected معقول وضاحت).
4. **Misspelling "شکلون"** - `unit-teacher-notes.mdx:68` (oblique plural of شکل is شکلوں).
5. **Ungrammatical "کس کا مطلب رکھتا ہے"** - `index.mdx:54` (should be "کیا مطلب رکھتا ہے"),
   in the unit's opening paragraph.
6. **Figure label drift "چوری شدہ" (stolen) for "phished"** - `fig-U4-5.ur.svg` / `.ur.dark.svg`
   footer; the unit's established term is فش شدہ (topic-03, RRQ-7 model, fig-U4-6). One-word SVG
   edit plus re-mirror.

## Advisory findings

- fig-U4-7.ur.svg side box uses مرضی (wish) for "consent" (رضامندی elsewhere, incl. the alt text).
- "سی آئی اے تینی" (CIA triad) is an authored coinage, consistent and comprehensible; owner to
  bank or reconsider ("سی آئی اے سہ اصول"). Bank holds no GICT-300 terms (per handoff, not a defect).
- تصدیق covers both "verify" and "authentication"; propose a bank entry (توثیق / تصدیقِ شناخت).
- حروف for "characters" (topic-03, assessment); strings visible, so no confusion.
- topic-04:41 "one of the richest" strengthened to "سب سے مالامال" (drops "one of").
- RRQ-9 model uses نتائج کا مقابلہ (compare) for "weigh consequences" (تولنا in topic-04).
- NIST quote: "configurable" as "تشکیل دینے والے" (active, not passive capability); meaning preserved.
- Register minors: "جماعتی صورتحال" heading for "classroom situation" (all four topics); "تقریبا"
  missing tanween at topic-01:47; fig-U4-3 legend "ہٹی خانے" for "dashed".
- Bare-URL link text in Further reading (11 links), mirroring English (G3 run001 advisory, open there).
- Print PDF of unit-assessment emits a near-empty page 3 (pagination artifact, not a translation defect).

## What passed

- **Assessment equivalence**: solved the full Urdu 10/10/5 bank before opening the English key.
  All 10 MCQ keys match (ب، د، ج، الف، ج، د، ب، الف، ج، د), option order الف/ب/ج/د = a/b/c/d,
  distractors identical, Bloom tags preserved. The a7200d2-repaired items (RRQ-4/8/9/10,
  MCQ-2/4/6/8/9/10) mirror the post-repair English exactly; the old "the family" remnant is gone.
- **Coverage/completeness**: all six coverage rows taught in Urdu; heading parity exact across all
  seven file pairs; key_terms 15/15 match the concept-graph labels; the two raw list-count deltas
  are regex artifacts (English prose dash / topic-number line starts), not omissions.
- **Sources**: every citation, quotation and qualification retained with supporting meaning;
  unverifiable sources declared with attempts, dates and owner ruling D-2026-0001.
- **RTL/render**: style-guide v4.1 mirroring verified mathematically (fig-U4-5 x-coordinates
  reflect about the viewBox centre; wordmark flips side) and visually; Nastaliq, bidi punctuation,
  numerals and embedded Latin all correct at 1280x900, 360x780 and A4 print; all 16 Urdu SVG
  variants geometry-clean; render-inspect exit 0, zero defects.

## Commands (real exit codes)

`validate:content` 1, `check:depth-gate` 1, `check:figures` 1, `check:no-em-dash` 1,
`check:no-answer-keys` 1 (all five red solely from the out-of-scope stale geng-300 tree; zero
gict-300 mentions in any log), `check:docs-sync` 0, `render-review` 0 (Urdu locale, built /ur/
route, chromium 149.0.7827.0), `build` 0. Logs and 42 render artifacts under
`logs-agent-g5-gict300-u4-run001/` and `renders-agent-g5-gict300-u4-run001/`.

## Next steps for the parent

1. Repair the six blocking Urdu defects (items 1-6 above) and re-mirror fig-U4-5; advisories at
   owner discretion.
2. Run a fresh G3 on the current English bytes of Unit 4 (the dependency driver).
3. Prepare a new manifest and launch a fresh G5 reviewer for run 002. Unresolved findings are
   preserved here. This report is advisory: no gate row, registry entry or signature is claimed.
