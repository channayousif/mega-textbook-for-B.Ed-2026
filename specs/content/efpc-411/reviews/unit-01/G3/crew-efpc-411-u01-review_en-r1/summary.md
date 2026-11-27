# EFPC-411 Unit 1 - G3 English review summary

- **Disposition: revise** (actionable source-support defects; all other criteria verified).
- **Reviewer:** agent:claude-crew (independent; did not author or translate this unit).
- **Author run:** crew-efpc-411-u01-author. **Reviewer run:** crew-efpc-411-u01-review_en-r1.
- **Model:** Claude Code (model identity LongCat-2.5; exact deployment version unavailable).
- **Reviewed commit:** 66a1991270e8800bdc55e838140e5b90c45b1524 (== deployed SHA).
- **Report:** `specs/content/efpc-411/reviews/unit-01/G3/crew-efpc-411-u01-review_en-r1.json`.

## Criteria

| Criterion | Status | Headline |
|---|---|---|
| authority | pass | Every guide Week 1-4 leaf maps to a taught subsection; D-2026-0090 + D-2026-0093 approve the spec. |
| sources | **fail** | One unsupported factual claim and one misattributed citation (below). |
| coverage | pass | U1-01..U1-13 all mapped and taught; concept graph reaches every row. |
| assessment | pass | MCQ key derived blind 10/10; RRQ/ERQ schemes and rubrics read; blueprint met. |
| accessibility | pass | Production render 0 defects (desktop, 360px, A4 print); advisories only. |
| readability | pass | HSC register holds; definitions, worked examples, misconceptions, progression. |
| pedagogy | pass | Nine-part cycle complete; activities feasible in the Sindhi school context. |

## Findings to repair

1. **sources (uncertain):** `topic-04.mdx:43` states "teachers lecture for 30 minutes of a
   35-minute period, leaving only 5 minutes for hurried copying (HEC, 2013)". All four cited
   works were retrieved; none contains this claim. Remove it or cite a source that supports it.
2. **sources (advisory):** `topic-03.mdx:66` cites `(HEC, 2013)` for observer bias, but the HEC
   practicum handbook has no bias discussion; the bound Teach Primary manual does. The coverage
   matrix maps U1-09 to `teach-primary-2021`. Re-cite or drop the attribution.
3. **sources (advisory):** `sources/texts/hec-2013-practicum.md` note 4 claims the handbook
   introduces rating scales and anecdotal records; it clearly covers checklists and reflective
   journals only. The unit's tools section is guide-determined, so this is a note-accuracy repair.
4. **sources (advisory):** `topic-01.mdx:39` cites HEC 2013 for a definition the handbook does not
   give in those terms. Soften to author synthesis or cite a source that defines it.
5. **accessibility (advisory):** figure metadata mismatches - fig-U1-1 alt/prompt name a tools
   column the figure lacks; fig-U1-3 says two questions per area but shows three; fig-U1-6 says six
   scenarios but shows four; fig-U1-8 prompt says five findings but shows four. See
   `figure-metadata-check.md`.
6. **coverage (advisory):** `concepts/unit-01.md` maps six item IDs to concepts they do not assess
   (CON-1+ERQ-01, CON-2+ERQ-01, CON-3+RRQ-01, CON-4+MCQ-04, CON-6+ERQ-03, CON-8+RRQ-10).
7. **assessment (advisory):** ERQ 4's "Exceeds Standard" cell is a set of model rewrites rather
   than a performance descriptor; RRQ 9's scheme does not state the award for four correct steps
   in the wrong order.
8. **accessibility (advisory):** bare-URL link text in the Further reading lists of all four
   topics (render log). Use descriptive link text.
9. **authority (advisory):** the unit/course/assessment front matter still carries the 60/40
   default while the approved content-spec and course overview record the guide's 20/40/20/20.
   Update the field or add an `assessment_weighting_note`.

## Verification highlights

- All 14 `CONTENT_GATES` exit 0 (`logs/check-content.txt`); `measure-figure-text` exits 0 on all
  16 EN SVG variants.
- Production render at the deployed SHA: 6 pages, desktop 1280x900, narrow 360x780, A4 print;
  defects 0; every figure loads; no missing alt; no heading skip; no document overflow; wide
  tables scroll with `tabindex=0`; `clippedElems=0` in print. See `render/render-inspect.json`.
- MCQ key derived independently before reading the supplied key: 10/10 agreement
  (`assessment-solutions.md`).
- Source passages checked against the retrieved PDFs (`source-verification.md`).

## Limitations

- The HEC source notes are not manifest-bound (the prepare key regex captures `hec-2013`); the
  HEC claims were checked against the retrieved PDFs instead.
- The exact reviewer deployment version is unavailable; the model identity is recorded as
  LongCat-2.5.
- This report is advisory. It does not certify the unit, qualify the reviewer, mark G3 done, or
  write a tracker row.
