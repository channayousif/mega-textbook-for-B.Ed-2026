# Curriculum Gaps & Discrepancies Log

Per Constitution Art. II.3, any ambiguity or mismatch between the **board Scheme of Study** and
the **course guides** is logged here and escalated to the curriculum owner (Yousif), never
invented or silently resolved.

Status: `open` (awaiting owner decision) · `resolved` (decision recorded).

> **Scheme of Study - final authority (2026-09-10).** The curriculum owner has designated
> `Scheme-and-Course-guides/B.Ed 4 Year 2026 revised after board.docx` as the **final authority**
> for the scheme of studies. `B.Ed 4 Year board.docx` is the superseded earlier scheme, retained
> for provenance only. What the revision changed (diff of the two extractions):
>
> | Course | Superseded scheme | **Revised scheme (authoritative)** |
> |---|---|---|
> | GPKS-402 Pakistan Studies 2(2-0) | Semester IV | **Semester II** |
> | GUHQ-301 Fehm-e-Quran I 1(0-1) | Semester II | **Semester III** |
> | GUHQ-400 Fehm-e-Quran II 1(0-1) | Semester III | **Semester IV** |
>
> Credit-hour totals move accordingly: **Sem II 18 -> 19**, **Sem IV 17 -> 16**; Sem III
> unchanged at 16; grand total still **132**. **Semester I is unchanged** by the revision.
>
> "Final authority" settles precedence *in general*, but each guide-vs-scheme conflict was still
> decided on its own merits by the owner, recorded per gap below.

---

## G-2026-01 - Sem I/II course guides extracted (was: pending PDF extraction)
- **Status:** resolved
- **Detail:** `1st 2026.pdf` and `2nd 2026.pdf` are text-extracted (via `pdfminer.six`/`pypdf` in a venv; `poppler-utils` needs root and was unavailable). Both follow the enriched 2026 structure: *Suggested Practical Activities (optional)*, *Suggested Instructional/Reading Materials*, *Teaching/Instructional Strategies*, *Practical Work*, *Assessment Criteria*, *Recommended Books*.
- **Confirmed course inventory (reconciled against the revised scheme, 2026-09-10):**
  - **Sem I (6, 18 CH):** GENG-300 Functional English · GNAS-301 Environmental Science · GICT-300 Application of ICT · GQUR-300 Quantitative Reasoning-I (Maths) · EFMP-301 Educational Psychology · EFMP-302 Teaching Profession.
  - **Sem II (7, 19 CH):** GQUR-301 Quantitative Reasoning-II (Statistics) · GSOS-301 Social Science (Sociology) · GENG-301 Expository Writing · EFMP-303 Educational Policies & Plans of Pakistan · EFMP-304 Critical Thinking & Reflective Practices · EFMP-305 Inclusive Education · **GPKS-402 Pakistan Studies** (moved in from Sem IV by the revision; the guide's "GPKS-302" is superseded, see G-2026-03).

## G-2026-02 - GNAS code mismatch (Sem I)
- **Status:** resolved (owner decision, 2026-09-10)
- **Detail:** Environmental Science is coded **GNAS-301** in the Sem I course guide but **GNAS-401** in both the superseded and the revised board scheme. The revision did not touch Semester I, so the conflict stands on its own.
- **Decision:** **GNAS-301** is authoritative. The Sem I course guide is the document teachers and students actually hold, the code is already the published content path (`docs/semester-1/gnas-301/`), and the scheme's `GNAS-401` is treated as a board-side numbering slip. This is the one case where the guide is taken over the scheme, decided deliberately rather than by the general precedence rule.
- **Credit-hour reconciliation:** the guide states only `Credit Hours 3` with no lab split; the scheme states `3 (2-1)`. The catalog previously carried an invented `3 (3-0)`. Resolved to **`3 (2-1)`** - code from the guide, split from the scheme, which is the same posture taken for GSOS-301 in G-2026-05.

## G-2026-03 - Pakistan Studies semester/code mismatch
- **Status:** resolved (revised scheme, 2026-09-10)
- **Detail:** The Sem II guide includes **GPKS-302 Pakistan Studies (2 CH)**. The superseded scheme listed Pakistan Studies as **GPKS-402** under **Semester IV**.
- **Decision:** **GPKS-402, Semester II, 2 (2-0).** The revised scheme moves Pakistan Studies into Semester II, which vindicates the guide on *placement* and the scheme on *code*. `GPKS-302` is a guide-side numbering slip and is not used anywhere.

## G-2026-04 - Fehm-e-Quran (GUHQ) code and semester
- **Status:** resolved (revised scheme, 2026-09-10)
- **Detail:** The superseded scheme listed **GUHQ-301 Fehm-e-Quran I (1 CH)** in Sem II, but the Sem II guide contained no such course; an "Understanding of Holy Quran I / **GUHQ-401**, Semester: 2nd" block appeared instead inside `3rd 2026.docx`.
- **Decision:** **GUHQ-301 Fehm-e-Quran I, Semester III, 1 (0-1)** and **GUHQ-400 Fehm-e-Quran II, Semester IV, 1 (0-1)**. The revision moves Fehm-e-Quran I from Sem II to Sem III, which explains both anomalies at once: the Sem II guide has no such course *because it moved*, and the block in `3rd 2026.docx` is where it now belongs. The guide's `GUHQ-401` is a guide-side numbering slip.

## G-2026-05 - GSOS-301 credit-hours mismatch (Sem II)
- **Status:** resolved (owner decision, 2026-09-10)
- **Detail:** Social Science (Sociology), GSOS-301, shows **3 CH** in the Sem II guide vs **2 (2-0)** in both the superseded and the revised scheme.
- **Decision:** **2 (2-0).** Credit-hour values are a property of the degree-awarding scheme, so the scheme governs. This is consistent with the Sem II total of **19 CH** in the revised scheme (3+2+3+3+3+3+2).

---

## No open gaps

All five logged discrepancies are resolved. New ambiguities found during G0 course intake for
Semesters III-VIII should be appended here as `G-2026-06` onward and escalated before any catalog
or content change (Art. II.3).
