---
id: crew-gent-401-u04-repair_en
title: crew repair_en GENT-401 unit 4
stage: misc
date: 2026-11-28
surface: agent
model: claude
feature: gent-401
branch: crew/gent-401-u04-repair_en
user: crew
command: crew repair_en
labels: ["crew", "claude", "repair_en"]
links:
  spec: specs/content/gent-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/gent-401/unit-04/topic-01.mdx
 - docs/semester-4/gent-401/unit-04/topic-02.mdx
 - docs/semester-4/gent-401/unit-04/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-04/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-04/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-04/unit-assessment.mdx
 - specs/content/gent-401/concepts/unit-04.md
 - specs/content/gent-401/reviews/unit-04/G2/20261128T035111343Z-gates.json
 - specs/content/gent-401/reviews/unit-04/G2/logs-20261128T035111343Z/check-bloom-bands.txt
 - specs/content/gent-401/reviews/unit-04/G2/logs-20261128T035111343Z/check-concept-graph.txt
 - specs/content/gent-401/reviews/unit-04/G2/logs-20261128T035111343Z/check-depth-gate.txt
 - specs/content/gent-401/reviews/unit-04/G2/logs-20261128T035111343Z/check-docs-sync.txt
 - specs/content/gent-401/reviews/unit-04/G2/logs-20261128T035111343Z/check-figures.txt
 - specs/content/gent-401/reviews/unit-04/G2/logs-20261128T035111343Z/check-no-answer-keys.txt
 - specs/content/gent-401/reviews/unit-04/G2/logs-20261128T035111343Z/check-no-em-dash.txt
 - specs/content/gent-401/reviews/unit-04/G2/logs-20261128T035111343Z/validate-content.txt
 - specs/content/gent-401/sources/unit-04.md
 - specs/content/gent-401/tasks.md
 - static/img/figures/gent-401/unit-04/fig-U4-4.dark.svg
 - static/img/figures/gent-401/unit-04/fig-U4-4.svg
 - static/img/figures/gent-401/unit-04/fig-U4-4.ur.dark.svg
 - static/img/figures/gent-401/unit-04/fig-U4-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gent-401-u04-repair_en

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gent-401-u04-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Apply the findings of the latest G3 report under specs/content/gent-401/reviews/unit-04/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 4 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GENT-401 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gent-401/`, and `static/img/figures/gent-401/unit-04/`.

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
From `specs/content/gent-401/reviews/unit-04/G3/20261127T192818Z-g3-desk-73f18e1c.json` (disposition: revise). Resolve each one:
- [advisory] sources/unit-04.md:7 records openstax-entrepreneurship as "Open access under CC BY 4.0", but :17 and the bound note sources/texts/openstax-entrepreneurship.md:3 record CC BY-NC-SA 4.0, and the live OpenStax page confirms CC BY-NC-SA 4.0. Correct the license statement.
- [advisory] unit-assessment.mdx:102 ERQ 1 quotes the entrepreneur saying "an eight-section business plan", while the unit teaches nine sections and the ERQ 1 rubric criterion is "Section Interdependence" over nine sections. Align the prompt with nine.
- [advisory] unit-assessment.mdx:130 RRQ 1 asks for the logical progression of the nine standard sections, but the model answer names about six and the 2-mark scheme does not require all nine. Align the model answer and mark scheme with the question.
- [advisory] concepts/unit-04.md:8-12 maps assessment items to the wrong concepts: MCQ-04 (vision vs mission) to CON:GENT-401-4-2, MCQ-06 (4Ps Place) to CON:GENT-401-4-3, MCQ-08 (quality checkpoint) to CON:GENT-401-4-4, MCQ-09 (no organizational structure) to CON:GENT-401-4-5, and RRQ-08 (supply chain and safety stock) to CON:GENT-401-4-4. Correct the mapping so outcome coverage is recorded accurately.
- [advisory] topic-01.mdx:43 says the nine-part structure is "recognized across global and Pakistani commercial standards". No bound source names a Pakistani standard; the bound sources are OpenStax (US) and Scott (EFMD). Either cite a Pakistani source or drop "Pakistani commercial standards".
- [advisory] topic-01.mdx:99 calls the four-part mission formula a "proven four-part sentence structure". No bound source documents that formula; it is the unit's teaching device. Soften the claim (for example "a useful four-part structure") or cite it.
- [uncertain] topic-01.mdx:55 states "Mellor (2009) emphasizes that regular plan updates significantly increase small enterprise survival rates". The unverifiable declaration (sources/unit-04.md:13) covers only "the general textbook premise that planning and structured roles support venture survival and growth" and records no owner authorisation (D-2026-0001) or retrieval attempt. Either widen the declaration to cover the survival-rate claim and cite the owner ruling, or reword the prose so it does not state more than the declaration supports.
- [uncertain] topic-02.mdx:130 "Check your understanding" item 3 is tagged *(Analyze)*, above the approved formative band Remember/Understand/Apply (content-spec.md:219; style-guide.md:237). The label matches the actual demand, so either reword the item into the band or record an owner ruling that the band extends.
- [uncertain] fig-U4-4.svg stage 3 draws 1 Managing Director + 3 leads + 8 + 5 + 4 staff = 21 people, while the panel title, the manifest alt text and topic-02.mdx:96 all say "twenty-person"/"20 people". Reconcile the count or the label.
- [uncertain] Mandatory rendered-page and A4 print inspection could not be performed. The deployed site (SHA 366019f8ace647e892523e553b81ab6d1832ec68) is not the reviewed input because index.mdx and fig-U4-5.webp differ from HEAD (4f558d48a8508e40f21fb072b6c4ddbe4608368c), and the brief prohibits building or serving the site. Narrow-view, reading-order, clipping and print checks remain unverified.
- [uncertain] No parent-prepared frozen handoff or exact author runtime identity was supplied; author_run_id is the authoring crew-job label only, and the exact reviewer deployment version is unavailable. Do not infer verified provenance or qualification.

## Notes from earlier jobs on this unit
- (gent-401-u04-review_en, review_en, claude_crew) A fresh G3 run needs a renderable input, i.e. the deployed build must match HEAD for `docs/semester-4/gent-401/unit-04/` and `static/img/figures/gent-401/unit-04/`; until then accessibility stays unverified.
- (gent-401-u04-review_en, review_en, claude_crew) F3 (formative Analyze tag) and F6 (concept-graph mapping) pass every deterministic gate, so a gates-only recheck will not catch them; F1, F2, F4, F5, F7, F8 and F9 are the other author repairs.
- (gent-401-u04-review_en, review_en, claude_crew) G3 stays open and unsigned; do not tick it, add human initials, sign it, or reference it with `review:`/`provisional:`.
- (gent-401-u04-illustrate, illustrate, agy) Unit 4 banner fig-U4-5 is placed with gflow; G3 en-review and G5 ur-review remain open for independent evaluation.
- (gent-401-u04-illustrate, illustrate, agy) Proposed Urdu business plan terms in reviews/unit-04/G4/translation-handoff.md are authored and require G5 verification.


## Response snapshot

Applied the latest G3 findings to GENT-401 Unit 4 (EN and UR text, concept mapping, source licence, fig-U4-4 head count), refreshed G2 evidence and added an advisory G3 repair row with G3 left unticked.

## Outcome

- Impact: repair_en for GENT-401 Unit 4 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 22 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Applied the latest G3 findings to GENT-401 Unit 4 (EN and UR text, concept mapping, source licence, fig-U4-4 head count), refreshed G2 evidence and added an advisory G3 repair row with G3 left unticked.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - A fresh G3 run needs the deployed build to match HEAD for Unit 4 docs and figures; rendered-page and A4 print checks are still unverified.
  - The Urdu edits (RRQ 1 model, topic 4.2 check question 3, mission-formula and Mellor sentences) need G5 review.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
