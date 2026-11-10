---
id: crew-efmp-407-u05-repair_en
title: crew repair_en EFMP-407 unit 5
stage: misc
date: 2026-11-10
surface: agent
model: opencode
feature: efmp-407
branch: crew/efmp-407-u05-repair_en
user: crew
command: crew repair_en
labels: ["crew", "opencode", "repair_en"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/efmp-407/crew-efmp-407-u05-repair_en.misc.prompt.md
  - docs/semester-3/efmp-407/unit-05/topic-01.mdx
  - docs/semester-3/efmp-407/unit-05/topic-02.mdx
  - docs/semester-3/efmp-407/unit-05/topic-03.mdx
  - docs/semester-3/efmp-407/unit-05/unit-assessment.mdx
  - specs/content/efmp-407/authoring/unit-05.md
  - specs/content/efmp-407/coverage/unit-05.md
  - specs/content/efmp-407/sources/texts/iucn-pakistan-2004-tek.md
  - specs/content/efmp-407/sources/texts/munir-2021-glacier-grafting.md
  - specs/content/efmp-407/sources/unit-05.md
  - specs/content/efmp-407/tasks.md
  - specs/content/efmp-407/translation/unit-05.md
tests:
  - npm run check:content
---

## Prompt

# Crew job efmp-407-u05-repair_en

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u05-repair_en`.
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
- (efmp-407-u05-illustrate, illustrate, agy) Placed banner fig-U5-7.webp in English unit index; Urdu placement awaits the missing translation mirror with draft alt text recorded in unit-05.illustration-notes.md.
- (efmp-407-u05-illustrate, illustrate, agy) Refreshed stale G2 gate evidence to 20261108T130249567Z-gates.json with all 14 content gates passing cleanly.
- (efmp-407-u05-illustrate, illustrate, agy) Independent G3 English review and G5 Urdu review remain open and uncertified.
- (efmp-407-u05-translate, translate, codex) English author must repair F1 and resolve F2 before translation resumes.
- (efmp-407-u05-translate, translate, codex) English author must repair F1 and resolve F2 before translation resumes.

## Feedback from the previous attempt
the worker exited without committing any change

## Response snapshot

Repaired every open G3 finding in scope. F1: re-sourced the glacier-grafting claim to Munir et al. (2021), a peer-reviewed open-access source verified through Crossref (DOI 10.3390/su13095208), and declared the IUCN Pakistan (2004) row under `## Unverifiable sources` with the retrieval attempts, date and owner authorisation D-2026-0001; removed the in-text IUCN citations. F2: reworded the two per-topic `## Check your understanding` items tagged `*(Analyze)*` to the approved `Remember/Understand/Apply` band. F3: softened the Karez crisis numbers and place names to the bound Kahlown & Hamilton excerpt. F4: changed the UNESCO attribution and related prose from "concentric" to "interconnected". F5: removed the Purvis et al. (2019) citation from the social-justice definition. F6: added a standalone peace-education definition. Appended an unticked Unit 5 G3 advisory-repair tracker row naming report 20261108T203238Z-g3-desk-7b51d549. Refreshed the stale G2 gate evidence and repointed the tracker row.

## Outcome

- Impact: repair_en for EFMP-407 Unit 5 by opencode.
- Tests: npm run check:content 14/14 PASS.
- Files: 13 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: re-sourced glacier grafting to Munir et al. (2021); declared IUCN Pakistan (2004) under `## Unverifiable sources` per D-2026-0001; reworded the two formative items to Apply; softened the Karez crisis claims; changed "concentric" to "interconnected"; removed the Purvis attribution; added a peace-education definition; refreshed the G2 gate evidence; appended the unticked G3 advisory-repair tracker row.
- Decisions the team must respect: G3/G5 stay advisory/open until a qualified sign-off; this branch does not certify anything. The IUCN Pakistan (2004) row is cited by reference only and no prose claim rests on it.
- Pending / next owner: fresh independent G3 review owns acceptance of the repairs; independent G5 owns the Urdu mirror and rendered inspection.
- Notes for the next job on this unit:
  - Narrow 360px and A4 print render inspection remains undone; it needs a host allowed to build and run a browser.
  - The glacier-grafting paragraph is deliberately framed at the level Munir et al. (2021)'s abstract supports; a fresh reviewer may check the full text for the ice-combination mechanics.
  - `static/content-status.json` is gitignored and must be regenerated locally after tracker edits.
- Paperclip issues affected: none (ticket null).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS (14/14)
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
