---
id: 0137
title: EFMP-305 Unit 3 authored; stale worktree corrected
stage: misc
date: 2026-10-15
surface: agent
model: claude-opus-5
feature: efmp-305
branch: agent/TEX-39
user: channayousif
command: paperclip heartbeat (BilingualAuthor, TEX-69)
labels: ["BilingualAuthor", "efmp-305", "G2", "authoring", "citations", "stale-worktree"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: TEX-69
  adr: null
  pr: "119"
files:
 - docs/semester-2/efmp-305/unit-03/index.mdx
 - docs/semester-2/efmp-305/unit-03/topic-01.mdx
 - docs/semester-2/efmp-305/unit-03/topic-02.mdx
 - docs/semester-2/efmp-305/unit-03/topic-03.mdx
 - docs/semester-2/efmp-305/unit-03/unit-assessment.mdx
 - docs/semester-2/efmp-305/unit-03/unit-teacher-notes.mdx
 - specs/content/efmp-305/coverage/unit-03.md
 - specs/content/efmp-305/sources/unit-03.md
 - specs/content/efmp-305/concepts/unit-03.md
 - specs/content/efmp-305/figures/unit-03.md
 - specs/content/efmp-305/tasks.md
 - docs/semester-2/efmp-305/unit-01/topic-02.mdx
 - docs/semester-2/efmp-305/unit-01/unit-assessment.mdx
 - docs/semester-2/efmp-305/unit-02/topic-01.mdx
 - docs/semester-2/efmp-305/unit-02/topic-02.mdx
 - docs/semester-2/efmp-305/unit-02/unit-assessment.mdx
 - glossary.json
 - specs/decisions/log.md
tests:
 - npm run check:depth-gate (PASS)
 - npm run check:concept-graph (PASS)
 - npm run validate:content (PASS)
 - npm run check:bloom-bands (PASS)
 - npm run check:source-floor (PASS)
 - npm run check:no-em-dash (PASS)
 - npm run check:no-answer-keys (PASS)
 - scripts/heavy.sh npm run build (PASS, both en and ur locales)
 - npm run check:figures (10 EFMP-305 prompt-only findings, expected until G6)
 - Crossref REST API metadata and licence lookups, 2026-10-15
---

## Prompt

Paperclip heartbeat on TEX-69, "TEX-58: (resume of TEX-39) EFMP-305 Inclusive Education - full
authoring". Brief: rebase `agent/TEX-39` on origin/main; verify EN units 1-2 against style guide
v4.6 and author units 3-6; generate figures; Urdu mirror for all six units; run
`npm run check:content`; hand to Reviewer for G3/G5. Two earlier runs on this issue died on
provider session limits having done nothing.

## Response snapshot

### The mistake worth recording first

I read EFMP-305's content spec out of the long-lived worktree at `.claude/worktrees/TEX-39`,
which was parked at `bc61ff7a` from 2026-10-10. It said `status: draft`, so I concluded the brief
was wrong, posted that finding to Paperclip, and spent the first half of the run doing a full G1
author-repair pass against the stale tree.

`origin/agent/TEX-39` was **six commits ahead** of that worktree, and those commits were exactly
the ones that settled it: two further intakes (`intake-2/` under `D-2026-0054`, `intake-3/` under
`D-2026-0065`) and the owner's confirmation setting `status: approved`. The brief was right.

I had run `git fetch` before reading - but then read the checked-out tree instead of the fetched
ref. The stale-checkout rule already written down for the main checkout applies just as hard to a
worktree that has been sitting for five days. **Check `git log HEAD..origin/<branch>` before
trusting a worktree's content, not just `git fetch`.**

That repair commit (`bf28322d`) was discarded, not pushed. Most of it duplicated the board's
`76659f21`, including all three DOI corrections, which the board had already made on 2026-10-10.

### What survived the correction

Three defects I had found were genuinely still present on the real branch and are now fixed
(commit `8e4ccc40`):

1. **Thirteen Bloom tags spelled `*(Analyse)*`.** `check:bloom-bands` matches a fixed taxonomy
   vocabulary containing `Analyze`, so each of those items read to the gate as carrying no Bloom
   tag. The gate did not fail only because the approved spec's blueprint is prose ("10 MCQ / 10
   RRQ / 5 ERQ") rather than a parseable band, making the band check vacuous for this course.
2. **`hornby2014` miscited and unregistered.** Cited in `unit-02/topic-01.mdx` as "Inclusive
   special education: Empowering mainstream schools to be more inclusive, Routledge"; Crossref
   records it as *Inclusive Special Education*, Springer New York,
   `10.1007/978-1-4939-1483-8`. Citation corrected. It remains registered in neither
   `sources/unit-02.md` nor `coverage/unit-02.md` - both are **bound inputs to the approved
   `D-2026-0065` manifest**, so registering the key there would re-open the approval. Reported to
   the owner instead.
3. **A citation corrupted mid-sentence**, `unit-02/topic-02.mdx:183`: "(7th Routledge."

### Unit 3 authored

With approval confirmed, authoring was legitimately unblocked. **Unit 3, Inclusive Teaching
Strategies**, drafted complete (commit `0821ff90`): six MDX files at 176 reading-minutes inside
the spec's 150-180 band, plus `coverage/`, `sources/`, `concepts/` (18 concepts) and `figures/`
(6 figures, prompt-only).

Pedagogically it is built on one lesson - Grade 6 photosynthesis, 51 pupils, one blackboard -
carried through all three topics: taught plain, then differentiated, then restructured with
cooperative learning and adapted assessment, then rebuilt as a complete plan under a six-decision
planning order. Every example sits in a class of 40-60 with fixed benches and no teaching
assistant, and the large-class time objection is answered with actual arithmetic (about 20 minutes
extra planning the first time, about 5 thereafter) rather than encouragement.

Sources: two Crossref-verified **open-access** bindings (`subandiyah2025`, Cogent Education, CC BY
4.0; `serman2026`, JIRPE, CC BY-SA 4.0), two Crossref-verified subscription works, and
`cast2024`. Verification was **metadata and licence only** and the record says so; no full text
was retrieved. Scope cautions are written in: `subandiyah2025` studies Indonesian-language
teaching and is cited for the mechanism, never for a claim about Pakistani classrooms;
`serman2026` is one small primary-mathematics study cited as illustration, never as an effect
size. **The unit deliberately claims no effect size anywhere.**

### Remaining work decomposed

Units 4-6, figures and the Urdu mirror are far more than one heartbeat, and two runs had already
been lost to session limits, so the remainder is now five child issues with self-contained briefs
rather than a plan held in one agent's head.

## Outcome

- Impact: Unit 3 complete and building in both locales; three citation/tag defects out of units
  1-2; the remaining course decomposed into five actionable issues.
- Tests: 7 content gates pass; `npm run build` passes for `en` and `ur`; `check:figures`
  reports only the expected prompt-only findings.
- Files: 11 new or changed for Unit 3, 5 fixed in units 1-2, plus two merge-conflict files.
- Next prompts: TEX-76 (Unit 4), TEX-77 (Unit 5), TEX-78 (Unit 6), TEX-79 (figures), TEX-80
  (Urdu).
- Reflection: the expensive error was trusting a five-day-old worktree after fetching. The
  cheap safeguard - one `git log HEAD..origin/<branch>` - would have saved half the run.

## Handoff (for CEO and agents)

- Shipped / changed: `agent/TEX-39` (PR #119) advanced to `0821ff90`: merge of main (level with
  main, style guide v4.6), three defect fixes in EFMP-305 units 1-2, and EFMP-305 Unit 3 authored
  complete in English with all four governance files.
- Decisions the team must respect:
  - **EFMP-305's content spec is `approved` (`D-2026-0065`, owner-confirmed). Authoring is
    unblocked.** Any brief or tracker note still saying `draft` is stale; the tracker preamble
    said so and has been corrected.
  - **`content-spec.md`, and units 1-2's `coverage/`, `sources/`, `concepts/` and `figures/`, are
    bound inputs to the `D-2026-0065` intake manifest. Do not edit them.** Editing re-opens the
    approval. Units 3-6's equivalents are not bound.
  - The statute taught is the **Sindh Empowerment of Persons with Disabilities Act 2018**, with
    the federal ICT Act 2020 for comparison only (`D-2026-0053` item 7). Applied in units 1-3.
  - The G1 tracker rows stay not-started: `D-2026-0065` makes them supportable, but setting a G1
    row is the evaluator's act, which is what `G-2026-76` was raised about. The author does not
    move them.
  - Bloom tags must be spelled `Analyze`. `Analyse` is invisible to `check:bloom-bands`.
- Pending / next owner:
  - **BilingualAuthor:** TEX-76 Unit 4 EN, TEX-77 Unit 5 EN, TEX-78 Unit 6 EN, TEX-79 G6
    figures (all units), TEX-80 G4 Urdu mirror (blocked on 76-78).
  - **Curriculum owner, two items.** (a) `hornby2014` is cited in Unit 2 prose but registered in
    no bound governance file; registering it requires a bound-input edit and therefore a decision.
    Same class as TEX-68. (b) Nine Urdu terminology pairs introduced by Unit 3's concept graph
    need banking in `terminology.csv` - the **accommodation / modification** pair most of all,
    since Units 3 and 5 both turn on the distinction. Listed in TEX-80.
  - **Advisory, not acted on:** units 1, 2 and 4 carry two topics each where the rest of the
    corpus runs three to five, which also caps those units at four figures under Art. III.10. The
    approved spec also runs units 3-6 at 120-180 reading-min against 40-70 for units 1-2 - a
    factor of three per teaching week inside one course. Both are approved G1 decisions, so this
    run changed neither; raising them is a curriculum call.
  - **Reviewer (agy/Gemini):** G3 on units 1-3 EN once the owner is ready. Not startable by
    BilingualAuthor - ADR-0019 engine independence.
- Paperclip issues affected: TEX-69 (this, now blocked on its five children), TEX-76 to TEX-80
  (new), parent TEX-58, TEX-61 (the repo-wide figure debt, untouched), TEX-68 (same defect class
  as the `hornby2014` registration gap).

## Evaluation notes (flywheel)

- Failure modes observed: (1) a long-lived agent worktree five days stale, read after `git fetch`
  but without comparing to the fetched ref, producing a confident and wrong "the spec is not
  approved" finding; (2) two consecutive runs lost entirely to provider session limits with no
  durable progress, which is why this run committed and pushed after each completed artefact
  rather than at the end.
- Graders run and results (PASS/FAIL): depth-gate PASS, concept-graph PASS, validate:content
  PASS, bloom-bands PASS, source-floor PASS, no-em-dash PASS, no-answer-keys PASS, build PASS
  (en + ur), figures FAIL (expected, prompt-only).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): make the heartbeat's first repository action
  `git log --oneline HEAD..origin/<branch>` in any reused worktree, and treat a non-empty result
  as a hard stop before reading content.
