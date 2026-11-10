# Unit 12 G3 repair handoff (Round 2)

Report addressed: `specs/content/efmp-301/reviews/unit-12/G3/20261108T203238Z-g3-desk-ad4c974d.json` (revise).
This is an author repair record, not an independent review or certification.

- Finding R002-F1 (Render inspection unavailable): Current desktop, narrow-screen, and A4 print rendering remain uninspected because host resource limits prohibit local dev server and browser execution. Prior run001 images cannot verify repaired fig-U12-1 and fig-U12-3. Accessibility remains unverified; owner must arrange authorised visual inspection before closing.
- Finding R002-F2 (Modelling claim and scoring guidance): Verified in `topic-03.mdx` (Technology and learning, Activity, Check your understanding item 5, Summary, and Self-assessment checklist) and `unit-assessment.mdx` (RRQ5 and RRQ10), mirrored in Urdu. Observational learning and vicarious reinforcement from Seifert and Sutton (2009, Chapter 2) are distinguished from responsive relational judgement without a live-only restriction. Scoring guidance in RRQ10 explicitly directs markers not to credit a claim that recorded human modelling is impossible.
- Finding R002-F3 (Tablet project illustrative case status): Verified that `topic-03.mdx` (opening section, concluding paragraphs), its Urdu mirror, and `specs/content/efmp-301/sources/unit-12.md` explicitly label the rural Sindh tablet case as a constructed illustrative case rather than an empirical project evaluation. No external source was added.
- Finding R002-F4 (Author and reviewer provenance): Run001 author identity (`claude-code:022-author-efmp-301:8b67651c`), repair commit `678a6f2d`, PHR 0070, and prior Codex reviewer thread ID are recorded as historical provenance limits without inventing session IDs or model versions.
- Finding R002-F5 (Running question in learner prose): Verified that `topic-03.mdx` (Explanation section, lines 65-67) and its Urdu mirror explicitly state the course running question in learner prose: "Why does this pupil bother, and what will help?" and explain how the branches help answer it. Checklist counts and positions are preserved.
- Finding R002-F6 (ERQ word limits in rubrics): Verified that `unit-assessment.mdx` (ERQ rubrics preamble) and its Urdu mirror explicitly state that there is no word limit for unit-end ERQs and instruct markers not to penalise length itself. All five ERQ rubrics score "Plain, accurate, organised writing" (4 marks) rather than an unstated word limit.
- Finding R002-F7 (Assessment guidance and partial credit): Verified that in `unit-assessment.mdx` (and its Urdu mirror), RRQ2 accepts plausible mappings supported by reasons with differentiated mark breakdown; RRQ4 awards 0.5 per described part (max 2); RRQ5 awards 0.5 per cost-and-watch pair plus 0.5 for teacher response (max 2); ERQ rubrics provide shared partial-performance anchors (full, three quarters, half, one quarter, zero); and ERQ2 rewards explicit analysis of duties, consequences, and remaining risks.

## Unresolved evidence and ownership

Current rendered desktop, narrow-screen, and A4 print evidence remain uninspected due to strict host resource controls prohibiting browser execution. Commit provenance and handoff details remain historical limits. Unit 12 G3 remains unticked pending fresh independent review and owner disposition.

## Validation

All 14 content gates pass (`npm run check:content`). Zero em dashes across all files (`npm run check:no-em-dash`). Figure text geometry is verified clean.
