# EFPG-401 Unit 2 Independent G3 English Review Summary

**Course:** EFPG-401 Teaching of English  
**Unit:** Unit 2 (Teaching of English)  
**Stage:** G3 (English Review)  
**Disposition:** **escalate**  
**Reviewer:** `agent:agy`  
**Reviewer Run ID:** `39596879-d636-4d89-8a00-e06f6d15a654`  
**Author Run:** `crew-efpg-401-u02-author` (`opencode`)  
**Model:** Gemini 3.8 Flash (Medium)  
**Reviewed Commit:** `925047c67761ce41ad1ba0daeaae7e78077d24e5` (HEAD)  
**Date:** 2026-11-15  

---

## Executive Summary

This independent G3 review evaluated EFPG-401 Unit 2 across all seven required rubric criteria (`authority`, `sources`, `coverage`, `assessment`, `accessibility`, `readability`, `pedagogy`). The unit prose, assessment items, and pedagogical architecture demonstrate high instructional quality, complete alignment with course guide subtopics 2.1 through 2.5, and authentic adaptation to primary and elementary classrooms across Sindh and Pakistan.

All 25 assessment items (10 MCQs, 10 RRQs, 5 ERQs) were solved independently before reading supplied answers; all keys, distractors, marking schemes, and analytic rubrics are mathematically and pedagogically sound. Deterministic content gates (`validate:content`, `check:depth-gate`, `check:figures`, `check:no-em-dash`, `check:no-answer-keys`, `check:docs-sync`, and full `check:content`) all exit 0 cleanly.

The review returns an advisory **escalate** disposition because actual live browser and print view inspection (`render-review`) is unavailable under repository constraints:
1. Production deployed SHA (`33d5feca41ff3c8eb87c7da6848392be5a5eb561`) differs from HEAD (`925047c67761ce41ad1ba0daeaae7e78077d24e5`) across 12 files (6 MDX files and 6 WebP raster illustration assets).
2. Per the crew brief instructions, when the diff is non-empty, the live site is not the input and `render-review` must be recorded as unavailable.
3. Host resource limits strictly prohibit running `npm run build`, a local dev server, or Playwright.

This report is advisory and does not constitute final certification or provisional publication. G3 remains open (`▢`).

---

## Rubric Evaluation

### 1. Authority (`pass`)
- **Course Guide Subtopics:** Covers all five subtopics from `Scheme-and-Course-guides/extracted-text/3rd 2026.txt:56-61`:
  - 2.1 Teaching of prose -> `topic-01.mdx`
  - 2.2 Teaching of poems -> `topic-02.mdx`
  - 2.3 Teaching of composition -> `topic-03.mdx`
  - 2.4 Teaching of vocabulary -> `topic-04.mdx`
  - 2.5 Teaching of pronunciation -> `topic-05.mdx`
- **Intended Learning Outcomes:** Directly addresses `SLO:EFPG-401-2-1` (prose, poems, composition) and `SLO:EFPG-401-2-2` (vocabulary, pronunciation).
- **Approved Spec Alignment:** Conforms to `specs/content/efpg-401/content-spec.md` Unit 2 specification.

### 2. Sources (`pass`)
- **Open-Access Sources:**
  - `antika-2017-poetry` (TELL-US Journal, gold OA): Bound excerpt in `sources/texts/antika-2017-poetry.md`, cited in `topic-02.mdx:37` and `unit-02.md`.
  - `tamimi-2018-vocabulary` (CEPS Journal, diamond OA): Bound excerpt in `sources/texts/tamimi-2018-vocabulary.md`, cited in `topic-04.mdx:50` and `unit-02.md`.
- **Print Monographs:**
  - `sheikh-1998-tesl`, `mohammad-1998-modern`, and `celce-murcia-1991` are declared under `## Unverifiable sources` in `specs/content/efpg-401/sources/unit-02.md` with dates, attempts, and explicit invocation of owner ruling `D-2026-0001`. Prose relies on them for title-level conceptual support only, without uncorroborated factual overclaiming.

### 3. Coverage (`pass`)
- **Checklist Leaf Topics:** All five checklist leaves are taught with complete sections, worked lesson examples, pair activities, self-assessment checklists, and summative tasks.
- **Coverage Mapping:** `specs/content/efpg-401/coverage/unit-02.md` accurately maps all topics and reinforcement tasks to assessment items.
- **Concept Graph:** `specs/content/efpg-401/concepts/unit-02.md` links all six unit concepts (`CON:EFPG-401-2-1` to `CON:EFPG-401-2-6`) to SLOs and assessment items.

### 4. Assessment (`pass`)
- **Independent Solution:**
  - All 10 MCQs independently solved; keys match 100% (1-C, 2-B, 3-B, 4-B, 5-C, 6-B, 7-B, 8-B, 9-B, 10-C). Distractors are plausible, unambiguous, and grammatically parallel.
  - All 10 RRQs independently solved; marking schemes provide clear, objective 2-mark and 3-mark scoring criteria.
  - All 5 ERQs independently solved; each includes an analytic rubric (10 marks) with explicit Bloom demand (Analyze, Create, Evaluate).
- **Placement & Security:** Answer keys are strictly confined to the final bounded `## Answers and marking guidance` section of `unit-assessment.mdx`. `check:no-answer-keys` confirms zero leaks.

