---
id: 0003
title: Extract Sem I/II PDF Course Guides
stage: general
date: 2026-07-17
surface: agent
model: claude-opus-4-8
feature: none
branch: main
user: channayousif@gmail.com
command: install poppler-utils and extract the Sem I/II PDFs
labels: ["curriculum", "pdf-extraction", "gaps", "sdd"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - specs/gaps.md
 - SDD/constitution.md
 - SDD/ROADMAP.md
tests:
 - "pdfminer extraction: 1st 2026.pdf (32586 chars), 2nd 2026.pdf (31299 chars) — both non-empty, structured"
---

## Prompt

install poppler-utils and extract the Sem I/II PDFs

## Response snapshot

`poppler-utils` install needs root (sudo password unavailable, no askpass). Worked around with a Python venv + `pdfminer.six`/`pypdf` (PEP 668 blocked a system pip install). Extracted both PDFs successfully.

Confirmed inventories:
- **Sem I (6):** GENG-300, GNAS-301, GICT-300, GQUR-300, EFMP-301, EFMP-302.
- **Sem II (7):** GENG-301, GQUR-301, GSOS-301, EFMP-303, EFMP-304, EFMP-305, GPKS-302.

Both PDFs use the enriched 2026 structure (Suggested Practical Activities optional, Reading Materials, Teaching Strategies, Practical Work, Assessment Criteria, Recommended Books).

Found and logged board-vs-guide discrepancies in new `specs/gaps.md` (G-2026-02..05): GNAS code 301 vs 401; Pakistan Studies Sem II/GPKS-302 vs board Sem IV/GPKS-402; Fehm-e-Quran GUHQ-301 vs GUHQ-401 (appears in 3rd guide); GSOS-301 credit hours 3 vs 2. Removed the "pending extraction" caveats from constitution Art. II.3 and the ROADMAP appendix, pointing them at the gaps log instead.

## Outcome

- ✅ Impact: Sem I/II guide content is now available; discrepancies surfaced for owner resolution instead of silent guesses.
- 🧪 Tests: extraction produced non-empty structured text for both PDFs.
- 📁 Files: created `specs/gaps.md`; updated constitution + ROADMAP notes.
- 🔁 Next prompts: curriculum owner resolves G-2026-02..05; then run G0 content-specs for Sem 1 courses.
- 🧠 Reflection: root-blocked apt handled via venv + pure-Python PDF libs; discrepancies escalated per Constitution Art. II.3.

## Evaluation notes (flywheel)

- Failure modes observed: apt needs root; system pip blocked by PEP 668. Both bypassed with a venv.
- Graders run and results (PASS/FAIL): extraction sanity check — PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): resolve the 4 open gaps, then reconcile the ROADMAP catalog codes.
