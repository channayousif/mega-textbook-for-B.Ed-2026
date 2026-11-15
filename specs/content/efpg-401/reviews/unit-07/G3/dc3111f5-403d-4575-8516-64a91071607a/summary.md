# EFPG-401 Unit 7 Independent G3 English Review Summary

**Course:** EFPG-401 Teaching of English  
**Unit:** Unit 7 (Assessment)  
**Stage:** G3 (English Review)  
**Disposition:** **escalate**  
**Reviewer:** `agent:agy`  
**Reviewer Run ID:** `dc3111f5-403d-4575-8516-64a91071607a`  
**Author Run:** `crew-job:efpg-401-u07-author` (`opencode`)  
**Model:** Gemini 3.8 Flash (Medium)  
**Reviewed Commit:** `4afd7143719c2666f85bff10fd51deb7b705aee2` (HEAD)  
**Date:** 2026-11-15  

---

## Executive Summary

This independent G3 review evaluated EFPG-401 Unit 7 across all seven required rubric criteria (`authority`, `sources`, `coverage`, `assessment`, `accessibility`, `readability`, `pedagogy`). The unit prose, assessment items, and pedagogical architecture demonstrate high instructional quality, complete alignment with course guide subtopics 7.1 and 7.2, and authentic adaptation to primary English classrooms across Sindh (Jacobabad, Larkana).

All 25 assessment items (10 MCQs, 10 RRQs, 5 ERQs) were solved independently before reading supplied answers; all keys, distractors, marking schemes, and analytic rubrics are pedagogically sound and aligned with Bloom cognitive levels. Deterministic content gates (`validate:content`, `check:depth-gate`, `check:figures`, `check:no-em-dash`, `check:no-answer-keys`, `check:docs-sync`, and full `check:content`) all exit 0 cleanly. Figure text geometry across all schematic SVGs exits 0 via `measure-figure-text.mjs`.

The review returns an advisory **escalate** disposition because actual live browser and print view inspection (`render-review`) is unavailable under repository constraints:
1. Production deployed SHA (`1793d49325c9148bea848c4f85d16e11420a881e`) differs from HEAD (`4afd7143719c2666f85bff10fd51deb7b705aee2`) across 6 files (placing `fig-U7-5` banner in `index.mdx`, placing illustrations `fig-U7-6` and `fig-U7-7` in topics 7.1 and 7.2, and adding WebP raster illustration assets).
2. Per the crew brief instructions, when the diff is non-empty, the live site is not the input and `render-review` must be recorded as unavailable.
3. Host resource limits strictly prohibit running `npm run build`, a local dev server, or Playwright.

This report is advisory and does not constitute final certification or provisional publication. G3 remains open (`▢`).

---

## Rubric Evaluation

### 1. Authority (`pass`)
- **Course Guide Subtopics:** Covers both approved guide subtopics from `Scheme-and-Course-guides/extracted-text/3rd 2026.txt:90-92`:
  - 7.1 Construction of Objective type test.
  - 7.2 Construction of subject type test.
- **Intended Learning Outcomes:** Directly addresses `SLO:EFPG-401-7-1` (constructing objective-type and subjective-type tests of English).
- **Approved Spec Alignment:** Conforms to `specs/content/efpg-401/content-spec.md` Unit 7 specification.

### 2. Sources (`pass`)
- **Open-Access Sources:**
  - `dibattista-2011-mcq` (*The Canadian Journal for the Scholarship of Teaching and Learning*, diamond OA): Bound excerpt in `specs/content/efpg-401/sources/texts/dibattista-2011-mcq.md`, supporting U7-01.
  - `indrayani-2020-mcq-english` (*Journal of Education Research and Evaluation*, diamond OA): Bound excerpt in `specs/content/efpg-401/sources/texts/indrayani-2020-mcq-english.md`, supporting U7-01.
- **Unverifiable Sources:**
  - `celce-murcia-1991` (*Teaching English as a Second or Foreign Language*, 2nd ed., Newbury House): Print monograph declared under `## Unverifiable sources` with retrieval attempts, date (2026-10-31), and owner authorization (`D-2026-0001`), supporting U7-02. Used honestly for title-level support of subjective test construction, model answers, and analytic marking.

### 3. Coverage (`pass`)
- **Checklist Leaf Topics:** Both sub-topic checklist leaves (U7-01, U7-02) are taught with complete explanations, worked examples, pair activities, self-assessment checklists, and summative tasks across `topic-01.mdx` and `topic-02.mdx`.
- **Coverage Mapping:** `specs/content/efpg-401/coverage/unit-07.md` accurately maps both topics and reinforcement tasks to assessment items.
- **Concept Graph:** `specs/content/efpg-401/concepts/unit-07.md` links all four unit concepts (`CON:EFPG-401-7-1` to `CON:EFPG-401-7-4`) to SLOs and assessment items.

### 4. Assessment (`pass`)
- **Independent Solution:**
  - All 10 MCQs independently solved; keys match 100% (1-C, 2-B, 3-B, 4-A, 5-A, 6-B, 7-C, 8-C, 9-B, 10-B). Distractors are plausible, unambiguous, and grammatically parallel.
  - All 10 RRQs independently solved; marking schemes provide clear, objective 2-mark and 3-mark scoring criteria.
  - All 5 ERQs independently solved; each includes an analytic rubric (10 marks) with explicit Bloom demand (Analyze, Create).
