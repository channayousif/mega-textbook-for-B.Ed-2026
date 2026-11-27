# EFPC-411 Unit 1 - source verification (G3, cycle 2)

Reviewer: agent:claude-crew, Claude Code session 9a479aa1-e6df-4574-8257-5d44142f3c0f, 2026-11-27.

## Retrieval

Retrieved 2026-11-27 from the URLs in `specs/content/efpc-411/sources/unit-01.md` and read as text
(`pdftotext -layout`). Scratch copies, not committed: `.crew/src/` in the review worktree.

| Key | HTTP | Bytes | SHA-256 of retrieved PDF |
|---|---|---|---|
| teach-primary-2021 | 200 | 2601161 | c0cf4cbb606b1f9c09036ee25f688b0c157bf2ef35cde038f3685e96527047be |
| hec-2013-practicum | 200 | 807597 | 7d4f1fb669e62816b7c022fe574343e9804379502061d083dea313543c20885b |

`hec-2013-methods` and `hec-2013-currdev` were not re-retrieved. The prose they support
(`topic-02.mdx:43-44`) is byte-identical to the version the cycle-1 report verified against them,
so that verification is carried, not repeated.

Page numbers below are the printed page numbers. For the Teach manual, printed = PDF page - 4.
For the HEC handbook, printed = PDF page.

## Claims re-checked after the repairs

- `topic-03.mdx:66` (F2) "biases distort observation records ... (Molina et al., 2021)". The manual's
  "Common challenges in classroom observations" (pp. 15-16) covers Personal Experiences ("past
  experiences and personal opinions influence how observers score"), Additional Information,
  Comparison, Weighing of Specific Events or First Impressions, and Central Tendency. Supports the
  sentence; "see only what confirms their existing expectations" is a fair synthesis of the
  Personal Experiences passage. **Supported.**
- `topic-04.mdx:43` (F1) now reads "In teacher-centred lessons, extended exposition can leave pupils
  little time for guided practice or independent work." Uncited, hedged general statement with no
  figures. **No longer an unsupported factual claim.**
- `topic-01.mdx:39` (F4) definition now carries no citation; it reads as author synthesis. **Resolved.**
- `topic-01.mdx:63` roles (HEC, 2013): "Summary of the role of the Student Teacher" (p. 18),
  "... of the Cooperating Teacher" and "... of the College/University Practicum Supervisor" (p. 19).
  **Supported.**
- `topic-03.mdx:39` four-stage cycle (HEC, 2013): pp. 33-34 repeatedly name the "Formal Observation
  Cover sheet, Pre-observation Guide, and Post-observation Reflection"; p. 19 has the cooperating
  teacher "observe and provide verbal and written feedback". **Supported as a synthesis.**
- `topic-04.mdx:39` "must be analysed systematically (HEC, 2013)": the handbook asks students to
  "Present an analysis of your own or a peer's teaching" (pp. 10, 30). **Thin but acceptable.**
- `topic-04.mdx:50` feedback (Molina et al., 2021): p. 3 describes Punjab pedagogical leaders using
  an adapted Teach to "provide tailored and personalized feedback to teachers"; p. 56 endorsement
  on "providing specific feedback to teachers on how to improve". **Supported at the level stated.**
- `topic-04.mdx:65` self-improvement (HEC, 2013): p. 18 "creation of a developmental portfolio housing
  the documentation as evidence of professional growth". **Supported.**

## New defects

### N1 (F10) - Schön attribution without a reference, with an inaccurate descriptor

`topic-04.mdx:67`: "As teacher education scholar Donald Schön emphasized, professional expertise
develops through reflection-on-action ... and reflection-in-action". The concepts are Schön's
(*The Reflective Practitioner*, 1983), but the unit gives no citation, the topic's Further reading
has no entry, and `sources/unit-01.md` lists no Schön work. Schön was a philosopher and MIT
professor of urban studies and education who wrote about professional practice in general;
"teacher education scholar" misdescribes him. Neither retrieved source mentions Schön (grep, both
texts). Repair: cite Schön (1983) with a reference entry and a bound source note, and describe him
accurately (for example "the philosopher Donald Schön, writing about how professionals learn").

### N2 (F11) - bound source notes and the coverage map describe content the works do not contain

`specs/content/efpc-411/sources/texts/hec-2013-practicum.md`:

- Note 3 says the handbook "specifies core ethical requirements: obtaining administrative permission,
  maintaining confidentiality, protecting student anonymity ..." on pp. 17-21. The handbook text has
  no occurrence of "ethic", "confidential", "anonym", "permission", "consent", "privacy" or
  "respect" anywhere (45 pages searched). `coverage/unit-01.md` maps U1-04 (professional ethics)
  solely to `hec-2013-practicum`. The ethics guidance in `topic-01.mdx:76-84` is uncited and is
  sound professional guidance, so the prose is not wrong, but the recorded evidence that a source
  supports it is false.
- Note 1 says the handbook defines observation as "a purposeful, systematic inquiry" and "emphasizes
  developmental learning rather than punitive evaluation" (pp. 8-14). "systematic" and "punitive" do
  not occur in the handbook.
- Note 6 says pp. 39-45 detail "constructive, evidence-based feedback" and "personal targets for
  self-improvement". "constructive", "evidence-based" and "target" do not occur in the handbook.
- Note 2 places the role summaries on pp. 12-16; they are on pp. 18-19.

`specs/content/efpc-411/sources/texts/teach-primary-2021.md`:

- Note 3 says pp. 26-42 explain rubric calibration and "how to avoid observer bias, including the
  halo effect, central tendency bias, and severity or leniency errors". The manual never uses
  "halo", "leniency" or "severity"; its bias discussion is on pp. 15-16 (PDF 19-20) and names
  central tendency and first impressions. PDF pp. 26-42 are the rubric element pages (Time on Task
  to Socioemotional Skills).
- Note 4 says pp. 43-52 outline "procedures for aggregating observational tallies, identifying
  instructional trends, and utilizing observational data to provide actionable, developmental
  feedback". PDF pp. 43-52 are the "Checklist: other aspects of educational quality" and the FAQ.

Repair: rewrite the notes from the works themselves with correct page numbers, and either bind a
source that actually treats observation ethics for U1-04 or record the ethics section as author
guidance in the coverage and sources files. Notes are bound inputs; the prose needs no change for
this finding.

## Unavailable-source declaration

`sources/unit-01.md` has no `## Unverifiable sources` section and needs none: the cited works were
retrievable. N1 and N2 are support defects, not missing text.
