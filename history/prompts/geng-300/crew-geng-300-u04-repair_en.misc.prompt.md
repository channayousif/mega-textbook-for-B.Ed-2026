---
id: crew-geng-300-u04-repair_en
title: crew repair_en GENG-300 unit 4
stage: misc
date: 2026-11-03
surface: agent
model: agy
feature: geng-300
branch: crew/geng-300-u04-repair_en
user: crew
command: crew repair_en
labels: ["crew", "agy", "repair_en"]
links:
  spec: specs/content/geng-300/content-spec.md
  ticket: null
  adr: history/adr/0019-independent-agents-for-g3-g5-review.md
  pr: null
files:
  - docs/semester-1/geng-300/unit-04/topic-01.mdx
  - docs/semester-1/geng-300/unit-04/topic-02.mdx
  - docs/semester-1/geng-300/unit-04/topic-03.mdx
  - history/prompts/geng-300/crew-geng-300-u04-repair_en.misc.prompt.md
  - specs/content/geng-300/reviews/unit-04/G2/20261103T080843667Z-gates.json
  - specs/content/geng-300/reviews/unit-04/repair-en-20261103.md
  - specs/content/geng-300/sources/unit-04.md
  - specs/content/geng-300/tasks.md
  - static/content-status.json
  - static/img/figures/geng-300/unit-04/fig-U4-1.dark.svg
  - static/img/figures/geng-300/unit-04/fig-U4-1.svg
tests:
  - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

# Crew job geng-300-u04-repair_en

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-300-u04-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/geng-300/reviews/unit-04/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 4 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GENG-300 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/geng-300/`, and `static/img/figures/geng-300/unit-04/`.

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
From `specs/content/geng-300/reviews/unit-04/G3/20261102T212207Z-g3-desk-f85a6c35.json` (disposition: revise). Resolve each one:
- [blocking] render-review cannot be performed: job constraints prohibit running npm run build or starting a dev server, so visual inspection of rendered pages and print views is impossible. This is a required check for a passing G3 report per the review-evidence contract.
- [advisory] static/img/figures/geng-300/unit-04/fig-U4-1.svg: text-geometry problem detected by measure-figure-text.mjs. The text closing for the occasion extends to x=696.9, overprinting the wordmark which starts at x=675.7. Additionally, the .panel shape [460,378,780,458] collides with the wordmark by 92.7 x 8.5px.
- [advisory] All four primary sources (hutchinson1987, downes2010, hall1976, brownLevinson1987) are declared unretrievable print monographs per D-2026-0001. Declarations are honest and complete, but claims cannot be independently verified.

## Notes from earlier jobs on this unit
- (geng-300-u04-fix, fix, opencode) G3 en-review row is marked stale  -  needs a fresh independent G3 review run after this geometry fix. The figure geometry check (measure-figure-text.mjs) exits 0 for all unit-04 SVGs; the earlier "panel collides with wordmark" note is cosmetic only.

## Response snapshot

Applied repairs for the latest Unit 4 G3 report (20261102T212207Z-g3-desk-f85a6c35.json):
1. Fixed fig-U4-1 SVG geometry by extending the canvas from 470 to 500 px high, moving the wordmark baseline from y=460 to y=488 outside the table panels, and wrapping letter closing text to eliminate collision. Regenerated the dark variant and updated topic-01.mdx Figure carrier height to 500.
2. Disclosed unverified source limitations in topics 4.1, 4.2 and 4.3 explanations and in specs/content/geng-300/sources/unit-04.md under D-2026-0001.
3. Noted render-review blocker deferral to build/server environment in repair-en-20261103.md and tracker.
4. Merged origin/main, union-resolved tracker conflict, and appended the advisory repairs tracker row for Unit 4 G3 naming report 20261102T212207Z-g3-desk-f85a6c35.json with G3 unticked.
5. Re-evidenced G2 en-draft gate via prepare-gate-evidence.mjs after input commits, updated G2 tracker row, rebuilt content status, and verified all 13 content gates pass.

## Outcome

- ✅ Impact: Bounded repair of latest Unit 4 G3 findings; G3 remains open and unticked.
- 🧪 Tests: `npm run check:content` passed (13/13 gates).
- 📁 Files: Unit 4 topics, figures, sources, tasks, G2 gate evidence, repair handoff.
- 🔁 Next prompts: Fresh independent G3 review run for Unit 4.
- 🧠 Reflection: G2 gate evidence binds committed inputs; refreshing G2 after content revisions keeps the pipeline gate green.

## Handoff (for CEO and agents)

- Shipped / changed: Separated fig-U4-1 wordmark footer, disclosed source limitations, refreshed G2 gates, updated G3 tracker row.
- Decisions the team must respect: G3 remains open and unsigned; original reports preserved; no push or PR.
- Pending / next owner: Independent G3 reviewer to perform review with full renders and print inspection.
- Paperclip issues affected: null

## Evaluation notes (flywheel)

- Failure modes observed: G2 input manifest stale after content edits; refreshed via prepare-gate-evidence.mjs.
- Graders run and results (PASS/FAIL): `npm run check:content` PASS 13/13.
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): none
