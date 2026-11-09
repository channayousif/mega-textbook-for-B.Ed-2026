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
| Unit 1 | G5 ur-review | ▢ | | advisory run001: escalate; render inspection unavailable, all content gates pass; report reviews/unit-01/G5/agent-g5-efmp301-u1-run001.json |
| Unit 2 | G1 unit-spec | ✅ | auto:gates | intake D-2026-0044; content-spec status: approved |
| Unit 2 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-301/reviews/unit-02/G2/20261103T112233152Z-gates.json |
| Unit 2 | G3 en-review | ▢ | | advisory run002: escalate; repair limit reached (ADR-0019 cycle 2/2); seifert-hk missing in sources/unit-02.md table; visual render uninspected; report reviews/unit-02/G3/22ba096a-360e-434d-bbff-e55d664db642.json |
| Unit 2 | G4 ur-translation | ✅ | auto:gates | full UR mirror (7 files) committed 2026-09-25; check:pipeline-gate pass; translation_status stays draft pending G5 |
| Unit 2 | G5 ur-review | ▢ | | advisory run001: revise; repairs applied at 4ae665a5; G3 dependency escalated to owner; terminology rulings (Learning prose/figure conflict, new U2 coinages) escalated to owner; report reviews/unit-02/G5/agent-g5-efmp301-u2-run001.json |
| Unit 2 | G6 assets | ▢ | | |
| Unit 2 | G7 publish | ▢ | | |
| Unit 3 | G1 unit-spec | ✅ | auto:gates | intake D-2026-0044; content-spec status: approved |
| Unit 3 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-301/reviews/unit-03/G2/20261103T112233289Z-gates.json |
| Unit 3 | G3 en-review | ▢ | | advisory run001: revise; repairs applied at b220ae5d; report reviews/unit-03/G3/agent-g3-efmp301-u3-run001.json; Stale since the figure-geometry repair; needs a fresh G3 run |
| Unit 3 | G4 ur-translation | ✅ | auto:gates | full UR mirror (7 files) committed 2026-09-25; check:pipeline-gate pass; translation_status stays draft pending G5 |
| Unit 3 | G5 ur-review | ▢ | | advisory run001: revise; repairs applied at 17243da9; G3 dependency escalated to owner; terminology rulings (Learning prose/figure, coinages) escalated to owner; report reviews/unit-03/G5/agent-g5-efmp301-u3-run002.json |
| Unit 3 | G6 assets | ▢ | | |
| Unit 3 | G7 publish | ▢ | | |
| Unit 4 | G1 unit-spec | ✅ | auto:gates | intake D-2026-0044; content-spec status: approved |
| Unit 4 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-301/reviews/unit-04/G2/20261103T112233449Z-gates.json |
| Unit 4 | G3 en-review | ▢ | agent:agy | Advisory escalate: specs/content/efmp-301/reviews/unit-04/G3/8d35e67d-a55f-4595-a37c-c29acbf04727.json; cycle 2 of 2; 5 blocking findings resolved; 1 uncertain (vosniadou2001 excerpt) carried; visual render uninspected (brief prohibits build/server/browser); no certification |
| Unit 4 | G4 ur-translation | ✅ | auto:gates | full UR mirror (6 files) committed 2026-09-25; check:pipeline-gate pass; translation_status stays draft pending G5 |
| Unit 4 | G5 ur-review | ▢ | | advisory run001: revise; repairs applied at ff33d3a1; G3 dependency escalated to owner; terminology rulings (heuristic/means-ends/spotlight renderings) escalated to owner; report reviews/unit-04/G5/agent-g5-efmp301-u4-run001.json |
| Unit 4 | G6 assets | ▢ | | |
| Unit 4 | G7 publish | ▢ | | |
| Unit 5 | G1 unit-spec | ✅ | auto:gates | intake D-2026-0044; content-spec status: approved |
| Unit 5 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-301/reviews/unit-05/G2/20261103T112233605Z-gates.json |
| Unit 5 | G3 en-review | ▢ | agent:codex-g3-reviewer | advisory cycle2: escalate; final authorised cycle, owner action required; report reviews/unit-05/G3/codex-crew-cycle2.json |
| Unit 5 | G4 ur-translation | ✅ | auto:gates | full UR mirror (5 files) committed 2026-09-25; check:pipeline-gate pass; translation_status stays draft pending G5 |
| Unit 5 | G5 ur-review | ▢ | | advisory run001: revise; repairs applied at b8eabccc; G3 dependency escalated to owner; figure/prose vocabulary splits escalated to owner; report reviews/unit-05/G5/agent-g5-efmp301-u5-run001.json |
| Unit 5 | G6 assets | ▢ | | |
| Unit 5 | G7 publish | ▢ | | |
| Unit 6 | G1 unit-spec | ✅ | auto:gates | intake D-2026-0044; content-spec status: approved |
| Unit 6 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-301/reviews/unit-06/G2/20261103T112233759Z-gates.json |
| Unit 6 | G3 en-review | ▢ | | advisory run002 (disposition: pass) at specs/content/efmp-301/reviews/unit-06/G3/20f4255e-9449-4f10-a771-4653e5eee5e5.json; its input manifest predates the figure-geometry repair (8bac57e5), so it is stale; needs a fresh G3 run; agent reviews advisory under ADR-0019 |
| Unit 6 | G4 ur-translation | ✅ | auto:gates | full UR mirror (5 files) committed 2026-09-25; check:pipeline-gate pass; translation_status stays draft pending G5 |
| Unit 6 | G5 ur-review | ▢ | | advisory run001: revise; repairs applied at 91844dfd; G3 dependency escalated to owner; figure/prose term unification escalated to owner; report reviews/unit-06/G5/agent-g5-efmp301-u6-run001.json |
| Unit 6 | G6 assets | ▢ | | |
| Unit 6 | G7 publish | ▢ | | |
| Unit 7 | G1 unit-spec | ✅ | auto:gates | intake D-2026-0044; content-spec status: approved |
| Unit 7 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-301/reviews/unit-07/G2/20261103T112233937Z-gates.json |
| Unit 7 | G3 en-review | ▢ | | advisory round 2: pass; round 1 blocking findings resolved (Rohrer & Pashler 2012 cited, 5/5 blueprint spread restored); all criteria pass; report reviews/unit-07/G3/agent-g3-efmp301-u7-run002.json |
| Unit 7 | G4 ur-translation | ✅ | auto:gates | full UR mirror (5 files) committed 2026-09-25; check:pipeline-gate pass; translation_status stays draft pending G5 |
| Unit 7 | G5 ur-review | ▢ | | advisory run001: revise; repairs applied at fd019271; G3 dependency escalated to owner; Slow Learner bank conflict (کمزور متعلم vs the unit slow-!=-weak teaching) escalated to owner; report reviews/unit-07/G5/agent-g5-efmp301-u7-run001.json |
| Unit 7 | G6 assets | ▢ | | |
| Unit 7 | G7 publish | ▢ | | |
| Unit 8 | G1 unit-spec | ✅ | auto:gates | intake D-2026-0044; content-spec status: approved |
| Unit 8 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-301/reviews/unit-08/G2/20261103T112234142Z-gates.json |
| Unit 8 | G3 en-review | ▢ | agent:codex-g3-reviewer | advisory run001: revise; repairs applied at f2e751aa; advisory cycle2: escalate; RRQ-10 untaught, ERQ limits unspecified; source/render evidence incomplete; owner action required; report reviews/unit-08/G3/codex-cycle2-20261028.json |
| Unit 8 | G4 ur-translation | ✅ | auto:gates | full UR mirror (6 files) committed 2026-09-25; check:pipeline-gate pass; translation_status stays draft pending G5 |
| Unit 8 | G5 ur-review | ▢ | | advisory run001: revise; repairs applied at f688322d; G3 dependency escalated to owner; figure/prose term unification escalated to owner; report reviews/unit-08/G5/agent-g5-efmp301-u8-run001.json |
| Unit 8 | G6 assets | ▢ | | |
| Unit 8 | G7 publish | ▢ | | |
| Unit 9 | G1 unit-spec | ✅ | auto:gates | intake D-2026-0044; content-spec status: approved |
| Unit 9 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-301/reviews/unit-09/G2/20261103T112234285Z-gates.json |
| Unit 9 | G3 en-review | ▢ | | advisory run001: revise; repairs applied at b2ff0b3b; report reviews/unit-09/G3/agent-g3-efmp301-u9-run001.json |
| Unit 9 | G4 ur-translation | ✅ | auto:gates | full UR mirror (6 files) committed 2026-09-25; check:pipeline-gate pass; translation_status stays draft pending G5 |
| Unit 9 | G5 ur-review | ▢ | | advisory run001: revise; repairs applied at 0a8eff4a; G3 dependency escalated to owner; terminology rulings (generic جانچ vs banked تشخیص; bank Reliability Arabic-yeh defect) escalated to owner; report reviews/unit-09/G5/agent-g5-efmp301-u9-run001.json |
| Unit 9 | G6 assets | ▢ | | |
| Unit 9 | G7 publish | ▢ | | |
| Unit 10 | G1 unit-spec | ✅ | auto:gates | intake D-2026-0044; content-spec status: approved |
| Unit 10 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-301/reviews/unit-10/G2/20261103T112234425Z-gates.json |
| Unit 10 | G3 en-review | ▢ | | advisory run002: pass (all run001 blocking findings repaired); report reviews/unit-10/G3/agent-g3-efmp301-u10-run002.json; agent reviews advisory under ADR-0019 |
| Unit 10 | G4 ur-translation | ✅ | auto:gates | full UR mirror (5 files) committed 2026-09-25; check:pipeline-gate pass; translation_status stays draft pending G5 |
| Unit 10 | G5 ur-review | ▢ | | advisory run001: revise; repairs applied at a527a7fa; G3 dependency escalated to owner; register/line-spacing advisories escalated to owner; report reviews/unit-10/G5/agent-g5-efmp301-u10-run001.json |
| Unit 10 | G6 assets | ▢ | | |
| Unit 10 | G7 publish | ▢ | | |
| Unit 11 | G1 unit-spec | ✅ | auto:gates | intake D-2026-0044; content-spec status: approved |
| Unit 11 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-301/reviews/unit-11/G2/20261103T141631178Z-gates.json |
| Unit 11 | G3 en-review | ▢ | | advisory run001: revise; repairs applied at 3a31f523; report reviews/unit-11/G3/agent-g3-efmp301-u11-20260925T165209548Z.json; Stale since the figure-geometry repair; needs a fresh G3 run |
| Unit 11 | G3 en-review | ▢ | agent:codex-g3-reviewer | advisory cycle 2: escalate; prior blocking repairs verified; clinical source support, current renders and handoff provenance unverified; owner escalation required; report reviews/unit-11/G3/codex-cycle2-20261028.json |
| Unit 11 | G4 ur-translation | ✅ | auto:gates | full UR mirror (5 files) committed 2026-09-25; check:pipeline-gate pass; translation_status stays draft pending G5 |
| Unit 11 | G5 ur-review | ▢ | | advisory run001: revise; repairs applied at ee512a75; G3 dependency escalated to owner; register advisories escalated to owner; report reviews/unit-11/G5/agent-g5-efmp301-u11-run001.json |
| Unit 11 | G6 assets | ▢ | | |
| Unit 11 | G7 publish | ▢ | | |
| Unit 12 | G1 unit-spec | ✅ | auto:gates | intake D-2026-0044; content-spec status: approved |
| Unit 12 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-301/reviews/unit-12/G2/20261103T112234741Z-gates.json |
| Unit 12 | G3 en-review | ▢ | | advisory run001: revise; repairs applied at 678a6f2d; report reviews/unit-12/G3/agent-g3-efmp301-u12-run001.json |
| Unit 12 | G3 en-review | ▢ | agent:codex-g3-reviewer | advisory run002: escalate (final cycle); prior repairs checked, current render unavailable, modelling claim and unstated ERQ word limits require owner action; report reviews/unit-12/G3/agent-codex-g3-u12-run002.json |
| Unit 12 | G4 ur-translation | ✅ | auto:gates | full UR mirror (6 files) committed 2026-09-25; check:pipeline-gate pass; translation_status stays draft pending G5 |
| Unit 12 | G5 ur-review | ▢ | | advisory run001: revise; repairs applied at 12dfb47f + dd015e7d; G3 dependency escalated to owner; terminology rulings (Ethical Dilemma prose/figure split, Rubric convention, NPST phrase) escalated to owner; report reviews/unit-12/G5/agent-g5-efmp301-u12-run001.json |
| Unit 12 | G6 assets | ▢ | | |
| Unit 12 | G7 publish | ▢ | | |
| Unit 9 | G3 en-review | ▢ | agent:codex-g3-reviewer | advisory cycle2: escalate; MCQ spread unresolved, source/pedagogy findings and current render evidence unavailable; owner handling required; report specs/content/efmp-301/reviews/unit-09/G3/codex-efmp301-u09-cycle2-01a17f38-14aa-7e12-b5ba-14390f06b2ef.json |
| Unit 2 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-301/reviews/unit-02/G3/20261028T054347Z-g3-desk-d8a27feb.json |
| Unit 2 | G3 en-review | ▢ | | advisory: revise; repairs applied; sources/unit-02.md lines 6-8 corrected to bind only seifert2009 and vosniadou2001, with seifert-hk (guide book 1) bound at course level as a revised edition of the same Chapter 3, uncited in the prose; bare-URL Further Reading left as course convention; visual render still uninspected; fresh G3 run needed; report reviews/unit-02/G3/20261028T054347Z-g3-desk-d8a27feb.json |
| Unit 2 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-301/reviews/unit-02/G3/20261102T142352Z-g3-desk-690ed36f.json |
| Unit 3 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-301/reviews/unit-03/G3/20261102T142352Z-g3-desk-c9a0cfe5.json |
| Unit 5 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-301/reviews/unit-05/G3/20261102T142352Z-g3-desk-a05ecd7f.json |
| Unit 8 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-301/reviews/unit-08/G3/20261102T142352Z-g3-desk-13bb6394.json |
| Unit 9 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-301/reviews/unit-09/G3/20261102T142352Z-g3-desk-f72b8c56.json |
| Unit 11 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-301/reviews/unit-11/G3/20261102T142352Z-g3-desk-644c3252.json |
| Unit 12 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-301/reviews/unit-12/G3/20261102T142352Z-g3-desk-e7aea2c7.json |
| Unit 6 | G3 en-review | ✅ | CMY | review:specs/content/efmp-301/reviews/unit-06/G3/20261102T140729Z-g3-desk-490cb9af.json |
| Unit 7 | G3 en-review | ✅ | CMY | review:specs/content/efmp-301/reviews/unit-07/G3/20261102T140729Z-g3-desk-e8869756.json |
| Unit 10 | G3 en-review | ✅ | CMY | review:specs/content/efmp-301/reviews/unit-10/G3/20261102T140729Z-g3-desk-2aa34b72.json |
| Unit 4 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-301/reviews/unit-04/G3/20261102T141142Z-g3-desk-26537ed9.json |
| Unit 2 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-301/reviews/unit-02/G3/20261102T211054Z-g3-desk-8fe42573.json |
| Unit 2 | G3 en-review | ▢ | | advisory: revise; repairs applied; report reviews/unit-02/G3/20261102T211054Z-g3-desk-8fe42573.json; sources criterion (finding 2): seifert-hk (guide book 1) added to the sources/unit-02.md table and grounded in coverage rows U2-1, U2-4, U2-6 from its bound Chapter 3 excerpts; prose still cites the seifert2009 edition; G2 evidence refreshed; render-review (360px, print) still uninspected; ADR-0019 cycles exhausted, so a fresh G3 run needs owner authorisation |
| Unit 3 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-301/reviews/unit-03/G3/20261102T211054Z-g3-desk-1ffb278b.json |
| Unit 5 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-301/reviews/unit-05/G3/20261102T211054Z-g3-desk-5bdd915a.json |
| Unit 8 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-301/reviews/unit-08/G3/20261102T211054Z-g3-desk-f27564cd.json |
| Unit 9 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-301/reviews/unit-09/G3/20261102T211054Z-g3-desk-15f0d2e9.json |
| Unit 11 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-301/reviews/unit-11/G3/20261102T211054Z-g3-desk-baae4994.json |
| Unit 12 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-301/reviews/unit-12/G3/20261102T211054Z-g3-desk-c6d3f3b3.json |
| Unit 4 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-301/reviews/unit-04/G3/20261102T211929Z-g3-desk-a812ec4a.json |
| Unit 3 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-301/reviews/unit-03/G3/20261102T212207Z-g3-desk-aaa9f247.json |
| Unit 5 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-301/reviews/unit-05/G3/20261102T212207Z-g3-desk-99b62591.json |
| Unit 8 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-301/reviews/unit-08/G3/20261102T212207Z-g3-desk-04504f15.json |
| Unit 9 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-301/reviews/unit-09/G3/20261102T212207Z-g3-desk-b282fccc.json |
| Unit 11 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-301/reviews/unit-11/G3/20261102T212207Z-g3-desk-c705dbc8.json |
| Unit 12 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-301/reviews/unit-12/G3/20261102T212207Z-g3-desk-1ab85eaa.json |
| Unit 2 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-301/reviews/unit-02/G3/20261102T212207Z-g3-desk-4eaf1d0f.json |
| Unit 3 | G3 en-review | ▢ | | advisory: revise; repairs applied; report reviews/unit-03/G3/20261102T211054Z-g3-desk-1ffb278b.json; EN/UR assessment and mechanism repairs, coverage bindings and introduction corrected; render/glyph geometry and provenance remain owner handoff items; fresh independent review required |

