---
id: crew-gsos-301-u05-repair_en
title: crew repair_en GSOS-301 unit 5
stage: misc
date: 2026-11-05
surface: agent
model: codex
feature: gsos-301
branch: crew/gsos-301-u05-repair_en
user: crew
command: crew repair_en
labels: ["crew", "codex", "repair_en"]
links:
  spec: specs/content/gsos-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/550-repair-gsos301-unit-five-sources.general.prompt.md
 - specs/content/gsos-301/coverage/unit-05.md
 - specs/content/gsos-301/reviews/unit-05/G2/20261105T173800809Z-gates.json
 - specs/content/gsos-301/reviews/unit-05/G2/logs-20261105T173800809Z/check-bloom-bands.txt
 - specs/content/gsos-301/reviews/unit-05/G2/logs-20261105T173800809Z/check-concept-graph.txt
 - specs/content/gsos-301/reviews/unit-05/G2/logs-20261105T173800809Z/check-depth-gate.txt
 - specs/content/gsos-301/reviews/unit-05/G2/logs-20261105T173800809Z/check-docs-sync.txt
 - specs/content/gsos-301/reviews/unit-05/G2/logs-20261105T173800809Z/check-figures.txt
 - specs/content/gsos-301/reviews/unit-05/G2/logs-20261105T173800809Z/check-no-answer-keys.txt
 - specs/content/gsos-301/reviews/unit-05/G2/logs-20261105T173800809Z/check-no-em-dash.txt
 - specs/content/gsos-301/reviews/unit-05/G2/logs-20261105T173800809Z/validate-content.txt
 - specs/content/gsos-301/reviews/unit-05/G3/repair-handoff-20261105.md
 - specs/content/gsos-301/sources/texts/u05-andrabi2015.md
 - specs/content/gsos-301/sources/texts/u05-cii-functions.md
 - specs/content/gsos-301/sources/texts/u05-who-lhw.md
 - specs/content/gsos-301/sources/unit-05.md
 - specs/content/gsos-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gsos-301-u05-repair_en

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gsos-301-u05-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/gsos-301/reviews/unit-05/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 5 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GSOS-301 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gsos-301/`, and `static/img/figures/gsos-301/unit-05/`.

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
From `specs/content/gsos-301/reviews/unit-05/G3/20261102T212207Z-g3-desk-92fc9b44.json` (disposition: revise). Resolve each one:
- [blocking] Render inspection (visual accessibility: small-screen layout at 360px, table scrollability, A4 print views, figure clipping) cannot be performed. The crew job constraint prohibits running npm run build, a dev server, or Playwright, all of which are required to produce a rendered page for inspection. Structural accessibility checks (alt text, heading hierarchy, link text, SVG role/title/desc, figure text measurement) all pass from source, but a render-review requires a live build. This is a tooling limitation, not a content defect. A separate render inspection is required before this unit ca...
- [advisory] OpenStax section 15.1 (Religion) was opened by the authoring team but its wording was not extracted, so the religion subsection's source support relies on a conerly2021 section that was read only at a general level plus Durkheim carried from Unit 1. The religion claims themselves (meaning, moral guidance, cohesion/identity, life-course rituals, sociology studies what religion does without judging belief) are well-established sociological common ground, but a section 15.1 excerpt would strengthen the sources file.
- [advisory] The three no-external-source items in sources/unit-05.md (Lady Health Worker programme started 1994, spread of low-fee private schooling, Council of Islamic Ideology advisory role) are general Pakistani knowledge without a bound source. They are stated in general terms, which is honest, but a reviewer with access to a confirming source (e.g., a government health document for the 1994 date, Constitution of Pakistan Article 230 for the Council) could tighten them.

## Notes from earlier jobs on this unit
- (gsos-301-u05-review_en, review_en, opencode) The blocking finding is the unverified visual accessibility (render review). A separate render inspection (build + serve + small-screen/print checks) must be run before this unit can be certified G3. The three no-external-source items (Lady Health Worker 1994 start, low-fee private schooling spread, Council of Islamic Ideology advisory role) and the unextracted OpenStax 15.1 wording are advisory only.
- (gsos-301-u05-author, author, claude) Three Pakistani facts are not tied to a source and are marked `no-external-source` for the G3 reviewer to check: the Lady Health Worker programme starting in 1994, the spread of low-fee private schools, and the Council of Islamic Ideology's advisory role.
- (gsos-301-u05-author, author, claude) The Urdu translation job needs to make `.ur.svg` versions of fig-U5-1 to fig-U5-4. All 14 Urdu concept labels are newly authored (none are in `terminology.csv`) and need G5 review.
- (gsos-301-u05-author, author, claude) The sharp image renderer draws these SVGs solid black because it can't read their colour variables, so to preview one, substitute the colour values first.


## Response snapshot

Strengthened Unit 5 source evidence and recorded repairs while leaving G3 unticked.

## Outcome

- Impact: repair_en for GSOS-301 Unit 5 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 17 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Strengthened Unit 5 source evidence and recorded repairs while leaving G3 unticked.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Render inspection remains blocked by the brief; a permitted session must perform mobile/print checks before G3 can close.
  - Render inspection remains blocked by the brief; a permitted session must perform mobile/print checks before G3 can close.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
