# Advisory tracker row - EFMP-408 Unit 1 G3 (cycle 2)

Append after the existing `Unit 1 | G3 en-review` rows in `specs/content/efmp-408/tasks.md`.
The reviewer does not edit the tracker itself; the host applies this row.

```markdown
| Unit 1 | G3 en-review | ▢ | agent:claude | advisory r2: escalate; all r1 content findings closed (formative 9 items in band, RRQ 4 Understand, MCQ key A1/B3/C4/D2, npstp-2009 bound to U1-02, Scheerens declaration cites D-2026-0001, assessment and appraisal definitions aligned); render-review unavailable (deployed 7d1ba965530b409ac8e425d07bf86ec24930310d differs from HEAD 7fb77de68f5d59bbc507e85c07a892a3cbf93eca on four unit files); report specs/content/efmp-408/reviews/unit-01/G3/crew-efmp-408-u01-review_en-r2.json |
```

Status stays `▢` (not done). No reviewer initials, no certification, no gate transition.
The report is advisory and cannot support `review:` or `provisional:` because its disposition is
`escalate` and its `render-review` is unavailable.
