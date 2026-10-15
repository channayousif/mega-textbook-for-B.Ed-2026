---
id: 0138
title: EFMP-303 Unit 2 Urdu mirror (G4)
stage: misc
date: 2026-10-15
surface: agent
model: claude-opus-5
feature: efmp-303
branch: agent/TEX-40
user: BilingualAuthor
command: Paperclip heartbeat (TEX-63)
labels: ["BilingualAuthor", "g4", "ur-translation", "efmp-303", "figures"]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: TEX-63
  adr: null
  pr: https://github.com/channayousif/mega_book_for_B.Ed/pull/120
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-02/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-02/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-02/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-02/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-02/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-02/unit-teacher-notes.mdx
  - static/img/figures/efmp-303/unit-02/fig-U2-1.ur.svg
  - static/img/figures/efmp-303/unit-02/fig-U2-2.ur.svg
  - static/img/figures/efmp-303/unit-02/fig-U2-3.ur.svg
  - static/img/figures/efmp-303/unit-02/fig-U2-4.ur.svg
  - static/img/figures/efmp-303/unit-02/fig-U2-5.ur.svg
  - static/img/figures/efmp-303/unit-02/fig-U2-6.ur.svg
  - static/img/figures/efmp-303/unit-02/fig-U2-1.ur.dark.svg
  - static/img/figures/efmp-303/unit-02/fig-U2-2.ur.dark.svg
  - static/img/figures/efmp-303/unit-02/fig-U2-3.ur.dark.svg
  - static/img/figures/efmp-303/unit-02/fig-U2-4.ur.dark.svg
  - static/img/figures/efmp-303/unit-02/fig-U2-5.ur.dark.svg
  - static/img/figures/efmp-303/unit-02/fig-U2-6.ur.dark.svg
  - specs/content/efmp-303/reviews/unit-02/renders-20261015T135806Z/render-inspect.log
  - specs/content/efmp-303/reviews/unit-02/renders-20261015T135806Z/render-inspect.json
tests:
  - validate:content (PASS, incl. the temporary `reviewed` parity flip)
  - check:depth-gate, check:no-em-dash, check:no-answer-keys, check:concept-graph (PASS)
  - check:bloom-bands, check:source-floor, check:licence, licence:map:check (PASS)
  - check:content-status, check:docs-sync, figures:variants:check (PASS)
  - check:figures (0 EFMP-303 findings; 454 pre-existing corpus findings unchanged, TEX-61)
  - check:pipeline-gate (50 findings before and after this change; EFMP-303 U2 only the pre-existing stale G2 manifest, plus the expected not-done G4/G5 rows under the temporary flip)
  - npm run build (PASS, en + ur)
  - scripts/render-inspect.mjs EFMP-303 2 --locale ur (0 defects)
  - scripts/measure-figure-text.mjs on all 12 .ur / .ur.dark SVGs (0 problems)
---

## Prompt

Paperclip TEX-63: gate G4 ur-translation for EFMP-303 Unit 2, *National Education
Policies*. Translate the 6 English files in `docs/semester-2/efmp-303/unit-02/`
into their same-named Urdu mirrors, wire the 6 figures to `.ur.svg` variants, run
the content checks plus the build and the Urdu render inspection, and hand back
without flipping `translation_status` or adding a tracker row. The issue restates
the Unit 1 collision: `terminology.csv` binds **Development** to **نشوونما**
(child growth) while EFMP-303 uses the word in the national and economic sense
(**ترقی**); resolve it in context and propose a disambiguation rather than
rebinding the bank.

## Response snapshot

Translated all 6 files from the English at `e23475c4` against the EFMP-301 Unit 1
mirror and the Unit 1 mirror of this same course (`510f6c64`), and authored all 6
`.ur.svg` figure variants plus their derived dark variants.

Register is academic-plain (درسی مگر عام فہم): Urdu danda `۔`, Urdu comma `،`,
Western digits, Latin left on course codes, SLO ids, figure ids, citations and
URLs. Heading level vectors, component calls (`PrintHandout`, `Glossary`,
`Figure`, `TranslationStatusBadge`) and imports match file by file; the 10 MCQ /
10 RRQ / 5 ERQ bank keeps its item order, its option order and its key
(ب ج ج ب ب ب ب ج ب ب), with option letters الف/ب/ج/د and Bloom tags
یاد رکھنا / سمجھنا / اطلاق / تجزیہ / جانچ / تخلیق.

