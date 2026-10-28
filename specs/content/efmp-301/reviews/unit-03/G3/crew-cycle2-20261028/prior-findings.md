# Cycle 2 carry-forward audit

Previous report: `agent-g3-efmp301-u3-run001.json`. Findings retain their original order. This is the last authorized cycle; remaining defects require owner disposition.

## Prior finding 1: resolved

Bound excerpt incomplete for cited passages (repairable evidence defect, citations themselves accurate): specs/content/efmp-301/sources/texts/seifert2009.md contains no passage for the in-prose (Seifert & Sutton, 2009) citations at topic-01.mdx:61-64 (Pavlov), topic-01.mdx:77-81 (extinction), topic-01.mdx:111-125 (reinforcement distinction), topic-02.mdx:59-78 (schemas/assimilation/accommodation). Reviewer verified against the primary PDF that all four are genuinely in the book (pp. 24-25, 27-28, 33-34, 111-112). Repair: extend sources/texts/seifert2009.md with those passages, re-prepare the manifest, and have a fresh reviewer re-verify; do not accept on the current bundle.

Current verification: The Chapter 2 extension in sources/texts/seifert2009.md now binds respondent conditioning, extinction, schemas and assimilation/accommodation; negative reinforcement is also bound in spielman2020.md section 6.3. The exact bell narrative is not in the excerpt, but the mechanism is.

## Prior finding 2: resolved

Misattributed scholarship: topic-02.mdx:97-101 cites (Seifert & Sutton, 2009) for Bruner's three modes of representation (enactive/iconic/symbolic) and their teaching order, topic-03.mdx:47-64 presents Bandura's four observational-learning steps under a Seifert-cited section, and topic-01.mdx:108-120 cites the book for "the four consequence types" including "response cost" - none of this content is in Seifert & Sutton (2009) (zero occurrences of enactive/iconic/response cost; no four-step account; no four-type framework). Repair: register and bind an open-access source that actually contains these standard accounts (the spec's own supplement mechanism, content-spec.md:432-435) and cite it there, or re-attribute accurately.

Current verification: topic-01 Reinforcement and punishment now cites Spielman; topic-02 Bruner cites Antonides & Battista for the three-mode sequence; topic-03 Bandura explicitly cites Spielman for the four steps. The removed response-cost terminology no longer needs that attribution.

## Prior finding 3: resolved

Uncorroborated research claim: topic-03.mdx:75-83 states Bandura's inflatable-doll (Bobo doll) studies "are among the most replicated findings in psychology" with no citation, and no registered or bound source contains any Bobo-doll material; the spec planned an open-access supplement for exactly this claim (content-spec.md:433-435) but sources/unit-03.md registers none. Repair: add the registered, excerpt-bound supplement and cite it, or soften the claim to what a bound source supports.

Current verification: topic-03 misconception box removes the replication superlative and cites the Bobo-doll account and qualified prosocial/antisocial conclusion in spielman2020.md section 6.4.

## Prior finding 4: resolved

Assessment blueprint deviation: unit-assessment.mdx MCQ topic spread is 4/3/1/2 (Q1-4 -> topic 3.1, Q5-7 -> 3.2, Q8 -> 3.3, Q9-10 -> 3.4) vs the approved 3/3/2/2 (content-spec.md:545), and RRQ spread is 4/2/2/2 (R1-4 -> 3.1, R5-6 -> 3.2, R7-8 -> 3.3, R9-10 -> 3.4) vs the approved 3/2/3/2 (content-spec.md:546); topic 3.1 is over-weighted and topic 3.3 under-weighted by one item in each band. Repair: move one MCQ and one RRQ from topic-3.1 material to topic-3.3 material (updating the concept-graph assessment IDs accordingly), or record a justified blueprint amendment in the spec.

Current verification: MCQ 2 now tests model strength, giving topics 3.1/3.2/3.3/3.4 items [1,3,4]/[5,6,7]/[2,8]/[9,10]. RRQ 3 now tests observational-learning steps: [1,2,4]/[5,6]/[3,7,8]/[9,10]. Both match content-spec Unit 3 blueprint, and concepts/unit-03.md maps the moved items.

## Prior finding 5: partially resolved

Registry/excerpt mismatch: sources/unit-03.md:16 claims vosniadou2001 supports U3-5, U3-6, U3-10 (active involvement; relating new information to prior knowledge; the constructivist framing), but sources/texts/vosniadou2001.md binds only Principle 11 (developmental differences, marked used by Units 1-2). No unit prose cites Vosniadou (Further Reading only), so no learner-facing claim rests on it, but the declared support is unverifiable from the bundle. Repair: extend the excerpt with the booklet's active-involvement/prior-knowledge principles or correct the Supports column.

Current verification: sources/unit-03.md now correctly limits Vosniadou to Further Reading background. However coverage/unit-03.md still uses vosniadou2001 for U3-5 cognitive turn, U3-6 schemas and U3-10 constructivism, while the bound excerpt contains only Principle 11 developmental differences. Carry the unsupported evidence mapping forward.

## Prior finding 6: resolved

Reading-list drift: content-spec.md:432 maps seifert-hk Chapter 2 as Unit 3's second binding and sources/unit-03.md:6-7 says "Both guide books are bound here", but the registry lists only seifert2009 (guide book 2); seifert-hk (guide book 1, the guide's first recommended book) is neither registered nor bound. Reconcile the preamble or register the second guide book.

