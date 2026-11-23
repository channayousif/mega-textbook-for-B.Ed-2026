# GCCE-400 Unit 2 - G3 English Review Summary

Reviewer: agent:agy  
Model: Gemini 3.8 Flash (Medium)  
Reviewer Run ID: 5e1512cc-a227-4b8b-b563-9df2a22db9f6  
Author Run ID: commit:a36d38f00  
Reviewed Commit: e30a8ed69d1bd845227fc187ae5522ee92c4aa71  
Stage: G3  
Date: 2026-11-23  
Disposition: **escalate** (advisory only; G3 remains open and unsigned)

---

## Executive Summary

GCCE-400 Unit 2 (*State, Government and Civil Society*) is a well-structured, culturally anchored, and pedagogically sound English unit draft. It strictly adheres to the approved course guide leaves (Weeks 4-5), content specification, coverage requirements, depth budget, and style guide (zero em dashes, valid frontmatter, responsive tables, and clean heading hierarchy). All external, statutory and constitutional sources are verified or honestly declared under `## Unverifiable sources` with confirmed attributions (specifically verifying the Montevideo Convention Article 1 state qualifications, the Sindh Local Government Act 2013 schedule of municipal functions, Batool et al. 2019 civil society analysis, FAFEN 2024 turnout figures, and current 1973 constitutional articles up to the Twenty-seventh Amendment 2025). Assessment items (10 MCQs, 10 RRQs, 5 ERQs) are independently verified and match the approved blueprint with full answer quarantine. All 14 repository content gates pass cleanly.

The review is escalated solely because visual rendering inspection against the live production site was unavailable under the mandatory crew check:
`git diff --quiet "$(cat ~/deploy/deployed-sha)" HEAD -- docs/semester-4/gcce-400/unit-02 static/img/figures/gcce-400/unit-02/` exited 1 (deployed commit `6804a30c` lacks candidate inputs of HEAD `e30a8ed69`, specifically banner markup and `fig-U2-5.webp` added in `a36d38f00`), and the host environment strictly prohibits running a local build, dev server, or Playwright Chromium.

---

## Findings

| ID | Severity | Criterion | Finding |
|---|---|---|---|
| F1 | uncertain | accessibility | Live site build (`6804a30cf4f25aad3058c29f9f1b29416decbbe5`) does not match current candidate inputs (`e30a8ed69d1bd845227fc187ae5522ee92c4aa71`), as `index.mdx` and `fig-U2-5.webp` were committed in `a36d38f00`. Per the crew brief, `render-review` is recorded as unavailable, and accessibility remains unverified pending production deployment or dedicated CI render. |
| F2 | advisory | assessment | Assessment bank was independently solved from question prompts and completely matches supplied keys and model answers; blinded verification with answer guidance physically separated in delivery remains best practice. |
| F3 | advisory | sources | The municipal function of street lighting was confirmed by the reviewer as an explicit statutory function under Schedule II of the Sindh Local Government Act 2013; declarations in `sources/unit-02.md` under `## Unverifiable sources` are honest and compliant with Constitution Art. VII and D-2026-0001. |

---

## Criterion Evidence

### 1. authority - pass
- **Evidence:**
  - `Scheme-and-Course-guides/extracted-text/4TH SEMESTER.txt:128-136` (Guide Weeks 4-5, sections 4.1-4.3, 5.1-5.3).
  - `specs/content/gcce-400/content-spec.md:143-188` (Unit 2 spec, SLO:GCCE-400-2-1, -2-2).
  - `docs/semester-4/gcce-400/unit-02/index.mdx:6-9, 24-34` (exact SLO refs and learning outcomes).
  - All topic files carry corresponding `clo_refs` and approved section headings matching guide leaves.

