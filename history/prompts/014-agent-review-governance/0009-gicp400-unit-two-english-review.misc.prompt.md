---
id: 0009
title: GICP400 Unit Two English Review
stage: misc
date: 2026-11-06
surface: agent
model: Codex based on GPT-6, exact revision unavailable
feature: 014-agent-review-governance
branch: crew/gicp-400-u02-review_en
user: owner
command: Read and execute .crew/brief.md
labels: [codex, gicp-400, g3-review, advisory]
links:
  spec: specs/014-agent-review-governance/spec.md
  ticket: null
  adr: history/adr/0019-independent-agents-for-g3-g5-review.md
  pr: null
files:
 - specs/content/gicp-400/reviews/unit-02/G3/codex-20261106.json
 - specs/content/gicp-400/reviews/unit-02/G3/codex-20261106/
 - specs/content/gicp-400/tasks.md
 - history/prompts/014-agent-review-governance/0009-gicp400-unit-two-english-review.misc.prompt.md
tests:
 - Six mandatory deterministic review checks passed.
 - npm run check:content passed all 14 gates.
 - Review evidence validate passed with escalate disposition.
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Produced an independent advisory G3 escalation for Unit 2, including prepared input hashes, source checks and retrieval limits, independent assessment derivations, command logs and a readable summary. Added the explicitly requested advisory tracker note without completing G3. No content, figure, policy or publication state was changed. The advisory tracker note required refreshing the ignored generated content-status cache; all 14 gates then passed again.

## Outcome

- ✅ Impact: Review findings are reviewable and tied to current Unit 2 inputs; certification is withheld.
- 🧪 Tests: Six required deterministic checks and all 14 content gates passed; report validates structurally as escalate.
- 📁 Files: New review report and evidence folder, Unit 2 advisory tracker row, this PHR.
- 🔁 Next prompts: Parent supplies provenance and original-source evidence; authorised reviewer completes browser/A4 inspection.
- 🧠 Reflection: Real evidence limits must remain visible even when deterministic gates pass.

## Handoff (for CEO and agents)

- Shipped / changed: Advisory G3 evidence and tracker note only, committed on the assigned branch.
- Decisions the team must respect: G3 stays open and unsigned. No self-signing, human initials, source edits, translation transition or publication. The crew brief explicitly authorises the advisory tracker note despite the skill's ordinary tracker-write prohibition.
- Pending / next owner: Parent/owner supplies actual author and reviewer session provenance and exact model revision. A reviewer with permitted browser access inspects desktop/narrow and A4 views and checks unavailable source passages. A separate author may reconsider Apply labels on assessment MCQs 4 and 8.
- Paperclip issues affected: None supplied; crew job gicp-400-u02-review_en.

## Evaluation notes (flywheel)

- Failure modes observed: Several source URLs time out, deny access, return robot verification or exceed tool size limits. Browser work is prohibited by the brief. Initial derivation file write used unavailable python; answers had already been reasoned independently, and the later recording explicitly discloses the failure and timing.
- Graders run and results (PASS/FAIL): PASS six deterministic checks, PASS full content suite, PASS structural evidence validation. Accessibility and full source support UNVERIFIED; disposition escalate.
- Prompt variant (if applicable): None.
- Next experiment (smallest change to try): Supply a prepared frozen source bundle with host-attested identities and permit required current render inspection in a separate fresh review session.
