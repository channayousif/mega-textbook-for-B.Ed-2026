---
id: crew-geng-301-u06-repair_en-r1
title: crew repair_en GENG-301 unit 6
stage: misc
date: 2026-11-10
surface: agent
model: agy
feature: geng-301
branch: crew/geng-301-u06-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "agy", "repair_en"]
links:
  spec: specs/content/geng-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/geng-301/crew-geng-301-u06-repair_en-r1.misc.prompt.md
 - specs/content/geng-301/reviews/unit-06/repair-en-r1.md
 - specs/content/geng-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job geng-301-u06-repair_en-r1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-301-u06-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/geng-301/reviews/unit-06/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 6 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GENG-301 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/geng-301/`, and `static/img/figures/geng-301/unit-06/`.

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
From `specs/content/geng-301/reviews/unit-06/G3/20261108T203238Z-g3-desk-80672f33.json` (disposition: revise). Resolve each one:
- [blocking] F1 sources: sources/unit-06.md Unverifiable sources lacks retrieval attempts, date and owner authorisation. topic-03 Activity quotes an unbound Channa (2023, p. 78) passage; Summative task quotes Johnson & Paine (2016, p. 215), unlike the recorded Johnson-Sheehan author name. Authenticate exact passages or explicitly label original fictional exercise data and repair attribution. Figure U6-7 repeats Channa. Do not treat supplemental source verification as verification of these quotations.
- [blocking] F2 coverage/pedagogy: topic-01 Finding credible sources lists source types without demonstrating library/database discovery. topic-02 APA vs MLA and Activity ask novices to create book references without a worked full APA/MLA reference. topic-03 Three integration techniques has no worked signal-phrase quotation integration. Add modelled discovery, full citation construction and introduced quotation examples before practice, as the approved worked-examples plan requires.
- [blocking] F3 assessment: unit-assessment RRQ-05 cannot uniquely distinguish paraphrase from summary without the source passage, yet guidance accepts only paraphrase. RRQ-10 infers four uncited references solely from two citation occurrences; grouped citations can name six sources. Supply original/source-linked evidence or accept justified alternatives. RRQ-03 invents a specific homework finding in its model without supplying supporting source text. Use sourced or explicitly hypothetical exercise data.
- [blocking] F4 assessment: approved blueprint requires >=2 MCQ and >=2 RRQ per topic. Topic 6.1 has only RRQ-02; provide a second source-evaluation RRQ. RRQ-02 is Remember despite the required Understand-Analyze RRQ band; ERQ-02 is Apply despite the required Analyze-Evaluate/Create ERQ band. Topic-02 formatting mini-rubric calls following APA conventions Analyze although it applies a format. Add actual analysis demand and align labels and marking criteria.
- [blocking] F5 pedagogy/sources: topic-01 Activity describes a 2015 post as having no date and presents an identifiable 2024 article without a title, extract or hypothetical label. CRAAP judgements require evidence rather than publisher status alone. ERQ-03 rubric preassigns credible/not credible ratings without source content for accuracy/relevance. Provide inspectable fictional or actual extracts and reward qualified judgements.
- [blocking] F6 figure meaning: fig-U6-8.svg Prevention column describes copying, synonym swaps, forgetting references and reuse. Rename/rewrite the column consistently with topic-04 prevention teaching and dark asset. fig-U6-2.svg No branch equates not learning from a source with common knowledge; distinguish personal original work, common knowledge and remembered borrowed ideas.
- [blocking] F7 sources/assessment: topic-04 Types of plagiarism claims mosaic plagiarism is most common among trainees with no inspected study, then ERQ-01 awards a mark for repeating it. Remove or evidence the prevalence claim and assess comparison using supplied cases. Qualify Intent does not matter so detection/attribution standards are not confused with intent-sensitive institutional sanctions.
- [advisory] F8 readability: four topics use short explanations, defined terms and feasible pair/practicum activities for B.Ed learners. Teacher notes prescribe four weeks while approved Unit 6 schedule is Week 16; align scheduling in a separate author repair. RRQ-02 guidance labels two marks but describes one mark for naming all five; specify partial-credit allocation.
- [uncertain] E1: Handoff provenance absent: no parent-prepared manifest or actual author session identity, reviewer session UUID or exact model build. Local clean-commit manifest is retained for audit only. Parent/host must supply provenance before acceptance.
- [uncertain] E2: accessibility: no fresh bound page/360px/A4 print renders supplied; brief prohibits build/dev server. Host must provide fresh render artifacts and inspection capability. Source-only checks cannot pass this criterion.

## Notes from earlier jobs on this unit
- (geng-301-u06-repair_en, repair_en, codex) G3 remains open; host provenance, SVG geometry and fresh render inspection are pending.
- (geng-301-u06-repair_en, repair_en, codex) G3 remains open; host provenance, SVG geometry and fresh render inspection are pending.
- (geng-301-u06-fix, fix, codex) G3 remains incomplete and explicitly stale; fresh independent review and outstanding author/provenance repairs remain pending.
- (geng-301-u06-fix, fix, codex) G3 remains incomplete and explicitly stale; fresh independent review and outstanding author/provenance repairs remain pending.
- (geng-301-u06-review_en-conflict1, fix, codex) Unit 6 author repairs and fresh provenance/render review remain pending; G3 stays incomplete.


## Response snapshot

Verified resolution of G3 desk findings F1-F8 for GENG-301 Unit 6, documented repairs in repair-en-r1.md, and recorded the advisory unticked G3 tracker row in tasks.md.

## Outcome

- Impact: repair_en for GENG-301 Unit 6 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 3 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Verified resolution of G3 desk findings F1-F8 for GENG-301 Unit 6, documented repairs in repair-en-r1.md, and recorded the advisory unticked G3 tracker row in tasks.md.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 remains open and unsigned pending fresh independent review and host-bound desktop/narrow/A4 render inspection.
  - All 16 unit-06 SVG assets pass measure-figure-text.mjs cleanly and G2 gate evidence remains valid at committed inputs.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
