# GCCE-400 Unit 1 - G3 English Review Summary

Reviewer: agent:agy  
Model: Gemini 3.8 Flash (Medium)  
Reviewer Run ID: 29bfa88a-9bb9-423a-b2f1-07e612294e2f  
Author Run ID: commit:e3313626e  
Reviewed Commit: ae721439e7d35d09cdc5619e0a35e44698eb3b9a  
Stage: G3  
Date: 2026-11-23  
Disposition: **escalate** (advisory only; G3 remains open and unsigned)

---

## Executive Summary

GCCE-400 Unit 1 (*Introduction to Civics and Citizenship*) is an exemplary, culturally anchored, and pedagogically sound English draft. It adheres strictly to the approved course guide leaves (Weeks 1-3), content specification, coverage requirements, depth budget, and style guide (zero em dashes, valid frontmatter, responsive tables, and clean heading hierarchy). All 12 external and constitutional sources are verified or honestly declared under `## Unverifiable sources` with confirmed attributions (specifically verifying the Kymlicka & Norman 2000 distinction between citizenship as status and activity, and current 1973 constitutional articles). Assessment items (10 MCQs, 10 RRQs, 5 ERQs) are independently verified and match the approved blueprint with full answer quarantine. All 14 repository content gates pass cleanly.

The review is escalated solely because visual rendering inspection against the live production site was unavailable under the mandatory crew check:
`git diff --quiet "$(cat ~/deploy/deployed-sha)" HEAD -- docs/semester-4/gcce-400/unit-01 static/img/figures/gcce-400/unit-01/` exited 1 (deployed commit `fa037af` lacks the candidate inputs of HEAD `ae721439e`, specifically banner markup and `fig-U1-7.webp`), and the host environment strictly prohibits running a local build, dev server, or Playwright Chromium.

---

## Findings

| ID | Severity | Criterion | Finding |
|---|---|---|---|
| F1 | uncertain | accessibility | Live site build (`fa037aff166297e25a9bfc97b89cb3d1793f0420`) does not match current candidate inputs (`ae721439e7d35d09cdc5619e0a35e44698eb3b9a`), as `index.mdx` and `fig-U1-7.webp` were committed in `e3313626e`. Per the crew brief, `render-review` is recorded as unavailable, and accessibility remains unverified pending production deployment or dedicated CI render. |
| F2 | advisory | assessment | Assessment bank was independently solved from question prompts and completely matches supplied keys and model answers; blinded verification with answer guidance physically separated in delivery remains best practice. |
| F3 | advisory | sources | The attribution of the distinction between citizenship as status and citizenship as activity to Kymlicka & Norman (2000) was confirmed accurate by the reviewer; the declaration in `sources/unit-01.md` under `## Unverifiable sources` is honest and compliant with Constitution Art. VII and D-2026-0001. |

---

## Criterion Evidence

### 1. authority - pass
- **Evidence:**
  - `Scheme-and-Course-guides/extracted-text/4TH SEMESTER.txt:116-127` (Guide Weeks 1-3, sections 1.1-1.3, 2.1-2.3, 3.1-3.2).
  - `specs/content/gcce-400/content-spec.md:92-142` (Unit 1 spec, SLO:GCCE-400-1-1, -1-2, -1-3, D-2026-0086, D-2026-0093).
  - `docs/semester-4/gcce-400/unit-01/index.mdx:6-9, 25-36` (exact SLO refs and learning outcomes).
  - All three topic files carry corresponding `clo_refs` and approved section headings.

### 2. sources - pass
- **Evidence:**
  - `specs/content/gcce-400/reviews/unit-01/G3/29bfa88a-9bb9-423a-b2f1-07e612294e2f/source-verification.md`.
  - `specs/content/gcce-400/sources/unit-01.md` and bound excerpts under `specs/content/gcce-400/sources/texts/`.
  - Articles 4, 5, 16, 17, 19, 25, 25A, and 51 checked against current 1973 Constitution of Pakistan.
  - Kymlicka & Norman (2000) status vs activity attribution confirmed in Introduction.
  - Print-only sources (Glencoe, Kymlicka & Norman, Mattson) properly declared under `## Unverifiable sources` with catalog/title checks per D-2026-0001.

