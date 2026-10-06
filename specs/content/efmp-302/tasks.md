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
| Unit 2 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-302/reviews/unit-02/G2/20261005T051427392Z-gates.json |
| Unit 2 | G3 en-review | ▣ | | feature-023 cycles complete, two consumed: feat023-r1 **pass** (earned against the b8f8ffe-broken figures; see G-2026-62), feat023-r2 **revise** on one blocking finding - fig-U2-5's superposed failure-branch labels, pre-existing authoring damage invisible to every gate and to cycle 1. Repaired post-report at 8db9943 (label rewrapped; measure-figure-text clean both variants), G2 rebound; the repair is unverified by a reviewer and escalates as G-2026-63 (third cycle owner-gated). Cycle-1 repairs verified landed; MCQ key re-derived blind 10/10; three advisories carry. Row stays open (ADR-0019) |
| Unit 2 | G4 ur-translation | ▢ | | scope changed to the per-topic layout. The legacy UR drafts were removed as orphans; under ADR-0022 the Urdu mirror arrives in the corpus-wide translation phase, and this unit is the designated Urdu rate probe |
| Unit 2 | G5 ur-review | ▣ | | feature-023 cycles complete: r1 revise (one Urdu key gap: the MCQ 6 caveat) repaired at 86ce1dd; r2 (`agent-g5-efmp302-u2-feat023-r2.json`) all ten criteria pass, escalate only on the G3 dependency (G-2026-65). 18 concept labels confirmed fit; 6 wording variances advisory. Row stays open (ADR-0019) |
| Unit 2 | G6 assets | ▢ | | |
| Unit 2 | G7 publish | ▢ | | |
| Unit 3 | G1 unit-spec | ▣ | | re-opened 2026-09-14: per-topic G1 blocks added. Five guide sections map one-to-one onto five topics, so no partition judgement was required |
| Unit 3 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-302/reviews/unit-03/G2/20261005T051440651Z-gates.json |
| Unit 3 | G3 en-review | ▣ | | feature-023 fresh reviews complete: cycle 1 (`agent-g3-efmp302-u3-feat023-r1.json`) returned **revise** on the course-wide b8f8ffe figure regression (overlapping text in 9 of 10 figures); repaired at 69bae9e; cycle 2 (`agent-g3-efmp302-u3-feat023-r2.json`, 2026-09-24) returns **pass**, all seven criteria, repair verified four independent ways incl. a negative control. Run-007 B-01/B-02/A-01/A-12a verified repaired; 14 advisories carry to the improvement loop. Row stays open: agent evidence cannot close it (ADR-0019). History: provisional tier revoked 2026-09-20 by Art. VII.4 (binding-rule change, not judgement); the feat023 cycles are the owner-commissioned fresh submission under feature 023 |
| Unit 3 | G4 ur-translation | ▣ | | feature-023 mirror complete (2026-09-24, 18,378 words): all 8 files + 10 .ur.svg/.ur.dark.svg variants; key_terms (Teacher Effectiveness, Verbal Communication, Non-verbal Communication) bank-accepted; render inspection 0 defects. translation_status stays draft pending G5 |
| Unit 3 | G5 ur-review | ▣ | | feature-023 cycles complete: r1 revise (8 Urdu semantic defects) repaired at c138103; r2 (`agent-g5-efmp302-u3-feat023-r2.json`) all ten criteria pass, escalate only on the G3 dependency (G-2026-65). 17 concept labels confirmed fit. Row stays open (ADR-0019) |
| Unit 3 | G6 assets | ▢ | | |
| Unit 3 | G7 publish | ▢ | | |
| Unit 4 | G1 unit-spec | ▣ | | re-opened 2026-09-14: per-topic G1 blocks added. Four guide sections map one-to-one onto four topics. Carries a source-verification limitation for G3: the NPST primary document was unreachable from the authoring host |
| Unit 4 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-302/reviews/unit-04/G2/20261004T144058444Z-gates.json |
| Unit 4 | G3 en-review | ▣ | | feature-023 fresh review (feat023-r1, 2026-09-24, `agent-g3-efmp302-u4-feat023-r1.json`): **pass**, all seven criteria - run-007's two run-006-introduced defects (sources, accessibility), corrected in `ded73ec`, both verify; zero figure defects; 18 advisories carry to the improvement loop, incl. the ten topic-02 standard names corroborated from secondary sources only. Row stays open: agent evidence cannot close it (ADR-0019). History: parked for the content-improvement loop after run 007 (`agent-g3-efmp302-u4-run007.json`, disposition `escalate`) after seven cycles; the feat023 pass is the owner-commissioned fresh submission under feature 023 |
| Unit 4 | G4 ur-translation | ▣ | | feature-023 mirror complete (2026-09-24, 14,958 words): all 7 files + 8 variants; key_terms (Professional Standards, NPST, Teacher Licensing, Teacher Certification) bank-accepted; render inspection 0 defects. translation_status stays draft pending G5 |
| Unit 4 | G5 ur-review | ▣ | | feature-023 cycles complete: r1 revise (13 Urdu defects) repaired at a483c9e; r2 (`agent-g5-efmp302-u4-feat023-r2.json`) 12 of 13 repairs verified, 4 residuals of the same classes repaired post-report and escalated as G-2026-66. Row stays open (ADR-0019) |
| Unit 4 | G6 assets | ▢ | | |
| Unit 4 | G7 publish | ▢ | | |
| Unit 5 | G1 unit-spec | ✅ | YM | per-topic G1 blocks added 2026-09-15; the guide-5.1 split across topics 5.1 and 5.2 was confirmed by the curriculum owner 2026-09-18 |
| Unit 5 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-302/reviews/unit-05/G2/20260926T113831476Z-gates.json |
| Unit 5 | G3 en-review | ▣ | | feature-023 fresh review (feat023-r1, 2026-09-24, `agent-g3-efmp302-u5-feat023-r1.json`): **pass**, all seven criteria - both `44bc1d7` repairs verify (hennessy2022's 'Level of support: abstract only' declaration; RRQ 9 raised to Understand and rebalanced 9 to 7 marks), the run-007 `erq-rubric-360-unreachable` finding is confirmed refuted (the rubric `<table>` is itself the scroll container), zero figure defects; 13 advisories carry. Row stays open: agent evidence cannot close it (ADR-0019). History: parked for the content-improvement loop after run 007 (`agent-g3-efmp302-u5-run007.json`, disposition `escalate`) after four cycles; run 007 resolved all six carried run-002 findings and derived the MCQ key blind at 10/10; the feat023 pass is the owner-commissioned fresh submission under feature 023 |
| Unit 5 | G4 ur-translation | ▣ | | feature-023 mirror complete (2026-09-24, 15,763 words): all 7 files + 8 variants; key_terms (Stress, Teacher Burnout, Multi-grade Classroom, Digital Professionalism) bank-accepted; render inspection 0 defects. translation_status stays draft pending G5 |
| Unit 5 | G5 ur-review | ▣ | | feature-023 cycles complete: r1 revise (9 Urdu defects) repaired at 219960c; r2 (`agent-g5-efmp302-u5-feat023-r2.json`, 2026-09-25) all nine repairs verify, 9/10 criteria pass, escalate on the G3 dependency (G-2026-65) + the advisory register batch (G-2026-67). 14 concept labels confirmed fit. Row stays open (ADR-0019) |
| Unit 5 | G6 assets | ▢ | | |
| Unit 5 | G7 publish | ▢ | | |
| Unit 6 | G1 unit-spec | ▣ | | re-opened 2026-09-15: per-topic G1 blocks added. Four guide sections map one-to-one onto four topics; no partition judgement required |
| Unit 6 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-302/reviews/unit-06/G2/20260926T113834993Z-gates.json |
| Unit 6 | G3 en-review | ▣ | | feature-023 fresh review (feat023-r1, 2026-09-24, `agent-g3-efmp302-u6-feat023-r1.json`): **escalate** - six of seven criteria pass; sources fails on two owner-gated blockers (S1 coverage groundings, S2 attribution declarations), recorded as G-2026-64. The 4a3a789 repairs verify; run-007 A2 and P2 are RESOLVED in current bytes (D-2026-0004; 9972d70); S1/S2 remain live, S3 uncertain; 11 advisories carry. History from run 007: **Parked for the content-improvement loop after run 007** (`specs/content/efmp-302/reviews/unit-06/G3/agent-g3-efmp302-u6-run007.json`, disposition `escalate`). run 007 passed coverage, accessibility and readability, derived the MCQ key blind at 10/10, and confirmed run 003's `authority` and `sources` findings genuinely repaired. Two of its six blocking findings are closed in `4a3a789` (A1: the decision register is now a bound review input; P1: fig-U6-5's caption contradicted its own Cost column) and are **unverified by a reviewer**. **Four remain open and need owner judgement**: A2 the superseded one-activity-per-category design survives at `content-spec.md` '## Course review plan', outside D-2026-0002's declared 'Unit 6 only' scope; S1 seven of 13 `coverage/unit-06.md` rows assert a grounding the prose never cites; S2 topic-01's `guskey2000` and `villegas2003` attributions carry no level-of-support declaration; P2 blueprint breach, MCQ 6 above the Apply ceiling and RRQ 3/4/9 below the Understand floor, carrying 27 of 66 RRQ marks. Four cycles against ADR-0019's limit of two. 8 advisories open |
| Unit 6 | G4 ur-translation | ▣ | | feature-023 mirror complete (2026-09-24, 14,844 words): all 7 files + 8 variants; key_terms (Continuous Professional Development, Professional Learning Community) bank-accepted; Reflective practice rendered distinct from Unit 2's banked term; render inspection 0 defects. translation_status stays draft pending G5 |
| Unit 6 | G5 ur-review | ▣ | | feature-023 cycles complete: r1 revise (one figure defect: fig-U6-7's Urdu variants missing two margin-note boxes, plus six wrong-word findings) repaired at e99c1a2; r2 (`agent-g5-efmp302-u6-feat023-r2.json`, 2026-09-25, run by a fresh reviewer once the harness classifier outage cleared) all ten criteria pass - the cycle-1 repair verified four ways (source bytes, served build, in-render DOM, pixel ink in both variants) with every English path byte-identical to what the G3 and r1 reviewed; escalate on the G3 dependency (G-2026-65) + nine unresolved advisories (register bundle, comparative drops, CON:6-6 label, fig-U6-2 bilingual overflow), recorded as G-2026-68. 12 of 13 concept labels confirmed (CON:6-6 flagged for owner term decision). Row stays open (ADR-0019) |
| Unit 6 | G6 assets | ▢ | | |
| Unit 6 | G7 publish | ▢ | | |

## Note - Unit 3's revoked provisional tier

Unit 3 was the first unit in the repository to publish provisionally, on run 005's passing review.
That tier was **revoked on 2026-09-20 by Constitution Art. VII.4**, mechanically and not by
judgement: the reviewer reference `references/g3.md` was amended, and ADR-0027 then narrowed what a
unit's evidence binds. Either alone invalidates the manifest run 005's acceptance rested on.

It now publishes in the **gate-checked** tier alongside Units 2, 4, 5 and 6, under
"Draft - expert review pending" instead of "Final Review Pending". That is a weaker claim, and a
truer one: no *current* review stands behind the unit.

Both reports stay on record. Run 007 is the more useful of the two - it re-reviewed the published
unit and found two blocking defects that were live to learners (a fabricated `N=77` the abstract
does not state, and a figure teaching the wrong answer to its own MCQ 8). Both were repaired in
`38d8e7f`. Its remaining 14 advisories carry to the improvement loop.

Re-reviewing would be cycle 8, which `D-2026-0005` reserves to an explicit owner decision.
| Unit 5 | G3 en-review | 🟡 | agent:66f69806-3ec6-4df3-af92-5b0235e295ce | provisional:specs/content/efmp-302/reviews/unit-05/G3/AGY_CONVERSATION_ID.json |
