---
id: crew-efmp-407-u07-repair_en
title: crew repair_en EFMP-407 unit 7
stage: misc
date: 2026-11-15
surface: agent
model: claude
feature: efmp-407
branch: crew/efmp-407-u07-repair_en
user: crew
command: crew repair_en
labels: ["crew", "claude", "repair_en"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/efmp-407/unit-07/topic-01.mdx
 - docs/semester-3/efmp-407/unit-07/topic-02.mdx
 - specs/content/efmp-407/reviews/unit-07/G2/20261115T020325192Z-gates.json
 - specs/content/efmp-407/reviews/unit-07/G2/logs-20261115T020325192Z/check-bloom-bands.txt
 - specs/content/efmp-407/reviews/unit-07/G2/logs-20261115T020325192Z/check-concept-graph.txt
 - specs/content/efmp-407/reviews/unit-07/G2/logs-20261115T020325192Z/check-depth-gate.txt
 - specs/content/efmp-407/reviews/unit-07/G2/logs-20261115T020325192Z/check-docs-sync.txt
 - specs/content/efmp-407/reviews/unit-07/G2/logs-20261115T020325192Z/check-figures.txt
 - specs/content/efmp-407/reviews/unit-07/G2/logs-20261115T020325192Z/check-no-answer-keys.txt
 - specs/content/efmp-407/reviews/unit-07/G2/logs-20261115T020325192Z/check-no-em-dash.txt
 - specs/content/efmp-407/reviews/unit-07/G2/logs-20261115T020325192Z/validate-content.txt
 - specs/content/efmp-407/sources/texts/nep-2009.md
 - specs/content/efmp-407/sources/unit-07.md
 - specs/content/efmp-407/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-407-u07-repair_en

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u07-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Apply the findings of the latest G3 report under specs/content/efmp-407/reviews/unit-07/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 7 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-407 Unit 7 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-407/`, and `static/img/figures/efmp-407/unit-07/`.

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
From `specs/content/efmp-407/reviews/unit-07/G3/crew-efmp-407-u07-review_en-r1/crew-efmp-407-u07-review_en-r1.json` (disposition: revise). Resolve each one:
- [blocking] NEP 2009 cited to section 6.1; the passage is in section 6.2 (Curriculum Reform), policy action 5. Repair the locator in topic-01.mdx:33 and :107, sources/unit-07.md:7 and sources/texts/nep-2009.md:7.
- [advisory] The National SDG Framework unavailable-source declaration is under 'Access and interpretation notes', not 'Unverifiable sources', and the unit file does not restate the retrieval attempts and date. Add the heading for machine readability.
- [advisory] topic-02 Further reading carries one bare-URL DOI as its link text. The course convention tolerates it, but a descriptive label would be better.

## Notes from earlier jobs on this unit
- (efmp-407-u07-illustrate, illustrate, agy) Placed banner fig-U7-5.webp in English and draft Urdu index files, updated unit-07.banner.md to placed, and refreshed G2 gate evidence.
- (efmp-407-u07-illustrate, illustrate, agy) Full Urdu translation and independent G3 English / G5 Urdu reviews remain open and uncertified.
- (efmp-407-u07-illustrate, illustrate, agy) The existing NEP 2009 locator finding reported by review_en belongs to repair_en and remains unchanged.
- (efmp-407-u07-translate-r1, translate, codex) repair_en must resolve F1 before translation resumes; translation_status remains draft.
- (efmp-407-u07-translate-r1, translate, codex) repair_en must resolve F1 before translation resumes; translation_status remains draft.


## Response snapshot

Corrected the NEP 2009 locator to section 6.2 policy action 5, added a gate-readable `## Unverifiable sources` declaration for the National SDG Framework, gave the topic-02 DOI a descriptive label, refreshed G2 evidence and added the G3 repair tracker row for EFMP-407 Unit 7.

## Outcome

- Impact: repair_en for EFMP-407 Unit 7 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 14 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Corrected the NEP 2009 locator to section 6.2 policy action 5, added a gate-readable `## Unverifiable sources` declaration for the National SDG Framework, gave the topic-02 DOI a descriptive label, refreshed G2 evidence and added the G3 repair tracker row for EFMP-407 Unit 7.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 needs a fresh independent review of commits b02ba6e6e and a9c118a0a; the r1 report is now stale.
  - The Urdu side has only index.mdx, so the translate job should copy the corrected "section 6.2 (Curriculum Reform), policy action 5" locator into the Urdu topic-01.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
