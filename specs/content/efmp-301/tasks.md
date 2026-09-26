# EFMP-301 - Task Tracker

Legend (FR-005's 3-value status enum): `▢` not-started · `▣` in-progress · `✅` done (requires
reviewer initials). One row per unit per stage (`G1`–`G7`; `G0` course-intake is tracked via
`content-spec.md`'s own `status` field, not a row here - research.md R2). A Revision Task
(FR-011) is recorded as a new row in this same table, tagged with the originating suggestion's
`improvement_suggestions.id` (UUID) in the `Suggestion` column and its target re-entry stage.

**Intake (2026-09-24):** the extension to the full course passed G0/G1 re-intake under
**D-2026-0043** (approve-with-repairs; repairs applied) and, after the owner's chapter-wise
partition ruling resolved **G-2026-52** and the owner's extension confirmation resolved
**G-2026-53**, the chapter-wise 12-unit rework passed under **D-2026-0044** (approve; repairs
applied; `status: approved` restored). The course is bilingual: G4/G5 are in scope for every
unit. Units 2-12 are authored under Spec 022 on branch `022-author-efmp-301`.

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
| Unit 1 | G4 ur-translation | ✅ | YM | full UR prose for all 7 files at the v3.4 per-topic layout, 2026-09-11; heading parity exact, terminology-bank-driven, zero em-dash; `translation_status` stays `draft` pending G5 |
| Unit 1 | G5 ur-review | ▣ | | awaiting the human register/terminology pass the style guide requires before `translation_status: reviewed` |
| Unit 2 | G1 unit-spec | ✅ | auto:gates | intake D-2026-0044; content-spec status: approved |
| Unit 2 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-301/reviews/unit-02/G2/20260925T192504519Z-gates.json |
| Unit 2 | G3 en-review | ▢ | | advisory run001: revise; repairs applied at acd0868f; report reviews/unit-02/G3/20260925T084500Z-g3-attempt-01.json |
| Unit 2 | G4 ur-translation | ✅ | auto:gates | full UR mirror (7 files) committed 2026-09-25; check:pipeline-gate pass; translation_status stays draft pending G5 |
| Unit 2 | G5 ur-review | ▢ | | advisory run001: revise; repairs applied at 4ae665a5; G3 dependency escalated to owner; terminology rulings (Learning prose/figure conflict, new U2 coinages) escalated to owner; report reviews/unit-02/G5/agent-g5-efmp301-u2-run001.json |
| Unit 2 | G6 assets | ▢ | | |
| Unit 2 | G7 publish | ▢ | | |
| Unit 3 | G1 unit-spec | ✅ | auto:gates | intake D-2026-0044; content-spec status: approved |
| Unit 3 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-301/reviews/unit-03/G2/20260925T224624191Z-gates.json |
| Unit 3 | G3 en-review | ▢ | | advisory run001: revise; repairs applied at b220ae5d; report reviews/unit-03/G3/agent-g3-efmp301-u3-run001.json |
| Unit 3 | G4 ur-translation | ✅ | auto:gates | full UR mirror (7 files) committed 2026-09-25; check:pipeline-gate pass; translation_status stays draft pending G5 |
| Unit 3 | G5 ur-review | ▢ | | advisory run001: revise; repairs applied at 17243da9; G3 dependency escalated to owner; terminology rulings (Learning prose/figure, coinages) escalated to owner; report reviews/unit-03/G5/agent-g5-efmp301-u3-run002.json |
| Unit 3 | G6 assets | ▢ | | |
| Unit 3 | G7 publish | ▢ | | |
| Unit 4 | G1 unit-spec | ✅ | auto:gates | intake D-2026-0044; content-spec status: approved |
| Unit 4 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-301/reviews/unit-04/G2/20260926T013906009Z-gates.json |
| Unit 4 | G3 en-review | ▢ | | advisory run001: revise; repairs applied at a7a1a215; report reviews/unit-04/G3/agent-g3-efmp301-u4-run001.json |
| Unit 4 | G4 ur-translation | ✅ | auto:gates | full UR mirror (6 files) committed 2026-09-25; check:pipeline-gate pass; translation_status stays draft pending G5 |
| Unit 4 | G5 ur-review | ▢ | | advisory run001: revise; repairs applied at ff33d3a1; G3 dependency escalated to owner; terminology rulings (heuristic/means-ends/spotlight renderings) escalated to owner; report reviews/unit-04/G5/agent-g5-efmp301-u4-run001.json |
| Unit 4 | G6 assets | ▢ | | |
| Unit 4 | G7 publish | ▢ | | |
| Unit 5 | G1 unit-spec | ✅ | auto:gates | intake D-2026-0044; content-spec status: approved |
| Unit 5 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-301/reviews/unit-05/G2/20260926T002442799Z-gates.json |
| Unit 5 | G3 en-review | ▢ | | advisory run001: revise; repairs applied at a1411cdc; report reviews/unit-05/G3/agent-g3-efmp301-u5-run001.json |
| Unit 5 | G4 ur-translation | ✅ | auto:gates | full UR mirror (5 files) committed 2026-09-25; check:pipeline-gate pass; translation_status stays draft pending G5 |
| Unit 5 | G5 ur-review | ▢ | | advisory run001: revise; repairs applied at b8eabccc; G3 dependency escalated to owner; figure/prose vocabulary splits escalated to owner; report reviews/unit-05/G5/agent-g5-efmp301-u5-run001.json |
| Unit 5 | G6 assets | ▢ | | |
| Unit 5 | G7 publish | ▢ | | |
| Unit 6 | G1 unit-spec | ✅ | auto:gates | intake D-2026-0044; content-spec status: approved |
| Unit 6 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-301/reviews/unit-06/G2/20260926T001510081Z-gates.json |
| Unit 6 | G3 en-review | ▢ | | advisory run001: revise; repairs applied at 067c2ff2; report reviews/unit-06/G3/agent-g3-efmp301-u6-run001.json |
| Unit 6 | G4 ur-translation | ✅ | auto:gates | full UR mirror (5 files) committed 2026-09-25; check:pipeline-gate pass; translation_status stays draft pending G5 |
| Unit 6 | G5 ur-review | ▢ | | advisory run001: revise; repairs applied at 91844dfd; G3 dependency escalated to owner; figure/prose term unification escalated to owner; report reviews/unit-06/G5/agent-g5-efmp301-u6-run001.json |
| Unit 6 | G6 assets | ▢ | | |
| Unit 6 | G7 publish | ▢ | | |
| Unit 7 | G1 unit-spec | ✅ | auto:gates | intake D-2026-0044; content-spec status: approved |
| Unit 7 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-301/reviews/unit-07/G2/20260926T013136146Z-gates.json |
| Unit 7 | G3 en-review | ▢ | | advisory run001: revise; repairs applied at 4dbe708a; report reviews/unit-07/G3/agent-g3-efmp301-u7-run001.json |
| Unit 7 | G4 ur-translation | ✅ | auto:gates | full UR mirror (5 files) committed 2026-09-25; check:pipeline-gate pass; translation_status stays draft pending G5 |
| Unit 7 | G5 ur-review | ▢ | | advisory run001: revise; repairs applied at fd019271; G3 dependency escalated to owner; Slow Learner bank conflict (کمزور متعلم vs the unit slow-!=-weak teaching) escalated to owner; report reviews/unit-07/G5/agent-g5-efmp301-u7-run001.json |
| Unit 7 | G6 assets | ▢ | | |
| Unit 7 | G7 publish | ▢ | | |
| Unit 8 | G1 unit-spec | ✅ | auto:gates | intake D-2026-0044; content-spec status: approved |
| Unit 8 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-301/reviews/unit-08/G2/20260926T034438017Z-gates.json |
| Unit 8 | G3 en-review | ▢ | | advisory run001: revise; repairs applied at f2e751aa; report reviews/unit-08/G3/agent-g3-efmp301-u8-run001.json |
| Unit 8 | G4 ur-translation | ✅ | auto:gates | full UR mirror (6 files) committed 2026-09-25; check:pipeline-gate pass; translation_status stays draft pending G5 |
| Unit 8 | G5 ur-review | ▢ | | advisory run001: revise; repairs applied at f688322d; G3 dependency escalated to owner; figure/prose term unification escalated to owner; report reviews/unit-08/G5/agent-g5-efmp301-u8-run001.json |
| Unit 8 | G6 assets | ▢ | | |
| Unit 8 | G7 publish | ▢ | | |
| Unit 9 | G1 unit-spec | ✅ | auto:gates | intake D-2026-0044; content-spec status: approved |
| Unit 9 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-301/reviews/unit-09/G2/20260926T025014473Z-gates.json |
| Unit 9 | G3 en-review | ▢ | | advisory run001: revise; repairs applied at b2ff0b3b; report reviews/unit-09/G3/agent-g3-efmp301-u9-run001.json |
| Unit 9 | G4 ur-translation | ✅ | auto:gates | full UR mirror (6 files) committed 2026-09-25; check:pipeline-gate pass; translation_status stays draft pending G5 |
| Unit 9 | G5 ur-review | ▢ | | advisory run001: revise; repairs applied at 0a8eff4a; G3 dependency escalated to owner; terminology rulings (generic جانچ vs banked تشخیص; bank Reliability Arabic-yeh defect) escalated to owner; report reviews/unit-09/G5/agent-g5-efmp301-u9-run001.json |
| Unit 9 | G6 assets | ▢ | | |
| Unit 9 | G7 publish | ▢ | | |
| Unit 10 | G1 unit-spec | ✅ | auto:gates | intake D-2026-0044; content-spec status: approved |
| Unit 10 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-301/reviews/unit-10/G2/20260926T013909294Z-gates.json |
| Unit 10 | G3 en-review | ▢ | | advisory run001: revise; repairs applied at d837f4eb; report reviews/unit-10/G3/agent-g3-efmp301-u10-run001.json |
| Unit 10 | G4 ur-translation | ✅ | auto:gates | full UR mirror (5 files) committed 2026-09-25; check:pipeline-gate pass; translation_status stays draft pending G5 |
| Unit 10 | G5 ur-review | ▢ | | |
| Unit 10 | G6 assets | ▢ | | |
| Unit 10 | G7 publish | ▢ | | |
| Unit 11 | G1 unit-spec | ✅ | auto:gates | intake D-2026-0044; content-spec status: approved |
| Unit 11 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-301/reviews/unit-11/G2/20260926T013912666Z-gates.json |
| Unit 11 | G3 en-review | ▢ | | advisory run001: revise; repairs applied at 3a31f523; report reviews/unit-11/G3/agent-g3-efmp301-u11-20260925T165209548Z.json |
| Unit 11 | G4 ur-translation | ✅ | auto:gates | full UR mirror (5 files) committed 2026-09-25; check:pipeline-gate pass; translation_status stays draft pending G5 |
| Unit 11 | G5 ur-review | ▢ | | |
| Unit 11 | G6 assets | ▢ | | |
| Unit 11 | G7 publish | ▢ | | |
| Unit 12 | G1 unit-spec | ✅ | auto:gates | intake D-2026-0044; content-spec status: approved |
| Unit 12 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-301/reviews/unit-12/G2/20260926T013915918Z-gates.json |
| Unit 12 | G3 en-review | ▢ | | advisory run001: revise; repairs applied at 678a6f2d; report reviews/unit-12/G3/agent-g3-efmp301-u12-run001.json |
| Unit 12 | G4 ur-translation | ✅ | auto:gates | full UR mirror (6 files) committed 2026-09-25; check:pipeline-gate pass; translation_status stays draft pending G5 |
| Unit 12 | G5 ur-review | ▢ | | advisory run001: revise; repairs applied at 12dfb47f + dd015e7d; G3 dependency escalated to owner; terminology rulings (Ethical Dilemma prose/figure split, Rubric convention, NPST phrase) escalated to owner; report reviews/unit-12/G5/agent-g5-efmp301-u12-run001.json |
| Unit 12 | G6 assets | ▢ | | |
| Unit 12 | G7 publish | ▢ | | |

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
again. The nine figures were rendered in the same branch.

**G4 closed on 2026-09-11.** All seven Urdu files now carry full prose, not stubs: `index.mdx`,
`topic-01..04.mdx`, `unit-assessment.mdx` (including the 10 MCQ / 10 RRQ / 5 ERQ bank, the worked
responses, the mark schemes and all five ERQ rubric tables) and `unit-teacher-notes.mdx`, which had
still held pre-v3.4 legacy content rather than a stub. Heading parity is exact file by file, the
`<Figure>` elements keep their `.ur.svg` sources and translated alt text, and every
`- [ ]` self-assessment item is mirrored. Register is academic-plain per Art. III.2, terminology
follows `terminology.csv`, and `check:no-em-dash` is clean over `i18n/`.

**G5 remains open, and cannot be closed by an authoring pass.** The style guide requires a human
quality pass before a unit may be marked `translation_status: reviewed`, so every file stays at
`draft` and the `/ur/` route keeps the "translation in progress" banner until the curriculum
owner completes that review. That is the gate working as designed, not an omission.

