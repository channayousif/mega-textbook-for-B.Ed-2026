# EFPG-401 Unit 4 Independent G3 English Review Summary

**Course:** EFPG-401 Teaching of English  
**Unit:** Unit 4 (Teaching of Grammar)  
**Stage:** G3 (English Review)  
**Disposition:** **escalate**  
**Reviewer:** `agent:agy`  
**Reviewer Run ID:** `09a7dfec-778d-4a22-be90-cc04eb62924e`  
**Author Run:** `crew-job:efpg-401-u04-author` (`opencode`)  
**Model:** Gemini 3.8 Flash (Medium)  
**Reviewed Commit:** `1793d49325c9148bea848c4f85d16e11420a881e` (HEAD)  
**Date:** 2026-11-15  

---

## Executive Summary

This independent G3 review evaluated EFPG-401 Unit 4 across all seven required rubric criteria (`authority`, `sources`, `coverage`, `assessment`, `accessibility`, `readability`, `pedagogy`). The unit prose, assessment items, and pedagogical architecture demonstrate high instructional quality, complete alignment with course guide subtopic 4.1 (Functional approach towards grammar teaching), and authentic adaptation to primary English classrooms in Khairpur and across Sindh.

All 25 assessment items (10 MCQs, 10 RRQs, 5 ERQs) were solved independently before reading supplied answers; all keys, distractors, marking schemes, and analytic rubrics are mathematically and pedagogically sound. Deterministic content gates (`validate:content`, `check:depth-gate`, `check:figures`, `check:no-em-dash`, `check:no-answer-keys`, `check:docs-sync`, and full `check:content`) all exit 0 cleanly.

The review returns an advisory **escalate** disposition because actual live browser and print view inspection (`render-review`) is unavailable under repository constraints:
1. Production deployed SHA (`925047c672a51ef2be34afc401c50a0a806735f6`) differs from HEAD (`1793d49325c9148bea848c4f85d16e11420a881e`) across 4 files (placing `fig-U4-5` in `index.mdx`, placing `fig-U4-4` in `topic-01.mdx`, and adding WebP raster illustration assets `fig-U4-4.webp` and `fig-U4-5.webp`).
2. Per the crew brief instructions, when the diff is non-empty, the live site is not the input and `render-review` must be recorded as unavailable.
3. Host resource limits strictly prohibit running `npm run build`, a local dev server, or Playwright.

This report is advisory and does not constitute final certification or provisional publication. G3 remains open (`▢`).

---

## Rubric Evaluation

### 1. Authority (`pass`)
- **Course Guide Subtopics:** Covers subtopic 4.1 from `Scheme-and-Course-guides/extracted-text/3rd 2026.txt:71-72` ("4.1. Functional approach towards grammar teaching.")
- **Intended Learning Outcomes:** Directly addresses `SLO:EFPG-401-4-1` (the functional approach towards grammar teaching, with its presentation and practice).
- **Approved Spec Alignment:** Conforms to `specs/content/efpg-401/content-spec.md` Unit 4 specification.

### 2. Sources (`pass`)
- **Open-Access Sources:**
  - `koca-2024-grammar` (International Journal of Language and Literary Studies, CC BY 4.0): Bound excerpt in `specs/content/efpg-401/sources/texts/koca-2024-grammar.md`, supporting U4-01 and U4-03.
  - `kiran-2021-gtm-clt` (Pakistan Social Sciences Review, diamond OA): Bound excerpt in `specs/content/efpg-401/sources/texts/kiran-2021-gtm-clt.md`, supporting U4-02.
- **Print Monographs:**
  - `celce-murcia-1991` is declared under `## Unverifiable sources` in `specs/content/efpg-401/sources/unit-04.md` with dates, retrieval attempts, and explicit invocation of owner ruling `D-2026-0001`. Prose relies on it for title-level conceptual support only, without uncorroborated factual overclaiming.

### 3. Coverage (`pass`)
- **Checklist Leaf Topics:** All three sub-topic checklist leaves (U4-01, U4-02, U4-03) are taught with complete explanations, worked lesson examples, pair activities, self-assessment checklists, and summative tasks in `topic-01.mdx`.
- **Coverage Mapping:** `specs/content/efpg-401/coverage/unit-04.md` accurately maps all topics and reinforcement tasks to assessment items.
- **Concept Graph:** `specs/content/efpg-401/concepts/unit-04.md` links all five unit concepts (`CON:EFPG-401-4-1` to `CON:EFPG-401-4-5`) to SLOs and assessment items.

### 4. Assessment (`pass`)
- **Independent Solution:**
  - All 10 MCQs independently solved; keys match 100% (1-B, 2-B, 3-C, 4-A, 5-B, 6-B, 7-B, 8-B, 9-B, 10-C). Distractors are plausible, unambiguous, and grammatically parallel.
  - All 10 RRQs independently solved; marking schemes provide clear, objective 2-mark, 3-mark, and 4-mark scoring criteria.
  - All 5 ERQs independently solved; each includes an analytic rubric (10 marks) with explicit Bloom demand (Analyze, Evaluate, Create).
- **Placement & Security:** Answer keys are strictly confined to the final bounded `## Answers and marking guidance` section of `unit-assessment.mdx`. `check:no-answer-keys` confirms zero leaks.

