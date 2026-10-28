# Unit 7 final-cycle G3 advisory review

Disposition: escalate. No G3 certification, signature or publication transition.
Reviewed commit 4285d7cb67c4ad4e5c70052dd95e12f7ea3bcd33 equals origin/main. Initial branch log and status were empty. Repair commit 2b956061 is already included. This fresh reviewer did not author the unit. The host did not supply the author session identity or parent-prepared frozen bundle. Local preparation binds 105 inputs, but does not establish the missing host provenance. Model: GPT-6, exact build unavailable. Reviewer session is recorded in JSON.

## Previous findings

All locators below are within docs/semester-2/gqur-301/unit-07/ unless stated otherwise.

- F1 resolved: unit-assessment.mdx ERQ 2 Analysis no longer requires proposing a change. ERQ 4 Further feature now corresponds to an explicit question request; code-length cost is no longer required.
- F2 resolved: topic-02.mdx Worked example 2 explicitly limits two-digit codes to 100 pupils per section. RRQ 10 supplies section sizes 110/100/90 and correctly rejects 100 per section despite 300 overall. ERQ 4 distinguishes arbitrary-prefix X from fixed-section Y and requires per-section testing.
- F3 resolved: ERQ 4 now requires collected practicum-school enrolment figures, named school, source and date. Teacher notes Assessment guidance schedules collection and requires data-dependent marking. This satisfies the real-Pakistan-data task requirement at specs/content/gqur-301/content-spec.md:148.
- F4 resolved: RRQ 9 explicitly sums both 1.5-mark parts before rounding the total down.
- F5 resolved: ERQ 2 says at least four days reuse a timetable, explicitly allowing one timetable to recur several times.
- P1 unresolved: author run identity, immutable parent handoff and exact model build remain unavailable. A repair commit is provenance of bytes, not an author session ID.
- P2 unresolved: tasks.md Unit 7 G1 is open and intake-3 evaluates the superseded partition. The guide Chapter 7 leaf headings match the content-spec, but this reviewer cannot approve G1.
- P3 unresolved: the brief prohibits builds, servers and Playwright. Current mobile, keyboard, dark-theme and A4 render inspection is unavailable. No prior screenshot or stale build is presented as current evidence.
- P4 unresolved: this session read the whole assessment, including its final answer section, before persisting derivations. The calculations below are a transparent consistency audit, not answer-blind verification. A fresh answer-blind audit is still required.

## Authority and coverage

Scheme-and-Course-guides/extracted-text/2nd 2026.txt:475-477 names Chapter 7, Basic Counting Principles and Multiplicative Rule. Content-spec Unit 7, coverage/unit-07.md and concepts/unit-07.md map these to the two actual Explanation sections. Topic 7.1 teaches fixed-order listing, disjoint addition and correcting overlap; Topic 7.2 teaches stages, shrinking choices, trees and unequal branches. SLO 1 has MCQ 1-2/RRQ 1-2; SLO 2 has MCQ 3-5/RRQ 3-4/ERQ 1; SLO 3 has MCQ 6-10/RRQ 5-10/ERQ 2-5. Taught coverage passes; authority remains unverified pending G1.

## Sources

Inspected the exact source URLs already declared in sources/unit-07.md using web open in this session. Lane https://onlinestatbook.com/2/probability/permutations.html, Possible Orders/Table 1 and Multiplication Rule, supports systematic enumeration and the cited 3 x 6 x 4 restaurant calculation. OpenStax https://openstax.org/books/college-algebra-2e/pages/9-5-counting-principles, Addition Principle and Using the Multiplication Principle, supports disjoint alternatives and staged selections. OpenStax https://openstax.org/books/introductory-statistics-2e/pages/3-5-tree-and-venn-diagrams, Tree Diagrams/Example 3.24, supports branching outcomes. These are passage checks, not URL-only checks. Print Chaudhry and Kamal is explicitly bibliographic-only. No new external reference is used. No immutable source capture was supplied; the sources criterion remains unverified for a fully input-bound acceptance, despite observed rule support. Sources/unit-07.md's outfit-example description does not match the introductory meal example inspected, an advisory citation-description correction for a separate author.

