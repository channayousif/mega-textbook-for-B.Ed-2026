---
id: 2445
title: Unit six G3 repair verification
stage: misc
date: 2026-11-03
surface: agent
model: GPT-6 Codex
feature: efmp-305
branch: crew/efmp-305-u06-repair_en
user: crew
command: Read .crew/brief.md and carry it out
labels: ["codex", "crew", "efmp-305", "unit-06"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/efmp-305/reviews/unit-06/G3/20261103-repair-notes.md
  - specs/content/efmp-305/tasks.md
  - history/prompts/efmp-305/2445-unit-six-g3-repair-verification.misc.prompt.md
tests:
  - npm run check:content (before and after repairs)
  - scripts/heavy.sh npm test
  - git diff --check
  - UNICEF PDF SHA-256 comparison and relevant passage inspection
  - npm run build:content-status (ignored local cache refresh)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Verified the depth finding is already resolved in current main: six English files total 149 reading minutes, inside 140-170. Retrieved the UNICEF PDF successfully, matched its preserved checksum, checked relevant passages and corrected locators. Added Unit 6 repair notes and appended the required advisory repair row. No learner-facing edits were needed, so no Urdu mirror edits were required. G3 remains unticked.

## Outcome

- ✅ Impact: Resolved source-retrieval uncertainty and recorded the current passing depth budget without changing the approved spec or padding/trimming prose.
- 🧪 Tests: 353 unit tests passed. Final content checks recorded below.
- 📁 Files: One Unit 6 repair note, one tracker and this PHR. Scratch artifacts stay in .crew/.
- 🔁 Next prompts: Fresh independent G3; existing draft Urdu still needs independent G5 and rendered inspection.
- 🧠 Reflection: The report described older reading estimates; verify current bytes before editing content.

## Handoff (for CEO and agents)

- Shipped / changed: Unit 6 supplemental UNICEF retrieval provenance, checked passage locators, and advisory Unit 6 G3 repair row naming 20261102T212207Z-g3-desk-5907f448.json.
- Decisions the team must respect: Keep the approved 140-170 band; retain empirical caveats; no certification, publication change or reviewer identity substitution.
- Pending / next owner: Independent reviewer owns fresh G3; G5 and fresh Urdu render inspection remain pending from earlier jobs.
- Paperclip issues affected: No ticket supplied in the crew brief; historical Unit 6 references TEX-78 and TEX-84 are unchanged.

## Evaluation notes (flywheel)

- Failure modes observed: Reported 193-minute total does not reproduce: current values are 6, 33, 38, 34, 29, 9. Earlier HTTP 403 no longer reproduces. Editing shared source records invalidated Unit 1 and Unit 6 G2 evidence and generated status; those edits were replaced with Unit 6 review-folder repair notes to preserve existing bindings. The tracker edit required refreshing the ignored content-status cache; no generated file is committed.
- Graders run and results (PASS/FAIL): Unit tests PASS: 29 files, 353 tests. All 13 content gates PASS after ignored content-status cache refresh; git diff --check PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Fresh independent review of current inputs.
