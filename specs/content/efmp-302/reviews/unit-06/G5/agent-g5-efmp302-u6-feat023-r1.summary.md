# G5 review summary - EFMP-302 Unit 6 (Urdu mirror), feat023 cycle 1

- Report: `specs/content/efmp-302/reviews/unit-06/G5/agent-g5-efmp302-u6-feat023-r1.json`
- Disposition: **revise** (advisory; not a sign-off. ADR-0019: agent certification is not
  provisioned, and `translation_status` stays `draft`.)
- Reviewer: `agent:g5-reviewer` (run `agent-g5-efmp302-u6-feat023-r1`, model LongCat-2.0),
  fresh session; author run `commit:1da5f6b`.
- Compared: all seven English/Urdu file pairs of `docs/semester-1/efmp-302/unit-06/` vs
  `i18n/ur/.../unit-06/`, the 8 figures x 4 variants, the frozen terminology bank, the
  concept/coverage/sources/figure governance tables, and the rendered Urdu pages.
- Input binding verified with `scripts/lib/review-evidence.mjs`: 125 paths, zero digest
  mismatches, skill digest match, no dirty inputs. The English bytes are unchanged since the
  feat023-r1 advisory G3 (99 shared paths, zero differences).

## Criteria

| Criterion | Status | One-line reason |
|---|---|---|
| authority | pass | All guide section 6 content and both SLOs taught and assessed in Urdu; the unit's spine (principles, stages, routes, plan) survives translation |
| sources | pass | Every citation and every disclosure (Kwakman question-only, Hennessy scope, two no-external-source passages) retains its supporting meaning in Urdu; the English-side S1/S2 blockers are owner-gated (G-2026-64), not Urdu defects, and are recorded in the dependency finding |
| coverage | pass | All 13 sub-topics taught; the 10/10/5 bank keeps the English blueprint and per-topic distribution |
| assessment | pass | Urdu MCQ key derived independently and identical to the English key (option order preserved); RRQ/ERQ mark schemes, 10-cap floor and integrative ERQ 5 equivalent |
| accessibility | pass | Rendered Urdu pages clean at 1280x900 / 360x780 / A4 print: headings ordered, alt text everywhere, scrollers reachable, zero clipping; all 16 Urdu figure variants geometrically clean |
| completeness | **fail** | fig-U6-7's Urdu variants omit three of the four English margin notes (19 vs 22 texts, one note box vs two, an orphaned leader line), while the SVG desc and MDX alt promise the missing "decided now" note |
| semantics | **fail** | Faithful overall, but: "rather than in marking" garbled into a self-contradiction (teacher notes:69), "serving teachers" rendered "فرضی استاد" (imaginary teachers, :53), "harder than it sounds" weakened to "as difficult as" (topic-04:76), "at least three" dropped (:101-102) |
| terminology | pass | Both key_terms bank-exact; Unit 2's banked Reflective Decision Making correctly kept distinct; 12 of 13 authored concept labels confirmed, CON:6-6 "preservice = تربیت سے پہلے کا مرحلہ" flagged as a misleading calque for the owner |
| register | **fail** | Academic-plain holds overall, but typos sit in learner-facing text (متبعل inside MCQ 3's stem, ذتی x2, ملاا, پسائی x2, اوپر کا شکل x5), untranslated "quote"/"فریمنگ", and the استادِ تربیت calque |
| rtl | pass | Every page dir="rtl"; all eight figures correctly mirror horizontally (timeline runs right-to-left, stations numbered R-to-L, row labels right); Nastaliq ink confirmed by pixel probe; bidi/numerals/Latin glosses clean |

## Blocking finding

**fig-U6-7 Urdu omission.** `static/img/figures/efmp-302/unit-06/fig-U6-7.ur.svg` and
`.ur.dark.svg` carry only "ایک، پانچ نہیں۔" (One, not five.) of the English figure's four
margin notes. Missing: "Five goals is a list of regrets by March.", "Decided now, not in
March.", "Evidence chosen later always flatters." - the last two are the evidence-decided-now
rule that RRQ 9 and ERQ 4/5 assess. The second leader line is drawn pointing at the missing
box (a visible dangling arrow), and both the SVG `<desc>` and the MDX alt text promise the
missing note. Repair: add the second note box and the three lines to both variants (mirrored
per `scripts/mirror-figure-rtl.mjs`), or descope the alt/desc to match what is drawn.

## Uncertain finding (the G3 dependency, G-2026-65 pattern)

No signed G3 evidence exists for the exact English inputs (ADR-0019 blocks agent
certification). The best available is the feat023-r1 advisory ESCALATE
(`.../G3/agent-g3-efmp302-u6-feat023-r1.json`: six of seven criteria pass; sources fails on
S1/S2, both owner-gated as G-2026-64). This review verified the English bytes are unchanged
since that G3 and used them as the authoritative comparison base. The English-side sources
blockers are not Urdu defects - the Urdu carries the same attributions and every disclosure -
but the dependency cannot be discharged by signed evidence by this reviewer, and it alone
forbids a pass disposition regardless of the content repairs.

## Advisory findings (unresolved)

1. Added learner-facing parenthetical in topic-03 (Urdu) distinguishing this unit's
   غور و فکر بطور طریقہ کار from Unit 2's banked غور و فکر پر مبنی فیصلہ سازی - accurate
   and useful, but absent from the English source; owner should accept or mirror it.
2. Teacher notes:69 garbled "rather than in marking"; :53 "فرضی استاد" for serving teachers;
   :101-102 "at least three" dropped; :112 "polite" -> "جھوٹی".
3. topic-04:76 comparative lost ("harder than" -> "as difficult as").
4. Register bundle: متبعل (x2, one inside MCQ 3's stem), ذتی (x2), ملاا, پسائی (x2), نششت,
   ناکام نہیں ہے رہی, اوپر کا شکل (x5), ایسی نظریہ (fig-U6-4.ur), "quote" (x2), فریمنگ (x4),
   استادِ تربیت calque.
5. CON:6-6 preservice label flagged (تربیت سے پہلے کا مرحلہ reads "before training"; the
   stage is the training) - owner term decision, used consistently.
6. Stale preamble in `specs/content/efmp-302/figures/unit-06.md` ("no Urdu mirror on disk").
7. Carried G3 advisories that apply equally to the Urdu mirror (scroller names, small table
   text, RRQ 4 stem ambiguity carried identically, mirrored reviewer-register sentences,
   U6-07 no dedicated conference item).

## Render verification

The shared two-locale build (commit 219960c) was verified current for Unit 6 Urdu by 35
verbatim prose probes (33 exact; 2 present behind JSX word-splits) - no rebuild was needed
or run. The build was served on port 4628 and inspected in Chromium 149.0.7827.0: desktop,
narrow and A4 print all clean (exit 0, zero defects); all 16 Urdu SVG variants measured
clean for text-on-text, wordmark, rect-escape and viewBox geometry; Nastaliq ink confirmed
by pixel probe. Disclosed limitation: the image tool returned visual content for one
full-page render only; the remaining inspection is numeric/DOM/pixel, with all artifacts
under `renders-feat023-r1b/` for human audit.

Advisory only. A separate author repairs the content, the parent prepares a new manifest,
and a fresh reviewer rechecks; at most two repair/review cycles per stage per submission.
