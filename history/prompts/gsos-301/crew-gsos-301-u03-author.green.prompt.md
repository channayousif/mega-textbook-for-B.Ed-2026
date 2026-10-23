---
id: crew-gsos-301-u03-author
title: crew author GSOS-301 unit 3
stage: misc
date: 2026-10-22
surface: agent
model: opencode
feature: gsos-301
branch: crew/gsos-301-u03-author
user: crew
command: crew author
labels: ["crew", "opencode", "author"]
links:
  spec: specs/content/gsos-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gsos-301/unit-03/index.mdx
 - docs/semester-2/gsos-301/unit-03/topic-01.mdx
 - docs/semester-2/gsos-301/unit-03/topic-02.mdx
 - docs/semester-2/gsos-301/unit-03/unit-assessment.mdx
 - docs/semester-2/gsos-301/unit-03/unit-teacher-notes.mdx
 - glossary.json
 - history/prompts/general/0855-gsos301-u03-fix-glossary-dupes.general.prompt.md
 - history/prompts/general/20261022-gsos301-u03-author-verify-and-phr.general.prompt.md
 - history/prompts/gsos-301/crew-gsos-301-u03-author-verify.misc.prompt.md
 - specs/content/gsos-301/concepts/unit-03.md
 - specs/content/gsos-301/coverage/unit-03.md
 - specs/content/gsos-301/figures/unit-03.md
 - specs/content/gsos-301/reviews/unit-03/G2/20261022T004504074Z-gates.json
 - specs/content/gsos-301/reviews/unit-03/G2/logs-20261022T004504074Z/check-bloom-bands.txt
 - specs/content/gsos-301/reviews/unit-03/G2/logs-20261022T004504074Z/check-concept-graph.txt
 - specs/content/gsos-301/reviews/unit-03/G2/logs-20261022T004504074Z/check-depth-gate.txt
 - specs/content/gsos-301/reviews/unit-03/G2/logs-20261022T004504074Z/check-docs-sync.txt
 - specs/content/gsos-301/reviews/unit-03/G2/logs-20261022T004504074Z/check-figures.txt
 - specs/content/gsos-301/reviews/unit-03/G2/logs-20261022T004504074Z/check-no-answer-keys.txt
 - specs/content/gsos-301/reviews/unit-03/G2/logs-20261022T004504074Z/check-no-em-dash.txt
 - specs/content/gsos-301/reviews/unit-03/G2/logs-20261022T004504074Z/validate-content.txt
 - specs/content/gsos-301/sources/unit-03.md
 - specs/content/gsos-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gsos-301-u03-author

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gsos-301-u03-author`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Author GSOS-301 Unit 3 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GSOS-301 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gsos-301/`, and `static/img/figures/gsos-301/unit-03/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Feedback from the previous attempt
The shared registries are append-only: keep every entry main has exactly as it is, add this branch's entries after them, give a new entry whose ID main already uses the next free ID (and update its references), and keep glossary.json valid JSON. This branch breaks that:
glossary.json has duplicate term(s): organization, bureaucracy


## Response snapshot

Fixed glossary.json on the gsos-301-u03-author branch by restoring 7 statistics terms the previous attempt deleted and removing the duplicate Organization/Bureaucracy entries, leaving all 465 main entries intact and appending only 8 genuinely new sociology terms (473 total, zero duplicates); all 13 content gates pass.

## Outcome

- Impact: author for GSOS-301 Unit 3 by opencode (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 23 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Fixed glossary.json on the gsos-301-u03-author branch by restoring 7 statistics terms the previous attempt deleted and removing the duplicate Organization/Bureaucracy entries, leaving all 465 main entries intact and appending only 8 genuinely new sociology terms (473 total, zero duplicates); all 13 content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Unit 3 English content (index, 2 topics, assessment, teacher notes) + governance artifacts (coverage, sources, figures, concepts) are authored and G2-gated from the previous attempt; next stage is G3 English review (separate job).
  - Figure manifest has 4 prompt-only rows (fig-U3-1 diagram, fig-U3-2 table, fig-U3-3 flowchart, fig-U3-4 table); figures are not yet rendered - that is a downstream generate-figures job.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
