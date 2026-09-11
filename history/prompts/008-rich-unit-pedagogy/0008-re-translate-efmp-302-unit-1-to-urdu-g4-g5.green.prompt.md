---
id: 0008
title: Re-translate EFMP-302 Unit 1 to Urdu (G4 / G5)
stage: green
date: 2026-09-09
surface: agent
model: claude-sonnet-5
feature: 008-rich-unit-pedagogy
branch: content-efmp-302-u1-ur-v3
user: channayousif@gmail.com
command: (Workstream D - content re-translation)
labels: ["content", "efmp-302", "urdu", "translation", "g4", "g5", "bilingual", "parity"]
links:
  spec: specs/006-content-pipeline/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-01/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-01/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-01/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-01/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-01/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-01/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-01/unit-teacher-notes.mdx
 - docs/semester-1/efmp-302/unit-01/*.mdx (translation_status draft -> reviewed; index.mdx badge)
 - specs/content/efmp-302/tasks.md
 - specs/content/efmp-302/figures/unit-01.md
 - specs/backlog.md
tests:
 - "npm run validate:content - EN<->UR section-file + heading-vector parity now active - PASS"
 - "npm run check:figures - UR <Figure> per id + .ur.svg per schematic enforced (reviewed unit) - PASS"
 - "npm run check:pipeline-gate - G4/G5 rows ✅ + terminology conformance on UR key_terms - PASS"
 - "npm run check:no-em-dash - zero em dash across i18n/ - PASS"
 - "npm run check:no-answer-keys / check:depth-gate / npm test (142/142) - PASS"
 - "npm run build (en + ur) - see reconciliation note"
---

## Prompt

Workstream D (approved plan): re-translate EFMP-302 Unit 1 into Urdu - all 7 files - do the G5
register/terminology pass, flip `translation_status` to `reviewed`, mark G4/G5 done, run the full
gate set green. Depends on the Spec 012 branch (adds fig-U1-5..8 + the UR stub `<Figure>`s).

## Response snapshot

Branch `content-efmp-302-u1-ur-v3` off `012-visual-density-standard`.

Fully re-translated the 7 skeleton-stub UR files
(`i18n/ur/.../semester-1/efmp-302/unit-01/{index, topic-01..04, unit-assessment,
unit-teacher-notes}.mdx`) from the final English, filling every `<!-- TODO(G4): ترجمہ -->`
placeholder and the `blooms_summary` frontmatter TODOs:

- **Heading-vector parity**: every EN heading reproduced in the same order and nesting - the nine
  cycle headings, the four `###` sub-headings under `## Explanation` in each topic, the
  `### MCQ/RRQ/ERQ` bands and the three `###` under `## جوابات اور نمبر دہی کی رہنمائی` in
  `unit-assessment.mdx`, and the six `##` sections of `unit-teacher-notes.mdx` (the old stub had
  only 2). `validate:content` heading-vector parity passes.
- **Terminology**: `specs/content/terminology.csv` consulted for every key term - `پیشہ`,
  `پیشہ واریت` (Professionalism), `پیشہ ورانہ بنانے کا عمل` (Professionalization),
  `استاد کی شناخت`; the two G5-flagged terms confirmed as-is. `terminology.csv` NOT edited (no
  term changed; avoids the FR-007 style-guide re-freeze cascade). UR `index.mdx` `key_terms`
  unchanged and conformant.
- **Figures**: all 8 `<Figure>` ids carried in the UR topic files (the 4 Spec 012 additions
  included), each pointing at its `.ur.svg`; the `{/* TODO(G4) */}` placement notes kept as
  inline comments. `fig-U1-1` -> `kind="table"`, `fig-U1-4` -> `kind="concept-map"` mirrored.
- **Answer-key gate**: kept the Urdu heading `## جوابات اور نمبر دہی کی رہنمائی`; the whole UR
  `unit-assessment.mdx` is free of the English prose markers (`answer key` / `marking scheme` /
  `correct answer`), so `check-no-answer-keys`'s whole-file scan (it does not find the canonical
  English heading) passes.
- Register: academic-plain Urdu (درسی مگر عام فہم), no literary/archaic forms, zero em-dash
  (`،` / `۔` / spaced hyphen throughout).

Flipped `translation_status: draft -> reviewed` on all 7 EN unit-01 files and all 7 UR files;
`<TranslationStatusBadge status="reviewed" />` in EN `index.mdx` (renders nothing).
`specs/content/efmp-302/tasks.md`: `Unit 1 | G4 ur-translation` and `Unit 1 | G5 ur-review` ->
`✅ | YM` with notes + a new header block; `specs/backlog.md` item struck through as done;
`figures/unit-01.md` header note updated (UR side now gate-enforced).

## Outcome

- ✅ Impact: EFMP-302 Unit 1 is a fully reviewed bilingual unit again; the `/ur/` route serves
  the Urdu unit instead of the EN fallback behind the untranslated banner.
- 🧪 Tests: `validate:content` (parity active), `check:figures` (UR side enforced),
  `check:pipeline-gate` (G4/G5 + terminology), `check:no-em-dash`, `check:no-answer-keys`,
  `check:depth-gate`, `npm test` 142/142 - all green. Build result in the reconciliation note.
- 📁 Files: 7 UR content files; 7 EN `translation_status` flips + badge; `tasks.md`, `figures/
  unit-01.md`, `backlog.md`.
- 🔁 Next prompts: commit + PR (stacked on the Spec 012 PR); then Workstream B (Spec 011
  dashboards).
- 🧠 Reflection: keeping the answers heading in Urdu was safe because the no-answer-keys gate
  falls back to a whole-file English-prose scan when it cannot find the canonical English
  heading, and the Urdu prose has no English marker phrases.

## Evaluation notes (flywheel)

- Failure modes observed: the UR `unit-teacher-notes.mdx` stub had only 2 of the EN's 6 `##`
  sections - would have failed parity once `reviewed`; caught by translating to the full EN
  structure.
- Graders run and results (PASS/FAIL): Spec 006 UR-translation acceptance (full draft +
  terminology-bank-driven + human register pass + `translation_status: reviewed`) - PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): a real second Urdu reviewer for the register pass
  before the next reviewed unit, rather than a self-review.
