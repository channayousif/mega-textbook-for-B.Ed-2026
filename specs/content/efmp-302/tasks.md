# EFMP-302 - Task Tracker

Legend (FR-005's 3-value status enum): `▢` not-started · `▣` in-progress · `✅` done (requires
reviewer initials). One row per unit per stage (`G1`–`G7`; `G0` course-intake is tracked via
`content-spec.md`'s own `status` field, not a row here - research.md R2).

**Unit 1 - Spec 007 v2.0 depth-standard re-draft (2026-08-27):** the English content was
re-authored against the `## Unit depth standard` (style-guide v2.0). G1 gained the enumerated
`### Sub-topic checklist` in `content-spec.md` and was re-affirmed at the Content gate;
G2/G3 re-cleared the Content gate (curriculum owner, 2026-08-27) against the re-drafted five
English files. G4/G5 are re-open because the English re-draft invalidated the reviewed Urdu
mirror (`translation_status: draft`, downstream re-translation - Spec 007 FR-016/FR-017).
G6/G7 stand (assets and the published route are unchanged; the `ur` route falls back to EN
behind the Spec 001 FR-003 banner until G5 re-clears).

**Unit 1 - Spec 008 v3.0 per-topic re-restructure (2026-08-30, COMPLETE):** the `## Unit 1`
content-spec subsection now carries a `### Topic list` (4 topics partitioning U1-01…U1-14), a
`Topic` column on the `### Sub-topic checklist`, a re-baselined `**Depth budget**`
(`4 topics; 90–120 reading-min`, actual drafted total 103), a `**Figure plan**` (fig-U1-1…
fig-U1-4) and a `**Unit-end assessment blueprint**` (10 MCQ / 10 RRQ / 5 ERQ). The English unit
has been **re-authored to the per-topic layout**: `index.mdx` (opening) + `topic-01…04.mdx`
(nine-part cycles, one FIGURE marker each) + `unit-assessment.mdx` (10/10/5 bank + bounded
answers) + `unit-teacher-notes.mdx`; the four legacy pooled files are deleted; `coverage/unit-01.md`
is v2, `sources/unit-01.md` updated, `figures/unit-01.md` created. `validate:content`,
`check:depth-gate`, `check:figures`, `check:no-answer-keys` and `npm test` are all green for the
new shape. The Urdu mirror is reset to a `draft` skeleton (orphans deleted, `teacher-notes.mdx`
→ `unit-teacher-notes.mdx`, `topic-01…04.mdx` + `unit-assessment.mdx` added as heading-only
stubs carrying the same FIGURE marker IDs).

**Human Content gate - PASSED (curriculum owner YM, 2026-08-30, Spec 008 T055).** The
re-restructured English unit was reviewed against the Content-gate criteria: HSC-graduate
register held with no undefined graduate term; the four topic hooks are apt and
Pakistan/Sindh-grounded; the mapped sources are relevant and correctly paraphrased (all seven
verified - 4 DOIs resolve, 3 books catalogue-confirmed); the four-topic grouping is
pedagogically coherent; the FIGURE prompts describe usable teaching aids; the per-topic and
unit-end rubrics are sound with Analyze-or-higher demands where required. **G1 re-affirmed** for
the v3.0 `### Topic list` / blueprint expansion (Spec 008 T029). **G2 en-draft / G3 en-review
restored to `✅` (YM).** `G4 ur-translation` / `G5 ur-review` remain `▢` - scope changed to the
per-topic layout; the `ur` route falls back to EN behind the Spec 001 FR-003 banner until
re-review. **Merge freeze lifted** - `check:pipeline-gate` is green for EFMP-302 Unit 1 again.

| Unit | Stage | Status | Reviewer | Suggestion |
|---|---|---|---|---|
| Unit 1 | G1 unit-spec | ✅ | YM | |
| Unit 1 | G2 en-draft | ✅ | YM | S008 v3.0 per-topic re-restructure - Content gate passed 2026-08-30 |
| Unit 1 | G3 en-review | ✅ | YM | S008 v3.0 per-topic re-restructure - Content gate passed 2026-08-30 |
| Unit 1 | G4 ur-translation | ▢ | | S008 scope change to per-topic layout |
| Unit 1 | G5 ur-review | ▢ | | S008 scope change to per-topic layout |
| Unit 1 | G6 assets | ✅ | YM | |
| Unit 1 | G7 publish | ✅ | YM | |
| Unit 2 | G1 unit-spec | ✅ | YM | |
| Unit 2 | G2 en-draft | ✅ | YM | |
| Unit 2 | G3 en-review | ✅ | YM | |
| Unit 2 | G4 ur-translation | ▢ | | |
| Unit 2 | G5 ur-review | ▢ | | |
| Unit 2 | G6 assets | ▢ | | |
| Unit 2 | G7 publish | ▢ | | |
| Unit 3 | G1 unit-spec | ✅ | YM | |
| Unit 3 | G2 en-draft | ✅ | YM | |
| Unit 3 | G3 en-review | ✅ | YM | |
| Unit 3 | G4 ur-translation | ▢ | | |
| Unit 3 | G5 ur-review | ▢ | | |
| Unit 3 | G6 assets | ▢ | | |
| Unit 3 | G7 publish | ▢ | | |
| Unit 4 | G1 unit-spec | ✅ | YM | |
| Unit 4 | G2 en-draft | ✅ | YM | |
| Unit 4 | G3 en-review | ✅ | YM | |
| Unit 4 | G4 ur-translation | ▢ | | |
| Unit 4 | G5 ur-review | ▢ | | |
| Unit 4 | G6 assets | ▢ | | |
| Unit 4 | G7 publish | ▢ | | |
| Unit 5 | G1 unit-spec | ✅ | YM | |
| Unit 5 | G2 en-draft | ✅ | YM | |
| Unit 5 | G3 en-review | ✅ | YM | |
| Unit 5 | G4 ur-translation | ▢ | | |
| Unit 5 | G5 ur-review | ▢ | | |
| Unit 5 | G6 assets | ▢ | | |
| Unit 5 | G7 publish | ▢ | | |
| Unit 6 | G1 unit-spec | ✅ | YM | |
| Unit 6 | G2 en-draft | ✅ | YM | |
| Unit 6 | G3 en-review | ✅ | YM | |
| Unit 6 | G4 ur-translation | ▢ | | |
| Unit 6 | G5 ur-review | ▢ | | |
| Unit 6 | G6 assets | ▢ | | |
| Unit 6 | G7 publish | ▢ | | |
