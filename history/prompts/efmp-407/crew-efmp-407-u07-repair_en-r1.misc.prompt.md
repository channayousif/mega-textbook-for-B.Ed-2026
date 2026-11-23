---
id: crew-efmp-407-u07-repair_en-r1
title: crew repair_en EFMP-407 unit 7
stage: misc
date: 2026-11-23
surface: agent
model: claude
feature: efmp-407
branch: crew/efmp-407-u07-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "claude", "repair_en"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/efmp-407/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-407-u07-repair_en-r1

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u07-repair_en-r1`.
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
From `specs/content/efmp-407/reviews/unit-07/G3/20261122T175629Z-g3-desk-f45bf9fe.json` (disposition: revise). Resolve each one:
- [blocking] NEP 2009 cited to section 6.1; the passage is in section 6.2 (Curriculum Reform), policy action 5. Repair the locator in topic-01.mdx:33 and :107, sources/unit-07.md:7 and sources/texts/nep-2009.md:7.
- [advisory] The National SDG Framework unavailable-source declaration is under 'Access and interpretation notes', not 'Unverifiable sources', and the unit file does not restate the retrieval attempts and date. Add the heading for machine readability.
- [advisory] topic-02 Further reading carries one bare-URL DOI as its link text. The course convention tolerates it, but a descriptive label would be better.

## Notes from earlier jobs on this unit
- (efmp-407-u07-repair_en, repair_en, claude) G3 needs a fresh independent review of commits b02ba6e6e and a9c118a0a; the r1 report is now stale.
- (efmp-407-u07-repair_en, repair_en, claude) The Urdu side has only index.mdx, so the translate job should copy the corrected "section 6.2 (Curriculum Reform), policy action 5" locator into the Urdu topic-01.
- (efmp-407-u07-illustrate, illustrate, agy) Placed banner fig-U7-5.webp in English and draft Urdu index files, updated unit-07.banner.md to placed, and refreshed G2 gate evidence.
- (efmp-407-u07-illustrate, illustrate, agy) Full Urdu translation and independent G3 English / G5 Urdu reviews remain open and uncertified.
- (efmp-407-u07-illustrate, illustrate, agy) The existing NEP 2009 locator finding reported by review_en belongs to repair_en and remains unchanged.


## Response snapshot

Confirmed all three findings of G3 report f45bf9fe were already fixed in EFMP-407 Unit 7 and added an unticked "advisory: revise; repairs applied" Unit 7 G3 tracker row naming that report.

## Outcome

- Impact: repair_en for EFMP-407 Unit 7 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Confirmed all three findings of G3 report f45bf9fe were already fixed in EFMP-407 Unit 7 and added an unticked "advisory: revise; repairs applied" Unit 7 G3 tracker row naming that report.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Unit 7 G3 needs a fresh independent review: report f45bf9fe repeats the r1 findings that b02ba6e6e and a9c118a0a had already fixed.
  - The Urdu side has only `index.mdx`; the translate job must carry the "section 6.2 (Curriculum Reform), policy action 5" locator into the Urdu topic-01.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
