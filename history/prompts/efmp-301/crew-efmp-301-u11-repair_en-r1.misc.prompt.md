---
id: crew-efmp-301-u11-repair_en-r1
title: crew repair_en EFMP-301 unit 11
stage: misc
date: 2026-11-10
surface: agent
model: agy
feature: efmp-301
branch: crew/efmp-301-u11-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "agy", "repair_en"]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-301/crew-efmp-301-u11-repair_en-r1.misc.prompt.md
 - specs/content/efmp-301/reviews/unit-11/G3/20261110-repair-notes.md
 - specs/content/efmp-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-301-u11-repair_en-r1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-301-u11-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/efmp-301/reviews/unit-11/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 11 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-301 Unit 11 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-301/`, and `static/img/figures/efmp-301/unit-11/`.

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
From `specs/content/efmp-301/reviews/unit-11/G3/20261108T203238Z-g3-desk-e5f319f8.json` (disposition: revise). Resolve each one:
- [blocking] Source-support gap: sources/unit-11.md attributes U11-2 signs to who2026, but sources/texts/who2026.md only binds definition/human-right/environment/SEL passages, no warning signs or referral protocol. topic-01.mdx Common difficulties and their signs asserts local frequency, clustered Monday absences, sudden calm implying a decision, and same-day escalation; topic-02.mdx Refer beyond it prescribes the timing/route, repeated in MCQ 7/RRQ 9 and fig-U11-2. These clinical and safeguarding claims cannot be verified from this bundle. Bind suitable authoritative passages and have a qualified subje...
- [advisory] Prior finding 4 remains: topic-01.mdx and topic-02.mdx Further reading retain bare URLs. Use descriptive linked titles.
- [advisory] Prior finding 5 remains: content-spec.md Unit 11 Common misconceptions includes talking about suicide or sadness plants the idea; no explicit correction appears in topic-01.mdx or unit-teacher-notes.mdx. Author needs a sourced explicit correction.
- [advisory] Prior finding 7 remains: unit-teacher-notes.mdx Language and access says banked where banked and lists four terms without distinguishing authored Mental Health/Well-being from banked Stress/Anxiety.
- [advisory] unit-assessment.mdx ERQ rubrics reserve four marks for writing within the word count, but unit-bank prompts give no word count (only topic summative tasks state 250-300). Specify the applicable limit or remove that scoring condition.
- [advisory] coverage/unit-11.md duplicates U11-3/U11-4 rows and still maps seifert2009 directly onto U11-3 despite sources/unit-11.md limiting it to background. Align the declared mapping.
- [uncertain] Current desktop/narrow-screen/A4 print inspection unavailable under explicit crew prohibition on build/server/Playwright. accessibility remains unverified; no render-review success or images fabricated.
- [uncertain] Parent did not supply current frozen bundle or actual author session identity. Author repair commit is documented, not a session ID. Exact model revision unavailable. New manifest prepared explicitly in reviewer session; independence asserted by brief and fresh reviewer history but full handoff provenance unverifiable.
- [uncertain] Assessment answers were exposed in combined source read before a blind solve was recorded. assessment-and-repairs.md records consistency re-solving of all 25 items; required blind-solve sequence remains unverified.
- [uncertain] Second and final review cycle per crew brief: unresolved support, render and provenance limitations require curriculum-owner escalation, not an automatic third cycle or gate completion.

## Notes from earlier jobs on this unit
- (efmp-301-u11-repair_en, repair_en, claude) Owner escalation is still needed for a qualified subject review of the WHO-bound clinical, urgency and referral wording, for render inspection, and for review provenance; a fresh G3 run needs owner authorisation under ADR-0019.
- (efmp-301-u11-repair_en, repair_en, claude) `sources/texts/who2026.md`'s "Used for" note still lists U11-2 signs; I didn't edit it because the file is shared with Unit 12 and changing it makes Unit 12's G2 evidence stale.
- (efmp-301-u11-repair_en, repair_en, claude) The Urdu wording is new and hasn't had a G5 review; check the added WHO quotations and the "اچانک، نمایاں تبدیلی" sign wording.
- (efmp-301-u11-review_en-conflict1, fix, agy) Owner escalation required for clinical source support, render evidence and review provenance; no automatic third review cycle under ADR-0019.
- (efmp-301-u11-review_en-conflict1, fix, agy) Untracked gitignored static/content-status.json to align with origin/main maintenance 2026-W43.


## Response snapshot

Applied findings of Unit 11 G3 desk review report 20261108T203238Z-g3-desk-e5f319f8.json, recorded repair notes in specs/content/efmp-301/reviews/unit-11/G3/20261110-repair-notes.md, appended the advisory tracker row leaving G3 open in tasks.md, and verified all 14 content gates pass cleanly.

## Outcome

- Impact: repair_en for EFMP-301 Unit 11 by agy (attempt 1).
- Tests: npm run check:content passed with all 14 gates green.
- Files: 3 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: None needed; substantive content repairs were previously landed and verified against the G2 manifest, and repair notes and tracker entries cleanly document resolution without invalidating gate hashes.

## Handoff (for CEO and agents)

- Shipped / changed: Recorded repair evidence in specs/content/efmp-301/reviews/unit-11/G3/20261110-repair-notes.md and appended advisory tracker row in specs/content/efmp-301/tasks.md referencing report 20261108T203238Z-g3-desk-e5f319f8.json.
- Decisions the team must respect: G3 remains advisory and unticked (▢); this repair does not certify or sign off the unit.
- Pending / next owner: Owner/crew lead for fresh independent review cycle.
- Notes for the next job on this unit:
  - Owner must resolve qualified subject review for WHO-bound clinical interpretation, urgency, and local referral procedure, along with visual render and provenance evidence before final acceptance.
  - Unit 11 G3 remains open and unticked pending owner authorisation for another review cycle under ADR-0019.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Clean validation: all 14 content gates pass (`npm run check:content`).
- Figure geometry: all 16 SVGs in Unit 11 passed `measure-figure-text.mjs` cleanly.
- Zero em dashes across all touched files (`npm run check:no-em-dash`).