### 5. Accessibility (`unverified`)
- **Static Inspection (`pass`):**
  - Semantic heading hierarchy is strictly monotonic (`#` -> `##` -> `###`).
  - Anchor text is descriptive (`[Teaching prose](./topic-01)`).
  - PrintHandout component present on all topic and assessment pages.
  - 10 schematic SVGs and 10 `.dark.svg` counterparts are placed with descriptive alt text and ARIA attributes.
  - 6 WebP illustration assets placed with detailed alt text.
  - `node scripts/measure-figure-text.mjs` exits 0.
- **Visual Inspection (`unverified`):**
  - Render inspection against live production build is unavailable because production deployed SHA differs from HEAD.
  - Mobile (360px viewport), table horizontal scrollability, and A4 print layout cannot be dynamically verified.

### 6. Readability (`pass`)
- Prose is pitched appropriately for B.Ed teacher candidates / HSC graduates.
- Concrete classroom narratives set in Sukkur, Hyderabad, Larkana, Karachi, and Peshawar provide local grounding.
- Zero em dashes (U+2014) throughout. En dashes (U+2013) used only for numeric ranges.

### 7. Pedagogy (`pass`)
- Identifies and dismantles pervasive pedagogical misconceptions in Pakistani English teaching:
  - Prose: translation vs reading for meaning.
  - Poetry: rote recitation vs enjoyment and response.
  - Composition: copying a model essay vs guided-to-free progression.
  - Vocabulary: memorising 20-word lists vs rich presentation in context.
  - Pronunciation: chasing a foreign native accent vs communicative intelligibility.
- Realistic lesson timings (e.g. 35-minute periods) and classroom activities feasible with minimal resources.

---

## Findings

1. **Finding F1 (Severity: `uncertain`):** Visual browser and print render review unavailable.  
   *Details:* Production deployed SHA `33d5feca41ff3c8eb87c7da6848392be5a5eb561` does not match HEAD `925047c67761ce41ad1ba0daeaae7e78077d24e5` for EFPG-401 Unit 2 (12 files differ: 6 MDX files referencing newly added raster illustrations fig-U2-11 to fig-U2-16, and 6 WebP raster files). In accordance with crew brief, render-inspect against live site was skipped and recorded as unavailable. Live browser 360px viewport, keyboard navigation, and A4 print view remain unverified.
2. **Finding F2 (Severity: `uncertain`):** Reviewer independence and qualification boundary.  
   *Details:* Review performed by independent agent `agent:agy` (run ID `39596879-d636-4d89-8a00-e06f6d15a654`) on model `Gemini 3.8 Flash (Medium)`. Author run was `crew-efpg-401-u02-author` (`opencode`). No server-protected signing host or registered qualification credentials exist. This report is an advisory G3 review and does not constitute certification or provisional publication.
3. **Finding F3 (Severity: `advisory`):** Print monograph citations.  
   *Details:* Three guide-required print monographs (`sheikh-1998-tesl`, `mohammad-1998-modern`, `celce-murcia-1991`) are declared under `## Unverifiable sources` in `sources/unit-02.md` per owner ruling `D-2026-0001`. Claims in prose remain at title-level conceptual support without uncorroborated overstatement.

---

## Command Evidence

| Command | Exit Code | Log Path |
|---|---|---|
| `validate:content` | 0 | `specs/content/efpg-401/reviews/unit-02/G3/39596879-d636-4d89-8a00-e06f6d15a654/logs/validate-content.txt` |
| `check:depth-gate` | 0 | `specs/content/efpg-401/reviews/unit-02/G3/39596879-d636-4d89-8a00-e06f6d15a654/logs/check-depth-gate.txt` |
| `check:figures` | 0 | `specs/content/efpg-401/reviews/unit-02/G3/39596879-d636-4d89-8a00-e06f6d15a654/logs/check-figures.txt` |
| `check:no-em-dash` | 0 | `specs/content/efpg-401/reviews/unit-02/G3/39596879-d636-4d89-8a00-e06f6d15a654/logs/check-no-em-dash.txt` |
| `check:no-answer-keys` | 0 | `specs/content/efpg-401/reviews/unit-02/G3/39596879-d636-4d89-8a00-e06f6d15a654/logs/check-no-answer-keys.txt` |
| `check:docs-sync` | 0 | `specs/content/efpg-401/reviews/unit-02/G3/39596879-d636-4d89-8a00-e06f6d15a654/logs/check-docs-sync.txt` |
| `render-review` | 1 | `specs/content/efpg-401/reviews/unit-02/G3/39596879-d636-4d89-8a00-e06f6d15a654/logs/render-review.txt` |
| `check:content` | 0 | `specs/content/efpg-401/reviews/unit-02/G3/39596879-d636-4d89-8a00-e06f6d15a654/logs/check-content.txt` |

---

## Handoff

- **Tracker State:** Recorded advisory tracker row in `specs/content/efpg-401/tasks.md` under Unit 2 G3 stage with status `▢`, `agent:agy`, and reference to `39596879-d636-4d89-8a00-e06f6d15a654.json`. No `✅` mark, initials, or self-signing added.
- **Next Steps:** Once HEAD is deployed to production, a separate permitted render-review job can run `scripts/heavy.sh node scripts/render-inspect.mjs EFPG-401 2 --base https://textbook.com.pk --no-pdf` to capture live screenshots and close the render limitation.
