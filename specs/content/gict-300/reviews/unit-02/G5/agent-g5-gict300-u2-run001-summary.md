# G5 Urdu review - GICT-300 Unit 2 (run 001)

- Reviewer: `agent:g5-reviewer` (fresh session; did not author or translate these bytes)
- Model: LongCat-2.0
- Reviewed state: worktree HEAD 5005f2e (prepared manifest commit), all 125 bound inputs
  re-verified digest-identical (including after a concurrent session moved HEAD to 5d30070,
  a PHR-only commit touching no bound input)
- Translator run: G4 campaign at commit a7200d2, recorded in
  `history/prompts/gict-300/0037-g4-urdu-translation.green.prompt.md`
- G3 dependency: `specs/content/gict-300/reviews/unit-02/G3/agent-g3-gict300-u2-run001.json`
  (advisory run 001, disposition pass); all nine English unit files digest-identical
- Disposition: **revise** (three blocking content defects, all in Urdu figure variants and
  one alt text; the MDX prose translation itself is faithful, complete and in register)

## What was compared

All seven file pairs passage by passage (index, topic-01..04, unit-assessment,
unit-teacher-notes), plus all 16 Urdu figure SVG variants against their English
counterparts, the terminology bank, the concept graph's G5-flag list, the coverage and
sources tables, and the rendered `/ur/` site (desktop 1280x900, narrow 360x780, A4 print
with PDFs, chromium 149.0.7827.0).

## Blocking findings (repair before pass)

1. **Chinese characters in fig-U2-4's Urdu variants.** `static/img/figures/gict-300/unit-02/fig-U2-4.ur.svg`
   and `.ur.dark.svg`, Speed row, RAM cell: renders `三者 میں / تیز ترین` where the English
   figure reads "fastest of the three". Correct Urdu: `تینوں میں تیز ترین` - the same
   figure's caption already uses the correct `تینوں قسموں`. Documented in
   `renders-agent-g5-gict300-u2-run001/fig-U2-4-ur-speed-row.png` and `fig-U2-4-ur-full.png`.
2. **"Client" translated as "customer".** `fig-U2-7.ur.svg` label `لیب کے کمپیوٹر (کسٹمر)`
   vs English `lab computers (clients)`, and the matching alt text in
   `i18n/.../unit-02/topic-04.mdx:31` (`کسٹمر کمپیوٹر`). The unit's own `fig-U2-8.ur.svg`
   already uses the correct `کلائنٹ`. Repair: `کلائنٹ` in the SVG label (light and dark)
   and the alt text.
3. **Gender agreement for loanword device nouns is inconsistent between prose and figures
   (and once inside the prose).** `سوئچ`/`روٹر` are feminine in topic-04 prose
   (topic-04.mdx:44-48, 98; unit-assessment.mdx:92) but masculine in fig-U2-7.ur.svg and
   fig-U2-8.ur.svg; `روٹر` is masculine again in the RRQ-7 model answer
   (unit-assessment.mdx:187-188) against feminine topic-04 prose; `اسکینر`/`پرنٹر` are
   masculine in topic-01 prose (lines 27, 40, 66) but feminine in fig-U2-2.ur.svg. A learner
   meets the same nouns with conflicting agreement on the same pages. Repair: harmonise one
   convention across prose and every Urdu figure variant.

## Verified clean

- **Completeness:** heading vectors, section counts, list items, checkboxes, figure carriers,
  glossary references and mark bands match the English exactly in all seven files; no
  omissions or heading-only stubs; UR `key_terms` block present with 14 entries.
- **Semantics:** negation, modal force, hedges, quantities (20 machines, 12 items, ten years,
  4-16 GB / few MB / 256 GB-2 TB, 60 percent, a third), causal claims and metaphors preserved
  at every passage compared; no material divergence in prose.
- **Assessment equivalence:** independent solve of the full Urdu 10/10/5 bank; all 10 MCQ
  keys match via the الف/ب/ج/د mapping; option order preserved; RRQ/ERQ models, mark totals
  and bands match; Bloom tags match one-to-one; no answer revealed; cognitive demand unchanged.
