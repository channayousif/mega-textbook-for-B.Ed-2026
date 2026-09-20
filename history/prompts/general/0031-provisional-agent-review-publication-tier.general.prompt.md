---
id: 0031
title: Provisional agent review publication tier
stage: general
date: 2026-09-18
surface: agent
model: claude-opus-5
feature: none
branch: provisional-review-publication-tier
user: M Yousif Channa
command: "why gates keep failing, we should make our skills and agents more capable"
labels: ["governance", "review", "pipeline-gate", "adr-0025", "constitution", "efmp-302"]
links:
  spec: specs/014-agent-review-governance/contracts/review-evidence.md
  ticket: null
  adr: history/adr/0025-provisional-agent-review-publication-tier.md
  pr: null
files:
 - scripts/lib/review-criteria.mjs
 - scripts/lib/review-evidence.mjs
 - scripts/lib/tracker-rows.mjs
 - scripts/check-pipeline-gate.mjs
 - scripts/prepare-gate-evidence.mjs
 - src/components/ReviewStatusBanner.tsx
 - src/theme/DocItem/Content.tsx
 - src/lib/contentStatus.ts
 - src/lib/reviewQueue.ts
 - src/css/custom.css
 - docusaurus.config.ts
 - .specify/memory/constitution.md
 - history/adr/0025-provisional-agent-review-publication-tier.md
 - specs/014-agent-review-governance/contracts/review-evidence.md
 - specs/content/efmp-302/tasks.md
 - tests/review/evidence.test.mjs
 - tests/unit/pipeline-gate.test.mjs
 - tests/unit/reviewQueue.test.mjs
tests:
 - npx vitest run (272 passed)
 - npm run test:review (27 passed, original 21 unmodified)
 - all 8 content gates pass; check:pipeline-gate 10 findings -> 5
 - npm run build; banner verified in server-rendered HTML, EN + UR
---

## Prompt

why gates keep failing, we should make our skills and agents more capable so that human reviewer is not required to be called, and a review agent must be capable enough to decide and make the content live with final review pending status.

## Response snapshot

Investigated the premise before acting on it, and it turned out to be inverted.

The gates were not failing on quality. Eight of nine passed. `check:pipeline-gate`
never inspects content; it checks attestation. And the reviewer was not weak: both
Unit 2 G3 attempts reached `escalate` with 12 and 13 unresolved blocking findings,
catching a fabricated Ehrich et al. attribution and a false NACTE claim.

Traced the actual blockage to two places. Five of the ten failing rows were
`G2 en-draft`, which `review-evidence.mjs:238` refuses to ANY agent identity at any
capability level. The other five died in `signedJson` on
`CONTENT_REVIEW_PUBLIC_KEY is not provisioned`, with an empty registry, zero `.sig`
files and no qualification evidence. So a more capable reviewer fixes zero of the ten
rows. ADR-0023 section 3 had chosen this deliberately and its Consequences section
predicted the complaint verbatim; its Alternative C deferred the fix until the
comparator base grew, which Units 2-6 are.

The owner's "final review pending" instinct was the sound part, and smaller than it
sounded: the gate had been conflating "certified complete" with "may be visible", and
the tracker already separates them.

Built it as a third state rather than a relaxation. `acceptReport` is untouched, so
all 21 existing mutation tests pass unmodified. `acceptProvisionalReport` takes an
unsigned report requiring everything except the trust root, plus a new rejection of
placeholder run identities. G2 closes on deterministic gate evidence under
`auto:gates` with no reviewer identity. The banner renders from tracker-derived state
in the theme, so no MDX and no frontmatter key.

Proved it end to end on real content: produced genuine G2 evidence for Units 2-6 and
took the gate from 10 findings to 5, all of which are `G3 en-review` rows that
legitimately need judgement.

## Outcome

- ✅ Impact: `check:pipeline-gate` 10 findings -> 5; everything machine-checkable is now closed by machines, and content can publish per unit as each earns an agent pass.
- 🧪 Tests: 272 vitest + 27 node:test. The 21 pre-existing `acceptReport` mutation tests pass byte-unmodified, which is the proof the signed path was not weakened.
- 📁 Files: 18 across four commits, plus this record.
- 🔁 Next prompts: let run 002 finish and produce a Unit 2 G3 report; if it passes, make Unit 2 the first provisional publication; then Feature 014 T007/T008 for real certification.
- 🧠 Reflection: the instruction contained a false premise ("make the agents more capable") wrapped around a correct instinct ("final review pending"). Acting on the literal request would have burned effort on reviewer capability and fixed nothing. Checking the failure path first is what found that five of the rows had no agent path at all.

## Evaluation notes (flywheel)

- Failure modes observed: one real self-inflicted error. Bumping the constitution version, I overwrote the `Version change: 3.0.0 -> 4.0.0` line inside the v4.0.0 SYNC IMPACT REPORT, which is a historical record rather than a field. Caught by diffing against HEAD before committing; restored it and prepended a new v4.1.0 report instead.
- Near miss worth recording: `src/lib/reviewQueue.ts:130` filters on `gates.G3 === 'open'`. Adding a third state would have silently dropped provisional units out of the human review queue - the exact units most needing a final pass. Found by grepping consumers of `stageState` before changing its return type, not by testing afterwards.
- Graders run and results (PASS/FAIL): all content gates PASS; `check:pipeline-gate` correctly still FAILs on the 5 outstanding G3 rows.
- Next experiment (smallest change to try): `prepare-gate-evidence.mjs` runs the repo-wide gate set once per unit, so preparing five units ran the same checks five times. Cache a single clean run across units in one invocation.