### 2. sources - pass
- **Evidence:**
  - `specs/content/gcce-400/reviews/unit-02/G3/5e1512cc-a227-4b8b-b563-9df2a22db9f6/source-verification.md`.
  - `specs/content/gcce-400/sources/unit-02.md` and bound excerpts under `specs/content/gcce-400/sources/texts/`.
  - Articles 1, 7, 16, 17, 19, 25A, 50, 51, 59, 70, 73, 75, 90, 91, 101, 106, 129, 130, 140A, 142 and 175 checked against current 1973 Constitution of Pakistan.
  - Montevideo Convention (1933) Article 1 qualifications verified.
  - Sindh Local Government Act 2013 local governance framework and street lighting municipal function verified.
  - Batool et al. (2019) LASSIJ analysis of civil society in Pakistan verified.
  - Business Recorder (2024) FAFEN turnout figures verified.
  - Print-only sources (Glencoe, Youniss & Levine) properly declared under `## Unverifiable sources` with catalog/title checks per D-2026-0001.

### 3. coverage - pass
- **Evidence:**
  - `specs/content/gcce-400/coverage/unit-02.md` maps subtopics U2-01 through U2-06 to topic files and sections.
  - `docs/semester-4/gcce-400/unit-02/topic-01.mdx` covers U2-01, U2-02, U2-03.
  - `docs/semester-4/gcce-400/unit-02/topic-02.mdx` covers U2-04, U2-05, U2-06.
  - `specs/content/gcce-400/concepts/unit-02.md` (CON:GCCE-400-2-1 through CON:GCCE-400-2-6) fully connected to assessment item IDs without cycles.

### 4. assessment - pass
- **Evidence:**
  - `specs/content/gcce-400/reviews/unit-02/G3/5e1512cc-a227-4b8b-b563-9df2a22db9f6/assessment-independent.md`.
  - `docs/semester-4/gcce-400/unit-02/unit-assessment.mdx:30-181` (10 MCQs, 10 RRQs, 5 ERQs).
  - MCQs Remember-to-Apply; RRQs Understand-to-Analyze; ERQs Analyze-to-Evaluate/Create.
  - ERQ 4 explicitly fulfills content-spec blueprint requirement (evaluating a named Pakistani civil-society organisation and representation).
  - Analytic rubrics (0-3 marks across 4 criteria = 12 marks total) provided for all 5 ERQs.
  - Quarantined answers in final `## Answers and marking guidance` section verified by `check:no-answer-keys` (exit 0).

### 5. accessibility - unverified
- **Evidence:**
  - `specs/content/gcce-400/reviews/unit-02/G3/5e1512cc-a227-4b8b-b563-9df2a22db9f6/logs/static-accessibility.txt`.
  - `specs/content/gcce-400/reviews/unit-02/G3/5e1512cc-a227-4b8b-b563-9df2a22db9f6/logs/render-review.txt` (exit 1).
  - All 4 schematic SVG figures and dark variants pass `measure-figure-text.mjs` with zero text overflows and no wordmark overprints.
  - Headings are strictly monotonic across all 5 unit files.
  - Unverified status due to live site SHA mismatch and prohibition of local dev server/build/Playwright.

### 6. readability - pass
- **Evidence:**
  - Reading time estimates: Index (2 min), Topic 2.1 (12 min), Topic 2.2 (11 min), Assessment (14 min), Teacher notes (2 min), Total: 41 minutes (within approved 32-44 depth band).
  - High-frequency accessible vocabulary suited for intermediate graduates entering B.Ed.
  - New terminology introduced and defined before use with `<Glossary term="..." />` integration.
  - Zero em dashes across all unit files.

### 7. pedagogy - pass
- **Evidence:**
  - Contextualised Sindhi scenarios: Sana in Mirpurkhas (leaking school roof and election discussion), Kashif in Hyderabad (mothers' group organizing for science teacher).
  - Structured progression: Situation -> Conceptual explanation -> Misconception refutation -> Worked example -> Low-resource group activity -> Formative retrieval -> Summary -> Checklist -> Practicum task -> Summative rubric task.
  - Approved misconceptions explicitly addressed: state vs government, civil society as NGOs only, one vote makes no difference.

---

## Advisory Tracker Row

For inclusion in `specs/content/gcce-400/tasks.md`:

```markdown
| Unit 2 | G3 en-review | ▢ | agent:agy | Advisory escalation only; G3 remains open. Finding F1 (live site diff non-empty vs deployed SHA 6804a30c, render-review unavailable): [report](reviews/unit-02/G3/5e1512cc-a227-4b8b-b563-9df2a22db9f6.json). No certification. |
```
