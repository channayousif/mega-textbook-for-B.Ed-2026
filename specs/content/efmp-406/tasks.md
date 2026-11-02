# EFMP-406 Contemporary Literacies - Task tracker

## Status: content spec approved (G0/G1, D-2026-0075..0080); authoring in progress

## Units

| Unit | Title | EN draft | G3 review | UR translation | G5 review | Figures | Notes |
|---|---|---|---|---|---|---|---|
| 1 | Concept and Evolution of Literacy | ✓ | ☐ | ☐ | ☐ | placed (EN) | English authored 2026-11-02 by the crew author job (claude); G2 gate evidence recorded below; G3 and Urdu remain open |
| 2 | Contemporary Forms of Literacy | ☐ | ☐ | ☐ | ☐ | - | |
| 3 | Literacy, Language, and Society | ✓ | ☐ | ☐ | ☐ | placed (EN) | English draft authored from approved content-spec (D-2026-0075) |
| 4 | Literacy in the Digital Era | ☐ | ☐ | ☐ | ☐ | - | |
| 5 | Pedagogical Approaches to Contemporary Literacy | ☐ | ☐ | ☐ | ☐ | - | |
| 6 | Issues, Challenges, and Future Directions | ✓ | ☐ | ☐ | ☐ | placed (EN) | English authored by codex crew job 2026-11-02; G2 gate evidence recorded below; G3 and Urdu remain open. Browser geometry check deferred under crew prohibition on Playwright. |

**Key:** ▣ = in progress, ☐ = not started, ✓ = done, ✗ = escalated

## Stage rows

`check:pipeline-gate` reads these (`| Unit | Stage | Status | Initials | Notes |`); the last row for a unit and stage is authoritative.

| Unit | Stage | Status | Initials | Notes |
|---|---|---|---|---|
| Unit 1 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-406/reviews/unit-01/G2/20261102T081459685Z-gates.json |
| Unit 1 | G3 en-review | ▢ | | advisory: pass (ADR-0019); report at specs/content/efmp-406/reviews/unit-01/G3/5be15169-67ce-493e-9ccd-e4c8e6b64a2d.json; all 7 criteria pass; independent solve 10/10 MCQs, 10/10 RRQs, 5/5 ERQs; all 8 SVG variants pass geometry; G3 remains open and unsigned |
| Unit 1 | G4 ur-translation | ▢ | | separate job |
| Unit 1 | G5 ur-review | ▢ | | |
| Unit 3 | G1 unit-spec | ✅ | auto:gates | content-spec status: approved |
| Unit 3 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-406/reviews/unit-03/G2/20261102T104941955Z-gates.json |
| Unit 3 | G3 en-review | ▢ | | awaiting independent reviewer |
| Unit 3 | G4 ur-translation | ▢ | | separate job |
| Unit 3 | G5 ur-review | ▢ | | |
| Unit 3 | G6 assets | ✅ | auto:gates | 4 schematics placed with dark variants |
| Unit 3 | G7 publish | ▢ | | |

| Unit 6 | G2 en-draft | ✅ | auto:gates | gates:specs/content/efmp-406/reviews/unit-06/G2/20261102T091818158Z-gates.json |
| Unit 6 | G3 en-review | ▢ | | awaiting an independent reviewer |
| Unit 6 | G4 ur-translation | ▢ | | separate job; translate prose, nine concept labels and four SVGs with RTL layout |
| Unit 6 | G5 ur-review | ▢ | | independent Urdu review pending |

## Unit 6 authoring handoff

- Reading time is 63 minutes at 200 words per minute: opening 2, Topic 6.1 18, Topic 6.2 19, assessment 18 and teacher notes 6. Front matter, imports, figure carriers and link targets are excluded from the visible-word estimate. This fits the approved 55–75 minute budget without changing the spec.
- Four EN schematics and generated dark twins are placed. Non-browser Sharp renders were inspected in both themes. `measure-figure-text.mjs` uses Playwright/Chromium and was not run because `.crew/brief.md` prohibits Playwright. The next authorised browser session owns that geometry check; no build, server or browser ran here.
- Source notes distinguish abstract-only, official-overview and indexed-PDF support. The mapped Booth and Ainscow print book was not available and carries no claim. No current district rates, tool-effectiveness findings or policy-achievement claims were invented.
- Literacy rate, access and out-of-school children are defined inline. Global glossary additions are outside this Unit 6-only job. Equity, AI and SDGs reuse existing glossary entries. The Urdu job owns the corresponding vocabulary work and concept-label review.
