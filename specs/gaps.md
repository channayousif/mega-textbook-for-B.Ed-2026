# Curriculum Gaps & Discrepancies Log

Per Constitution Art. II.3, any ambiguity or mismatch between the **board Scheme of Study** (`Scheme-and-Course-guides/B.Ed 4 Year board.docx`) and the **course guides** is logged here and escalated to the curriculum owner (Yousif) — never invented or silently resolved.

Status: `open` (awaiting owner decision) · `resolved` (decision recorded).

---

## G-2026-01 — Sem I/II course guides extracted (was: pending PDF extraction)
- **Status:** resolved
- **Detail:** `1st 2026.pdf` and `2nd 2026.pdf` are now text-extracted (via `pdfminer.six`/`pypdf` in a venv; `poppler-utils` needs root and was unavailable). Both follow the enriched 2026 structure: *Suggested Practical Activities (optional)*, *Suggested Instructional/Reading Materials*, *Teaching/Instructional Strategies*, *Practical Work*, *Assessment Criteria*, *Recommended Books*.
- **Confirmed course inventory:**
  - **Sem I (6):** GENG-300 Functional English · GNAS-301 Environmental Science · GICT-300 Application of ICT · GQUR-300 Quantitative Reasoning-I (Maths) · EFMP-301 Educational Psychology · EFMP-302 Teaching Profession.
  - **Sem II (7):** GENG-301 Expository Writing · GQUR-301 Quantitative Reasoning-II · GSOS-301 Sociology · EFMP-303 Educational Policies & Plans of Pakistan · EFMP-304 Critical Thinking & Reflective Practices · EFMP-305 Inclusive Education · GPKS-302 Pakistan Studies.

## G-2026-02 — GNAS code mismatch (Sem I)
- **Status:** open
- **Detail:** Environmental Science is coded **GNAS-301** in the Sem I guide but **GNAS-401** in the board scheme.
- **Ask:** Which code is authoritative for seeding `courses.code`?

## G-2026-03 — Pakistan Studies semester/code mismatch
- **Status:** open
- **Detail:** The Sem II guide includes **GPKS-302 Pakistan Studies (2 CH)**. The board scheme lists Pakistan Studies as **GPKS-402** under **Semester IV**.
- **Ask:** Does Pakistan Studies belong to Sem II or Sem IV, and under which code? Affects catalog placement and content priority (both are in the Sems 1–4 priority band regardless).

## G-2026-04 — Fehm-e-Quran (GUHQ-301) absent from Sem II guide
- **Status:** open
- **Detail:** The board lists **GUHQ-301 Fehm-e-Quran I (1 CH)** in Sem II, but the Sem II guide contains no such course. A "Understanding of Holy Quran I / **GUHQ-401**, Semester: 2nd" block instead appears inside `3rd 2026.docx`.
- **Ask:** Confirm the correct code (GUHQ-301 vs GUHQ-401) and which semester's guide should carry it.

## G-2026-05 — GSOS-301 credit-hours mismatch (Sem II)
- **Status:** open
- **Detail:** Sociology (GSOS-301) shows **3 CH** in the guide vs **2 (2-0)** in the board scheme.
- **Ask:** Authoritative credit-hour value for the catalog/seed.