- **Sources:** all 13 Bourgeois citations and the Wallace/Clariana numbers retained with
  supporting meaning; bibliographic entries intact; no Urdu claim attributed to an
  unverifiable source.
- **RTL and print:** all seven `/ur/` pages clean at 1280x900 and 360x780 (zero overflow),
  zero A4 clipping, figures fit, answers section renders in print; all eight figures
  correctly mirrored (geometry verified); the four render-inspect wordmark flags on
  fig-U2-4.ur/fig-U2-5.ur were measured and overruled as a checker artifact
  (306px / 182px horizontal gap, `pixelOverlap=false`; crops retained).
- **Deterministic gates:** all six required gates plus `check:concept-graph` exit 0. They
  cannot exit 0 in the shared worktree because of pre-existing, out-of-scope geng-300
  defects, so they were run in an overlay at HEAD with only geng-300 repaired per the
  unmerged branch 018-author-geng300; all 125 bound inputs verified byte-identical in the
  overlay (`node /tmp/verify-overlay-u2-g5.mjs`). As-is worktree runs are retained as
  `worktree-*.txt` with every failure attributed to geng-300; zero GICT-300 findings as-is.

## Advisory findings

- Bloom-level vocabulary split: front matter uses `لاگو کرنا` for Apply while in-body tags
  use `اطلاق` (and unit 1 reportedly used `لاگو کرنا`/`جانچنا`) - fix one corpus convention.
- `متغیر`/`غیر متغیر` for volatile/non-volatile is a weak calque (plain sense "changeable"),
  mitigated by inline definitions; concept label CON:GICT-300-2-7 instead renders
  non-volatile as `مستقل`, inconsistent with the prose.
- "dashed" rendered `ہٹی ہوئی` (fig-U2-1 alt text, fig-U2-5 caption) - nonstandard; prefer
  `ٹوٹی ہوئی` or `خَط‌دار`.
- Minor grammar slips: `چھپی ہوئی صفحے` (topic-01:40, assessment key 1), `اشارہ کر کر`
  (topic-01:86-87), `مواصلت` singular (topic-04:60), fig-U2-3 `فائلیں رکھتی ہے` (mirrors
  the English's own singular), fig-U2-6 stage 1 `کمپیوٹر چلاتی ہے`.
- The UR assessment `description` front matter adds "جوابات اور نمبر دہی کے خاکوں کے ساتھ",
  absent from the English description (accurate, but should mirror).
- Environment: the G3 dependency is advisory/unsigned (no signing host exists repo-wide) and
  stale by one bound input - the shared `bourgeois2019.md` excerpt changed at a7200d2 in its
  Chapter 6 security section, which serves Unit 4 only (marked "Used for ... U4-01..U4-06");
  Unit 2 cites only the unchanged Chapters 2/3/5 passages, so the G3 verification remains
  applicable, but a fresh G3 manifest would be needed before certified acceptance.
- Shared-host events during the review: a transient uncommitted `glossary.json` state
  (17:18-17:20 local) restored by a concurrent session, and the HEAD move noted above; the
  manifest was re-verified identical after both. Root `glossary.json` is read by
  `validate:content` and underpinned G3's readability evidence but is not a bound manifest
  input - a manifest-design gap worth an owner note.

## Artifacts

Logs under `logs-agent-g5-gict300-u2-run001/` (six `cmd-*.log` overlay runs with full
environment disclosure, `render-review.log`, six `worktree-*.txt` as-is runs,
`cmd-check-concept-graph.log`); renders under `renders-agent-g5-gict300-u2-run001/`
(7 desktop PNGs, 7 narrow PNGs, 7 A4 PDFs, render-inspect.log/json, 5 SVG crops).
Machine-readable report: `agent-g5-gict300-u2-run001.json`.

This report is advisory. It does not certify the unit, sign evidence, or complete any gate;
acceptance requires the protected qualification and signing path per ADR-0019.
