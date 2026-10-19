---
id: crew-gict-300-u03-repair_en
title: crew repair_en GICT-300 unit 3
stage: misc
date: 2026-10-19
surface: agent
model: claude
feature: gict-300
branch: crew/gict-300-u03-repair_en
user: crew
command: crew repair_en
labels: ["crew", "claude", "repair_en"]
links:
  spec: specs/content/gict-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-1/gict-300/unit-03/topic-01.mdx
 - docs/semester-1/gict-300/unit-03/topic-02.mdx
 - docs/semester-1/gict-300/unit-03/topic-03.mdx
 - docs/semester-1/gict-300/unit-03/topic-04.mdx
 - docs/semester-1/gict-300/unit-03/unit-assessment.mdx
 - history/prompts/020-author-gict-300/0005-verify-unit-three-g3-run002-repairs.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-03/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-03/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-03/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-03/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-03/unit-assessment.mdx
 - specs/content/gict-300/reviews/unit-03/G2/20261019T140932928Z-gates.json
 - specs/content/gict-300/reviews/unit-03/G2/logs-20261019T140932928Z/check-bloom-bands.txt
 - specs/content/gict-300/reviews/unit-03/G2/logs-20261019T140932928Z/check-concept-graph.txt
 - specs/content/gict-300/reviews/unit-03/G2/logs-20261019T140932928Z/check-depth-gate.txt
 - specs/content/gict-300/reviews/unit-03/G2/logs-20261019T140932928Z/check-docs-sync.txt
 - specs/content/gict-300/reviews/unit-03/G2/logs-20261019T140932928Z/check-figures.txt
 - specs/content/gict-300/reviews/unit-03/G2/logs-20261019T140932928Z/check-no-answer-keys.txt
 - specs/content/gict-300/reviews/unit-03/G2/logs-20261019T140932928Z/check-no-em-dash.txt
 - specs/content/gict-300/reviews/unit-03/G2/logs-20261019T140932928Z/validate-content.txt
 - specs/content/gict-300/sources/unit-03.md
 - specs/content/gict-300/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gict-300-u03-repair_en

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gict-300-u03-repair_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/gict-300/reviews/unit-03/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 3 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GICT-300 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gict-300/`, and `static/img/figures/gict-300/unit-03/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit
   needs (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Open findings from the latest G3 report
From `specs/content/gict-300/reviews/unit-03/G3/agent-g3-gict300-u3-run002.json` (disposition: revise). Resolve each one:
- [blocking] Misquotation introduced by the F1 repair: the excerpt quotes "A file is simply a linear sequence of bytes that you can read and/or write". The book's actual sentence (OSTEP file-intro.pdf, section 39.1, fetched from the book's own site and verified this run) is "A file is simply a linear array of bytes, each of which you can read or write." The excerpt's wording appears nowhere in the chapter (mechanically verified over the extracted chapter text); "array" became "sequence" and "each of which you can read or write" became "that you can read and/or write". The meaning is identical and the un...
- [blocking] Taught-and-assessed sub-claims with neither bound-excerpt support nor disclosure. (a) Buffer and spooling (topic-03.mdx:54-59; concept CON:GICT-300-3-10; assessed by RRQ-10 and the unit summary): mechanically verified this run to have ZERO occurrences of "buffer" or "spool" in any of the three bound OSTEP chapters, and no other bound excerpt or declaration covers them. (b) Metadata (topic-02.mdx:45-47) and deletion semantics (topic-02.mdx:52-54): carried by the REAL chapter 39 (section 39.9 "Getting Information About Files" - size, ownership, access/modification times; section 39.14 unlink/...
- [advisory] PRESERVED FROM RUN001 (bank byte-identical): MCQ answer-position bias - 8 of 10 correct answers are option b, one is c (MCQ-05), one is d (MCQ-01), none is option a, confirmed by this reviewer's independent solve. Each item's key is correct and unambiguous, but the distribution is exploitable by a test-wise learner. Balance key positions across a/b/c/d at the next authoring touch.
- [advisory] PRESERVED FROM RUN001 (bank byte-identical): ERQ-01..04 restate the four per-topic Summative tasks nearly verbatim (biometric attendance, office rescue plan, print fault, staff-meeting explainer). The blueprint is satisfied and the rubrics are sound, but a learner who completed the topic tasks meets the same prompts again in the bank. Vary the context or scenario details at the next authoring touch.
- [advisory] After the coverage remap, Topic 3.2's file-management half (U3-03) is grounded in OSTEP chapter 39, but the topic's Further reading still cites only chapter 4 (the process chapter). The learner-facing reading pointer is now stale relative to the unit's own grounding. Add chapter 39 to the Topic 3.2 Further reading entry at the next authoring touch.
- [advisory] The bourgeois2019 excerpt's chapter-3 "Used for" annotation lists only U2-06/U2-07, while sources/unit-03.md now claims bourgeois2019 supports U3-01 (the three-part job) and U3-02 (named operating systems) from chapter 3. The chapter text does carry both claims (the three key functions and the Linux naming are verbatim in the bound excerpt - verified this run); only the excerpt's own annotation is stale. Update the annotation to include U3-01/U3-02 at the next touch.
- [advisory] The unit's primary excerpt ostep.md is NOT digest-bound in the input manifest: the ADR-0027 citedKeys derivation binds sources/texts/<key>.md only for keys matching a 4-digit-year pattern, and the key "ostep" has no year, so the excerpt that now grounds U3-01/U3-03/U3-04/U3-05 (and reinforces U3-06) sits outside every report's freshness binding - a later edit to it would not invalidate the reports that relied on it. Corpus-wide pattern, not unit-specific authoring: wipoIP.md (unit 5's excerpt) has the same year-less key. This review mitigates the gap by recording the excerpt's verified comm...
- [advisory] The Further reading source links render the bare URL as the link text (e.g. "https://pages.cs.wisc.edu/~remzi/OSTEP/") on all four topic pages - render-inspect's bareUrlLinks advisory, confirmed in the desktop renders. A screen-reader user hears the raw URL; descriptive link text (the book or library page title) would be better. Advisory only; consistent with the corpus's current house pattern.

## Notes from earlier jobs on this unit
- (gict-300-u03-translate-r1, translate, codex) Translation stays draft pending accepted G3 and fresh independent G5 with rendered Urdu inspection.
- (gict-300-u03-translate-r1, translate, codex) Translation stays draft pending accepted G3 and fresh independent G5 with rendered Urdu inspection.
- (gict-300-u03-translate, translate, codex) Translation remains draft pending accepted G3 and fresh independent G5 with rendered Urdu inspection.
- (gict-300-u03-translate, translate, codex) Translation remains draft pending accepted G3 and fresh independent G5 with rendered Urdu inspection.

## Feedback from the previous attempt
the worker exited without committing any change


## Response snapshot

Confirmed that every in-scope G3 run002 finding for GICT-300 Unit 3 was already fixed on the branch (all 13 content gates pass) and committed only a Prompt History Record.

## Outcome

- Impact: repair_en for GICT-300 Unit 3 by claude (attempt 3).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 22 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Confirmed that every in-scope G3 run002 finding for GICT-300 Unit 3 was already fixed on the branch (all 13 content gates pass) and committed only a Prompt History Record.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - F9 (the `ostep` key has no year) is still open and needs an owner decision, because the fix touches the approved content-spec or `scripts/lib/review-evidence.mjs`.
  - Both G3 review runs allowed by ADR-0019 are used up; a G3 run 003 needs owner authorisation in `specs/decisions/log.md`.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 2 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
