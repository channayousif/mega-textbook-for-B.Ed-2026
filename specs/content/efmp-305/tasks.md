# EFMP-305 - Task Tracker

Legend (FR-005's 3-value status enum): `▢` not-started · `▣` in-progress · `✅` done (requires
reviewer initials). One row per unit per stage (`G1`-`G7`; `G0` course-intake is tracked via
`content-spec.md`'s own `status` field, not a row here).

**Note:** G1 unit-spec rows remain `▢` until intake approves the spec (`content-spec.md` moves to
`status: approved`).

**Record corrected 2026-10-15 (TEX-69).** This note previously said the content-spec was `draft`
pending owner rulings on `G-2026-72` to `G-2026-76` and a fresh intake. That is out of date: the
spec went through two further intakes and **`content-spec.md` is now `status: approved`**.
`D-2026-0054` (second intake) approved six criteria and escalated readings as `G-2026-102`;
`D-2026-0053` item 7 resolved that escalation; `D-2026-0065` (third intake) approved **all eight**
G0/G1 criteria and the owner confirmed it. Authoring is therefore unblocked, which is why Unit 3
is drafted below.

**The G1 rows are left `▢` deliberately.** `D-2026-0065` approves the spec, so these rows are now
supportable, but setting a G1 row is the intake evaluator's act and not the author's - that
distinction is exactly what `G-2026-76` was raised about. The author does not move them. Their
`Notes` are corrected to cite the approval instead of claiming a pending one.

**Unit 1 - Foundations of Inclusive Education (2026-10-09):** authored to the Spec 008 v3.0
per-topic layout: `index.mdx` + `topic-01…02.mdx` (nine-part cycles) + `unit-assessment.mdx`
(10/10/5 bank + bounded answers) + `unit-teacher-notes.mdx`. G2 en-draft cleared by deterministic gates on 2026-10-17.

| Unit | Stage | Status | Initials | Notes |
|---|---|---|---|---|
| Unit 1 | G1 unit-spec | ▢ | | spec approved (D-2026-0065); row is the evaluator's to set, not the author's |
| Unit 1 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-305/reviews/unit-01/G2/20261103T112514677Z-gates.json |
| Unit 1 | G3 en-review | ▢ | | |
| Unit 1 | G4 ur-translation | ▣ | | Complete 5-file UR mirror reconciled with EN baseline 9e6da648 on 2026-10-18 (crew efmp-305-u01-translate-r1); semantic, register, and terminology polish; 4 .ur.svg/.ur.dark.svg figure variants wired; structural parity, figure parity, and bank-conformant key_terms (Inclusive Education) verified under temporary reviewed flip (reverted); 8 unbanked concept labels proposed separately; handoff: reviews/unit-01/G4/translation-handoff.md; translation_status stays draft pending fresh independent G5; no certification claimed. |
| Unit 1 | G5 ur-review | ▢ | | |
| Unit 1 | G6 assets | ▢ | | 4 schematic SVGs prompt-only |
| Unit 1 | G7 publish | ▢ | | |
| Unit 1 | G3 en-review | ▢ | | advisory: revise; repairs applied; report specs/content/efmp-305/reviews/unit-01/G3/agent-g3-efmp-305-u1-run2f195870.json |
| Unit 1 | G3 en-review | ▢ | | advisory: escalate; final cycle; agent:codex-g3-reviewer; report specs/content/efmp-305/reviews/unit-01/G3/codex-01a17f6f.json; prior findings resolved, new assessment/source defects and missing render/provenance evidence require owner disposition; no certification |
| Unit 1 | G3 en-review | ▢ | | advisory: revise; repairs applied; report specs/content/efmp-305/reviews/unit-01/G3/20261102T212207Z-g3-desk-65386ad3.json; topic-01 summative task now rewards segregation, opening verb and Further reading (UNESCO, Miles) aligned; topic-02 UNICEF/NEP claims bound to unicef2014/nep2009 with honest limits, Hehir limit added, Ainscow Further reading aligned; assessment RRQ 5 key, MCQ 10, RRQ 9 Hehir limit and ERQ rubric aggregation repaired; index and teacher-notes wording repaired; UR mirrors updated; G3 left unticked |

**Unit 2 - Understanding Learner Diversity (2026-10-09):** authored to the Spec 008 v3.0
per-topic layout: `index.mdx` + `topic-01…02.mdx` (nine-part cycles) + `unit-assessment.mdx`
(10/10/5 bank + bounded answers) + `unit-teacher-notes.mdx`. G2 en-draft cleared by deterministic gates on 2026-10-17.

| Unit | Stage | Status | Initials | Notes |
|---|---|---|---|---|
| Unit 2 | G1 unit-spec | ▢ | | spec approved (D-2026-0065); row is the evaluator's to set, not the author's |
| Unit 2 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-305/reviews/unit-02/G2/20261103T112241938Z-gates.json |
| Unit 2 | G3 en-review | ▢ | | |
| Unit 2 | G3 en-review | ▢ | | advisory: revise; repairs applied (2026-10-19) for agent-g3-efmp-305-u2-run5873b2cc: Florian (2014) Further reading corrected to the verified florian2014 record (29(3), 286-294, DOI); Hornby DOI given link text (EN and UR); Hornby (2014) recorded in sources/unit-02.md as further reading only; the two repo-wide gate findings (EFMP-305 Unit 6 depth, EFMP-304 alt text) are outside this unit and no longer reproduce; fresh independent G3 needed |
| Unit 2 | G3 en-review | ▢ | | advisory: pass (cycle 2); report specs/content/efmp-305/reviews/unit-02/G3/agent-g3-efmp-305-u2-runfd523bce.json; cycle 1 citation repair verified landed in topic-02.mdx; check:depth-gate and check:figures clean at exit 0; all 7 criteria pass; independent blind solve 10/10; row stays open pending qualification (ADR-0019) |
| Unit 2 | G4 ur-translation | ▣ | | mirror complete (2026-10-19): all 5 files translated and verified against EN 9e6da648; 4 .ur.svg/.ur.dark.svg figure variants synced; structural parity clean under temporary reviewed flip (reverted); all 5 key_terms conform to terminology.csv; handoff: reviews/unit-02/G4/translation-handoff.md; translation_status stays draft pending fresh independent G5 |
| Unit 2 | G5 ur-review | ▢ | agent:opencode | advisory: escalate; report specs/content/efmp-305/reviews/unit-02/G5/crew-efmp-305-u02-g5-rabe274b8.json; page-level render inspection unavailable (no build/dev server/Playwright), accessibility+rtl unverified; terminology bank departures (Assessment جانچ vs تشخیص, Slow Learner سست طالب علم vs کمزور متعلم, Learning Outcome تعلیمی نتائج vs نتیجہ ہائے تعلم, Labelling unbanked لیبل/لیبلنگ/ٹھپا) need owner ruling; all six deterministic gates pass; no certification |
| Unit 2 | G6 assets | ▢ | | 4 schematic SVGs prompt-only |
| Unit 2 | G7 publish | ▢ | | |

**Unit 3 - Inclusive Teaching Strategies (2026-10-15):** authored to the Spec 008 v3.0 per-topic
layout: `index.mdx` + `topic-01…03.mdx` (nine-part cycles) + `unit-assessment.mdx` (10/10/5 bank
+ bounded answers and band rubrics) + `unit-teacher-notes.mdx`. Reading-minutes total 176, inside
the 150-180 depth band. Governance files written: `coverage/unit-03.md`, `sources/unit-03.md`
(two Crossref-verified open-access bindings, floor met), `concepts/unit-03.md` (18 concepts),
`figures/unit-03.md` (6 figures, all `prompt-only`). Gates passing: depth-gate, concept-graph,
validate:content, bloom-bands, source-floor, no-em-dash, no-answer-keys. `check:figures` reports
the 4 expected prompt-only findings until G6 renders them.

| Unit | Stage | Status | Initials | Notes |
|---|---|---|---|---|
| Unit 3 | G1 unit-spec | ▢ | | spec approved (D-2026-0065); row is the evaluator's to set, not the author's |
| Unit 3 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-305/reviews/unit-03/G2/20261110T010218845Z-gates.json |
| Unit 3 | G3 en-review | ▢ | | |
| Unit 3 | G4 ur-translation | ▢ | | |
| Unit 3 | G5 ur-review | ▢ | | |
| Unit 3 | G6 assets | ▢ | | 6 schematic figures prompt-only (2 flowchart, 1 concept-map, 3 table) |
| Unit 3 | G7 publish | ▢ | | |

**Unit 4 - Creating an Inclusive Classroom Environment (2026-10-15):** authored to the Spec 008
v3.0 per-topic layout: `index.mdx` + `topic-01…02.mdx` (nine-part cycles) + `unit-assessment.mdx`
(10/10/5 bank + bounded answers and band rubrics) + `unit-teacher-notes.mdx`. Reading-minutes total
150, at the ceiling of the 120-150 depth band; the owner may wish to re-baseline the band, since the
two topics ran 12,282 words against an allocation of roughly 11,000. Governance files written:
`coverage/unit-04.md`, `sources/unit-04.md` (four Crossref- and OpenAlex-verified open-access
bindings, floor met without the escalation the reading list anticipated), `concepts/unit-04.md`
(20 concepts), `figures/unit-04.md` (4 figures, all `prompt-only`). `check:figures` reports the 3
expected prompt-only findings for this unit (two per topic file, plus the schematic floor) until G6
renders them.

| Unit | Stage | Status | Initials | Notes |
|---|---|---|---|---|
| Unit 4 | G1 unit-spec | ▢ | | spec approved (D-2026-0065); row is the evaluator's to set, not the author's |
| Unit 4 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-305/reviews/unit-04/G2/20261103T141631984Z-gates.json |
| Unit 4 | G3 en-review | ▢ | | Stale since the figure-geometry repair; needs a fresh G3 run |
| Unit 4 | G4 ur-translation | ▣ | | mirror complete (2026-10-18): all 5 files translated and verified against EN c31cad8f; 4 .ur.svg/.ur.dark.svg figure variants synced; structural parity clean under temporary reviewed flip (reverted); all 3 key_terms conform to terminology.csv; handoff: reviews/unit-04/G4/translation-handoff.md; translation_status stays draft pending fresh independent G5 |
| Unit 4 | G5 ur-review | ▢ | | |
| Unit 4 | G6 assets | ▢ | | 4 schematic figures prompt-only (1 concept-map, 1 diagram, 2 table) |
| Unit 4 | G7 publish | ▢ | | |

**Unit 5 - Policies and Legal Framework in Pakistan (2026-10-15):** authored to the Spec 008 v3.0
per-topic layout: `index.mdx` + `topic-01…03.mdx` (nine-part cycles) + `unit-assessment.mdx`
(10/10/5 bank + bounded answers and band rubrics) + `unit-teacher-notes.mdx`. Reading-minutes total
179, inside the 150-180 depth band; the three topics run 19,000 words, the longest unit in the
course, as the spec's "most content-heavy unit" note anticipated.

**Source position, which is what distinguishes this unit.** All three primary documents were
**retrieved in full from the authoring host on 2026-10-15, read, and committed as verification
excerpts with checksums** at `sources/texts/sindh2018.md`, `sources/texts/ict2020.md` and
`sources/texts/nep2009.md`. Every claim the unit makes about what a legal or policy document
requires is grounded in that retrieved text and quoted from it; nothing rests on a secondary
account. This discharges the hard source constraint on this unit (at least two of the three
retrieved, not merely named) with all three. Three further registry-verified open-access Pakistani
teacher-attitude studies were bound at abstract level (`parveen2022`, `virani2022`, `anis2025`),
alongside `ainscow2020b`, which meets the open-access floor. `unCRPD` and `unesco2020` are bound by
URL only and carry framing claims only. **Amendments, rules, notifications and case law were not
checked** and the sources file and teacher notes both say so.

Governance files written: `coverage/unit-05.md`, `sources/unit-05.md` (nine keys, three with bound
full-text excerpts, floor met), `concepts/unit-05.md` (28 concepts; six statutory terms carry an
explicit instruction to the G4 translator to keep the English in parentheses and never paraphrase a
quoted clause), `figures/unit-05.md` (6 placed figures with English/Urdu and dark SVG variants).
The former prompt-only description is superseded; placement does not certify review or rendering. Statute framing follows `D-2026-0053` item 7: the Sindh Act is taught as the guide's
2018 Act, with the federal ICT Act, 2020 confined to one passage and one figure.

| Unit | Stage | Status | Initials | Notes |
|---|---|---|---|---|
| Unit 5 | G1 unit-spec | ▢ | | spec approved (D-2026-0065); row is the evaluator's to set, not the author's |
| Unit 5 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-305/reviews/unit-05/G2/20261103T112242375Z-gates.json |
| Unit 5 | G3 en-review | ▣ | agent:codex-g3-reviewer | Advisory escalation only, not certification: specs/content/efmp-305/reviews/unit-05/G3/01a14adc-fef3-7883-8e8f-dd0c7ca30b71.json. Assessment ambiguity, incomplete audit, privacy conflict, source overclaims; provenance and narrow/A4 renders unavailable. Stale since the figure-geometry repair; needs a fresh G3 run |
| Unit 5 | G4 ur-translation | ▣ | | mirror complete (2026-10-19): all 6 files translated and verified against EN 3a8a8c0e; 6 .ur.svg/.ur.dark.svg figure variants synced; structural parity clean; all 3 key_terms conform to terminology.csv; handoff: reviews/unit-05/G4/translation-handoff.md; translation_status stays draft pending fresh independent G5 |
| Unit 5 | G5 ur-review | ▢ | | |
| Unit 5 | G6 assets | ▢ | | 6 schematic figures placed with EN/UR and dark variants; current browser/print inspection pending (1 timeline, 1 concept-map, 1 diagram, 3 table) |
| Unit 5 | G7 publish | ▢ | | |

**Unit 6 - Collaboration and Parental Involvement (2026-10-16):** preserved the interrupted
English draft on `agent/TEX-39` / PR #119 and completed a bounded authoring repair under the
board's Codex exception on TEX-84. Six files: opening, three topic cycles, a 10/10/5 assessment
with bounded answers, analytic ERQ criteria and four-band descriptors, and teacher notes.
All five earlier units are named when their ideas are used. Three weeks, following D-2026-0047.

**Reading estimate:** 152 minutes in total at 180 visible-text words per minute, excluding
front matter, imports and figure-brief comments. File estimates are index.mdx: 7, topic-01.mdx: 34, topic-02.mdx: 38, topic-03.mdx: 34, unit-assessment.mdx: 30, unit-teacher-notes.mdx: 9.
The total is inside 140-170. Topic estimates are below the spec's separate per-topic planning
ranges; CurriculumOwner should assess that planning discrepancy without padding the prose.
The approved content spec and G1 rows are unchanged.

**Source and pedagogy limitations:** six DOI records rechecked in Crossref and OpenAlex on
2026-10-16. Source support remains abstract-level for the six journal articles. Fresh UNICEF
retrieval returned HTTP 403; its interrupted-run provenance is preserved and the long copied
extracts replaced with paraphrased verification locators. G3 must reopen source texts before
certification. Cases and outcomes are explicitly fictional composites. Corrected causal language
around the empathy study, removed the incorrect specialist-time percentage and inspection assurance,
added family consent and private-record handling, and kept needed accessible seating available daily.
The IEP remains a shared working plan. The learner-facing assessment ends with an immediate Monday action.

**Assets and gates:** six detailed figure briefs with English alt text remain `prompt-only`.
Figure rendering/localisation is G6 work, not claimed complete. No G2 evidence is emitted while
figures fail. Initial `check:content`: validation, depth, no-em-dash, no-answer-keys, concept graph,
Bloom bands, source floor, Licence checks and docs-sync pass; pipeline and figures fail across the
repository, and generated content status needed refresh. Final checks and build are recorded in
the PHR and Paperclip handoff. No G3/G5 certification or publication is claimed.

| Unit | Stage | Status | Initials | Notes |
|---|---|---|---|---|
| Unit 6 | G1 unit-spec | ▢ | | spec approved (D-2026-0065); row is the evaluator's to set, not the author's |
| Unit 6 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-305/reviews/unit-06/G2/20261103T112242573Z-gates.json |
| Unit 6 | G3 en-review | ▢ | | independent review pending; CurriculumOwner handoff on TEX-78 |
| Unit 6 | G4 ur-translation | ▣ | | complete 6-file UR mirror verified against EN baseline (2026-10-18): 6 .ur.svg/.ur.dark.svg variants wired; structural parity, figure parity, and key_terms clean under temporary reviewed flip (reverted); translation_status stays draft pending fresh independent G5 |
| Unit 6 | G5 ur-review | ▢ | | |
| Unit 6 | G6 assets | ▢ | | 6 schematic figures prompt-only (1 concept-map, 1 flowchart, 1 diagram, 3 table) |
| Unit 6 | G7 publish | ▢ | | |
| Unit 1 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-305/reviews/unit-01/G3/20261102T142352Z-g3-desk-48f5f98c.json |
| Unit 3 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-305/reviews/unit-03/G3/20261102T142352Z-g3-desk-96017bba.json |
| Unit 5 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-305/reviews/unit-05/G3/20261102T142352Z-g3-desk-bb2bba40.json |
| Unit 6 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-305/reviews/unit-06/G3/20261102T142352Z-g3-desk-a9fe5033.json |
| Unit 2 | G3 en-review | ✅ | CMY | review:specs/content/efmp-305/reviews/unit-02/G3/20261102T140729Z-g3-desk-5da9d105.json |
| Unit 4 | G3 en-review | ✅ | CMY | review:specs/content/efmp-305/reviews/unit-04/G3/20261102T140729Z-g3-desk-75d4e208.json |
| Unit 4 | G5 ur-review | ▢ | agent:codex-g5-reviewer | advisory: escalate; report specs/content/efmp-305/reviews/unit-04/G5/01a19d42-cab2-79c3-9b37-ac2bf916690b.json; decoration exclusion reversed, place-value mistranslation and corrupt RRQ 10 guidance; fresh signed G3 dependency, translator provenance and normal/narrow/A4 renders unavailable; no certification |
| Unit 1 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-305/reviews/unit-01/G3/20261102T211054Z-g3-desk-75c78135.json |
| Unit 3 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-305/reviews/unit-03/G3/20261102T211054Z-g3-desk-68a046eb.json |
| Unit 5 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-305/reviews/unit-05/G3/20261102T211054Z-g3-desk-161c2504.json |
| Unit 6 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-305/reviews/unit-06/G3/20261102T211054Z-g3-desk-5e601a1c.json |
| Unit 1 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-305/reviews/unit-01/G3/20261102T212207Z-g3-desk-65386ad3.json |
| Unit 3 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-305/reviews/unit-03/G3/20261102T212207Z-g3-desk-d26592ad.json |
| Unit 5 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-305/reviews/unit-05/G3/20261102T212207Z-g3-desk-6054cf1d.json |
| Unit 6 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-305/reviews/unit-06/G3/20261102T212207Z-g3-desk-5907f448.json |
| Unit 3 | G3 en-review | ▢ | | advisory: revise; repairs applied; report reviews/unit-03/G3/20261102T212207Z-g3-desk-d26592ad.json (crew efmp-305-u03-repair_en, 2026-11-03). Blocking repository-gate finding (EFMP-305 Unit 6 depth, EFMP-304 figure alt text) is already resolved on main: all 13 content gates pass, no Unit 3 edit needed. Sources (uncertain): full texts of subandiyah2025, serman2026 and cast2024 (v3.0) retrieved and bound under sources/texts/ and found to support the prose as worded; vernon2020 and florian2014 stay declared unverifiable (subscription, D-2026-0001). Terminology (advisory): concepts/unit-03.md note corrected, since the nine EFMP-305 pairs were owner-banked in terminology.csv on 2026-10-16 (TEX-80) and the UR mirror already uses them; four unit-level labels stay unbanked. No prose or UR change. G2 evidence refreshed for Units 3 and 4 (cast2024 excerpt binds both). Needs a fresh independent G3 review; row stays open (ADR-0019) |

| Unit 6 | G3 en-review | ▢ | agent:codex | advisory: revise; repairs applied; report specs/content/efmp-305/reviews/unit-06/G3/20261102T212207Z-g3-desk-5907f448.json; current EN estimates total 149 minutes (6 + 33 + 38 + 34 + 29 + 9), within approved 140-170 band, so reported 193-minute overrun no longer reproduces; no prose trim or approved-band change; UNICEF full PDF retrieved and relevant passages checked 2026-11-03 with matching SHA-256, provenance and corrected page locators recorded in reviews/unit-06/G3/20261103-repair-notes.md; research caveats preserved; independent G3 pending, no certification |

| Unit | Stage | Status | Initials | Suggestion |
|---|---|---|---|---|
| Unit 5 | G3 en-review | ▣ | agent:codex | advisory: revise; repairs applied for 20261102T212207Z-g3-desk-6054cf1d.json (F2–F8); see reviews/unit-05/repair-en-20261103/repair-notes.md. F1 provenance and browser/print evidence remain owner/host work; fresh independent review and MCQ re-solve required. G3 remains unticked. |

| Unit 5 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-305/reviews/unit-05/G2/20261103T180403253Z-gates.json |
| Unit 3 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-305/reviews/unit-03/G3/20261108T203238Z-g3-desk-d15c80fc.json |
| Unit 5 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-305/reviews/unit-05/G3/20261108T203238Z-g3-desk-79043796.json |
| Unit 6 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-305/reviews/unit-06/G3/20261108T203238Z-g3-desk-2a3b76c3.json |
| Unit 3 | G3 en-review | ▢ | | advisory: revise; repairs applied; report specs/content/efmp-305/reviews/unit-03/G3/20261108T203238Z-g3-desk-d15c80fc.json; serman2026 author initials (Serman, S., & Ningrum, E. S. C.) and peer tutoring mechanism nuance corrected in topic-02.mdx (EN+UR) and sources/unit-03.md; sources/unit-03.md retrieval notes clarified between retrieved excerpts and metadata-only subscription works; concepts/unit-03.md terminology note explicitly reaffirms G4 translator adherence to TEX-80 banked labels and unit phrases; repo gate findings (EFMP-305 U6, EFMP-304) verified outside U3 scope; G3 left unticked |
| Unit 5 | G3 en-review | ▢ | agent:opencode | advisory: revise; repairs applied; report specs/content/efmp-305/reviews/unit-05/G3/20261108T203238Z-g3-desk-79043796.json; F2–F8 repairs verified present in EN and UR on main (landed in 12b3c13a5, crew efmp-305-u05-repair_en, 2026-11-03); F1 provenance/rendering and a fresh independent G3 with MCQ re-solve remain owner/host work; G3 remains unticked |
| Unit 6 | G3 en-review | ▢ | agent:opencode | advisory: revise; repairs applied; report specs/content/efmp-305/reviews/unit-06/G3/20261108T203238Z-g3-desk-2a3b76c3.json; depth finding is stale (report input hashes predate commit 24d5f43d7; current EN estimates total 149 minutes, within the approved 140-170 band, and check:depth-gate exits 0); research-context advisory needs no edit (caveats preserved); UNICEF full-text retrieval reconfirmed 2026-11-10 with matching SHA-256 and corrected page locators, recorded in reviews/unit-06/G3/20261110-repair-notes.md (source record left unchanged to preserve Unit 1 and Unit 6 G2 evidence bindings); G3 left unticked, no certification |
