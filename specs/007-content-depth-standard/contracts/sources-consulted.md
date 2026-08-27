# Contract: Sources-Consulted List

**File**: `specs/content/<course-code>/sources/unit-NN.md`
**Read by**: `scripts/check-unit-depth.mjs` (FR-003, FR-012e); reviewed by the human Content
gate (FR-013)
**Format**: Markdown, one pipe-delimited table. Same parser tolerance as `coverage-matrix.md`.

## Table

```markdown
| Key | Citation | URL/DOI | Supports | Kind |
|---|---|---|---|---|
| hargreaves2000 | Hargreaves, A. (2000). Four ages of professionalism and professional learning. Teachers and Teaching, 6(2), 151–182. | https://doi.org/10.1080/713698714 | industrial→inquiry shift (U1-03, U1-05) | guide-required |
| demirkasimoglu2010 | Demirkasımoğlu, N. (2010). Defining "teacher professionalism" from different perspectives. Procedia Social and Behavioral Sciences, 9, 2047–2051. | https://doi.org/10.1016/j.sbspro.2010.12.444 | dimensions of professionalism (U1-04) | guide-required |
| oecd2022identity | Suarez, V., & McGrath, J. (2022). Teacher professional identity (OECD Education Working Paper No. 267). OECD Publishing. | https://doi.org/10.1787/b19f5af7-en | teacher identity formation (U1-12) | guide-required |
| unesco2019ethics | UNESCO (2019). … | https://unesdoc.unesco.org/ark:/… | code-of-conduct framing | open-access-substitute |
```

## Column rules

| Column | Rule |
|---|---|
| `Key` | short, unique within the unit; the value the coverage matrix's `Source` column points at |
| `Citation` | full APA reference; non-empty |
| `URL/DOI` | exact resolvable link or DOI; MAY be empty **only** when `Kind = no-external-source` |
| `Supports` | free text — which sub-topic IDs / theme this source backs |
| `Kind` | `guide-required` \| `open-access-substitute` \| `no-external-source` |

## Invariants

- **Consistency with the coverage matrix** (FR-012e): every `Key` referenced by a coverage
  `Source` exists here; every `Key` here except `no-external-source` rows is referenced by at
  least one coverage row.
- `guide-required` = a reading named in the course guide's Suggested Readings (or the
  content-spec `## Reading list` `### Guide-required` block).
- `open-access-substitute` = used because the mapped guide reading was unavailable; MUST be
  topically related (the Content gate rejects it otherwise — FR-003).
- `no-external-source` = no mapped reading and no topically-related open-access source could
  be found; the sub-topic is still covered from the guide text + general knowledge, and the
  gap is escalated in `specs/gaps.md` (FR-004).

## Not checked by the gate

Whether an `open-access-substitute` is genuinely on-topic; whether a `no-external-source` row
was escalated; citation accuracy. All human Content gate (FR-013).
