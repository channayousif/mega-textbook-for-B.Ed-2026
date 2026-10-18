# GICT-300 Unit 3 translation handoff

- Date: 2026-10-18. Translator: Codex, crew/gict-300-u03-translate.
- English checkout baseline: `02ec0cff5c98893ffe2f3a1dd194135591ae7fce`.
  Last English unit change: `b3b0eabcc27b3789b1c37eb3581800a93cfabc2e`.
- Resumed the existing complete mirror; did not replace it with a new translation.
  Resolved paths with `resolveUnit()` and checked children with `urPathFor()`.
- Files compared passage by passage: `index.mdx`, `topic-01.mdx` through
  `topic-04.mdx`, `unit-assessment.mdx`, `unit-teacher-notes.mdx` in the Urdu mirror.
  The English unit remains unchanged.

## Repairs

Corrected the reversed claim about a bad program protecting the machine, the missing
pause in the time-sharing model answer, the single-click rendering of double-click,
"persistent" mistranslated as easy to detect, the requirement-based recommendation
rendered as being against the requirement, and the omitted OSTEP chapter 39 reference.
Improved unclear literal phrases about diagnostic ladders, file organisation and process
crowding. Preserved source qualifications, option order, marks, Bloom levels and the final
bounded answers section. The Urdu MCQ choices correspond to English d,b,b,b,c,b,b,b,b,b.

Reconciled all eight Urdu figure descriptions with their page alt strings. Repaired labels
in figures 1, 3, 5, 6 and 8, including key presses being rendered as letters, and completed
the descriptions of figures 5, 7 and 8. Retained the existing mirrored layouts, figure IDs,
source briefs and English manifests. Regenerated the six affected dark variants using the
repository generator.

## Terminology working set

The bank supplies Assessment (تشخیص), Self-Assessment (خود جائزہ), Rubric
(معیارِ جانچ), and the accepted Summative Assessment form مجموعی جائزہ. The index
now declares only bank-conformant key terms. Computer memory remains میموری: the bank's
Memory (یادداشت) is a psychology concept, not a reason to rename computer memory.

Glossary keys retained unchanged: File, File management, Process, Device driver, Buffer,
Spooling and Kernel. Their existing `definition_ur` entries were read; the shared glossary
was not edited. All 13 concept labels remain aligned with `concepts/unit-03.md`.

The following existing concept-label proposals are **not banked**. The curriculum owner
must resolve/promote them after independent terminology review; this session did not edit
the frozen bank or claim these are accepted terms.

| Proposed English term | Proposed Urdu term |
|---|---|
| Operating system functions | آپریٹنگ سسٹم کے کام |
| Time sharing | ٹائم شیئرنگ |
| Types of operating systems | آپریٹنگ سسٹم کی اقسام |
| File identifiers (name, path, metadata) | فائل کی شناخت |
| File management services | فائل مینجمنٹ کی خدمات |
| Process as a program in execution | پروسیس بطور چلتا پروگرام |
| Process states and transitions | پروسیس کی حالتیں |
| The input/output chain | ان پٹ آؤٹ پٹ زنجیر |
| Device driver | ڈیوائس ڈرائیور |
| Buffer and spooling | بفر اور اسپولنگ |
| The four layers of the system | نظام کی چار تہیں |
| Kernel functions | کرنل کے کام |
| System calls as guarded doorways | سسٹم کالز بطور محفوظ دروازے |

## Validation and review boundary

- Initial draft `npm run check:content`: all 13 gates passed.
- Temporary flip of both indexes to reviewed: file/heading parity, figure parity and
  terminology checks passed. Pipeline findings were only the incomplete G4 and G5 rows;
  content-status also reported the generated draft report stale under the temporary flag.
  Both indexes were restored byte-for-byte to draft in a finally block.
- Direct comparison: identical seven-file set, heading level vectors, structural metadata,
  imports, component counts and glossary keys, URLs, 10/10/5 assessment bands, eight matching
  alt/desc strings and SVG budgets. This is translator checking, not independent review.
- `npm run figures:variants:check`: passed across 746 sources.
- The first final draft run found only generated status-report staleness after the G4
  tracker change. Regenerated the ignored local report with `npm run build:content-status`
  (a report script, not a site build), then reran `npm run check:content`: all 13 gates passed.
- No build, dev server or render-inspect was run: the crew brief expressly prohibits builds
  and servers. Historical G5 render artifacts do not verify these repaired bytes. A fresh
  independent reviewer must inspect desktop, 360px and A4 Urdu rendering and label geometry.

`translation_status` stays `draft` on every page. G4 is recorded as in progress, with no
reviewer initials or certification. G3 and G5 status/evidence were not modified. Fresh G5
requires accepted G3 evidence for these exact English inputs; the existing tracker records
an unresolved G3 dependency. The review owner owns that dependency and fresh G5/rendering;
the curriculum owner owns terminology acceptance. No Paperclip issue was supplied.

This was a repair of an existing complete mirror, not a timed full-unit translation; it
should not be used as a corpus translation throughput measurement.

## Continuation: evidence freshness repair (2026-10-18)

The first committed handoff lived at `translation/unit-03-handoff.md`. The evidence
scoper did not recognise that hyphenated filename as unit-specific, so adding the record
invalidated all six English G2 input manifests. Moved this lifecycle record under
`reviews/unit-03/G4/`, the existing exclusion for review and gate records, and updated
only Unit 3's G4 handoff link. No evidence JSON, gate code or signed review was edited.
All six current G3 input manifests now exactly equal their existing G2 evidence manifests.

Rechecked the seven-file mirror's structural metadata, heading vectors and component
counts against English. Translation and figure bytes remain those of `20c1490b`.
The G4 row remains in progress, and all translation statuses remain draft.

Continuation validation: `npm run check:content` passed all 13 gates;
`npm run figures:variants:check` passed for 746 sources. No new gate findings.
