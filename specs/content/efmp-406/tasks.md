# EFMP-406 Contemporary Literacies - Task tracker

## Status: content spec approved (G0/G1, D-2026-0075..0080); authoring in progress

## Units

| Unit | Title | EN draft | G3 review | UR translation | G5 review | Figures | Notes |
|---|---|---|---|---|---|---|---|
| 1 | Concept and Evolution of Literacy | ✓ | ☐ | ☐ | ☐ | placed (EN) | English authored 2026-11-02 by the crew author job (claude); G2 gate evidence recorded below; G3 and Urdu remain open |
| 2 | Contemporary Forms of Literacy | ✓ | ☐ | ☐ | ☐ | placed (EN) | English authored 2026-11-02 by the crew author job (claude); G2 gate evidence recorded below; G3 and Urdu remain open |
| 3 | Literacy, Language, and Society | ✓ | ☐ | ☐ | ☐ | placed (EN) | English draft authored from approved content-spec (D-2026-0075) |
| 4 | Literacy in the Digital Era | ✓ | ☐ | ☐ | ☐ | placed (EN) | English authored 2026-11-02 by the crew author job (codex); G2 gate evidence recorded below; G3 and Urdu remain open |
| 5 | Pedagogical Approaches to Contemporary Literacy | ✓ | ☐ | ☐ | ☐ | placed (EN) | English authored 2026-11-02 by the crew author job (claude); G2 gate evidence recorded below; G3 and Urdu remain open |
| 6 | Issues, Challenges, and Future Directions | ✓ | ☐ | ☐ | ☐ | placed (EN) | English authored by codex crew job 2026-11-02; G2 gate evidence recorded below; G3 and Urdu remain open. Browser geometry check deferred under crew prohibition on Playwright. |

**Key:** ▣ = in progress, ☐ = not started, ✓ = done, ✗ = escalated

## Stage rows

`check:pipeline-gate` reads these (`| Unit | Stage | Status | Initials | Notes |`); the last row for a unit and stage is authoritative.

| Unit | Stage | Status | Initials | Notes |
|---|---|---|---|---|
| Unit 1 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-406/reviews/unit-01/G2/20261113T073344601Z-gates.json |
| Unit 1 | G3 en-review | ▢ | | advisory: pass (ADR-0019); report at specs/content/efmp-406/reviews/unit-01/G3/5be15169-67ce-493e-9ccd-e4c8e6b64a2d.json; all 7 criteria pass; independent solve 10/10 MCQs, 10/10 RRQs, 5/5 ERQs; all 8 SVG variants pass geometry; G3 remains open and unsigned |
| Unit 1 | G4 ur-translation | ▢ | | separate job |
| Unit 1 | G5 ur-review | ▢ | | |
| Unit 2 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-406/reviews/unit-02/G2/20261103T180513037Z-gates.json |
| Unit 2 | G3 en-review | ▢ | | awaiting an independent reviewer; no review performed by author |
| Unit 2 | G4 ur-translation | ▢ | | separate job; English-only draft with untranslated notices |
| Unit 2 | G5 ur-review | ▢ | | |
| Unit 2 | G6 assets | ▣ | | four original English schematics placed with dark variants; `measure-figure-text` geometry check runs in CI |
| Unit 2 | G7 publish | ▢ | | no publication requested by this authoring job |
| Unit 3 | G1 unit-spec | ✅ | auto:gates | content-spec status: approved |
| Unit 3 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-406/reviews/unit-03/G2/20261103T112248471Z-gates.json |
| Unit 3 | G3 en-review | ▢ | | awaiting independent reviewer |
| Unit 3 | G4 ur-translation | ▢ | | Draft mirror delivered: four MDX files and four Urdu light/dark SVG pairs; terminology and parity checks recorded in translations/unit-03/handoff.md. Stage remains open per translate-unit Step 7; independent G5 and authorised browser/print inspection pending. |
| Unit 3 | G5 ur-review | ▢ | | |
| Unit 3 | G6 assets | ✅ | auto:gates | 4 schematics placed with dark variants |
| Unit 3 | G7 publish | ▢ | | |
| Unit 4 | G2 en-draft | ▣ | | Five English files drafted; four English schematics placed; structural checks recorded in authoring/unit-04.md; unpublished with coming_soon: true; no accepted G2 evidence issued |
| Unit 4 | G3 en-review | ▢ | | Independent review required; no author certification |
| Unit 4 | G4 ur-translation | ▢ | | Separate job: five-file mirror, four translated RTL SVGs and terminology checks |
| Unit 4 | G5 ur-review | ▢ | | Requires independent Urdu review and appropriate accepted English dependency |
| Unit 4 | G6 assets | ▣ | | Four EN light/dark schematic pairs placed; Urdu assets deferred with the Urdu job |
| Unit 4 | G7 publish | ▢ | | No publication authorised or performed by this job |
| Unit 3 | G3 en-review | ▢ | | advisory: escalate by agent:codex-g3-reviewer; report at specs/content/efmp-406/reviews/unit-03/G3/01a19c22-e969-7f80-81b7-f2e304f416df.json; source support, assessment demand/rubrics, readability and civic-example repairs required; actual author run identity and browser/print evidence unavailable; all 13 content gates pass; G3 remains open and unsigned |
| Unit 5 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-406/reviews/unit-05/G2/20261103T182100457Z-gates.json |
| Unit 5 | G3 en-review | ▢ | | advisory: pass (ADR-0019); report at specs/content/efmp-406/reviews/unit-05/G3/4df544c3-c825-473c-8c69-940a86171cf5.json; all 7 criteria pass; independent solve 10/10 MCQs, 10/10 RRQs, 5/5 ERQs; all 8 SVG variants pass geometry; G3 remains open and unsigned |
| Unit 5 | G4 ur-translation | ▢ | | separate job |
| Unit 5 | G5 ur-review | ▢ | | |
| Unit 6 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-406/reviews/unit-06/G2/20261103T112248781Z-gates.json |
| Unit 6 | G3 en-review | ▢ | | advisory: pass (ADR-0019); report at specs/content/efmp-406/reviews/unit-06/G3/f39ce2ec-8915-4b91-be9c-d3b7ce713df8.json; all 7 criteria pass; independent solve 10/10 MCQs, 10/10 RRQs, 5/5 ERQs; all 8 SVG variants pass geometry; G3 remains open and unsigned |
| Unit 6 | G4 ur-translation | ▢ | | Draft mirror delivered: five MDX files and four Urdu light/dark SVG pairs; handoff at translations/unit-06/handoff.md. Stage remains open per translate-unit Step 7; independent G5 and permitted browser/print checks pending. |
| Unit 6 | G5 ur-review | ▢ | | independent Urdu review pending |

