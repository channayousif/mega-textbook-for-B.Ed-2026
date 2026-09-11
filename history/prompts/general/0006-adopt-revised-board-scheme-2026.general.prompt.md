---
id: 0006
title: Adopt Revised Board Scheme 2026
stage: misc
date: 2026-09-10
surface: agent
model: claude-opus-5
feature: none
branch: chore/revised-board-scheme-2026
user: channayousif@gmail.com
command: (direct request - curriculum intake)
labels: ["curriculum", "scheme-of-study", "gaps", "catalog", "art-ii-3", "semester-2"]
links:
  spec: specs/006-content-pipeline/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - Scheme-and-Course-guides/B.Ed 4 Year 2026 revised after board.docx
 - Scheme-and-Course-guides/extracted-text/B.Ed 4 Year 2026 revised after board.txt
 - Scheme-and-Course-guides/extracted-text/README.md
 - specs/gaps.md
 - catalog/courses.json
 - SDD/ROADMAP.md
tests:
 - "validate:content / check:depth-gate / check:figures / check:no-em-dash / check:pipeline-gate / check:no-answer-keys - all PASS"
 - "npm test - 136/136"
 - "npm run build (en + ur) - exit 0; build/catalog-courses.json ships Sem 1 (6 courses) + Sem 2 (7 courses)"
 - "Credit-hour arithmetic re-derived from the revised scheme: Sem I 18, Sem II 19, Sem III 16, Sem IV 16; grand total 132"
---

## Prompt

@"Scheme-and-Course-guides/B.Ed 4 Year 2026 revised after board.docx" this is the latest revised
scheme of studies, this may be treated as final authority.

(Owner decisions taken via AskUserQuestion, 2026-09-10: G-2026-02 keep GNAS-301; G-2026-05 use
the scheme's 2 (2-0) for GSOS-301; scope = full update.)

## Response snapshot

Extracted the new `.docx` with the documented `zipfile` method and diffed it line-by-line against
the superseded `B.Ed 4 Year board.txt`. Ignoring an entity-escaping artifact (`&amp;` vs `&`), the
revision is a **three-way rotation of two courses**:

| Course | Superseded | Revised |
|---|---|---|
| GPKS-402 Pakistan Studies 2(2-0) | Sem IV | **Sem II** |
| GUHQ-301 Fehm-e-Quran I 1(0-1) | Sem II | **Sem III** |
| GUHQ-400 Fehm-e-Quran II 1(0-1) | Sem III | **Sem IV** |

Sem II 18 -> 19 CH, Sem IV 17 -> 16 CH, grand total still 132. **Semester I is byte-identical.**

All five `specs/gaps.md` entries are now resolved:
- **G-2026-03** and **G-2026-04** resolved *by the document itself*. The Fehm-e-Quran move
  explains both original anomalies at once: the Sem II guide had no such course because it moved
  to Sem III, which is exactly where the `3rd 2026.docx` block was found.
- **G-2026-02** (GNAS) resolved *against* the scheme by owner decision: **GNAS-301** from the Sem I
  guide is kept (it is the document teachers hold and the published content path
  `docs/semester-1/gnas-301/`); the scheme's `GNAS-401` is a board-side slip. No folder rename.
- **G-2026-05** (GSOS) resolved *for* the scheme: **2 (2-0)**, since credit hours are a property
  of the degree-awarding scheme.

Also surfaced and fixed a previously unlogged data error: `catalog/courses.json` carried
`GNAS-301` at `3 (3-0)`, matching neither source (the guide states only "Credit Hours 3" with no
split; the scheme states `3 (2-1)`). Reconciled to **code from the guide, split from the scheme**
= `GNAS-301, 3 (2-1)`, recorded inside G-2026-02 rather than changed silently (Art. II.3).

Applied: committed the source `.docx` + its extraction; extraction README gains the new row plus
a supersession note; `specs/gaps.md` rewritten with a "final authority" preamble, the rotation
table and per-gap decisions (all five `resolved`, "No open gaps"); `catalog/courses.json` fixes
the GNAS hours and **populates Semester II** with all 7 courses (GENG-301 flagged
`bilingual: false` on the Constitution Art. III.2 GENG-300 precedent, since the subject is the
English language); `SDD/ROADMAP.md` appendix re-pointed at the revised scheme with Sems I-IV
tables and the Sem I/II note rewritten.

## Outcome

- ✅ Impact: the scheme of studies now has a single named final authority, all five curriculum
  gaps are closed with recorded reasoning, and Semester II is catalog-ready for G0 intake.
- 🧪 Tests: all six content gates PASS; `npm test` 136/136; build green both locales; semester
  credit-hour arithmetic re-derived and matching.
- 📁 Files: source `.docx` + extraction + README; `specs/gaps.md`; `catalog/courses.json`;
  `SDD/ROADMAP.md`.
- 🔁 Next prompts: G0 course intake for the Sem II courses (content-specs), then Semesters III-VIII
  catalog population as their guides are reconciled.
- 🧠 Reflection: the revision resolved two gaps by *moving a course*, not by correcting a code -
  the Fehm-e-Quran "missing from the Sem II guide" anomaly was never an error, it was the guides
  already reflecting a scheme change the board had not yet published.

## Evaluation notes (flywheel)

- Failure modes observed: nearly mistook the `&amp;`/`&` entity difference for content change -
  caught by reading the diff rather than trusting the line count. A third, unlogged discrepancy
  (GNAS credit-hour split) only surfaced because the catalog was cross-checked against *both*
  sources instead of just the one being changed.
- Graders run and results (PASS/FAIL): Art. II.3 (escalate, never silently resolve) - PASS, every
  decision is attributed and dated in `specs/gaps.md`. Credit-hour totals vs the scheme - PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): a tiny CI check that re-derives each semester's credit
  hours from `catalog/courses.json` and fails on a mismatch with the scheme, so a future rotation
  cannot silently unbalance a semester.
