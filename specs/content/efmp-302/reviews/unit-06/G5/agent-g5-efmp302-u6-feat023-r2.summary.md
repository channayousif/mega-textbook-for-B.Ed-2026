# G5 review summary - EFMP-302 Unit 6 (Urdu mirror), feat023 cycle 2

- Report: `specs/content/efmp-302/reviews/unit-06/G5/agent-g5-efmp302-u6-feat023-r2.json`
- Disposition: **escalate** (advisory; not a sign-off. ADR-0019: agent certification is not
  provisioned, and `translation_status` stays `draft`.)
- Reviewer: `agent:g5-reviewer` (run `agent-g5-efmp302-u6-feat023-r2`, model LongCat-2.0),
  fresh session; author run `commit:87ed3f39`. Supersedes the cycle-1 report
  (`agent-g5-efmp302-u6-feat023-r1.json`, disposition revise).
- Compared: all seven English/Urdu file pairs of `docs/semester-1/efmp-302/unit-06/` vs
  `i18n/ur/.../unit-06/`, the 8 figures x 4 variants, the frozen terminology bank, the
  concept/coverage/sources/figure governance tables, and the rendered Urdu pages.
- Input binding verified with `scripts/lib/review-evidence.mjs`: 125 paths, zero digest
  mismatches, skill digest match, no dirty inputs. The English bytes are identical to what
  both the feat023-r1 advisory G3 and the cycle-1 G5 reviewed; the only changes since
  cycle 1 are the 7 Urdu-side paths of repair commit e99c1a2.

## The cycle-1 blocking repair VERIFIES

**fig-U6-7's Urdu variants now draw all four English margin notes.** Both
`fig-U6-7.ur.svg` and `.ur.dark.svg` carry 22/22 text elements (was 19), two note boxes
(was one) - "ایک، پانچ نہیں۔", "پانچ ہدف مارچ تک افسوسوں کی فہرست ہوتے ہیں۔" (added),
"ابھی طے کیجیے، مارچ میں نہیں۔" (added), "بعد میں چنی گئی شہادت ہمیشہ داد دیتی ہے۔"
(added) - and both leader lines now terminate at a real box. Verified four ways: bytes
(`figure-text-parity.log`), served build (`build-freshness.log`), in-render DOM
(`figure-geometry-overlap-ur.log`, `pixel-probe-fig-u6-7.log`), and pixel ink
(0.088-0.107 in both note regions vs 0.000 control). The alt/desc promises are kept.

