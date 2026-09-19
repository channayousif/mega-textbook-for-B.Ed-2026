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
restored to `✅` (YM).**

**Unit 1 - Spec 012 figure retrofit + Urdu re-translation (2026-09-09, COMPLETE):** the
`**Figure plan**` was expanded to `fig-U1-1…fig-U1-8` (two per topic, each with an archetype;
`fig-U1-7` is the unit timeline) for Constitution Art. III.10, and four new SVG schematics
(+ `.ur.svg` variants) were placed. **G4 ur-translation `✅` (YM)**: all seven Urdu files fully
re-translated to the per-topic layout, consulting `terminology.csv` for every key term, heading
vectors matched position-by-position, zero em-dash. **G5 ur-review `✅` (YM)**: academic-plain
register pass; `translation_status: reviewed` on all EN and UR unit-01 files;
`<TranslationStatusBadge status="reviewed" />`. The `ur` route now serves the reviewed Urdu unit
(no EN fallback). `validate:content` (EN↔UR parity now active), `check:figures` (UR `<Figure>` +
`.ur.svg` per id enforced), `check:no-em-dash`, `check:no-answer-keys`, `check:depth-gate`,
`check:pipeline-gate`, `npm test`, and `npm run build` (en + ur) all green.

| Unit | Stage | Status | Reviewer | Suggestion |
|---|---|---|---|---|
| Unit 1 | G1 unit-spec | ✅ | YM | |
| Unit 1 | G2 en-draft | ✅ | YM | S008 v3.0 per-topic re-restructure - Content gate passed 2026-08-30 |
| Unit 1 | G3 en-review | ✅ | YM | S008 v3.0 per-topic re-restructure - Content gate passed 2026-08-30 |
| Unit 1 | G4 ur-translation | ✅ | YM | Full UR re-translation of all 7 files to the v3.0 per-topic layout + the Spec 012 figure retrofit (fig-U1-1..8); terminology-bank-driven, heading-parity exact, zero em-dash |
| Unit 1 | G5 ur-review | ✅ | YM | Register / terminology pass (academic-plain, درسی مگر عام فہم); `Professionalism` / `Professionalization` bank terms confirmed at G5; `translation_status: reviewed`, `ur` route no longer falls back to EN |
| Unit 1 | G6 assets | ✅ | YM | |
| Unit 1 | G7 publish | ✅ | YM | |
| Unit 2 | G1 unit-spec | ✅ | YM | per-topic G1 blocks added 2026-09-14; the guide-2.3 split across topics 2.3 and 2.4 was confirmed by the curriculum owner 2026-09-15 |
| Unit 2 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-302/reviews/unit-02/G2/20260919T163956119Z-gates.json |
| Unit 2 | G3 en-review | ▣ | | re-opened 2026-09-14: the previous ✅ certified the legacy draft, which no longer exists. Awaiting a Content-gate pass on the new draft |
| Unit 2 | G4 ur-translation | ▢ | | scope changed to the per-topic layout. The legacy UR drafts were removed as orphans; under ADR-0022 the Urdu mirror arrives in the corpus-wide translation phase, and this unit is the designated Urdu rate probe |
| Unit 2 | G5 ur-review | ▢ | | scope changed to the per-topic layout; 18 authored Urdu concept labels in concepts/unit-02.md need review |
| Unit 2 | G6 assets | ▢ | | |
| Unit 2 | G7 publish | ▢ | | |
| Unit 3 | G1 unit-spec | ▣ | | re-opened 2026-09-14: per-topic G1 blocks added. Five guide sections map one-to-one onto five topics, so no partition judgement was required |
| Unit 3 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-302/reviews/unit-03/G2/20260919T163958580Z-gates.json |
| Unit 3 | G3 en-review | 🟡 | agent:g3-reviewer | provisional:specs/content/efmp-302/reviews/unit-03/G3/agent-g3-efmp302-u3-run005.json |
| Unit 3 | G4 ur-translation | ▢ | | scope changed to the per-topic layout. Legacy UR drafts removed as orphans; under ADR-0022 the Urdu mirror arrives in the corpus-wide translation phase |
| Unit 3 | G5 ur-review | ▢ | | scope changed to the per-topic layout; 17 authored Urdu concept labels in concepts/unit-03.md need review |
| Unit 3 | G6 assets | ▢ | | |
| Unit 3 | G7 publish | ▢ | | |
| Unit 4 | G1 unit-spec | ▣ | | re-opened 2026-09-14: per-topic G1 blocks added. Four guide sections map one-to-one onto four topics. Carries a source-verification limitation for G3: the NPST primary document was unreachable from the authoring host |
| Unit 4 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-302/reviews/unit-04/G2/20260919T164000753Z-gates.json |
| Unit 4 | G3 en-review | ▣ | | re-opened 2026-09-14. **Reviewer action required**: confirm the ten standard names in topic-02.mdx against a copy of the primary document; they were corroborated from secondary sources only |
| Unit 4 | G4 ur-translation | ▢ | | scope changed to the per-topic layout. Legacy UR drafts removed as orphans; Urdu mirror arrives in the corpus-wide translation phase (ADR-0022) |
| Unit 4 | G5 ur-review | ▢ | | scope changed to the per-topic layout; 13 authored Urdu concept labels in concepts/unit-04.md need review |
| Unit 4 | G6 assets | ▢ | | |
| Unit 4 | G7 publish | ▢ | | |
| Unit 5 | G1 unit-spec | ✅ | YM | per-topic G1 blocks added 2026-09-15; the guide-5.1 split across topics 5.1 and 5.2 was confirmed by the curriculum owner 2026-09-18 |
| Unit 5 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-302/reviews/unit-05/G2/20260919T164003774Z-gates.json |
| Unit 5 | G3 en-review | ▣ | | re-opened 2026-09-15. Sources verified by reading abstracts, not registry metadata alone, after the Unit 2 and 3 reviews; three carry scope limits stated in the prose |
| Unit 5 | G4 ur-translation | ▢ | | scope changed to the per-topic layout. Legacy UR drafts removed as orphans; Urdu mirror arrives in the corpus-wide translation phase (ADR-0022) |
| Unit 5 | G5 ur-review | ▢ | | **14 of 16 concept labels are authored**, the largest authored set in the course; approved labels should be promoted into terminology.csv before Unit 6 is translated |
| Unit 5 | G6 assets | ▢ | | |
| Unit 5 | G7 publish | ▢ | | |
| Unit 6 | G1 unit-spec | ▣ | | re-opened 2026-09-15: per-topic G1 blocks added. Four guide sections map one-to-one onto four topics; no partition judgement required |
| Unit 6 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-302/reviews/unit-06/G2/20260919T164006260Z-gates.json |
| Unit 6 | G3 en-review | ▣ | | re-opened 2026-09-15. One source (kwakman2003) has no available abstract and is cited for its question only; the prose says so and a reviewer with full-text access should extend or remove it |
| Unit 6 | G4 ur-translation | ▢ | | scope changed to the per-topic layout. Legacy UR drafts removed as orphans; Urdu mirror arrives in the corpus-wide translation phase (ADR-0022) |
| Unit 6 | G5 ur-review | ▢ | | 13 of 15 concept labels authored. Note the `Reflective practice` / `Reflective Decision Making` relationship flagged in concepts/unit-06.md |
| Unit 6 | G6 assets | ▢ | | |
| Unit 6 | G7 publish | ▢ | | |
