---
id: crew-giss-401-u05-repair_en
title: crew repair_en GISS-401 unit 5
stage: misc
date: 2026-11-10
surface: agent
model: opencode
feature: giss-401
branch: crew/giss-401-u05-repair_en
user: crew
command: crew repair_en
labels: ["crew", "opencode", "repair_en"]
links:
  spec: specs/content/giss-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/giss-401/unit-05/index.mdx
 - docs/semester-3/giss-401/unit-05/topic-01.mdx
 - docs/semester-3/giss-401/unit-05/topic-02.mdx
 - docs/semester-3/giss-401/unit-05/unit-assessment.mdx
 - specs/content/giss-401/authoring/unit-05.md
 - specs/content/giss-401/concepts/unit-05.md
 - specs/content/giss-401/coverage/unit-05.md
 - specs/content/giss-401/reviews/unit-05/G2/20261110T045015770Z-gates.json
 - specs/content/giss-401/reviews/unit-05/G2/logs-20261110T045015770Z/check-bloom-bands.txt
 - specs/content/giss-401/reviews/unit-05/G2/logs-20261110T045015770Z/check-concept-graph.txt
 - specs/content/giss-401/reviews/unit-05/G2/logs-20261110T045015770Z/check-depth-gate.txt
 - specs/content/giss-401/reviews/unit-05/G2/logs-20261110T045015770Z/check-docs-sync.txt
 - specs/content/giss-401/reviews/unit-05/G2/logs-20261110T045015770Z/check-figures.txt
 - specs/content/giss-401/reviews/unit-05/G2/logs-20261110T045015770Z/check-no-answer-keys.txt
 - specs/content/giss-401/reviews/unit-05/G2/logs-20261110T045015770Z/check-no-em-dash.txt
 - specs/content/giss-401/reviews/unit-05/G2/logs-20261110T045015770Z/validate-content.txt
 - specs/content/giss-401/sources/unit-05.md
 - specs/content/giss-401/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job giss-401-u05-repair_en

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/giss-401-u05-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/giss-401/reviews/unit-05/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 5 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GISS-401 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/giss-401/`, and `static/img/figures/giss-401/unit-05/`.

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
From `specs/content/giss-401/reviews/unit-05/G3/20261108T203238Z-g3-desk-922808a1.json` (disposition: revise). Resolve each one:
- [blocking] Prepared manifest omits cited quran-translation, rahman-2020-zakat and abdel-salam-2015-democracy source-text files. Their contents cannot silently serve as accepted authority. sources/unit-05.md also lacks an Unverifiable sources declaration. Host must bind actual texts and verify passages; do not equate citation metadata with support.
- [blocking] topic-01.mdx:51,61,67,97,111,151,153 and topic-02.mdx scriptural/hadith/legal block quotations exceed the style-guide Citation format limit of under 15 words. sources/unit-05.md introductory claim that quotations are under 15 words is contradicted by these blocks. Paraphrase or use compliant short quotations, preserve accurate citations and name the translation.
- [blocking] topic-01.mdx:170-171 distinguishes Mudarabah and Musharakah losses, but unit-assessment.mdx:179 RRQ-05 model collapses them into a shared capital-contribution rule. Teach and assess the distinction explicitly, including manager misconduct exceptions. Topic 5.1 check 3 also equates high pricing with hoarding without stating withholding or artificial scarcity.
- [blocking] topic-01.mdx:160 and unit-assessment.mdx RRQ-05 / ERQ-01 rubric assert risk-free lender gains and transfer of all risk. Distinguish contractual repayment obligations, operational risk and non-payment risk; qualify poverty/growth claims instead of treating desired economic outcomes as guarantees. Have the scholar verify the doctrinal formulation separately.
- [blocking] topic-02.mdx Constitutional protections subsection adds grounds of discrimination not present in the bound Article 25(1) excerpt and treats Article 36 as an unqualified binding right without the Principles of Policy distinction. Its scheduling activity and MCQ-09 overstate what Articles 22/20 directly say. Bind precise applicable provisions, preserve qualifications, distinguish legal text from inclusion policy, and verify the dated Article 38(f) against the intended historical/current scope.
- [blocking] topic-02.mdx Rule of law / Institutional accountability / Charter subsections narrate detailed Ali and Umar stories and the world-first-constitution claim without specific supporting historical sources. MCQ-08, RRQ-09 and ERQ-03 then assess these as established fact. Supply verified passage-level historical support and qualify contested versions; otherwise replace with explicitly hypothetical illustrations.
- [blocking] topic-01.mdx Explanation, topic-02.mdx:85 and RRQ-02 marking guidance present secular property/democracy as universally unconstrained. The contrast omits constitutional restrictions and scholarly variation. Present attributed positions and allow supported alternatives; do not make a caricature the condition for marks.
- [blocking] Both topic explanations and assessment prompts exceed the HSC plain-language target: undefined or heavily compressed expressions include utility maximization, macroeconomic circulation, statutory levy, executive despotism and maslahah mursalah. Rewrite into short explanations with concrete examples; verify glossary support rather than assuming transliteration defines a term.
- [blocking] concepts/unit-05.md:7-14 maps several unrelated items: CON-5-2 cites MCQ-02 (hoarding, not trusteeship), CON-5-3 cites RRQ-03 (adulteration, not Zakat), CON-5-4 cites MCQ-05 (interest, not Zakat/Sadaqah), CON-5-5 cites MCQ-04 (Zakat, not riba), CON-5-8 cites MCQ-09 (festival rights, not accountability). Audit every derived link against the actual numbered bank, retaining stable concept IDs.
- [advisory] topic-01.mdx:192 calls the invented Larkana activity authentic although sources/unit-05.md says all vignettes are hypothetical. Label the cases consistently. Both practical policy tasks should state funding/authority limits and confidentiality safeguards for allocating aid and handling pupil complaints.
- [advisory] The guide has six leaf topics and both cycles teach and assess them; 10 MCQs, 10 RRQs and five 10-mark ERQs exist. Two topic cycles each have five retrieval items, above the spec stated 5-8 formative total; clarify which form the collected formative set. Some Remember/Apply labels describe explanation rather than the actual thinking demanded. Review these with the blueprint instead of editing tags mechanically.
- [uncertain] Parent-prepared bundle and actual author run identity were not supplied; model deployment version is unavailable. The diagnostic preparation cannot establish the full independent handoff. See evidence limitations.md. Host must supply genuine provenance and a frozen source bundle.
- [uncertain] Required actual narrow-screen and A4 print inspection and SVG glyph geometry are unavailable because the crew brief bars browser runs. No visual pass is claimed. Arrange a permitted rendering session on the exact new bundle.
- [uncertain] content-spec.md:404 requires qualified Islamic Studies scholar review beyond a general reviewer. It has not been supplied. The owner must arrange this before doctrinal/law claims can be cleared.

## Notes from earlier jobs on this unit
- (giss-401-u05-translate, translate, codex) English author must repair G3 findings before translation resumes; G4/G5 remain open and translation_status remains draft.
- (giss-401-u05-translate, translate, codex) English author must repair G3 findings before translation resumes; G4/G5 remain open and translation_status remains draft.
- (giss-401-u05-review_en, review_en, codex) Author repairs and corrected source binding, authentic provenance, scholar review, and browser/print inspection remain pending.
- (giss-401-u05-review_en, review_en, codex) Author repairs and corrected source binding, authentic provenance, scholar review, and browser/print inspection remain pending.
- (giss-401-u05-author-conflict5, fix, opencode) Unit 5 G3 English review and G4/G5 Urdu translation remain open downstream jobs; no G3/G5 row is marked done.


## Response snapshot

Applied the G3 findings to GISS-401 Unit 5 English (quotation lengths, Mudarabah/Musharakah loss rules, risk and poverty qualifications, constitutional accuracy, historical-account labelling, secular caricature removal, plain language, concept-item audit, hypothetical labels with funding/authority/confidentiality limits, and formative-set clarification), added the Unverifiable sources declaration, refreshed the G2 gate evidence, and appended the advisory repair tracker row with G3 left unticked.

## Outcome

- Impact: repair_en for GISS-401 Unit 5 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 18 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Applied the G3 findings to GISS-401 Unit 5 English (quotation lengths, Mudarabah/Musharakah loss rules, risk and poverty qualifications, constitutional accuracy, historical-account labelling, secular caricature removal, plain language, concept-item audit, hypothetical labels with funding/authority/confidentiality limits, and formative-set clarification), added the Unverifiable sources declaration, refreshed the G2 gate evidence, and appended the advisory repair tracker row with G3 left unticked.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The three cited source texts (quran-translation, rahman-2020-zakat, abdel-salam-2015-democracy) are still absent from review manifests because `scripts/lib/review-evidence.mjs`'s citation-key regex does not capture keys with a suffix after the year or keys without a year; a host fix and fresh bundle are required.
  - G3 remains open and unsigned; genuine author-run provenance, a permitted narrow-screen/A4 render inspection with SVG glyph geometry, and the qualified Islamic Studies scholar review required by content-spec drafting note 2 are all still pending.
  - No Urdu mirror exists for Unit 5; G4/G5 remain downstream jobs and `translation_status` stays draft.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
