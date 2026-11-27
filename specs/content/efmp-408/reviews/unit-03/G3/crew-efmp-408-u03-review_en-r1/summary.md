# EFMP-408 Unit 3 (Constructing Tests) - G3 English review summary

- **Reviewer:** `agent:claude-g3-reviewer` (fresh session; did not author or
  translate this unit)
- **Author run:** `crew-efmp-408-u03-author` (agy, 2026-11-24)
- **Reviewer run:** `crew-efmp-408-u03-review_en-r1`
- **Model:** Claude Code, model identity `LongCat-2.5` (exact deployment version
  unavailable)
- **Reviewed commit:** `7bb9e4d484428859cbfe2f6e3775c0e8291b11ea` (origin/main);
  the unit English directory and figure directory are byte-identical to the
  deployed SHA `7bb9e4d48`
- **Disposition:** **revise** (advisory; G3 remains open and unsigned)

## What was checked

All seven English unit files, the approved content-spec Unit 3 section, the
coverage/sources/concepts/figures tables, the bound HEC guide text and the bound
Seifert & Sutton excerpt; the 10/10/5 bank solved independently before the
supplied answers were read; the eight schematic SVGs and the banner; and the
production render at `https://textbook.com.pk` at desktop 1280, narrow 360 and
A4 print 794.

## Verdicts

| Criterion | Status | Headline |
|---|---|---|
| authority | pass | Guide Weeks 5-7 map completely to U3-01..U3-12; the content-spec is `status: approved`. |
| sources | pass | Core claims supported by the bound HEC guide and Seifert excerpt; three secondary attributions flagged. |
| coverage | pass | All 12 sub-topics have a named teaching section and a coverage row; reading-minutes 98 inside 80-105. |
| assessment | **fail** | MCQ 10's key rationale is factually wrong; three RRQs sit below the default RRQ band; one formative item sits above the declared formative band; 16 formative items against the approved 12. |
| accessibility | pass | All 16 figure variants load after scroll; no document overflow at 360; every wide table scrolls with `tabindex=0`; no clipping at A4. |
| readability | pass | HSC register holds; terms defined at first use; no em dash. |
| pedagogy | pass | Nine-part cycle intact; all three approved misconceptions named and corrected; activities feasible in the stated Sindhi school context. |

## Findings to repair (none blocks publication, all are actionable)

- **A-1 (advisory, assessment):** `unit-assessment.mdx:156` - MCQ 10's key says
  the article "an" "points toward vowel-beginning options", but all four options
  begin with consonants, so the clue points at nothing. Repair the item and the
  rationale.
- **A-2 (advisory, assessment):** RRQ 1, 7 and 9 are tagged `*(Remember)*`,
  below the style-guide default RRQ floor Understand (`style-guide.md:248`).
  Raise the items or record a ruling.
- **A-3 (advisory, assessment):** 16 formative items (4 per topic) against the
  approved "formative 12 items, 3 per topic" (`content-spec.md:193`,
  `D-2026-0093` item 4). Reduce to 3 per topic or record a ruling.
- **A-4 (uncertain, assessment):** `topic-02.mdx:131` formative item 4 is tagged
  `*(Analyze)*`, above the declared formative band Remember/Understand/Apply
  (`content-spec.md:193`). The label matches the demand, so reword to the band
  or record a ruling.
- **S-1..S-3 (advisory, sources):** the "three objective criteria (HEC, 2012)"
  for weightage and the 30/40/30 "sound professional standard"
  (`topic-01.mdx:61`, `:86-89`); the "Studies consistently show" handwriting
  claim (`topic-02.mdx:94`); and the named bodies "Sindh Higher Education
  Commission" and "the Higher Education Commission and the Aga Khan University
  Examination Board" (`topic-02.mdx:101`, `topic-04.mdx:86`) are not in the
  bound sources. See `source-verification.md`.
- **R-1 (advisory, accessibility):** bare-URL link text on all four topic
  Further reading lists.
- **R-2 (advisory, readability):** the unit's key item-writing terms (Table of
  Specifications, blueprint, weightage, stem, distractor, ...) have no
  `glossary.json` entry; each is defined inline, so comprehension holds.

## Render note

`scripts/render-inspect.mjs` (the prescribed tool) exited 1 on a single defect:
`topic-03: visible image did not load: /img/figures/efmp-408/unit-03/fig-U3-7.svg`.
This is a tool false positive. The asset is served by production (HTTP 200,
5372 bytes, byte-identical to the repo) and decodes in Chromium at 244x150; the
tool measures a `loading="lazy"` image that is below the fold before it is
fetched. A follow-up driver that scrolls first (`render-verify.txt`,
`render-verify/render-verify.json`) reports `defects=0`: every image loads, all
tables scroll with `tabindex=0`, no document overflow at 360, no clipping at A4.
The render input identity is the deployed SHA `7bb9e4d48`.

## Limitations

- No parent-prepared frozen handoff or runtime provenance was supplied; the
  manifest was prepared locally from the current commit.
- `sources/texts/hec-2013-testdev.md` is not manifest-bound (the key-derivation
  regex captures `hec-2013`); the HEC claims were checked against the bound full
  guide text instead.
- This report is advisory. It does not certify the unit, qualify the reviewer, or
  write a done tracker row.
