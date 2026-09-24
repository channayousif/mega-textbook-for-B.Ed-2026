# G5 Urdu review - GICT-300 Unit 6 (Internet Applications and Emerging Technologies)

Run: `agent-g5-gict300-u6-run001` | Reviewer: `agent:g5-reviewer` | Model: LongCat-2.0
Started 2026-09-24T03:27:31Z, completed 2026-09-24T04:15Z | Disposition: **revise**
Report: `specs/content/gict-300/reviews/unit-06/G5/agent-g5-gict300-u6-run001.json` (validated)
Skill digest: `02797f90...` (matches the prepared manifest)

## What was reviewed

All seven Urdu files (`i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-06/`:
index with key_terms, topic-01..04, unit-assessment, unit-teacher-notes) against the English at
`docs/semester-1/gict-300/unit-06/`, plus the eight `.ur.svg`/`.ur.dark.svg` figure variants.
The prepared manifest's 125 input digests and the skill digest were recomputed with
`inputManifest()`/`skillDigest()` and verified byte-identical at HEAD `86bb248` (manifest prepared
at `923cb4d`; the intervening commit touched no bound input).

## Dependency on G3 (weighed and recorded)

The bound G3 report (`agent-g3-gict300-u6-20260923T171945671Z.json`, advisory run 001,
disposition **pass**) binds English unit files digest-identical to this review's manifest (all
nine `docs/semester-1/gict-300` files verified). The one changed shared bound input is
`sources/texts/bourgeois2019.md` (`f0df51fb` -> `124b394b`, via `a7200d2`/`90b097a`): a
chapter-3 "Used for" annotation serving Unit 3, and a chapter-6 I Love You sentence serving
Unit 4's repair. Unit 6 cites only the unchanged chapter-13 IoT excerpt and the chapter-5
framing layer, and unit-06 prose never references the changed chapter-6 sentence (grep: zero
hits). The dependency is judged applicable for this advisory review - the same reasoning as the
Unit 2 G5 run001 - with the unsigned/advisory nature of the G3 disclosed (finding 8). A fresh
signed G3 is required before certified acceptance.

## Criteria

| Criterion | Status | Note |
|---|---|---|
| authority | pass | Guide bullets taught and assessed in Urdu; clo_refs identical; outcomes one-to-one |
| sources | pass | All citations preserved; Bourgeois quotation, UNESCO rule, Stair & Reynolds disclosure carried |
| coverage | pass | All 8 sub-topics taught and assessed in Urdu; activities, misconceptions, figures complete |
| assessment | pass | All 10 MCQs independently solved from Urdu alone; keys and marks identical to English |
| accessibility | pass | Rendered Urdu clean at desktop/360px/A4 print; Urdu alt text; answers render in print |
| completeness | fail | Untranslated "no" branch label in fig-U6-3.ur(.dark).svg (blocking) |
| semantics | pass | Negation, modal force, quantities, causal claims preserved in every prose passage |
| terminology | fail | Figure/prose drift (augmented-reality spelling, honest, classroom, tracking, taglines) |
| register | fail | Garbled "بغیر جاے بجھے" in fig-U6-6.ur(.dark).svg (blocking); minor agreement slips in prose |
| rtl | pass | dir=rtl clean; bidi, numerals, embedded Latin and figure mirroring all correct |

## Blocking findings (repair requests)

1. **Untranslated branch label "no"** - `static/img/figures/gict-300/unit-06/fig-U6-3.ur.svg`
   and `fig-U6-3.ur.dark.svg`, text element at x=268 y=236. The English figure's "no" branch
   label was left in Latin while the parallel "yes" branch is translated ("ہاں"), leaving the
   Urdu flowchart internally inconsistent. Visible on the rendered page
   (`render-inspect-ur/crops/crop-narrow-topic02-figs.png`). Repair: "نہیں" in both variants.
2. **Garbled phrase "بغیر جاے بجھے"** - `static/img/figures/gict-300/unit-06/fig-U6-6.ur.svg`
   and `fig-U6-6.ur.dark.svg`, IoT sensor row, school-use cell, for English "tank levels and
   bills without site visits". "جاے بجھے" is not an intelligible Urdu construction; the cell's
   meaning is not cleanly recoverable. Visible on the rendered page
   (`render-inspect-ur/crops/crop-desktop-topic03-mid.png`). Repair: e.g.
   "بغیر جگہ کا دورہ کیے ٹینک کی سطح اور بل".

## Advisory findings (7, unresolved)

- Augmented-reality spelling drift: figures "اگمنٹڈ رئیلٹی" vs prose/key_terms
  "آگمنٹڈ ریئلٹی" (6 vs 16 occurrences).
- Figure/prose terminology drift: fig-U6-8 tagline ("ڈبوتی ہے... لیبل لگاتی ہے" vs prose
  "غرق کرتا ہے... حاشیہ لگاتا ہے"); "honest" (ایماندار vs دیانتدار); "classroom"
  (جماعتی vs کلاس روم); fig-U6-2's "سراغ" for tracking, Latin "assignment", and a tagline
  that loses "match".
- Concept label CON:GICT-300-6-11 uses tamper-resistant wording ("بدلاؤ سے محفوظ") where the
  prose and the taught property are tamper-evident ("بدلاؤ کا پتہ چلنے والا"); align before
  banking. The other 14 G5-flag labels confirmed good.
- Minor prose agreement slips (سرخ اسکرین/والے; مثال agreement; والد for generic parent).
- Bloom Apply-tag corpus split (unit 2 "اطلاق" vs the rest "لاگو کرنا") - owner item.
- G3 dependency status (above).
- Environment: as-is gates red solely from the stale geng-300 tree (zero GICT-300 findings);
  all six green in the repaired overlay with all 125 bound inputs re-verified identical.
  A concurrent session modified unit-05's Urdu assessment in this worktree mid-review
  (ERQ-2 Bloom tag repair); that file is not a bound input of this review and the report
  re-validated unchanged after the event.

## Commands (real exit codes)

As-is worktree: validate:content 1, depth-gate 1, figures 1, no-em-dash 1, no-answer-keys 1,
docs-sync 0 (every failure geng-300-attributed). Repaired overlay
(`/tmp/gict300-u6-g5-aed74e6f`): all six 0. Pipeline gate (worktree) 1 (geng-300 tasks.md
only; zero unit-06 findings - UR key_terms parse, EN-UR parity holds). Build 0 (both locales).
render-review 0 (7 pages x 3 viewports, 16 Urdu SVG variants, 0 defects; chromium
149.0.7827.0 over `docusaurus serve`). Load average 0.60-3.59 on 2 cores throughout; one
build + one render pass per the capacity directive.

## What would make this a pass

Repair the two blocking figure labels (plus, ideally, the advisory spelling/terminology
alignment on the same figures), re-run `figures:variants:check` and `check:figures`, then a
fresh G5 attempt over a newly prepared manifest. The prose translation itself needs no repair.
This report is advisory under ADR-0019: it does not certify the unit, write any tracker row,
or flip `translation_status`.
