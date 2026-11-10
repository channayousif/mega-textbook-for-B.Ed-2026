---
id: crew-gqur-301-u06-repair_en-r1
title: crew repair_en GQUR-301 unit 6
stage: misc
date: 2026-11-10
surface: agent
model: opencode
feature: gqur-301
branch: crew/gqur-301-u06-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "opencode", "repair_en"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261189-repair-gqur301-unit-six-g3.general.prompt.md
 - specs/content/gqur-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u06-repair_en-r1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u06-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/gqur-301/reviews/unit-06/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 6 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-301 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-06/`.

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
From `specs/content/gqur-301/reviews/unit-06/G3/20261108T203238Z-g3-desk-79674f38.json` (disposition: revise). Resolve each one:
- [blocking] F3: topic-02.mdx Explanation and unit-assessment.mdx RRQ 4 guidance say squaring makes every deviation positive, although zero remains zero. Replace with non-negative through separate author repair.
- [blocking] F4: content-spec.md Course review plan requires a real-Pakistan-data task per unit. ERQ 1-5 use unattributed classroom illustration datasets; add a sourced real-data task without inventing provenance.
- [blocking] F5: topic-03.mdx Is more spread good or bad and fig-U6-6 treat placement-test spread as proof of useful separation; ERQ 3 rubric prescribes one programme solely from low SD. Qualify by test validity, diagnostic evidence and learner needs.
- [blocking] F6: unit-assessment.mdx RRQ 10 guidance asserts all School M classes are close to 92 percent from SD=2 alone. Use lower overall dispersion and inspect individual classes; SD alone does not establish the universal statement.
- [advisory] F7: RRQ 6 mainly rehearses definitions and units, closer to Understand than its Analyze label; Topic 6.3 formative item 3 asks explanation rather than routine application.
- [uncertain] F1: G1 remains open after D-2026-0070; intake-3 binds the former six-unit partition. Owner/evaluator must resolve current authority. See summary.md#authority.
- [uncertain] F2: Host supplied no author run identity or prepared parent handoff. Author commit identifies provenance only, not a verified author session. Exact model build unavailable. Reviewer session ID is genuine; input manifest matches locally frozen committed files.
- [uncertain] F8: No current narrow-screen or A4 print page inspection under crew prohibitions. Supplemental geometry command accidentally invoked Chromium without heavy.sh; exited and closed browser, not a render-review pass. See render-limitation.log.

## Notes from earlier jobs on this unit
- (gqur-301-u06-repair_en-conflict1, fix, codex) G3 remains open pending authority, provenance and rendered inspection; Urdu translation remains pending.
- (gqur-301-u06-repair_en-conflict1, fix, codex) G3 remains open pending authority, provenance and rendered inspection; Urdu translation remains pending.
- (gqur-301-u06-repair_en, repair_en, codex) G3 remains open pending authority/provenance resolution and authorised geometry, narrow-screen and A4 inspection; Urdu translation remains pending.
- (gqur-301-u06-repair_en, repair_en, codex) G3 remains open pending authority/provenance resolution and authorised geometry, narrow-screen and A4 inspection; Urdu translation remains pending.
- (gqur-301-u06-translate-r1, translate, codex) Separate English author must resolve Unit 6 precision, inference and assessment defects before G4 resumes.


## Response snapshot

Verified the latest G3 desk report's F3-F7 findings were already repaired on main and appended an unticked advisory tracker row naming report 20261108T203238Z-g3-desk-79674f38.json.

## Outcome

- Impact: repair_en for GQUR-301 Unit 6 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Verified the latest G3 desk report's F3-F7 findings were already repaired on main and appended an unticked advisory tracker row naming report 20261108T203238Z-g3-desk-79674f38.json.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The 20261108 desk report carries findings identical to the 20261102 report against the same post-repair files, so treat it as a carry-forward rather than a fresh review.
  - F1 (G1 authority), F2 (historical author provenance) and F8 (rendered narrow-screen/A4 inspection) aren't author-repairable and stay with the owner/review host; no Urdu mirror exists, so G4 remains blocked.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
