---
id: crew-efmp-408-u06-repair_en
title: crew repair_en EFMP-408 unit 6
stage: misc
date: 2026-11-26
surface: agent
model: agy
feature: efmp-408
branch: crew/efmp-408-u06-repair_en
user: crew
command: crew repair_en
labels: ["crew", "agy", "repair_en"]
links:
  spec: specs/content/efmp-408/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-4/efmp-408/unit-06/topic-01.mdx
  - docs/semester-4/efmp-408/unit-06/topic-02.mdx
  - docs/semester-4/efmp-408/unit-06/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-408/unit-06/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-408/unit-06/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-408/unit-06/unit-assessment.mdx
  - specs/content/efmp-408/coverage/unit-06.md
  - specs/content/efmp-408/reviews/unit-06/G2/20261125T212527227Z-gates.json
  - specs/content/efmp-408/reviews/unit-06/G2/logs-20261125T212527227Z/check-bloom-bands.txt
  - specs/content/efmp-408/reviews/unit-06/G2/logs-20261125T212527227Z/check-concept-graph.txt
  - specs/content/efmp-408/reviews/unit-06/G2/logs-20261125T212527227Z/check-depth-gate.txt
  - specs/content/efmp-408/reviews/unit-06/G2/logs-20261125T212527227Z/check-docs-sync.txt
  - specs/content/efmp-408/reviews/unit-06/G2/logs-20261125T212527227Z/check-figures.txt
  - specs/content/efmp-408/reviews/unit-06/G2/logs-20261125T212527227Z/check-no-answer-keys.txt
  - specs/content/efmp-408/reviews/unit-06/G2/logs-20261125T212527227Z/check-no-em-dash.txt
  - specs/content/efmp-408/reviews/unit-06/G2/logs-20261125T212527227Z/validate-content.txt
  - specs/content/efmp-408/sources/unit-06.md
  - specs/content/efmp-408/tasks.md
  - specs/gaps.md
  - static/img/figures/efmp-408/unit-06/fig-U6-4.dark.svg
  - static/img/figures/efmp-408/unit-06/fig-U6-4.svg
  - static/img/figures/efmp-408/unit-06/fig-U6-4.ur.dark.svg
  - static/img/figures/efmp-408/unit-06/fig-U6-4.ur.svg
  - static/img/figures/efmp-408/unit-06/fig-U6-5.dark.svg
  - static/img/figures/efmp-408/unit-06/fig-U6-5.svg
tests:
  - npm run check:content
---

## Prompt

