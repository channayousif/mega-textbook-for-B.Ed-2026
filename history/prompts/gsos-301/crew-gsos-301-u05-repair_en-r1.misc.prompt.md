---
id: crew-gsos-301-u05-repair_en-r1
title: crew repair_en GSOS-301 unit 5
stage: misc
date: 2026-11-10
surface: agent
model: opencode
feature: gsos-301
branch: crew/gsos-301-u05-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "opencode", "repair_en"]
links:
  spec: specs/content/gsos-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gsos-301/crew-gsos-301-u05-repair_en-r1.misc.prompt.md
 - specs/content/gsos-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gsos-301-u05-repair_en-r1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gsos-301-u05-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
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
From `specs/content/gsos-301/reviews/unit-05/G3/20261108T203238Z-g3-desk-563e3167.json` (disposition: revise). Resolve each one:
- [blocking] Render inspection (visual accessibility: small-screen layout at 360px, table scrollability, A4 print views, figure clipping) cannot be performed. The crew job constraint prohibits running npm run build, a dev server, or Playwright, all of which are required to produce a rendered page for inspection. Structural accessibility checks (alt text, heading hierarchy, link text, SVG role/title/desc, figure text measurement) all pass from source, but a render-review requires a live build. This is a tooling limitation, not a content defect. A separate render inspection is required before this unit ca...
- [advisory] OpenStax section 15.1 (Religion) was opened by the authoring team but its wording was not extracted, so the religion subsection's source support relies on a conerly2021 section that was read only at a general level plus Durkheim carried from Unit 1. The religion claims themselves (meaning, moral guidance, cohesion/identity, life-course rituals, sociology studies what religion does without judging belief) are well-established sociological common ground, but a section 15.1 excerpt would strengthen the sources file.
- [advisory] The three no-external-source items in sources/unit-05.md (Lady Health Worker programme started 1994, spread of low-fee private schooling, Council of Islamic Ideology advisory role) are general Pakistani knowledge without a bound source. They are stated in general terms, which is honest, but a reviewer with access to a confirming source (e.g., a government health document for the 1994 date, Constitution of Pakistan Article 230 for the Council) could tighten them.

## Notes from earlier jobs on this unit
- (gsos-301-u05-repair_en-conflict1, fix, opencode) Render inspection remains blocked by the brief; a permitted session must perform mobile/print checks before G3 can close.
- (gsos-301-u05-repair_en-conflict1, fix, opencode) The Urdu translation job still needs `.ur.svg` variants of fig-U5-1 to fig-U5-4 (14 new Urdu concept labels pending G5 review).
- (gsos-301-u05-repair_en, repair_en, codex) Render inspection remains blocked by the brief; a permitted session must perform mobile/print checks before G3 can close.
- (gsos-301-u05-repair_en, repair_en, codex) Render inspection remains blocked by the brief; a permitted session must perform mobile/print checks before G3 can close.
- (gsos-301-u05-review_en, review_en, opencode) The blocking finding is the unverified visual accessibility (render review). A separate render inspection (build + serve + small-screen/print checks) must be run before this unit can be certified G3. The three no-external-source items (Lady Health Worker 1994 start, low-fee private schooling spread, Council of Islamic Ideology advisory role) and the unextracted OpenStax 15.1 wording are advisory only.

## Feedback from the previous attempt
the worker exited without committing any change

## Response snapshot

Verified the 20261108 G3 desk report restates the already-repaired 20261102 findings against the post-repair bytes, appended the unticked advisory Unit 5 G3 tracker row naming it, and committed the row plus PHR with all 14 content gates passing.

## Outcome

- Impact: repair_en for GSOS-301 Unit 5 by opencode (attempt 1).
- Tests: npm run check:content passed (14/14) in the job worktree.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Verified the 20261108 G3 desk report restates the already-repaired 20261102 findings against the post-repair bytes, appended the unticked advisory Unit 5 G3 tracker row naming it, and committed the row plus PHR with all 14 content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this commit does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the commit touches a protected path).
- Notes for the next job on this unit:
  - G3 stays unticked; the blocking 360px/table-scroll/A4-print/figure-clipping render inspection remains unperformed because the brief prohibits build/server/Playwright; a permitted session must inspect both topics and the assessment before a fresh independent G3 decision.
  - The Urdu translation job still needs `.ur.svg` variants of fig-U5-1 to fig-U5-4 (14 new Urdu concept labels pending G5 review).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
