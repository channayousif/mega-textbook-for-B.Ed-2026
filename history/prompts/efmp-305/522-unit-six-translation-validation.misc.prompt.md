---
id: 522
title: Unit six translation validation
stage: misc
date: 2026-10-19
surface: agent
model: gpt-6
feature: efmp-305
branch: crew/efmp-305-u06-translate-r1
user: crew
command: carry out .crew/brief.md
labels: ["board-direct", "crew", "codex", "translate"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/efmp-305/reviews/unit-06/G4/translation-handoff.md
  - history/prompts/efmp-305/522-unit-six-translation-validation.misc.prompt.md
tests:
  - npm run build:content-status
  - scripts/heavy.sh npm run check:content
  - temporary reviewed check followed by byte-for-byte restoration of both indexes
  - npm run figures:variants:check
  - six-pair front-matter, heading and component count assertions
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Continued the existing Urdu mirror rather than restarting it. Regenerated the missing gitignored content-status prerequisite, resolving the previous attempt's finding. Verified six paired files and figure variants, exercised conditional checks, and added a durable unit-scoped translation handoff. Translation flags and tracker statuses remain unchanged. No build, server, push or PR.

## Outcome

- Impact: all 13 draft content gates pass; missing local generated prerequisite repaired.
- Tests: figures:variants:check passes for 810 sources; six paired metadata, heading and component assertions pass. Temporary reviewed run passes validation and figure parity, with only expected open G4/G5 pipeline findings and content-status staleness caused by the flip. Both indexes restored byte-for-byte.
- Files: unit G4 handoff and this PHR; generated static/content-status.json remains ignored.
- Next prompts: accepted G3 evidence followed by fresh independent G5 and rendered Urdu inspection.
- Reflection: a missing generated report is repairable with its existing generator, without modifying gate scripts or committing generated data.

## Handoff (for CEO and agents)

- Shipped / changed: a reproducible handoff bound to the current English unit baseline, including checks and terminology proposals.
- Decisions the team must respect: translation_status stays draft; existing G4 in-progress row retained without initials. The translate-unit skill prohibits appending a G4 row. No G3/G5 completion, self-review, publication change or terminology-bank edit.
- Pending / next owner: curriculum owner resolves proposed labels listed in the unit concept graph; fresh G5 reviewer obtains accepted exact-version G3 dependency and rendered Urdu evidence. Build and dev server prohibited by the brief, so no new rendered evidence was produced here.
- Paperclip issues affected: no issue modified; historical TEX-77 terminology and TEX-78 English-review context retained in repository records.

## Evaluation notes (flywheel)

- Failure modes observed: previous attempt treated the missing gitignored report as out of scope; regenerated it through the documented npm script.
- Graders run and results (PASS/FAIL): draft check:content PASS, 13/13; figure variants PASS; structural assertions PASS; temporary reviewed check FAIL only on expected unfinished G4/G5 and generated-report state, with file, figure and terminology checks clean.
- Prompt variant (if applicable): crew efmp-305-u06-translate-r1 brief.
- Next experiment (smallest change to try): generate content-status before check:content on fresh worktrees.