## Readability and pedagogy

Both topics define terms before using them, move from school situations to small worked counts, then activities, retrieval, reflection, practicum and analytical summative tasks. Topic 7.1's 15-minute pair activity uses lists and ordinary tuck-shop choices; Topic 7.2's 20-minute group activity compares multiplication, listing and a tree. Teacher notes provide chart paper and sequencing. These are feasible paper-based activities at HSC arithmetic level. ERQ 4 needs school-record access and is explicitly scheduled after practicum. No practicing-teacher trial is claimed.

## Assessment consistency audit

MCQ 1-10: B, C, D, A, B, C, A, D, B, C. Reasoning: definition; exhaustive order; 6+5=11; 15+10-4=21; disjoint alternatives; product; 4x3=12; 5x10=50; 2x3x2=12; one alternative gives 3+4=7. These match the supplied key.

RRQ 1: exhaust second choices for each first choice. RRQ 2: Maths/English each paired with Science/Urdu/Sindhi, six pairs. RRQ 3: 45-(20+15-5)=15. RRQ 4: 5+4-1=8. RRQ 5: none is a third sweater option, 2x2x3=12. RRQ 6: 6x9=54. RRQ 7: 4x3x2x1=24, no pupil repeats. RRQ 8: 2+3=5, branch counts differ. RRQ 9: 8 versus 15. RRQ 10: one digit gives 10 per section; two gives 100 and fails section A; three gives 1000 and fits all. Alternative justified encoding changes are accepted. All match current numerical guidance.

ERQ 1: 55 counts four pupils twice, so 51, with an overlap-recording routine. ERQ 2: 3x2x2x3=36, first two stages give six branches; 40 days force at least four reused days. ERQ 3: 6,7,8,40, with swapped-rule and mixed-rule diagnosis. ERQ 4: X has 260 total; Y has 1000 per section. Recommendation depends on recorded current and future entrants per section, not aggregate space. ERQ 5: 24 normally,16 Fridays, so every-day claim fails. These agree with the supplied calculations. Bloom demands are actual comparison/diagnosis for RRQ 4/8-10 and analysis/evaluation in ERQs, with differentiated rubric bands.

Topic 7.1 activity: six snack/drink pairs, seven alternative lunch items; retrieval library count 11 and monitor/assistant count 6; summative 25+18-6=37, then +10=47. Topic 7.2 activity: 3x2x3=18, Friday 3x1x3=9; retrieval paper count 15 and kits 8; summative kits 16 versus five alternative entries. These support the stated rules.

New uncertainty N1: ERQ 4 asks for the number admitted last year without explicitly requiring admissions per section or specifying a constant annual intake assumption, but its full-credit evaluation requires a ten-year per-section projection. Its rubric then calls this 'the largest section against 1,000', which can be misread as current section size alone. A section with 100 pupils now and 100 entrants per year needs roughly 1100 never-reused codes under that projection. Explicitly request annual admissions per section, state the projection assumptions and mark projected demand in every section. Owner adjudication/separate author action is required at the exhausted cycle limit.

## Accessibility

Source headings, descriptive topic links, four explanatory alts and matching figure-manifest roles are present. Figure quantities and asset existence pass deterministic gates. None of this verifies clipping, scroll/keyboard reachability, dark-theme contrast or print pagination. render-review was not executed, and no synthetic successful command or image is included.

## Baseline and next owners

The first check:content runs against exactly origin/main, before tracker modification, so its failures are baseline failures. The final run and comparison are saved separately. Baseline check:content passed all 13 gates. The first post-tracker run passed 12 gates and failed check:content-status because the ignored generated cache was stale. npm run build:content-status refreshed it; the final rerun is recorded in check-content-refreshed.log. Review outputs and tracker/PHR are the only intended tracked modifications. G1/provenance and permitted current renders belong to the owner/review host; answer-blind verification needs a fresh session. This is the second and last cycle: do not initiate another repair/review cycle without recorded owner authorization. Prior reports are retained.
