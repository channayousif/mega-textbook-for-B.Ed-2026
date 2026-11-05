# Unit 3 repairs for G3 report 20261102T212207Z-g3-desk-319cad35

Author repair record, 2026-11-05. This is an author repair record, not an independent review or certification.
Report: `20261102T212207Z-g3-desk-319cad35.json` (disposition: revise).

| Finding | Severity | Disposition |
|---|---|---|
| F5: Misquotation in ostep ch 39 | blocking | Repaired: `specs/content/gict-300/sources/texts/ostep.md` section 39.1 quotation restored to the book's verbatim sentence: "A file is simply a linear array of bytes, each of which you can read or write." (verified against OSTEP file-intro.pdf section 39.1). |
| F6: Taught-and-assessed sub-claims without excerpt support or disclosure | blocking | Repaired: `specs/content/gict-300/sources/texts/ostep.md` extended with verbatim section 39.9 metadata passage; buffer and spooling (topic-03.mdx / CON:GICT-300-3-10 / RRQ-10) and deletion semantics (topic-02.mdx) disclosed as title-level monograph support under `shellyVermaat` in `specs/content/gict-300/sources/unit-03.md` (## Unverifiable sources, D-2026-0001 option c). |
| F3: MCQ answer-position bias | advisory | Repaired: `unit-assessment.mdx` MCQ keys rebalanced across options in both English and Urdu (a: 2, 6, 9; b: 7, 10; c: 4, 5; d: 1, 3, 8; total 3a, 2b, 2c, 3d). |
| F4: ERQ-01..04 restate per-topic summative tasks | advisory | Repaired: ERQ-01..04 given distinct application scenarios from topic summative tasks in both English and Urdu (ERQ-01: railway level-crossing barrier; ERQ-02: exam-cell result sheets; ERQ-03: scanner fault; ERQ-04: parents' evening smartphone explainer). Rubrics and blueprints preserved. |
| F7: Topic 3.2 Further reading stale | advisory | Repaired: `topic-02.mdx` (and Urdu translation) Further reading entry cites OSTEP chapters 4 and 39. |
| F8: bourgeois2019 excerpt chapter 3 annotation | advisory | Repaired: `specs/content/gict-300/sources/texts/bourgeois2019.md` chapter 3 "Used for" annotation includes U3-01 and U3-02 reinforcement. |
| F9: ostep key year-less | advisory | Open, deferred to curriculum owner: changing key `ostep` touches the approved content-spec or `scripts/lib/review-evidence.mjs`, both of which are outside authoring scope and forbidden by the brief. |
| F10: Further reading bare URLs | advisory | Repaired: descriptive link text used across all four topic pages in both English (`[The book on its authors' site]`, `[The book at the Open Textbook Library]`) and Urdu (`[کتاب مصنفین کی ویب سائٹ پر]`, `[کتاب اوپن ٹیکسٹ بک لائبریری میں]`). |

G3 remains unticked (`▢`) with an appended advisory tracker row. Translation status remains draft. Fresh independent review required; ADR-0019 two-cycle G3 budget is exhausted, so any run 003 requires owner authorisation in `specs/decisions/log.md`.
