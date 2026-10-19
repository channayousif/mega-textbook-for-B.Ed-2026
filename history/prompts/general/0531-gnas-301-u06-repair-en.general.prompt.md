---
id: "0531"
title: "Apply GNAS-301 Unit 6 G3 advisory repairs and glossary tagging"
stage: general
date: 2026-10-19
surface: agent
model: gemini-3.1-pro-high
feature: none
branch: crew/gnas-301-u06-repair_en
user: M Yousif Channa
command: Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.
labels: ["board-direct", "crew", "gnas-301", "g3-repair"]
links:
  spec: specs/content/gnas-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-1/gnas-301/unit-06/topic-01.mdx
  - docs/semester-1/gnas-301/unit-06/topic-02.mdx
  - docs/semester-1/gnas-301/unit-06/topic-04.mdx
  - docs/semester-1/gnas-301/unit-06/topic-06.mdx
  - glossary.json
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-06/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-06/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-06/topic-04.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-06/topic-06.mdx
  - specs/content/gnas-301/sources/texts/adnan2024.md
  - specs/content/gnas-301/tasks.md
  - specs/content/gnas-301/reviews/unit-06/G2/20261019T152104631Z-gates.json
  - history/prompts/general/0531-gnas-301-u06-repair-en.general.prompt.md
tests:
  - npm run check:content (all 13 content gates passed)
  - npm run check:no-em-dash (0 em dashes)
  - npm run validate:content (clean)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Applied all remaining findings from the GNAS-301 Unit 6 G3 report (agent-g3-gnas301-u6-run001.json):
1. Restored missing `Climate change` definition to glossary.json.
2. Tagged first use of all 5 key terms (Toxic substance, Dose-response, Greenhouse effect, Global warming, Climate change) with `<Glossary>` tags in both English and Urdu mirror topics (topics 6.1, 6.2, 6.4, 6.6).
3. Softened Karachi heat-action plan efficacy claim in EN/UR topic-06.
4. Extended adnan2024 abstract excerpt to bind the Pakistan climate attribution claim.
5. Appended new unticked G3 tracker row in specs/content/gnas-301/tasks.md starting with "advisory: revise; repairs applied; report reviews/unit-06/G3/agent-g3-gnas301-u6-run001.json".
6. Regenerated G2 gate evidence via scripts/prepare-gate-evidence.mjs following content changes and updated the G2 tracker row.

## Outcome

- Impact: GNAS-301 Unit 6 G3 findings resolved, bilingual glossary tags applied, G2 evidence refreshed, all 13 content gates passing.
- Tests: npm run check:content (13/13 passed).
- Files: listed above.
- Next prompts: None required for this repair task.
- Reflection: Modifying bound MDX files invalidates G2 gate evidence manifests; running prepare-gate-evidence.mjs immediately re-anchors the G2 evidence to the modified content.

## Handoff (for CEO and agents)

- Shipped / changed: Unit 6 G3 advisory repairs, glossary tagging, fresh G2 evidence, and tasks.md tracker rows.
- Decisions the team must respect: G3 remains unticked per brief (disposition revise, repairs applied).
- Pending / next owner: Independent G3 re-review or owner intake.
- Paperclip issues affected: None.

## Evaluation notes (flywheel)

- Failure modes observed: check:pipeline-gate initially failed on stale G2 input manifest after content edits; resolved by regenerating G2 evidence with prepare-gate-evidence.mjs.
- Graders run and results (PASS/FAIL): npm run check:content PASS (13/13).
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