All six wrong-word repairs also verify, with no regressions: متبادل x2 (one inside
MCQ 3's quoted stem), ذتی->ذاتی x2, نہیں ملا, the rebuilt "نشست کے دوران لاگو کیجیے،
نمبر دہی میں نہیں" sentence, فرضی استاد->زیرِ خدمت استاد.

## Criteria - all ten pass on the current bytes

| Criterion | Status | One-line reason |
|---|---|---|
| authority | pass | All guide section 6 content and both SLOs taught and assessed in Urdu; the spine (principles, stages, routes, plan) survives; English base unchanged since the G3 and cycle-1 G5 |
| sources | pass | Every citation and every disclosure retains its supporting meaning in Urdu; the English-side S1/S2 blockers are owner-gated (G-2026-64), not Urdu defects |
| coverage | pass | All 13 sub-topics taught; the 10/10/5 bank keeps the English blueprint and per-topic distribution; reading minutes 133 in band |
| assessment | pass | Urdu MCQ key re-derived independently and identical to the English key (1a 2d 3c 4b 5c 6a 7d 8b 9c 10a); RRQ/ERQ mark schemes, 10-cap floor and integrative ERQ 5 equivalent |
| accessibility | pass | Rendered Urdu pages clean at 1280x900 / 360x780 / A4 print (exit 0, zero defects); all 16 Urdu figure variants geometrically clean; the repaired fig-U6-7 verified in DOM and pixels |
| completeness | pass | The fig-U6-7 omission repaired and verified four ways; all eight figures at EN/UR text parity; only the advisory "at least three" drop remains |
| semantics | pass | The two material cycle-1 defects repaired (session-vs-marking, serving teachers); remaining shifts (harder-than, at-least-three, not-unlucky, polite) are advisory |
| terminology | pass | Both key_terms bank-exact; CON:6-14 label now correctly spelled; 12 of 13 authored labels confirmed, CON:6-6 still flagged for the owner |
| register | pass | The learner-facing/assessment typos repaired; remaining items (پسائی x2, اوپر کا شکل x5, نہیں ہے رہی, ایسی نظریہ, "quote" x2, فریمنگ x4, استادِ تربیت) are advisory |
| rtl | pass | Every page dir="rtl"; all eight figures correctly mirrored, including the repaired figure's new note boxes and leader lines; Nastaliq ink confirmed by pixel probes |

## Why escalate and not pass

1. **The G3 dependency (uncertain, G-2026-65 pattern).** No signed G3 evidence exists for
   the exact English inputs (ADR-0019 blocks agent certification). The best available is
   the feat023-r1 advisory ESCALATE (sources fails on S1/S2, owner-gated as G-2026-64).
   This cycle re-verified the English bytes are unchanged since that G3. The blockers are
   English-side owner decisions, not Urdu defects, but the dependency cannot be discharged
   by this reviewer and alone forbids a pass.
2. **The two-cycle repair budget is exhausted.** The remaining content items are small
   advisories (below) best batched into the owner's content-improvement loop rather than
   a third repair/review cycle.
3. **Two items are owner decisions, not translator repairs:** the added topic-03
   parenthetical (accept or mirror into English) and the CON:6-6 preservice label.

## New this cycle: an instrument correction (advisory)

fig-U6-2's dashed "rules out" boxes are too narrow for their longest lines in BOTH
locales: 3 escaping lines in the Urdu variants (left by 5.5-37.0px) and 4 in the English
originals (right by 15.4-25.1px). The cycle-1 report's claim that the English overflows
"do not reproduce in the Urdu variant" was an artifact of the cycle-1 instrument, whose
startsInside gate structurally skipped right-anchored RTL text escaping left. Inherited
from the English design (G3 advisory X2 class), unchanged since cycle 1, no overlap or
clipping - cosmetic; fix both locales together in the owner's loop.

## Unresolved advisories (preserved from cycle 1 unless noted)

1. Added learner-facing parenthetical in topic-03 (Urdu) distinguishing this unit's
   غور و فکر بطور طریقہ کار from Unit 2's banked term - accurate, but absent from the
   English source; owner should accept or mirror it.
2. topic-04:76 comparative lost ("harder than" -> "as difficult as").
3. Teacher notes:101-102 "at least three" dropped; :112 "polite" -> "جھوٹی";
   topic-02:102 "not unlucky" -> "not unusual".
4. Register bundle: پسائی (x2), اوپر کا شکل (x5), ناکام نہیں ہے رہی, ایسی نظریہ
   (fig-U6-4.ur), "quote" (x2), فریمنگ (x4), استادِ تربیت calque.
5. CON:6-6 preservice label flagged (تربیت سے پہلے کا مرحلہ reads "before training";
   the stage is the training) - owner term decision.
6. Stale preamble in `specs/content/efmp-302/figures/unit-06.md` ("no Urdu mirror on disk").
7. fig-U6-2 rules-out box overflow in both locales (new finding, inherited from English).
8. Carried G3 advisories that apply equally to the Urdu mirror (scroller names, small
   table text, RRQ 4 stem ambiguity carried identically, mirrored reviewer-register
   sentences, U6-07 no dedicated conference item).

## Render verification

The shared two-locale build (commit 87ed3f39, after the repair) was verified current for
Unit 6 Urdu by probes for every repaired sentence and all four fig-U6-7 margin notes in
the built assets - no rebuild was run. Because the instrument's internal `npm run serve`
spawn dies in this sandbox, an equivalent in-process static server served the same
`build/` directory on the same port 4629 and the same `render-inspect.mjs` ran against
it (recorded as a deviation in `render-review.log`). Desktop, narrow and A4 print all
clean (exit 0, zero defects); all 16 Urdu SVG variants measured clean for text-on-text,
wordmark and viewBox geometry; the repaired figure's note boxes confirmed by DOM
measurement and pixel ink. Disclosed limitation: the image tool returned visual content
for one full-page render only (`desktop-topic-04.png`); the rest is numeric/DOM/pixel,
with all artifacts under `renders-feat023-r2/` for human audit.

Advisory only. A separate author repairs content, the parent prepares a new manifest,
and a fresh reviewer rechecks; at most two repair/review cycles per stage per submission
(this was cycle 2 of 2, so remaining items route to the owner).
