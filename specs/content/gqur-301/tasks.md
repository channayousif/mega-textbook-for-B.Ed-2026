# GQUR-301 - Task Tracker

Legend (FR-005's 3-value status enum): `▢` not-started · `▣` in-progress · `✅` done (requires
reviewer initials). One row per unit per stage (`G1`-`G7`).

**Course state (2026-10-17):** content-spec approved by the owner following
D-2026-0060. Branch rebased on origin/main. Units 1 and 2 have verified G2 en-draft
gate evidence recorded under auto:gates. All 13 content gates pass cleanly. Urdu
mirrors and Units 3–6 remain outstanding.
Unit 3 bilingual authoring is assigned in TEX-87, a child of TEX-70, on the same
branch and PR #121.

**Recovery checks:** `check:content` passed 13 of 13 gates after generating G2
gate evidence and content-status report. All 32 English light/dark SVGs parse
as XML; page alt and SVG description agree for every placed figure.


| Unit | Stage | Status | Initials | Notes |
|---|---|---|---|---|
| Unit 1 | G1 unit-spec | ▢ | | intake pending; do not mark until intake approves |
| Unit 1 | G2 en-draft | ✅ | auto:gates | gates:specs/content/gqur-301/reviews/unit-01/G2/20261019T235035407Z-gates.json |
| Unit 1 | G3 en-review | ▢ | | advisory: revise; figure text overflows, RRQ 5 model answer counting error, and missing topic-02 citations; report specs/content/gqur-301/reviews/unit-01/G3/459abd64-a834-454a-bb77-eaf0f571110a.json |
| Unit 1 | G4 ur-translation | ▢ | | full Urdu mirror required (bilingual: true) |
| Unit 1 | G5 ur-review | ▢ | | |
| Unit 1 | G6 assets | ▢ | | |
| Unit 1 | G7 publish | ▢ | | |
| Unit 2 | G1 unit-spec | ▢ | | intake pending; do not mark until intake approves |
| Unit 2 | G2 en-draft | ✅ | auto:gates | gates:specs/content/gqur-301/reviews/unit-02/G2/20261018T194041863Z-gates.json |
| Unit 2 | G3 en-review | ▣ | agent:codex-g3-reviewer | Advisory escalation only; findings: specs/content/gqur-301/reviews/unit-02/G3/01a154ca-5b18-7000-872b-bb211ead24e7.json; conflicting RRQ 10 guidance, source/provenance gaps and current render evidence pending. No certification. |
| Unit 2 | G4 ur-translation | ▢ | | full Urdu mirror required |
| Unit 2 | G5 ur-review | ▢ | | |
| Unit 2 | G6 assets | ▢ | | |
| Unit 2 | G7 publish | ▢ | | |
| Unit 3 | G1 unit-spec | ▢ | | intake pending; do not mark until intake approves |
| Unit 3 | G2 en-draft | ▢ | | |
| Unit 3 | G3 en-review | ▢ | | |
| Unit 3 | G4 ur-translation | ▢ | | full Urdu mirror required |
| Unit 3 | G5 ur-review | ▢ | | |
| Unit 3 | G6 assets | ▢ | | |
| Unit 3 | G7 publish | ▢ | | |
| Unit 4 | G1 unit-spec | ▢ | | intake pending; do not mark until intake approves |
| Unit 4 | G2 en-draft | ▢ | | |
| Unit 4 | G3 en-review | ▢ | | |
| Unit 4 | G4 ur-translation | ▢ | | full Urdu mirror required |
| Unit 4 | G5 ur-review | ▢ | | |
| Unit 4 | G6 assets | ▢ | | |
| Unit 4 | G7 publish | ▢ | | |
| Unit 5 | G1 unit-spec | ▢ | | intake pending; do not mark until intake approves |
| Unit 5 | G2 en-draft | ▢ | | |
| Unit 5 | G3 en-review | ▢ | | |
| Unit 5 | G4 ur-translation | ▢ | | full Urdu mirror required |
| Unit 5 | G5 ur-review | ▢ | | |
| Unit 5 | G6 assets | ▢ | | |
| Unit 5 | G7 publish | ▢ | | |
| Unit 6 | G1 unit-spec | ▢ | | intake pending; do not mark until intake approves |
| Unit 6 | G2 en-draft | ▢ | | |
| Unit 6 | G3 en-review | ▢ | | |
| Unit 6 | G4 ur-translation | ▢ | | full Urdu mirror required |
| Unit 6 | G5 ur-review | ▢ | | |
| Unit 6 | G6 assets | ▢ | | |
| Unit 6 | G7 publish | ▢ | | |
| Unit 1 | G3 en-review | ▢ | | advisory: revise; repairs applied for report specs/content/gqur-301/reviews/unit-01/G3/459abd64-a834-454a-bb77-eaf0f571110a.json (crew gqur-301-u01-repair_en, 2026-10-19). Blocking: fig-U1-1 re-laid out so no example box overlaps or overflows the viewBox, wordmark right-anchored in fig-U1-2..8 (light and dark); RRQ 5 frequencies corrected to 2/6/4; topic-02 cites lane2023 and ncc-maths in prose and Further reading. Advisories: MCQ 10 option B now 17-19; pbs and ncc-maths carry dated D-2026-0001 declarations in sources/unit-01.md; live browser inspection (X2) still not run. Figures not re-measured in Chromium (crew brief bars browser runs). Needs a fresh independent G3 review; row stays open (ADR-0019). |
