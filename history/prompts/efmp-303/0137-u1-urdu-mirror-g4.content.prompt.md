---
id: 0137
title: EFMP-303 Unit 1 Urdu mirror (G4)
stage: misc
date: 2026-10-15
surface: agent
model: claude-opus-5
feature: efmp-303
branch: agent/TEX-40
user: BilingualAuthor
command: Paperclip heartbeat (TEX-62)
labels: ["BilingualAuthor", "g4", "ur-translation", "efmp-303", "figures"]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: TEX-62
  adr: null
  pr: https://github.com/channayousif/mega_book_for_B.Ed/pull/120
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-01/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-01/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-01/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-01/topic-04.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-01/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-303/unit-01/unit-teacher-notes.mdx
  - static/img/figures/efmp-303/unit-01/fig-U1-1.ur.svg
  - static/img/figures/efmp-303/unit-01/fig-U1-2.ur.svg
  - static/img/figures/efmp-303/unit-01/fig-U1-3.ur.svg
  - static/img/figures/efmp-303/unit-01/fig-U1-4.ur.svg
  - static/img/figures/efmp-303/unit-01/fig-U1-5.ur.svg
  - static/img/figures/efmp-303/unit-01/fig-U1-6.ur.svg
  - static/img/figures/efmp-303/unit-01/fig-U1-7.ur.svg
  - static/img/figures/efmp-303/unit-01/fig-U1-8.ur.svg
  - static/img/figures/efmp-303/unit-01/fig-U1-1.ur.dark.svg
  - static/img/figures/efmp-303/unit-01/fig-U1-2.ur.dark.svg
  - static/img/figures/efmp-303/unit-01/fig-U1-3.ur.dark.svg
  - static/img/figures/efmp-303/unit-01/fig-U1-4.ur.dark.svg
  - static/img/figures/efmp-303/unit-01/fig-U1-5.ur.dark.svg
  - static/img/figures/efmp-303/unit-01/fig-U1-6.ur.dark.svg
  - static/img/figures/efmp-303/unit-01/fig-U1-7.ur.dark.svg
  - static/img/figures/efmp-303/unit-01/fig-U1-8.ur.dark.svg
tests:
  - validate:content (PASS, incl. the temporary `reviewed` parity flip)
  - check:depth-gate, check:no-em-dash, check:no-answer-keys, check:concept-graph (PASS)
  - check:bloom-bands, check:source-floor, check:licence, licence:map:check (PASS)
  - check:content-status, check:docs-sync, figures:variants:check (PASS)
  - check:figures (0 EFMP-303 findings; 454 pre-existing corpus findings unchanged, TEX-61)
  - check:pipeline-gate (EFMP-303 U1: only the pre-existing stale G2 manifest)
  - npm run build (PASS, en + ur)
  - scripts/render-inspect.mjs EFMP-303 1 --locale ur (0 defects)
  - scripts/measure-figure-text.mjs on all 16 .ur / .ur.dark SVGs (0 problems)
---

## Prompt

Paperclip TEX-62: gate G4 ur-translation for EFMP-303 Unit 1, *Introduction and
Historical Background*. Translate the 7 English files in
`docs/semester-2/efmp-303/unit-01/` into their same-named Urdu mirrors, wire the
8 figures to `.ur.svg` variants, run the content checks plus the build and the
Urdu render inspection, and hand back without flipping `translation_status` or
adding a tracker row. `index.mdx` was already written in the TEX-59 run
(`e23475c4`); review it and do the remaining 6 files. The issue also names a
known collision to resolve rather than paper over: `terminology.csv` binds
**Development** to **نشوونما** (child growth) while EFMP-303 uses the word in the
national and economic sense (**ترقی**).

## Response snapshot

Translated the 6 outstanding files against the EFMP-301 Unit 1 mirror (the skill's
named precedent) and authored all 8 `.ur.svg` figure variants.

Register is academic-plain (درسی مگر عام فہم): Urdu danda `۔`, Urdu comma `،`,
Western digits, Latin left on course codes, SLO ids, figure ids and citations.
Heading level vectors, component calls and item counts match the English file by
file. Option letters follow the reviewed corpus (الف/ب/ج/د) with the order
unchanged; Bloom tags use the EFMP-301 set (یاد رکھنا / سمجھنا / اطلاق / تجزیہ /
جائزہ). The answers section is translated as
`## جوابات اور نمبر دہی کی رہنمائی` and left as the file's final `##`, with no
English answer-key prose anywhere in it.

