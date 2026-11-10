---
id: crew-efmp-407-u05-repair_en-r1
title: crew repair_en EFMP-407 unit 5 (r1 branch)
stage: misc
date: 2026-11-10
surface: agent
model: opencode
feature: efmp-407
branch: crew/efmp-407-u05-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "opencode", "repair_en"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/efmp-407/crew-efmp-407-u05-repair_en-r1.misc.prompt.md
  - specs/content/efmp-407/tasks.md
tests:
  - npm run check:content
---

## Prompt

# Crew job efmp-407-u05-repair_en-r1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u05-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/efmp-407/reviews/unit-05/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 5 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-407 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-407/`, and `static/img/figures/efmp-407/unit-05/`.

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
From `specs/content/efmp-407/reviews/unit-05/G3/20261108T203238Z-g3-desk-7b51d549.json` (disposition: revise). Resolve each one:
- [blocking] Inherited from specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en/crew-efmp-407-u05-review_en.json, not resolved: The IUCN Pakistan 2004 citation URL resolves to an unrelated Tanzania report and the cited title could not be located. The glacier-grafting claim it carries is not in the bound excerpt. Repair the citation to a verifiable source, or declare the source under `## Unverifiable sources` with the retrieval attempts, date and owner authorisation.
- [advisory] Inherited from specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en/crew-efmp-407-u05-review_en.json, not resolved: The specific Karez crisis numbers and place names (thousands of tube-wells, Quetta/Mastung/Pishin, dozens of metres, village migration) and the "kash"/"punn" rangeland terms are not in the bound excerpts and could not be independently verified.
- [advisory] Inherited from specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en/crew-efmp-407-u05-review_en.json, not resolved: topic-02 says UNESCO (2020) "models the inclusive classroom across three concentric dimensions"; the bound excerpt says "three interconnected dimensions". The word "concentric" is the unit framing, not the source wording.
- [advisory] Inherited from specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en/crew-efmp-407-u05-review_en.json, not resolved: topic-01 cites Purvis et al. (2019) for a social-justice definition that the bound Purvis excerpt does not contain.
- [advisory] Inherited from specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en/crew-efmp-407-u05-review_en.json, not resolved: "Peace education" is used without a standalone definition; the unit defines negative and positive peace instead.
- [advisory] Inherited from specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en/crew-efmp-407-u05-review_en.json, not resolved: No live browser render of the reviewed pages was possible: the brief prohibits build, dev server and Playwright, and no Chrome is available to the browser MCP. Figure rasters and static layout checks stand in for it.
- [advisory] All 100 bound digests match prior review; continuation preserves unresolved findings and escalates without repeating a full semantic review or independently solving the unchanged bank. New author repairs and a fresh review bundle are required.
- [uncertain] Inherited from specs/content/efmp-407/reviews/unit-05/G3/crew-efmp-407-u05-review_en/crew-efmp-407-u05-review_en.json, not resolved: topic-02 and topic-03 `## Check your understanding` item 3 are tagged `*(Analyze)*`, above the approved formative band `Remember/Understand/Apply` (content-spec.md:286; style-guide.md:237). The labels match the actual demand, so either reword the items to the band or record an owner ruling that the band extends.
- [uncertain] Mandatory fresh narrow-screen and A4 print render inspection cannot run under the crew brief. Prior figure rasters/static checks do not verify page presentation. Accessibility remains unverified.
- [uncertain] No parent-prepared frozen handoff or actual author runtime identity supplied. Recorded author_run_id is the authoring job label only. Exact deployed model version is unavailable. Do not infer verified provenance or qualification.

## Notes from earlier jobs on this unit
- (efmp-407-u05-repair_en, repair_en, opencode) Narrow-screen and A4 print render inspection remains undone (crew brief blocks build/browser); accessibility is unverified.
- (efmp-407-u05-repair_en, repair_en, opencode) The glacier-grafting paragraph is framed at the level Munir et al. (2021)'s abstract supports; a fresh reviewer should check the full text for the ice-combination mechanics.
- (efmp-407-u05-repair_en, repair_en, opencode) G3/G5 stay open and unsigned; a fresh independent review bundle is required after these repairs.
- (efmp-407-u05-illustrate, illustrate, agy) Placed banner fig-U5-7.webp in English unit index; Urdu placement awaits the missing translation mirror with draft alt text recorded in unit-05.illustration-notes.md.
- (efmp-407-u05-illustrate, illustrate, agy) Refreshed stale G2 gate evidence to 20261108T130249567Z-gates.json with all 14 content gates passing cleanly.

## Response snapshot

Verified every open finding from the latest G3 desk report against the branch state and found F1-F6 already repaired on main by the earlier `efmp-407-u05-repair_en` job: the glacier-grafting claim is re-sourced to Munir et al. (2021) with IUCN Pakistan (2004) declared under `## Unverifiable sources` per D-2026-0001, the two per-topic retrieval items are reworded to the Apply band, the Karez specifics are removed, the "concentric" wording is corrected, the Purvis attribution is removed, and a standalone peace-education definition is added. No further content edit was needed. Appended the unticked Unit 5 G3 advisory-repair tracker row naming report 20261108T203238Z-g3-desk-7b51d549.

## Outcome

- Impact: repair_en for EFMP-407 Unit 5 by opencode (r1 branch).
- Tests: npm run check:content passed all 14 content gates.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Verified the earlier repair job's F1-F6 fixes on main and appended the unticked Unit 5 G3 advisory-repair tracker row naming report 20261108T203238Z-g3-desk-7b51d549.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this commit does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Narrow-screen and A4 print render inspection remains undone (crew brief blocks build/browser); accessibility is unverified.
  - The glacier-grafting paragraph is framed at the level Munir et al. (2021)'s abstract supports; a fresh reviewer should check the full text for the ice-combination mechanics.
  - G3/G5 stay open and unsigned; a fresh independent review bundle is required after these repairs.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