Current verification: sources/unit-03.md preamble now identifies seifert2009 and supplements, and explains seifert-hk is bound at course level for development chapters. It no longer says both guide books are bound for this unit. The seifert-hk Chapter 2 equivalence assertion is not independently established by its development-only excerpt.

## Prior finding 7: resolved

MCQ 7 option b wording (unit-assessment.mdx:93): "the words were assimilated into no schema that carried the poem's meaning" is internally incoherent (assimilation requires an existing schema); the intended answer remains unambiguous. Suggest "the words were filed into no schema that carried the poem's meaning".

Current verification: MCQ 7 option b now says the words met no schema that carried the meaning; the self-contradictory assimilation wording is gone.

## Prior finding 8: resolved

RRQ 9 model answer (unit-assessment.mdx:210): "the whole worksheet unaided even with help (beyond it)" is garbled; should read e.g. "the whole worksheet, which he cannot finish even with help (beyond it)".

Current verification: RRQ 9 now says the whole worksheet not even with help, eliminating the contradictory unaided/even-with-help wording.

## Prior finding 9: partially resolved

RRQ 10 model answer (unit-assessment.mdx:211-215) reuses the topic's generic "pupil refuses to work" four-lens readings (refusal earns attention; trying costs standing) rather than readings grounded in Amjad's specific description (no written work, strong oral understanding, copying); a marker following it verbatim could mis-credit apt Amjad-specific answers. The "Award marks for the substance below, not for matching wording" preamble mitigates.

Current verification: RRQ 10 now mentions Amjad writing and copying, but asserts copying earns marks, observing failed trying, and performance beyond assisted reach although the vignette supplies none of these observations. These need conditional wording and explicit credit for evidence-seeking alternatives.

## Prior finding 10: resolved

Typo: topic-04.mdx:50 "constructivist approes" -> "constructivist approaches".

Current verification: topic-04 Constructivism section no longer contains approes; the rewritten opening uses the perspective that learners construct knowledge.

## Prior finding 11: resolved within source inspection

Out-of-bundle build defect discovered during review (not a Unit 3 English content defect; belongs to the Urdu/G4 lane): i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-02/topic-02.mdx:17 (commit 90c3f10) imports @site/components/Glossary (missing src/), so npm run build exits 1 for the whole site. This blocks production builds/deploys and later G5 render checks; repair the import. This review's render inspection used the dev server (recorded in render-inspect.log).

Current verification: The out-of-scope Unit 2 Urdu topic-02 import now reads @site/src/components/Glossary at line 17. No build was run, so this confirms the reported path defect only, not global build success.

## Prior finding 12: unverified

Figure cosmetic: scripts/measure-figure-text.mjs reports fig-U3-1's lower panel shape overlapping the wordmark bounding box by 86.3 x 4.5px (wordmark drawn last, muted token; reported-not-failed). No text overflow or overprint in any of the nine figures.

Current verification: fig-U3-1.svg still has the lower panel at y=230 height=224 and wordmark baseline y=460, consistent with the earlier cosmetic contact warning. Browser glyph measurement is prohibited by the brief; do not claim geometry has passed or carry an old measurement as a current observation.