# Crew job efmp-408-u06-repair_en

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-408-u06-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Apply the findings of the latest G3 report under specs/content/efmp-408/reviews/unit-06/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 6 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-408 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-408/`, and `static/img/figures/efmp-408/unit-06/`.

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
From `specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r1.json` (disposition: revise). Resolve each one:
- [blocking] MCQ answer-key design (docs/semester-4/efmp-408/unit-06/unit-assessment.mdx:126-135). The key is A0 / B9 / C1 / D0, so a candidate who always selects B scores 9 of 10, and no item keys to A or D. The keyed option is also the longest option in 9 of the 10 items (item 4 ties with D), a second independent giveaway. REPAIR: redistribute the keys across A-D and rebalance option length and grammatical parallelism so the correct option is not systematically the longest.
- [blocking] Undeclared missing sources (specs/content/style-guide.md:293 requires a `no-external-source` row and a specs/gaps.md escalation when a sub-topic is covered from general knowledge). Specific external facts are stated with no bound source and no declaration: NTS established in 2002 and its NAT/GAT instruments (topic-01.mdx:89), NEAS conducting Grade 4 and Grade 8 sample assessments under the federal Ministry (topic-01.mdx:90), STEDA and the Sindh Teaching Licence as criterion-referenced (topic-01.mdx:57,91), the FPSC migrating to computer-based testing (topic-03.mdx:54), the Sindh Education Foundation and "PEAC in Punjab and PEAC in Sindh" (topic-04.mdx:53), Cambridge O/A Levels and the International Baccalaureate (topic-04.mdx:58), and the CAT mechanism (topic-03.mdx:59). REPAIR: record the row and escalate, or bind and cite a source for each.
- [advisory] RRQ band: unit-assessment.mdx:106 (RRQ 6, "State three specific professional obligations...") and :109 (RRQ 9, "summarizing its three core dimensions") are tagged *(Remember)*, below the RRQ band Understand to Analyze (specs/content/style-guide.md:248). The tags match the actual demand. REPAIR: raise at least one of the two items to Understand (or higher) or record an owner ruling for the band.
- [advisory] Citation support in Topic 6.2: topic-02.mdx:56 cites HEC (2012) for cheating and examination malpractice, and :78 cites HEC (2012) with NPSTP (2009) for confidentiality. The bound ClassroomAssess_Sept13.txt contains no cheating, academic integrity, confidentiality or privacy content (verified by full-text search), so the HEC attribution is unsupported; npstp-2009.md note 2 supports only a general statement about ethical, legal and privacy constraints. REPAIR: bind a source that carries the material or declare it as general knowledge with a no-external-source row.
- [advisory] Figure geometry: static/img/figures/efmp-408/unit-06/fig-U6-5.svg:19 renders the title "Proportionate pedagogical and administrative responses to assessment dishonesty" ending at 779.1px in a 780px viewBox (render-inspect section D), leaving a 0.9px margin. measure-figure-text passes it (widest 778.7) and the text is inside the viewBox, so nothing is clipped, but the title is flush to the edge. REPAIR: shorten the title or reduce the title font size.
- [uncertain] Unverified specific claim: topic-01.mdx:96 states "Pakistan participated in TIMSS 2019 at Grade 4", and fig-U6-4 ("2019 - Present: TIMSS participation") repeats it. No bound source supports the claim (the bound TestDevEval guide names TIMSS as an international survey at :659 but says nothing about Pakistani participation) and it could not be confirmed in this session. REPAIR: verify against a primary IEA/TIMSS source and cite it, or remove the specific participation claim and keep the general description of TIMSS.

## Notes from earlier jobs on this unit
- (efmp-408-u06-review_en, review_en, claude_crew) The advisory tracker row is written to `reviews/unit-06/G3/crew-efmp-408-u06-review_en-r1/advisory-tracker-row.md`; the review skill forbids a reviewer editing `tasks.md`, so the crew lead must append it.
- (efmp-408-u06-review_en, review_en, claude_crew) Repair owner has four blocking/uncertain items: MCQ key and option-length giveaway, the missing `no-external-source` declaration, the TIMSS 2019 claim, plus RRQ 6/9 and the Topic 6.2 HEC attribution.
- (efmp-408-u06-review_en, review_en, claude_crew) Do not re-report `render-inspect`'s `fig-U6-4`/`fig-U6-6` "did not load" flags as content defects; they are cleared in `logs/render-followup.txt`, and the tool's real exit 1 is the `fig-U6-5` title advisory.
- (efmp-408-u06-illustrate, illustrate, agy) Unit 6 G3 English review and G5 Urdu review remain open; translation_status stays draft in both index.mdx files pending independent G5 acceptance.
- (efmp-408-u06-illustrate, illustrate, agy) All Unit 6 figures (schematic SVGs fig-U6-1 through fig-U6-8 and banner raster fig-U6-9) are placed in both English and Urdu mirrors.

## Response snapshot

Applied all EFMP-408 Unit 6 G3 r1 repairs across English and Urdu files: redistributed MCQ keys across A-D (A3/B2/C2/D3) and balanced distractor lengths, raised RRQ 6 to Understand and RRQ 9 to Analyze with aligned mark schemes, added no-external-source row and escalated gap G-2026-236 for external assessment bodies, removed unverified TIMSS 2019 participation claim in topic-01 and fig-U6-4, removed unsupported HEC citations in topic-02 and updated coverage, shortened fig-U6-5 title to resolve viewBox margin advisory, refreshed G2 gate evidence and appended advisory and repairs-applied tracker rows with G3 left unticked.

## Outcome

- Impact: repair_en for EFMP-408 Unit 6 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before completing the job.
- Files: 25 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Applied all EFMP-408 Unit 6 G3 r1 repairs in EN and UR mirrors (MCQ key redistributed across A-D and balanced lengths, RRQ 6/9 raised to Understand/Analyze with aligned rubrics, external bodies declared as no-external-source with G-2026-236 escalation, TIMSS 2019 claim removed, unsupported HEC citations removed in Topic 6.2, fig-U6-5 title shortened, G2 evidence refreshed to 20261125T212527227Z-gates.json, and tasks.md updated).
- Decisions the team must respect: G3 remains advisory until independent re-review; translation_status stays draft pending G5.
- Pending / next owner: crew lead / next independent G3 review run.
- Notes for the next job on this unit:
  - All content and structural gates pass cleanly (14/14).
  - Both English and Urdu mirrors of Unit 6 are updated and aligned.
  - Figure geometries for fig-U6-4 and fig-U6-5 pass text measurement with ample margins.
- Paperclip issues affected: none (work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
