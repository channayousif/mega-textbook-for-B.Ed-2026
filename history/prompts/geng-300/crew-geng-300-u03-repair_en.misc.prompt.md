---
id: crew-geng-300-u03-repair_en
title: crew repair_en GENG-300 unit 3
stage: misc
date: 2026-11-03
surface: agent
model: opencode
feature: geng-300
branch: crew/geng-300-u03-repair_en
user: crew
command: crew repair_en
labels: ["crew", "opencode", "repair_en"]
links:
  spec: specs/content/geng-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/geng-300/crew-geng-300-u03-repair_en.misc.prompt.md
 - specs/content/geng-300/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job geng-300-u03-repair_en

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/geng-300-u03-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/geng-300/reviews/unit-03/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 3 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GENG-300 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/geng-300/`, and `static/img/figures/geng-300/unit-03/`.

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
From `specs/content/geng-300/reviews/unit-03/G3/20261102T213029Z-g3-desk-24e957fb.json` (disposition: revise). Resolve each one:
- [uncertain] Actual author run identity and parent frozen-bundle handoff unavailable; independence cannot be verified.
- [uncertain] Conflicting duplicate D-2026-0019 entries at specs/decisions/log.md:744 and :787; intake Partition still cites placeholder owner confirmation. Owner clarification required.
- [uncertain] Fresh narrow-view and A4 print inspection unavailable within brief prohibition on builds and dev servers; full semantic and independent assessment review not performed.

## Response snapshot

Verified the three desk-report findings are provenance, authority and render handoff items with no author-repairable content defect, and appended an unticked Unit 3 G3 advisory repair row naming the latest desk report (20261102T213029Z-g3-desk-24e957fb.json).

## Outcome

- Impact: repair_en for GENG-300 Unit 3 by opencode (attempt 1).
- Tests: npm run check:content passed (13/13) after regenerating static/content-status.json.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Verified the three desk-report findings are provenance, authority and render handoff items with no author-repairable content defect, and appended an unticked Unit 3 G3 advisory repair row naming the latest desk report (20261102T213029Z-g3-desk-24e957fb.json).
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this branch does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the branch touches a protected path).
- Notes for the next job on this unit:
  - All three findings are owner/host handoff: author-run identity and parent frozen-bundle handoff unavailable; the D-2026-0019 three-vs-four-unit conflict and the D-2026-00XX intake placeholder need owner clarification; fresh narrow-view/A4 render inspection needs a permitted render host.
  - No content edit was made because the desk report contains no author-repairable content finding; check:content passes 13/13.
  - Fresh independent G3 needs owner authorisation under ADR-0019 (cycle limit).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