### 5. Accessibility (`unverified`)
- **Static Inspection (`pass`):**
  - Semantic heading hierarchy is strictly monotonic (`#` -> `##` -> `###`).
  - Anchor text is descriptive (`[The functional approach to teaching grammar](./topic-01)`).
  - PrintHandout component present on topic-01 and unit-assessment.
  - 3 schematic SVGs and 3 `.dark.svg` counterparts are placed with descriptive alt text and ARIA attributes.
  - 2 WebP illustration assets (`fig-U4-4.webp` and `fig-U4-5.webp`) placed with detailed alt text.
  - `scripts/heavy.sh node scripts/measure-figure-text.mjs` exits 0 for all SVGs.
- **Visual Inspection (`unverified`):**
  - Render inspection against live production build is unavailable because production deployed SHA differs from HEAD.
  - Mobile (360px viewport), table horizontal scrollability, and A4 print layout cannot be dynamically verified.

### 6. Readability (`pass`)
- Prose is pitched appropriately for B.Ed teacher candidates / HSC graduates.
- Concrete classroom narrative featuring Saima and Madam Rukhsana in Khairpur, Sindh provides authentic local grounding.
- Zero em dashes (U+2014) throughout. En dashes (U+2013) used only for numeric ranges.

### 7. Pedagogy (`pass`)
- Identifies and dismantles pervasive pedagogical misconceptions in Pakistani English grammar teaching:
  - "grammar is learned by memorising rules" (distinguishes declarative knowledge from procedural knowledge).
  - "a functional approach means no grammar teaching" (clarifies that form is still taught, but after meaning and with use in mind).
  - "if pupils can say the rule they can use the structure" (differentiates memory recitation from communicative use).
- Detailed worked lesson plan showing five stages (Context, Notice, Understand, Controlled practice, Free use) for Grade 5 in Sukkur.
- Practical pair activities and practicum school observation tasks feasible in Pakistani school contexts.

---

## Findings

1. **Finding F1 (Severity: `uncertain`):** Visual browser and print render review unavailable.  
   *Details:* Production deployed SHA `925047c672a51ef2be34afc401c50a0a806735f6` does not match HEAD `1793d49325c9148bea848c4f85d16e11420a881e` for EFPG-401 Unit 4 (4 files differ: index.mdx, topic-01.mdx, and 2 WebP raster illustration assets fig-U4-4.webp and fig-U4-5.webp). In accordance with crew brief, render-inspect against live site was skipped and recorded as unavailable. Live browser 360px viewport, keyboard navigation, and A4 print view remain unverified.
2. **Finding F2 (Severity: `uncertain`):** Reviewer independence and qualification boundary.  
   *Details:* Review performed by independent agent `agent:agy` (run ID `09a7dfec-778d-4a22-be90-cc04eb62924e`) on model `Gemini 3.8 Flash (Medium)`. Author run was `crew-job:efpg-401-u04-author` (`opencode`). No server-protected signing host or registered qualification credentials exist. This report is an advisory G3 review and does not constitute certification or provisional publication.
3. **Finding F3 (Severity: `advisory`):** Print monograph citations.  
   *Details:* One guide-required print monograph (`celce-murcia-1991`) is declared under `## Unverifiable sources` in `sources/unit-04.md` per owner ruling `D-2026-0001`. Claims in prose remain at title-level conceptual support without uncorroborated overstatement.

---

## Command Evidence

| Command | Exit Code | Log Path |
|---|---|---|
| `validate:content` | 0 | `specs/content/efpg-401/reviews/unit-04/G3/09a7dfec-778d-4a22-be90-cc04eb62924e/logs/validate-content.txt` |
| `check:depth-gate` | 0 | `specs/content/efpg-401/reviews/unit-04/G3/09a7dfec-778d-4a22-be90-cc04eb62924e/logs/check-depth-gate.txt` |
| `check:figures` | 0 | `specs/content/efpg-401/reviews/unit-04/G3/09a7dfec-778d-4a22-be90-cc04eb62924e/logs/check-figures.txt` |
| `check:no-em-dash` | 0 | `specs/content/efpg-401/reviews/unit-04/G3/09a7dfec-778d-4a22-be90-cc04eb62924e/logs/check-no-em-dash.txt` |
| `check:no-answer-keys` | 0 | `specs/content/efpg-401/reviews/unit-04/G3/09a7dfec-778d-4a22-be90-cc04eb62924e/logs/check-no-answer-keys.txt` |
| `check:docs-sync` | 0 | `specs/content/efpg-401/reviews/unit-04/G3/09a7dfec-778d-4a22-be90-cc04eb62924e/logs/check-docs-sync.txt` |
| `render-review` | 1 | `specs/content/efpg-401/reviews/unit-04/G3/09a7dfec-778d-4a22-be90-cc04eb62924e/logs/render-review.txt` |
| `check:content` | 0 | `specs/content/efpg-401/reviews/unit-04/G3/09a7dfec-778d-4a22-be90-cc04eb62924e/logs/check-content.txt` |

---

## Handoff

- **Tracker State:** Recorded advisory tracker row in `specs/content/efpg-401/tasks.md` under Unit 4 G3 stage with status `▢`, `agent:agy`, and reference to `09a7dfec-778d-4a22-be90-cc04eb62924e.json`. No `✅` mark, initials, or self-signing added.
- **Next Steps:** Once HEAD is deployed to production, a separate permitted render-review job can run `scripts/heavy.sh node scripts/render-inspect.mjs EFPG-401 4 --base https://textbook.com.pk --no-pdf` to capture live screenshots and close the render limitation.
