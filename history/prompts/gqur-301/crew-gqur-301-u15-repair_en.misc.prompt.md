---
id: crew-gqur-301-u15-repair_en
title: crew repair_en GQUR-301 unit 15
stage: misc
date: 2026-11-05
surface: agent
model: opencode
feature: gqur-301
branch: crew/gqur-301-u15-repair_en
user: crew
command: crew repair_en
labels: ["crew", "opencode", "repair_en"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-2/gqur-301/unit-15/topic-01.mdx
  - docs/semester-2/gqur-301/unit-15/topic-02.mdx
  - docs/semester-2/gqur-301/unit-15/topic-03.mdx
  - docs/semester-2/gqur-301/unit-15/unit-assessment.mdx
  - docs/semester-2/gqur-301/unit-15/unit-teacher-notes.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-15/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-15/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-15/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-15/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-15/unit-teacher-notes.mdx
  - specs/content/gqur-301/sources/unit-15.md
  - specs/content/gqur-301/sources/texts/u15-openstax-2026.md
  - specs/content/gqur-301/sources/texts/u15-lane-2026.md
  - specs/content/gqur-301/sources/texts/u15-nist-2026.md
  - specs/content/gqur-301/tasks.md
  - specs/content/gqur-301/reviews/unit-15/G2/20261105T153507950Z-gates.json
tests:
  - npm run check:content
---

## Prompt

# Crew job gqur-301-u15-repair_en

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u15-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/gqur-301/reviews/unit-15/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 15 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-301 Unit 15 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-15/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Open findings from the latest G3 report
From `specs/content/gqur-301/reviews/unit-15/G3/20261102T212207Z-g3-desk-b5cee406.json` (disposition: revise). Resolve each one:
- [blocking] docs/semester-2/gqur-301/unit-15/topic-01.mdx (fig-U15-2), topic-02.mdx (fig-U15-3, fig-U15-4), topic-03.mdx (fig-U15-5, fig-U15-6): five live <Figure> elements point at /img/figures/gqur-301/unit-15/fig-U15-N.svg files that do not exist (only fig-U15-1 and its dark variant are committed); specs/content/gqur-301/figures/unit-15.md keeps these rows prompt-only with empty Src. Every topic page would render broken images, and check:figures passes silently. Repair: author the five schematic SVGs (plus dark variants) and move the rows through generated to placed, or restore the {/* FIGURE[...] *...
- [blocking] specs/content/gqur-301/figures/unit-15.md fig-U15-3 prompt and docs/semester-2/gqur-301/unit-15/topic-02.mdx fig-U15-3 alt: the figure marks z = 1.82 inside a two-tailed "do not reject" region, but it opens Topic 15.2, whose only worked example computes z = 1.84 for a right-tailed test and rejects H0 (p = 0.0329). A learner meets a figure that contradicts both the statistic and the decision. Repair: draw the right-tailed test (critical z = 1.645, z = 1.84 in the shaded rejection region) or explicitly label it a two-tailed variant of the same data with z = 1.84 and p = 0.065; update alt text...
- [blocking] specs/content/gqur-301/figures/unit-15.md fig-U15-2 prompt and docs/semester-2/gqur-301/unit-15/topic-01.mdx fig-U15-2 alt: says the observed mean 75 "falls in the right tail" beside shaded two-tailed rejection regions, implying rejection; the two-tailed critical mean is 72 + 1.96 x 1.69 = 75.31, so 75 lies just inside the non-rejection region (consistent with the topic's decision, p = 0.075). The prompt also asks for "the area beyond it ... labelled p/2 on each side", which conflates the p-value area with the 0.025 rejection areas. Repair: mark the critical values (about 68.7 and 75.3), pl...
- [blocking] docs/semester-2/gqur-301/unit-15/unit-assessment.mdx, ERQ 2 rubric key: wrong and self-contradictory. For z = 2.10 the two-tailed p is 0.0357 (0.036) and the one-tailed p is 0.0179. Teacher A's p is therefore the correct two-tailed value; A's only error is the causal claim "the new method works". The key instead says A "treats the one-tailed p-value as if the test is two-tailed" and in the next sentence that a two-tailed test with z = 2.10 gives 0.036. For Teacher B the key says the two-tailed p "would become 0.072" and be non-significant; in fact B mislabels 0.036 as one-tailed (it is 0.01...
- [blocking] docs/semester-2/gqur-301/unit-15/unit-assessment.mdx, RRQ 10 model answer: "1 - (0.95 x 0.05) ~ 0.0975" evaluates to 0.9525; the correct expression is 1 - 0.95^2 = 1 - 0.9025 = 0.0975 (independent tests). A learner who copies the printed working gets a probability above 0.95. Repair: write 1 - 0.95 x 0.95 = 0.0975.
- [blocking] Citations in docs/semester-2/gqur-301/unit-15/topic-01.mdx, topic-02.mdx, topic-03.mdx (Further reading and in-text locators): 6 of 9 deep links are broken or point to unrelated pages (see crew-20261023/source-inspection.md). Lane more_studies/hypothesis_testing.html, _z.html, _t.html return 404; OpenStax /9-3-single-mean-and-known-standard-deviation and /9-4-single-mean-and-unknown-standard-deviation return 404 (z and t conditions are both in 9.3 "Probability Distribution Needed for Hypothesis Testing"; 9.4 is "Rare Events..."); OpenStax "Section 9.2" is cited for the p-value and tail rule...
- [advisory] docs/semester-2/gqur-301/unit-15/topic-02.mdx Summative task: "A teacher's class of 44 pairs pupils" is garbled (delete "pairs"). Note for the marker: z = 1.66, one-tailed p = 0.0486, so the decision flips if a learner chooses alpha = 0.01; the rubric should accept a decision consistent with the learner's stated alpha.
- [advisory] docs/semester-2/gqur-301/unit-15/unit-assessment.mdx ERQ 5 key: "a class 1 marks above average" (grammar: "1 mark"); and "Contrast the z and t critical values for the same df" in unit-teacher-notes.mdx misconception table implies z has degrees of freedom (say "for the same sample size").
- [advisory] Rounding: docs/semester-2/gqur-301/unit-15/topic-03.mdx worked example t = 4/1.9365 = 2.07 unrounded (text 2.06 via the rounded SE; p 0.058 either way); RRQ 5 key t = 2.23 vs unrounded 2.236. Repair: state that either rounding route earns full marks, or compute from unrounded SE.
- [advisory] docs/semester-2/gqur-301/unit-15/unit-assessment.mdx RRQ 7 is labelled (Apply) but asks learners to state three conditions from Topic 15.2, which is recall (Remember), below the RRQ Understand-Analyze band. Repair: give a scenario and ask whether each condition holds.
- [advisory] docs/semester-2/gqur-301/unit-15/unit-assessment.mdx RRQ 10 and ERQ 5 assess false-alarm inflation across many tests (and ERQ 5's Band 3 requires effect sizes and multiple-comparison handling), but Topics 15.1-15.3 never teach multiple testing or effect size. Repair: add a short passage (for example in Topic 15.1 Step 2 or Topic 15.2 "What reject really means") or relax the rubric.
- [uncertain] Rendered accessibility unverified: the crew brief prohibits build, dev server and Playwright, so no 360px, keyboard or A4 print inspection and no page image exist (crew-20261023/render-limitation.md). Glyph overflow in fig-U15-1 was not measured. A fresh authorised render session must inspect all pages and all six figures in both themes after F1 is repaired.
- [uncertain] Sources: the frozen bundle binds no Unit 15 source passage; support was checked against live pages fetched 2026-10-23 that are not bound inputs. A new bundle should bind OpenStax 9.1/9.3, Lane 11 (Significance Testing) and 12 (single mean) and the correct NIST sections.
- [uncertain] Authority/provenance: specs/content/gqur-301/tasks.md shows Unit 15 G1 unit-spec open ("intake re-evaluation advised (D-2026-0070)"); no G1 approval binds this unit spec. The guide (2nd 2026.txt lines 519-522: 15.1 Concept of Hypothesis Testing, 15.2 z-test, 15.3 t-test) matches the spec. Author identity is taken from commits e9cb5127 and b66bd105 ("crew: gqur-301-u15-author (author, opencode)"); no exact author model version was supplied.

## Notes from earlier jobs on this unit
- (gqur-301-u15-figures, figures, claude) Urdu labels in fig-U15-1 to fig-U15-6 were only checked by font measurement, not in a browser; run `scripts/measure-figure-text.mjs` and do a G5 read. The glossary has no Urdu statistics terms, so "نارمل منحنی" and "فیصلہ کن قدر" are unconfirmed.
- (gqur-301-u15-figures, figures, claude) The fig-U15-2 and fig-U15-3 fixes are figure-only. The G3 findings on the ERQ 2 and RRQ 10 keys, the 6 broken citation links and sources/unit-15.md are still open for the author repair.
- (gqur-301-u15-review_en, review_en, claude) The author repair must add SVGs for fig-U15-2 to fig-U15-6, or turn them back into FIGURE markers, because `check:figures` passes even though the files are missing.
- (gqur-301-u15-review_en, review_en, claude) Fix fig-U15-3 to match the z = 1.84 right-tailed reject, fix the fig-U15-2 alt text (75 is inside the 75.31 cutoff), and rewrite the ERQ 2 and RRQ 10 keys.
- (gqur-301-u15-review_en, review_en, claude) Replace the 6 broken citation links with real pages (e.g. onlinestatbook.com/2/logic_of_hypothesis_testing/significance.html, /2/tests_of_means/single_mean.html, OpenStax 9.3), correct sources/unit-15.md, and store the source passages so the next review can check them offline.

## Response snapshot

Applied the G3 findings to GQUR-301 Unit 15 in English and Urdu: rewrote the ERQ 2 key and RRQ 10 working, replaced six broken citation links with verified pages, fixed the garbled Ghotki class size, the ERQ 5 grammar and the teacher-notes df wording, stated both rounding routes, turned RRQ 7 into a scenario, added a multiple-testing and effect-size passage, corrected sources/unit-15.md and bound new reading notes, and refreshed the G2 evidence.

## Outcome

- ✅ Impact: Every blocking and advisory finding from the 2026-11-02 G3 report is resolved in the English source and mirrored into the Urdu translation; the uncertain findings are recorded for the evaluator.
- 🧪 Tests: `npm run check:content` passes all 14 content gates after the content-status and G2 evidence refresh.
- 📁 Files: English and Urdu topic/assessment/teacher-notes, sources/unit-15.md, three new bound reading notes, tracker row and refreshed G2 evidence.
- 🔁 Next prompts: Fresh independent G3 review; G5 Urdu review after G4.
- 🧠 Reflection: The G3 report's F1 was already resolved by the figures job; the remaining defects were concentrated in the assessment keys and the citation locators.

## Handoff (for CEO and agents)

- Shipped / changed: G3 finding repairs for GQUR-301 Unit 15 (EN + UR), corrected source locators and bound reading notes, refreshed G2 evidence.
- Decisions the team must respect: G3 stays open and unticked (ADR-0019); no reviewer initials or self-certification were used. The uncertain findings (rendered accessibility, G1 authority, source bundle provenance) are not author-repairable.
- Pending / next owner: crew lead owns the fresh independent G3 review; a qualified reviewer must inspect the rendered pages and figures in both themes.
- Paperclip issues affected: GQUR-301 Unit 15; no linked issue.

## Evaluation notes (flywheel)

- Failure modes observed: The G3 report's F1 was stale (the figures job had already added the SVGs); the remaining findings were real and are now fixed.
- Graders run and results (PASS/FAIL): `npm run check:content` PASS (14/14).
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
