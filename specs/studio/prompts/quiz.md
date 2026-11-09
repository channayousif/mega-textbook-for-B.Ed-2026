# Quiz (v2) - output goes ONLY to the RLS-protected quiz_items table (as teacher-review drafts), never static files
Options: --count 10 --difficulty 2

v1 -> v2 (trial 2026-11-09): 4/10 items duplicated the unit bank or the topic self-check because
Gemini cannot see unit-assessment.mdx. v2 appends {EXCLUDE}: the stems (never answers) of the unit's
MCQ/RR/ERQ items and the topic's check-your-understanding questions. Import step shuffles options.

```focus
Ten multiple-choice questions for B.Ed student teachers in Pakistan on this topic only. Each question has exactly one correct option and three plausible wrong options drawn from common misconceptions in the source, all four of similar length. Prefer classroom-scenario questions over definitions. Use only the source. Do NOT write questions about any of these, which are already asked elsewhere: {EXCLUDE}
```
