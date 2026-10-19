---
id: 20261020
title: Repair GNAS Unit Three G3
stage: general
date: 2026-10-19
surface: agent
model: GPT-6
feature: gnas-301-unit-03
branch: crew/gnas-301-u03-repair_en
user: curriculum-owner
command: carry out .crew/brief.md
labels: [board-direct, content-repair, gnas-301]
links:
  spec: specs/content/gnas-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-1/gnas-301/unit-03/topic-01.mdx
  - docs/semester-1/gnas-301/unit-03/topic-02.mdx
  - docs/semester-1/gnas-301/unit-03/topic-03.mdx
  - docs/semester-1/gnas-301/unit-03/topic-04.mdx
  - docs/semester-1/gnas-301/unit-03/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-03/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-03/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-03/topic-04.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-03/unit-assessment.mdx
  - specs/content/gnas-301/concepts/unit-03.md
  - specs/content/gnas-301/coverage/unit-03.md
  - specs/content/gnas-301/sources/unit-03.md
  - specs/content/gnas-301/sources/texts/anwar-unit-2026.md
  - specs/content/gnas-301/sources/texts/nidcd-noise-2025.md
  - specs/content/gnas-301/sources/texts/who-noise-2011.md
  - specs/content/gnas-301/tasks.md
  - specs/content/gnas-301/reviews/unit-03/G2/20261019T143441329Z-gates.json
  - specs/content/gnas-301/reviews/unit-03/G2/logs-20261019T143441329Z/
tests:
  - scripts/heavy.sh npm test (26 files, 314 tests passed)
  - npm run check:content (all 13 gates passed after G2 refresh)
  - EN/UR MCQ balance, checklist preservation and figure-carrier preservation assertions (passed)
  - git diff --check (passed)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Applied remaining Unit 3 G3 advisories in the first and latest second-round reports.
Preserved already completed repairs: noise RRQ coverage 2/2/3/3, Lahore abstract wording,
MCQ 10 Understand tag and winter-only/Lahore-only misconception correction. No stale
passage was guessed at; the first-round overstatement was already absent and repaired.

Noise evidence: bound NIDCD hearing-risk and WHO non-auditory-health notes, cited in EN/UR,
and labelled the ladder conventional approximate reference values rather than local data.
Links: converted remaining bare links in all four EN topics and Urdu topics 3.3/3.4;
Urdu topics 3.1/3.2 already had descriptive links. Assessment: redistributed MCQ keys to
2 a / 2 b / 3 c / 3 d, varied RRQ 4 and 10 scenarios and their marking guidance in both
languages, and corrected the RRQ Bloom range. Graph: added the noise-controls concept,
removing RRQ 4 from the health-effects concept, with its authored Urdu label flagged for G5.
No translation was missing or skipped.

The shared Anwar excerpt has a misleading Unit 3 support note. Unit 3 now binds a corrected
copy under anwar-unit-2026, leaving other units' source inputs unchanged. The source's
verified abstract and bibliographic provenance are preserved. Appended the requested
advisory repairs row without ticking G3. The brief explicitly authorizes local commits,
overriding revise-topic's normal no-commit posture. No push, PR, build or server.

## Outcome

- Impact: Remaining latest-report advisories repaired; review status remains advisory.
- Tests: 314 unit tests and all 13 content gates passed; fresh G2 evidence records the repaired inputs.
- Files: Unit 3 EN/UR content, concept/source/coverage records, tracker and required PHR.
- Next prompts: Independent review only through the existing owner-governed review policy.
- Reflection: Check the latest report and existing repairs before editing.

## Handoff (for CEO and agents)

- Shipped / changed: Unit 3 bounded G3 repairs, including matching Urdu edits.
- Decisions the team must respect: No G3/G5 certification or publication state change; source copy isolates Unit 3 from Unit 6 evidence.
- Pending / next owner: G2 evidence refreshed for content commit d86017c9; independent reviewers own any further review. Two review rounds already exist.
- Paperclip issues affected: none; links.ticket is null.

## Evaluation notes (flywheel)

- Failure modes observed: Fresh checkout lacked ignored static/content-status.json; regenerated with npm run build:content-status. Source edits invalidated deterministic G2 evidence as expected.
- Graders run and results (PASS/FAIL): Unit tests PASS (314), diff whitespace PASS, all 13 content gates PASS, preservation assertions PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none required.
