---
id: crew-gqur-301-u02-repair_en-r1
title: crew repair_en GQUR-301 unit 2
stage: misc
date: 2026-11-10
surface: agent
model: opencode
feature: gqur-301
branch: crew/gqur-301-u02-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "opencode", "repair_en"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261189-repair-gqur301-unit-two-g3.general.prompt.md
 - specs/content/gqur-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u02-repair_en-r1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u02-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/gqur-301/reviews/unit-02/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 2 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-301 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-02/`.

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
From `specs/content/gqur-301/reviews/unit-02/G3/20261108T203238Z-g3-desk-e1b082b9.json` (disposition: revise). Resolve each one:
- [blocking] F1: fig-U2-3.svg bar heights contradict its labelled linear scale; pie sectors misrepresent counts and do not close. See summary F1.
- [blocking] F2: unit-assessment.mdx RRQ 1/5 and ERQ 2 impose unsupported interval-width choices; MCQ 4 lacks an explicit single-best criterion. See summary F2.
- [blocking] F3: topic-01 Summative task has no Analyze-or-higher rubric criterion. See summary F3.
- [blocking] F4: topic-02 chart production and ERQ 5 lack worked procedural scaffolding, with inconsistent final numeric bin width. See summary F4.
- [uncertain] Actual author run identity, exact model snapshot and parent-frozen G3 handoff unavailable; cannot fully verify provenance.
- [uncertain] Fresh G1 evaluation after the 16-unit restructure is absent; tracker G1 remains open. Owner/evaluator must resolve authority.
- [uncertain] Required rendered narrow-screen and print evidence unavailable under explicit job restrictions; accessibility remains unverified.
- [uncertain] Supplied assessment guidance was read before calculations; a fresh answer-blind assessment review is required.
- [uncertain] Live primary-source inspection is supplemental and not captured in the parent input bundle; source verification remains incomplete.

## Notes from earlier jobs on this unit
- (gqur-301-u02-repair_en, repair_en, codex) G3 remains open; independent review, authority/provenance checks and permitted visual checks are pending. Urdu mirror is absent.
- (gqur-301-u02-repair_en, repair_en, codex) G3 remains open; independent review, authority/provenance checks and permitted visual checks are pending. Urdu mirror is absent.
- (gqur-301-u02-fix, fix, codex) Unit 2 needs a fresh independent G3 review; existing findings remain unresolved.
- (gqur-301-u02-fix, fix, codex) Unit 2 needs a fresh independent G3 review; existing findings remain unresolved.
- (gqur-301-u02-review_en-r1, review_en, codex) Four revision requests need separate author repair; provenance, source and rendered evidence remain incomplete.


## Response snapshot

Verified the latest G3 desk report's F1-F4 findings are already resolved in the current bytes (repair commit b35bd9059) and appended the required unticked Unit 2 G3 advisory repair row naming specs/content/gqur-301/reviews/unit-02/G3/20261108T203238Z-g3-desk-e1b082b9.json.

## Outcome

- Impact: repair_en for GQUR-301 Unit 2 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Verified the latest G3 desk report's F1-F4 findings are already resolved in the current bytes (repair commit b35bd9059) and appended the required unticked Unit 2 G3 advisory repair row naming specs/content/gqur-301/reviews/unit-02/G3/20261108T203238Z-g3-desk-e1b082b9.json.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The report's input manifest does not match the current docs bytes, so provenance is uncertain; F1-F4 were verified against the current bytes (fig-U2-3.svg geometry, conditional RRQ 1/5 and ERQ 2, MCQ 4 "exactly four", topic-01 Analyze rubric, topic-02 worked scaffolding).
  - No Urdu mirror exists under i18n/ur/.../gqur-301/unit-02; provenance, G1, rendered accessibility, answer-blind assessment and bound-source checks remain for the owner/evaluator.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