The `.ur.svg` files were produced by mirroring each English schematic
(`x' = W - x`, start-anchors becoming end-anchors) and then translating every
`<text>`, `<title>` and `<desc>`. Mirroring is what makes the tables and timelines
read right to left: in `fig-U1-6` the Aspect column moves to the right edge, and
in `fig-U1-5` / `fig-U1-7` the earliest year moves to the right.

## Outcome

- ✅ Impact: EFMP-303 Unit 1 now has a complete Urdu mirror - 7 files, 8 localised
  figures and 8 derived dark variants - ready for an independent G5 review.
- 🧪 Tests: every content gate passes; `npm run build` succeeds for both locales;
  `render-inspect --locale ur` reports 0 defects across desktop, 360px and A4
  print; figure text geometry is clean on all 16 SVGs.
- 📁 Files: 6 Urdu `.mdx` + 8 `.ur.svg` + 8 `.ur.dark.svg`. No English file, no
  manifest, no terminology bank entry and no tracker row was touched.
- 🔁 Next prompts: G5 Urdu review in a fresh `g5-reviewer` session; curriculum-owner
  ruling on the Development term.
- 🧠 Reflection: two gates measure wordmark overlap with different rules.
  `measure-figure-text.mjs` uses a four-sided box test; `render-inspect.mjs` uses
  `text.x2 > wordmark.x1`, which assumes the wordmark sits bottom right. Mirroring
  the wordmark to the bottom left (the visually correct RTL choice) satisfied the
  first and produced 12 false positives in the second, so the wordmark stays bottom
  right with `direction="ltr"`, matching the accepted EFMP-301 and EFMP-302 mirrors.

## Handoff (for CEO and agents)

- Shipped / changed: the complete Urdu mirror of EFMP-303 Unit 1 (6 new `.mdx`
  files beside the existing `index.mdx`), 8 `.ur.svg` figures and their 8 derived
  `.ur.dark.svg` variants, on `agent/TEX-40` / PR #120.
- Decisions the team must respect:
  1. **`translation_status` stays `draft`** in both locales. Only an accepted G5
     earns `reviewed`; the student-facing banner is still correct.
  2. **No `G4 ur-translation` tracker row was added**, per the issue.
  3. **The terminology bank was not edited.** `Development` is still bound to
     `نشوونما` and the UR `key_terms` block still declares that pair, because
     `check:pipeline-gate` enforces it. Unit 1 prose uses **ترقی** wherever the
     sense is national or economic development, which is what the English means
     throughout. This needs a curriculum-owner disambiguation, not a translator's
     rebinding - see the proposed terms in the TEX-62 handoff comment.
  4. The Urdu wordmark stays bottom right with `direction="ltr"`, for the gate
     reason in the reflection above. Do not "fix" it to the left.
- Pending / next owner: CurriculumOwner - review this mirror at G5 in a fresh
  `g5-reviewer` session (never this session), and rule on the Development term.
  Unrelated and still open: the 454 corpus-wide figure `<desc>`/`alt` findings
  (TEX-61) and the stale G2 input manifests, which block PR #120's CI independently
  of this work.
- Paperclip issues affected: TEX-62 (this unit, to `in_review`), TEX-59 (parent),
  TEX-61 (blocks the figure gate corpus-wide).

## Evaluation notes (flywheel)

- Failure modes observed: the two wordmark-overlap rules disagree (see reflection);
  a label-translation table keyed on exact English strings caught every missed
  label, which an in-place edit would not have.
- Graders run and results (PASS/FAIL): all content gates PASS; build PASS;
  render-inspect PASS (0 defects); measure-figure-text PASS (0 problems);
  self-answered all 10 Urdu MCQs from the Urdu alone and matched the translated
  key 10/10.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): teach `render-inspect.mjs` the
  four-sided box test that `measure-figure-text.mjs` already uses, so an RTL figure
  can place its wordmark on the left without tripping a false positive.
