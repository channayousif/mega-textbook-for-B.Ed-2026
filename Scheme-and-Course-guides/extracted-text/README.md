# Extracted course-guide text

Plain-text extractions of the source guides in the parent folder, for searching, diffing, and G0 course intake (Spec 006). **Derived, not authoritative** — the original `.docx`/`.pdf` files remain the source of truth (Constitution Art. II).

| Text file | Source | Extraction method |
|---|---|---|
| `1st 2026.txt` | `1st 2026.pdf` | `pdfminer.six` via `uv run` |
| `2nd 2026.txt` | `2nd 2026.pdf` | `pdfminer.six` via `uv run` |
| `3rd 2026.txt` | `3rd 2026.docx` | Python `zipfile` (word/document.xml) |
| `4TH SEMESTER.txt` | `4TH SEMESTER.docx` | Python `zipfile` |
| `5TH SEMESTER.txt` | `5TH SEMESTER.docx` | Python `zipfile` |
| `6TH SEMESTER.txt` | `6TH SEMESTER.docx` | Python `zipfile` |
| `7TH SEMESTER.txt` | `7TH SEMESTER.docx` | Python `zipfile` |
| `8th 2026.txt` | `8th 2026.docx` | Python `zipfile` |
| `B.Ed 4 Year board.txt` | `B.Ed 4 Year board.docx` | Python `zipfile` |
| `B.Ed 4 Year 2026 revised after board.txt` | `B.Ed 4 Year 2026 revised after board.docx` | Python `zipfile` |

Notes:
- **`B.Ed 4 Year 2026 revised after board.docx` is the FINAL AUTHORITY** for the scheme of
  studies (curriculum owner, 2026-09-10). `B.Ed 4 Year board.docx` is the superseded earlier
  scheme, kept for provenance only. The revision moves Pakistan Studies (GPKS-402) from
  Semester IV to Semester II, Fehm-e-Quran I (GUHQ-301) from Semester II to Semester III, and
  Fehm-e-Quran II (GUHQ-400) from Semester III to Semester IV; Semester I is unchanged. Totals:
  Sem II 18 -> 19, Sem IV 17 -> 16; grand total still 132.
- The revised extraction unescapes XML entities (`&amp;` -> `&`); the older `.txt` files do not.
  That is an extraction difference only, not a content change.
- PDF extraction can reorder columns/tables; verify against the source PDF before quoting.
- Known board-vs-guide discrepancies are tracked in `specs/gaps.md`.
- Regenerate PDFs with: `uv run --with pdfminer.six python -c "from pdfminer.high_level import extract_text; open('out.txt','w').write(extract_text('src.pdf'))"`