- **Placement & Security:** Answer keys are strictly confined to the final bounded `## Answers and marking guidance` section of `unit-assessment.mdx`. `check:no-answer-keys` confirms zero leaks.

### 5. Accessibility (`unverified`)
- **Static Inspection (`pass`):**
  - Semantic heading hierarchy is strictly monotonic (`#` -> `##` -> `###` -> `####`).
  - Anchor text is descriptive (`[Constructing objective-type tests](./topic-01)`).
  - `<PrintHandout />` component present on both topic pages and `unit-assessment.mdx`.
  - 4 schematic SVGs and 4 `.dark.svg` counterparts placed with descriptive alt text and ARIA attributes.
  - 3 WebP illustration assets (`fig-U7-5.webp`, `fig-U7-6.webp`, `fig-U7-7.webp`) placed with detailed alt text.
  - `scripts/heavy.sh node scripts/measure-figure-text.mjs` exits 0 for all SVGs.
- **Visual Inspection (`unverified`):**
  - Render inspection against live production build is unavailable because production deployed SHA differs from HEAD.
  - Mobile (360px viewport), table horizontal scrollability, and A4 print layout cannot be dynamically verified.

### 6. Readability (`pass`)
- Prose is pitched appropriately for B.Ed teacher candidates / HSC graduates.
- Concrete classroom narratives featuring teachers across Sindh (Imran and Madam Riffat in Jacobabad, Shahzad and Madam Naseem in Larkana) provide authentic local grounding.
- Zero em dashes (U+2014) throughout. En dashes (U+2013) used only for numeric ranges.

### 7. Pedagogy (`pass`)
- Identifies and dismantles pervasive pedagogical misconceptions in Pakistani English assessment:
  - "objective tests only measure memory" (corrected in 7.1 by showing how situation-based items test application and grammar in use).
  - "essay marking cannot be fair" (corrected in 7.2 by demonstrating how an analytic rubric makes judgement explicit and reduces mark drift).
  - "a test is good if many pupils fail it" (corrected in 7.2 by clarifying that tests must match learning outcomes rather than filter arbitrarily).
- Practical pair activities, worked lesson plans, and authentic rubric development tasks feasible in Pakistani school contexts.

---

## Findings

1. **Finding F1 (Severity: `uncertain`):** Visual browser and print render review unavailable.  
   *Details:* Production deployed SHA `1793d49325c9148bea848c4f85d16e11420a881e` does not match HEAD `4afd7143719c2666f85bff10fd51deb7b705aee2` for EFPG-401 Unit 7 (6 files differ: index.mdx, topic-01.mdx, topic-02.mdx, and 3 WebP raster illustration assets fig-U7-5.webp, fig-U7-6.webp, fig-U7-7.webp). In accordance with crew brief, render-inspect against live site was skipped and recorded as unavailable. Live browser 360px viewport, keyboard navigation, and A4 print view remain unverified.
2. **Finding F2 (Severity: `uncertain`):** Reviewer independence and qualification boundary.  
   *Details:* Review performed by independent agent `agent:agy` (run ID `dc3111f5-403d-4575-8516-64a91071607a`) on model `Gemini 3.8 Flash (Medium)`. Author run was `crew-job:efpg-401-u07-author` (`opencode`). No server-protected signing host or registered qualification credentials exist. This report is an advisory G3 review and does not constitute certification or provisional publication.

---

## Command Evidence

| Command | Exit Code | Log Path |
|---|---|---|
| `validate:content` | 0 | `specs/content/efpg-401/reviews/unit-07/G3/dc3111f5-403d-4575-8516-64a91071607a/logs/validate-content.txt` |
| `check:depth-gate` | 0 | `specs/content/efpg-401/reviews/unit-07/G3/dc3111f5-403d-4575-8516-64a91071607a/logs/check-depth-gate.txt` |
| `check:figures` | 0 | `specs/content/efpg-401/reviews/unit-07/G3/dc3111f5-403d-4575-8516-64a91071607a/logs/check-figures.txt` |
| `check:no-em-dash` | 0 | `specs/content/efpg-401/reviews/unit-07/G3/dc3111f5-403d-4575-8516-64a91071607a/logs/check-no-em-dash.txt` |
| `check:no-answer-keys` | 0 | `specs/content/efpg-401/reviews/unit-07/G3/dc3111f5-403d-4575-8516-64a91071607a/logs/check-no-answer-keys.txt` |
| `check:docs-sync` | 0 | `specs/content/efpg-401/reviews/unit-07/G3/dc3111f5-403d-4575-8516-64a91071607a/logs/check-docs-sync.txt` |
| `render-review` | 1 | `specs/content/efpg-401/reviews/unit-07/G3/dc3111f5-403d-4575-8516-64a91071607a/logs/render-review.txt` |
| `check:content` | 0 | `specs/content/efpg-401/reviews/unit-07/G3/dc3111f5-403d-4575-8516-64a91071607a/logs/check-content.txt` |
