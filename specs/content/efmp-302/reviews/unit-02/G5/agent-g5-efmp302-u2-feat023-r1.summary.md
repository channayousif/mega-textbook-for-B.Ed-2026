# G5 review summary - EFMP-302 Unit 2, feat023 round 1

Report: `agent-g5-efmp302-u2-feat023-r1.json` (validated). Supersedes
`204c7dfa-2541-4f42-a0a5-4c78ec349d57.json` (2026-09-21, escalated for missing render
access). Reviewer `agent:g5-reviewer`, model LongCat-2.0, author run `commit:47ac733`,
fresh session that did not author or translate this content. Advisory only: no signing,
no tracker or registry change, no gate completion; `translation_status` stays `draft`.

## Disposition: REVISE

One actionable content defect with a precise location and repair request. Everything
else the G5 rubric requires was verified on the current bytes, including the render and
figure-geometry inspection the prior attempt could not perform.

## The blocking finding (B-01)

**The Urdu MCQ 6 answer key omits the English key's uncorroborated-attribution caveat.**
The English key (docs unit-assessment.mdx:196-199) now ends item 6 with "As Topic 2.2
discloses, the primary document could not be opened, so this attribution follows
secondary accounts and is uncorroborated" - the cycle-1 G3 advisory repair, verified
landed in G3 feat023-r2. The Urdu key (i18n unit-assessment.mdx:194-195) ends at
"...ایک ہی معیار کے تحت آتی ہیں۔" with no equivalent sentence, so a learner or marker
reading only the Urdu key takes the Standard 9 attribution as settled fact. The Urdu
taught passage (topic-02.mdx:120-124) carries the disclosure, so the Urdu unit now has
exactly the passage-versus-key asymmetry the English repair closed. Repair: append the
Urdu equivalent of the caveat sentence to the Urdu key item 6 and re-run the gates.
Rendered evidence: `renders-feat023-r1/narrow360-element-assessment-mcq-key.png`,
`print-a4-element-assessment-mcq-key.png`.

## The uncertain finding (U-01): the G3 dependency

No accepted, signed G3 evidence exists (ADR-0019 blocks agent certification). Best
available: the feat023 advisory chain - cycle 1 pass (against the b8f8ffe-broken
figures) and cycle 2 revise, which verified everything except the fig-U2-5 EN label
collision, repaired post-report at 8db9943. The current English inputs are
byte-identical to the G3 r2 binding except those two repaired variants
(`manifest-comparison-g3r2-vs-g5r1.log`), and this review re-measured the repaired
variants clean. Proceeded with the bound English inputs as the authoritative comparison
base and recorded the dependency per the G-2026-30/G-2026-34 pattern. The owner must
either accept the advisory chain or commission a fresh G3 over the current bytes before
any G5 acceptance.

## What this review verified

1. **Complete bilingual comparison** across all seven file pairs (index, topic-01..04,
   unit-assessment, unit-teacher-notes): every section, activity, checklist, practicum,
   summative task, rubric and further-reading entry carried; quantities, dates,
   comparisons, causal claims, pronoun references and instructional sequences
   preserved; the mark/response distinction, Rest's four components, the
   confidentiality-limit formulation and the equity test all carry identical meaning.
   One omission found (B-01).
2. **Assessment equivalence**: all 10 Urdu MCQs solved blind from the Urdu alone
   (1-ب، 2-ج، 3-ب، 4-ب، 5-ج، 6-ج، 7-الف، 8-ج، 9-ب، 10-ب); all correspond to the English
   key via الف/ب/ج/د = a/b/c/d with option order preserved item by item; RRQ marks
   (4,4,4,8,4,5,8,5,5,3), mark schemes, ERQ rubrics and the analysis-floor cap all
   match. No item reveals its answer or changes cognitive demand.
3. **Terminology**: all four key_terms match the bank (terminology.csv:107-110); the
   bank's G5 flag on غور و فکر پر مبنی فیصلہ سازی is answered - the phrase works. All
   18 authored concept labels reviewed and confirmed fit for purpose; six differ in
   wording from the published prose (advisory; promotion into the bank is an owner
   action).
4. **Register**: academic-plain (درسی مگر عام فہم) holds; minor word-choice notes
   recorded as advisories (تفویض for assignment, نقشہ for table, بدعنوانی for
   misconduct).
5. **Rendered inspection** (the prior attempt's blocker, resolved): fresh both-locale
   build, render-inspect over the Urdu route at 1280x900 / 360x780 / A4 print -
   clean on all sections; targeted element captures read by the reviewer (Nastaliq
   legibility, bidi punctuation at line ends, embedded Latin citations and numerals,
   RTL table column order, figure label fit, print rendering).
6. **Urdu figure geometry** (first time measured): all 16 Urdu variants
   (8 figures x .ur.svg/.ur.dark.svg) pass rendered-DOM getBBox + canvas
   ink-intersection with served bytes sha-matched to committed bytes - 0 overlaps, 0
   shared ink; a negative control over the known-bad b8f8ffe .ur.svg bytes detects
   5/6/7 overlapping pairs with real ink collisions, proving the instrument. All 8
   figures mirror their horizontal layout per style-guide v4.1 (stage 1 rightmost,
   row-label columns rightmost, text-anchor swapped). fig-U2-5's Urdu labels are
   disjoint - the EN label collision has no Urdu counterpart. The repaired EN
   fig-U2-5 variants (8db9943) were also re-measured clean.

## Criteria

| Criterion | Status |
|---|---|
| authority | pass |
| sources | pass |
| coverage | pass |
| assessment | **fail** (B-01) |
| accessibility | pass |
| completeness | **fail** (B-01) |
| semantics | **fail** (B-01) |
| terminology | pass |
| register | pass |
| rtl | pass |

## Commands (real logs under `logs-feat023-r1/`, all hashed in the evidence manifest)

`validate:content` 0, `check:depth-gate` 0, `check:figures` 0, `check:no-em-dash` 0,
`check:no-answer-keys` 0, `check:docs-sync` 0, `site-build` 0 (both locales),
`render-review` 0 (full host inspection record), `measure-figure-text` 0 (16 Urdu
variants), `ur-figure-text-overlap` 0 (16 Urdu variants + negative control),
`en-fig-u2-5-repair-check` 0. Evidence: 77 files (logs, JSON, 43 rendered PNGs,
7 print PDFs, 6 measurement instruments).

## Unresolved advisories carried forward

- U2-12 Reflective Decision Making has no direct summative item (blueprint-compliant;
  same as the English bank; from the G3 chain).
- bebeau1999 full text remains unread; record-level support only, boundary declared in
  the sources register (from the G3 chain).
- Six concept labels differ in wording from the published prose; align and promote at
  next revision (owner action).
- Minor register notes (تفویض, نقشہ, بدعنوانی, تحقیر, والدہ, نماز) and the fig-U2-1
  cosmetic wordmark graze (reported-not-failed class).

## Next step

An author appends the caveat sentence to the Urdu MCQ 6 key (one-line repair, both
languages then match); the parent prepares a new manifest; a fresh reviewer rechecks.
The G3 dependency (U-01) needs an owner decision regardless. This report is advisory
until protected qualification and acceptance checks succeed; nothing here marks a gate
done.