| Unit 12 | G3 en-review | ▢ | | advisory: revise; repairs applied; report reviews/unit-12/G3/20261102T212207Z-g3-desk-1ab85eaa.json; modelling, running question, case status and assessment guidance repaired in EN and UR; visual inspection and historical provenance remain unverified; owner must authorise any further review after exhausted cycles; see reviews/unit-12/G3/repair-en-20261103.md |
| Unit 9 | G3 en-review | ▢ | agent:codex | advisory: revise; repairs applied; report specs/content/efmp-301/reviews/unit-09/G3/20261102T212207Z-g3-desk-b282fccc.json; EN and UR assessment, authority, pedagogy and figure repairs; current render and authenticated provenance remain owner handoffs; no certification |

| Unit 5 | G3 en-review | ▢ | | advisory: revise; repairs applied; multimodal claims and IQ prediction claims qualified across topics, assessment and figures; fig-U5-1 geometry verified and Thurstone/CHC positions restored; ERQ 5 widened to blueprint integrative pupil profile with explicit 250-300 word conditions; Seifert and Rohrer source/coverage locators corrected; early finisher framed as hypothesis; report specs/content/efmp-301/reviews/unit-05/G3/20261102T211054Z-g3-desk-5bdd915a.json |
| Unit 4 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-301/reviews/unit-04/G3/20261102T213456Z-g3-desk-147d237b.json |
| Unit 8 | G3 en-review | ▢ | | advisory: revise; repairs applied; report reviews/unit-08/G3/20261102T212207Z-g3-desk-04504f15.json; RRQ 10 replaced with a taught Topic 8.2 item (feedback at the centre, next step vs ranking) so RRQs spread 3/4/3, guidance and UR mirror aligned; ERQs given an explicit 400-500 word limit and rubric rows reworded to match; MCQ keys rebalanced to 3a/3b/2c/2d by reordering options (EN+UR); sources/unit-08.md corrects the guide practical-work attribution, separates the unit ladder and five-part framework (synthesis) from the bound Seifert Chapter 7 findings, and adds a scope-of-support note; comparative proximity and misbehaviour claims qualified in topic-01/topic-03 (EN+UR); fig-U8-1 manifest prompt now carries the not-silence tagline; narrow-screen and A4 render still uninspected; ADR-0019 cycles exhausted, so this is the final cycle and the remaining items escalate to the owner |
| Unit 8 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-301/reviews/unit-08/G2/20261103T141630980Z-gates.json |

