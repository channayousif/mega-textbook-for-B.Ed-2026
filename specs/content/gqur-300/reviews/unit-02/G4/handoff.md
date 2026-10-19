# GQUR-300 Unit 2 translation handoff

Continuation verification on 2026-10-18, from branch commit e6b4a7ff. The existing
tracker binds the English baseline to 96f35fa3. This continuation changes no English
or Urdu prose. Commits 985a3325 and e6b4a7ff already preserve the prior assessment,
Bloom-tag corrections and their work record.

## Bundle

The mirror contains index.mdx, topic-01.mdx, topic-02.mdx, topic-03.mdx,
unit-assessment.mdx and unit-teacher-notes.mdx. File sets, heading-level vectors,
component counts, figure IDs and Urdu SVG paths were compared with English.
All six Urdu SVGs exist; generated dark variants pass figures:variants:check.
Both index files remain translation_status: draft. The existing G4 row remains
in-progress; no G3/G5 certification or publication claim is made.

## Validation and generated artifact

The previous attempt's missing static/content-status.json was generated with
npm run build:content-status. This file is intentionally gitignored; regenerate it
in a fresh checkout before running the gates. The normal draft check:content run
passed all 13 gates, including check:content-status. No origin/main comparison is
needed for that run because it has zero findings.

With the temporary reviewed flag, pipeline checks report the expected ten unbanked
terms and incomplete G4/G5 rows. Content-status also becomes stale under that
temporary flag. Figure parity passes; explicit validate:content with parity enabled
passes. Both flags were restored to draft before the final gate run.

A build, development server and rendered inspection were not run: the crew brief
explicitly prohibits builds and dev servers. Independent G5 still needs actual
Urdu desktop, narrow-width and A4 evidence, as well as accepted G3 dependency.
Structural checks do not certify semantic equivalence.

## Proposed terms for curriculum owner

All ten index key_terms remain absent from the frozen terminology bank:

| English | Existing Urdu proposal |
|---|---|
| Decimal | اعشاریہ |
| Exponent | وسیع |
| Fraction | کسر |
| Integer | صحیح اعداد |
| Percentage | فیصد |
| Power | قوت |
| Proportion | تناسب |
| Ratio | نسبت |
| Square root | جذر |
| Whole number | تمام اعداد |

The existing Exponent rendering وسیع also occurs in glossary.json. It needs an
explicit owner ruling: it reads as ordinary "wide/extensive" rather than clearly
naming the mathematical exponent. The translator must not silently edit the frozen
bank or the shared glossary to resolve this. Concepts/unit-02.md separately flags
its thirteen authored Urdu concept labels for G5.

## Next owner

Curriculum owner resolves terminology and G3 dependency. A fresh independent G5
reviewer compares every passage, assessment item and figure and obtains rendered
evidence. No reviewer initials or review-completion marks were supplied here.