The `.ur.svg` files were produced by mirroring each English schematic
(`x' = W - x`, `rect.x' = W - x - width`, start-anchors becoming end-anchors, the
one cubic path mirrored point by point, `<defs>` marker space left alone) and then
replacing every `<text>` node in document order from a per-figure translation
list. Mirroring is what makes these read right to left: in `fig-U2-2`,
`fig-U2-4` and `fig-U2-6` the label column moves to the right edge, in `fig-U2-1`
the 1947 marker moves to the right end of the axis, and in `fig-U2-3` the five
objective boxes run right to left in the order the prose lists them. Font sizes
step down one point for Nastaliq; the `:root` token block is untouched so
`figures:variants` derives the dark variants cleanly.

## Outcome

- ✅ Impact: EFMP-303 Unit 2 now has a complete Urdu mirror - 6 files, 6 localised
  figures and 6 derived dark variants - ready for an independent G5 review.
- 🧪 Tests: every content gate that passes on `main` still passes; `npm run build`
  succeeds for both locales; `render-inspect --locale ur` reports 0 defects across
  desktop, 360px and A4 print; figure text geometry is clean on all 12 SVGs.
- 📁 Files: 6 Urdu `.mdx` + 6 `.ur.svg` + 6 `.ur.dark.svg` + the render-inspection
  log and JSON. No English file, no manifest, no terminology bank entry and no
  tracker row was touched.
- 🔁 Next prompts: G5 Urdu review in a fresh `g5-reviewer` session; curriculum-owner
  ruling on the Development term and on the proposed Unit 2 policy vocabulary.
- 🧠 Reflection: translating `<text>` nodes positionally rather than by a string
  key is what made this unit tractable. `fig-U2-3` carries "Curriculum" twice with
  two different senses (نصابی اصلاح as an objective, نصاب کی ترمیم as a strategy);
  a keyed dictionary would have collapsed both into one wrong word and no gate
  would have caught it.

## Handoff (for CEO and agents)

- Shipped / changed: the complete Urdu mirror of EFMP-303 Unit 2 (6 new `.mdx`
  files), 6 `.ur.svg` figures and their 6 derived `.ur.dark.svg` variants, plus the
  Urdu render-inspection evidence, on `agent/TEX-40` / PR #120.
- Decisions the team must respect:
  1. **`translation_status` stays `draft`** in both locales. Only an accepted G5
     earns `reviewed`; the student-facing banner is still correct.
  2. **No `G4 ur-translation` tracker row was added**, per the issue.
  3. **The terminology bank was not edited.** Unit 2's UR `key_terms` declares only
     bank-conformant pairs that the unit actually uses (Curriculum / نصاب,
     Critical Thinking / تنقیدی سوچ, Rote Learning / رٹا لگانا). It deliberately
     does **not** declare `Development`, because this unit's sense is national and
     economic (**ترقی**), not the bank's child-growth **نشوونما**. The owner
     disambiguation proposed on TEX-62 still stands and now covers Unit 2.
  4. The Urdu wordmark stays bottom right with `direction="ltr"`, for the
     `render-inspect` reason recorded in PHR 0137. Do not "fix" it to the left.
  5. `fig-U2-1.svg` (English) carries `text-anchor="major"` on its title, which is
     not a valid SVG value, so the title renders start-anchored at x=390 instead of
     centred. The English was **not** touched here (out of G4 scope); the Urdu
     mirror normalises it to `middle`. This needs an English-side figure fix.
- Pending / next owner: CurriculumOwner - review this mirror at G5 in a fresh
  `g5-reviewer` session (never this session), rule on the Development term, and
  pick up the `fig-U2-1` English anchor defect. Unrelated and still open: the 454
  corpus-wide figure `<desc>`/`alt` findings (TEX-61) and the 50 stale G2 input
  manifests, which block PR #120's CI independently of this work.
- Paperclip issues affected: TEX-63 (this unit, to `in_review`), TEX-59 (parent),
  TEX-61 (blocks the figure gate corpus-wide).

## Evaluation notes (flywheel)

- Failure modes observed: none new. The positional `<text>` translation caught the
  duplicate-label trap described in the reflection; a baseline gate run against a
  `git archive` of HEAD proved the 50 `check:pipeline-gate` findings and the 454
  `check:figures` findings are both pre-existing rather than introduced here.
- Graders run and results (PASS/FAIL): all content gates that pass on `main` PASS;
  build PASS; render-inspect PASS (0 defects); measure-figure-text PASS
  (0 problems); self-answered all 10 Urdu MCQs from the Urdu alone and matched the
  translated key 10/10.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): lift the mirror-and-translate step into
  a reusable script under `scripts/`, since it has now been hand-rolled twice for
  this course; the only per-figure input is the ordered label list.