## Unit 6 authoring handoff

- Reading time is 63 minutes at 200 words per minute: opening 2, Topic 6.1 18, Topic 6.2 19, assessment 18 and teacher notes 6. Front matter, imports, figure carriers and link targets are excluded from the visible-word estimate. This fits the approved 55–75 minute budget without changing the spec.
- Four EN schematics and generated dark twins are placed. Non-browser Sharp renders were inspected in both themes. `measure-figure-text.mjs` uses Playwright/Chromium and was not run because `.crew/brief.md` prohibits Playwright. The next authorised browser session owns that geometry check; no build, server or browser ran here.
- Source notes distinguish abstract-only, official-overview and indexed-PDF support. The mapped Booth and Ainscow print book was not available and carries no claim. No current district rates, tool-effectiveness findings or policy-achievement claims were invented.
- Literacy rate, access and out-of-school children are defined inline. Global glossary additions are outside this Unit 6-only job. Equity, AI and SDGs reuse existing glossary entries. The Urdu job owns the corresponding vocabulary work and concept-label review.

| Unit 2 | G3 en-review | ▢ | | advisory: escalate by agent:codex-g3-reviewer; report at specs/content/efmp-406/reviews/unit-02/G3/crew-efmp-406-u02-review-en.json; RRQ 2/3/9 prompt-scheme alignment repairs requested; source verification, actual author run provenance and browser/print evidence unavailable; G3 remains open and unsigned |
| Unit 1 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-406/reviews/unit-01/G3/20261102T210200Z-g3-desk-ca7ba17e.json |
| Unit 5 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-406/reviews/unit-05/G3/20261102T210517Z-g3-desk-41391a8a.json |
| Unit 6 | G3 en-review | ✅ | CMY | review:specs/content/efmp-406/reviews/unit-06/G3/20261102T210705Z-g3-desk-d3bd5a8a.json |
| Unit 2 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-406/reviews/unit-02/G3/20261102T211054Z-g3-desk-55b3ba13.json |
| Unit 3 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-406/reviews/unit-03/G3/20261102T211054Z-g3-desk-40674f87.json |
| Unit 1 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-406/reviews/unit-01/G3/20261102T212036Z-g3-desk-45e9b45b.json |
| Unit 5 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-406/reviews/unit-05/G3/20261102T212135Z-g3-desk-466a27a9.json |
| Unit 2 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-406/reviews/unit-02/G3/20261102T212207Z-g3-desk-e7c99b68.json |
| Unit 3 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-406/reviews/unit-03/G3/20261102T212207Z-g3-desk-41db593c.json |
| Unit 1 | G3 en-review | ▢ | | advisory: revise; repairs applied; report specs/content/efmp-406/reviews/unit-01/G3/20261102T212036Z-g3-desk-45e9b45b.json; teaching cases explicitly labeled as illustrative instructional examples in index, topics, teacher notes, and sources; Shakir et al. (2012) citations qualified as strictly limited to published abstract scope; headless review tooling constraints and pending catalog entry noted per ADR-0019; G3 remains open and unsigned |
| Unit 2 | G3 en-review | ▢ | | advisory: revise; repairs applied; report specs/content/efmp-406/reviews/unit-02/G3/20261102T212207Z-g3-desk-e7c99b68.json; RRQ 2, 3 and 9 prompts now request the fairer wording, the example and the barrier explanation their schemes reward (RRQ 2/3 scheme wording aligned, RRQ 9 model answer adds the explanation); MCQ 4 and 8 stems reframed as routine application of a taught rule within the approved Apply band; Topic 2.2 check item 2 trimmed to recall to match its Remember tag; source passage bundle, author run provenance and narrow-screen/A4/SVG geometry evidence remain unavailable to this job and need the coordinator and an authorised browser host; G3 remains open and unsigned |
| Unit 3 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-406/reviews/unit-03/G2/20261110T013623738Z-gates.json |
| Unit 3 | G3 en-review | ▢ | | advisory: revise; repairs applied; report specs/content/efmp-406/reviews/unit-03/G3/20261102T212207Z-g3-desk-41db593c.json; Papen and Ashraf excerpts replaced with verbatim passages from fresh retrievals (non-verbatim blocks removed), unsupported claims qualified or removed, Article 25-A text separated from interpretation, fictional notices labelled, formative and MCQ 10 Bloom demand fixed, rubric performance anchors added, prose simplified and glossary/unit-03.json added; no source bound for event/practice or dominant/vernacular terms; author run identity and browser/print evidence still unavailable; G3 remains open and unsigned |
| Unit 5 | G3 en-review | ▢ | | advisory: revise; repairs applied; report specs/content/efmp-406/reviews/unit-05/G3/20261102T212135Z-g3-desk-466a27a9.json; fictional teaching examples labeled in EN/UR; Minott abstract-only scope and Indonesian higher education context clarified; tooling and catalog limits recorded in reviews/unit-05/G3/repair-handoff.md; G3 remains open and unsigned |
| Unit 1 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-406/reviews/unit-01/G3/20261108T203238Z-g3-desk-5985010a.json |
| Unit 2 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-406/reviews/unit-02/G3/20261108T203238Z-g3-desk-d76ac5cd.json |
| Unit 3 | G3 en-review | ⏳ | CMY | review:specs/content/efmp-406/reviews/unit-03/G3/20261108T203238Z-g3-desk-c8508ca2.json |
| Unit 1 | G3 en-review | ▢ | | advisory: revise; repairs applied; report specs/content/efmp-406/reviews/unit-01/G3/20261108T203238Z-g3-desk-5985010a.json; verified classroom scenarios and family cases (Nadia in Tando Allahyar, Bilal in Sukkur, Sana, Imran, Mariam's mother, munshi and khata cases) are explicitly labeled as original illustrative instructional examples for pedagogy in EN/UR and sources; Shakir et al. (2012) citations strictly qualified to published abstract scope; headless review tooling limits and pending catalog entry status retained per ADR-0019 / ADR-0032; G3 remains open and unsigned |
| Unit 2 | G3 en-review | ▢ | agent:opencode | advisory: revise; repairs applied; report specs/content/efmp-406/reviews/unit-02/G3/20261108T203238Z-g3-desk-d76ac5cd.json; report findings are stale against its own input manifest, which already carries the bb9cdada5 repairs: RRQ 2/3/9 prompts request the fairer wording, the example and the barrier explanation their schemes reward, MCQ 4/8 are routine application within the approved Apply band, and Topic 2.2 check item 2 is recall-only; all 8 EN SVG variants pass measure-figure-text geometry (exit 0); source passage bundle, author run provenance and narrow-screen/A4 print inspection remain unavailable to this job and need the coordinator and an authorised browser host; G3 remains open and unsigned |
| Unit 3 | G3 en-review | ▢ | | advisory: revise; repairs applied; report specs/content/efmp-406/reviews/unit-03/G3/20261108T203238Z-g3-desk-c8508ca2.json; verified the 24e7302b2 repairs already resolve the report's S1/S2/S3/A1/P3 findings (verbatim Papen/Ashraf bindings with 'does not support' limits, textbook-owned event/practice and dominant/vernacular labels, Article 25-A separated from interpretation, qualified causal claims, fictional notices labelled, MCQ 10 scenario, Apply-band retrieval item 4, rubric performance anchors, glossary/unit-03.json present) and simplified the remaining graduate-level terms in the cited passages (codified, multimodal, constitutional jurisprudence) in EN and UR; P1 provenance, P2 rendered evidence and A2 blind solve remain unavailable to this job; G3 remains open and unsigned |