| Unit 11 | G3 en-review | ▢ | | advisory: revise; repairs applied; report reviews/unit-11/G3/20261102T212207Z-g3-desk-c705dbc8.json; blocking sources finding: U11-2 signs and U11-4 referral now bound to who2000 (WHO 2000, Preventing suicide: a resource for teachers and other school staff, bound excerpt in sources/texts/who2000.md); unsupported claims removed (local frequency, Monday clustering, sudden calm implying a decision, appearance/self-care, burden talk) and the second same-day sign restated as a sudden, dramatic change in distress, with MCQ 7, RRQ 5/9 keys and fig-U11-2 (four variants) aligned; advisories: Further reading uses linked titles, sourced explicit correction of the talking-plants-the-idea misconception in topic-01 and teacher notes, Language and access separates banked Anxiety/Stress from authored Mental Health/Well-being, ERQs state 300-400 words, coverage duplicates removed and seifert2009 moved to a background Reinforcement row; Urdu mirrored; qualified subject review of clinical interpretation, urgency and local referral procedure, render inspection and review provenance still need owner escalation; ADR-0019 cycles exhausted, so a fresh G3 run needs owner authorisation |
| Unit 4 | G3 en-review | ▢ | agent:claude | advisory: revise; repairs applied; report reviews/unit-04/G3/20261102T213456Z-g3-desk-147d237b.json; Topic 4.1 capture-factor list aligned with fig-U4-2 (novelty, contrast, meaning, emotion; task demand and expectation shape) in EN and UR; MCQ keys rebalanced to a3/b2/c2/d3 by swapping option positions in EN and UR with keys updated; vosniadou2001 U4-4/U4-5 coverage rows removed and its sources-table row moved to a Further-reading-only note; visual 360px/print inspection still unperformed (no build/browser in crew job); fresh G3 review required; no certification |
| Unit 4 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-301/reviews/unit-04/G2/20261103T174846654Z-gates.json |
| Unit 3 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-301/reviews/unit-03/G3/20261108T203238Z-g3-desk-abd7d7ca.json |
| Unit 5 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-301/reviews/unit-05/G3/20261108T203238Z-g3-desk-c3af68da.json |
| Unit 8 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-301/reviews/unit-08/G3/20261108T203238Z-g3-desk-dd961083.json |
| Unit 9 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-301/reviews/unit-09/G3/20261108T203238Z-g3-desk-cb72c312.json |
| Unit 11 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-301/reviews/unit-11/G3/20261108T203238Z-g3-desk-e5f319f8.json |
| Unit 12 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-301/reviews/unit-12/G3/20261108T203238Z-g3-desk-ad4c974d.json |
| Unit 4 | G3 en-review | ✅ | CMY | review:specs/content/efmp-301/reviews/unit-04/G3/20261108T205835Z-g3-desk-6a389e2c.json |
| Unit 8 | G3 en-review | ▢ | | advisory: revise; repairs applied; report reviews/unit-08/G3/20261108T203238Z-g3-desk-dd961083.json; the 20261108 desk report is a verbatim re-report of the 20261102 findings, and current committed bytes re-verify every editable finding already repaired at 44e895fb: RRQ-10 is the taught Topic 8.2 feedback item with guidance and concept mapping aligned (RRQs 3/4/3), ERQs carry an explicit 400-500 word limit, MCQ keys are 3a/3b/2c/2d, sources/unit-08.md attributes the guide practical-work list as course-generic and separates the unit ladder and five-part framework from the bound Seifert Chapter 7 findings, and fig-U8-1's manifest prompt carries the not-silence tagline; all 14 content gates pass; narrow-screen/A4 render and review-handoff provenance remain owner handoffs; no new content edits required |

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

