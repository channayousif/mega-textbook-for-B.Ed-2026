# EFMP-301 - Task Tracker

Legend (FR-005's 3-value status enum): `▢` not-started · `▣` in-progress · `✅` done (requires
reviewer initials). One row per unit per stage (`G1`–`G7`; `G0` course-intake is tracked via
`content-spec.md`'s own `status` field, not a row here - research.md R2). A Revision Task
(FR-011) is recorded as a new row in this same table, tagged with the originating suggestion's
`improvement_suggestions.id` (UUID) in the `Suggestion` column and its target re-entry stage.

| Unit | Stage | Status | Reviewer | Suggestion |
|---|---|---|---|---|
| Unit 1 | G1 unit-spec | ✅ | YM | |
| Unit 1 | G2 en-draft | ✅ | YM | |
| Unit 1 | G3 en-review | ✅ | YM | |
| Unit 1 | G4 ur-translation | ✅ | YM | |
| Unit 1 | G5 ur-review | ✅ | YM | |
| Unit 1 | G6 assets | ✅ | YM | |
| Unit 1 | G6 assets | ✅ | YM | 9 figures rendered at v3.4, 2026-09-11 |
| Unit 1 | G7 publish | ✅ | YM | |
| Unit 1 | G2 en-draft | ✅ | YM | f0c89f9a-36db-4224-96a0-0960e8ee7552 |
| Unit 1 | G1 unit-spec | ✅ | YM | re-run 2026-09-11: per-topic G1 blocks added to content-spec |
| Unit 1 | G2 en-draft | ✅ | YM | v3.4 re-restructure to the per-topic layout (Art. VI.1 golden-unit re-proof) |
| Unit 1 | G3 en-review | ✅ | YM | Content gate passed 2026-09-11 on the re-drafted unit |
| Unit 1 | G4 ur-translation | ▣ | | scope changed: the Urdu mirror is now index + 4 topics + unit-assessment + teacher notes, currently heading-only stubs |
| Unit 1 | G5 ur-review | ▣ | | follows G4 |

## Re-restructure in progress (2026-09-11)

Unit 1 is being brought to style-guide **v3.4** as the Art. VI.1 golden-unit re-proof. Two
freezes were outstanding at once - v3.3 (Spec 012 visual density) and v3.4 (Spec 013 figure
colour, branding, page descriptions) - so the unit skips straight to v3.4 and one authoring pass
discharges both.

What changed: the five-file layout (`activities` / `formative` / `summative` / `teacher-notes`)
is replaced by `index.mdx` + `topic-01..04.mdx` + `unit-assessment.mdx` + `unit-teacher-notes.mdx`.
The unit grew from **608 words to roughly 9,900**. Nine figure markers are planned at
`prompt-only`; `generate-figures` renders them in a following pass.

The Content gate passed on 2026-09-11, so G2/G3 are closed and `check:pipeline-gate` is green
again. The nine figures were rendered in the same branch. G4/G5 remain open: the Urdu mirror is
still heading-only stubs (its `<Figure>` elements and `.ur.svg` labels are wired and translated,
but the prose is not), so the `/ur/` route falls back to English behind the "translation in
progress" banner. That is expected, not a defect.

