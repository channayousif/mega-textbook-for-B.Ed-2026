# G5 review summary - EFMP-302 Unit 2, feat023 round 2

Report: `agent-g5-efmp302-u2-feat023-r2.json` (validated). Supersedes
`agent-g5-efmp302-u2-feat023-r1.json` (2026-09-24, revise on one blocking finding).
Reviewer `agent:g5-reviewer`, model LongCat-2.0, author run `commit:86ce1dd`, fresh
session that did not author or translate this content. Advisory only: no signing, no
tracker or registry change, no gate completion; `translation_status` stays `draft`.

## Disposition: ESCALATE

Not because anything is wrong with the Urdu. All ten G5 criteria pass on the current
bytes, the cycle-1 blocking finding is repaired and verified, and no content repair
is requested. The escalation carries exactly one unresolved uncertain finding: the
G3 dependency. The contract forbids a `pass` while any unresolved blocking or
uncertain finding stands, and `revise` would be false (there is no defect left to
repair). The owner decision that closes G-2026-65 is now the only thing between this
unit and a pass disposition.

## The cycle-1 blocking finding (B-01): REPAIR VERIFIED

The Urdu MCQ 6 answer key now carries the uncorroborated-attribution caveat. Commit
86ce1dd appends to the Urdu key item 6 (i18n unit-assessment.mdx:194-197):

> جیسا کہ موضوع 2.2 بیان کرتا ہے، بنیادی دستاویز کھولی نہیں جا سکی، چنانچہ یہ نسبت
> ثانوی بیانات پر چلتی ہے اور غیر مصدقہ ہے۔

This is a faithful rendering of the English key caveat (docs unit-assessment.mdx:196-199,
"As Topic 2.2 discloses, the primary document could not be opened, so this attribution
follows secondary accounts and is uncorroborated") and uses the same disclosure
vocabulary as the Urdu taught passage (topic-02.mdx:120-124). The passage-versus-key
asymmetry is closed: a learner or marker reading only the Urdu key now sees the same
qualification as the English key. The sentence renders completely at 1280px, 360px and
A4 print (`renders-feat023-r2/desktop-element-assessment-mcq6-key.png`,
`narrow360-element-assessment-mcq6-key.png`, `print-a4-element-assessment-mcq6-key.png`)
and is present verbatim in the served build (`logs-feat023-r2/site-build.log`). The
r1-to-r2 manifest diff confirms the Urdu unit-assessment.mdx was the ONLY input that
changed since cycle 1, so nothing else could have regressed.

## The uncertain finding (U-01): the G3 dependency - the escalation reason

No accepted, signed G3 evidence exists (ADR-0019 blocks agent certification;
G-2026-65). Best available: the feat023 advisory chain - G3 cycle 1 pass (against the
b8f8ffe-broken figures) and cycle 2 revise (fig-U2-5 EN label collision repaired
post-report at 8db9943). This cycle independently verified the current English inputs
are byte-identical to the G3 r2 binding except those two repaired fig-U2-5 EN variants,
and re-measured both clean (`manifest-comparison-g3r2-vs-g5r2.log`,
`en-fig-u2-5-repair-check.log`). The review proceeded with the bound English inputs as
the comparison base per the G-2026-30/G-2026-34 pattern. Needed from the curriculum
owner: (a) accept the advisory chain as sufficient for the G5 stage, or (b) commission
a fresh G3 over the current English bytes. Until then no G5 tracker row can be marked
done from agent findings.

## What this review verified (fresh session, current bytes)

1. **Inputs**: all 127 manifest paths hash-verify against current bytes; only the
   repaired Urdu assessment file differs from cycle 1 (`verify-manifest.log`).
2. **Assessment equivalence**: all 10 Urdu MCQs solved blind from the Urdu questions
   alone before reading any key (1-ب، 2-ج، 3-ب، 4-ب، 5-ج، 6-ج، 7-الف، 8-ج، 9-ب، 10-ب);
   the Urdu key matches on all ten and corresponds to the English key item by item;
   RRQ marks (4,4,4,8,4,5,8,5,5,3), mark schemes, ERQ rubrics and the analysis-floor
   cap all match; no item reveals its answer or changes cognitive demand.
3. **Bilingual comparison**: all seven file pairs read and compared this cycle
   (index, topic-01..04, unit-assessment, unit-teacher-notes) - every section,
   activity, checklist, practicum, summative task, rubric and further-reading entry
   carried; quantities, dates, modal force, causal claims, pronoun references and
   instructional sequences preserved; every uncorroborated-attribution disclosure
   now has its Urdu counterpart in prose, taught passage AND key.
4. **Terminology**: all four key_terms match the bank (terminology.csv:107-110); the
   bank's G5 flag on غور و فکر پر مبنی فیصلہ سازی is answered again - the phrase
   works. All 18 authored concept labels confirmed fit; six wording variances from
   the prose carried as an advisory (promotion is an owner action).
5. **Rendered inspection**: shared build at 86ce1dd, freshness verified (the repaired
   caveat renders in the served page); render-inspect clean at 1280x900 / 360x780 /
   A4 print - 0 defects, 0px overflow, tables fit, figures scroll-contained, 0
   clipped elements; the reviewer read 10 targeted element captures plus the
   full-page captures directly (Nastaliq, bidi punctuation, embedded Latin, RTL
   table order, figure labels, print). One operational note: a stale orphaned
   python3 http.server was squatting on the assigned port 4621 (serving a deleted
   directory from a finished session); it was terminated before inspection and the
   incident is recorded in `render-review.log`.
6. **Figure geometry**: measure-figure-text clean over all 16 Urdu variants and the
   two repaired EN fig-U2-5 variants.

## Criteria

| Criterion | Status |
|---|---|
| authority | pass |
| sources | pass |
| coverage | pass |
| assessment | pass (B-01 repair verified) |
| accessibility | pass |
| completeness | pass (B-01 repair verified) |
| semantics | pass (B-01 repair verified) |
| terminology | pass |
| register | pass |
| rtl | pass |

## Commands (real logs under `logs-feat023-r2/`, all exit 0, hashed in the evidence manifest)

`validate:content`, `check:depth-gate`, `check:figures`, `check:no-em-dash`,
`check:no-answer-keys`, `check:docs-sync`, `site-build` (freshness evidence for the
shared build, not a rebuild), `render-review` (full host inspection record),
`measure-figure-text` (16 Urdu variants), `en-fig-u2-5-repair-check`,
`verify-input-manifest`, `manifest-comparison-g3r2-vs-g5r2`, `repair-diff-86ce1dd`,
`ur-element-inspect`. Evidence: 52 files (logs, JSON, 24 rendered PNGs, 7 print PDFs,
3 instruments).

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

This is the second and final repair/review cycle for this stage of this submission.
The Urdu content itself is verified complete and faithful at G5 on the current bytes;
what remains is the owner decision on the G3 advisory chain (G-2026-65), not an author
repair. If the owner accepts the chain, a fresh G5 run over unchanged inputs can
return pass; if not, a fresh G3 over the current English bytes comes first. This
report is advisory until protected qualification and acceptance checks succeed;
nothing here marks a gate done.
