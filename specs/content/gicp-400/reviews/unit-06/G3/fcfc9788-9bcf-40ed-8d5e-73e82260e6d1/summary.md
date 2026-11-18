# GICP-400 Unit 6 independent G3 English advisory review

Disposition: **escalate**. Advisory only. G3 remains open, unsigned, and uncertified.

Reviewer: agent:agy (Antigravity)
Reviewer Run ID: fcfc9788-9bcf-40ed-8d5e-73e82260e6d1
Author Run ID: crew/gicp-400-u06-author (commit c1ab4c6ab / merge branch crew/gicp-400-u06-author)
Model: Gemini 3.8 Flash (High)

This fresh session did not author or translate this unit. A clean prepared bundle (96 bound indexed inputs) was generated and verified.

## Criterion observations

- **Authority**: PASS. The approved content specification (`specs/content/gicp-400/content-spec.md`) and the official course guide scheme (`Scheme-and-Course-guides/extracted-text/3rd 2026.txt:632-639`) agree on Weeks 13-14 and the six leaf sub-topics U6-01 to U6-06. The coverage matrix (`specs/content/gicp-400/coverage/unit-06.md`) maps each leaf to an exact Explanation heading and verified source.
- **Coverage**: PASS. Sub-topics U6-01 through U6-03 are taught in Topic 6.1; U6-04 through U6-06 are taught in Topic 6.2. The full assessment blueprint is satisfied: 10 MCQs, 10 RRQs, and 5 ERQs. MCQs 1-5 and RRQs 1-5 address Topic 6.1; MCQs 6-10 and RRQs 6-10 address Topic 6.2; ERQ-01 through ERQ-04 provide topic-specific evaluation, while ERQ-05 serves as the required integrative mock parliament plan. Reading time totals 49 minutes (index 3 + topic-01 15 + topic-02 15 + assessment 16), within the approved 40-55 minute band.
- **Readability**: PASS. Core constitutional concepts (Majlis-e-Shoora, bicameral balance, head of state vs chief executive, acting on advice, superior courts vs Federal Constitutional Court, two-thirds of total membership, provincial limits alteration, 18th/19th/25th Amendments) are defined in plain language before analytical application. Explanations are accessible to undergraduate teacher candidates without prior legal training. Zero em dashes (U+2014) across all authored content.
- **Pedagogy**: PASS. Authentic Sindhi classroom vignettes open each topic (Sana in Larkana in Topic 6.1; Bilal in Hyderabad in Topic 6.2). Nine-part topic instructional cycles are complete. Common misconceptions (e.g. that the President runs the government, that the Supreme Court remains the final court on every constitutional question, that any ordinary law can change the Constitution, that the 18th Amendment only renamed a province, that every amendment increases provincial power) are explicitly identified and refuted. Group activities (Card sorting in 6.1; Amendment tribunal in 6.2) and school practicum tasks are practical and feasible.
- **Assessment**: PASS. All 25 bank items were solved independently prior to inspecting answer guidance. All 10 MCQ keys match derived solutions without distractor ambiguity. All 10 RRQs and 5 ERQs carry structured point allocations and analytic rubrics distinguishing performance levels. Answer guidance is strictly isolated to the final bounded section.
- **Sources**: UNVERIFIED. Primary constitutional and statutory provisions (1973 Constitution as amended up to the 27th Amendment, 18th Amendment Act 2010, 19th Amendment Act 2010, 25th Amendment Bill 2018 / Act 37 of 2018) and case note on *Nadeem Ahmed v. Federation of Pakistan* (LUMS) and FAFEN report are verified. However, print monograph Hamid Khan (2017) is declared unverifiable under D-2026-0001, and full official text of Act 37 of 2018 could not be fetched from the Ministry of Law (relying on Senate bill version). In accordance with the G3 rubric, `sources` is recorded as `unverified`.
- **Accessibility**: UNVERIFIED. Static inspection confirms descriptive alt texts matching SVG diagrams, hierarchical heading structures, placed schematics with dark twin variants, and SVG text geometry passed via `scripts/measure-figure-text.mjs`. However, dynamic visual inspection (360px small-screen layout, table horizontal scroll reachability, and A4 print view) could not be executed because `.crew/brief.md` strictly prohibits running `npm run build`, dev servers, and Playwright (`render-review` exit code 1).

## Deterministic check records

- `validate:content`: exit 0
- `check:depth-gate`: exit 0
- `check:figures`: exit 0
- `check:no-em-dash`: exit 0
- `check:no-answer-keys`: exit 0
- `check:docs-sync`: exit 0
- `check:content`: exit 0 (all 14 content gates passed)
- `render-review`: exit 1 (prohibited by brief execution constraints)

## Next steps for parent / author

1. Bind the official gazette text of the 25th Amendment (Act 37 of 2018) or maintain the current documented Senate bill source notes.
2. Execute browser and print rendering checks on an authorized host with Chromium access to produce verified visual render artifacts and font-metric measurements.
3. Keep G3 open and advisory until authorized host qualification and acceptance can be conducted.
