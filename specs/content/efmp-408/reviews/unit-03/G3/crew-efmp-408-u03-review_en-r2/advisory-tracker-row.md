# Advisory tracker row - EFMP-408 Unit 3 G3 (cycle 2)

Append after the existing `Unit 3 | G3 en-review` rows in
`specs/content/efmp-408/tasks.md`. The reviewer does not edit the tracker itself;
the host applies this row.

```markdown
| Unit 3 | G3 en-review | ▢ | agent:claude-g3-reviewer | advisory r2: escalate; all cycle-1 content findings closed (A-1 MCQ 10 rebuilt so "an" cues the keyed vowel-initial option Amri with a correct rationale; A-2 RRQ 1/7/9 raised to Understand with mark-scheme notes; A-3 formative bank cut to 12, 3 per topic; A-4 the Analyze formative item removed; S-1 weightage criteria and 30/40/30 split marked as author synthesis; S-2 handwriting claim softened and tied to the halo effect; S-3 AKU-EB/Sindh HEC and HEC/AKU-EB attributions restated as general professional practice; R-1 descriptive Further reading link text); R-2 glossary entries still absent (advisory, outside unit scope); render-review unavailable (deployed 7fb77de68f5d59bbc507e85c07a892a3cbf93eca differs from HEAD 467e2a0876a783e4c8649e4aad7f476f0ccf330a on the five English unit files); report specs/content/efmp-408/reviews/unit-03/G3/crew-efmp-408-u03-review_en-r2.json |
```

Status stays `▢` (not done). No reviewer initials, no certification, no gate
transition. The report is advisory and cannot support `review:` or
`provisional:` because its disposition is `escalate` and its `render-review` is
unavailable.
