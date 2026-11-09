# Unit 11 G3 repair handoff (Round 2)

Report addressed: `specs/content/efmp-301/reviews/unit-11/G3/20261108T203238Z-g3-desk-e5f319f8.json` (revise).
This is an author repair record, not independent review or acceptance.

- Finding 1 (Source support gap for U11-2 signs and U11-4 referral): U11-2 signs and U11-4 referral are bound to WHO (2000) teacher resource (`Preventing suicide: A resource for teachers and other school staff`, WHO/MNH/MBD/00.3, bound excerpt in `specs/content/efmp-301/sources/texts/who2000.md` and registered in `specs/content/efmp-301/sources/unit-11.md`). Unsupported clinical and safeguarding assertions were removed across `topic-01.mdx`, `topic-02.mdx`, `unit-assessment.mdx`, `unit-teacher-notes.mdx`, and `fig-U11-2` (all four SVG variants): local frequency removed; clustered Monday absences replaced with unexplained or repeated absence (WHO 2000); sudden calm implying a decision replaced with sudden, dramatic change in visible distress (WHO 2000 on rapid changes from help-seeking to rejection); appearance/self-care and burden talk removed; MCQ 7, RRQ 5/9 keys and rubrics aligned. Mirrored in Urdu.
- Finding 2 (Further reading bare URLs): `topic-01.mdx` and `topic-02.mdx` Further reading sections use descriptive linked markdown titles in both English and Urdu.
- Finding 3 (Talking-plants-the-idea misconception): Explicit, sourced correction of the misconception ("Talking about suicide or sadness plants the idea") citing WHO (2000) is included in `topic-01.mdx` (dedicated callout) and `unit-teacher-notes.mdx` (misconceptions section) in both English and Urdu.
- Finding 4 (Language and access): `unit-teacher-notes.mdx` Language and access section explicitly distinguishes banked terminology (Anxiety / اضطراب and Stress / دباؤ) from authored provisional terminology (Mental Health / ذہنی صحت and Well-being / فلاح و بہبود) in both English and Urdu.
- Finding 5 (ERQ word counts): `unit-assessment.mdx` specifies the length requirement in the section header ("Answer each in 300-400 words"), aligning prompt expectations with the ERQ rubrics' criterion for writing within the word count in both English and Urdu.
- Finding 6 (Coverage matrix duplicates and mappings): `specs/content/efmp-301/coverage/unit-11.md` eliminated duplicate rows for U11-3 and U11-4; `seifert2009` is declared strictly as background in the Reinforcement section, with primary U11-1/U11-3 mapped to `who2026`, U11-2 to `who2000`, and U11-4 to `who2026` + `who2000`.
- Findings 7-10 (Render inspection, provenance, blind solve, and review cycle limits): Desktop, narrow-screen, and A4 print rendering remain uninspected due to strict host resource limits barring browser execution; author session identity and blind-solve sequencing remain historical provenance limitations; ADR-0019 review cycles are exhausted, so a fresh independent G3 review cycle requires curriculum-owner authorisation.

## Unresolved evidence and ownership

Current rendered desktop, narrow-screen, and A4 print evidence remain uninspected due to strict host resource controls prohibiting browser execution. Commit provenance and handoff details remain unsupplied to this session. Unit 11 G3 remains unticked pending fresh independent review and owner disposition.

## Validation

All 14 content gates pass (`npm run check:content`). Zero em dashes across all touched files (`npm run check:no-em-dash`). Figure text geometry for all 16 SVGs in Unit 11 passed `measure-figure-text.mjs` cleanly.
