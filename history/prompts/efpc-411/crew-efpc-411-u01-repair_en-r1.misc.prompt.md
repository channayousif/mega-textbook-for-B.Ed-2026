---
id: crew-efpc-411-u01-repair_en-r1
title: crew repair_en EFPC-411 unit 1
stage: misc
date: 2026-11-28
surface: agent
model: claude
feature: efpc-411
branch: crew/efpc-411-u01-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "claude", "repair_en"]
links:
  spec: specs/content/efpc-411/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/efpc-411/unit-01/topic-03.mdx
 - docs/semester-4/efpc-411/unit-01/topic-04.mdx
 - history/prompts/general/20261310-efpc411-u01-repair-en-g3-desk.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpc-411/unit-01/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpc-411/unit-01/topic-04.mdx
 - specs/content/efpc-411/coverage/unit-01.md
 - specs/content/efpc-411/reviews/unit-01/G2/20261128T025420688Z-gates.json
 - specs/content/efpc-411/reviews/unit-01/G2/logs-20261128T025420688Z/check-bloom-bands.txt
 - specs/content/efpc-411/reviews/unit-01/G2/logs-20261128T025420688Z/check-concept-graph.txt
 - specs/content/efpc-411/reviews/unit-01/G2/logs-20261128T025420688Z/check-depth-gate.txt
 - specs/content/efpc-411/reviews/unit-01/G2/logs-20261128T025420688Z/check-docs-sync.txt
 - specs/content/efpc-411/reviews/unit-01/G2/logs-20261128T025420688Z/check-figures.txt
 - specs/content/efpc-411/reviews/unit-01/G2/logs-20261128T025420688Z/check-no-answer-keys.txt
 - specs/content/efpc-411/reviews/unit-01/G2/logs-20261128T025420688Z/check-no-em-dash.txt
 - specs/content/efpc-411/reviews/unit-01/G2/logs-20261128T025420688Z/validate-content.txt
 - specs/content/efpc-411/reviews/unit-02/G2/20261128T025431923Z-gates.json
 - specs/content/efpc-411/reviews/unit-02/G2/logs-20261128T025431923Z/check-bloom-bands.txt
 - specs/content/efpc-411/reviews/unit-02/G2/logs-20261128T025431923Z/check-concept-graph.txt
 - specs/content/efpc-411/reviews/unit-02/G2/logs-20261128T025431923Z/check-depth-gate.txt
 - specs/content/efpc-411/reviews/unit-02/G2/logs-20261128T025431923Z/check-docs-sync.txt
 - specs/content/efpc-411/reviews/unit-02/G2/logs-20261128T025431923Z/check-figures.txt
 - specs/content/efpc-411/reviews/unit-02/G2/logs-20261128T025431923Z/check-no-answer-keys.txt
 - specs/content/efpc-411/reviews/unit-02/G2/logs-20261128T025431923Z/check-no-em-dash.txt
 - specs/content/efpc-411/reviews/unit-02/G2/logs-20261128T025431923Z/validate-content.txt
 - specs/content/efpc-411/sources/texts/hec-2013-practicum.md
 - specs/content/efpc-411/sources/texts/teach-primary-2021.md
 - specs/content/efpc-411/sources/unit-01.md
 - specs/content/efpc-411/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efpc-411-u01-repair_en-r1

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpc-411-u01-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Apply the findings of the latest G3 report under specs/content/efpc-411/reviews/unit-01/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 1 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFPC-411 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpc-411/`, and `static/img/figures/efpc-411/unit-01/`.

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
From `specs/content/efpc-411/reviews/unit-01/G3/20261127T192818Z-g3-desk-b2d611b9.json` (disposition: revise). Resolve each one:
- [blocking] Bound source notes misdescribe the cited works. hec-2013-practicum.md note 3 claims the handbook (pp. 17-21) specifies permission, confidentiality and anonymity requirements; the 45-page handbook contains no occurrence of ethic, confidential, anonym, permission, consent, privacy or respect, yet coverage/unit-01.md maps U1-04 (ethics) only to it. Note 1 (systematic inquiry, non-punitive) and note 6 (constructive, evidence-based feedback, targets, pp. 39-45) cite wording the handbook lacks; note 2 places role summaries on pp. 12-16 (they are pp. 18-19). teach-primary-2021.md note 3 claims hal...
- [advisory] topic-04.mdx:67 "As teacher education scholar Donald Schön emphasized ... reflection-on-action ... reflection-in-action" has no citation, no Further-reading entry and no row in sources/unit-01.md. Schön (The Reflective Practitioner, 1983) was a philosopher and MIT professor of urban studies and education writing on professional practice generally, so the descriptor is inaccurate. REPAIR: cite Schön (1983) with a reference and bound note, and describe him accurately.
- [advisory] topic-03.mdx:85 "The final phase of the observation cycle is post-observation reflection" contradicts fig-U1-5 (stage 4 Collaborative Feedback), topic-03.mdx:115 and unit-assessment.mdx:32, while topic-03.mdx:109 asks learners to name the four stages in order. REPAIR: e.g. "The third phase ... is post-observation reflection; the cycle closes with the collaborative feedback conference described in Topic 1.4."
- [uncertain] Rendered desktop, 360px and A4 print inspection could not be performed on the reviewed bytes: deployed SHA 956c4ba9149ccc34e41e7d1dc31c624f7709d1b6 predates repair commit edaed1188 (merged 1b5fc79c2), so the repaired alt text, link text and prose are not live. REPAIR/NEXT: after a deploy that contains HEAD, run scripts/render-inspect.mjs EFPC-411 1 --base https://textbook.com.pk in a fresh review.

## Notes from earlier jobs on this unit
- (efpc-411-u01-review_en-r1, review_en, claude) Fixing F11 means rewriting two bound source notes and the U1-04 row of the coverage matrix (or recording the ethics section as author guidance); after that, regenerate the G2 evidence and get your authorisation for a third G3 cycle under ADR-0019.
- (efpc-411-u01-review_en-r1, review_en, claude) render-review is still missing: once a deploy includes commit edaed1188, run `scripts/render-inspect.mjs EFPC-411 1 --base https://textbook.com.pk` in a fresh review.
- (efpc-411-u01-review_en-r1, review_en, claude) tasks.md line 25 still says "pending a fresh independent review"; the lead should apply the suggested row from advisory-tracker-row.md.
- (efpc-411-u01-repair_en, repair_en, claude_crew) The approved content-spec.md Figure plan still says fig-U1-3 has "two questions an observer asks under each"; I aligned the manifest/SVG to the figure's three questions instead of editing the protected spec, so the plan needs an owner ruling.
- (efpc-411-u01-repair_en, repair_en, claude_crew) course-overview.mdx front matter still carries assessment_weighting 60/40; it is outside the Unit 1 scope and is bound in the G3 evidence manifest, so it was left for a separate owner decision.


## Response snapshot

Repaired EFPC-411 Unit 1's source notes, ethics coverage, Schön citation and observation-cycle sentence (English and Urdu), added the advisory G3 row and refreshed G2 evidence for Units 1 and 2.

## Outcome

- Impact: repair_en for EFPC-411 Unit 1 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 28 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Repaired EFPC-411 Unit 1's source notes, ethics coverage, Schön citation and observation-cycle sentence (English and Urdu), added the advisory G3 row and refreshed G2 evidence for Units 1 and 2.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - `unit-01/topic-03.mdx:51` cites Molina et al. for a "high-inference vs low-inference notes" distinction; the manual only asks for descriptive notes (p. 13), so the next review should check it. A further G3 cycle needs owner authorisation (ADR-0019).
  - `unit-02/topic-02.mdx:44` credits the HEC handbook with "three to four lessons using proformas", but a text search of the PDF finds neither phrase; Unit 2's signed G3 also predates the rewritten notes.
  - The render check for Unit 1 is still pending a deploy; `schon-1983` stays unverifiable until someone reads the book.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
