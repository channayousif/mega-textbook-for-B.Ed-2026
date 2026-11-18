# EFPG-401 Unit 6 Independent G3 English Review Summary

**Course:** EFPG-401 Teaching of English  
**Unit:** Unit 6 (A.V. Aids in Teaching of English)  
**Stage:** G3 (English Review)  
**Disposition:** **escalate**  
**Reviewer:** `agent:agy`  
**Reviewer Run ID:** `adf16229-bf24-4d11-8b38-608ae9868dab`  
**Author Run:** `crew-job:efpg-401-u06-author` (`opencode`)  
**Model:** Gemini 3.8 Flash (Medium)  
**Reviewed Commit:** `3f5137183c527515692a20b914a26b9de771d7f3` (HEAD)  
**Date:** 2026-11-15  

---

## Executive Summary

This independent G3 review evaluated EFPG-401 Unit 6 across all seven required rubric criteria (`authority`, `sources`, `coverage`, `assessment`, `accessibility`, `readability`, `pedagogy`). The unit prose, assessment items, and pedagogical architecture demonstrate high instructional quality, complete alignment with course guide subtopics 6.1 through 6.5, and authentic adaptation to primary English classrooms across Sindh (Umerkot, Larkana, Sukkur, Dadu, Hyderabad).

All 25 assessment items (10 MCQs, 10 RRQs, 5 ERQs) were solved independently before reading supplied answers; all keys, distractors, marking schemes, and analytic rubrics are pedagogically sound and aligned with Bloom cognitive levels. Deterministic content gates (`validate:content`, `check:depth-gate`, `check:figures`, `check:no-em-dash`, `check:no-answer-keys`, `check:docs-sync`, and full `check:content`) all exit 0 cleanly. Figure text geometry across all schematic SVGs exits 0 via `measure-figure-text.mjs`.

The review returns an advisory **escalate** disposition because actual live browser and print view inspection (`render-review`) is unavailable under repository constraints:
1. Production deployed SHA (`1793d49325c9148bea848c4f85d16e11420a881e`) differs from HEAD (`3f5137183c527515692a20b914a26b9de771d7f3`) across 12 files (placing `fig-U6-11` banner in `index.mdx`, placing illustrations `fig-U6-12` through `fig-U6-16` across topics 6.1-6.5, and adding WebP raster illustration assets).
2. Per the crew brief instructions, when the diff is non-empty, the live site is not the input and `render-review` must be recorded as unavailable.
3. Host resource limits strictly prohibit running `npm run build`, a local dev server, or Playwright.

This report is advisory and does not constitute final certification or provisional publication. G3 remains open (`▢`).

---

## Rubric Evaluation

### 1. Authority (`pass`)
- **Course Guide Subtopics:** Covers all five approved guide subtopics from `Scheme-and-Course-guides/extracted-text/3rd 2026.txt:72`:
  - 6.1 Audio-visual aids: Meaning, Need, and Importance
  - 6.2 Low-cost audio-visual aids: charts, models, pictures, flash cards, toys and actual objects
  - 6.3 Radio, audio recordings, language laboratory
  - 6.4 Television, video and film
  - 6.5 Slides, filmstrip, overhead projector, multimedia projector
- **Intended Learning Outcomes:** Directly addresses `SLO:EFPG-401-6-1` (audio-visual aids, low-cost materials and their classroom role) and `SLO:EFPG-401-6-2` (audio, video and projected media, their selection and application in language teaching).
- **Approved Spec Alignment:** Conforms to `specs/content/efpg-401/content-spec.md` Unit 6 specification.

### 2. Sources (`pass`)
- **Open-Access Sources:**
  - `mahmood-2024-visual-aids` (*Pakistan Journal of Humanities and Social Sciences*, diamond OA): Bound excerpt in `specs/content/efpg-401/sources/texts/mahmood-2024-visual-aids.md`, supporting U6-01 and U6-02.
  - `hussain-khan-2022-images` (*Pakistan Languages and Humanities Review*, diamond OA): Bound excerpt in `specs/content/efpg-401/sources/texts/hussain-khan-2022-images.md`, supporting U6-02 and U6-05.
  - `daulay-2025-listening` (*Journal on English as a Foreign Language*, gold OA): Bound excerpt in `specs/content/efpg-401/sources/texts/daulay-2025-listening.md`, supporting U6-03 and U6-04.
- **Unverifiable Sources:** Not applicable. All cited sources have bound excerpts in `specs/content/efpg-401/sources/texts/`. No print monograph was mandated for Unit 6.

### 3. Coverage (`pass`)
- **Checklist Leaf Topics:** All five sub-topic checklist leaves (U6-01, U6-02, U6-03, U6-04, U6-05) are taught with complete explanations, worked lesson examples, pair activities, self-assessment checklists, and summative tasks across `topic-01.mdx` to `topic-05.mdx`.
- **Coverage Mapping:** `specs/content/efpg-401/coverage/unit-06.md` accurately maps all topics and reinforcement tasks to assessment items.
- **Concept Graph:** `specs/content/efpg-401/concepts/unit-06.md` links all five unit concepts (`CON:EFPG-401-6-1` to `CON:EFPG-401-6-5`) to SLOs and assessment items.

