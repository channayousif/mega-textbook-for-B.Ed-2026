---
id: 0124
title: Unit two independent G3 review
stage: misc
date: 2026-10-17
surface: agent
model: GPT-6 Codex (exact deployed revision unavailable)
feature: efmp-304
branch: crew/efmp-304-u02-review_en
user: board
command: Read .crew/brief.md
labels: [board-direct, crew, efmp-304, G3, advisory-review]
links:
  spec: specs/014-agent-review-governance/spec.md
  ticket: null
  adr: history/adr/0019-independent-agents-for-g3-g5-review.md
  pr: null
files:
  - specs/content/efmp-304/reviews/unit-02/G3/01a14a38-39b5-7ca3-b776-327860ede213.json
  - specs/content/efmp-304/reviews/unit-02/G3/crew-20261017/
  - specs/content/efmp-304/tasks.md
  - history/prompts/efmp-304/0124-unit-two-independent-g3-review.misc.prompt.md
tests:
  - Six mandatory deterministic npm commands passed individually
  - npm run check:content baseline and final comparison
  - scripts/heavy.sh node scripts/measure-figure-text.mjs (exit 1, real figure defects)
  - Supplementary Chromium SVG screenshots inspected (exit 0)
  - Review input verification (103 entries, no mismatch)
  - node scripts/review-evidence.mjs validate (report format and freshness)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Produced an input-bound independent G3 advisory report with disposition escalate, a readable summary, independent assessment solutions, command logs and native SVG screenshots. Updated only Unit 2's advisory G3 tracker row, keeping it open and unsigned. Reviewed content was not changed. Recorded missing author session identity, exact model revision and mandatory Docusaurus narrow/print inspection instead of inventing evidence.

## Outcome

- Impact: conceptual, source-support, assessment and figure defects now have precise repair requests.
- Tests: six mandatory npm checks pass; content suite has the same pre-existing missing generated content-status artifact as origin/main; browser geometry confirms clipped figure text.
- Files: new Unit 2 G3 evidence and this PHR; Unit 2 tracker advisory note.
- Next prompts: separate author repairs, host supplies complete provenance and permitted fresh page rendering, then fresh independent review.
- Reflection: passing deterministic gates does not establish conceptual correctness or SVG text geometry.

## Handoff (for CEO and agents)

- Shipped / changed: unsigned advisory escalate report, hashed evidence, assessment work, visual findings and open G3 tracker note.
- Decisions the team must respect: no G3/G5 completion, human initials, self-signature, registry changes, content rewrite or publication action. The brief's explicit advisory tracker instruction supplies the bounded exception to the review skill's general no-tracker-writing rule.
- Pending / next owner: separate author owns report F01-F09 repairs; curriculum owner/host owns F10 provenance and actual narrow/A4 page render handoff, and F11 out-of-scope course overview mismatch. Preserve this attempt and carry unresolved findings into the next fresh review.
- Paperclip issues affected: none changed; historical authorship relates to TEX-23, but no current job ticket was supplied.

## Evaluation notes (flywheel)

- Failure modes observed: figure gate misses glyph overflow; source note discloses inference while prose asserts quotation; RRQ model invents unstated comparison data; Bloom labels exceed actual task demand.
- Graders run and results (PASS/FAIL): six mandatory deterministic checks PASS; content suite 12/13 with baseline-only generated-artifact failure; supplementary geometry FAIL, findings retained; structural evidence validation recorded separately in review directory.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): author repairs the report's concrete examples, then host prepares fresh frozen inputs and supplies real rendered pages for an independent recheck.
