# Suggested advisory tracker row (for the parent, not written by the reviewer)

The review skill forbids the reviewer from editing `specs/content/efpc-411/tasks.md`. This file
records the row the parent may apply. It does not tick G3, add initials, self-sign, or claim
certification.

Replace the existing row:

```
| Unit 1 | G3 en-review | ▢ | | Awaiting independent qualified review; author self-check is not G3 |
```

with something of the form:

```
| Unit 1 | G3 en-review | ▣ | | advisory: revise; report reviews/unit-01/G3/crew-efpc-411-u01-review_en-r1.json (crew efpc-411-u01-review_en, 2026-11-27). Six of seven criteria pass; sources fails on an unsupported 30-minute lecture claim (topic-04.mdx:43) and a misattributed observer-bias citation (topic-03.mdx:66). Production render 0 defects at deployed SHA 66a199127. Advisory only; no certification, no row tick. |
```

The report is advisory until protected qualification and acceptance succeed (ADR-0019). The
reviewer cannot sign, self-register, activate, append a done row, merge, or publish.
