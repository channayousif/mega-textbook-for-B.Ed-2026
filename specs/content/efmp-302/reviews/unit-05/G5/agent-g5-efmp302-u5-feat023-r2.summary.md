# G5 Urdu review - EFMP-302 Unit 5 (feat023-r2, cycle 2)

- Report: `specs/content/efmp-302/reviews/unit-05/G5/agent-g5-efmp302-u5-feat023-r2.json` (validated)
- Disposition: **escalate** (advisory; not certification; `translation_status` stays `draft`)
- Reviewer: `agent:g5-reviewer` / run `agent-g5-efmp302-u5-feat023-r2` / model LongCat-2.0
- Author run: `commit:1da5f6b`; inputs bound by `feat023-r2/manifest.json` (131 paths, verified 131/131 with the contract's own `inputManifest()`, no refresh; re-confirmed at current HEAD `e99c1a2` after unrelated Unit 6 commits landed in the worktree)
- Supersedes: `agent-g5-efmp302-u5-feat023-r1.json` (cycle 1, revise)
- G3 dependency: `specs/content/efmp-302/reviews/unit-05/G3/agent-g3-efmp302-u5-feat023-r1.json` (advisory pass, all seven criteria; its English digests are identical to this review's English inputs, verified path by path)

## All nine cycle-1 blocking repairs verify

Each confirmed in the source bytes, in the served build (freshness probe, no rebuild) and at native scale in rendered crops:

1. topic-02.mdx:45 - stance now `اس سے اختلاف نہیں کرتا` (does not dispute it); context consistent.
2. topic-04.mdx:89-90 - `مگر موجود بھی ہیں` (but they do exist) before the four-resource list.
3. topic-03.mdx:71-72 - `ان کی لاگت` (cost) restored; the add/cost/depend/replace parallel intact.
4. topic-02.mdx:50-51 - `تضاد` for Isoré's "tension" (Unit 4-consistent; تناوب gone).
5. topic-02.mdx:51-52 - `نتیجہ لاگو کرتے ہیں` (impose consequences restored).
6. unit-assessment.mdx:199-200 - RRQ 1 pt 4 contrast now محنت اور خلوص vs رسمی فرض.
7. fig-U5-4.ur.svg + .ur.dark.svg - Law row recognition cell `ملے جلے` = EN "Mixed".
8. fig-U5-8.ur.svg + .ur.dark.svg - station 1 label now the real word `نظم و ضبط`.
9. unit-assessment.mdx:245 - "fixed" now translated: `ہٹانے والے اور نہ ہٹنے والے الگ`.

## Criteria

| Criterion | Status | In one line |
|---|---|---|
| authority | pass | All six outcomes taught and assessed in Urdu; heading (7/15/13/12/12/10/7), checklist (6/5/5/5) and frontmatter parity exact; four-for-three split disclosure preserved |
| sources | pass | All eight source keys keep their supporting meaning; the Isoré passage (تضاد) and impose-consequences repaired and verified |
| coverage | pass | All twelve sub-topics taught, nine-part cycles complete, nothing outside the guide added; depth gate exit 0 |
| assessment | pass | All ten MCQ keys re-derived from the Urdu prose (option order الف-ب-ج-د maps to a-b-c-d, keys match EN 10/10); RRQ totals 50; ERQ rubrics and the 10-cap preserved; repairs 6 and 9 verified |
| accessibility | pass | Desktop/narrow/A4 print clean on all seven pages; figures are scroll containers; Urdu alt text; Nastaliq webfont loads with correct bidi, digits and embedded Latin |
| completeness | pass | The untranslated "fixed" repaired; structural parity exact; residual additions (heading "اور اختتام", MCQ 7 autonomy drop, "اگلے ہفتے") stay advisory |
| semantics | pass | All three inversions/garbles repaired and verified in context; full-pair read of all seven file pairs clean on the load-bearing passages; epistemic "may" preserved |
| terminology | pass | All four key_terms bank-exact; تضاد consistent with Unit 4; ششہ replaced by نظم و ضبط; the 14 authored concept labels fit for promotion (two minor notes carried) |
| register | **fail** | Genuinely academic-plain overall, but the cycle-1 batch is unrepaired: 7 typos, 9+ gender-agreement slips, 4 code-mixed "quote" verbs, شہادت for "evidence", ورک لوڈ/کام کا بوجھ alternation - all advisory-severity, none inverts meaning; one proofreading pass clears it |
| rtl | pass | RTL mirroring correct on both flowcharts and the regions diagram; zero overflow/collision over all 16 Urdu variants; both figure repairs verified in the rendered pages; narrow and A4 clean |

## Why escalate, not pass

1. **The G3 dependency remains undischargeable by signed evidence** (G-2026-65 pattern, carried unresolved from cycle 1). ADR-0019 blocks agent certification, so no signed G3 exists; the best available is the unsigned feat023-r1 advisory pass, whose English inputs are byte-identical to this review's. Owner-side resolution (signed G3 or owner-accepted equivalent) is required before any certified G5 pass. This alone forbids a pass.
2. **The two-cycle repair budget is exhausted** with the register batch and the smaller advisories outstanding; a third agent repair cycle is prohibited by the skill, so those items go to the owner rather than back for revision.

## Unresolved findings (full list in the report)

- 1 uncertain: the G3 dependency (above).
- Advisories: the register/orthography batch (current loci listed); the smaller semantic shifts and additions (MCQ 3 اصول, MCQ 7 key autonomy drop, "اگلے ہفتے", "اور اختتام", "یہی وہ تھکن کا پہلو" ambiguity, descriptive "اسی وقت", "بے خبر", the marking-exchange muddle); لچک polysemy (elasticity vs resilience); the carried G3 advisories that mirror into Urdu (blooms_summary counts, ten bare-URL links, fig-U5-7 footer claim, teacher-notes cross-reference, RRQ 2 stem); the stale figures/unit-05.md governance prose ("no Urdu mirror on disk", "three flowcharts"); the environment limitations (no system Nastaliq for SVG-internal text; the dark-theme re-shot driver limitation - dark variants verified from source bytes and build byte-identity); two new minor figure notes (fig-U5-8's third resource label lacks its EN background box; بینڈوتھ transliteration in fig-U5-5).

## Commands (all exit 0, logs under `logs-feat023-r2b/`)

`validate:content`, `check:depth-gate`, `check:figures`, `check:no-em-dash`, `check:no-answer-keys`, `check:docs-sync`, `site-build` (freshness probe of the shared 219960c build - every repaired passage found in the built Urdu HTML, all 16 Urdu figure assets byte-identical; NOT a rebuild), `render-review` (render-inspect on port 4627, Chromium 149.0.7827.0, sections A-D clean, defects 0, plus the reviewer's visual inspection record), `measure-figure-text` (all 16 Urdu variants clean), `verify-inputs` (131/131, no refresh), `targeted-shots` (native-scale crops of all seven repaired loci, the MCQ options/key, and both repaired figures; Nastaliq/bidi env facts). 50 evidence files hashed, including 27 rendered PNGs and 7 print PDFs.
