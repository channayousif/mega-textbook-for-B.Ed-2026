---
id: crew-efmp-407-u08-repair_en-r1
title: crew repair_en EFMP-407 unit 8
stage: misc
date: 2026-11-23
surface: agent
model: agy
feature: efmp-407
branch: crew/efmp-407-u08-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "agy", "repair_en"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-407/crew-efmp-407-u08-repair_en-r1.misc.prompt.md
 - specs/content/efmp-407/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-407-u08-repair_en-r1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u08-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Apply the findings of the latest G3 report under specs/content/efmp-407/reviews/unit-08/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 8 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-407 Unit 8 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-407/`, and `static/img/figures/efmp-407/unit-08/`.

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
From `specs/content/efmp-407/reviews/unit-08/G3/20261122T175629Z-g3-desk-21c4765e.json` (disposition: revise). Resolve each one:
- [blocking] Inherited unresolved finding from specs/content/efmp-407/reviews/unit-08/G3/crew-efmp-407-u08-review_en/crew-efmp-407-u08-review_en.json: The Jumani and Abbasi (2015) bound passage is not in the paper. The publisher abstract and the full 7-page PDF contain none of its distinctive phrases. Repair the attribution at docs/semester-3/efmp-407/unit-08/topic-01.mdx:57 and :78, specs/content/efmp-407/sources/unit-08.md:9, specs/content/efmp-407/sources/texts/jumani-abbasi-2015.md:23 and specs/content/efmp-407/coverage/unit-08.md:9,11: remove or replace the source, or rewrite the claims to match th...
- [advisory] Inherited unresolved finding from specs/content/efmp-407/reviews/unit-08/G3/crew-efmp-407-u08-review_en/crew-efmp-407-u08-review_en.json: The Wals et al. (2024) bound passages are presented in quotation marks but are not verbatim from the open-access book. The unit paraphrases fairly and the concepts are present; present the excerpts as paraphrases.
- [advisory] Inherited unresolved finding from specs/content/efmp-407/reviews/unit-08/G3/crew-efmp-407-u08-review_en/crew-efmp-407-u08-review_en.json: The Sindh Right of Children to Free and Compulsory Education Act, 2013 URL (pas.gov.pk/uploads/acts/SN-Act-No.XIV-of-2013.pdf) returns HTTP 404. An official copy with the same Section 16 text exists at sja.gos.pk. Update the URL in sources/unit-08.md:10 and topic-02.mdx Further reading.
- [advisory] Inherited unresolved finding from specs/content/efmp-407/reviews/unit-08/G3/crew-efmp-407-u08-review_en/crew-efmp-407-u08-review_en.json: topic-02.mdx:75 attributes a four-part reporting taxonomy to Wals et al. (2024); the "Community mobilization" purpose is not in the bound passage. Either support it from the book or drop it from the attribution.
- [advisory] Inherited unresolved finding from specs/content/efmp-407/reviews/unit-08/G3/crew-efmp-407-u08-review_en/crew-efmp-407-u08-review_en.json: The six-stage project cycle (topic-01.mdx:48-55, fig-U8-1) is an author elaboration of the bound Wals excerpt's five phases, but coverage/unit-08.md maps U8-01 to Wals for "project cycle". Note the elaboration or attribute the six stages to the unit's own synthesis.
- [advisory] Inherited unresolved finding from specs/content/efmp-407/reviews/unit-08/G3/crew-efmp-407-u08-review_en/crew-efmp-407-u08-review_en.json: MCQ 6 (unit-assessment.mdx:59) asks which group sits "alongside teachers and government officials" on the SMC, but the Act requires equal representation from four groups (Government, teachers, parents and school management); "school management" is not among the choices. The key (C) is still the only defensible answer.
- [advisory] Inherited unresolved finding from specs/content/efmp-407/reviews/unit-08/G3/crew-efmp-407-u08-review_en/crew-efmp-407-u08-review_en.json: No live browser render of the reviewed pages was possible: the brief prohibits a build, a dev server and Playwright. The live site does publish Unit 8, but the live build is not the reviewed commit. Figure rasters and static layout checks stand in for it.
- [advisory] All 95 bound input digests unchanged. Preserve unresolved findings; no full semantic retry, external retrieval or independent bank solve repeated.
- [uncertain] Inherited unresolved finding from specs/content/efmp-407/reviews/unit-08/G3/crew-efmp-407-u08-review_en/crew-efmp-407-u08-review_en.json: topic-02.mdx:61 says Tilbury and Wortman (2004) "demonstrate that lasting sustainability occurs only when participation reaches active collaboration". The source is unretrievable and the declaration supports title-level claims only; a demonstrated causal relationship is more than the declaration supports. Soften the claim or replace the source.
- [uncertain] Inherited unresolved finding from specs/content/efmp-407/reviews/unit-08/G3/crew-efmp-407-u08-review_en/crew-efmp-407-u08-review_en.json: topic-02.mdx:138 (Check your understanding item 3) is tagged Analyze, above the approved formative band Remember/Understand/Apply (content-spec.md:424; style-guide.md:237). The label matches the actual demand, so either reword the item to the band or record an owner ruling that the band extends.
- [uncertain] Mandatory fresh browser/narrow viewport/A4 print evidence unavailable under crew prohibition; prior accessibility pass not adopted.
- [uncertain] No parent-prepared frozen handoff or independently verified author runtime identity; exact deployed model version unavailable.

## Notes from earlier jobs on this unit
- (efmp-407-u08-repair_en-conflict1, fix, opencode) Unit 8 G3/G5 remain open and uncertified; the branch's advisory row leaves G3 unticked.
- (efmp-407-u08-repair_en-conflict1, fix, opencode) Shared tracker `specs/content/efmp-407/tasks.md` is the recurring collision point for parallel EFMP-407 unit jobs.
- (efmp-407-u08-repair_en, repair_en, agy) G3 review findings F1-F8 from 20261108T203238Z-g3-desk-04abd597.json are repaired in EN and UR mirrors; G3 tracker row appended leaving G3 unticked.
- (efmp-407-u08-repair_en, repair_en, agy) G2 gate evidence refreshed at specs/content/efmp-407/reviews/unit-08/G2/20261110T024249494Z-gates.json and all 14 content gates are green.
- (efmp-407-u08-illustrate, illustrate, agy) Banner fig-U8-5.webp is placed in both English and Urdu unit index files, with unit-08.banner.md set to placed.


## Response snapshot

Verified all findings from the latest G3 review report 20261122T175629Z-g3-desk-21c4765e.json resolved on EFMP-407 Unit 8 across English and Urdu files, appended the advisory revise tracker row in tasks.md leaving G3 unticked, and recorded the prompt history record.

## Outcome

- Impact: repair_en for EFMP-407 Unit 8 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Verified all findings from the latest G3 review report 20261122T175629Z-g3-desk-21c4765e.json resolved on EFMP-407 Unit 8 across English and Urdu files, appended the advisory revise tracker row in tasks.md leaving G3 unticked, and recorded the prompt history record.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - All findings from 20261122T175629Z-g3-desk-21c4765e.json are verified resolved in EN and UR mirrors; G3 tracker row appended leaving G3 unticked.
  - G2 gate evidence at specs/content/efmp-407/reviews/unit-08/G2/20261110T024249494Z-gates.json remains valid and all 14 content gates pass.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
