# EFMP-304 - Task Tracker

Legend (FR-005's 3-value status enum): `▢` not-started · `▣` in-progress · `✅` done (requires
reviewer initials). One row per unit per stage (`G1`–`G7`; `G0` course-intake is tracked via
`content-spec.md`'s own `status` field, not a row here - research.md R2).

**Unit 1 - Understanding Critical Thinking (2026-09-21):** the English content was authored to
the Spec 008 v3.0 per-topic layout: `index.mdx` + `topic-01…05.mdx` (nine-part cycles) +
`unit-assessment.mdx` (10/10/5 bank + bounded answers). G1 unit-spec affirmed at intake.
G2 en-draft cleared by deterministic gates.

| Unit | Stage | Status | Initials | Notes |
|---|---|---|---|---|
| Unit 1 | G1 unit-spec | ✅ | auto:gates | content-spec status: approved |
| Unit 1 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-304/reviews/unit-01/G2/20261103T112240704Z-gates.json |
| Unit 1 | G3 en-review | ▢ | | |
| Unit 1 | G3 en-review | ▢ | | advisory: revise; repairs applied for `specs/content/efmp-304/reviews/unit-01/G3/agent-g3-efmp-304-u1-run5e4cc29c.json`: SVG syntax and wordmark geometry, RRQ 9 rebalanced to Topic 1.1 with Urdu model answer and concept mapping, placed manifest preamble, and descriptive article links in both locales. Fresh independent G3 and dependent G5 remain pending; no sign-off claimed. Stale since the figure-geometry repair; needs a fresh G3 run |
| Unit 1 | G3 en-review | ▢ | | Advisory **escalate**: `specs/content/efmp-304/reviews/unit-01/G3/agent-g3-efmp-304-u1-rune5024f5f.json`; second cycle re-review verified author repairs resolved all 5 previous findings (SVG syntax, wordmark viewBox overflow, RRQ topic balance, manifest preamble, descriptive links); all deterministic gates pass; visual render uninspected (brief prohibits build/server/browser); no certification |
| Unit 1 | G3 en-review | ▢ | | advisory: revise; repairs applied; report reviews/unit-01/G3/20261102T212207Z-g3-desk-9cac2bab.json (crew efmp-304-u01-repair_en-r1, 2026-11-03). The desk report restates the cycle-1 findings and all five are already resolved in the current bytes, so no content edit was needed: fig-U1-3 SVG XML syntax valid (all 40 Unit 1 SVGs parse); wordmark viewBox overflow cleared across fig-U1-1/4/5/7/10 (measure-figure-text exits 0); RRQ 9 rebalanced to Topic 1.1 with a 2-mark model answer and CON:EFMP-304-1-5 mapping; figures/unit-01.md preamble states placed; DOI links in topics 2 and 3 carry descriptive article titles in EN and UR. Visual browser/print inspection (360px viewport, table scrollability, A4 print) remains unexecuted because the brief prohibits build/server/Playwright; full G3 certification is not claimed. Fresh independent G3 and dependent G5 remain pending; row stays open (ADR-0019) |
| Unit 1 | G4 ur-translation | ▣ | | Seven-page Urdu mirror authored against English baseline on 2026-10-19 (crew efmp-304-u01-translate-r1): translated metadata, 14 bank-bound key terms, 10/10/5 assessment parity with Urdu MCQ option labels in order (الف/ب/ج/د), 10 mirrored Urdu SVGs with derived dark variants; check:content clean and parity/figures/key_terms verified clean under temporary reviewed flip (reverted). Handoff: `specs/content/efmp-304/reviews/unit-01/G4/translation-handoff.md`. translation_status stays draft pending fresh independent G5; no certification claimed |
| Unit 1 | G5 ur-review | ▢ | | |
| Unit 1 | G6 assets | ▢ | | |
| Unit 1 | G7 publish | ▢ | | |

**Unit 2 - Recognizing and Analyzing Arguments (2026-10-05):** authored to the Spec 008 v3.0
per-topic layout: `index.mdx` + `topic-01…04.mdx` (nine-part cycles) + `unit-assessment.mdx`
(10/10/5 bank + bounded answers). Eight hand-authored schematic SVGs placed (`fig-U2-1…8`),
two per topic, with a `concept-map` and a `flowchart` as the Art. III.10 schematics. The banner
illustration `fig-U2-9` is left `prompt-only` in `figures/unit-02.banner.md` for raster handoff
(ADR-0029). Three verifiable open-access sources bound, against a declared floor of two
(`D-2026-0013`). G1 unit-spec affirmed at intake; G2 cleared by deterministic gates.

| Unit | Stage | Status | Initials | Notes |
|---|---|---|---|---|
| Unit 2 | G1 unit-spec | ✅ | auto:gates | content-spec status: approved |
| Unit 2 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-304/reviews/unit-02/G2/20261102T072755402Z-gates.json |
| Unit 2 | G3 en-review | ▣ | | Advisory independent Codex G3 **escalate** (thread 01a14a38-39b5-7ca3-b776-327860ede213): conceptual/source/assessment defects and SVG clipping; author provenance and page/print renders missing. Report: `specs/content/efmp-304/reviews/unit-02/G3/01a14a38-39b5-7ca3-b776-327860ede213.json`. Separate author repairs, owner/host supplies missing evidence, then fresh review. G3 stays open, unsigned (ADR-0019). Stale since the figure-geometry repair; needs a fresh G3 run |
| Unit 2 | G4 ur-translation | ▣ | | Codex completed the six-page draft Urdu mirror against English `88efbd7d` on 2026-10-18, including 10/10/5 assessment parity, bank-bound key terms, eight Urdu SVGs and derived dark variants. Handoff: `specs/content/efmp-304/translations/unit-02/handoff.md`. Draft remains pending English G3 repairs, fresh independent G5 and full-page RTL/print inspection; no certification claimed |
| Unit 2 | G5 ur-review | ▢ | | |
| Unit 2 | G6 assets | ▣ | | 8 schematics placed; banner `fig-U2-9` prompt-only, raster handoff pending |
| Unit 2 | G7 publish | ▢ | | |

**Unit 3 - Basic Logic Concepts and Analyzing the Argument (2026-10-05):** authored to the Spec 008
v3.0 per-topic layout: `index.mdx` + `topic-01…04.mdx` (nine-part cycles) + `unit-assessment.mdx`
(10/10/5 bank + bounded answers). Eight schematic SVGs placed (`fig-U3-1…8`), two per topic, with a
`concept-map` and two `flowchart`s as the Art. III.10 schematics. The banner illustration `fig-U3-9`
is left `prompt-only` in `figures/unit-03.banner.md` for raster handoff (ADR-0029). Two verifiable
open-access sources bound against a declared floor of two (`D-2026-0013`). G1 unit-spec affirmed at
intake; G2 cleared by deterministic gates.

| Unit | Stage | Status | Initials | Notes |
|---|---|---|---|---|
| Unit 3 | G1 unit-spec | ✅ | auto:gates | content-spec status: approved |
| Unit 3 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-304/reviews/unit-03/G2/20261102T072755606Z-gates.json |
| Unit 3 | G3 en-review | ▢ | | awaiting CurriculumOwner |
| Unit 3 | G3 en-review | ▢ | | Advisory **escalate**: `specs/content/efmp-304/reviews/unit-03/G3/crew-efmp-304-u03-g3-r65d2428e.json`; limitations and follow-up: `specs/content/efmp-304/reviews/unit-03/G3/continuation-summary.md`. Render inspection, provenance and source support remain unresolved. CurriculumOwner to arrange follow-up; no G3 sign-off. |
| Unit 3 | G4 ur-translation | ▣ | | Crew job `efmp-304-u03-translate` retranslated the six-page Urdu mirror against English `88efbd7d` on 2026-10-18: academic-plain prose replacing the earlier draft (which inverted several validity claims), translated metadata and Bloom tags, bank-bound `key_terms` (Validity = صداقت), Urdu MCQ option labels in original order, and eight mirrored `.ur.svg` figures with derived dark variants. Handoff and proposed terms: `specs/content/efmp-304/reviews/unit-03/G4-20261018/handoff.md`. check:content 13/13; parity, figures and key_terms clean under a temporary `reviewed` flip (reverted). `translation_status` stays draft; fresh independent G5 and full-page RTL/print inspection pending. No certification claimed |
| Unit 3 | G4 ur-translation | ▣ | | Continuation `efmp-304-u03-translate-r1` (2026-10-18): re-verified the six-page Urdu mirror against English `a5a089f0` (origin/main at task start). All 13 content gates pass; parity, figures and key_terms clean under a temporary `reviewed` flip (reverted). `translation_status` stays draft pending independent G5; no certification claimed |
| Unit 3 | G5 ur-review | ▢ | | |
| Unit 3 | G6 assets | ✅ | auto:gates | 8 schematics placed; banner `fig-U3-9` prompt-only, raster handoff pending |
| Unit 3 | G7 publish | ▢ | | |

**Unit 4 - Becoming a Reflective Teacher (2026-10-09):** authored to the Spec 008 v3.0 per-topic
layout: `index.mdx` + `topic-01…04.mdx` (nine-part cycles) + `unit-assessment.mdx` (10/10/5 bank +
bounded answers). Eight schematic SVGs placed (`fig-U4-1…8`), two per topic, with a
`concept-map` and a `flowchart` as the Art. III.10 schematics. One verifiable open-access source bound
against a declared floor of one (`D-2026-0013`). G1 unit-spec affirmed at intake; G2 cleared by
deterministic gates.

| Unit | Stage | Status | Initials | Notes |
|---|---|---|---|---|
| Unit 4 | G1 unit-spec | ✅ | auto:gates | content-spec status: approved |
| Unit 4 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-304/reviews/unit-04/G2/20261103T112241419Z-gates.json |
| Unit 4 | G3 en-review | ▣ | | agent G3 (Reviewer, agy Gemini, run 501d802f) **pass**, zero findings: `specs/content/efmp-304/reviews/unit-04/G3/agent-g3-efmp-304-u4-run501d802f.json` (PR #126, TEX-45). Row stays open: agent evidence cannot close it (ADR-0019). Stale since 2026-10-27: fig-U4-1 was re-wrapped to remove text overlap (owner print report), so a fresh G3 run is needed; Stale since the figure-geometry repair; needs a fresh G3 run |
| Unit 4 | G4 ur-translation | ▣ | | Six-page Urdu mirror verified complete against English baseline on 2026-10-18 (crew efmp-304-u04-translate-r1): translated metadata, 20 bank-bound key terms, Urdu MCQ option labels in order (الف/ب/ج/د), 8 mirrored Urdu SVGs with derived dark variants; check:content 13/13 pass and parity/figures/key_terms clean under temporary reviewed flip (reverted). Handoff: `specs/content/efmp-304/reviews/unit-04/G4/translation-handoff.md`. translation_status stays draft pending independent G5; no certification claimed |
| Unit 4 | G5 ur-review | ▣ | | agent G5 (Reviewer, agy Gemini, run 36f939d6) **pass**, 3 advisories: `specs/content/efmp-304/reviews/unit-04/G5/agent-g5-efmp-304-u4-run36f939d6.json` (PR #132, TEX-46). Row stays open (ADR-0019) |
| Unit 4 | G6 assets | ✅ | auto:gates | 8 schematics placed; dark variants derived |
| Unit 4 | G7 publish | ▢ | | |

**Unit 5 - Engaging in Reflective Practice (2026-10-09):** authored to the Spec 008 v3.0 per-topic
layout: `index.mdx` + `topic-01…04.mdx` (nine-part cycles) + `unit-assessment.mdx` (10/10/5 bank +
bounded answers). Eight schematic SVGs placed (`fig-U5-1…8`), two per topic, with a
`flowchart`, a `timeline` and a `concept-map` as the Art. III.10 schematics. One verifiable
open-access source bound against a declared floor of one. G1 unit-spec affirmed at intake; G2 cleared.

| Unit | Stage | Status | Initials | Notes |
|---|---|---|---|---|
| Unit 5 | G1 unit-spec | ✅ | auto:gates | content-spec status: approved |
| Unit 5 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-304/reviews/unit-05/G2/20261103T112241546Z-gates.json |
| Unit 5 | G3 en-review | ▣ | | agent G3 (Reviewer, agy Gemini, run 501d802f) **pass**, zero findings: `specs/content/efmp-304/reviews/unit-05/G3/agent-g3-efmp-304-u5-run501d802f.json` (PR #126, TEX-45). Row stays open: agent evidence cannot close it (ADR-0019). Stale since the figure-geometry repair; needs a fresh G3 run |
| Unit 5 | G4 ur-translation | ✅ | auto:gates | full UR mirror (6 files; BilingualAuthor, TEX-38, PR #118) completed 2026-10-17 by the crew translate job: 8 `.ur.svg` label variants authored, measured and wired (`fig-U5-1…8`, closes G5 advisory F3), `blooms_summary` translated, `Topic`/`Unit` labels set to موضوع/یونٹ; check:content 13/13 pass and parity/figures/key_terms clean under a temporary `reviewed` flip (reverted). `translation_status` stays draft pending G5 |
| Unit 5 | G5 ur-review | ▣ | | agent G5 (Reviewer, agy Gemini, run 36f939d6) **pass**, 3 advisories: `specs/content/efmp-304/reviews/unit-05/G5/agent-g5-efmp-304-u5-run36f939d6.json` (PR #132, TEX-46). Row stays open (ADR-0019). The Urdu mirror changed on 2026-10-17 (G4 completion: `.ur.svg` figures, translated `blooms_summary`, موضوع/یونٹ labels), so this run's inputs are stale and a fresh G5 is needed |
| Unit 5 | G6 assets | ✅ | auto:gates | 8 schematics placed; dark variants derived |
| Unit 5 | G7 publish | ▢ | | |

**Unit 6 - Creating and Maintaining Reflective Journals (2026-10-09):** authored to the Spec 008 v3.0
per-topic layout: `index.mdx` + `topic-01…04.mdx` (nine-part cycles) + `unit-assessment.mdx`
(10/10/5 bank + bounded answers). Eight schematic SVGs placed (`fig-U6-1…8`), two per topic, with a
`concept-map` as the Art. III.10 schematic. One verifiable open-access source bound against a declared
floor of one. This unit carries the course's assessed reflection file (10 marks). G1 unit-spec affirmed
at intake; G2 cleared.

**D-2026-0067 item 3 repair (2026-10-12, TEX-48):** two reviewed English defects were fixed -
`topic-03.mdx`'s third journal entry read "did not understood", and `unit-assessment.mdx` RRQ 5 asked a
two-sentence Understand question but carried a four-mark prompt-listing model answer. The Urdu model
answer 5 carried the same mismatch and was mirrored; the Urdu `topic-03.mdx` entry was already correct.
Because those are bound review inputs, G2 was regenerated
(`20261012T033427776Z-gates.json` supersedes `20261011T213320443Z-gates.json`) and fresh independent
G3 and G5 reviews were commissioned. Both came back **pass** on 2026-10-12 (Reviewer, agy Gemini 3.1
Pro, run 620f3b74, TEX-50): G3 with zero findings, G5 with three advisories of which F1 and F2 are
recorded resolved and F3 (no Urdu `.ur.svg` figure variants anywhere in EFMP-304) is tracked as TEX-49.

| Unit | Stage | Status | Initials | Notes |
|---|---|---|---|---|
| Unit 6 | G1 unit-spec | ✅ | auto:gates | content-spec status: approved |
| Unit 6 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-304/reviews/unit-06/G2/20261103T112241677Z-gates.json |
| Unit 6 | G3 en-review | ▣ | | Fresh agent G3 after the D-2026-0067 item 3 repair (Reviewer, agy Gemini 3.1 Pro, run 620f3b74) **pass**, zero findings: `specs/content/efmp-304/reviews/unit-06/G3/agent-g3-efmp-304-u6-run620f3b74.json` (PR #135, TEX-50), bound to the repaired bytes at `276d37f8`. Supersedes run 501d802f (PR #126, TEX-45), which was bound to the pre-repair inputs. Row stays open: agent evidence cannot close it (ADR-0019) Stale since the figure-geometry repair; needs a fresh G3 run |
| Unit 6 | G4 ur-translation | ▣ | | Urdu mirror complete (6 files, 12,275 words) through `276d37f8` (TEX-48 repair); key_terms bound to banked terms (D-2026-0067); 8 Urdu `.ur.svg` figure variants authored and wired (`fig-U6-1…8`, addresses G5 advisory F3), dark variants derived; six Bloom summaries and remaining Topic/Unit labels translated in the continuation pass. Handoff: `specs/content/efmp-304/translations/unit-06/handoff.md`; `translation_status` stays draft pending fresh G5 review |
| Unit 6 | G5 ur-review | ▣ | | Fresh agent G5 after the D-2026-0067 item 3 repair (Reviewer, agy Gemini 3.1 Pro, run 620f3b74) **pass**, 3 advisories: `specs/content/efmp-304/reviews/unit-06/G5/agent-g5-efmp-304-u6-run620f3b74.json` (PR #135, TEX-50). F1 (the English phrasing defects, repaired in both locales) and F2 (reflective-practice terminology banked) are recorded **resolved**; F3 stays open and is tracked as TEX-49, the course-wide Urdu figure-variant gap (no `.ur.svg` exists for any EFMP-304 unit, 1 to 6). Supersedes run 36f939d6 (PR #132, TEX-46). Row stays open (ADR-0019) |
| Unit 6 | G6 assets | ✅ | auto:gates | 8 schematics placed; dark variants derived |
| Unit 6 | G7 publish | ▢ | | |
| Unit 1 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-304/reviews/unit-01/G3/20261102T142352Z-g3-desk-480084d1.json |
| Unit 2 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-304/reviews/unit-02/G3/20261102T142352Z-g3-desk-e26bcfbf.json |
| Unit 3 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-304/reviews/unit-03/G3/20261102T142352Z-g3-desk-08af083d.json |
| Unit 4 | G3 en-review | ✅ | CMY | review:specs/content/efmp-304/reviews/unit-04/G3/20261102T140729Z-g3-desk-797b9070.json |
| Unit 5 | G3 en-review | ✅ | CMY | review:specs/content/efmp-304/reviews/unit-05/G3/20261102T140729Z-g3-desk-5e8a8ded.json |
| Unit 6 | G3 en-review | ✅ | CMY | review:specs/content/efmp-304/reviews/unit-06/G3/20261102T140729Z-g3-desk-9ef61257.json |
| Unit 1 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-304/reviews/unit-01/G3/20261102T211054Z-g3-desk-a0711672.json |
| Unit 2 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-304/reviews/unit-02/G3/20261102T211054Z-g3-desk-3c60113a.json |
| Unit 3 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-304/reviews/unit-03/G3/20261102T211054Z-g3-desk-98445761.json |
| Unit 1 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-304/reviews/unit-01/G3/20261102T212207Z-g3-desk-9cac2bab.json |
| Unit 2 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-304/reviews/unit-02/G3/20261102T212207Z-g3-desk-0bfd5e8f.json |
| Unit 3 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-304/reviews/unit-03/G3/20261102T212207Z-g3-desk-fc9b67f2.json |
| Unit 2 | G3 en-review | ⏳ | codex | advisory: revise; repairs applied to `20261102T212207Z-g3-desk-0bfd5e8f.json`; support patterns, audience/context, source limits, assessment alignment and figure labels repaired in EN/UR. Fresh independent G3 and G5 plus permitted rendering/provenance handoff remain required; no certification. |
| Unit 2 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-304/reviews/unit-02/G2/20261105T162929826Z-gates.json |
| Unit 3 | G3 en-review | ⏳ | agy | advisory: revise; repairs applied for specs/content/efmp-304/reviews/unit-03/G3/20261102T212207Z-g3-desk-fc9b67f2.json; removed specific claims attributed to unverifiable monograph bassham2010 in topic prose and disclosed bibliographic-only limit at point of use in Further reading in EN and UR; recorded 2026-11-03 publisher retrieval attempt in sources. Visual browser/print inspection remains unexecuted under crew constraints; full G3 certification is not claimed and stage stays open (ADR-0019) |
| Unit 3 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-304/reviews/unit-03/G2/20261105T173239705Z-gates.json |
| Unit 2 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-304/reviews/unit-02/G3/20261108T203238Z-g3-desk-5daf97ba.json |
| Unit 3 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-304/reviews/unit-03/G3/20261108T203238Z-g3-desk-ef4a8074.json |
| Unit 3 | G3 en-review | ▢ | opencode | advisory: revise; repairs applied for specs/content/efmp-304/reviews/unit-03/G3/20261108T203238Z-g3-desk-ef4a8074.json; the report's bassham2010 attribution finding is already resolved in the current bytes (repair commit 8e7f76c4a withdrew the attribution in EN and UR and disclosed the bibliographic-only limit at point of use); the render inspection findings cannot be resolved by content edits and require a separate permitted render inspection on a live build; no further content edit was needed; stage stays open (ADR-0019) |
