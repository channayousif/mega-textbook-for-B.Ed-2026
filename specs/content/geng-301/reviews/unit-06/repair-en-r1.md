# Unit 6 English repair handoff (r1)

Author pass: agy crew `geng-301-u06-repair_en-r1`, 2026-11-10. Findings source:
`specs/content/geng-301/reviews/unit-06/G3/20261108T203238Z-g3-desk-80672f33.json`.
This note records author repair verification, not reviewer acceptance or certification.

## Finding resolution verification

- F1 (sources): `specs/content/geng-301/sources/unit-06.md` records dated Open Library retrieval attempts (2026-11-05), unretrieved status and owner authorisation under D-2026-0001. The Channa passage in Topic 6.3 and fig-U6-7 is explicitly labelled as original fictional exercise text. The former Johnson/Paine quotation in the Summative task uses explicitly fictional Ali metadata rather than unverified attribution. Figure U6-7 and its dark asset label the practice text and citation as fictional. The supplemental `writing2015` binding is noted as not authenticating any of these quotations.
- F2 (coverage/pedagogy): Topic 6.1 models library catalogue keyword discovery, database Boolean search, filtering, abstract/full-text inspection and limited inference from a fictional result. Topic 6.2 models full APA and MLA book entries and explains their construction before student practice. Topic 6.3 models a signal phrase, quotation, page locator and explanatory follow-up before paraphrasing practice.
- F3 (assessment): Unit assessment RRQ-05 supplies both the source passage and the pupil's version, asking whether the sentence is quoted, paraphrased or summarized with text-based justification; marking guidance accepts a justified "brief summary" interpretation. RRQ-10 addresses grouped citations versus uncited references and requires an author/year audit rather than inferring four missing sources from raw counts. RRQ-03 supplies fictional exercise text and requires a faithful cited rewrite without invented findings.
- F4 (assessment): Blueprint balance verified (at least 2 MCQs and at least 2 RRQs per topic): Topic 6.1 has MCQ-01/06 and RRQ-02/07; Topic 6.2 has MCQ-02/03/09 and RRQ-03/04/10; Topic 6.3 has MCQ-05/07 and RRQ-05/08/09; Topic 6.4 has MCQ-04/08/10 and RRQ-01/06. RRQ-02 is tagged Understand. ERQ-02 is tagged Analyze (evaluating two defective drafts and justifying a revision plan). Topic 6.2 formatting mini-rubric labels routine formatting Apply and adds analysis demand for style mismatches.
- F5 (pedagogy/sources): Topic 6.1 activity provides inspectable fictional source cards with dates (including 2015 blog date), titles, extracts, methods and scope limits; evaluations require evidence rather than publisher status alone. ERQ-03 provides inspectable fictional source cards with methods and limits; its rubric rewards qualified judgements tied to evidence rather than preassigned ratings.
- F6 (figure meaning): fig-U6-8.svg and fig-U6-8.dark.svg name the descriptive column "Risk description", keeping prevention actions under "What to do". fig-U6-2.svg and fig-U6-2.dark.svg test common knowledge or personal original work first, then route borrowed material (including remembered ideas) to citation. Figure geometry verified clean with Playwright measurement (measure-figure-text.mjs exits 0 for all 16 SVGs).
- F7 (sources/assessment): Topic 6.4 removes unsupported trainee prevalence claims and qualifies that intent may inform institutional sanctions under policy, but does not replace attribution duties. ERQ-01 assesses comparison of two supplied cases without prevalence claims.
- F8 (readability): Teacher notes place the four topic stages within the approved Week 16 schedule. RRQ-02 guidance explicitly allocates marks (1 mark per criterion linked to a specific limitation; 0.5 for naming a relevant criterion without explaining the link).

## Limits and handoff

No Urdu Unit 6 mirror exists under the docs translation plugin, and no licence copy exists. No translation was invented.
E1 (provenance) and E2 (fresh renders): Handoff provenance and fresh browser/360px/A4 print renders remain host responsibilities. The brief forbids builds, dev servers and Playwright e2e runs; source-only checks do not certify accessibility.
G3 remains open and unsigned (ADR-0019).

## Validation

- `npm run build:content-status`: fresh cache generated.
- `npm run check:content`: all 14 content gates passed cleanly.
- `scripts/heavy.sh npm test`: 39 test files and 448 tests passed.
- `scripts/heavy.sh node scripts/measure-figure-text.mjs static/img/figures/geng-301/unit-06/*.svg`: all 16 SVGs passed geometry measurement (exit code 0).
- Git diff and dash checks: zero em dashes (U+2014) in any file.
