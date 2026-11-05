---
id: 550
title: Repair GPKS-402 Unit 6 G3 findings
stage: repair
date: 2026-11-05
surface: agent
model: opencode
feature: gpks-402
branch: crew/gpks-402-u06-repair_en
user: crew
command: npm run check:content
labels: [crew, gpks-402, repair_en]
links:
  spec: specs/014-agent-review-governance/spec.md
  ticket: null
  adr: history/adr/0019-independent-agents-for-g3-g5-review.md
  pr: null
files:
  - docs/semester-2/gpks-402/unit-06/topic-01.mdx
  - docs/semester-2/gpks-402/unit-06/topic-02.mdx
  - docs/semester-2/gpks-402/unit-06/topic-03.mdx
  - docs/semester-2/gpks-402/unit-06/unit-assessment.mdx
  - specs/content/gpks-402/coverage/unit-06.md
  - specs/content/gpks-402/sources/unit-06.md
  - specs/content/gpks-402/sources/texts/mocc-2021-nccp.md
  - specs/content/gpks-402/sources/texts/worldbank-pdu-2025-unit-06.md
  - specs/content/gpks-402/sources/texts/nacta-nap-2014.md
  - specs/content/gpks-402/sources/texts/national-nutrition-survey-2018.md
  - specs/content/gpks-402/sources/texts/national-water-policy-2018.md
  - specs/content/gpks-402/sources/texts/paigham-e-pakistan-2018.md
  - specs/content/gpks-402/sources/texts/satp-pakistan-fatalities.md
  - specs/content/gpks-402/sources/texts/unicef-education-2024.md
  - specs/content/gpks-402/sources/texts/worldbank-poverty-equity-brief-2024.md
  - specs/content/gpks-402/tasks.md
  - specs/content/gpks-402/reviews/unit-06/G2/20261105T112904958Z-gates.json
tests:
  - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

The brief (crew job gpks-402-u06-repair_en) asks for the findings of the latest G3 report under
specs/content/gpks-402/reviews/unit-06/G3/ to be applied with the smallest edits that resolve each
finding, then a new Unit 6 G3 tracker row whose Suggestion begins "advisory: revise; repairs applied"
and names the report, with G3 left unticked. Scope is GPKS-402 Unit 6 only. Follow
.claude/skills/revise-topic/SKILL.md. Done when npm run check:content reports no finding that
origin/main does not also report, all work is committed on the branch with a conventional commit
message, and the final output ends with a CREW-SUMMARY line.

## Response snapshot

- F02: rewrote the World Bank PDU excerpt as labelled paraphrase, withdrew the fabricated
  quotations and invented section names, and bound the poverty threshold to the World Bank
  Poverty and Equity Brief (October 2024) and the population figures to the PBS 2023 Census.
- F03: bound NACTA's National Action Plan (2014), the Paigham-e-Pakistan declaration (2018) and
  the SATP fatality database for U6-06; qualified the death and cost figures; completed the Burki
  unavailability declaration with dated attempts and D-2026-0001 authorisation context.
- F04: added the missing ledger URLs for Dean (AKU eCommons) and MOCC (ministry PDF), corrected the
  MOCC excerpt to the real NCCP text (5.45 percent forest, no 25 percent standard, no 1,000 cubic
  metre benchmark), and qualified the flood and water figures with dates.
- F05: aligned the ERQ 2 rubric to its stem (unemployment and social safety nets, not extremism and
  NAP) and changed RRQ 8 to require one agricultural and one policy measure, matching its mark
  scheme.
- F06: defined geoeconomics, intercensal growth, youth dependency ratio, economic exclusion and
  military combat operations at first use, and shortened dense explanatory paragraphs.
- F07: added offline source cards and dated data to the Topic 6.2 inquiry and Topic 6.3 provincial
  research, revised the ERQ 5 rubric to credit critique of teacher agency and its structural limits,
  and stopped describing Gilgit-Baltistan and Azad Jammu and Kashmir as provinces.
- F01 and F08 remain host-supplied (provenance and rendered-page evidence) and are recorded as such
  in the tracker row; G3 stays open under ADR-0019.

## Outcome

- Impact: all eight G3 findings addressed where the crew can act; the unit's source ledger,
  coverage matrix and excerpts now agree, and the assessment task and scoring demands match.
- Tests: npm run check:content passes all 14 content gates (baseline was green; the G2 draft
  evidence was refreshed after the content edits).
- Files: listed above.
- Next prompts: a fresh independent G3 review of the repaired unit; the Urdu mirror remains a
  separate job.
- Reflection: the fabricated World Bank quotations were the root defect; the repair binds each
  surviving figure to a named, dated, open-access source and labels the rest as estimates.

## Handoff (for CEO and agents)

- Shipped / changed: the G3 repairs above, the refreshed G2 gate evidence, and the new Unit 6 G3
  tracker row (advisory: revise; repairs applied; G3 unticked).
- Decisions the team must respect: the World Bank PDU excerpt no longer supports the demographic or
  youth labour-market claims; the lower-middle-income poverty figure now rests on the Poverty and
  Equity Brief (October 2024); the 25 percent forest standard is withdrawn as unattributed.
- Pending / next owner: F01 provenance and F08 rendered-page evidence need a host-supplied author
  session ID and a render review; a fresh independent G3 review should follow.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: a bound excerpt can carry invented section names and quotations that no
  gate detects; the depth gate only checks that an excerpt exists, not that it is honest.
- Graders run and results (PASS/FAIL): npm run check:content PASS (14/14).
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): add a gate that flags "From <section>:" labels in
  sources/texts files whose section name does not appear in the cited publication's contents.