### 4. Assessment (`pass`)
- **Independent Solution:**
  - All 10 MCQs independently solved; keys match 100% (1-A, 2-B, 3-A, 4-A, 5-C, 6-B, 7-A, 8-C, 9-C, 10-B). Distractors are plausible, unambiguous, and grammatically parallel.
  - All 10 RRQs independently solved; marking schemes provide clear, objective 2-mark and 3-mark scoring criteria.
  - All 5 ERQs independently solved; each includes an analytic rubric (10 marks) with explicit Bloom demand (Analyze, Evaluate).
- **Placement & Security:** Answer keys are strictly confined to the final bounded `## Answers and marking guidance` section of `unit-assessment.mdx`. `check:no-answer-keys` confirms zero leaks.

### 5. Accessibility (`unverified`)
- **Static Inspection (`pass`):**
  - Semantic heading hierarchy is strictly monotonic (`#` -> `##` -> `###` -> `####`).
  - Anchor text is descriptive (`[Low-cost teaching aids](./topic-02)`).
  - `<PrintHandout />` component present on all five topic pages and `unit-assessment.mdx`.
  - 10 schematic SVGs and 10 `.dark.svg` counterparts placed with descriptive alt text and ARIA attributes.
  - 6 WebP illustration assets (`fig-U6-11.webp` through `fig-U6-16.webp`) placed with detailed alt text.
  - `scripts/heavy.sh node scripts/measure-figure-text.mjs` exits 0 for all SVGs.
- **Visual Inspection (`unverified`):**
  - Render inspection against live production build is unavailable because production deployed SHA differs from HEAD.
  - Mobile (360px viewport), table horizontal scrollability, and A4 print layout cannot be dynamically verified.

### 6. Readability (`pass`)
- Prose is pitched appropriately for B.Ed teacher candidates / HSC graduates.
- Concrete classroom narratives featuring teachers across Sindh (Rukhsana and Sir Munir in Umerkot, Imran in Larkana, Saima in Sukkur, Bilal and Madam Roshan in Dadu, Farzana and Master Junaid in Hyderabad) provide authentic local grounding.
- Zero em dashes (U+2014) throughout. En dashes (U+2013) used only for numeric ranges.

### 7. Pedagogy (`pass`)
- Identifies and dismantles pervasive pedagogical misconceptions in Pakistani English teaching:
  - "audio-visual aids need money and electricity" (corrected in 6.1 with low-cost realia and chart examples).
  - "flash cards are just for testing" (corrected in 6.2 with the five-stage show-say-repeat-use-review routine).
  - "more audio aids are always better" (corrected in 6.3 by showing how one purposeful recording beats three unplanned aids).
  - "showing a video is teaching" (corrected in 6.4 with the five-stage video lesson: preview task, watch, check, discuss, follow-up).
  - "projected slides should copy the textbook" (corrected in 6.5 with the clear slide rule: one idea, few words, one picture).
- Practical pair activities, worked lesson plans, and practicum school observation tasks feasible in Pakistani school contexts.

---

## Findings

1. **Finding F1 (Severity: `uncertain`):** Visual browser and print render review unavailable.  
   *Details:* Production deployed SHA `1793d49325c9148bea848c4f85d16e11420a881e` does not match HEAD `3f5137183c527515692a20b914a26b9de771d7f3` for EFPG-401 Unit 6 (12 files differ: index.mdx, topic-01.mdx through topic-05.mdx, and 6 WebP raster illustration assets fig-U6-11.webp through fig-U6-16.webp). In accordance with crew brief, render-inspect against live site was skipped and recorded as unavailable. Live browser 360px viewport, keyboard navigation, and A4 print view remain unverified.
2. **Finding F2 (Severity: `uncertain`):** Reviewer independence and qualification boundary.  
   *Details:* Review performed by independent agent `agent:agy` (run ID `adf16229-bf24-4d11-8b38-608ae9868dab`) on model `Gemini 3.8 Flash (Medium)`. Author run was `crew-job:efpg-401-u06-author` (`opencode`). No server-protected signing host or registered qualification credentials exist. This report is an advisory G3 review and does not constitute certification or provisional publication.

---

## Command Evidence

| Command | Exit Code | Log Path |
|---|---|---|
| `validate:content` | 0 | `specs/content/efpg-401/reviews/unit-06/G3/adf16229-bf24-4d11-8b38-608ae9868dab/logs/validate-content.txt` |
| `check:depth-gate` | 0 | `specs/content/efpg-401/reviews/unit-06/G3/adf16229-bf24-4d11-8b38-608ae9868dab/logs/check-depth-gate.txt` |
| `check:figures` | 0 | `specs/content/efpg-401/reviews/unit-06/G3/adf16229-bf24-4d11-8b38-608ae9868dab/logs/check-figures.txt` |
| `check:no-em-dash` | 0 | `specs/content/efpg-401/reviews/unit-06/G3/adf16229-bf24-4d11-8b38-608ae9868dab/logs/check-no-em-dash.txt` |
| `check:no-answer-keys` | 0 | `specs/content/efpg-401/reviews/unit-06/G3/adf16229-bf24-4d11-8b38-608ae9868dab/logs/check-no-answer-keys.txt` |
| `check:docs-sync` | 0 | `specs/content/efpg-401/reviews/unit-06/G3/adf16229-bf24-4d11-8b38-608ae9868dab/logs/check-docs-sync.txt` |
| `render-review` | 1 | `specs/content/efpg-401/reviews/unit-06/G3/adf16229-bf24-4d11-8b38-608ae9868dab/logs/render-review.txt` |
| `check:content` | 0 | `specs/content/efpg-401/reviews/unit-06/G3/adf16229-bf24-4d11-8b38-608ae9868dab/logs/check-content.txt` |
