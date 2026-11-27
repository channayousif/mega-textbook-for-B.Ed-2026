# GENT-401 Unit 5 - G3 English review summary

- Reviewer: `agent:claude-crew`, run `crew-gent-401-u05-review_en-r1`, model claude-opus-5-5
  (Claude Opus 5.5 in Claude Code; exact deployment build not exposed).
- Author: `claude:crew-gent-401-u05-author` (history/prompts/gent-401/crew-gent-401-u05-author.green.prompt.md,
  2026-11-24). This session did not draft or translate the unit. Both runs are Claude crew
  workers, so independence rests on separate sessions, not a different vendor.
- Reviewed commit: `01fde1b302e083ffef3098d3dadd40fbb90cf8d7`; 93 bound inputs, manifest
  re-verified with 0 mismatches (`logs/input-verification.txt`).
- **Disposition: escalate.** There are five blocking content defects that a separate author can
  repair (revise items), and the required render and print inspection could not be done, which
  is an escalation condition under the review-unit skill.

Advisory only. This report certifies nothing, signs nothing, ticks no gate and appends no done row.

## Criterion evidence

- **authority: pass.** All six guide leaves (content-spec.md:271-276) are taught under their exact
  headings: U5-01 topic-01.mdx:34, U5-02 :57, U5-03 :75, U5-04 topic-02.mdx:34, U5-05 :52,
  U5-06 :60. CLO refs match content-spec.md:262. The blueprint's Apply-then-Evaluate item
  (content-spec.md:265) is ERQ 1 (unit-assessment.mdx:98). Key terms (content-spec.md:263) are
  all glossed.
- **coverage: pass.** Coverage matrix (coverage/unit-05.md) rows point at real explanations, each
  with a worked example: budget topic-01.mdx:42-53, break-even :63-71, statements :79-89; funding
  topic-02.mdx:36-50, investors :54-58, crowdfunding :62-64. Each outcome is assessed (concept
  graph concepts/unit-05.md maps every concept to items, confirmed against the bank).
- **sources: fail.** F3 (topic-02.mdx:64 attributes Scott's network/media point to OpenStax 9.2),
  F5 (topic-01.mdx:73 overstates Sintha 2020), F7 uncertain (two Scott claims supported only
  outside the bound notes). 13 of 17 cited claims are fully supported by the bound evidence; see
  `source-verification.md`.
- **assessment: fail.** All 25 items solved independently; every key and model answer is
  correct (`assessment-solutions.md`). F4: MCQ key distribution A2/B6/C2/D0 and two equivalent
  distractors in MCQ 3.
- **accessibility: unverified.** F6: render-review unavailable because the deployed SHA
  366019f8a differs from HEAD on this unit (`logs/render-review.txt`). Source inspection: headings
  are in order, link text is descriptive, all five figures carry meaningful alt text,
  measure-figure-text passes for the four SVGs.
- **readability: pass.** Short sentences, terms defined at first use with Glossary, one running
  example; suitable for an HSC graduate. Advisory A4 on one unclear phrase.
- **pedagogy: fail.** F1: the running case contradicts itself between the topics (Imran's
  savings). F2: the break-even chart is not drawn to its own axis scale (`figure-check.md`).
  Otherwise the cycle is complete: situation, explanation, three misconceptions corrected with
  sources, feasible group activities, retrieval, checklist, practicum task, and summative tasks
  with rubrics; teacher notes are usable.

## Blocking findings (repair requests)

1. **F1 Running case contradicts itself.** topic-01.mdx:24 and :53 say Imran saved Rs 50,000 and
   it covers the Rs 50,000 start-up budget exactly; topic-02.mdx:24 and :42 say he saved
   Rs 20,000 and needs Rs 50,000 (also the bootstrapping row at :46). Repair: use one figure across
   the unit, for example savings of Rs 20,000 in Topic 5.1 so the budget shows a Rs 30,000 gap
   that Topic 5.2 then funds, and reword topic-01.mdx:53 to match.
2. **F2 fig-U5-1 not to scale.** Fixed-cost line drawn at about Rs 21,700 (y=270, should be 285);
   revenue reaches about Rs 43,400 at 20 pupils (should be 40,000, y=110); total cost ends at about
   Rs 30,400 (should be 28,000, y=215); break-even dot at about Rs 27,200 (should be 25,000,
   y=241.25). Same in all four variants. Also "cross at 13 pupils" (alt, desc, topic-01.mdx:71)
   should say 12.5 pupils, so 13 needed. Coordinates in `figure-check.md`.
3. **F3 Misattribution.** topic-02.mdx:64 says OpenStax 9.2 warns that a campaign needs "an
   established network and skilful use of the media". OpenStax 9.2 does not say this; it is
   Scott ch. 12 ("without an established network and/or skillful media involvement"). Repair:
   attribute it to Scott, keep the late-rewards point for OpenStax.
4. **F4 MCQ construction.** Key A2/B6/C2/D0: answering B throughout scores 6/10 and D is never
   correct. MCQ 3 options A and D both describe variable costs. Repair: spread the keys across
   A-D (about 2-3 each) and replace one of MCQ 3's equivalent distractors.
5. **F5 Overstated source.** topic-01.mdx:73 says Sintha "notes that many small businesses fail
   because they never do this calculation at all". The bound note (sintha-2020-break-even.md:27)
   says many SMEs stop trying and one cause is not doing the calculation. Repair: "notes that
   one reason many small businesses give up is that they never do this calculation".

## Uncertain findings

- **F6** render-review and A4 print/360px inspection unavailable (deployed 366019f8a vs HEAD
  01fde1b30; banner fig-U5-5 and its index.mdx line not yet deployed). Rerun once deployed.
- **F7** topic-01.mdx:89 (Scott ch. 10, cash flow among the main reasons new businesses fail)
  and the "pile of cash" reason at topic-02.mdx:36 (Scott ch. 1) have no bound note. Both are
  true in the publisher PDF (ch. 10 "Reason 3: Cash Flow Problems"; ch. 1 "Lack of Money"), so
  the repair is to add them to `sources/texts/scott-2017-efmd.md`, not to change the prose.

## Advisory

- A1 Topic 5.1 `est_reading_minutes: 11` sits below its content-spec band of 12-16
  (content-spec.md:282); the unit total of 40 is inside 34-46 and check:depth-gate passes.
- A2 MCQ 6 is labelled Apply but asks for a definition (Remember/Understand).
- A3 topic-02.mdx:24 offers an uncle's loan repaid in two years, but the worked example and table
  (:44-48) recast it as a bank loan repaid monthly; say that the uncle's offer is a family loan or
  add the bank as a fourth option.
- A4 topic-02.mdx:72 "an edtech repair shop" is unclear (a phone or computer repair shop?).
- A5 fig-U5-3 routes crowdfunding only through "willing to give up part ownership", although
  reward crowdfunding gives up none (topic-02.mdx:62); the start node asks about amount but no
  branch uses it.
- A6 Cegielska & Zawadzka is cited as 2018, while the DOI and volume 51(6) are the 2017 issue.
- A7 The fig-U5-1 manifest prompt says the lines cross "at 13 pupils and 25,000 rupees"; that is
  not a point on either line. Fix it with F2.

## Commands

All required content checks exit 0 at HEAD 01fde1b30 (`logs/`): validate:content,
check:depth-gate, check:figures, check:no-em-dash, check:no-answer-keys, check:docs-sync, plus
check:concept-graph, check:bloom-bands, check:svg-style, check:source-floor and
measure-figure-text. render-review: unavailable (exit 1). Passing scripts do not replace the
semantic findings above.