### 3. coverage - pass
- **Evidence:**
  - `specs/content/gcce-400/coverage/unit-01.md` maps subtopics U1-01 through U1-08 to topic files and sections.
  - `docs/semester-4/gcce-400/unit-01/topic-01.mdx` covers U1-01, U1-02, U1-03.
  - `docs/semester-4/gcce-400/unit-01/topic-02.mdx` covers U1-04, U1-05, U1-06.
  - `docs/semester-4/gcce-400/unit-01/topic-03.mdx` covers U1-07, U1-08.
  - `specs/content/gcce-400/concepts/unit-01.md` (CON:GCCE-400-1-1 through CON:GCCE-400-1-8) fully connected to assessment item IDs without cycles.

### 4. assessment - pass
- **Evidence:**
  - `specs/content/gcce-400/reviews/unit-01/G3/29bfa88a-9bb9-423a-b2f1-07e612294e2f/assessment-independent.md`.
  - `docs/semester-4/gcce-400/unit-01/unit-assessment.mdx:32-188` (10 MCQs, 10 RRQs, 5 ERQs).
  - MCQs Remember-to-Apply; RRQs Understand-to-Analyze; ERQs Analyze-to-Evaluate/Create.
  - ERQ 3 explicitly fulfills content-spec blueprint requirement (classifying five Pakistani citizen actions).
  - Analytic rubrics (0-3 marks across 4 criteria = 12 marks total) provided for all 5 ERQs.
  - Quarantined answers in final `## Answers and marking guidance` section verified by `check:no-answer-keys` (exit 0).

### 5. accessibility - unverified
- **Evidence:**
  - `specs/content/gcce-400/reviews/unit-01/G3/29bfa88a-9bb9-423a-b2f1-07e612294e2f/logs/static-accessibility.txt`.
  - `specs/content/gcce-400/reviews/unit-01/G3/29bfa88a-9bb9-423a-b2f1-07e612294e2f/logs/render-review.txt` (exit 1).
  - All 6 schematic SVG figures and dark variants pass `measure-figure-text.mjs` with zero text overflows and no wordmark overprints.
  - Headings are strictly monotonic across all 6 unit files.
  - Unverified status due to live site SHA mismatch and prohibition of local dev server/build/Playwright.

### 6. readability - pass
- **Evidence:**
  - Reading time estimates: Index (3 min), Topic 1.1 (10 min), Topic 1.2 (10 min), Topic 1.3 (11 min), Assessment (15 min), Teacher notes (2 min), Total: 51 minutes (within approved 36-52 depth band).
  - High-frequency accessible vocabulary suited for intermediate graduates entering B.Ed.
  - New terminology introduced and defined before use with `<Glossary term="..." />` integration.

### 7. pedagogy - pass
- **Evidence:**
  - Contextualised Sindhi scenarios: Asif in Shikarpur (flooded lane problem), Mehwish in Mirpurkhas (grandmother CNIC question), Faraz in Sukkur (monsoon flood relief actions).
  - Structured progression: Situation -> Conceptual explanation -> Misconception refutation -> Worked example -> Low-resource group activity -> Formative retrieval -> Summary -> Checklist -> Practicum task -> Summative rubric task.
  - Approved misconceptions explicitly addressed: civics vs politics, voting as sole civic duty, identity card as sole citizenship dimension.

---

## Advisory Tracker Row

For inclusion in `specs/content/gcce-400/tasks.md`:

```markdown
| Unit 1 | G3 en-review | ▢ | agent:agy | Advisory escalation only; G3 remains open. Finding F1 (live site diff non-empty vs deployed SHA fa037af, render-review unavailable): [report](reviews/unit-01/G3/29bfa88a-9bb9-423a-b2f1-07e612294e2f.json). No certification. |
```
