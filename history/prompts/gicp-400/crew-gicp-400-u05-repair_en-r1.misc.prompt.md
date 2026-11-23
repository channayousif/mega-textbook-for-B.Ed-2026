---
id: crew-gicp-400-u05-repair_en-r1
title: crew repair_en GICP-400 unit 5
stage: misc
date: 2026-11-23
surface: agent
model: claude
feature: gicp-400
branch: crew/gicp-400-u05-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "claude", "repair_en"]
links:
  spec: specs/content/gicp-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/gicp-400/unit-05/topic-03.mdx
 - docs/semester-3/gicp-400/unit-05/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-05/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-05/unit-assessment.mdx
 - specs/content/gicp-400/figures/unit-05.md
 - specs/content/gicp-400/reviews/unit-05/G2/20261123T045132472Z-gates.json
 - specs/content/gicp-400/reviews/unit-05/G2/logs-20261123T045132472Z/check-bloom-bands.txt
 - specs/content/gicp-400/reviews/unit-05/G2/logs-20261123T045132472Z/check-concept-graph.txt
 - specs/content/gicp-400/reviews/unit-05/G2/logs-20261123T045132472Z/check-depth-gate.txt
 - specs/content/gicp-400/reviews/unit-05/G2/logs-20261123T045132472Z/check-docs-sync.txt
 - specs/content/gicp-400/reviews/unit-05/G2/logs-20261123T045132472Z/check-figures.txt
 - specs/content/gicp-400/reviews/unit-05/G2/logs-20261123T045132472Z/check-no-answer-keys.txt
 - specs/content/gicp-400/reviews/unit-05/G2/logs-20261123T045132472Z/check-no-em-dash.txt
 - specs/content/gicp-400/reviews/unit-05/G2/logs-20261123T045132472Z/validate-content.txt
 - specs/content/gicp-400/tasks.md
 - static/img/figures/gicp-400/unit-05/fig-U5-6.dark.svg
 - static/img/figures/gicp-400/unit-05/fig-U5-6.svg
 - static/img/figures/gicp-400/unit-05/fig-U5-6.ur.dark.svg
 - static/img/figures/gicp-400/unit-05/fig-U5-6.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gicp-400-u05-repair_en-r1

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gicp-400-u05-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Apply the findings of the latest G3 report under specs/content/gicp-400/reviews/unit-05/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 5 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GICP-400 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gicp-400/`, and `static/img/figures/gicp-400/unit-05/`.

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
From `specs/content/gicp-400/reviews/unit-05/G3/20261122T175629Z-g3-desk-4d404275.json` (disposition: revise). Resolve each one:
- [blocking] F1: topic-03.mdx:44 fig-U5-6 alt says all three Principles depend on resources, whereas Article 29(2) is conditional and the visible SVG says may. Author should qualify the alt, manifest and SVG desc together and rederive the dark variant.
- [advisory] F2: topic-03.mdx:92,123 uses under sixteen in examples. This does not expressly exclude age sixteen, but consistently stating the full five-to-sixteen range would prevent that inference.
- [advisory] F3: topic-02.mdx Further reading and sources/unit-05.md:12 use institutional n.d. citation for LUMS commentary; linked page identifies Arooba Mansoor, 11 February 2025. Author should verify and correct metadata.
- [advisory] F8: RRQs 4,6,9,10 closely reproduce taught corrections/comparisons despite Analyze labels. Recalibrate demand or add unfamiliar evidence; ERQs and topic tasks already supply real higher-order work.
- [uncertain] F4: Required rendered accessibility, narrow-view and A4 print evidence and Chromium SVG geometry unavailable under explicit brief prohibition. No render command was executed or invented.
- [uncertain] F5: No parent-prepared manifest or author run ID supplied; reviewer prepared a clean 99-input manifest instead. Reviewer thread is real, but exact model build is not exposed. Complete handoff provenance cannot be verified.
- [uncertain] F6: Official Twenty-seventh Amendment retrieval failed (timeout and certificate issuer error); multiple listed constitutional articles and Sindh Act section 13(3) remain independently unverified. Author source summaries and partial transcription inspection cannot establish complete primary source support.
- [uncertain] F7: Supplied assessment guidance was displayed before a complete separate blind-solution artifact was saved. assessment-check.md is a comparison only; a fresh reviewer must perform the ordered solve-before-guidance procedure.

## Notes from earlier jobs on this unit
- (gicp-400-u05-repair_en, repair_en, opencode) F4-F7 (rendered accessibility/narrow-view/A4 evidence, author-run provenance, official Twenty-seventh Amendment primary-source verification, fresh blind assessment solve) remain unavailable to this job and need an authorised browser host plus a fresh independent reviewer; G3 stays open and unticked.
- (gicp-400-u05-repair_en, repair_en, opencode) The G2 gate evidence was refreshed to `specs/content/gicp-400/reviews/unit-05/G2/20261110T040923255Z-gates.json`; F8 was resolved by retagging RRQs 4, 6, 9, 10 to Understand (the finding's "recalibrate demand" option), which stays inside the approved "Understand to Analyze" band.
- (gicp-400-u05-illustrate, illustrate, agy) Both English and Urdu unit locales remain translation_status: draft with G3, G4, and G5 open pending independent review and qualification.
- (gicp-400-u05-illustrate, illustrate, agy) Figure 5.6 resource-condition alt text, source/provenance checks and a fresh blind assessment solve remain open on English G3.
- (gicp-400-u05-illustrate, illustrate, agy) Browser-based rendered inspection across 1280px, 360px, and A4 print emulation remains pending for an authorized session under host environment restrictions.


## Response snapshot

Qualified the Article 29(2) resources condition in fig-U5-6's EN/UR alt text, manifest row and all four SVG descriptions, changed the RRQ 4 verb to "explain", refreshed the Unit 5 G2 evidence and added an unticked advisory G3 tracker row for report 4d404275.

## Outcome

- Impact: repair_en for GICP-400 Unit 5 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 19 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Qualified the Article 29(2) resources condition in fig-U5-6's EN/UR alt text, manifest row and all four SVG descriptions, changed the RRQ 4 verb to "explain", refreshed the Unit 5 G2 evidence and added an unticked advisory G3 tracker row for report 4d404275.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - F4-F7 (rendered/narrow-view/A4 evidence, author-run provenance, official Twenty-seventh Amendment and Sindh Act s.13(3) checks, fresh blind solve) need an authorised browser host and a fresh independent G3 reviewer.
  - The text printed on fig-U5-6 still reads "Each may depend on resources (29(2))", which the reviewer accepted; only the alt, desc and manifest wording changed.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
